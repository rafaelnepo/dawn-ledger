# Profession categories and subcategories (built in 0.49.0)

The user asked on 2026-09-27 for professions to have categories and subcategories. This is the proposed tree, before any code.

**Where the numbers come from:** every recipe the local 1.14.2 server teaches. That's the 1.12.1 client's `SkillLineAbility` and
`Spell` tables for the recipes, and the world database's `item_template` for what each one makes (item class, subclass, slot).
Each recipe goes in by what it makes, and the counts are exact. Gathering professions (Herbalism, Skinning, Fishing) have no
recipes.

**How it would work:**
- **Two levels.** A category (what kind of thing) and, under it, subcategories (the slot or type). Both fold like today's
  headers, and each remembers whether it's open, per character.
- **Order.**
  - Categories: the ones used most first.
  - Armour subcategories: body order, head to feet (Helmets, Pauldrons, Chestguards, Bracers, Gauntlets, Belts, Legguards,
    Boots). The names are Forever's own, from its Leatherworking categories ("Leather Boots"...).
  - Recipes inside a subcategory: by skill needed, highest first. That's the game's own order.
- **Small groups.** A subcategory with one recipe folds into its category. A category or subcategory with nothing shown (search,
  filters) is hidden.
- **Replaces the game's headers.** 1.14.2 sends its own flat headers ("Reagents", "Cloaks", "Leather Helmets"). Ours come from a
  data table built from the same sources (recipe spell → category, subcategory), generated like `ProfessionData.lua`. A recipe
  the table doesn't know goes under "Other".
- **Forever, for comparison:** one flat level ("Leather Boots", "Mail Boots"... 24 categories for Leatherworking). This
  proposal nests them: Leather armor › Boots.

## Blacksmithing (251)
- **Weapons** (76)
  - Swords (21) · Axes (20) · Maces (22) · Daggers (9) · Polearms (3) · Fist Weapons (1)
- **Plate armor** (66)
  - Helmets (11) · Pauldrons (7) · Chestguards (14) · Bracers (4) · Gauntlets (10) · Belts (5) · Legguards (9) · Boots (6)
- **Mail armor** (76)
  - Helmets (7) · Pauldrons (8) · Chestguards (18) · Bracers (7) · Gauntlets (12) · Belts (6) · Legguards (9) · Boots (9)
- **Shields** (1): Jagged Obsidian Shield
- **Weapon stones** (16)
  - Sharpening stones (6) · Weightstones (5) · Grinding stones (5)
- **Enhancements** (8): shield spikes, spurs, weapon chain, counterweight, buckle, cylinder
- **Rods and keys** (8)
  - Rods (4) · Skeleton keys (4)

## Leatherworking (235)
- **Leather armor** (149)
  - Helmets (10) · Pauldrons (13) · Chestguards (33) · Bracers (12) · Gauntlets (26) · Belts (20) · Legguards (21) · Boots (14)
- **Mail armor** (45)
  - Helmets (3) · Pauldrons (4) · Chestguards (13) · Bracers (7) · Gauntlets (9) · Belts (1) · Legguards (6) · Boots (2)
- **Cloaks** (16)
- **Armor kits** (6)
- **Bags and quivers** (7)
  - Quivers (3) · Ammo pouches (3) · Bags (1)
- **Leather and hides** (10)
  - Leather (5) · Cured hides (5)
- **Other** (2): Gordok Ogre Suit, Heavy Leather Ball

## Tailoring (234)
- **Cloth armor** (164)
  - Helmets (16) · Pauldrons (16) · Chestguards and robes (50) · Bracers (3) · Gauntlets (24) · Belts (11) · Legguards (25) · Boots (19)
- **Cloaks** (16)
- **Shirts and dresses** (26)
  - Shirts (22) · Dresses and suits (4)
- **Bags** (21)
  - Bags (13) · Soul bags (3) · Enchanting bags (3) · Herb bags (2)
- **Bolts of cloth** (6)
- **Other** (1): Gordok Ogre Suit

## Engineering (169)
- **Devices** (44)
  - Trinkets (15) · Toys and pets (11) · Gadgets and helpers (10) · Scopes (6) · Deflectors (2)
- **Explosives** (27)
  - Bombs and grenades (13) · Dynamite (7) · Charges (4) · Mines and sheep (3)
