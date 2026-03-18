"use strict";
// NestJS-style controller for States
// @Controller('states') - uncomment when migrating to NestJS
Object.defineProperty(exports, "__esModule", { value: true });
exports.statesController = exports.StatesController = void 0;
const states_service_1 = require("./states.service");
class StatesController {
    service;
    constructor() {
        this.service = states_service_1.statesService;
    }
    // @Get()
    getAllStates() {
        return this.service.getAllStates();
    }
    // @Get(':code')
    getStateByCode(code) {
        return this.service.getStateByCode(code);
    }
    // @Get('nba-codes')
    getNbaStatesCodes() {
        return this.service.getNbaStatesCodes();
    }
}
exports.StatesController = StatesController;
// Singleton instance
exports.statesController = new StatesController();
