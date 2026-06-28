import { createFileRoute } from "@tanstack/react-router";
import { GROUPS, TEAMS, computeStandings, type Match } from "@/lib/worldcup-data";
import { MatchCard } from "@/components/MatchCard";
import { useLiveMatches } from "@/hooks/useLiveMatches";
import { Flag } from "@/components/Flag";

export const Route = createFileRoute("/grupos")({
  head: () => ({
    meta: [
      { title: "Grupos e Classificação · Copa 2026" },
      {
        name: "description",
        content:
          "Classificação ao vivo dos 12 grupos da Copa do Mundo 2026 com pontos, saldo e jogos.",
      },
    ],
  }),
  component: GruposPage,
});

function GruposPage() {
  const matches = useLiveMatches();
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-black tracking-tight">Grupos & Classificação</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        12 grupos · 48 seleções · os 2 primeiros e os 8 melhores 3ºs avançam aos 16-avos de final.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {Object.keys(GROUPS).map((g) => (
          <GroupCard key={g} group={g} matches={matches} />
        ))}
      </div>
    </div>
  );
}

function GroupCard({ group, matches }: { group: string; matches: Match[] }) {
  const rows = computeStandings(group, matches);
  const groupMatches = matches
    .filter((m) => m.group === group)
    .sort((a, b) => +new Date(a.kickoffUTC) - +new Date(b.kickoffUTC));
  return (
    <div
      className="rounded-2xl border border-border p-4"
      style={{ background: "var(--gradient-card)" }}
    >
      <div className="mb-3 flex items-center gap-2">
        <span
          className="grid h-8 w-8 place-items-center rounded-lg text-sm font-black text-primary-foreground"
          style={{ background: "var(--gradient-hero)" }}
        >
          {group}
        </span>
        <h3 className="text-lg font-bold">Grupo {group}</h3>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-[11px] uppercase text-muted-foreground">
            <th className="py-1.5 text-left font-semibold">#</th>
            <th className="py-1.5 text-left font-semibold">Seleção</th>
            <th className="py-1.5 text-center font-semibold">J</th>
            <th className="py-1.5 text-center font-semibold">V</th>
            <th className="py-1.5 text-center font-semibold">E</th>
            <th className="py-1.5 text-center font-semibold">D</th>
            <th className="py-1.5 text-center font-semibold">SG</th>
            <th className="py-1.5 text-center font-semibold">P</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const t = TEAMS[r.code];
            const qualifies = i < 2;
            return (
              <tr key={r.code} className="border-t border-border/50">
                <td className="py-2">
                  <span
                    className={`inline-grid h-5 w-5 place-items-center rounded text-[10px] font-bold ${qualifies ? "bg-secondary text-secondary-foreground" : i === 2 ? "bg-accent/30 text-foreground" : "bg-muted text-muted-foreground"}`}
                  >
                    {i + 1}
                  </span>
                </td>
                <td className="py-2">
                  <span className="inline-flex items-center gap-2">
                    <Flag code={r.code} size="sm" />
                    <span className="font-semibold">{t.name}</span>
                  </span>
                </td>
                <td className="py-2 text-center tabular-nums">{r.played}</td>
                <td className="py-2 text-center tabular-nums">{r.won}</td>
                <td className="py-2 text-center tabular-nums">{r.drawn}</td>
                <td className="py-2 text-center tabular-nums">{r.lost}</td>
                <td className="py-2 text-center tabular-nums">{r.gd > 0 ? `+${r.gd}` : r.gd}</td>
                <td className="py-2 text-center font-bold tabular-nums">{r.pts}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-4 space-y-2">
        {groupMatches.map((m) => (
          <MatchCard key={m.id} match={m} compact />
        ))}
      </div>
    </div>
  );
}
