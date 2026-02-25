import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { TeamDetailView } from "@/components/team-detail";
import { nbaTeams } from "@/backend/src/data/nba-teams";
import { wnbaTeams, ncaaTeams, gLeagueTeams } from "@/backend/src/data/all-basketball-teams";
import { eastStandings, westStandings } from "@/backend/src/data/nba-standings";
import { statesWithNbaTeams } from "@/backend/src/data/us-states";
import { nbaDanceTeams } from "@/backend/src/data/nba-dance-teams";
import { getNbaShortCode } from "@/lib/logos";
import { fetchEspnRoster } from "@/backend/src/data/espn-roster-service";
import type { Metadata } from "next";

interface TeamPageProps {
  params: Promise<{ id: string }>;
}

// Find a team across all leagues
function findTeam(id: string) {
  const nba = nbaTeams.find((t) => t.id === id);
  if (nba) return { team: nba, league: "NBA" as const, hasFullData: true };

  const wnba = wnbaTeams.find((t) => t.id === id);
  if (wnba) return { team: wnba, league: "WNBA" as const, hasFullData: false };

  const ncaa = ncaaTeams.find((t) => t.id === id);
  if (ncaa) return { team: ncaa, league: "NCAA" as const, hasFullData: false };

  const gl = gLeagueTeams.find((t) => t.id === id);
  if (gl) return { team: gl, league: "G-League" as const, hasFullData: false };

  return null;
}

export async function generateMetadata({ params }: TeamPageProps): Promise<Metadata> {
  const { id } = await params;
  const found = findTeam(id);
  if (!found) return { title: "Team Not Found" };
  return {
    title: `${found.team.name} - ${found.league} | NBA Map`,
    description: `${found.team.name} (${found.league}) team profile.`,
  };
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { id } = await params;
  const found = findTeam(id);
  if (!found) notFound();

  const { team, league, hasFullData } = found;

  // NBA-specific data
  const allStandings = [...eastStandings, ...westStandings];
  const standing = hasFullData ? allStandings.find((s) => s.teamId === team.id) : undefined;
  const stateInfo = statesWithNbaTeams[team.stateCode];
  const otherNbaTeamsInState = nbaTeams.filter((t) => t.stateCode === team.stateCode && t.id !== team.id);

  // Live roster from ESPN (works for NBA, WNBA, NCAA)
  const roster = await fetchEspnRoster(team.id);

  // Dance team (NBA only)
  const shortCode = getNbaShortCode(team.id);
  const danceTeam = shortCode ? nbaDanceTeams[shortCode] : undefined;

  // Build a normalized team object for the detail view
  const nbaTeam = hasFullData ? nbaTeams.find((t) => t.id === id) : null;

  const normalizedTeam = {
    id: team.id,
    name: team.name || (team as any).displayName || "Unknown",
    shortName: hasFullData && nbaTeam ? nbaTeam.shortName : (team.name.split(" ").pop() || ""),
    league,
    location: hasFullData && nbaTeam ? nbaTeam.location : `${team.city}, ${team.stateCode}`,
    stateCode: team.stateCode,
    conference: team.conference || "",
    division: hasFullData && nbaTeam ? nbaTeam.division : (team.conference || ""),
    stadium: hasFullData && nbaTeam ? nbaTeam.stadium : "",
    formedYear: hasFullData && nbaTeam ? nbaTeam.formedYear : "",
    description: hasFullData && nbaTeam ? nbaTeam.description : `${team.name} is a ${league} basketball team based in ${team.city}, ${team.stateCode}.`,
    website: hasFullData && nbaTeam ? nbaTeam.website : "",
    badge: team.badge || "",
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <TeamDetailView
        team={normalizedTeam}
        standing={standing}
        stateInfo={stateInfo}
        otherTeamsInState={otherNbaTeamsInState.map((t) => ({
          id: t.id, name: t.name, shortName: t.shortName, league: "NBA" as const,
          location: t.location, stateCode: t.stateCode, conference: t.conference,
          division: t.division, stadium: t.stadium, formedYear: t.formedYear,
          description: t.description, website: t.website, badge: t.badge,
        }))}
        roster={roster ?? undefined}
        danceTeam={danceTeam}
      />
    </div>
  );
}
