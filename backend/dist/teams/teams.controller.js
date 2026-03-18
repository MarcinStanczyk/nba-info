"use strict";
// NestJS-style controller for Teams
// @Controller('teams') - uncomment when migrating to NestJS
// In v0 environment, methods are called directly by Next.js API proxy routes
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamsController = exports.TeamsController = void 0;
const teams_service_1 = require("./teams.service");
class TeamsController {
    // In full NestJS: constructor(private readonly teamsService: TeamsService) {}
    service;
    constructor() {
        this.service = teams_service_1.teamsService;
    }
    // @Get()
    getAllTeams() {
        return this.service.getAllTeams();
    }
    // @Get(':id')
    getTeamById(id) {
        return this.service.getTeamById(id);
    }
    // @Get('state/:stateCode')
    getTeamsByState(stateCode) {
        return this.service.getTeamsByState(stateCode);
    }
    // @Get('conference/:conference')
    getTeamsByConference(conference) {
        return this.service.getTeamsByConference(conference);
    }
    // @Get('search')
    searchTeams(query) {
        return this.service.searchTeams(query);
    }
}
exports.TeamsController = TeamsController;
// Singleton instance
exports.teamsController = new TeamsController();
