import { createFileRoute } from "@tanstack/react-router";
import { MATCHES, type Match } from "@/lib/worldcup-data";
import { MatchCard } from "@/components/MatchCard";

export const Route = createFileRoute("/mata-mata")({
  head: () => ({
    meta: [
      { title: "Chaveamento Eliminatório · Copa 2026" },
      { name: "description", content: "Bracket completo da Copa do Mundo 2026: 32-avos, oitavas, quartas, semis, 3º lugar e final." },
    ],
  }),
  component: MataMata,
});

const PHASES: Array<{ key: Match["phase"]; label: string }> = [
  { key: "r32", label: "32-avos" },
  { key: "r16", label: "Oitavas" },
  { key: "qf", label: "Quartas" },
  { key: "sf", label: "Semifinais" },
  { key: "third", label: "Disputa 3º Lugar" },
  { key: "final", label: "FINAL" },
];

function MataMata() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-black tracking-tight">Mata-mata</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Do 32-avos até a grande final no MetLife Stadium em 19 de julho.
      </p>

      <div className="mt-6 space-y-8">
        {PHASES.map(({ key, label }) => {
          const ms = MATCHES.filter((m) => m.phase === key);
          return (
            <section key={key}>
              <div className="mb-3 flex items-center gap-2">
                <h2 className={`text-xl font-bold tracking-tight ${key === "final" ? "text-accent" : ""}`}>
                  {label}
                </h2>
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground">
                  {ms.length} {ms.length === 1 ? "jogo" : "jogos"}
                </span>
              </div>
              <div className={`grid gap-3 ${key === "final" || key === "third" ? "sm:grid-cols-1" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
                {ms.map((m) => (
                  <MatchCard key={m.id} match={m} compact />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
