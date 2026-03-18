"use strict";
// NestJS-style controller for Standings
// @Controller('standings') - uncomment when migrating to NestJS
Object.defineProperty(exports, "__esModule", { value: true });
exports.standingsController = exports.StandingsController = void 0;
const standings_service_1 = require("./standings.service");
class StandingsController {
    service;
    constructor() {
        this.service = standings_service_1.standingsService;
    }
    // @Get('east')
    getEastStandings() {
        return this.service.getEastStandings();
    }
    // @Get('west')
    getWestStandings() {
        return this.service.getWestStandings();
    }
    // @Get('all')
    getAllStandings() {
        return this.service.getAllStandings();
    }
    // @Get('champion')
    getNbaChampion() {
        return this.service.getNbaChampion();
    }
    // @Get('state-champions')
    getStateChampions() {
        return this.service.getStateChampions();
    }
    // @Get('overview')
    getLeagueOverview() {
        return this.service.getLeagueOverview();
    }
}
exports.StandingsController = StandingsController;
// Singleton instance
exports.standingsController = new StandingsController();
