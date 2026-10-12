# Professions, part F: new professions and the systems around them

Design for the professions plan (2026-10-10, unattended). It builds on parts A–D: what 1.12 and WoW Forever have
([01](01-forever-and-classic.md)), our server today ([02](02-our-server-audit.md)), what the server, proxy and client allow
([03](03-feasibility.md): it wins wherever 01 differs) and what later expansions and other servers did
([04](04-later-expansions-and-other-servers.md)). The existing crafts are part E1 (05) and the gathering and secondary skills
part E2 ([06](06-gathering-and-secondary-design.md)); this part covers only what is new: new professions, quality upgrades,
skill trees, alts. Read-only: SELECTs on `classicmangos`, the server’s DBCs and the cached 1.14.2 tables; nothing changed.
Confidence as in 03: **verified** (seen in the data), **source** (the code says so), **guess**.

## The answer in one table

| Candidate | Verdict | Kind | Why | Order |
|---|---|---|---|---|
| **Survival** (camp, fire, wood) | **Build** | secondary, the client’s own line 142 | the cheapest real profession: the client already has the line and two of its ranks; every alt can learn it; it gathers wood for everyone | 1 |
| **Jewelcrafting** | **Build** | primary, new line 755 | 1.12 makes no ring or necklace; every gem exists; the ring and neck enchant slots sit empty | 2 |
| **Inscription** (with Cartography) | **Build** | primary, new line 773 | the 24 stat scrolls exist and nobody writes them; vellums let one alt’s enchants travel to another; vanilla’s cut cartographers are still in the data | 3 |
| **Archaeology** | **Build** | secondary, new line 794 | the best vehicle for “the world is the hero”; cheap in code, heavy in writing | 4 |
| **Woodworking** | **Decide after 1–3** | primary, new line | bows, crossbows, staves, wooden shields: no 1.12 craft makes them; but it is a whole craft to fill | 5 |
| Gardening | Fold into Survival | a path | 1.12 already has a garden pouch (Evergreen Pouch) | with 1 |
| Cartography | Fold into Inscription | a path | its two trainers are a mirrored pair already | with 3 |
| Fletching | Fold into Woodworking | a path | arrows and bows belong with the wood | with 5 |
| Forever’s Comprehension | Fold into Archaeology | restorations | deciphering is what an archaeologist does | with 4 |
| Runecarving | **Drop** | — | no 1.12 tradition (runeforging is the death knights’, after 1.12); nothing it adds that Inscription or Enchanting can’t | — |

Systems: one **quality-upgrade** design for every craft (quest swap now, recipe later, §B); **skill trees** made of learned
spells with nodes earned by lessons, tests and places, drawn by Forever UI (§C); **alts** through config, Forever UI’s
account-wide knowledge and a family workshop (§D); **proofs first** (§E).

## Local finds that shape the plan

All *verified* in the world database or the cached client tables.

- **Survival is half built.** Client SkillLine 142 “Survival” (category 9, icon 136235) with two abilities, Basic Campfire 818
  and Bright Campfire 7359. The server holds its rank spells: 1290 “Basic Campfire” (teaches 818, skill step 1 on 142) and 7361
  “Bright Campfire” (teaches 7359, step 2); the client knows both ids. SkillRaceClassInfo row 865 lets every race and class learn
  142 but has **tier 0**, so no cap. Bright Campfire summons object 31511 whose trap casts Cozy Fire 7358: **+8 Spirit** nearby
  (Basic’s is +4). An unspawned “World Survival Trainer” (5029) remains.
- **Vanilla’s cut Cartography left a mirrored pair:** Kitari Farseeker (Darnassus faction, “Cartography Trainer”) and
  Alexander Lister (Undercity faction, “[UNUSED]”), plus Talegon, “Cartography Supplier”. Also unspawned: Thornton Fellwood,
  “Woodcrafter”, and Harl Cutter, “Woodcrafting Supplier”.
- **The scribe trade exists without scribes.** Six stat scrolls in four ranks (24 items: Scroll of Stamina to Scroll of
  Strength IV) only drop or are sold. Adair Gilroy (Librarian, Stormwind) and Salazar Bloch (Book Dealer, Undercity) both sell
  Blank Parchment and Engineer’s Ink; Deneb Walker (Refuge Pointe) and Balai Lok’Wein (Brackenwall Village) sell scrolls.
- **No crafted jewelry.** The only rings or necklaces a spell makes are Zul’Gurub’s talismans. In 1.12 Enchanting can’t enchant
  rings or necklaces, so their permanent enchant slot is always empty. The client’s 1,475 enchantments include single-stat ones
  from +1 to +9 (ids 68–109, 343–352): reusable without a loader.
- **1.12 already upgrades by quest:** the Zandalar talismans (quests 8041–8044: Strength of Mugamba green → blue → blue → Rage
  of Mugamba epic, each taking the previous one) and the dungeon sets (quest 9002 takes the blue Lightforge Helm and Breastplate
  and gives the epic Soulforge Helm).
- **1.12 already gardens:** Evergreen Pouch (11020) casts Cultivate Packet of Seeds (13399): 2 Un’Goro Soil and a Packet of
  Tharlendris Seeds become a harvest, every 10 minutes.
- **Woods with 1.12 names:** the druids’ Rebirth seeds are Maple, Stranglethorn, Ashwood, Hornbeam and Ironwood (levels 20–60):
  five wood tiers the world already names. Wood looks to reuse: Splintered Log, Bundle of Wood, Whitestone Oak Lumber,
  Heartswood, Sundried Driftwood.
