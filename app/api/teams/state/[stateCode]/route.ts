// Thin proxy route -> TeamsController.getTeamsByState
import { NextResponse } from "next/server";
import { teamsController } from "@/backend/src/teams";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ stateCode: string }> }
) {
  const { stateCode } = await params;
  const result = teamsController.getTeamsByState(stateCode);
  if (!result) {
    return NextResponse.json({ error: "State not found or has no NBA teams" }, { status: 404 });
  }
  return NextResponse.json(result);
}
