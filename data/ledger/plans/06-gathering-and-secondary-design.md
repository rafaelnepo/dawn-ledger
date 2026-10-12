# Gathering and secondary skills: a design for one player (part E2)

Design for the professions plan (2026-10-10, unattended). It builds on parts A to D ([01](01-forever-and-classic.md),
[02](02-our-server-audit.md), [03](03-feasibility.md), [04](04-later-expansions-and-other-servers.md)) and follows the
Lockpicking design ([lockpicking-single-player.md](../lockpicking-single-player.md)): a skill climbs through teachers, lessons,
a test and jobs in real places, with practice as one part among several. Nothing was changed; every NPC, quest and spawn named
here was read from `classicmangos` (SELECT only) and placed by the server’s own grids. The new professions (Jewelcrafting,
Inscription, Archaeology, Woodcutting and Woodworking, Survival) are part 07’s; this part only notes where it hooks into them.
Both factions alike: where one side has a teacher or a quest the other lacks, the mirror is part of the design.

## Mechanisms

Every node and unlock below carries one of these labels (from part C), so the cheap work can go first.

| Code | Mechanism | Cost |
|---|---|---|
| **R** | a recipe or a rank taught by a quest (`RewSpellCast`, as Triage does), or a recipe item as a choice of rewards | low, no code |
| **L** | a loot row gated by a condition (17: a spell known) on node, school, skinning or creature loot; a direct row, never inside a reference | low |
| **W** | world patch: NPCs, quests (path quests by `RequiredCondition`), objects, spawns, vendor rows; existing creatures and models | low |
| **S** | a +skill passive (aura 98, as Cultivation’s +15 Herbalism) | low; a new id takes proxy rows, as Riding’s |
| **A** | a stat or utility passive (Stamina, critical strike, swim speed) | low, as S |
| **M** | the path’s marker spell (effect 47, as Armorsmith 9788), a new passive id by proxy rows | low |
| **Q** | quest → skill points, rank caps and the practice share: Lockpicking’s planned mangosd patch, made general | medium, once |
| **H1** | the craft-yield hook: an extra item on craft, by recipe and marker, from a table (`Spell::DoCreateItem`) | medium, once |
| **H** | another mangosd hook (a proc on gather, a first-find list, a cast time) | medium each |
| **N** | a new recipe spell or item by proxy rows; the window shows its reagents only after the SpellReagents loader | medium, after part C’s two proofs |
| **C** | a config line | low |

## What all six share

**Ranks by quest, not by purchase.** Trainers keep teaching Apprentice; every later rank comes from its test quest, which
teaches the rank (R), as Cooking’s, First Aid’s and Fishing’s Artisan quests already do. A rank’s quest opens at the old cap
minus 25 and, done, lifts the skill to at least the old cap (Q): nobody walks back to a low zone to catch up.

| Rank | Skill | From level | Shape |
|---|---|---|---|
| Apprentice | 1–75 | 5 | a trainer; two lessons; a first job in the starting zone |
| Journeyman | 75–150 | 10 | a town teacher; lessons, a test, jobs |
| Expert | 150–225 | 20 | lessons and a test; **the path** at skill 150 and level 25 |
| Artisan | 225–300 | 35 | a master in a far place, both sides’ roads to it; the path’s second gift |
| Master | 300 | 50 | repeatable jobs (weekly-shaped, as session 68’s dailies) that pay standing, not skill |

**Points per rank (75).** Practice still counts, but only up to a share; past it, gathering and crafting still yield and count
in the journal. Gathering gets the largest share, because its practice brings materials the crafts need.

| Source | Gathering | Cooking, First Aid | Fishing | How |
|---|---|---|---|---|
| Practice (orange and yellow, today’s gain) | up to 40 | up to 35 | up to 30 | Q |
| Lessons (two or three, once each) | 15 | 15 | 20 | Q |
| First finds and first crafts (each kind once) | 5 | 5 | 5 | H |
| The test | 10 | 10 | 10 | Q, R |
| The jobs | 5 | 10 | 10 | Q |

Proposals: Lockpicking’s practice share (15) was the user’s choice for a skill whose practice is a farm.

**Paths.** Three per skill, chosen at skill 150 and level 25 by the mentor’s entry quest; the marker (M) opens the path’s
quests and gates its loot and recipes. Each path gives two gifts, at Expert and at Artisan. One path per skill per character;
an alt takes another, and that is how a player owns all three. **Switching** (the same rule everywhere): the path’s mentor
takes 5 gold at Expert, 20 at Artisan, and the new path’s entry quest is done again; the old path’s recipes and marker go, what
was made stays. Removing spells is C++: one gossip script for all six skills, as `npc_professions.cpp` does for the smiths (H).
Later, the user’s choice: a capstone at 300 and level 60 that keeps a second path (Mists’ Ways, Season of Discovery’s phase 5).

**The journal.** Every journal (the Herbalist’s, Miner’s and Skinner’s, the Angler’s Journal, new Cooking and First Aid pages
in the same frame) gets Lockpicking’s *Journey*: the rank, its lessons, test and jobs with Pin on Map, the path card and the
tree. Forever UI only, previewed on the web first.

## Overview