- **Dig-site models:** Mound of Dirt, Ancient Relic, Mathystra Relic, Highborne Relic Fragment, Atal’ai Artifact, Flagongut’s
  Fossil, Kodo Bones. **Unused artifacts** both sides know: Earthen Sigil (20525, a blue trinket) and Prismstone Ring (5743).
- **Teachers already standing:** the Explorers’ League (the Hall of Explorers; Bael Modan’s Prospector Khazgorm and Digger
  Flameforge; Prospector Ryedol at Uldaman; Jaron Stoneshaper in Winterspring), Sage Truthseeker in Thunder Bluff (The Platinum
  Discs, Portents of Uldum), Montarr the Lorekeeper at Freewind Post, Jarkal Mossmeld at Kargath, Grand Mason Marblesten of
  the Royal Stonecutters Union, Terry Palin the lumberjack at Eastvale, the bowyers of every capital.
- **Skill from a quest needs our code:** classic’s skill effect (118) is an empty stub, so quest-given skill points need the
  quest → (skill, points) table the Lockpicking design already proposes (lockpicking-single-player.md).
- **Free ids:** spells 90000–99999 (in neither table; the server’s highest is 33392); SkillLineAbility from 47000; skill lines
  755, 773 and 794 (retail’s numbers) are absent from 1.14.2; items from 61001 (item_edit.py), objects from 500000, quests and
  creatures above 60123.

## A. New professions

### A0. The shared route

Every new profession uses the same parts; the per-profession sections list only what differs.

| Piece | Server | Client (proxy hotfix rows) | Forever UI | Cost |
|---|---|---|---|---|
| The skill line | SkillLine.dbc row (category 11 primary, 9 secondary) | SkillLine | a `PROFS` row, an icon from 1.14.2 | DBC writer (new tool) |
| Who may learn it, its cap | SkillRaceClassInfo.dbc, a SkillTiers id reused (Blacksmithing’s 41, Cooking’s 61) | SkillRaceClassInfo | — | writer |
| Ranks | four spells: effect 44 (step) + 47, taught by effect 36 | Spell, SpellName, SpellEffect… | rank bar, rank-up toast | low |
| The window | the opening spell (effect 47) | its rows | the Professions book card | **the unknown**: does 1.14.2 open a trade window for a line it never had? (proof 3) |
| Recipes | `spell_template` 90000+, SkillLineAbility.dbc for skill-ups | SpellName, Spell, SpellMisc, SpellEffect, SpellLevels, SpellXSpellVisual; **SpellReagents, SpellTotems, SpellCastingRequirements** (loaders to write) | categories, journal | medium |
| Secondary ranks | `IsProfessionSkill` gains the line (SpellMgr.h, one line) | — | — | a mangosd rebuild |
| Items | `item_template` from 61001, existing looks | built live by the proxy | — | low |
| Teachers, quests | `npc_trainer`, `quest_template`, both sides | — | journal pages, pins | content |
| Skill from quests | the quest → (skill, points) table | — | — | a mangosd patch, shared with Lockpicking and Poisons |

After any hotfix change: proxy restart, then DBCache.bin and WDB moved aside together with the client closed (F0079).

### A1. Survival (secondary, line 142)

**Origin in 1.12.** Living off the land is everywhere in the world and nowhere in the skill list: Ironforge’s mountaineers in Loch
Modan, the Sentinels of Ashenvale, Terry Palin’s loggers at Eastvale, the Warsong lumber camp the Sentinels fight, tauren
hunters at Camp Taurajo, and Hemet Nesingwary’s expedition in Stranglethorn, which welcomes both sides. Blizzard planned
the skill before release and cut it in the beta; the line and its campfires stayed in the client.

**What it gathers and uses.**
- **Wood, without a skill of its own** (03’s no-code route): deadfall, stumps and lumber piles as chest-type nodes on the
  client’s tree and log models (Dry Pinewood, world 022, is the precedent). A Woodsman’s Axe in the bags (condition 2) and the
  Survival skill (condition 7) decide what a node gives. Five tiers named by the druids’ seeds: **Maple** (Elwynn, Teldrassil,
  Mulgore, Tirisfal), **Stranglethorn** (the jungle), **Ash** (Ashenvale), **Hornbeam** (the Hinterlands, Feralas), **Ironwood**
  (Felwood, Winterspring). Simple Wood stays the vendor’s.
- Flint and Tinder, hides, cloth scraps, herbs; Gardening adds soil and water.

**What it makes, and why one player wants it.** Campfires in four tiers (Basic +4 Spirit and Bright +8 exist; two more as new
spells); torches; a Traveler’s Tent (health and mana regeneration around it, rested experience being off since session 66);
**field stations**: a cooking fire and a portable anvil, as spell-focus objects for the *ordinary* foci only (never
the Black Anvil or the Alchemy Lab: those stay places); arrows and bolts in bulk (also Woodworking’s, §A5); Gardening’s herbs
and produce. Forever’s “Camping” (01 §2.4) is the model: each object a small, one-hour help for yourself.

**Three paths** (chosen by quest, §C):

| Path | Teacher (Alliance / Horde) | Gives |
|---|---|---|
| Fieldcraft | Thelsamar’s mountaineers / Camp Taurajo’s braves | better fires and tents, field stations, travel aids (a “Pathfinder’s Kit”: run speed out of combat) |
| Woodcraft | Astranaar’s Sentinels (fallen wood only) / Splintertree Post’s Warsong (felling) | the next wood tier sooner, Heartwood from old trees, more wood per node (a hook, §C), arrows |
| Gardening | Nighthaven, Moonglade (the Cenarion Circle, both sides) | garden pots that grow herbs and produce from seeds, soil and water on a 10-minute cooldown, as the Evergreen Pouch does; Hops and Okra (today quest-only, 02 §2) get a use |

