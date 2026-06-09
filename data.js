/* ============================================================
   World Cup 2026 Sweepstake: config + reference data
   ============================================================
   Loaded by index.html. Edit the constants below to tune the
   game without touching app logic.
   ============================================================ */

/* ----- Sweepstake structure -------------------------------
   ENTRANT_COUNT = number of slots in the draw.
   ELITE_TIER_COUNT = number of teams considered "elite",
   ranked by implied tournament strength derived from match
   odds in Firestore (populated by the predictions sibling app
   or via the admin "Sync fixtures" action below).
   At 48 qualifiers and 19 entrants:
     19 elite + 29 underdog = 48 total used
     19 entrants × 1 elite = 19 elite slots
     29 underdogs across 19 entrants: 10 slots get 2, 9 get 1.
   ---------------------------------------------------------- */
const SWEEP_ENTRANT_COUNT = 19;
const SWEEP_ELITE_TIER_COUNT = 19;

/* ----- Participants ---------------------------------------
   Fixed list of named entrants. The Enter view presents this
   as a picker grid: click your name, get assigned the next
   free slot, teams reveal. Everyone can see who has and who
   has not picked yet.
   ---------------------------------------------------------- */
const SWEEP_PARTICIPANTS = [
  "Chris",
  "Claire",
  "Dave",
  "Ella",
  "Gayle",
  "Gemma",
  "Graeme",
  "Hugh",
  "James",
  "Matt",
  "Michael",
  "Morgan",
  "Petre",
  "Rob",
  "Sharon Goodall",
  "Sharon Gueller",
  "Tom",
  "Tony",
  "William",
];

/* ----- Kudos (cosmetic prize points) ----------------------
   Awarded to the slot owner for each team's progression.
   Cumulative: a team that reaches SF and the Final picks up
   semiFinal + finalAppearance. The tournament winner stacks
   all three on top of that.
   ---------------------------------------------------------- */
const SWEEP_KUDOS = {
  semiFinal:       100,
  finalAppearance: 250,
  winner:          500,
};

/* ----- Tournament window ----------------------------------
   Used to scope ESPN fixture fetches and the live-status UI.
   ---------------------------------------------------------- */
const SWEEP_WINDOW = {
  startISO: "2026-06-11",
  endISO:   "2026-07-19",
};

/* ----- ESPN unofficial scoreboard endpoint ----------------
   Same source as the predictions sibling. No API key, CORS
   friendly. Per-day events plus odds (DraftKings via ESPN).
   ---------------------------------------------------------- */
const SWEEP_ESPN = {
  base: "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard",
};
const SWEEP_LIVE_POLL_MS = 60 * 1000;

/* ----- Admin passcode -------------------------------------
   Used to gate the #admin route. Replace before sharing.
   Not high security; stops casual tampering only.
   ---------------------------------------------------------- */
const SWEEP_ADMIN_PASSCODE = "spade-of-aces";

/* ----- Firebase config ------------------------------------
   Same Firebase project as wc26-predictions. We add
   sweepstake-specific collections (sweep_slots, sweep_entries,
   sweep_meta) so the two apps don't collide. Web-app config
   values are not secrets, safe to commit.
   ---------------------------------------------------------- */
const SWEEP_FIREBASE = {
  apiKey:            "AIzaSyCZA0fJ0c84o4-8m387A6UvOK9Geiz1FDE",
  authDomain:        "world-cup-predictor-9a331.firebaseapp.com",
  projectId:         "world-cup-predictor-9a331",
  storageBucket:     "world-cup-predictor-9a331.firebasestorage.app",
  messagingSenderId: "1014337764938",
  appId:             "1:1014337764938:web:10b5445d8d1697f7a770b3",
  measurementId:     "G-6WPN62DHT2",
};

/* ----- Team display tweaks --------------------------------
   ESPN returns "United States", "Türkiye". Override here for
   shorter labels. Mirrors wc26-predictions/data.js.
   ---------------------------------------------------------- */
const SWEEP_TEAM_OVERRIDES = {
  "United States": "USA",
  "Bosnia-Herzegovina": "Bosnia",
};

/* ----- Country flags --------------------------------------
   Keyed by ESPN 3-letter abbreviation. Covers all WC 2026
   qualifiers. Unknown abbreviations (bracket placeholders)
   return "". Mirrors wc26-predictions/data.js.
   ---------------------------------------------------------- */
const SWEEP_TEAM_FLAGS = {
  ALG: "🇩🇿",
  ARG: "🇦🇷",
  AUS: "🇦🇺",
  AUT: "🇦🇹",
  BEL: "🇧🇪",
  BIH: "🇧🇦",
  BRA: "🇧🇷",
  CAN: "🇨🇦",
  CIV: "🇨🇮",
  COD: "🇨🇩",
  COL: "🇨🇴",
  CPV: "🇨🇻",
  CRO: "🇭🇷",
  CUW: "🇨🇼",
  CZE: "🇨🇿",
  ECU: "🇪🇨",
  EGY: "🇪🇬",
  ENG: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  ESP: "🇪🇸",
  FRA: "🇫🇷",
  GER: "🇩🇪",
  GHA: "🇬🇭",
  HAI: "🇭🇹",
  IRN: "🇮🇷",
  IRQ: "🇮🇶",
  JOR: "🇯🇴",
  JPN: "🇯🇵",
  KOR: "🇰🇷",
  KSA: "🇸🇦",
  MAR: "🇲🇦",
  MEX: "🇲🇽",
  NED: "🇳🇱",
  NOR: "🇳🇴",
  NZL: "🇳🇿",
  PAN: "🇵🇦",
  PAR: "🇵🇾",
  POR: "🇵🇹",
  QAT: "🇶🇦",
  RSA: "🇿🇦",
  SCO: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  SEN: "🇸🇳",
  SUI: "🇨🇭",
  SWE: "🇸🇪",
  TUN: "🇹🇳",
  TUR: "🇹🇷",
  URU: "🇺🇾",
  USA: "🇺🇸",
  UZB: "🇺🇿",
};

function flagFor(abbr) {
  return (abbr && SWEEP_TEAM_FLAGS[abbr]) || "";
}

/* ----- Knockout-stage detection ---------------------------
   ESPN stage slugs we treat as semi-final / final entries.
   Used by the scoring engine to award kudos.
   ---------------------------------------------------------- */
const SWEEP_STAGES = {
  semiFinal: "semifinals",
  final:     "final",
};