| Skill | The three paths | Headline changes |
|---|---|---|
| Herbalism | Wildwarden · Forager · Herb-Healer | ranks by quest up to Flora Silverwind’s Artisan; second herbs and Black Lotus by path; Felwood’s Emerald Circle as the masters’ work |
| Mining, with Smelting | Prospector · Smelter · Deepdelver | gems at a real rate; Smelt Dark Iron at Thorium Point instead of Blackrock Depths; a Horde mining teacher outside the capitals |
| Skinning | Tanner · Big-Game Skinner · Scalecutter | tanners supply Refined Deeprock Salt (ends the 72-hour wall on 51 recipes); rare pelts by path; Alliance mirrors in Feralas and Desolace |
| Cooking | Hearthfire · Saltwater · Baker and Brewer | 15 one-side recipes taught to the other side, six Horde regional dishes to come; lessons fill the skill-up holes; one yield hook |
| Fishing | Angler · Netcaster · Wreck-Diver | an Alliance Artisan teacher beside Katoom’s; Horde lure quests; trophy, school and treasure rolls by path |
| First Aid | Field Surgeon · Venom-Warden · Plaguewarden | Strong Anti-Venom by quest; Triage stays the Artisan test; a disease cure for classes without one |

## Herbalism

### Paths

| Path | Who it is, who it suits | What it unlocks | The quest (Alliance / Horde) |
|---|---|---|---|
| **Wildwarden** | The Cenarion Circle’s way: take from the plant and leave it living. Druids, healers, anyone who loves the green places. | a second herb from a node about one time in four (L); the Emerald Circle’s salve jobs pay two Cenarion Plant Salves, so more of Felwood’s Songflowers, Whipper Roots, Night Dragons and Windblossoms get cleansed (W) | “The Living Root”: Firodren Mooncaller (the Temple Gardens, Darnassus) / Komin Winterhoof (Thunder Bluff), a sick glade in Ashenvale reached from Astranaar / Splintertree Post; master Malvor (Nighthaven) |
| **Forager** | The apothecaries’ supplier: the second herbs, the rare ones, the poison herbs. Alchemists’ and rogues’ alts. | Swiftthistle and Wildvine twice as often (L); Black Lotus at about 2% from the top nodes, as Season of Mastery did (L), besides its own 94 spots in four zones; the rogue design’s Deathweed doubled (L) | “A Root for Every Remedy”: Telurinon Moonshadow (Menethil Harbor) / Apothecary Lydon (Tarren Mill); masters the Artisan alchemists Kylanna Windwhisper (Feathermoon) / Rogvar (Stonard) |
| **Herb-Healer** | Herbs used where they grow: Darkspear and tauren medicine, dwarven and night elf herb-lore. Warriors, rogues, hunters: whoever has no healing of their own. | a small heal over time each time a herb is picked (H: the gather casts an existing heal-over-time spell); herbal poultices with First Aid (N) | “Bitter Roots, Quick Mending”: Kali Healtouch (Thelsamar) / Angrun (Grom’gol Base Camp); master Brant Jasperbloom (Theramore) / Mishiki (Sen’jin Village) |

### Tree

| Rank | Node | Effect | How |
|---|---|---|---|
| Apprentice | Herb Lore | a kind’s nodes on the maps after ten picked (built: GatherNodes) | addon |
| Journeyman | Herbalist’s Satchel | a 12-slot herb bag, the test’s reward (1.12’s herb bags start at 20 slots and Cenarion standing) | W, new item |
| Journeyman | Sure Hands | +5 Herbalism | S |
| Expert | The path | the marker; the path’s quests open | M |
| Expert | Gift I | second herb / second herbs doubled / mending on pick | L / L / H |
| Artisan | Green Thumb | +10 Herbalism | S |
| Artisan | Gift II | double salves and the Songflower’s cleansing / Black Lotus / poultices | W / L / N |
| Master | Seeds | seeds for Survival’s Gardening from the Emerald Circle’s jobs | W, hook (07) |

### Ranks

| Rank | Teachers | Lessons | Test | Jobs |
|---|---|---|---|---|
| Apprentice | Herbalist Pomeroy (Elwynn), Malorne Bladeleaf (Dolanaar), Reyna Stonebranch (Ironforge) / Faruza (Brill), Mishiki (Sen’jin), Komin Winterhoof (Thunder Bluff) | lifting the root whole; reading a leaf | — | Peacebloom and Silverleaf for the town’s healer (Michelle Belle, Goldshire; Nurse Neela, Brill …) |
| Journeyman | Alma Jainrose (Lakeshire) / Jandi (Orgrimmar) | herbs by water (Stranglekelp); bruised roots | Root Samples, 1.12’s own (Mebok Mizzyrix, Ratchet, both) | Briarthorn and Bruiseweed for Ratchet’s and the Crossroads’ alchemists |
| Expert | Telurinon Moonshadow (Menethil) / Aranae Venomblood (Tarren Mill) | hill herbs (Wild Steelbloom, Kingsblood); the shade (Grave Moss) | an herbalist’s eye: three herbs named by the teacher, found in Arathi | the path’s entry quest |
| Artisan | Flora Silverwind (Booty Bay, both) | below | below | below |
| Master | Arathandris Silversky / Maybess Riverbreeze (Felwood) | — | — | Salve via Gathering, 1.12’s repeatable, at the path’s pay |

**Artisan Herbalism, written out.** Flora Silverwind, Booty Bay’s Superior Herbalist, takes Expert herbalists of skill 200
and level 35 from both sides; the Alliance comes by Rebel Camp, the Horde by Grom’gol. Lesson one, “Roots That Heal” (5
points): three Liferoot from the streams of Stranglethorn, and why liferoot grows only where water runs. Lesson two, “Gold in
the Leaves” (5): Goldthorn from Arathi (Refuge Pointe / Hammerfall have it near), dried as she shows. Lesson three, “Flowers
of Fire” (5): Firebloom from the dunes by Gadgetzan, neutral ground. The test, “Flora’s
Herbarium” (10 and the rank): one each of Khadgar’s Whisker, Firebloom and Purple Lotus, pressed into a book she keeps; done,
the skill is at least 225 and Artisan is learned. The jobs (5): Kingsblood and Liferoot for Booty Bay’s alchemy supplier
against the jungle’s fevers. First finds (5): the first of each Artisan herb. Practice gives the rest, at most 40. Every step
has Pin on Map; the path’s second gift waits at the path’s master.

