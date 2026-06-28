import { TEAMS } from "@/lib/worldcup-data";

/**
 * ISO 3166-1 alpha-2 codes for every team in the tournament.
 * England + Scotland use flagcdn's UK subdivision codes (gb-eng / gb-sct).
 */
export const TEAM_ISO2: Record<string, string> = {
  ALG: "dz", ARG: "ar", AUS: "au", AUT: "at", BEL: "be", BIH: "ba", BRA: "br",
  CPV: "cv", CAN: "ca", COL: "co", COD: "cd", CIV: "ci", CRO: "hr", CUW: "cw",
  CZE: "cz", ECU: "ec", EGY: "eg", ENG: "gb-eng", FRA: "fr", GER: "de",
  GHA: "gh", HAI: "ht", IRN: "ir", IRQ: "iq", JPN: "jp", JOR: "jo", KOR: "kr",
  MEX: "mx", MAR: "ma", NED: "nl", NZL: "nz", NOR: "no", PAN: "pa", PAR: "py",
  POR: "pt", QAT: "qa", KSA: "sa", SCO: "gb-sct", SEN: "sn", RSA: "za",
  ESP: "es", SWE: "se", SUI: "ch", TUN: "tn", TUR: "tr", USA: "us", URU: "uy",
  UZB: "uz",
};

const SIZE_PRESET = {
  sm: { px: 20, w: 20 },
  md: { px: 32, w: 40 },
  lg: { px: 56, w: 80 },
  xl: { px: 88, w: 160 },
} as const;

type Size = keyof typeof SIZE_PRESET;

export function Flag({
  code,
  size = "md",
  className = "",
}: {
  code: string | null | undefined;
  size?: Size;
  className?: string;
}) {
  const team = code ? TEAMS[code] : null;
  const iso = code ? TEAM_ISO2[code] : null;
  const { px, w } = SIZE_PRESET[size];

  if (!iso) {
    return (
      <span
        aria-hidden
        className={`inline-grid place-items-center rounded-sm bg-muted text-xs ${className}`}
        style={{ width: px * 1.35, height: px }}
      >
        ⚽
      </span>
    );
  }

  return (
    <img
      src={`https://flagcdn.com/w${w}/${iso}.png`}
      srcSet={`https://flagcdn.com/w${w * 2}/${iso}.png 2x`}
      width={px * 1.35}
      height={px}
      alt={team?.name ? `Bandeira ${team.name}` : "Bandeira"}
      loading="lazy"
      className={`inline-block shrink-0 rounded-sm object-cover shadow-sm ring-1 ring-black/10 ${className}`}
      style={{ width: px * 1.35, height: px }}
    />
  );
}