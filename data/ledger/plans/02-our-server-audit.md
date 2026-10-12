# Our server’s professions today: an audit (part B)

Written 2026-10-10 (unattended) for the professions plan: the live world database (`classicmangos`, world patches 001–072 in)
and the server’s 1.12 tables (`(the server's checkout)`). Read-only: SELECTs and a scratch script, nothing changed. Numbers are this
server’s, read for one player leveling alone with alts.

## How the numbers were made

- **Recipes:** the SkillLineAbility rows of the eight crafts and Smelting whose spell (`spell_template`) makes an item or an
  enchant, placeholders out: **1,265**.
- **Sources:** trainers that spawn (`npc_trainer` and templates; `creature`, `creature_spawn_entry`, spawn groups), teaching
  spells through effect 36 (one may teach two); patterns (class 9) sold (`maxcount > 0`: limited), given by quests, dropped
  (every loot table, references expanded); gossip teachers (`dbscripts_on_gossip` command 15).
- **Places:** maps 0–1 the open world; instances under 20 players dungeons, else raids; open-world rank 1–3 “elite”; a
  pattern in a reference shared by over 20 kinds of creature a “world drop”. Material counts are kinds of creature, not spawns.
- Each recipe goes under its **easiest** source (the table’s order, left to right); a trainer inside an instance counts as the
  dungeon. Poisons and Lockpicking left out.

## 1. Recipes

| Profession | All | Trainer | NPC | Quest | Vendor | Limited | World drop | Mob drop | Other | Elite | Dungeon | Raid | None |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Alchemy | 117 | 36 | 0 | 2 | 10 | 20 | 23 | 7 | 1 | 4 | 3 | 1 | 10 |
| Blacksmithing | 250 | 81 | 3 | 22 | 28 | 11 | 50 | 3 | 3 | 12 | 16 | 3 | 18 |
| Enchanting | 152 | 54 | 0 | 0 | 13 | 15 | 24 | 10 | 1 | 11 | 19 | 4 | 1 |
| Engineering | 169 | 80 | 2 | 4 | 3 | 21 | 19 | 2 | 15 | 1 | 10 | 3 | 9 |
| Leatherworking | 235 | 74 | 6 | 9 | 24 | 39 | 35 | 23 | 0 | 4 | 15 | 1 | 5 |
| Tailoring | 234 | 81 | 4 | 4 | 18 | 33 | 52 | 11 | 3 | 6 | 8 | 2 | 12 |
| Cooking | 82 | 11 | 0 | 20 | 45 | 1 | 1 | 0 | 0 | 0 | 2 | 0 | 2 |
| First Aid | 14 | 9 | 0 | 0 | 3 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 1 |
| Smelting | 12 | 10 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 1 |
| **All** | **1,265** | **436** | **15** | **61** | **144** | **140** | **205** | **56** | **23** | **38** | **74** | **14** | **59** |

In short: a third from trainers, a quarter from vendors and quests, **410 (32%) only from drops, containers or group content**,
and 59 nobody can learn. “NPC” is world 001’s Light’s Hope teacher and the two goblin/gnome teleporter teachers. “Other” is
mostly Engineering’s firework boxes and holiday gifts.

### Trainers on each side

Alliance / Horde / both, by rank (spawned trainers):

