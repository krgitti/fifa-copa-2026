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
  phase: "group" | "r32" | "r16" | "qf" | "sf" | "third" | "final";
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
  placeholder?: string; // e.g. "Vencedor Jogo 74 vs Vencedor Jogo 77"
};

/* ---------------- Stadiums (16) ---------------- */
export const STADIUMS: Stadium[] = [
  {
    id: "azteca",
    name: "Estadio Azteca",
    city: "Cidade do México",
    country: "Mexico",
    capacity: 87000,
  },
  { id: "akron", name: "Estadio Akron", city: "Guadalajara", country: "Mexico", capacity: 48000 },
  { id: "bbva", name: "Estadio BBVA", city: "Monterrey", country: "Mexico", capacity: 53500 },
  { id: "bmo", name: "BMO Field", city: "Toronto", country: "Canada", capacity: 45000 },
  { id: "bcplace", name: "BC Place", city: "Vancouver", country: "Canada", capacity: 54500 },
  {
    id: "metlife",
    name: "MetLife Stadium",
    city: "Nova York / Nova Jersey",
    country: "USA",
    capacity: 82500,
  },
  { id: "sofi", name: "SoFi Stadium", city: "Los Angeles", country: "USA", capacity: 70000 },
  { id: "att", name: "AT&T Stadium", city: "Dallas", country: "USA", capacity: 80000 },
  { id: "nrg", name: "NRG Stadium", city: "Houston", country: "USA", capacity: 72000 },
  { id: "mb", name: "Mercedes-Benz Stadium", city: "Atlanta", country: "USA", capacity: 71000 },
  { id: "hardrock", name: "Hard Rock Stadium", city: "Miami", country: "USA", capacity: 65000 },
  {
    id: "lincoln",
    name: "Lincoln Financial Field",
    city: "Filadélfia",
    country: "USA",
    capacity: 69000,
  },
  { id: "gillette", name: "Gillette Stadium", city: "Boston", country: "USA", capacity: 65000 },
  {
    id: "arrowhead",
    name: "Arrowhead Stadium",
    city: "Kansas City",
    country: "USA",
    capacity: 76000,
  },
  {
    id: "levis",
    name: "Levi's Stadium",
    city: "San Francisco Bay",
    country: "USA",
    capacity: 68500,
  },
  { id: "lumen", name: "Lumen Field", city: "Seattle", country: "USA", capacity: 69000 },
];

export const stadiumById = (id: string) => STADIUMS.find((s) => s.id === id);

/* ---------------- Teams (48) ---------------- */
export const TEAMS: Record<string, Team> = {
  ALG: {
    code: "ALG",
    name: "Argélia",
    flag: "🇩🇿",
    confederation: "CAF",
  },
  ARG: {
    code: "ARG",
    name: "Argentina",
    flag: "🇦🇷",
    confederation: "CONMEBOL",
  },
  AUS: {
    code: "AUS",
    name: "Austrália",
    flag: "🇦🇺",
    confederation: "AFC",
  },
  AUT: {
    code: "AUT",
    name: "Áustria",
    flag: "🇦🇹",
    confederation: "UEFA",
  },
  BEL: {
    code: "BEL",
    name: "Bélgica",
    flag: "🇧🇪",
    confederation: "UEFA",
  },
  BIH: {
    code: "BIH",
    name: "Bósnia e H.",
    flag: "🇧🇦",
    confederation: "UEFA",
  },
  BRA: {
    code: "BRA",
    name: "Brasil",
    flag: "🇧🇷",
    confederation: "CONMEBOL",
  },
  CPV: {
    code: "CPV",
    name: "Cabo Verde",
    flag: "🇨🇻",
    confederation: "CAF",
  },
  CAN: {
    code: "CAN",
    name: "Canadá",
    flag: "🇨🇦",
    confederation: "CONCACAF",
  },
  COL: {
    code: "COL",
    name: "Colômbia",
    flag: "🇨🇴",
    confederation: "CONMEBOL",
  },
  COD: {
    code: "COD",
    name: "R. D. do Congo",
    flag: "🇨🇩",
    confederation: "CAF",
  },
  CIV: {
    code: "CIV",
    name: "Costa do Marfim",
    flag: "🇨🇮",
    confederation: "CAF",
  },
  CRO: {
    code: "CRO",
    name: "Croácia",
    flag: "🇭🇷",
    confederation: "UEFA",
  },
  CUW: {
    code: "CUW",
    name: "Curaçao",
    flag: "🇨🇼",
    confederation: "CONCACAF",
  },
  CZE: {
    code: "CZE",
    name: "República Tcheca",
    flag: "🇨🇿",
    confederation: "UEFA",
  },
  ECU: {
    code: "ECU",
    name: "Equador",
    flag: "🇪🇨",
    confederation: "CONMEBOL",
  },
  EGY: {
    code: "EGY",
    name: "Egito",
    flag: "🇪🇬",
    confederation: "CAF",
  },
  ENG: {
    code: "ENG",
    name: "Inglaterra",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    confederation: "UEFA",
  },
  FRA: {
    code: "FRA",
    name: "França",
    flag: "🇫🇷",
    confederation: "UEFA",
  },
  GER: {
    code: "GER",
    name: "Alemanha",
    flag: "🇩🇪",
    confederation: "UEFA",
  },
  GHA: {
    code: "GHA",
    name: "Gana",
    flag: "🇬🇭",
    confederation: "CAF",
  },
  HAI: {
    code: "HAI",
    name: "Haiti",
    flag: "🇭🇹",
    confederation: "CONCACAF",
  },
  IRN: {
    code: "IRN",
    name: "Irã",
    flag: "🇮🇷",
    confederation: "AFC",
  },
  IRQ: {
    code: "IRQ",
    name: "Iraque",
    flag: "🇮🇶",
    confederation: "AFC",
  },
  JPN: {
    code: "JPN",
    name: "Japão",
    flag: "🇯🇵",
    confederation: "AFC",
  },
  JOR: {
    code: "JOR",
    name: "Jordânia",
    flag: "🇯🇴",
    confederation: "AFC",
  },
  KOR: {
    code: "KOR",
    name: "Coreia do Sul",
    flag: "🇰🇷",
    confederation: "AFC",
  },
  MEX: {
    code: "MEX",
    name: "México",
    flag: "🇲🇽",
    confederation: "CONCACAF",
  },
  MAR: {
    code: "MAR",
    name: "Marrocos",
    flag: "🇲🇦",
    confederation: "CAF",
  },
  NED: {
    code: "NED",
    name: "Holanda",
    flag: "🇳🇱",
    confederation: "UEFA",
  },
  NZL: {
    code: "NZL",
    name: "Nova Zelândia",
    flag: "🇳🇿",
    confederation: "OFC",
  },
  NOR: {
    code: "NOR",
    name: "Noruega",
    flag: "🇳🇴",
    confederation: "UEFA",
  },
  PAN: {
    code: "PAN",
    name: "Panamá",
    flag: "🇵🇦",
    confederation: "CONCACAF",
  },
  PAR: {
    code: "PAR",
    name: "Paraguai",
    flag: "🇵🇾",
    confederation: "CONMEBOL",
  },
  POR: {
    code: "POR",
    name: "Portugal",
    flag: "🇵🇹",
    confederation: "UEFA",
  },
  QAT: {
    code: "QAT",
    name: "Catar",
    flag: "🇶🇦",
    confederation: "AFC",
  },
  KSA: {
    code: "KSA",
    name: "Arábia Saudita",
    flag: "🇸🇦",
    confederation: "AFC",
  },
  SCO: {
    code: "SCO",
    name: "Escócia",
    flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    confederation: "UEFA",
  },
  SEN: {
    code: "SEN",
    name: "Senegal",
    flag: "🇸🇳",
    confederation: "CAF",
  },
  RSA: {
    code: "RSA",
    name: "África do Sul",
    flag: "🇿🇦",
    confederation: "CAF",
  },
  ESP: {
    code: "ESP",
    name: "Espanha",
    flag: "🇪🇸",
    confederation: "UEFA",
  },
  SWE: {
    code: "SWE",
    name: "Suécia",
    flag: "🇸🇪",
    confederation: "UEFA",
  },
  SUI: {
    code: "SUI",
    name: "Suíça",
    flag: "🇨🇭",
    confederation: "UEFA",
  },
  TUN: {
    code: "TUN",
    name: "Tunísia",
    flag: "🇹🇳",
    confederation: "CAF",
  },
  TUR: {
    code: "TUR",
    name: "Turquia",
    flag: "🇹🇷",
    confederation: "UEFA",
  },
  USA: {
    code: "USA",
    name: "Estados Unidos",
    flag: "🇺🇸",
    confederation: "CONCACAF",
  },
  URU: {
    code: "URU",
    name: "Uruguai",
    flag: "🇺🇾",
    confederation: "CONMEBOL",
  },
  UZB: {
    code: "UZB",
    name: "Uzbequistão",
    flag: "🇺🇿",
    confederation: "AFC",
  },
};

