# Professions, part E1: the six crafts, designed for one player and alts

Design for the professions plan (2026-10-10, unattended), on parts A–D: the numbers are
[02-our-server-audit.md](02-our-server-audit.md)’s, the mechanisms [03-feasibility.md](03-feasibility.md)’s, the borrowed ideas
[01](01-forever-and-classic.md)’s and [04](04-later-expansions-and-other-servers.md)’s. New professions and the shared upgrade,
tree and alt systems are part 07’s; this file keeps to the six crafts. Names, places and quests were checked by SELECTs on
`classicmangos` and in the CMaNGOS source; nothing changed.

The rules: no grinds (recipes through quests, teachers, tests and real places; a rare drop becomes a choice of one); every
dropped recipe moves to its profession’s quests; Alliance and Horde mirrored; the world, not the player, is the hero; the past by
the Chronicle books, the present by 1.12.

**How each change is built** (the tags in every table):

| Tag | Means | Code? |
|---|---|---|
| Q | world patch: quests, vendors, trainers, spawns, loot, conditions | none |
| R | a recipe taught by a trainer row behind a condition, or a quest’s `RewSpellCast` | none |
| I | an existing item changed (binding, price, quality) by `item_hotfixes.py` | none |
| A | a new passive or marker spell: `spell_template` and proxy hotfix rows, as Riding’s 33388–33392 | rows only |
| A\* | an existing 1.12 spell the client knows (a racial +skill passive) | none |
| N | a new recipe spell: hotfix rows; skill-ups need the DBC writer, the reagent list the SpellReagents loader | writer, loader |
| H | a mangosd hook (an extra item, a yield) | C++ |
| C | a ScriptDev2 gossip (switching paths) | C++ |

## Overview

| Craft | Paths (✱ new) | Headline changes |
|---|---|---|
| Alchemy | Apothecary✱, Elixirist✱, Transmuter✱ | 49 drop-only or unlearnable recipes into rank quests; Alchemy Labs at Feathermoon and Stonard; the Transmuter as the alts’ supplier |
| Blacksmithing | Armorsmith, Weaponsmith (Sword, Hammer, Axe), Mithril Order✱ | 105 plans into quests; the Black Anvil and Forge at Thorium Point; Fiery and Lava Core by Brotherhood quests; green sets tempered into blues |
| Enchanting | Spellbinder✱, Warder✱, Artificer✱ | the Artisan rank and Annora’s ten formulas at Kitta Firewind and Hgarth; enchanting scrolls so alts can share |
| Engineering | Gnomish, Goblin, Gunsmith✱ | the 175–199 hole filled; nine unlearnable schematics as rewards; rifles, scopes and shot for hunters |
| Leatherworking | Dragonscale, Elemental, Tribal | a role for every hide, scale and special leather; scales into mail by tier; stat kits from cured hides; Refined Deeprock Salt sold |
| Tailoring | Moonweaver✱, Shadoweaver✱, Runeweaver✱ | the 260–300 gap filled; the Stormcloth set and lost patterns taught; a bag in each path; faster Mooncloth |

## Shared rules

- **A path** is chosen as in 1.12: a quest at its master teaches a marker spell (effect 47, like 9788 Armorsmith); the path’s
  recipes sit on the master’s trainer list behind `condition_id` (has the marker). Skill 200 for Blacksmithing and Engineering
  (1.12’s), 225 for the rest; level 40 (Engineering 30). Mirrored masters, or one neutral master for both sides.
- **Switching** is **C** either way: 1.12’s own (`npc_professions.cpp`) is half-ported. Its Leatherworking branch casts TBC spells
  36434, 36328 and 36433, absent from `spell_template`, so `EquippedOk` fails and the gossip refuses; the Blacksmithing confirm
  removes nothing (source, untried). Proposal: switch at the new master for 1.12’s price (25 gold below level 51, 50 after),
  losing the old path’s recipes; coming back costs only trainer fees. No-code alternative: no switching, but a second path at
  skill 300 by a long mastery quest (04: Season of Discovery let paths be learned in turn).
- **Commissions:** each rank has a repeatable trainer quest asking for goods of that rank (skill-ups on the way) and paying a
  **choice of one** recipe; done again, it pays the next. Rewards stay unbound, so a second copy can go to an alt. 1.12’s models:
  Pratt McGrubben’s Wild Leather quests (2847–2853), Derotain Mudsipper’s Imperial Plate (7653–7659), Tormus Deepforge’s
  “Gearing Redridge”.
- **Dungeon recipes** become a dungeon quest’s choice of one (the plan’s 3–5 runs a dungeon, bots in the group). Raid recipes stay
  in raids unless a faction sells them at Revered. Limited-vendor recipes stay with their vendors.

## Alchemy

### 1. Paths

| Path | Identity, who it suits | Unlocks | Quest (Alliance / Horde) |
|---|---|---|---|
| Apothecary | potions that keep one player alive; every class alone, healers | the six Greater Protection Potions, Purification, Restorative, Major Rejuvenation; Alchemist’s Stone at 300 | “A Field Hospital”: Lilyssia Nightbreeze (Stormwind) to Refuge Pointe / Doctor Herbert Halsey (Undercity) to Hammerfall |
| Elixirist | elixirs, oils and flasks for long fights; warriors, rogues, hunters, casters | Mongoose, Giants, Brute Force, Greater Arcane, Greater Firepower, Sages, Superior Defense; the five flasks | “Roots of the Wild”: Kylanna Windwhisper (Feathermoon, Feralas) / Rogvar (Stonard, Swamp of Sorrows) |
| Transmuter | the Philosopher’s Stone’s work: Arcanite, elementals, Truesilver, dyes, Goblin Rocket Fuel; the alt who supplies smiths, leatherworkers, engineers, tailors | every transmute, Ghost Dye, Goblin Rocket Fuel, Refined Scale of Onyxia | “The Steamwheedle Assay”: Jaxin Chong (Booty Bay, both sides), for the cartel’s bankers |

### 2. Tree

| Skill | Node | Effect | Tag |
|---|---|---|---|
| 125 | Steady Hands | +10 Alchemy | A |
| 175 | Field Notes | Elixirs of Waterwalking and Tongues, Cowardly Flight Potion: 1.12 recipes nobody teaches | R |
| 225 | The path | marker | A |
| 250 | Second Draught (Apothecary, Elixirist) | 15% chance of an extra potion, or elixir and flask (TBC’s masteries; `skill_extra_item_template` is already in the database) | H |
| 250 | Quick Study (Transmuter) | every transmute on a 1-day cooldown (`CategoryRecoveryTime`; whether the client shows the server’s timer needs a test) | Q |
| 275 | Path recipes | the master’s list | R |
| 300 | Capstone | Alchemist’s Stone; Flasks of Distilled Wisdom and Chromatic Resistance; a 20% chance of a second Arcanite Bar | R / H |

