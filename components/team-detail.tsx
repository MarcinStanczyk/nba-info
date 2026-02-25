"use client";

import Link from "next/link";
import { ArrowLeft, Globe, MapPin, Calendar, Trophy, Building2, Users, Music, Star, Hash, Ruler, Weight, GraduationCap, Flag, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { StandingEntry } from "@/backend/src/data/nba-standings";
import type { StateInfo } from "@/backend/src/data/us-states";
import type { EspnPlayer } from "@/backend/src/data/espn-roster-service";
import type { DanceTeamInfo } from "@/backend/src/data/nba-dance-teams";
import { getTeamLogo, getTeamBanner } from "@/lib/logos";
import { useState } from "react";

interface NormalizedTeam {
  id: string;
  name: string;
  shortName: string;
  league: "NBA" | "WNBA" | "NCAA" | "G-League";
  location: string;
  stateCode: string;
  conference: string;
  division: string;
  stadium: string;
  formedYear: string;
  description: string;
  website: string;
  badge: string;
}

interface TeamDetailViewProps {
  team: NormalizedTeam;
  standing?: StandingEntry;
  stateInfo?: StateInfo;
  otherTeamsInState: NormalizedTeam[];
  roster?: EspnPlayer[];
  danceTeam?: DanceTeamInfo;
}

const leagueColors: Record<string, { main: string; light: string }> = {
  NBA: { main: "#F58426", light: "#ffb574" },
  WNBA: { main: "#c084fc", light: "#d8b4fe" },
  NCAA: { main: "#4ade80", light: "#86efac" },
  "G-League": { main: "#94a3b8", light: "#cbd5e1" },
};

export function TeamDetailView({ team, standing, stateInfo, otherTeamsInState, roster, danceTeam }: TeamDetailViewProps) {
  const isEast = team.conference?.includes("East");
  const colors = leagueColors[team.league] || leagueColors.NBA;
  const confColor = team.league === "NBA" ? (isEast ? "#1D428A" : "#C8102E") : colors.main;
  const confLightColor = team.league === "NBA" ? (isEast ? "#6b9fff" : "#ff7b8a") : colors.light;

  return (
    <main className="flex-1">
      {/* Back nav */}
      <div className="border-b border-border bg-secondary/30 px-4 py-3">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />Back to Map
          </Link>
          <Badge variant="outline" className="text-[10px]" style={{ borderColor: `${colors.main}40`, backgroundColor: `${colors.main}15`, color: colors.light }}>
            {team.league}
          </Badge>
        </div>
      </div>

      {/* Animated Banner */}
      <section className="relative h-56 overflow-hidden border-b border-border md:h-72">
        <img src={getTeamBanner(team.id)} alt={`${team.name} banner`} className="banner-animated h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10, 14, 26, 0.8), rgba(10, 14, 26, 0.1), transparent' }} />
      </section>

      {/* Hero */}
      <section className="relative -mt-24 border-b border-border px-4 pb-8 md:-mt-28">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 md:flex-row md:gap-10">
          <div className="flex h-36 w-36 shrink-0 items-center justify-center rounded-2xl bg-card/90 p-4 shadow-xl ring-1 ring-border backdrop-blur-sm md:h-44 md:w-44">
            <img src={getTeamLogo(team.id, team.league)} alt={`${team.name} badge`} width={140} height={140} className="h-full w-full object-contain drop-shadow-lg" />
          </div>
          <div className="flex flex-col items-center gap-3 text-center md:items-start md:text-left">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="text-xs" style={{ borderColor: `${confColor}50`, backgroundColor: `${confColor}15`, color: confLightColor }}>
                {team.league === "NBA" ? `${team.conference}ern Conference` : team.conference || team.league}
              </Badge>
              {team.division && team.league === "NBA" && (
                <Badge variant="outline" className="border-border text-xs text-muted-foreground">{team.division} Division</Badge>
              )}
            </div>
            <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">{team.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{team.location}</span>
              {team.formedYear && <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />Est. {team.formedYear}</span>}
            </div>
            {standing && (
              <div className="mt-2 flex items-center gap-4 rounded-lg border border-border bg-card/60 px-5 py-3 backdrop-blur-sm">
                <StatBlock value={String(standing.wins)} label="Wins" color="text-foreground" />
                <div className="h-8 w-px bg-border" />
                <StatBlock value={String(standing.losses)} label="Losses" color="text-muted-foreground" />
                <div className="h-8 w-px bg-border" />
                <StatBlock value={`${(standing.pct * 100).toFixed(1)}%`} label="PCT" color={confLightColor} isCustomColor />
                <div className="h-8 w-px bg-border" />
                <StatBlock value={`#${standing.rank}`} label="Rank" color="text-[#FFD700]" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Key Players */}
      {roster && roster.length > 0 && (
        <section className="border-b border-border px-4 py-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 flex items-center gap-2">
              <Users className="h-5 w-5" style={{ color: colors.main }} />
              <h2 className="text-xl font-bold text-foreground">Roster</h2>
              <Badge variant="outline" className="ml-2 text-xs text-muted-foreground">{roster.length} players</Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
              {roster.map((player) => (
                <PlayerCard key={player.id} player={player} confColor={confColor} confLightColor={confLightColor} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Content grid */}
      <section className="px-4 py-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-2">
            {/* About */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-3 text-lg font-bold text-foreground">About</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{team.description}</p>
            </div>

            {/* Stadium (NBA only) */}
            {team.stadium && (
              <div className="overflow-hidden rounded-xl border border-border bg-card">
                <div className="flex items-center gap-2 border-b border-border px-6 py-4">
                  <Building2 className="h-4 w-4 text-muted-foreground" /><h2 className="text-lg font-bold text-foreground">Home Arena</h2>
                </div>
                <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
                  <div className="h-40 w-full shrink-0 overflow-hidden rounded-lg bg-secondary sm:w-56">
                    <img src={getTeamBanner(team.id)} alt={team.stadium} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">{team.stadium}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{team.location}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Dance Team - photos gallery instead of video */}
            {danceTeam && (
              <DanceTeamSection danceTeam={danceTeam} teamName={team.name} confColor={confColor} confLightColor={confLightColor} />
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Quick Info</h3>
              <div className="flex flex-col gap-3">
                <InfoRow label="League" value={team.league} />
                <InfoRow label="Short Name" value={team.shortName} />
                {team.conference && <InfoRow label="Conference" value={team.league === "NBA" ? `${team.conference}ern` : team.conference} />}
                {team.division && team.league === "NBA" && <InfoRow label="Division" value={team.division} />}
                {team.formedYear && <InfoRow label="Founded" value={team.formedYear} />}
                {team.stadium && <InfoRow label="Arena" value={team.stadium} />}
                {stateInfo && <InfoRow label="State" value={stateInfo.name} />}
                {team.website && (
                  <div className="flex items-center justify-between py-1">
                    <span className="text-xs text-muted-foreground">Website</span>
                    <a href={team.website.startsWith("http") ? team.website : `https://${team.website}`} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs font-medium hover:underline" style={{ color: colors.main }}>
                      <Globe className="h-3 w-3" />Visit
                    </a>
                  </div>
                )}
              </div>
            </div>
            {standing && (
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-[#FFD700]" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">2024-25 Season</h3>
                </div>
                <div className="flex flex-col gap-3">
                  <InfoRow label="Record" value={`${standing.wins}-${standing.losses}`} />
                  <InfoRow label="Win PCT" value={`${(standing.pct * 100).toFixed(1)}%`} />
                  <InfoRow label="Conf. Rank" value={`#${standing.rank} ${standing.conference}`} />
                  <InfoRow label="Division" value={standing.division} />
                </div>
                <div className="mt-4">
                  <div className="mb-1 flex justify-between text-[10px] text-muted-foreground">
                    <span>{standing.wins}W</span><span>{standing.losses}L</span>
                  </div>
                  <div className="flex h-2 overflow-hidden rounded-full bg-secondary">
                    <div className="rounded-full transition-all" style={{
                      width: `${standing.pct * 100}%`,
                      backgroundColor: standing.pct >= 0.6 ? "#4ade80" : standing.pct >= 0.5 ? confLightColor : "#ef4444",
                    }} />
                  </div>
                </div>
              </div>
            )}
            {otherTeamsInState.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Also in {stateInfo?.name || team.stateCode}</h3>
                <div className="flex flex-col gap-2">
                  {otherTeamsInState.map((other) => (
                    <Link key={other.id} href={`/team/${other.id}`} className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-secondary/50">
                      <img src={getTeamLogo(other.id, other.league)} alt={`${other.name} logo`} width={28} height={28} className="h-7 w-7 object-contain" loading="lazy" />
                      <span className="truncate text-sm font-medium text-foreground">{other.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

/* --- Sub-components --- */

function StatBlock({ value, label, color, isCustomColor }: { value: string; label: string; color: string; isCustomColor?: boolean }) {
  return (
    <div className="text-center">
      <p className={`text-2xl font-bold ${isCustomColor ? "" : color}`} style={isCustomColor ? { color } : undefined}>{value}</p>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
  );
}

function PlayerCard({ player, confColor, confLightColor }: { player: EspnPlayer; confColor: string; confLightColor: string }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="player-card overflow-hidden rounded-xl border border-border bg-card">
      <div className="relative flex h-40 items-end justify-center overflow-hidden bg-secondary/50" style={{ background: `linear-gradient(180deg, ${confColor}20 0%, ${confColor}05 100%)` }}>
        {!imgError && player.imageUrl ? (
          <img src={player.imageUrl} alt={player.name} className="h-full w-auto object-contain object-bottom" loading="lazy" onError={() => setImgError(true)} />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-3xl font-bold text-muted-foreground/30">#{player.number}</span>
          </div>
        )}
        <div className="absolute right-2 top-2 rounded-md px-2 py-0.5 text-xs font-bold" style={{ backgroundColor: `${confColor}90`, color: "#fff" }}>#{player.number}</div>
      </div>
      <div className="p-3">
        <h4 className="truncate text-sm font-bold text-foreground">{player.name}</h4>
        <div className="mt-1 flex items-center gap-2">
          <Badge variant="outline" className="text-[10px]" style={{ borderColor: `${confColor}40`, color: confLightColor }}>{player.position}</Badge>
          <span className="text-[10px] text-muted-foreground">{player.height}</span>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-1 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1"><Flag className="h-2.5 w-2.5" />{player.country}</span>
          <span className="flex items-center gap-1"><Weight className="h-2.5 w-2.5" />{player.weight}</span>
          {player.age > 0 && <span className="flex items-center gap-1"><Calendar className="h-2.5 w-2.5" />{player.age} yrs</span>}
          {player.experience > 0 && <span className="flex items-center gap-1"><Star className="h-2.5 w-2.5" />{player.experience}yr exp</span>}
          {player.college && <span className="col-span-2 flex items-center gap-1 truncate"><GraduationCap className="h-2.5 w-2.5 shrink-0" />{player.college}</span>}
        </div>
      </div>
    </div>
  );
}

function DanceTeamSection({ danceTeam, teamName, confColor, confLightColor }: { danceTeam: DanceTeamInfo; teamName: string; confColor: string; confLightColor: string }) {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  // We have up to 3 photos per team: {teamId}.jpg, {teamId}-2.jpg, {teamId}-3.jpg
  const photos = [
    `/dance-teams/${danceTeam.teamId}.jpg`,
    `/dance-teams/${danceTeam.teamId}-2.jpg`,
    `/dance-teams/${danceTeam.teamId}-3.jpg`,
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-6 py-4">
        <Music className="h-4 w-4" style={{ color: confLightColor }} />
        <h2 className="text-lg font-bold text-foreground">{danceTeam.squadName}</h2>
      </div>

      {/* Photo Gallery with navigation */}
      <div className="relative h-64 overflow-hidden md:h-80">
        <img
          src={photos[currentPhoto]}
          alt={`${danceTeam.squadName} photo ${currentPhoto + 1}`}
          className="h-full w-full object-cover transition-opacity duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

        {/* Navigation arrows */}
        <button
          onClick={() => setCurrentPhoto((p) => (p - 1 + photos.length) % photos.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-card/70 p-2 backdrop-blur-sm transition-colors hover:bg-card/90"
          aria-label="Previous photo"
        >
          <ChevronLeft className="h-5 w-5 text-foreground" />
        </button>
        <button
          onClick={() => setCurrentPhoto((p) => (p + 1) % photos.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-card/70 p-2 backdrop-blur-sm transition-colors hover:bg-card/90"
          aria-label="Next photo"
        >
          <ChevronRight className="h-5 w-5 text-foreground" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {photos.map((_, i) => (
            <button key={i} onClick={() => setCurrentPhoto(i)}
              className={`h-2 w-2 rounded-full transition-all ${i === currentPhoto ? "w-6 bg-foreground" : "bg-foreground/40"}`}
              aria-label={`View photo ${i + 1}`} />
          ))}
        </div>

        {/* Badges */}
        <div className="absolute bottom-12 left-6 right-6 flex flex-wrap items-center gap-2">
          {danceTeam.yearFounded && (
            <Badge variant="outline" className="border-border/50 bg-card/80 text-xs text-foreground backdrop-blur-sm">Est. {danceTeam.yearFounded}</Badge>
          )}
          {danceTeam.memberCount && (
            <Badge variant="outline" className="border-border/50 bg-card/80 text-xs text-foreground backdrop-blur-sm">{danceTeam.memberCount} members</Badge>
          )}
        </div>
      </div>

      <div className="p-6">
        <p className="text-sm leading-relaxed text-muted-foreground">{danceTeam.description}</p>
        {danceTeam.notableAlumni.length > 0 && (
          <div className="mt-6">
            <h3 className="mb-3 text-sm font-semibold text-foreground">Notable Facts & Alumni</h3>
            <ul className="flex flex-col gap-2">
              {danceTeam.notableAlumni.map((alumni, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Star className="mt-0.5 h-3 w-3 shrink-0" style={{ color: confLightColor }} />{alumni}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-xs font-medium text-foreground">{value}</span>
    </div>
  );
}

