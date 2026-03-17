import { Module } from "@nestjs/common";
import { TeamsModule } from "./teams/teams.module";
import { StandingsModule } from "./standings/standings.module";
import { StatesModule } from "./states/states.module";
import { BootstrapModule } from "./bootstrap/bootstrap.module";

@Module({
  imports: [TeamsModule, StandingsModule, StatesModule, BootstrapModule],
})
export class AppModule {}