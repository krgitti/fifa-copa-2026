import { createServerFn } from "@tanstack/react-start";

export type ApiFootballFixture = {
  fixtureId: number;
  utcDate: string; // ISO
  status: string; // short code: NS, 1H, HT, 2H, ET, BT, P, FT, AET, PEN, LIVE, etc.
  elapsed: number | null;
  venue: string | null;
  league: { round: string | null; group: string | null };
  home: { name: string; goals: number | null };
  away: { name: string; goals: number | null };
};

export const fetchApiFootballFixtures = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ fixtures: ApiFootballFixture[]; error?: string }> => {
    const key = process.env.API_FOOTBALL_KEY;
    if (!key) return { fixtures: [], error: "missing-key" };

    try {
      const res = await fetch(
        "https://v3.football.api-sports.io/fixtures?league=1&season=2026",
        { headers: { "x-apisports-key": key }, cache: "no-store" },
      );
      if (!res.ok) return { fixtures: [], error: `http-${res.status}` };
      const json = (await res.json()) as {
        response?: Array<{
          fixture: { id: number; date: string; status: { short: string; elapsed: number | null }; venue: { name: string | null } };
          league: { round: string | null };
          teams: { home: { name: string }; away: { name: string } };
          goals: { home: number | null; away: number | null };
        }>;
      };
      const fixtures: ApiFootballFixture[] = (json.response ?? []).map((r) => {
        // round example: "Group Stage - 1", "Round of 32", "Final"
        const round = r.league.round ?? "";
        const groupMatch = /Group\s+([A-L])/i.exec(round);
        return {
          fixtureId: r.fixture.id,
          utcDate: r.fixture.date,
          status: r.fixture.status.short,
          elapsed: r.fixture.status.elapsed,
          venue: r.fixture.venue?.name ?? null,
          league: { round, group: groupMatch ? groupMatch[1].toUpperCase() : null },
          home: { name: r.teams.home.name, goals: r.goals.home },
          away: { name: r.teams.away.name, goals: r.goals.away },
        };
      });
      return { fixtures };
    } catch (e) {
      return { fixtures: [], error: String(e) };
    }
  },
);