"use client";

import { useEffect, useMemo, useState } from "react";
import { UsaMapComponent } from "@/components/usa-map";
import { StateTeamsPanel } from "@/components/state-teams-panel";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { backendFetch } from "@/lib/backend-api";
import type { BootstrapData } from "@/lib/backend-types";

export default function MapPage() {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [bootstrap, setBootstrap] = useState<BootstrapData | null>(null);

  useEffect(() => {
    let mounted = true;

    backendFetch<BootstrapData>("/api/bootstrap")
      .then((data) => {
        if (mounted) {
          setBootstrap(data);
        }
      })
      .catch(() => {
        if (mounted) {
          setBootstrap(null);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const basketballStates = useMemo(() => bootstrap?.nonNbaBasketballStates ?? [], [bootstrap]);
  const nbaStatesCodes = bootstrap?.nbaStatesCodes ?? [];
  const usStates = bootstrap?.usStates ?? {};
  const statesWithNbaTeams = bootstrap?.statesWithNbaTeams ?? {};
  const nbaTeams = bootstrap?.nbaTeams ?? [];
  const eastStandings = bootstrap?.eastStandings ?? [];
  const westStandings = bootstrap?.westStandings ?? [];
  const wnbaTeams = bootstrap?.wnbaTeams ?? [];
  const ncaaTeams = bootstrap?.ncaaTeams ?? [];
  const gLeagueTeams = bootstrap?.gLeagueTeams ?? [];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex flex-1 flex-col">
        {/* Hero section */}
        <section className="border-b border-border bg-secondary/30 px-4 py-6">
          <div className="mx-auto max-w-7xl">
            <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Basketball Across the{" "}
              <span className="text-[var(--nba-orange)]">United States</span>
            </h1>
            <p className="mt-2 text-pretty text-sm text-muted-foreground md:text-base">
              Click any state to explore basketball teams -- NBA, WNBA, NCAA, and G-League.
              {" "}
              <span className="text-[#6b9fff]">Eastern</span> and{" "}
              <span className="text-[#ff7b8a]">Western</span> conference states highlighted.
            </p>
          </div>
        </section>

        {/* Map + Panel */}
        <section className="flex flex-1">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row">
            {/* Map */}
            <div className="flex-1">
              <div className="rounded-xl border border-border bg-card p-4">
                <UsaMapComponent
                  onStateClick={setSelectedState}
                  selectedState={selectedState}
                  basketballStates={basketballStates}
                  usStates={usStates}
                  statesWithNbaTeams={statesWithNbaTeams}
                />
                {/* Legend */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: "#1D428A" }} />
                    <span>NBA East</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: "#C8102E" }} />
                    <span>NBA West</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-sm bg-[var(--nba-orange)]" />
                    <span>Selected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: "#2a3352" }} />
                    <span>Other basketball</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: "#1a2236" }} />
                    <span>No teams</span>
                  </div>
                </div>
              </div>

              {/* Quick stats */}
              {!selectedState && (
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <QuickStat label="NBA Teams" value="30" color="var(--nba-orange)" />
                  <QuickStat label="WNBA Teams" value="13" color="#c084fc" />
                  <QuickStat label="NBA States" value="22" color="#6b9fff" />
                  <QuickStat label="Top NCAA" value="75+" color="#4ade80" />
                </div>
              )}
            </div>

            {/* Side panel */}
            {selectedState && (
              <div className="h-[600px] w-full shrink-0 lg:w-[420px]">
                <StateTeamsPanel
                  stateCode={selectedState}
                  onClose={() => setSelectedState(null)}
                  usStates={usStates}
                  statesWithNbaTeams={statesWithNbaTeams}
                  nbaTeams={nbaTeams}
                  eastStandings={eastStandings}
                  westStandings={westStandings}
                  wnbaTeams={wnbaTeams}
                  ncaaTeams={ncaaTeams}
                  gLeagueTeams={gLeagueTeams}
                />
              </div>
            )}
          </div>
        </section>

        {/* Quick access badges */}
        <section className="border-t border-border px-4 py-6">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Quick Access -- All States
            </h2>
            <div className="flex flex-wrap gap-2">
              {Object.keys(usStates).sort().map((code) => {
                const isNba = nbaStatesCodes.includes(code);
                const isBasketball = basketballStates.includes(code);
                const isSelected = code === selectedState;

                let classes = "border-border text-muted-foreground hover:text-foreground";
                if (isSelected) {
                  classes = "border-[var(--nba-orange)] bg-[var(--nba-orange)]/20 text-[var(--nba-orange)]";
                } else if (isNba) {
                  classes = "border-[#1D428A]/50 text-[#6b9fff] hover:bg-[#1D428A]/20";
                } else if (isBasketball) {
                  classes = "border-border text-muted-foreground hover:bg-secondary";
                }

                return (
                  <Badge
                    key={code}
                    variant="outline"
                    className={`cursor-pointer transition-all ${classes}`}
                    onClick={() => setSelectedState(code === selectedState ? null : code)}
                  >
                    {code}
                  </Badge>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function QuickStat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-3 text-center">
      <p className="text-lg font-bold" style={{ color }}>{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

