import { SiteHeader } from "@/components/site-header";
import { ChampionBanner, StateChampionCard } from "@/components/liga-components";
import { StandingsTable } from "@/components/standings-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { backendFetch } from "@/lib/backend-api";
import type { Champion, StandingEntry, StateChampion } from "@/lib/backend-types";

interface LeagueOverviewResponse {
  nbaChampion: Champion;
  eastStandings: StandingEntry[];
  westStandings: StandingEntry[];
  stateChampions: StateChampion[];
}

export default async function LigaPage() {
  const overview = await backendFetch<LeagueOverviewResponse>("/api/standings", { cache: "no-store" });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border bg-secondary/30 px-4 py-6">
          <div className="mx-auto max-w-7xl">
            <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              NBA <span className="text-nba-orange">Liga</span> 2024-2025
            </h1>
            <p className="mt-2 text-pretty text-sm text-muted-foreground md:text-base">
              Current NBA champion, state champions, and conference standings.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-6">
          {/* Champion Banner */}
          <ChampionBanner champion={overview.nbaChampion} />

          {/* Tabs */}
          <Tabs defaultValue="state-champions" className="mt-8">
            <TabsList className="bg-secondary">
              <TabsTrigger value="state-champions" className="data-[state=active]:bg-nba-orange/20 data-[state=active]:text-nba-orange">
                State Champions
              </TabsTrigger>
              <TabsTrigger value="east" className="data-[state=active]:bg-nba-orange/20 data-[state=active]:text-nba-orange">
                Eastern
              </TabsTrigger>
              <TabsTrigger value="west" className="data-[state=active]:bg-nba-orange/20 data-[state=active]:text-nba-orange">
                Western
              </TabsTrigger>
            </TabsList>

            {/* State Champions */}
            <TabsContent value="state-champions" className="mt-6">
              <div className="mb-4">
                <h2 className="text-lg font-bold text-foreground">
                  State Champions
                </h2>
                <p className="text-sm text-muted-foreground">
                  The best NBA team from each state based on regular season record.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {overview.stateChampions.map((sc) => (
                  <StateChampionCard
                    key={sc.stateCode}
                    stateCode={sc.stateCode}
                    stateName={sc.stateName}
                    champion={sc.champion}
                    otherTeams={sc.otherTeams}
                  />
                ))}
              </div>
            </TabsContent>

            {/* Eastern Conference */}
            <TabsContent value="east" className="mt-6">
              <StandingsTable
                title="Eastern Conference Standings"
                standings={overview.eastStandings}
              />
            </TabsContent>

            {/* Western Conference */}
            <TabsContent value="west" className="mt-6">
              <StandingsTable
                title="Western Conference Standings"
                standings={overview.westStandings}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