### Feeds, alts, blockers

- **Feeds:** Alchemy (31 herbs), Poisons (Bruiseweed, Fadeleaf, the planned Deathweed), First Aid (the Herb-Healer’s
  poultices), Leatherworking (Wildvine); Inscription’s milling (six pigment tiers from vanilla herbs) and Survival’s Gardening
  are 07’s hooks.
- **Solo payoffs:** mending on pick; Felwood’s Songflower Serenade and fruits, the world’s own buffs, cleansed more often.
- **Alts:** herbs are unbound and mail freely; a Forager alt is the alchemist’s supply line.
- **Blockers fixed:** Black Lotus from a lottery to a path’s find; Horde herbalism teachers outside the capitals are few
  (Faruza, Mishiki, Aranae, Ruw): the rank teachers above cover each band on both sides.

## Mining, with Smelting

### Paths

| Path | Who it is, who it suits | What it unlocks | The quest (Alliance / Horde) |
|---|---|---|---|
| **Prospector** | The Explorers’ League’s eye: gems and crystals. Jewelers’ and enchanters’ alts, anyone who likes a find. | the vein’s gem at about 8% instead of 0.7–1% (L); Arcane Crystal from thorium three times as often (L: today 2.9%, and Arcanite feeds 40 recipes); Jewelcrafting’s prospecting (07) | “Stones That Shine”: Prospector Stormpike (Ironforge) / Makaru (Orgrimmar) |
| **Smelter** | Bars and alloys: the Thorium Brotherhood’s craft. Blacksmiths’ and engineers’ alts. | one more bar on about one smelt in five (H1); Smelt Dark Iron at Thorium Point, at a Black Forge placed there (W: a spawn of the focus object 174824, spell focus 543), taught by Hansel Heavyhands instead of Gloom’rel inside Blackrock Depths; Forever’s Heavy Thorium Bar (N) | “Fire and Flux”: Gelman Stonehand (Stormwind) / Traugh (the Crossroads); master Hansel Heavyhands (Thorium Point, both) |
| **Deepdelver** | Stone and the deep places: quarries, dungeon veins, the earth itself. Engineers’ alts, tanks, dungeon runners. | stones doubled (blasting powder, grinding stones: L); Elemental Earth from iron veins and deeper (L); Toughness II (A); the quest ores as the path’s jobs: Incendicite (Wetlands, 16 veins), Lesser Bloodstone (Arathi, 8) | “Below the Quarry”: Dank Drizzlecut (Gol’Bolar Quarry) / Brek Stonehoof (Thunder Bluff) |

### Tree

| Rank | Node | Effect | How |
|---|---|---|---|
| Apprentice | Smelting | Copper, Tin, Bronze, as today | trainer |
| Journeyman | Sure Pick | +5 Mining | S |
| Journeyman | Toughness I | a little Stamina (Wrath’s miners’ perk) | A |
| Expert | The path | the marker | M |
| Expert | Gift I | gems / extra bar / stones and Elemental Earth | L / H1 / L |
| Artisan | Deep Sight | +10 Mining | S |
| Artisan | Gift II | Arcane Crystal / Dark Iron at Thorium Point and Heavy Thorium / Toughness II and the quest ores | L / W, N / A, W |
| Master | Brotherhood Orders | a weekly ore order at Thorium Point: Thorium Brotherhood standing, whose 29 recipe gates the crafts need | W |

### Ranks

| Rank | Teachers | Lessons | Test | Jobs |
|---|---|---|---|---|
| Apprentice | Dank Drizzlecut (Gol’Bolar), Gelman Stonehand (Stormwind), Kurdram Stonehammer (Auberdine) / Makaru (Orgrimmar), Brek Stonehoof (Thunder Bluff), Brom Killian (Undercity) | reading a vein; the forge | — | Copper Bars for the town’s smith |
| Journeyman | Brock Stoneseeker (Thelsamar) / **new**, at the Crossroads | below | below | below |
| Expert | Geofram Bouldertoe (Ironforge) / Makaru (Orgrimmar) | iron and gold; steel | an iron run in the hills of Hillsbrad and Alterac (Southshore / Tarren Mill) | the path’s entry quest |
| Artisan | Hammon Karwn (Refuge Pointe) / Keena (Hammerfall) | mithril; truesilver | Drywhisker Gorge (Arathi): one Truesilver Bar from ore mined there | mithril for the Arathi forts |
| Master | Hansel Heavyhands (Thorium Point, both) | — | — | Brotherhood Orders |

**Journeyman Mining, written out.** No Horde mining teacher stands outside the three capitals (the Alliance has Gol’Bolar,
Steelgrill’s Depot, Thelsamar, Darkshire and Auberdine), so a new one stands at the Crossroads beside Traugh, the Expert
Blacksmith (W, an existing orc look). The Alliance’s is Brock Stoneseeker in Thelsamar. From skill 50 and level 10: lesson
one, “Tin in the Copper” (5): ore from the Silver Stream Mine (Loch Modan) / the Boulder Lode Mine (the Barrens), and why tin
shows in old copper. Lesson two, “Silver Shows Itself” (5 and a Silver Vein first find): a silver vein’s color. Lesson three,
“Bronze” (5): smelt Bronze at the town’s forge. The test, “The Teacher’s Bars” (10 and the rank): ten Bronze Bars from ore you
mined. The job (5): Bronze for Ironband’s Excavation Site (Loch Modan) / for the Crossroads’ walls against the Razormane.

