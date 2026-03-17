"use client";

import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { StandingEntry } from "@/lib/backend-types";
import { getTeamLogo } from "@/lib/logos";

interface StandingsTableProps {
  title: string;
  standings: StandingEntry[];
}

export function StandingsTable({ title, standings }: StandingsTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="border-b border-border bg-secondary/50 px-4 py-3">
        <h3 className="text-sm font-bold text-foreground">{title}</h3>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="w-12 text-xs text-muted-foreground">#</TableHead>
            <TableHead className="text-xs text-muted-foreground">Team</TableHead>
            <TableHead className="w-12 text-center text-xs text-muted-foreground">W</TableHead>
            <TableHead className="w-12 text-center text-xs text-muted-foreground">L</TableHead>
            <TableHead className="w-16 text-center text-xs text-muted-foreground">PCT</TableHead>
            <TableHead className="hidden w-24 text-xs text-muted-foreground sm:table-cell">Division</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {standings.map((entry) => (
            <TableRow
              key={entry.teamId}
              className="border-border transition-colors hover:bg-secondary/30"
            >
              <TableCell className="font-mono text-xs text-muted-foreground">
                {entry.rank}
              </TableCell>
              <TableCell>
                <Link href={`/team/${entry.teamId}`} className="flex items-center gap-2.5 group">
                  <div className="relative h-6 w-6 shrink-0">
                    <img
                      src={getTeamLogo(entry.teamId, "NBA")}
                      alt={`${entry.teamName} logo`}
                      width={24}
                      height={24}
                      className="h-6 w-6 object-contain"
                      loading="lazy"
                    />
                  </div>
                  <span className="truncate text-sm font-medium text-foreground group-hover:text-[var(--nba-orange)] transition-colors">
                    {entry.teamName}
                  </span>
                </Link>
              </TableCell>
              <TableCell className="text-center text-sm font-semibold text-foreground">
                {entry.wins}
              </TableCell>
              <TableCell className="text-center text-sm text-muted-foreground">
                {entry.losses}
              </TableCell>
              <TableCell className="text-center text-sm text-muted-foreground">
                {(entry.pct * 100).toFixed(1)}
              </TableCell>
              <TableCell className="hidden text-xs text-muted-foreground sm:table-cell">
                {entry.division}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

