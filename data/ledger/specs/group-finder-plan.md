# The Group Finder: dungeons, raids and battlegrounds with bots (a plan)

Session 60 (2026-10-04). The user's report on the game's Looking for Group window (2026-10-04 06:36): “Finish designing Looking
for Group and Looking for More. We can rethink how they work since we are playing with bots.” Then: “plan the new flow for dungeon
and bgs”. Also open from session 59: Prepare for a Dungeon or a Raid, the GM window's third flow (“the same way as prepare for PvP”).

A plan only. Nothing is built until the user agrees; then a browser preview, then the game.

## Why rethink it

Vanilla's Looking for Group (the LFG and LFM tabs: up to three activities, a comment, Post) is a notice board: you wait for other
players to read it. Here every other player is a bot, so the board has no reader. The window should form the group itself.

## Two tools, one engine

- **The Group Finder** (the player's: replaces Looking for Group in the micro menu, the `I` key): find a dungeon, a raid or a
  battleground at your level, choose your role, and go with a group of bots. Play, not testing: no gear handed out, no levels, no
  honor. It only forms the group and gets it to the door.
- **Prepare for a Dungeon or a Raid** (the GM window's third flow, beside Prepare This Character and Prepare for PvP): the same
  group, plus what a test needs: the level, the gear, attunements and keys, consumables, resistance gear, the teleport inside.
- **Shared:** the team builder that Prepare for PvP already has (roles by group size, the levels of play, the named specs by
  class), reused by both.

## The Group Finder (proposed)

Forever's window style (the metal frame, side tabs): **Dungeons**, **Raids**, **Battlegrounds**.

### Dungeons

1. **Pick a dungeon.** The list in four bands (The First Depths, Deeper Halls, The Old Strongholds, The Last Gates), each with its
   levels. Yours highlighted (green within your range, yellow a little above, grey below); “Any dungeon for my level” at the top.
   The card on the right: the levels, the entrance (zone, and a map pin button), the bosses, your quests for it (from the quest
   log), and what you need (a key: Scholomance's Skeleton Key, Blackrock Spire's Seal of Ascension; your side: Ragefire Chasm and
   the Stockade's long walk for the other faction).
2. **Your role.** Tank, healer or damage, picked from your talents (you can change it); only the roles your class can take.
3. **Your group.** Who fills the other four seats, by role:
   - **Bots from the world:** random bots of your side near your level, invited by role (they stay random bots: they leave after).
   - **Your companions:** the Silverleaf Company (party members by name, with their own roles).
   - A mix (companions first, the world for the rest).
   - **The level of play:** Recruits, Regulars, Veterans (as Prepare for PvP: how well they're geared and specced). Should this
     re-gear real random bots, or only choose among them? (a question below)
4. **Getting there.** One of:
   - **Walk:** a map pin on the entrance, the group meets you there (they travel on their own).
   - **The meeting stone:** you walk to the stone, the group is summoned to you (as 1.12's meeting stones did).
   - **Take us there:** the group and you at the entrance at once (a shortcut).
5. **Go:** the group formed (roles set: the tank tanks, the healer heals), the ready check, the recap (names, classes, roles,
   level of play).

**In the dungeon** (a small panel by the party frames, or the minimap's group icon): Ready check, Pull (the tank pulls the next
pack), Wait here / Follow me, loot rules, Leave (the bots go back to the world). The party frames show each one's role.

### Raids

The same steps for Zul'Gurub and Ruins of Ahn'Qiraj (20), and Molten Core, Onyxia's Lair, Blackwing Lair, Temple of Ahn'Qiraj and
Naxxramas (40). The roles by raid size (20: 2 tanks, 5 healers, 13 damage; 40: 4 tanks, 10 healers, 26 damage), the attunements
shown (Onyxia's Lair's amulet, Molten Core's Hydraxian quest, Blackwing Lair's orb, Naxxramas' Argent Dawn standing), raid groups
arranged by role. **The Mac's memory:** 39 bots in one instance is heavy; the first build may stop at 20.

### Battlegrounds

The battlemaster's queue without walking to one (the game allows the queue from anywhere in 1.14.2? to check):

1. **Pick a battleground:** Warsong Gulch, Arathi Basin, Alterac Valley (the ones your level allows), the size of each side.
2. **Your team:** alone (random bots fill both sides), or with a team of bots (by role, as Prepare for PvP) as a group.
3. **Their side:** the random bots that queue; the level of play (their gear and spec when the battle starts), as Prepare for PvP.
4. **Queue.** The minimap's eye shows the queue; the battle starts when both sides fill.

Unlike Prepare for PvP, no honor or rank is handed out: what you earn is yours.

## Prepare for a Dungeon or a Raid (the GM flow, proposed)

The test character wizard's window, third flow (GMSuite.lua's FLOWS), like Prepare for PvP:

1. **The dungeon or raid** (by band and level), and your level set to fit it (optional).
2. **You:** gear for it (greens, blues, the dungeon set, or best), the attunement and key granted (quests completed, the item
   added), consumables (potions, food, flasks for raids), resistance gear (fire for Molten Core and Onyxia, nature for Temple of
   Ahn'Qiraj, frost for Naxxramas' Sapphiron).
3. **The group:** as the Group Finder's step 3, with bots created to the role and level of play (`.bot create … role= gear=`).
4. **Where:** the entrance, inside at the first boss, or at a chosen boss (a boss list: `.go creature`).
5. **Go and the recap.**

## What the server allows (research, session 60: the proxy's and the server's code)

- **The game's Looking for Group window does nothing here.** HermesProxy drops every LFG packet the 1.14.2 window sends (its LFG
  list, Looking for Group / More, and the meeting stones' join: no handlers), and nothing tells the client the tool is on. CMaNGOS
  has a meeting-stone queue that matches roles and forms groups of five, but the client can't reach it. So the Group Finder is
  Forever UI's own window, working through chat commands, with no proxy or server change.
- **Bots from the world, by role, already work:** say `lfg` in a channel (or near bots) and the random bots of your side within 4
  levels invite themselves into your group, by role: 1 tank, 1 healer, 3 damage for five, minus who's already in it (10, 20 and 40
  too). They stay random bots: they follow you, and leave when the group ends. They don't travel to you on their own.
- **Bots made for the group:** `.bot group size=5 gear=green|blue|epic role=…` creates bots at your level with roles that complete
  the group (`.bot create`'s keys). Always full, but made for you.
- **Getting there:** `summon` (whispered to a bot, or to the party) teleports bots to you for free because your account is a GM;
  otherwise it needs a meeting stone. Meeting stones summon one member at a time (both in the stone's level range).
- **In the dungeon:** `follow`, `stay`, `attack my target`, `pull`, `tank attack`, `max dps`, the `tank assist` / `dps assist`
  strategies, loot rules (`ll`), `formation`. A bot that doesn't know the dungeon hands leadership over.
- **Battlegrounds:** your group of bots queues with you (Join as Group reaches the server); random bots fill both sides when a real
  player is queued (every 30 s, balanced to the battleground's size; tanks and healers queue less often). The sides: Warsong Gulch
  5-10, Arathi Basin 8-15, Alterac Valley 20-40.
- **The re-gear:** `.bot init=green|blue|epic <name>` on any bot (Prepare for PvP's other team already does it).

## Questions for the user

1. **Who fills the group in play:** bots from the world (`lfg`: real random bots near your level, by role; they may be few in a
   quiet zone, and some seats can stay empty), bots made for the group (`.bot group`: always full), or the world first and made
   bots for the empty seats?
2. **Getting there:** walk (they come with you), summon them to you (free: you're a GM), or the whole group to the entrance at once?
3. **The level of play in play:** take the bots as they come, or re-gear them to Recruits / Regulars / Veterans (`.bot init`)?
4. **Battlegrounds:** keep the battlemaster (walk to a capital or a battleground's entrance) or queue from the Group Finder?
5. **Raids:** start with the 20-player raids (Zul'Gurub, Ruins of Ahn'Qiraj: the Mac's memory), or all?
6. **The window's place:** the Group Finder replaces Looking for Group (the `I` key, the micro button); Prepare for a Dungeon or a
   Raid goes in the GM window. Right?

## First steps once agreed

1. In game, with the user: a group of random bots invited by role at your level, into a dungeon (does the tank tank?).
2. The preview (dbsite/build): the Group Finder's three tabs and the GM flow's questions.
3. The engine: the team builder from GMSuite.lua's Prepare for PvP made shared; then the Group Finder's window; then the GM flow.

## The user's answers (session 60)

1. **Who fills the group:** bots from the world first (`lfg`), then bots made for the seats still empty: always full.
2. **Getting there:** the player chooses each time: walk together, walk and summon them at the entrance, or all at the entrance
   at once.
3. **Battlegrounds:** queued from the Group Finder, from anywhere, alone or with a team of bots as a group.
4. **Raids:** dungeons only for now; raids later.

5. **The level of play** (session 61): the bots re-geared, chosen per group (Recruits / Regulars / Veterans: `.bot init`).
6. **The window's place** (session 61): the Group Finder replaces Looking for Group (the `I` key, the micro button); Prepare for a
   Dungeon goes in the GM window as its third flow.

## The preview (session 61)

- **The Group Finder:** `dbsite/build/win_groupfinder.py` (http://127.0.0.1:8777/dbsite/mockups/groupfinder/). Forever's group finder
  layout (PVEFrame 563 × 428) in Forever UI's metal, red buttons and dropdowns: Dungeons, Raids (greyed: later), Battlegrounds on
  the blue menu; your role (the ones your class can take), the bots' gear, the dungeons by band coloured by your level, the card
  (banner, the door with a map pin, the bosses, the quests); Find Group fills the seats (the world's bots first, then made ones),
  then the ready dialog asks the way there. Battlegrounds: alone or with a team, their side's level, Join Battle / Join as Group.
- **Prepare for a Dungeon:** the GM playground's fourth view (`win_gm_playground.py`): the dungeon, your level, role, keys (each
  checked in the world database), potions and drink by level, who fills the group and how good, and where you start (the door or
  a boss: `.go creature id`).
- **Modern art** (the user: modern icons from wago, Forever UI's borders and buttons): `tools/asset-extract/groupfinder_art.py`
  fetches from Forever's client the 256 px role icons (atlas 2462), each dungeon's and battleground's loading screen (the banners),
  and the journal's dungeon pictures, into `(private files)` (private).
- Still the 1.14.2 client's: the blue menu behind the group buttons, the class icons, the quest and lock marks, the group buttons'
  icons (64 px).

## In game (session 61): Forever UI 0.241.0

- **GroupFinder.lua** (data: GroupFinderData.lua from `tools/asset-extract/group_finder_data.py`; art: Art/GroupFinder from
  `groupfinder_art.py --addon`, git-ignored): the window as the preview; the micro button and the I key open it
  (ToggleLFGParentFrame hooked); `/fui groupfinder`.
- **Find Group:** `lfg` in General and LookingForGroup (or say), from the click (1.14.2 sends to a channel only on a hardware
  event); a bot that joins is re-geared (`.bot init=<gear> <name>`); after 12 s the empty seats get `.rndbot create` bots at your
  level with their specs whispered; the ready dialog when five, or at 60 s. A joined bot's role is guessed from its class (the
  server's LfgAction chose it by its spec).
- **The way there:** Walk together (a pin on the door), Summon at the door (the pin; `summon` to the party within 40 yards of it),
  All at the door (`.tele`, then `summon`). Leave Queue leaves the group.
- **Battlegrounds:** Join Battle / Join as Group send `.bg queue <bg> [group]` (a server command of ours, 0.241.2), only from a
  capital or the battleground's zone (Warsong Gulch: Ashenvale or the Barrens; Arathi Basin: Arathi Highlands; Alterac Valley:
  Alterac Mountains: the user's rule); elsewhere the window says where to go. A team is made first (Prepare for PvP's way), the
  other side's level set for the next battle (GMSuite's watcher).
- **One side's dungeons** (the user): Ragefire Chasm shown to the Horde only, the Stockade to the Alliance only (GroupFinderData's
  `side`; the preview too).
- **Shared now:** `ns.CreateDropdownBox` (Widgets.lua; the Friends window uses it), `ns.BotCreateCommand`, `ns.BotRoleClasses`,
  `ns.BotNames`, `ns.BotSpecFor`, `ns.SetOtherTeam`, `ns.SendGMCommands` (GMSuite.lua).
- **Prepare for a Dungeon, built (session 63, 0.244.0):** GMSuite.lua's FLOWS.dungeon, the GM window's third flow (the Test
  tab's Dungeons, `/fui dungeon`, `/preparedungeon`): your side's dungeons in two columns, your level (`.levelup`), your role (the
  ones your class takes), keys, potions and drink by level, who fills the group (made for me: four `.rndbot create` bots with PvE
  specs; the world first: the Group Finder opens on the dungeon with your role and their gear, its Find Group your click), how
  good, and where you start (`.tele` the door or `.go creature id` a boss: GroupFinderData's bossIds; a made group summoned twice
  with `/p summon`). The window opaque now (ns.CreateDialogChrome's opaque, shared with the ready dialog: F0065).
- **To try in game:** `lfg` at a dungeon's level (do bots join by role? does the tank tank?), the made bots' login and specs, the
  summon at the door, the I key.

## Bring My Group (session 61, 0.242.0)

The user: quickly teleport the group to you inside a dungeon. Style A of the preview (dbsite/build/win_gather.py): Forever's red
button "Bring My Group", 8 over the first party frame, shown in a dungeon or raid with a group. One click: a bot that leads is
whispered `give leader` (PlayerBots' GiveLeaderAction), and once the lead is yours (PARTY_LEADER_CHANGED, 4 s at most) `.groupgo
<you>` brings everyone (inside an instance a GM may only bring the group it leads). Also: the I key now opens the Group Finder
(the game's Looking for Group window, made by its addon after ours, is closed when it shows: 0.241.4).
