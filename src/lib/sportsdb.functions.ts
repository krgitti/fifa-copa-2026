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
    const today = new Date();
    const dates: string[] = [];
    for (let i = -8; i <= 4; i++) {
      const d = new Date(today);
      d.setUTCDate(today.getUTCDate() + i);
      dates.push(d.toISOString().split("T")[0]);
    }
    const all: SportsDbEvent[] = [];
    for (const date of dates) {
      try {
        const res = await fetch(
          `https://www.thesportsdb.com/api/v1/json/3/eventsday.php?d=${date}&l=4429`,
          { cache: "no-store" },
        );
        if (!res.ok) continue;
        const json = (await res.json()) as { events?: SportsDbEvent[] };
        if (json?.events?.length) all.push(...json.events);
      } catch {
        // ignore per-day failures
      }
    }
    return { events: all };
  },
);