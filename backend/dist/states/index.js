"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statesController = exports.StatesController = exports.statesService = exports.StatesService = void 0;
// States Module - barrel export
// @Module({ controllers: [StatesController], providers: [StatesService] })
var states_service_1 = require("./states.service");
Object.defineProperty(exports, "StatesService", { enumerable: true, get: function () { return states_service_1.StatesService; } });
Object.defineProperty(exports, "statesService", { enumerable: true, get: function () { return states_service_1.statesService; } });
var states_controller_1 = require("./states.controller");
Object.defineProperty(exports, "StatesController", { enumerable: true, get: function () { return states_controller_1.StatesController; } });
Object.defineProperty(exports, "statesController", { enumerable: true, get: function () { return states_controller_1.statesController; } });
