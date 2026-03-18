"use strict";
// DTOs for Standings module
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeagueOverviewDto = exports.StateChampionDto = exports.ChampionDto = exports.ConferenceStandingsDto = exports.StandingDto = void 0;
class StandingDto {
    rank;
    teamId;
    teamName;
    conference;
    division;
    wins;
    losses;
    pct;
    badge;
}
exports.StandingDto = StandingDto;
class ConferenceStandingsDto {
    conference;
    standings;
}
exports.ConferenceStandingsDto = ConferenceStandingsDto;
class ChampionDto {
    season;
    teamName;
    teamId;
    badge;
    conference;
}
exports.ChampionDto = ChampionDto;
class StateChampionDto {
    stateCode;
    stateName;
    champion;
    otherTeams;
}
exports.StateChampionDto = StateChampionDto;
class LeagueOverviewDto {
    nbaChampion;
    eastStandings;
    westStandings;
    stateChampions;
}
exports.LeagueOverviewDto = LeagueOverviewDto;
