# Professions, part A: what Classic has and what WoW Forever changed

Research for the professions plan (2026-10-10, unattended; read-only: nothing in the addon, the server, the proxy or the
database changed). The baseline is 1.12 as our server runs it (the 1.14.2 client’s tables, the server’s own counts in
[profession-categories.md](../../specs/profession-categories.md) and the Tradeskill DB). Forever is build 1.60.1.70291 (its
own tables from wago.tools, cached in `(private files)`) and its interface code (private, summarized here in our own
words). Inferences are marked *(inference)*.

**One correction first.** Forever’s tables also carry Season of Discovery’s recipes: 289 sit under a category literally named
for that season, and about 20 more (SoD poisons and enchantments, a bandage, a bar) sit elsewhere. Our earlier counts in
[forever-profession-items.md](../forever-profession-items.md) (`forever_crafts.py`) count them as “new in Forever”. Below,
“Forever only” means a recipe that is in Forever’s tables but in neither 1.14.2’s nor Classic Era 1.15.9’s (1.15.9.70003,
which holds SoD); those 1.15 recipes are “inherited”, and whether Forever teaches any of them can’t be told from the tables.

## 1. Classic 1.12 at a glance

**Twelve professions.** Two primary per character, chosen from six crafts (Alchemy, Blacksmithing, Enchanting, Engineering,
Leatherworking, Tailoring) and three gathering skills (Herbalism, Mining, Skinning); everyone may also learn the three
secondary skills (Cooking, First Aid, Fishing). Rogues have two more as class skills: Lockpicking and Poisons.

**Four ranks, cap 300.**

| Rank | Skill range | Learn at | Crafts’ trainer cost (Leatherworking) | Secondary skills |
|---|---|---|---|---|
| Apprentice | 1–75 | level 5 | 10 copper | trainer |
| Journeyman | 50 → 150 | level 10 | 5 silver | trainer |
| Expert | 125 → 225 | level 20 | 50 silver | a book bought from a vendor |
| Artisan | 200 → 300 | level 35 | 5 gold, few trainers (3 for Leatherworking) | a quest (Triage, Clamlette Surprise, Nat Pagle’s) |

**Specializations that already exist** (each by a quest chain at a specialization trainer; recipe items gated by one, counted
in the 1.14.2 client’s item table):

| Profession | Choice | When | Gated recipe items |
|---|---|---|---|
| Blacksmithing | Armorsmith or Weaponsmith | skill 200, level 40 | 22 / 8 |
| Blacksmithing (Weaponsmith) | Master Swordsmith, Hammersmith or Axesmith | skill 250 | 7 / 6 / 5 |
| Leatherworking | Dragonscale, Elemental or Tribal | skill 225, level 40 | 13 / 13 / 19 |
| Engineering | Gnomish or Goblin | skill 200 | 4 / 2 (most of theirs are taught by the specialization trainer) |

Alchemy, Tailoring and Enchanting have no specialization in 1.12 (those came with later expansions).

**Recipes on our server and how they’re learned.** Recipe counts are the server’s (every recipe it teaches, by what it makes).
The source split for Leatherworking and Tailoring is the Tradeskill DB’s, from the server’s trainers, vendors, quests and loot (a
recipe can have several). For the rest, the 1.14.2 client’s rows tell only whether a recipe item teaches the recipe (that
includes some items nothing drops), so those are approximate.

| Profession | Recipes | Taught by a recipe item | Trainer or other | Notes |
|---|---|---|---|---|
| Blacksmithing | 251 | ~170 | ~90 | |
| Leatherworking | 235 | ~160 | ~82 | drop 86, trainer 74, vendor 63, quest 10, no source 8 |
| Tailoring | 234 | ~151 | ~88 | drop 86, trainer 81, vendor 51, quest 4, no source 13 |
| Engineering | 169 | ~84 | ~96 | specialization trainers teach most Gnomish/Goblin schematics |
| Enchanting | 152 | ~89 | ~68 | 132 of them are enchantments |
| Alchemy | 117 | ~79 | ~42 | 14 transmutes |
| Cooking | 82 | ~73 | ~14 | |
| First Aid | 14 | ~7 | ~11 | |
| Mining | 12 (smelting) | 0 | 12 | |
| Poisons | ~21 | 0 | trainer | rogues only |

In 1.12 almost every crafted item binds on equip: of the crafted gear in the 1.14.2 client, Leatherworking 0 binds on pickup,
Blacksmithing 5 of 251, Tailoring 4 of 234. Of 827 recipe items, 201 bind on pickup.

## 2. What WoW Forever changed or added

### 2.1 The numbers, profession by profession

