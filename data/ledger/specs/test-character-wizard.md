# The test character wizard: from a new character to one ready for testing (a plan)

Session 58 (2026-10-03), the user, after the GM Testing Suite's information architecture (gm-suite-ia.md):

> “Lets think of testing flow from character creation to character completion ready for testing. You create the character and
> type a command for test character. It shows you a simple form (like typeform) every question you answer with the click of a red
> button, then it takes you to the next question. Each red button uses a command on your character. The first question might be,
> what level do you want your character to be? 10, 20, 30, 40, 50, 60. maybe it would have 2 columns with button, with the second
> column having 5, 15, 25 etc. Then the next question would be something like, do you want professions? Then you choose the first
> profession, then the profession level, then the patterns. Then you choose the second professions and it repeats. Then you can
> choose gear, then gold etc etc.”

A plan only; nothing is built until the user agrees. Like every new window, it is first a browser mockup (the GM playground has
its first questions), then built in game.

## How it feels

- **Opening it:**
  - `/fui testchar`, or the GM window's Test tab's first row, "Prepare this character".
  - Optionally, a quiet toast at the first login of a level 1 character: “New character? Prepare it for testing”. It shows once,
    and nothing happens without a click.
- **One question at a time**, in a small window of Forever's dialog metal: the question as a gold title, a line under it about
  what it changes, then the answers as **red buttons in two columns**. A click runs the answer's commands at once and moves to the
  next question, with a short slide sized to the action (ui-ux-guidelines.md: motion understated).
- **The bar:**
  - progress, as dots by section: Level, Spells, Professions, Gear, Money, World, Extras
  - **Back**: shows the last question again; what was already sent isn't undone, see "Undo" below
  - **Skip**: leaves that part as it is
  - **Done**: jumps to the recap
- **A state line** under the title shows what has changed so far, e.g. "Level 1 → 60 · Leatherworking 300 · Tier 1". The
  character window updates live behind it.
- **The recap at the end:**
  - each answer, with its commands and a tick when sent
  - **Save as a profile** (below)
  - **Keep the character sheet** (`/fui statdump base`)
  - **Close**

## The questions (in order: each depends on what came before)

| # | Question | Answers (red buttons, two columns) | Commands |
|---|---|---|---|
| 1 | What level? | left 10 · 20 · 30 · 40 · 50 · 60; right 5 · 15 · 25 · 35 · 45 · 55; and "Your own", a number field | `.levelup n` (from the current level) |
| 2 | Spells? | Every spell for my level · Only the ones I have | `.learn all_myspells` |
| 3 | Talents? | None (points to spend) · Every talent · A saved build (later: the planned-talents Apply) | `.reset talents` · `.learn all_mytalents` |
| 4 | Weapon skills? | Top for my level · Learn every weapon my class can use, then top them · As they are | `.maxskill`; Help.lua's weapon rows |
| 5 | Riding? (level 40 and up) | Riding and a mount of my race · Riding only · No | `.learn 33388` (and the epic one at 60); `.additem` the race's mount |
| 6 | First profession? | the 9 primary, gathering first, crafting second: the GM window's PROFESSIONS list · None (skips 7-9 and 10) | `.learn` its rank spell |
| 7 | Its skill? | each rank's top: 75 · 150 · 225 · 300 · one short of a top (74, 149, 224, 299: for the rank-up and toast tests) · Your own | `.setskill id n max`, after `.learn` of the rank (level rules: Expert 10?, Artisan 35, from ProfessionData.lua) |
| 8 | Its patterns? | None · This rank's · Every pattern · Every pattern but one per rank (to learn one by hand) | `.learn all_recipes name` (by rank: the recipe IDs from ns.RecipeSkill) |
| 9 | A specialization? (Blacksmithing, Leatherworking, Engineering, Alchemy at its level) | each one · None | its quest spell |
| 10 | Second profession? | as 6-9, without the first | |
| 11 | Secondary professions? | Cooking · First Aid · Fishing · All three · None, then each one's skill as in 7 | as above |
| 12 | Gear? | Nothing new · Tier 1 · Tier 1 and the other gear · The other gear only · Greens for my level (later: a list per class and level) | the Tier Sets buttons; `.additem` |
| 13 | Bags? | Four big bags · As they are | `.testing bags` |
| 14 | Class extras? (by class) | a hunter's pet (tame a beast at your level, Best Friend, every skill), ammo and a quiver · a warlock's demons and soul shards · a shaman's totems · a rogue's poisons and lockpicking · a mage's reagents · a priest's or paladin's reagents | the Hunter pet rows; `.additem`; the class quests' spells |
| 15 | Money? | 0 · 10 gold · 100 gold · 1,000 gold | `.modify money` |
| 16 | Reputation? | My side's cities to Exalted · Both sides' · Honored (for the vendors) · None | `.modify rep id Exalted` (the factions by side) |
| 17 | Honor and rank? (PvP tests) | None · Some honor · A rank's worth | `.honor add` |
| 18 | The world? | Every flight path · The whole map explored · Neither | `.taxicheat on`, `.explorecheat` |
| 19 | Where to? | Stay · My capital · My class trainer · A dungeon of my level | `.tele` |
| 20 | For testing? | GM mode · Can't die · Neither | `.gm on`, `.gm unkillable on` |

