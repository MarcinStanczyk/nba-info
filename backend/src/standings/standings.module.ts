import { Module } from "@nestjs/common";
import { StandingsHttpController } from "./standings.http.controller";

@Module({
  controllers: [StandingsHttpController],
})
export class StandingsModule {}