"use client";

import { useState, useMemo } from "react";
import { USAMap } from "@mirawision/usa-map-react";
import type { USAStateAbbreviation } from "@mirawision/usa-map-react";
import { statesWithNbaTeams, usStates } from "@/backend/src/data/us-states";

// Conference color scheme
const EAST_COLOR = "#1D428A";       // NBA blue
const EAST_HOVER = "#2855A8";
const WEST_COLOR = "#C8102E";       // NBA red
const WEST_HOVER = "#E01838";
const SELECTED_COLOR = "#F58426";   // NBA orange
const DEFAULT_COLOR = "#1a2236";    // dark - no NBA
const DEFAULT_HOVER = "#253049";
const BASKETBALL_COLOR = "#2a3352"; // slightly lighter for non-NBA basketball states

interface UsaMapProps {
  onStateClick: (stateCode: string) => void;
  selectedState: string | null;
  basketballStates?: string[];  // non-NBA states that have basketball teams
}

export function UsaMapComponent({ onStateClick, selectedState, basketballStates = [] }: UsaMapProps) {
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  const customStates = useMemo(() => {
    const states: Record<string, {
      fill: string;
      stroke: string;
      strokeWidth?: number;
      onClick?: () => void;
      onMouseEnter?: () => void;
      onMouseLeave?: () => void;
    }> = {};

    const allStates = Object.keys(usStates);

    for (const code of allStates) {
      const nbaInfo = statesWithNbaTeams[code];
      const isSelected = code === selectedState;
      const isHovered = code === hoveredState;
      const hasBasketball = basketballStates.includes(code);

      let fill = DEFAULT_COLOR;
      let stroke = "#2d3748";
      let strokeWidth = 0.5;

      if (isSelected) {
        fill = SELECTED_COLOR;
        stroke = "#FFD700";
        strokeWidth = 2;
      } else if (nbaInfo) {
        // NBA state -- color by conference
        if (isHovered) {
          fill = nbaInfo.conference === "East" ? EAST_HOVER : WEST_HOVER;
          stroke = nbaInfo.conference === "East" ? "#4a7cd4" : "#ff4060";
          strokeWidth = 1.5;
        } else {
          fill = nbaInfo.conference === "East" ? EAST_COLOR : WEST_COLOR;
          stroke = nbaInfo.conference === "East" ? "#2a5494" : "#d8203e";
        }
      } else if (hasBasketball) {
        // Non-NBA state with other basketball teams
        fill = isHovered ? DEFAULT_HOVER : BASKETBALL_COLOR;
        stroke = isHovered ? "#475569" : "#374151";
        strokeWidth = isHovered ? 1 : 0.5;
      } else {
        // No basketball
        fill = isHovered ? DEFAULT_HOVER : DEFAULT_COLOR;
        stroke = isHovered ? "#475569" : "#2d3748";
      }

      states[code] = {
        fill,
        stroke,
        strokeWidth,
        onClick: () => onStateClick(code),
        onMouseEnter: () => setHoveredState(code),
        onMouseLeave: () => setHoveredState(null),
      };
    }

    return states;
  }, [selectedState, hoveredState, onStateClick, basketballStates]);

  const hoveredInfo = hoveredState ? statesWithNbaTeams[hoveredState] : null;
  const hoveredStateName = hoveredState ? usStates[hoveredState] : null;
  const hoveredHasBasketball = hoveredState ? basketballStates.includes(hoveredState) : false;

  return (
    <div className="relative w-full">
      <USAMap
        customStates={customStates as Record<USAStateAbbreviation, typeof customStates[string]>}
        mapSettings={{
          width: "100%",
          height: "auto",
        }}
        className="usa-map-svg"
      />

      {/* Tooltip */}
      {hoveredState && hoveredState !== selectedState && (
        <div className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 rounded-lg border border-border bg-card/95 px-4 py-2 text-sm shadow-xl backdrop-blur-sm">
          {hoveredInfo ? (
            <span>
              <span className="font-bold" style={{ color: hoveredInfo.conference === "East" ? "#6b9fff" : "#ff7b8a" }}>
                {hoveredStateName}
              </span>
              {" -- "}
              <span className="text-foreground">
                {hoveredInfo.teamCount} NBA {hoveredInfo.teamCount === 1 ? "team" : "teams"}
              </span>
              <span className="ml-2 text-xs text-muted-foreground">
                ({hoveredInfo.conference}ern)
              </span>
            </span>
          ) : hoveredHasBasketball ? (
            <span className="text-muted-foreground">
              <span className="font-medium text-foreground">{hoveredStateName}</span>
              {" -- WNBA / NCAA / G-League teams"}
            </span>
          ) : (
            <span className="text-muted-foreground">
              {hoveredStateName}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

