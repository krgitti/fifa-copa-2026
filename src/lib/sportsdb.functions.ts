import { createServerFn } from "@tanstack/react-start";

export type SportsDbEvent = {
  idEvent: string;
  strHomeTeam: string;
  strAwayTeam: string;
  intHomeScore: string | null;
  intAwayScore: string | null;
  strTimestamp: string | null;
  strStatus: string | null;
  strVenue: string | null;
  strGroup: string | null;
};

/**
 * Fetch a rolling window of TheSportsDB events for the FIFA World Cup
 * (league 4429). Runs server-side to avoid the CORS block TheSportsDB
 * applies to browser origins.
 */
export const fetchSportsDbWindow = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ events: SportsDbEvent[] }> => {
    // Full tournament window: 2026-06-10 → 2026-07-20 (Copa 2026).
    // eventsday.php has no 5-result cap; eventsseason/eventsround do.
    const start = new Date(Date.UTC(2026, 5, 10));
    const end = new Date(Date.UTC(2026, 6, 20));
    const dates: string[] = [];
    for (let d = new Date(start); d <= end; d.setUTCDate(d.getUTCDate() + 1)) {
      dates.push(d.toISOString().split("T")[0]);
    }

    const fetchDay = async (date: string): Promise<SportsDbEvent[]> => {
      try {
        const res = await fetch(
          `https://www.thesportsdb.com/api/v1/json/3/eventsday.php?d=${date}&l=4429`,
          { cache: "no-store" },
        );
        if (!res.ok) return [];
        const json = (await res.json()) as { events?: SportsDbEvent[] };
        return json?.events ?? [];
      } catch {
        return [];
      }
    };

    // Parallelize in batches of 8 to stay friendly to the free tier.
    const all: SportsDbEvent[] = [];
    const BATCH = 8;
    for (let i = 0; i < dates.length; i += BATCH) {
      const chunk = dates.slice(i, i + BATCH);
      const results = await Promise.all(chunk.map(fetchDay));
      for (const r of results) all.push(...r);
    }

    // Also pull livescores + past/next league snapshots as a safety net.
    try {
      const [live, past, next] = await Promise.all([
        fetch("https://www.thesportsdb.com/api/v1/json/3/eventspastleague.php?id=4429", { cache: "no-store" }).then((r) => r.ok ? r.json() : { events: [] }).catch(() => ({ events: [] })),
        fetch("https://www.thesportsdb.com/api/v1/json/3/eventsnextleague.php?id=4429", { cache: "no-store" }).then((r) => r.ok ? r.json() : { events: [] }).catch(() => ({ events: [] })),
        fetch("https://www.thesportsdb.com/api/v1/json/3/eventslive.php?s=Soccer", { cache: "no-store" }).then((r) => r.ok ? r.json() : { events: [] }).catch(() => ({ events: [] })),
      ]);
      for (const src of [live, past, next] as Array<{ events?: SportsDbEvent[] & Array<{ strLeague?: string; idLeague?: string }> }>) {
        for (const ev of src.events ?? []) {
          const anyEv = ev as SportsDbEvent & { idLeague?: string; strLeague?: string };
          if (anyEv.idLeague && anyEv.idLeague !== "4429") continue;
          if (!anyEv.idLeague && anyEv.strLeague && !anyEv.strLeague.includes("World Cup")) continue;
          all.push(ev);
        }
      }
    } catch {
      // ignore
    }

    // Dedupe by idEvent, keeping the entry with a score if present.
    const map = new Map<string, SportsDbEvent>();
    for (const ev of all) {
      const prev = map.get(ev.idEvent);
      if (!prev) { map.set(ev.idEvent, ev); continue; }
      const prevHas = prev.intHomeScore != null && prev.intAwayScore != null;
      const evHas = ev.intHomeScore != null && ev.intAwayScore != null;
      if (!prevHas && evHas) map.set(ev.idEvent, ev);
    }
    return { events: Array.from(map.values()) };
  },
);