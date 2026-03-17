import { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import { TeamPageClient } from "@/components/team-page-client";

export default function TeamPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <Suspense fallback={<main className="mx-auto w-full max-w-4xl px-4 py-10 text-sm text-muted-foreground">Loading team...</main>}>
        <TeamPageClient />
      </Suspense>
    </div>
  );
}
