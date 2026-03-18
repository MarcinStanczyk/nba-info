"use strict";
// DTOs for Teams module
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamsByStateDto = exports.TeamDto = void 0;
class TeamDto {
    id;
    name;
    shortName;
    badge;
    logo;
    stadium;
    stadiumThumb;
    formedYear;
    location;
    stateCode;
    conference;
    division;
    description;
    website;
}
exports.TeamDto = TeamDto;
class TeamsByStateDto {
    stateCode;
    stateName;
    teams;
    teamCount;
}
exports.TeamsByStateDto = TeamsByStateDto;
