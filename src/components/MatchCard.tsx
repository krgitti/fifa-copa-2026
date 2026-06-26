import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { formatBrasilia, stadiumById, TEAMS, type Match } from "@/lib/worldcup-data";

const PHASE_LABEL: Record<Match["phase"], string> = {
  group: "Grupo",
  r32: "16-avos de final",
  r16: "Oitavas",
  qf: "Quartas",
  sf: "Semifinal",
  third: "3º Lugar",
  final: "FINAL",
};

export function MatchCard({ match, compact = false }: { match: Match; compact?: boolean }) {
  const { date, time, weekday } = formatBrasilia(match.kickoffUTC);
  const stadium = stadiumById(match.stadiumId);
  const home = match.homeCode ? TEAMS[match.homeCode] : null;
  const away = match.awayCode ? TEAMS[match.awayCode] : null;
  const isLive = match.status === "live";
  const isDone = match.status === "finished";

  return (
    <Link
      to="/jogo/$id"
      params={{ id: match.id }}
      className="group block rounded-2xl border border-border p-4 transition-all hover:border-primary/60 hover:shadow-[var(--shadow-glow)]"
      style={{ background: "var(--gradient-card)" }}
    >
      <div className="mb-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider">
        <span className="rounded-full bg-tertiary/20 px-2 py-0.5 text-tertiary-foreground/90 ring-1 ring-tertiary/40">
          {PHASE_LABEL[match.phase]}
          {match.group ? ` ${match.group}` : ""}
          {match.matchday ? ` · Rod ${match.matchday}` : ""}
        </span>
        {isLive ? (
          <span className="flex items-center gap-1.5 rounded-full bg-live/15 px-2 py-0.5 text-live ring-1 ring-live/50">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-live" />
            AO VIVO {match.minute ? `${match.minute}'` : ""}
          </span>
        ) : isDone ? (
          <span className="text-muted-foreground">Encerrado</span>
        ) : (
          <span className="text-muted-foreground">
            {weekday} {date} · {time}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between gap-3">
        <TeamSide team={home} placeholder={match.placeholder?.split(" vs ")[0]} align="left" />
        <div className="shrink-0 text-center">
          {isDone || isLive ? (
            <div className="text-3xl font-black tabular-nums tracking-tight">
              {match.homeScore ?? 0}
              <span className="mx-1.5 text-muted-foreground">·</span>
              {match.awayScore ?? 0}
            </div>
          ) : (
            <div className="text-lg font-bold tabular-nums text-muted-foreground">{time}</div>
          )}
        </div>
        <TeamSide team={away} placeholder={match.placeholder?.split(" vs ")[1]} align="right" />
      </div>

      {!compact && stadium && (
        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          {stadium.name} · {stadium.city}, {stadium.country}
        </div>
      )}
    </Link>
  );
}

function TeamSide({
  team,
  placeholder,
  align,
}: {
  team: ReturnType<typeof getTeam>;
  placeholder?: string;
  align: "left" | "right";
}) {
  return (
    <div
      className={`flex min-w-0 flex-1 items-center gap-2.5 ${align === "right" ? "flex-row-reverse text-right" : ""}`}
    >
      <span className="text-3xl leading-none" aria-hidden>
        {team?.flag ?? "⚽"}
      </span>
      <div className="min-w-0">
        <div className="truncate text-sm font-semibold">
          {team?.name ?? placeholder ?? "A definir"}
        </div>
      </div>
    </div>
  );
}

function getTeam() {
  return null as null | { code: string; name: string; flag: string };
}
