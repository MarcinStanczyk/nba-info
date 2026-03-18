"use strict";
// DTOs for States module
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllStatesDto = exports.StateDto = void 0;
class StateDto {
    code;
    name;
    hasNbaTeams;
    teamCount;
    teamNames;
}
exports.StateDto = StateDto;
class AllStatesDto {
    states;
    statesWithTeams;
    totalTeams;
}
exports.AllStatesDto = AllStatesDto;
