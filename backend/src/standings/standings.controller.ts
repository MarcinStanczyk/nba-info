// NestJS-style controller for Standings
// @Controller('standings') - uncomment when migrating to NestJS

import { standingsService, StandingsService } from "./standings.service";
import type {
  ConferenceStandingsDto,
  ChampionDto,
  StateChampionDto,
  LeagueOverviewDto,
  StandingDto,
} from "./standings.dto";

export class StandingsController {
  private service: StandingsService;

  constructor() {
    this.service = standingsService;
  }

  // @Get('east')
  getEastStandings(): ConferenceStandingsDto {
    return this.service.getEastStandings();
  }

  // @Get('west')
  getWestStandings(): ConferenceStandingsDto {
    return this.service.getWestStandings();
  }

  // @Get('all')
  getAllStandings(): StandingDto[] {
    return this.service.getAllStandings();
  }

  // @Get('champion')
  getNbaChampion(): ChampionDto {
    return this.service.getNbaChampion();
  }

  // @Get('state-champions')
  getStateChampions(): StateChampionDto[] {
    return this.service.getStateChampions();
  }

  // @Get('overview')
  getLeagueOverview(): LeagueOverviewDto {
    return this.service.getLeagueOverview();
  }
}

// Singleton instance
export const standingsController = new StandingsController();