### Feeds, alts, blockers

- **Feeds:** every bar to Blacksmithing and Engineering; Black Vitriol and Arcane Crystal to Alchemy; gems to Blacksmithing,
  Enchanting and Jewelcrafting (07), whose prospecting turns vanilla ores into vanilla gems; the Lodestone camp (07).
- **Solo payoffs:** Toughness; more stones for an engineer’s blasting powder and a smith’s whetstones.
- **Alts:** ore, bars and stones are unbound. **The Goblin Mining Helmet binds on pickup** (item 10542): an engineer alt can’t
  make one for a miner alt. Make it Bind on Equip (W, and item_hotfixes.py).
- **Blockers fixed:** Smelt Dark Iron inside Blackrock Depths (Black Forge and Gloom’rel) moves to Thorium Point; Arcane
  Crystal’s 2.9% becomes the Prospector’s; the quest-only ores get a use. Smelt Elementium stays out (Fiery Core, a raid).

## Skinning

### Paths

| Path | Who it is, who it suits | What it unlocks | The quest (Alliance / Horde) |
|---|---|---|---|
| **Tanner** | Hides into leather: the leatherworkers’ partner. Leatherworkers’ alts. | one more leather now and then (L: skinning loot is all direct rows, 771 tables); Refined Deeprock Salt from the Tanner’s masters (W: a job’s reward and a vendor row), so Cured Rugged Hide no longer waits on an Engineer’s Salt Shaker and its 72 hours; Forever’s Tanning Rack (07) | “Salt and Bark”: Aayndia Floralwind (Astranaar) / Krulmoo Fullmoon (Camp Taurajo); masters Drakk Stonehand (Wildhammer Keep) / Hahrana Ironhide (Camp Mojache) |
| **Big-Game Skinner** | Nesingwary’s Expedition: trophies and the rare pelts. Hunters (the user’s main), melee classes. | the rare skins at a real rate from their own beasts: Shadowcat Hide, Thick Wolfhide, Warbear, Frostsaber and Chimera Leather (L); trophies for the Beast Journal and the camp (07); a rare pelt of choice from Nesingwary’s jobs (R) | “Hides Worth the Hunt”: Ajeck Rouack (Nesingwary’s Expedition, both); master Hemet Nesingwary |
| **Scalecutter** | Scales and chitin: turtle, scorpid, whelp, dragonscale. Dragonscale leatherworkers, mail wearers. | scales doubled (L); Worn Dragonscale and the whelp scales at a real rate (L); Forever’s Pristine Scale (N) | “Scales Off the Shell”: Androd Fadran (Refuge Pointe) / Tunkk (Hammerfall); masters the Dragonscale leatherworkers Peter Galen (Azshara) / Thorkaf Dragoneye (the Badlands) |

### Tree

| Rank | Node | Effect | How |
|---|---|---|---|
| Journeyman | Sure Knife | +5 Skinning | S |
| Journeyman | Skinner’s Pack | a 10-slot leather bag, the test’s reward | W, new item |
| Expert | The path | the marker | M |
| Expert | Gift I | extra leather / rare pelts / scales doubled | L |
| Artisan | Keen Edge | +10 Skinning | S |
| Artisan | Master of Anatomy | a little critical strike (Wrath’s skinners’ perk) | A |
| Artisan | Gift II | the salt / trophies and pristine hides / dragonscale | W / L, N / L |
| Master | Furs for Everlook | a weekly fur order (Frostsaber, Chimera) from Everlook’s goblins, both sides | W |

### Ranks

| Rank | Teachers | Lessons | Test | Jobs |
|---|---|---|---|---|
| Apprentice | Maris Granger (Stormwind), Balthus Stoneflayer (Ironforge), Eladriel (Darnassus) / Thuwd (Orgrimmar), Mooranta (Thunder Bluff), Killian Hagey (Undercity) | the knife and the grain | — | Gathering Leather, 1.12’s (Veren Tallstrider, Thunder Bluff: 12 Light Leather), mirrored by Eagan Peltskinner (Northshire) |
| Journeyman | Wilma Ranthal (Redridge) / **new**, at Camp Taurajo (no Horde skinning teacher stands between the capitals and Shadowprey Village) | hides that cure, hides that rot | a whole Light Hide | Light Leather for the town’s leatherworker |
| Expert | Aayndia Floralwind (Astranaar) / Krulmoo Fullmoon (Camp Taurajo) | below | below | below |
| Artisan | **new**, at Nijel’s Point / Malux (Shadowprey Village) | thick hides; scorpid scale | Desolace’s kodos and scorpids | Thick Leather for Desolace’s posts |
| Master | **new**, at Feathermoon / Kulleg Stonehorn (Camp Mojache) | — | — | Furs for Everlook |

**Expert Skinning, written out.** Aayndia Floralwind, Astranaar’s Expert Leatherworker, and Krulmoo Fullmoon, Camp Taurajo’s,
teach skinners of 125 and level 20 who sell them hides. Lesson one, “The Thicker Hide” (5): a Medium Hide whole from Ashenvale’s
bears / the southern Barrens’ beasts. Lesson two, “Tough Skins” (5): raptor and crocolisk hides from the Wetlands / the
Barrens, cut along the scales. Lesson three, “What the Tanner Needs” (5): salt and bark, cured hides shown. The test, “A Hide Fit
for Curing” (10 and the rank): three Medium Hides with no tear, from beasts orange to you. The job (5): Medium Leather for
Astranaar’s sentinels / Taurajo’s braves. At 150 and level 25 the same teacher names the three mentors: the Tanner’s path is
theirs; the Big-Game Skinner’s points to Nesingwary; the Scalecutter’s to Arathi.

