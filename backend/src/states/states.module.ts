import { Module } from "@nestjs/common";
import { StatesHttpController } from "./states.http.controller";

@Module({
  controllers: [StatesHttpController],
})
export class StatesModule {}