// DTOs for States module

export class StateDto {
  code!: string;
  name!: string;
  hasNbaTeams!: boolean;
  teamCount!: number;
  teamNames!: string[];
}

export class AllStatesDto {
  states!: StateDto[];
  statesWithTeams!: StateDto[];
  totalTeams!: number;
}
