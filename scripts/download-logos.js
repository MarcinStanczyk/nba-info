import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

const PROJECT_ROOT = process.cwd().includes("scripts")
  ? path.resolve(process.cwd(), "..")
  : process.cwd();
const LOGOS_DIR = path.join(PROJECT_ROOT, "public", "logos");
const NBA_DIR = path.join(LOGOS_DIR, "nba");
const WNBA_DIR = path.join(LOGOS_DIR, "wnba");

// Create directories
for (const dir of [LOGOS_DIR, NBA_DIR, WNBA_DIR]) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    if (!url || url === "") return resolve(false);
    const client = url.startsWith("https") ? https : http;
    const req = client.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        console.log(`  SKIP ${path.basename(destPath)} (HTTP ${res.statusCode})`);
        return resolve(false);
      }
      const ws = fs.createWriteStream(destPath);
      res.pipe(ws);
      ws.on("finish", () => { ws.close(); resolve(true); });
      ws.on("error", reject);
    });
    req.on("error", (e) => { console.log(`  ERROR ${path.basename(destPath)}: ${e.message}`); resolve(false); });
    req.setTimeout(10000, () => { req.destroy(); resolve(false); });
  });
}

// NBA Teams with badge URLs
const nbaTeams = [
  { id: "134880", short: "ATL", name: "Atlanta Hawks", badge: "https://www.thesportsdb.com/images/media/team/badge/q2a5wh1689091521.png" },
  { id: "134860", short: "BOS", name: "Boston Celtics", badge: "https://www.thesportsdb.com/images/media/team/badge/sswttv1691183927.png" },
  { id: "134861", short: "BKN", name: "Brooklyn Nets", badge: "https://www.thesportsdb.com/images/media/team/badge/h0dwny1600552068.png" },
  { id: "134881", short: "CHA", name: "Charlotte Hornets", badge: "https://www.thesportsdb.com/images/media/team/badge/zjtl6g1689091685.png" },
  { id: "134871", short: "CHI", name: "Chicago Bulls", badge: "https://www.thesportsdb.com/images/media/team/badge/yk74gq1689091515.png" },
  { id: "134872", short: "CLE", name: "Cleveland Cavaliers", badge: "https://www.thesportsdb.com/images/media/team/badge/a%5Dwrux1689091503.png" },
  { id: "134885", short: "DAL", name: "Dallas Mavericks", badge: "https://www.thesportsdb.com/images/media/team/badge/yqptxv1689091757.png" },
  { id: "134888", short: "DEN", name: "Denver Nuggets", badge: "https://www.thesportsdb.com/images/media/team/badge/8o8j5k1546016274.png" },
  { id: "134873", short: "DET", name: "Detroit Pistons", badge: "https://www.thesportsdb.com/images/media/team/badge/2t2wq21689091497.png" },
  { id: "134865", short: "GSW", name: "Golden State Warriors", badge: "https://www.thesportsdb.com/images/media/team/badge/irobi61565197527.png" },
  { id: "134886", short: "HOU", name: "Houston Rockets", badge: "https://www.thesportsdb.com/images/media/team/badge/yezpev1689091744.png" },
  { id: "134874", short: "IND", name: "Indiana Pacers", badge: "https://www.thesportsdb.com/images/media/team/badge/v6jzgm1503741821.png" },
  { id: "134866", short: "LAC", name: "Los Angeles Clippers", badge: "https://www.thesportsdb.com/images/media/team/badge/jv7tf21545916958.png" },
  { id: "134867", short: "LAL", name: "Los Angeles Lakers", badge: "https://www.thesportsdb.com/images/media/team/badge/spa59p1689091693.png" },
  { id: "134887", short: "MEM", name: "Memphis Grizzlies", badge: "https://www.thesportsdb.com/images/media/team/badge/m64v1d1689091727.png" },
  { id: "134882", short: "MIA", name: "Miami Heat", badge: "https://www.thesportsdb.com/images/media/team/badge/5v67x51547214763.png" },
  { id: "134875", short: "MIL", name: "Milwaukee Bucks", badge: "https://www.thesportsdb.com/images/media/team/badge/dmp1ad1689091486.png" },
  { id: "134889", short: "MIN", name: "Minnesota Timberwolves", badge: "https://www.thesportsdb.com/images/media/team/badge/5xpgjg1689091782.png" },
  { id: "134883", short: "NOP", name: "New Orleans Pelicans", badge: "https://www.thesportsdb.com/images/media/team/badge/f341s31523700397.png" },
  { id: "134862", short: "NYK", name: "New York Knicks", badge: "https://www.thesportsdb.com/images/media/team/badge/wyhpuf1511810435.png" },
  { id: "134890", short: "OKC", name: "Oklahoma City Thunder", badge: "https://www.thesportsdb.com/images/media/team/badge/xqtvvp1422380624.png" },
  { id: "134884", short: "ORL", name: "Orlando Magic", badge: "https://www.thesportsdb.com/images/media/team/badge/txuyrr1422492990.png" },
  { id: "134863", short: "PHI", name: "Philadelphia 76ers", badge: "https://www.thesportsdb.com/images/media/team/badge/71545f1518464849.png" },
  { id: "134868", short: "PHX", name: "Phoenix Suns", badge: "https://www.thesportsdb.com/images/media/team/badge/2t2yss1689091701.png" },
  { id: "134891", short: "POR", name: "Portland Trail Blazers", badge: "https://www.thesportsdb.com/images/media/team/badge/mbtzin1689091789.png" },
  { id: "134869", short: "SAC", name: "Sacramento Kings", badge: "https://www.thesportsdb.com/images/media/team/badge/5d7mhj1689091710.png" },
  { id: "134878", short: "SAS", name: "San Antonio Spurs", badge: "https://www.thesportsdb.com/images/media/team/badge/bfrmp61689091769.png" },
  { id: "134864", short: "TOR", name: "Toronto Raptors", badge: "https://www.thesportsdb.com/images/media/team/badge/ax36vz1689091536.png" },
  { id: "134892", short: "UTA", name: "Utah Jazz", badge: "https://www.thesportsdb.com/images/media/team/badge/9p1e5t1572370890.png" },
  { id: "134879", short: "WAS", name: "Washington Wizards", badge: "https://www.thesportsdb.com/images/media/team/badge/qlhgis1689091547.png" },
];