### 3. Recipe quests

| Rank | Quest | Giver (A / H) | Choice of one |
|---|---|---|---|
| Apprentice | “Tinctures for the Road” (rep.) | Tally Berryfizz (Ironforge) / Yelmak (Orgrimmar) | Elixir of Minor Agility, Swiftness Potion; Discolored Healing Potion for both sides |
| Journeyman | “Remedies of the Wilds” (rep.) | Ainethil (Darnassus) / Doctor Marsh (Undercity) | Giant Growth, Minor Magic Resistance, Poison Resistance, Lesser Agility, Ogre’s Strength |
| Expert | “Badlands Reagent Run” (rep., after 1.12’s 2203) | Lucien Tosselwrench (Badlands, both) | Fortitude, Detect Lesser Invisibility, Magic Resistance, Wildvine |
| Expert | “The Dark Iron Recipe” | Hansel Heavyhands (Thorium Point) | Elixir of Greater Firepower |
| Artisan | “The Wardens’ Draughts” (below) | Kylanna Windwhisper / Rogvar | the six Greater Protection Potions |
| Artisan | “Stocking the Outposts” (rep.) | the same | Invisibility, Dream Vision, Giants, Limited Invulnerability, Greater Stoneshield, Greater Arcane, Purification |
| Artisan | path chains | the masters | Mongoose (Felwood’s satyrs), Gift of Arthas (the Argent Dawn at Chillwind Camp / the Bulwark), Mighty Rage, Sages, Restorative, flasks, transmutes |

**Example chain: “The Wardens’ Draughts”** (skill 265; Kylanna Windwhisper at Feathermoon / Rogvar at Stonard)

1. *Proof Against Fire.* Bring 6 Essence of Fire from the Searing Gorge’s elementals to Hansel Heavyhands at Thorium Point, who
   tries a draught in the Brotherhood’s forge. Reward: Greater Fire or Greater Frost Protection Potion.
2. *Shadow and Thorn.* Fill 8 vials from the tainted pools of Jaedenar in Felwood and brew 4 Shadow Protection Potions.
   Reward: Greater Shadow or Greater Nature Protection Potion.
3. *What the Light Allows.* Carry the brews to the Argent Dawn at Light’s Hope Chapel. Reward: Greater Holy (unlearnable today)
   or Greater Arcane Protection Potion.
4. *Wardens’ Draughts* (repeatable). Five Greater Protection Potions of any kind; a choice of the six.

### 4. Materials

| Material | Today | Proposed |
|---|---|---|
| Crimson Lotus (20 kinds) | nothing | Elixirist: a Lotus Elixir of Spirit (N) |
| Fish Scale, Lightning Eel, Plated Armorfish | nothing, or quests | Apothecary: Scaleskin Potion (armor); Elixirist: Elixir of the Eel (water breathing, swim speed) (N) |
| Tomb Dust, Grave Moss, Arthas’ Tears | 0–2 recipes | the Apothecary’s Plaguelands line: Gift of Arthas, Purification, a disease-resistance potion (N) |
| Delicate Feather | 1, unlearnable | Cowardly Flight Potion taught (R) |
| Breath of Wind, Globe of Water | 3, 6 | Water to Air and back on the Transmuter’s list, not a limited vendor’s (R) |
| — | — | Transmuter dyes for Leatherworking’s and Tailoring’s upgrades (Forever’s idea) (N) |

### 5. Upgrades

Alchemy’s gear is its stones: Philosopher’s Stone (green) and 8 of each Essence make the Alchemist’s Stone (epic), which nobody
teaches today. First a quest that takes the one and gives the other (Q), then a recipe that eats it (N).

### 6. Alts

106 of 107 products are unbound. Links: Arcanite (40 recipes), elemental transmutes, Goblin Rocket Fuel, dyes. Cooldowns are
per character: a second Transmuter alt doubles the supply.

### 7. Solo blockers

- **Alchemy Lab** (Scholomance, Blackwing Lair: flasks, the Alchemist’s Stone): a lab beside Kylanna Windwhisper and Rogvar, the
  Artisan masters (Q: a type-8 object with focus 663, as 177387). The dungeon labs stay.
- **Raid materials:** Major Rejuvenation’s recipe moves to the Apothecary; Gurubashi Mojo Madness and Refined Scale of Onyxia
  stay with their raids.

## Blacksmithing

### 1. Paths

| Path | Identity, who it suits | Unlocks | Quest (A / H) |
|---|---|---|---|
| Armorsmith | plate and mail for warriors and paladins | 1.12’s 22 gated plans; Dark Iron and Enchanted Thorium armor; Imperial Plate tempering | 5283 / 5301: Grumnus Steelshaper (Ironforge) / Okothos Ironrager (Orgrimmar) |
| Weaponsmith, then Swordsmith, Hammersmith or Axesmith at 250 | weapons for warriors, paladins, shamans, rogues | 1.12’s plans; the masters’ blues, Serenity, Corruption | 5284 / 5302: Ironus Coldsteel / Borgosh Corebender; Lilith the Lithe, Kilram, Seril Scourgebane (Everlook) |
| Mithril Order ✱ | the metal itself: alloys, fittings, tools (spikes, spurs, chains, stones, rods for enchanters, cylinders for engineers, keys), Ornate Mithril; every alt’s supplier | Inlaid Mithril Cylinder and Inlaid Thorium Hammer (unlearnable), spikes and spurs, Elemental Sharpening Stone (Molten Core today), Incendicite and Indurium alloys | 1.12’s chain: Hank the Hammer (Stormwind) / Ox (Orgrimmar), to McGavan and Galvan the Ancient (Stranglethorn, 2757–2765); the marker on its last step |

### 2. Tree

| Skill | Node | Effect | Tag |
|---|---|---|---|
| 125 | Hammer and Tongs | +10 Blacksmithing | A |
| 175 | Old Plans Recovered | Ironforge Chain and Gauntlets, Rough Bronze Bracers, Mithril Scale Gloves (nobody teaches them) | R |
| 200 | The path | 1.12’s markers; Mithril Order new | R / A |
| 225 | The Art of the Imbue (Mithril Order) | Galvan’s alloys: Incendicite and Indurium bars | N |
| 250 | The masters’ edge | +5 Swords (20597), Maces (20864) or Axes (20574): the racials, reused | A\* |
| 260 | Black Anvil at Thorium Point | Dark Iron work outside Blackrock Depths (section 7) | Q |
| 275 | Tempering | the path’s green-to-blue upgrades (section 5) | Q, then N |
| 300 | Masterwork | 10% chance of a second bar smelting Thorium, Arcanite or Dark Iron | H |

### 3. Recipe quests

