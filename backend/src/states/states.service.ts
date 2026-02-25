// NestJS-style service for US States data
// Ready for migration to standalone NestJS server

import { usStates, statesWithNbaTeams, nbaStatesCodes } from "../data/us-states";
import type { StateDto, AllStatesDto } from "./states.dto";

// @Injectable() - uncomment when migrating to NestJS
export class StatesService {
  getAllStates(): AllStatesDto {
    const allStates: StateDto[] = Object.entries(usStates).map(([code, name]) => {
      const nbaInfo = statesWithNbaTeams[code];
      return {
        code,
        name,
        hasNbaTeams: !!nbaInfo,
        teamCount: nbaInfo?.teamCount || 0,
        teamNames: nbaInfo?.teams || [],
      };
    });

    const statesWithTeams = allStates.filter((s) => s.hasNbaTeams);

    return {
      states: allStates,
      statesWithTeams,
      totalTeams: statesWithTeams.reduce((sum, s) => sum + s.teamCount, 0),
    };
  }

  getStateByCode(code: string): StateDto | null {
    const upperCode = code.toUpperCase();
    const name = usStates[upperCode];
    if (!name) return null;

    const nbaInfo = statesWithNbaTeams[upperCode];
    return {
      code: upperCode,
      name,
      hasNbaTeams: !!nbaInfo,
      teamCount: nbaInfo?.teamCount || 0,
      teamNames: nbaInfo?.teams || [],
    };
  }

  getNbaStatesCodes(): string[] {
    return nbaStatesCodes;
  }
}

// Singleton instance for use via Next.js proxy routes
export const statesService = new StatesService();
