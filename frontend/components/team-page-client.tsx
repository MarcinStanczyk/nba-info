"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { TeamDetailView } from "@/components/team-detail";
import { getNbaShortCode } from "@/lib/logos";
import { backendFetch } from "@/lib/backend-api";
import type { BasketballTeam, BootstrapData, EspnPlayer, NbaTeam } from "@/lib/backend-types";

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

export function TeamPageClient() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";

  const [bootstrap, setBootstrap] = useState<BootstrapData | null>(null);
  const [roster, setRoster] = useState<EspnPlayer[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      if (!id) {
        if (mounted) {
          setBootstrap(null);
          setRoster(null);
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      try {
        const data = await backendFetch<BootstrapData>("/api/bootstrap");
        if (!mounted) return;
        setBootstrap(data);

        try {
          const players = await backendFetch<EspnPlayer[]>(`/api/roster/${id}`);
          if (mounted) setRoster(players);
        } catch {
          if (mounted) setRoster(null);
        }
      } catch {
        if (mounted) {
          setBootstrap(null);
          setRoster(null);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [id]);

  const viewModel = useMemo(() => {
    if (!bootstrap || !id) return null;

    const found = findTeam(id, bootstrap);
    if (!found) return null;

    const { team, league, hasFullData } = found;
    const resolvedTeam = team as CombinedTeam;

    const allStandings = [...bootstrap.eastStandings, ...bootstrap.westStandings];
    const standing = hasFullData ? allStandings.find((s) => s.teamId === resolvedTeam.id) : undefined;
    const stateInfo = bootstrap.statesWithNbaTeams[resolvedTeam.stateCode];
    const otherNbaTeamsInState = bootstrap.nbaTeams.filter(
      (t) => t.stateCode === resolvedTeam.stateCode && t.id !== resolvedTeam.id,
    );

    const shortCode = getNbaShortCode(resolvedTeam.id);
    const danceTeam = shortCode ? bootstrap.nbaDanceTeams[shortCode] : undefined;

    const nbaTeam = hasFullData ? bootstrap.nbaTeams.find((t) => t.id === id) : null;
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
      description:
        hasFullData && nbaTeam
          ? nbaTeam.description
          : `${derivedName} is a ${league} basketball team based in ${derivedCity}, ${resolvedTeam.stateCode}.`,
      website: hasFullData && nbaTeam ? nbaTeam.website : "",
      badge: resolvedTeam.badge || "",
    };

    return {
      normalizedTeam,
      standing,
      stateInfo,
      otherTeamsInState: otherNbaTeamsInState.map((t) => ({
        id: t.id,
        name: t.name,
        shortName: t.shortName,
        league: "NBA" as const,
        location: t.location,
        stateCode: t.stateCode,
        conference: t.conference,
        division: t.division,
        stadium: t.stadium,
        formedYear: t.formedYear,
        description: t.description,
        website: t.website,
        badge: t.badge,
      })),
      danceTeam,
    };
  }, [bootstrap, id]);

  if (loading) {
    return <main className="mx-auto w-full max-w-4xl px-4 py-10 text-sm text-muted-foreground">Loading team...</main>;
  }

  if (!id || !viewModel) {
    return (
      <main className="mx-auto w-full max-w-4xl px-4 py-10 text-sm text-muted-foreground">
        Team not found. Wroc na mape i wybierz zespol ponownie.
      </main>
    );
  }

  return (
    <TeamDetailView
      team={viewModel.normalizedTeam}
      standing={viewModel.standing}
      stateInfo={viewModel.stateInfo}
      otherTeamsInState={viewModel.otherTeamsInState}
      roster={roster ?? undefined}
      danceTeam={viewModel.danceTeam}
    />
  );
}
