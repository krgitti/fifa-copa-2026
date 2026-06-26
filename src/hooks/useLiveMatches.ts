/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { MATCHES, type Match } from "@/lib/worldcup-data";

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

let globalMatchesCache: Match[] = [...MATCHES];
let lastUpdated: number | null = null;
let listeners: Array<(matches: Match[]) => void> = [];
let isFetching = false;

function updateGlobalMatches(updated: Match[]) {
  globalMatchesCache = updated;
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
    const interval = setInterval(fetchLiveScores, 60_000);
    const onFocus = () => fetchLiveScores();
    window.addEventListener("focus", onFocus);

    return () => {
      listeners = listeners.filter((l) => l !== listener);
      clearInterval(interval);
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
  return { updatedAt, refresh: () => fetchLiveScores() };
}
