import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { TeamDetailView } from "@/components/team-detail";
import { getNbaShortCode } from "@/lib/logos";
import type { Metadata } from "next";
import { backendFetch } from "@/lib/backend-api";
import type { BasketballTeam, BootstrapData, EspnPlayer, NbaTeam } from "@/lib/backend-types";

interface TeamPageProps {
  params: Promise<{ id: string }>;
}

type CombinedTeam = NbaTeam | BasketballTeam;

function findTeam(id: string, data: BootstrapData) {
  const nba = data.nbaTeams.find((t) => t.id === id);
  if (nba) return { team: nba, league: "NBA" as const, hasFullData: true };

  const wnba = data.wnbaTeams.find((t) => t.id === id);
  if (wnba) return { team: wnba, league: "WNBA" as const, hasFullData: false };

  const ncaa = data.ncaaTeams.find((t) => t.id === id);
  if (ncaa) return { team: ncaa, league: "NCAA" as const, hasFullData: false };

  const gl = data.gLeagueTeams.find((t) => t.id === id);
  if (gl) return { team: gl, league: "G-League" as const, hasFullData: false };

  return null;
}

async function getBootstrapData(): Promise<BootstrapData> {
  return backendFetch<BootstrapData>("/api/bootstrap", { cache: "no-store" });
}

export async function generateMetadata({ params }: TeamPageProps): Promise<Metadata> {
  const { id } = await params;
  const data = await getBootstrapData();
  const found = findTeam(id, data);
  if (!found) return { title: "Team Not Found" };
  return {
    title: `${found.team.name} - ${found.league} | NBA Map`,
    description: `${found.team.name} (${found.league}) team profile.`,
  };
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { id } = await params;
  const data = await getBootstrapData();
  const found = findTeam(id, data);
  if (!found) notFound();

  const { team, league, hasFullData } = found;
  const resolvedTeam = team as CombinedTeam;

  // NBA-specific data
  const allStandings = [...data.eastStandings, ...data.westStandings];
  const standing = hasFullData ? allStandings.find((s) => s.teamId === resolvedTeam.id) : undefined;
  const stateInfo = data.statesWithNbaTeams[resolvedTeam.stateCode];
  const otherNbaTeamsInState = data.nbaTeams.filter(
    (t) => t.stateCode === resolvedTeam.stateCode && t.id !== resolvedTeam.id
  );

  // Live roster from ESPN (works for NBA, WNBA, NCAA)
  const roster = await backendFetch<EspnPlayer[]>(`/api/roster/${resolvedTeam.id}`, { cache: "no-store" }).catch(() => null);

  // Dance team (NBA only)
  const shortCode = getNbaShortCode(resolvedTeam.id);
  const danceTeam = shortCode ? data.nbaDanceTeams[shortCode] : undefined;

  // Build a normalized team object for the detail view
  const nbaTeam = hasFullData ? data.nbaTeams.find((t) => t.id === id) : null;
  const derivedName = resolvedTeam.name;
  const derivedCity = "city" in resolvedTeam ? resolvedTeam.city : "";
  const derivedConference = "conference" in resolvedTeam ? resolvedTeam.conference ?? "" : "";

  const normalizedTeam = {
    id: resolvedTeam.id,
    name: derivedName || "Unknown",
    shortName: hasFullData && nbaTeam ? nbaTeam.shortName : (derivedName.split(" ").pop() || ""),
    league,
    location: hasFullData && nbaTeam ? nbaTeam.location : `${derivedCity}, ${resolvedTeam.stateCode}`,
    stateCode: resolvedTeam.stateCode,
    conference: derivedConference,
    division: hasFullData && nbaTeam ? nbaTeam.division : derivedConference,
    stadium: hasFullData && nbaTeam ? nbaTeam.stadium : "",
    formedYear: hasFullData && nbaTeam ? nbaTeam.formedYear : "",
    description: hasFullData && nbaTeam ? nbaTeam.description : `${derivedName} is a ${league} basketball team based in ${derivedCity}, ${resolvedTeam.stateCode}.`,
    website: hasFullData && nbaTeam ? nbaTeam.website : "",
    badge: resolvedTeam.badge || "",
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