| Profession | 1.14.2 rows | Forever rows | Inherited (Era/SoD) | **Forever only** | Camp objects | Forever-only that need a new material |
|---|---|---|---|---|---|---|
| Blacksmithing | 260 | 527 | 66 | **201** | 3 | ~96 |
| Leatherworking | 242 | 616 | 80 | **281** | 3 | ~139 |
| Tailoring | 239 | 486 | 57 | **183** | 4 | ~129 |
| Engineering | 180 | 295 | 29 | **~78** | 3 | ~42 |
| Alchemy | 121 | 213 | 16 | **70** | 3 | ~9 |
| Enchanting | 157 | 272 | 47 | **61** | 3 | ~30 |
| Cooking | 87 | 141 | 7 | **39** | 5 (campfires) | ~3 |
| First Aid | 18 | 40 | 1 | **14** | 3 | 1 |
| Mining | 22 | 33 | 1 | **2** (bars) | 3 | 2 |
| Herbalism, Skinning, Fishing | 8 / 4 / 5 | 17 / 12 / 14 | 0 | 0 (Fishing: Find Fish) | 4 / 4 / 4 | — |
| Poisons | 22 | 27 | 5 | 0 | — | — |
| Comprehension (new) | — | 7 | — | **7** | — | — |

“Rows” are SkillLineAbility rows (recipes plus a few rank and specialization spells). Forever-only excludes the camp objects
and four new rank-like spells each profession has. **Total: 929 Forever-only recipes plus about 40 camp objects**; Blizzard’s
public figure is “over 600” *(the tables may hold recipes not yet released: 74 of the items they make have no item record)*.
By the skill at which a recipe turns yellow: 113 below 75, 209 at 75–149, 178 at 150–224, 265 at 225–299, 164 at 300 and up.
The new content covers every rank, weighted toward the late Expert and Artisan ranges.

Evidence: `db2-SkillLineAbility`, `db2-TradeSkillCategory`, `db2-SpellReagents`, `db2-SpellEffect`, `db2-Item`,
`db2-ItemSparse` (Forever 1.60.1.70291, 1.14.2.42597, 1.15.9.70003). Existing recipes’ changes: forever-profession-items.md and
the Tradeskill DB (Leatherworking 512 Forever recipes without SoD’s 80, 277 new by name; Tailoring 417, 185 new, 2 gone).

### 2.2 Profession by profession

- **Blacksmithing.** Plate and mail sets at every rank (the Skyforged sets come in color variants, which inflate the count), a
  full fist-weapon line (Brass Knuckles to Bagh Nakh), polearms, three thrown “blacksmith hammers”, a shield, a Copper Rod
  for enchanters. Of the 194 items its new recipes make, 104 are rare and 11 epic. Existing items: 87 of 239 changed, mostly
  Spirit swapped for Stamina, Stamina added to resistance sets, ratings in place of percentages, 23 raised a quality.
- **Leatherworking.** The largest addition: leather and mail sets in every slot, nine stat-flavored armor kits (Forceful and
  Mystic at each leather grade), a reagent bag. 139 rare and 19 epic among 268 new items. Existing items: 128 of 235 changed.
- **Tailoring.** Cloth sets, a reagent-bag line from linen to Bottomless, a soul bag, two cloaks at 310. 110 rare and 6 epic
  among 176 new items. Existing: 120 of 233 changed. Empty categories wait for content (Embroideries).
- **Engineering.** Two new parts families (SAF-T and EZ-Thro) feeding bombs, dynamite and mortars; field transporters to
  Gadgetzan, Everlook and Mount Hyjal; three “tinkers” (nitro boosts, magnetic displacer, teleport) whose schematic is consumed
  as a reagent; satchels of bombs as ranged items; goggles for each armor type; belts; a glider, a parachute, a loot-a-rang, a
  critter carrier; 12 colored rockets. Existing gear barely changed (23 of 165).
- **Alchemy.** Six-rank lines of new potions (spell power, frenzy, mending), a recovery-potion line beside the healing potions,
  elixir lines for healers and casters (Cleric’s, Mageblood, Spirit), Fortitude and Strength elixirs, four 320 flasks,
  draughts (tongues, revealing, predatory senses), a Legionite transmute, and reagents other crafts use (three dyes, sulfuric
  acid).
- **Enchanting.** Becomes a gear craft too: relics for paladins, shamans and druids (14), staves, off-hand orbs, wands from
  Novice to 320 (7), three “Heart of the Mountain” curios; new enchantment slots (necklace) and new bracer, glove, two-hand and
  weapon enchantments; Dust to Motes (a new material). Forever’s categories also have helmet, shoulder, belt, pants, ring and
  trinket enchantments, so far empty.
