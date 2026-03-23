import { Controller, Get, Param } from "@nestjs/common";
import {
  usStates,
  statesWithNbaTeams,
  nbaStatesCodes,
  nonNbaBasketballStates,
} from "../data/us-states";
import { nbaTeams } from "../data/nba-teams";
import { wnbaTeams, ncaaTeams, gLeagueTeams } from "../data/all-basketball-teams";
import { eastStandings, westStandings, nbaChampion } from "../data/nba-standings";
import { nbaDanceTeams } from "../data/nba-dance-teams";
import { fetchEspnRoster } from "../data/espn-roster-service";
import { standingsController } from "../standings";
import { championPredictorService } from "./champion-predictor.service";

@Controller()
export class BootstrapController {
  @Get("health")
  health() {
    return { status: "ok" };
  }

  @Get("api/bootstrap")
  bootstrap() {
    return {
      usStates,
      statesWithNbaTeams,
      nbaStatesCodes,
      nonNbaBasketballStates,
      nbaTeams,
      wnbaTeams,
      ncaaTeams,
      gLeagueTeams,
      eastStandings,
      westStandings,
      nbaChampion,
      stateChampions: standingsController.getStateChampions(),
      nbaDanceTeams,
    };
  }

  @Get("api/roster/:teamId")
  async roster(@Param("teamId") teamId: string) {
    return fetchEspnRoster(teamId);
  }

  @Get("api/champion/calculate")
  async calculateChampion() {
    return championPredictorService.calculateChampion();
  }
}