### Feeds, alts, blockers

- **Feeds:** Leatherworking (every leather and scale), Blacksmithing and Engineering (leather), Tailoring (a few); the Tanning
  Rack and trophies are 07’s camp hooks.
- **Solo payoffs:** Master of Anatomy; trophies; Wrath’s perks put Skinning on the character that plays, not only on an alt.
- **Alts:** leather, hides, the salt and the Salt Shaker are unbound.
- **Blockers fixed:** Cured Rugged Hide’s 72-hour salt; Camp Mojache’s and Shadowprey’s Horde-only skinning trainers get
  Alliance mirrors; the rare pelts leave the 1% lottery.

## Cooking

Cooking’s paths are the costliest of the six: there is no loot to gate, so each gift is the yield hook (H1) or new recipes
(N). The yield hook is shared with Smelting and First Aid, so it is paid once.

### Paths

| Path | Who it is, who it suits | What it unlocks | The quest (Alliance / Horde) |
|---|---|---|---|
| **Hearthfire** | Meat over the fire: the hunter’s and the soldier’s cooking. Melee classes, hunters. | meat dishes make one more (H1); Forever’s single-stat meat dishes, raptor, stag and bear (N); the cook’s fire as Survival’s campfires (07) | “Fire and Flank”: Narj Deepslice (Refuge Pointe) / Uttnar (Hammerfall), the Arathi butchers |
| **Saltwater** | Fish, soups and chowders: Booty Bay’s kitchens. Casters, healers, anglers. | fish dishes make one more (H1); fish dishes for mana and spirit (N) | “The Captain’s Table”: Kelsey Yance (Booty Bay, both) |
| **Baker and Brewer** | Bread, pies and drinks: what an inn serves. Anyone on the road a long time. | breads and drinks make one more (H1); Forever’s teas and smoothies (N) | “Oven and Cask”: Nantar (Astranaar) / Moorane Hearthgrain (the Crossroads); masters Ragnar Thunderbrew (Kharanos) / Brewmaster Drohn (Ratchet) |

### Tree

| Rank | Node | Effect | How |
|---|---|---|---|
| Apprentice | Basic Campfire | as today | trainer |
| Journeyman | Kitchen Lore | each lesson teaches a recipe | R |
| Journeyman | Quick Hands | +5 Cooking | S, new id |
| Expert | The path | the marker | M |
| Expert | Gift I | one more dish from the path’s kind | H1 |
| Artisan | Hearty Meals | Well Fed lasts half again as long | H |
| Artisan | Gift II | the path’s recipes | N |
| Master | Calandrath’s Kitchen | Desert Recipe → Sharing the Knowledge → Kitchen Assistance, 1.12’s chain at Cenarion Hold, as the master’s work | W |

### Ranks

| Rank | Teachers | Test | Jobs |
|---|---|---|---|
| Apprentice | the capitals’ and towns’ cooks (Stephen Ryback, Gremlock Pilsnor, Zarrin / Zamja, Eunice Burch, Duhng) | — | a meal for the starting zone’s guards |
| Journeyman | the same, with the town’s regional recipes as lesson rewards | a dish orange to you, served to the town’s innkeeper | the town’s regional dish (the parity table) |
| Expert | Shandrina (Silverwind Refuge) / Wulan (Shadowprey Village) | below | below |
| Artisan | Dirge Quikcleave (Gadgetzan, both) | Clamlette Surprise, 1.12’s own | — |
| Master | Calandrath (Cenarion Hold, both) | — | Kitchen Assistance |

**Expert Cooking, written out.** Today Shandrina and Wulan sell the Expert Cookbook; the book becomes their lessons. Lesson
one, “Venison and Boar” (5 and Lean Venison): stag meat from Ashenvale (Astranaar / Splintertree Post). Lesson two, “Smoke and
Salt” (5 and Hot Wolf Ribs): meat smoked to keep on the road. Lesson three, “A Spice for Every Meat” (5 and Hot Lion Chops
for the Alliance, Tasty Lion Steak for the Horde): the three spices. The test, “Supper at the Outpost” (10 and the rank): three dishes orange to you, served
to Silverwind Refuge’s sentinels / Shadowprey Village’s hunters. The jobs (10): provisions for the Zoram Strand patrol / the
Kodo Graveyard’s watchers, paying recipes orange at 165–199, where trainers alone leave a hole today (the Alliance 165–199, the Horde
165–174).

### Recipes by quest and the 25 one-side recipes

Today an Alliance cook reaches 67 recipes without drops, a Horde one 56; 17 recipes are Alliance-only, 8 Horde-only (part B).
Where a dish’s meat drops on both sides, the other side learns it by a quest at its own hub (W, R). Dishes named for a place
(Westfall, Redridge, Loch Modan, Kaldorei) stay that place’s.

