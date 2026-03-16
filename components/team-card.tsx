"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { NbaTeam } from "@/lib/backend-types";
import { getTeamLogo } from "@/lib/logos";

interface TeamCardProps {
  team: NbaTeam;
  standing?: {
    wins: number;
    losses: number;
    rank: number;
    conference: string;
  };
}

export function TeamCard({ team, standing }: TeamCardProps) {
  return (
    <Link href={`/team/${team.id}`} className="block">
      <div className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-[var(--nba-orange)]/50 hover:bg-secondary/50">
        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-secondary/80 p-2">
          <img
            src={getTeamLogo(team.id, "NBA")}
            alt={`${team.name} logo`}
            width={48}
            height={48}
            className="h-12 w-12 object-contain"
            loading="lazy"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-foreground group-hover:text-[var(--nba-orange)] transition-colors">
            {team.name}
          </h3>
          <p className="truncate text-xs text-muted-foreground">
            {team.stadium}
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <Badge
              variant="outline"
              className={`text-xs ${
                team.conference === "East"
                  ? "border-[#1D428A]/30 bg-[#1D428A]/10 text-[#6b9fff]"
                  : "border-[#C8102E]/30 bg-[#C8102E]/10 text-[#ff7b8a]"
              }`}
            >
              {team.conference === "East" ? "Eastern" : "Western"}
            </Badge>
            {standing && (
              <Badge
                variant="outline"
                className="border-[var(--nba-orange)]/30 bg-[var(--nba-orange)]/10 text-xs text-[var(--nba-orange)]"
              >
                #{standing.rank} {standing.wins}W-{standing.losses}L
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

