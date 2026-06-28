/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { MATCHES, resolveKnockoutTeams, type Match } from "@/lib/worldcup-data";
import { fetchApiFootballFixtures } from "@/lib/fixtures.functions";

const englishNameToCode: Record<string, string> = {
  Algeria: "ALG",
  Argentina: "ARG",
  Australia: "AUS",
  Austria: "AUT",
  Belgium: "BEL",
  "Bosnia and Herzegovina": "BIH",
  "Bosnia-Herzegovina": "BIH",
  Brazil: "BRA",
  "Cabo Verde": "CPV",
  Canada: "CAN",
  Colombia: "COL",
  "Congo DR": "COD",
  "DR Congo": "COD",
  "Cote d'Ivoire": "CIV",
  "Ivory Coast": "CIV",
  Croatia: "CRO",
  Curacao: "CUW",
  Curaçao: "CUW",
  Czechia: "CZE",
  "Czech Republic": "CZE",
  Ecuador: "ECU",
  Egypt: "EGY",
  England: "ENG",
  France: "FRA",
  Germany: "GER",
  Ghana: "GHA",
  Haiti: "HAI",
  "IR Iran": "IRN",
  Iran: "IRN",
  Iraq: "IRQ",
  Japan: "JPN",
  Jordan: "JOR",
  "Korea Republic": "KOR",
  "South Korea": "KOR",
  Mexico: "MEX",
  Morocco: "MAR",
  Netherlands: "NED",
  "New Zealand": "NZL",
  Norway: "NOR",
  Panama: "PAN",
  Paraguay: "PAR",
  Portugal: "POR",
  Qatar: "QAT",
  "Saudi Arabia": "KSA",
  Scotland: "SCO",
  Senegal: "SEN",
  "South Africa": "RSA",
  Spain: "ESP",
  Sweden: "SWE",
  Switzerland: "SUI",
  Tunisia: "TUN",
  Turkiye: "TUR",
  Turkey: "TUR",
  "United States": "USA",
  USA: "USA",
  Uruguay: "URU",
  Uzbekistan: "UZB",
};

const stadiumMapping: Record<string, string> = {
  "Estadio Azteca": "azteca",
  "Estadio Akron": "akron",
  "Estadio BBVA": "bbva",
  "BMO Field": "bmo",
  "BC Place": "bcplace",
  "MetLife Stadium": "metlife",
  "SoFi Stadium": "sofi",
  "AT&T Stadium": "att",
  "NRG Stadium": "nrg",
  "Mercedes-Benz Stadium": "mb",
  "Hard Rock Stadium": "hardrock",
  "Lincoln Financial Field": "lincoln",
  "Gillette Stadium": "gillette",
  "Arrowhead Stadium": "arrowhead",
  "Levi's Stadium": "levis",
  "Lumen Field": "lumen",
};

let globalMatchesCache: Match[] = resolveKnockoutTeams([...MATCHES]);
let lastUpdated: number | null = null;
let listeners: Array<(matches: Match[]) => void> = [];
let isFetching = false;
let isFetchingApiFootball = false;
let lastApiFootballAt = 0;

