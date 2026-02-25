// NestJS-style service with @Injectable pattern
// Ready for migration to standalone NestJS server

import { nbaTeams } from "../data/nba-teams";
import { statesWithNbaTeams } from "../data/us-states";
import type { TeamDto, TeamsByStateDto } from "./teams.dto";

// @Injectable() - uncomment when migrating to NestJS
export class TeamsService {
  getAllTeams(): TeamDto[] {
    return nbaTeams;
  }

  getTeamById(id: string): TeamDto | undefined {
    return nbaTeams.find((team) => team.id === id);
  }

  getTeamsByState(stateCode: string): TeamsByStateDto | null {
    const upperCode = stateCode.toUpperCase();
    const stateInfo = statesWithNbaTeams[upperCode];

    if (!stateInfo) {
      return null;
    }

    const teams = nbaTeams.filter((team) => team.stateCode === upperCode);

    return {
      stateCode: upperCode,
      stateName: stateInfo.name,
      teams,
      teamCount: teams.length,
    };
  }

  getTeamsByConference(conference: "East" | "West"): TeamDto[] {
    return nbaTeams.filter(
      (team) => team.conference.toLowerCase() === conference.toLowerCase()
    );
  }

  searchTeams(query: string): TeamDto[] {
    const lowerQuery = query.toLowerCase();
    return nbaTeams.filter(
      (team) =>
        team.name.toLowerCase().includes(lowerQuery) ||
        team.shortName.toLowerCase().includes(lowerQuery) ||
        team.location.toLowerCase().includes(lowerQuery)
    );
  }
}

// Singleton instance for use via Next.js proxy routes
export const teamsService = new TeamsService();
