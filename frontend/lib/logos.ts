/**
 * Local logo and banner path resolver.
 * All logos are stored locally in /public/logos/ and /public/banners/
 * to avoid CDN CORS / hotlinking issues with TheSportsDB.
 */

// NBA team short code mapping (teamId -> short code for file path)
const NBA_ID_TO_SHORT: Record<string, string> = {
  "134880": "atl",
  "134860": "bos",
  "134861": "bkn",
  "134881": "cha",
  "134871": "chi",
  "134872": "cle",
  "134885": "dal",
  "134888": "den",
  "134873": "det",
  "134865": "gsw",
  "134886": "hou",
  "134874": "ind",
  "134866": "lac",
  "134867": "lal",
  "134887": "mem",
  "134882": "mia",
  "134875": "mil",
  "134889": "min",
  "134883": "nop",
  "134862": "nyk",
  "134890": "okc",
  "134884": "orl",
  "134863": "phi",
  "134868": "phx",
  "134891": "por",
  "134869": "sac",
  "134878": "sas",
  "134864": "tor",
  "134892": "uta",
  "134879": "was",
};

// WNBA teams use their team id directly as filename
const WNBA_IDS = [
  "wnba-atl", "wnba-chi", "wnba-con", "wnba-dal", "wnba-ind",
  "wnba-lva", "wnba-la", "wnba-min", "wnba-ny", "wnba-phx",
  "wnba-sea", "wnba-was",
];

/**
 * Get the local logo path for any team.
 * Falls back to a placeholder for NCAA/G-League teams without generated logos.
 */
export function getTeamLogo(teamId: string, league?: string): string {
  // NBA teams
  const nbaShort = NBA_ID_TO_SHORT[teamId];
  if (nbaShort) {
    return `/logos/nba/${nbaShort}.jpg`;
  }

  // WNBA teams
  if (WNBA_IDS.includes(teamId)) {
    return `/logos/wnba/${teamId}.jpg`;
  }

  // For NCAA / G-League, return a generic basketball placeholder
  if (league === "NCAA") return "/logos/placeholder-ncaa.jpg";
  if (league === "G-League") return "/logos/placeholder-gleague.jpg";

  return "/logos/placeholder-basketball.jpg";
}

/**
 * Get the banner image path for team detail pages.
 * Supports NBA, WNBA, and NCAA teams.
 */
export function getTeamBanner(teamId: string): string {
  const nbaShort = NBA_ID_TO_SHORT[teamId];
  if (nbaShort) return `/banners/nba/${nbaShort}.jpg`;
  if (teamId.startsWith("wnba-")) return `/banners/wnba/${teamId}.jpg`;
  if (teamId.startsWith("ncaa-")) return `/banners/ncaa/${teamId}.jpg`;
  return "/banners/default.jpg";
}

/**
 * Get the short code for an NBA team by ID.
 */
export function getNbaShortCode(teamId: string): string | null {
  return NBA_ID_TO_SHORT[teamId] ?? null;
}
