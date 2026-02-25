// DTOs for Teams module

export class TeamDto {
  id!: string;
  name!: string;
  shortName!: string;
  badge!: string;
  logo!: string;
  stadium!: string;
  stadiumThumb!: string;
  formedYear!: string;
  location!: string;
  stateCode!: string;
  conference!: string;
  division!: string;
  description!: string;
  website!: string;
}

export class TeamsByStateDto {
  stateCode!: string;
  stateName!: string;
  teams!: TeamDto[];
  teamCount!: number;
}
