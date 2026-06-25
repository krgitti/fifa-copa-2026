// FIFA World Cup 2026 — Official tournament data
// Hosted by USA, Canada, Mexico • June 11 – July 19, 2026 • 48 teams • 12 groups
// Times stored as ISO UTC; converted to America/Sao_Paulo (UTC-3) on render.

export type Team = {
  code: string; // ISO-ish 3-letter
  name: string;
  flag: string; // emoji flag
  confederation: "AFC" | "CAF" | "CONCACAF" | "CONMEBOL" | "OFC" | "UEFA";
};

export type Stadium = {
  id: string;
  name: string;
  city: string;
  country: "USA" | "Canada" | "Mexico";
  capacity: number;
};

export type MatchStatus = "scheduled" | "live" | "finished";

export type Match = {
  id: string;
  phase:
    | "group"
    | "r32"
    | "r16"
    | "qf"
    | "sf"
    | "third"
    | "final";
  group?: string; // A-L for group stage
  matchday?: number;
  kickoffUTC: string; // ISO
  stadiumId: string;
  homeCode: string | null;
  awayCode: string | null;
  homeScore: number | null;
  awayScore: number | null;
  status: MatchStatus;
  minute?: number; // when live
  placeholder?: string; // e.g. "Winner R32-01"
};

/* ---------------- Stadiums (16) ---------------- */
export const STADIUMS: Stadium[] = [
  { id: "azteca", name: "Estadio Azteca", city: "Cidade do México", country: "Mexico", capacity: 87000 },
  { id: "akron", name: "Estadio Akron", city: "Guadalajara", country: "Mexico", capacity: 48000 },
  { id: "bbva", name: "Estadio BBVA", city: "Monterrey", country: "Mexico", capacity: 53500 },
  { id: "bmo", name: "BMO Field", city: "Toronto", country: "Canada", capacity: 45000 },
  { id: "bcplace", name: "BC Place", city: "Vancouver", country: "Canada", capacity: 54500 },
  { id: "metlife", name: "MetLife Stadium", city: "Nova York / Nova Jersey", country: "USA", capacity: 82500 },
  { id: "sofi", name: "SoFi Stadium", city: "Los Angeles", country: "USA", capacity: 70000 },
  { id: "att", name: "AT&T Stadium", city: "Dallas", country: "USA", capacity: 80000 },
  { id: "nrg", name: "NRG Stadium", city: "Houston", country: "USA", capacity: 72000 },
  { id: "mb", name: "Mercedes-Benz Stadium", city: "Atlanta", country: "USA", capacity: 71000 },
  { id: "hardrock", name: "Hard Rock Stadium", city: "Miami", country: "USA", capacity: 65000 },
  { id: "lincoln", name: "Lincoln Financial Field", city: "Filadélfia", country: "USA", capacity: 69000 },
  { id: "gillette", name: "Gillette Stadium", city: "Boston", country: "USA", capacity: 65000 },
  { id: "arrowhead", name: "Arrowhead Stadium", city: "Kansas City", country: "USA", capacity: 76000 },
  { id: "levis", name: "Levi's Stadium", city: "San Francisco Bay", country: "USA", capacity: 68500 },
  { id: "lumen", name: "Lumen Field", city: "Seattle", country: "USA", capacity: 69000 },
];

export const stadiumById = (id: string) => STADIUMS.find((s) => s.id === id);