Ashenvale is the point of the Woodcraft pair: the same forest, two teachings. The Sentinels take only what has fallen; the
Warsong fell trees and know the forest’s anger. Same mechanics, two voices.

**Tree outline.** Per path: a node at 75 (a recipe set), 150 (+15 Survival, aura 98, as Cultivation), 225 (the path’s signature
object) and 300 (a capstone: Fieldcraft’s Blazing Campfire, +12 Spirit; Woodcraft’s Ironwood Heartwood; Gardening’s rare-herb
pot).

**Ranks.**

| Rank | Skill | Level | Alliance | Horde |
|---|---|---|---|---|
| Apprentice | 1–75 | 5 | Stormwind, Ironforge, Darnassus (beside the cooks) | Orgrimmar, Thunder Bluff, Undercity |
| Journeyman | 50–150 | 10 | the same | the same |
| Expert | 125–225 | 20 | a quest at Thelsamar | a quest at Camp Taurajo |
| Artisan | 200–300 | 35 | Nesingwary’s Expedition, Stranglethorn: one test for both sides | |

**The camp for every profession** (hooks from part E2, 06): the other professions’ camp objects (06’s Tanning Rack, Lodestone,
First Aid Kit, the Big-Game Skinner’s trophies, and 05’s for the crafts) are made by their own profession and need a campfire
nearby to set up (`RequiresSpellFocus` 4, the campfire focus: no code). Survival’s fire is the camp’s heart, as in Forever,
where a fire holds three objects. Cooking keeps teaching Basic Campfire too (06); 06’s Emerald Circle jobs supply Gardening’s
seeds.

Rank quests (sketches): Expert, a night on the trail (build a fire, a tent and a field station at three marked camps on the
way to the teacher); Artisan, Nesingwary’s test (a week’s camp in the jungle for his hunters: wood, fire, food, a shelter).

**Technical route.** No new skill line. Server: SkillRaceClassInfo row 865 gets Cooking’s tier (a one-field DBC edit, the first
job for the writer); `IsProfessionSkill` gains 142; ranks 1 and 2 are 1290 and 7361 as they are, ranks 3 and 4 two new spells;
an opening spell “Survival” (effect 47); recipes and SkillLineAbility rows. Client: SkillRaceClassInfo 865 by hotfix, the new
spells’ rows. Nodes: objects from 500000, loot gated as above; Forever UI’s node icons (the engine draws no blips here).
**Naming:** hunters already have a “Survival” line (51, their talent tree); a hotfix can rename 142 (“Fieldcraft”?): the user’s
call.

**Cost: low to medium.** About 45 recipes, 25 items, 5 woods, 9–12 teachers, 10 quests, ~150 node spawns, one DBC edit, one
mangosd line.

### A2. Jewelcrafting (primary, line 755)

**Origin in 1.12.** Gem-cutting is old craft in Ironforge: the Royal Stonecutters Union (Grand Mason Marblesten) and the
Explorers’ League’s prospectors, who sort stones out of every dig. Gnomes grind lenses; Stormwind sells arcane trinkets
(Charys Yserian). On the Horde side the Zandalar tribe on Yojamba Isle make 1.12’s finest jewelry, the talismans of Zul’Gurub;
Darkspear charm-makers work bone and stone; and Lordaeron’s court jewelers, those who rose Forsaken, still work in the Undercity
(our own story, in 1.12’s present).

**What it gathers and uses.** Ores, by **prospecting as a recipe** (03 §2: there is no prospecting effect): five ore of one kind
make a sifted bundle, a container that opens to one or two of that ore’s gems, as TBC’s tables give them (04 §1: Copper into
Tigerseye, Malachite, sometimes Shadowgem; up to Thorium into Star Ruby, Large Opal, Blue Sapphire, Azerothian Diamond, Huge
Emerald). **Gem exchange** turns three of an ore’s common gems into one of its rarer ones, so any gem can be reached without
luck. Silver, Gold, Truesilver, Mithril and Thorium bars for settings; pearls; Un’Goro’s power crystals; Arcane Crystal.

**What it makes.**
- **Rings and necklaces** at every rank, green and then blue by upgrade (§B): two ring slots and the neck, filled for the first
  time by a craft.
- **Settings:** a permanent enchant on a ring or necklace, using a gem and an *existing* enchantment id (proposed: Tigerseye as
  +2 Agility, enchantment 75; Citrine as +5 Strength, 107; Huge Emerald as +8 Agility, 343). Spell effect 53 with the
  equipped-item mask set to finger and neck (*source*). This is how gems work without sockets: the empty slot becomes the gem’s
  home.
- **Figurines:** trinkets with a modest use (a short shield, a run-speed burst, a water-breathing charm), each an existing
  spell where one fits.
- Lenses and polished gems that Engineering and Blacksmithing may take as a cheaper alternative reagent (never a required one,
  §B).

**Three paths:**

| Path | Gives |
|---|---|
| Goldsmith | the jewelry ladders and their blue upgrades; the epic step (§B) |
| Gem Cutter | stronger settings, a second gem from prospecting (a hook) or cheaper exchanges (no code: their own recipes) |
| Stonecarver | figurines; the Stonecutters’ statues and small shrines as camp objects |

