import { NextResponse } from "next/server";
import { teamsService } from "@/backend/src/teams/teams.service";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const team = teamsService.getTeamById(id);

  if (!team) {
    return NextResponse.json({ error: "Team not found" }, { status: 404 });
  }

  return NextResponse.json(team);
}