- **Cooking.** Food is overhauled: 77 of 81 existing dishes changed, the old Stamina-plus-Spirit buff replaced by a single stat
  (Strength, Agility, Intellect, attack power) or run speed, and plain foods gained a small buff. New: categories by buff,
  teas and smoothies (12 drinks), raptor, stag and bear dishes at 200–285, a critter cookie. Cooking also owns the campfires:
  Basic at 1, Journeyman at 95, Expert at 205.
- **First Aid.** Grows into field medicine: First Aid can make the six healing potions too (Minor to Major), plus poultices (4),
  tourniquets (3) and a potent anti-venom, with a new Swollen Venom Sac.
- **Mining, Herbalism, Skinning, Fishing.** Two new bars (Heavy Thorium, Azerothium). Gatherers get something to make: camp
  features (Herbalism’s Gardening, Skinning’s Tanning, Fishing’s Bait and Tackle). Fishing gains Find Fish (tracking).
- **Poisons and Lockpicking.** Both move from class skills to the secondary-skill category with their own icons; Poisons gets a
  description and a category of its own. No Forever-only poison. Whether non-rogues may learn them isn’t in the tables. The
  lockpicking quests are 1.12’s own ([forever-lockpicking-quests.md](../forever-lockpicking-quests.md)).
- **Comprehension (new secondary skill).** Deciphering untranslated scrolls found in the world, which are used up for an
  effect, in four tiers (yellow at 15–30, 50–75, 100–200, 250–300), plus “Study” and “Research” at a library, which yield
  bundles of scrolls.
- **Jewelcrafting, prototyped.** A hidden “Test Profession” has a Jewelcrafting category tree: camping, reagents, necks, rings,
  crowns, cuffs, trinkets, six gem colors and meta gems, with one test smelting recipe. *(inference: a profession in
  development; nothing is announced, and the hub’s wishlist marks new professions as not delivered.)*

### 2.3 New materials (53 items used by Forever-only recipes and absent from 1.14.2)

| Kind | Items |
|---|---|
| Herbs | Demonsage, Death Lotus, Frilled Lichen, Rosecap, Stranglevine, Marefoil |
| Ores, bars, minerals | Heavy Thorium Ore and Bar, Azerothium Bar, Legionite Bar, Pyrite, Bauxite, Pitchblende, Torbernite |
| Leather | Fel Hide, Fel Leather, Pristine Leather, Pristine Hide, Pristine Scale |
| Magic | Mote of Magic, Malleable Essence of Nature, Fel Crystal |
| Made by Alchemy for others | Cerulean, Magenta and Viridian Dye; Sulfuric Acid |
| Engineering parts | nine SAF-T and EZ-Thro parts, Sandpaper, Golem Isospring, three tinker schematics |
| Food | Whimsyfin, Hyjal Berries, Thick Logs, Seasonal Fish Steaks |
| Camp trophies (tier 3) | Golem Heart, Lich’s Index Finger, Maker’s Spark, Essence of Anarchy, Undeath Engine, Bottled Screams |

Many are shared across crafts: Death Lotus by four, Pyrite and the dyes by four, Malleable Essence of Nature by five. That
weaves the crafts together. *(Fel, Legionite and Hyjal suggest new high-level places; inference.)*

### 2.4 New systems and interface concepts

