// NestJS-style service for standings data
// Ready for migration to standalone NestJS server

import { nbaTeams } from "../data/nba-teams";
import {
  eastStandings,
  westStandings,
  nbaChampion,
} from "../data/nba-standings";
import { statesWithNbaTeams } from "../data/us-states";
import type {
  StandingDto,
  ConferenceStandingsDto,
  ChampionDto,
  StateChampionDto,
  LeagueOverviewDto,
} from "./standings.dto";

// @Injectable() - uncomment when migrating to NestJS
export class StandingsService {
  getEastStandings(): ConferenceStandingsDto {
    return {
      conference: "Eastern Conference",
      standings: eastStandings,
    };
  }

  getWestStandings(): ConferenceStandingsDto {
    return {
      conference: "Western Conference",
      standings: westStandings,
    };
  }

  getAllStandings(): StandingDto[] {
    const all = [...eastStandings, ...westStandings].sort(
      (a, b) => b.pct - a.pct
    );
    return all.map((s, i) => ({ ...s, rank: i + 1 }));
  }

  getNbaChampion(): ChampionDto {
    return nbaChampion;
  }

  getStateChampions(): StateChampionDto[] {
    const allStandings = [...eastStandings, ...westStandings];
    const stateChampions: StateChampionDto[] = [];

    for (const [code, stateInfo] of Object.entries(statesWithNbaTeams)) {
      // Find all teams from this state in standings
      const stateTeams = nbaTeams.filter((t) => t.stateCode === code);
      const stateStandings = stateTeams
        .map((t) => {
          const standing = allStandings.find((s) => s.teamId === t.id);
          return standing || null;
        })
        .filter((s): s is StandingDto => s !== null)
        .sort((a, b) => b.wins - a.wins);

      if (stateStandings.length > 0) {
        stateChampions.push({
          stateCode: code,
          stateName: stateInfo.name,
          champion: stateStandings[0],
          otherTeams: stateStandings.slice(1),
        });
      }
    }

    return stateChampions.sort(
      (a, b) => b.champion.wins - a.champion.wins
    );
  }

  getLeagueOverview(): LeagueOverviewDto {
    return {
      nbaChampion: this.getNbaChampion(),
      eastStandings,
      westStandings,
      stateChampions: this.getStateChampions(),
    };
  }
}

// Singleton instance for use via Next.js proxy routes
export const standingsService = new StandingsService();
