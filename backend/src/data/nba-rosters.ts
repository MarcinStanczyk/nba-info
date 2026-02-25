export interface NbaPlayer {
  id: string;
  name: string;
  number: string;
  position: string;
  height: string;
  weight: string;
  age: number;
  country: string;
  college: string;
  imageUrl: string;
}

export interface TeamRoster {
  teamId: string;
  players: NbaPlayer[];
}

// NBA.com CDN headshots: https://cdn.nba.com/headshots/nba/latest/260x190/{playerId}.png
function p(id: string, name: string, number: string, position: string, height: string, weight: string, age: number, country: string, college: string): NbaPlayer {
  return { id, name, number, position, height, weight, age, country, college, imageUrl: `https://cdn.nba.com/headshots/nba/latest/260x190/${id}.png` };
}

export const nbaRosters: Record<string, TeamRoster> = {
  // Atlanta Hawks
  "atl": { teamId: "atl", players: [
    p("1630214", "Jalen Johnson", "1", "SF", "6'9\"", "220 lbs", 23, "USA", "Duke"),
    p("1629027", "Trae Young", "11", "PG", "6'1\"", "164 lbs", 26, "USA", "Oklahoma"),
    p("1629631", "De'Andre Hunter", "12", "SF", "6'8\"", "225 lbs", 27, "USA", "Virginia"),
    p("1630224", "Onyeka Okongwu", "17", "C", "6'8\"", "235 lbs", 24, "USA", "USC"),
    p("1631100", "Dyson Daniels", "5", "SG", "6'7\"", "196 lbs", 22, "Australia", "G League Ignite"),
    p("1628960", "Clint Capela", "15", "C", "6'10\"", "240 lbs", 31, "Switzerland", ""),
    p("1630532", "Jalen Williams", "8", "SG", "6'6\"", "195 lbs", 24, "USA", "Santa Clara"),
    p("1631105", "AJ Griffin", "14", "SG", "6'6\"", "222 lbs", 22, "USA", "Duke"),
  ]},
  // Boston Celtics
  "bos": { teamId: "bos", players: [
    p("1628369", "Jayson Tatum", "0", "SF", "6'8\"", "210 lbs", 27, "USA", "Duke"),
    p("1627759", "Jaylen Brown", "7", "SG", "6'6\"", "223 lbs", 28, "USA", "California"),
    p("1629684", "Derrick White", "9", "PG", "6'4\"", "190 lbs", 30, "USA", "Colorado"),
    p("203935", "Jrue Holiday", "4", "PG", "6'3\"", "205 lbs", 34, "USA", "UCLA"),
    p("1629750", "Kristaps Porzingis", "8", "C", "7'2\"", "240 lbs", 29, "Latvia", ""),
    p("1629682", "Payton Pritchard", "11", "PG", "6'1\"", "195 lbs", 27, "USA", "Oregon"),
    p("1628400", "Al Horford", "42", "C", "6'9\"", "240 lbs", 38, "Dominican Republic", "Florida"),
    p("1631312", "Sam Hauser", "30", "SF", "6'7\"", "215 lbs", 27, "USA", "Virginia"),
  ]},
  // Brooklyn Nets
  "bkn": { teamId: "bkn", players: [
    p("1629003", "Cam Thomas", "24", "SG", "6'3\"", "210 lbs", 23, "USA", "LSU"),
    p("1631165", "Ben Simmons", "10", "PG", "6'11\"", "240 lbs", 28, "Australia", "LSU"),
    p("1628386", "Dennis Smith Jr.", "4", "PG", "6'2\"", "205 lbs", 27, "USA", "NC State"),
    p("1630561", "Day'Ron Sharpe", "20", "C", "6'11\"", "265 lbs", 23, "USA", "North Carolina"),
    p("1630596", "Cameron Johnson", "2", "SF", "6'8\"", "210 lbs", 28, "USA", "North Carolina"),
    p("1629060", "Nic Claxton", "33", "C", "6'11\"", "215 lbs", 25, "USA", "Georgia"),
    p("1630567", "Ziaire Williams", "12", "SF", "6'8\"", "185 lbs", 23, "USA", "Stanford"),
    p("1631246", "Noah Clowney", "5", "PF", "6'9\"", "210 lbs", 21, "USA", "Alabama"),
  ]},
  // Charlotte Hornets
  "cha": { teamId: "cha", players: [
    p("1630163", "LaMelo Ball", "1", "PG", "6'7\"", "180 lbs", 23, "USA", ""),
    p("1630169", "Brandon Miller", "24", "SF", "6'9\"", "200 lbs", 22, "USA", "Alabama"),
    p("1629612", "Miles Bridges", "0", "SF", "6'6\"", "225 lbs", 27, "USA", "Michigan State"),
    p("1629636", "P.J. Washington", "25", "PF", "6'7\"", "230 lbs", 26, "USA", "Kentucky"),
    p("1628977", "Mark Williams", "5", "C", "7'0\"", "242 lbs", 23, "USA", "Duke"),
    p("1630228", "Nick Richards", "14", "C", "7'0\"", "246 lbs", 27, "USA", "Kentucky"),
    p("1630195", "Tre Mann", "3", "PG", "6'3\"", "190 lbs", 24, "USA", "Florida"),
    p("1631098", "Cody Williams", "2", "SG", "6'7\"", "180 lbs", 20, "USA", "Colorado"),
  ]},
  // Chicago Bulls
  "chi": { teamId: "chi", players: [
    p("1629632", "Coby White", "0", "PG", "6'4\"", "195 lbs", 25, "USA", "North Carolina"),
    p("1628374", "Josh Giddey", "3", "PG", "6'8\"", "205 lbs", 22, "Australia", ""),
    p("203897", "Zach LaVine", "8", "SG", "6'5\"", "200 lbs", 29, "USA", "UCLA"),
    p("1629655", "Nikola Vucevic", "9", "C", "6'10\"", "260 lbs", 34, "Montenegro", "USC"),
    p("1631096", "Matas Buzelis", "2", "SF", "6'10\"", "197 lbs", 20, "USA", "G League Ignite"),
    p("1630543", "Ayo Dosunmu", "12", "SG", "6'5\"", "200 lbs", 25, "USA", "Illinois"),
    p("1628966", "Patrick Williams", "44", "PF", "6'7\"", "215 lbs", 23, "USA", "Florida State"),
    p("1629744", "Torrey Craig", "13", "SF", "6'7\"", "215 lbs", 34, "USA", ""),
  ]},
  // Cleveland Cavaliers
  "cle": { teamId: "cle", players: [
    p("1629636", "Donovan Mitchell", "45", "SG", "6'1\"", "215 lbs", 28, "USA", "Louisville"),
    p("1630596", "Darius Garland", "10", "PG", "6'1\"", "192 lbs", 25, "USA", "Vanderbilt"),
    p("1629661", "Jarrett Allen", "31", "C", "6'11\"", "243 lbs", 26, "USA", "Texas"),
    p("1629029", "Evan Mobley", "4", "PF", "7'0\"", "215 lbs", 23, "USA", "USC"),
    p("203914", "Caris LeVert", "3", "SG", "6'6\"", "205 lbs", 30, "USA", "Michigan"),
    p("1628436", "Max Strus", "1", "SG", "6'5\"", "215 lbs", 28, "USA", "DePaul"),
    p("203924", "Isaac Okoro", "35", "SF", "6'5\"", "225 lbs", 24, "USA", "Auburn"),
    p("1627812", "Sam Merrill", "15", "SG", "6'5\"", "205 lbs", 28, "USA", "Utah State"),
  ]},
  // Dallas Mavericks
  "dal": { teamId: "dal", players: [
    p("1629029", "Luka Doncic", "77", "PG", "6'7\"", "230 lbs", 26, "Slovenia", ""),
    p("1628398", "Kyrie Irving", "11", "PG", "6'2\"", "195 lbs", 33, "USA", "Duke"),
    p("1629008", "P.J. Washington", "25", "PF", "6'7\"", "230 lbs", 26, "USA", "Kentucky"),
    p("1629006", "Daniel Gafford", "21", "C", "6'10\"", "234 lbs", 26, "USA", "Arkansas"),
    p("1627775", "Klay Thompson", "31", "SG", "6'6\"", "215 lbs", 35, "USA", "Washington State"),
    p("203915", "Dereck Lively II", "2", "C", "7'1\"", "230 lbs", 21, "USA", "Duke"),
    p("1631094", "Quentin Grimes", "5", "SG", "6'4\"", "210 lbs", 25, "USA", "Houston"),
    p("203922", "Naji Marshall", "8", "SF", "6'7\"", "220 lbs", 27, "USA", "Xavier"),
  ]},
  // Denver Nuggets
  "den": { teamId: "den", players: [
    p("203999", "Nikola Jokic", "15", "C", "6'11\"", "284 lbs", 29, "Serbia", ""),
    p("203897", "Jamal Murray", "27", "PG", "6'4\"", "215 lbs", 28, "Canada", "Kentucky"),
    p("1629008", "Michael Porter Jr.", "1", "SF", "6'10\"", "218 lbs", 26, "USA", "Missouri"),
    p("200794", "Aaron Gordon", "50", "PF", "6'8\"", "235 lbs", 29, "USA", "Arizona"),
    p("1629750", "Christian Braun", "0", "SG", "6'7\"", "218 lbs", 24, "USA", "Kansas"),
    p("203898", "Russell Westbrook", "4", "PG", "6'3\"", "200 lbs", 36, "USA", "UCLA"),
    p("1628381", "Peyton Watson", "8", "SF", "6'8\"", "200 lbs", 22, "USA", "UCLA"),
    p("1627749", "Julian Strawther", "2", "SG", "6'7\"", "205 lbs", 23, "USA", "Gonzaga"),
  ]},
  // Detroit Pistons
  "det": { teamId: "det", players: [
    p("1630595", "Cade Cunningham", "2", "PG", "6'6\"", "220 lbs", 23, "USA", "Oklahoma State"),
    p("1631095", "Jaden Ivey", "23", "PG", "6'4\"", "195 lbs", 23, "USA", "Purdue"),
    p("1631097", "Ausar Thompson", "5", "SF", "6'7\"", "200 lbs", 21, "USA", "Overtime Elite"),
    p("1629627", "Jalen Duren", "0", "C", "6'10\"", "250 lbs", 21, "USA", "Memphis"),
    p("1630569", "Tobias Harris", "12", "PF", "6'7\"", "226 lbs", 32, "USA", "Tennessee"),
    p("1629645", "Tim Hardaway Jr.", "10", "SG", "6'5\"", "205 lbs", 32, "USA", "Michigan"),
    p("1631247", "Ron Holland II", "3", "SF", "6'7\"", "197 lbs", 19, "USA", "G League Ignite"),
    p("1628982", "Simone Fontecchio", "19", "SF", "6'8\"", "200 lbs", 29, "Italy", ""),
  ]},
  // Golden State Warriors
  "gsw": { teamId: "gsw", players: [
    p("201939", "Stephen Curry", "30", "PG", "6'2\"", "185 lbs", 37, "USA", "Davidson"),
    p("203110", "Draymond Green", "23", "PF", "6'6\"", "230 lbs", 35, "USA", "Michigan State"),
    p("1628398", "Andrew Wiggins", "22", "SF", "6'7\"", "197 lbs", 30, "Canada", "Kansas"),
    p("1629750", "Jonathan Kuminga", "00", "PF", "6'7\"", "225 lbs", 22, "Democratic Republic of the Congo", "G League Ignite"),
    p("1630228", "Brandin Podziemski", "2", "SG", "6'4\"", "205 lbs", 22, "USA", "Santa Clara"),
    p("1631270", "Trayce Jackson-Davis", "32", "C", "6'9\"", "245 lbs", 25, "USA", "Indiana"),
    p("1628427", "Kevon Looney", "5", "C", "6'9\"", "222 lbs", 29, "USA", "UCLA"),
    p("1627756", "Buddy Hield", "7", "SG", "6'4\"", "220 lbs", 32, "Bahamas", "Oklahoma"),
  ]},
  // Houston Rockets
  "hou": { teamId: "hou", players: [
    p("1630224", "Jalen Green", "4", "SG", "6'4\"", "186 lbs", 23, "USA", "G League Ignite"),
    p("1630578", "Alperen Sengun", "28", "C", "6'9\"", "243 lbs", 22, "Turkey", ""),
    p("1631099", "Amen Thompson", "1", "SG", "6'7\"", "204 lbs", 22, "USA", "Overtime Elite"),
    p("1631105", "Jabari Smith Jr.", "10", "PF", "6'10\"", "220 lbs", 22, "USA", "Auburn"),
    p("1630221", "Fred VanVleet", "5", "PG", "6'1\"", "197 lbs", 31, "USA", "Wichita State"),
    p("1628389", "Dillon Brooks", "9", "SF", "6'7\"", "225 lbs", 29, "Canada", "Oregon"),
    p("1630546", "Tari Eason", "17", "PF", "6'8\"", "216 lbs", 24, "USA", "LSU"),
    p("1631248", "Reed Sheppard", "15", "PG", "6'3\"", "181 lbs", 20, "USA", "Kentucky"),
  ]},
  // Indiana Pacers
  "ind": { teamId: "ind", players: [
    p("1629139", "Tyrese Haliburton", "0", "PG", "6'5\"", "185 lbs", 25, "USA", "Iowa State"),
    p("1630170", "Bennedict Mathurin", "00", "SG", "6'6\"", "210 lbs", 23, "Canada", "Arizona"),
    p("203506", "Myles Turner", "33", "C", "6'11\"", "250 lbs", 28, "USA", "Texas"),
    p("203490", "Pascal Siakam", "43", "PF", "6'8\"", "230 lbs", 31, "Cameroon", "New Mexico State"),
    p("1628381", "Aaron Nesmith", "23", "SF", "6'5\"", "213 lbs", 25, "USA", "Vanderbilt"),
    p("1628383", "Andrew Nembhard", "2", "PG", "6'4\"", "193 lbs", 25, "Canada", "Gonzaga"),
    p("1629106", "Obi Toppin", "1", "PF", "6'9\"", "220 lbs", 27, "USA", "Dayton"),
    p("1631251", "Jarace Walker", "25", "PF", "6'8\"", "240 lbs", 21, "USA", "Houston"),
  ]},
  // Los Angeles Clippers
  "lac": { teamId: "lac", players: [
    p("201566", "James Harden", "1", "PG", "6'5\"", "220 lbs", 35, "USA", "Arizona State"),
    p("203954", "Kawhi Leonard", "2", "SF", "6'7\"", "225 lbs", 33, "USA", "San Diego State"),
    p("201933", "Ivica Zubac", "40", "C", "7'0\"", "240 lbs", 28, "Croatia", ""),
    p("1628389", "Norman Powell", "24", "SG", "6'3\"", "215 lbs", 31, "USA", "UCLA"),
    p("1629066", "Terance Mann", "14", "SG", "6'5\"", "215 lbs", 28, "USA", "Florida State"),
    p("1630253", "Amir Coffey", "7", "SG", "6'7\"", "210 lbs", 27, "USA", "Minnesota"),
    p("1631253", "Kobe Brown", "3", "PF", "6'7\"", "250 lbs", 24, "USA", "Missouri"),
    p("1631111", "Jordan Miller", "11", "SG", "6'7\"", "195 lbs", 25, "USA", "Miami"),
  ]},
  // Los Angeles Lakers
  "lal": { teamId: "lal", players: [
    p("2544", "LeBron James", "23", "SF", "6'9\"", "250 lbs", 40, "USA", ""),
    p("203076", "Anthony Davis", "3", "PF", "6'10\"", "253 lbs", 32, "USA", "Kentucky"),
    p("1629630", "Austin Reaves", "15", "SG", "6'5\"", "197 lbs", 27, "USA", "Oklahoma"),
    p("1629216", "Rui Hachimura", "28", "PF", "6'8\"", "230 lbs", 27, "Japan", "Gonzaga"),
    p("1628381", "D'Angelo Russell", "1", "PG", "6'4\"", "193 lbs", 29, "USA", "Ohio State"),
    p("1630536", "Dalton Knecht", "4", "SG", "6'6\"", "215 lbs", 24, "USA", "Tennessee"),
    p("1630222", "Max Christie", "10", "SG", "6'5\"", "190 lbs", 22, "USA", "Michigan State"),
    p("200765", "Gabe Vincent", "7", "PG", "6'3\"", "200 lbs", 29, "USA", "UC Santa Barbara"),
  ]},
  // Memphis Grizzlies
  "mem": { teamId: "mem", players: [
    p("1629630", "Ja Morant", "12", "PG", "6'3\"", "174 lbs", 25, "USA", "Murray State"),
    p("1630568", "Desmond Bane", "22", "SG", "6'5\"", "215 lbs", 27, "USA", "TCU"),
    p("1629655", "Jaren Jackson Jr.", "13", "PF", "6'11\"", "242 lbs", 25, "USA", "Michigan State"),
    p("1629002", "Marcus Smart", "36", "PG", "6'3\"", "220 lbs", 31, "USA", "Oklahoma State"),
    p("1631107", "GG Jackson", "45", "PF", "6'9\"", "210 lbs", 20, "USA", "South Carolina"),
    p("1630559", "Santi Aldama", "7", "PF", "6'11\"", "215 lbs", 24, "Spain", "Loyola Maryland"),
    p("1631256", "Zach Edey", "14", "C", "7'4\"", "300 lbs", 23, "Canada", "Purdue"),
    p("200826", "Luke Kennard", "10", "SG", "6'5\"", "206 lbs", 28, "USA", "Duke"),
  ]},
  // Miami Heat
  "mia": { teamId: "mia", players: [
    p("1628389", "Jimmy Butler", "22", "SF", "6'7\"", "230 lbs", 35, "USA", "Marquette"),
    p("1629216", "Bam Adebayo", "13", "C", "6'9\"", "255 lbs", 27, "USA", "Kentucky"),
    p("1629639", "Tyler Herro", "14", "SG", "6'5\"", "195 lbs", 25, "USA", "Kentucky"),
    p("1631259", "Jaime Jaquez Jr.", "11", "SF", "6'7\"", "225 lbs", 24, "USA", "UCLA"),
    p("201609", "Terry Rozier", "2", "PG", "6'1\"", "190 lbs", 31, "USA", "Louisville"),
    p("203939", "Duncan Robinson", "55", "SG", "6'7\"", "215 lbs", 31, "USA", "Michigan"),
    p("1628407", "Caleb Martin", "16", "SF", "6'5\"", "205 lbs", 29, "USA", "Nevada"),
    p("1630559", "Nikola Jovic", "5", "PF", "6'10\"", "227 lbs", 22, "Serbia", ""),
  ]},
  // Milwaukee Bucks
  "mil": { teamId: "mil", players: [
    p("203507", "Giannis Antetokounmpo", "34", "PF", "6'11\"", "243 lbs", 30, "Greece", ""),
    p("203114", "Damian Lillard", "0", "PG", "6'2\"", "195 lbs", 34, "USA", "Weber State"),
    p("201572", "Brook Lopez", "11", "C", "7'0\"", "282 lbs", 37, "USA", "Stanford"),
    p("1628978", "Khris Middleton", "22", "SF", "6'7\"", "222 lbs", 33, "USA", "Texas A&M"),
    p("1629023", "Bobby Portis", "9", "PF", "6'10\"", "250 lbs", 30, "USA", "Arkansas"),
    p("1628427", "Pat Connaughton", "24", "SG", "6'5\"", "209 lbs", 32, "USA", "Notre Dame"),
    p("1631261", "Andre Jackson Jr.", "5", "SG", "6'6\"", "209 lbs", 23, "USA", "UConn"),
    p("1630244", "MarJon Beauchamp", "0", "SF", "6'6\"", "199 lbs", 24, "USA", "G League Ignite"),
  ]},
  // Minnesota Timberwolves
  "min": { teamId: "min", players: [
    p("1629027", "Anthony Edwards", "5", "SG", "6'4\"", "225 lbs", 23, "USA", "Georgia"),
    p("203952", "Julius Randle", "30", "PF", "6'8\"", "250 lbs", 30, "USA", "Kentucky"),
    p("1629750", "Rudy Gobert", "27", "C", "7'1\"", "258 lbs", 32, "France", ""),
    p("1631095", "Donte DiVincenzo", "0", "SG", "6'4\"", "203 lbs", 28, "USA", "Villanova"),
    p("1629021", "Jaden McDaniels", "3", "SF", "6'9\"", "200 lbs", 24, "USA", "Washington"),
    p("1628378", "Naz Reid", "11", "PF", "6'9\"", "264 lbs", 25, "USA", "LSU"),
    p("1629655", "Mike Conley", "10", "PG", "6'1\"", "175 lbs", 37, "USA", "Ohio State"),
    p("1631264", "Rob Dillingham", "1", "PG", "6'1\"", "165 lbs", 20, "USA", "Kentucky"),
  ]},
  // New Orleans Pelicans
  "nop": { teamId: "nop", players: [
    p("1629029", "Zion Williamson", "1", "PF", "6'6\"", "284 lbs", 24, "USA", "Duke"),
    p("1630178", "Brandon Ingram", "14", "SF", "6'8\"", "190 lbs", 27, "USA", "Duke"),
    p("1629636", "CJ McCollum", "3", "PG", "6'3\"", "190 lbs", 33, "USA", "Lehigh"),
    p("1629678", "Herb Jones", "5", "SF", "6'7\"", "210 lbs", 27, "USA", "Alabama"),
    p("1629649", "Trey Murphy III", "25", "SF", "6'8\"", "206 lbs", 25, "USA", "Virginia"),
    p("203901", "Jonas Valanciunas", "17", "C", "6'11\"", "265 lbs", 32, "Lithuania", ""),
    p("1631265", "Yves Missi", "21", "C", "6'11\"", "225 lbs", 21, "Cameroon", "Baylor"),
    p("1629655", "Jordan Hawkins", "24", "SG", "6'5\"", "195 lbs", 22, "USA", "UConn"),
  ]},
  // New York Knicks
  "nyk": { teamId: "nyk", players: [
    p("1629628", "Jalen Brunson", "11", "PG", "6'2\"", "190 lbs", 28, "USA", "Villanova"),
    p("1629750", "Karl-Anthony Towns", "32", "C", "6'11\"", "248 lbs", 29, "Dominican Republic", "Kentucky"),
    p("1630250", "OG Anunoby", "8", "SF", "6'7\"", "232 lbs", 27, "UK", "Indiana"),
    p("1630224", "Mikal Bridges", "25", "SF", "6'6\"", "209 lbs", 28, "USA", "Villanova"),
    p("203944", "Josh Hart", "3", "SG", "6'4\"", "215 lbs", 30, "USA", "Villanova"),
    p("1629627", "Mitchell Robinson", "23", "C", "7'0\"", "240 lbs", 27, "USA", ""),
    p("1628988", "Donte DiVincenzo", "0", "SG", "6'4\"", "203 lbs", 28, "USA", "Villanova"),
    p("1631267", "Miles McBride", "2", "PG", "6'2\"", "195 lbs", 24, "USA", "West Virginia"),
  ]},
  // Oklahoma City Thunder
  "okc": { teamId: "okc", players: [
    p("1630224", "Shai Gilgeous-Alexander", "2", "PG", "6'6\"", "195 lbs", 26, "Canada", "Kentucky"),
    p("1631094", "Chet Holmgren", "7", "C", "7'0\"", "195 lbs", 23, "USA", "Gonzaga"),
    p("1630532", "Jalen Williams", "8", "SG", "6'6\"", "195 lbs", 24, "USA", "Santa Clara"),
    p("1630596", "Lu Dort", "5", "SG", "6'4\"", "220 lbs", 25, "Canada", "Arizona State"),
    p("1628964", "Isaiah Hartenstein", "55", "C", "7'0\"", "250 lbs", 27, "Germany", "Oregon"),
    p("1631270", "Alex Caruso", "6", "PG", "6'5\"", "186 lbs", 31, "USA", "Texas A&M"),
    p("1631102", "Cason Wallace", "22", "PG", "6'4\"", "194 lbs", 21, "USA", "Kentucky"),
    p("1631268", "Nikola Topic", "11", "PG", "6'6\"", "209 lbs", 19, "Serbia", ""),
  ]},
  // Orlando Magic
  "orl": { teamId: "orl", players: [
    p("1630596", "Paolo Banchero", "5", "PF", "6'10\"", "250 lbs", 22, "USA", "Duke"),
    p("1629630", "Franz Wagner", "22", "SF", "6'10\"", "220 lbs", 23, "Germany", "Michigan"),
    p("1631097", "Jalen Suggs", "4", "PG", "6'4\"", "205 lbs", 23, "USA", "Gonzaga"),
    p("1629649", "Wendell Carter Jr.", "34", "C", "6'10\"", "270 lbs", 26, "USA", "Duke"),
    p("1631269", "Anthony Black", "0", "PG", "6'7\"", "198 lbs", 21, "USA", "Arkansas"),
    p("1629066", "Cole Anthony", "50", "PG", "6'2\"", "185 lbs", 25, "USA", "North Carolina"),
    p("1631107", "Goga Bitadze", "11", "C", "6'11\"", "250 lbs", 26, "Georgia", ""),
    p("1630568", "Jonathan Isaac", "1", "PF", "6'10\"", "230 lbs", 27, "USA", "Florida State"),
  ]},
  // Philadelphia 76ers
  "phi": { teamId: "phi", players: [
    p("203954", "Joel Embiid", "21", "C", "7'0\"", "280 lbs", 31, "Cameroon", "Kansas"),
    p("1630178", "Tyrese Maxey", "0", "PG", "6'2\"", "200 lbs", 24, "USA", "Kentucky"),
    p("202699", "Paul George", "8", "SF", "6'8\"", "220 lbs", 35, "USA", "Fresno State"),
    p("1631270", "Caleb Martin", "6", "SF", "6'5\"", "205 lbs", 29, "USA", "Nevada"),
    p("1629002", "Kelly Oubre Jr.", "9", "SG", "6'7\"", "203 lbs", 29, "USA", "Kansas"),
    p("1628978", "Andre Drummond", "1", "C", "6'10\"", "279 lbs", 31, "USA", "UConn"),
    p("1630253", "Eric Gordon", "17", "SG", "6'3\"", "215 lbs", 36, "USA", "Indiana"),
    p("1631271", "Jared McCain", "22", "SG", "6'2\"", "203 lbs", 21, "USA", "Duke"),
  ]},
  // Phoenix Suns
  "phx": { teamId: "phx", players: [
    p("201142", "Kevin Durant", "35", "SF", "6'10\"", "240 lbs", 36, "USA", "Texas"),
    p("1629029", "Devin Booker", "1", "SG", "6'5\"", "206 lbs", 28, "USA", "Kentucky"),
    p("1628381", "Bradley Beal", "3", "SG", "6'4\"", "207 lbs", 31, "USA", "Florida"),
    p("203944", "Jusuf Nurkic", "20", "C", "6'11\"", "290 lbs", 30, "Bosnia and Herzegovina", ""),
    p("1630569", "Grayson Allen", "6", "SG", "6'4\"", "198 lbs", 29, "USA", "Duke"),
    p("1631272", "Ryan Dunn", "14", "SF", "6'7\"", "210 lbs", 22, "USA", "Virginia"),
    p("1631107", "Bol Bol", "11", "C", "7'2\"", "220 lbs", 25, "Sudan", "Oregon"),
    p("1628982", "Royce O'Neale", "00", "SF", "6'4\"", "226 lbs", 31, "USA", "Baylor"),
  ]},
  // Portland Trail Blazers
  "por": { teamId: "por", players: [
    p("1631099", "Anfernee Simons", "1", "PG", "6'3\"", "181 lbs", 25, "USA", "IMG Academy"),
    p("1631101", "Scoot Henderson", "0", "PG", "6'2\"", "195 lbs", 21, "USA", "G League Ignite"),
    p("1631273", "Shaedon Sharpe", "17", "SG", "6'5\"", "200 lbs", 22, "Canada", "Kentucky"),
    p("1628398", "Deandre Ayton", "2", "C", "7'0\"", "250 lbs", 26, "Bahamas", "Arizona"),
    p("1629660", "Jerami Grant", "9", "PF", "6'8\"", "210 lbs", 31, "USA", "Syracuse"),
    p("1629066", "Toumani Camara", "33", "SF", "6'8\"", "220 lbs", 24, "Belgium", "Dayton"),
    p("1630559", "Deni Avdija", "8", "SF", "6'9\"", "210 lbs", 24, "Israel", ""),
    p("1631274", "Donovan Clingan", "32", "C", "7'2\"", "280 lbs", 21, "USA", "UConn"),
  ]},
  // Sacramento Kings
  "sac": { teamId: "sac", players: [
    p("1628368", "De'Aaron Fox", "5", "PG", "6'3\"", "185 lbs", 27, "USA", "Kentucky"),
    p("1629630", "Domantas Sabonis", "10", "C", "6'10\"", "240 lbs", 29, "Lithuania", "Gonzaga"),
    p("1630169", "DeMar DeRozan", "10", "SF", "6'6\"", "220 lbs", 35, "USA", "USC"),
    p("1630533", "Keegan Murray", "13", "PF", "6'8\"", "225 lbs", 24, "USA", "Iowa"),
    p("1628436", "Malik Monk", "0", "SG", "6'3\"", "200 lbs", 27, "USA", "Kentucky"),
    p("1629649", "Kevin Huerter", "9", "SG", "6'7\"", "190 lbs", 26, "USA", "Maryland"),
    p("1630224", "Trey Lyles", "41", "PF", "6'9\"", "235 lbs", 29, "Canada", "Kentucky"),
    p("1631275", "Keon Ellis", "23", "SG", "6'5\"", "175 lbs", 25, "USA", "Alabama"),
  ]},
  // San Antonio Spurs
  "sas": { teamId: "sas", players: [
    p("1631094", "Victor Wembanyama", "1", "C", "7'4\"", "210 lbs", 21, "France", ""),
    p("1631279", "Stephon Castle", "5", "PG", "6'6\"", "215 lbs", 20, "USA", "UConn"),
    p("1629660", "Devin Vassell", "24", "SG", "6'5\"", "194 lbs", 24, "USA", "Florida State"),
    p("1630537", "Jeremy Sochan", "10", "PF", "6'9\"", "230 lbs", 22, "Poland", "Baylor"),
    p("1628427", "Keldon Johnson", "3", "SF", "6'5\"", "220 lbs", 25, "USA", "Kentucky"),
    p("201566", "Chris Paul", "3", "PG", "6'0\"", "175 lbs", 39, "USA", "Wake Forest"),
    p("1630568", "Tre Jones", "33", "PG", "6'1\"", "181 lbs", 25, "USA", "Duke"),
    p("1631280", "Zach Collins", "23", "PF", "6'11\"", "250 lbs", 27, "USA", "Gonzaga"),
  ]},
  // Toronto Raptors
  "tor": { teamId: "tor", players: [
    p("1629680", "Scottie Barnes", "4", "PF", "6'7\"", "225 lbs", 23, "USA", "Florida State"),
    p("1629750", "RJ Barrett", "9", "SG", "6'6\"", "214 lbs", 24, "Canada", "Duke"),
    p("1631281", "Immanuel Quickley", "5", "PG", "6'3\"", "188 lbs", 25, "USA", "Kentucky"),
    p("1629655", "Jakob Poeltl", "19", "C", "7'1\"", "245 lbs", 29, "Austria", "Utah"),
    p("1631282", "Gradey Dick", "1", "SG", "6'7\"", "205 lbs", 21, "USA", "Kansas"),
    p("1630578", "Gary Trent Jr.", "33", "SG", "6'5\"", "209 lbs", 26, "USA", "Duke"),
    p("1629022", "Chris Boucher", "25", "PF", "6'9\"", "200 lbs", 32, "Canada", "Oregon"),
    p("1631283", "Ochai Agbaji", "30", "SG", "6'5\"", "215 lbs", 25, "USA", "Kansas"),
  ]},
  // Utah Jazz
  "uta": { teamId: "uta", players: [
    p("1629636", "Lauri Markkanen", "23", "PF", "7'0\"", "240 lbs", 27, "Finland", "Arizona"),
    p("1630556", "Jordan Clarkson", "00", "PG", "6'4\"", "194 lbs", 32, "Philippines", "Missouri"),
    p("1628378", "Collin Sexton", "2", "PG", "6'1\"", "190 lbs", 26, "USA", "Alabama"),
    p("1629002", "John Collins", "20", "PF", "6'9\"", "235 lbs", 27, "USA", "Wake Forest"),
    p("1629655", "Walker Kessler", "24", "C", "7'1\"", "245 lbs", 23, "USA", "Auburn"),
    p("1631284", "Keyonte George", "3", "PG", "6'4\"", "185 lbs", 21, "USA", "Baylor"),
    p("1631285", "Taylor Hendricks", "0", "PF", "6'9\"", "215 lbs", 21, "USA", "UCF"),
    p("1631107", "Brice Sensabaugh", "28", "SF", "6'6\"", "235 lbs", 21, "USA", "Ohio State"),
  ]},
  // Washington Wizards
  "was": { teamId: "was", players: [
    p("1631108", "Bilal Coulibaly", "0", "SF", "6'7\"", "197 lbs", 21, "France", ""),
    p("1631286", "Alex Sarr", "20", "C", "7'1\"", "225 lbs", 20, "France", ""),
    p("1630178", "Kyle Kuzma", "33", "PF", "6'9\"", "221 lbs", 29, "USA", "Utah"),
    p("1630596", "Jordan Poole", "13", "PG", "6'4\"", "194 lbs", 25, "USA", "Michigan"),
    p("1631287", "Corey Kispert", "24", "SF", "6'7\"", "220 lbs", 26, "USA", "Gonzaga"),
    p("1630559", "Deni Avdija", "9", "PF", "6'9\"", "210 lbs", 24, "Israel", ""),
    p("1631288", "Johnny Davis", "1", "SG", "6'5\"", "194 lbs", 23, "USA", "Wisconsin"),
    p("1631107", "Carlton Carrington", "3", "PG", "6'4\"", "195 lbs", 19, "USA", "Pittsburgh"),
  ]},
};