**Tree outline.** Unlocks at 75, 150, 225, 275; one of the three paths at 200 (by quest, level 40); +15 Jewelcrafting at 150;
a capstone at 300 per path.

**Ranks.**

| Rank | Skill | Level | Alliance | Horde |
|---|---|---|---|---|
| Apprentice, Journeyman | 1–150 | 5, 10 | Ironforge (the Stonecutters), Stormwind, Darnassus | Orgrimmar, Undercity, Thunder Bluff |
| Expert | 125–225 | 20 | the Explorers’ League camp at Uldaman, Badlands (sorting the dig’s stones) | Kargath, Badlands (the same stones, the Horde’s claim) |
| Artisan | 200–300 | 35 | Yojamba Isle, Stranglethorn: a Zandalar jeweler for both sides, outside Zul’Gurub | |

Rank quests (sketches): Expert, the dig’s stones (prospect Badlands ore, exchange for one named gem, set it in a ring for the
camp’s leader); Artisan, the Zandalar’s test (a necklace worthy of a talisman: a Star Ruby set in Truesilver, judged on the
spot). The path quests at 200: Alliance jewelers go to the Stonecutters in Ironforge, Horde ones to the Undercity’s jewelers.

**Technical route.** A new line (755): the DBC writer, the full client rows, and the open question of the trade window (proof 3).
Prospecting: recipes that make containers (`item_loot_template`). Settings: enchant spells, no loader needed. Items from 61001.
Neck and ring budgets at the slot share 0.55 (item-budget.md).

**Balance note.** Three new enchant slots add roughly 15–25 stats at 60. For one player that is welcome; if it feels strong,
settings can stop at +5, or be rings-only.

**Cost: high in content, medium in risk once proof 3 passes.** About 120 recipes, 80 items, 8 teachers, 15 quests.

### A3. Inscription (primary, line 773), with Cartography

**Origin in 1.12.** Scribes keep the libraries: Stormwind’s (Adair Gilroy, who sells parchment and ink), the Hall of Explorers’
(Librarian Mae Paledust), the Undercity’s book trade (Salazar Bloch). The frontier sells their scrolls: Deneb Walker at Refuge
Pointe, Balai Lok’Wein at Brackenwall. The highest scribal art in 1.12 is the Shen’dralar’s: Dire Maul’s librams, bound into
arcanums. Mapmaking was a profession Blizzard cut; its two teachers, a night elf and a Forsaken, are still in the data. The
tauren paint runes on totems (the Runetotems), and the Darkspear write hexes: the Horde has its own hands for this craft.

**What it gathers and uses.** Herbs, **milled as a recipe**: five herbs of a tier make two pigments, always (no luck), in the six
tiers 04 lists; pigments and a vial make inks; Blank Parchment and Engineer’s Ink from the vendors who sell them today; later a
heavier vellum made with Leatherworking’s cured hides as an *alternative* recipe.

**What it makes.**
- **The 24 stat scrolls**, Scroll of Protection to Scroll of Strength IV: recipes only, **no new items**. The cheapest content of
  the whole plan, and a steady solo buff.
- **Vellums:** an enchanter writes an enchantment onto Inscription’s vellum and gets a scroll that applies it on use. A scroll can
  be mailed, so an Enchanter alt can enchant the main’s gear, across factions once mail allows (§D). One new item and one
  Enchanting recipe per enchantment; start with the 20–30 that matter. Whether the server asks the scroll for the enchantment’s
  reagents when cast from an item is *unchecked*; if it does, the scroll casts a reagent-free copy of the enchantment (new id).
- **Off-hand tomes** (“Held In Off-hand”, caster stats) by rank, and **librams** for paladins (the relic slot; Forever gave
  relics to Enchanting, so 05 and this file must agree who makes which: librams by scribes, idols by Stonecarvers or
  Woodworkers, totems by Woodworkers).
- **Maps** (the Cartographer): survey maps that start an Archaeology dig (an item that begins a quest), treasure maps to
  hidden caches (one Lockpicking can open), and charts that unlock a zone’s layer in Forever UI’s map (rare spawns, caches).

**Three paths:**

| Path | Teacher | Gives |
|---|---|---|
| Scrollwright | Expert scribes at Refuge Pointe / Brackenwall | stronger scrolls (a hook: two from one craft), vellums for more enchantments |
| Cartographer | **Kitari Farseeker** (Darnassus) / **Alexander Lister** (Undercity), spawned at last | maps, dig surveys, treasure maps, map layers |
| Illuminator | the Shen’dralar scribe (Artisan) | off-hand tomes, librams, the epic step of its own line |

**Tree outline.** Scroll ranks II, III and IV unlock at 75, 150 and 225 (the scroll items’ own levels); a path at 200 (quest,
level 40); +15 Inscription at 150; the vellums open by enchantment tier; a capstone per path at 300 (two scrolls from one sheet; a
map of every dig site of one people; the Illuminator’s epic tome).

**Ranks.**

| Rank | Skill | Level | Alliance | Horde |
|---|---|---|---|---|
| Apprentice, Journeyman | 1–150 | 5, 10 | Stormwind (beside Adair Gilroy), Ironforge (Hall of Explorers), Darnassus | Undercity (beside Salazar Bloch), Thunder Bluff, Orgrimmar |
| Expert | 125–225 | 20 | Refuge Pointe, Arathi (with Deneb Walker) | Brackenwall Village, Dustwallow (with Balai Lok’Wein) |
| Artisan | 200–300 | 35 | a Shen’dralar scribe outside Dire Maul’s gates, Feralas, for both sides (the Shen’dralar already seek outsiders’ help) | |

