"use strict";
/**
 * Live ESPN roster fetcher.
 * Fetches real-time rosters from ESPN's public API for NBA, WNBA, and NCAA.
 * No API key needed -- same data as nba.com/espn.com.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchEspnRoster = fetchEspnRoster;
exports.hasEspnMapping = hasEspnMapping;
const nba_rosters_1 = require("./nba-rosters");
const nba_teams_1 = require("./nba-teams");
// Mapping: our TheSportsDB team ID -> ESPN team ID
const NBA_TSDB_TO_ESPN = {
    "134880": "1", // Atlanta Hawks
    "134860": "2", // Boston Celtics
    "134861": "17", // Brooklyn Nets
    "134881": "30", // Charlotte Hornets
    "134871": "4", // Chicago Bulls
    "134872": "5", // Cleveland Cavaliers
    "134885": "6", // Dallas Mavericks
    "134888": "7", // Denver Nuggets
    "134873": "8", // Detroit Pistons
    "134865": "9", // Golden State Warriors
    "134886": "10", // Houston Rockets
    "134874": "11", // Indiana Pacers
    "134866": "12", // LA Clippers
    "134867": "13", // LA Lakers
    "134887": "29", // Memphis Grizzlies
    "134882": "14", // Miami Heat
    "134875": "15", // Milwaukee Bucks
    "134889": "16", // Minnesota Timberwolves
    "134883": "3", // New Orleans Pelicans
    "134862": "18", // New York Knicks
    "134890": "25", // Oklahoma City Thunder
    "134884": "19", // Orlando Magic
    "134863": "20", // Philadelphia 76ers
    "134868": "21", // Phoenix Suns
    "134891": "22", // Portland Trail Blazers
    "134869": "23", // Sacramento Kings
    "134878": "24", // San Antonio Spurs
    "134864": "28", // Toronto Raptors
    "134892": "26", // Utah Jazz
    "134879": "27", // Washington Wizards
};
// WNBA: our team ID -> ESPN WNBA team ID
const WNBA_TO_ESPN = {
    "wnba-atl": "20", // Atlanta Dream
    "wnba-chi": "16", // Chicago Sky
    "wnba-con": "8", // Connecticut Sun
    "wnba-dal": "3", // Dallas Wings
    "wnba-gsv": "21", // Golden State Valkyries
    "wnba-ind": "5", // Indiana Fever
    "wnba-lva": "18", // Las Vegas Aces
    "wnba-la": "6", // Los Angeles Sparks
    "wnba-min": "9", // Minnesota Lynx
    "wnba-ny": "17", // New York Liberty
    "wnba-phx": "14", // Phoenix Mercury
    "wnba-sea": "19", // Seattle Storm
    "wnba-was": "15", // Washington Mystics
};
// NCAA: our team ID -> ESPN mens-college-basketball team ID
const NCAA_TO_ESPN = {
    "ncaa-ala": "333", "ncaa-aub": "2", "ncaa-azu": "12", "ncaa-asu": "9",
    "ncaa-ark": "8", "ncaa-ucla": "26", "ncaa-usc": "30", "ncaa-stan": "24",
    "ncaa-col": "38", "ncaa-uconn": "41", "ncaa-geo": "46", "ncaa-fla": "57",
    "ncaa-fsu": "52", "ncaa-uga": "61", "ncaa-haw": "62", "ncaa-bsu": "68",
    "ncaa-illi": "356", "ncaa-nw": "77", "ncaa-ind": "84", "ncaa-pur": "2509",
    "ncaa-nd": "87", "ncaa-iowa": "2294", "ncaa-isu": "66", "ncaa-ku": "2305",
    "ncaa-ksu": "2306", "ncaa-uk": "96", "ncaa-lou": "97", "ncaa-lsu": "99",
    "ncaa-md": "120", "ncaa-bc": "103", "ncaa-mich": "130", "ncaa-msu": "127",
    "ncaa-umn": "135", "ncaa-miss": "145", "ncaa-msst": "344", "ncaa-miz": "142",
    "ncaa-mont": "149", "ncaa-neb": "158", "ncaa-unlv": "2439", "ncaa-rut": "164",
    "ncaa-shu": "2550", "ncaa-unm": "167", "ncaa-syr": "183", "ncaa-stj": "2599",
    "ncaa-unc": "153", "ncaa-duke": "150", "ncaa-ncst": "152", "ncaa-ndsu": "2449",
    "ncaa-osu": "194", "ncaa-uc": "2132", "ncaa-day": "2168", "ncaa-ou": "201",
    "ncaa-okst": "197", "ncaa-ore": "2483", "ncaa-nova": "222", "ncaa-pitt": "221",
    "ncaa-penn": "213", "ncaa-prov": "2507", "ncaa-sc": "2579", "ncaa-tenn": "2633",
    "ncaa-mem": "235", "ncaa-tex": "251", "ncaa-bay": "239", "ncaa-ttu": "2641",
    "ncaa-byu": "252", "ncaa-uta": "254", "ncaa-uvm": "261", "ncaa-uva": "258",
    "ncaa-vt": "259", "ncaa-gon": "2250", "ncaa-uw": "264", "ncaa-wvu": "277",
    "ncaa-wisc": "275", "ncaa-marq": "269", "ncaa-wyo": "2751",
};
function getLeagueAndEspnId(teamId) {
    if (NBA_TSDB_TO_ESPN[teamId])
        return { league: "nba", espnId: NBA_TSDB_TO_ESPN[teamId] };
    if (WNBA_TO_ESPN[teamId])
        return { league: "wnba", espnId: WNBA_TO_ESPN[teamId] };
    if (NCAA_TO_ESPN[teamId])
        return { league: "ncaa", espnId: NCAA_TO_ESPN[teamId] };
    return null;
}
function getEspnUrl(league, espnId) {
    switch (league) {
        case "nba": return `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${espnId}/roster`;
        case "wnba": return `https://site.api.espn.com/apis/site/v2/sports/basketball/wnba/teams/${espnId}/roster`;
        case "ncaa": return `https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams/${espnId}/roster`;
    }
}
function parseAthletes(athletes) {
    return athletes
        .filter((a) => a.fullName || a.displayName)
        .map((a) => ({
        id: a.id,
        name: a.displayName || a.fullName,
        number: a.jersey || "--",
        position: a.position?.abbreviation || a.position?.displayName || "N/A",
        height: a.displayHeight || "N/A",
        weight: a.displayWeight || "N/A",
        age: a.age || 0,
        country: a.birthPlace?.country || "USA",
        college: a.college?.shortName || a.college?.name || "",
        imageUrl: a.headshot?.href || "",
        experience: a.experience?.years || 0,
    }))
        .sort((a, b) => {
        const posOrder = { PG: 1, SG: 2, G: 2, SF: 3, F: 3, PF: 4, C: 5 };
        const posA = posOrder[a.position] || 9;
        const posB = posOrder[b.position] || 9;
        if (posA !== posB)
            return posA - posB;
        return parseInt(a.number) - parseInt(b.number);
    });
}
function getStaticNbaRosterFallback(teamId) {
    const team = nba_teams_1.nbaTeams.find((t) => t.id === teamId);
    if (!team)
        return null;
    const rosterKey = team.shortName.toLowerCase();
    const fallback = nba_rosters_1.nbaRosters[rosterKey];
    if (!fallback || !Array.isArray(fallback.players) || fallback.players.length === 0) {
        return null;
    }
    return fallback.players.map((player) => ({
        ...player,
        experience: 0,
    }));
}
/**
 * Fetch live roster for any team (NBA/WNBA/NCAA) from ESPN API.
 * Returns null if the team ID isn't mapped or if the fetch fails.
 */
async function fetchEspnRoster(teamId) {
    const info = getLeagueAndEspnId(teamId);
    if (!info)
        return getStaticNbaRosterFallback(teamId);
    try {
        const res = await fetch(getEspnUrl(info.league, info.espnId));
        if (!res.ok)
            return getStaticNbaRosterFallback(teamId);
        const data = await res.json();
        if (!data.athletes || !Array.isArray(data.athletes) || data.athletes.length === 0) {
            return getStaticNbaRosterFallback(teamId);
        }
        return parseAthletes(data.athletes);
    }
    catch {
        return getStaticNbaRosterFallback(teamId);
    }
}
/**
 * Check if we have ESPN mapping for a given team ID.
 */
function hasEspnMapping(teamId) {
    return !!getLeagueAndEspnId(teamId);
}
