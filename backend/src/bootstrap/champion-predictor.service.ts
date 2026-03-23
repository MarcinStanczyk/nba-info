import { InternalServerErrorException } from "@nestjs/common";
import { readFile } from "node:fs/promises";
import path from "node:path";

export interface ChampionPredictionResponse {
  teamName: string;
  teamCode: string;
  probability: number;
  reason: string;
  generatedAt: string;
  topProbabilities: Array<{
    teamName: string;
    teamCode: string;
    probability: number;
  }>;
}

export class ChampionPredictorService {
  private readonly repoRoot = path.resolve(__dirname, "../../..");
  private readonly predictionFilePath = path.join(this.repoRoot, "data", "champion-prediction.json");

  async calculateChampion(): Promise<ChampionPredictionResponse> {
    try {
      const raw = await readFile(this.predictionFilePath, "utf8");
      return JSON.parse(raw) as ChampionPredictionResponse;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to read static champion prediction: ${(error as Error).message}`,
      );
    }
  }
}

export const championPredictorService = new ChampionPredictorService();
