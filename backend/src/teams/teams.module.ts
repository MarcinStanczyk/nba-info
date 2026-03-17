import { Module } from "@nestjs/common";
import { TeamsHttpController } from "./teams.http.controller";

@Module({
  controllers: [TeamsHttpController],
})
export class TeamsModule {}