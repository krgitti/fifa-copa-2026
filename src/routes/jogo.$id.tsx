import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { TEAMS, stadiumById, formatBrasilia, MATCHES } from "@/lib/worldcup-data";
import { useLiveMatches } from "@/hooks/useLiveMatches";
import { ArrowLeft, MapPin, Calendar, Clock } from "lucide-react";

export const Route = createFileRoute("/jogo/$id")({
  head: ({ params }) => {
    const m = MATCHES.find((x) => x.id === params.id);
    const h = m?.homeCode ? TEAMS[m.homeCode].name : "TBD";
    const a = m?.awayCode ? TEAMS[m.awayCode].name : "TBD";
    const title = m ? `${h} vs ${a} · Copa 2026` : "Jogo · Copa 2026";
    return {
      meta: [
        { title },
        { name: "description", content: `Detalhes do jogo ${h} vs ${a} na Copa do Mundo 2026.` },
      ],
    };
  },
  component: MatchDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold">Jogo não encontrado</h1>
      <Link to="/jogos" className="mt-4 inline-block text-primary hover:underline">
        Voltar para o calendário
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold">Erro ao carregar</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
  loader: ({ params }) => {
    const m = MATCHES.find((x) => x.id === params.id);
    if (!m) throw notFound();
    return { match: m };
  },
});

function MatchDetail() {
  const { match: initialMatch } = Route.useLoaderData();
  const matches = useLiveMatches();
  const match = matches.find((m) => m.id === initialMatch.id) || initialMatch;
  const { date, time, weekday } = formatBrasilia(match.kickoffUTC);
  const stadium = stadiumById(match.stadiumId);
  const home = match.homeCode ? TEAMS[match.homeCode] : null;
  const away = match.awayCode ? TEAMS[match.awayCode] : null;
  const isLive = match.status === "live";
  const isDone = match.status === "finished";

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <Link
        to="/jogos"
        className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Voltar
      </Link>

      <div
        className="overflow-hidden rounded-3xl border border-border"
        style={{ background: "var(--gradient-card)" }}
      >
        <div
          className="border-b border-border p-6 text-center"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="text-xs font-bold uppercase tracking-wider text-primary-foreground/80">
            {match.group
              ? `Grupo ${match.group} · Rodada ${match.matchday}`
              : phaseLabel(match.phase)}
          </div>
          <div className="mt-4 grid grid-cols-3 items-center gap-3 text-primary-foreground">
            <SideBig team={home} />
            <div className="text-center">
              {isDone || isLive ? (
                <div className="text-5xl font-black tabular-nums">
                  {match.homeScore ?? 0}
                  <span className="mx-2">·</span>
                  {match.awayScore ?? 0}
                </div>
              ) : (
                <div>
                  <div className="text-3xl font-black tabular-nums">{time}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-wider opacity-80">
                    Brasília
                  </div>
                </div>
              )}
              {isLive && (
                <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-live/30 px-2 py-0.5 text-xs font-bold ring-1 ring-live">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-live" />
                  AO VIVO {match.minute ? `${match.minute}'` : ""}
                </div>
              )}
            </div>
            <SideBig team={away} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-3">
          <Info icon={<Calendar className="h-4 w-4" />} label="Data">
            {weekday} · {date}
          </Info>
          <Info icon={<Clock className="h-4 w-4" />} label="Horário">
            {time} (Brasília)
          </Info>
          <Info icon={<MapPin className="h-4 w-4" />} label="Estádio">
            {stadium?.name}
            <br />
            <span className="text-xs text-muted-foreground">
              {stadium?.city}, {stadium?.country}
            </span>
          </Info>
        </div>

        {match.placeholder && !home && (
          <div className="border-t border-border p-6 text-sm text-muted-foreground">
            <strong className="text-foreground">A definir:</strong> {match.placeholder}
          </div>
        )}
      </div>
    </div>
  );
}

function SideBig({ team }: { team: { name: string; flag: string; code: string } | null }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-5xl leading-none">{team?.flag ?? "⚽"}</span>
      <div className="text-sm font-bold">{team?.name ?? "A definir"}</div>
    </div>
  );
}

function Info({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-background/40 p-3">
      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        {icon} {label}
      </div>
      <div className="mt-1 text-sm font-semibold">{children}</div>
    </div>
  );
}

function phaseLabel(p: string) {
  return (
    {
      r32: "16-avos de Final",
      r16: "Oitavas de Final",
      qf: "Quartas de Final",
      sf: "Semifinal",
      third: "Disputa de 3º Lugar",
      final: "FINAL",
    }[p] ?? "Jogo"
  );
}