| Rank | Quest | Giver (A / H) | Choice of one |
|---|---|---|---|
| Apprentice | “Supplying the Front” (1.12’s 1578, repeatable) | Tormus Deepforge (Ironforge) / Orokk Omosh (Orgrimmar) | Gemmed Copper Gauntlets, Runed Copper Breastplate, Ironforge Chain |
| Journeyman | “Silver and Bronze” (rep.) | Therum Deepforge (Stormwind) / Saru Steelfury (Orgrimmar) | Silvered Bronze (3), Deadly Bronze Poniard, Iridescent Hammer, Green Iron (3), Mighty Iron Hammer, Iron Shield Spike |
| Journeyman | 1.12’s side quests mirrored | Tormus Deepforge / Orokk Omosh | the Barbaric Iron set and Orcish War Leggings for the Alliance; Ironforge Breastplate and Golden Scale Gauntlets for the Horde |
| Expert | “The Golden Scale” (below) | Bengus Deepforge (Ironforge) / Saru Steelfury | the Golden Scale set, Golden Iron Destroyer, Jade Serpentblade, Searing Golden Blade, Frost Tiger Blade, Shadow Crescent Axe |
| Expert | Mithril Order commission | Galvan the Ancient (both) | Iron Counterweight, Steel Weapon Chain, Polished Steel Boots, Mithril Shield Spike, Heavy Mithril Pants |
| Artisan | “Brikk’s Orders” (rep.) | Brikk Keencraft (Booty Bay, both) | the Mithril Scale, Heavy Mithril, Thorium and Radiant lines; Mithril Spurs; Dazzling Mithril Rapier, Runed Mithril Hammer, Blue Glittering Axe, Wicked Mithril Blade, Thorium Greatsword, Rune Edge |
| Artisan | “The Brotherhood’s Forge” | Master Smith Burninate (Thorium Point) | Dark Iron Mail and Shoulders, Dark Iron Pulverizer, Volcanic Hammer; Fiery Plate Gauntlets beside Malyfous Darkhammer’s 5124 |
| Artisan | “Runes Against the Scourge” | Craftsman Wilhelm (Light’s Hope) | the Runic Plate set (elite drops today) |
| Artisan | path masters | as section 1 | Invulnerable Mail, Stronghold Gauntlets, Whitesoul Helm, Wildthorn Mail, Lionheart Helm, Titanic Leggings, Helm of the Great Chief, Dawnbringer Shoulders; Bleakwood Hew, Blood Talon, Darkspear, Persuader, Sageblade, Frostguard |

The dungeon plans (Annihilator, Arcanite Reaper and Champion, Heartseeker, Dawn’s Edge, Blazing Rapier, the hammers, Dark Iron
Plate and Sunderer, Demon Forged Breastplate) go to Blackrock Depths’, Scholomance’s and Stratholme’s quests.

**Example chain: “The Golden Scale”** (skill 170; Bengus Deepforge at the Great Forge / Saru Steelfury in Orgrimmar)

1. *Scales of Gold.* Smelt 10 Steel Bars; bring 2 Gold Bars and 2 Citrines. Reward: Golden Scale Shoulders or Leggings.
2. *Armor for the Marsh.* Take two Golden Scale pieces to Theramore’s garrison / Brackenwall Village, where Dustwallow’s damp
   eats iron. Reward: Golden Scale Coif or Boots.
3. *The Last Scale.* Bring a piece and 4 Steel Bars for the master to judge. Reward: Golden Scale Cuirass or Gauntlets
   (Alliance-only today).
4. *Golden Scale Orders* (repeatable). Two Golden Scale pieces; the rest of the Expert list.

### 4. Materials

| Material | Today | Proposed |
|---|---|---|
| Broken Blade of Heroes (a blue from 336 kinds) | nothing | Weaponsmith: “The Blade Reforged”, the blade with Steel and a Jade into a blue sword at level 40 (Q, then N) |
| Incendicite, Indurium Ore | quests only | Mithril Order alloys: fire-touched bronze at 25–30, keys and rods at 40 (N) |
| Pristine Black Diamond | nothing | the masters’ upgrades (below), the Artificer’s top wand |
| Skeleton key recipes (pointless since world 050/052) | 4 | Mithril Order goods that Ravenholdt and the footlocker quests ask for (Q) |
| Elementium Bar, Sulfuron Ingot | raid | stay raid |

### 5. Upgrades

| From (green) | To | How |
|---|---|---|
| Ornate Mithril Breastplate (43) | Truesilver Breastplate (blue, existing) | Armorsmith: 6 Truesilver Bars, 2 Star Rubies |
| Dazzling Mithril Rapier | Blazing Rapier (blue, existing) | Swordsmith: Heart of Fire, Pristine Black Diamond |
| Thorium Greatsword | Arcanite Champion (blue, existing) | Swordsmith: Arcanite Bars |
| Golden Scale Cuirass | Gilded Golden Scale Cuirass (blue, new) | Truesilver, Citrine |
| Imperial Plate (green, 54–55) | Tempered Imperial Plate (blue, new) | Armorsmith: Enchanted Thorium, Star Ruby |

First a quest that takes A and gives B (Q), then a recipe that eats A (N). New ids are built by the proxy; existing blues need
nothing.

### 6. Alts

172 of 232 items are Bind on Equip, but 61 of 151 plans bind on pickup: those moved to quests become unbound (I), and so does
Skin of Shadow. Links: rods for enchanters, cylinders for engineers, stones for everyone; in come Arcanite, Enchanted Thorium,
Rugged Leather.

### 7. Solo blockers

- **Black Anvil and Black Forge** (Blackrock Depths: 21 and 3 recipes, Smelt Dark Iron): after “Gaining Acceptance” (7737), Master
  Smith Burninate’s “A Forge for the Brotherhood” spawns both by Thorium Point’s anvil (Q: spare focus objects 174825 and 174824
  exist) and teaches Smelt Dark Iron at Honored; Gloom’rel still teaches inside. Dark Iron Deposits are mined in the Searing Gorge
  and Burning Steppes. Whether the client accepts a new focus object is a guess: try one first.
- **Fiery and Lava Core** (Molten Core; 26 and 25 recipes): repeatable Brotherhood quests at Honored, like 1.12’s “Restoring Fiery
  Flux Supplies”: a Fiery Core for 3 Heart of Fire, 2 Essence of Fire and a Dark Iron Bar; a Lava Core for 3 Core of Earth, an
  Essence of Fire and a Dark Iron Bar (Q).
- **Icebellow Anvil** (Naxxramas; world 001’s 13 recipes): its focus beside Craftsman Wilhelm at Light’s Hope; Frozen Rune from
  a repeatable Argent Dawn quest at Revered (Q).

## Enchanting

