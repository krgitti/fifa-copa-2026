import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MATCHES, brasiliaDayKey, formatBrasilia, TEAMS } from "@/lib/worldcup-data";
import { MatchCard } from "@/components/MatchCard";

export const Route = createFileRoute("/jogos")({
  head: () => ({
    meta: [
      { title: "Calendário de Jogos · Copa 2026" },
      { name: "description", content: "Todos os 104 jogos da Copa do Mundo 2026 com data, horário de Brasília, estádio e fase." },
    ],
  }),
  component: JogosPage,
});

function JogosPage() {
  const [team, setTeam] = useState<string>("all");
  const [phase, setPhase] = useState<string>("all");

  const filtered = useMemo(() => {
    return MATCHES.filter((m) => {
      if (phase !== "all" && m.phase !== phase) return false;
      if (team !== "all" && m.homeCode !== team && m.awayCode !== team) return false;
      return true;
    }).sort((a, b) => +new Date(a.kickoffUTC) - +new Date(b.kickoffUTC));
  }, [team, phase]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof MATCHES>();
    filtered.forEach((m) => {
      const key = brasiliaDayKey(m.kickoffUTC);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(m);
    });
    return Array.from(map.entries());
  }, [filtered]);

  const teamCodes = Object.keys(TEAMS).sort((a, b) => TEAMS[a].name.localeCompare(TEAMS[b].name));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-black tracking-tight">Calendário</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {filtered.length} jogos · horários no fuso de Brasília
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <select
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          className="rounded-full border border-border bg-input px-3 py-1.5 text-sm"
        >
          <option value="all">Todas as seleções</option>
          {teamCodes.map((c) => (
            <option key={c} value={c}>{TEAMS[c].flag} {TEAMS[c].name}</option>
          ))}
        </select>
        <select
          value={phase}
          onChange={(e) => setPhase(e.target.value)}
          className="rounded-full border border-border bg-input px-3 py-1.5 text-sm"
        >
          <option value="all">Todas as fases</option>
          <option value="group">Fase de Grupos</option>
          <option value="r32">32-avos</option>
          <option value="r16">Oitavas</option>
          <option value="qf">Quartas</option>
          <option value="sf">Semifinais</option>
          <option value="third">3º Lugar</option>
          <option value="final">Final</option>
        </select>
      </div>

      <div className="mt-6 space-y-8">
        {grouped.map(([day, ms]) => {
          const { date, weekday } = formatBrasilia(ms[0].kickoffUTC);
          return (
            <div key={day}>
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                {weekday} · {date}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {ms.map((m) => <MatchCard key={m.id} match={m} />)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
