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
exports.TeamsHttpController = void 0;
const common_1 = require("@nestjs/common");
const index_1 = require("./index");
let TeamsHttpController = class TeamsHttpController {
    getAllTeams() {
        return index_1.teamsController.getAllTeams();
    }
    getTeamsByState(stateCode) {
        const result = index_1.teamsController.getTeamsByState(stateCode);
        if (!result) {
            throw new common_1.NotFoundException("State not found or has no NBA teams");
        }
        return result;
    }
    getTeamById(id) {
        const team = index_1.teamsService.getTeamById(id);
        if (!team) {
            throw new common_1.NotFoundException("Team not found");
        }
        return team;
    }
};
exports.TeamsHttpController = TeamsHttpController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TeamsHttpController.prototype, "getAllTeams", null);
__decorate([
    (0, common_1.Get)("state/:stateCode"),
    __param(0, (0, common_1.Param)("stateCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TeamsHttpController.prototype, "getTeamsByState", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TeamsHttpController.prototype, "getTeamById", null);
exports.TeamsHttpController = TeamsHttpController = __decorate([
    (0, common_1.Controller)("api/teams")
], TeamsHttpController);
