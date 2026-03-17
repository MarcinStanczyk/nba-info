export type Conference = "East" | "West";

export interface StateInfo {
  name: string;
  code: string;
  teams: string[];
  teamCount: number;
  conference?: "East" | "West" | "Both";
}

export interface NbaTeam {
  id: string;
  name: string;
  shortName: string;
  location: string;
  city: string;
  stateCode: string;
  conference: Conference;
  division: string;
  stadium: string;
  formedYear: string;
  description: string;
  website: string;
  badge: string;
}

export interface BasketballTeam {
  id: string;
  name: string;
  league: "NBA" | "WNBA" | "NCAA" | "G-League";
  badge: string;
  city: string;
  stateCode: string;
  conference?: string;
}

export interface StandingEntry {
  rank: number;
  teamId: string;
  teamName: string;
  conference: Conference;
  division: string;
  wins: number;
  losses: number;
  pct: number;
  badge: string;
}

export interface Champion {
  season: string;
  teamName: string;
  teamId: string;
  badge: string;
  conference: Conference;
}

export interface StateChampion {
  stateCode: string;
  stateName: string;
  champion: StandingEntry;
  otherTeams: StandingEntry[];
}

export interface DanceTeamInfo {
  teamId: string;
  squadName: string;
  director: string;
  founded: number;
  style: string;
}

export interface EspnPlayer {
  id: string;
  name: string;
  number: string;
  position: string;
  height: string;
  weight: string;
  age: number;
  experience: number;
  college: string;
  country: string;
  imageUrl: string;
}

export interface BootstrapData {
  usStates: Record<string, string>;
  statesWithNbaTeams: Record<string, StateInfo>;
  nbaStatesCodes: string[];
  nonNbaBasketballStates: string[];
  nbaTeams: NbaTeam[];
  wnbaTeams: BasketballTeam[];
  ncaaTeams: BasketballTeam[];
  gLeagueTeams: BasketballTeam[];
  eastStandings: StandingEntry[];
  westStandings: StandingEntry[];
  nbaChampion: Champion;
  stateChampions: StateChampion[];
  nbaDanceTeams: Record<string, DanceTeamInfo>;
}