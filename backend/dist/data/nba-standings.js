"use strict";
// NBA Standings 2024-2025 season (final regular season)
Object.defineProperty(exports, "__esModule", { value: true });
exports.nbaChampion = exports.westStandings = exports.eastStandings = void 0;
exports.eastStandings = [
    { rank: 1, teamId: "134872", teamName: "Cleveland Cavaliers", conference: "East", division: "Central", wins: 64, losses: 18, pct: 0.780, badge: "https://www.thesportsdb.com/images/media/team/badge/a%5Dwrux1689091503.png" },
    { rank: 2, teamId: "134860", teamName: "Boston Celtics", conference: "East", division: "Atlantic", wins: 61, losses: 21, pct: 0.744, badge: "https://www.thesportsdb.com/images/media/team/badge/sswttv1691183927.png" },
    { rank: 3, teamId: "134862", teamName: "New York Knicks", conference: "East", division: "Atlantic", wins: 50, losses: 32, pct: 0.610, badge: "https://www.thesportsdb.com/images/media/team/badge/wyhpuf1511810435.png" },
    { rank: 4, teamId: "134874", teamName: "Indiana Pacers", conference: "East", division: "Central", wins: 49, losses: 33, pct: 0.598, badge: "https://www.thesportsdb.com/images/media/team/badge/v6jzgm1503741821.png" },
    { rank: 5, teamId: "134875", teamName: "Milwaukee Bucks", conference: "East", division: "Central", wins: 48, losses: 34, pct: 0.585, badge: "https://www.thesportsdb.com/images/media/team/badge/dmp1ad1689091486.png" },
    { rank: 6, teamId: "134873", teamName: "Detroit Pistons", conference: "East", division: "Central", wins: 44, losses: 38, pct: 0.537, badge: "https://www.thesportsdb.com/images/media/team/badge/2t2wq21689091497.png" },
    { rank: 7, teamId: "134884", teamName: "Orlando Magic", conference: "East", division: "Southeast", wins: 41, losses: 41, pct: 0.500, badge: "https://www.thesportsdb.com/images/media/team/badge/txuyrr1422492990.png" },
    { rank: 8, teamId: "134880", teamName: "Atlanta Hawks", conference: "East", division: "Southeast", wins: 40, losses: 42, pct: 0.488, badge: "https://www.thesportsdb.com/images/media/team/badge/q2a5wh1689091521.png" },
    { rank: 9, teamId: "134882", teamName: "Miami Heat", conference: "East", division: "Southeast", wins: 37, losses: 45, pct: 0.451, badge: "https://www.thesportsdb.com/images/media/team/badge/5v67x51547214763.png" },
    { rank: 10, teamId: "134871", teamName: "Chicago Bulls", conference: "East", division: "Central", wins: 36, losses: 46, pct: 0.439, badge: "https://www.thesportsdb.com/images/media/team/badge/yk74gq1689091515.png" },
    { rank: 11, teamId: "134861", teamName: "Brooklyn Nets", conference: "East", division: "Atlantic", wins: 26, losses: 56, pct: 0.317, badge: "https://www.thesportsdb.com/images/media/team/badge/h0dwny1600552068.png" },
    { rank: 12, teamId: "134863", teamName: "Philadelphia 76ers", conference: "East", division: "Atlantic", wins: 25, losses: 57, pct: 0.305, badge: "https://www.thesportsdb.com/images/media/team/badge/71545f1518464849.png" },
    { rank: 13, teamId: "134864", teamName: "Toronto Raptors", conference: "East", division: "Atlantic", wins: 25, losses: 57, pct: 0.305, badge: "https://www.thesportsdb.com/images/media/team/badge/ax36vz1689091536.png" },
    { rank: 14, teamId: "134881", teamName: "Charlotte Hornets", conference: "East", division: "Southeast", wins: 21, losses: 61, pct: 0.256, badge: "https://www.thesportsdb.com/images/media/team/badge/zjtl6g1689091685.png" },
    { rank: 15, teamId: "134879", teamName: "Washington Wizards", conference: "East", division: "Southeast", wins: 15, losses: 67, pct: 0.183, badge: "https://www.thesportsdb.com/images/media/team/badge/qlhgis1689091547.png" },
];
exports.westStandings = [
    { rank: 1, teamId: "134890", teamName: "Oklahoma City Thunder", conference: "West", division: "Northwest", wins: 68, losses: 14, pct: 0.829, badge: "https://www.thesportsdb.com/images/media/team/badge/xqtvvp1422380624.png" },
    { rank: 2, teamId: "134886", teamName: "Houston Rockets", conference: "West", division: "Southwest", wins: 52, losses: 30, pct: 0.634, badge: "https://www.thesportsdb.com/images/media/team/badge/yezpev1689091744.png" },
    { rank: 3, teamId: "134887", teamName: "Memphis Grizzlies", conference: "West", division: "Southwest", wins: 50, losses: 32, pct: 0.610, badge: "https://www.thesportsdb.com/images/media/team/badge/m64v1d1689091727.png" },
    { rank: 4, teamId: "134888", teamName: "Denver Nuggets", conference: "West", division: "Northwest", wins: 50, losses: 32, pct: 0.610, badge: "https://www.thesportsdb.com/images/media/team/badge/8o8j5k1546016274.png" },
    { rank: 5, teamId: "134885", teamName: "Dallas Mavericks", conference: "West", division: "Southwest", wins: 49, losses: 33, pct: 0.598, badge: "https://www.thesportsdb.com/images/media/team/badge/yqptxv1689091757.png" },
    { rank: 6, teamId: "134889", teamName: "Minnesota Timberwolves", conference: "West", division: "Northwest", wins: 49, losses: 33, pct: 0.598, badge: "https://www.thesportsdb.com/images/media/team/badge/5xpgjg1689091782.png" },
    { rank: 7, teamId: "134867", teamName: "Los Angeles Lakers", conference: "West", division: "Pacific", wins: 46, losses: 36, pct: 0.561, badge: "https://www.thesportsdb.com/images/media/team/badge/spa59p1689091693.png" },
    { rank: 8, teamId: "134866", teamName: "Los Angeles Clippers", conference: "West", division: "Pacific", wins: 42, losses: 40, pct: 0.512, badge: "https://www.thesportsdb.com/images/media/team/badge/jv7tf21545916958.png" },
    { rank: 9, teamId: "134865", teamName: "Golden State Warriors", conference: "West", division: "Pacific", wins: 42, losses: 40, pct: 0.512, badge: "https://www.thesportsdb.com/images/media/team/badge/irobi61565197527.png" },
    { rank: 10, teamId: "134869", teamName: "Sacramento Kings", conference: "West", division: "Pacific", wins: 39, losses: 43, pct: 0.476, badge: "https://www.thesportsdb.com/images/media/team/badge/5d7mhj1689091710.png" },
    { rank: 11, teamId: "134878", teamName: "San Antonio Spurs", conference: "West", division: "Southwest", wins: 38, losses: 44, pct: 0.463, badge: "https://www.thesportsdb.com/images/media/team/badge/bfrmp61689091769.png" },
    { rank: 12, teamId: "134868", teamName: "Phoenix Suns", conference: "West", division: "Pacific", wins: 36, losses: 46, pct: 0.439, badge: "https://www.thesportsdb.com/images/media/team/badge/2t2yss1689091701.png" },
    { rank: 13, teamId: "134891", teamName: "Portland Trail Blazers", conference: "West", division: "Northwest", wins: 27, losses: 55, pct: 0.329, badge: "https://www.thesportsdb.com/images/media/team/badge/mbtzin1689091789.png" },
    { rank: 14, teamId: "134883", teamName: "New Orleans Pelicans", conference: "West", division: "Southwest", wins: 25, losses: 57, pct: 0.305, badge: "https://www.thesportsdb.com/images/media/team/badge/f341s31523700397.png" },
    { rank: 15, teamId: "134892", teamName: "Utah Jazz", conference: "West", division: "Northwest", wins: 16, losses: 66, pct: 0.195, badge: "https://www.thesportsdb.com/images/media/team/badge/9p1e5t1572370890.png" },
];
exports.nbaChampion = {
    season: "2024-2025",
    teamName: "Oklahoma City Thunder",
    teamId: "134890",
    badge: "https://www.thesportsdb.com/images/media/team/badge/xqtvvp1422380624.png",
    conference: "West",
};
