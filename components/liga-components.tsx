"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { StandingEntry } from "@/lib/backend-types";
import { getTeamLogo } from "@/lib/logos";

interface ChampionBannerProps {
  champion: {
    season: string;
    teamName: string;
    teamId: string;
    badge: string;
    conference: string;
  };
}

export function ChampionBanner({ champion }: ChampionBannerProps) {
  return (
    <Link href={`/team/${champion.teamId}`} className="block">
      <div className="group relative overflow-hidden rounded-xl border border-[#FFD700]/30 bg-gradient-to-r from-[#FFD700]/10 via-card to-[#FFD700]/10 p-6 transition-all hover:border-[#FFD700]/50 md:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#FFD700]/5 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-60 w-60 rounded-full bg-[var(--nba-orange)]/5 blur-3xl" />

        <div className="relative flex flex-col items-center gap-4 md:flex-row md:gap-8">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#FFD700]/10 md:h-20 md:w-20">
            <svg viewBox="0 0 24 24" className="h-10 w-10 text-[#FFD700]" fill="currentColor">
              <path d="M5 3h14c.55 0 1 .45 1 1v3c0 2.76-2.24 5-5 5h-1.17C13.41 13.16 12 14.78 12 16.67V19h3c.55 0 1 .45 1 1v1c0 .55-.45 1-1 1H9c-.55 0-1-.45-1-1v-1c0-.55.45-1 1-1h3v-2.33c0-1.89-1.41-3.51-3.83-4.67H7c-2.76 0-5-2.24-5-5V4c0-.55.45-1 1-1h2zm0 2H4v2c0 1.66 1.34 3 3 3h.17C5.84 8.84 5 7.01 5 5zm14 0h-1c0 2.01-.84 3.84-2.17 5H17c1.66 0 3-1.34 3-3V5z" />
            </svg>
          </div>

          <div className="flex flex-1 flex-col items-center gap-3 md:flex-row md:gap-6">
            <div className="relative h-20 w-20 shrink-0 md:h-24 md:w-24">
              <img
                src={getTeamLogo(champion.teamId, "NBA")}
                alt={`${champion.teamName} logo`}
                width={96}
                height={96}
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </div>
            <div className="text-center md:text-left">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#FFD700]">
                NBA Champion {champion.season}
              </p>
              <h2 className="mt-1 text-2xl font-bold text-foreground group-hover:text-[#FFD700] transition-colors md:text-3xl">
                {champion.teamName}
              </h2>
              <Badge className="mt-2 border-[#FFD700]/30 bg-[#FFD700]/10 text-xs text-[#FFD700]">
                {champion.conference}ern Conference
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

interface StateChampionCardProps {
  stateCode: string;
  stateName: string;
  champion: StandingEntry;
  otherTeams: StandingEntry[];
}

export function StateChampionCard({
  stateCode,
  stateName,
  champion,
  otherTeams,
}: StateChampionCardProps) {
  return (
    <div className="flex flex-col rounded-xl border border-border bg-card transition-all hover:border-[var(--nba-orange)]/30">
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <span className="text-sm font-bold text-[var(--nba-orange)]">{stateCode}</span>
        <span className="text-sm font-medium text-foreground">{stateName}</span>
      </div>

      <Link href={`/team/${champion.teamId}`} className="flex items-center gap-3 p-4 transition-colors hover:bg-secondary/30">
        <div className="relative h-10 w-10 shrink-0">
          <img
            src={getTeamLogo(champion.teamId, "NBA")}
            alt={`${champion.teamName} logo`}
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            loading="lazy"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">
            {champion.teamName}
          </p>
          <p className="text-xs text-muted-foreground">
            {champion.wins}W - {champion.losses}L ({(champion.pct * 100).toFixed(1)}%)
          </p>
        </div>
        <Badge className="shrink-0 border-[#FFD700]/30 bg-[#FFD700]/10 text-[10px] text-[#FFD700]">
          #1
        </Badge>
      </Link>

      {otherTeams.length > 0 && (
        <div className="border-t border-border px-4 py-2">
          {otherTeams.map((team) => (
            <Link
              key={team.teamId}
              href={`/team/${team.teamId}`}
              className="flex items-center gap-2 rounded-md py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <div className="relative h-5 w-5 shrink-0">
                <img
                  src={getTeamLogo(team.teamId, "NBA")}
                  alt={`${team.teamName} logo`}
                  width={20}
                  height={20}
                  className="h-5 w-5 object-contain"
                  loading="lazy"
                />
              </div>
              <span className="truncate">{team.teamName}</span>
              <span className="ml-auto shrink-0">
                {team.wins}W-{team.losses}L
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