Rank quests (sketches): Expert, the frontier’s orders (scrolls for Refuge Pointe’s or Brackenwall’s scouts, inked from local
herbs); Artisan, a copy of a Shen’dralar page in the scribe’s presence, with ink milled from Feralas’ herbs.

**Cost: medium.** About 100 recipes (24 of them making existing items), 50 new items, 8 teachers (two revived), 12 quests;
vellums need Enchanting recipes too (coordinate with 05).

### A4. Archaeology (secondary, line 794)

**Origin in 1.12.** The Explorers’ League is 1.12’s archaeology: the Hall of Explorers, digs at Bael Modan, the Wetlands, Loch
Modan, Uldaman, Darkshore (Remtravel’s excavation) and Kel’Theril. The Horde’s scholars are the tauren: Sage Truthseeker studies the
titans’ discs and Uldum’s portents in Thunder Bluff; Montarr is a lorekeeper at Freewind Post; Jarkal Mossmeld sends Kargath’s
adventurers into Uldaman. The Horde’s frame is keeping the land’s memory and taking relics back from the League’s and the Venture Company’s
diggers; the Darkspear recover the troll empires’ relics; the orcs seek the Old Horde’s ruins to learn from them. Not the
Reliquary: the blood elves join the Horde after 1.12.

**How it works without a survey** (1.14.2 has no Archaeology UI, 03 §1):
- **A dig site is a quest** (repeatable; a daily where our daily-quest patch fits) at a real place, with five to eight mounds:
  chest-type objects on the dig models, lootable only while you hold the dig (a quest condition). Each mound gives fragments of
  that people and a page of survey notes; six notes complete the dig.
- **The survey arrow is Forever UI’s:** it knows the mounds from the spawn export, as it knows herb nodes, and points to the
  nearest one. The theodolite 1.12 lacks, made by the addon.
- **Restorations are recipes** in the Archaeology window: fragments become an artifact. Commons are curios worth a little gold,
  each with a journal page (the chronicler’s voice: the people’s story, never the player’s). **Rares** are quests at that people’s
  lorekeeper, once per character: the fragments and a keystone become a blue or epic piece. 1.12’s unused Earthen Sigil and
  Prismstone Ring are the first two.
- **Keystones** are never a random drop: one comes with each first completion of a site.
- **Sunken caches:** 06’s Wreck-Diver turns Message in a Bottle into a lead to a sunken cache; those caches are dig sites under
  water, with the same quest shape.

**Peoples (six), each side digging all of them:** Dwarf (titan-touched: Uldaman, Loch Modan, the Wetlands, Bael Modan); Night Elf
and Highborne (Darkshore, Azshara, Feralas, Winterspring); Troll (Stranglethorn, the Hinterlands, Tanaris, the Sunken Temple’s
marsh); Fossil (Un’Goro, the Barrens; not the Kodo Graveyard, which is sacred to the tauren); Arathor and Lordaeron (Arathi,
Hillsbrad, Alterac, the Western Plaguelands: humans and Forsaken both claim it); the Old Horde (the Blasted Lands, the Burning
Steppes, the Swamp of Sorrows). The titans stay hints at the top rank (the discs, Un’Goro’s pylons, Uldum’s sealed door): legend,
not revelation (lore-changes.md, rule 4).

**Skill without grind.** Restorations carry the skill like any recipe; with the quest table each first dig adds points too.
Three hundred is about thirty sites across the world and twenty-five restorations: a tour of Azeroth’s past, not a farm.

**Three paths:** Field Archaeologist (more fragments per mound; maps of hidden sites, shared with the Cartographer), Restorer
(rarer commons, partial restorations: fewer fragments), Lorekeeper (the journal’s deeper pages, the titans’ hints, a keystone
exchange). **Tree outline:** a people opens with each rank (two at Apprentice: the side’s home peoples, Dwarf and Night Elf
for the Alliance, Troll and Old Horde for the Horde), a path at 150, +15 Archaeology at 225, one capstone per path at 300.

**Ranks.**

| Rank | Skill | Level | Alliance | Horde |
|---|---|---|---|---|
| Apprentice | 1–75 | 20 | Hall of Explorers, Ironforge | Sage Truthseeker, Thunder Bluff |
| Journeyman | 50–150 | 25 | Prospector Khazgorm’s camp, Bael Modan | Montarr, Freewind Post |
| Expert | 125–225 | 35 | Prospector Ryedol’s camp, Uldaman | Jarkal Mossmeld, Kargath |
| Artisan | 200–300 | 45 | Marshal’s Refuge, Un’Goro Crater (fossils and pylons), for both sides | |

Rank quests (sketches): each rank is a first dig at the teacher’s own site, written by that teacher (Khazgorm’s Bael Modan for
the Alliance, Montarr’s Thousand Needles for the Horde); Artisan, a restoration Marshal’s Refuge can’t make alone (fossil and
titan fragments together).

**Technical route.** Line 794 (category 9) and `IsProfessionSkill` (the same patch as Survival’s); a trowel in the bags as the
mound’s condition; restoration recipes; mound objects and their loot; quests; an Archaeology journal and the arrow in Forever UI.
**Cost: medium in code, high in writing** (about 30 dig quests, 40 restorations, 60 journal pages, 200 mound spawns).

### A5. Woodcutting and Woodworking

