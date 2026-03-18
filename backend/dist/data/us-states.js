"use strict";
// US States with NBA teams mapping + conference info for map coloring
Object.defineProperty(exports, "__esModule", { value: true });
exports.nonNbaBasketballStates = exports.nbaStatesCodes = exports.statesWithNbaTeams = exports.usStates = void 0;
exports.usStates = {
    AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
    CO: "Colorado", CT: "Connecticut", DE: "Delaware", FL: "Florida", GA: "Georgia",
    HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa",
    KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
    MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi",
    MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire",
    NJ: "New Jersey", NM: "New Mexico", NY: "New York", NC: "North Carolina",
    ND: "North Dakota", OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania",
    RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota", TN: "Tennessee",
    TX: "Texas", UT: "Utah", VT: "Vermont", VA: "Virginia", WA: "Washington",
    WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming", DC: "District of Columbia",
};
exports.statesWithNbaTeams = {
    // Eastern Conference states
    GA: { name: "Georgia", code: "GA", teams: ["Atlanta Hawks"], teamCount: 1, conference: "East" },
    FL: { name: "Florida", code: "FL", teams: ["Miami Heat", "Orlando Magic"], teamCount: 2, conference: "East" },
    IL: { name: "Illinois", code: "IL", teams: ["Chicago Bulls"], teamCount: 1, conference: "East" },
    IN: { name: "Indiana", code: "IN", teams: ["Indiana Pacers"], teamCount: 1, conference: "East" },
    MA: { name: "Massachusetts", code: "MA", teams: ["Boston Celtics"], teamCount: 1, conference: "East" },
    MI: { name: "Michigan", code: "MI", teams: ["Detroit Pistons"], teamCount: 1, conference: "East" },
    NC: { name: "North Carolina", code: "NC", teams: ["Charlotte Hornets"], teamCount: 1, conference: "East" },
    NY: { name: "New York", code: "NY", teams: ["Brooklyn Nets", "New York Knicks"], teamCount: 2, conference: "East" },
    OH: { name: "Ohio", code: "OH", teams: ["Cleveland Cavaliers"], teamCount: 1, conference: "East" },
    PA: { name: "Pennsylvania", code: "PA", teams: ["Philadelphia 76ers"], teamCount: 1, conference: "East" },
    WI: { name: "Wisconsin", code: "WI", teams: ["Milwaukee Bucks"], teamCount: 1, conference: "East" },
    DC: { name: "District of Columbia", code: "DC", teams: ["Washington Wizards"], teamCount: 1, conference: "East" },
    // Western Conference states
    AZ: { name: "Arizona", code: "AZ", teams: ["Phoenix Suns"], teamCount: 1, conference: "West" },
    CA: { name: "California", code: "CA", teams: ["Golden State Warriors", "Los Angeles Clippers", "Los Angeles Lakers", "Sacramento Kings"], teamCount: 4, conference: "West" },
    CO: { name: "Colorado", code: "CO", teams: ["Denver Nuggets"], teamCount: 1, conference: "West" },
    LA: { name: "Louisiana", code: "LA", teams: ["New Orleans Pelicans"], teamCount: 1, conference: "West" },
    MN: { name: "Minnesota", code: "MN", teams: ["Minnesota Timberwolves"], teamCount: 1, conference: "West" },
    OK: { name: "Oklahoma", code: "OK", teams: ["Oklahoma City Thunder"], teamCount: 1, conference: "West" },
    OR: { name: "Oregon", code: "OR", teams: ["Portland Trail Blazers"], teamCount: 1, conference: "West" },
    TN: { name: "Tennessee", code: "TN", teams: ["Memphis Grizzlies"], teamCount: 1, conference: "West" },
    TX: { name: "Texas", code: "TX", teams: ["Dallas Mavericks", "Houston Rockets", "San Antonio Spurs"], teamCount: 3, conference: "West" },
    UT: { name: "Utah", code: "UT", teams: ["Utah Jazz"], teamCount: 1, conference: "West" },
};
exports.nbaStatesCodes = Object.keys(exports.statesWithNbaTeams);
// States that have other basketball teams (WNBA, NCAA, G-League) but no NBA
exports.nonNbaBasketballStates = [
    "AL", "AR", "CT", "DE", "HI", "ID", "IA", "KS", "KY", "ME", "MD",
    "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "ND", "RI",
    "SC", "SD", "VA", "VT", "WA", "WV", "WY",
];
