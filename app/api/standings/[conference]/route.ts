// Thin proxy route -> StandingsController conference standings
import { NextResponse } from "next/server";
import { standingsController } from "@/backend/src/standings";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ conference: string }> }
) {
  const { conference } = await params;
  const lower = conference.toLowerCase();

  if (lower === "east") {
    return NextResponse.json(standingsController.getEastStandings());
  } else if (lower === "west") {
    return NextResponse.json(standingsController.getWestStandings());
  }

  return NextResponse.json({ error: "Invalid conference. Use 'east' or 'west'." }, { status: 400 });
}
