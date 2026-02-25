// Teams Module - barrel export
// @Module({ controllers: [TeamsController], providers: [TeamsService] })
export { TeamsService, teamsService } from "./teams.service";
export { TeamsController, teamsController } from "./teams.controller";
export type { TeamDto, TeamsByStateDto } from "./teams.dto";