**Woodcutting: no skill of its own.** It lives in Survival (A1): the axe, the nodes, the five woods; Woodworking reads the same
nodes. A skill of its own needs a lock type in mangosd, Lock and LockType rows the proxy can’t send, and the bots’ code (03 §5):
high cost for a second bar that measures what Survival already measures. Every alt can learn Survival, so every alt can fell wood
for the family’s Woodworker: gathering as Mining is to Blacksmithing.

**Woodworking, if built: a primary craft.** No 1.12 trade skill makes a bow, crossbow or staff (only quest spells make
Rhok’delar, Lok’delar and Benediction), crafts make two shields in all, and the one arrow recipe (Engineering’s Explosive Arrow)
can’t be learned (*verified*). Woodworking fills that gap: bows and crossbows (with Engineering’s parts as
an alternative), staves, wooden shields, arrows, fishing poles, totems and idols for the relic slot, camp furniture, and parts for
others (gunstocks, hafts).

| Path | Teacher (Alliance / Horde) | Gives |
|---|---|---|
| Bowyer | Darnassus’ bowyers / Thunder Bluff’s Kuna Thunderhorn (“Bowyer & Fletching Goods”) | bows, crossbows, arrows (Fletching) |
| Staffwright | Feathermoon Stronghold / Camp Mojache, Feralas (ironwood country) | staves, totems, idols |
| Carpenter | Eastvale Logging Camp / the Warsong Lumber Camp | wooden shields, furniture, camp objects, parts |

Origins: the night elves’ bowyers (Bhaldaran Ravenshade, Jeena Featherbow) shape only what the forest gives; humans log Elwynn and
Redridge (Alther’s Mill is a sawmill); the tauren carve totems and bows; trolls make bows and spears; the Forsaken’s bowyers
(Abigail Sawyer) keep Lordaeron’s trade. The unspawned Woodcrafter and Woodcrafting Supplier can be its first teachers.
Ranks: Apprentice and Journeyman beside the capitals’ bowyers; Expert in Ashenvale (Astranaar / Splintertree Post, the wood
war’s two sides); Artisan in Feralas (Feathermoon / Camp Mojache). New line: an id free in 1.14.2 and Forever (above 3100,
checked with tools/wago.py).

**Why decide later:** it is a full craft (about 100 recipes and 80 items), its gear competes with drops in slots the other new
crafts don’t touch, and it is only worth it once Survival’s woods are in the world and the user has played Jewelcrafting.
Ascension made it a profession that takes no primary slot; with `MaxPrimaryTradeSkill` at 3 (§D) that isn’t needed.

### A6. The rest, judged

- **Gardening** as Survival’s third path: cheap (a pot item with a cooldown, as the Evergreen Pouch), useful (low herbs, produce
  for Cooking), idle rather than grind. A bed in the world that grows over time would need code; not worth it.
- **Cartography** inside Inscription: one line fewer, and its maps feed Archaeology and Lockpicking.
- **Runecarving:** dropped. Its one good idea, a free enchant swapped at a place, has no 1.12 home.
- **Forever’s Comprehension** (deciphering found scrolls): part of Archaeology’s restorations and journal.

## B. Quality upgrades, one design for every craft

**The rule.** Quality belongs to the item (03 §3), so an upgrade is always **item A becoming item B**, a new id the proxy builds
for the client. 1.12 does exactly this with the Zandalar talismans and the dungeon sets. One design across all crafts:

| Step | How | Code | When |
|---|---|---|---|
| 1. Quest swap | a repeatable quest at the craft’s Expert or Artisan teacher: A + materials + gold → B (`ReqItemId`, `RewItemId`); `RequiredSkill` and `RequiredSkillValue`; `RequiredCondition` for a path | none | **now**, the first step |
| 2. Upgrade recipe | a recipe with A as a reagent that makes B; a SkillLineAbility row so it skills up | spell rows + the reagent loader | the long-term way, once proof 1 passes |
| 3. A chance on craft | the path’s node gives a small chance to make B directly (a table, as `skill_extra_item_template`) | a mangosd hook | a bonus only, never the sole route |

**Choosing stats instead of rolling them.** A random suffix (“of the Bear”) invites crafting again and again for the right roll:
the grind the solo rules forbid. So suffixes only on cheap low-level greens where any roll is fine; the **blue step offers fixed
variants**: the quest’s `RewChoiceItemId1–6` (up to six versions of B), or one recipe per variant. This is Dragonflight’s Missives
done the 1.12 way.

**Naming.** B keeps A’s name with one word per craft; the epic gets a name of its own (placeholders, the user’s call):

| Craft | Blue word | Craft | Blue word |
|---|---|---|---|
| Blacksmithing | Tempered | Jewelcrafting | Flawless |
| Leatherworking | Tooled | Inscription | Illuminated |
| Tailoring | Embroidered | Woodworking | Seasoned |
| Engineering | Calibrated | | |

Where the name gets too long for a tooltip, a new noun instead (“Black Mageweave Vest” → “Black Mageweave Doublet”).

**The numbers.** B keeps A’s item level and required level; its stats fill the next quality’s budget (item-budget.md); armor to
the median of its kind and quality (`item_budget.py check`). The upgrade’s materials come from the craft’s own line or from
skills every character can learn (Survival’s wood, Archaeology’s keystones), with a sibling craft’s reagent as a **second,
cheaper recipe**: sharing between alts is rewarded, never required.

**The epic step.** Artisan, the path’s capstone node, the blue, a **capstone material from a choice-of-one quest** (never a raid
drop) and a place a solo player reaches (the Great Forge, Orgrimmar’s forge, the Moonwell, Thorium Point): rare by effort, not
by luck.

