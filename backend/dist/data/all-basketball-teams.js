"use strict";
// All basketball teams across multiple leagues
// NBA teams are imported from nba-teams.ts
// WNBA, NCAA (top programs), and G-League teams are curated here
Object.defineProperty(exports, "__esModule", { value: true });
exports.leagueConfig = exports.gLeagueTeams = exports.ncaaTeams = exports.wnbaTeams = void 0;
exports.getAllTeamsForState = getAllTeamsForState;
// WNBA Teams (13 teams, 2024-2025 season)
exports.wnbaTeams = [
    { id: "wnba-atl", name: "Atlanta Dream", league: "WNBA", badge: "https://www.thesportsdb.com/images/media/team/badge/ihmgvi1660905834.png", city: "Atlanta", stateCode: "GA", conference: "East" },
    { id: "wnba-chi", name: "Chicago Sky", league: "WNBA", badge: "https://www.thesportsdb.com/images/media/team/badge/9vnx1q1660905866.png", city: "Chicago", stateCode: "IL", conference: "East" },
    { id: "wnba-con", name: "Connecticut Sun", league: "WNBA", badge: "https://www.thesportsdb.com/images/media/team/badge/4r3lvz1660905884.png", city: "Uncasville", stateCode: "CT", conference: "East" },
    { id: "wnba-dal", name: "Dallas Wings", league: "WNBA", badge: "https://www.thesportsdb.com/images/media/team/badge/6gmzgx1660905924.png", city: "Arlington", stateCode: "TX", conference: "West" },
    { id: "wnba-gsv", name: "Golden State Valkyries", league: "WNBA", badge: "", city: "San Francisco", stateCode: "CA", conference: "West" },
    { id: "wnba-ind", name: "Indiana Fever", league: "WNBA", badge: "https://www.thesportsdb.com/images/media/team/badge/m59yb41660905948.png", city: "Indianapolis", stateCode: "IN", conference: "East" },
    { id: "wnba-lva", name: "Las Vegas Aces", league: "WNBA", badge: "https://www.thesportsdb.com/images/media/team/badge/kbf68t1660905965.png", city: "Las Vegas", stateCode: "NV", conference: "West" },
    { id: "wnba-la", name: "Los Angeles Sparks", league: "WNBA", badge: "https://www.thesportsdb.com/images/media/team/badge/22xjzp1660905979.png", city: "Los Angeles", stateCode: "CA", conference: "West" },
    { id: "wnba-min", name: "Minnesota Lynx", league: "WNBA", badge: "https://www.thesportsdb.com/images/media/team/badge/g1vhu61660905997.png", city: "Minneapolis", stateCode: "MN", conference: "West" },
    { id: "wnba-ny", name: "New York Liberty", league: "WNBA", badge: "https://www.thesportsdb.com/images/media/team/badge/6d2jm81660906015.png", city: "Brooklyn", stateCode: "NY", conference: "East" },
    { id: "wnba-phx", name: "Phoenix Mercury", league: "WNBA", badge: "https://www.thesportsdb.com/images/media/team/badge/j02h8k1660906035.png", city: "Phoenix", stateCode: "AZ", conference: "West" },
    { id: "wnba-sea", name: "Seattle Storm", league: "WNBA", badge: "https://www.thesportsdb.com/images/media/team/badge/i65dom1660906059.png", city: "Seattle", stateCode: "WA", conference: "West" },
    { id: "wnba-was", name: "Washington Mystics", league: "WNBA", badge: "https://www.thesportsdb.com/images/media/team/badge/u8g8m41660906082.png", city: "Washington", stateCode: "DC", conference: "East" },
];
// Top NCAA Basketball Programs (curated, 1-3 per state, major programs)
exports.ncaaTeams = [
    // Alabama
    { id: "ncaa-ala", name: "Alabama Crimson Tide", league: "NCAA", badge: "", city: "Tuscaloosa", stateCode: "AL", conference: "SEC" },
    { id: "ncaa-aub", name: "Auburn Tigers", league: "NCAA", badge: "", city: "Auburn", stateCode: "AL", conference: "SEC" },
    // Arizona
    { id: "ncaa-azu", name: "Arizona Wildcats", league: "NCAA", badge: "", city: "Tucson", stateCode: "AZ", conference: "Big 12" },
    { id: "ncaa-asu", name: "Arizona State Sun Devils", league: "NCAA", badge: "", city: "Tempe", stateCode: "AZ", conference: "Big 12" },
    // Arkansas
    { id: "ncaa-ark", name: "Arkansas Razorbacks", league: "NCAA", badge: "", city: "Fayetteville", stateCode: "AR", conference: "SEC" },
    // California
    { id: "ncaa-ucla", name: "UCLA Bruins", league: "NCAA", badge: "", city: "Los Angeles", stateCode: "CA", conference: "Big Ten" },
    { id: "ncaa-usc", name: "USC Trojans", league: "NCAA", badge: "", city: "Los Angeles", stateCode: "CA", conference: "Big Ten" },
    { id: "ncaa-stan", name: "Stanford Cardinal", league: "NCAA", badge: "", city: "Stanford", stateCode: "CA", conference: "ACC" },
    // Colorado
    { id: "ncaa-col", name: "Colorado Buffaloes", league: "NCAA", badge: "", city: "Boulder", stateCode: "CO", conference: "Big 12" },
    // Connecticut
    { id: "ncaa-uconn", name: "UConn Huskies", league: "NCAA", badge: "", city: "Storrs", stateCode: "CT", conference: "Big East" },
    // DC
    { id: "ncaa-geo", name: "Georgetown Hoyas", league: "NCAA", badge: "", city: "Washington", stateCode: "DC", conference: "Big East" },
    // Florida
    { id: "ncaa-fla", name: "Florida Gators", league: "NCAA", badge: "", city: "Gainesville", stateCode: "FL", conference: "SEC" },
    { id: "ncaa-fsu", name: "Florida State Seminoles", league: "NCAA", badge: "", city: "Tallahassee", stateCode: "FL", conference: "ACC" },
    // Georgia
    { id: "ncaa-uga", name: "Georgia Bulldogs", league: "NCAA", badge: "", city: "Athens", stateCode: "GA", conference: "SEC" },
    // Hawaii
    { id: "ncaa-haw", name: "Hawaii Rainbow Warriors", league: "NCAA", badge: "", city: "Honolulu", stateCode: "HI", conference: "Big West" },
    // Idaho
    { id: "ncaa-bsu", name: "Boise State Broncos", league: "NCAA", badge: "", city: "Boise", stateCode: "ID", conference: "Mountain West" },
    // Illinois
    { id: "ncaa-illi", name: "Illinois Fighting Illini", league: "NCAA", badge: "", city: "Champaign", stateCode: "IL", conference: "Big Ten" },
    { id: "ncaa-nw", name: "Northwestern Wildcats", league: "NCAA", badge: "", city: "Evanston", stateCode: "IL", conference: "Big Ten" },
    // Indiana
    { id: "ncaa-ind", name: "Indiana Hoosiers", league: "NCAA", badge: "", city: "Bloomington", stateCode: "IN", conference: "Big Ten" },
    { id: "ncaa-pur", name: "Purdue Boilermakers", league: "NCAA", badge: "", city: "West Lafayette", stateCode: "IN", conference: "Big Ten" },
    { id: "ncaa-nd", name: "Notre Dame Fighting Irish", league: "NCAA", badge: "", city: "Notre Dame", stateCode: "IN", conference: "ACC" },
    // Iowa
    { id: "ncaa-iowa", name: "Iowa Hawkeyes", league: "NCAA", badge: "", city: "Iowa City", stateCode: "IA", conference: "Big Ten" },
    { id: "ncaa-isu", name: "Iowa State Cyclones", league: "NCAA", badge: "", city: "Ames", stateCode: "IA", conference: "Big 12" },
    // Kansas
    { id: "ncaa-ku", name: "Kansas Jayhawks", league: "NCAA", badge: "", city: "Lawrence", stateCode: "KS", conference: "Big 12" },
    { id: "ncaa-ksu", name: "Kansas State Wildcats", league: "NCAA", badge: "", city: "Manhattan", stateCode: "KS", conference: "Big 12" },
    // Kentucky
    { id: "ncaa-uk", name: "Kentucky Wildcats", league: "NCAA", badge: "", city: "Lexington", stateCode: "KY", conference: "SEC" },
    { id: "ncaa-lou", name: "Louisville Cardinals", league: "NCAA", badge: "", city: "Louisville", stateCode: "KY", conference: "ACC" },
    // Louisiana
    { id: "ncaa-lsu", name: "LSU Tigers", league: "NCAA", badge: "", city: "Baton Rouge", stateCode: "LA", conference: "SEC" },
    // Maryland
    { id: "ncaa-md", name: "Maryland Terrapins", league: "NCAA", badge: "", city: "College Park", stateCode: "MD", conference: "Big Ten" },
    // Massachusetts
    { id: "ncaa-bc", name: "Boston College Eagles", league: "NCAA", badge: "", city: "Chestnut Hill", stateCode: "MA", conference: "ACC" },
    // Michigan
    { id: "ncaa-mich", name: "Michigan Wolverines", league: "NCAA", badge: "", city: "Ann Arbor", stateCode: "MI", conference: "Big Ten" },
    { id: "ncaa-msu", name: "Michigan State Spartans", league: "NCAA", badge: "", city: "East Lansing", stateCode: "MI", conference: "Big Ten" },
    // Minnesota
    { id: "ncaa-umn", name: "Minnesota Golden Gophers", league: "NCAA", badge: "", city: "Minneapolis", stateCode: "MN", conference: "Big Ten" },
    // Mississippi
    { id: "ncaa-miss", name: "Ole Miss Rebels", league: "NCAA", badge: "", city: "Oxford", stateCode: "MS", conference: "SEC" },
    { id: "ncaa-msst", name: "Mississippi State Bulldogs", league: "NCAA", badge: "", city: "Starkville", stateCode: "MS", conference: "SEC" },
    // Missouri
    { id: "ncaa-miz", name: "Missouri Tigers", league: "NCAA", badge: "", city: "Columbia", stateCode: "MO", conference: "SEC" },
    // Montana
    { id: "ncaa-mont", name: "Montana Grizzlies", league: "NCAA", badge: "", city: "Missoula", stateCode: "MT", conference: "Big Sky" },
    // Nebraska
    { id: "ncaa-neb", name: "Nebraska Cornhuskers", league: "NCAA", badge: "", city: "Lincoln", stateCode: "NE", conference: "Big Ten" },
    // Nevada
    { id: "ncaa-unlv", name: "UNLV Rebels", league: "NCAA", badge: "", city: "Las Vegas", stateCode: "NV", conference: "Mountain West" },
    // New Jersey
    { id: "ncaa-rut", name: "Rutgers Scarlet Knights", league: "NCAA", badge: "", city: "Piscataway", stateCode: "NJ", conference: "Big Ten" },
    { id: "ncaa-shu", name: "Seton Hall Pirates", league: "NCAA", badge: "", city: "South Orange", stateCode: "NJ", conference: "Big East" },
    // New Mexico
    { id: "ncaa-unm", name: "New Mexico Lobos", league: "NCAA", badge: "", city: "Albuquerque", stateCode: "NM", conference: "Mountain West" },
    // New York
    { id: "ncaa-syr", name: "Syracuse Orange", league: "NCAA", badge: "", city: "Syracuse", stateCode: "NY", conference: "ACC" },
    { id: "ncaa-stj", name: "St. John's Red Storm", league: "NCAA", badge: "", city: "Queens", stateCode: "NY", conference: "Big East" },
    // North Carolina
    { id: "ncaa-unc", name: "UNC Tar Heels", league: "NCAA", badge: "", city: "Chapel Hill", stateCode: "NC", conference: "ACC" },
    { id: "ncaa-duke", name: "Duke Blue Devils", league: "NCAA", badge: "", city: "Durham", stateCode: "NC", conference: "ACC" },
    { id: "ncaa-ncst", name: "NC State Wolfpack", league: "NCAA", badge: "", city: "Raleigh", stateCode: "NC", conference: "ACC" },
    // North Dakota
    { id: "ncaa-ndsu", name: "North Dakota State Bison", league: "NCAA", badge: "", city: "Fargo", stateCode: "ND", conference: "Summit" },
    // Ohio
    { id: "ncaa-osu", name: "Ohio State Buckeyes", league: "NCAA", badge: "", city: "Columbus", stateCode: "OH", conference: "Big Ten" },
    { id: "ncaa-uc", name: "Cincinnati Bearcats", league: "NCAA", badge: "", city: "Cincinnati", stateCode: "OH", conference: "Big 12" },
    { id: "ncaa-day", name: "Dayton Flyers", league: "NCAA", badge: "", city: "Dayton", stateCode: "OH", conference: "A-10" },
    // Oklahoma
    { id: "ncaa-ou", name: "Oklahoma Sooners", league: "NCAA", badge: "", city: "Norman", stateCode: "OK", conference: "SEC" },
    { id: "ncaa-okst", name: "Oklahoma State Cowboys", league: "NCAA", badge: "", city: "Stillwater", stateCode: "OK", conference: "Big 12" },
    // Oregon
    { id: "ncaa-ore", name: "Oregon Ducks", league: "NCAA", badge: "", city: "Eugene", stateCode: "OR", conference: "Big Ten" },
    // Pennsylvania
    { id: "ncaa-nova", name: "Villanova Wildcats", league: "NCAA", badge: "", city: "Villanova", stateCode: "PA", conference: "Big East" },
    { id: "ncaa-pitt", name: "Pittsburgh Panthers", league: "NCAA", badge: "", city: "Pittsburgh", stateCode: "PA", conference: "ACC" },
    { id: "ncaa-penn", name: "Penn State Nittany Lions", league: "NCAA", badge: "", city: "State College", stateCode: "PA", conference: "Big Ten" },
    // Rhode Island
    { id: "ncaa-prov", name: "Providence Friars", league: "NCAA", badge: "", city: "Providence", stateCode: "RI", conference: "Big East" },
    // South Carolina
    { id: "ncaa-sc", name: "South Carolina Gamecocks", league: "NCAA", badge: "", city: "Columbia", stateCode: "SC", conference: "SEC" },
    // Tennessee
    { id: "ncaa-tenn", name: "Tennessee Volunteers", league: "NCAA", badge: "", city: "Knoxville", stateCode: "TN", conference: "SEC" },
    { id: "ncaa-mem", name: "Memphis Tigers", league: "NCAA", badge: "", city: "Memphis", stateCode: "TN", conference: "AAC" },
    // Texas
    { id: "ncaa-tex", name: "Texas Longhorns", league: "NCAA", badge: "", city: "Austin", stateCode: "TX", conference: "SEC" },
    { id: "ncaa-bay", name: "Baylor Bears", league: "NCAA", badge: "", city: "Waco", stateCode: "TX", conference: "Big 12" },
    { id: "ncaa-ttu", name: "Texas Tech Red Raiders", league: "NCAA", badge: "", city: "Lubbock", stateCode: "TX", conference: "Big 12" },
    // Utah
    { id: "ncaa-byu", name: "BYU Cougars", league: "NCAA", badge: "", city: "Provo", stateCode: "UT", conference: "Big 12" },
    { id: "ncaa-uta", name: "Utah Utes", league: "NCAA", badge: "", city: "Salt Lake City", stateCode: "UT", conference: "Big 12" },
    // Vermont
    { id: "ncaa-uvm", name: "Vermont Catamounts", league: "NCAA", badge: "", city: "Burlington", stateCode: "VT", conference: "America East" },
    // Virginia
    { id: "ncaa-uva", name: "Virginia Cavaliers", league: "NCAA", badge: "", city: "Charlottesville", stateCode: "VA", conference: "ACC" },
    { id: "ncaa-vt", name: "Virginia Tech Hokies", league: "NCAA", badge: "", city: "Blacksburg", stateCode: "VA", conference: "ACC" },
    // Washington
    { id: "ncaa-gon", name: "Gonzaga Bulldogs", league: "NCAA", badge: "", city: "Spokane", stateCode: "WA", conference: "WCC" },
    { id: "ncaa-uw", name: "Washington Huskies", league: "NCAA", badge: "", city: "Seattle", stateCode: "WA", conference: "Big Ten" },
    // West Virginia
    { id: "ncaa-wvu", name: "West Virginia Mountaineers", league: "NCAA", badge: "", city: "Morgantown", stateCode: "WV", conference: "Big 12" },
    // Wisconsin
    { id: "ncaa-wisc", name: "Wisconsin Badgers", league: "NCAA", badge: "", city: "Madison", stateCode: "WI", conference: "Big Ten" },
    { id: "ncaa-marq", name: "Marquette Golden Eagles", league: "NCAA", badge: "", city: "Milwaukee", stateCode: "WI", conference: "Big East" },
    // Wyoming
    { id: "ncaa-wyo", name: "Wyoming Cowboys", league: "NCAA", badge: "", city: "Laramie", stateCode: "WY", conference: "Mountain West" },
];
// NBA G-League notable affiliate teams
exports.gLeagueTeams = [
    { id: "gl-scl", name: "Santa Cruz Warriors", league: "G-League", badge: "", city: "Santa Cruz", stateCode: "CA", conference: "West" },
    { id: "gl-slc", name: "Salt Lake City Stars", league: "G-League", badge: "", city: "Salt Lake City", stateCode: "UT", conference: "West" },
    { id: "gl-okc", name: "OKC Blue", league: "G-League", badge: "", city: "Oklahoma City", stateCode: "OK", conference: "West" },
    { id: "gl-tex", name: "Texas Legends", league: "G-League", badge: "", city: "Frisco", stateCode: "TX", conference: "West" },
    { id: "gl-rgv", name: "Rio Grande Valley Vipers", league: "G-League", badge: "", city: "Edinburg", stateCode: "TX", conference: "West" },
    { id: "gl-aus", name: "Austin Spurs", league: "G-League", badge: "", city: "Austin", stateCode: "TX", conference: "West" },
    { id: "gl-sbl", name: "South Bay Lakers", league: "G-League", badge: "", city: "El Segundo", stateCode: "CA", conference: "West" },
    { id: "gl-stk", name: "Stockton Kings", league: "G-League", badge: "", city: "Stockton", stateCode: "CA", conference: "West" },
    { id: "gl-osh", name: "Osceola Magic", league: "G-League", badge: "", city: "Kissimmee", stateCode: "FL", conference: "East" },
    { id: "gl-cle", name: "Cleveland Charge", league: "G-League", badge: "", city: "Cleveland", stateCode: "OH", conference: "East" },
    { id: "gl-wis", name: "Wisconsin Herd", league: "G-League", badge: "", city: "Oshkosh", stateCode: "WI", conference: "East" },
    { id: "gl-ind", name: "Indiana Mad Ants", league: "G-League", badge: "", city: "Indianapolis", stateCode: "IN", conference: "East" },
    { id: "gl-mai", name: "Maine Celtics", league: "G-League", badge: "", city: "Portland", stateCode: "ME", conference: "East" },
    { id: "gl-wes", name: "Westchester Knicks", league: "G-League", badge: "", city: "Tarrytown", stateCode: "NY", conference: "East" },
    { id: "gl-del", name: "Delaware Blue Coats", league: "G-League", badge: "", city: "Wilmington", stateCode: "DE", conference: "East" },
    { id: "gl-gre", name: "Greensboro Swarm", league: "G-League", badge: "", city: "Greensboro", stateCode: "NC", conference: "East" },
    { id: "gl-col", name: "College Park Skyhawks", league: "G-League", badge: "", city: "College Park", stateCode: "GA", conference: "East" },
    { id: "gl-bir", name: "Birmingham Squadron", league: "G-League", badge: "", city: "Birmingham", stateCode: "AL", conference: "East" },
    { id: "gl-rap", name: "Grand Rapids Gold", league: "G-League", badge: "", city: "Grand Rapids", stateCode: "MI", conference: "East" },
    { id: "gl-win", name: "Windy City Bulls", league: "G-League", badge: "", city: "Hoffman Estates", stateCode: "IL", conference: "East" },
    { id: "gl-sky", name: "Sioux Falls Skyforce", league: "G-League", badge: "", city: "Sioux Falls", stateCode: "SD", conference: "West" },
    { id: "gl-mem", name: "Memphis Hustle", league: "G-League", badge: "", city: "Memphis", stateCode: "TN", conference: "West" },
];
// Helper to get all basketball teams for a state
function getAllTeamsForState(stateCode) {
    const code = stateCode.toUpperCase();
    return [
        ...exports.wnbaTeams.filter((t) => t.stateCode === code),
        ...exports.ncaaTeams.filter((t) => t.stateCode === code),
        ...exports.gLeagueTeams.filter((t) => t.stateCode === code),
    ];
}
// League badge color configuration
exports.leagueConfig = {
    NBA: { color: "text-[#F58426]", bg: "bg-[#F58426]/15", border: "border-[#F58426]/30", label: "NBA" },
    WNBA: { color: "text-[#c084fc]", bg: "bg-[#c084fc]/15", border: "border-[#c084fc]/30", label: "WNBA" },
    NCAA: { color: "text-[#4ade80]", bg: "bg-[#4ade80]/15", border: "border-[#4ade80]/30", label: "NCAA" },
    "G-League": { color: "text-[#94a3b8]", bg: "bg-[#94a3b8]/15", border: "border-[#94a3b8]/30", label: "G-League" },
};
