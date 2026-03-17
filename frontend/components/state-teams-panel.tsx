"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { TeamCard } from "@/components/team-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { getTeamLogo } from "@/lib/logos";
import type { BasketballTeam, NbaTeam, StandingEntry, StateInfo } from "@/lib/backend-types";

const leagueConfig: Record<
  BasketballTeam["league"],
  { color: string; bg: string; border: string; label: string }
> = {
  NBA: { color: "text-[#F58426]", bg: "bg-[#F58426]/15", border: "border-[#F58426]/30", label: "NBA" },
  WNBA: { color: "text-[#c084fc]", bg: "bg-[#c084fc]/15", border: "border-[#c084fc]/30", label: "WNBA" },
  NCAA: { color: "text-[#4ade80]", bg: "bg-[#4ade80]/15", border: "border-[#4ade80]/30", label: "NCAA" },
  "G-League": { color: "text-[#94a3b8]", bg: "bg-[#94a3b8]/15", border: "border-[#94a3b8]/30", label: "G-League" },
};

interface StateTeamsPanelProps {
  stateCode: string | null;
  onClose: () => void;
  usStates: Record<string, string>;
  statesWithNbaTeams: Record<string, StateInfo>;
  nbaTeams: NbaTeam[];
  eastStandings: StandingEntry[];
  westStandings: StandingEntry[];
  wnbaTeams: BasketballTeam[];
  ncaaTeams: BasketballTeam[];
  gLeagueTeams: BasketballTeam[];
}

export function StateTeamsPanel({
  stateCode,
  onClose,
  usStates,
  statesWithNbaTeams,
  nbaTeams,
  eastStandings,
  westStandings,
  wnbaTeams,
  ncaaTeams,
  gLeagueTeams,
}: StateTeamsPanelProps) {
  if (!stateCode) return null;

  const stateName = usStates[stateCode] || stateCode;
  const nbaInfo = statesWithNbaTeams[stateCode];
  const nbaTeamsInState = nbaTeams.filter((t) => t.stateCode === stateCode);
  const code = stateCode.toUpperCase();
  const otherTeams = [
    ...wnbaTeams.filter((t) => t.stateCode === code),
    ...ncaaTeams.filter((t) => t.stateCode === code),
    ...gLeagueTeams.filter((t) => t.stateCode === code),
  ];
  const allStandings = [...eastStandings, ...westStandings];

  const hasNbaTeams = nbaTeamsInState.length > 0;
  const hasOtherTeams = otherTeams.length > 0;

  if (!hasNbaTeams && !hasOtherTeams) {
    return (
      <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">{stateName}</h2>
            <p className="text-sm text-muted-foreground">No basketball teams found</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground" aria-label="Close panel">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex flex-1 items-center justify-center p-8 text-center text-sm text-muted-foreground">
          No notable basketball teams are currently based in {stateName}.
        </div>
      </div>
    );
  }

  // Group other teams by league
  const teamsByLeague: Record<string, BasketballTeam[]> = {};
  for (const team of otherTeams) {
    if (!teamsByLeague[team.league]) teamsByLeague[team.league] = [];
    teamsByLeague[team.league].push(team);
  }
  const leagueOrder = ["WNBA", "NCAA", "G-League"] as const;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-5 py-4">
        <div>
          <h2 className="text-lg font-bold text-foreground">{stateName}</h2>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            {hasNbaTeams && (
              <Badge variant="outline" className={`text-[10px] ${nbaInfo?.conference === "East" ? "border-[#1D428A]/30 bg-[#1D428A]/10 text-[#6b9fff]" : "border-[#C8102E]/30 bg-[#C8102E]/10 text-[#ff7b8a]"}`}>
                {nbaInfo?.conference}ern Conference
              </Badge>
            )}
            <span className="text-xs text-muted-foreground">
              {nbaTeamsInState.length} NBA + {otherTeams.length} other
            </span>
          </div>
        </div>
        <button onClick={onClose} className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground" aria-label="Close panel">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col gap-5">
          {/* NBA Teams Section */}
          {hasNbaTeams && (
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[var(--nba-orange)]" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--nba-orange)]">
                  NBA Teams
                </h3>
              </div>
              <div className="flex flex-col gap-3">
                {nbaTeamsInState.map((team) => {
                  const standing = allStandings.find((s) => s.teamId === team.id);
                  return (
                    <TeamCard
                      key={team.id}
                      team={team}
                      standing={standing ? { wins: standing.wins, losses: standing.losses, rank: standing.rank, conference: standing.conference } : undefined}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Other Leagues */}
          {leagueOrder.map((league) => {
            const teams = teamsByLeague[league];
            if (!teams || teams.length === 0) return null;
            const config = leagueConfig[league];

            return (
              <div key={league}>
                <div className="mb-2 flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${config.bg.replace("/15", "")}`} style={{ backgroundColor: config.color.replace("text-[", "").replace("]", "") }} />
                  <h3 className={`text-xs font-semibold uppercase tracking-wider ${config.color}`}>
                    {config.label}
                  </h3>
                </div>
                <div className="flex flex-col gap-1">
                  {teams.map((team) => (
                    <OtherTeamRow key={team.id} team={team} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}

function OtherTeamRow({ team }: { team: BasketballTeam }) {
  const config = leagueConfig[team.league];
  return (
    <Link href={`/team?id=${team.id}`} className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-secondary/40">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary/60">
        <img src={getTeamLogo(team.id, team.league)} alt={`${team.name} logo`} width={28} height={28} className="h-7 w-7 object-contain" loading="lazy" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{team.name}</p>
        <p className="truncate text-xs text-muted-foreground">{team.city}{team.conference ? ` -- ${team.conference}` : ""}</p>
      </div>
      <Badge variant="outline" className={`shrink-0 text-[10px] ${config.color} ${config.bg} ${config.border}`}>
        {config.label}
      </Badge>
    </Link>
  );
}