/* ---------------- Groups ---------------- */
export const GROUPS: Record<string, string[]> = {
  A: ["MEX", "RSA", "KOR", "CZE"],
  B: ["CAN", "BIH", "QAT", "SUI"],
  C: ["HAI", "SCO", "BRA", "MAR"],
  D: ["USA", "PAR", "AUS", "TUR"],
  E: ["CIV", "ECU", "GER", "CUW"],
  F: ["NED", "JPN", "SWE", "TUN"],
  G: ["IRN", "NZL", "BEL", "EGY"],
  H: ["KSA", "URU", "ESP", "CPV"],
  I: ["FRA", "SEN", "IRQ", "NOR"],
  J: ["ARG", "ALG", "AUT", "JOR"],
  K: ["POR", "COD", "UZB", "COL"],
  L: ["GHA", "PAN", "ENG", "CRO"],
};

/* ---------------- Official 104 Matches ---------------- */
export const MATCHES: Match[] = [
  {
    id: "1",
    phase: "group",
    group: "A",
    matchday: 1,
    kickoffUTC: "2026-06-11T19:00:00Z",
    stadiumId: "azteca",
    homeCode: "MEX",
    awayCode: "RSA",
    homeScore: 2,
    awayScore: 0,
    status: "finished",
  },
  {
    id: "2",
    phase: "group",
    group: "A",
    matchday: 1,
    kickoffUTC: "2026-06-12T02:00:00Z",
    stadiumId: "akron",
    homeCode: "KOR",
    awayCode: "CZE",
    homeScore: 2,
    awayScore: 1,
    status: "finished",
  },
  {
    id: "3",
    phase: "group",
    group: "B",
    matchday: 1,
    kickoffUTC: "2026-06-12T19:00:00Z",
    stadiumId: "bmo",
    homeCode: "CAN",
    awayCode: "BIH",
    homeScore: 1,
    awayScore: 1,
    status: "finished",
  },
  {
    id: "4",
    phase: "group",
    group: "D",
    matchday: 1,
    kickoffUTC: "2026-06-13T01:00:00Z",
    stadiumId: "sofi",
    homeCode: "USA",
    awayCode: "PAR",
    homeScore: 4,
    awayScore: 1,
    status: "finished",
  },
  {
    id: "5",
    phase: "group",
    group: "C",
    matchday: 1,
    kickoffUTC: "2026-06-14T01:00:00Z",
    stadiumId: "gillette",
    homeCode: "HAI",
    awayCode: "SCO",
    homeScore: 0,
    awayScore: 1,
    status: "finished",
  },
  {
    id: "6",
    phase: "group",
    group: "D",
    matchday: 1,
    kickoffUTC: "2026-06-14T04:00:00Z",
    stadiumId: "bcplace",
    homeCode: "AUS",
    awayCode: "TUR",
    homeScore: 0,
    awayScore: 1,
    status: "finished",
  },
  {
    id: "7",
    phase: "group",
    group: "C",
    matchday: 1,
    kickoffUTC: "2026-06-13T22:00:00Z",
    stadiumId: "metlife",
    homeCode: "BRA",
    awayCode: "MAR",
    homeScore: 1,
    awayScore: 1,
    status: "finished",
  },
  {
    id: "8",
    phase: "group",
    group: "B",
    matchday: 1,
    kickoffUTC: "2026-06-13T19:00:00Z",
    stadiumId: "levis",
    homeCode: "QAT",
    awayCode: "SUI",
    homeScore: 1,
    awayScore: 1,
    status: "finished",
  },
  {
    id: "9",
    phase: "group",
    group: "E",
    matchday: 1,
    kickoffUTC: "2026-06-14T23:00:00Z",
    stadiumId: "lincoln",
    homeCode: "CIV",
    awayCode: "ECU",
    homeScore: 1,
    awayScore: 0,
    status: "finished",
  },
  {
    id: "10",
    phase: "group",
    group: "E",
    matchday: 1,
    kickoffUTC: "2026-06-14T17:00:00Z",
    stadiumId: "nrg",
    homeCode: "GER",
    awayCode: "CUW",
    homeScore: 7,
    awayScore: 1,
    status: "finished",
  },
  {
    id: "11",
    phase: "group",
    group: "F",
    matchday: 1,
    kickoffUTC: "2026-06-14T20:00:00Z",
    stadiumId: "att",
    homeCode: "NED",
    awayCode: "JPN",
    homeScore: 2,
    awayScore: 1,
    status: "finished",
  },
  {
    id: "12",
    phase: "group",
    group: "F",
    matchday: 1,
    kickoffUTC: "2026-06-15T02:00:00Z",
    stadiumId: "bbva",
    homeCode: "SWE",
    awayCode: "TUN",
    homeScore: 5,
    awayScore: 1,
    status: "finished",
  },
  {
    id: "13",
    phase: "group",
    group: "H",
    matchday: 1,
    kickoffUTC: "2026-06-15T22:00:00Z",
    stadiumId: "hardrock",
    homeCode: "KSA",
    awayCode: "URU",
    homeScore: 1,
    awayScore: 1,
    status: "finished",
  },
  {
    id: "14",
    phase: "group",
    group: "H",
    matchday: 1,
    kickoffUTC: "2026-06-15T16:00:00Z",
    stadiumId: "mb",
    homeCode: "ESP",
    awayCode: "CPV",
    homeScore: 0,
    awayScore: 0,
    status: "finished",
  },
  {
    id: "15",
    phase: "group",
    group: "G",
    matchday: 1,
    kickoffUTC: "2026-06-16T01:00:00Z",
    stadiumId: "sofi",
    homeCode: "IRN",
    awayCode: "NZL",
    homeScore: 2,
    awayScore: 2,
    status: "finished",
  },
  {
    id: "16",
    phase: "group",
    group: "G",
    matchday: 1,
    kickoffUTC: "2026-06-15T19:00:00Z",
    stadiumId: "lumen",
    homeCode: "BEL",
    awayCode: "EGY",
    homeScore: 1,
    awayScore: 1,
    status: "finished",
  },
  {
    id: "17",
    phase: "group",
    group: "I",
    matchday: 1,
    kickoffUTC: "2026-06-16T19:00:00Z",
    stadiumId: "metlife",
    homeCode: "FRA",
    awayCode: "SEN",
    homeScore: 3,
    awayScore: 1,
    status: "finished",
  },
  {
    id: "18",
    phase: "group",
    group: "I",
    matchday: 1,
    kickoffUTC: "2026-06-16T22:00:00Z",
    stadiumId: "gillette",
    homeCode: "IRQ",
    awayCode: "NOR",
    homeScore: 1,
    awayScore: 4,
    status: "finished",
  },
  {
    id: "19",
    phase: "group",
    group: "J",
    matchday: 1,
    kickoffUTC: "2026-06-17T01:00:00Z",
    stadiumId: "arrowhead",
    homeCode: "ARG",
    awayCode: "ALG",
    homeScore: 3,
    awayScore: 0,
    status: "finished",
  },
  {
    id: "20",
    phase: "group",
    group: "J",
    matchday: 1,
    kickoffUTC: "2026-06-17T04:00:00Z",
    stadiumId: "levis",
    homeCode: "AUT",
    awayCode: "JOR",
    homeScore: 3,
    awayScore: 1,
    status: "finished",
  },
  {
    id: "21",
    phase: "group",
    group: "L",
    matchday: 1,
    kickoffUTC: "2026-06-17T23:00:00Z",
    stadiumId: "bmo",
    homeCode: "GHA",
    awayCode: "PAN",
    homeScore: 2,
    awayScore: 1,
    status: "finished",
  },
  {
    id: "22",
    phase: "group",
    group: "L",
    matchday: 1,
    kickoffUTC: "2026-06-17T20:00:00Z",
    stadiumId: "att",
    homeCode: "ENG",
    awayCode: "CRO",
    homeScore: 4,
    awayScore: 2,
    status: "finished",
  },
  {
    id: "23",
    phase: "group",
    group: "K",
    matchday: 1,
    kickoffUTC: "2026-06-17T17:00:00Z",
    stadiumId: "nrg",
    homeCode: "POR",
    awayCode: "COD",
    homeScore: 1,
    awayScore: 1,
    status: "finished",
  },
  {
    id: "24",
    phase: "group",
    group: "K",
    matchday: 1,
    kickoffUTC: "2026-06-18T02:00:00Z",
    stadiumId: "azteca",
    homeCode: "UZB",
    awayCode: "COL",
    homeScore: 1,
    awayScore: 3,
    status: "finished",
  },
  {
    id: "25",
    phase: "group",
    group: "A",
    matchday: 2,
    kickoffUTC: "2026-06-18T16:00:00Z",
    stadiumId: "mb",
    homeCode: "CZE",
    awayCode: "RSA",
    homeScore: 1,
    awayScore: 1,
    status: "finished",
  },
  {
    id: "26",
    phase: "group",
    group: "B",
    matchday: 2,
    kickoffUTC: "2026-06-18T19:00:00Z",
    stadiumId: "sofi",
    homeCode: "SUI",
    awayCode: "BIH",
    homeScore: 1,
    awayScore: 0,
    status: "finished",
  },
  {
    id: "27",
    phase: "group",
    group: "B",
    matchday: 2,
    kickoffUTC: "2026-06-18T22:00:00Z",
    stadiumId: "bcplace",
    homeCode: "CAN",
    awayCode: "QAT",
    homeScore: 6,
    awayScore: 0,
    status: "finished",
  },
  {
    id: "28",
    phase: "group",
    group: "A",
    matchday: 2,
    kickoffUTC: "2026-06-19T01:00:00Z",
    stadiumId: "akron",
    homeCode: "MEX",
    awayCode: "KOR",
    homeScore: 1,
    awayScore: 0,
    status: "finished",
  },
  {
    id: "29",
    phase: "group",
    group: "C",
    matchday: 2,
    kickoffUTC: "2026-06-20T01:00:00Z",
    stadiumId: "lincoln",
    homeCode: "BRA",
    awayCode: "HAI",
    homeScore: 3,
    awayScore: 0,
    status: "finished",
  },
  {
    id: "30",
    phase: "group",
    group: "C",
    matchday: 2,
    kickoffUTC: "2026-06-19T22:00:00Z",
    stadiumId: "gillette",
    homeCode: "SCO",
    awayCode: "MAR",
    homeScore: 0,
    awayScore: 1,
    status: "finished",
  },
  {
    id: "31",
    phase: "group",
    group: "D",
    matchday: 2,
    kickoffUTC: "2026-06-20T03:00:00Z",
    stadiumId: "levis",
    homeCode: "TUR",
    awayCode: "PAR",
    homeScore: 0,
    awayScore: 1,
    status: "finished",
  },
  {
    id: "32",
    phase: "group",
    group: "D",
    matchday: 2,
    kickoffUTC: "2026-06-19T19:00:00Z",
    stadiumId: "lumen",
    homeCode: "USA",
    awayCode: "AUS",
    homeScore: 2,
    awayScore: 0,
    status: "finished",
  },
  {
    id: "33",
    phase: "group",
    group: "E",
    matchday: 2,
    kickoffUTC: "2026-06-20T20:00:00Z",
    stadiumId: "bmo",
    homeCode: "GER",
    awayCode: "CIV",
    homeScore: 2,
    awayScore: 1,
    status: "finished",
  },
  {
    id: "34",
    phase: "group",
    group: "E",
    matchday: 2,
    kickoffUTC: "2026-06-21T00:00:00Z",
    stadiumId: "arrowhead",
    homeCode: "ECU",
    awayCode: "CUW",
    homeScore: 0,
    awayScore: 0,
    status: "finished",
  },
  {
    id: "35",
    phase: "group",
    group: "F",
    matchday: 2,
    kickoffUTC: "2026-06-20T17:00:00Z",
    stadiumId: "nrg",
    homeCode: "NED",
    awayCode: "SWE",
    homeScore: 2,
    awayScore: 1,
    status: "finished",
  },
  {
    id: "36",
    phase: "group",
    group: "F",
    matchday: 2,
    kickoffUTC: "2026-06-21T04:00:00Z",
    stadiumId: "bbva",
    homeCode: "TUN",
    awayCode: "JPN",
    homeScore: 0,
    awayScore: 4,
    status: "finished",
  },
  {
    id: "37",
    phase: "group",
    group: "H",
    matchday: 2,
    kickoffUTC: "2026-06-21T22:00:00Z",
    stadiumId: "hardrock",
    homeCode: "URU",
    awayCode: "CPV",
    homeScore: 2,
    awayScore: 0,
    status: "finished",
  },
  {
    id: "38",
    phase: "group",
    group: "H",
    matchday: 2,
    kickoffUTC: "2026-06-21T16:00:00Z",
    stadiumId: "mb",
    homeCode: "ESP",
    awayCode: "KSA",
    homeScore: 1,
    awayScore: 0,
    status: "finished",
  },
  {
    id: "39",
    phase: "group",
    group: "G",
    matchday: 2,
    kickoffUTC: "2026-06-21T19:00:00Z",
    stadiumId: "sofi",
    homeCode: "BEL",
    awayCode: "IRN",
    homeScore: 0,
    awayScore: 0,
    status: "finished",
  },
  {
    id: "40",
    phase: "group",
    group: "G",
    matchday: 2,
    kickoffUTC: "2026-06-22T01:00:00Z",
    stadiumId: "bcplace",
    homeCode: "NZL",
    awayCode: "EGY",
    homeScore: 1,
    awayScore: 3,
    status: "finished",
  },
  {
    id: "41",
    phase: "group",
    group: "I",
    matchday: 2,
    kickoffUTC: "2026-06-23T00:00:00Z",
    stadiumId: "metlife",
    homeCode: "NOR",
    awayCode: "SEN",
    homeScore: 3,
    awayScore: 2,
    status: "finished",
  },
  {
    id: "42",
    phase: "group",
    group: "I",
    matchday: 2,
    kickoffUTC: "2026-06-22T21:00:00Z",
    stadiumId: "lincoln",
    homeCode: "FRA",
    awayCode: "IRQ",
    homeScore: 3,
    awayScore: 0,
    status: "finished",
  },
  {
    id: "43",
    phase: "group",
    group: "J",
    matchday: 2,
    kickoffUTC: "2026-06-22T17:00:00Z",
    stadiumId: "att",
    homeCode: "ARG",
    awayCode: "AUT",
    homeScore: 2,
    awayScore: 0,
    status: "finished",
  },
  {
    id: "44",
    phase: "group",
    group: "J",
    matchday: 2,
    kickoffUTC: "2026-06-23T03:00:00Z",
    stadiumId: "levis",
    homeCode: "JOR",
    awayCode: "ALG",
    homeScore: 1,
    awayScore: 2,
    status: "finished",
  },
  {
    id: "45",
    phase: "group",
    group: "L",
    matchday: 2,
    kickoffUTC: "2026-06-23T20:00:00Z",
    stadiumId: "gillette",
    homeCode: "ENG",
    awayCode: "GHA",
    homeScore: 0,
    awayScore: 0,
    status: "finished",
  },
  {
    id: "46",
    phase: "group",
    group: "L",
    matchday: 2,
    kickoffUTC: "2026-06-23T23:00:00Z",
    stadiumId: "bmo",
    homeCode: "PAN",
    awayCode: "CRO",
    homeScore: 0,
    awayScore: 1,
    status: "finished",
  },
  {
    id: "47",
    phase: "group",
    group: "K",
    matchday: 2,
    kickoffUTC: "2026-06-23T17:00:00Z",
    stadiumId: "nrg",
    homeCode: "POR",
    awayCode: "UZB",
    homeScore: 5,
    awayScore: 0,
    status: "finished",
  },
  {
    id: "48",
    phase: "group",
    group: "K",
    matchday: 2,
    kickoffUTC: "2026-06-24T02:00:00Z",
    stadiumId: "akron",
    homeCode: "COL",
    awayCode: "COD",
    homeScore: 1,
    awayScore: 0,
    status: "finished",
  },
  {
    id: "49",
    phase: "group",
    group: "C",
    matchday: 3,
    kickoffUTC: "2026-06-24T22:00:00Z",
    stadiumId: "hardrock",
    homeCode: "SCO",
    awayCode: "BRA",
    homeScore: 0,
    awayScore: 3,
    status: "finished",
  },
  {
    id: "50",
    phase: "group",
    group: "C",
    matchday: 3,
    kickoffUTC: "2026-06-24T22:00:00Z",
    stadiumId: "mb",
    homeCode: "MAR",
    awayCode: "HAI",
    homeScore: 4,
    awayScore: 2,
    status: "finished",
  },
  {
    id: "51",
    phase: "group",
    group: "B",
    matchday: 3,
    kickoffUTC: "2026-06-24T19:00:00Z",
    stadiumId: "bcplace",
    homeCode: "SUI",
    awayCode: "CAN",
    homeScore: 2,
    awayScore: 1,
    status: "finished",
  },
  {
    id: "52",
    phase: "group",
    group: "B",
    matchday: 3,
    kickoffUTC: "2026-06-24T19:00:00Z",
    stadiumId: "lumen",
    homeCode: "BIH",
    awayCode: "QAT",
    homeScore: 2,
    awayScore: 0,
    status: "finished",
  },
  {
    id: "53",
    phase: "group",
    group: "A",
    matchday: 3,
    kickoffUTC: "2026-06-25T01:00:00Z",
    stadiumId: "azteca",
    homeCode: "CZE",
    awayCode: "MEX",
    homeScore: 0,
    awayScore: 2,
    status: "finished",
  },
  {
    id: "54",
    phase: "group",
    group: "A",
    matchday: 3,
    kickoffUTC: "2026-06-25T01:00:00Z",
    stadiumId: "bbva",
    homeCode: "RSA",
    awayCode: "KOR",
    homeScore: 1,
    awayScore: 0,
    status: "finished",
  },
  {
    id: "55",
    phase: "group",
    group: "E",
    matchday: 3,
    kickoffUTC: "2026-06-25T20:00:00Z",
    stadiumId: "lincoln",
    homeCode: "CUW",
    awayCode: "CIV",
    homeScore: 0,
    awayScore: 2,
    status: "finished",
  },
  {
    id: "56",
    phase: "group",
    group: "E",
    matchday: 3,
    kickoffUTC: "2026-06-25T20:00:00Z",
    stadiumId: "metlife",
    homeCode: "ECU",
    awayCode: "GER",
    homeScore: 2,
    awayScore: 1,
    status: "finished",
  },
  {
    id: "57",
    phase: "group",
    group: "F",
    matchday: 3,
    kickoffUTC: "2026-06-25T23:00:00Z",
    stadiumId: "att",
    homeCode: "JPN",
    awayCode: "SWE",
    homeScore: 1,
    awayScore: 1,
    status: "finished",
  },
  {
    id: "58",
    phase: "group",
    group: "F",
    matchday: 3,
    kickoffUTC: "2026-06-25T23:00:00Z",
    stadiumId: "arrowhead",
    homeCode: "TUN",
    awayCode: "NED",
    homeScore: 1,
    awayScore: 3,
    status: "finished",
  },
  {
    id: "59",
    phase: "group",
    group: "D",
    matchday: 3,
    kickoffUTC: "2026-06-26T02:00:00Z",
    stadiumId: "sofi",
    homeCode: "TUR",
    awayCode: "USA",
    homeScore: 3,
    awayScore: 2,
    status: "finished",
  },
  {
    id: "60",
    phase: "group",
    group: "D",
    matchday: 3,
    kickoffUTC: "2026-06-26T02:00:00Z",
    stadiumId: "levis",
    homeCode: "PAR",
    awayCode: "AUS",
    homeScore: 0,
    awayScore: 0,
    status: "finished",
  },
  {
    id: "61",
    phase: "group",
    group: "I",
    matchday: 3,
    kickoffUTC: "2026-06-26T19:00:00Z",
    stadiumId: "gillette",
    homeCode: "NOR",
    awayCode: "FRA",
    homeScore: 1,
    awayScore: 4,
    status: "finished",
  },
  {
    id: "62",
    phase: "group",
    group: "I",
    matchday: 3,
    kickoffUTC: "2026-06-26T19:00:00Z",
    stadiumId: "bmo",
    homeCode: "SEN",
    awayCode: "IRQ",
    homeScore: 5,
    awayScore: 0,
    status: "finished",
  },
  {
    id: "63",
    phase: "group",
    group: "G",
    matchday: 3,
    kickoffUTC: "2026-06-27T03:00:00Z",
    stadiumId: "lumen",
    homeCode: "EGY",
    awayCode: "IRN",
    homeScore: 1,
    awayScore: 1,
    status: "finished",
  },
  {
    id: "64",
    phase: "group",
    group: "G",
    matchday: 3,
    kickoffUTC: "2026-06-27T03:00:00Z",
    stadiumId: "bcplace",
    homeCode: "NZL",
    awayCode: "BEL",
    homeScore: 1,
    awayScore: 5,
    status: "finished",
  },
  {
    id: "65",
    phase: "group",
    group: "H",
    matchday: 3,
    kickoffUTC: "2026-06-27T00:00:00Z",
    stadiumId: "nrg",
    homeCode: "CPV",
    awayCode: "KSA",
    homeScore: 0,
    awayScore: 0,
    status: "finished",
  },
  {
    id: "66",
    phase: "group",
    group: "H",
    matchday: 3,
    kickoffUTC: "2026-06-27T00:00:00Z",
    stadiumId: "akron",
    homeCode: "URU",
    awayCode: "ESP",
    homeScore: 0,
    awayScore: 1,
    status: "finished",
  },
  {
    id: "67",
    phase: "group",
    group: "L",
    matchday: 3,
    kickoffUTC: "2026-06-27T21:00:00Z",
    stadiumId: "metlife",
    homeCode: "PAN",
    awayCode: "ENG",
    homeScore: 0,
    awayScore: 2,
    status: "finished",
  },
  {
    id: "68",
    phase: "group",
    group: "L",
    matchday: 3,
    kickoffUTC: "2026-06-27T21:00:00Z",
    stadiumId: "lincoln",
    homeCode: "CRO",
    awayCode: "GHA",
    homeScore: 2,
    awayScore: 1,
    status: "finished",
  },
  {
    id: "69",
    phase: "group",
    group: "J",
    matchday: 3,
    kickoffUTC: "2026-06-28T02:00:00Z",
    stadiumId: "arrowhead",
    homeCode: "ALG",
    awayCode: "AUT",
    homeScore: 3,
    awayScore: 3,
    status: "finished",
  },
  {
    id: "70",
    phase: "group",
    group: "J",
    matchday: 3,
    kickoffUTC: "2026-06-28T02:00:00Z",
    stadiumId: "att",
    homeCode: "JOR",
    awayCode: "ARG",
    homeScore: 1,
    awayScore: 3,
    status: "finished",
  },
  {
    id: "71",
    phase: "group",
    group: "K",
    matchday: 3,
    kickoffUTC: "2026-06-27T23:30:00Z",
    stadiumId: "hardrock",
    homeCode: "COL",
    awayCode: "POR",
    homeScore: 0,
    awayScore: 0,
    status: "finished",
  },
  {
    id: "72",
    phase: "group",
    group: "K",
    matchday: 3,
    kickoffUTC: "2026-06-27T23:30:00Z",
    stadiumId: "mb",
    homeCode: "COD",
    awayCode: "UZB",
    homeScore: 3,
    awayScore: 1,
    status: "finished",
  },
  {
    id: "73",
    phase: "r32",
    kickoffUTC: "2026-06-28T19:00:00Z",
    stadiumId: "sofi",
    homeCode: null,
    awayCode: null,
    homeScore: null,
    awayScore: null,
    status: "scheduled",
    placeholder: "Segundo Grupo A vs Segundo Grupo B",
  },
  {
    id: "74",
    phase: "r32",
    kickoffUTC: "2026-06-29T20:30:00Z",
    stadiumId: "gillette",
    homeCode: null,
    awayCode: null,
    homeScore: null,
    awayScore: null,
    status: "scheduled",
    placeholder: "Vencedor Grupo E vs Group A/B/C/D/F third place",
  },
  {
    id: "75",
    phase: "r32",
    kickoffUTC: "2026-06-30T01:00:00Z",
    stadiumId: "bbva",
    homeCode: null,
    awayCode: null,
    homeScore: null,
    awayScore: null,
    status: "scheduled",
    placeholder: "Vencedor Grupo F vs Segundo Grupo C",
  },
  {
    id: "76",
    phase: "r32",
    kickoffUTC: "2026-06-29T17:00:00Z",
    stadiumId: "nrg",
    homeCode: null,
    awayCode: null,
    homeScore: null,
    awayScore: null,
    status: "scheduled",
    placeholder: "Vencedor Grupo C vs Segundo Grupo F",
  },
  {
    id: "77",
    phase: "r32",
    kickoffUTC: "2026-06-30T21:00:00Z",
    stadiumId: "metlife",
    homeCode: null,
    awayCode: null,
    homeScore: null,
    awayScore: null,
    status: "scheduled",
    placeholder: "Vencedor Grupo I vs Group C/D/F/G/H third place",
  },
  {
    id: "78",
    phase: "r32",
    kickoffUTC: "2026-06-30T17:00:00Z",
    stadiumId: "att",
    homeCode: null,
    awayCode: null,
    homeScore: null,
    awayScore: null,
    status: "scheduled",
    placeholder: "Segundo Grupo E vs Segundo Grupo I",
  },
  {
    id: "79",
    phase: "r32",
    kickoffUTC: "2026-07-01T01:00:00Z",
    stadiumId: "azteca",
    homeCode: null,
    awayCode: null,
    homeScore: null,
    awayScore: null,
    status: "scheduled",
    placeholder: "Vencedor Grupo A vs Group C/E/F/H/I third place",
  },
  {
    id: "80",
    phase: "r32",
    kickoffUTC: "2026-07-01T16:00:00Z",
    stadiumId: "mb",
    homeCode: null,
    awayCode: null,
    homeScore: null,
    awayScore: null,
    status: "scheduled",
    placeholder: "Vencedor Grupo L vs Group E/H/I/J/K third place",
  },
  {
    id: "81",
    phase: "r32",
    kickoffUTC: "2026-07-02T00:00:00Z",
    stadiumId: "levis",
    homeCode: null,
    awayCode: null,
    homeScore: null,
    awayScore: null,
    status: "scheduled",
    placeholder: "Vencedor Grupo D vs Group B/E/F/I/J third place",
  },
  {
    id: "82",
    phase: "r32",
    kickoffUTC: "2026-07-01T20:00:00Z",
    stadiumId: "lumen",
    homeCode: null,
    awayCode: null,
    homeScore: null,
    awayScore: null,
    status: "scheduled",
    placeholder: "Vencedor Grupo G vs Group A/E/H/I/J third place",
  },
  {
    id: "83",
    phase: "r32",
    kickoffUTC: "2026-07-02T23:00:00Z",
    stadiumId: "bmo",
    homeCode: null,
    awayCode: null,
    homeScore: null,
    awayScore: null,
    status: "scheduled",
    placeholder: "Segundo Grupo K vs Segundo Grupo L",
  },
  {
    id: "84",
    phase: "r32",
    kickoffUTC: "2026-07-02T19:00:00Z",
    stadiumId: "sofi",
    homeCode: null,
    awayCode: null,
    homeScore: null,
    awayScore: null,
    status: "scheduled",
    placeholder: "Vencedor Grupo H vs Segundo Grupo J",
  },
  {
    id: "85",
    phase: "r32",
    kickoffUTC: "2026-07-03T03:00:00Z",
    stadiumId: "bcplace",
    homeCode: null,
    awayCode: null,
    homeScore: null,
    awayScore: null,
    status: "scheduled",
    placeholder: "Vencedor Grupo B vs Group E/F/G/I/J third place",
  },
  {
    id: "86",
    phase: "r32",
    kickoffUTC: "2026-07-03T22:00:00Z",
    stadiumId: "hardrock",
    homeCode: null,
    awayCode: null,
    homeScore: null,
    awayScore: null,
    status: "scheduled",
    placeholder: "Vencedor Grupo J vs Segundo Grupo H",
  },
  {
    id: "87",
    phase: "r32",
    kickoffUTC: "2026-07-04T01:30:00Z",
    stadiumId: "arrowhead",
    homeCode: null,
    awayCode: null,
    homeScore: null,
    awayScore: null,
    status: "scheduled",
    placeholder: "Vencedor Grupo K vs Group D/E/I/J/L third place",
  },
  {
    id: "88",
    phase: "r32",
    kickoffUTC: "2026-07-03T18:00:00Z",
    stadiumId: "att",
    homeCode: null,
    awayCode: null,
    homeScore: null,
    awayScore: null,
    status: "scheduled",
    placeholder: "Segundo Grupo D vs Segundo Grupo G",
  },
  {
    id: "89",
    phase: "r16",
    kickoffUTC: "2026-07-04T21:00:00Z",
    stadiumId: "lincoln",
    homeCode: null,
    awayCode: null,
    homeScore: null,
    awayScore: null,
    status: "scheduled",
    placeholder: "Vencedor Jogo 74 vs Vencedor Jogo 77",
  },
  {
    id: "90",
    phase: "r16",
    kickoffUTC: "2026-07-04T17:00:00Z",
    stadiumId: "nrg",
    homeCode: null,
    awayCode: null,
    homeScore: null,
    awayScore: null,
    status: "scheduled",
    placeholder: "Vencedor Jogo 73 vs Vencedor Jogo 75",
  },
  {
    id: "91",
    phase: "r16",
    kickoffUTC: "2026-07-05T20:00:00Z",
    stadiumId: "metlife",
    homeCode: null,
    awayCode: null,
    homeScore: null,
    awayScore: null,
    status: "scheduled",
    placeholder: "Vencedor Jogo 76 vs Vencedor Jogo 78",
  },
  {
    id: "92",
    phase: "r16",
    kickoffUTC: "2026-07-06T00:00:00Z",
    stadiumId: "azteca",
    homeCode: null,
    awayCode: null,
    homeScore: null,
    awayScore: null,
    status: "scheduled",
    placeholder: "Vencedor Jogo 79 vs Vencedor Jogo 80",
  },
  {
    id: "93",
    phase: "r16",
    kickoffUTC: "2026-07-06T19:00:00Z",
    stadiumId: "att",
    homeCode: null,
    awayCode: null,
    homeScore: null,
    awayScore: null,
    status: "scheduled",
    placeholder: "Vencedor Jogo 83 vs Vencedor Jogo 84",
  },
  {
    id: "94",
    phase: "r16",
    kickoffUTC: "2026-07-07T00:00:00Z",
    stadiumId: "lumen",
    homeCode: null,
    awayCode: null,
    homeScore: null,
    awayScore: null,
    status: "scheduled",
    placeholder: "Vencedor Jogo 81 vs Vencedor Jogo 82",
  },
  {
    id: "95",
    phase: "r16",
    kickoffUTC: "2026-07-07T16:00:00Z",
    stadiumId: "mb",
    homeCode: null,
    awayCode: null,
    homeScore: null,
    awayScore: null,
    status: "scheduled",
    placeholder: "Vencedor Jogo 86 vs Vencedor Jogo 88",
  },
  {
    id: "96",
    phase: "r16",
    kickoffUTC: "2026-07-07T20:00:00Z",
    stadiumId: "bcplace",
    homeCode: null,
    awayCode: null,
    homeScore: null,
    awayScore: null,
    status: "scheduled",
    placeholder: "Vencedor Jogo 85 vs Vencedor Jogo 87",
  },
  {
    id: "97",
    phase: "qf",
    kickoffUTC: "2026-07-09T20:00:00Z",
    stadiumId: "gillette",
    homeCode: null,
    awayCode: null,
    homeScore: null,
    awayScore: null,
    status: "scheduled",
    placeholder: "Vencedor Jogo 89 vs Vencedor Jogo 90",
  },
  {
    id: "98",
    phase: "qf",
    kickoffUTC: "2026-07-10T19:00:00Z",
    stadiumId: "sofi",
    homeCode: null,
    awayCode: null,
    homeScore: null,
    awayScore: null,
    status: "scheduled",
    placeholder: "Vencedor Jogo 93 vs Vencedor Jogo 94",
  },
  {
    id: "99",
    phase: "qf",
    kickoffUTC: "2026-07-11T21:00:00Z",
    stadiumId: "hardrock",
    homeCode: null,
    awayCode: null,
    homeScore: null,
    awayScore: null,
    status: "scheduled",
    placeholder: "Vencedor Jogo 91 vs Vencedor Jogo 92",
  },
  {
    id: "100",
    phase: "qf",
    kickoffUTC: "2026-07-12T01:00:00Z",
    stadiumId: "arrowhead",
    homeCode: null,
    awayCode: null,
    homeScore: null,
    awayScore: null,
    status: "scheduled",
    placeholder: "Vencedor Jogo 95 vs Vencedor Jogo 96",
  },
  {
    id: "101",
    phase: "sf",
    kickoffUTC: "2026-07-14T19:00:00Z",
    stadiumId: "att",
    homeCode: null,
    awayCode: null,
    homeScore: null,
    awayScore: null,
    status: "scheduled",
    placeholder: "Vencedor Jogo 97 vs Vencedor Jogo 98",
  },
  {
    id: "102",
    phase: "sf",
    kickoffUTC: "2026-07-15T19:00:00Z",
    stadiumId: "mb",
    homeCode: null,
    awayCode: null,
    homeScore: null,
    awayScore: null,
    status: "scheduled",
    placeholder: "Vencedor Jogo 99 vs Vencedor Jogo 100",
  },
  {
    id: "103",
    phase: "third",
    kickoffUTC: "2026-07-18T21:00:00Z",
    stadiumId: "hardrock",
    homeCode: null,
    awayCode: null,
    homeScore: null,
    awayScore: null,
    status: "scheduled",
    placeholder: "Perdedor Jogo 101 vs Perdedor Jogo 102",
  },
  {
    id: "104",
    phase: "final",
    kickoffUTC: "2026-07-19T19:00:00Z",
    stadiumId: "metlife",
    homeCode: null,
    awayCode: null,
    homeScore: null,
    awayScore: null,
    status: "scheduled",
    placeholder: "Vencedor Jogo 101 vs Vencedor Jogo 102",
  },
];

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

