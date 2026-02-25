// Thin proxy route -> StandingsController.getLeagueOverview
import { NextResponse } from "next/server";
import { standingsController } from "@/backend/src/standings";

export async function GET() {
  const overview = standingsController.getLeagueOverview();
  return NextResponse.json(overview);
}