| Profession | Apprentice | Journeyman | Expert | Artisan, where |
|---|---|---|---|---|
| Alchemy | 13 / 11 / 0 | 7 / 5 / 0 | 2 / 2 / 0 | Kylanna Windwhisper (Feralas); Rogvar (Swamp of Sorrows) |
| Blacksmithing | 8 / 8 / 1 | 4 / 5 / 1 | 1 / 1 / 1 | Brikk Keencraft, Booty Bay, alone |
| Enchanting | 8 / 8 / 1 | 5 / 4 / 1 | 1 / 1 / 1 | **Annora, inside Uldaman, alone** |
| Engineering | 8 / 6 / 3 | 3 / 3 / 1 | 1 / 1 / 1 | Buzzek Bracketswing, Gadgetzan, alone |
| Leatherworking | 8 / 7 / 1 | 7 / 8 / 0 | 2 / 1 / 0 | Caryssia Moonhunter (Feralas), Drakk Stonehand (Hinterlands); Hahrana Ironhide (Feralas) |
| Tailoring | 9 / 10 / 1 | 5 / 6 / 1 | 2 / 2 / 0 | Timothy Worthington (Theramore); Daryl Stack (Tarren Mill) |
| Cooking | 8 / 6 / 0 | 8 / 6 / 0 | book: Shandrina (Ashenvale); Wulan (Desolace) | quest “Clamlette Surprise”, Dirge Quikcleave (Gadgetzan) |
| First Aid | 7 / 6 / 0 | 7 / 6 / 0 | book: Deneb Walker (Arathi); Balai Lok’Wein (Dustwallow) | quest “Triage”: VanHowzen (Theramore); Gregory Victor (Hammerfall) |
| Fishing | 11 / 9 / 1 | 11 / 9 / 1 | book: Old Man Heming (Booty Bay) | Nat Pagle’s quest (both); **Katoom the Angler (Revantusk) trains it for the Horde only** |

Mining (7 / 5 / 1), Herbalism (11 / 8 / 2) and Skinning (7 / 8 / 0) teach every rank at every trainer.

### Skill-ups for one player

Skill ranges with **no orange recipe** (the skill still rises, slower, on yellow and green):

| Profession | Trainers only | + vendors and quests | + limited vendors |
|---|---|---|---|
| Alchemy | 85–89, 265–299 | 85–89, 265–294 | 290–294 |
| Blacksmithing | 285–299 | none | none |
| Enchanting | 245–299 (nothing at all 285–299) | 245–249, 260–274, 285–299 | 260–264 |
| Engineering | 175–199, 280–299 | 175–199, 295–299 | 175–179 |
| Leatherworking | 275–279 | 275–279 | none |
| Tailoring | 270–299 | 290–299 | 295–299 |
| Cooking | 120–124, 165–199 (A) / 165–174 (H), 240–299 | none | none |

Both sides alike except Cooking. The Artisan tailors teach nothing past Runecloth Belt (255): 260–300 is patterns.

### Per profession

- **Alchemy:** all materials solo. Flasks need the **Alchemy Lab (Scholomance, Blackwing Lair)**; transmutes 1–2 day cooldowns.
- **Blacksmithing:** the best trainer path (to 285). 20 recipes need the **Black Anvil**, Dark Iron the Black Forge and Smelt
  Dark Iron (Gloom’rel): all inside Blackrock Depths. 31 recipes group-only, 26 need raid materials, 18 can’t be learned.
- **Enchanting:** Artisan only from Annora inside Uldaman, who alone teaches 10 recipes, **Enchanted Leather and Enchanted
  Thorium** among them (68 recipes of four other crafts use them). 34 recipes from elites, dungeons or raids.
- **Engineering:** a trainer hole at 175–199; 15 recipes only from firework boxes and holiday gifts.
- **Leatherworking:** the fullest ladder, but **51 recipes need Cured Rugged Hide**: its Refined Deeprock Salt comes only from
  the Salt Shaker, made by an Engineer (250), used at Leatherworking 250, **one salt every 72 hours**.
- **Tailoring:** the most world-drop patterns (52); Mooncloth (21 recipes) needs a Moonwell, **4-day cooldown**.
- **Cooking, First Aid:** solo; Cooking is the most one-sided craft (§4, item 8). **Smelting:** Elementium can’t be learned.

### What our world patches changed

- **001:** Omarion’s 13 Naxxramas recipes taught by Craftsman Wilhelm at Light’s Hope, but their Frozen Rune drops only from a
  Naxxramas chest and Icebane needs the **Icebellow Anvil, inside Naxxramas**: learnable, not craftable.
- **037, 048, 049:** 220 pattern items out of boxes (167), world chests (198) and dungeon chests (163); 211 still drop elsewhere
  (196 as world drops). **049 left 9 recipes with no source** (Plans: Dark Iron Mail and Shoulders, Serenity, Corruption;
  Major Recombobulator; Mongoose Boots, Chromatic and Shifting Cloak; Mooncloth Gloves), by design: “We will add quests to get
  them” (session 72).
