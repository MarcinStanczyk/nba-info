// NestJS-style controller for Teams
// @Controller('teams') - uncomment when migrating to NestJS
// In v0 environment, methods are called directly by Next.js API proxy routes

import { teamsService, TeamsService } from "./teams.service";
import type { TeamDto, TeamsByStateDto } from "./teams.dto";

export class TeamsController {
  // In full NestJS: constructor(private readonly teamsService: TeamsService) {}
  private service: TeamsService;

  constructor() {
    this.service = teamsService;
  }

  // @Get()
  getAllTeams(): TeamDto[] {
    return this.service.getAllTeams();
  }

  // @Get(':id')
  getTeamById(id: string): TeamDto | undefined {
    return this.service.getTeamById(id);
  }

  // @Get('state/:stateCode')
  getTeamsByState(stateCode: string): TeamsByStateDto | null {
    return this.service.getTeamsByState(stateCode);
  }

  // @Get('conference/:conference')
  getTeamsByConference(conference: "East" | "West"): TeamDto[] {
    return this.service.getTeamsByConference(conference);
  }

  // @Get('search')
  searchTeams(query: string): TeamDto[] {
    return this.service.searchTeams(query);
  }
}

// Singleton instance
export const teamsController = new TeamsController();