| Concept | Forever | Evidence |
|---|---|---|
| **Camping** | Every profession, gatherers included, crafts camp objects in three tiers: around skill 20 (Sharpening Wheel, Faction Banner, Incense Candle, Mana Well, Camp Tent, Reagent Bot, Enchanted Lute, Lodestone, Camp Chair, Fish Bowl, First Aid Kit), around 140 (Anvil, Spinning Wheel, Tanning Rack, Fermenter, Repair Bot, Arcane Salvager, Cookie’s Feast) and at 300 (Master Forge, Loom, Sewing Machine, Alchemy Laboratory, Arcane Forge, Iron Oven…), the last needing a trophy. A fire holds three objects, one per player; their one-hour buffs stack with others. | TradeSkillCategory “Camping”; SkillLineAbility; Spell descriptions; hub: deep-dive recap and creators |
| **Recipes as items, bound** | 901 of the 929 Forever-only recipes are taught by a recipe item, not a trainer; most of those items bind on pickup (Blacksmithing 178 of 201, Leatherworking 174 of 282, Enchanting 55 of 60). Half the new gear binds on pickup too (Blacksmithing 97 of 194, Leatherworking 126 of 268, Tailoring 103 of 176), against almost none in 1.12. *(inference: personal drops and quest rewards; the deep-dive panel lists “trade skill quests”, and a creator found a level-20 leather helm recipe as a drop.)* | ItemXItemEffect, SpellEffect (learn), ItemSparse.Bonding |
| **Rare crafted leveling gear** | Rare is the most common quality of new crafted armor; Rare boots at item level 15 | ItemSparse.OverallQualityID |
| **Legacy tree for professions** | Account-wide Legacy points (earned by challenges, profession milestones among them) spent per character in Professions, Adventure and Resourcefulness trees. *Not found in the client tables or the interface code beyond a menu button: unverified.* | hub: deep-dive recap; TraitDefinition (no profession nodes) |
| **The window** | Retail’s Professions window, trimmed: an overview book (two primary cards, three secondary, an unlearn button) and a crafting page, with a side tab per profession (two primary, up to five secondary). Filters: skill-ups, have materials, slot; unlearned recipes hidden by default. Create All, a count box, a recipe tracker in the objective tracker, a crafting log (opens by itself only with a gamepad), full gamepad support. About 140 categories by slot and kind, plus Camping (Forever’s own tree). | `blizzard_professions*/camelot/` overrides; TradeSkillCategory |
| **Retail data model underneath** | Each profession has a child skill line (the expansion-tier model) and a Profession row; the UI reads the parent. | SkillLine (ParentSkillLineID, ParentTierIndex), Profession |
| **Quality tiers** | Not used: every item’s crafting quality is 0; the Profession table’s resourcefulness and multicraft fields are all 0; wago.tools serves no CraftingQuality, CraftingData or CraftingDifficulty for this build. | Item.CraftingQualityID; Profession |
| **Specialization trees, knowledge points** | Not used: the only trait trees tied to skill lines are class talent trees; Forever’s window has no specializations page. 1.12’s specializations stay as they were: the new specialization-gated recipe items are all SoD’s. | SkillLineXTraitTree; camelot frame XML; ItemSparse.RequiredAbility |
| **Profession equipment** | Not used: no item has a profession tool or gear slot; the gear slots in the crafting page are retail’s shared code. Only two items carry a profession-skill stat. | Item.InventoryType, ClassID |
| **Crafting orders, optional reagents, recrafting** | Not used: Forever’s window has no orders page; every item’s order source, modified-reagent and recraft fields are 0. The customer-orders addon is in the shared code with no Forever override. | camelot frame XML; Item |

## 3. Ideas worth borrowing for a solo 1.12 server

Constraints from our setup: the 1.14.2 client knows only its own spells, so a new recipe must reuse an unused recipe spell (new
items can come through proxy hotfix rows); gear goes through the item budget (`item_budget.py`).

1. **Camp objects as each profession’s personal payoff.** Three tiers (around 20, 140, 300), one-hour buffs for yourself, the
   top tier needing a dungeon trophy: a reason to level a profession that isn’t selling to others, and a reason to run a
   dungeon. Gatherers get theirs too.
2. **Rare crafted leveling gear at every rank,** budget-checked: 1.12’s crafted gear is mostly green and late; Forever puts
   113 recipes below skill 75 and makes rare its main quality.
3. **Keep recipes and gear unbound, unlike Forever.** Forever binds most new recipes and half its new gear on pickup; for alts
   that share by mail, unbound recipes and bind-on-equip gear are the point. Where a recipe must be earned, make it a
   profession quest every alt can do (our plan for recipe drops), not a bound drop.
4. **Cross-craft reagents that link alts:** dyes and sulfuric acid from Alchemy, motes from Enchanting, pristine leathers used
   by three crafts. One alt’s profession feeds another’s.
5. **Single-stat Well Fed food and early buff food,** plus cheap drinks: small, steady help for a solo player, with the menu
   categories we already use.
6. **First Aid as field medicine** (poultices, tourniquets, anti-venoms; maybe minor healing potions): self-sufficiency for
   every class without Alchemy.
7. **Enchanting that makes gear:** wands, staves, off-hand orbs, relics; plus necklace enchantments. It turns the weakest
   leveling profession into a useful one.
8. **Engineering utility for one player:** bomb satchels, transporters to Gadgetzan and Everlook, a loot-a-rang, a critter
   carrier.
9. **Fill 1.12’s missing lines:** fist weapons and polearms by rank, stat-flavored armor kits, reagent bags.
10. **Leave out what Forever left out:** quality tiers, knowledge trees, profession gear, crafting orders. They need systems
    1.12 doesn’t have, and orders mean nothing alone. Keep 1.12’s specializations (Forever did), perhaps with a quest to switch.
11. **Later, maybe:** a Comprehension-like skill built on 1.12’s own world-drop scrolls; Legacy-style account rewards for
    profession milestones across alts.
