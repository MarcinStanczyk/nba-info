"use strict";
// NestJS-style service for standings data
// Ready for migration to standalone NestJS server
Object.defineProperty(exports, "__esModule", { value: true });
exports.standingsService = exports.StandingsService = void 0;
const nba_teams_1 = require("../data/nba-teams");
const nba_standings_1 = require("../data/nba-standings");
const us_states_1 = require("../data/us-states");
// @Injectable() - uncomment when migrating to NestJS
class StandingsService {
    getEastStandings() {
        return {
            conference: "Eastern Conference",
            standings: nba_standings_1.eastStandings,
        };
    }
    getWestStandings() {
        return {
            conference: "Western Conference",
            standings: nba_standings_1.westStandings,
        };
    }
    getAllStandings() {
        const all = [...nba_standings_1.eastStandings, ...nba_standings_1.westStandings].sort((a, b) => b.pct - a.pct);
        return all.map((s, i) => ({ ...s, rank: i + 1 }));
    }
    getNbaChampion() {
        return nba_standings_1.nbaChampion;
    }
    getStateChampions() {
        const allStandings = [...nba_standings_1.eastStandings, ...nba_standings_1.westStandings];
        const stateChampions = [];
        for (const [code, stateInfo] of Object.entries(us_states_1.statesWithNbaTeams)) {
            // Find all teams from this state in standings
            const stateTeams = nba_teams_1.nbaTeams.filter((t) => t.stateCode === code);
            const stateStandings = stateTeams
                .map((t) => {
                const standing = allStandings.find((s) => s.teamId === t.id);
                return standing || null;
            })
                .filter((s) => s !== null)
                .sort((a, b) => b.wins - a.wins);
            if (stateStandings.length > 0) {
                stateChampions.push({
                    stateCode: code,
                    stateName: stateInfo.name,
                    champion: stateStandings[0],
                    otherTeams: stateStandings.slice(1),
                });
            }
        }
        return stateChampions.sort((a, b) => b.champion.wins - a.champion.wins);
    }
    getLeagueOverview() {
        return {
            nbaChampion: this.getNbaChampion(),
            eastStandings: nba_standings_1.eastStandings,
            westStandings: nba_standings_1.westStandings,
            stateChampions: this.getStateChampions(),
        };
    }
}
exports.StandingsService = StandingsService;
// Singleton instance for use via Next.js proxy routes
exports.standingsService = new StandingsService();
