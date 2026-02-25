// NestJS-style controller for States
// @Controller('states') - uncomment when migrating to NestJS

import { statesService, StatesService } from "./states.service";
import type { StateDto, AllStatesDto } from "./states.dto";

export class StatesController {
  private service: StatesService;

  constructor() {
    this.service = statesService;
  }

  // @Get()
  getAllStates(): AllStatesDto {
    return this.service.getAllStates();
  }

  // @Get(':code')
  getStateByCode(code: string): StateDto | null {
    return this.service.getStateByCode(code);
  }

  // @Get('nba-codes')
  getNbaStatesCodes(): string[] {
    return this.service.getNbaStatesCodes();
  }
}

// Singleton instance
export const statesController = new StatesController();