### 1. Paths

| Path | Identity, who it suits | Unlocks | Quest (A / H) |
|---|---|---|---|
| Spellbinder ✱ | weapon enchantments: Crusader, Fiery Weapon, Icy Chill, Lifestealing, Unholy, the slayers; melee and hunters | the master’s weapon list | “Binding the Blade”: Kitta Firewind (Tower of Azora, Elwynn) / Hgarth (Sun Rock Retreat, Stonetalon) |
| Warder ✱ | armor enchantments, resistances, Stamina, Spirit; tanks, healers, survival alone | the armor list; Cloak – Greater Resistance, Dodge, Stealth; the four Gloves Power formulas | “The Warding Arts”: Taladan (Darnassus) / Teg Dawnstrider (Thunder Bluff) |
| Artificer ✱ | things: wands, rods, oils, Enchanted Thorium and Leather, the Smoking Heart, scrolls; crafting alts, casters | Runed Arcanite Rod, Smoking Heart, wands past Greater Mystic Wand, scrolls | “Annora’s Workshop”: Lucan Cordell (Stormwind) / Lavinia Crowe (Undercity); Annora (Uldaman) as an optional last step |

### 2. Tree

| Skill | Node | Effect | Tag |
|---|---|---|---|
| 125 | Steady Rod | +10 Enchanting | A |
| 175 | Shard Sense | 10% chance of one more dust or essence when disenchanting | H |
| 225 | The path | marker | A |
| 250 | The master’s list (Spellbinder, Warder) | the path’s formulas | R |
| 250 | Double Infusion (Artificer) | Enchanted Thorium and Leather two at a time | N |
| 275 | Scrollwork | a formula on an unbound scroll (section 6) | N |
| 285 | Self Ward | the enchanter’s own rings take a small enchant (Wrath’s perk, an existing enchant id) | N, guess |
| 300 | Capstone | Crusader; Chest – Greater Stats; Smoking Heart of the Mountain | R |

### 3. Recipe quests

| Rank | Quest | Giver (A / H) | Choice of one |
|---|---|---|---|
| Apprentice | “Sparks of the Arcane” (rep.: 10 Strange Dust) | Lucan Cordell / Godan (Orgrimmar) | Bracer – Minor Spirit, Minor Strength; Chest – Lesser Mana for both (Horde-only today) |
| Journeyman | “Charms of the Wilds” (rep.) | Gimble Thistlefuzz (Ironforge) / Teg Dawnstrider | Minor Beastslayer, 2H – Lesser Spirit, Shield – Lesser Protection, Bracer – Lesser Spirit, Cloak – Lesser Shadow Resistance; Gloves – Fishing, Herbalism, Mining |
| Expert | “Tower and Retreat” (rep.) | Kitta Firewind / Hgarth | Lesser Beastslayer, Lesser Elemental Slayer, Boots – Lesser Spirit, Shield – Lesser Block and Stamina, Gloves – Skinning and the Advanced pair, Bracer – Greater Spirit, Cloak – Lesser Agility |
| Artisan | “Annora’s Ledger” (below), then a commission | Kitta Firewind / Hgarth | Demonslaying, Shield – Frost Resistance; Bracer – Greater and Superior Stamina, Superior Spirit; Gloves – Riding Skill, Greater Agility; Boots – Greater Stamina, Spirit, Greater Agility; Chest – Greater Stats; Superior Striking |
| Artisan | path chains | the masters; Archmage Xylem (Azshara) for Icy Chill; the Argent Dawn for Crusader | the elite, mob and dungeon formulas |

Winter’s Might stays Winter Veil’s; raid formulas stay raid.

**Example chain: “Annora’s Ledger”** (the Artisan rank; Kitta Firewind / Hgarth, whose title already reads “Artisan Enchanter”)

1. *A Letter from Uldaman.* Annora writes that the titans’ vaults keep her below the Badlands, and that Shadowforge dwarves at
   Angor Fortress stole her ledger. Recover it. Reward: 2 Large Radiant Shards.
2. *The Student’s Test.* Enchant a weapon with Greater Striking and a chest with Stats (taught for the test); bring 10 Vision
   Dust. Reward: **Artisan Enchanting** (13921, by `RewSpellCast`) and Bracer – Greater Stamina, Boots – Greater Stamina or
   Gloves – Greater Agility.
3. *Annora’s Thanks* (optional, in Uldaman). Return the ledger. Reward: Gloves – Minor Haste or Runed Arcanite Rod, and the
   repeatable commission.

### 4. Materials

Dusts, essences and shards are well used. The thin ones: Arcane Crystal (1 recipe) and Pristine Black Diamond (none) into the
Artificer’s wands and an off-hand orb (N, Forever’s idea); pearls into the rods; Breath of Wind and Globe of Water into the
Warder’s resistance formulas (N).

### 5. Upgrades

An enchant doesn’t change an item’s color (03). Enchanting’s own ladder is the wands: Lesser Magic (green, level 5) to Greater
Mystic (green, 30), then new Artificer wands at 40, 50 and 58, the last blue (N). Its share in others’ upgrades is Enchanted
Thorium and Leather.

### 6. Alts

Alone with alts, an enchanter can enchant only what it holds, and worn gear is soulbound. **Enchanting scrolls** solve it: an
unbound scroll whose use spell is the formula’s own (existing spell ids, a new item), mailed to any alt of the side. First as a
quest (an essence and a Blank Parchment for a scroll, Q), then the Scrollwork recipe (N).

### 7. Solo blockers

- **Annora:** the Artisan rank and her ten formulas (Enchanted Leather and Thorium among them, which 68 other recipes need) move
  onto Kitta Firewind and Hgarth (Q); Annora keeps hers.
- **Black Forge** for the Smoking Heart: Thorium Point’s (Blacksmithing).

## Engineering

### 1. Paths

| Path | Identity, who it suits | Unlocks | Quest (A / H) |
|---|---|---|---|
| Gnomish | devices that bend the rules: World Enlarger, Net-o-Matic, Shrink and Death Rays, Ultrasafe Transporter: Gadgetzan; casters, tinkerers | 1.12’s list; Alarm-O-Bot and World Enlarger by quest | 3641 / 3643 “Show Your Work”: Tinkmaster Overspark (Ironforge) / Oglethorpe Obnoticus (Booty Bay) |
| Goblin | explosives and brute machines: Sapper Charge, Bomb Dispenser, Dragon Gun, Rocket Helmet, Dimensional Ripper: Everlook; warriors, rogues | 1.12’s list; Jumper Cables XL, Dark Iron Bomb, Hyper-Radiant Flame Reflector | 3639: Nixx Sprocketspring (Gadgetzan, both) |
| Gunsmith ✱ | firearms and shot; hunters (the main is one) | Dark Iron and Flawless Arcanite Rifles, Explosive Arrow (unlearnable), Power Crystal scopes; the other rifles stay general | “Show Your Aim”: Bretta Goldfury (Ironforge) / Hogor Thunderhoof (Thunder Bluff), to Synge, the Mirage Raceway’s gun merchant (both) |

