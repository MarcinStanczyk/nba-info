"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BootstrapController = void 0;
const common_1 = require("@nestjs/common");
const us_states_1 = require("../data/us-states");
const nba_teams_1 = require("../data/nba-teams");
const all_basketball_teams_1 = require("../data/all-basketball-teams");
const nba_standings_1 = require("../data/nba-standings");
const nba_dance_teams_1 = require("../data/nba-dance-teams");
const espn_roster_service_1 = require("../data/espn-roster-service");
const standings_1 = require("../standings");
let BootstrapController = class BootstrapController {
    health() {
        return { status: "ok" };
    }
    bootstrap() {
        return {
            usStates: us_states_1.usStates,
            statesWithNbaTeams: us_states_1.statesWithNbaTeams,
            nbaStatesCodes: us_states_1.nbaStatesCodes,
            nonNbaBasketballStates: us_states_1.nonNbaBasketballStates,
            nbaTeams: nba_teams_1.nbaTeams,
            wnbaTeams: all_basketball_teams_1.wnbaTeams,
            ncaaTeams: all_basketball_teams_1.ncaaTeams,
            gLeagueTeams: all_basketball_teams_1.gLeagueTeams,
            eastStandings: nba_standings_1.eastStandings,
            westStandings: nba_standings_1.westStandings,
            nbaChampion: nba_standings_1.nbaChampion,
            stateChampions: standings_1.standingsController.getStateChampions(),
            nbaDanceTeams: nba_dance_teams_1.nbaDanceTeams,
        };
    }
    async roster(teamId) {
        return (0, espn_roster_service_1.fetchEspnRoster)(teamId);
    }
};
exports.BootstrapController = BootstrapController;
__decorate([
    (0, common_1.Get)("health"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BootstrapController.prototype, "health", null);
__decorate([
    (0, common_1.Get)("api/bootstrap"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BootstrapController.prototype, "bootstrap", null);
__decorate([
    (0, common_1.Get)("api/roster/:teamId"),
    __param(0, (0, common_1.Param)("teamId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BootstrapController.prototype, "roster", null);
exports.BootstrapController = BootstrapController = __decorate([
    (0, common_1.Controller)()
], BootstrapController);