Questions that don't apply are left out: riding before 40, pets for non-hunters, specializations below their level. The level is
asked first because almost everything else depends on it: spell ranks, profession ranks, gear, riding.

## How it works in the addon

- **One table of questions** (data, like GMHubData.lua), and the window just draws whichever comes next. Each question has:
  - `id`, `section`, `title`, `line`
  - `when(state)`: whether to ask it
  - `answers`: each with a `label`, `cmds(state)` and `set(state)` (what it records)
  - `next`: optional, for branches like the second profession
- **The state** is the answers so far plus the character's facts (level, class, race, known professions). It lives in memory
  while the window is open.
- **Sending:**
  - the GM window's `send()`: whispers to yourself, 0.3 s apart, `%me` filled in
  - a step waits for the server's replies before the next question shows, e.g. the level and skill updates (PLAYER_LEVEL_UP,
    SKILL_LINES_CHANGED), with a short timeout, so the next question sees the new state
  - every command sent is logged with its answer, for the recap
- **Safety:**
  - Only on yourself. The wizard clears your target first; the GM rows already refuse to act on a target.
  - On a character that isn't a test one, the first screen asks once: “This changes <Name> for good. Go on?” The test accounts and
    the user's own characters are named in docs/test-matrix/README.md.
  - Nothing destructive is offered. Nothing deletes items or characters.
- **Undo:**
  - Back shows the last question again, but its commands stay done.
  - Where an undo exists, the recap offers it: a level down (`.levelup -n`), a profession forgotten (`.unlearn`), money back.
  - Gear and reputation have no clean undo. The recap says so.
