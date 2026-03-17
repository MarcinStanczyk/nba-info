import { BadRequestException, Controller, Get, Param } from "@nestjs/common";
import { standingsController } from "./index";

@Controller("api/standings")
export class StandingsHttpController {
  @Get()
  getOverview() {
    return standingsController.getLeagueOverview();
  }

  @Get("state-champions")
  getStateChampions() {
    return standingsController.getStateChampions();
  }

  @Get(":conference")
  getConference(@Param("conference") conference: string) {
    const lower = conference.toLowerCase();

    if (lower === "east") {
      return standingsController.getEastStandings();
    }

    if (lower === "west") {
      return standingsController.getWestStandings();
    }

    throw new BadRequestException("Invalid conference. Use 'east' or 'west'.");
  }
}