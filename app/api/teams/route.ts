// Thin proxy route -> TeamsController
import { NextResponse } from "next/server";
import { teamsController } from "@/backend/src/teams";

export async function GET() {
  const teams = teamsController.getAllTeams();
  return NextResponse.json(teams);
}