### 2. Tree

| Skill | Node | Effect | Tag |
|---|---|---|---|
| 125 | Tinkerer’s Knack | +15 Engineering: 20593, the gnomes’ racial (gnomes get a schematic instead) | A\* |
| 175 | The Gadgeteer’s Apprenticeship | the chain below, filling 175–199 | R |
| 200 | The path | Gnomish and Goblin markers exist; Gunsmith new | R / A |
| 225 | Steady Aim (Gunsmith) | +5 Guns (20595) and +5 Bows (26290), the dwarves’ and trolls’ racials | A\* |
| 250 | Salvage | a crafted device broken into parts (Forever’s Arcane Salvager) | N |
| 275 | Path recipes | the masters’ dungeon and elite schematics | R |
| 300 | Field Repair Bot 74A | for every engineer; nobody teaches it today | R |

### 3. Recipe quests

| Rank | Quest | Giver (A / H) | Choice of one |
|---|---|---|---|
| Apprentice | “Clockwork Critters” (rep.) | Sprite Jumpsprocket (Stormwind) / Thund (Orgrimmar) | Mechanical Squirrel; Blue and Red Firework for both sides |
| Journeyman | “Boom and Bang” (rep.) | Lilliam Sparkspindle (Stormwind) / Nogg (Orgrimmar) | EZ-Thro Dynamite, Small Seaforium Charge, Shadow Goggles, Moonsight Rifle |
| Expert | “The Gadgeteer’s Apprenticeship” (below) | Springspindle Fizzlegear (Ironforge) / Roxxik (Orgrimmar) | Bright-Eye Goggles, Craftsman’s Monocle, Portable Bronze Mortar, Goblin Land Mine, Large Seaforium, Catseye Ultra Goggles, Mithril Heavy-bore Rifle, Parachute Cloak, Spellpower Goggles Xtreme, Mobile Alarm |
| Artisan | “Buzzek’s Hard Cases” (rep.) | Buzzek Bracketswing (Gadgetzan, both) | Sniper Scope, Thorium Rifle and Shells, Lifelike Mechanical Toad, Arcane Bomb, Spellpower Goggles Xtreme Plus; Goblin “Boom” Box, Gnomish Ham Radio, Goblin Radio, Steam Tonk Controller, Major Recombobulator |
| Artisan | Gnomeregan and dungeon quests | Tinkmaster Overspark / Nixx; dungeon givers | Flame Deflector, Discombobulator Ray, Master Engineer’s Goggles, Voice Amplification Modulator, Ultra-Flash Shadow Reflector |
| Artisan | path masters | as section 1 | Arcanite Dragonling (elite), Flawless Arcanite Rifle (Mossflayer Shadowhunters: an Argent Dawn quest) |

Rockets and SnowMaster 9000 go to the Lunar Festival’s and Winter Veil’s vendors; raid schematics stay raid.

**Example chain: “The Gadgeteer’s Apprenticeship”** (skill 175; Springspindle Fizzlegear / Roxxik, to Gadgetzan)

1. *Lenses for a Long Road.* Make 4 Bronze Tubes; bring 2 Moss Agates. Reward: Bright-Eye Goggles or Craftsman’s Monocle.
2. *Parts for the Raceway.* Take 6 Heavy Blasting Powder and 2 Bronze Frameworks to the Mirage Raceway in Thousand Needles, to
   Fizzle Brassbolts’ gnomes or Pozzik’s goblins, your choice. Reward: Portable Bronze Mortar or Goblin Land Mine.
3. *Buzzek’s Exam.* Show Buzzek Bracketswing in Gadgetzan a Large Seaforium Charge (taught for the exam). Reward: the rest of the
   Expert list, and the repeatable “Raceway Orders”.

### 4. Materials

Bars, stones, leather and cloth are well used; Blank Parchment, Engineer’s Ink, Flask of Oil and Wooden Stock are vendor goods.
Power Crystals go into the Gunsmith’s scopes (N); gray lookalikes into shot and powder: Lead Ore into low-level shot, Jagged
Piece of Stone, Smooth Stone Chip and Black Stone into blasting powder (N; the grays made white, I).

### 5. Upgrades

| From (green) | To | How |
|---|---|---|
| Moonsight Rifle (24) | a blue rifle of its level (new) | Gunsmith: Bronze Tubes, Citrine |
| Thorium Rifle (47) | Flawless Arcanite Rifle (blue, existing) | Gunsmith: Arcanite, Power Crystals |
| Catseye Ultra Goggles | Truesight Goggles (blue, new) | a Truesilver Transformer |

### 6. Alts

101 of 160 products are unbound; devices with `requiredspell` stay with their path. Links: the Salt Shaker, tubes and widgets,
scopes and shot for a hunter alt; in come Arcanite, Goblin Rocket Fuel and leather.

### 7. Solo blockers

None of note: Artisan is Buzzek Bracketswing’s alone, but in neutral Gadgetzan; the Black Anvil schematics use Thorium Point’s.

## Leatherworking

The deepest treatment: the fullest ladder, the most materials, two hard blockers.

### 1. Paths (1.12’s three)

| Path | Identity, who it suits | Unlocks | Quest (A / H) |
|---|---|---|---|
| Dragonscale | mail of the dragonflights; hunters and shamans from 40 | Dragonscale Gauntlets and Breastplate; Green, Blue, Black, Red Dragonscale; the Onyxia and Chromatic pieces | 5141 / 5145: Peter Galen (Azshara) / Thorkaf Dragoneye (Badlands) |
| Elemental | leather charged with storm, fire and life; rogues, druids, hunters; resistances | Living, Stormshroud, Volcanic; Molten Helm, Lava Belt | 5144 / 5146: Sarah Tanner (Searing Gorge) / Brumn Winterhoof (Arathi Highlands) |
| Tribal | the hunter’s trophies; ferals and hunters | Chimeric, Frostsaber, Ironfeather, Warbear, Devilsaur, Hide of the Wild | 5143 / 5148: Caryssia Moonhunter (Feathermoon) / Se’Jib (Stranglethorn) |

All after “Master of the Wild Leather” (2853 / 2860: Pratt McGrubben / Jangdor Swiftstrider, Feralas). Switching: **C**.

### 2. Tree

