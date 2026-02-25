// NestJS Backend - Main barrel export
// This is the entry point for all backend modules
// In full NestJS, this would be app.module.ts with @Module decorator
//
// Migration guide to standalone NestJS:
// 1. Install @nestjs/core, @nestjs/common, @nestjs/platform-express
// 2. Add decorators: @Injectable(), @Controller(), @Get(), @Param(), etc.
// 3. Create app.module.ts with @Module({ imports: [TeamsModule, StandingsModule, StatesModule] })
// 4. Create main.ts with NestFactory.create(AppModule)
// 5. Remove Next.js API proxy routes

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