- **038:** the boxes hold trade goods among their new contents instead.
- **039, 040:** pearls and clam meat are fishing’s and creatures’.
- **050, 052:** the capitals sell the four skeleton keys to everyone, so Blacksmithing’s key recipes make nothing needed.
- **067:** three mining pools (Searing Gorge, Feralas) and four Plaguebloom pools (Eastern Plaguelands) spawn again.

## 2. Materials

266 materials come from skinning, gathering, fishing or drops (consumables left out): **136 feed three or more recipes, 32 two,
80 one** (49 cooking ingredients, 7 ores and 5 hides by design), **9 only quests, 9 nothing**. 45 gray drops look like materials
and feed nothing (Appendix A5).

**Group-only materials** (recipes that can be learned but not made alone):

| Material | Only from | Recipes |
|---|---|---|
| Fiery Core, Lava Core | Molten Core | 26, 25 (BS, LW, Tail, Eng) |
| Bloodvine, Souldarite, Primal Bat and Tiger Leather | Zul’Gurub | 16, 8, 3, 2 |
| Core Leather | Molten Core | 9 (LW 5, BS 2, Tail 2) |
| Frozen Rune | a Naxxramas chest | 13 (world 001’s) |
| Scale of Onyxia, Sulfuron Ingot, Obsidian Shards | raids | 1, 1, 4 |
| Devilsaur Leather | elite devilsaurs (4 kinds) | 3 (LW 2, BS 1) |
| Silithid Chitin, Light/Heavy Silithid Carapace | elite silithids, Ahn’Qiraj | 6, 3, 3 |
| Red Dragonscale | elite dragonkin | 1 |
| Guardian Stone, Righteous Orb | one elite; Stratholme and two elites | 8, 6 |
| Dark Rune, Skin of Shadow; Ogre Tannin | Scholomance; Dire Maul | 7, 1; 2 |

Recipes needing them: 67 raid, 26 elite, 10 dungeon (Blacksmithing 26 raid; Leatherworking 21 raid, 14 elite).

### Leatherworking

| Material | From (kinds) | Recipes | Skill | Note |
|---|---|---|---|---|
| Ruined Leather Scraps | skin 146 | 1 | 20 | into Light Leather |
| Light / Medium / Heavy / Thick / Rugged Leather | skin 143–234 | 41 / 45 / 72 / 63 / 85 | 30–320 | LW 28 / 22 / 36 / 38 / 60, the rest BS, Eng, Tail |
| Light / Medium / Heavy / Thick / Rugged Hide | skin 92–182 | 1 each | 55–250 | only into their cured hide |
| Cured Light / Medium / Heavy / Thick Hide | crafted | 10 / 4 / 14 / 14 | 105–275 | |
| Cured Rugged Hide | crafted (Salt Shaker) | **51** | 300–320 | one per 72 hours |
| Enchanted Leather | Enchanting (Annora) | 49 | 290–320 | LW 19, BS 14, Tail 10, Eng 6 |
| Thin Kodo Leather | drop 9 | 1 | 70 | Kodo Hide Bag (a Horde quest) |
| Raptor Hide | drop 16 | 3 | 175–185 | belt Alliance-only, harness Horde-only |
| Shadowcat Hide | skin 3 | 2 | 210–220 | |
| Thick Wolfhide | skin 19 | 1 | 245 | Wolfshead Helm |
| Warbear / Frostsaber / Chimera Leather | skin 7 / 5 / 5 | 2 / 4 / 4 | 285–320 | |
| Devilsaur Leather | elite 4 | 3 | 310–320 | |
| Core / Primal Bat / Primal Tiger Leather | raids | 9 / 3 / 2 | 315–320 | |
| Slimy / Thick Murloc Scale | drop 33 / 17 | 2 / 2 | 120–210 | limited patterns |
| Deviate / Perfect Deviate Scale | Wailing Caverns, elite deviates | 3 / 2 | 120–140 | |
| Black / Red / Green Whelp Scale | skin 2 / 4 / 2 | 2 / 1 / 3 | 125–220 | Black and Red: Alliance-only patterns |
| Turtle Scale | skin 8, drop 7 | 5 | 225–255 | |
| Scorpid / Heavy Scorpid Scale | skin 7 / 7 | 7 / 10 | 240–320 | |
| Worn Dragonscale | skin 23 (+51 elite) | 2 | 245–275 | |
| Green / Blue / Black / Red Dragonscale | mostly elites, instances | 3 / 3 / 4 / 1 | 280–320 | Red’s one pattern is a dungeon drop |
| Scale of Onyxia, Brilliant Chromatic Scale | raid / dungeon | 1 / 1 | 320 | |
| Silithid parts | elite silithids, Ahn’Qiraj | 6 / 3 / 3 | 320 | |
| Dreamscale | the four Dragons of Nightmare, unspawned | 1 | 320 | |
| Jet Black Feather | drop 2 | 2 (BS, LW) | | |

