# WoW Forever: the Legacy system and its book art

Read from WoW Forever's install on 2026-09-28 (the user: the game closed), for the Adventure Journal (the micro menu's Legacy slot)
and the profession journals as books. Sources: its atlas tables (`(private files)` Atlases: 20,722 names),
its global strings and achievement tables (`out/dbfilesclient/`), its micro menu code (`code-named/.../mainmenubarmicrobuttons.lua`).
The full list of its Legacy challenges, in its own words: `(private files)` (private).

## The Legacy system

`LegacySystemFrame`, opened by the Legacy micro button (`TOGGLELEGACYSYSTEM`, "Toggle Legacy Pane"), locked until "your first
character reaches level 25" (LEGACY_MICRO_BUTTON_LOCKED_TOOLTIP). Account-wide. Three views:
- **Progress Track** (LEGACY_TRACK_FRAME_TITLE; tab "Legacy Rewards"): the Legacy Points earned, a track of reward cards at point
  milestones (the user's shot: 15, 25, 40, 55: a replica rifle, a spectral bear cub, a tabard, a mount). A renown track underneath
  (C_MajorFactions, LEGACY_REWARD_TRACK_FACTION_ID).
- **Legacy Challenges** (LEGACY_CHALLENGE_FRAME_TITLE): "Legacy Points %d / %d", a search and filter, categories on the left, cards
  on the right (an icon, a title, a line, the criteria when opened, the points in a crown). They are achievements in Forever's own
  categories, each "Earn 1 Legacy Point":
  - Classes: each class, "Novice / Experienced / Master <Class>": level 25, 45, 60 for the first time.
  - Tradeskills: six crafts, "Journeyman / Expert / Artisan <Crafter>": skill 150, 225, 300 for the first time.
  - Dungeons: "Novice / Experienced / Master Spelunker": complete a list of dungeons.
  - Raids: "Conquerer of the Wilds" (Hyjal Summit), "Conquerer of the Deeps" (the Barrow Deeps), "Conqueror of the Lair" (Onyxia).
  - Player vs. Player: honor ranks 3, 7, 10, 13, 14; exalted with each battleground's factions; the season's journey weeks.
  - Adventure: "Lord Valthalak Laid to Rest" (the questline from An Earnest Proposition), "Explorer" (Explore Azeroth, each zone).
- **Legacy Tree** (LEGACY_TREE_FRAME_TITLE; "Available points: %s"): the points spent in three trees, Professions, Adventure and
  Resourcefulness (LEGACY_TREE_PROFESSIONS / ADVENTURE / PROGRESSION), "Apply Changes"; a seasonal cap on the points spent.

## Its art (atlases)

- **Legacy** (Forever's own, 62): `legacy-up/down/disabled-c60` (the micro button), `legacy-challenge-bg(-c60)`, the challenge cards
  (`legacy-challenge-cards`, `-selected`, `-disable`, ribbons blue and brown, tiled edges, the date plate), the left sub-tabs, the
  progress bar (`legacy-progressbar-bg / fill / frame`, dark variants), the rewards tracker (`legacy-rewards-tracker-background(-c60)`,
  cards, green cards, diamonds, the big and small arrows, the icon frame), the tree (`legacy-tree-frame-*`: background, card, ring,
  icon frames, the lock, the points bar and icon, the level circle, the reset button).
- **Book pages**: Forever's own spellbook pages `spellbook-page-left-c60`, `spellbook-page-right-c60`, `spellbook-page-condensed-c60`;
  the modern spellbook's `spellbook-background-evergreen-left / right / header / ribbon`; `book-bg`, `book-line`.
- **Lore**: the campaign quest log's lore book `campaign-questlog-lorebook` (with `-back`, `-glow`, `-highlight`), its lore background
  `campaign-questlog-lorebackground`, `campaign-questlog-loredivider`, `campaign-questlog-lorebottomshadow`.
- **The Adventure Guide** (the modern Adventure Journal): `ui-hud-micromenu-adventureguide-up / down / mouseover / disabled`,
  `adventureguide-up/down/disabled-c60`, `adventureguide-pane-large / small`, `adventureguide-ring`, `adventureguide-rewardring`,
  `adventureguide-tutorial-divider`.
- **Journeys** (the Encounter Journal's renown journeys, `blizzard_journeys` in its code): `ui-journeys-bg`, `ui-journeys-renown-*`
  (the progress bar, the radial bar, the divider, buttons).
- Its code also has the Encounter Journal, the Loot Journal, the Traveler's Log (monthly activities) and the paged-content system
  (`blizzard_pagedcontent`: paged frames and their paging controls).

## What this means for ForeverUI (proposed)

- **The Adventure Journal** takes the Legacy slot and Forever's three views, renamed and grown: a Progress Track of our own goals'
  points, the Challenges (Forever's categories and wording, counted by ForeverUI: levels by class, skill ranks, dungeons, raids,
  honor ranks, exploration), and in place of the Legacy Tree the character's journals: the Adventurer's Journey (a chapter per 10
  levels, docs/specs/adventurers-journey.md) and each profession's journal (the Beast Journal, the Angler's Journal, the rest).
  Its micro button keeps Forever's `legacy-*-c60` art.
- **The journals' pages** can use Forever's own book art: the spellbook pages (`spellbook-page-left/right-c60`) for a page spread,
  the lore book icon (`campaign-questlog-lorebook`) for the journal's rows and its "A new page" alert, the lore divider under a
  page's title.