**Worked examples** (budgets per item-budget.md; value = (Σ stat^1.5)^(2/3)):

1. **White → green, Apprentice’s first upgrade.** Rough Bronze Cuirass (2866: white, item level 23, 168 armor, no stats) →
   Tempered Bronze Cuirass (green). Budget 0.51 × 23 − 4 = 7.7; Strength 5 and Stamina 5 = 7.9 (103 %). Quest at the Journeyman
   smith: the cuirass, 2 Bronze Bar, 1 Shadowgem.
2. **Green → blue by quest, with a choice.** Black Mageweave Vest (9998: green, 41, Spirit 12 and Intellect 11 = 18.3 against
   16.9, 108 %) → blue budget 0.61 × 41 − 1.5 = 23.5. Variant A: Intellect 15, Spirit 14 = 23.0 (98 %); variant B: Intellect 15,
   Stamina 14 (a caster who stands in melee). Quest at the Expert tailor: the vest, 4 Bolt of Mageweave, 2 Iridescent Pearl
   (or one Inscription “Illuminated Thread”, the alt route).
3. **Green → blue → epic by recipe.** Imperial Plate Chest (12422: green, 60, Strength 18 and Stamina 17 = 27.8 against 26.6,
   104 %) → **Tempered** (blue, 35.1): Strength 23, Stamina 22 = 35.7 (102 %), recipe at Artisan: the chest, 4 Thorium Bar, 2
   Star Ruby → **the epic** (45.7): Strength 27, Stamina 26, Fire Resistance 10 = 45.3 (99 %), at the Great Forge or Orgrimmar’s
   forge, with the capstone material and 2 Arcanite Bar (or a Jewelcrafter’s Flawless Star Ruby).
4. **A new craft’s ladder.** A Goldsmith’s ring at item level 40: green, slot share 0.55 → 9.0: Agility 6, Stamina 5 = 8.8 (97 %);
   **Flawless** (blue, 12.6): Agility 9, Stamina 7 = 12.8 (101 %); a Citrine setting on top (+5 Strength, enchantment 107).

## C. Profession skill trees as a system

**What a node is.** A learned spell (`character_spell`), as 1.12’s ten specializations are (03 §4). A path is a marker spell
(effect 47, no aura) taught by a quest; nodes are spells taught by the trainer or a quest’s `RewSpellCast`. The client knows a
node once its id has hotfix rows (`IsSpellKnown`); `inspect_export.py` writes the rest into ForeverUIServerData at launch.

**How nodes are earned: never by grinding.**

| Way | Example | Server |
|---|---|---|
| Lesson | a short quest at the teacher: watch, fetch, make one thing | a quest; the node at the trainer gated on it (`condition_id`: quest done) |
| Test | make a named item and hand it in (“Bring me a Tempered Bronze Cuirass”) | a quest with `ReqItemId` |
| Place | do the craft where it belongs: the Moonwell, the Great Forge, a dig site, the Ashenvale woods | a quest objective at an object or area |
| Journey | carry the craft’s work to someone who needs it (the NPC patron orders of 04 §2) | a quest chain |
| Practice | a capped share: the profession’s skill threshold on each node (`reqskillvalue`) | the trainer row |

A node’s gate: **its lesson done + the skill + a little gold**. One of three per tier: `condition_id` “hasn’t learned the other
two”; a path: `ReqAbility` the path’s marker. No knowledge currency to farm.

**Cheap or a hook.**

| Node effect | How | Cost |
|---|---|---|
| Recipes unlocked | trainer rows, quest rewards, `requiredspell` on recipe items | none |
| +15 skill | passive aura 98, as Cultivation (20552) | hotfix rows |
| A self buff, a gathering perk | passive or active spell (Toughness-like Stamina, a Lifeblood-like heal) | hotfix rows |
| Path-only items | `item_template.requiredspell` | none |
| Skill points from quests | the quest → (skill, points) table | **mangosd**, shared with Lockpicking and Poisons: build once |
| Extra output, upgrade-on-craft | one table read in `Spell::DoCreateItem` (`skill_extra_item_template` has the shape) | **mangosd**, one hook for both |
| Saved reagents | `TakeReagents` | mangosd |
| More gathered | gather loot | mangosd |
| Faster crafting | profession spells have no family to modify | mangosd; last |
| Respec | a gossip script and a table | **C++** |

**Forever UI: the specialization page.** Forever’s window has no such page (01 §2.4), so it is ours, in its style, previewed on
:8777 first. A tab beside each profession’s recipe list: three columns, one per path, nodes as icons on a vertical line.
- **Learned:** gold ring, full color. **Ready:** the lesson is done and the skill is there: green ring, “Learn from <teacher>”
  with Pin on Map. **Locked:** gray, the missing parts listed (the lesson by name, the skill, the rank). **The other path:**
  dimmed, “You walk the Gem Cutter’s path.”
- One color per state (ui-ux-guidelines.md); the node’s tooltip says what it gives in one line.
- The rank bar and rank-up toast as today; a quiet sound and a short glow when a node is learned (understated, as the user
  likes).
- **Alts on the same page:** “Thalia chose Gem Cutter” under the path an alt took, so the family’s paths are planned together.
- Data: a generated file from the world patches (nodes, lessons, gates), checked against the known spells.

