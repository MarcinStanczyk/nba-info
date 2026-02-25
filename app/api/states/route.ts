// Thin proxy route -> StatesController
import { NextResponse } from "next/server";
import { statesController } from "@/backend/src/states";

export async function GET() {
  const states = statesController.getAllStates();
  return NextResponse.json(states);
}