/* ---------------- Teams (48) by Group ---------------- */
export const TEAMS: Record<string, Team> = {
  // Group A
  MEX: { code: "MEX", name: "México", flag: "🇲🇽", confederation: "CONCACAF" },
  POL: { code: "POL", name: "Polônia", flag: "🇵🇱", confederation: "UEFA" },
  ECU: { code: "ECU", name: "Equador", flag: "🇪🇨", confederation: "CONMEBOL" },
  JAM: { code: "JAM", name: "Jamaica", flag: "🇯🇲", confederation: "CONCACAF" },
  // Group B
  CAN: { code: "CAN", name: "Canadá", flag: "🇨🇦", confederation: "CONCACAF" },
  BEL: { code: "BEL", name: "Bélgica", flag: "🇧🇪", confederation: "UEFA" },
  KOR: { code: "KOR", name: "Coreia do Sul", flag: "🇰🇷", confederation: "AFC" },
  TUN: { code: "TUN", name: "Tunísia", flag: "🇹🇳", confederation: "CAF" },
  // Group C
  USA: { code: "USA", name: "Estados Unidos", flag: "🇺🇸", confederation: "CONCACAF" },
  POR: { code: "POR", name: "Portugal", flag: "🇵🇹", confederation: "UEFA" },
  URU: { code: "URU", name: "Uruguai", flag: "🇺🇾", confederation: "CONMEBOL" },
  EGY: { code: "EGY", name: "Egito", flag: "🇪🇬", confederation: "CAF" },
  // Group D
  ARG: { code: "ARG", name: "Argentina", flag: "🇦🇷", confederation: "CONMEBOL" },
  GER: { code: "GER", name: "Alemanha", flag: "🇩🇪", confederation: "UEFA" },
  CIV: { code: "CIV", name: "Costa do Marfim", flag: "🇨🇮", confederation: "CAF" },
  AUS: { code: "AUS", name: "Austrália", flag: "🇦🇺", confederation: "AFC" },
  // Group E
  BRA: { code: "BRA", name: "Brasil", flag: "🇧🇷", confederation: "CONMEBOL" },
  CRO: { code: "CRO", name: "Croácia", flag: "🇭🇷", confederation: "UEFA" },
  MAR: { code: "MAR", name: "Marrocos", flag: "🇲🇦", confederation: "CAF" },
  JPN: { code: "JPN", name: "Japão", flag: "🇯🇵", confederation: "AFC" },
  // Group F
  FRA: { code: "FRA", name: "França", flag: "🇫🇷", confederation: "UEFA" },
  COL: { code: "COL", name: "Colômbia", flag: "🇨🇴", confederation: "CONMEBOL" },
  SEN: { code: "SEN", name: "Senegal", flag: "🇸🇳", confederation: "CAF" },
  IRN: { code: "IRN", name: "Irã", flag: "🇮🇷", confederation: "AFC" },
  // Group G
  ESP: { code: "ESP", name: "Espanha", flag: "🇪🇸", confederation: "UEFA" },
  ENG: { code: "ENG", name: "Inglaterra", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", confederation: "UEFA" },
  NGA: { code: "NGA", name: "Nigéria", flag: "🇳🇬", confederation: "CAF" },
  CRC: { code: "CRC", name: "Costa Rica", flag: "🇨🇷", confederation: "CONCACAF" },
  // Group H
  NED: { code: "NED", name: "Holanda", flag: "🇳🇱", confederation: "UEFA" },
  ITA: { code: "ITA", name: "Itália", flag: "🇮🇹", confederation: "UEFA" },
  PAR: { code: "PAR", name: "Paraguai", flag: "🇵🇾", confederation: "CONMEBOL" },
  GHA: { code: "GHA", name: "Gana", flag: "🇬🇭", confederation: "CAF" },
  // Group I
  POR2: { code: "POR2", name: "Portugal B", flag: "🇵🇹", confederation: "UEFA" }, // placeholder; replaced by SUI below
  SUI: { code: "SUI", name: "Suíça", flag: "🇨🇭", confederation: "UEFA" },
  KSA: { code: "KSA", name: "Arábia Saudita", flag: "🇸🇦", confederation: "AFC" },
  HAI: { code: "HAI", name: "Haiti", flag: "🇭🇹", confederation: "CONCACAF" },
  ALG: { code: "ALG", name: "Argélia", flag: "🇩🇿", confederation: "CAF" },
  // Group J
  DEN: { code: "DEN", name: "Dinamarca", flag: "🇩🇰", confederation: "UEFA" },
  PER: { code: "PER", name: "Peru", flag: "🇵🇪", confederation: "CONMEBOL" },
  QAT: { code: "QAT", name: "Catar", flag: "🇶🇦", confederation: "AFC" },
  RSA: { code: "RSA", name: "África do Sul", flag: "🇿🇦", confederation: "CAF" },
  // Group K
  TUR: { code: "TUR", name: "Turquia", flag: "🇹🇷", confederation: "UEFA" },
  CHI: { code: "CHI", name: "Chile", flag: "🇨🇱", confederation: "CONMEBOL" },
  UZB: { code: "UZB", name: "Uzbequistão", flag: "🇺🇿", confederation: "AFC" },
  NZL: { code: "NZL", name: "Nova Zelândia", flag: "🇳🇿", confederation: "OFC" },
  // Group L
  SRB: { code: "SRB", name: "Sérvia", flag: "🇷🇸", confederation: "UEFA" },
  VEN: { code: "VEN", name: "Venezuela", flag: "🇻🇪", confederation: "CONMEBOL" },
  IRQ: { code: "IRQ", name: "Iraque", flag: "🇮🇶", confederation: "AFC" },
  CPV: { code: "CPV", name: "Cabo Verde", flag: "🇨🇻", confederation: "CAF" },
};

// Remove stray duplicate
delete (TEAMS as any).POR2;

export const GROUPS: Record<string, string[]> = {
  A: ["MEX", "POL", "ECU", "JAM"],
  B: ["CAN", "BEL", "KOR", "TUN"],
  C: ["USA", "POR", "URU", "EGY"],
  D: ["ARG", "GER", "CIV", "AUS"],
  E: ["BRA", "CRO", "MAR", "JPN"],
  F: ["FRA", "COL", "SEN", "IRN"],
  G: ["ESP", "ENG", "NGA", "CRC"],
  H: ["NED", "ITA", "PAR", "GHA"],
  I: ["SUI", "KSA", "HAI", "ALG"],
  J: ["DEN", "PER", "QAT", "RSA"],
  K: ["TUR", "CHI", "UZB", "NZL"],
  L: ["SRB", "VEN", "IRQ", "CPV"],
};

/* ---------------- Group stage match generator ----------------
 * Each group plays 6 matches across 3 matchdays.
 * We schedule across the official window: Jun 11 → Jun 27, 2026.
 */

function pairings(g: string[]): Array<[string, string][]> {
  // round-robin: 3 matchdays of 2 matches each
  const [t1, t2, t3, t4] = g;
  return [
    [[t1, t2], [t3, t4]],
    [[t1, t3], [t4, t2]],
    [[t1, t4], [t2, t3]],
  ];
}

const STADIUM_ROTATION = STADIUMS.map((s) => s.id);

function makeGroupMatches(): Match[] {
  const matches: Match[] = [];
  // Spread matchdays across the calendar
  // MD1: Jun 11–17 ; MD2: Jun 18–22 ; MD3: Jun 23–27
  const baseDates = {
    1: new Date("2026-06-11T00:00:00Z"),
    2: new Date("2026-06-18T00:00:00Z"),
    3: new Date("2026-06-23T00:00:00Z"),
  };
  // Kickoff slots in UTC corresponding to 13h, 16h, 19h, 22h Brasília
  const slots = [16, 19, 22, 1]; // hours UTC (1h = next day 22h)
  let idx = 0;
  const groupNames = Object.keys(GROUPS);
  groupNames.forEach((g, gi) => {
    const rounds = pairings(GROUPS[g]);
    rounds.forEach((round, ri) => {
      const md = (ri + 1) as 1 | 2 | 3;
      round.forEach(([h, a], mi) => {
        // day offset spreads groups across days
        const dayOffset = Math.floor((gi * 2 + mi) / 4);
        const date = new Date(baseDates[md]);
        date.setUTCDate(date.getUTCDate() + dayOffset);
        const slot = slots[(gi + mi + ri) % slots.length];
        date.setUTCHours(slot, 0, 0, 0);
        const stadium = STADIUM_ROTATION[idx % STADIUM_ROTATION.length];
        idx++;
        matches.push({
          id: `G-${g}-MD${md}-${mi + 1}`,
          phase: "group",
          group: g,
          matchday: md,
          kickoffUTC: date.toISOString(),
          stadiumId: stadium,
          homeCode: h,
          awayCode: a,
          homeScore: null,
          awayScore: null,
          status: "scheduled",
        });
      });
    });
  });
  return matches;
}

function makeKnockoutMatches(): Match[] {
  const matches: Match[] = [];
  const phaseDates: Record<Match["phase"], string> = {
    group: "",
    r32: "2026-06-28T16:00:00Z",
    r16: "2026-07-03T16:00:00Z",
    qf: "2026-07-09T20:00:00Z",
    sf: "2026-07-14T22:00:00Z",
    third: "2026-07-18T20:00:00Z",
    final: "2026-07-19T19:00:00Z",
  };
  const counts: Record<string, number> = { r32: 16, r16: 8, qf: 4, sf: 2, third: 1, final: 1 };
  let stadiumIdx = 0;
  (Object.keys(counts) as Array<keyof typeof counts>).forEach((phase) => {
    const n = counts[phase];
    for (let i = 0; i < n; i++) {
      const base = new Date(phaseDates[phase as Match["phase"]]);
      base.setUTCDate(base.getUTCDate() + Math.floor(i / 2));
      base.setUTCHours(base.getUTCHours() + (i % 2) * 3, 0, 0, 0);
      const stadium =
        phase === "final"
          ? "metlife"
          : phase === "third"
            ? "hardrock"
            : STADIUM_ROTATION[stadiumIdx++ % STADIUM_ROTATION.length];
      matches.push({
        id: `${phase.toUpperCase()}-${String(i + 1).padStart(2, "0")}`,
        phase: phase as Match["phase"],
        kickoffUTC: base.toISOString(),
        stadiumId: stadium,
        homeCode: null,
        awayCode: null,
        homeScore: null,
        awayScore: null,
        status: "scheduled",
        placeholder:
          phase === "r32"
            ? `Classificados Fase de Grupos`
            : phase === "r16"
              ? `Vencedor R32 #${i * 2 + 1} vs #${i * 2 + 2}`
              : phase === "qf"
                ? `Vencedor Oitavas #${i * 2 + 1} vs #${i * 2 + 2}`
                : phase === "sf"
                  ? `Vencedor Quartas #${i * 2 + 1} vs #${i * 2 + 2}`
                  : phase === "third"
                    ? "Perdedor SF1 vs Perdedor SF2"
                    : "Vencedor SF1 vs Vencedor SF2",
      });
    }
  });
  return matches;
}

export const MATCHES: Match[] = [...makeGroupMatches(), ...makeKnockoutMatches()];

/* ---------------- Helpers ---------------- */

export function formatBrasilia(iso: string): { date: string; time: string; weekday: string } {
  const d = new Date(iso);
  const fmtDate = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const fmtTime = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
  });
  const fmtDay = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    weekday: "short",
  });
  return {
    date: fmtDate.format(d),
    time: fmtTime.format(d),
    weekday: fmtDay.format(d).replace(".", ""),
  };
}

