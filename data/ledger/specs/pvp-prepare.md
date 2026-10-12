# Prepare for PvP: a plan

Session 59 (2026-10-04). The user, after the test character wizard (test-character-wizard.md):

> “We need a way to test out pvp and honor as well. Maybe this is a separate environment for prepare pvp character.”
> “We also need to be able to join a battleground and add players to test. not just join by myself. We then need 3 difficulty
> levels for players. Easy, medium and hard. This would change the gear, the specs and items they use during battle. So easy
> would be mostly greens and non optimized spec. Hard would be bis gear and talents for pvp junkies.”

A plan only. Nothing is built until the user agrees; then a preview in the GM playground first, then the game.

## What the server gives us (researched, with sources)

- **Bots:** the cmangos playerbots module is built and on (`aiplayerbot.conf`: `AiPlayerbot.Enabled = 1`).
  - `.bot add <name>` logs in one of your characters as a bot; `.bot create name= race= class= level= gear= role=` makes one.
  - About 90-100 random bots are online while you play, about 70/30 Alliance and Horde.
- **Bot difficulty:**
  - **Gear:** `.bot init=green|blue|epic <name>` re-rolls a bot at your level with gear of that quality; `.bot gear=green|blue|epic|best`
    equips without the re-roll.
  - **Talents:** each class has named PvP specs in the config (`talents pvp arms`, `pvp frost`…), whispered to the bot; `talents
    auto` picks one.
  - **What they use in battle:** `.bot prepare` (consumables and reagents), `.bot potions`, `.bot food`, `.bot enchants`.
- **Battlegrounds** (`battleground_template`):

  | Battleground | Players a side (min-max) | Levels |
  |---|---|---|
  | Warsong Gulch | 5-10 | 10-60 |
  | Arathi Basin | 8-15 | 20-60 |
  | Alterac Valley | 20-40 | 51-60 |

  - `.debug bg` (testing mode) lets a battleground start with one player a side; `.bg start` skips the countdown, `.bg stop` ends it.
- **Honor and rank:** `.honor add n` raises the stored honor; `.honor update` runs the weekly ranking now. Rank vendors and rank
  gear check the server's rank, so the flow raises the real one (`.modify honor` only changes what the client shows).

## The catch: who fills the other side

- **Your side:** bots in your group should follow you into a battleground when you queue as the group's leader (read in the code,
  not yet tried in game: the first thing to test).
- **The other side:** a bot with a master never queues on its own, and random bots don't queue today (`RandomBotJoinBG = 0`).
  Options:
  1. **Random bots queue** (`RandomBotJoinBG = 1` in `aiplayerbot.conf`, a config change and a restart): both sides fill with
     random bots near your level. Their difficulty is the random bots' own (we can re-gear them by name after they join).
  2. **Your own Horde characters as bots**, grouped by a second leader bot that queues: needs a small server change (a bot
     leader queues its group on a command).
  3. **Testing mode alone** (`.debug bg`): you and your group against nobody, for the objectives, the scoreboard and honor.

## The flow (proposed)

Its own window, like Prepare This Character (the same dialog, dots, Back / Skip / Done, recap), opened by `/fui pvp`, `/pvp`, and
the Test tab's "Prepare for PvP":

1. **You:** honor (+1,000 / +10,000), a rank (Private to High Warlord or Grand Marshal, raised for real), the rank's gear and
   mount from your side's vendors, PvP trinket.
2. **The battleground:** Warsong Gulch, Arathi Basin or Alterac Valley (only those your level allows), testing mode on or off.
3. **Your team:** how many (2, 5, all), which classes (a healer, a tank, or a balanced mix), from your characters, the Silverleaf
   Company party or new bots.
4. **The other team** (by the option chosen above): how many, which classes.
5. **Difficulty**, per team:
   - **Easy:** green gear, an unoptimized spec (`talents auto` with a PvE spec), no consumables
   - **Medium:** blue gear, a PvP spec, food and bandages
   - **Hard:** best gear (`gear=best` or epic), the PvP spec for pvp junkies, enchants, potions and every consumable
