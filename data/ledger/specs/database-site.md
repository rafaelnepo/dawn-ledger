# The database website: a companion for the journey (task 24)

Decided with the user at the start of session 56 (2026-10-02, an interview before an unattended night).

## The idea

Not a datamine dump. Curation and context come first, with the player's journey: a companion that follows the player, never
bombarding them with everything in the game. The journals we make in game are the core of it; the addon and the site will talk
to each other later. Professions, levelling and discovering are the focus.

## Base principle: information architecture, typography, organization

The user (session 56): use the logic Forever UI uses in game. Professions are organized and sorted by categories and
subcategories (Forever's TradeSkillCategory order), the journals by their sections, and every list on the site the same way: grouped,
sorted, with headers and counts, never an unsorted data dump. Typography carries the hierarchy (Morpheus titles, Merriweather text,
the in-game text styles of docs/specs/text-styles.md). Before a list goes on a page: its grouping, its order, and why each line is
there.

## Decisions

- **Contents**: the game as this server has it first (the world DB, the 1.14.2 client's tables); our docs and previews later, as
  a second section.
- **The spine**: the journals (Adventure, Beast, the profession journals). Items, quests, NPCs and places are pages reached from a
  journal's entries, as in a book with an index.
- **The look**: barrens.chat's layout as the reference (search, pages, tooltips, maps) in Forever's style; the Tradeskill DB site's
  parts reused (tradeskill-db/).
- **Curation**: a page shows what matters where the player is in the journey (level, place). The rest folds into a quiet
  "More about this place" at the bottom, never removed.
- **Everything / My journey**: a switch on every page. In My journey an undiscovered entry is a blank page with a first-person hint,
  as in the in-game journals; its name and details once found. A character picker: one character, or the account's together.
- **The link**: the addon writes discoveries to its saved variables; a local script (as tools/feedback/collect.py) reads them
  after a logout or /reload and updates the site. The client can't open a network connection. The data keyed by the game's ids
  (item, quest, NPC, spell, area).
- **Maps**: the client's zone maps with pins (spawns, nodes, NPCs), local only.
- **First focus: Discovering**: zones and places; beasts and rares; gathering and townsfolk; treasures and secrets.
- **First model pages**: one starting zone per race (both factions alike), done fully, as the model for the rest.
- **Density**: two or three layouts built as previews for the user to choose from (a short lead with highlights, a journal
  spread, ...).
- **Data sources**: SELECTs on the world DB (read only) and the client's DB2s ((a file on the server's Mac) wdc3.py); generated data and art
  under (a file on the server's Mac) outside the repo; the site's code and our own words in the repo.
- **Where it runs**: local only (a dev server via .claude/launch.json), never published. Blizzard's art and text stay private.

## Text

The journals' rules (docs/copywriting/style-guide.md, lore-changes.md, chronicles.md): Chronicle voice for lore, first person for
the player's notes, grounded in the server's quest text, never invented facts; the world is the hero, never the player.