- **Parts** (23)
  - Components (18) · Blasting powder (5)
- **Goggles and wearables** (35)
  - Goggles and helmets (20) · Trinkets (9) · Other gear (6: boots, belt, cloak, shield, neck)
- **Fireworks** (18)
  - Rockets (12) · Fireworks and launchers (6)
- **Guns and ammunition** (19)
  - Guns (11) · Ammunition (7) · Tools (1: Arclight Spanner)
- **Other** (3): Practice Lock, two plans and recipes

## Enchanting (152)
- **Enchantments** (132), one subcategory per slot
  - Bracers (25) · Chest (18) · Cloaks (18) · Gloves (18) · Boots (11) · Shields (11) · Weapons (21) · Two-hand weapons (10)
- **Oils** (7)
  - Mana oils (3) · Wizard oils (4)
- **Rods** (5)
- **Wands** (4)
- **Materials** (4): Enchanted Leather, Enchanted Thorium, Charged Scale of Onyxia, Smoking Heart of the Mountain

## Alchemy (117)
- **Potions** (51)
  - Healing and mana (24) · Protection (15) · Combat and utility (12)
- **Elixirs** (36)
  - Offensive (18: strength, agility, spell power...) · Defensive and utility (18: armour, health, water breathing, detection...)
- **Flasks** (5)
- **Transmutes** (14)
  - Elements (9) · Metals (3) · Stones (2)
- **Oils** (6)
- **Other** (5): Ghost Dye, Gift of Arthas, Goblin Rocket Fuel...

## Cooking (82; by what the food does since 0.55.0, the user's request)
- **Hearty Meals** (43; Stamina and Spirit): Meat · Fish and seafood · Soups and stews · Eggs and baking
- **Chef's Specialties** (7; one stat): Stamina · Strength · Agility · Intellect · Spirit
- **Restoring Dishes** (4): Mana · Health
- **Simple Fare** (22; no buff): Meat · Fish and seafood · Soups and stews · Eggs and baking
- **Drinks and Teas** (4)
- **Fiery Dishes** (1): Dragonbreath Chili
- **Curious Delicacies** (1): Savory Deviate Delight (its own: a special kind of item, the user)

(The names like a menu, the user's request, 0.56.2.)

The buff comes from the item's use spells, both of them (the buff is often the second: Increased Agility, Mana Regeneration),
followed through triggered spells (Brain Food's Well Fed restores mana by a periodic energize).

## First Aid (14)
- **Bandages** (11)
- **Anti-venoms** (3)

## Mining (12)
- **Smelting** (12): every bar

## The user's answers (2026-09-27) and what was built (0.49.0)
1. Armour: a setting in the professions' gear, "Armor by slot first"; type first by default.
2. Forever's slot words.
3. Cooking by ingredient (one level); the buff is a filter (Filter › Buff ›: any Well Fed buff, Stamina, Spirit, Strength,
   Agility, Intellect, mana or health regeneration, other: the kinds the profession's recipes give).
4. Yes: Filter › "The game's own categories" switches back to 1.14.2's flat headers (which in game are item classes: Consumable,
   Bag, Cloth, Leather, Mail).

Data: tools/asset-extract/profession_categories.py writes the second part of addons/ForeverUI/ProfessionFilters.lua (run
profession_filters.py first: each keeps the other's part). Code: the end of ProfessionsFilterMenu.lua (ns.CraftCategories), the
list's level-2 rows in Professions.lua. Folds kept per profession (ForeverUIDB.profFolds). A subcategory of one recipe has no row
of its own (its recipe sits under the category).

## The questions that were asked
1. **Armour: type first or slot first?** This proposal has Plate armor › Chestguards. The other way is Chestguards › Plate / Mail,
   which is closer to how you look for an upgrade to one slot.
2. **Slot names:** Forever's words (Helmets, Pauldrons, Chestguards, Bracers, Gauntlets, Belts, Legguards, Boots) or plain ones
   (Head, Shoulders, Chest, Wrists, Hands, Waist, Legs, Feet)?
3. **Cooking's second level:** by ingredient, as above, or by the buff?
4. **The Filter menu** (have materials, skill-ups...) could also let you switch between these categories and the game's own
   flat headers. Want that switch?
