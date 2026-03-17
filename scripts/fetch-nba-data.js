// Fetches NBA teams from TheSportsDB API and generates static TypeScript data files
const API_URL = 'https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=NBA';

// Manual mapping of NBA team locations to US state codes
const teamStateMap = {
  'Atlanta Hawks': 'GA',
  'Boston Celtics': 'MA',
  'Brooklyn Nets': 'NY',
  'Charlotte Hornets': 'NC',
  'Chicago Bulls': 'IL',
  'Cleveland Cavaliers': 'OH',
  'Dallas Mavericks': 'TX',
  'Denver Nuggets': 'CO',
  'Detroit Pistons': 'MI',
  'Golden State Warriors': 'CA',
  'Houston Rockets': 'TX',
  'Indiana Pacers': 'IN',
  'Los Angeles Clippers': 'CA',
  'Los Angeles Lakers': 'CA',
  'Memphis Grizzlies': 'TN',
  'Miami Heat': 'FL',
  'Milwaukee Bucks': 'WI',
  'Minnesota Timberwolves': 'MN',
  'New Orleans Pelicans': 'LA',
  'New York Knicks': 'NY',
  'Oklahoma City Thunder': 'OK',
  'Orlando Magic': 'FL',
  'Philadelphia 76ers': 'PA',
  'Phoenix Suns': 'AZ',
  'Portland Trail Blazers': 'OR',
  'Sacramento Kings': 'CA',
  'San Antonio Spurs': 'TX',
  'Toronto Raptors': 'ON', // Canada - Ontario
  'Utah Jazz': 'UT',
  'Washington Wizards': 'DC',
};

// NBA Standings 2024-2025 season (final regular season)
const standings2025 = [
  { team: 'Cleveland Cavaliers', conference: 'East', wins: 64, losses: 18, division: 'Central' },
  { team: 'Boston Celtics', conference: 'East', wins: 61, losses: 21, division: 'Atlantic' },
  { team: 'New York Knicks', conference: 'East', wins: 50, losses: 32, division: 'Atlantic' },
  { team: 'Indiana Pacers', conference: 'East', wins: 49, losses: 33, division: 'Central' },
  { team: 'Milwaukee Bucks', conference: 'East', wins: 48, losses: 34, division: 'Central' },
  { team: 'Detroit Pistons', conference: 'East', wins: 44, losses: 38, division: 'Central' },
  { team: 'Orlando Magic', conference: 'East', wins: 41, losses: 41, division: 'Southeast' },
  { team: 'Atlanta Hawks', conference: 'East', wins: 40, losses: 42, division: 'Southeast' },
  { team: 'Miami Heat', conference: 'East', wins: 37, losses: 45, division: 'Southeast' },
  { team: 'Chicago Bulls', conference: 'East', wins: 36, losses: 46, division: 'Central' },
  { team: 'Brooklyn Nets', conference: 'East', wins: 26, losses: 56, division: 'Atlantic' },
  { team: 'Philadelphia 76ers', conference: 'East', wins: 25, losses: 57, division: 'Atlantic' },
  { team: 'Toronto Raptors', conference: 'East', wins: 25, losses: 57, division: 'Atlantic' },
  { team: 'Charlotte Hornets', conference: 'East', wins: 21, losses: 61, division: 'Southeast' },
  { team: 'Washington Wizards', conference: 'East', wins: 15, losses: 67, division: 'Southeast' },
  { team: 'Oklahoma City Thunder', conference: 'West', wins: 68, losses: 14, division: 'Northwest' },
  { team: 'Houston Rockets', conference: 'West', wins: 52, losses: 30, division: 'Southwest' },
  { team: 'Memphis Grizzlies', conference: 'West', wins: 50, losses: 32, division: 'Southwest' },
  { team: 'Denver Nuggets', conference: 'West', wins: 50, losses: 32, division: 'Northwest' },
  { team: 'Dallas Mavericks', conference: 'West', wins: 49, losses: 33, division: 'Southwest' },
  { team: 'Minnesota Timberwolves', conference: 'West', wins: 49, losses: 33, division: 'Northwest' },
  { team: 'Los Angeles Lakers', conference: 'West', wins: 46, losses: 36, division: 'Pacific' },
  { team: 'Los Angeles Clippers', conference: 'West', wins: 42, losses: 40, division: 'Pacific' },
  { team: 'Golden State Warriors', conference: 'West', wins: 42, losses: 40, division: 'Pacific' },
  { team: 'Sacramento Kings', conference: 'West', wins: 39, losses: 43, division: 'Pacific' },
  { team: 'San Antonio Spurs', conference: 'West', wins: 38, losses: 44, division: 'Southwest' },
  { team: 'Phoenix Suns', conference: 'West', wins: 36, losses: 46, division: 'Pacific' },
  { team: 'Portland Trail Blazers', conference: 'West', wins: 27, losses: 55, division: 'Northwest' },
  { team: 'New Orleans Pelicans', conference: 'West', wins: 25, losses: 57, division: 'Southwest' },
  { team: 'Utah Jazz', conference: 'West', wins: 16, losses: 66, division: 'Northwest' },
];

// US States data
const usStates = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia',
  HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa',
  KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
  MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi',
  MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire',
  NJ: 'New Jersey', NM: 'New Mexico', NY: 'New York', NC: 'North Carolina',
  ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania',
  RI: 'Rhode Island', SC: 'South Carolina', SD: 'South Dakota', TN: 'Tennessee',
  TX: 'Texas', UT: 'Utah', VT: 'Vermont', VA: 'Virginia', WA: 'Washington',
  WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming', DC: 'District of Columbia',
};

