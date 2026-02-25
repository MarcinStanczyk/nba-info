// DTOs for Standings module

export class StandingDto {
  rank!: number;
  teamId!: string;
  teamName!: string;
  conference!: "East" | "West";
  division!: string;
  wins!: number;
  losses!: number;
  pct!: number;
  badge!: string;
}

export class ConferenceStandingsDto {
  conference!: string;
  standings!: StandingDto[];
}

export class ChampionDto {
  season!: string;
  teamName!: string;
  teamId!: string;
  badge!: string;
  conference!: string;
}

export class StateChampionDto {
  stateCode!: string;
  stateName!: string;
  champion!: StandingDto;
  otherTeams!: StandingDto[];
}

export class LeagueOverviewDto {
  nbaChampion!: ChampionDto;
  eastStandings!: StandingDto[];
  westStandings!: StandingDto[];
  stateChampions!: StateChampionDto[];
}
