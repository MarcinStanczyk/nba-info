"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.championPredictorService = exports.ChampionPredictorService = void 0;
const common_1 = require("@nestjs/common");
const promises_1 = require("node:fs/promises");
const node_path_1 = __importDefault(require("node:path"));
class ChampionPredictorService {
    // Works in both:
    // - local dev/build: backend/src|dist/bootstrap -> ../../data
    // - Azure App Service: /home/site/wwwroot/dist/bootstrap -> /home/site/wwwroot/data
    predictionFilePath = node_path_1.default.resolve(__dirname, "../../data/champion-prediction.json");
    async calculateChampion() {
        try {
            const raw = await (0, promises_1.readFile)(this.predictionFilePath, "utf8");
            return JSON.parse(raw);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Failed to read static champion prediction: ${error.message}`);
        }
    }
}
exports.ChampionPredictorService = ChampionPredictorService;
exports.championPredictorService = new ChampionPredictorService();