Barely used: Thick Wolfhide, Red Whelp, Red Dragonscale, Scale of Onyxia, Thin Kodo Leather (one recipe); Shadowcat, Black
Whelp, Warbear, both Murloc scales, Worn Dragonscale, Perfect Deviate, Primal Tiger (two). Every hide feeds one curing recipe.

### Tailoring

| Cloth | Recipes (Tailoring) | Notes |
|---|---|---|
| Linen / Wool / Silk / Mageweave / Runecloth | 11 / 12 / 9 / 13 / 19 (1 each: the bolt) | drop from hundreds of kinds; Eng, BS, FA, LW use the raw cloth |
| Bolts: Linen / Woolen / Silk / Mageweave / Runecloth | 28 / 27 / 44 / 41 / 76 | Bolt of Runecloth: one trainer recipe uses it |
| Felcloth | 13 (12) | world drops, 20 kinds |
| Mooncloth | 22 (21) | Moonwell, 4-day cooldown |
| Spider’s Silk / Thick / Shadow Silk / Ironweb | 5 / 6 / 8 / 49 | Ironweb: 10 world kinds |
| Threads (vendor) | 46–129 | |
| Naga Scale, Long Elegant Feather | 1 each | |

### Blacksmithing and Engineering

| Material | Recipes | Notes |
|---|---|---|
| Rough / Coarse / Heavy / Solid / Dense Stone | 4 / 4 / 4 / 4 / 5 | each its grinding stone, blasting powder, sharpening stone, weightstone |
| Grinding stones | 14 / 17 / 27 / 22 / 12 | |
| Ores | 1 each (Iron, Mithril, Thorium 2) | smelting only; Incendicite, Indurium, Elementium: quests only |
| Bars | Copper 32, Bronze 32, Iron 31, Steel 17, Mithril 59, Truesilver 37, Thorium 64, Arcanite 40, Dark Iron 22, Enchanted Thorium 22 | Arcanite: an Alchemist’s 2-day transmute |
| Gems | Malachite 7, Tigerseye 8, Shadowgem 10, Moss Agate 11, Lesser Moonstone 13, Jade 15, Citrine 23, Aquamarine 15, Star Ruby 30, Blue Sapphire 10, Large Opal 13, Huge Emerald 14, Azerothian Diamond 13, Black Diamond 2, Arcane Crystal 1 | Pristine Black Diamond: none |
| Pearls | Small Lustrous 6, Iridescent 7, Black 8, Golden 5, Blue 1 | |
| Power Crystals (Un’Goro) | 1–2 each | Thorium armor |
| Elementals | Earth 15, Fire 11, Water 5, Air 3; Heart of Fire 22, Core of Earth 8, Globe of Water 6, Breath of Wind 3; Essences 12–36 | |

### Herbs, cooking, enchanting

31 herbs feed recipes, mostly Alchemy’s, 2–16 each (thinnest: Grave Moss, Arthas’ Tears); Wildvine feeds six crafts, Bloodvine
is raid-only. Meats and fish feed one dish each, by design. Enchanting’s materials come from disenchanting.

### Dead ends

