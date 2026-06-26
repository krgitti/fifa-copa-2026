import { Link } from "@tanstack/react-router";
import { Trophy, RefreshCw } from "lucide-react";
import { useLiveMatchesMeta } from "@/hooks/useLiveMatches";

const NAV = [
  { to: "/", label: "Hoje" },
  { to: "/jogos", label: "Calendário" },
  { to: "/grupos", label: "Grupos" },
  { to: "/mata-mata", label: "Mata-mata" },
  { to: "/estadios", label: "Estádios" },
] as const;

export function SiteHeader() {
  const { updatedAt, refresh } = useLiveMatchesMeta();
  const updatedLabel = updatedAt
    ? new Intl.DateTimeFormat("pt-BR", {
        timeZone: "America/Sao_Paulo",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(updatedAt))
    : "—";
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-2.5">
          <span
            className="grid h-9 w-9 place-items-center rounded-full text-primary-foreground shadow-[var(--shadow-glow)]"
            style={{ background: "var(--gradient-hero)" }}
            aria-hidden
          >
            <Trophy className="h-5 w-5" strokeWidth={2.4} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              FIFA World Cup
            </span>
            <span className="text-base font-extrabold tracking-tight text-foreground">
              Copa 2026
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{
                className: "bg-primary/15 text-foreground ring-1 ring-primary/40",
              }}
              inactiveProps={{
                className: "text-muted-foreground hover:text-foreground hover:bg-muted/60",
              }}
              className="rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 text-xs text-muted-foreground sm:flex">
          <span>🇧🇷 Brasília (UTC−3)</span>
          <button
            type="button"
            onClick={() => refresh()}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/30 px-2.5 py-1 font-medium hover:border-primary/60 hover:text-foreground"
            title="Atualizar placares ao vivo"
          >
            <RefreshCw className="h-3 w-3" />
            <span>Atualizado {updatedLabel}</span>
          </button>
        </div>
      </div>
      <nav className="flex gap-1 overflow-x-auto border-t border-border px-3 py-2 md:hidden">
        {NAV.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            activeOptions={{ exact: item.to === "/" }}
            activeProps={{ className: "bg-primary/15 text-foreground ring-1 ring-primary/40" }}
            inactiveProps={{ className: "text-muted-foreground" }}
            className="whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