- **Profiles:**
  - **Save as a profile** keeps the answers by name in `ForeverUIDB.testProfiles`, e.g. “60 hunter, Leatherworking and
    Skinning 300, Tier 1, 1,000 gold”.
  - **Run a profile** asks nothing and sends it all, with the recap.
  - Profiles are the test matrix's character setups: a run's plan names the profile each character starts from
    (FRAMEWORK.md, themes/*/plan.md). The same setup is one click for the user and one line for an unattended run.

## Building it, in steps

1. **The playground** (`dbsite/build/win_gm_playground.py`): the first questions (level, spells, first profession, its skill, its
   patterns), clickable, with the progress dots, Back, Skip and the recap. The user tries the flow and the look, and adjusts.
2. **The engine and the core questions** (1-4, 6-13, 15): the questions table, the window, the waits, the recap. Offline tests:
   - each answer sends its commands
   - `when` skips the right questions by level and class
   - Back and Skip
   - the recap's list
3. **Class extras, the world, reputation, honor** (14, 16-20), with the class rules checked against the server's data:
   - the trainers' rank levels
   - the class quests' spells
   - the mounts by race
4. **Profiles**, and their use by the test matrix: a plan's characters start from named profiles.
5. **The first-login toast**, if the user wants it.

## Open questions (for the user)

1. The command's name: `/fui testchar`, `/fui newchar`, `/testchar`?
2. Run each answer at once (as asked), or show the recap first and send it all at the end? At once gives the live feel; at the end
   allows a free Back.
3. Greens for my level as a gear answer needs a list per class and level. Worth building, or Tier 1 and the other gear only?
4. The first-login toast: yes or no?

## The user’s answers (session 59)

1. **The command:** `/fui prepare` (Claude’s suggestion, the user asked for one), and the Test tab’s first row, “Prepare this
   character”.
2. **Each answer’s commands go at once**, one by one, as the user clicks (the live feel). Back shows the question again; what was
   sent stays done.
3. **Greens for my level: yes.** A list per class and level, made from the server’s items.
4. **No first-login toast.**

## Built: Forever UI 0.236.1 (session 59), step 2

`/fui prepare`, or Start on the Test tab's first row, “Prepare this character” (GMSuite.lua):
- **The first screen:** what it does, and that each answer changes the character at once. Start (gold) or Close.
- **The questions:**
  - What level? (10-60 left, 5-55 right, Your own)
  - Spells; Talents (from level 10); Weapon skills
  - First profession (gathering first), its skill (each rank's top and one short; greyed below the rank's level), its patterns
    (None, up to this rank, every one, all but one a rank), a specialization at its skill and level; the second the same
  - Secondary professions and their skill
  - Bags; Gear (Greens for my level, Nothing new, Tier 1, with the other gear, the other gear only: Tier greyed below 60)
  - Money
- **Sending:** each answer's commands go at once, one by one (0.3 s apart). The question stays, with “Sending…”, until they've
  gone, then the next slides in (18 px, 0.18 s).
- **The bar:** five dots (Level, Spells, Professions, Gear, Money), “Professions · 6 of 14”, Back, Skip, Done.
- **The recap:** each answer with the ready-check tick and its commands; Keep the character sheet, Start again, Close.
- **Greens for my level:** GMSuiteData.lua's ns.GMGreens, one green a slot per class and level band (gm_suite_data.py).
- **Tests:** 103-prepare-wizard.lua.

**Next (step 3):** class extras, reputation, honor, the world, where to, GM modes (questions 14, 16-20); then profiles (step 4).

## Session 59, after the user's pass in game: Forever UI 0.236.2 to 0.237.0

The user's changes, each tried in game (the log: docs/session-log/59-*.md):
- **The first screen** in the game's voice, what you'll choose, Close left and Start right; `/prepare` too.
- **A button at each question's top right** for the pane it changes (Character, Spellbook, Talents, Skills, Professions, Bags).
- **Spells:** the class trainer's (TrainerData.lua) up to your level, not `.learn all_myspells` (every spell at any level); the
  class's quest spells in a block below (GMSuiteData.lua's ns.GMQuestSpells).
- **Talents:** each tree whole (by class), Fresh and Every talent; the +1 / +5 / +10 points removed (the server recounts them).
- **Weapon skills:** every weapon of the class with its skill and Learn or Top, Defense and Unarmed apart; learning unlearns
  first. Fist weapons now use their own skill (a server patch).
- **Professions:** the trainer's patterns in the answers, the others as pattern items below; the secondaries Cooking, Fishing,
  First Aid with their pairs, and their patterns as the two's.
- **Bags:** four real Bottomless Bags; special bags one of each (herbs, enchanting, a warlock's soul bag, a hunter's quiver and
  ammo pouch for the level).
- **No answer that only does what Skip does.**
- **The question box scrolls**, its bar inside the window's edge.
- **Extras (new):** Riding and a mount of your race from 40, the epic ones at 60; what the class carries (totems, shards,
  reagents, tools, seeds and ammunition by level, the hunter's pet rows).
- **World (new):** reputation (your side's cities to Exalted or Honored, or both sides'), every flight path and the whole map, GM
  mode and Can't die, and Where to last (your capital, the dungeons near your level).
- **The recap:** "<Name> is ready" with a ready check, how many answers and commands; Start again, Keep the character sheet,
  Done.

**Next:** "Prepare for PvP", planned with the user first: honor and rank, joining a battleground with players added to test
with, and three difficulties for them (easy: mostly greens and an unoptimized spec; medium; hard: best-in-slot gear and PvP
talents).
