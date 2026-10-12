# Changing the game: what's easy, what's work, what's out of reach

Research of 2026-09-30 (session 43; the user: "Modifying some items in the game to adjust stats and simple things. But also ...
new skins ... using the same skeleton and polygons. Harder things ... whole new zones that Forever has, like Riverglades").
Two read-only research passes: the server, database and HermesProxy; the 1.14.2 client and Forever's data. Nothing was changed.
Confidence per item: **verified** (read in the source or the local files), **source** (the code says so, not tried),
**docs**, **guess**.

## The two findings everything rests on

1. **HermesProxy already sends hotfixes to the 1.14.2 client**, and the client accepts them. The client's own
   `(a file on the server's Mac)` (2026-09-30) shows every row as `VALIDATION_RESULT_VALID`:
   2385 ItemDisplayInfo, 277 ItemSparse, Spell / SpellEffect / SpellMisc / SpellName, CreatureDisplayInfo, AreaTrigger, and new
   record ids the proxy made up. Two routes:
   - **Items, automatic.** When the server answers an item query, the proxy compares the server's item with its copy of the
     client's (`CSV/Item1.csv`, `ItemSparse1.csv`, `ItemEffect1.csv`) and hotfixes the differences
     (`HermesProxy-src/.../QueryHandler.cs:529-564, 901-957`; `GameData.cs:3972-4350`).
   - **Everything else, from files we edit.** At each realm login the proxy loads `CSV/Hotfix/*1.csv`
     (`(a file on the server's Mac)`; `GameData.cs:2214-2250`) and sends them
     (`HotfixSystem.cs:134`). Tables: Spell (text), SpellName, SpellMisc (icon), SpellEffect (values), SpellAuraOptions,
     SpellLevels, SpellXSpellVisual, SkillLine, SkillLineAbility, Item, ItemSparse, ItemEffect, ItemDisplayInfo,
     CreatureDisplayInfo(Extra). Rows can override the client's or add new ids.
   - The client keeps hotfixes in `_classic_era_/Cache/ADB/enUS/DBCache.bin` and query answers in `Cache/WDB/enUS/*.wdb`:
     delete both (game closed) after a change.
2. **The client loads no new files.** 1.14.2 has no loose-file switch (the strings are in the binary, no flag turns them on);
   Arctium's custom-file launcher is Windows-only and 1.14.4+; code patches to the packed arm64 binary were a dead end before
   (docs/server/modern-client-hermesproxy.md). The one open door: we already serve the client its build config
   (`scripts/patch_service.py`) and write local CASC storage (`scripts/casc_fetch.py`), so **rewriting the local CASC** (new root
   and encoding, CASCHost's model) might let new or replaced files in. Untested: see "The one experiment" below.

## Easy

| Change | Where | What the client shows | Confidence |
|---|---|---|---|
| Rates: XP, drops, rest, reputation, creature HP / damage | `mangosd.conf` 1058-1527 via `config/mangosd.overrides`; `.reload config` | Right (update fields) | verified |
| Vendors, loot, trainers, gossip, NPC text | `npc_vendor`, `*_loot_template`, `npc_trainer`, `gossip_menu`, `npc_text`; live `.reload` | Right; new text gets proxy ids that change on a proxy restart: clear DBCache | verified |
| Quests: text, rewards | `quest_template`, `.reload quest_template` | Right; clear questcache.wdb; a new quest id also needs a row in the proxy's `CSV/QuestV2_1.csv` | mostly verified |
| GM commands (`.additem`, `.modify`, `.aura`, `.learn`, `.npc add`) | the console / chat | Right | verified |
| Spawns, creature levels and stats | `creature`, `creature_template` (restart) | Right; renames: clear creaturecache.wdb | source |
| New NPCs or items with an existing look | new `creature_template` / `item_template` rows, existing display ids | New items become hotfixes on their own | verified (items) |
| Creature recolours from textures the client has | a `CSV/Hotfix/CreatureDisplayInfo1.csv` row (a model + up to 3 existing texture ids) plus the same id in the server's `CreatureDisplayInfo.dbc` and `creature_model_info` | Right after a proxy restart and a cache clear | source |
| UI | addons (ForeverUI) | | done |

## Doable with work

- **Item stats, names, prices, required level** (`item_template`, restart mangosd). The proxy asks for an item only when it
  exists as an object (bags, equipped). ItemSparse changes to an *existing* item are held until the next realm login (a live
  reply "crashes game", `GameData.cs:4232`): get the item, log out to the login screen and back. Vendor, loot and reward previews
  of items you don't own show stock values. Armor, weapon damage, stack size and flags alone don't trigger a hotfix
  (`GameData.cs:4145-4152`): change the sell price by 1 copper too. *verified*
- **Buff values, e.g. Well Fed.** Spells live in the `spell_template` table (`sql/base/dbc/original_data/Spell.sql`). The
  server side works after a restart; the tooltip uses the client's numbers ("$19705s1 Stamina") until a `CSV/Hotfix/SpellEffect1.csv`
  row (the client's SpellEffect id, new EffectBasePoints) and Spell / SpellName rows for new text are added. Fallback: an addon
  that rewrites tooltips (it can't give an unknown aura an icon). *server verified; hotfix route verified by the shipped rows*
- **New spells, auras, recipes.** `spell_template` rows plus hotfix rows (Spell, SpellName, SpellMisc for the icon, SpellEffect,
  SpellAuraOptions, SpellXSpellVisual); without them a buff has no name or icon. The proxy has **no SpellReagents loader**, so a new
  recipe's reagents don't show in the profession window without a C# change and a proxy rebuild. *guess / source*
- **Cooking skill-ups.** The colours come from the server's `SkillLineAbility.dbc` (a binary DBC edit, `Player.cpp:5080-5100`);
  the skill to learn from `npc_trainer.reqskillvalue` or the recipe item's required rank; the client needs matching
  SkillLineAbility hotfix rows (supported). *source*
- **Replacing an existing texture** (a creature or player skin everywhere it's used): only through the CASC rewrite. *docs*
- **A new creature skin under its own id**: the CASC rewrite for the texture, plus the CreatureDisplayInfo rows above. *docs*
- **New item looks with new textures**: ItemDisplayInfo hotfixes work, but new textures need TextureFileData rows the proxy
  can't send (a C# loader) and the CASC rewrite. *source*
- **A new selectable player skin**: client ChrCustomization* and TextureFileData rows (the proxy loads those only for WotLK),
  the server's `CharSections.dbc` (`Player::ValidateAppearance`, `Player.cpp:714`) and the proxy's customization map
  (`CharacterCustomizations.cs`). Replacing an existing skin's texture is far simpler. *source*
- **New mechanics in C++** (aura types, scripts): the core already carries our patches (docs/server/operations.md); a rebuild
  takes 12-25 minutes.
- **New models** (not just skins), loading screens, music: the CASC rewrite plus model tables; Forever's models come from a
  newer engine, so chunk versions may not match. *guess*

## Basically impossible

- **Forever's zones as they are (Riverglades).** Riverglades is not a new map: it's UiMap 2548 inside Eastern Kingdoms (map 0).
  Forever's map-0 WDT turns on **49 more ADT tiles** than 1.14.2's (736 vs 687, in three clusters: x24-26 y31-39, x43-45 y43-50,
  x23-26 y54-59); none of their files exist in 1.14.2. It would take: the tiles' ADTs and every WMO / M2 / texture they use, minimap
  tiles, a dozen DB2 tables the proxy can't send yet; and on the server a converter from modern split ADTs to CMaNGOS's 1.12
  map / vmap / mmap files (its extractor reads 1.12 MPQs by name), plus hand-made spawns, graveyards, flight paths. And part of
  Forever's zone data is **encrypted** (46 AreaTable and 8 Map rows under three TACT keys; "Riverglades" isn't in the readable
  part). A multi-month project at best, none at all if the tiles are encrypted too. *WDT, DB2 and extractor verified*
- **Features the 1.12 protocol and core don't have**: LFG, transmog, dual spec, achievements, new classes or races, levels above 60.
- **Client tables the proxy has no loader for** (Talent, SpellReagents, GameTables...) until the proxy is extended.
- **New client code** (a Forever engine feature): needs patching the packed binary.

## The food example (Forever's food tables, the user's shots)

102 lines, 100 recipes (Crocolisk Steak and Briny Seafood Stew twice), checked against `item_template` and `spell_template` in the
dump and the proxy's client item table:
- **(a) 49 lines (48 foods) exist with a side buff: only the buff changes.** Spiced Wolf Meat 2680 -> on-use 5004 -> Well Fed 19705
  +2 Sta / +2 Spi (Forever: +1 Agi); Monster Omelet 12218 -> 10256 -> 19710 (Forever: +15 Sta); Grilled Squid 13928 -> 18230 ->
  18192 +10 Agi (Forever: +1% crit); Mightfish Steak 13934 -> 18234 -> 18191 +10 Sta (Forever: +40 AP). Smoked Desert Dumplings
  already match.
- **(b) 19 exist with no side buff** (Brilliant Smallfish, Baked Salmon, Lobster Stew, Westfall Stew...); Plated Armorfish and
  Spinefin Halibut have no recipe at all.
- **(c) 34 lines (33 names) don't exist in 1.12 or 1.14.2**: the teas, the smoothies, Briny Seafood Stew, the raptor, stag and bear
  dishes. Each needs a new item (an existing look), recipe, food and Well Fed spells, a trainer or recipe item, SkillLineAbility,
  hotfix rows, and the proxy's SpellReagents loader for the reagents to show.
- **Catch:** food spells are shared (5004 serves six foods, 10256 four), so each food needs its own cloned food spell; a Well Fed
  aura can be shared per stat and value (about 58 pairs; 5 exist: 18191 Sta+10, 18192 Agi+10, 18193 Spi+10, 22730 Int+10,
  24799 Str+20). Every aura type needed exists in the 1.12 core.

**First step, a proof with one food:** Spiced Wolf Meat to +1 Agility. Clone 5004 and 19705 in `spell_template` under new ids
(MOD_STAT Agility +1), point item 2680's `spellid_1` at the new food spell; add Spell / SpellName / SpellMisc (the Well Fed icon) /
SpellEffect / SpellAuraOptions rows to the proxy's `CSV/Hotfix/*1.csv`; restart mangosd and the proxy, clear `Cache/ADB`, log in,
`.additem 2680`, log out to the login screen and back, then check the tooltip, the buff's icon and the stat. If it works, a script
makes the rest from the table.

## The one experiment for the file tier

Does 1.14.2 accept a rewritten local CASC (a new root, encoding and build config) without repairing it or failing with #154?
Every file change depends on it. On a copy (`(a file on the server's Mac)`): replace one common texture (a boar skin tinted red), write the
new root / encoding / build config, point a second `patch_service.py` (another port) at it, log in. A red boar opens the file tier;
#154 or a silent repair closes it. A second check, with WoW Forever closed and the user's OK: whether Forever's Riverglades ADTs
(e.g. FileDataID 5314280) read or are encrypted.

Sources: the local files and sources cited; https://github.com/Arctium/WoW-Launcher, https://github.com/WowDevTools/CASCHost,
https://wowdev.wiki/TACT.