Nothing uses Fish Scale, Broken Blade of Heroes (a blue from 336 kinds), Crimson Lotus, Delicate Feather, Fist-sized
Spinneret, Tomb Dust, Blood Scythe or Massive Mojo; Elementium Bar and Pristine Black Diamond serve no recipe. Only quests take
Blood Shard, Elementium Ore, Incendicite and Indurium Ore, Lightning Eel, Plated Armorfish, Hops, Okra, Great Goretusk Snout.

### Links between professions

Arcanite Bar (an Alchemist’s 2-day transmute) feeds 40 recipes; Enchanted Leather and Thorium need an Enchanter who reached
Annora; Cured Rugged Hide an Engineer’s Salt Shaker; Enchanting’s rods are Blacksmithing’s; every bar a Miner’s.

## 3. Sharing with alts today

| Profession | Items made | Not bound | BoE | BoP | Patterns BoP / all |
|---|---|---|---|---|---|
| Alchemy | 107 | 106 | 0 | 1 | 10 / 72 |
| Blacksmithing | 232 | 58 | 172 | 2 | 61 / 151 |
| Enchanting (items) | 19 | 9 | 4 | 6 | 23 / 89 |
| Engineering | 160 | 101 | 45 | 9 (+5 BoU) | 20 / 79 |
| Leatherworking | 230 | 43 | 187 | 0 | 44 / 158 |
| Tailoring | 222 | 68 | 152 | 2 | 27 / 139 |
| Cooking, First Aid, Smelting | 104 | 104 | 0 | 0 | 3 / 74 |

Crafted gear is Bind on Equip and materials are unbound; only Demonic Rune, Ogre Tannin, Skin of Shadow and Goblin Construction
Helmet bind. **188 of 762 patterns are Bind on Pickup.**

How an alt gets things:

- **Mail, same side only:** `AllowTwoSide.Interaction.Mail = 0` (MailHandler.cpp refuses the other faction unless the sender is a
  GM). The server takes one item per letter; HermesProxy splits the 1.14.2 client’s several attachments into one letter each
  (MailSystem.cs), each with its postage, and **every letter waits an hour** (`MailDeliveryDelay = 3600`, “even if we’re sending
  mails to our own characters”). Sending is untried in game (docs/specs/mail.md).
- **Bank:** per character; 1.12 has no account or guild bank.
- **Trade window:** both characters online, so two accounts.
- **Auction house:** the faction houses are separate (`AllowTwoSide.Interaction.Auction = 0`); the goblin houses are shared by
  both sides (AuctionHouseMgr.cpp): the only cross-faction way, and the auction bot also buys there.

Obstacles: two primaries a character; one specialization each (Armorsmith/Weaponsmith, Dragonscale/Elemental/Tribal, Gnomish/
Goblin); per-character cooldowns (Mooncloth, transmutes, Salt Shaker); BoP patterns; the side wall.

## 4. Problems worth fixing, ranked

1. **410 recipes (32%) only drop or need groups;** 205 are world drops whose best chance per kill has a median of 0.38%:
   the grind the solo rules forbid, and the work list for profession quests. *Evidence: §1; reference loot groups.*
2. **Leatherworking’s top end waits on an Engineer and a 72-hour cooldown:** 51 recipes need Cured Rugged Hide, one Refined
   Deeprock Salt per Salt Shaker use. *spell 19566 `CategoryRecoveryTime` 259200000; item 15846 needs skill 165 at 250; spell
   19567 at trainer 8736.*
3. **Artisan Enchanting is inside Uldaman:** Annora (map 70) is the only Artisan trainer and alone teaches 10 recipes, Enchanted
   Leather and Enchanted Thorium among them (68 recipes elsewhere depend). *`npc_trainer`, `creature`.*
4. **Crafting stations in instances:** Black Anvil and Black Forge (Blackrock Depths: 20 BS, 1 Eng, 2 Ench, Smelt Dark Iron),
   Alchemy Lab (Scholomance, Blackwing Lair: 6 flasks), Icebellow Anvil (Naxxramas: 3). *`RequiresSpellFocus`; type-8 objects.*
