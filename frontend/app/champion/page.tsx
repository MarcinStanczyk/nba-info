"use client";

import { SiteHeader } from "@/components/site-header";
import { FeatureChampionComponent } from "@/components/feature-champion";

export default function ChampionPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero section */}
        <section className="border-b border-border bg-secondary/30 px-4 py-6">
          <div className="mx-auto max-w-7xl">
            <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              NBA Champion <span className="text-nba-orange">Predictor</span>
            </h1>
            <p className="mt-2 text-pretty text-sm text-muted-foreground md:text-base">
              Discover which team has the best chances to win the NBA championship using advanced
              analytics and machine learning.
            </p>
          </div>
        </section>

        {/* Content */}
        <div className="mx-auto max-w-7xl px-4 py-8">
          <FeatureChampionComponent />
        </div>
      </main>
    </div>
  );
}

