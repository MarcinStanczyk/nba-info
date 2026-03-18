"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StandingsHttpController = void 0;
const common_1 = require("@nestjs/common");
const index_1 = require("./index");
let StandingsHttpController = class StandingsHttpController {
    getOverview() {
        return index_1.standingsController.getLeagueOverview();
    }
    getStateChampions() {
        return index_1.standingsController.getStateChampions();
    }
    getConference(conference) {
        const lower = conference.toLowerCase();
        if (lower === "east") {
            return index_1.standingsController.getEastStandings();
        }
        if (lower === "west") {
            return index_1.standingsController.getWestStandings();
        }
        throw new common_1.BadRequestException("Invalid conference. Use 'east' or 'west'.");
    }
};
exports.StandingsHttpController = StandingsHttpController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StandingsHttpController.prototype, "getOverview", null);
__decorate([
    (0, common_1.Get)("state-champions"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StandingsHttpController.prototype, "getStateChampions", null);
__decorate([
    (0, common_1.Get)(":conference"),
    __param(0, (0, common_1.Param)("conference")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StandingsHttpController.prototype, "getConference", null);
exports.StandingsHttpController = StandingsHttpController = __decorate([
    (0, common_1.Controller)("api/standings")
], StandingsHttpController);