| Dish (skill) | Today | The other side’s road | Ingredient there |
|---|---|---|---|
| Crocolisk Steak (80) | Alliance, quest in Loch Modan | Horde: Grimtak (Razor Hill) | Crocolisk Meat in Durotar, the Barrens |
| Fillet of Frenzy (50) | Alliance, Laird (Auberdine) | Horde: Abigail Shiel (Brill), for Silverpine | Soft Frenzy Flesh, Silverpine |
| Murloc Fin Soup (90) | Alliance, quest in Redridge | Horde: Kil’Hiwana (Zoram’gar Outpost) | Murloc Fin, Ashenvale’s coast |
| Clam Chowder (90) | Alliance, two fishermen | Horde: Kil’Hiwana (Zoram’gar Outpost) | Clam Meat; milk at any inn |
| Gooey Spider Cake (110) | Alliance, quest in Duskwood | Horde: Derak Nightfall (Tarren Mill) | Gooey Spider Leg, Hillsbrad |
| Lean Venison (110) | Alliance, Ulthaan (Silverwind Refuge) | Horde: Wulan’s Expert lesson (Shadowprey Village) | Stag Meat, Ashenvale, Stonetalon |
| Crocolisk Gumbo (120) | Alliance, quest in the Wetlands | Horde: Ogg’marr (Brackenwall Village) | Tender Crocolisk Meat, Dustwallow |
| Tasty Lion Steak (150) | Alliance, quest in Hillsbrad | Horde: Derak Nightfall (Tarren Mill) | Lion Meat, Hillsbrad, Alterac |
| Mystery Stew (175) | Alliance, two vendors | Horde: Ogg’marr (Brackenwall Village) | Mystery Meat; Dwarven Stout from Barkeep Morag (Orgrimmar) |
| Roasted Kodo Meat (35) | Horde, Wunna Darkmane (Bloodhoof) | Alliance: **new**, a goblin cook at Ratchet (both) | Kodo Meat, the Barrens |
| Dig Rat Stew (90) | Horde, quest from Grub | Alliance: the same Ratchet cook | Dig Rat, the Barrens |
| Crispy Lizard Tail (100) | Horde, Tari’qa (the Crossroads) | Alliance: **new**, a cook at Stonetalon Peak | Thunder Lizard Tail, Stonetalon |
| Hot Lion Chops (125) | Horde, Zargh and a Hillsbrad quest | Alliance: Bront Coldcleave (Southshore) | Lion Meat, Hillsbrad |
| Heavy Crocolisk Stew (150) | Horde, Ogg’marr | Alliance: Craig Nollward (Theramore) | Tender Crocolisk Meat, Dustwallow |
| Carrion Surprise (175) | Horde, three vendors | Alliance: Janet Hommers (Nijel’s Point) | Mystery Meat, Desolace |

That leaves 8 regional Alliance dishes (Kaldorei Spider Kabob 10, Beer Basted Boar Ribs 25, Goretusk Liver Pie and Loch
Frenzy Delight 50, Blood Sausage 60, Westfall Stew 75, Redridge Goulash and Seasoned Wolf Kabob 100) against 2 Horde ones
(Crispy Bat Wing 1, Scorpid Surprise 20). The Horde gets six regional dishes of its own at those bands (N), from its own meats
(Mulgore’s plainstriders, Durotar’s boars, Tirisfal’s and Silverpine’s beasts, Thousand Needles’ vultures). Until N is
proven, the gap shows in the Ledger. Also by quest: **Savory Deviate Delight** (a 0.1% Barrens drop today) from Mebok
Mizzyrix in Ratchet, both; **Lean Wolf Steak** (no source) from a cook at Darkshire and one at Splintertree Post; Goldthorn Tea and
Runn Tum Tuber Surprise stay dungeon recipes. Crystal Flake Throat Lozenge stays out (a placeholder reagent from a later patch).

### Feeds, alts, blockers

- **Feeds:** every character’s Well Fed; hunter pets’ food; Survival’s campfires (07). Fishing, Skinning’s meats and every
  creature’s meat feed it.
- **Alts:** food is unbound; Thistle Tea and Runn Tum Tuber Surprise recipes bind, and stay per character.
- **Blockers fixed:** the faction gap; the 0.1% recipe; the skill-up holes at 120–124 and 165–199, filled by lesson rewards.

## Fishing

### Paths

| Path | Who it is, who it suits | What it unlocks | The quest (Alliance / Horde) |
|---|---|---|---|
| **Angler** | Nat Pagle’s way: the sport and the record fish. Patient players, collectors. | trophy fish and the Extravaganza’s rare fish twice as often (L: a direct row in each zone’s table, since the zones’ fish sit in shared references); Nat’s gear as a choice of one from his jobs (R) | “The One That Got Away”: Old Man Heming (Booty Bay, both); master Nat Pagle (Dustwallow) |
| **Netcaster** | Schools and the market: fish for the pot and the alchemist. Cooks’ and alchemists’ alts. | one more fish from schools (L); Oily Blackmouth, Firefin Snapper, Stonescale Eel and Deviate Fish twice as often (L) | “A Full Net”: Harold Riggs (Menethil Harbor) / Kil’Hiwana (Zoram’gar Outpost); master Gikkix (Steamwheedle Port) |
| **Wreck-Diver** | What the water hides: crates, chests, clams and pearls. Treasure-lovers, jewelers (07). | wreckage and fished chests more often, pearls doubled (L; pearls are fishing’s since world 039); swim speed and water breathing (A); Message in a Bottle as a lead (W: its patterns leave for the profession quests, by the user’s rule; the bottle starts a quest to a sunken cache: an Archaeology hook, 07) | “Down to the Wreck”: Myizz Luckycatch (Booty Bay, both); masters Katoom the Angler (Revantusk) / **new**, a Wildhammer angler at Wildhammer Keep |

### Tree

| Rank | Node | Effect | How |
|---|---|---|---|
| Journeyman | Lure Lore | the lure quests pay lures and the Aquadynamic Fish Lens | R |
| Journeyman | Steady Line | +5 Fishing | S |
| Expert | The path | the marker | M |
| Expert | Gift I | trophies / schools / chests | L |
| Artisan | Patient Hands | +10 Fishing | S |
| Artisan | Gift II | the Extravaganza’s fish / the alchemy fish / pearls and bottles | L / L / L, W |
| Master | Nat’s Challenges | Snapjaws, Mon! and Gammerita, Mon! (Katoom’s, Horde-only today: the Wildhammer angler gives the Alliance both, and the FC-5000 pole), then a weekly fish named by the master | W |