| Skill | Node | Effect | Tag |
|---|---|---|---|
| 125 | Tanner’s Eye | +10 Leatherworking | A |
| 175 | Two at a Time | two hides cured per cast, each tier | N |
| 225 | The path | 1.12’s markers | R |
| 250 | Salt of the Deep | Refine Deeprock Salt: two raw into one, no cooldown | N |
| 260 | Stat kits | Forceful, Nimble and Mystic kits at each tier (section 4) | N |
| 275 | Path kits | Dragonscale: the Worn Dragonscale mail line; Elemental: resistance kits; Tribal: trophy kits | N |
| 290 | Thrift | 20% chance of an extra Cured Rugged Hide | H |
| 300 | Capstone | Black Dragonscale Boots; Molten Helm; Hide of the Wild (Brotherhood or dungeon today) | R |

### 3. Recipe quests

| Rank | Quest | Giver (A / H) | Choice of one |
|---|---|---|---|
| Apprentice | “Scraps and Straps” (rep.: 6 Light Armor Kits) | Simon Tanner (Stormwind) / Karolek (Orgrimmar) | Rugged Leather Pants, White Leather Jerkin, Fine Leather Gloves |
| Journeyman | “Leather for the Watch” (rep.) | Fimble Finespindle (Ironforge) / Tarn (Thunder Bluff) | Fine Leather Boots and Pants; Dark Leather Tunic, Gloves, Shoulders; Hillman’s Vest and Belt; Guardian Cloak; Pilferer’s Gloves; Heavy Earthen and Barbaric Gloves |
| Journeyman | mirrors | Karolek for the Horde; a Nijel’s Point vendor (Desolace) for the Alliance | Black Whelp Cloak and Tunic, Red Whelp Gloves, Herbalist’s Gloves, Moonglow Vest; Kodo Hide Bag (769) |
| Expert | “Hides of the Highlands” (rep.) | Telonis (Darnassus) / Una (Thunder Bluff) | Dusky Leggings and Boots; Guardian Belt, Armor, Bracers; Green Whelp Armor; Barbaric Belt; Comfortable Leather Hat; Swift Boots; Big Voodoo Robe and Mask; Gloves of the Greatfather; Raptor Hide Belt and Harness for both |
| Expert–Artisan | “The Wastewander Hides” (below) | Chief Engineer Bilgewhizzle (Gadgetzan, both) | the seven Tough Scorpid pieces |
| Artisan | “Wicked and Runic” (rep.) | Pratt McGrubben / Jangdor Swiftstrider | Wicked Leather Gauntlets, Bracers, Headband, Pants; Runic Leather Gauntlets, Bracers, Belt, Pants; Big Voodoo Cloak and Pants; Heavy Scorpid pieces; Nightscape Cloak, Mongoose Boots |
| Artisan | path chains | the masters | Living, Stormshroud, Volcanic Leggings; the Chimeric and Frostsaber lines, Ironfeather Breastplate, Devilsaur Leggings (a hunt from Marshal’s Refuge); the Green and Blue Dragonscale lines |
| Artisan | dungeon quests | Dire Maul, Blackrock Spire, Scholomance, Stratholme, Wailing Caverns | Gordok Ogre Suit, Swift Flight Bracers, Girdle of Insight, Black Dragonscale Leggings and Shoulders, Red Dragonscale Breastplate, Hide of the Wild, Volcanic Breastplate and Shoulders, Runic and Wicked Leather Armor, Wicked Leather Belt, Deviate Scale Belt |

**Example chain: “The Wastewander Hides”** (skill 220; Chief Engineer Bilgewhizzle, Gadgetzan; in 1.12 the Wastewander bandits
who rob his water drop the Tough Scorpid patterns)

1. *Armor of the Bandits.* The Wastewanders wear scorpid plate the Water Company’s guards can’t match. Bring 10 Scorpid Scales
   from Tanaris’s scorpids and 6 Wastewander Water Pouches. Reward: Tough Scorpid Breastplate or Bracers.
2. *Guarding the Spigot.* Make two Tough Scorpid pieces for Spigot Operator Luglunket’s guards. Reward: Tough Scorpid Gloves or
   Boots.
3. *Firebeard’s Helm.* Andre Firebeard of Lost Rigger Cove wears the best of it: bring back his helm and its pattern. Reward:
   Tough Scorpid Shoulders, Leggings or Helm.
4. *Scorpid Scale for the Water Company* (repeatable). Two Tough Scorpid pieces; the rest of the set.

### 4. Materials: a role for each leather, hide and scale

**Leathers** (Light to Rugged) stay the body of every piece and kit; Ruined Leather Scraps stay Light Leather.

**Hides become the tier’s heavy goods.** Each hide feeds only its curing today. Cured hides keep the chest and legs they make
and gain, at every tier (Light, Medium, Heavy, Thick, Rugged), three **stat kits**: Forever’s Forceful (Strength, Stamina) and
Mystic (Intellect, Spirit) plus a Nimble (Agility). Cured hide, the tier’s leather and a flavor reagent (a claw, a feather, a dust)
put an existing 1.12 enchantment (+3 Agility, +4 Stamina…) on chest, legs, hands or feet (N): fifteen recipes, three new uses
for each hide, a self-buff for every alt. Cured Medium Hide, the thinnest (4 recipes), also takes the Medium Quiver and the Small
Ammo Pouch; Thick and Rugged take the Tribal and Elemental kits.

**Scales become mail by tier**, leather below 40 (hunters and shamans wear mail from 40):

| Scale | Levels | Today | Proposed |
|---|---|---|---|
| Slimy Murloc Scale | 14–20 | belt, breastplate | + gloves and boots: a scaled-leather set (N) |
| Deviate, Perfect Deviate | 18–24 | 3 pieces | Wailing Caverns quest rewards (Q) |
| Black, Red, Green Whelp Scale | 15–35 | 2, 1, 3; Black and Red Alliance-only | both sides; more whelps skinned for them (Q); a whelp cloak line (N) |
| Thick Murloc Scale | 35–45 | 2 | + boots and helm (N) |
| Turtle Scale | 40–45 | 5, the first mail | + belt and boots (N) |
| Scorpid Scale | 45–50 | Tough Scorpid, 7 | the chain above (Q) |
| Worn Dragonscale | 50–55; 23 world and 51 elite kinds | 2, Dragonscale only | **the general 50–55 mail**: Worn Dragonscale bracers, belt, boots, leggings, helm for every leatherworker (N) |
| Heavy Scorpid Scale | 55–60 | 10 | the general 55–60 mail, as today |
| Green, Blue, Black, Red Dragonscale | 55–60 | 3, 3, 6, 2 | Dragonscale’s role sets: Green for healers (nature resistance), Blue for casters, Black for attack power (fire resistance); Red by quest at the dragonflights’ places |

**Special leathers become set pieces:**

