"use strict";
// NestJS-style service with @Injectable pattern
// Ready for migration to standalone NestJS server
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamsService = exports.TeamsService = void 0;
const nba_teams_1 = require("../data/nba-teams");
const us_states_1 = require("../data/us-states");
// @Injectable() - uncomment when migrating to NestJS
class TeamsService {
    getAllTeams() {
        return nba_teams_1.nbaTeams;
    }
    getTeamById(id) {
        return nba_teams_1.nbaTeams.find((team) => team.id === id);
    }
    getTeamsByState(stateCode) {
        const upperCode = stateCode.toUpperCase();
        const stateInfo = us_states_1.statesWithNbaTeams[upperCode];
        if (!stateInfo) {
            return null;
        }
        const teams = nba_teams_1.nbaTeams.filter((team) => team.stateCode === upperCode);
        return {
            stateCode: upperCode,
            stateName: stateInfo.name,
            teams,
            teamCount: teams.length,
        };
    }
    getTeamsByConference(conference) {
        return nba_teams_1.nbaTeams.filter((team) => team.conference.toLowerCase() === conference.toLowerCase());
    }
    searchTeams(query) {
        const lowerQuery = query.toLowerCase();
        return nba_teams_1.nbaTeams.filter((team) => team.name.toLowerCase().includes(lowerQuery) ||
            team.shortName.toLowerCase().includes(lowerQuery) ||
            team.location.toLowerCase().includes(lowerQuery));
    }
}
exports.TeamsService = TeamsService;
// Singleton instance for use via Next.js proxy routes
exports.teamsService = new TeamsService();