export function computeStandings(group: string, matches: Match[] = MATCHES): GroupStanding[] {
  const teams = GROUPS[group];
  const rows: Record<string, GroupStanding> = {};
  teams.forEach((t) => {
    rows[t] = { code: t, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0 };
  });
  matches
    .filter((m) => m.phase === "group" && m.group === group && m.status === "finished")
    .forEach((m) => {
      const h = rows[m.homeCode!];
      const a = rows[m.awayCode!];
      if (h && a) {
        h.played++;
        a.played++;
        h.gf += m.homeScore!;
        h.ga += m.awayScore!;
        a.gf += m.awayScore!;
        a.ga += m.homeScore!;
        if (m.homeScore! > m.awayScore!) {
          h.won++;
          h.pts += 3;
          a.lost++;
        } else if (m.homeScore! < m.awayScore!) {
          a.won++;
          a.pts += 3;
          h.lost++;
        } else {
          h.drawn++;
          a.drawn++;
          h.pts++;
          a.pts++;
        }
      }
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

/**
 * Returns mathematically clinched first/second place for each group.
 * - `first` is filled when a team's points exceed every other team's max possible points.
 * - `second` is filled when the top-2 are mathematically locked (1st clinched AND 2nd's
 *   points exceed every team outside the top-2's max possible points).
 */
export function getClinchedQualifiers(
  matches: Match[] = MATCHES,
): Record<string, { first?: string; second?: string; third?: string }> {
  const result: Record<string, { first?: string; second?: string; third?: string }> = {};
  for (const g of Object.keys(GROUPS)) {
    const standings = computeStandings(g, matches);
    const groupMatches = matches.filter((m) => m.phase === "group" && m.group === g);
    const groupFinished = groupMatches.every((m) => m.status === "finished");
    const remainingByTeam: Record<string, number> = {};
    GROUPS[g].forEach((t) => {
      remainingByTeam[t] = groupMatches.filter(
        (m) => m.status !== "finished" && (m.homeCode === t || m.awayCode === t),
      ).length;
    });
    const maxPossible = (code: string) => {
      const row = standings.find((s) => s.code === code);
      return (row?.pts ?? 0) + (remainingByTeam[code] ?? 0) * 3;
    };
    const obj: { first?: string; second?: string; third?: string } = {};
    const [first, second, third, fourth] = standings;
    if (groupFinished) {
      result[g] = { first: first?.code, second: second?.code, third: third?.code };
      continue;
    }
    if (first && standings.slice(1).every((s) => first.pts > maxPossible(s.code))) {
      obj.first = first.code;
    }
    if (
      first &&
      second &&
      third &&
      second.pts > maxPossible(third.code) &&
      (!fourth || second.pts > maxPossible(fourth.code))
    ) {
      // Top-2 locked. Only assign explicit 2nd when 1st is also locked, otherwise
      // we don't know which of the two takes 1st vs 2nd.
      if (obj.first === first.code) obj.second = second.code;
    }
    result[g] = obj;
  }
  return result;
}

export function getQualifiedThirdPlaces(matches: Match[] = MATCHES): Record<string, string> {
  const completedGroups = Object.keys(GROUPS).filter((g) =>
    matches
      .filter((m) => m.phase === "group" && m.group === g)
      .every((m) => m.status === "finished"),
  );

  if (completedGroups.length < Object.keys(GROUPS).length) return {};

  return completedGroups
    .map((group) => ({ group, row: computeStandings(group, matches)[2] }))
    .filter((entry): entry is { group: string; row: GroupStanding } => Boolean(entry.row))
    .sort(
      (a, b) =>
        b.row.pts - a.row.pts ||
        b.row.gd - a.row.gd ||
        b.row.gf - a.row.gf ||
        a.group.localeCompare(b.group),
    )
    .slice(0, 8)
    .reduce<Record<string, string>>((acc, entry) => {
      acc[entry.group] = entry.row.code;
      return acc;
    }, {});
}

/**
 * Resolves knockout placeholders ("Vencedor Grupo X" / "Segundo Grupo Y") into
 * homeCode/awayCode whenever the group qualifiers are mathematically clinched.
 * Third-place placeholders are left untouched (cross-group pairings depend on the
 * full ranking which only finalises after every group game).
 */
export function resolveKnockoutTeams(matches: Match[]): Match[] {
  const clinched = getClinchedQualifiers(matches);
  const qualifiedThirds = getQualifiedThirdPlaces(matches);
  const usedThirdGroups = new Set<string>();
  const resolveSide = (s: string): string | null => {
    const win = /Vencedor\s+Grupo\s+([A-L])/i.exec(s);
    if (win) return clinched[win[1].toUpperCase()]?.first ?? null;
    const sec = /Segundo\s+Grupo\s+([A-L])/i.exec(s);
    if (sec) return clinched[sec[1].toUpperCase()]?.second ?? null;
    const third = /Group\s+([A-L](?:\/[A-L])*)\s+third place/i.exec(s);
    if (third) {
      const allowedGroups = third[1].split("/").map((g) => g.toUpperCase());
      const group = allowedGroups.find((g) => qualifiedThirds[g] && !usedThirdGroups.has(g));
      if (!group) return null;
      usedThirdGroups.add(group);
      return qualifiedThirds[group];
    }
    return null;
  };
  return matches.map((m) => {
    if (m.phase !== "r32" || !m.placeholder) return m;
    if (m.homeCode && m.awayCode) return m;
    const parts = m.placeholder.split(/\s+vs\s+/i);
    if (parts.length !== 2) return m;
    const hc = m.homeCode ?? resolveSide(parts[0]);
    const ac = m.awayCode ?? resolveSide(parts[1]);
    if (hc === m.homeCode && ac === m.awayCode) return m;
    return { ...m, homeCode: hc, awayCode: ac };
  });
}