async function main() {
  console.log('Fetching NBA teams from TheSportsDB...');
  
  const response = await fetch(API_URL);
  const data = await response.json();
  
  if (!data.teams) {
    console.error('No teams data received!');
    process.exit(1);
  }
  
  console.log(`Received ${data.teams.length} teams`);
  
  // Transform teams data
  const teams = data.teams.map((t) => ({
    id: t.idTeam,
    name: t.strTeam,
    shortName: t.strTeamShort || t.strTeam.split(' ').pop(),
    badge: t.strBadge || t.strTeamBadge || '',
    logo: t.strLogo || '',
    stadium: t.strStadium || '',
    stadiumThumb: t.strStadiumThumb || '',
    formedYear: t.intFormedYear || '',
    location: t.strLocation || '',
    stateCode: teamStateMap[t.strTeam] || 'UNKNOWN',
    conference: standings2025.find(s => s.team === t.strTeam)?.conference || 'Unknown',
    description: (t.strDescriptionEN || '').substring(0, 300),
    website: t.strWebsite || '',
    jersey: t.strEquipment || t.strKit || '',
    banner: t.strBanner || t.strTeamBanner || '',
  }));
  
  // Generate nba-teams.ts
  const teamsFileContent = `// Auto-generated from TheSportsDB API - do not edit manually
// Generated: ${new Date().toISOString()}

export interface NbaTeam {
  id: string;
  name: string;
  shortName: string;
  badge: string;
  logo: string;
  stadium: string;
  stadiumThumb: string;
  formedYear: string;
  location: string;
  stateCode: string;
  conference: string;
  description: string;
  website: string;
  jersey: string;
  banner: string;
}

export const nbaTeams: NbaTeam[] = ${JSON.stringify(teams, null, 2)};
`;

  // Generate nba-standings.ts
  const standingsWithIds = standings2025.map((s, index) => {
    const team = teams.find(t => t.name === s.team);
    return {
      rank: index + 1,
      teamId: team?.id || '',
      teamName: s.team,
      conference: s.conference,
      division: s.division,
      wins: s.wins,
      losses: s.losses,
      pct: Number((s.wins / (s.wins + s.losses)).toFixed(3)),
      badge: team?.badge || '',
    };
  });

  // Sort by conference and wins
  const eastStandings = standingsWithIds
    .filter(s => s.conference === 'East')
    .sort((a, b) => b.wins - a.wins)
    .map((s, i) => ({ ...s, rank: i + 1 }));
  const westStandings = standingsWithIds
    .filter(s => s.conference === 'West')
    .sort((a, b) => b.wins - a.wins)
    .map((s, i) => ({ ...s, rank: i + 1 }));

  const standingsFileContent = `// Auto-generated standings data - NBA 2024-2025 season
// Generated: ${new Date().toISOString()}

export interface StandingEntry {
  rank: number;
  teamId: string;
  teamName: string;
  conference: string;
  division: string;
  wins: number;
  losses: number;
  pct: number;
  badge: string;
}

export const eastStandings: StandingEntry[] = ${JSON.stringify(eastStandings, null, 2)};

export const westStandings: StandingEntry[] = ${JSON.stringify(westStandings, null, 2)};

export const nbaChampion = {
  season: '2024-2025',
  teamName: 'Oklahoma City Thunder',
  teamId: '${teams.find(t => t.name === 'Oklahoma City Thunder')?.id || ''}',
  badge: '${teams.find(t => t.name === 'Oklahoma City Thunder')?.badge || ''}',
  conference: 'West',
};
`;

  // Generate us-states.ts with teams mapping
  const statesWithTeams = {};
  for (const [code, name] of Object.entries(usStates)) {
    const stateTeams = teams.filter(t => t.stateCode === code);
    if (stateTeams.length > 0) {
      statesWithTeams[code] = {
        name,
        code,
        teams: stateTeams.map(t => t.name),
        teamCount: stateTeams.length,
      };
    }
  }

  const statesFileContent = `// Auto-generated US states with NBA teams mapping
// Generated: ${new Date().toISOString()}

export interface StateInfo {
  name: string;
  code: string;
  teams: string[];
  teamCount: number;
}

export const usStates: Record<string, string> = ${JSON.stringify(usStates, null, 2)};

export const statesWithNbaTeams: Record<string, StateInfo> = ${JSON.stringify(statesWithTeams, null, 2)};

export const nbaStatesCodes: string[] = ${JSON.stringify(Object.keys(statesWithTeams), null, 2)};
`;

  // Write files
  const { writeFileSync, mkdirSync } = await import('fs');
  const { join } = await import('path');
  
  const dataDir = join(process.cwd(), 'backend', 'src', 'data');
  mkdirSync(dataDir, { recursive: true });
  
  writeFileSync(join(dataDir, 'nba-teams.ts'), teamsFileContent);
  console.log('Written: backend/src/data/nba-teams.ts');
  
  writeFileSync(join(dataDir, 'nba-standings.ts'), standingsFileContent);
  console.log('Written: backend/src/data/nba-standings.ts');
  
  writeFileSync(join(dataDir, 'us-states.ts'), statesFileContent);
  console.log('Written: backend/src/data/us-states.ts');
  
  console.log('\nDone! All static data files generated successfully.');
  console.log(`Teams: ${teams.length}`);
  console.log(`States with NBA teams: ${Object.keys(statesWithTeams).length}`);
  console.log(`East standings: ${eastStandings.length}`);
  console.log(`West standings: ${westStandings.length}`);
}

main().catch(console.error);
