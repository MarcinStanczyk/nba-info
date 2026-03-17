import { Controller, Get } from "@nestjs/common";
import { statesController } from "./index";

@Controller("api/states")
export class StatesHttpController {
  @Get()
  getAllStates() {
    return statesController.getAllStates();
  }
}