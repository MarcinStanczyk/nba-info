"use strict";
// NestJS-style service for US States data
// Ready for migration to standalone NestJS server
Object.defineProperty(exports, "__esModule", { value: true });
exports.statesService = exports.StatesService = void 0;
const us_states_1 = require("../data/us-states");
// @Injectable() - uncomment when migrating to NestJS
class StatesService {
    getAllStates() {
        const allStates = Object.entries(us_states_1.usStates).map(([code, name]) => {
            const nbaInfo = us_states_1.statesWithNbaTeams[code];
            return {
                code,
                name,
                hasNbaTeams: !!nbaInfo,
                teamCount: nbaInfo?.teamCount || 0,
                teamNames: nbaInfo?.teams || [],
            };
        });
        const statesWithTeams = allStates.filter((s) => s.hasNbaTeams);
        return {
            states: allStates,
            statesWithTeams,
            totalTeams: statesWithTeams.reduce((sum, s) => sum + s.teamCount, 0),
        };
    }
    getStateByCode(code) {
        const upperCode = code.toUpperCase();
        const name = us_states_1.usStates[upperCode];
        if (!name)
            return null;
        const nbaInfo = us_states_1.statesWithNbaTeams[upperCode];
        return {
            code: upperCode,
            name,
            hasNbaTeams: !!nbaInfo,
            teamCount: nbaInfo?.teamCount || 0,
            teamNames: nbaInfo?.teams || [],
        };
    }
    getNbaStatesCodes() {
        return us_states_1.nbaStatesCodes;
    }
}
exports.StatesService = StatesService;
// Singleton instance for use via Next.js proxy routes
exports.statesService = new StatesService();
