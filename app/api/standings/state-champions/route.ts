// Thin proxy route -> StandingsController.getStateChampions
import { NextResponse } from "next/server";
import { standingsController } from "@/backend/src/standings";

export async function GET() {
  const stateChampions = standingsController.getStateChampions();
  return NextResponse.json(stateChampions);
}