### Ranks

| Rank | Teachers | Test | Jobs |
|---|---|---|---|
| Apprentice | Arnold Leland, Grimnur Stonebrand, Astaia, Matthew Hooper (Lake Everstill) / Lumak, Kah Mistrunner, Armand Cromwell | — | fish for the town’s cook |
| Journeyman | Harold Riggs (Menethil) / Kah Mistrunner (Thunder Bluff) | below | below |
| Expert | Old Man Heming (Booty Bay, both): the book becomes his lesson | a catch from three waters named by him | the path’s entry quest |
| Artisan | Nat Pagle: Nat Pagle, Angler Extreme (1.12’s four fish); the rank from Katoom (Horde) and the new Wildhammer angler (Alliance) | Nat’s four fish | Nat’s errands |
| Master | Nat Pagle | — | Nat’s Challenges |

**Journeyman Fishing, written out.** The lure quests are Alliance-only today: Wizbang Cranktoggle in Auberdine asks for Gaffer
Jacks (Fishing 30) and Electropellers, and pays the Aquadynamic Fish Lens. The Horde’s mirror stands at Ratchet with Zizzek
(W, Horde races only): the same two quests, the same pay. Lesson one, “Reading the Water” (10): the zone’s number, and why at its +95 every cast
lands. Lesson two, “The Lure” (10): Wizbang / Zizzek’s lures, one applied and fished with. The test, “Three Waters” (10 and the
rank): one fish from each of three waters named by Harold Riggs (the Wetlands’ coast, Loch Modan, Darkshore) / Kah Mistrunner
(Mulgore’s lakes, the Barrens’ oases, Durotar’s coast). The jobs (10): Gaffer Jacks and Electropellers. First catches (5):
each fish kind’s first. Practice, at most 30, gives the rest; fishing’s gain slows as it climbs, so here quests weigh most.

### Feeds, alts, blockers

- **Feeds:** Cooking (every fish), Alchemy (oils and fish), Jewelcrafting (pearls, 07), Archaeology’s sunken caches (07).
- **Solo payoffs:** food; potions from the alchemy fish; a swim-speed and breath perk for the Wreck-Diver.
- **Alts:** fish and pearls are unbound; the poles, hat, boots and line from Nat and the Extravaganza bind, as rewards should.
- **Blockers fixed:** the Horde-only Artisan teacher and quests (Katoom’s, with Nat Pagle’s Extreme Angler FC-5000) and the
  Alliance-only lure quests are mirrored; the bottle’s 12% pattern lottery leaves.

## First Aid

### Paths

| Path | Who it is, who it suits | What it unlocks | The quest (Alliance / Horde) |
|---|---|---|---|
| **Field Surgeon** | Bandages under fire: Triage’s trade. Everyone without heals; battleground players. | one more bandage per craft (H1); a quicker bandage and a shorter Recently Bandaged (H, and the client’s Spell rows); the battleground bandages, which exist as items (N: recipes only) | “Under Fire”: Fremal Doohickey (Menethil Harbor) / Arnok (Orgrimmar); masters Doctor Gustaf VanHowzen (Theramore) / Doctor Gregory Victor (Hammerfall) |
| **Venom-Warden** | Antivenoms and the spider’s bite. Hunters, rogues (Poisons shares the venom sacs). | venom sacs from spiders and scorpids at a real rate (L, creature loot); two anti-venoms per craft (H1); Powerful Anti-Venom from the master, not only at Argent Dawn Honored (R); Forever’s Potent Anti-Venom (N) | “The Spider’s Gift”: Medic Tamberlyn (Theramore) / Apothecary Helbrim (the Crossroads) |
| **Plaguewarden** | The Argent Dawn’s medics: fever, rot and plague. Warriors, rogues, hunters, mages, warlocks: the classes with no cure for disease. | a poultice that cures a disease and a fever draught (N: new items using an existing cure spell); plague jobs in the Plaguelands for Argent Dawn standing (W) | “Rot in the Wound”: Alchemist Arbington (Chillwind Camp) / Apothecary Dithers (the Bulwark); master the Argent Medic (Light’s Hope Chapel, both) |

### Tree

| Rank | Node | Effect | How |
|---|---|---|---|
| Journeyman | Venom | Anti-Venom, then Strong Anti-Venom by a job | R |
| Journeyman | Steady Hands | +5 First Aid | S, new id |
| Expert | The path | the marker | M |
| Expert | Gift I | one more bandage / venom sacs / the poultice | H1 / L / N |
| Artisan | Triage | Runecloth and Heavy Runecloth, as today | R |
| Artisan | Gift II | quicker bandage / Powerful and Potent Anti-Venom / the fever draught and Argent jobs | H / R, N / N, W |
| Master | Light’s Hope Rounds | a weekly round with the Argent Medic | W |

### Ranks

| Rank | Teachers | Test | Jobs |
|---|---|---|---|
| Apprentice | Shaina Fuller, Nissa Firestone, Dannelor, Michelle Belle, Thamner Pol, Byancie / Arnok, Pand Stonebinder, Mary Edras, Nurse Neela, Rawrk, Vira Younghoof | — | Linen Bandages for the starting zone’s guards |
| Journeyman | Fremal Doohickey (Menethil) / Rawrk (Razor Hill) | below | below |
| Expert | Deneb Walker (Stromgarde Keep) / Balai Lok’Wein (Brackenwall Village): today’s book sellers, now teachers | Heavy Silk Bandages for Stromgarde’s / Brackenwall’s wounded | the path’s entry quest |
| Artisan | Doctor Gustaf VanHowzen (Theramore) / Doctor Gregory Victor (Hammerfall) | Triage, 1.12’s own (timed) | — |
| Master | the Argent Medic (Light’s Hope) | — | Light’s Hope Rounds |

