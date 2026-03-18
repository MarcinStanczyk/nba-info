"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.standingsController = exports.StandingsController = exports.standingsService = exports.StandingsService = void 0;
// Standings Module - barrel export
// @Module({ controllers: [StandingsController], providers: [StandingsService] })
var standings_service_1 = require("./standings.service");
Object.defineProperty(exports, "StandingsService", { enumerable: true, get: function () { return standings_service_1.StandingsService; } });
Object.defineProperty(exports, "standingsService", { enumerable: true, get: function () { return standings_service_1.standingsService; } });
var standings_controller_1 = require("./standings.controller");
Object.defineProperty(exports, "StandingsController", { enumerable: true, get: function () { return standings_controller_1.StandingsController; } });
Object.defineProperty(exports, "standingsController", { enumerable: true, get: function () { return standings_controller_1.standingsController; } });
