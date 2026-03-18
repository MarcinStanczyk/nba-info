"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamsController = exports.TeamsController = exports.teamsService = exports.TeamsService = void 0;
// Teams Module - barrel export
// @Module({ controllers: [TeamsController], providers: [TeamsService] })
var teams_service_1 = require("./teams.service");
Object.defineProperty(exports, "TeamsService", { enumerable: true, get: function () { return teams_service_1.TeamsService; } });
Object.defineProperty(exports, "teamsService", { enumerable: true, get: function () { return teams_service_1.teamsService; } });
var teams_controller_1 = require("./teams.controller");
Object.defineProperty(exports, "TeamsController", { enumerable: true, get: function () { return teams_controller_1.TeamsController; } });
Object.defineProperty(exports, "teamsController", { enumerable: true, get: function () { return teams_controller_1.teamsController; } });