**Journeyman First Aid, written out.** Fremal Doohickey, Menethil Harbor’s gnome medic, and Rawrk at Razor Hill take healers of
skill 50 and level 10. Lesson one, “Wool and Pressure” (5): a Wool Bandage made and why pressure comes first. Lesson two, “The
Small Bite” (5 and Anti-Venom): Small Venom Sacs from the Wetlands’ / Durotar’s spiders and scorpids. Lesson three, “When the
Bite Is Worse” (5 and **Strong Anti-Venom**, which today is a 0.8% drop spread over 417 kinds of creature): Large Venom Sacs
from the Wetlands’ / the Barrens’ spiders. The test, “Rounds” (10 and the rank): bandage three wounded guards in the barracks,
1.12’s Triage objects reused at a lower level (W). The jobs (10): Wool Bandages for Menethil’s / Razor Hill’s guards. First
crafts (5) and practice (35 at most) give the rest.

### Feeds, alts, blockers

- **Recipes by quest:** Strong Anti-Venom (above); the Heavy Silk and Mageweave manuals become Expert lesson rewards (the
  vendors keep them); Powerful Anti-Venom also from the Venom-Warden’s master; Crystal Infused Bandage stays out (a placeholder
  reagent). Forever’s field medicine (poultices, tourniquets, healing potions by First Aid) comes as the paths’ N recipes.
- **Feeds and fed by:** cloth from every humanoid and the boxes (world 038); venom sacs shared with Alchemy and Poisons; the
  First Aid Kit camp (07).
- **Alts:** bandages are unbound; the battleground bandages bind, and stay rewards.
- **Blockers fixed:** the anti-venom lottery; disease for classes with no cure.

## Lockpicking and Poisons, where they connect

Lockpicking’s design is this one’s model; its patch (rank caps, the practice share, quest → points) is the Q here, written once
for all eight skills. Poisons takes the same shape (ranks at 16, 24, 35, 50; lessons, experiments, jobs). Where they meet:
the Forager doubles the poison herbs (Bruiseweed, Fadeleaf, the planned Deathweed); the Venom-Warden’s venom sacs are the
rogue’s Essence of Pain and Agony’s kin and feed both; the Wreck-Diver’s fished chests are locked, a rogue’s practice; the
Big-Game Skinner’s named beasts sit beside Ravenholdt’s contracts in the Beast Journal.

## Sharing with alts

- **The gatherer’s mail:** herbs to the alchemist; ore, bars, stones and gems to the smith and engineer; leather, scales and the
  salt to the leatherworker; fish and meat to the cook; cloth and venom sacs to the medic. All unbound.
- **The wait:** every letter carries one item and waits an hour (`MailDeliveryDelay = 3600`), even between one’s own
  characters. Down to a minute for a solo server (C).
- **Across factions:** `AllowTwoSide.Interaction.Mail = 1` lets a Horde gatherer feed an Alliance crafter (C, the user’s
  choice); today only the goblin auction houses cross.
- **Bound where it shouldn’t be:** the Goblin Mining Helmet (make it Bind on Equip). Path rewards, Nat’s gear and recipe items
  from rank quests bind on purpose: earned by each character.
- **Forever UI:** recipe and material tooltips name the alt who knows or needs it (inspect_export already writes every alt’s
  skills).
- **Two primaries:** gathering takes a primary slot; `MaxPrimaryTradeSkill` could make it three (C), a choice for the crafts’
  plan.

## Costs and order

| Step | What | Labels | Cost |
|---|---|---|---|
| 1 | Part C’s proofs: a castable spell under a new id; the marker as Riding’s passive rows | M, N | medium |
| 2 | Cooking’s mirror (15 roads), Savory Deviate Delight and Lean Wolf Steak by quest; Strong Anti-Venom by quest; the Horde lure quests at Ratchet | W, R | low: quests and NPC rows |
| 3 | The mirrored teachers: Crossroads miner, Camp Taurajo skinner, Nijel’s Point and Feathermoon skinners, the Wildhammer angler | W | low |
| 4 | Ranks by quest: trainers stop selling Journeyman and up; every rank’s lessons, test and jobs (6 skills × 4 ranks) | W, R | low each, many quests: the largest writing job |
| 5 | Lockpicking’s patch made general: quest → points, the floor on a rank’s test, the practice share | Q | medium, once (shared) |
| 6 | Paths: markers, entry quests, the loot rows | M, W, L | low; most gifts of Herbalism, Mining, Skinning and Fishing are L |
| 7 | The +skill and stat passives | S, A | low |
| 8 | Smelt Dark Iron at Thorium Point; Refined Deeprock Salt from tanners; Goblin Mining Helmet bound on equip | W | low |
| 9 | The craft-yield hook (Smelter, Cooking’s three paths, Field Surgeon, Venom-Warden) | H1 | medium, once |
| 10 | The switch gossip; the first-find list; mending on pick; the quicker bandage; Hearty Meals | H | medium each |
| 11 | New recipes: Forever’s dishes, teas, poultices, anti-venom, Heavy Thorium; the Horde’s six regional dishes | N | medium each, after the SpellReagents loader |
| 12 | Forever UI: the Journey page in every journal, path cards, trees; Cooking and First Aid pages | addon | medium, web preview first |

Order: steps 2 and 3 first (they fix the faction gaps with no code), then 4 and 5 together (the ranks need the points patch),
then 6 to 8 (the paths’ cheap half), then 9 and 10, and 11 last. Each step is previewed on the web, then installed after the
tests, one skill at a time, Cooking first (the most one-sided today).
