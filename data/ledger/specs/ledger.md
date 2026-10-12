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
- **The look:** Forever's dark style (site.css), classicdb's density: tight sortable tables grouped under gold headers, filters on top.
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
- The pages: `dbsite/site/index.html`, `assets/ledger.js`, `assets/ledger.css`; the companion preview (http://localhost:8791).
- A status changes when the user says so ("mark X to review", "seen in game"): edit the content file, rebuild.
