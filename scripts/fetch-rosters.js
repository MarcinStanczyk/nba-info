import fs from "fs";
import path from "path";

// ESPN team IDs map to our short codes
const ESPN_TEAMS = {
  1: "atl", 2: "bos", 17: "bkn", 30: "cha", 4: "chi",
  5: "cle", 6: "dal", 7: "den", 8: "det", 9: "gsw",
  10: "hou", 11: "ind", 12: "lac", 13: "lal", 29: "mem",
  14: "mia", 15: "mil", 16: "min", 3: "nop", 18: "nyk",
  25: "okc", 19: "orl", 20: "phi", 21: "phx", 22: "por",
  23: "sac", 24: "sas", 28: "tor", 26: "uta", 27: "was"
};

async function fetchTeamRoster(espnTeamId) {
  const url = `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${espnTeamId}/roster`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`ESPN API error for team ${espnTeamId}: ${res.status}`);
  return res.json();
}

function extractPlayers(data, maxPlayers = 10) {
  if (!data.athletes || !Array.isArray(data.athletes)) return [];
  
  return data.athletes
    .slice(0, maxPlayers)
    .map(a => {
      const jersey = a.jersey || "?";
      const pos = a.position?.abbreviation || "?";
      const headshot = a.headshot?.href || "";
      const college = a.college?.name || a.college?.shortName || "";
      const country = a.birthPlace?.country || "USA";
      const city = a.birthPlace?.city || "";
      const state = a.birthPlace?.state || "";
      const birthplace = [city, state, country].filter(Boolean).join(", ");
      
      return {
        id: a.id,
        name: a.fullName || a.displayName,
        number: jersey,
        position: pos,
        height: a.displayHeight || "?",
        weight: a.displayWeight || "?",
        age: a.age || 0,
        country: country,
        college: college,
        birthplace: birthplace,
        imageUrl: headshot,
        experience: a.experience?.years || 0
      };
    });
}

async function main() {
  console.log("Fetching NBA rosters from ESPN API...");
  
  const allRosters = {};
  const espnIds = Object.keys(ESPN_TEAMS).map(Number);
  
  for (const espnId of espnIds) {
    const shortCode = ESPN_TEAMS[espnId];
    try {
      const data = await fetchTeamRoster(espnId);
      const players = extractPlayers(data);
      allRosters[shortCode] = { teamId: shortCode, players };
      console.log(`  ${shortCode.toUpperCase()}: ${players.length} players (${players.map(p => p.name).slice(0,3).join(', ')}...)`);
      // Small delay to be kind to ESPN
      await new Promise(r => setTimeout(r, 200));
    } catch (err) {
      console.error(`  ERROR ${shortCode}: ${err.message}`);
      allRosters[shortCode] = { teamId: shortCode, players: [] };
    }
  }
  
  // Generate TypeScript file
  let ts = `export interface NbaPlayer {
  id: string;
  name: string;
  number: string;
  position: string;
  height: string;
  weight: string;
  age: number;
  country: string;
  college: string;
  birthplace: string;
  imageUrl: string;
  experience: number;
}

export interface TeamRoster {
  teamId: string;
  players: NbaPlayer[];
}

export const nbaRosters: Record<string, TeamRoster> = `;
  
  ts += JSON.stringify(allRosters, null, 2) + ";\n";
  
  // Output the raw JSON so we can capture it
  console.log("===JSON_START===");
  console.log(JSON.stringify(allRosters));
  console.log("===JSON_END===");
  
  // Count total players
  const total = Object.values(allRosters).reduce((s, r) => s + r.players.length, 0);
  console.log(`Total players: ${total}`);
}

main().catch(console.error);
