import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { formatBrasilia, stadiumById, TEAMS, type Match } from "@/lib/worldcup-data";
import { Flag } from "@/components/Flag";

const PHASE_LABEL: Record<Match["phase"], string> = {
  group: "Grupo",
  r32: "16-avos de final",
  r16: "Oitavas",
  qf: "Quartas",
  sf: "Semifinal",
  third: "3º Lugar",
  final: "FINAL",
};

export function MatchCard({
  match,
  compact = false,
  dense = false,
}: {
  match: Match;
  compact?: boolean;
  dense?: boolean;
}) {
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
      className={`group block rounded-xl border border-border transition-all hover:border-primary/60 hover:shadow-[var(--shadow-glow)] ${
        dense ? "p-2.5" : "p-4"
      }`}
      style={{ background: "var(--gradient-card)" }}
    >
      <div
        className={`flex items-center justify-between font-semibold uppercase tracking-wider ${
          dense ? "mb-1.5 text-[9px]" : "mb-3 text-[11px]"
        }`}
      >
        <span className="rounded-full bg-tertiary/20 px-1.5 py-0.5 text-tertiary-foreground/90 ring-1 ring-tertiary/40">
          {PHASE_LABEL[match.phase]}
          {match.group ? ` ${match.group}` : ""}
          {match.matchday ? ` · Rod ${match.matchday}` : ""}
        </span>
        {isLive ? (
          <span className="flex items-center gap-1 rounded-full bg-live/15 px-1.5 py-0.5 text-live ring-1 ring-live/50">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-live" />
            AO VIVO{match.minute ? ` ${match.minute}'` : ""}
          </span>
        ) : isDone ? (
          <span className="text-muted-foreground">Encerrado</span>
        ) : (
          <span className="text-muted-foreground">
            {dense ? time : `${weekday} ${date} · ${time}`}
          </span>
        )}
      </div>

      <div className={`flex items-center justify-between ${dense ? "gap-2" : "gap-3"}`}>
        <TeamSide team={home} placeholder={match.placeholder?.split(" vs ")[0]} align="left" dense={dense} />
        <div className="shrink-0 text-center">
          {isDone || isLive ? (
            <div className={`font-black tabular-nums tracking-tight ${dense ? "text-xl" : "text-3xl"}`}>
              {match.homeScore ?? 0}
              <span className={`text-muted-foreground ${dense ? "mx-1" : "mx-1.5"}`}>·</span>
              {match.awayScore ?? 0}
            </div>
          ) : (
            <div className={`font-bold tabular-nums text-muted-foreground ${dense ? "text-sm" : "text-lg"}`}>
              {time}
            </div>
          )}
        </div>
        <TeamSide team={away} placeholder={match.placeholder?.split(" vs ")[1]} align="right" dense={dense} />
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
  dense = false,
}: {
  team: { code: string; name: string; flag: string } | null;
  placeholder?: string;
  align: "left" | "right";
  dense?: boolean;
}) {
  return (
    <div
      className={`flex min-w-0 flex-1 items-center ${dense ? "gap-1.5" : "gap-2.5"} ${
        align === "right" ? "flex-row-reverse text-right" : ""
      }`}
    >
      <Flag code={team?.code ?? null} size={dense ? "sm" : "md"} />
      <div className="min-w-0">
        <div className={`truncate font-semibold ${dense ? "text-xs" : "text-sm"}`}>
          {team?.name ?? placeholder ?? "A definir"}
        </div>
      </div>
    </div>
  );
}
