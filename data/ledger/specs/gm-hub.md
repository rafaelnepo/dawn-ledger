# GM hub: /fui, /gm and a /console in one window

Research of 2026-10-02, after session 54 (read-only: nothing under addons/ changed, the server and its databases untouched). The user's
plan: one window with three tabs on its right side that merges /fui and /gm and adds a new /console; the GM commands filled out,
then sorted into three hubs: (1) everyday, (2) sometimes, (3) destructive or high impact, so the everyday ones are easy to reach and
the dangerous ones kept apart. Also asked: how weather works on our server and what we can do with it. Sources: Forever UI's
`addons/ForeverUI/Help.lua`, `Core.lua`, `Widgets.lua`; the server's command tables in `(the server's checkout)`
(and `Anticheat/module/AnticheatChatCommands.h`), its help texts in the `command` table (`sql/base/mangos.sql` and
`sql/updates/mangos/`), `Weather/Weather.cpp`, `Maps/Map.cpp`, `Entities/Player.cpp`; the world data
`(the server's checkout)` (`game_weather`); HermesProxy's weather translation
(`(a file on the server's Mac)`, `World/Client/PacketHandlers/MiscHandler.cs`).

## In short

- The server has **535 GM commands** (every leaf of the command tree, as built here: AH bot and playerbots on, the
  deprecated playerbot off). The GM Testing Suite runs **41** of them today (two of them aliases: `.goname`, `.namego`).
- **Hubs:** everyday **60** (the suite covers 40), sometimes **363** (of which 80 are `.reload` tables and 79
  developer checks), destructive or high impact **112**.
- **Missing and worth a row** (hubs 1 and 2, not developer-only, not moderation, not console-only): **179**, the
  list below; the 20 for the everyday hub first.
- **Flags:** 14 run only from the server console (mangosd's window), 55 make no sense on a one-player server
  (moderation, tickets, IP lookups), 184 are developer checks, 26 write the world database for good, 3 are
  disabled in the source.
- **Weather:** one command, `.wchange type intensity`, for the zone you stand in, not kept (the zone's own roll takes over again
  within about 10 minutes); 33 zones have weather in the data (rain, snow, sandstorm), the others never change by themselves.
  Details and ideas in [Weather](#weather).
- **Examples (2026-10-03):** every row you type (`chat`) in `addons/ForeverUI/GMHubData.lua` has one to three "If you type"
  examples: **306 of 419 rows**, **385 examples** (Everyday 8 of 19 rows, Sometimes 222 of 291, Destructive 76 of 109; the
  rest run as they are). 248 rows got theirs on 2026-10-03 (320 examples), with real numbers from this server's world
  database; what the source showed on the way is in [Examples and what they turned up](#examples-and-what-they-turned-up).
- **`/console` is the client's own command** (`/console cvar value`); the tab's research is [console-commands.md](console-commands.md).

## What exists now

### The GM Testing Suite (/gm)

`addons/ForeverUI/Help.lua` (lines 1-720). Opened by `/gm`, `/fui solo` (alias `/fui gm`), the Help micro button and the game
menu's "Testing Suite" button (HelpFrame taken out of the panel layout; `/fui solo button off` gives the game's help back).

**Layout:** `ns.CreateReferenceWindow` (`Widgets.lua`), 648 x 484, the window shared with the /fui guide and the Macro Guide:
Forever's character-window frame with the portrait, a search box, the list on the left (398 wide, collapsible gold headers), the
detail pane on the right (title, the command in grey, the text with "If you type" examples in gold) and the footer buttons: **Run**
(sends it) and **Chat** (puts it in the chat box to edit). A profession or weapon row shows five buttons instead: +1 Level,
+10 Levels, +50 Levels, To 300, Recipes.

**How a row runs:** a GM command goes to the server as a **whisper to yourself** (`SendChatMessage(cmd, "WHISPER", nil, me)`):
the server parses commands in whispers first, nobody sees it, and a whisper needs no hardware event. Several commands queue
0.3 s apart. A row marked `target` refuses to run while another unit is targeted (the server would act on it). A row whose
command starts with `/fui` calls Forever UI's own slash handler; `!` commands (the proxy's own) are sent the same way and the
proxy swallows them. `%me` becomes your name. Each GM command sent is noted by the Statistics tracker (`NoteGMCommand`).

**Its 14 categories and their rows** (the data: `TOPICS`):

| Category | Rows | Runs |
|---|---|---|
| Getting started | This server, Forever UI, Where am I, Save now | `/fui help`, `.gps`, `.save` |
| Test character | Everything below (the kit), Riding, Leatherworking, Enchanting, Cooking, First Aid, Fishing, Create the guild, Invite the roster | `.learn 33388`, `.learn all_recipes x` + `.setskill`, `.guild create`, `.guild invite` (Silverleaf Company / Earthroot Company by faction) |
| Character | Level up, Money, Run speed, Revive, Reset cooldowns, Max weapon skills, Repair everything, Learn a spell, Reset talents, Learn every talent, Reputation, Honor | `.levelup`, `.modify money`, `.modify speed`, `.revive`, `.cooldown clear`, `.maxskill`, `.repairitems`, `.learn`, `.reset talents`, `.learn all_mytalents`, `.modify rep`, `.honor add` |
| Professions | Every profession + the 12 | `.learn` (rank spells), `.setskill`, `.learn all_recipes` |
| Weapon Skills | Every weapon you know + 17 | `.learn` (weapon spell), `.setskill` |
| Banners and Toasts | 8 rows | `/fui levelup`, `/fui spell`, `/fui loot`, `/fui money`, `/fui achievement`, `/fui alchemy n`, `/fui gather toast`, `/fui reset toasts` |
| Gathering and Fishing | 6 rows | `/fui gathersample`, `/fui fishsample`, `/fui gather show/hide`, `/fui reset gathering confirm` |
| Hunter pet | Pet info, Pet to your level, Best Friend, Learn every skill, Teach your pet, Training points | `.pet info / level / loyalty / learn / teach / tp` (our patch) |
| Items | Add an item, Find an item | `.additem`, `.lookup item` |
| Tier Sets | Your class's Tier 1 + the 9 sets | eight `.additem` each |
| Travel | Teleport, Back again, Go to a player, Bring a player | `.tele`, `.recall`, `.appear`, `.summon` |
| Game master mode | GM mode on, GM mode off, Invisible | `.gm on/off`, `.gm visible off` |
| Quests | Complete a quest, Add a quest, Fill the log for testing, Every quest color, Mark done for the client | `.quest complete/add/remove`, `!qcomplete` / `!quncomplete` (proxy) |
| Bots | Log a bot in, Talk to your bots | `.bot add/remove` |

### /fui

`/fui` alone opens the **Forever UI guide** (`ns.ToggleIntro`, `Help.lua` lines 723-966): the same reference window, its `INTRO`
table in six categories (Windows, Your interface, Banners and toasts, Maps, Testing, Troubleshooting) with gold subheadings; a
row runs the command (the window closes first) or, when a word must be chosen (`on | off`, `1-8`), Chat puts it in the chat box.
`/fui help` prints `ns.help` in chat.

Registered (`ns.AddCommand` in 40 files): 63 registrations, 72 command words with their aliases, plus the 12 profession words of
`ProfessionBanners.lua` (`/fui alchemy 1-8`…). The guide lists 58 of them. **Not in the guide:** `bars`, `books`, `find`,
`gamepad`, `help`, `keys` (Key Bindings), `macrowindow`, `options`, `shots`, `titanbar`, `totems`, `tradecheck`, `typecheck`,
`typetest` (the rest are aliases: `aj`, `bag`, `character`, `editmode`, `gm`, `honor`, `macroguide`, `pad`, `professions`,
`reputation`, `spellbook`, `statistics`, `typeset`, `off`, `keybindings`, `default`). Two words are registered twice and the
later file wins: **`/fui keys`** is Key Bindings (`KeyBindings.lua`), so `Bags.lua`'s alias for the keyring never runs; **`/fui
book`** is the professions book (`Professions.lua`), not `SpellBook.lua`'s alias. Worth settling when the windows merge.

### /console

Nothing of ours yet. The planned tab is the client's settings: the CVars that `/console name value` sets, sorted into buckets like
the GM hubs: researched beside this page in [console-commands.md](console-commands.md). One trap for its slash command: **`/console`
is the client's own command**; an addon that registers it takes it over, and every `/console xyz` line typed or in a macro would
reach our handler. Either ours opens the tab only with no argument and passes `/console something` on to the game (`ConsoleExec`),
or the tab gets another word (`/fui console`).

## The server's commands

### How the server decides who may run one

- Each command has a **level** (the code's default, replaced by the `command` table's `security` column where the table has a
  row: `SetDataForCommandInTable`): 0 player, 1 moderator, 2 game master, 3 administrator, 4 console. The user's account is level
  3 (`account set gmlevel <user> 3`, docs/server/operations.md), so everything up to 3 works in game.
- **Level 4 runs only in mangosd's window** (the server console): 14 commands: `.account create / delete / onlinelist /
  set gmlevel / set password`, `.character erase / deleted delete / deleted list / deleted old`, `.server exit`, `.quit`,
  `.server log filter / level`, `.debug spellcheck`. A GM window can’t send them; it could only print them
  for copying into the server's window (or run a script on the Mac: not from the game).
- **Game only:** 300 commands have the console flag off (they need a character: `.gps`, `.additem`, `.tele`…); 221 work in both.
- The `command` table's help texts exist for 310; the other 225 (most of `.debug`, `.reload`, `.anticheat`, the stat
  `.modify`s, our `.pet` commands) have none: `.help` says nothing for them. A row of ours carries its own text anyway.
- Commands are typed with a dot (or `!`). The proxy's own `!` commands (`!qcomplete`, `!quncomplete`…) never reach the server.
- Playerbots adds `.bot` (player level), `.rndbot` (GM: random bots: stats, reset, teleport, upgrade…) and `.pmon`; the bots'
  own orders are whispers to the bot ("help"), not commands.

### Counts

| | Player | Mod | GM | Admin | Console |
|---|---|---|---|---|---|
| Commands | 13 | 62 | 131 | 315 | 14 |

By top-level word: `.reload` 91, `.debug` 59, `.modify` 42, `.npc` 37, `.lookup` 20, `.server` 17, `.go` 12, `.anticheat` 12, `.ticket` 10, `.learn` 10, `.gobject` 10, `.account` 10, `.worldstate` 9, `.gm` 9, `.reset` 8, `.character` 8, `.send` 7, `.pet` 7, `.mmap` 7, `.list` 6, `.tele` 5, `.movement` 5, `.link` 5, `.guild` 5, `.cast` 5, `.ban` 5, `.auction` 5, `.wp` 4, `.instance` 4, `.honor` 4, `.event` 4, `.ahbot` 4, `.unban` 3, `.trigger` 3, `.tickets` 3, `.quest` 3, `.pool` 3, `.cooldown` 3, `.banlist` 3, `.baninfo` 3, `.pdump` 2, `.loot` 2, `.combat` 2, `.channel` 2, `.bg` 2; and 55 single commands: `.additem`, `.additemset`, `.announce`, `.appear`, `.aura`, `.bank`, `.bot`, `.commands`, `.damage`, `.demorph`, `.die`, `.dismount`, `.distance`, `.explorecheat`, `.goname`, `.gps`, `.groupgo`, `.guid`, `.help`, `.hidearea`, `.itemmove`, `.kick`, `.levelup`, `.linkgrave`, `.loadscripts`, `.los`, `.maxskill`, `.mute`, `.namego`, `.neargrave`, `.notify`, `.pinfo`, `.pmon`, `.quit`, `.recall`, `.repairitems`, `.respawn`, `.revive`, `.rndbot`, `.save`, `.saveall`, `.setskill`, `.showarea`, `.stable`, `.start`, `.summon`, `.taxicheat`, `.testing`, `.unaura`, `.unlearn`, `.unmute`, `.waterwalk`, `.wchange`, `.whispers`, `.wr`.

The full list, A to Z, with each command's syntax: [Appendix](#appendix-every-command).

## What the suite covers, what's missing

**Covered (41):** `.gps`, `.save`, `.levelup`, `.modify money`, `.modify speed`, `.modify rep`,
`.revive`, `.cooldown clear`, `.maxskill`, `.setskill`, `.repairitems`, `.learn`, `.learn all_recipes`, `.learn all_mytalents`,
`.reset talents`, `.honor add`, `.additem`, `.lookup item`, `.lookup spell`, `.lookup quest`, `.lookup tele`, `.tele`, `.recall`,
`.appear` (`.goname`), `.summon` (`.namego`), `.gm`, `.gm visible`, `.quest add`, `.quest complete`, `.quest remove`,
`.guild create`, `.guild invite`, `.pet info / level / loyalty / learn / teach / tp`, `.bot`.

**Missing and worth a row (179)**, by the hub and category each would go in. Left out of this list: hub 3, the
`.reload` tables, the developer checks, moderation, the console-only ones.

- **Hub 1, Getting started:** `.account`, `.server info`, `.commands`, `.help`
- **Hub 1, Character:** `.modify hp`, `.modify mana`, `.modify rage`, `.modify energy`, `.dismount`, `.bank`, `.combat stop`
- **Hub 1, Items:** `.lookup itemset`, `.additemset`, `.testing bags`
- **Hub 1, Hunter pet:** `.pet levelloyalty`, `.stable`
- **Hub 1, Game master mode:** `.gm fly`, `.gm unkillable`
- **Hub 1, World:** `.wchange`, `.respawn`
- **Hub 2, Character:** `.character level`, `.character reputation`, `.honor addkill`, `.honor show`, `.list auras`, `.list item`, `.list talents`, `.modify honor`, `.guid`, `.itemmove`, `.pinfo`
- **Hub 2, Looks and stats:** `.debug anim`, `.debug play cinematic`, `.debug play sound`, `.debug play music`, `.debug send spellVisual`, `.gm chat`, `.gm mountup`, `.gm setview`, `.modify swim`, `.modify scale`, `.modify bwalk`, `.modify aspeed`, `.modify faction`, `.modify tp`, `.modify mount`, `.modify drunk`, `.modify standstate`, `.modify morph`, `.modify gender`, `.modify strength`, `.modify agility`, `.modify stamina`, `.modify intellect`, `.modify spirit`, `.modify armor`, `.modify holyresist`, `.modify fireresist`, `.modify natureresist`, `.modify frostresist`, `.modify shadowresist`, `.modify arcaneresist`, `.modify ap`, `.modify rangeap`, `.modify spellpower`, `.modify crit`, `.modify spellcrit`, `.modify meleehaste`, `.modify rangehaste`, `.modify spellhaste`, `.modify block`, `.modify dodge`, `.modify parry`, `.reset stats`, `.reset mods`, `.demorph`, `.die`, `.showarea`, `.hidearea`, `.damage`, `.waterwalk`
- **Hub 2, Spells and auras:** `.cast back`, `.cast dist`, `.cast self`, `.cast target`, `.cast`, `.learn all_gm`, `.learn all_crafts`, `.learn all_default`, `.learn all_lang`, `.learn all_myclass`, `.learn all_myspells`, `.aura`, `.unaura`, `.cooldown list`, `.cooldown clearclientside`, `.unlearn`
- **Hub 2, Travel:** `.go creature`, `.go graveyard`, `.go grid`, `.go object`, `.go taxinode`, `.go trigger`, `.go warp`, `.go zonexy`, `.go xy`, `.go xyz`, `.go`, `.tele name`, `.tele group`, `.groupgo`, `.start`, `.taxicheat`
- **Hub 2, Lookup:** `.lookup account all`, `.lookup account name`, `.lookup area`, `.lookup creature`, `.lookup event`, `.lookup faction`, `.lookup object`, `.lookup player account`, `.lookup pool`, `.lookup skill`, `.lookup taxinode`
- **Hub 2, Hunter pet:** `.npc tame`
- **Hub 2, Creatures and objects:** `.gobject near`, `.gobject nearspawned`, `.gobject target`, `.gobject activate`, `.gobject despawn`, `.gobject respawn`, `.list creature`, `.list object`, `.npc allowmove`, `.npc follow`, `.npc info`, `.npc threat`, `.npc playemote`, `.npc say`, `.npc spelllist`, `.npc textemote`, `.npc unfollow`, `.npc whisper`, `.npc yell`, `.npc showloot`, `.npc tempspawn`, `.npc evade`, `.npc despawn`, `.neargrave`
- **Hub 2, Groups and instances:** `.instance listbinds`, `.instance unbind`, `.bg start`, `.bg stop`
- **Hub 2, World and events:** `.event list`, `.event start`, `.event stop`, `.event`, `.worldstate wareffort show`, `.worldstate scourgeinvasion show`
- **Hub 2, Mail and auctions:** `.auction alliance`, `.auction goblin`, `.auction horde`, `.auction item`, `.auction`, `.ahbot reload`, `.ahbot status`, `.ahbot item`, `.send items`, `.send mail`, `.send money`
- **Hub 2, Accounts and characters:** `.account characters`, `.guild uninvite`, `.guild rank`, `.pdump write`, `.send message`
- **Hub 2, Server:** `.server corpses`, `.server motd`, `.server set motd`, `.saveall`

**The first to add (the everyday hub, 20):** Weather (`.wchange`, see below), Respawn nearby (`.respawn`), Leave combat
(`.combat stop`), Full health and mana (`.modify hp / mana / rage / energy`), Bank anywhere (`.bank`), Stable anywhere
(`.stable`), Big bags (`.testing bags`), Item sets (`.lookup itemset` + `.additemset`, a sibling of Tier Sets), Fly
(`.gm fly`, to test first: the 1.14.2 client through the proxy), Can't die (`.gm unkillable`), Dismount, Pet level and loyalty
at once (`.pet levelloyalty`), and the information rows (`.server info`, `.account`, `.commands`, `.help`).

## The three hubs

The rule for sorting: **everyday** acts on yourself (or your pet, your bots), is undone by another command, a relog or time,
and is used most sessions. **Sometimes** is harmless but rarer: other characters, creatures until they respawn, the world for a
while (events, battlegrounds), information and lookups, and the developer checks. **Destructive or high impact** takes away
progress that can't be given back, writes the world database for good, removes or locks accounts and characters, stops the
server, or changes the whole world or every character at once (the AQ war effort, mass mail, the weekly honor run).

Columns: Level (the lowest account level that may run it), Where (game, console or both), Suite (already a row), Why here.
Flags in italics: *console only*, *no use solo*, *developer*, *writes world DB*, *disabled*.

Categories follow the suite's own where they fit (Getting started, Test character, Character, Items, Quests, Hunter pet,
Travel, Game master mode, Bots); new ones: **World** (weather, respawn), **Looks and stats**, **Spells and auras**, **Lookup**,
**Creatures and objects**, **Groups and instances**, **World and events**, **Mail and auctions**, **Accounts and characters**,
**Server**, **Server data**, **Moderation**, **Developer**; in hub 3: **Character progress**, **World database**. Professions,
Weapon Skills, Banners and Toasts, Gathering and Fishing and Tier Sets stay as they are in hub 1 (they are built from the
commands above, plus `/fui` ones).

### Hub 1: everyday (60)

#### Getting started (6)

| Command | What it does | Level | Where | Suite | Why here |
|---|---|---|---|---|---|
| `.account` | Your account’s GM level. | player | both |  | information only, nothing changes |
| `.server info` | The server’s version, uptime and players online. | player | both |  | information only, nothing changes |
| `.commands` | Every command your account may use. | player | both |  | information only, nothing changes |
| `.gps` | Your map, zone, area and exact position. | mod | game | yes | information only, nothing changes |
| `.help` | .help command: the server’s help text for a command. | player | both |  | information only, nothing changes |
| `.save` | Saves your character now instead of at the next autosave. | player | game | yes | information only, nothing changes |

#### Test character (2)

| Command | What it does | Level | Where | Suite | Why here |
|---|---|---|---|---|---|
| `.guild create` | A guild with you (or a named character) as its master. | GM | both | yes | the kit’s guild |
| `.guild invite` | Adds a character (online or not) to a guild. | GM | both | yes | the kit’s guild |

#### Character (21)

| Command | What it does | Level | Where | Suite | Why here |
|---|---|---|---|---|---|
| `.honor add` | Adds honor points. | GM | game | yes | on yourself, quick to undo, used most sessions |
| `.learn all_mytalents` | Every rank of every talent of your class (points not spent). | admin | game | yes | on yourself, quick to undo, used most sessions |
| `.learn all_recipes` | A profession with every recipe, skill to its maximum. | GM | game | yes | on yourself, quick to undo, used most sessions |
| `.learn` | Teaches a spell by its ID. | admin | game | yes | on yourself, quick to undo, used most sessions |
| `.modify hp` | Sets health (current and maximum) of you or the target. | mod | game |  | on yourself, quick to undo, used most sessions |
| `.modify mana` | Sets mana (current and maximum). | mod | game |  | on yourself, quick to undo, used most sessions |
| `.modify rage` | Sets rage. | mod | game |  | on yourself, quick to undo, used most sessions |
| `.modify energy` | Sets energy. | mod | game |  | on yourself, quick to undo, used most sessions |
| `.modify money` | Adds copper (10000 = 1 gold); a minus takes it away. | mod | game | yes | on yourself, quick to undo, used most sessions |
| `.modify speed` | Run speed, 1 normal, up to 50 (also the swim and walk-back speeds). | mod | game | yes | on yourself, quick to undo, used most sessions |
| `.modify rep` | Reputation with a faction: a number or a standing’s name (Exalted). | GM | game | yes | on yourself, quick to undo, used most sessions |
| `.reset talents` | Takes back every talent point, free. | admin | both | yes | on yourself, quick to undo, used most sessions |
| `.revive` | Back to life where you stand, full health. | admin | both | yes | on yourself, quick to undo, used most sessions |
| `.dismount` | Gets you off your mount. | player | game |  | on yourself, quick to undo, used most sessions |
| `.cooldown clear` | Clears every spell and item cooldown. | admin | game | yes | on yourself, quick to undo, used most sessions |
| `.levelup` | Adds (or with a minus, takes away) levels. | admin | game | yes | on yourself, quick to undo, used most sessions |
| `.bank` | Opens your bank wherever you are. | admin | game |  | on yourself, quick to undo, used most sessions |
| `.maxskill` | Every weapon and Defense skill to its maximum for your level. | admin | game | yes | on yourself, quick to undo, used most sessions |
| `.setskill` | Sets a skill line’s value and limit (.setskill 165 225 300). | admin | game | yes | on yourself, quick to undo, used most sessions |
| `.combat stop` | Ends combat for you (stuck “in combat”). | GM | game |  | on yourself, quick to undo, used most sessions |
| `.repairitems` | Repairs all gear, free. | GM | both | yes | on yourself, quick to undo, used most sessions |

#### Items (5)

| Command | What it does | Level | Where | Suite | Why here |
|---|---|---|---|---|---|
| `.lookup item` | Item IDs by part of a name. | admin | both | yes | adds to your own bags or mailbox; nothing lost |
| `.lookup itemset` | Item set IDs by part of a name. | admin | both |  | adds to your own bags or mailbox; nothing lost |
| `.additem` | Puts an item in your bags (ID, [name] or a shift-clicked link, and a count). | admin | game | yes | adds to your own bags or mailbox; nothing lost |
| `.additemset` | Every piece of an item set (.lookup itemset finds the ID). | admin | game |  | adds to your own bags or mailbox; nothing lost |
| `.testing bags` | Four large bags into your bags (as many as fit). | GM | game |  | adds to your own bags or mailbox; nothing lost |

#### Quests (4)

| Command | What it does | Level | Where | Suite | Why here |
|---|---|---|---|---|---|
| `.lookup quest` | Quest IDs by part of a title. | admin | both | yes | your own quest log; .quest remove undoes |
| `.quest add` | Puts a quest in your log. | admin | game | yes | your own quest log; .quest remove undoes |
| `.quest complete` | Marks a quest in your log done, ready to turn in. | admin | game | yes | your own quest log; .quest remove undoes |
| `.quest remove` | Takes a quest out of your log (and its done state). | admin | game | yes | your own quest log; .quest remove undoes |

#### Hunter pet (8)

| Command | What it does | Level | Where | Suite | Why here |
|---|---|---|---|---|---|
| `.pet level` | Your pet’s level (max: yours), with its training points. | GM | game | yes | your pet only (our own commands, session 2026-09-28) |
| `.pet levelloyalty` | Your pet’s level and loyalty together (our pet patch). | GM | both |  | your pet only (our own commands, session 2026-09-28) |
| `.pet info` | Your pet’s level, loyalty, training points and skills. | GM | game | yes | your pet only (our own commands, session 2026-09-28) |
| `.pet loyalty` | Loyalty level 1 (Rebellious) to 6 (Best Friend). | GM | game | yes | your pet only (our own commands, session 2026-09-28) |
| `.pet learn` | You learn every (or one) Beast Training rank. | GM | game | yes | your pet only (our own commands, session 2026-09-28) |
| `.pet teach` | Puts a skill rank straight on your pet, paid in training points (or free). | GM | game | yes | your pet only (our own commands, session 2026-09-28) |
| `.pet tp` | Adds (or takes away) free training points. | GM | game | yes | your pet only (our own commands, session 2026-09-28) |
| `.stable` | Opens the stable wherever you are. | admin | game |  | your pet only (our own commands, session 2026-09-28) |

#### Travel (7)

| Command | What it does | Level | Where | Suite | Why here |
|---|---|---|---|---|---|
| `.lookup tele` | Place names for .tele by part of a name. | mod | both | yes | moves you (or a bot); .recall undoes it |
| `.tele` | Teleports you to a named place (.lookup tele finds names). | mod | game | yes | moves you (or a bot); .recall undoes it |
| `.goname` | The same as .appear (its older name). | mod | game | yes | moves you (or a bot); .recall undoes it |
| `.appear` | Takes you to a character (bots too). | mod | game | yes | moves you (or a bot); .recall undoes it |
| `.namego` | The same as .summon (its older name). | mod | game | yes | moves you (or a bot); .recall undoes it |
| `.summon` | Brings a character to you. | mod | game | yes | moves you (or a bot); .recall undoes it |
| `.recall` | Back to where you were before the last teleport. | mod | game | yes | moves you (or a bot); .recall undoes it |

#### Game master mode (4)

| Command | What it does | Level | Where | Suite | Why here |
|---|---|---|---|---|---|
| `.gm fly` | Fly mode on or off (untested on 1.14.2 through the proxy). | admin | game |  | your own GM switches; off again with one command |
| `.gm unkillable` | You take damage but can’t die (unlike .gm on, monsters still fight you). | admin | game |  | your own GM switches; off again with one command |
| `.gm visible` | Invisible to players and bots (.gm visible off), or seen again. | admin | game | yes | your own GM switches; off again with one command |
| `.gm` | .gm on: monsters ignore you and you can’t die; .gm off; no argument shows the state. | admin | game | yes | your own GM switches; off again with one command |

#### Bots (1)

| Command | What it does | Level | Where | Suite | Why here |
|---|---|---|---|---|---|
| `.bot` | .bot add name / .bot remove name: one of your characters as a bot that follows you (playerbots). | player | game | yes | logs your own characters in as bots; .bot remove undoes |

#### World (2)

| Command | What it does | Level | Where | Suite | Why here |
|---|---|---|---|---|---|
| `.wchange` | The weather in your zone: type 0 clear, 1 rain, 2 snow, 3 sandstorm; intensity 0 to 1 (see Weather). | admin | game |  | only around you, undone by time |
| `.respawn` | Respawns the target, or every creature and object near you, now. | admin | game |  | only around you, undone by time |

### Hub 2: sometimes (363)

#### Character (11)

| Command | What it does | Level | Where | Suite | Why here |
|---|---|---|---|---|---|
| `.character level` | Sets a character’s level, online or not. | admin | both |  | information, or a change to another character |
| `.character reputation` | A character’s reputation, faction by faction. | GM | both |  | information, or a change to another character |
| `.honor addkill` | An honorable kill of the target counted for you. | GM | game |  | information, or a change to another character |
| `.honor show` | Your honor numbers and rank. | mod | game |  | information, or a change to another character |
| `.list auras` | The target’s auras. | admin | game |  | information only |
| `.list item` | Who has an item: bags, mail, auctions. | admin | both |  | information only |
| `.list talents` | Your talents. | admin | game |  | information only |
| `.modify honor` | A field of honor (points, rank, kills…), not saved at logout. | mod | game |  | information, or a change to another character |
| `.guid` | The target’s GUID. | GM | game |  | information, or a change to another character |
| `.itemmove` | Moves an item between bag slots. | GM | game |  | information, or a change to another character |
| `.pinfo` | A character’s account, level, money, played time. | GM | both |  | information, or a change to another character |

#### Looks and stats (50)

| Command | What it does | Level | Where | Suite | Why here |
|---|---|---|---|---|---|
| `.debug anim` | Your character plays an emote by ID. | GM | game |  | fun, for a screenshot |
| `.debug play cinematic` | Plays a cinematic by ID. | mod | game |  | fun, for a screenshot |
| `.debug play sound` | Plays a sound by ID. | mod | game |  | fun, for a screenshot |
| `.debug play music` | Plays music by ID. | mod | game |  | fun, for a screenshot |
| `.debug send spellVisual` | Plays a spell visual on the target. | admin | game |  | fun, for a screenshot |
| `.gm chat` | The GM badge on your chat lines. | admin | game |  | fun or for screenshots, not daily |
| `.gm mountup` | A mount’s look for you: fast, slow, a display ID or the target’s likeness. | admin | game |  | fun or for screenshots, not daily |
| `.gm setview` | See through the target’s eyes; target yourself to come back. | admin | game |  | fun or for screenshots, not daily |
| `.modify swim` | Swim speed. | mod | game |  | for a test now and then; undone by a command or a relog |
| `.modify scale` | Your (or the target’s) size, 0.1 to 10. | mod | game |  | for a test now and then; undone by a command or a relog |
| `.modify bwalk` | Walking-backward speed. | mod | game |  | for a test now and then; undone by a command or a relog |
| `.modify aspeed` | Every speed at once. | mod | game |  | for a test now and then; undone by a command or a relog |
| `.modify faction` | The target’s faction, flags and NPC flags (until it respawns). | mod | game |  | for a test now and then; undone by a command or a relog |
| `.modify tp` | Free talent points. | mod | game |  | for a test now and then; undone by a command or a relog |
| `.modify mount` | A random unusual land mount for the target (fast or slow). | mod | game |  | for a test now and then; undone by a command or a relog |
| `.modify drunk` | How drunk you are, 0 to 100. | mod | game |  | for a test now and then; undone by a command or a relog |
| `.modify standstate` | Plays a stand state or emote loop by ID. | GM | game |  | for a test now and then; undone by a command or a relog |
| `.modify morph` | Turns you into a display ID’s model. | GM | game |  | for a test now and then; undone by a command or a relog |
| `.modify gender` | Your character’s gender (kept: it is saved with the character). | GM | game |  | saved with the character, but undone the same way |
| `.modify strength` | Adds Strength as an aura (.reset mods takes it away); the same for the stats below. | admin | game |  | for a test now and then; undone by a command or a relog |
| `.modify agility` | Adds Agility as an aura. | admin | game |  | for a test now and then; undone by a command or a relog |
| `.modify stamina` | Adds Stamina as an aura. | admin | game |  | for a test now and then; undone by a command or a relog |
| `.modify intellect` | Adds Intellect as an aura. | admin | game |  | for a test now and then; undone by a command or a relog |
| `.modify spirit` | Adds Spirit as an aura. | admin | game |  | for a test now and then; undone by a command or a relog |
| `.modify armor` | Adds armor as an aura. | admin | game |  | for a test now and then; undone by a command or a relog |
| `.modify holyresist` | Adds Holy resistance. | admin | game |  | for a test now and then; undone by a command or a relog |
| `.modify fireresist` | Adds Fire resistance. | admin | game |  | for a test now and then; undone by a command or a relog |
| `.modify natureresist` | Adds Nature resistance. | admin | game |  | for a test now and then; undone by a command or a relog |
| `.modify frostresist` | Adds Frost resistance. | admin | game |  | for a test now and then; undone by a command or a relog |
| `.modify shadowresist` | Adds Shadow resistance. | admin | game |  | for a test now and then; undone by a command or a relog |
| `.modify arcaneresist` | Adds Arcane resistance. | admin | game |  | for a test now and then; undone by a command or a relog |
| `.modify ap` | Adds melee attack power. | admin | game |  | for a test now and then; undone by a command or a relog |
| `.modify rangeap` | Adds ranged attack power. | admin | game |  | for a test now and then; undone by a command or a relog |
| `.modify spellpower` | Adds spell power. | admin | game |  | for a test now and then; undone by a command or a relog |
| `.modify crit` | Adds melee critical strike chance. | admin | game |  | for a test now and then; undone by a command or a relog |
| `.modify spellcrit` | Adds spell critical strike chance. | admin | game |  | for a test now and then; undone by a command or a relog |
| `.modify meleehaste` | Adds melee haste. | admin | game |  | for a test now and then; undone by a command or a relog |
| `.modify rangehaste` | Adds ranged haste. | admin | game |  | for a test now and then; undone by a command or a relog |
| `.modify spellhaste` | Adds spell haste. | admin | game |  | for a test now and then; undone by a command or a relog |
| `.modify block` | Adds block chance. | admin | game |  | for a test now and then; undone by a command or a relog |
| `.modify dodge` | Adds dodge chance. | admin | game |  | for a test now and then; undone by a command or a relog |
| `.modify parry` | Adds parry chance. | admin | game |  | for a test now and then; undone by a command or a relog |
| `.reset stats` | Recalculates your stats for your level. | admin | both |  | for a test now and then; undone by a command or a relog |
| `.reset mods` | Takes away every .modify stat aura. | admin | both |  | for a test now and then; undone by a command or a relog |
| `.demorph` | Your own model back. | GM | game |  | for a test now and then; undone by a command or a relog |
| `.die` | Kills the target (or you). | admin | game |  | for a test now and then; undone by a command or a relog |
| `.showarea` | Explores one area on your map. | admin | game |  | for a test now and then; undone by a command or a relog |
| `.hidearea` | Unexplores one area. | admin | game |  | for a test now and then; undone by a command or a relog |
| `.damage` | Deals damage to the target (a school and spell optional). | admin | game |  | for a test now and then; undone by a command or a relog |
| `.waterwalk` | Walk on water, on or off. | GM | game |  | fun or for screenshots, not daily |

#### Spells and auras (16)

| Command | What it does | Level | Where | Suite | Why here |
|---|---|---|---|---|---|
| `.cast back` | The target casts a spell on you. | admin | game |  | for testing a spell; ends with the spell |
| `.cast dist` | You cast a spell at a point some yards away. | admin | game |  | for testing a spell; ends with the spell |
| `.cast self` | The target casts a spell on itself. | admin | game |  | for testing a spell; ends with the spell |
| `.cast target` | The target casts a spell on its own victim. | admin | game |  | for testing a spell; ends with the spell |
| `.cast` | You cast a spell on the target (or yourself). | admin | game |  | for testing a spell; ends with the spell |
| `.learn all_gm` | The GM spells (teleport, invisibility…). | GM | game |  | for a test now and then; undone by a command or a relog |
| `.learn all_crafts` | Every profession and secondary skill (no recipes). | GM | game |  | fills the spell book; .reset spells is the only way back |
| `.learn all_default` | Your race’s and class’s default spells and quest-reward spells. | mod | game |  | for a test now and then; undone by a command or a relog |
| `.learn all_lang` | Every language. | mod | game |  | for a test now and then; undone by a command or a relog |
| `.learn all_myclass` | Every spell and talent of your class. | admin | game |  | fills the spell book; .reset spells is the only way back |
| `.learn all_myspells` | Every spell of your class, every rank (talents not included). | admin | game |  | fills the spell book; .reset spells is the only way back |
| `.aura` | Puts a spell’s aura on the target (or you). | admin | game |  | for a test now and then; undone by a command or a relog |
| `.unaura` | Takes an aura away (all: every one). | admin | game |  | for a test now and then; undone by a command or a relog |
| `.cooldown list` | The target’s cooldowns. | admin | game |  | for a test now and then; undone by a command or a relog |
| `.cooldown clearclientside` | Clears cooldowns the client still shows after the server cleared them. | admin | game |  | for a test now and then; undone by a command or a relog |
| `.unlearn` | Forgets a spell (.learn teaches it again). | admin | game |  | for a test now and then; undone by a command or a relog |

#### Travel (16)

| Command | What it does | Level | Where | Suite | Why here |
|---|---|---|---|---|---|
| `.go creature` | To a creature spawn by its spawn ID or [name]. | mod | game |  | precise or for others; the named places cover most trips |
| `.go graveyard` | To a graveyard by its ID. | mod | game |  | precise or for others; the named places cover most trips |
| `.go grid` | To the center of a map grid. | mod | game |  | precise or for others; the named places cover most trips |
| `.go object` | To a game object spawn by its spawn ID. | mod | game |  | precise or for others; the named places cover most trips |
| `.go taxinode` | To a flight master by its node ID. | mod | game |  | precise or for others; the named places cover most trips |
| `.go trigger` | To an area trigger by its ID. | mod | game |  | precise or for others; the named places cover most trips |
| `.go warp` | Moves you along an axis by a distance (x forward, z up, o turn). | mod | game |  | precise or for others; the named places cover most trips |
| `.go zonexy` | To map coordinates of a zone, as the world map shows them (.go zonexy 45 60). | mod | game |  | precise or for others; the named places cover most trips |
| `.go xy` | To x y on the current (or a given) map, at ground height. | mod | game |  | precise or for others; the named places cover most trips |
| `.go xyz` | To exact coordinates (x y z [map]). | mod | game |  | precise or for others; the named places cover most trips |
| `.go` | To a shift-clicked link (player, creature, object, quest giver, area trigger…). | mod | game |  | precise or for others; the named places cover most trips |
| `.tele name` | Teleports another character (online or not) to a named place. | mod | both |  | precise or for others; the named places cover most trips |
| `.tele group` | Teleports the target and its group to a named place. | mod | game |  | precise or for others; the named places cover most trips |
| `.groupgo` | Brings a character and its whole group to you. | mod | game |  | precise or for others; the named places cover most trips |
| `.start` | Teleports you to your race’s starting area (any player may use it). | player | game |  | rarely needed; .tele does more |
| `.taxicheat` | Every flight path for you, until you turn it off. | mod | game |  | precise or for others; the named places cover most trips |

#### Lookup (16)

| Command | What it does | Level | Where | Suite | Why here |
|---|---|---|---|---|---|
| `.lookup account email` | Accounts by email. *(no use solo)* | GM | both |  | one player, one IP: nothing to find |
| `.lookup account all` | Every account. | GM | both |  | finds IDs; changes nothing |
| `.lookup account ip` | Accounts by last IP. *(no use solo)* | GM | both |  | one player, one IP: nothing to find |
| `.lookup account name` | Accounts by part of a name. | GM | both |  | finds IDs; changes nothing |
| `.lookup area` | Area IDs by part of a name (for .showarea). | mod | both |  | finds IDs; changes nothing |
| `.lookup creature` | Creature IDs by part of a name. | admin | both |  | finds IDs; changes nothing |
| `.lookup event` | Game event IDs by part of a name (Darkmoon Faire, Hallow’s End…). | GM | both |  | finds IDs; changes nothing |
| `.lookup faction` | Faction IDs and your standing (for .modify rep). | admin | both |  | finds IDs; changes nothing |
| `.lookup object` | Game object IDs by part of a name. | admin | both |  | finds IDs; changes nothing |
| `.lookup player account` | The characters of an account. | GM | both |  | finds IDs; changes nothing |
| `.lookup player email` | The characters of the accounts with an email. *(no use solo)* | GM | both |  | one player, one IP: nothing to find |
| `.lookup player ip` | The characters of the accounts last seen from an IP. *(no use solo)* | GM | both |  | one player, one IP: nothing to find |
| `.lookup pool` | Spawn pool IDs by part of a description. | GM | both |  | finds IDs; changes nothing |
| `.lookup skill` | Skill line IDs by part of a name (for .setskill). | admin | both |  | finds IDs; changes nothing |
| `.lookup spell` | Spell IDs by part of a name. | admin | both | yes | finds IDs; changes nothing |
| `.lookup taxinode` | Flight master node IDs by part of a name. | admin | both |  | finds IDs; changes nothing |

#### Hunter pet (1)

| Command | What it does | Level | Where | Suite | Why here |
|---|---|---|---|---|---|
| `.npc tame` | Tames the targeted creature as your pet (any class). | GM | game |  | occasional: taming a rare beast without the spell |

#### Creatures and objects (24)

| Command | What it does | Level | Where | Suite | Why here |
|---|---|---|---|---|---|
| `.gobject near` | Game objects near you, with their spawn IDs. | GM | game |  | reads, or changes only until the creature respawns |
| `.gobject nearspawned` | Spawned game objects near you. | GM | game |  | reads, or changes only until the creature respawns |
| `.gobject target` | The nearest game object (by name or ID), with its spawn ID. | GM | game |  | reads, or changes only until the creature respawns |
| `.gobject activate` | Opens a door or presses a button by spawn ID. | GM | game |  | reads, or changes only until the creature respawns |
| `.gobject despawn` | Makes an object disappear for a moment (back in about 10 s). | GM | game |  | reads, or changes only until the creature respawns |
| `.gobject respawn` | Respawns an object now. | GM | game |  | reads, or changes only until the creature respawns |
| `.list creature` | Where a creature entry spawns. | admin | both |  | reads, or changes only until the creature respawns |
| `.list object` | Where an object entry spawns. | admin | both |  | reads, or changes only until the creature respawns |
| `.npc allowmove` | Creatures’ movement on or off, everywhere (a toggle). | admin | game |  | stops every creature in the world until toggled back |
| `.npc follow` | The target creature follows you. | GM | game |  | reads, or changes only until the creature respawns |
| `.npc info` | The target creature’s entry, spawn, faction, flags, health. | admin | game |  | reads, or changes only until the creature respawns |
| `.npc threat` | The target creature’s threat list. | admin | game |  | reads, or changes only until the creature respawns |
| `.npc playemote` | The target creature plays an emote animation. | admin | game |  | reads, or changes only until the creature respawns |
| `.npc say` | The target creature says a line. | mod | game |  | reads, or changes only until the creature respawns |
| `.npc spelllist` | The target creature’s spell list. | GM | game |  | reads, or changes only until the creature respawns |
| `.npc textemote` | The target creature does a text emote. | mod | game |  | reads, or changes only until the creature respawns |
| `.npc unfollow` | It stops following. | GM | game |  | reads, or changes only until the creature respawns |
| `.npc whisper` | The target creature whispers a line to a character. | mod | game |  | reads, or changes only until the creature respawns |
| `.npc yell` | The target creature yells a line. | mod | game |  | reads, or changes only until the creature respawns |
| `.npc showloot` | What the target corpse’s loot holds. | GM | game |  | reads, or changes only until the creature respawns |
| `.npc tempspawn` | A creature by entry at your feet, gone after a time out of combat. | GM | game |  | reads, or changes only until the creature respawns |
| `.npc evade` | The target creature drops combat and goes home. | GM | game |  | reads, or changes only until the creature respawns |
| `.npc despawn` | The target creature disappears until its respawn. | GM | game |  | reads, or changes only until the creature respawns |
| `.neargrave` | The nearest graveyard and its link to the zone. | admin | game |  | reads, or changes only until the creature respawns |

#### Groups and instances (4)

| Command | What it does | Level | Where | Suite | Why here |
|---|---|---|---|---|---|
| `.instance listbinds` | Your dungeon and raid lockouts. | admin | game |  | for dungeon and battleground tests |
| `.instance unbind` | Clears your lockouts (all, or one map). | admin | game |  | for dungeon and battleground tests |
| `.bg start` | Starts the battleground you are in now. | GM | game |  | for dungeon and battleground tests |
| `.bg stop` | Ends the battleground you are in. | GM | game |  | for dungeon and battleground tests |

#### World and events (6)

| Command | What it does | Level | Where | Suite | Why here |
|---|---|---|---|---|---|
| `.event list` | The active game events (all: every one). | GM | both |  | world-wide but temporary or read-only |
| `.event start` | Starts a game event now (not saved; holidays like Hallow’s End). | GM | both |  | world-wide but temporary or read-only |
| `.event stop` | Stops a game event now (not saved). | GM | both |  | world-wide but temporary or read-only |
| `.event` | A game event’s details. | GM | both |  | world-wide but temporary or read-only |
| `.worldstate wareffort show` | The Ahn’Qiraj war effort’s state. | admin | game |  | world-wide but temporary or read-only |
| `.worldstate scourgeinvasion show` | The Scourge Invasion’s state. | admin | game |  | world-wide but temporary or read-only |

#### Mail and auctions (11)

| Command | What it does | Level | Where | Suite | Why here |
|---|---|---|---|---|---|
| `.auction alliance` | The Alliance auction house, anywhere. | admin | game |  | the auction house; nothing lost |
| `.auction goblin` | The neutral auction house, anywhere. | admin | game |  | the auction house; nothing lost |
| `.auction horde` | The Horde auction house, anywhere. | admin | game |  | the auction house; nothing lost |
| `.auction item` | Posts an item (no seller) on an auction house. | admin | both |  | the auction house; nothing lost |
| `.auction` | Your faction’s auction house, anywhere. | admin | game |  | the auction house; nothing lost |
| `.ahbot reload` | Re-reads ahbot.conf. | admin | both |  | the auction house; nothing lost |
| `.ahbot status` | The auction-house bot’s counts. | admin | both |  | the auction house; nothing lost |
| `.ahbot item` | The bot’s price and settings for one item. | admin | both |  | the auction house; nothing lost |
| `.send items` | Mails items to a character (subject and text in quotes). | admin | both |  | mail to any character; .additem is quicker for yourself |
| `.send mail` | Mails a letter (no items) to a character. | mod | both |  | mail to any character; .additem is quicker for yourself |
| `.send money` | Mails money to a character. | admin | both |  | mail to any character; .additem is quicker for yourself |

#### Accounts and characters (6)

| Command | What it does | Level | Where | Suite | Why here |
|---|---|---|---|---|---|
| `.account characters` | An account’s characters. | admin | both |  | information or a small change |
| `.character deleted list` | Deleted characters that can still be restored. *(console only)* | console | console |  | information or a small change |
| `.guild uninvite` | Takes a character out of its guild. | GM | both |  | information or a small change |
| `.guild rank` | Sets a guild member’s rank. | GM | both |  | information or a small change |
| `.pdump write` | Writes a character to a file (a backup or a copy). | admin | both |  | information or a small change |
| `.send message` | A message on a character’s screen. | admin | both |  | information or a small change |

#### Server (6)

| Command | What it does | Level | Where | Suite | Why here |
|---|---|---|---|---|---|
| `.gm ingame` | Lists the game masters online. *(no use solo)* | admin | both |  | you are the only GM |
| `.gm list` | Lists every GM account (online or not). *(no use solo)* | admin | both |  | you are the only GM |
| `.server corpses` | Clears old corpses and bones now. | GM | both |  | harmless server housekeeping |
| `.server motd` | The message of the day. | player | both |  | harmless server housekeeping |
| `.server set motd` | Sets the message of the day. | admin | both |  | harmless server housekeeping |
| `.saveall` | Saves every character online (bots too). | mod | both |  | harmless server housekeeping |

#### Server data (80)

Each re-reads one world-database table on the running server (`.reload all*`, a whole group at once, is in hub 3). All are admin level, game and console. Worth a row in the window only for the tables our patches touch: `.reload npc_text`, `.reload gossip_menu`, `.reload gossip_menu_option`, `.reload conditions`, `.reload npc_vendor`, `.reload npc_trainer`, `.reload game_tele`, `.reload quest_template`, `.reload mangos_string`.

`.reload config`, `.reload areatrigger_involvedrelation`, `.reload areatrigger_tavern`, `.reload areatrigger_teleport`, `.reload command`, `.reload conditions`, `.reload creature_ai_scripts`, `.reload creature_ai_summons`, `.reload creature_battleground`, `.reload creature_cooldowns`, `.reload creature_involvedrelation`, `.reload creature_loot_template`, `.reload creature_spell_list`, `.reload creature_questrelation`, `.reload creature_template_classlevelstats`, `.reload dbscripts_on_creature_death`, `.reload dbscripts_on_event`, `.reload dbscripts_on_gossip`, `.reload dbscripts_on_go_use`, `.reload dbscripts_on_quest_end`, `.reload dbscripts_on_quest_start`, `.reload dbscripts_on_spell`, `.reload dbscripts_on_relay`, `.reload disenchant_loot_template`, `.reload fishing_loot_template`, `.reload game_graveyard_zone`, `.reload game_tele`, `.reload gameobject_involvedrelation`, `.reload gameobject_loot_template`, `.reload gameobject_questrelation`, `.reload gameobject_battleground`, `.reload gossip_menu`, `.reload gossip_menu_option`, `.reload item_enchantment_template`, `.reload item_loot_template`, `.reload item_required_target`, `.reload locales_creature`, `.reload locales_gameobject`, `.reload locales_gossip_menu_option`, `.reload locales_item`, `.reload locales_npc_text`, `.reload locales_page_text`, `.reload locales_points_of_interest`, `.reload locales_quest`, `.reload locales_questgiver_greeting`, `.reload locales_trainer_greeting`, `.reload locales_areatrigger_teleport`, `.reload mail_loot_template`, `.reload mangos_string`, `.reload npc_gossip`, `.reload npc_text`, `.reload npc_trainer`, `.reload npc_vendor`, `.reload page_text`, `.reload pickpocketing_loot_template`, `.reload points_of_interest`, `.reload questgiver_greeting`, `.reload quest_template`, `.reload reference_loot_template`, `.reload reserved_name`, `.reload reputation_reward_rate`, `.reload reputation_spillover_template`, `.reload skill_fishing_base_level`, `.reload spawn_group`, `.reload skinning_loot_template`, `.reload spam_records`, `.reload spell_affect`, `.reload spell_area`, `.reload spell_chain`, `.reload spell_elixir`, `.reload spell_learn_spell`, `.reload spell_pet_auras`, `.reload spell_proc_event`, `.reload spell_proc_item_enchant`, `.reload spell_script_target`, `.reload spell_target_position`, `.reload spell_threats`, `.reload string_id`, `.reload taxi_shortcuts`, `.reload trainer_greeting`

#### Moderation (37)

For a server with other people (tickets, bans’ lists, chat channels, announcements, the anticheat’s reports); on a solo server they have nothing to act on. Bans, kicks and mutes are in hub 3.

`.anticheat info`, `.anticheat silence`, `.anticheat unsilence`, `.anticheat spaminfo`, `.anticheat fingerprint list`, `.anticheat fingerprint history`, `.anticheat fingerprint ahistory`, `.anticheat cheatinform`, `.anticheat spaminform`, `.anticheat blacklist`, `.anticheat debugextrap`, `.account onlinelist`, `.channel list`, `.channel static`, `.announce`, `.notify`, `.baninfo account`, `.baninfo character`, `.baninfo ip`, `.banlist account`, `.banlist character`, `.banlist ip`, `.ticket discard`, `.ticket escalate`, `.ticket go`, `.ticket goname`, `.ticket note`, `.ticket read`, `.ticket resolve`, `.ticket sort`, `.ticket whisper`, `.ticket`, `.tickets list`, `.tickets queue`, `.tickets`, `.whispers`, `.wr`

#### Developer (79)

For checking the server’s data, AI, pathfinding and packets; read-only or gone with a relog (the ones that write raw values are in hub 3). Each one’s syntax is in the appendix.

`.pmon`, `.debug areatriggers`, `.debug bg`, `.debug getitemstate`, `.debug lootrecipient`, `.debug listupdatefields`, `.debug getitemvalue`, `.debug getvaluebyindex`, `.debug getvaluebyname`, `.debug play petdismiss`, `.debug send buyerror`, `.debug send channelnotify`, `.debug send chatmmessage`, `.debug send equiperror`, `.debug send poi`, `.debug send qfailedresult`, `.debug send qpartymsg`, `.debug send qinvalidmsg`, `.debug send sellerror`, `.debug send spellfail`, `.debug send worldstate`, `.debug script help`, `.debug script command`, `.debug spellcheck`, `.debug spellcoefs`, `.debug spellmods`, `.debug taxi`, `.debug uws`, `.debug waypoint`, `.debug visibility atclient`, `.debug visibility isvisible`, `.debug perf tempspawn`, `.debug perf gridsloaded`, `.debug opcodeouthistory`, `.debug opcodeinchistory`, `.debug transports`, `.debug spawn list`, `.debug spawn respawn`, `.debug dbscript`, `.debug dbscripttargeted`, `.debug dbscriptsourced`, `.debug dbscriptguided`, `.go next`, `.instance stats`, `.instance savedata`, `.link check`, `.list areatriggers`, `.npc aiinfo`, `.npc formation info`, `.npc formation reset`, `.npc formation switch`, `.npc group info`, `.pool list`, `.pool spawns`, `.pool`, `.server log filter`, `.server log level`, `.trigger active`, `.trigger near`, `.trigger`, `.wp show`, `.wp export`, `.distance`, `.los`, `.movement movegens`, `.movement cometome`, `.movement movespeed`, `.movement debug`, `.movement print`, `.combat list`, `.mmap path`, `.mmap loc`, `.mmap loadedtiles`, `.mmap stats`, `.mmap testarea`, `.mmap testheight`, `.worldstate variables`, `.loot stats`, `.loot fullstats`

### Hub 3: destructive or high impact (112)

Every row here wants the confirm pattern of docs/ui-ux-guidelines.md (plan, then confirm): the pop-up names what will be lost,
the button grey until hovered, red on hover (the destroy pop-up of 0.228.2). Moderation and the console-only ones could stay out
of the window entirely (a "Show all" switch).

#### Character progress (9)

| Command | What it does | Level | Where | Suite | Why here |
|---|---|---|---|---|---|
| `.character rename` | The character must pick a new name at next login. | GM | both |  | takes away real progress, no undo |
| `.honor update` | Runs the weekly honor calculation now: standings and ranks change for everyone. | GM | game |  | takes away real progress, no undo |
| `.learn all` | Hundreds of spells of every class into your book (only .reset spells clears them). | admin | game |  | takes away real progress, no undo |
| `.reset honor` | Every honor number to zero. | admin | both |  | takes away real progress, no undo |
| `.reset level` | Back to level 1, stats and talents reset (gear above the level can be lost). | admin | both |  | takes away real progress, no undo |
| `.reset spells` | Removes every spell not given at creation. | admin | both |  | takes away real progress, no undo |
| `.reset taxinodes` | Forgets every flight path you discovered. | admin | both |  | takes away real progress, no undo |
| `.reset all` | Spells or talents reset for every character at its next login. | admin | both |  | takes away real progress, no undo |
| `.explorecheat` | 1 explores every map; 0 unexplores all of them, the real exploration too. | admin | game |  | takes away real progress, no undo |

#### Accounts and characters (13)

| Command | What it does | Level | Where | Suite | Why here |
|---|---|---|---|---|---|
| `.account create` | A new account with a password. *(console only)* | console | console |  | accounts and characters gone, locked or changed for good |
| `.account delete` | Deletes an account with all its characters. *(console only)* | console | console |  | accounts and characters gone, locked or changed for good |
| `.account lock` | Login only from this IP (on), or from anywhere (off). | player | both |  | accounts and characters gone, locked or changed for good |
| `.account set addon` | An account’s expansion level (0 for this server). | admin | both |  | accounts and characters gone, locked or changed for good |
| `.account set gmlevel` | An account’s GM level (0 to 3). *(console only)* | console | console |  | accounts and characters gone, locked or changed for good |
| `.account set password` | Sets an account’s password. *(console only)* | console | console |  | accounts and characters gone, locked or changed for good |
| `.account password` | Changes your own password (the proxy’s login must change with it). | player | both |  | accounts and characters gone, locked or changed for good |
| `.character deleted delete` | Deletes deleted characters for good. *(console only)* | console | console |  | accounts and characters gone, locked or changed for good |
| `.character deleted restore` | Brings a deleted character back (a new name or account optional). | admin | both |  | accounts and characters gone, locked or changed for good |
| `.character deleted old` | Deletes for good every character deleted more than n days ago. *(console only)* | console | console |  | accounts and characters gone, locked or changed for good |
| `.character erase` | Deletes a character for good. *(console only)* | console | console |  | accounts and characters gone, locked or changed for good |
| `.guild delete` | Disbands a guild. | GM | both |  | accounts and characters gone, locked or changed for good |
| `.pdump load` | Creates a character from a dump file. | admin | both |  | accounts and characters gone, locked or changed for good |

#### World database (29)

| Command | What it does | Level | Where | Suite | Why here |
|---|---|---|---|---|---|
| `.gobject add` | Spawns a game object here, saved. *(writes world DB)* | GM | game |  | writes the world database for good (read-only unless you approve) |
| `.gobject delete` | Deletes an object’s spawn. *(writes world DB)* | GM | game |  | writes the world database for good (read-only unless you approve) |
| `.gobject move` | Moves an object’s spawn (saved). *(writes world DB)* | GM | game |  | writes the world database for good (read-only unless you approve) |
| `.gobject turn` | Turns an object (saved). *(writes world DB)* | GM | game |  | writes the world database for good (read-only unless you approve) |
| `.link add` | Links the target creature to a master (creature_linking, saved). *(writes world DB)* | admin | game |  | writes the world database for good (read-only unless you approve) |
| `.link remove` | Removes a creature link. *(writes world DB)* | admin | game |  | writes the world database for good (read-only unless you approve) |
| `.link edit` | Edits a creature link’s flags. *(writes world DB)* | admin | game |  | writes the world database for good (read-only unless you approve) |
| `.link toggle` | Toggles a creature link’s flag. *(writes world DB)* | admin | game |  | writes the world database for good (read-only unless you approve) |
| `.npc add` | Spawns a creature here, saved to the world database. *(writes world DB)* | GM | game |  | writes the world database for good (read-only unless you approve) |
| `.npc additem` | Adds an item to the target vendor (saved). *(writes world DB)* | GM | game |  | writes the world database for good (read-only unless you approve) |
| `.npc changeentry` | Turns the target creature into another entry. *(writes world DB)* | admin | game |  | writes the world database for good (read-only unless you approve) |
| `.npc changelevel` | The target creature’s level (saved). *(writes world DB)* | GM | game |  | writes the world database for good (read-only unless you approve) |
| `.npc delete` | Deletes the target creature’s spawn from the database. *(writes world DB)* | GM | game |  | writes the world database for good (read-only unless you approve) |
| `.npc delitem` | Removes an item from the target vendor (saved). *(writes world DB)* | GM | game |  | writes the world database for good (read-only unless you approve) |
| `.npc factionid` | The target’s faction in its template (saved). *(writes world DB)* | GM | game |  | writes the world database for good (read-only unless you approve) |
| `.npc flag` | NPC flags in the creature template (saved: vendor, trainer…). *(writes world DB)* | GM | game |  | writes the world database for good (read-only unless you approve) |
| `.npc move` | Moves the target creature’s spawn here (saved). *(writes world DB)* | GM | game |  | writes the world database for good (read-only unless you approve) |
| `.npc setmodel` | The target creature’s model (saved). *(writes world DB)* | GM | game |  | writes the world database for good (read-only unless you approve) |
| `.npc setmovetype` | Stay, random or waypoint movement (saved). *(writes world DB)* | GM | game |  | writes the world database for good (read-only unless you approve) |
| `.npc spawndist` | How far a random-moving creature wanders (saved). *(writes world DB)* | GM | game |  | writes the world database for good (read-only unless you approve) |
| `.npc spawntime` | The target’s respawn time (saved). *(writes world DB)* | GM | game |  | writes the world database for good (read-only unless you approve) |
| `.npc addweapon` | Disabled in the source (does nothing). *(disabled)* | admin | game |  | disabled in the source |
| `.npc name` | Disabled in the source. *(disabled)* | GM | game |  | disabled in the source |
| `.npc subname` | Disabled in the source. *(disabled)* | GM | game |  | disabled in the source |
| `.tele add` | Adds your position as a .tele place (saved in game_tele). *(writes world DB)* | admin | game |  | writes the world database for good (read-only unless you approve) |
| `.tele del` | Deletes a .tele place. *(writes world DB)* | admin | both |  | writes the world database for good (read-only unless you approve) |
| `.wp add` | Adds a waypoint to a creature’s path (saved). *(writes world DB)* | GM | game |  | writes the world database for good (read-only unless you approve) |
| `.wp modify` | Changes or deletes a waypoint (saved). *(writes world DB)* | GM | game |  | writes the world database for good (read-only unless you approve) |
| `.linkgrave` | Links a graveyard to this zone (saved). *(writes world DB)* | admin | game |  | writes the world database for good (read-only unless you approve) |

#### Server (36)

| Command | What it does | Level | Where | Suite | Why here |
|---|---|---|---|---|---|
| `.ahbot rebuild` | Removes the bot’s auctions and posts new ones. | admin | both |  | stops the server, or changes the whole world or every character |
| `.rndbot` | Random bots: stats, reset (wipes their state), teleport, upgrade… (console). | GM | both |  | stops the server, or changes the whole world or every character |
| `.reload all` | Re-reads every table of its group from the world database. *(developer)* | admin | both |  | a whole group of tables at once on a running server |
| `.reload all_area` | Re-reads every table of its group from the world database. *(developer)* | admin | both |  | a whole group of tables at once on a running server |
| `.reload all_eventai` | Re-reads every table of its group from the world database. *(developer)* | admin | both |  | a whole group of tables at once on a running server |
| `.reload all_gossips` | Re-reads every table of its group from the world database. *(developer)* | admin | both |  | a whole group of tables at once on a running server |
| `.reload all_item` | Re-reads every table of its group from the world database. *(developer)* | admin | both |  | a whole group of tables at once on a running server |
| `.reload all_locales` | Re-reads every table of its group from the world database. *(developer)* | admin | both |  | a whole group of tables at once on a running server |
| `.reload all_loot` | Re-reads every table of its group from the world database. *(developer)* | admin | both |  | a whole group of tables at once on a running server |
| `.reload all_npc` | Re-reads every table of its group from the world database. *(developer)* | admin | both |  | a whole group of tables at once on a running server |
| `.reload all_quest` | Re-reads every table of its group from the world database. *(developer)* | admin | both |  | a whole group of tables at once on a running server |
| `.reload all_scripts` | Re-reads every table of its group from the world database. *(developer)* | admin | both |  | a whole group of tables at once on a running server |
| `.reload all_spell` | Re-reads every table of its group from the world database. *(developer)* | admin | both |  | a whole group of tables at once on a running server |
| `.server exit` | Stops mangosd at once, without saving. *(console only)* | console | console |  | stops the server, or changes the whole world or every character |
| `.server idlerestart cancel` | Cancels it. | admin | both |  | kept beside the command it cancels |
| `.server idlerestart` | Restarts when nobody is online. | admin | both |  | stops the server, or changes the whole world or every character |
| `.server idleshutdown cancel` | Cancels it. | admin | both |  | kept beside the command it cancels |
| `.server idleshutdown` | Shuts down when nobody is online. | admin | both |  | stops the server, or changes the whole world or every character |
| `.server plimit` | Player limit or the lowest account level allowed to log in. | admin | both |  | stops the server, or changes the whole world or every character |
| `.server resetallraid` | Resets every raid lockout; players in raids go to their hearth. | admin | both |  | stops the server, or changes the whole world or every character |
| `.server restart cancel` | Cancels a restart. | admin | both |  | kept beside the command it cancels |
| `.server restart` | Restarts in n seconds. | admin | both |  | stops the server, or changes the whole world or every character |
| `.server shutdown cancel` | Cancels a shutdown. | admin | both |  | kept beside the command it cancels |
| `.server shutdown` | Shuts the server down in n seconds (saves everyone: the clean stop). | admin | both |  | stops the server, or changes the whole world or every character |
| `.send mass items` | Mails items to every character (bots too). | admin | both |  | every character’s mailbox, hundreds of bots included |
| `.send mass mail` | Mails a letter to every character. | admin | both |  | every character’s mailbox, hundreds of bots included |
| `.send mass money` | Mails money to every character. | admin | both |  | every character’s mailbox, hundreds of bots included |
| `.loadscripts` | Reloads the script library. | admin | both |  | stops the server, or changes the whole world or every character |
| `.quit` | Stops mangosd at once (console). *(console only)* | console | console |  | stops the server, or changes the whole world or every character |
| `.mmap` | Pathfinding on or off for the whole server. *(developer)* | admin | game |  | pathfinding off for every creature until turned on |
| `.worldstate wareffort phase` | Moves the Ahn’Qiraj war effort to a phase (gates, war). | admin | game |  | stops the server, or changes the whole world or every character |
| `.worldstate wareffort counter` | Adds to a war effort resource. | admin | game |  | stops the server, or changes the whole world or every character |
| `.worldstate scourgeinvasion state` | Sets the Scourge Invasion’s state. | admin | game |  | stops the server, or changes the whole world or every character |
| `.worldstate scourgeinvasion battleswon` | Adds battles won to the invasion. | admin | game |  | stops the server, or changes the whole world or every character |
| `.worldstate scourgeinvasion startzone` | Starts the invasion in a zone. | admin | game |  | stops the server, or changes the whole world or every character |
| `.worldstate set` | Sets a world-state variable on this map. | admin | game |  | stops the server, or changes the whole world or every character |

#### Moderation (12)

| Command | What it does | Level | Where | Suite | Why here |
|---|---|---|---|---|---|
| `.anticheat enable` | The anticheat on or off. *(no use solo)* | admin | both |  | a ban on your own account locks you out |
| `.kick` | Disconnects a character (a bot too). *(no use solo)* | GM | both |  | a ban on your own account locks you out |
| `.ban account` | Bans an account. *(no use solo)* | admin | both |  | a ban on your own account locks you out |
| `.ban character` | Bans a character. *(no use solo)* | admin | both |  | a ban on your own account locks you out |
| `.ban ip` | Bans an IP. *(no use solo)* | admin | both |  | a ban on your own account locks you out |
| `.ban note` | A note on an account’s record. *(no use solo)* | admin | both |  | a ban on your own account locks you out |
| `.ban warn` | A warning on an account’s record. *(no use solo)* | admin | both |  | a ban on your own account locks you out |
| `.unban account` | Lifts an account ban. *(no use solo)* | admin | both |  | a ban on your own account locks you out |
| `.unban character` | Lifts a character ban. *(no use solo)* | admin | both |  | a ban on your own account locks you out |
| `.unban ip` | Lifts an IP ban. *(no use solo)* | admin | both |  | a ban on your own account locks you out |
| `.mute` | Mutes a character’s chat for n minutes. *(no use solo)* | mod | both |  | a ban on your own account locks you out |
| `.unmute` | Lifts it. *(no use solo)* | mod | both |  | a ban on your own account locks you out |

#### Developer (13)

| Command | What it does | Level | Where | Suite | Why here |
|---|---|---|---|---|---|
| `.debug moditemvalue` | Writes raw values or packets (moditemvalue). *(developer)* | admin | game |  | raw fields and packets: can disconnect the client or corrupt an item |
| `.debug modvalue` | Writes raw values or packets (modvalue). *(developer)* | admin | game |  | raw fields and packets: can disconnect the client or corrupt an item |
| `.debug send opcode` | Writes raw values or packets (send opcode). *(developer)* | admin | game |  | raw fields and packets: can disconnect the client or corrupt an item |
| `.debug setaurastate` | Writes raw values or packets (setaurastate). *(developer)* | admin | game |  | raw fields and packets: can disconnect the client or corrupt an item |
| `.debug setitemvalue` | Writes raw values or packets (setitemvalue). *(developer)* | admin | game |  | raw fields and packets: can disconnect the client or corrupt an item |
| `.debug setvaluebyindex` | Writes raw values or packets (setvaluebyindex). *(developer)* | admin | game |  | raw fields and packets: can disconnect the client or corrupt an item |
| `.debug setvaluebyname` | Writes raw values or packets (setvaluebyname). *(developer)* | admin | game |  | raw fields and packets: can disconnect the client or corrupt an item |
| `.debug byte` | Writes raw values or packets (byte). *(developer)* | admin | game |  | raw fields and packets: can disconnect the client or corrupt an item |
| `.debug moveflag` | Writes raw values or packets (moveflag). *(developer)* | admin | game |  | raw fields and packets: can disconnect the client or corrupt an item |
| `.debug utf8overflow` | Sends an overlong text (an old exploit test). *(developer)* | admin | both |  | can crash the client |
| `.debug chatfreeze` | Sends a message that freezes the chat (an old client exploit). *(developer)* | admin | both |  | freezes the client |
| `.debug debugflags` | Writes raw values or packets (debugflags). *(developer)* | admin | both |  | raw fields and packets: can disconnect the client or corrupt an item |
| `.debug packetlog` | Writes raw values or packets (packetlog). *(developer)* | admin | both |  | raw fields and packets: can disconnect the client or corrupt an item |

## Weather

### How it works on our server

- **Switched on:** `ActivateWeather = 1`, `ChangeWeatherInterval = 600000` (10 minutes) in `(the server's checkout)`.
- **Per zone, per season:** the world table `game_weather` holds, per zone, a chance of rain, snow and storm (sandstorm) for
  each of four seasons. The season comes from the server's real date (spring from 20 March; today, 2 October, is **fall**).
  Our data (ClassicDB z2815) has **33 zones**:

| Zone | ID | Chance per season (spring/summer/fall/winter, %) |
|---|---|---|
| Dun Morogh | 1 | snow 25/15/25/25 |
| Badlands | 3 | sandstorm 20/20/20/15 |
| Duskwood | 10 | rain 15/15/20/15 |
| Wetlands | 11 | rain 25/15/25/25 |
| Elwynn Forest | 12 | rain 20/15/20/20 |
| Dustwallow Marsh | 15 | rain 25/20/25/25 |
| Western Plaguelands | 28 | rain 10/15/15/10 |
| Stranglethorn Vale | 33 | rain 20/25/25/20 |
| Alterac Mountains | 36 | snow 20/20/25/30 |
| Loch Modan | 38 | rain 15/15/15/15 |
| Deadwind Pass | 41 | rain 15/5/15/15 |
| Redridge Mountains | 44 | rain 15/15/15/15 |
| Arathi Highlands | 45 | rain 23/15/23/23 |
| The Hinterlands | 47 | rain 10/10/15/10 |
| Tirisfal Glades | 85 | rain 20/15/20/20 |
| Eastern Plaguelands | 139 | rain 10/15/15/10 |
| Teldrassil | 141 | rain 15/5/15/15 |
| Darkshore | 148 | rain 15/10/20/15 |
| Mulgore | 215 | rain 15/10/20/15 |
| Hillsbrad Foothills | 267 | rain 15/10/15/15 |
| Feralas | 357 | rain 15/15/15/15 |
| Desolace | 405 | rain 10/5/5/5 |
| Tanaris | 440 | sandstorm 15/15/15/15 |
| Un'Goro Crater | 490 | rain 15/10/20/15 |
| Winterspring | 618 | snow 25/20/20/25 |
| Scarlet Monastery | 796 | rain 5/10/25/5 |
| Silithus | 1377 | sandstorm 20/25/20/15 |
| Zul'Gurub | 1977 | rain 15/5/15/15 |
| Stratholme | 2017 | rain 5/5/5/5 |
| Alterac Valley | 2597 | snow 15/15/20/25 |
| Arathi Basin | 3358 | rain 10/10/10/10 |
| Ahn'Qiraj | 3428 | sandstorm 20/20/20/20 |
| Ruins of Ahn'Qiraj | 3429 | sandstorm 20/20/20/20 |

  **No weather at all** (no row): Durotar, the Barrens, Orgrimmar, Thunder Bluff, Undercity, Silverpine Forest, Stonetalon,
  Ashenvale, Thousand Needles, Azshara, Felwood, Moonglade, Westfall, Stormwind, Ironforge, Darnassus, the Swamp of Sorrows, the
  Blasted Lands, Burning Steppes, Searing Gorge. Both factions' starting zones are uneven: Elwynn, Dun Morogh, Teldrassil,
  Tirisfal and Mulgore have weather; Durotar has none.
- **How a zone's weather changes** (`Weather::ReGenerate`, every 10 minutes while someone is in the zone): 30 % nothing; 30 %
  better (or clears); 30 % worse; 10 % a big jump. From fine, a new type is rolled from the season's chances, then its intensity
  ("grade" 0 to 1): 85 % light, the rest medium or heavy. **Every zone starts fine** when it is first entered, so with one
  player who keeps moving, weather is rare: in Elwynn in fall about 14 % per 10 minutes from fine (70 % of rolls reach the type roll, 20 % of those rain).
- **What reaches the client:** the server sends type and grade (and a 1.12 sound); HermesProxy turns them into the modern
  client's weather state (`Weather.ConvertWeatherTypeToWeatherState`) and drops the sound (1.14.2 picks its own):

| Type (server) | Grade up to 0.25 | to 0.3 | to 0.6 | above 0.6 |
|---|---|---|---|---|
| 1 rain | drizzle | light rain | medium rain | heavy rain |
| 2 snow | light snow | light snow | medium snow | heavy snow |
| 3 storm | light sandstorm | light sandstorm | medium sandstorm | heavy sandstorm |
| 0 fine | clear | | | |

  The proxy also sends a "start lightning storm" packet after every change (no storm ID set). The 1.14.2 client knows more
  states (fog, thunders, black rain, black snow) that a 1.12 server can't ask for: the proxy only converts the four types.
  The change is gradual (the "abrupt" flag is 0). How dense the rain looks also depends on the client's own weather setting
  (`weatherDensity` 0-3, set by the Particle Density option: [console-commands.md](console-commands.md), "Weather on the client").
- **Instances:** Scarlet Monastery, Zul'Gurub, Stratholme and the two Ahn'Qiraj have rows; scripts set weather too (Ossirian's
  permanent sandstorm in the Ruins of Ahn'Qiraj; the Scourge Invasion's storm in an attacked zone).

### What we can control

- **`.wchange type intensity`** (admin, game only): `type` 0 fine, 1 rain, 2 snow, 3 sandstorm; `intensity` 0 to 1 (clamped).
  The help text in the database is wrong ("#status 0 disabled, 1 enabled"): it is a decimal. It changes **the zone you stand
  in** for everyone there, **not permanently** (`isPermanent` false): the next 10-minute roll may change it (30 % keeps it, the
  rest drifts it lighter, heavier or away). In a zone without a `game_weather` row it prints "no weather" but **still sets it**
  (no return after the message), and the next roll clears it to fine. It prints nothing on success.
- No command reads the current weather, and 1.14.2's Lua has no weather API or event, so a window can't show what the weather is:
  only what we last asked for.
- Values that read well in our client: drizzle 0.2, light 0.3, medium 0.5, heavy 0.9 (`.wchange 1 0.9`); clear `.wchange 0 0`.
- Changing the chances per zone means a world-database patch (an SQL file with its undo, the user's approval): rows for the
  zones without weather, or higher chances where it's too rare. `.reload` has no `game_weather` entry: a server restart reads it.
- Weather that stays (a GM's or a story's) needs a source change: `.wchange` passing `true` for permanent (one word: an optional
  third argument, e.g. `.wchange 1 0.9 keep`), recorded in docs/server/changes.md like the pet commands.

### Ideas

1. **A Weather row in the everyday hub** (World): Clear, Rain, Snow, Sandstorm, each with Light / Medium / Heavy (the five-button
   column the professions use), sending `.wchange`. Its text: the zone it acts on (`GetZoneText()`), that it may change again in
   10 minutes, and, in a zone with no weather of its own, that it clears at the next roll. Sandstorm in Mulgore looks odd but
   works; the row could suggest the zone's own kind first (the table above, as data in the addon).
2. **Keep it** (with the source change above): a "Keep" switch beside the buttons, for screenshots and testing a skin in the rain.
3. **Both factions alike:** a world patch giving Durotar and the Barrens sandstorm, Silverpine and Ashenvale rain, Westfall
   rain (the starting zones of every race then have weather), lore-checked against docs/copywriting/lore-changes.md.
4. **Testing the interface against weather:** the minimap's and the nameplates' readability in heavy snow and sandstorm, and the
   weather sound against our toasts' sounds (docs/ui-ux-guidelines.md: sound sized to the action).
5. Later, needing both a server and a proxy change: fog and thunderstorms (types the 1.14.2 client draws but a 1.12 server can't
   send).

## The window

- **Tabs:** the three on the right side (as Forever's character window's side tabs) could be **Forever UI** (today's /fui guide),
  **GM** (the three hubs) and **Console** (the client's settings, [console-commands.md](console-commands.md)). Inside the GM tab, the hubs as the top level of the list
  (three gold headers, hub 3 folded and tinted) or as a switch over the list; the search box spanning all three.
- **The hubs' sizes as rows:** hub 1 is the suite of today plus about 20 rows; hub 2 about 160 useful commands (more than the
  list should show at once: categories folded by default); hub 3 a few dozen, each behind a confirm.
- Rows that act on the target already refuse with another unit targeted; hub 3's rows that act on a character (`.reset level`,
  `.character rename`) need the target named in the confirm.

## Open questions for the user

1. **The /console word:** take over the game's `/console` (passing `/console name value` on to the game), or open the tab some
   other way (`/fui console`)? And should the GM tab have a free command line too (type any GM command, see the server's answer,
   a history), since 179 commands won't all get rows?
2. **Hub 3 in the window at all?** All of it behind confirms, or only the character-progress and world rows, with moderation,
   the console-only ones and the developer tools left out (or behind a "Show all" switch)?
3. **The developer checks** (`.debug`, `.mmap`, `.movement`, `.loot stats`, `.reload`): a hub of their own, a fourth tab, or
   left out?
4. **Weather:** a row with nine buttons, or a small picker; and is the source change for "keep" wanted (a server rebuild)?
5. **Weather in more zones** (a world patch, both factions alike): which zones, and which kind?
6. **`/fui keys` and `/fui book`:** registered twice today (Key Bindings and the professions book win). Keep, or give the keyring and
   the spell book their words back?
7. **Moving the suite's /fui rows:** Banners and Toasts and Gathering and Fishing run `/fui` commands; in a merged window do they
   stay in the GM tab, move to the Forever UI tab, or both?

## Appendix: every command

Generated from the source (`Chat.cpp`'s tables walked to every leaf) and the `command` table's syntax lines, 2026-10-02. Level is
the effective one (the database's where it has a row). Hub and category as proposed above.

| Command | Syntax | Level | Where | Hub | Category | Flags | Suite |
|---|---|---|---|---|---|---|---|
| `.account` | `.account` | player | both | 1 | Getting started |  |  |
| `.account characters` | `.account characters [#accountId\|$accountName]` | admin | both | 2 | Accounts and characters |  |  |
| `.account create` | `.account create $account $password` | console | console | 3 | Accounts and characters | console only |  |
| `.account delete` | `.account delete $account` | console | console | 3 | Accounts and characters | console only |  |
| `.account lock` | `.account lock [on\|off]` | player | both | 3 | Accounts and characters |  |  |
| `.account onlinelist` | `.account onlinelist` | console | console | 2 | Moderation | no use solo, console only |  |
| `.account password` | `.account password $old_password $new_password $new_password` | player | both | 3 | Accounts and characters |  |  |
| `.account set addon` | `.account set addon [#accountId\|$accountName] #addon` | admin | both | 3 | Accounts and characters |  |  |
| `.account set gmlevel` | `.account set gmlevel [#accountId\|$accountName] #level` | console | console | 3 | Accounts and characters | console only |  |
| `.account set password` | `.account set password (#accountId\|$accountName) $password $password` | console | console | 3 | Accounts and characters | console only |  |
| `.additem` | `.additem #itemid/[#itemname]/#shift-click-item-link #itemcount` | admin | game | 1 | Items |  | yes |
| `.additemset` | `.additemset #itemsetid` | admin | game | 1 | Items |  |  |
| `.ahbot item` | `.ahbot item` | admin | both | 2 | Mail and auctions |  |  |
| `.ahbot rebuild` | `.ahbot rebuild` | admin | both | 3 | Server |  |  |
| `.ahbot reload` | `.ahbot reload` | admin | both | 2 | Mail and auctions |  |  |
| `.ahbot status` | `.ahbot status` | admin | both | 2 | Mail and auctions |  |  |
| `.announce` | `.announce $MessageToBroadcast` | mod | both | 2 | Moderation | no use solo |  |
| `.anticheat blacklist` | `.anticheat blacklist` | GM | game | 2 | Moderation | no use solo |  |
| `.anticheat cheatinform` | `.anticheat cheatinform` | GM | game | 2 | Moderation | no use solo |  |
| `.anticheat debugextrap` | `.anticheat debugextrap` | admin | both | 2 | Moderation | no use solo |  |
| `.anticheat enable` | `.anticheat enable` | admin | both | 3 | Moderation | no use solo |  |
| `.anticheat fingerprint ahistory` | `.anticheat fingerprint ahistory` | admin | game | 2 | Moderation | no use solo |  |
| `.anticheat fingerprint history` | `.anticheat fingerprint history` | admin | game | 2 | Moderation | no use solo |  |
| `.anticheat fingerprint list` | `.anticheat fingerprint list` | admin | game | 2 | Moderation | no use solo |  |
| `.anticheat info` | `.anticheat info` | GM | both | 2 | Moderation | no use solo |  |
| `.anticheat silence` | `.anticheat silence` | GM | game | 2 | Moderation | no use solo |  |
| `.anticheat spaminfo` | `.anticheat spaminfo` | admin | game | 2 | Moderation | no use solo |  |
| `.anticheat spaminform` | `.anticheat spaminform` | GM | game | 2 | Moderation | no use solo |  |
| `.anticheat unsilence` | `.anticheat unsilence` | GM | game | 2 | Moderation | no use solo |  |
| `.appear` | `.appear` | mod | game | 1 | Travel |  | yes |
| `.auction` | `.auction` | admin | game | 2 | Mail and auctions |  |  |
| `.auction alliance` | `.auction alliance` | admin | game | 2 | Mail and auctions |  |  |
| `.auction goblin` | `.auction goblin` | admin | game | 2 | Mail and auctions |  |  |
| `.auction horde` | `.auction horde` | admin | game | 2 | Mail and auctions |  |  |
| `.auction item` | `.auction item (alliance\|horde\|goblin) #itemid[:#itemcount] [[[#minbid] #buyout] [short\|long\|verylong]` | admin | both | 2 | Mail and auctions |  |  |
| `.aura` | `.aura #spellid` | admin | game | 2 | Spells and auras |  |  |
| `.ban account` | `.ban account $Name $bantime $reason` | admin | both | 3 | Moderation | no use solo |  |
| `.ban character` | `.ban character $Name $bantime $reason` | admin | both | 3 | Moderation | no use solo |  |
| `.ban ip` | `.ban ip $Ip $bantime $reason` | admin | both | 3 | Moderation | no use solo |  |
| `.ban note` | `.ban note` | admin | both | 3 | Moderation | no use solo |  |
| `.ban warn` | `.ban warn` | admin | both | 3 | Moderation | no use solo |  |
| `.baninfo account` | `.baninfo account $accountid` | admin | both | 2 | Moderation | no use solo |  |
| `.baninfo character` | `.baninfo character $charactername` | admin | both | 2 | Moderation | no use solo |  |
| `.baninfo ip` | `.baninfo ip $ip` | admin | both | 2 | Moderation | no use solo |  |
| `.bank` | `.bank` | admin | game | 1 | Character |  |  |
| `.banlist account` | `.banlist account [$Name]` | admin | both | 2 | Moderation | no use solo |  |
| `.banlist character` | `.banlist character $Name` | admin | both | 2 | Moderation | no use solo |  |
| `.banlist ip` | `.banlist ip [$Ip]` | admin | both | 2 | Moderation | no use solo |  |
| `.bg start` | `.bg start` | GM | game | 2 | Groups and instances |  |  |
| `.bg stop` | `.bg stop` | GM | game | 2 | Groups and instances |  |  |
| `.bot` | `.bot` | player | game | 1 | Bots |  | yes |
| `.cast` | `.cast #spellid [triggered]` | admin | game | 2 | Spells and auras |  |  |
| `.cast back` | `.cast back #spellid [triggered]` | admin | game | 2 | Spells and auras |  |  |
| `.cast dist` | `.cast dist #spellid [#dist [triggered]]` | admin | game | 2 | Spells and auras |  |  |
| `.cast self` | `.cast self #spellid [triggered]` | admin | game | 2 | Spells and auras |  |  |
| `.cast target` | `.cast target #spellid [triggered]` | admin | game | 2 | Spells and auras |  |  |
| `.channel list` | `.channel list [#max] [static]` | mod | game | 2 | Moderation | no use solo |  |
| `.channel static` | `.channel static $channelname on\|off` | mod | game | 2 | Moderation | no use solo |  |
| `.character deleted delete` | `.character deleted delete #guid\|$name` | console | console | 3 | Accounts and characters | console only |  |
| `.character deleted list` | `.character deleted list [#guid\|$name]` | console | console | 2 | Accounts and characters | console only |  |
| `.character deleted old` | `.character deleted old [#keepDays]` | console | console | 3 | Accounts and characters | console only |  |
| `.character deleted restore` | `.character deleted restore #guid\|$name [$newname] [#new account]` | admin | both | 3 | Accounts and characters |  |  |
| `.character erase` | `.character erase $name` | console | console | 3 | Accounts and characters | console only |  |
| `.character level` | `.character level [$playername] [#level]` | admin | both | 2 | Character |  |  |
| `.character rename` | `.character rename [$name]` | GM | both | 3 | Character progress |  |  |
| `.character reputation` | `.character reputation [$player_name]` | GM | both | 2 | Character |  |  |
| `.combat list` | `.combat list` | player | game | 2 | Developer | developer |  |
| `.combat stop` | `.combatstop [$playername]` | GM | game | 1 | Character |  |  |
| `.commands` | `.commands` | player | both | 1 | Getting started |  |  |
| `.cooldown clear` | `.cooldown clear [spell id] Remove cooldown from selected unit.` | admin | game | 1 | Character |  | yes |
| `.cooldown clearclientside` | `.cooldown clearclientside  Clear all cooldown client side only.` | admin | game | 2 | Spells and auras |  |  |
| `.cooldown list` | `.cooldown list  Active cooldown from selected unit.` | admin | game | 2 | Spells and auras |  |  |
| `.damage` | `.damage $damage_amount [$school [$spellid]]` | admin | game | 2 | Looks and stats |  |  |
| `.debug anim` | `.debug anim #emoteid` | GM | game | 2 | Looks and stats |  |  |
| `.debug areatriggers` | `.debug areatriggers\n\nToggle debug mode for areatriggers. In debug mode GM will be notified if reaching an ar` | mod | game | 2 | Developer | developer |  |
| `.debug bg` | `.debug bg` | admin | game | 2 | Developer | developer |  |
| `.debug byte` | `.debug byte` | admin | game | 3 | Developer | developer |  |
| `.debug chatfreeze` | `.debug chatfreeze` | admin | both | 3 | Developer | developer |  |
| `.debug dbscript` | `.debug dbscript` | admin | both | 2 | Developer | developer |  |
| `.debug dbscriptguided` | `.debug dbscriptguided` | admin | both | 2 | Developer | developer |  |
| `.debug dbscriptsourced` | `.debug dbscriptsourced` | admin | both | 2 | Developer | developer |  |
| `.debug dbscripttargeted` | `.debug dbscripttargeted` | admin | both | 2 | Developer | developer |  |
| `.debug debugflags` | `.debug debugflags` | admin | both | 3 | Developer | developer |  |
| `.debug getitemstate` | `.debug getitemstate` | admin | game | 2 | Developer | developer |  |
| `.debug getitemvalue` | `.debug getitemvalue #itemguid #field [int\|hex\|bit\|float]` | admin | game | 2 | Developer | developer |  |
| `.debug getvaluebyindex` | `.debug getvaluebyindex #field [int\|hex\|bit\|float]` | admin | game | 2 | Developer | developer |  |
| `.debug getvaluebyname` | `.debug getvaluebyname #field [int\|hex\|bit\|float]` | admin | game | 2 | Developer | developer |  |
| `.debug listupdatefields` | `.debug listupdatefields` | admin | game | 2 | Developer | developer |  |
| `.debug lootrecipient` | `.debug lootrecipient` | GM | game | 2 | Developer | developer |  |
| `.debug moditemvalue` | `.debug moditemvalue #guid #field [int\|float\| &= \| \|= \| &=~ ] #value` | admin | game | 3 | Developer | developer |  |
| `.debug modvalue` | `.debug modvalue #field [int\|float\| &= \| \|= \| &=~ ] #value` | admin | game | 3 | Developer | developer |  |
| `.debug moveflag` | `.debug moveflag` | admin | game | 3 | Developer | developer |  |
| `.debug opcodeinchistory` | `.debug opcodeinchistory` | admin | both | 2 | Developer | developer |  |
| `.debug opcodeouthistory` | `.debug opcodeouthistory` | admin | both | 2 | Developer | developer |  |
| `.debug packetlog` | `.debug packetlog` | admin | both | 3 | Developer | developer |  |
| `.debug perf gridsloaded` | `.debug perf gridsloaded` | admin | game | 2 | Developer | developer |  |
| `.debug perf tempspawn` | `.debug perf tempspawn` | admin | game | 2 | Developer | developer |  |
| `.debug play cinematic` | `.debug play cinematic #cinematicid` | mod | game | 2 | Looks and stats |  |  |
| `.debug play music` | `.debug play music` | mod | game | 2 | Looks and stats |  |  |
| `.debug play petdismiss` | `.debug play petdismiss` | mod | game | 2 | Developer | developer |  |
| `.debug play sound` | `.debug play sound #soundid` | mod | game | 2 | Looks and stats |  |  |
| `.debug script command` | `.debug script command` | GM | game | 2 | Developer | developer |  |
| `.debug script help` | `.debug script help` | GM | game | 2 | Developer | developer |  |
| `.debug send buyerror` | `.debug send buyerror` | admin | game | 2 | Developer | developer |  |
| `.debug send channelnotify` | `.debug send channelnotify` | admin | game | 2 | Developer | developer |  |
| `.debug send chatmmessage` | `.debug send chatmmessage` | admin | game | 2 | Developer | developer |  |
| `.debug send equiperror` | `.debug send equiperror` | admin | game | 2 | Developer | developer |  |
| `.debug send opcode` | `.debug send opcode` | admin | game | 3 | Developer | developer |  |
| `.debug send poi` | `.debug send poi` | admin | game | 2 | Developer | developer |  |
| `.debug send qfailedresult` | `.debug send qfailedresult` | admin | game | 2 | Developer | developer |  |
| `.debug send qinvalidmsg` | `.debug send qinvalidmsg` | admin | game | 2 | Developer | developer |  |
| `.debug send qpartymsg` | `.debug send qpartymsg` | admin | game | 2 | Developer | developer |  |
| `.debug send sellerror` | `.debug send sellerror` | admin | game | 2 | Developer | developer |  |
| `.debug send spellVisual` | `.debug send spellVisual` | admin | game | 2 | Looks and stats |  |  |
| `.debug send spellfail` | `.debug send spellfail` | admin | game | 2 | Developer | developer |  |
| `.debug send worldstate` | `.debug send worldstate` | admin | game | 2 | Developer | developer |  |
| `.debug setaurastate` | `.debug setaurastate` | admin | game | 3 | Developer | developer |  |
| `.debug setitemvalue` | `.debug setitemvalue #guid #field [int\|hex\|bit\|float] #value` | admin | game | 3 | Developer | developer |  |
| `.debug setvaluebyindex` | `.debug setvaluebyindex #field [int\|hex\|bit\|float] #value` | admin | game | 3 | Developer | developer |  |
| `.debug setvaluebyname` | `.debug setvaluebyname #field [int\|hex\|bit\|float] #value` | admin | game | 3 | Developer | developer |  |
| `.debug spawn list` | `.debug spawn list` | GM | game | 2 | Developer | developer |  |
| `.debug spawn respawn` | `.debug spawn respawn` | GM | game | 2 | Developer | developer |  |
| `.debug spellcheck` | `.debug spellcheck` | console | console | 2 | Developer | developer, console only |  |
| `.debug spellcoefs` | `.debug spellcoefs #spellid` | admin | both | 2 | Developer | developer |  |
| `.debug spellmods` | `.debug spellmods (flat\|pct) #spellMaskBitIndex #spellModOp #value` | admin | game | 2 | Developer | developer |  |
| `.debug taxi` | `.debug taxi` | admin | game | 2 | Developer | developer |  |
| `.debug transports` | `.debug transports` | admin | both | 2 | Developer | developer |  |
| `.debug utf8overflow` | `.debug utf8overflow` | admin | both | 3 | Developer | developer |  |
| `.debug uws` | `.debug uws` | admin | game | 2 | Developer | developer |  |
| `.debug visibility atclient` | `.debug visibility atclient` | mod | game | 2 | Developer | developer |  |
| `.debug visibility isvisible` | `.debug visibility isvisible` | mod | game | 2 | Developer | developer |  |
| `.debug waypoint` | `.debug waypoint` | admin | game | 2 | Developer | developer |  |
| `.demorph` | `.demorph` | GM | game | 2 | Looks and stats |  |  |
| `.die` | `.die` | admin | game | 2 | Looks and stats |  |  |
| `.dismount` | `.dismount` | player | game | 1 | Character |  |  |
| `.distance` | `.distance [$name/$link]` | admin | game | 2 | Developer | developer |  |
| `.event` | `.event #event_id` | GM | both | 2 | World and events |  |  |
| `.event list` | `.event list` | GM | both | 2 | World and events |  |  |
| `.event start` | `.event start #event_id` | GM | both | 2 | World and events |  |  |
| `.event stop` | `.event stop #event_id` | GM | both | 2 | World and events |  |  |
| `.explorecheat` | `.explorecheat #flag` | admin | game | 3 | Character progress |  |  |
| `.gm` | `.gm [on/off]` | admin | game | 1 | Game master mode |  | yes |
| `.gm chat` | `.gm chat [on/off]` | admin | game | 2 | Looks and stats |  |  |
| `.gm fly` | `.gm fly [on/off]` | admin | game | 1 | Game master mode |  |  |
| `.gm ingame` | `.gm ingame` | admin | both | 2 | Server | no use solo |  |
| `.gm list` | `.gm list` | admin | both | 2 | Server | no use solo |  |
| `.gm mountup` | `.gm mountup [fast\|slow\|#displayid\|target]` | admin | game | 2 | Looks and stats |  |  |
| `.gm setview` | `.gm setview` | admin | game | 2 | Looks and stats |  |  |
| `.gm unkillable` | `.gm unkillable` | admin | game | 1 | Game master mode |  |  |
| `.gm visible` | `.gm visible on/off` | admin | game | 1 | Game master mode |  | yes |
| `.go` | `.go  [$playername\|pointlink\|#x #y #z [#mapid]]` | mod | game | 2 | Travel |  |  |
| `.go creature` | `.go creature (#creature_guid\|$creature_name\|id #creature_id)` | mod | game | 2 | Travel |  |  |
| `.go graveyard` | `.go graveyard #graveyardId` | mod | game | 2 | Travel |  |  |
| `.go grid` | `.go grid #gridX #gridY [#mapId]` | mod | game | 2 | Travel |  |  |
| `.go next` | `.go next` | admin | game | 2 | Developer | developer |  |
| `.go object` | `.go object (#gameobject_guid\|$gameobject_name\|id #gameobject_id)` | mod | game | 2 | Travel |  |  |
| `.go taxinode` | `.go taxinode #taxinode` | mod | game | 2 | Travel |  |  |
| `.go trigger` | `.go trigger (#trigger_id\|$trigger_shift-link\|$trigger_target_shift-link) [target]` | mod | game | 2 | Travel |  |  |
| `.go warp` | `.go warp #axis #value\n\nTeleports the user by the specified value along the specified axis.\nUse a positive v` | mod | game | 2 | Travel |  |  |
| `.go xy` | `.go xy #x #y [#mapid]` | mod | game | 2 | Travel |  |  |
| `.go xyz` | `.go xyz #x #y #z [#mapid]` | mod | game | 2 | Travel |  |  |
| `.go zonexy` | `.go zonexy #x #y [#zone]` | mod | game | 2 | Travel |  |  |
| `.gobject activate` | `.gobject activate` | GM | game | 2 | Creatures and objects |  |  |
| `.gobject add` | `.gobject add #id <spawntimeSecs>` | GM | game | 3 | World database | writes world DB |  |
| `.gobject delete` | `.gobject delete #go_guid` | GM | game | 3 | World database | writes world DB |  |
| `.gobject despawn` | `.gobject despawn` | GM | game | 2 | Creatures and objects |  |  |
| `.gobject move` | `.gobject move #goguid [#x #y #z]` | GM | game | 3 | World database | writes world DB |  |
| `.gobject near` | `.gobject near  [#distance]` | GM | game | 2 | Creatures and objects |  |  |
| `.gobject nearspawned` | `.gobject nearspawned` | GM | game | 2 | Creatures and objects |  |  |
| `.gobject respawn` | `.gobject respawn` | GM | game | 2 | Creatures and objects |  |  |
| `.gobject target` | `.gobject target [#go_id\|#go_name_part]` | GM | game | 2 | Creatures and objects |  |  |
| `.gobject turn` | `.gobject turn #goguid` | GM | game | 3 | World database | writes world DB |  |
| `.goname` | `.goname [$charactername]` | mod | game | 1 | Travel |  | yes |
| `.gps` | `.gps [$name\|$shift-link]` | mod | game | 1 | Getting started |  | yes |
| `.groupgo` | `.groupgo [$charactername]` | mod | game | 2 | Travel |  |  |
| `.guid` | `.guid` | GM | game | 2 | Character |  |  |
| `.guild create` | `.guild create [$GuildLeaderName] "$GuildName"` | GM | both | 1 | Test character |  | yes |
| `.guild delete` | `.guild delete "$GuildName"` | GM | both | 3 | Accounts and characters |  |  |
| `.guild invite` | `.guild invite [$CharacterName] "$GuildName"` | GM | both | 1 | Test character |  | yes |
| `.guild rank` | `.guild rank $CharacterName #Rank` | GM | both | 2 | Accounts and characters |  |  |
| `.guild uninvite` | `.guild uninvite [$CharacterName]` | GM | both | 2 | Accounts and characters |  |  |
| `.help` | `.help [$command]` | player | both | 1 | Getting started |  |  |
| `.hidearea` | `.hidearea #areaid` | admin | game | 2 | Looks and stats |  |  |
| `.honor add` | `.honor add $amount` | GM | game | 1 | Character |  | yes |
| `.honor addkill` | `.honor addkill` | GM | game | 2 | Character |  |  |
| `.honor show` | `.honor show` | mod | game | 2 | Character |  |  |
| `.honor update` | `.honor update` | GM | game | 3 | Character progress |  |  |
| `.instance listbinds` | `.instance listbinds` | admin | game | 2 | Groups and instances |  |  |
| `.instance savedata` | `.instance savedata` | admin | game | 2 | Developer | developer |  |
| `.instance stats` | `.instance stats` | admin | both | 2 | Developer | developer |  |
| `.instance unbind` | `.instance unbind all` | admin | game | 2 | Groups and instances |  |  |
| `.itemmove` | `.itemmove #sourceslotid #destinationslotid` | GM | game | 2 | Character |  |  |
| `.kick` | `.kick [$charactername]` | GM | both | 3 | Moderation | no use solo |  |
| `.learn` | `.learn #spell [all]` | admin | game | 1 | Character |  | yes |
| `.learn all` | `.learn all` | admin | game | 3 | Character progress |  |  |
| `.learn all_crafts` | `.learn crafts` | GM | game | 2 | Spells and auras |  |  |
| `.learn all_default` | `.learn all_default [$playername]` | mod | game | 2 | Spells and auras |  |  |
| `.learn all_gm` | `.learn all_gm` | GM | game | 2 | Spells and auras |  |  |
| `.learn all_lang` | `.learn all_lang` | mod | game | 2 | Spells and auras |  |  |
| `.learn all_myclass` | `.learn all_myclass` | admin | game | 2 | Spells and auras |  |  |
| `.learn all_myspells` | `.learn all_myspells` | admin | game | 2 | Spells and auras |  |  |
| `.learn all_mytalents` | `.learn all_mytalents` | admin | game | 1 | Character |  | yes |
| `.learn all_recipes` | `.learn all_recipes [$profession]\r\rLearns all recipes of specified profession and sets skill level to max.\rE` | GM | game | 1 | Character |  | yes |
| `.levelup` | `.levelup [$playername] [#numberoflevels]` | admin | game | 1 | Character |  | yes |
| `.link add` | `.link add` | admin | game | 3 | World database | writes world DB |  |
| `.link check` | `.link check` | admin | game | 2 | Developer | developer |  |
| `.link edit` | `.link edit` | admin | game | 3 | World database | writes world DB |  |
| `.link remove` | `.link remove` | admin | game | 3 | World database | writes world DB |  |
| `.link toggle` | `.link toggle` | admin | game | 3 | World database | writes world DB |  |
| `.linkgrave` | `.linkgrave #graveyard_id [alliance\|horde]` | admin | game | 3 | World database | writes world DB |  |
| `.list areatriggers` | `.list areatriggers\n\nShow areatriggers within the same map (if inside an instanceable map) or area (if inside` | admin | game | 2 | Developer | developer |  |
| `.list auras` | `.list auras` | admin | game | 2 | Character |  |  |
| `.list creature` | `.list creature #creature_id [#max_count]` | admin | both | 2 | Creatures and objects |  |  |
| `.list item` | `.list item #item_id [#max_count]` | admin | both | 2 | Character |  |  |
| `.list object` | `.list object #gameobject_id [#max_count]` | admin | both | 2 | Creatures and objects |  |  |
| `.list talents` | `.list talents` | admin | game | 2 | Character |  |  |
| `.loadscripts` | `.loadscripts $scriptlibraryname` | admin | both | 3 | Server |  |  |
| `.lookup account all` | `.lookup account all` | GM | both | 2 | Lookup |  |  |
| `.lookup account email` | `.lookup account email $emailpart [#limit]` | GM | both | 2 | Lookup | no use solo |  |
| `.lookup account ip` | `lookup account ip $ippart [#limit]` | GM | both | 2 | Lookup | no use solo |  |
| `.lookup account name` | `.lookup account name $accountpart [#limit]` | GM | both | 2 | Lookup |  |  |
| `.lookup area` | `.lookup area $namepart` | mod | both | 2 | Lookup |  |  |
| `.lookup creature` | `.lookup creature $namepart` | admin | both | 2 | Lookup |  |  |
| `.lookup event` | `.lookup event $name` | GM | both | 2 | Lookup |  |  |
| `.lookup faction` | `.lookup faction $name` | admin | both | 2 | Lookup |  |  |
| `.lookup item` | `.lookup item $itemname` | admin | both | 1 | Items |  | yes |
| `.lookup itemset` | `.lookup itemset $itemname` | admin | both | 1 | Items |  |  |
| `.lookup object` | `.lookup object $objname` | admin | both | 2 | Lookup |  |  |
| `.lookup player account` | `.lookup player account $accountpart [#limit]` | GM | both | 2 | Lookup |  |  |
| `.lookup player email` | `.lookup player email $emailpart [#limit]` | GM | both | 2 | Lookup | no use solo |  |
| `.lookup player ip` | `.lookup player ip $ippart [#limit]` | GM | both | 2 | Lookup | no use solo |  |
| `.lookup pool` | `.lookup pool $pooldescpart` | GM | both | 2 | Lookup |  |  |
| `.lookup quest` | `.lookup quest $namepart` | admin | both | 1 | Quests |  | yes |
| `.lookup skill` | `.lookup skill $$namepart` | admin | both | 2 | Lookup |  |  |
| `.lookup spell` | `.lookup spell $namepart` | admin | both | 2 | Lookup |  | yes |
| `.lookup taxinode` | `.lookup taxinode $substring` | admin | both | 2 | Lookup |  |  |
| `.lookup tele` | `.lookup tele $substring` | mod | both | 1 | Travel |  | yes |
| `.loot fullstats` | `.loot fullstats` | GM | both | 2 | Developer | developer |  |
| `.loot stats` | `.loot stats` | GM | both | 2 | Developer | developer |  |
| `.los` | `.los` | admin | game | 2 | Developer | developer |  |
| `.maxskill` | `.maxskill` | admin | game | 1 | Character |  | yes |
| `.mmap` | `.mmap` | admin | game | 3 | Server | developer |  |
| `.mmap loadedtiles` | `.mmap loadedtiles` | GM | game | 2 | Developer | developer |  |
| `.mmap loc` | `.mmap loc` | GM | game | 2 | Developer | developer |  |
| `.mmap path` | `.mmap path` | GM | game | 2 | Developer | developer |  |
| `.mmap stats` | `.mmap stats` | GM | game | 2 | Developer | developer |  |
| `.mmap testarea` | `.mmap testarea` | GM | game | 2 | Developer | developer |  |
| `.mmap testheight` | `.mmap testheight` | GM | game | 2 | Developer | developer |  |
| `.modify agility` | `.modify agility` | admin | game | 2 | Looks and stats |  |  |
| `.modify ap` | `.modify ap` | admin | game | 2 | Looks and stats |  |  |
| `.modify arcaneresist` | `.modify arcaneresist` | admin | game | 2 | Looks and stats |  |  |
| `.modify armor` | `.modify armor` | admin | game | 2 | Looks and stats |  |  |
| `.modify aspeed` | `.modify aspeed #rate` | mod | game | 2 | Looks and stats |  |  |
| `.modify block` | `.modify block` | admin | game | 2 | Looks and stats |  |  |
| `.modify bwalk` | `.modify bwalk #rate` | mod | game | 2 | Looks and stats |  |  |
| `.modify crit` | `.modify crit` | admin | game | 2 | Looks and stats |  |  |
| `.modify dodge` | `.modify dodge` | admin | game | 2 | Looks and stats |  |  |
| `.modify drunk` | `.modify drunk #value` | mod | game | 2 | Looks and stats |  |  |
| `.modify energy` | `.modify energy #energy` | mod | game | 1 | Character |  |  |
| `.modify faction` | `.modify faction #factionid #flagid #npcflagid #dynamicflagid` | mod | game | 2 | Looks and stats |  |  |
| `.modify fireresist` | `.modify fireresist` | admin | game | 2 | Looks and stats |  |  |
| `.modify frostresist` | `.modify frostresist` | admin | game | 2 | Looks and stats |  |  |
| `.modify gender` | `.modify gender male/female` | GM | game | 2 | Looks and stats |  |  |
| `.modify holyresist` | `.modify holyresist` | admin | game | 2 | Looks and stats |  |  |
| `.modify honor` | `.modify honor $field $value` | mod | game | 2 | Character |  |  |
| `.modify hp` | `.modify hp #newhp` | mod | game | 1 | Character |  |  |
| `.modify intellect` | `.modify intellect` | admin | game | 2 | Looks and stats |  |  |
| `.modify mana` | `.modify mana #newmana` | mod | game | 1 | Character |  |  |
| `.modify meleehaste` | `.modify meleehaste` | admin | game | 2 | Looks and stats |  |  |
| `.modify money` | `.modify money #money` | mod | game | 1 | Character |  | yes |
| `.modify morph` | `.modify morph #displayid` | GM | game | 2 | Looks and stats |  |  |
| `.modify mount` | `.modify mount [fast\|slow]` | mod | game | 2 | Looks and stats |  |  |
| `.modify natureresist` | `.modify natureresist` | admin | game | 2 | Looks and stats |  |  |
| `.modify parry` | `.modify parry` | admin | game | 2 | Looks and stats |  |  |
| `.modify rage` | `.modify rage #newrage` | mod | game | 1 | Character |  |  |
| `.modify rangeap` | `.modify rangeap` | admin | game | 2 | Looks and stats |  |  |
| `.modify rangehaste` | `.modify rangehaste` | admin | game | 2 | Looks and stats |  |  |
| `.modify rep` | `.modify rep #repId (#repvalue \| $rankname [#delta])` | GM | game | 1 | Character |  | yes |
| `.modify scale` | `.modify scale #scale` | mod | game | 2 | Looks and stats |  |  |
| `.modify shadowresist` | `.modify shadowresist` | admin | game | 2 | Looks and stats |  |  |
| `.modify speed` | `.modify speed #rate` | mod | game | 1 | Character |  | yes |
| `.modify spellcrit` | `.modify spellcrit` | admin | game | 2 | Looks and stats |  |  |
| `.modify spellhaste` | `.modify spellhaste` | admin | game | 2 | Looks and stats |  |  |
| `.modify spellpower` | `.modify spellpower` | admin | game | 2 | Looks and stats |  |  |
| `.modify spirit` | `.modify spirit` | admin | game | 2 | Looks and stats |  |  |
| `.modify stamina` | `.modify stamina` | admin | game | 2 | Looks and stats |  |  |
| `.modify standstate` | `.modify standstate #emoteid` | GM | game | 2 | Looks and stats |  |  |
| `.modify strength` | `.modify strength` | admin | game | 2 | Looks and stats |  |  |
| `.modify swim` | `.modify swim #rate` | mod | game | 2 | Looks and stats |  |  |
| `.modify tp` | `.modify tp` | mod | game | 2 | Looks and stats |  |  |
| `.movement cometome` | `.movement cometome  Move selected creature to you.` | admin | game | 2 | Developer | developer |  |
| `.movement debug` | `.movement debug` | admin | game | 2 | Developer | developer |  |
| `.movement movegens` | `.movement movegens  Show movement generators stack for selected creature or player.` | GM | game | 2 | Developer | developer |  |
| `.movement movespeed` | `.movement movespeed  Show speed of selected creature.` | GM | game | 2 | Developer | developer |  |
| `.movement print` | `.movement print` | admin | game | 2 | Developer | developer |  |
| `.mute` | `.mute [$playerName] $timeInMinutes` | mod | both | 3 | Moderation | no use solo |  |
| `.namego` | `.namego [$charactername]` | mod | game | 1 | Travel |  | yes |
| `.neargrave` | `.neargrave [alliance\|horde]` | admin | game | 2 | Creatures and objects |  |  |
| `.notify` | `.notify $MessageToBroadcast` | mod | both | 2 | Moderation | no use solo |  |
| `.npc add` | `.npc add #creatureid` | GM | game | 3 | World database | writes world DB |  |
| `.npc additem` | `.npc additem #itemId <#maxcount><#incrtime>r` | GM | game | 3 | World database | writes world DB |  |
| `.npc addweapon` | `.npc addweapon` | admin | game | 3 | World database | disabled |  |
| `.npc aiinfo` | `.npc npc aiinfo` | GM | game | 2 | Developer | developer |  |
| `.npc allowmove` | `.npc allowmove` | admin | game | 2 | Creatures and objects |  |  |
| `.npc changeentry` | `.npc changeentry` | admin | game | 3 | World database | writes world DB |  |
| `.npc changelevel` | `.npc changelevel #level` | GM | game | 3 | World database | writes world DB |  |
| `.npc delete` | `.npc delete [#guid]` | GM | game | 3 | World database | writes world DB |  |
| `.npc delitem` | `.npc delitem #itemId` | GM | game | 3 | World database | writes world DB |  |
| `.npc despawn` | `.npc despawn` | GM | game | 2 | Creatures and objects |  |  |
| `.npc evade` | `.npc evade` | GM | game | 2 | Creatures and objects |  |  |
| `.npc factionid` | `.npc factionid #factionid` | GM | game | 3 | World database | writes world DB |  |
| `.npc flag` | `.npc flag #npcflag` | GM | game | 3 | World database | writes world DB |  |
| `.npc follow` | `.npc follow` | GM | game | 2 | Creatures and objects |  |  |
| `.npc formation info` | `.npc formation info` | GM | game | 2 | Developer | developer |  |
| `.npc formation reset` | `.npc formation reset` | GM | game | 2 | Developer | developer |  |
| `.npc formation switch` | `.npc formation switch` | GM | game | 2 | Developer | developer |  |
| `.npc group info` | `.npc group info` | GM | game | 2 | Developer | developer |  |
| `.npc info` | `.npc info` | admin | game | 2 | Creatures and objects |  |  |
| `.npc move` | `.npc move [#creature_guid]` | GM | game | 3 | World database | writes world DB |  |
| `.npc name` | `.npc name $name` | GM | game | 3 | World database | disabled |  |
| `.npc playemote` | `.npc playemote #emoteid` | admin | game | 2 | Creatures and objects |  |  |
| `.npc say` | `.npc say #text` | mod | game | 2 | Creatures and objects |  |  |
| `.npc setmodel` | `.npc setmodel #displayid` | GM | game | 3 | World database | writes world DB |  |
| `.npc setmovetype` | `.npc setmovetype [#creature_guid] stay/random/way [NODEL]` | GM | game | 3 | World database | writes world DB |  |
| `.npc showloot` | `.npc showloot` | GM | game | 2 | Creatures and objects |  |  |
| `.npc spawndist` | `.npc spawndist #dist` | GM | game | 3 | World database | writes world DB |  |
| `.npc spawntime` | `.npc spawntime #time` | GM | game | 3 | World database | writes world DB |  |
| `.npc spelllist` | `.npc spelllist` | GM | game | 2 | Creatures and objects |  |  |
| `.npc subname` | `.npc subname $Name` | GM | game | 3 | World database | disabled |  |
| `.npc tame` | `.npc tame` | GM | game | 2 | Hunter pet |  |  |
| `.npc tempspawn` | `.npc tempspawn` | GM | game | 2 | Creatures and objects |  |  |
| `.npc textemote` | `.npc textemote #emoteid` | mod | game | 2 | Creatures and objects |  |  |
| `.npc threat` | `.npc threat` | admin | game | 2 | Creatures and objects |  |  |
| `.npc unfollow` | `.npc unfollow` | GM | game | 2 | Creatures and objects |  |  |
| `.npc whisper` | `.npc whisper #playerguid #text` | mod | game | 2 | Creatures and objects |  |  |
| `.npc yell` | `.npc yell #text` | mod | game | 2 | Creatures and objects |  |  |
| `.pdump load` | `.pdump load $filename $account [$newname] [$newguid]` | admin | both | 3 | Accounts and characters |  |  |
| `.pdump write` | `.pdump write $filename $playerNameOrGUID` | admin | both | 2 | Accounts and characters |  |  |
| `.pet info` | `.pet info` | GM | game | 1 | Hunter pet |  | yes |
| `.pet learn` | `.pet learn` | GM | game | 1 | Hunter pet |  | yes |
| `.pet level` | `.pet level` | GM | game | 1 | Hunter pet |  | yes |
| `.pet levelloyalty` | `.pet levelloyalty` | GM | both | 1 | Hunter pet |  |  |
| `.pet loyalty` | `.pet loyalty` | GM | game | 1 | Hunter pet |  | yes |
| `.pet teach` | `.pet teach` | GM | game | 1 | Hunter pet |  | yes |
| `.pet tp` | `.pet tp` | GM | game | 1 | Hunter pet |  | yes |
| `.pinfo` | `.pinfo [$player_name]` | GM | both | 2 | Character |  |  |
| `.pmon` | `.pmon` | GM | both | 2 | Developer | developer |  |
| `.pool` | `.pool #pool_id` | GM | both | 2 | Developer | developer |  |
| `.pool list` | `.pool list` | GM | game | 2 | Developer | developer |  |
| `.pool spawns` | `.pool spawns #pool_id` | GM | game | 2 | Developer | developer |  |
| `.quest add` | `.quest add #quest_id` | admin | game | 1 | Quests |  | yes |
| `.quest complete` | `.quest complete #questid` | admin | game | 1 | Quests |  | yes |
| `.quest remove` | `.quest remove #quest_id` | admin | game | 1 | Quests |  | yes |
| `.quit` | `quit` | console | console | 3 | Server | console only |  |
| `.recall` | `.recall [$playername]` | mod | game | 1 | Travel |  | yes |
| `.reload all` | `.reload all` | admin | both | 3 | Server | developer |  |
| `.reload all_area` | `.reload all_area` | admin | both | 3 | Server | developer |  |
| `.reload all_eventai` | `.reload all_eventai` | admin | both | 3 | Server | developer |  |
| `.reload all_gossips` | `.reload all_gossips` | admin | both | 3 | Server | developer |  |
| `.reload all_item` | `.reload all_item` | admin | both | 3 | Server | developer |  |
| `.reload all_locales` | `.reload all_locales` | admin | both | 3 | Server | developer |  |
| `.reload all_loot` | `.reload all_loot` | admin | both | 3 | Server | developer |  |
| `.reload all_npc` | `.reload all_npc` | admin | both | 3 | Server | developer |  |
| `.reload all_quest` | `.reload all_quest` | admin | both | 3 | Server | developer |  |
| `.reload all_scripts` | `.reload all_scripts` | admin | both | 3 | Server | developer |  |
| `.reload all_spell` | `.reload all_spell` | admin | both | 3 | Server | developer |  |
| `.reload areatrigger_involvedrelation` | `.reload areatrigger_involvedrelation` | admin | both | 2 | Server data | developer |  |
| `.reload areatrigger_tavern` | `.reload areatrigger_tavern` | admin | both | 2 | Server data | developer |  |
| `.reload areatrigger_teleport` | `.reload areatrigger_teleport` | admin | both | 2 | Server data | developer |  |
| `.reload command` | `.reload command` | admin | both | 2 | Server data | developer |  |
| `.reload conditions` | `.reload conditions` | admin | both | 2 | Server data | developer |  |
| `.reload config` | `.reload config` | admin | both | 2 | Server data | developer |  |
| `.reload creature_ai_scripts` | `.reload creature_ai_scripts` | admin | both | 2 | Server data | developer |  |
| `.reload creature_ai_summons` | `.reload creature_ai_summons` | admin | both | 2 | Server data | developer |  |
| `.reload creature_battleground` | `.reload creature_battleground` | admin | both | 2 | Server data | developer |  |
| `.reload creature_cooldowns` | `.reload creature_cooldowns` | admin | both | 2 | Server data | developer |  |
| `.reload creature_involvedrelation` | `.reload creature_involvedrelation` | admin | both | 2 | Server data | developer |  |
| `.reload creature_loot_template` | `.reload creature_loot_template` | admin | both | 2 | Server data | developer |  |
| `.reload creature_questrelation` | `.reload creature_questrelation` | admin | both | 2 | Server data | developer |  |
| `.reload creature_spell_list` | `.reload creature_spell_list` | admin | both | 2 | Server data | developer |  |
| `.reload creature_template_classlevelstats` | `.reload creature_template_classlevelstats` | admin | both | 2 | Server data | developer |  |
| `.reload dbscripts_on_creature_death` | `.reload dbscripts_on_creature_death` | admin | both | 2 | Server data | developer |  |
| `.reload dbscripts_on_event` | `.reload dbscripts_on_event` | admin | both | 2 | Server data | developer |  |
| `.reload dbscripts_on_go_use` | `.reload dbscripts_on_go_use` | admin | both | 2 | Server data | developer |  |
| `.reload dbscripts_on_gossip` | `.reload dbscripts_on_gossip` | admin | both | 2 | Server data | developer |  |
| `.reload dbscripts_on_quest_end` | `.reload dbscripts_on_quest_end` | admin | both | 2 | Server data | developer |  |
| `.reload dbscripts_on_quest_start` | `.reload dbscripts_on_quest_start` | admin | both | 2 | Server data | developer |  |
| `.reload dbscripts_on_relay` | `.reload dbscripts_on_relay` | admin | both | 2 | Server data | developer |  |
| `.reload dbscripts_on_spell` | `.reload dbscripts_on_spell` | admin | both | 2 | Server data | developer |  |
| `.reload disenchant_loot_template` | `.reload disenchant_loot_template` | admin | both | 2 | Server data | developer |  |
| `.reload fishing_loot_template` | `.reload fishing_loot_template` | admin | both | 2 | Server data | developer |  |
| `.reload game_graveyard_zone` | `.reload game_graveyard_zone` | admin | both | 2 | Server data | developer |  |
| `.reload game_tele` | `.reload game_tele` | admin | both | 2 | Server data | developer |  |
| `.reload gameobject_battleground` | `.reload gameobject_battleground` | admin | both | 2 | Server data | developer |  |
| `.reload gameobject_involvedrelation` | `.reload gameobject_involvedrelation` | admin | both | 2 | Server data | developer |  |
| `.reload gameobject_loot_template` | `.reload gameobject_loot_template` | admin | both | 2 | Server data | developer |  |
| `.reload gameobject_questrelation` | `.reload gameobject_questrelation` | admin | both | 2 | Server data | developer |  |
| `.reload gossip_menu` | `.reload gossip_menu` | admin | both | 2 | Server data | developer |  |
| `.reload gossip_menu_option` | `.reload gossip_menu_option` | admin | both | 2 | Server data | developer |  |
| `.reload item_enchantment_template` | `.reload item_enchantment_template` | admin | both | 2 | Server data | developer |  |
| `.reload item_loot_template` | `.reload item_loot_template` | admin | both | 2 | Server data | developer |  |
| `.reload item_required_target` | `.reload item_required_target` | admin | both | 2 | Server data | developer |  |
| `.reload locales_areatrigger_teleport` | `.reload locales_areatrigger_teleport` | admin | both | 2 | Server data | developer |  |
| `.reload locales_creature` | `.reload locales_creature` | admin | both | 2 | Server data | developer |  |
| `.reload locales_gameobject` | `.reload locales_gameobject` | admin | both | 2 | Server data | developer |  |
| `.reload locales_gossip_menu_option` | `.reload locales_gossip_menu_option` | admin | both | 2 | Server data | developer |  |
| `.reload locales_item` | `.reload locales_item` | admin | both | 2 | Server data | developer |  |
| `.reload locales_npc_text` | `.reload locales_npc_text` | admin | both | 2 | Server data | developer |  |
| `.reload locales_page_text` | `.reload locales_page_text` | admin | both | 2 | Server data | developer |  |
| `.reload locales_points_of_interest` | `.reload locales_points_of_interest` | admin | both | 2 | Server data | developer |  |
| `.reload locales_quest` | `.reload locales_quest` | admin | both | 2 | Server data | developer |  |
| `.reload locales_questgiver_greeting` | `.reload locales_questgiver_greeting` | admin | both | 2 | Server data | developer |  |
| `.reload locales_trainer_greeting` | `.reload locales_trainer_greeting` | admin | both | 2 | Server data | developer |  |
| `.reload mail_loot_template` | `.reload mail_loot_template` | admin | both | 2 | Server data | developer |  |
| `.reload mangos_string` | `.reload mangos_string` | admin | both | 2 | Server data | developer |  |
| `.reload npc_gossip` | `.reload npc_gossip` | admin | both | 2 | Server data | developer |  |
| `.reload npc_text` | `.reload npc_text` | admin | both | 2 | Server data | developer |  |
| `.reload npc_trainer` | `.reload npc_trainer` | admin | both | 2 | Server data | developer |  |
| `.reload npc_vendor` | `.reload npc_vendor` | admin | both | 2 | Server data | developer |  |
| `.reload page_text` | `.reload page_text` | admin | both | 2 | Server data | developer |  |
| `.reload pickpocketing_loot_template` | `.reload pickpocketing_loot_template` | admin | both | 2 | Server data | developer |  |
| `.reload points_of_interest` | `.reload points_of_interest` | admin | both | 2 | Server data | developer |  |
| `.reload quest_template` | `.reload quest_template` | admin | both | 2 | Server data | developer |  |
| `.reload questgiver_greeting` | `.reload questgiver_greeting` | admin | both | 2 | Server data | developer |  |
| `.reload reference_loot_template` | `.reload reference_loot_template` | admin | both | 2 | Server data | developer |  |
| `.reload reputation_reward_rate` | `.reload reputation_reward_rate` | admin | both | 2 | Server data | developer |  |
| `.reload reputation_spillover_template` | `.reload reputation_spillover_template` | admin | both | 2 | Server data | developer |  |
| `.reload reserved_name` | `.reload reserved_name` | admin | both | 2 | Server data | developer |  |
| `.reload skill_fishing_base_level` | `.reload skill_fishing_base_level` | admin | both | 2 | Server data | developer |  |
| `.reload skinning_loot_template` | `.reload skinning_loot_template` | admin | both | 2 | Server data | developer |  |
| `.reload spam_records` | `.reload spam_records` | admin | both | 2 | Server data | developer |  |
| `.reload spawn_group` | `.reload spawn_group` | admin | both | 2 | Server data | developer |  |
| `.reload spell_affect` | `.reload spell_affect` | admin | both | 2 | Server data | developer |  |
| `.reload spell_area` | `.reload spell_area` | admin | both | 2 | Server data | developer |  |
| `.reload spell_chain` | `.reload spell_chain` | admin | both | 2 | Server data | developer |  |
| `.reload spell_elixir` | `.reload spell_elixir` | admin | both | 2 | Server data | developer |  |
| `.reload spell_learn_spell` | `.reload spell_learn_spell` | admin | both | 2 | Server data | developer |  |
| `.reload spell_pet_auras` | `.reload spell_pet_auras` | admin | both | 2 | Server data | developer |  |
| `.reload spell_proc_event` | `.reload spell_proc_event` | admin | both | 2 | Server data | developer |  |
| `.reload spell_proc_item_enchant` | `.reload spell_proc_item_enchant` | admin | both | 2 | Server data | developer |  |
| `.reload spell_script_target` | `.reload spell_script_target` | admin | both | 2 | Server data | developer |  |
| `.reload spell_target_position` | `.reload spell_target_position` | admin | both | 2 | Server data | developer |  |
| `.reload spell_threats` | `.reload spell_threats` | admin | both | 2 | Server data | developer |  |
| `.reload string_id` | `.reload string_id` | admin | both | 2 | Server data | developer |  |
| `.reload taxi_shortcuts` | `.reload taxi_shortcuts` | admin | both | 2 | Server data | developer |  |
| `.reload trainer_greeting` | `.reload trainer_greeting` | admin | both | 2 | Server data | developer |  |
| `.repairitems` | `.repairitems` | GM | both | 1 | Character |  | yes |
| `.reset all` | `.reset all spells` | admin | both | 3 | Character progress |  |  |
| `.reset honor` | `.reset honor [Playername]` | admin | both | 3 | Character progress |  |  |
| `.reset level` | `.reset level [Playername]` | admin | both | 3 | Character progress |  |  |
| `.reset mods` | `.reset mods` | admin | both | 2 | Looks and stats |  |  |
| `.reset spells` | `.reset spells [Playername]` | admin | both | 3 | Character progress |  |  |
| `.reset stats` | `.reset stats [Playername]` | admin | both | 2 | Looks and stats |  |  |
| `.reset talents` | `.reset talents [Playername]` | admin | both | 1 | Character |  | yes |
| `.reset taxinodes` | `.reset taxinodes` | admin | both | 3 | Character progress |  |  |
| `.respawn` | `.respawn` | admin | game | 1 | World |  |  |
| `.revive` | `.revive` | admin | both | 1 | Character |  | yes |
| `.rndbot` | `.rndbot` | GM | both | 3 | Server |  |  |
| `.save` | `.save` | player | game | 1 | Getting started |  | yes |
| `.saveall` | `.saveall` | mod | both | 2 | Server |  |  |
| `.send items` | `.send items #playername "#subject" "#text" itemid1[:count1] itemid2[:count2] ... itemidN[:countN]` | admin | both | 2 | Mail and auctions |  |  |
| `.send mail` | `.send mail #playername "#subject" "#text"` | mod | both | 2 | Mail and auctions |  |  |
| `.send mass items` | `.send mass items #racemask\|$racename\|alliance\|horde\|all "#subject" "#text" itemid1[:count1] itemid2[:count` | admin | both | 3 | Server |  |  |
| `.send mass mail` | `.send mass mail #racemask\|$racename\|alliance\|horde\|all "#subject" "#text"` | admin | both | 3 | Server |  |  |
| `.send mass money` | `.send mass money #racemask\|$racename\|alliance\|horde\|all "#subject" "#text" #money` | admin | both | 3 | Server |  |  |
| `.send message` | `.send message $playername $message` | admin | both | 2 | Accounts and characters |  |  |
| `.send money` | `.send money #playername "#subject" "#text" #money` | admin | both | 2 | Mail and auctions |  |  |
| `.server corpses` | `.server corpses` | GM | both | 2 | Server |  |  |
| `.server exit` | `.server exit` | console | console | 3 | Server | console only |  |
| `.server idlerestart` | `.server idlerestart #delay` | admin | both | 3 | Server |  |  |
| `.server idlerestart cancel` | `.server idlerestart cancel` | admin | both | 3 | Server |  |  |
| `.server idleshutdown` | `.server idleshutdown #delay [#exist_code]` | admin | both | 3 | Server |  |  |
| `.server idleshutdown cancel` | `.server idleshutdown cancel` | admin | both | 3 | Server |  |  |
| `.server info` | `.server info` | player | both | 1 | Getting started |  |  |
| `.server log filter` | `.server log filter [($filtername\|all) (on\|off)]` | console | console | 2 | Developer | developer, console only |  |
| `.server log level` | `.server log level [#level]` | console | console | 2 | Developer | developer, console only |  |
| `.server motd` | `.server motd` | player | both | 2 | Server |  |  |
| `.server plimit` | `.server plimit [#num\|-1\|-2\|-3\|reset\|player\|moderator\|gamemaster\|administrator]` | admin | both | 3 | Server |  |  |
| `.server resetallraid` | `.server resetallraid` | admin | both | 3 | Server |  |  |
| `.server restart` | `.server restart #delay` | admin | both | 3 | Server |  |  |
| `.server restart cancel` | `.server restart cancel` | admin | both | 3 | Server |  |  |
| `.server set motd` | `.server set motd $MOTD` | admin | both | 2 | Server |  |  |
| `.server shutdown` | `.server shutdown #delay [#exit_code]` | admin | both | 3 | Server |  |  |
| `.server shutdown cancel` | `.server shutdown cancel` | admin | both | 3 | Server |  |  |
| `.setskill` | `.setskill #skill #level [#max]` | admin | game | 1 | Character |  | yes |
| `.showarea` | `.showarea #areaid` | admin | game | 2 | Looks and stats |  |  |
| `.stable` | `.stable` | admin | game | 1 | Hunter pet |  |  |
| `.start` | `.start` | player | game | 2 | Travel |  |  |
| `.summon` | `.summon` | mod | game | 1 | Travel |  | yes |
| `.taxicheat` | `.taxicheat on/off` | mod | game | 2 | Travel |  |  |
| `.tele` | `.tele #location` | mod | game | 1 | Travel |  | yes |
| `.tele add` | `.tele add $name` | admin | game | 3 | World database | writes world DB |  |
| `.tele del` | `.tele del $name` | admin | both | 3 | World database | writes world DB |  |
| `.tele group` | `.tele group#location` | mod | game | 2 | Travel |  |  |
| `.tele name` | `.tele name [#playername] #location` | mod | both | 2 | Travel |  |  |
| `.testing bags` | `.testing bags` | GM | game | 1 | Items |  |  |
| `.ticket` | `.ticket #id` | GM | game | 2 | Moderation | no use solo |  |
| `.ticket discard` | `.ticket discard #id [$conclusion]` | GM | game | 2 | Moderation | no use solo |  |
| `.ticket escalate` | `.ticket escalate #id` | GM | game | 2 | Moderation | no use solo |  |
| `.ticket go` | `.ticket go #id` | GM | game | 2 | Moderation | no use solo |  |
| `.ticket goname` | `.ticket goname #id` | GM | game | 2 | Moderation | no use solo |  |
| `.ticket note` | `.ticket note #id $message` | GM | game | 2 | Moderation | no use solo |  |
| `.ticket read` | `.ticket read #id` | GM | game | 2 | Moderation | no use solo |  |
| `.ticket resolve` | `.ticket resolve #id [$conclusion]` | GM | game | 2 | Moderation | no use solo |  |
| `.ticket sort` | `.ticket sort #id #categoryid` | GM | game | 2 | Moderation | no use solo |  |
| `.ticket whisper` | `.ticket whisper #id $message` | GM | game | 2 | Moderation | no use solo |  |
| `.tickets` | `.tickets [on\|off\|[#categoryid #max\|#max] [online]]` | GM | game | 2 | Moderation | no use solo |  |
| `.tickets list` | `.tickets list [#categoryid #max\|#max] [online]` | GM | game | 2 | Moderation | no use solo |  |
| `.tickets queue` | `.tickets queue on\|off` | admin | game | 2 | Moderation | no use solo |  |
| `.trigger` | `.trigger [#trigger_id\|$trigger_shift-link\|$trigger_target_shift-link]` | GM | both | 2 | Developer | developer |  |
| `.trigger active` | `.trigger active` | GM | game | 2 | Developer | developer |  |
| `.trigger near` | `.trigger near [#distance]` | GM | game | 2 | Developer | developer |  |
| `.unaura` | `.unaura #spellid` | admin | game | 2 | Spells and auras |  |  |
| `.unban account` | `.unban account $Name` | admin | both | 3 | Moderation | no use solo |  |
| `.unban character` | `.unban character $Name` | admin | both | 3 | Moderation | no use solo |  |
| `.unban ip` | `.unban ip` | admin | both | 3 | Moderation | no use solo |  |
| `.unlearn` | `.unlearn #spell [all]` | admin | game | 2 | Spells and auras |  |  |
| `.unmute` | `.unmute $playerName` | mod | both | 3 | Moderation | no use solo |  |
| `.waterwalk` | `.waterwalk on/off` | GM | game | 2 | Looks and stats |  |  |
| `.wchange` | `.wchange #weathertype #status` | admin | game | 1 | World |  |  |
| `.whispers` | `.whispers on\|off` | mod | game | 2 | Moderation | no use solo |  |
| `.worldstate scourgeinvasion battleswon` | `.worldstate scourgeinvasion battleswon` | admin | game | 3 | Server |  |  |
| `.worldstate scourgeinvasion show` | `.worldstate scourgeinvasion show` | admin | game | 2 | World and events |  |  |
| `.worldstate scourgeinvasion startzone` | `.worldstate scourgeinvasion startzone` | admin | game | 3 | Server |  |  |
| `.worldstate scourgeinvasion state` | `.worldstate scourgeinvasion state` | admin | game | 3 | Server |  |  |
| `.worldstate set` | `.worldstate set` | admin | game | 3 | Server |  |  |
| `.worldstate variables` | `.worldstate variables` | admin | game | 2 | Developer | developer |  |
| `.worldstate wareffort counter` | `.worldstate wareffort counter` | admin | game | 3 | Server |  |  |
| `.worldstate wareffort phase` | `.worldstate wareffort phase` | admin | game | 3 | Server |  |  |
| `.worldstate wareffort show` | `.worldstate wareffort show` | admin | game | 2 | World and events |  |  |
| `.wp add` | `.wp add [Selected Creature or dbGuid] [pathId [wpOrigin] ]` | GM | game | 3 | World database | writes world DB |  |
| `.wp export` | `.wp export [#creature_guid or Select a Creature] $filename` | admin | game | 2 | Developer | developer |  |
| `.wp modify` | `.wp modify command [dbGuid, id] [value]` | GM | game | 3 | World database | writes world DB |  |
| `.wp show` | `.wp show command [dbGuid] [pathId [wpOrigin] ]` | GM | game | 2 | Developer | developer |  |
| `.wr` | `.wr [on/off]` | player | game | 2 | Moderation | no use solo |  |

## The user's decisions (session 55, after the preview)

The preview: tools/asset-extract/hub_window_preview.py -> http://localhost:8777/ui-forever/hub-window/ (side tabs Forever UI,
Game Master, Console; GM's Everyday / Sometimes / Destructive and the console's Common / Occasional / Expert as tabs under the
window; the search through the side tab's three).

1. **The Console tab opens with /fui console** (and its side tab); the game's own /console is left alone.
2. **Destructive: most of it, each with a confirm**; moderation and the console-only commands behind a "Show all" switch.
3. **The developer checks: one folded Developer category at the end of Sometimes.**
4. **Weather, all three:** a weather row in Everyday (Clear, Rain, Snow, Sandstorm; light, medium, heavy: 0.2, 0.5, 0.9);
   a server patch so weather set by `.wchange` stays (not undone by the next 10-minute roll); a world database patch with
   an undo giving weather to the zones without (Durotar, the Barrens, Westfall, Silverpine, the cities), both factions alike.
5. Rows from the research get plain-words names, as the suite's (the command under the name).

## Examples and what they turned up

2026-10-03: the 248 typed rows without examples got one to three each, from each command's handler in
`(the server's checkout)` (and `Anticheat/module/`, `modules/PlayerBots/`), its help in the `command` table, and real
numbers from the world database (Hogger 448, Onyxia 10184, Cairne Bloodhoof 3057, Hulfnar Stonetotem's spawn 24781, the mailboxes
of Orgrimmar 29704 and Stormwind 73671, the graveyards of Bloodhoof Village 89, Brill 289, and Goldshire 106, Ragefire Chasm's
trigger 2230, the zone music of Thunder Bluff 7077, the Undercity 5074, and Stormwind 2532). By hub: Sometimes 178 rows (Character 2,
Looks and stats 28, Spells and auras 3, Travel 9, Lookup 5, Creatures and objects 12, Groups and instances 1, World and events 3,
Mail and auctions 2, Accounts and characters 3, Server 1, Moderation 33, Developer 76); Destructive 70 (Character progress 2,
Accounts and characters 4, World database 25, Server 15, Developer 13, Moderation 11).

**Texts corrected from the source:** `.debug send spellVisual` takes a SpellVisualKit number, not a spell visual (`PlaySpellVisual`
sends a kit: 406 eating, 438 drinking); `.modify spellpower` adds spell damage only (spell 22747, aura 13, schools 126: healing
unchanged); `.npc tempspawn` needs the milliseconds too; `.gobject respawn [seconds]`, `.gobject move [x y z]`, `.gobject turn
[angle]`, `.ticket escalate [level]`, and `.mute [reason]` (a warning stays on the account) had arguments missing; `.ticket` and
`.ticket read` show the ticket as well as mark it read; `.debug getvaluebyname` takes only the name; `.anticheat silence` and
`unsilence` take an account number; `.anticheat blacklist` adds to the blacklist (saved in the login database, nothing takes it
off); `.debug moveflag` only prints; `.debug utf8overflow` sends nothing (a server-side name check); `.debug packetlog` writes
nothing here (`PacketLogFile` is empty in mangosd.conf); `.debug send opcode` reads `opcode.txt` (none here); `.loadscripts` does
nothing on this build (the handler only returns). In `ns.GMArgs`: the spell visual kit, and `.debug modvalue`'s op is needed.

**Source bugs (not fixed; the rows say so):** `.link edit` and `.link toggle` write a column `flags` that `creature_linking`
doesn't have (it's `flag`), so they change nothing; `.gobject target` with nothing after it builds `event IS nullptr` into its
SQL and always fails; `.debug send qinvalidmsg` calls `std::stoul` on its argument, so with nothing or a word after it the
server crashes (nothing catches the exception); `.anticheat cheatinform` and `spaminform` swap their two values in the
`UPDATE account`, writing your account's number into the flags of account 1 (cheat) or 4 (spam).

## Session 58: the wider pane, the quick tests, the blocks

- **The window 860 × 484** (was 648): the detail pane 462 wide (the user: “a bigger sidebar”, the detail pane); the footer
  buttons the pane’s width less 16 a side, the weather’s and the console’s three a third each.
- **Quick tests** after Character (Help.lua’s TOPICS): Buffs and debuffs (`.aura` the top ranks: group buffs, blessings, party
  auras, world buffs, Dire Maul tributes, Darkmoon fortunes, shields, Amplify and Dampen Magic, warrior debuffs, curses, hit
  debuffs; `.unaura all`, which takes passive auras too until a relog), Setups (level 60 and every spell, fresh talents, every
  talent, cooldowns and repairs, the test outfit), Targets (`.npc tempspawn`: a Masterwork Target Dummy, a level 60 beast, a level 63
  enemy; kill your target; GM mode), Stat dumps (`/fui statdump`, a before and after).
- **The detail as blocks** (the user: “typography, balance and spacing between examples … hairlines and padding left and right
  for like 24px”): 24 px from the pane’s sides; the text in balanced lines; each block under the client’s tooltip divider (6 px
  above and below) with a small white capital label: IF YOU TYPE (each command gold, what it does under it in white, 2 px apart,
  8 px between examples), HOW TO TYPE IT (the syntax, each part gold with what it is under it), each kind of value, and the note
  (blue: the server’s window; red: asks first). Every tab draws this way (Help.lua `fillBlocks`, `blocksOf`).
