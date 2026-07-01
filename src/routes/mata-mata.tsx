import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { brasiliaDayKey, formatBrasilia, type Match } from "@/lib/worldcup-data";
import { useLiveMatches } from "@/hooks/useLiveMatches";
import { MatchCard } from "@/components/MatchCard";

export const Route = createFileRoute("/mata-mata")({
  head: () => ({
    meta: [
      { title: "Chaveamento Eliminatório · Copa 2026" },
      {
        name: "description",
        content:
          "Bracket completo da Copa do Mundo 2026: 16-avos de final, oitavas, quartas, semis, 3º lugar e final.",
      },
    ],
  }),
  component: MataMata,
});

const BRACKET_PHASES: Array<{ key: Match["phase"]; label: string }> = [
  { key: "r32", label: "16-avos de final" },
  { key: "r16", label: "Oitavas" },
  { key: "qf", label: "Quartas" },
  { key: "sf", label: "Semifinais" },
  { key: "final", label: "FINAL" },
];

const EXCLUDED_DAYS = new Set(["2026-06-28"]);

function groupByDay(matches: Match[]) {
  const map = new Map<string, Match[]>();
  for (const m of matches) {
    const key = brasiliaDayKey(m.kickoffUTC);
    if (EXCLUDED_DAYS.has(key)) continue;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(m);
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([day, ms]) => ({
      day,
      matches: ms.sort((a, b) => +new Date(a.kickoffUTC) - +new Date(b.kickoffUTC)),
    }));
}

function MataMata() {
  const matches = useLiveMatches();

  const columns = useMemo(
    () =>
      BRACKET_PHASES.map(({ key, label }) => ({
        key,
        label,
        days: groupByDay(matches.filter((m) => m.phase === key)),
      })),
    [matches],
  );

  const third = useMemo(
    () => groupByDay(matches.filter((m) => m.phase === "third")),
    [matches],
  );

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-8">
      <h1 className="text-3xl font-black tracking-tight">Mata-mata</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Chaveamento em árvore — dos 16-avos até a final no MetLife Stadium em 19 de julho.
      </p>

      <div className="mt-6 overflow-x-auto pb-4">
        <div className="flex min-w-[1100px] gap-0">
          {columns.map((col, colIdx) => (
            <div
              key={col.key}
              className="flex min-w-[220px] flex-1 flex-col px-3"
            >
              <div
                className={`mb-3 rounded-lg border border-border bg-card/50 px-2 py-1.5 text-center text-xs font-bold uppercase tracking-wider ${
                  col.key === "final" ? "text-accent" : ""
                }`}
              >
                {col.label}
              </div>
              <div className="relative flex flex-1 flex-col justify-around gap-3">
                {col.days.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-border/60 p-4 text-center text-[11px] text-muted-foreground">
                    Aguardando confrontos
                  </div>
                ) : (
                  col.days.map(({ day, matches: ms }) => {
                    const { date, weekday } = formatBrasilia(ms[0].kickoffUTC);
                    return (
                      <div key={day} className="space-y-1.5">
                        <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                          {weekday} · {date}
                        </div>
                        {ms.map((m) => (
                          <div key={m.id} className="relative">
                            {colIdx < columns.length - 1 && (
                              <span
                                aria-hidden
                                className="pointer-events-none absolute left-full top-1/2 h-px w-3 bg-border"
                              />
                            )}
                            {colIdx > 0 && (
                              <span
                                aria-hidden
                                className="pointer-events-none absolute right-full top-1/2 h-px w-3 bg-border"
                              />
                            )}
                            <MatchCard match={m} compact dense />
                          </div>
                        ))}
                      </div>
                    );
                  })
                )}
                {colIdx < columns.length - 1 && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-0 top-4 bottom-4 w-px translate-x-3 bg-border"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {third.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-3 text-xl font-bold tracking-tight">Disputa 3º Lugar</h2>
          <div className="grid gap-3 sm:grid-cols-1">
            {third.flatMap(({ day, matches: ms }) => {
              const { date, weekday } = formatBrasilia(ms[0].kickoffUTC);
              return (
                <div key={day} className="space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {weekday} · {date}
                  </div>
                  {ms.map((m) => (
                    <MatchCard key={m.id} match={m} compact />
                  ))}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}