# The Ledger: the server's database for deciding changes

Decided with the user in session 75 (2026-10-10). The database site's front; the Traveler's Companion (docs/specs/database-site.md)
stays beside it as the Journey tab.

## The idea

The user: "look at it simply like classicdb, but more organized ... a decision helping database so we can adjust and finetune
things in the game. I want to see what still needs to review, and what we already adjusted." And: "This is a tool for me and you
to use to refer to when making changes. This is all from the point of view of adjusting the game to a single player experience."
The loot is the server's own (the user: wowhead guessed drop chances with an addon; "we have the actual server data, so that's what
we will show").

## Decisions

- **Sections** (classicdb's): Items, NPCs, Quests, Objects and Chests, Zones, Factions, Loot, Professions, PvP and Honor; then ours:
  Changes, Review, Interface (Forever UI's windows, mockups and specs). The Journey tab keeps the Companion.
- **Built in session 75:** Changes, Factions, Chests and boxes, Loot first; then (the user: "Continue building all the other tabs based
  on server data and our changes") Review, Items, NPCs, Quests, Zones, Professions, PvP and honor, Interface: every tab.
- **The look:** classicdb's density: tight sortable tables grouped under headers, filters on top; since session 84 an account book in
  Forever's frame (below, “The look”).
- **Every list:** the game's columns (the server's numbers) first, then ours: the **changes** (a badge per patch, linked) and the
  **status**: Blizzard's (untouched), To review, Decided (chosen, not applied), Changed, Seen in game. One color each.
- **"Change it":** how hard a change is, and what to leave (the user: "things that are easy to fix and adjust, and things we probably
  shouldn't touch"): Easy (the world database), Moderate (also a HermesProxy hotfix and the client's caches), Hard (the server's or
  the proxy's code), Can't (only what the client has), Leave (scripted, leaned on, or the design), Free to reuse (unused ids the
  client knows). Each section opens with its own list (content/ledger/levers.json).
- **An entry's page:** the server's data, our changes (each patch's title, the user's words, its file and generator), our notes,
  the levers.
- **The change log is read from the patches themselves**, so it can't go stale: each world, character and realm patch's first lines,
  what its SQL touched; the server's and proxy's patches and the config sections with titles in content/ledger/changes.json. A patch
  that touched hundreds of creature tables (the lockbox rates) is a rule of the Loot section, not a change to each creature.

## Where things are

- Build: `python3 dbsite/build/ledger.py` (after `tools/server-data/world_chests.py` and `dbsite/build/drops.py`; `all.sh` runs
  them) into `(private files)`.
- Our words: `dbsite/site/content/ledger/`: `changes.json` (each patch's areas; the source and proxy patches' titles),
  `factions.json` (each reputation's solo note, status and lever; the rules for all reputation), `professions.json` (a note per
  profession), `levers.json` (the scale and each tab's list), `status.json` (statuses set by hand: chests `o<entry>`, boxes and
  items `i<entry>`, creatures' loot `c<entry>`, NPCs `n<entry>`, quests `q<entry>`).
- What each tab reads: Items (item_template; sources counted from the loot, vendor and quest tables; our hotfix rows from the proxy's
  ItemSparse1.csv against its .orig), NPCs (spawned creatures, the zone from the first spawn; Ironforge and the Undercity by their
  boxes; C++-scripted ones marked Leave, EventAI is data), Quests (giver, zone or kind, side, rewards; ours from 60000), Zones (the
  capitals, the zones of world_chests_patch.ZONES and the dungeons; NPCs, quests, chests, finds and the changes inside), Professions
  (SkillLineAbility, trainers, recipe items and their sources, nodes; the changes by area and a hand map), PvP and honor (ranks and
  rewards, the level caps, battleground_template, the bots by bracket from the characters DB), Interface (Forever UI's files with
  their findings by `watch`, the previews on :8777, the specs, the other addons), Review (every status To review or Decided, the
  open findings, docs/open-items.md's headlines).
- The pages: `dbsite/site/index.html` and `assets/ledger/`, in modules (session 84): `main.js` the router (a table of routes,
  `#/section/arg`), `core.js` the data and the marks, `ui.js` the components and the rail's sections, `shell.js` the frame (the
  menu on narrow screens, the footers, the local art layer, the public build's pass), `find.js` the rail's search, `cards.js`,
  `markdown.js`, `build.js` (local or public), one file a section in `sections/`; the styles in `assets/ledger/css/`
  (`tokens`, `material`, `shell`, `page`, `entries`). A new section: a module in `sections/`, a line in `main.js`'s routes, one in
  `ui.js`'s `NAV`. The companion preview (http://localhost:8791).
- A status changes when the user says so ("mark X to review", "seen in game"): edit the content file, rebuild.

## The look (session 84)

An account book bound in WoW Forever's frame: a dark leather rail with a twisted gold cord (the name, Find anything, the sections
by Our work, The game and Beside it), and golden parchment pages in sepia ink, titles over a double rubric rule, tables ruled like
a ledger, statuses as ink-stamp pills (one color each, as before), the home page a book's contents with dotted leaders. Marcellus
and Alegreya (Google Fonts); text-wrap balance on titles and pretty on paragraphs, against runts and widows. The tokens and the
reasons: `assets/ledger/css/tokens.css`; the system: DESIGN.md at the project root.

## Two builds: on this Mac and on the web

- **Local** (http://localhost:8791): everything, plus the art layer `data/art/art.css` (Friz Quadrata and Forever's narration
  parchment, in the private `(private files)`), the faction crests, and the links to the Companion, the
  Tradeskill DB and the previews.
- **Public** (https://rafaelnepo.github.io/dawn-ledger/, the public repository `rafaelnepo/dawn-ledger`): `python3
  dbsite/build/publish.py` builds it into `../dawn-ledger` (build.js set to "public", the crests dropped for a wax seal, this
  Mac's paths in the docs replaced) and audits it (no image or font files or links to them, no paths, emails or keys);
  `--push` commits and pushes it, and Pages serves it a minute later. Names, ids and numbers are facts (the asset audit,
  docs/server/asset-audit.md); Blizzard's art never goes out. The page itself never asks which build it is in: `shell.js`
  turns the local-only links into plain words.
- After a rebuild of the data (`ledger.py`), publish again when the web copy should follow.
