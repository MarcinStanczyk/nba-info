import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { teamsController, teamsService } from "./index";

@Controller("api/teams")
export class TeamsHttpController {
  @Get()
  getAllTeams() {
    return teamsController.getAllTeams();
  }

  @Get("state/:stateCode")
  getTeamsByState(@Param("stateCode") stateCode: string) {
    const result = teamsController.getTeamsByState(stateCode);
    if (!result) {
      throw new NotFoundException("State not found or has no NBA teams");
    }
    return result;
  }

  @Get(":id")
  getTeamById(@Param("id") id: string) {
    const team = teamsService.getTeamById(id);
    if (!team) {
      throw new NotFoundException("Team not found");
    }
    return team;
  }
}