| Leather | Today | Proposed |
|---|---|---|
| Thin Kodo Leather | Kodo Hide Bag, a Horde quest | the bag for both; kodo bracers and boots at 15–20 (N) |
| Raptor Hide | belt and harness split by side | both for both (Q); raptor boots (N) |
| Shadowcat Hide (3 kinds) | Dusky Boots, Shadowskin Gloves | a rogue’s Shadowskin set, + belt and mask (N); Stranglethorn’s panthers skin it too (Q) |
| Thick Wolfhide | Wolfshead Helm | a feral set around the helm: cloak and bracers, with Wicked Claw (N) |
| Warbear, Frostsaber, Chimera | 2, 4, 4 | Tribal’s three late lines; + Warbear gloves and boots (N) |
| Devilsaur (elite) | 3 | Tribal’s top; the Un’Goro hunt (Q) |
| Core Leather (Molten Core) | 9 | Thorium Point: 4 Cured Rugged Hide, 2 Heart of Fire, a Dark Iron Bar (Q) |
| Primal Tiger, Primal Bat (Zul’Gurub) | 2, 3 | Tiger: Hemet Nesingwary’s hunt for Stranglethorn’s elder cats (Q); Bat stays raid |
| Silithid Chitin (Ahn’Qiraj elites) | 6 | Cenarion Hold trades it for Silithid Carapace Fragments (Q) |
| Dreamscale (dragons unspawned) | 1 | a Keeper Remulos chain to the four great trees, which grew from Nordrassil’s branches (lore-changes.md) (Q) |
| Jet Black Feather, Wicked Claw; gray feathers, manes, furs (A5) | 2 each; nothing | the Tribal trophy kits; the grays later, made white (I, N) |

**Fixing Cured Rugged Hide’s salt.** 51 recipes wait on an Engineer’s Salt Shaker: one Refined Deeprock Salt per 72 hours
(spell 19566), though raw Deeprock Salt drops from earth elementals at about 20% (Rock Elementals, Dune Smashers, Cliff Giants)
and Cured Thick Hide already takes it raw.
1. **Now (Q, I):** Refined Deeprock Salt sold without limit by Pratt McGrubben and Jangdor Swiftstrider in Feralas, where Artisan
   Leatherworking and the path quests already send you, and by a goblin of the Mirage Raceway on the Shimmering Flats’ salt (both
   sides); its price lowered to 10 silver. The Salt Shaker stays for engineer alts.
2. **Later (N):** Salt of the Deep (tree, 250), or Cured Rugged Hide taking two raw salts like Cured Thick Hide once the
   SpellReagents loader can show it.

### 5. Upgrades

| From (green) | To (blue, new unless noted) | How |
|---|---|---|
| Wild Leather (Pratt’s and Jangdor’s set) | Master Wild Leather | the same givers: Thick Wolfhide, Cured Thick Hide |
| Tough Scorpid | Scorpid-plated | Heavy Scorpid Scale |
| Big Voodoo | Big Voodoo, blessed | Flask of Big Mojo (a thin material) |
| Wicked and Runic Leather | Enchanted Wicked, Runic | Enchanted Leather |
| Chimeric, Frostsaber | Tribal blues | their own leather and a trophy |
| Dragonscale Breastplate (blue) | Green or Black Dragonscale Breastplate (existing) | Dragonscale: colored scales |

### 6. Alts

187 of 230 items are Bind on Equip; 44 of 158 patterns bind on pickup (the quest ones unbound, I); Ogre Tannin unbound (I).
Links: kits and quivers for every alt, Rugged Leather for Engineering and Tailoring; in come Enchanted Leather, Refined
Deeprock Salt, Mooncloth and Bolts of Runecloth, dyes.

### 7. Solo blockers

The salt and the Core and Primal leathers (above). Devilsaurs are elites, soloable by a hunter at 60 or with bots; Black
Dragonscale comes from Blackrock Spire and the Burning Steppes’ elites; Deviate Scale from Wailing Caverns, a planned run.

## Tailoring

### 1. Paths

| Path | Identity, who it suits | Unlocks | Quest (A / H) |
|---|---|---|---|
| Moonweaver ✱ | Mooncloth and Elune’s thread: Spirit and healing; priests, druids, shamans, paladins | the Mooncloth Robe, Vest, Leggings, Shoulders, Circlet, Gloves; Truefaith Vestments; Mooncloth Bag | “Moonlight on the Loom”: Me’lynn (Darnassus) / Tepa (Thunder Bluff), to Darnall in Nighthaven (Moonglade, both) |
| Shadoweaver ✱ | shadow cloth: Shadoweave, Felcloth, Runed Stygian, soul bags; warlocks, shadow priests | the Felcloth line and Bag; Runed Stygian set; Robe of the Void; Core Felcloth Bag | “The Shadow in the Weave”: Jalane Ayrole (Stormwind) / Josephine Lister (Undercity), 1.12’s own “Master Shadoweave Tailors” |
| Runeweaver ✱ | arcane and elemental cloth (Brightcloth, Wizardweave, Cindercloth, Frostweave) and the big bags; mages, casters, every alt’s bags | Inferno Gloves, Gloves of Spell Mastery, Cloak of Warding, Bottomless Bag, Big Bag of Enchantment | “Threads of Dalaran”: Timothy Worthington (Theramore) / Daryl Stack (Tarren Mill, by Dalaran’s ruins) |

### 2. Tree

| Skill | Node | Effect | Tag |
|---|---|---|---|
| 125 | Even Stitch | +10 Tailoring | A |
| 175 | Lost Patterns | Green Woolen Robe, Boots of Darkness (nobody teaches them) | R |
| 225 | The path | marker | A |
| 250 | Moon’s Patience (Moonweaver) | Mooncloth every 2 days, not 4 (`CategoryRecoveryTime`, display to test), or two a cast (H) | Q / H |
| 250 | Felweave (Shadoweaver) | Runecloth and a Demonic Rune into Felcloth, a sure source beside the world drops | N |
| 250 | Spare Bolt (Runeweaver) | 15% chance of a second Bolt of Runecloth | H |
| 275 | Path recipes | the master’s list | R |
| 300 | Capstone bag | Mooncloth Bag; Felcloth Bag (unlearnable today); Bottomless Bag | R |

### 3. Recipe quests