5. **Raid and elite materials:** 67 recipes need raid materials, 26 elite ones, 10 dungeon ones; 126 recipes are learned only
   in group content. *§2; Appendix A2.*
6. **World 001 is half done:** 13 recipes learnable at Light’s Hope, craftable only with Naxxramas’s Frozen Rune (and anvil).
7. **59 recipes can’t be learned:** 9 by world 049 (quests to come), 50 never placed in 1.12 (Stormcloth set, Goblin Radio…).
   *Appendix A1.*
8. **One side only:** 46 recipes (Cooking 17 Alliance, 8 Horde; Blacksmithing 6 Horde, 2 Alliance; Leatherworking 6 Alliance,
   2 Horde…); an Alliance cook reaches 67 recipes without drops, a Horde one 56; only the Horde has an Artisan fishing trainer.
   *Appendix A3.*
9. **The auction bot is a back door:** it lists any item that isn’t BoP or sold without limit, patterns included (8 white, 4
   green, 2 blue at three times the price) and raid materials. *ItemBag.cpp `AvailableItemsBag::Load`; config/ahbot.overrides
   52–57.*
10. **Recipes still in containers:** Message in a Bottle (fished in 17 zones) gives one of 43 patterns about 12% of the time
    (reference 6307); Scum Covered, Oozing and Slimy Bag 0.5–1.7%; holiday gifts. *`item_loot_template`.*
11. **Thin and dead materials:** 13 leathers and scales feed one or two recipes; 18 trade goods feed none; 45 gray lookalikes:
    room for quests and recipes. *§2; Appendix A4–A5.*
12. **Reputation walls:** 110 recipe gates: Thorium Brotherhood 29, Cenarion Circle 25, Zandalar Tribe 22, Argent Dawn 19,
    Timbermaw Hold 11, Hydraxian Waterlords 4 (Zandalar and Hydraxian are raid reputations). *`RequiredReputationFaction`.*
13. **Skill-up holes without drops:** Alchemy 290–294, Enchanting 260–264, Engineering 175–179, Tailoring 295–299 have no
    orange recipe even with every vendor. *§1.*
14. **Alts:** no cross-faction path but the goblin houses, an hour per letter, specializations and cooldowns per character,
    188 BoP patterns. *§3.*
15. **Skeleton keys** sold everywhere (world 050, 052) leave Blacksmithing’s four key recipes pointless. Minor.

## Appendix

### A1. Recipes nobody can learn (59)

- **Alchemy (10):** Alchemist’s Stone; Cowardly Flight Potion; Elixir of Tongues; Elixir of Waterwalking; Flask of Chromatic
  Resistance; Flask of Distilled Wisdom; Goblin Rocket Fuel; Greater Holy Protection Potion; Gurubashi Mojo Madness; Refined
  Scale of Onyxia.
- **Blacksmithing (18):** Bleakwood Hew; Blood Talon; Corruption*; Dark Iron Mail*; Dark Iron Pulverizer; Dark Iron Shoulders*;
  Darkspear; Inlaid Mithril Cylinder; Inlaid Thorium Hammer; Ironforge Chain; Ironforge Gauntlets; Jagged Obsidian Shield;
  Mithril Scale Gloves; Obsidian Mail Tunic; Rough Bronze Bracers; Rune Edge; Serenity*; Thorium Greatsword.
- **Enchanting (1):** Charged Scale of Onyxia.
- **Engineering (9):** Explosive Arrow; Field Repair Bot 74A; Gnomish Ham Radio; Goblin “Boom” Box; Goblin Radio; Hyper-Radiant
  Flame Reflector; Major Recombobulator*; Mobile Alarm; Steam Tonk Controller.
- **Leatherworking (5):** Chromatic Cloak*; Mongoose Boots*; Nightscape Cloak; Onyxia Scale Breastplate; Shifting Cloak*.
- **Tailoring (12):** Boots of Darkness; Felcloth Bag; Green Woolen Robe; Mooncloth Gloves*; Robe of the Void; Stormcloth Boots,
  Gloves, Headband, Pants, Shoulders, Vest; Truefaith Vestments.