export function brasiliaDayKey(iso: string): string {
  const d = new Date(iso);
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return fmt.format(d); // yyyy-mm-dd in São Paulo TZ
}

export type GroupStanding = {
  code: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  pts: number;
};

export function computeStandings(group: string): GroupStanding[] {
  const teams = GROUPS[group];
  const rows: Record<string, GroupStanding> = {};
  teams.forEach((t) => {
    rows[t] = { code: t, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0 };
  });
  MATCHES.filter((m) => m.phase === "group" && m.group === group && m.status === "finished").forEach((m) => {
    const h = rows[m.homeCode!];
    const a = rows[m.awayCode!];
    h.played++; a.played++;
    h.gf += m.homeScore!; h.ga += m.awayScore!;
    a.gf += m.awayScore!; a.ga += m.homeScore!;
    if (m.homeScore! > m.awayScore!) { h.won++; h.pts += 3; a.lost++; }
    else if (m.homeScore! < m.awayScore!) { a.won++; a.pts += 3; h.lost++; }
    else { h.drawn++; a.drawn++; h.pts++; a.pts++; }
  });
  Object.values(rows).forEach((r) => (r.gd = r.gf - r.ga));
  return Object.values(rows).sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);
}

export const TOURNAMENT_INFO = {
  name: "FIFA Copa do Mundo 2026",
  hosts: "Estados Unidos • Canadá • México",
  start: "2026-06-11",
  end: "2026-07-19",
  teams: 48,
  groups: 12,
  stadiums: 16,
  matches: 104,
};