**Respec.** One gossip script on each profession’s head teacher, reading a table of ours: marker spell → the spells to remove,
the price. **One active path per profession**, switched at the teacher for a fee (SoD’s lesson for one player: let the paths be
learned in turn). The script records earned nodes per character, so switching back costs the fee, not the lessons again.
Recipes of the old path stay in the book but can’t be crafted (their items keep working). Until the script exists, the GM tab’s
`.unlearn` serves testing.

## D. Alts and sharing

**Server config (one line each, each reversible):**
- `AllowTwoSide.Interaction.Mail = 1`: an Alliance miner can mail ore to a Horde jeweler. The only cross-faction route today is the
  goblin auction houses (02 §3).
- `MailDeliveryDelay`: 3600 makes even mail to your own characters wait an hour. On a one-player server the delay protects
  nothing; **0** (or 60 seconds).
- `MaxPrimaryTradeSkill = 3` when Jewelcrafting lands: room for a new craft beside the old pair, without letting one character
  hold everything. Not higher: alts keep their reason to exist.

**Forever UI, account-wide** (ForeverUIDB already is; `inspect_export.py` reads every character’s spells and skills at launch):
- **Known by:** every recipe and crafted item’s tooltip names the alts who can make it, with their skill and path.
- **The Workshop page** in the Professions book: alts as rows (both factions), professions, paths and cooldowns (transmutes,
  Mooncloth); materials in each alt’s bags and bank (saved at logout); a **shopping list**: “Mail 12 Thorium Bar
  from Brannoc to Thalia.”
- **Unbound recipes:** recipe items Bind on Equip; where a recipe is earned by quest, the quest is repeatable per character, so
  every alt can earn it (no account binding in 1.12). The 188 Bind-on-Pickup patterns are 05’s list.

**The family workshop: a place, not a menu.** A house in a neutral town (Booty Bay or Gadgetzan) with every ordinary station
(anvil, forge, cooking fire), a mailbox and a banker; Forever UI opens the Workshop page there. Any alt of either side works
there; with the mail delay at 0, the vellums, gems and wood the others made are waiting in the mailbox. Cheap: objects and NPCs
in a world patch.

**What to avoid:**
- **Shared recipe books** (crafting with an alt’s recipes: C++, or copying `character_spell` offline): it erases what makes each
  alt worth playing.
- **Account-wide skill** or nodes: the same.
- **Mandatory cross-craft reagents:** every chain must finish on one character; the alt route is the cheaper second recipe.
- **Bind on Pickup** for new recipes or crafted gear (Forever’s choice, wrong for alts).
- **Offline database moves** of items between characters, and any line-edit of saved variables.
- **Merging the faction auction houses:** the goblin ones already serve both.

## E. Roadmap for the new things

Proofs first, as 03 recommends; each phase previewed in the browser, tested, then installed; world patches with their undo;
the Ledger and the Tradeskill DB updated.

| Phase | What | Checks | Unlocks |
|---|---|---|---|
| **P1a** | one recipe under a new spell id (90000+) in an existing line, making a new item (a throwaway on a GM character, or 06’s first new dish) | a castable hotfixed spell; the trade window lists it; it crafts | every new recipe |
| **P1b** | the **DBC writer**; that recipe’s SkillLineAbility row | it skills up | every skill-up, every new line |
| **P1c** | the proxy’s **SpellReagents, SpellTotems, SpellCastingRequirements** loaders (C#) | reagents, tools and stations shown | 05’s recipes too |
| **P2** | **Survival to Journeyman**: tier on row 865, `IsProfessionSkill` + 142 (and 794), the opening spell, ranks 1290 and 7361, eight recipes, one wood node, a teacher per side | a whole secondary profession on a line the client knows | Survival to 300 |
| **P3** | **Jewelcrafting Apprentice slice**: line 755, Copper prospecting, one gem exchange, one ring, one setting | the trade window for a line the client never had; settings on a ring | every new line |
| **H1** | the quest → (skill, points) table (06’s “Q”: one patch for both parts) | a quest raises a skill | Lockpicking, Poisons, the gathering ranks, Archaeology’s digs |
| 1 | Survival to Artisan; Woodcraft’s woods in the world; Gardening | — | wood for Woodworking |
| 2 | **Quality upgrades by quest** across the crafts (with 05); Jewelcrafting to Artisan; the specialization page; config: mail and `MaxPrimaryTradeSkill` | — | — |
| **H2** | the respec script; then the extra-output and upgrade-on-craft table | — | paths switchable; capstones with procs |
| 3 | Inscription: scrolls first (no new items), then vellums with Enchanting, then the Cartographers | — | maps for Archaeology |
| 4 | Archaeology: the four home peoples first (Dwarf and Night Elf, Troll and Old Horde), the journal, the survey arrow; then Fossil and Arathor | — | — |
| 5 | Woodworking: the user decides after playing 1–3 | — | — |

**One step at a time:** each row ends with the user playing it; nothing of a later row starts before.

## Open questions for the user

1. Survival’s name, beside the hunters’ Survival tree: keep it, or rename the line (Fieldcraft, Woodcraft)?
2. `MaxPrimaryTradeSkill`: 3, or keep 2 and make some new crafts secondary?
3. Mail delay: 0, or a minute for the feel of it?
4. Ring and neck settings at full strength (+9 at 60), or capped at +5?
5. Woodworking: a full primary craft, or only Survival’s arrows and camp furniture?
6. The upgrade words (Tempered, Tooled, Embroidered, Calibrated, Flawless, Illuminated, Seasoned) and the epics’ names.
7. The family workshop: Booty Bay, Gadgetzan, or Everlook?
