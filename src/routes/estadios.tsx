import { createFileRoute } from "@tanstack/react-router";
import { STADIUMS } from "@/lib/worldcup-data";
import { useLiveMatches } from "@/hooks/useLiveMatches";
import { MapPin, Users } from "lucide-react";

export const Route = createFileRoute("/estadios")({
  head: () => ({
    meta: [
      { title: "Estádios · Copa 2026" },
      {
        name: "description",
        content: "Os 16 estádios da Copa do Mundo 2026 nos Estados Unidos, Canadá e México.",
      },
    ],
  }),
  component: EstadiosPage,
});

const FLAG: Record<string, string> = { USA: "🇺🇸", Canada: "🇨🇦", Mexico: "🇲🇽" };

function EstadiosPage() {
  const matches = useLiveMatches();
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-black tracking-tight">Estádios</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        16 estádios em 3 países sediam a maior Copa do Mundo da história.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {STADIUMS.map((s) => {
          const games = matches.filter((m) => m.stadiumId === s.id).length;
          return (
            <div
              key={s.id}
              className="rounded-2xl border border-border p-5"
              style={{ background: "var(--gradient-card)" }}
            >
              <div className="mb-2 text-3xl">{FLAG[s.country]}</div>
              <h3 className="text-base font-bold">{s.name}</h3>
              <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" /> {s.city}, {s.country}
              </div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Users className="h-3 w-3" /> {s.capacity.toLocaleString("pt-BR")} lugares
                </span>
                <span className="rounded-full bg-tertiary/20 px-2 py-0.5 font-bold text-foreground ring-1 ring-tertiary/40">
                  {games} {games === 1 ? "jogo" : "jogos"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
