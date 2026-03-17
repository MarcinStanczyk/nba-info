// Backend domain barrel exports
// NestJS bootstrap lives in src/main.ts and src/app.module.ts

// Modules
export * from "./teams";
export * from "./standings";
export * from "./states";

// Data types
export type { NbaTeam } from "./data/nba-teams";
export type { StandingEntry } from "./data/nba-standings";
export type { StateInfo } from "./data/us-states";
export type { BasketballTeam, LeagueType } from "./data/all-basketball-teams";
export type { NbaPlayer, TeamRoster } from "./data/nba-rosters";
export type { DanceTeamInfo, DanceTeamMember } from "./data/nba-dance-teams";
export type { EspnPlayer } from "./data/espn-roster-service";
export { fetchEspnRoster } from "./data/espn-roster-service";