| Rank | Quest | Giver (A / H) | Choice of one |
|---|---|---|---|
| Apprentice | “Linen for the Recruits” (rep.) | Lawrence Schneider (Stormwind) / Snang (Orgrimmar) | Red Linen Robe and Vest; Bright Yellow Shirt for both |
| Journeyman | “Wool for the Watch” (rep.) | Sellandus (Stormwind) / Magar (Orgrimmar) | Green Woolen Bag, Red Woolen Boots, Heavy Woolen Cloak, Gray Woolen Robe, Colorful Kilt, Reinforced Woolen Shoulders, Stylish Shirts, Phoenix Gloves and Pants, Spider Silk Slippers, Hands of Darkness, Robes of Arcana, Truefaith Gloves |
| Expert | “Silks of the South” (rep.) | Grarnik Goodstitch (Booty Bay, both) | Green Silk Armor and Pack, Shadow Hood, Boots of the Enchanter, Spider Belt, Black Silk Pack, Rich Purple Silk Shirt, Azure and Crimson Silk Shoulders, Earthen Silk Belt, Star Belt, the Red Mageweave line, White Bandit Mask |
| Expert–Artisan | “The Stormcloth Patterns” (below) | Timothy Worthington / Daryl Stack | the six Stormcloth pieces (unlearnable today) |
| Artisan | “Runecloth for the Front” (rep., fills 260–300) | Georgio Bolero (Stormwind) / Josef Gregorian (Undercity) | the Frostweave, Runecloth, Brightcloth, Ghostweave, Cindercloth and Wizardweave lines; Cloak of Fire, Robe of Winter Night |
| Artisan | path chains | the masters | section 1’s lists |
| Artisan | dungeon quests | Dire Maul, Scholomance, Stratholme | Belt and Robe of the Archmage, Big Bag of Enchantment, Cloak of Warding, Felcloth and Inferno Gloves, Ghostweave Pants, Gordok Ogre Suit |

**Example chain: “The Stormcloth Patterns”** (skill 220; Timothy Worthington on Theramore Isle / Daryl Stack in Tarren Mill)

1. *Cloth That Drinks the Rain.* Stormcloth is woven to turn the storm; bring 3 Globes of Water and 5 Bolts of Mageweave.
   Reward: Stormcloth Gloves or Pants.
2. *Through the Squall.* Make two pieces for Theramore’s watch / Tarren Mill’s deathguards. Reward: Stormcloth Vest or Headband.
3. *The Last Bolt.* Bring one more piece and 2 Heavy Silken Thread. Reward: Stormcloth Shoulders or Boots, and the repeatable
   “Stormcloth Orders”.

### 4. Materials

| Material | Today | Proposed |
|---|---|---|
| Fist-sized Spinneret (19 kinds); gray Forest and Sticky Spider Webbing | nothing | unspooled into Spider’s Silk and Thick Spider’s Silk (5 and 6 recipes) (N; grays made white, I) |
| Naga Scale | 1 | an Azure Silk belt and boots (N) |
| Long Elegant Feather, Delicate Feather | 1 each | a hat line beside Admiral’s Hat (N) |
| Globe of Water | 6 | Stormcloth (above) |
| Demonic Rune | binds | unbound (I), and Felweave’s reagent |
| Mooncloth | Moonwell, 4-day cooldown | Moon’s Patience; Moonglade’s Moonwells serve both sides |

### 5. Upgrades

| From (green) | To | How |
|---|---|---|
| Runecloth Robe (47) | Mooncloth Robe (blue, existing) | Moonweaver: 4 Mooncloth |
| Felcloth Robe (56) | Robe of the Void (epic, existing, unlearnable today) | Shadoweaver: Demonic Runes, Felcloth |
| Wizardweave Robe (55) | a blue Wizardweave (new), then Robe of the Archmage | Runeweaver: Essence of Fire, Arcane Crystal |
| Frostweave, Cindercloth, Ghostweave | blue variants (new) | Essence of Water, Heart of Fire, Ghost Dye (Alchemy’s link) |

### 6. Alts

152 of 222 items are Bind on Equip and the bags unbound: every alt starts with a tailor’s bags. Mooncloth is per character, so a
second Moonweaver doubles it. Links: Bolts of Runecloth and Mooncloth for Leatherworking, cloth for Engineering and First Aid;
in come Enchanted Leather (Felcloth Bag) and dyes.

### 7. Solo blockers

Flarecore needs Fiery and Lava Core, the Core Felcloth and Bottomless Bags Core Leather: Thorium Point’s quests. Bloodvine stays
Zul’Gurub’s. The elite patterns (Cindercloth, Cloak of Fire, Robe of Winter Night, Gloves of Spell Mastery, Bottomless Bag) are
in the quests above.

## Costs and order

| Kind | What it covers | Needs |
|---|---|---|
| **No code** (Q, R, I) | the rank quests (460 recipes: Alchemy 49, Blacksmithing 105, Enchanting 70, Engineering 59, Leatherworking 83, Tailoring 94; raid ones stay); the 46 one-side recipes mirrored; unlearnable 1.12 recipes as rewards; Annora’s rank and list on Kitta Firewind and Hgarth; salt sold; the Black Anvil, Black Forge, Alchemy Lab and Icebellow focuses at Thorium Point, Feathermoon, Stonard and Light’s Hope; the Fiery, Lava, Core Leather, Silithid Chitin and Frozen Rune quests; bindings and prices | world patches, `item_hotfixes.py`; the Tradeskill DB’s journeys rechecked |
| **Hotfix rows** (A) | 11 path markers (Apothecary, Elixirist, Transmuter, Mithril Order, Spellbinder, Warder, Artificer, Gunsmith, Moonweaver, Shadoweaver, Runeweaver); five +10 skill auras | proxy CSVs, caches cleared; A\* nodes reuse racials; new items need no rows |
| **DBC writer** (N) | skill-ups for each new recipe: stat kits, scale mail, salt, cure-two, alloys, scrolls, wands, upgrades | SkillLineAbility.dbc rows |
| **Proxy loaders** (N) | the reagent list of new or changed recipes (SpellReagents); “Requires Black Anvil” on new ones (SpellCastingRequirements); tools (SpellTotems) | C# loaders, a proxy build |
| **mangosd hooks** (H) | an extra item on craft (Second Draught, Thrift, Spare Bolt, Masterwork: reading `skill_extra_item_template`), disenchant yield, Mooncloth twice | `Spell::DoCreateItem`, loot |
| **ScriptDev2** (C) | switching paths, 1.12-correct, for the five old markers and the eleven new | `npc_professions.cpp` |

**Order.** (1) The hard blockers in one world patch: Leatherworking’s salt, Annora’s rank, the four stations (one focus object
tried first). (2) The rank quests, a craft at a time (Leatherworking, Enchanting, Blacksmithing, Tailoring, Alchemy, Engineering),
each previewed in the Tradeskill DB before the game. (3) One marker spell as a proof, then the eleven paths and their quests.
(4) 03’s proof of a new recipe spell, then the DBC writer and the SpellReagents loader: stat kits, scale mail, upgrades,
scrolls. (5) The hooks. (6) Switching, last.

**Open questions for the user:** a paid switch or a second path at 300; whether paths only add recipes (this design) or also
take some (only the Gunsmith’s two top rifles here); the salt’s price; which raid recipes may come down to Revered rewards.
