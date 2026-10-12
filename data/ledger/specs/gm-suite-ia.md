# The GM Testing Suite: information architecture (a proposal, before building)

Session 58 (2026-10-03). The user, after the detail pane's first typography pass:

> “I feel like we still need to work hard on the layout of the GM Testing Suite. We already sorted by 3 tabs for everyday,
> sometimes and destructive, but now i feel like we should check all commands and look at them from an information architecture
> and quick GM Testing point of view to have quick commands and variables for lots of situations. For AI Agents its easy, but for
> humans, this amount of information needs more structure and easier ways of knowing what goes with what, and easy buttons to
> click instead of typing these commands by hand. Lets take a pass at it before building anything and make a simple playground
> that we can cluster different kinds of commands that need different ways of laying out the information.”

Also asked:
- two columns, so things sit side by side (the reputation list)
- a decent-size gold title on pages like Cooking
- buttons in two columns
- far more profession variables: +1 for the toasts, the most for Apprentice, all of Apprentice's patterns
- links to the commands that go with this one, where they can't share the area

Nothing in the game changes until the user picks from the playground.

## What there is

**571 rows:** Everyday's 152 (Help.lua's TOPICS) and the hubs' 419 (GMHubData.lua: Everyday 19, Sometimes 291, Destructive 109).
342 commands have argument data (`ns.GMArgs`: syntax, parts, named values).

By how a human uses them (an automatic first sort, to be refined row by row when building):

| Pattern | Rows | What it is | Examples |
|---|--:|---|---|
| P1 Buttons | 113 | one click, nothing to choose | Save now, Revive, Reset cooldowns, Respawn nearby, the banners' tests |
| P2 Steps and amounts | 52 | a number: a few ready steps and your own | Level up, Money, Run speed, Honor, health and mana, every stat |
| P3 Pick from a list | 68 | one of a known set of values | Reputation's factions, emotes (78), cinematics, stand states, the target's faction (55), weather |
| P4 Ladder | 31 | a skill through its ranks | the 12 professions, the 17 weapon skills |
| P5 Find, then act | 18 | look something up, then use it | find an item (then add it), a spell (learn it, aura it), a creature (spawn it, go to it), a place |
| P6 Switch | 19 | on and off, with its state | GM mode, Can’t die, Invisible, every flight path, walk on water |
| P7 Bundle | 32 | several commands as one setup | the test kit, a profession with its recipes, the buff sets, the test outfit |
| P8 Target actions | 10+ | acts on what you have targeted | the creature's info, follow, say, kill, tame, despawn; spawning a target |
| P9 Readout | 55 | asks the server something; the answer is the point | where am I, player info, auras, cooldowns, the threat list |
| P10 Places | 22 | go somewhere or bring someone | teleport, the capitals, graveyards, coordinates, back again |
| P0 Free input | 151 | a command typed with its own words or IDs | learn a spell, an aura by ID, a creature says…, the developer commands |
| P11 Asks first | (inside the above) | can’t be undone | deleting, resetting, the world database's writes |

The free input rows shrink as P3, P5 and P7 take them. Most need an ID that a lookup (P5) or a list (P3) can give.

## Principles

1. **By what you're testing, not by command name.** The first thing on screen is an area of the game, each with its quick tests.
   The command reference stays one click away.
2. **Click, don't type.**
   - Every value the server knows is a button: factions, emotes, places, ranks, ready amounts.
   - Typing stays for your own number or a name.