- **Cooking (2):** Crystal Throat Lozenge; Lean Wolf Steak. **First Aid (1):** Crystal Infused Bandage. **Smelting (1):** Smelt
  Elementium.

\* since world 049.

### A2. Recipes only from group content (126)

- **Alchemy:** elite: Elixir of the Sages, Greater Arcane and Frost Protection Potion, Restorative Potion; dungeon: Flask of
  Supreme Power, Flask of the Titans, Greater Fire Protection Potion; raid: Major Rejuvenation Potion.
- **Blacksmithing:** dungeon: Annihilator, Arcanite Champion, Arcanite Reaper, Blazing Rapier, Dark Iron Plate, Dark Iron
  Sunderer, Dawn’s Edge, Demon Forged Breastplate, Enchanted Battlehammer, Enchanted Thorium Breastplate, Helm and Leggings,
  Hammer of the Titans, Heartseeker, Masterwork Stormhammer, Sulfuron Hammer; elite: Dawnbringer Shoulders, Fiery Plate
  Gauntlets, Helm of the Great Chief, Lionheart Helm, Persuader, Runic Breastplate, Runic Plate Boots, Helm and Shoulders,
  Sageblade, Titanic Leggings, Volcanic Hammer; raid: Black Grasp of the Destroyer, Elemental Sharpening Stone, Thick Obsidian
  Breastplate.
- **Enchanting:** elite: Bracer – Greater Intellect, Chest – Major Mana, Cloak – Dodge, Cloak – Stealth, Gloves – Fire,
  Frost, Healing and Shadow Power, Gloves – Mining, Gloves – Superior Agility, Shield – Superior Spirit; dungeon (Annora’s ten
  and): 2H Weapon – Major Intellect, Major Spirit, Superior Impact, Cloak – Greater Resistance, Gloves – Greater Strength, Weapon
  – Fiery Weapon, Lifestealing, Unholy Weapon, Smoking Heart of the Mountain; raid: Weapon – Healing Power, Spell Power, Cloak –
  Subtlety, Gloves – Threat.
- **Engineering:** dungeon: Alarm-O-Bot, Dark Iron Bomb, Dark Iron Rifle, Discombobulator Ray, Flame Deflector, Goblin Jumper
  Cables XL, Master Engineer’s Goggles, Ultra-Flash Shadow Reflector, Voice Amplification Modulator, World Enlarger; elite:
  Arcanite Dragonling; raid: Biznicks 247x128 Accurascope, Core Marksman Rifle, Force Reactive Disk.
- **Leatherworking:** dungeon: Black Dragonscale Leggings and Shoulders, Deviate Scale Belt, Girdle of Insight, Gordok Ogre
  Suit, Green Dragonscale Leggings, Hide of the Wild, Red Dragonscale Breastplate, Runic Leather Armor and Shoulders, Swift
  Flight Bracers, Volcanic Breastplate and Shoulders, Wicked Leather Armor and Belt; elite: Blue Dragonscale Shoulders,
  Ironfeather Breastplate, Stormshroud Gloves and Shoulders; raid: Core Armor Kit.
- **Tailoring:** elite: Bottomless Bag, Cindercloth Gloves and Vest, Cloak of Fire, Gloves of Spell Mastery, Robe of Winter
  Night; dungeon: Belt of the Archmage, Big Bag of Enchantment, Cloak of Warding, Felcloth Gloves, Ghostweave Pants, Gordok Ogre
  Suit, Inferno Gloves, Robe of the Archmage; raid: Core Felcloth Bag, Flarecore Wraps.
- **Cooking:** Goldthorn Tea (Henry Stern, Razorfen Downs), Runn Tum Tuber Surprise. **Smelting:** Smelt Dark Iron.

### A3. Recipes only one side can learn (46)