6. **Go:** the group made, everyone prepared, queued at the battleground; the recap lists who and how they're geared.

## Open questions (for the user)

1. Who fills the other side: random bots (a config change), your own Horde characters (a server change), or testing mode first?
2. One window with both parts (you, then the battle), or two: "Prepare for PvP" (you) and "Start a battleground" (the teams)?
3. Should difficulty be per team, or one setting for everyone?
4. Rank: for real (`.honor add`, then `.honor update`, so vendors sell), or only the rank's gear by `.additem`?

## First steps once agreed

1. In game, with the user: a bot in your group follows you into Warsong Gulch in testing mode (the untested part).
2. The playground: the flow's questions and the recap.
3. The engine: the wizard's table of questions reused (GMSuite.lua), its own questions and data (PvP specs by class, rank gear by
   side).

## The user's answers (session 59)

1. **The other side: random bots** (`RandomBotJoinBG = 1`).
2. **One window** for both: Prepare for PvP (you) and the battleground with its teams.
3. **Difficulty per team**, and **Medium a mix**: about 40% easy, 40% medium, 20% hard players.
4. **Rank for real** (`.honor add`, `.honor update`). Also to do: rebalance the honor gains and the reputation gains on the
   server, to reduce the grind (mangosd.conf's rates; amounts to settle with the user).

## Also asked (session 59)

- **The GM window's commands for PvP:** a "PvP and honor" area in the Test tab (rank for real, honor, the weekly run now, testing
  mode, start and end a battleground, Prepare for PvP's first row), and the Commands tab's rows checked against the server.
- **The documentation:** this file; docs/server/reputation-honor-skills.md (rank for real, the battlegrounds with bots, the honor
  and reputation rates once rebalanced); docs/server/bots.md (`RandomBotJoinBG = 1`).
- **A PvP journal in the Adventure Journal:** the battlegrounds (Warsong Gulch, Arathi Basin, Alterac Valley: their lore in the
  Chronicle voice, their maps, objectives, levels and team sizes), the honor system and the ranks by side, the rewards of each
  rank, and your own record (kills, honor, rank, standing). A web preview first (dbsite/build, as the other journals'), then the
  game (journals-design: the world, not the player, is the hero).

## Done so far

- `RandomBotJoinBG = 1` in config/aiplayerbot.overrides and the server's aiplayerbot.conf (backup aiplayerbot.conf.bak-20261004);
  read at the next mangosd restart.
- The playground's "Prepare for PvP" view (win_gm_playground.py): the intro, Your rank (the 14 ranks by side, `.honor add` for
  real), the rank's rewards (itemdata.rank_gear: each class's pieces by rank, the Insignia, the war mount), the battleground
  (testing mode), your team (`.bot create … gear= role= group= temporary=1`, a PvP or PvE named spec), the other team, Go (the
  capital's battlemaster) and the recap.

## The user's review of the preview (session 59)

- **The levels named as a battleground would:** Recruits (was Easy), Regulars (Medium: 4 in 10 recruits, 4 in 10 steady hands, 2
  in 10 veterans), Veterans (Hard), for both teams.
- **Rank buttons:** the rank's name at the left, "Rank N" at the right (flipped at the user's word; a long name a size smaller).
- **To the vendors** from the rewards question: the Champions' Hall (Captain Dirgehammer, 12777, map 449) and Officer Areyn
  (12805, Stormwind) for the Alliance; the Hall of Legends (Lady Palanseer, 12792, map 450) and Sergeant Ba'sha (12799,
  Orgrimmar) for the Horde, by `.go creature id`.