3. **One place for a command, links for the rest.** Where a test needs commands from another area (Cooking needs its reagents,
   the toasts' tests, a level), the page shows **Goes with** links that jump there with the right values. Nothing is copied.
4. **Two columns.**
   - A page is a gold title, then a column of facts and choices beside a column of actions.
   - Lists of values (factions, places, emotes) run in two columns.
   - Buttons pair up in two columns.
5. **Show the state.**
   - Switches show on or off.
   - Target actions name what is targeted, or say nothing is.
   - A profession shows its skill and rank.
   - A readout's answer shows in the pane as well as in chat.
6. **The same order on every page** (the attribute tooltips' lesson): title, what it is, the choices, the actions, Goes with,
   the command line in grey last.
7. **Danger is visible where it lives.** A command that can't be undone stays in its area, in red with what is lost, and asks
   first. A "Destructive" tab of its own hides it from where it would be used. Proposed: keep a filter for it instead.

## Proposed structure

Three tabs on the window's side:
1. **Test**: the quick tests, by area. New, and the first the window opens on.
2. **Commands**: every command, as today's hubs (Everyday, Sometimes, Destructive), searchable, in the new page layout.
3. **Console**: the client's settings, as today.

The Test tab's areas, each a page with its own layout:

| Area | What's on it | Patterns |
|---|---|---|
| **Your character** | level (steps), money, health and power, speed, talents (fresh, every rank), spells (every spell, a spell by search), reputation (factions in two columns × standings), honor | P2, P3, P5, P7 |
| **Gear and items** | the test outfit, Tier 1 by class, any item by search (then add 1, 5, 20, a stack), item sets, big bags, repairs | P7, P5, P2 |
| **Professions** | each profession as a ladder (below), gathering, fishing, the toasts that go with them | P4 |
| **Weapon skills** | each weapon as a ladder: learn it, +1, +10, the most for your level | P4 |
| **Buffs and combat** | the buff sets, world buffs, shields, debuffs, take one off, every aura listed (P9); a target (dummy, 60, 63), kill, leave combat, cooldowns, can't die | P7, P8, P6 |
| **Character sheet tests** | the stat dumps, the before and after, the scenarios of the test run | P7 |
| **Places** | the capitals by faction, your class trainer's city, dungeons and raids by level, graveyards, back again, coordinates | P10, P5 |
| **Creatures and the world** | spawn by search, the target's actions, weather, music, events, respawn | P5, P8, P3 |
| **Forever UI moments** | banners and toasts, gathering samples, the feedback window, the selftest | P1 |
| **Quests, pets, groups, bots** | the quest log fills, the hunter pet's ladder (level, loyalty, skills), bots | P7, P4, P3 |
| **Server** | info, saving, accounts, moderation, developer (the Commands tab's, linked) | P9, P11 |

## The professions page: a ladder of variables

The user: “The idea for testing professions is to test a lot of variables … +1 Level is important for toasts. Max Apprentice
Level and All Patterns for Apprentice.”

**Header:** the gold title (Cooking), then the skill as a bar, "75 / 75 · Apprentice", and the rank's name.

**The ladder:** one row per rank.

| Rank | Learn it | Skill | Patterns |
|---|---|---|---|
| Apprentice (1-75) | Learn Apprentice | Start (1) · +1 · +5 · Top of the rank (75) · One short (74) | Apprentice's patterns |
| Journeyman (50-150) | Learn Journeyman | Start (50) · +1 · Top (150) · One short (149) | Journeyman's patterns |
| Expert (125-225) | Learn Expert (level 10? 20?: the trainer's rule) | … | Expert's patterns |
| Artisan (200-300) | Learn Artisan (level 35) | … · 300 | Artisan's patterns |

- **Toasts and banners, as moments to test:**
  - the first skill point
  - hitting the rank's top, where the trainer prompt shows
  - the next rank learned
  - a recipe going grey, then green, then yellow
  - 300
- **Recipes:**
  - one pattern by search
  - a pattern's book or item added to the bags, to learn it from the item
  - a specialization (Gnomish or Goblin, the smiths' and leatherworkers')
- **Goes with:**
  - the reagents for a sample recipe (`.additem`)
  - the profession's trainer (Places)
  - Banners and toasts
  - the crafting window

Each cell is a button; the row's numbers come from ProfessionData.lua (ranks, levels, trainers). The weapon skills use the same
ladder with fewer columns.

## The reputation page: a list of choices in two columns

- **Left column:** the factions in two columns, by side (Alliance, Horde, Steamwheedle, Argent Dawn…). Your own side comes first;
  the other side's capitals are there too, as the user's screenshot has them.
- **Right column:** the standing buttons, each setting the chosen faction to the start of a standing: Hated to Exalted, plus
  +1,000 and +the next standing's step.
- **Goes with:** the Reputation window, and the progress feed's line.

## What a page looks like (to try in the playground)

**A** (the user's screenshots, today):
- a centered title and the command under it
- the text and examples in one column
- the buttons stacked in one column, full width

**B** (proposed): see the playground. It has three layouts:
- **B1 two columns:** facts on the left, actions on the right
- **B2 the list in two columns** with a sticky action bar
- **B3 the ladder grid**

## The playground

`dbsite/build/win_gm_playground.py` writes the page to `(private files)`, with the web library
(FUI) so it looks like the game's window. It shows:
- **each pattern** (P1-P11) as a card, with a real example from the 571 rows
- **the pages:** Cooking's ladder, Reputation's two-column list, a lookup-then-act (find an item, add it), a switch set (GM
  modes), a target panel, a readout, a bundle with its steps, Places
- **Goes with links** between pages

Click and hover work on the page, and nothing is sent anywhere. The user picks a layout per pattern; then it's built in game.

## Open questions (for the user)

1. Should the Test tab be the first thing the window opens on, with the hubs moving under Commands?
2. Danger inline in red with its confirm, or a Destructive filter too?
3. Readouts: show the server's answer inside the pane? That means reading the chat's system lines for a moment after sending.
4. How many profession variables per rank (the ladder's columns)?

## The user’s decisions (session 58’s close)

- **Layout B2**: the list in two columns with an action bar. The user has changes to make to it; they come next session.
- **The window’s size:** to be found so things fit comfortably. A bigger scroll is fine.
- **The buttons’ fixed location** (B2’s action bar) is liked in some places.
- **The buttons of Find, then act, Switch and Ladder** need work; “overall they’re nice”.
- **Reputation in B1, restacked:** the factions in two columns on top, the buttons in two columns under them.
- **The test character wizard:** “exactly what I imagined” (test-character-wizard.md).

## Session 59: the user’s changes to B2, then “Let’s build it”

The changes, made in the playground first:
- **Buttons of any size:** the red button’s right end alone was 50 px at 22 tall, so narrow buttons showed only their right side.
  `tools/asset-extract/any_size_buttons.py` cuts the same art into 7 px ends and one long middle (FUI.anyButton on the web).
- **The window 882 wide** (was 860): the pane 5% wider, five buttons a row in the action bar.
- **Switches:** the On / Off state in its own column on the left, lined up down the rows.
- **More vertical padding** across the board: blocks, labels, rows, button grids.
- **B1 and B3 removed:** A (today) and B2 remain.

The open questions, answered:
1. **The Test tab first**, today’s hubs under Commands, then Console.
2. **Danger inline:** red, in its own area, and it asks first. The Destructive tab stays under Commands.
3. **Readouts:** chat only for now. The answer in the pane comes later, as its own step.
4. **The ladder’s columns:** as the playground has them (Learn, Start, +1, Top, One short, the recipes).

The first build:
- **Step 1:** the B2 page frame (gold title, blocks, any-size buttons, the action bar, 882 wide) and the Test tab.
- **Step 2:** the professions ladder, Reputation, GM modes, Find then act. Other rows show in B2 with their values as buttons.

## Built: Forever UI 0.236.0 (session 59), steps 1 and 2

- **The window 882 × 484.** Side tabs: Test (the wrench, first; `/gm`, the Help button and the game menu open it), Commands (the
  three hubs as before), Console, Forever UI (last).
- **The Test tab** (GMSuite.lua): the eleven areas on the left, each row one of Help.lua's or a page. The pane in B2:
  - the gold title (18), the state
  - blocks under the hairline, labels in small white capitals, 12-18 px between blocks
  - values in two columns
  - the action bar fixed along the bottom (a dark ground, a gold hairline)
  - Goes with links, the command in grey last
- **Pages:**
  - **Each profession's ladder:** the ranks × Learn (or the book) / Start / +1 / Top / One short / its recipes; the moments to
    test; the rank's recipes in two columns, coloured at your skill; the chosen one's Learn it / Reagents / Yellow / Grey / All in
    the bar. The recipes by rank: GMSuiteData.lua (tools/asset-extract/gm_suite_data.py, the playground's own working-out).
  - **Each weapon skill:** Learn, +1, +10, +50, To 300, the most for your level.
  - **Reputation:** the factions in two columns (your side first), the standings five a row in the bar.
  - **GM modes:** the state on the left (what you last set here; ? until then), On / Off on the right; Test in peace, Play again.
  - **Find, then act:** Item, Spell or Creature; the server's `.lookup` lines read back from chat for 3 s; Add 1 / 5 / 20 / Stack,
    Learn / Aura / Off, Spawn / Go to.
  - **Every other row:** its text, its examples each with Send, its values as buttons (one part: a click sends it; more: into the
    chat box), Run (Run… when it asks first) and Chat in the bar.
- **Buttons of any size in game:** ns.PaintAnyRed (Widgets.lua) with the cut art (any_size_buttons.py --addon), for a button
  narrower than the game's own ends allow (about 27 px at 22).
- **Tests:** 102-gm-test-tab.lua (36 checks).

**Next:**
- the rest of the areas' own pages (Places by side, Banners and toasts, the target panel, bundles with their steps)
- Commands in the B2 layout
- readouts in the pane (later, the user's choice)
- the test character wizard (test-character-wizard.md: its four open questions)