function updateGlobalMatches(updated: Match[]) {
  globalMatchesCache = resolveKnockoutTeams(updated);
  lastUpdated = Date.now();
  listeners.forEach((l) => l(globalMatchesCache));
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchLiveScores() {
  if (isFetching) return;
  isFetching = true;

  try {
    // Cover a 10-day window (past 6, today, next 3) so finalised + upcoming
    // games both get the real TheSportsDB times and scores.
    const dates: string[] = [];
    const today = new Date();
    for (let i = -6; i <= 3; i++) {
      const d = new Date(today);
      d.setUTCDate(today.getUTCDate() + i);
      dates.push(d.toISOString().split("T")[0]);
    }

    const fetchedMatchesMap = new Map<string, any>();

    for (const date of dates) {
      try {
        const res = await fetch(
          `https://www.thesportsdb.com/api/v1/json/3/eventsday.php?d=${date}&l=4429`,
          { cache: "no-store" },
        );
        if (res.status === 429) {
          // Backoff and skip this date — try again on the next poll cycle.
          await delay(800);
          continue;
        }
        const data = await res.json();
        if (data && data.events) {
          data.events.forEach((event: any) => {
            fetchedMatchesMap.set(event.idEvent, event);
          });
        }
      } catch (error) {
        console.error(`Error fetching scores for date ${date}:`, error);
      }
      // Throttle so we don't trip TheSportsDB's free-tier rate-limit.
      await delay(350);
    }

    if (fetchedMatchesMap.size === 0) {
      isFetching = false;
      return;
    }

    let updated = false;
    const newMatches = globalMatchesCache.map((m) => {
      let matchedEvent: any = null;

      // 1. Match by team codes
      if (m.homeCode && m.awayCode) {
        for (const event of fetchedMatchesMap.values()) {
          const evHomeCode = englishNameToCode[event.strHomeTeam];
          const evAwayCode = englishNameToCode[event.strAwayTeam];
          if (
            (m.homeCode === evHomeCode && m.awayCode === evAwayCode) ||
            (m.homeCode === evAwayCode && m.awayCode === evHomeCode)
          ) {
            matchedEvent = event;
            break;
          }
        }
      }

      // 2. Match by stadium and kickoff time
      if (!matchedEvent) {
        const matchTime = new Date(m.kickoffUTC).getTime();
        for (const event of fetchedMatchesMap.values()) {
          const eventTimeStr = event.strTimestamp
            ? event.strTimestamp.endsWith("Z")
              ? event.strTimestamp
              : event.strTimestamp + "Z"
            : null;
          if (!eventTimeStr) continue;
          const eventTime = new Date(eventTimeStr).getTime();

          if (Math.abs(matchTime - eventTime) < 2 * 60 * 60 * 1000) {
            const evStadiumId = stadiumMapping[event.strVenue];
            if (evStadiumId && evStadiumId === m.stadiumId) {
              matchedEvent = event;
              break;
            }
          }
        }
      }

      if (matchedEvent) {
        const evHomeCode = englishNameToCode[matchedEvent.strHomeTeam] || null;
        const evAwayCode = englishNameToCode[matchedEvent.strAwayTeam] || null;

        const homeScore =
          matchedEvent.intHomeScore !== null && matchedEvent.intHomeScore !== undefined
            ? parseInt(matchedEvent.intHomeScore)
            : null;
        const awayScore =
          matchedEvent.intAwayScore !== null && matchedEvent.intAwayScore !== undefined
            ? parseInt(matchedEvent.intAwayScore)
            : null;

        let status = m.status;
        const evStatus = matchedEvent.strStatus;
        if (evStatus === "FT" || evStatus === "Finished") {
          status = "finished";
        } else if (
          evStatus === "HT" ||
          evStatus === "1H" ||
          evStatus === "2H" ||
          evStatus === "Live" ||
          evStatus === "P"
        ) {
          status = "live";
        } else if (homeScore !== null || awayScore !== null) {
          status = "live";
        }

        // Use the API kickoff time as source of truth when available.
        let kickoffUTC = m.kickoffUTC;
        if (matchedEvent.strTimestamp) {
          const apiIso = matchedEvent.strTimestamp.endsWith("Z")
            ? matchedEvent.strTimestamp
            : matchedEvent.strTimestamp + "Z";
          if (!isNaN(new Date(apiIso).getTime())) {
            kickoffUTC = apiIso;
          }
        }

        // Pull the official group letter from the API when present (e.g. "Group E").
        let group = m.group;
        if (matchedEvent.strGroup && m.phase === "group") {
          const g = String(matchedEvent.strGroup).replace(/^Group\s*/i, "").trim();
          if (g) group = g;
        }

        if (
          m.homeScore !== homeScore ||
          m.awayScore !== awayScore ||
          m.status !== status ||
          m.kickoffUTC !== kickoffUTC ||
          m.group !== group ||
          (evHomeCode && m.homeCode !== evHomeCode) ||
          (evAwayCode && m.awayCode !== evAwayCode)
        ) {
          updated = true;
          return {
            ...m,
            homeCode: evHomeCode || m.homeCode,
            awayCode: evAwayCode || m.awayCode,
            homeScore,
            awayScore,
            status,
            kickoffUTC,
            group,
            placeholder: evHomeCode && evAwayCode ? undefined : m.placeholder,
          };
        }
      }
      return m;
    });

    if (updated) {
      updateGlobalMatches(newMatches);
    } else {
      // Notify listeners so the "Atualizado HH:MM" indicator refreshes
      // even when the API didn't change any score.
      lastUpdated = Date.now();
      listeners.forEach((l) => l(globalMatchesCache));
    }
  } catch (err) {
    console.error("Error updating live scores:", err);
  } finally {
    isFetching = false;
  }
}

async function fetchApiFootballScores(force = false) {
  if (isFetchingApiFootball) return;
  // Throttle: api-football free tier ~100 req/day. Default to 5 min between calls.
  if (!force && Date.now() - lastApiFootballAt < 5 * 60 * 1000) return;
  isFetchingApiFootball = true;
  try {
    const { fixtures, error } = await fetchApiFootballFixtures();
    lastApiFootballAt = Date.now();
    if (error || fixtures.length === 0) return;

    let updated = false;
    const next = globalMatchesCache.map((m) => {
      // Try team match
      let fx = null as null | (typeof fixtures)[number];
      if (m.homeCode && m.awayCode) {
        for (const f of fixtures) {
          const hc = englishNameToCode[f.home.name];
          const ac = englishNameToCode[f.away.name];
          if (
            (hc === m.homeCode && ac === m.awayCode) ||
            (hc === m.awayCode && ac === m.homeCode)
          ) {
            fx = f;
            break;
          }
        }
      }
      // Stadium + time fallback
      if (!fx) {
        const matchTime = new Date(m.kickoffUTC).getTime();
        for (const f of fixtures) {
          if (!f.venue) continue;
          const sid = stadiumMapping[f.venue];
          if (sid !== m.stadiumId) continue;
          if (Math.abs(new Date(f.utcDate).getTime() - matchTime) < 3 * 60 * 60 * 1000) {
            fx = f;
            break;
          }
        }
      }
      if (!fx) return m;

      const hc = englishNameToCode[fx.home.name] || m.homeCode;
      const ac = englishNameToCode[fx.away.name] || m.awayCode;
      const homeScore = fx.home.goals;
      const awayScore = fx.away.goals;
      let status = m.status;
      const s = fx.status;
      if (s === "FT" || s === "AET" || s === "PEN") status = "finished";
      else if (s === "1H" || s === "2H" || s === "HT" || s === "ET" || s === "BT" || s === "P" || s === "LIVE")
        status = "live";
      const group = m.phase === "group" && fx.league.group ? fx.league.group : m.group;
      const kickoffUTC = fx.utcDate && !isNaN(new Date(fx.utcDate).getTime()) ? fx.utcDate : m.kickoffUTC;
      if (
        m.homeScore !== homeScore ||
        m.awayScore !== awayScore ||
        m.status !== status ||
        m.kickoffUTC !== kickoffUTC ||
        m.group !== group ||
        m.homeCode !== hc ||
        m.awayCode !== ac
      ) {
        updated = true;
        return { ...m, homeCode: hc, awayCode: ac, homeScore, awayScore, status, kickoffUTC, group, placeholder: hc && ac ? undefined : m.placeholder };
      }
      return m;
    });
    if (updated) updateGlobalMatches(next);
  } catch (e) {
    console.error("api-football fallback error", e);
  } finally {
    isFetchingApiFootball = false;
  }
}

export function useLiveMatches() {
  const [matches, setMatches] = useState<Match[]>(globalMatchesCache);
  const [updatedAt, setUpdatedAt] = useState<number | null>(lastUpdated);

  useEffect(() => {
    const listener = (newMatches: Match[]) => {
      setMatches(newMatches);
      setUpdatedAt(lastUpdated);
    };
    listeners.push(listener);

    fetchLiveScores();
    fetchApiFootballScores(true);
    const interval = setInterval(fetchLiveScores, 60_000);
    const apiFootballInterval = setInterval(() => fetchApiFootballScores(), 5 * 60_000);
    const onFocus = () => {
      fetchLiveScores();
      fetchApiFootballScores();
    };
    window.addEventListener("focus", onFocus);

    return () => {
      listeners = listeners.filter((l) => l !== listener);
      clearInterval(interval);
      clearInterval(apiFootballInterval);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  return matches;
}

export function useLiveMatchesMeta() {
  const [updatedAt, setUpdatedAt] = useState<number | null>(lastUpdated);
  useEffect(() => {
    const listener = () => setUpdatedAt(lastUpdated);
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);
  return {
    updatedAt,
    refresh: () => {
      fetchLiveScores();
      fetchApiFootballScores(true);
    },
  };
}