- **Alliance:** Cooking (17): Beer Basted Boar Ribs, Blood Sausage, Clam Chowder, Crocolisk Gumbo, Crocolisk Steak, Fillet of
  Frenzy, Gooey Spider Cake, Goretusk Liver Pie, Kaldorei Spider Kabob, Lean Venison, Loch Frenzy Delight, Murloc Fin Soup,
  Mystery Stew, Redridge Goulash, Seasoned Wolf Kabob, Tasty Lion Steak, Westfall Stew; Leatherworking (6): Black Whelp Cloak,
  Black Whelp Tunic, Herbalist’s Gloves, Moonglow Vest, Raptor Hide Belt, Red Whelp Gloves; Blacksmithing (2): Golden Scale
  Gauntlets, Ironforge Breastplate; Engineering: Blue Firework; Tailoring: Bright Yellow Shirt.
- **Horde:** Cooking (8): Carrion Surprise, Crispy Bat Wing, Crispy Lizard Tail, Dig Rat Stew, Heavy Crocolisk Stew, Hot Lion
  Chops, Roasted Kodo Meat, Scorpid Surprise; Blacksmithing (6): Barbaric Iron Boots, Breastplate, Gloves, Helm and Shoulders,
  Orcish War Leggings; Leatherworking (2): Kodo Hide Bag, Raptor Hide Harness; Alchemy: Discolored Healing Potion; Enchanting:
  Chest – Lesser Mana; Engineering: Red Firework.

### A4. Materials that feed one or two recipes (cooking’s 49 left out)

- **Leatherworking:** Black Whelp Scale 2, Brilliant Chromatic Scale 1, Coarse Gorilla Hair 1, Flask of Big Mojo 2, the five
  hides 1 each, Long Tail Feather 1, Lucky Charm 1, Perfect Deviate Scale 2, Primal Tiger Leather 2, Red Dragonscale 1, Red Whelp
  Scale 1, Ruined Leather Scraps 1, Scale of Onyxia 1, Shadowcat Hide 2, Slimy and Thick Murloc Scale 2, Thick Wolfhide 1, Thin
  Kodo Leather 1, Warbear Leather 2, Worn Dragonscale 2.
- **Alchemy:** Arcane Crystal 1, Arthas’ Tears 2, Black Vitriol 1, Discolored Worg Heart 1, Firefin Snapper 1, Grave Moss 2,
  Oily Blackmouth 1, Stonescale Eel 1.
- **Blacksmithing:** Blue, Green 1 and Red, Yellow Power Crystal 2; Skin of Shadow 1; Sulfuron Ingot 1.
- **Engineering:** Blank Parchment 2, Blue Pearl 1, Engineer’s Ink 2, Flask of Oil 2, Wooden Stock 2.
- **Tailoring:** Long Elegant Feather 1, Naga Scale 1. **First Aid:** Small and Huge Venom Sac 1.
- **Shared:** Jet Black Feather and Wicked Claw (BS, LW) 2; Ogre Tannin (LW, Tail) 2; Black Diamond (BS, Ench) 2; Large Venom
  Sac (Alc, FA) 2; Deviate Fish (Alc, Cook) 2; the seven ores 1–2 (smelting).

### A5. Gray drops that look like materials (45)

Armored Chitin, Basilisk Scale, Black Stone, Bloody Leather Boot, Brilliant Scale, Broken Silithid Chitin, Buzzard Feather,
Charged Scale, Dirty Kodo Scale, Dirty Trogg Cloth, Discolored Fang, Dried Scorpid Carapace, Dull Frenzy Scale, Elder Raptor
Feathers, Familiar Hide, Feathery Wing, Flecked Raptor Scale, Forest Spider Webbing, Glistening Frenzy Scale, Grizzled Mane,
Gryphon Feather Quill, Jagged Piece of Stone, Lead Ore, Lifeless Stone, Patch of Fine Fur, Plucked Feather, Prismatic Basilisk
Scale, Ripped Wing Webbing, Rough Crocolisk Scale, Rough Vulture Feathers, Ruffled Feather, Ruined Dragonhide, Ruined Pelt,
Runic Stone, Shiny Polished Stone, Sleek Bat Pelt, Small Leather Collar, Smooth Stone Chip, Soft Patch of Fur, Sticky Spider
Webbing, Stone Arrowhead, Thick Furry Mane, Torn Bear Pelt, Torn Furry Ear, Tribal Raptor Feathers.