- **The text fits:** the window's body scrolls above its buttons.
- **The roles, even in every team and level** (the user: "a good mix of dps, tank, healer specs ... even for both teams in each
  difficulty"): about 3 healers, 1 tank and 6 damage in ten (1 healer in five, a tank from five, 12 healers in forty), you in a
  damage seat; within Regulars each role gets its own 4 / 4 / 2 split. Your team is made to it (classes of your side by role, the
  role's named spec: PvP for regulars and veterans, PvE for recruits); the other team's random bots are given roles to match when
  the battle starts (from the scoreboard, by class) and re-specced and re-geared.
- **The descriptions told apart:** your team (who stands beside you: "Your side's newest ... you'll carry the flag") and theirs
  (what you'll face: "Easy pickings ...", "A fair fight ...", "The other side's PvP junkies ... Expect to lose, and learn from it").
- **The recap lists your team:** each name, class, role, level of play and spec.
- **By the team's size** (the user: "What if its a 5 x 5?"): the roles from the team's own size (five: 1 healer, 1 tank, 3 damage
  with you); the levels counted over the whole team (Regulars of four bots: 2 recruits, 1 regular, 1 veteran; the split inside each
  role had lost the veteran) and dealt over the members in turn by role, spread evenly. The other team as many as join (read from
  the scoreboard at the start; the preview assumes as many as yours), not the battleground's most.

## Built: Forever UI 0.238.0 (session 59), step 1 in game

- **One window, three flows planned:** the test character wizard's window takes a flow (GMSuite.lua's `FLOWS`: title, sections,
  questions, first screen, state line, recap); Prepare This Character and Prepare for PvP are two of them. Dungeons and raids are
  the third, next session (the user, session 59).
- **Prepare for PvP** (`/fui pvp`, `/preparepvp`: not `/pvp`, the game's own sets your PvP flag; the Test tab's "PvP and honor"):
  as the preview, in game. The bots: `.bot create name= race=<id> class=<id> level= gear= role=healer|tank|dps login=1 group=<you>
  temporary=1`, then `/wait 5`, then each one's spec whispered (`talents <name>`; Help.lua's sender now whispers "/w Name text" and
  pauses for "/wait n"). The other team: when the battle starts, the scoreboard's other side, each `.bot init=green|blue|epic
  <name>` by the level's mix.
- **The Test tab's "PvP and honor":** Prepare for PvP, Honor and battlegrounds (+1,000 and +10,000 rank points, the weekly ranking
  now, your honor, testing mode, start it now, end it), Honor.
- **Data:** GMSuiteData.lua's ns.GMRankGear (each side's and class's rank pieces, from itemdata.rank_gear) and ns.GMBotSpecs (the
  bots' named specs).
- **Tests:** 104-prepare-pvp.lua.

**Not tried in game yet** (the first things next session, after a mangosd restart for `RandomBotJoinBG = 1`):
1. `.bot create` with these values makes a bot in your group, and the spec whisper takes.
2. Bots in your group follow you into Warsong Gulch when you join as a group.
3. Random bots of the other side queue.
4. A GM's `.bot init=<q> <name>` works on a random bot that isn't theirs.
5. The rank: `.honor add 30000` makes Knight-Captain, and the Champions' Hall sells to you.

## Next: Prepare for a Dungeon or a Raid (the user, session 59: "the same way as prepare for PVP")

The third flow in the same window: the dungeon or raid (by level), your group (a tank, a healer, damage: bots made for it, as
the PvP team, Recruits / Regulars / Veterans), what you need (attunements and keys, the reagents, the resistance gear for Molten
Core and the others), and Go (to its entrance). To plan with the user first, then a playground preview.

## Tried in game (session 60)

- **Step 1 failed at first:** `.bot create` makes the bot on your own account, which the module caps at nine characters; NEPO was
  full, so every bot answered “Account has max characters” and the spec whispers found no one. Forever UI 0.238.3 sends
  `.rndbot create` (the same keys; the bot made on the random bots' accounts, `RandomPlayerbotMgr::GetOrCreateAccount`, a new
  account when they're full), and waits 10 seconds before the whispers (F0057). To try again.
- **Then it worked (the user, 2026-10-05):** the nine bots made with `.rndbot create` joined the group, Join as Group queued them
  at Aethalas in Darnassus, random Horde bots filled the other side (after several minutes: they queue on a random timer), and the
  user played Warsong Gulch against them to the end with no problems. Steps 1-3 of "Not tried in game yet" hold; step 4 (the
  other team re-geared by level of play) and step 5 (the rank and the Champions' Hall) still to try.
