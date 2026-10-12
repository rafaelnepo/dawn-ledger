# Professions: what the server, the proxy and the client allow

Research part C of the professions plan (2026-10-10, unattended). Read-only: the CMaNGOS source (`(the server's checkout)`), its DBCs
(`(the server's checkout)`), the world database `classicmangos` (SELECT only), HermesProxy’s source (`(a file on the server's Mac)`)
and installed CSVs, the 1.14.2 client’s tables (wago.tools, build 1.14.2.42597, cached in `(private files)`), the
client’s own `Logs/Hotfix.log` and the proxy’s logs. It builds on [game-modding-research.md](../../specs/game-modding-research.md)
(session 43). Confidence: **verified** (seen working in game, in a log or a count), **source** (the code says so, not tried),
**guess**.

## The verdict

| Idea | Possible? | How | Cost and risk |
|---|---|---|---|
| A new profession (Jewelcrafting, Inscription, Woodworking…) | Yes | Server: rows in SkillLine.dbc, SkillRaceClassInfo.dbc, SkillLineAbility.dbc; `spell_template` rows. Client: the same three tables and Spell rows by proxy hotfix, as Riding (762) already is | Medium: a DBC writer to make (none exists), one profession as a proof first |
| New recipes in today’s professions | Yes | `spell_template` + hotfix rows; skill-ups need a SkillLineAbility.dbc row | Medium: the window shows no reagents, tools or anvil until the proxy learns SpellReagents, SpellTotems, SpellCastingRequirements (a C# loader, like the Faction one) |
| New items, any id | Yes, today | `item_template` row with an existing look; the proxy builds the client’s row itself | Low (verified) |
| A green made blue | Yes, as a second item | A quest that takes A and gives B (no code); a “reforge” recipe; a chance on craft (mangosd patch) | Low / medium / medium |
| Crafted gear with a random suffix | Yes | `item_template.RandomProperty`; crafting rolls it | Low |
| Specializations, three per profession (Cooking, Fishing, First Aid too) | Yes | Marker spells learned by quests, as Armorsmith; recipes, trainers and loot gated on them | Low to medium; unlearning needs C++ |
| Skill trees | Partly | Nodes are learned spells; prerequisites and choices by trainer fields and conditions; Forever UI draws the tree | Unlocks and +skill: low; procs, yield, savings: mangosd patches |
| Recipe-teaching quests | Yes, today | `RewSpellCast` = a teach spell, or recipe items as a choice of rewards | Low |
| Woodcutting with its own skill | Yes, with code | A lock type mapped to a skill (C++), Lock.dbc rows, client Lock and LockType rows (no loader), a gather spell needing an axe | High |
| Woodcutting without a skill of its own | Yes, no code | Chest-type nodes on existing tree and log models; loot gated on an axe in the bags and the Woodworking skill | Low |
| Minimap tracking of new nodes | Not by the engine | The engine’s blips don’t draw here at all; Forever UI’s own node icons | Low (addon) |
| Jewelcrafting gems and sockets | No sockets | 1.12 has a permanent and a temporary enchant slot only; gems as enchants, or a C++ slot | High, guess |
| Inscription glyphs | No | No glyph system; scrolls, vellums, off-hands, cards instead | Low to medium |
| Archaeology as Blizzard made it | No | No survey effect, no UI, no tables; a version from dig-site chests, fragments and restoration recipes | Medium |
| Milling, prospecting | Not as such | A recipe that makes a container opened for random contents | Low |
| Sharing with alts | Partly | Mail (across factions by one config line), Forever UI shows every alt’s recipes, more professions per character by config | Low; shared recipes need C++ or offline SQL |
| New icons, models, textures | No | The client loads no new files: about 2,700 icons and 1,634 object models to choose from | — |

## 1. Skill lines

**The client.** 1.14.2 has 122 SkillLine rows, the 1.12 set and nothing more: no Jewelcrafting (755), Inscription (773),
Archaeology (794), nor Riding (762). *Verified* (the wago table). WoW Forever’s 1.60.1 adds no new profession either: Riding,
Engraving, Runes, a “Test Profession [DNT]” and a child line per profession (2937-2948, “Alchemy” under 171: the modern tiers).

**The server.** SkillLine.dbc holds 123 rows, the client’s plus 762 Riding; SkillLineAbility.dbc 5,072 rows. The DBC files are the
extractor’s originals (2026-09-13): nothing on the server side has ever edited a DBC. *Verified.*

**How CMaNGOS keeps a skill.** *Source.*
- A profession rank is a spell with effect 44 (SKILL_STEP, misc = the skill id); `Player::SetSkillStep` looks up the skill’s
  SkillRaceClassInfo row and its SkillTiers row for the rank’s 75 / 150 / 225 / 300. No row there, no skill.
- `Player::_LoadSkills` skips (and logs) a character’s skill whose id isn’t in SkillLine.dbc: the server must know the line.
- Category 11 (`IsPrimaryProfessionSkill`) counts toward `MaxPrimaryTradeSkill = 2` (mangosd.conf, a config line).
- Category 9 gets ranks only for Cooking, Fishing, First Aid and Riding (`IsProfessionSkill`, hard-coded in SpellMgr.h); any
  other secondary skill stays at 1 / 1. A new secondary profession needs a one-line mangosd patch; a new primary one doesn’t.
- Skill-ups from crafting come from the server’s SkillLineAbility (`Player::UpdateCraftSkill`); a recipe without a row still
  crafts, it just teaches nothing.

**Can a proxy hotfix add a row the client doesn’t have?** Yes. *Verified.* The proxy ships rows for Riding, which the 1.14.2
client lacks: SkillLine 762, SkillRaceClassInfo, SkillLineAbility 15029-15030, Spell and SpellName 33388-33392. The client’s own
Hotfix.log (2026-10-10) takes each as `VALIDATION_RESULT_VALID` (“1100001 Table SkillLine RecID 762”), 24 of our characters know
33388, 46 have skill 762, and Forever UI’s Skills tab shows Riding. The rows are sent by `GameData.LoadHotfixes`
(SkillLine, SkillRaceClassInfo, SkillLineAbility, Spell, SpellName, SpellMisc, SpellEffect, SpellLevels, SpellAuraOptions,
SpellXSpellVisual, Item, ItemSparse, ItemEffect, ItemDisplayInfo, CreatureDisplayInfo, Faction). Riding’s spells are passive:
a *castable* spell under a new id is the one thing not yet seen.

**What a new profession needs.**
- Server: SkillLine.dbc (the name, category 11), SkillRaceClassInfo.dbc (who may learn it, a SkillTiers id), SkillLineAbility.dbc
  (each recipe’s skill and colors); `spell_template` rows for the ranks (effect 44 and 47, as 2018 Blacksmithing), the recipes and
  the teach spells (effect 36); trainers (`npc_trainer`), items, quests. A small DBC writer (header, fixed records, a string
  block); the readers exist (tools/progression).
- Client, by `CSV/Hotfix/*1.csv`: SkillLine, SkillRaceClassInfo, SkillLineAbility, and per spell SpellName, Spell, SpellMisc (the
  icon, cast time), SpellEffect (the item made), SpellLevels, SpellXSpellVisual. Then clear DBCache.bin and WDB (F0079).
- Forever UI: a row in `PROFS` (Professions.lua 57-77: the skill’s name, icon, the spell that opens its window), a journal.
- The icon from the client’s own: `inv_misc_gem_01` (Jewelcrafting), `inv_scroll_*` or `inv_feather_*` (Inscription),
  `inv_misc_shovel_01` (Archaeology). The modern profession icons aren’t in 1.14.2.

## 2. Recipes and items

**No hidden recipes in the client.** *Verified, counts.*
- SpellName: 21,353 in the client, 22,374 in `spell_template`. 315 are the client’s alone: Season of Mastery’s raid mechanics
  (36xxxx), store and service items; none a trade skill. 1,336 are the server’s alone (“zzOLD” spells and other dead 1.12 ids).
- SkillLineAbility: the client’s 5,070 and the server’s 5,072 match except Riding (2), GENERIC (1) and one Demonology row. Season
  of Mastery added no recipe.
- Recipe spells in both that no trainer, recipe item, quest or new character teaches: about a dozen, e.g. 12719 Explosive Arrow,
  12720 Goblin “Boom” Box, 12722 Goblin Radio, 12900 Mobile Alarm, 12904 Gnomish Ham Radio, 11447 Elixir of Waterwalking. The
  client already knows their reagents: ready-made quest rewards.

**Items.**
- ItemSparse: 17,612 in the client, 17,730 in `item_template`. 20 are the client’s alone (the WoW Token, Chronoboon Displacers,
  Season of Mastery’s packages); 138 the server’s (test items, our 60001-60016).
- 3,403 ids exist in both but nothing gives them out (no loot table, vendor, quest, made-by spell; scripts not counted): 1,093
  armor, 667 weapons, 825 recipes (mostly old class tomes). 361 are green or blue gear that isn’t a monster or test item, e.g.
  4110 Master Hunter’s Bow, 5743 Prismstone Ring, 7187 VanCleef’s Boots. Reusable, but not needed: see the next point.
- **A new item id works.** When the client asks for an item it lacks, the proxy asks the server and builds the row
  (`HotfixSystem.HandleDbQueryBulk`, `GameData.GenerateItemSparseUpdateIfNeeded`: “item is missing so add new record”). The
  proxy’s logs of 2026-10-08 and 10-09: “ItemSparse #60001 created”, #60002, #60011, our Winterspring items. The one condition:
  its display id has an icon in `ItemDisplayIdToFileDataId1.csv`, an existing look. *Verified.*
- **A changed item needs item_hotfixes.py.** The client keeps its own name, icon, quality, prices, stats for an item it knows; the
  proxy’s live reply for a known item “crashes game” (its comment), so changes wait for a prepared row. The script reads every
  `UPDATE item_template` in server/world-patches, takes the client’s own row from wago and writes the server’s values (name,
  quality, races, classes, level, skill, prices, binding, lock, stats, armor, damage) after the shipped rows of
  `CSV/Hotfix/ItemSparse1.csv`, icons into `Item1.csv`; then the proxy restarts and DBCache.bin and WDB go, client closed.

**A new recipe spell.** The server is easy (`spell_template`: reagents, `Totem1-2`, `RequiresSpellFocus`, the item made). The
client needs the rows above; three tables have no proxy loader: SpellReagents (the reagent list in the window and tooltip),
SpellTotems (“Requires Blacksmith Hammer”), SpellCastingRequirements (“Requires Anvil”). Their hashes are in `DB2Hash.cs` and the
client’s tables are simple (SpellReagents: ID, SpellID, eight reagents, eight counts). Without them crafting works, the server
checks everything, and the window shows the recipe with no reagents. Two ways: a C# loader like session 69’s Faction one (a
rebuild with (a file on the server's Mac) an install), or Forever UI showing reagents from its own data (it wraps `GetTradeSkillReagentInfo`).
The loader is cleaner.

## 3. Upgrading quality

**Quality belongs to the item, not the copy.** `item_template.Quality` and the client’s `OverallQualityID`; 1.12 has no item
level or bonus per copy. A green becomes a blue only by becoming another item. *Source.*

| Way | What it takes | What the client shows | Verdict |
|---|---|---|---|
| A quest takes item A (and materials), gives item B | `quest_template` ReqItemId / RewItemId, repeatable; conditions for who sees it | B’s own row (a new id: built by the proxy) | **Cleanest first step**, no code |
| A recipe that eats A and makes B (a “reforge”, as transmutes do) | A spell with A as a reagent; a SkillLineAbility row for skill-ups | The recipe; its reagents only with the SpellReagents loader | **Cleanest long term**, a crafting step |
| A chance on craft to make B instead of A | A mangosd patch in `Spell::DoCreateItem` (“1 item will be created regardless of specialization”) reading a table | B arrives in the bags | Medium; `skill_extra_item_template` (206 TBC rows) already exists in the database, unread by the classic core |
| An enchant on top | `SpellItemEnchantment` (1,460 server, 1,475 client) | “Enchanted: …” in green; the name keeps its color | Only existing enchant ids (no loader) |
| A random suffix (“of the Bear”) | `item_template.RandomProperty`; `DoCreateItem` calls `GenerateItemRandomPropertyId` | The name and stats, as world greens do | Easy variety, not a color change |
| Raising the template’s quality | `item_template` + item_hotfixes.py | Every copy changes | Not an upgrade |

Item B should be a new id: the proxy builds its client row from the server (name, quality color, stats), with no hotfix file
to keep.

## 4. Specializations and trees

**How 1.12 does it.** *Verified in the database.* The ten specializations are marker spells: effect 47 (TRADE_SKILL), no aura —
9787 Weaponsmith, 9788 Armorsmith, 17039-17041 the master smiths, 10656 / 10658 / 10660 the leatherworkers, 20219 / 20222 the
engineers. A quest teaches one (5283 “The Art of the Armorsmith”: `RewSpellCast` 9790, whose effect 36 teaches 9788). Then:
- 98 items need one (`item_template.requiredspell`): “Plans: Dark Iron Plate” needs 9788; Gnomish devices need 20219. The client
  says “Requires Armorsmith” from its own ItemSparse.
- Unlearning is C++: ScriptDev2’s `npc_professions.cpp` (gossip, a price, the recipes removed).

**What the server also offers, unused today.** *Source.*
- `npc_trainer.ReqAbility1-3`: a trainer spell shown red until a spell is known (`Player::GetTrainerSpellState`).
- `npc_trainer.condition_id`: any condition, e.g. 17 (CONDITION_SPELL, with a “hasn’t” flag), 7 (a skill value), 8 (a quest
  done).
- `condition_id` on loot rows (fishing, objects, creatures, items): a Fishing specialist’s own catches, no code.

So **Cooking, Fishing and First Aid** take specializations the same way: a marker spell from a quest, recipes and catches gated
on it.

**A tree.** Talent.dbc is class-only and the proxy sends no Talent rows: a tree is made of spells instead.
- **Nodes:** learned spells (`character_spell` on the server). The client knows a node once its id has hotfix rows
  (`IsSpellKnown`); `tools/inspect_export.py` already writes server data into ForeverUIServerData at each launch.
- **Learning:** the trainer window does most of it: a price, a skill threshold (`reqskillvalue`), prerequisites (ReqAbility),
  “one of three” (`condition_id`: hasn’t learned the other two). Forever UI can draw it as a tree. Or a gossip menu with
  conditions and `dbscripts_on_gossip` casting a teach spell (command 15).
- **Unlearning:** no dbscript command removes a spell: C++ (a gossip script like `npc_professions.cpp`) or a GM command.
- **Effects without code:** recipe unlocks; +skill (aura 98, as Cultivation 20552 and Engineering Specialization 20593, +15);
  any stat or utility aura.
- **Effects with code:** an extra or better item on craft, more ore or herbs, saved reagents, faster crafting (spell modifiers
  can’t pick out profession spells: their family is 0). Each a hook in mangosd.
- **Not usable:** quest flags for our own quests. Ids from 60001 have no row in the proxy’s `QuestV2_1.csv`, so
  `IsQuestFlaggedCompleted` never turns true (the proxy’s ChatHandler.cs says so).

**Recipe-teaching quests** are 1.12’s own: 220 quests use `RewSpellCast`. A choice of one recipe: recipe items in
`RewChoiceItemId1-6`.

## 5. Woodcutting

**Nodes.** A gathering node is a gameobject of type 3 (chest): `data0` a lock, `data1` a loot table. We already have 626 objects
of our own (from 500000), among them a gathered material: Dry Pinewood (500012, world 022: the PeasantLumber01 model, lock 43,
loot 60013). Tree and log models that both the server and the client have: 927 IronForgeTree01, 967 ArathiTree04, 2474
DeadwindPassMidTree02, 5975 WestFallTree01, 4951 g_sapling01, 6158 AeriePeaksStump01, 1108 / 1109 lumber piles. *Verified.*

**A skill to gather with.** `Spell::CanOpenLock` turns the lock’s type into a skill by `SkillByLockType` (SharedDefines.h), which
knows four: lockpicking, herbalism, mining, fishing. Woodcutting would need:
- C++: a lock type mapped to the new skill (7, “Calcified Elven Gems (DND)”, is used by one lock; or a new 20);
- Lock.dbc rows by tier (209 locks today; herbs use 34, ore 18);
- the client’s Lock and LockType rows (the name on the cursor and the “Requires Woodcutting (75)” line): the proxy has no
  loader for either;
- a gather spell, effect 33 (OPEN_LOCK) with the lock type, `Totem1` an axe, as Mining 2575 needs Mining Pick 2901 (Skinning
  8613: Skinning Knife 7005); without a SpellTotems loader the client doesn’t say so, the server refuses;
- the skill line (section 1), and the bots: playerbots read `SkillByLockType` too.

**Without code.** Nodes with lock 43, as Dry Pinewood; loot rows gated by condition 2 (an axe in the bags) and condition 7 (the
Woodworking skill): better wood as Woodworking rises, the skill gained by crafting (as Smelting does for miners). Loot
conditions are 16-bit ids and don’t work on reference rows (session 73).

**Tracking.** Find Herbs is aura 45 (track resources) by lock type. In our client the engine draws no blips even for herbs
(`GetTrackingTexture()` stays nil: docs/specs/gathering-map-and-minimap-plan.md). Forever UI’s own node icons, from exported
spawns, already cover herbs and ore and would cover wood.

## 6. Other limits and levers

- **No new files.** Icons, models and textures come from 1.14.2’s own; the rewritten-CASC experiment
  (game-modding-research.md) is still untried.
- **Proxy loaders** are the bottleneck: SpellReagents, SpellTotems, SpellCastingRequirements, Lock, LockType,
  SpellItemEnchantment, ItemRandomProperties and GameObjectDisplayInfo have none. Each is a small C# loader writing the client’s
  field order, then a build (`dotnet publish`, .NET 10 in (a file on the server's Mac)), an install with the old program kept, and the client’s
  DBCache.bin and WDB moved aside.
- **mangosd patches** follow the 17 in tools/server-patches (a rebuild, the old binary kept, re-signed copies).
- **A DBC writer** is new work; every new skill line, recipe skill-up or lock needs it.
- **Live or next login:** a new item reaches the client live; a changed one at the next login after item_hotfixes.py; any
  hotfix file change needs the caches cleared.
- **Config levers:** `MaxPrimaryTradeSkill` (2) lets one character hold more professions; `AllowTwoSide.Interaction.Mail` (0)
  lets alts of both factions mail each other materials and crafts.
- **Alts in Forever UI:** ForeverUIDB is account-wide and inspect_export.py writes every character’s skills at launch: a tooltip
  can say which alt knows a recipe. Truly shared recipes (crafting with an alt’s) need C++ or a careful offline copy of
  `character_spell` rows (a characters-database write, with an undo).
- **Things the 1.12 protocol lacks:** sockets (only a permanent and a temporary enchant slot), glyphs, Archaeology’s survey and
  research tables (1.14.2 ships no Archaeology UI), milling and prospecting effects, per-copy item levels.

**Proofs before any plan is built:** one recipe under a new spell id that makes a new item (checks a castable hotfixed spell and
the window); then one small profession end to end (checks the DBC writer, SkillRaceClassInfo and the trade skill window for a
skill line the client never had).