// WNBA Teams with badge URLs
const wnbaTeams = [
  { id: "wnba-atl", short: "ATL", name: "Atlanta Dream", badge: "https://www.thesportsdb.com/images/media/team/badge/ihmgvi1660905834.png" },
  { id: "wnba-chi", short: "CHI", name: "Chicago Sky", badge: "https://www.thesportsdb.com/images/media/team/badge/9vnx1q1660905866.png" },
  { id: "wnba-con", short: "CON", name: "Connecticut Sun", badge: "https://www.thesportsdb.com/images/media/team/badge/4r3lvz1660905884.png" },
  { id: "wnba-dal", short: "DAL", name: "Dallas Wings", badge: "https://www.thesportsdb.com/images/media/team/badge/6gmzgx1660905924.png" },
  { id: "wnba-ind", short: "IND", name: "Indiana Fever", badge: "https://www.thesportsdb.com/images/media/team/badge/m59yb41660905948.png" },
  { id: "wnba-lva", short: "LVA", name: "Las Vegas Aces", badge: "https://www.thesportsdb.com/images/media/team/badge/kbf68t1660905965.png" },
  { id: "wnba-la", short: "LA", name: "Los Angeles Sparks", badge: "https://www.thesportsdb.com/images/media/team/badge/22xjzp1660905979.png" },
  { id: "wnba-min", short: "MIN", name: "Minnesota Lynx", badge: "https://www.thesportsdb.com/images/media/team/badge/g1vhu61660905997.png" },
  { id: "wnba-ny", short: "NY", name: "New York Liberty", badge: "https://www.thesportsdb.com/images/media/team/badge/6d2jm81660906015.png" },
  { id: "wnba-phx", short: "PHX", name: "Phoenix Mercury", badge: "https://www.thesportsdb.com/images/media/team/badge/j02h8k1660906035.png" },
  { id: "wnba-sea", short: "SEA", name: "Seattle Storm", badge: "https://www.thesportsdb.com/images/media/team/badge/i65dom1660906059.png" },
  { id: "wnba-was", short: "WAS", name: "Washington Mystics", badge: "https://www.thesportsdb.com/images/media/team/badge/u8g8m41660906082.png" },
];

async function main() {
  let downloaded = 0;
  let skipped = 0;

  console.log("=== Downloading NBA logos ===");
  for (const team of nbaTeams) {
    const fileName = `${team.short.toLowerCase()}.png`;
    const destPath = path.join(NBA_DIR, fileName);
    if (fs.existsSync(destPath)) { console.log(`  EXISTS ${fileName}`); skipped++; continue; }
    console.log(`  Downloading ${team.name} -> ${fileName}`);
    const ok = await downloadFile(team.badge, destPath);
    if (ok) downloaded++; else skipped++;
    await new Promise(r => setTimeout(r, 300));
  }

  console.log("\n=== Downloading WNBA logos ===");
  for (const team of wnbaTeams) {
    const fileName = `${team.id}.png`;
    const destPath = path.join(WNBA_DIR, fileName);
    if (fs.existsSync(destPath)) { console.log(`  EXISTS ${fileName}`); skipped++; continue; }
    console.log(`  Downloading ${team.name} -> ${fileName}`);
    const ok = await downloadFile(team.badge, destPath);
    if (ok) downloaded++; else skipped++;
    await new Promise(r => setTimeout(r, 300));
  }

  console.log(`\nDone! Downloaded: ${downloaded}, Skipped: ${skipped}`);
  console.log(`NBA logos: ${NBA_DIR}`);
  console.log(`WNBA logos: ${WNBA_DIR}`);
}

main().catch(console.error);
