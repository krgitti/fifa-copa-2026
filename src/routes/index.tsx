import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Calendar, Trophy, MapPin, Users } from "lucide-react";
import { TOURNAMENT_INFO, brasiliaDayKey } from "@/lib/worldcup-data";
import { MatchCard } from "@/components/MatchCard";
import { useLiveMatches } from "@/hooks/useLiveMatches";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Copa do Mundo 2026 — Jogos de Hoje" },
      {
        name: "description",
        content:
          "Acompanhe ao vivo a FIFA Copa do Mundo 2026 com jogos, grupos, mata-mata, estádios e horários de Brasília.",
      },
      { property: "og:title", content: "Copa do Mundo 2026 — Jogos de Hoje" },
      {
        property: "og:description",
        content:
          "Tudo da Copa 2026 em um só lugar: ao vivo, calendário, classificação e chaveamento.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const matches = useLiveMatches();
  const todayKey = brasiliaDayKey(new Date().toISOString());
  const todayMatches = matches.filter((m) => brasiliaDayKey(m.kickoffUTC) === todayKey);
  const liveMatches = matches.filter((m) => m.status === "live");
  const upcoming = matches
    .filter((m) => m.status === "scheduled" && new Date(m.kickoffUTC) > new Date())
    .sort((a, b) => +new Date(a.kickoffUTC) - +new Date(b.kickoffUTC))
    .slice(0, 8);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: "var(--gradient-hero)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:py-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-foreground">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-live" />
            11 jun – 19 jul · 2026
          </span>
          <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
            {TOURNAMENT_INFO.name}
          </h1>
          <p className="mt-2 text-base text-muted-foreground sm:text-lg">{TOURNAMENT_INFO.hosts}</p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat
              icon={<Users className="h-4 w-4" />}
              label="Seleções"
              value={String(TOURNAMENT_INFO.teams)}
            />
            <Stat
              icon={<Trophy className="h-4 w-4" />}
              label="Grupos"
              value={String(TOURNAMENT_INFO.groups)}
            />
            <Stat
              icon={<MapPin className="h-4 w-4" />}
              label="Estádios"
              value={String(TOURNAMENT_INFO.stadiums)}
            />
            <Stat
              icon={<Calendar className="h-4 w-4" />}
              label="Jogos"
              value={String(TOURNAMENT_INFO.matches)}
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-10 px-4 py-8">
        {/* Live */}
        {liveMatches.length > 0 && (
          <Section title="Ao vivo agora" badge={`${liveMatches.length}`}>
            <div className="grid gap-3 sm:grid-cols-2">
              {liveMatches.map((m) => (
                <MatchCard key={m.id} match={m} />
              ))}
            </div>
          </Section>
        )}

        {/* Today */}
        <Section
          title="Jogos de hoje"
          badge={todayMatches.length ? `${todayMatches.length}` : "0"}
          action={
            <Link to="/jogos" className="text-sm font-medium text-primary hover:underline">
              Ver tudo →
            </Link>
          }
        >
          {todayMatches.length === 0 ? (
            <div
              className="rounded-2xl border border-border p-8 text-center text-muted-foreground"
              style={{ background: "var(--gradient-card)" }}
            >
              Nenhum jogo hoje no fuso de Brasília. Veja os próximos abaixo.
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {todayMatches.map((m) => (
                <MatchCard key={m.id} match={m} />
              ))}
            </div>
          )}
        </Section>

        {/* Upcoming */}
        <Section
          title="Próximos jogos"
          action={
            <Link to="/jogos" className="text-sm font-medium text-primary hover:underline">
              Calendário completo →
            </Link>
          }
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {upcoming.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        </Section>

        {/* Quick links */}
        <Section title="Explore">
          <div className="grid gap-3 sm:grid-cols-3">
            <QuickLink
              to="/grupos"
              title="Grupos & Classificação"
              desc="12 grupos · pontos, saldo, jogos"
            />
            <QuickLink to="/mata-mata" title="Chaveamento" desc="32-avos → Final no MetLife" />
            <QuickLink to="/estadios" title="16 Estádios" desc="EUA · Canadá · México" />
          </div>
        </Section>
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card/60 p-3 backdrop-blur">
      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        {icon} {label}
      </div>
      <div className="mt-1 text-2xl font-black tracking-tight">{value}</div>
    </div>
  );
}

function Section({
  title,
  badge,
  action,
  children,
}: {
  title: string;
  badge?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight">
          {title}
          {badge && (
            <span className="rounded-full bg-primary/15 px-2 py-0.5 text-xs font-bold text-primary ring-1 ring-primary/40">
              {badge}
            </span>
          )}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function QuickLink({ to, title, desc }: { to: string; title: string; desc: string }) {
  return (
    <Link
      to={to}
      className="block rounded-2xl border border-border p-5 transition-all hover:border-primary/60 hover:shadow-[var(--shadow-glow)]"
      style={{ background: "var(--gradient-card)" }}
    >
      <div className="text-base font-bold">{title}</div>
      <div className="mt-1 text-sm text-muted-foreground">{desc}</div>
    </Link>
  );
}
