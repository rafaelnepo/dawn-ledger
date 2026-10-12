# WoW Forever’s crafted items against 1.14.2’s

Written by `python3 tools/server-data/forever_crafts.py` (session 69) from the two clients’ own tables (1.14.2.42597 and Forever 1.60.1.70291, wago.tools). Forever stores each stat as a share of a budget and the budget by item level, quality and slot (RandPropPoints): the amounts here are computed the client’s way. Armor and weapon damage are left out (other tables in Forever). Value: [the item budget](../server/item-budget.md)’s, the same costs for both. “Change” is Forever’s value against 1.14.2’s.

Forever’s ratings, against 1.12’s percentages (rating points per 1 %, or per defense point; the median over the items both clients have): block % 5 (11 items); defense 1 (62 items); dodge % 12 (47 items); melee critical % 14 (250 items); melee hit % 10 (111 items); parry % 15 (7 items).

## Recipes and items

| Profession | Items made, 1.14.2 | Forever | Kept | New in Forever | Gone |
|---|---|---|---|---|---|
| Blacksmithing | 250 | 506 | 244 | 262 | 6 |
| Leatherworking | 235 | 592 | 235 | 357 | 0 |
| Tailoring | 233 | 469 | 233 | 236 | 0 |
| Engineering | 168 | 271 | 168 | 103 | 0 |
| Alchemy | 115 | 195 | 108 | 87 | 7 |
| Enchanting | 20 | 81 | 18 | 63 | 2 |
| Cooking | 82 | 132 | 81 | 51 | 1 |
| First Aid | 14 | 32 | 14 | 18 | 0 |

## Blacksmithing

239 items in both; 87 changed in some way (4 with a higher item level, 23 a better quality). Of the 160 with stats: 22 stronger in Forever, 7 weaker, 131 within 5 %; median change 100 %. 180 new items.

| Change | Item | 1.14.2 | Forever |
|---|---|---|---|
| 425 % | 12260 Searing Golden Blade | Uncommon, item level 39, requires 34: 10 one school’s spell damage (value 6.7) | Uncommon, item level 39, requires 34: 7 Intellect, 39 one school’s spell damage (value 28.6) |
| 161 % | 12612 Runic Plate Helm | Uncommon, item level 61, requires 56: 13 resistance, 13 resistance (value 20.1) | Uncommon, item level 61, requires 56: 19 Stamina, 14 resistance, 14 resistance (value 32.3) |
| 151 % | 12610 Runic Plate Shoulders | Uncommon, item level 60, requires 55: 10 resistance, 10 resistance (value 15.4) | Uncommon, item level 60, requires 55: 14 Stamina, 10 resistance, 10 resistance (value 23.4) |
| 151 % | 12611 Runic Plate Boots | Uncommon, item level 60, requires 55: 10 resistance, 10 resistance (value 15.4) | Uncommon, item level 60, requires 55: 14 Stamina, 10 resistance, 10 resistance (value 23.4) |
| 149 % | 12614 Runic Plate Leggings | Uncommon, item level 62, requires 57: 14 resistance, 14 resistance (value 21.6) | Uncommon, item level 62, requires 57: 19 Stamina, 14 resistance, 14 resistance (value 32.3) |
| 142 % | 12613 Runic Breastplate | Uncommon, item level 62, requires 57: 15 resistance, 15 resistance (value 23.1) | Uncommon, item level 62, requires 57: 18 Stamina, 15 resistance, 15 resistance (value 32.8) |
| 136 % | 12406 Thorium Belt | Uncommon, item level 50, requires 45: 6 resistance, 6 resistance, 6 resistance, 6 resistance, 6 resistance (value 17.1) | Uncommon, item level 50, requires 45: 12 Stamina, 6 resistance, 6 resistance, 6 resistance, 6 resistance, 6 resistance (value 23.2) |
| 134 % | 12414 Thorium Leggings | Uncommon, item level 60, requires 55: 10 resistance, 10 resistance, 10 resistance, 10 resistance, 10 resistance (value 28.4) | Uncommon, item level 60, requires 55: 19 Stamina, 10 resistance, 10 resistance, 10 resistance, 10 resistance, 10 resistance (value 38.0) |
| 133 % | 12405 Thorium Armor | Uncommon, item level 50, requires 45: 8 resistance, 8 resistance, 8 resistance, 8 resistance, 8 resistance (value 22.7) | Uncommon, item level 50, requires 45: 15 Stamina, 8 resistance, 8 resistance, 8 resistance, 8 resistance, 8 resistance (value 30.3) |
| 131 % | 12410 Thorium Helm | Uncommon, item level 56, requires 51: 10 resistance, 10 resistance, 10 resistance, 10 resistance, 10 resistance (value 28.4) | Uncommon, item level 56, requires 51: 18 Stamina, 10 resistance, 10 resistance, 10 resistance, 10 resistance, 10 resistance (value 37.3) |
| 126 % | 12408 Thorium Bracers | Uncommon, item level 51, requires 46: 5 resistance, 5 resistance, 5 resistance, 5 resistance, 5 resistance (value 14.2) | Uncommon, item level 51, requires 46: 8 Stamina, 5 resistance, 5 resistance, 5 resistance, 5 resistance, 5 resistance (value 18.0) |
| 123 % | 12776 Enchanted Battlehammer | Rare, item level 56, requires 51: 1 parry %, 2 melee hit % (value 28.5) | Rare, item level 56, requires 51: 1.4 parry %, 2 melee hit %, 4 resistance (value 35.2) |
| 121 % | 12418 Radiant Gloves | Uncommon, item level 57, requires 52: 12 resistance, 12 resistance (value 18.5) | Uncommon, item level 57, requires 52: 9 Stamina, 12 resistance, 12 resistance (value 22.5) |
| 119 % | 12625 Dawnbringer Shoulders | Rare, item level 58, requires 53: 10 Spirit, 44 healing (value 22.5) | Rare, item level 58, requires 53: 10 Spirit, 44 healing, 15 one school’s spell damage (value 26.8) |
| 118 % | 12420 Radiant Leggings | Uncommon, item level 61, requires 56: 18 resistance, 18 resistance (value 27.8) | Uncommon, item level 61, requires 56: 12 Stamina, 18 resistance, 18 resistance (value 32.8) |
| 116 % | 12419 Radiant Boots | Uncommon, item level 58, requires 53: 15 resistance, 15 resistance (value 23.1) | Uncommon, item level 58, requires 53: 9 Stamina, 15 resistance, 15 resistance (value 26.7) |
| 115 % | 7946 Runed Mithril Hammer | Uncommon, item level 49, requires 44: 7 Strength, 4 Stamina (value 8.9) | Uncommon, item level 49, requires 44: 7 Stamina, 4 defense (value 10.2) |
| 115 % | 12416 Radiant Belt | Uncommon, item level 52, requires 47: 12 resistance, 12 resistance (value 18.5) | Uncommon, item level 52, requires 47: 7 Stamina, 12 resistance, 12 resistance (value 21.3) |
| 114 % | 12639 Stronghold Gauntlets | Epic, item level 62, requires 57: 12 Stamina, 1 parry %, 1 melee critical % (value 29.8) | Epic, item level 62, requires 57: 18 Stamina, 1 parry %, 1 melee critical % (value 33.9) |
| 112 % | 12417 Radiant Circlet | Uncommon, item level 59, requires 54: 18 resistance, 18 resistance (value 27.8) | Uncommon, item level 59, requires 54: 9 Stamina, 18 resistance, 18 resistance (value 31.1) |
| 109 % | 19168 Blackguard | Epic, item level 70, requires 60: 9 Stamina, 1 parry % (value 21.8) | Epic, item level 70, requires 60: 12 Stamina, 1 parry % (value 23.8) |
| 109 % | 12633 Whitesoul Helm | Rare, item level 60, requires 55: 15 Spirit, 15 Intellect, 35 healing (value 30.6) | Rare, item level 60, requires 55: 15 Spirit, 15 Intellect, 120 bonus armor, 35 healing, 12 one school’s spell damage (value 33.3) |
| 100 % | 3837 Golden Scale Coif | Uncommon, item level 38, requires 33: 10 Strength, 10 Spirit (value 15.9) | Uncommon, item level 38, requires 33: 10 Strength, 10 Stamina (value 15.9) |
| 100 % | 3841 Golden Scale Shoulders | Uncommon, item level 35, requires 30: 7 Strength, 6 Spirit (value 10.3) | Uncommon, item level 35, requires 30: 7 Strength, 6 Stamina (value 10.3) |
| 100 % | 3843 Golden Scale Leggings | Uncommon, item level 34, requires 29: 11 Strength, 5 Spirit (value 13.1) | Uncommon, item level 34, requires 29: 11 Strength, 5 Stamina (value 13.1) |
| 100 % | 3844 Green Iron Hauberk | Rare, item level 36, requires 31: 11 Stamina, 7 Strength (value 14.5) | Rare, item level 36, requires 31: 11 Stamina, 7 Strength, 120 bonus armor (value 14.5) |
| 100 % | 3845 Golden Scale Cuirass | Uncommon, item level 40, requires 35: 14 Strength, 6 Spirit (value 16.5) | Uncommon, item level 40, requires 35: 14 Strength, 6 Stamina (value 16.5) |
| 100 % | 3847 Golden Scale Boots | Uncommon, item level 40, requires 35: 8 Strength, 8 Spirit (value 12.7) | Uncommon, item level 40, requires 35: 8 Strength, 8 Stamina (value 12.7) |
| 100 % | 6731 Ironforge Breastplate | Uncommon, item level 20, requires 15: 3 Strength, 3 Stamina (value 4.8) | Uncommon, item level 20, requires 15: 3 Strength, 3 Stamina, 30 bonus armor (value 4.8) |
| 100 % | 6733 Ironforge Gauntlets | Uncommon, item level 28, requires 23: 12 attack power (value 5.9) | Uncommon, item level 28, requires 23: 50 bonus armor, 12 attack power (value 5.9) |
| 100 % | 7919 Heavy Mithril Gauntlet | Uncommon, item level 41, requires 40: 8 Stamina (value 8.0) | Uncommon, item level 41, requires 40: 8 Stamina, 80 bonus armor (value 8.0) |
| 100 % | 7920 Mithril Plate Pants | Uncommon, item level 42, requires 37: 11 Spirit, 1 dodge % (value 18.2) | Uncommon, item level 42, requires 40: 11 Spirit, 1 dodge % (value 18.2) |
| 100 % | 7921 Heavy Mithril Pants | Uncommon, item level 42, requires 40: 11 Stamina (value 11.0) | Uncommon, item level 42, requires 40: 11 Stamina, 120 bonus armor (value 11.0) |
| 100 % | 7924 Mithril Plate Bracers | Uncommon, item level 43, requires 38: 7 Spirit, 6 Stamina (value 10.3) | Uncommon, item level 43, requires 40: 7 Spirit, 6 Stamina (value 10.3) |
| 100 % | 7925 Mithril Plate Gloves | Uncommon, item level 44, requires 39: 10 Spirit, 9 Stamina (value 15.1) | Uncommon, item level 44, requires 40: 10 Spirit, 9 Stamina (value 15.1) |
| 100 % | 7929 Orcish War Leggings | Uncommon, item level 42, requires 37: 17 Strength (value 17.0) | Uncommon, item level 42, requires 40: 17 Strength (value 17.0) |
| 100 % | 7930 Heavy Mithril Breastplate | Uncommon, item level 46, requires 41: 15 Stamina (value 15.0) | Uncommon, item level 46, requires 41: 15 Stamina, 90 bonus armor (value 15.0) |
| 100 % | 7933 Heavy Mithril Boots | Uncommon, item level 47, requires 42: 12 Stamina (value 12.0) | Uncommon, item level 47, requires 42: 12 Stamina, 70 bonus armor (value 12.0) |
| 100 % | 7934 Heavy Mithril Helm | Uncommon, item level 47, requires 42: 15 Stamina (value 15.0) | Uncommon, item level 47, requires 42: 15 Stamina, 100 bonus armor (value 15.0) |
| 100 % | 9366 Golden Scale Gauntlets | Uncommon, item level 41, requires 36: 11 Strength, 4 Spirit (value 12.6) | Uncommon, item level 41, requires 36: 11 Strength, 4 Stamina (value 12.6) |
| 100 % | 11604 Dark Iron Plate | Rare, item level 59, requires 54: 12 Stamina, 19 resistance (value 24.5) | Rare, item level 59, requires 54: 12 Stamina, 200 bonus armor, 19 resistance (value 24.5) |
| 100 % | 11605 Dark Iron Shoulders | Uncommon, item level 58, requires 53: 10 Stamina, 10 resistance (value 15.7) | Uncommon, item level 58, requires 53: 10 Stamina, 100 bonus armor, 10 resistance (value 15.7) |
| 100 % | 11606 Dark Iron Mail | Uncommon, item level 56, requires 51: 13 Stamina, 12 resistance (value 19.6) | Uncommon, item level 56, requires 51: 13 Stamina, 130 bonus armor, 12 resistance (value 19.6) |
| 100 % | 12782 Corruption | Rare, item level 58, requires 53: 30 Strength, 30 Stamina, -40 Spirit (value 47.6) | Rare, item level 58, requires 53: 30 Strength, 30 Stamina (value 47.6) |
| 100 % | 12783 Heartseeker | Rare, item level 63, requires 58: 4 Strength, 1 melee critical % (value 14.4) | Rare, item level 63, requires 58: 4 Agility, 1 melee critical % (value 14.4) |
| 100 % | 17013 Dark Iron Leggings | Epic, item level 60, requires 55: 14 Stamina, 30 resistance (value 35.3) | Epic, item level 60, requires 55: 14 Stamina, 180 bonus armor, 30 resistance (value 35.3) |
| 100 % | 17014 Dark Iron Bracers | Epic, item level 59, requires 54: 7 Stamina, 18 resistance (value 20.3) | Epic, item level 59, requires 54: 7 Stamina, 100 bonus armor, 18 resistance (value 20.3) |
| 100 % | 19148 Dark Iron Helm | Epic, item level 66, requires 60: 20 Stamina, 35 resistance (value 43.6) | Epic, item level 66, requires 60: 20 Stamina, 150 bonus armor, 35 resistance (value 43.6) |
| 100 % | 19693 Darksoul Breastplate | Rare, item level 65, requires 60: 32 Stamina, 1 melee hit % (value 35.2) | Rare, item level 65, requires 60: 32 Stamina, 60 bonus armor, 1 melee hit % (value 35.2) |
| 100 % | 19694 Darksoul Leggings | Rare, item level 65, requires 60: 22 Stamina, 2 melee hit % (value 32.0) | Rare, item level 65, requires 60: 22 Stamina, 130 bonus armor, 2 melee hit % (value 32.0) |
| 100 % | 20039 Dark Iron Boots | Epic, item level 70, requires 60: 28 resistance (value 27.2) | Epic, item level 70, requires 60: 28 resistance, 120 bonus armor (value 27.2) |
| 100 % | 22198 Jagged Obsidian Shield | Epic, item level 70, requires 60: 2 block %, 5 resistance, 100 proc on hit (value 1034.8) | Epic, item level 70, requires 60: 2 block %, 5 stat 124, 100 proc on hit (value 1034.5) |
| 96 % | 3852 Golden Iron Destroyer | Uncommon, item level 34, requires 29: 11 Strength, 4 Stamina (value 12.6) | Uncommon, item level 34, requires 29: 11 Strength, 4 spell damage and healing (value 12.0) |
| 95 % | 22197 Heavy Obsidian Belt | Rare, item level 68, requires 60: 25 Strength, 5 resistance (value 26.4) | Rare, item level 68, requires 60: 25 Strength, 5 stat 124 (value 25.0) |
| 94 % | 22195 Light Obsidian Belt | Rare, item level 68, requires 60: 32 attack power, 1 melee critical %, 5 resistance (value 24.2) | Rare, item level 68, requires 60: 32 attack power, 1 melee critical %, 5 stat 124 (value 22.8) |
| 91 % | 19057 Gloves of the Dawn | Rare, item level 64, requires 59: 23 Strength, 10 Stamina (value 27.2) | Rare, item level 61, requires 56: 21 Strength, 9 Stamina (value 24.8) |
| 89 % | 3856 Shadow Crescent Axe | Uncommon, item level 40, requires 35: 11 Strength, 10 Stamina (value 16.7) | Uncommon, item level 40, requires 35: 11 Strength, 10 spell damage and healing (value 14.8) |
| 79 % | 3853 Moonsteel Broadsword | Uncommon, item level 36, requires 31: 4 Stamina, 12 Spirit (value 13.5) | Uncommon, item level 36, requires 31: 4 Strength, 12 spell damage and healing (value 10.7) |
| 77 % | 3850 Jade Serpentblade | Uncommon, item level 35, requires 30: 4 Strength, 4 Agility (value 6.3) | Uncommon, item level 35, requires 30: 4 attack power, 4 Agility (value 4.9) |
| 74 % | 22383 Sageblade | Epic, item level 64, requires 59: 14 Stamina, 6 Intellect, 20 spell damage and healing, 20 healing (value 28.0) | Epic, item level 64, requires 59: 14 Stamina, 6 Intellect, 1 melee hit % (value 20.8) |
| — | 2847 Copper Shortsword | Common, item level 9, requires 4: — (value 0.0) | Uncommon, item level 10, requires 4: 1 Strength (value 1.0) |
| — | 2848 Bronze Mace | Common, item level 22, requires 17: — (value 0.0) | Uncommon, item level 22, requires 17: 3 Stamina (value 3.0) |
| — | 2849 Bronze Axe | Common, item level 23, requires 18: — (value 0.0) | Uncommon, item level 23, requires 18: 3 Strength (value 3.0) |
| — | 2850 Bronze Shortsword | Common, item level 24, requires 19: — (value 0.0) | Uncommon, item level 24, requires 19: 3 Agility (value 3.0) |
| — | 2851 Copper Chain Belt | Common, item level 11, requires 6: — (value 0.0) | Uncommon, item level 11, requires 6: 1 Stamina (value 1.0) |
| — | 2852 Copper Chain Pants | Common, item level 9, requires 4: — (value 0.0) | Uncommon, item level 10, requires 4: 1 Stamina (value 1.0) |
| — | 2854 Runed Copper Bracers | Common, item level 19, requires 14: — (value 0.0) | Uncommon, item level 19, requires 14: 2 Strength, 2 Stamina (value 3.2) |
| — | 2857 Runed Copper Belt | Common, item level 18, requires 13: — (value 0.0) | Uncommon, item level 18, requires 13: 3 Strength, 2 Stamina (value 4.0) |
| — | 2866 Rough Bronze Cuirass | Common, item level 23, requires 18: — (value 0.0) | Uncommon, item level 23, requires 18: 8 Stamina (value 8.0) |
| — | 3469 Copper Chain Boots | Common, item level 9, requires 4: — (value 0.0) | Uncommon, item level 10, requires 4: 1 Stamina (value 1.0) |
| — | 3472 Runed Copper Gauntlets | Common, item level 12, requires 7: — (value 0.0) | Uncommon, item level 12, requires 7: 1 Strength, 1 Stamina (value 1.6) |
| — | 3480 Rough Bronze Shoulders | Common, item level 22, requires 17: — (value 0.0) | Uncommon, item level 22, requires 17: 4 Stamina, 3 Strength (value 5.6) |
| — | 3835 Green Iron Bracers | Common, item level 33, requires 28: — (value 0.0) | Uncommon, item level 33, requires 28: 5 Stamina, 4 Strength (value 7.2) |
| — | 6040 Golden Scale Bracers | Common, item level 37, requires 32: — (value 0.0) | Uncommon, item level 37, requires 32: 5 Stamina, 6 Strength (value 8.7) |
| — | 6214 Heavy Copper Maul | Common, item level 16, requires 11: — (value 0.0) | Uncommon, item level 16, requires 11: 4 Strength (value 4.0) |
| — | 6350 Rough Bronze Boots | Common, item level 18, requires 13: — (value 0.0) | Uncommon, item level 18, requires 13: 2 Strength, 3 Stamina (value 4.0) |
| — | 7166 Copper Dagger | Common, item level 11, requires 6: — (value 0.0) | Uncommon, item level 11, requires 6: 1 Agility (value 1.0) |
| — | 7922 Steel Plate Helm | Common, item level 43, requires 40: — (value 0.0) | Uncommon, item level 43, requires 40: 12 Stamina, 12 Strength (value 19.0) |
| — | 7955 Copper Claymore | Common, item level 11, requires 6: — (value 0.0) | Uncommon, item level 11, requires 6: 1 Strength, 1 Stamina (value 1.6) |
| — | 7956 Bronze Warhammer | Common, item level 25, requires 20: — (value 0.0) | Uncommon, item level 25, requires 20: 6 Stamina, 6 Strength (value 9.5) |
| — | 7957 Bronze Greatsword | Common, item level 26, requires 21: — (value 0.0) | Uncommon, item level 26, requires 21: 7 spell damage and healing, 6 Stamina (value 8.9) |
| — | 7958 Bronze Battle Axe | Common, item level 27, requires 22: — (value 0.0) | Uncommon, item level 27, requires 22: 10 Strength (value 10.0) |
| — | 7963 Steel Breastplate | Uncommon, item level 40, requires 35: — (value 0.0) | Uncommon, item level 40, requires 35: 12 Stamina, 2 block % (value 16.6) |
| — | 10421 Rough Copper Vest | Common, item level 7, requires 2: — (value 0.0) | Uncommon, item level 10, requires 2: 1 Stamina (value 1.0) |
| — | 12775 Huge Thorium Battleaxe | Uncommon, item level 56, requires 51: 10 profession skill (value 12.5) | Uncommon, item level 56, requires 51: 2 stat 90 (value 0.0) |
| — | 12798 Annihilator | Rare, item level 63, requires 58: Use or proc: Armor Shatter (value 0.0) | Rare, item level 63, requires 58: 14 attack power; Use or proc: Armor Shatter (value 6.9) |
| — | 12802 Darkspear | Rare, item level 60, requires 55: Use or proc: Ancestor's Vengeance (value 0.0) | Rare, item level 60, requires 55: — (value 0.0) |

### New in Forever (180)

| Item | Quality, item level, requires | Stats and effects | Value / 1.12’s budget | Recipe yellow |
|---|---|---|---|---|
| 279944 Sharpening Wheel | Common, 4, 0 | Use or proc: Sharpening Wheel | — | 20 |
| 6217 Copper Rod | Common, 5, 0 | — | — | 10 |
| 276993 Cloudy Skyforged Wristguards | Uncommon, 10, 5 | 1 Strength | 1.0 / 0.6 (157 %) | 55 |
| 276995 Cloudy Skyforged Chain | Uncommon, 10, 5 | 1 Stamina | 1.0 / 0.9 (118 %) | 55 |
| 277017 Azure Skyforged Wristguards | Uncommon, 10, 5 | 1 Strength | 1.0 / 0.6 (157 %) | 55 |
| 277019 Azure Skyforged Chain | Uncommon, 10, 5 | 1 Stamina | 1.0 / 0.9 (118 %) | 55 |
| 277672 Rough Copper Chain Boots | Uncommon, 10, 4 | 1 Strength | 1.0 / 0.9 (117 %) | 60 |
| 276994 Cloudy Skyforged Gauntlets | Uncommon, 11, 6 | 1 Agility | 1.0 / 1.2 (80 %) | 60 |
| 276997 Cloudy Skyforged Greaves | Uncommon, 11, 6 | 1 Agility | 1.0 / 1.2 (81 %) | 60 |
| 277018 Azure Skyforged Gauntlets | Uncommon, 11, 6 | 1 Agility | 1.0 / 1.2 (80 %) | 60 |
| 277021 Azure Skyforged Greaves | Uncommon, 11, 6 | 1 Agility | 1.0 / 1.2 (81 %) | 60 |
| 276992 Cloudy Skyforged Chainmail | Uncommon, 12, 7 | 2 Strength | 2.0 / 2.1 (94 %) | 65 |
| 276996 Cloudy Skyforged Legguards | Uncommon, 12, 7 | 2 Stamina | 2.0 / 2.1 (93 %) | 65 |
| 277016 Azure Skyforged Chainmail | Uncommon, 12, 7 | 2 Strength | 2.0 / 2.1 (94 %) | 65 |
| 277020 Azure Skyforged Legguards | Uncommon, 12, 7 | 2 Stamina | 2.0 / 2.1 (93 %) | 65 |
| 250482 Glowing Copper Boots | Rare, 15, 10 | 4 Intellect, 9 healing, 3 one school’s spell damage | 6.8 / 5.7 (120 %) | 40 |
| 250620 Gemmed Copper Boots | Rare, 15, 10 | 4 Strength, 4 Stamina | 6.3 / 5.7 (112 %) | 40 |
| 250621 Strange Copper Boots | Rare, 15, 10 | 5 spell damage and healing, 4 Stamina | 6.2 / 5.7 (109 %) | 40 |
| 250513 Veteran's Chain Belt | Rare, 17, 12 | 3 Agility, 4 Stamina, 4 Strength | 7.7 / 6.5 (117 %) | 85 |
| 250514 Guard's Chain Belt | Rare, 17, 12 | 3 defense, 4 Stamina, 4 Strength | 8.6 / 6.5 (131 %) | 85 |
| 250515 Protector's Chain Belt | Rare, 17, 12 | 3 defense, 5 spell damage and healing, 4 Stamina | 8.4 / 6.5 (129 %) | 85 |
| 250516 Acolyte's Chain Belt | Rare, 17, 12 | 4 Intellect, 3 one school’s spell damage, 9 healing, 3 Stamina | 8.1 / 6.5 (124 %) | 85 |
| 250517 Crusader's Chain Belt | Rare, 17, 12 | 5 spell damage and healing, 4 Stamina, 3 Strength | 7.5 / 6.5 (114 %) | 85 |
| 250488 Veteran's Chain Shirt | Rare, 20, 15 | 4 Agility, 5 Stamina, 7 Strength | 11.2 / 10.4 (108 %) | 85 |
| 250489 Guard's Chain Shirt | Rare, 20, 15 | 5 defense, 7 Stamina, 4 Strength | 12.9 / 10.4 (124 %) | 85 |
| 250490 Protector's Chain Shirt | Rare, 20, 15 | 5 defense, 5 spell damage and healing, 7 Stamina | 12.8 / 10.4 (123 %) | 85 |
| 250491 Acolyte's Chain Shirt | Rare, 20, 15 | 5 Intellect, 5 one school’s spell damage, 16 healing, 4 Stamina | 12.1 / 10.4 (116 %) | 85 |
| 250492 Crusader's Chain Shirt | Rare, 20, 15 | 9 spell damage and healing, 5 Stamina, 4 Strength | 11.1 / 10.4 (106 %) | 85 |
| 250508 Veteran's Gloves | Rare, 20, 15 | 3 Agility, 5 Stamina, 5 Strength | 9.1 / 8.0 (114 %) | 110 |
| 250509 Guard's Gloves | Rare, 20, 15 | 3 defense, 5 Stamina, 5 Strength | 10.0 / 8.0 (125 %) | 110 |
| 250510 Protector's Gloves | Rare, 20, 15 | 3 defense, 5 spell damage and healing, 5 Stamina | 9.2 / 8.0 (114 %) | 110 |
| 250511 Acolyte's Gloves | Rare, 20, 15 | 5 Intellect, 3 one school’s spell damage, 10 healing, 3 Stamina | 9.1 / 8.0 (114 %) | 110 |
| 250512 Crusader's Gloves | Rare, 20, 15 | 5 spell damage and healing, 5 Stamina, 3 Strength | 8.2 / 8.0 (103 %) | 110 |
| 250602 Brass Knuckles | Uncommon, 21, 16 | 2 Agility, 2 Stamina | 3.2 / 2.6 (124 %) | 110 |
| 250503 Veteran's Boots | Rare, 22, 17 | 4 Agility, 5 Stamina, 5 Strength | 9.7 / 8.8 (110 %) | 115 |
| 250504 Guard's Boots | Rare, 22, 17 | 4 defense, 5 Stamina, 5 Strength | 11.0 / 8.8 (125 %) | 115 |
| 250505 Protector's Boots | Rare, 22, 17 | 4 defense, 6 spell damage and healing, 5 Stamina | 10.7 / 8.8 (121 %) | 115 |
| 250506 Acolyte's Boots | Rare, 22, 17 | 5 Intellect, 4 one school’s spell damage, 11 healing, 4 Stamina | 10.3 / 8.8 (116 %) | 115 |
| 250507 Crusader's Boots | Rare, 22, 17 | 6 spell damage and healing, 5 Stamina, 4 Strength | 9.4 / 8.8 (106 %) | 115 |
| 285279 Cracked Blacksmith Hammer | Uncommon, 22, 17 | 2 Strength | — | 115 |
| 211845 Blackfathom Sharpening Stone | Uncommon, 25, 0 | Use or proc: Sharpen Weapon - Hit | — | 100 |
| 250483 Sterling Silver Boots | Uncommon, 25, 20 | 4 spell damage and healing, 3 Stamina, 3 Strength | 6.2 / 6.6 (95 %) | 130 |
| 250493 Veteran's Chain Leggings | Rare, 25, 20 | 5 Agility, 7 Stamina, 9 Strength | 14.8 / 13.5 (109 %) | 100 |
| 250494 Guard's Chain Leggings | Rare, 25, 20 | 7 defense, 9 Stamina, 5 Strength | 17.2 / 13.5 (127 %) | 100 |
| 250495 Protector's Chain Leggings | Rare, 25, 20 | 7 defense, 6 spell damage and healing, 9 Stamina | 16.9 / 13.5 (125 %) | 100 |
| 250496 Acolyte's Chain Leggings | Rare, 25, 20 | 7 Intellect, 7 one school’s spell damage, 21 healing, 5 Stamina | 16.1 / 13.5 (119 %) | 100 |
| 250497 Crusader's Chain Leggings | Rare, 25, 20 | 11 spell damage and healing, 7 Stamina, 5 Strength | 14.2 / 13.5 (105 %) | 100 |
| 250528 Veteran's Silvered Chain Helm | Rare, 25, 20 | 9 Stamina, 10 Strength | 15.1 / 14.1 (107 %) | 125 |
| 250529 Guard's Silvered Chain Helm | Rare, 25, 20 | 9 Stamina, 10 Agility | 15.1 / 14.1 (107 %) | 125 |
| 250530 Protector's Silvered Chain Helm | Rare, 25, 20 | 7 defense, 9 Stamina | 15.3 / 14.1 (108 %) | 125 |
| 250531 Acolyte's Silvered Chain Helm | Rare, 25, 20 | 7 one school’s spell damage, 21 healing, 9 Stamina | 15.7 / 14.1 (111 %) | 125 |
| 250532 Crusader's Silvered Chain Helm | Rare, 25, 20 | 11 spell damage and healing, 9 Stamina | 13.7 / 14.1 (97 %) | 125 |
| 250603 Bronze Dory | Uncommon, 25, 20 | 8 Agility, 6 attack power | 9.1 / 8.3 (110 %) | 125 |
| 250484 Sterling Silver Leggings | Uncommon, 26, 21 | 4 spell damage and healing, 3 Stamina, 3 Strength | 6.2 / 9.2 (68 %) | 135 |
| 250485 Sterling Silver Gauntlet | Uncommon, 26, 21 | 4 spell damage and healing, 4 Stamina, 4 Strength | 7.7 / 7.0 (109 %) | 135 |
| 250486 Sterling Silver Shoulders | Uncommon, 27, 22 | 4 spell damage and healing, 4 Stamina, 4 Strength | 7.7 / 7.6 (101 %) | 140 |
| 250518 Veteran's Silvered Chain Shirt | Rare, 27, 22 | 6 Agility, 7 Stamina, 10 Strength | 16.1 / 14.6 (110 %) | 140 |
| 250519 Guard's Silvered Chain Shirt | Rare, 27, 22 | 7 defense, 10 Stamina, 6 Strength | 18.5 / 14.6 (126 %) | 140 |
| 250520 Protector's Silvered Chain Shirt | Rare, 27, 22 | 7 defense, 7 spell damage and healing, 10 Stamina | 18.0 / 14.6 (124 %) | 140 |
| 250521 Acolyte's Silvered Chain Shirt | Rare, 27, 22 | 7 Intellect, 7 one school’s spell damage, 22 healing, 6 Stamina | 17.0 / 14.6 (116 %) | 140 |
| 250522 Crusader's Silvered Chain Shirt | Rare, 27, 22 | 12 spell damage and healing, 7 Stamina, 6 Strength | 15.4 / 14.6 (105 %) | 140 |
| 279988 Anvil | Common, 28, 0 | Use or proc: Anvil | — | 140 |
| 250487 Sterling Silver Breastplate | Uncommon, 30, 25 | 7 spell damage and healing, 6 Stamina, 7 Strength | 12.7 / 11.2 (113 %) | 155 |
| 250498 Veteran's Chain Helm | Rare, 30, 25 | 11 Stamina, 12 Strength | 18.3 / 17.3 (106 %) | 130 |
| 250499 Guard's Chain Helm | Rare, 30, 25 | 12 Agility, 11 Stamina | 18.3 / 17.3 (106 %) | 130 |
| 250500 Protector's Chain Helm | Rare, 30, 25 | 8 defense, 11 Stamina | 18.1 / 17.3 (105 %) | 130 |
| 250501 Acolyte's Chain Helm | Rare, 30, 25 | 8 one school’s spell damage, 25 healing, 11 Stamina | 18.7 / 17.3 (109 %) | 130 |
| 250502 Crusader's Chain Helm | Rare, 30, 25 | 14 spell damage and healing, 11 Strength | 17.1 / 17.3 (99 %) | 130 |
| 250523 Veteran's Silvered Chain Leggings | Rare, 30, 25 | 7 Agility, 8 Stamina, 11 Strength | 18.2 / 16.5 (110 %) | 155 |
| 250524 Guard's Silvered Chain Leggings | Rare, 30, 25 | 8 defense, 11 Stamina, 7 Strength | 20.9 / 16.5 (126 %) | 155 |
| 250525 Protector's Silvered Chain Leggings | Rare, 30, 25 | 8 defense, 8 spell damage and healing, 11 Stamina | 20.3 / 16.5 (123 %) | 155 |
| 250526 Acolyte's Silvered Chain Leggings | Rare, 30, 25 | 8 Intellect, 8 one school’s spell damage, 25 healing, 7 Stamina | 19.5 / 16.5 (118 %) | 155 |
| 250527 Crusader's Silvered Chain Leggings | Rare, 30, 25 | 13 spell damage and healing, 8 Stamina, 7 Strength | 17.3 / 16.5 (105 %) | 155 |
| 250604 Iron Fists | Uncommon, 31, 26 | 5 Agility | 5.0 / 4.5 (111 %) | 155 |
| 250533 Hard Gold Cuirass | Uncommon, 34, 29 | 6 spell damage and healing, 11 Strength | 12.9 / 13.2 (97 %) | 170 |
| 250534 Hard Gold Boots | Uncommon, 35, 30 | 7 spell damage and healing, 7 Strength | 9.8 / 10.4 (94 %) | 175 |
| 250556 Officer's Belt | Rare, 35, 30 | 6 Agility, 7 Stamina, 10 Strength | 16.1 / 14.7 (110 %) | 155 |
| 250557 Sentinel's Belt | Rare, 35, 30 | 7 defense, 10 Stamina, 6 Strength | 18.5 / 14.7 (126 %) | 155 |
| 250558 Warder's Belt | Rare, 35, 30 | 7 defense, 7 spell damage and healing, 10 Stamina | 18.0 / 14.7 (123 %) | 155 |
| 250559 Prefect's Belt | Rare, 35, 30 | 7 Intellect, 7 one school’s spell damage, 22 healing, 6 Stamina | 17.0 / 14.7 (116 %) | 155 |
| 250560 Justicar's Belt | Rare, 35, 30 | 12 spell damage and healing, 7 Stamina, 6 Strength | 15.4 / 14.7 (105 %) | 155 |
| 277040 Cloudy Skyforged Helm | Uncommon, 35, 30 | 9 Strength, 9 Stamina | 14.3 / 14.4 (99 %) | 185 |
| 277041 Cloudy Skyforged Pauldrons | Uncommon, 35, 30 | 7 Agility, 7 Stamina | 11.1 / 10.7 (104 %) | 185 |
| 277048 Azure Skyforged Helm | Uncommon, 35, 30 | 9 Strength, 9 Stamina | 14.3 / 14.4 (99 %) | 185 |
| 277049 Azure Skyforged Pauldrons | Uncommon, 35, 30 | 7 Agility, 7 Stamina | 11.1 / 10.7 (104 %) | 185 |
| 250535 Hard Gold Bracers | Uncommon, 37, 32 | 6 spell damage and healing, 6 Strength | 8.4 / 8.4 (100 %) | 185 |
| 250605 Steel Spear | Uncommon, 37, 32 | 13 Agility, 10 attack power | 14.9 / 14.1 (106 %) | 185 |
| 250536 Hard Gold Leggings | Uncommon, 38, 33 | 12 spell damage and healing, 10 Strength | 15.1 / 15.3 (99 %) | 190 |
| 250606 Iron Morningstar | Uncommon, 38, 33 | 5 spell damage and healing, 4 Strength | 6.2 / 5.9 (105 %) | 190 |
| 285280 Mithril Blacksmith Hammer | Uncommon, 39, 34 | 5 Strength; Use or proc: Concussed | — | 200 |
| 213376 Low-Background Truesilver Plates | Rare, 40, 0 | — | — | 200 |
| 250537 Hard Gold Coif | Uncommon, 40, 35 | 7 spell damage and healing, 14 Strength | 16.1 / 17.1 (94 %) | 195 |
| 250538 Hard Gold Gauntlet | Uncommon, 40, 35 | 9 spell damage and healing, 8 Strength | 11.7 / 12.5 (94 %) | 200 |
| 250539 Hard Gold Pauldrons | Uncommon, 40, 35 | 5 spell damage and healing, 11 Strength | 12.4 / 12.7 (98 %) | 200 |
| 250566 Officer's Gauntlet | Rare, 40, 35 | 7 Agility, 9 Stamina, 10 Strength | 18.1 / 17.2 (106 %) | 200 |
| 250567 Sentinel's Gauntlet | Rare, 40, 35 | 7 defense, 10 Stamina, 9 Strength | 20.3 / 17.2 (118 %) | 200 |
| 250568 Warder's Gauntlet | Rare, 40, 35 | 7 defense, 11 spell damage and healing, 10 Stamina | 19.8 / 17.2 (116 %) | 200 |
| 250569 Prefect's Gauntlet | Rare, 40, 35 | 7 Intellect, 7 one school’s spell damage, 21 healing, 9 Stamina | 18.6 / 17.2 (109 %) | 200 |
| 250570 Justicar's Gauntlet | Rare, 40, 35 | 11 spell damage and healing, 9 Stamina, 7 Strength | 16.9 / 17.2 (98 %) | 200 |
| 217273 Golden Scale Gauntlets | Uncommon, 41, 36 | 11 Strength, 5 spell damage and healing | 12.4 / 12.8 (97 %) | 225 |
| 250607 Mithril Shortsword | Uncommon, 41, 36 | 14 attack power | 6.9 / 6.4 (106 %) | 200 |
| 250608 Mithril Warhammer | Uncommon, 43, 38 | 14 Agility, 9 Strength | 18.5 / 17.0 (109 %) | 210 |
| 250540 Shining Mithril Breastplate | Uncommon, 45, 40 | 14 spell damage and healing, 14 Strength | 19.6 / 18.8 (104 %) | 215 |
| 250541 Shining Mithril Pauldrons | Uncommon, 45, 40 | 11 spell damage and healing, 10 Strength | 14.5 / 14.6 (99 %) | 215 |
| 250542 Shining Mithril Boots | Uncommon, 45, 40 | 12 spell damage and healing, 9 Strength | 14.3 / 14.3 (100 %) | 220 |
| 250546 Officer's Boots | Rare, 45, 40 | 7 Agility, 9 Stamina, 13 Strength | 20.4 / 19.3 (106 %) | 205 |
| 250547 Sentinel's Boots | Rare, 45, 40 | 9 defense, 13 Stamina, 7 Strength | 23.4 / 19.3 (121 %) | 205 |
| 250548 Warder's Boots | Rare, 45, 40 | 9 defense, 9 spell damage and healing, 13 Stamina | 23.3 / 19.3 (121 %) | 205 |
| 250549 Prefect's Boots | Rare, 45, 40 | 9 Intellect, 9 one school’s spell damage, 28 healing, 7 Stamina | 21.3 / 19.3 (111 %) | 205 |
| 250550 Justicar's Boots | Rare, 45, 40 | 15 spell damage and healing, 9 Stamina, 7 Strength | 19.1 / 19.3 (99 %) | 205 |
| 250609 Mithril Claws | Uncommon, 45, 40 | 5 Agility, 6 Strength | 8.7 / 7.2 (121 %) | 215 |
| 250610 Mithril Claymore | Uncommon, 45, 40 | 15 Stamina, 9 Strength | 19.3 / 18.0 (108 %) | 215 |
| 250576 Officer's Pauldrons | Rare, 47, 42 | 8 Agility, 10 Stamina, 13 Strength | 21.7 / 20.7 (105 %) | 230 |
| 250577 Sentinel's Pauldrons | Rare, 47, 42 | 10 defense, 13 Stamina, 8 Strength | 25.1 / 20.7 (121 %) | 230 |
| 250578 Warder's Pauldrons | Rare, 47, 42 | 10 defense, 9 spell damage and healing, 13 Stamina | 24.4 / 20.7 (118 %) | 230 |
| 250579 Prefect's Pauldrons | Rare, 47, 42 | 10 Intellect, 10 one school’s spell damage, 29 healing, 8 Stamina | 23.2 / 20.7 (112 %) | 230 |
| 250580 Justicar's Pauldrons | Rare, 47, 42 | 16 spell damage and healing, 10 Stamina, 8 Strength | 21.0 / 20.7 (101 %) | 230 |
| 250611 Mithril Stiletto | Uncommon, 47, 42 | 8 Agility | 8.0 / 7.6 (105 %) | 230 |
| 250543 Shining Mithril Helm | Uncommon, 48, 43 | 15 spell damage and healing, 14 Strength | 20.1 / 21.3 (94 %) | 235 |
| 250612 Charged Mithril Battleaxe | Uncommon, 48, 43 | 15 spell damage and healing, 14 Strength | 20.1 / 19.4 (104 %) | 235 |
| 250544 Shining Mithril Pants | Uncommon, 49, 44 | 16 spell damage and healing, 14 Strength | 20.7 / 20.9 (99 %) | 240 |
| 250545 Shining Mithril Gauntlet | Uncommon, 49, 44 | 9 spell damage and healing, 12 Strength | 15.2 / 15.9 (95 %) | 240 |
| 250581 Officer's Wristguards | Rare, 50, 45 | 6 Agility, 8 Stamina, 11 Strength | 17.6 / 16.1 (109 %) | 250 |
| 250582 Sentinel's Wristguards | Rare, 50, 45 | 8 defense, 11 Stamina, 6 Strength | 20.3 / 16.1 (126 %) | 250 |
| 250583 Warder's Wristguards | Rare, 50, 45 | 8 defense, 7 spell damage and healing, 11 Stamina | 19.9 / 16.1 (124 %) | 250 |
| 250584 Prefect's Wristguards | Rare, 50, 45 | 8 Intellect, 8 one school’s spell damage, 23 healing, 6 Stamina | 18.3 / 16.1 (114 %) | 250 |
| 250585 Justicar's Wristguards | Rare, 50, 45 | 12 spell damage and healing, 8 Stamina, 6 Strength | 16.1 / 16.1 (100 %) | 250 |
| 250561 Officer's Sabatons | Rare, 52, 47 | 9 Agility, 12 Stamina, 13 Strength | 23.7 / 22.5 (105 %) | 260 |
| 250562 Sentinel's Sabatons | Rare, 52, 47 | 9 defense, 13 Stamina, 12 Strength | 26.5 / 22.5 (118 %) | 260 |
| 250563 Warder's Sabatons | Rare, 52, 47 | 9 defense, 14 spell damage and healing, 13 Stamina | 25.5 / 22.5 (114 %) | 260 |
| 250564 Prefect's Sabatons | Rare, 52, 47 | 9 Intellect, 9 one school’s spell damage, 27 healing, 12 Stamina | 24.3 / 22.5 (108 %) | 260 |
| 250565 Justicar's Sabatons | Rare, 52, 47 | 15 spell damage and healing, 12 Stamina, 9 Strength | 22.5 / 22.5 (100 %) | 260 |
| 250586 Blessed Plate Pauldrons | Uncommon, 52, 47 | 15 spell damage and healing, 7 Stamina, 5 Strength | 16.6 / 17.4 (95 %) | 260 |
| 250587 Blessed Plate Boots | Uncommon, 52, 47 | 6 spell damage and healing, 7 Stamina, 13 Strength | 17.8 / 17.0 (105 %) | 260 |
| 250588 Blessed Plate Gauntlet | Uncommon, 54, 49 | 8 spell damage and healing, 13 Stamina, 5 Strength | 17.4 / 17.9 (98 %) | 265 |
| 285281 Arcanite Blacksmith Hammer | Rare, 54, 49 | 4 Spirit, 6 Strength; Use or proc: Cracked Skull | — | 275 |
| 250551 Officer's Gloves | Rare, 55, 50 | 9 Agility, 11 Stamina, 16 Strength | 25.3 / 24.0 (105 %) | 255 |
| 250552 Sentinel's Gloves | Rare, 55, 50 | 11 defense, 16 Stamina, 9 Strength | 29.0 / 24.0 (121 %) | 255 |
| 250553 Warder's Gloves | Rare, 55, 50 | 11 defense, 11 spell damage and healing, 16 Stamina | 28.6 / 24.0 (119 %) | 255 |
| 250554 Prefect's Gloves | Rare, 55, 50 | 11 Intellect, 12 one school’s spell damage, 35 healing, 9 Stamina | 26.9 / 24.0 (112 %) | 255 |
| 250555 Justicar's Gloves | Rare, 55, 50 | 19 spell damage and healing, 11 Stamina, 9 Strength | 24.0 / 24.0 (100 %) | 255 |
| 250571 Officer's Waistguard | Rare, 55, 50 | 10 Agility, 13 Stamina, 14 Strength | 25.8 / 23.7 (109 %) | 270 |
| 250572 Sentinel's Waistguard | Rare, 55, 50 | 10 defense, 14 Stamina, 13 Strength | 28.9 / 23.7 (122 %) | 270 |
| 250573 Warder's Waistguard | Rare, 55, 50 | 10 defense, 15 spell damage and healing, 14 Stamina | 27.8 / 23.7 (117 %) | 270 |
| 250574 Prefect's Waistguard | Rare, 55, 50 | 10 Intellect, 10 one school’s spell damage, 30 healing, 13 Stamina | 26.7 / 23.7 (113 %) | 270 |
| 250575 Justicar's Waistguard | Rare, 55, 50 | 16 spell damage and healing, 13 Stamina, 10 Strength | 24.4 / 23.7 (103 %) | 270 |
| 250613 Thorium Greatmace | Rare, 55, 50 | 23 spell damage and healing, 21 Strength | 30.5 / 30.0 (102 %) | 270 |
| 250614 Thorium Cestus | Rare, 55, 50 | 16 attack power, 9 Stamina | 13.4 / 12.1 (111 %) | 270 |
| 250589 Imperial Plate Gauntlets | Uncommon, 57, 52 | 12 Stamina, 12 Strength | 19.0 / 19.0 (100 %) | 275 |
| 250590 Blessed Plate Bracers | Uncommon, 57, 52 | 4 spell damage and healing, 6 Stamina, 11 Strength | 14.7 / 14.1 (104 %) | 275 |
| 250615 Thorium Poleaxe | Rare, 57, 52 | 25 Agility, 10 Stamina, 13 Strength | 34.6 / 31.1 (111 %) | 280 |
| 275622 Goregasher Grips | Rare, 58, 53 | 19 Stamina, 11 Strength, 5 resistance | 25.7 / 25.4 (101 %) | 290 |
| 275623 Goregasher Support | Rare, 58, 53 | 17 Stamina, 14 Strength, 6 resistance | 26.5 / 25.1 (106 %) | 295 |
| 275624 Goregasher Stompers | Rare, 58, 53 | 8 Stamina, 38 attack power, 8 resistance | 25.0 / 25.2 (99 %) | 295 |
| 275625 Clutchlord's Grips | Rare, 58, 53 | 20 Stamina, 7 resistance, 7 Strength | 25.1 / 25.4 (99 %) | 290 |
| 275626 Clutchlord's Support | Rare, 58, 53 | 21 Stamina, 7 Strength, 4 resistance | 24.7 / 25.1 (98 %) | 295 |
| 275627 Clutchlord's Stompers | Rare, 58, 53 | 10 Stamina, 19 Strength, 4 resistance | 24.6 / 25.2 (98 %) | 295 |
| 250591 Blessed Plate Leggings | Uncommon, 59, 54 | 13 spell damage and healing, 20 Stamina, 7 Strength | 26.8 / 26.0 (103 %) | 290 |
| 250592 Blessed Plate Belt | Uncommon, 59, 54 | 9 spell damage and healing, 5 Stamina, 15 Strength | 19.6 / 19.6 (100 %) | 290 |
| 250616 Bold Dirk | Uncommon, 59, 54 | 7 Agility, 16 attack power | 11.8 / 9.9 (119 %) | 290 |
| 250593 Blessed Plate Helm | Uncommon, 60, 55 | 23 spell damage and healing, 7 Stamina, 11 Strength | 25.3 / 27.7 (91 %) | 295 |
| 279955 Master Forge | Common, 60, 0 | Use or proc: Master Forge | — | 300 |
| 250594 Blessed Plate Chest | Uncommon, 61, 56 | 13 spell damage and healing, 8 Stamina, 20 Strength | 27.3 / 26.8 (102 %) | 300 |
| 250598 Champion's Legplates | Epic, 61, 56 | 1 melee critical %, 38 spell damage and healing, 18 Strength | 42.3 / 45.8 (92 %) | 320 |
| 250599 Stalwart Helm | Epic, 61, 56 | 2 melee hit %, 38 spell damage and healing, 12 Strength | 42.0 / 48.0 (88 %) | 320 |
| 250600 Martyr's Legplates | Epic, 61, 56 | 14 Intellect, 25 one school’s spell damage, 73 healing, 18 Spirit | 50.5 / 45.8 (110 %) | 320 |
| 250601 Breastplate of Salvation | Epic, 61, 56 | 14 Intellect, 14 one school’s spell damage, 40 healing, 33 Spirit | 48.3 / 45.6 (106 %) | 320 |
| 250595 Enriched Thorium Breastplate | Rare, 62, 57 | 9 defense, 14 spell damage and healing, 25 Stamina | 35.0 / 35.5 (99 %) | 320 |
| 250596 Enriched Thorium Leggings | Rare, 63, 58 | 9 defense, 14 spell damage and healing, 26 Stamina | 35.9 / 36.3 (99 %) | 320 |
| 250597 Enriched Thorium Helm | Rare, 63, 58 | 8 defense, 23 spell damage and healing, 21 Stamina | 35.2 / 38.0 (92 %) | 320 |
| 250617 Stormcarver | Rare, 63, 58 | 32 spell damage and healing, 11 Stamina, 15 Strength | 35.6 / 34.6 (103 %) | 320 |
| 250618 Bagh Nakh | Rare, 63, 58 | 13 Agility, 5 Stamina | 15.0 / 13.9 (108 %) | 320 |
| 250619 Legionite Glaive | Rare, 63, 58 | 16 Agility, 54 attack power, 1 melee hit % | 37.3 / 34.6 (108 %) | 320 |
| 279259 Ironwood Blade | Epic, 65, 60 | 8 Strength, 12 Stamina, 1 melee hit % | 20.3 / 18.6 (109 %) | 310 |
| 279260 Forest Defender's Axe | Epic, 65, 60 | 27 Stamina, 18 Strength, 28 spell damage and healing | 46.1 / 46.2 (100 %) | 310 |
| 279261 Greenhammer | Epic, 65, 60 | 8 Agility, 12 Stamina, 1 melee hit % | 20.3 / 18.6 (109 %) | 310 |
| 279262 Evergreen Shield | Epic, 65, 60 | 16 Stamina, 1 melee critical %, 23 healing, 8 one school’s spell damage | 28.4 / 26.7 (107 %) | 310 |
| 279263 Depleted Thorium Sabatons | Epic, 65, 60 | 14 Strength, 21 Stamina, 21 one school’s spell damage | 34.4 / 36.8 (94 %) | 310 |
| 279264 Heavy Thorium Gauntlets | Epic, 65, 60 | 14 Stamina, 21 Strength, 12 defense | 36.7 / 37.1 (99 %) | 310 |
| 279265 Azerothium Legplates | Epic, 65, 60 | 24 Strength, 18 Agility, 27 Stamina | 48.2 / 48.6 (99 %) | 310 |

## Leatherworking

235 items in both; 128 changed in some way (1 with a higher item level, 14 a better quality). Of the 183 with stats: 32 stronger in Forever, 37 weaker, 114 within 5 %; median change 100 %. 247 new items.

| Change | Item | 1.14.2 | Forever |
|---|---|---|---|
| 229 % | 8346 Gauntlets of the Sea | Rare, item level 46, requires 41: 7 Agility; Use or proc: Heal (value 7.0) | Rare, item level 46, requires 41: 7 Agility, 18 one school’s spell damage, 6 healing; Use or proc: Heal (value 16.1) |
| 214 % | 17721 Gloves of the Greatfather | Uncommon, item level 38, requires 33: 18 healing, 10 one school’s spell damage (value 11.1) | Uncommon, item level 38, requires 33: 24 one school’s spell damage, 26 healing, 10 one school’s spell damage (value 23.8) |
| 140 % | 7386 Green Whelp Bracers | Uncommon, item level 38, requires 33: 8 Spirit (value 8.0) | Uncommon, item level 38, requires 33: 8 Intellect, 9 one school’s spell damage (value 11.2) |
| 136 % | 8367 Dragonscale Breastplate | Rare, item level 51, requires 46: 10 Stamina, 13 resistance, 13 resistance, 12 resistance; Use or proc: Elemental Protection (value 29.6) | Rare, item level 51, requires 46: 10 Stamina, 13 resistance, 13 resistance, 13 resistance, 13 resistance, 13 resistance; Use or proc: Elemental Protection (value 40.3) |
| 135 % | 20296 Green Dragonscale Gauntlets | Rare, item level 56, requires 51: 18 Spirit, 5 Stamina, 9 resistance (value 23.4) | Rare, item level 56, requires 51: 18 resistance, 5 Stamina, 40 healing, 14 one school’s spell damage (value 31.7) |
| 127 % | 15064 Warbear Harness | Rare, item level 55, requires 50: 27 Stamina, 11 Strength (value 31.5) | Rare, item level 55, requires 50: 27 Stamina, 11 Strength, 18 Agility (value 40.0) |
| 127 % | 15053 Volcanic Breastplate | Uncommon, item level 57, requires 52: 20 resistance (value 19.4) | Uncommon, item level 57, requires 52: 20 resistance, 11 Stamina (value 24.6) |
| 127 % | 19044 Might of the Timbermaw | Rare, item level 58, requires 53: 21 Strength, 9 Stamina (value 24.8) | Rare, item level 58, requires 53: 21 Strength, 9 Stamina, 14 Agility (value 31.4) |
| 125 % | 15065 Warbear Woolies | Rare, item level 57, requires 52: 28 Strength, 12 Stamina (value 33.0) | Rare, item level 57, requires 52: 28 Strength, 12 Stamina, 18 Agility (value 41.4) |
| 123 % | 15054 Volcanic Leggings | Uncommon, item level 54, requires 49: 20 resistance (value 19.4) | Uncommon, item level 54, requires 49: 20 resistance, 10 Stamina (value 24.0) |
| 123 % | 15074 Chimeric Gloves | Uncommon, item level 53, requires 48: 12 resistance, 11 resistance (value 17.8) | Uncommon, item level 53, requires 48: 8 Stamina, 12 resistance, 12 resistance (value 21.9) |
| 123 % | 8349 Feathered Breastplate | Rare, item level 50, requires 45: 24 Spirit, 10 Intellect (value 28.1) | Rare, item level 50, requires 45: 24 Spirit, 10 Intellect, 19 spell damage and healing (value 34.6) |
| 123 % | 15047 Red Dragonscale Breastplate | Rare, item level 61, requires 56: 12 resistance, 66 healing (value 31.6) | Rare, item level 61, requires 56: 20 resistance, 57 healing, 19 one school’s spell damage (value 38.9) |
| 121 % | 15071 Frostsaber Boots | Uncommon, item level 55, requires 50: 12 resistance, 12 resistance (value 18.5) | Uncommon, item level 55, requires 50: 9 Stamina, 12 resistance, 12 resistance (value 22.5) |
| 121 % | 15073 Chimeric Boots | Uncommon, item level 55, requires 50: 12 resistance, 12 resistance (value 18.5) | Uncommon, item level 55, requires 50: 9 Stamina, 12 resistance, 12 resistance (value 22.5) |
| 121 % | 15067 Ironfeather Shoulders | Rare, item level 54, requires 49: 20 Intellect, 8 Spirit (value 23.2) | Rare, item level 54, requires 49: 20 Intellect, 8 Spirit, 15 spell damage and healing (value 28.2) |
| 121 % | 15066 Ironfeather Breastplate | Rare, item level 58, requires 53: 28 Spirit, 12 Intellect (value 33.0) | Rare, item level 58, requires 53: 28 Spirit, 12 Intellect, 21 spell damage and healing (value 39.9) |
| 121 % | 15069 Frostsaber Leggings | Uncommon, item level 57, requires 52: 17 resistance, 16 resistance (value 25.5) | Uncommon, item level 57, requires 52: 17 resistance, 17 resistance, 11 Stamina (value 30.8) |
| 121 % | 15075 Chimeric Vest | Uncommon, item level 58, requires 53: 17 resistance, 16 resistance (value 25.5) | Uncommon, item level 58, requires 53: 17 resistance, 17 resistance, 11 Stamina (value 30.8) |
| 121 % | 19052 Dawn Treaders | Rare, item level 58, requires 53: 18 Stamina, 1 dodge % (value 24.0) | Rare, item level 58, requires 53: 18 Stamina, 9 Strength, 14 Agility (value 28.9) |
| 119 % | 15072 Chimeric Leggings | Uncommon, item level 56, requires 51: 16 resistance, 16 resistance (value 24.7) | Uncommon, item level 56, requires 51: 11 Stamina, 16 resistance, 16 resistance (value 29.4) |
| 118 % | 15068 Frostsaber Tunic | Uncommon, item level 62, requires 57: 18 resistance, 18 resistance (value 27.8) | Uncommon, item level 62, requires 57: 18 resistance, 18 resistance, 12 Stamina (value 32.8) |
| 118 % | 15070 Frostsaber Gloves | Uncommon, item level 59, requires 54: 13 resistance, 12 resistance (value 19.3) | Uncommon, item level 59, requires 54: 13 resistance, 13 resistance, 7 Stamina (value 22.7) |
| 118 % | 18504 Girdle of Insight | Rare, item level 62, requires 57: 23 Intellect, 9 Stamina (value 26.6) | Rare, item level 62, requires 57: 23 Intellect, 9 Stamina, 15 spell damage and healing (value 31.3) |
| 116 % | 18509 Chromatic Cloak | Epic, item level 62, requires 57: 10 Stamina, 9 resistance, 9 resistance, 1 spell critical % (value 25.3) | Epic, item level 62, requires 57: 10 Stamina, 12 resistance, 12 resistance, 1 melee critical % (value 29.2) |
| 115 % | 19049 Timbermaw Brawlers | Rare, item level 64, requires 59: 23 Strength, 10 Stamina (value 27.2) | Rare, item level 61, requires 56: 21 Strength, 9 Stamina, 14 Agility (value 31.4) |
| 115 % | 18510 Hide of the Wild | Epic, item level 62, requires 57: 10 Intellect, 8 Stamina, 42 healing (value 24.9) | Epic, item level 62, requires 57: 10 Intellect, 8 Stamina, 42 healing, 14 one school’s spell damage (value 28.6) |
| 115 % | 19162 Corehound Belt | Epic, item level 70, requires 60: 16 Intellect, 12 resistance, 62 healing (value 37.5) | Epic, item level 70, requires 60: 16 Intellect, 12 resistance, 62 healing, 21 one school’s spell damage (value 43.1) |
| 113 % | 19058 Golden Mantle of the Dawn | Rare, item level 64, requires 59: 22 Stamina, 1 dodge % (value 27.5) | Rare, item level 61, requires 56: 20 Stamina, 13 Strength, 11 Agility (value 31.0) |
| 110 % | 15061 Living Shoulders | Rare, item level 54, requires 49: 13 Spirit, 8 Stamina, 3 resistance, 31 healing (value 24.2) | Rare, item level 54, requires 49: 13 Spirit, 8 Stamina, 3 resistance, 31 healing, 10 one school’s spell damage (value 26.5) |
| 107 % | 8197 Nightscape Boots | Uncommon, item level 47, requires 42: 12 Agility, 5 stealth (value 15.8) | Uncommon, item level 47, requires 42: 12 Agility, 6 stealth (value 16.9) |
| 105 % | 15060 Living Leggings | Rare, item level 57, requires 52: 25 Spirit, 8 Stamina, 5 resistance, 26 healing (value 33.3) | Rare, item level 57, requires 52: 25 Spirit, 8 Stamina, 5 resistance, 26 healing, 9 one school’s spell damage (value 35.0) |
| 105 % | 15059 Living Breastplate | Rare, item level 60, requires 55: 25 Spirit, 10 Stamina, 5 resistance, 26 healing (value 34.4) | Rare, item level 60, requires 55: 25 Spirit, 10 Stamina, 5 resistance, 26 healing, 9 one school’s spell damage (value 36.0) |
| 100 % | 4253 Toughened Leather Gloves | Rare, item level 27, requires 22: 6 Agility, 6 Spirit, 3 Stamina (value 10.6) | Rare, item level 27, requires 22: 6 Agility, 6 Strength, 3 Stamina (value 10.6) |
| 100 % | 4254 Barbaric Gloves | Uncommon, item level 30, requires 25: 5 Stamina, 4 Spirit, 4 Agility (value 9.0) | Uncommon, item level 30, requires 25: 5 Stamina, 4 Strength, 4 Agility (value 9.0) |
| 100 % | 4255 Green Leather Armor | Uncommon, item level 31, requires 26: 8 Agility, 8 Spirit (value 12.7) | Uncommon, item level 31, requires 26: 8 Agility, 8 Intellect (value 12.7) |
| 100 % | 4257 Green Leather Belt | Uncommon, item level 32, requires 27: 6 Agility, 6 Spirit (value 9.5) | Uncommon, item level 32, requires 27: 6 Agility, 6 Intellect (value 9.5) |
| 100 % | 4259 Green Leather Bracers | Uncommon, item level 36, requires 31: 6 Agility, 5 Spirit (value 8.7) | Uncommon, item level 36, requires 31: 6 Agility, 5 Intellect (value 8.7) |
| 100 % | 5963 Barbaric Leggings | Uncommon, item level 34, requires 29: 7 Stamina, 7 Spirit, 7 Agility (value 14.6) | Uncommon, item level 34, requires 29: 7 Stamina, 7 Strength, 7 Agility (value 14.6) |
| 100 % | 5964 Barbaric Shoulders | Uncommon, item level 35, requires 30: 6 Stamina, 5 Spirit, 5 Agility (value 11.1) | Uncommon, item level 35, requires 30: 6 Stamina, 5 Strength, 5 Agility (value 11.1) |
| 100 % | 6468 Deviate Scale Belt | Rare, item level 23, requires 18: 6 Stamina, 5 Agility, 3 Spirit (value 9.9) | Rare, item level 23, requires 18: 6 Stamina, 5 Agility, 3 Strength (value 9.9) |
| 100 % | 7282 Light Leather Pants | Uncommon, item level 19, requires 14: 5 Agility, 3 Spirit (value 6.4) | Uncommon, item level 19, requires 14: 5 Agility, 3 Stamina (value 6.4) |
| 100 % | 7285 Nimble Leather Gloves | Uncommon, item level 24, requires 19: 4 Agility, 4 Spirit (value 6.3) | Uncommon, item level 24, requires 19: 4 Agility, 4 Stamina (value 6.3) |
| 100 % | 7375 Green Whelp Armor | Uncommon, item level 35, requires 30: 11 Spirit (value 11.0) | Uncommon, item level 35, requires 30: 11 Stamina (value 11.0) |
| 100 % | 7391 Swift Boots | Uncommon, item level 40, requires 35: 10 Spirit; Use or proc: Running Speed (value 10.0) | Uncommon, item level 40, requires 35: 10 Stamina; Use or proc: Running Speed (value 10.0) |
| 100 % | 8203 Tough Scorpid Breastplate | Uncommon, item level 44, requires 39: 15 Agility, 7 Spirit (value 18.0) | Uncommon, item level 44, requires 39: 15 Agility, 7 Intellect (value 18.0) |
| 100 % | 8204 Tough Scorpid Gloves | Uncommon, item level 45, requires 40: 10 Agility, 9 Spirit (value 15.1) | Uncommon, item level 45, requires 40: 10 Agility, 9 Intellect (value 15.1) |
| 100 % | 8205 Tough Scorpid Bracers | Uncommon, item level 44, requires 39: 7 Agility, 6 Spirit (value 10.3) | Uncommon, item level 44, requires 39: 7 Agility, 6 Intellect (value 10.3) |
| 100 % | 8206 Tough Scorpid Leggings | Uncommon, item level 49, requires 44: 17 Agility, 10 Spirit (value 21.8) | Uncommon, item level 49, requires 44: 17 Agility, 10 Intellect (value 21.8) |
| 100 % | 8207 Tough Scorpid Shoulders | Uncommon, item level 48, requires 43: 10 Agility, 10 Spirit (value 15.9) | Uncommon, item level 48, requires 43: 10 Agility, 10 Intellect (value 15.9) |
| 100 % | 8208 Tough Scorpid Helm | Uncommon, item level 50, requires 45: 14 Agility, 14 Spirit (value 22.2) | Uncommon, item level 50, requires 45: 14 Agility, 14 Intellect (value 22.2) |
| 100 % | 8209 Tough Scorpid Boots | Uncommon, item level 47, requires 42: 12 Agility, 7 Spirit (value 15.3) | Uncommon, item level 47, requires 42: 12 Agility, 7 Intellect (value 15.3) |
| 100 % | 8345 Wolfshead Helm | Rare, item level 45, requires 40: 10 Spirit (value 10.0) | Rare, item level 45, requires 40: 10 Spirit, 50 class spell bonus (value 10.0) |
| 100 % | 8347 Dragonscale Gauntlets | Rare, item level 45, requires 40: 6 Spirit, 7 Stamina, 1 melee critical % (value 18.5) | Rare, item level 45, requires 40: 6 Agility, 7 Stamina, 1 melee critical % (value 18.5) |
| 100 % | 15076 Heavy Scorpid Vest | Uncommon, item level 53, requires 48: 16 Stamina, 15 Spirit (value 24.6) | Uncommon, item level 53, requires 48: 16 Stamina, 15 Agility (value 24.6) |
| 100 % | 15077 Heavy Scorpid Bracers | Uncommon, item level 51, requires 46: 8 Stamina, 8 Spirit (value 12.7) | Uncommon, item level 51, requires 46: 8 Stamina, 8 Agility (value 12.7) |
| 100 % | 15078 Heavy Scorpid Gauntlet | Uncommon, item level 55, requires 50: 12 Stamina, 12 Spirit (value 19.0) | Uncommon, item level 55, requires 50: 12 Stamina, 12 Agility (value 19.0) |
| 100 % | 15079 Heavy Scorpid Leggings | Uncommon, item level 57, requires 52: 20 Spirit, 12 Stamina (value 25.8) | Uncommon, item level 57, requires 52: 20 Agility, 12 Stamina (value 25.8) |
| 100 % | 15080 Heavy Scorpid Helm | Uncommon, item level 59, requires 54: 20 Stamina, 13 Spirit (value 26.5) | Uncommon, item level 59, requires 54: 20 Stamina, 13 Agility (value 26.5) |
| 100 % | 15081 Heavy Scorpid Shoulders | Uncommon, item level 61, requires 56: 14 Stamina, 13 Spirit (value 21.4) | Uncommon, item level 61, requires 56: 14 Stamina, 13 Agility (value 21.4) |
| 100 % | 15082 Heavy Scorpid Belt | Uncommon, item level 56, requires 51: 12 Stamina, 12 Spirit (value 19.0) | Uncommon, item level 56, requires 51: 12 Stamina, 12 Agility (value 19.0) |
| 100 % | 15141 Onyxia Scale Breastplate | Epic, item level 62, requires 57: 15 Strength, 15 Agility, 15 Stamina, 14 Intellect, 14 Spirit, 9 resistance, 1 melee critical % (value 49.8) | Epic, item level 62, requires 57: 15 Strength, 15 Agility, 15 Stamina, 14 Intellect, 14 Spirit, 150 bonus armor, 9 resistance, 1 melee critical % (value 49.8) |
| 100 % | 18948 Barbaric Bracers | Rare, item level 32, requires 27: 6 Stamina, 4 Spirit, 4 Agility (value 9.8) | Rare, item level 32, requires 27: 6 Stamina, 4 Strength, 4 Agility (value 9.8) |
| 100 % | 19149 Lava Belt | Epic, item level 66, requires 60: 15 Stamina, 26 resistance (value 32.5) | Epic, item level 66, requires 60: 15 Stamina, 110 bonus armor, 26 resistance (value 32.5) |
| 99 % | 20479 Spitfire Breastplate | Rare, item level 62, requires 57: 16 Agility, 16 Intellect, 6 mana per 5 sec, 15 spell damage and healing, 15 healing (value 37.3) | Rare, item level 62, requires 57: 16 Agility, 16 Intellect, 15 Spirit, 15 spell damage and healing (value 36.9) |
| 98 % | 20480 Spitfire Gauntlets | Rare, item level 62, requires 57: 12 Agility, 12 Intellect, 5 mana per 5 sec, 11 spell damage and healing, 11 healing (value 28.5) | Rare, item level 62, requires 57: 12 Agility, 12 Intellect, 12 Spirit, 11 spell damage and healing (value 28.0) |
| 97 % | 15049 Blue Dragonscale Shoulders | Rare, item level 59, requires 54: 21 Intellect, 6 Spirit, 6 resistance (value 25.0) | Rare, item level 59, requires 54: 21 Intellect, 6 spell damage and healing, 6 resistance (value 24.3) |
| 97 % | 15048 Blue Dragonscale Breastplate | Rare, item level 57, requires 52: 28 Intellect, 8 Spirit, 8 resistance (value 33.3) | Rare, item level 57, requires 52: 28 Intellect, 8 spell damage and healing, 8 resistance (value 32.4) |
| 97 % | 20481 Spitfire Bracers | Rare, item level 62, requires 57: 9 Agility, 9 Intellect, 4 mana per 5 sec, 8 spell damage and healing, 8 healing (value 21.6) | Rare, item level 62, requires 57: 9 Agility, 9 Intellect, 9 Spirit, 8 spell damage and healing (value 20.9) |
| 93 % | 8216 Big Voodoo Cloak | Uncommon, item level 48, requires 43: 9 Intellect, 5 Spirit (value 11.3) | Uncommon, item level 48, requires 43: 9 Intellect, 5 spell damage and healing (value 10.6) |
| 93 % | 8187 Turtle Scale Gloves | Uncommon, item level 41, requires 36: 7 Stamina, 6 Spirit, 6 Intellect (value 13.2) | Uncommon, item level 41, requires 36: 7 Stamina, 6 spell damage and healing, 6 Intellect (value 12.2) |
| 92 % | 15094 Runic Leather Headband | Uncommon, item level 58, requires 53: 20 Intellect, 12 Spirit (value 25.8) | Uncommon, item level 58, requires 53: 20 Intellect, 12 spell damage and healing (value 23.9) |
| 92 % | 20575 Black Whelp Tunic | Uncommon, item level 20, requires 15: 5 Strength, 3 Agility (value 6.4) | Uncommon, item level 20, requires 15: 5 Intellect, 3 spell damage and healing (value 6.0) |
| 92 % | 15090 Runic Leather Armor | Uncommon, item level 62, requires 57: 21 Intellect, 13 Spirit (value 27.4) | Uncommon, item level 62, requires 57: 21 Intellect, 13 spell damage and healing (value 25.2) |
| 92 % | 8189 Turtle Scale Breastplate | Uncommon, item level 42, requires 37: 9 Stamina, 9 Spirit, 9 Intellect (value 18.7) | Uncommon, item level 42, requires 37: 9 Stamina, 9 spell damage and healing, 9 Intellect (value 17.2) |
| 92 % | 8191 Turtle Scale Helm | Uncommon, item level 46, requires 41: 10 Stamina, 10 Spirit, 10 Intellect (value 20.8) | Uncommon, item level 46, requires 41: 10 Stamina, 10 spell damage and healing, 10 Intellect (value 19.2) |
| 92 % | 8200 Big Voodoo Robe | Uncommon, item level 43, requires 38: 14 Intellect, 9 Spirit (value 18.5) | Uncommon, item level 43, requires 38: 14 Intellect, 9 spell damage and healing (value 17.0) |
| 92 % | 8201 Big Voodoo Mask | Uncommon, item level 44, requires 39: 14 Intellect, 9 Spirit (value 18.5) | Uncommon, item level 44, requires 39: 14 Intellect, 9 spell damage and healing (value 17.0) |
| 92 % | 15093 Runic Leather Belt | Uncommon, item level 56, requires 51: 14 Intellect, 9 Spirit (value 18.5) | Uncommon, item level 56, requires 51: 14 Intellect, 9 spell damage and healing (value 17.0) |
| 92 % | 8185 Turtle Scale Leggings | Uncommon, item level 47, requires 42: 11 Stamina, 11 Spirit, 10 Intellect (value 22.2) | Uncommon, item level 47, requires 42: 11 Stamina, 11 spell damage and healing, 10 Intellect (value 20.4) |
| 92 % | 15096 Runic Leather Shoulders | Uncommon, item level 62, requires 57: 15 Intellect, 10 Spirit (value 20.0) | Uncommon, item level 62, requires 57: 15 Intellect, 10 spell damage and healing (value 18.4) |
| 91 % | 20295 Blue Dragonscale Leggings | Rare, item level 60, requires 55: 20 Intellect, 19 Spirit, 12 resistance (value 35.6) | Rare, item level 60, requires 55: 20 Intellect, 19 spell damage and healing, 12 resistance (value 32.3) |
| 90 % | 4251 Hillman's Shoulders | Uncommon, item level 26, requires 21: 5 Stamina, 4 Spirit (value 7.2) | Uncommon, item level 26, requires 21: 5 Stamina, 3 Spirit (value 6.4) |
| 90 % | 4247 Hillman's Leather Gloves | Uncommon, item level 29, requires 24: 6 Stamina, 5 Spirit (value 8.7) | Uncommon, item level 29, requires 24: 6 Stamina, 5 spell damage and healing (value 7.8) |
| 89 % | 4258 Guardian Belt | Uncommon, item level 34, requires 29: 7 Intellect, 6 Spirit (value 10.3) | Uncommon, item level 34, requires 29: 7 Intellect, 6 spell damage and healing (value 9.2) |
| 89 % | 4256 Guardian Armor | Uncommon, item level 35, requires 30: 10 Intellect, 9 Spirit (value 15.1) | Uncommon, item level 35, requires 30: 10 Intellect, 9 spell damage and healing (value 13.4) |
| 89 % | 8174 Comfortable Leather Hat | Uncommon, item level 40, requires 35: 11 Stamina, 10 Spirit (value 16.7) | Uncommon, item level 40, requires 35: 11 Stamina, 10 spell damage and healing (value 14.8) |
| 88 % | 4260 Guardian Leather Bracers | Uncommon, item level 39, requires 34: 6 Intellect, 6 Spirit (value 9.5) | Uncommon, item level 39, requires 34: 6 Intellect, 6 spell damage and healing (value 8.4) |
| 88 % | 2309 Embossed Leather Boots | Uncommon, item level 15, requires 10: 2 Stamina, 2 Spirit (value 3.2) | Uncommon, item level 15, requires 10: 2 Stamina, 2 spell damage and healing (value 2.8) |
| 88 % | 2312 Fine Leather Gloves | Uncommon, item level 15, requires 10: 2 Intellect, 2 Spirit (value 3.2) | Uncommon, item level 15, requires 10: 2 Intellect, 2 spell damage and healing (value 2.8) |
| 88 % | 4244 Hillman's Leather Vest | Uncommon, item level 20, requires 15: 4 Stamina, 4 Spirit (value 6.3) | Uncommon, item level 20, requires 15: 4 Stamina, 4 spell damage and healing (value 5.6) |
| 88 % | 4250 Hillman's Belt | Uncommon, item level 25, requires 20: 4 Stamina, 4 Spirit (value 6.3) | Uncommon, item level 25, requires 20: 4 Stamina, 4 spell damage and healing (value 5.6) |
| 88 % | 15092 Runic Leather Bracers | Uncommon, item level 55, requires 50: 10 Intellect, 10 Spirit (value 15.9) | Uncommon, item level 55, requires 50: 10 Intellect, 10 spell damage and healing (value 14.0) |
| 88 % | 5962 Guardian Pants | Uncommon, item level 32, requires 27: 8 Intellect, 8 Spirit (value 12.7) | Uncommon, item level 32, requires 27: 8 Intellect, 8 spell damage and healing (value 11.2) |
| 87 % | 19157 Chromatic Gauntlets | Epic, item level 70, requires 60: 5 resistance, 5 resistance, 5 resistance, 5 resistance, 44 attack power, 1 melee critical %, 1 spell critical % (value 37.9) | Epic, item level 70, requires 60: 5 resistance, 5 resistance, 5 resistance, 5 resistance, 44 attack power, 1 melee critical % (value 33.0) |
| 86 % | 5965 Guardian Cloak | Uncommon, item level 37, requires 32: 6 Spirit, 5 Intellect (value 8.7) | Uncommon, item level 37, requires 32: 6 spell damage and healing, 5 Intellect (value 7.6) |
| 85 % | 6709 Moonglow Vest | Uncommon, item level 18, requires 13: 4 Spirit, 3 Intellect (value 5.6) | Uncommon, item level 18, requires 13: 4 spell damage and healing, 3 Intellect (value 4.8) |
| 85 % | 15045 Green Dragonscale Breastplate | Rare, item level 52, requires 47: 21 Spirit, 10 Stamina, 11 resistance (value 29.8) | Rare, item level 52, requires 47: 21 one school’s spell damage, 10 healing, 10 Stamina, 11 resistance (value 25.4) |
| 84 % | 15046 Green Dragonscale Leggings | Rare, item level 54, requires 49: 22 Spirit, 10 Stamina, 11 resistance (value 30.7) | Rare, item level 54, requires 49: 22 healing, 10 Stamina, 17 one school’s spell damage, 11 resistance (value 25.9) |
| 84 % | 4242 Embossed Leather Pants | Uncommon, item level 15, requires 10: 2 Stamina, 3 Spirit (value 4.0) | Uncommon, item level 15, requires 10: 2 Stamina, 3 spell damage and healing (value 3.4) |
| 84 % | 8202 Big Voodoo Pants | Uncommon, item level 47, requires 42: 15 Spirit, 10 Intellect (value 20.0) | Uncommon, item level 47, requires 42: 15 spell damage and healing, 10 Intellect (value 16.9) |
| 84 % | 15095 Runic Leather Pants | Uncommon, item level 60, requires 55: 20 Spirit, 13 Intellect (value 26.5) | Uncommon, item level 60, requires 55: 20 spell damage and healing, 13 Intellect (value 22.3) |
| 83 % | 15091 Runic Leather Gauntlets | Uncommon, item level 54, requires 49: 14 Spirit, 8 Intellect (value 17.8) | Uncommon, item level 54, requires 49: 14 spell damage and healing, 8 Intellect (value 14.8) |
| 82 % | 4262 Gem-studded Leather Belt | Rare, item level 37, requires 32: 8 Stamina, 6 Spirit; Use or proc: Heal Self (value 11.2) | Rare, item level 37, requires 32: 8 Stamina, 6 attack power; Use or proc: Heal Self (value 9.1) |
| 81 % | 15055 Volcanic Shoulders | Uncommon, item level 61, requires 56: 18 resistance (value 17.5) | Uncommon, item level 61, requires 56: 13 resistance, 4 Stamina (value 14.1) |
| 75 % | 7283 Black Whelp Cloak | Uncommon, item level 20, requires 15: 3 Stamina (value 3.0) | Uncommon, item level 20, requires 15: 3 spell damage and healing (value 2.3) |
| — | 2303 Handstitched Leather Pants | Common, item level 10, requires 5: — (value 0.0) | Uncommon, item level 10, requires 5: 1 Agility (value 1.0) |
| — | 2304 Light Armor Kit | Common, item level 5, requires 1: Use or proc: Armor +8 (value 0.0) | Common, item level 5, requires 1: Use or proc: Armor +8, Stamina +1 (value 0.0) |
| — | 2307 Fine Leather Boots | Common, item level 18, requires 13: — (value 0.0) | Uncommon, item level 18, requires 13: 3 Agility, 2 Stamina (value 4.0) |
| — | 2310 Embossed Leather Cloak | Common, item level 13, requires 8: — (value 0.0) | Uncommon, item level 13, requires 8: 1 Agility (value 1.0) |
| — | 2311 White Leather Jerkin | Common, item level 13, requires 8: — (value 0.0) | Uncommon, item level 13, requires 8: 2 Strength, 2 spell damage and healing (value 2.8) |
| — | 2313 Medium Armor Kit | Common, item level 15, requires 5: Use or proc: Armor +16 (value 0.0) | Common, item level 15, requires 5: Use or proc: Armor +16, Stamina +2 (value 0.0) |
| — | 2315 Dark Leather Boots | Common, item level 20, requires 15: — (value 0.0) | Uncommon, item level 20, requires 15: 5 Agility (value 5.0) |
| — | 2316 Dark Leather Cloak | Common, item level 22, requires 17: — (value 0.0) | Uncommon, item level 22, requires 17: 3 Agility, 2 Strength (value 4.0) |
| — | 3719 Hillman's Cloak | Common, item level 30, requires 25: — (value 0.0) | Uncommon, item level 30, requires 25: 5 spell damage and healing, 4 Stamina (value 6.2) |
| — | 4237 Handstitched Leather Belt | Common, item level 10, requires 5: — (value 0.0) | Uncommon, item level 10, requires 5: 1 Strength (value 1.0) |
| — | 4239 Embossed Leather Gloves | Common, item level 13, requires 8: — (value 0.0) | Uncommon, item level 13, requires 8: 1 Agility, 1 Stamina (value 1.6) |
| — | 4246 Fine Leather Belt | Common, item level 16, requires 11: — (value 0.0) | Uncommon, item level 16, requires 11: 2 Agility, 2 Stamina (value 3.2) |
| — | 4265 Heavy Armor Kit | Common, item level 30, requires 20: Use or proc: Armor +24 (value 0.0) | Common, item level 30, requires 20: Use or proc: Heavy Armor Kit (value 0.0) |
| — | 5739 Barbaric Harness | Common, item level 38, requires 33: — (value 0.0) | Uncommon, item level 38, requires 33: 8 Agility, 8 Stamina, 7 Strength (value 16.0) |
| — | 5957 Handstitched Leather Vest | Common, item level 8, requires 3: — (value 0.0) | Uncommon, item level 10, requires 3: 1 Agility (value 1.0) |
| — | 5966 Guardian Gloves | Common, item level 38, requires 33: — (value 0.0) | Uncommon, item level 38, requires 33: 8 Intellect, 8 spell damage and healing (value 11.2) |
| — | 7281 Light Leather Bracers | Common, item level 14, requires 9: — (value 0.0) | Uncommon, item level 14, requires 9: 1 Agility, 1 Strength (value 1.6) |
| — | 7349 Herbalist's Gloves | Uncommon, item level 27, requires 22: 5 profession skill (value 6.2) | Uncommon, item level 27, requires 22: 5 stat 112 (value 0.0) |
| — | 8173 Thick Armor Kit | Common, item level 40, requires 30: Use or proc: Armor +32 (value 0.0) | Common, item level 40, requires 30: Use or proc: Thick Armor Kit (value 0.0) |
| — | 8198 Turtle Scale Bracers | Uncommon, item level 42, requires 37: — (value 0.0) | Uncommon, item level 42, requires 37: 5 Intellect, 6 spell damage and healing, 5 Stamina (value 10.1) |
| — | 15564 Rugged Armor Kit | Common, item level 50, requires 40: Use or proc: Armor +40 (value 0.0) | Common, item level 50, requires 40: Use or proc: Rugged Armor Kit (value 0.0) |
| — | 18251 Core Armor Kit | Rare, item level 60, requires 50: Use or proc: Defense +3 (value 0.0) | Rare, item level 60, requires 50: Use or proc: Core Armor Kit (value 0.0) |

### New in Forever (247)

| Item | Quality, item level, requires | Stats and effects | Value / 1.12’s budget | Recipe yellow |
|---|---|---|---|---|
| 34086 Winter Boots | Common, 1, 0 | — | — | 0 |
| 279978 Camp Tent | Common, 4, 0 | Use or proc: Camp Tent | — | 20 |
| 277715 Light Leather Reagent Bag | Common, 5, 0 | — | — | 40 |
| 276999 Cloudy Gustwoven Bracers | Uncommon, 10, 5 | 1 Strength | 1.0 / 0.6 (157 %) | 55 |
| 277001 Cloudy Gustwoven Belt | Uncommon, 10, 5 | 1 Stamina | 1.0 / 0.9 (118 %) | 55 |
| 277005 Cloudy Windraveled Armguards | Uncommon, 10, 5 | 1 Intellect | 1.0 / 0.6 (157 %) | 55 |
| 277007 Cloudy Windraveled Strap | Uncommon, 10, 5 | 1 Stamina | 1.0 / 0.9 (118 %) | 55 |
| 277023 Azure Gustwoven Bracers | Uncommon, 10, 5 | 1 Strength | 1.0 / 0.6 (157 %) | 55 |
| 277025 Azure Gustwoven Belt | Uncommon, 10, 5 | 1 Stamina | 1.0 / 0.9 (118 %) | 55 |
| 277029 Azure Windraveled Armguards | Uncommon, 10, 5 | 1 Intellect | 1.0 / 0.6 (157 %) | 55 |
| 277031 Azure Windraveled Strap | Uncommon, 10, 5 | 1 Stamina | 1.0 / 0.9 (118 %) | 55 |
| 277000 Cloudy Gustwoven Gloves | Uncommon, 11, 6 | 1 Agility | 1.0 / 1.2 (80 %) | 60 |
| 277003 Cloudy Gustwoven Boots | Uncommon, 11, 6 | 1 Agility | 1.0 / 1.2 (81 %) | 60 |
| 277006 Cloudy Windraveled Mitts | Uncommon, 11, 6 | 1 Spirit | 1.0 / 1.2 (80 %) | 60 |
| 277009 Cloudy Windraveled Footwraps | Uncommon, 11, 6 | 1 Spirit | 1.0 / 1.2 (81 %) | 60 |
| 277024 Azure Gustwoven Gloves | Uncommon, 11, 6 | 1 Agility | 1.0 / 1.2 (80 %) | 60 |
| 277027 Azure Gustwoven Boots | Uncommon, 11, 6 | 1 Agility | 1.0 / 1.2 (81 %) | 60 |
| 277030 Azure Windraveled Mitts | Uncommon, 11, 6 | 1 Spirit | 1.0 / 1.2 (80 %) | 60 |
| 277033 Azure Windraveled Footwraps | Uncommon, 11, 6 | 1 Spirit | 1.0 / 1.2 (81 %) | 60 |
| 276998 Cloudy Gustwoven Harness | Uncommon, 12, 7 | 2 Strength | 2.0 / 2.1 (94 %) | 65 |
| 277002 Cloudy Gustwoven Trousers | Uncommon, 12, 7 | 2 Stamina | 2.0 / 2.1 (93 %) | 65 |
| 277004 Cloudy Windraveled Jerkin | Uncommon, 12, 7 | 2 Intellect | 2.0 / 2.1 (94 %) | 65 |
| 277008 Cloudy Windraveled Pants | Uncommon, 12, 7 | 2 Stamina | 2.0 / 2.1 (93 %) | 65 |
| 277022 Azure Gustwoven Harness | Uncommon, 12, 7 | 2 Strength | 2.0 / 2.1 (94 %) | 65 |
| 277026 Azure Gustwoven Trousers | Uncommon, 12, 7 | 2 Stamina | 2.0 / 2.1 (93 %) | 65 |
| 277028 Azure Windraveled Jerkin | Uncommon, 12, 7 | 2 Intellect | 2.0 / 2.1 (94 %) | 65 |
| 277032 Azure Windraveled Pants | Uncommon, 12, 7 | 2 Stamina | 2.0 / 2.1 (93 %) | 65 |
| 252424 Black Whelp Slippers | Rare, 15, 10 | 3 one school’s spell damage, 9 healing, 4 Intellect | 6.8 / 5.7 (120 %) | 40 |
| 252425 Dark Leather Boots | Rare, 15, 10 | 4 Agility, 4 Stamina | 6.3 / 5.7 (112 %) | 40 |
| 252426 Murloc Scale Shoes | Rare, 15, 10 | 4 Stamina, 4 Strength | 6.3 / 5.7 (112 %) | 40 |
| 252427 Moonglow Boots | Rare, 15, 10 | 5 spell damage and healing, 4 Stamina | 6.2 / 5.7 (109 %) | 40 |
| 252436 Mystic Medium Armor Kit | Uncommon, 15, 15 | Use or proc: Armor +16, Spell Power +2 | — | 95 |
| 252437 Forceful Medium Armor Kit | Uncommon, 15, 15 | Use or proc: Armor +16, Attack Power +4 | — | 95 |
| 252428 Brawler's Leather Belt | Rare, 17, 12 | 4 Agility, 3 Stamina, 4 Strength | 7.7 / 6.5 (117 %) | 90 |
| 252429 Trapper's Leather Belt | Rare, 17, 12 | 4 Agility, 3 Intellect, 4 Stamina | 7.7 / 6.5 (117 %) | 90 |
| 252430 Defender's Leather Belt | Rare, 17, 12 | 29 bonus armor, 4 Stamina, 4 Strength | 7.6 / 6.5 (116 %) | 90 |
| 252431 Totemic Leather Belt | Rare, 17, 12 | 4 spell damage and healing, 3 Stamina, 4 Strength | 7.0 / 6.5 (106 %) | 90 |
| 252432 Stormrider's Leather Belt | Rare, 17, 12 | 4 Intellect, 4 spell damage and healing, 3 Stamina | 7.0 / 6.5 (106 %) | 90 |
| 252433 Wisdom's Leather Belt | Rare, 17, 12 | 4 Intellect, 3 one school’s spell damage, 8 healing, 3 Stamina | 7.8 / 6.5 (119 %) | 90 |
| 252434 Defender's Leather Armor | Rare, 20, 15 | 3 Agility, 33 bonus armor, 5 Stamina, 7 Strength | 11.9 / 10.4 (114 %) | 80 |
| 252435 Totemic Leather Armor | Rare, 20, 15 | 3 Intellect, 6 spell damage and healing, 3 Stamina, 7 Strength | 11.4 / 10.4 (109 %) | 80 |
| 252490 Brawler's Leather Armor | Rare, 20, 15 | 7 Agility, 3 Spirit, 3 Stamina, 5 Strength | 11.7 / 10.4 (112 %) | 80 |
| 252491 Trapper's Leather Armor | Rare, 20, 15 | 7 Agility, 3 Intellect, 3 Spirit, 5 Stamina | 11.7 / 10.4 (112 %) | 80 |
| 252492 Stormrider's Leather Armor | Rare, 20, 15 | 5 Intellect, 8 spell damage and healing, 3 Spirit, 3 Stamina | 11.0 / 10.4 (105 %) | 80 |
| 252493 Wisdom's Leather Armor | Rare, 20, 15 | 5 Intellect, 5 one school’s spell damage, 15 healing, 3 Spirit, 3 Stamina | 12.2 / 10.4 (117 %) | 80 |
| 252494 Brawler's Leather Gloves | Rare, 20, 15 | 4 Agility, 3 Stamina, 4 Strength | 7.7 / 8.0 (96 %) | 100 |
| 252495 Trapper's Leather Gloves | Rare, 20, 15 | 4 Agility, 3 Intellect, 4 Stamina | 7.7 / 8.0 (96 %) | 100 |
| 252496 Defender's Leather Gloves | Rare, 20, 15 | 34 bonus armor, 4 Stamina, 4 Strength | 7.9 / 8.0 (99 %) | 100 |
| 252497 Totemic Leather Gloves | Rare, 20, 15 | 5 spell damage and healing, 3 Stamina, 4 Strength | 7.5 / 8.0 (94 %) | 100 |
| 252498 Stormrider's Leather Gloves | Rare, 20, 15 | 4 Intellect, 5 spell damage and healing, 3 Stamina | 7.5 / 8.0 (94 %) | 100 |
| 252499 Wisdom's Leather Gloves | Rare, 20, 15 | 4 Intellect, 3 one school’s spell damage, 10 healing, 3 Stamina | 8.4 / 8.0 (105 %) | 100 |
| 252439 Brawler's Leather Boots | Rare, 22, 17 | 5 Agility, 4 Stamina, 5 Strength | 9.7 / 8.8 (110 %) | 110 |
| 252440 Trapper's Leather Boots | Rare, 22, 17 | 5 Agility, 4 Intellect, 5 Stamina | 9.7 / 8.8 (110 %) | 110 |
| 252441 Defender's Leather Boots | Rare, 22, 17 | 38 bonus armor, 5 Stamina, 5 Strength | 9.6 / 8.8 (108 %) | 110 |
| 252442 Totemic Leather Boots | Rare, 22, 17 | 6 spell damage and healing, 4 Stamina, 5 Strength | 9.4 / 8.8 (106 %) | 110 |
| 252443 Stormrider's Leather Boots | Rare, 22, 17 | 5 Intellect, 6 spell damage and healing, 4 Stamina | 9.4 / 8.8 (106 %) | 110 |
| 252444 Wisdom's Leather Boots | Rare, 22, 17 | 5 Intellect, 4 one school’s spell damage, 11 healing, 4 Stamina | 10.3 / 8.8 (116 %) | 110 |
| 252445 Defender's Leather Pants | Rare, 25, 20 | 4 Agility, 42 bonus armor, 6 Stamina, 9 Strength | 15.0 / 13.5 (111 %) | 105 |
| 252446 Totemic Leather Pants | Rare, 25, 20 | 4 Intellect, 7 spell damage and healing, 4 Stamina, 9 Strength | 14.5 / 13.5 (107 %) | 105 |
| 252447 Defender's Leather Hood | Rare, 25, 20 | 10 Stamina, 8 Strength | 14.3 / 14.1 (101 %) | 125 |
| 252448 Totemic Leather Hood | Rare, 25, 20 | 9 spell damage and healing, 10 Stamina | 13.4 / 14.1 (95 %) | 125 |
| 252500 Brawler's Leather Pants | Rare, 25, 20 | 9 Agility, 4 Spirit, 4 Stamina, 6 Strength | 14.9 / 13.5 (111 %) | 105 |
| 252501 Trapper's Leather Pants | Rare, 25, 20 | 9 Agility, 4 Intellect, 4 Spirit, 6 Strength | 14.9 / 13.5 (111 %) | 105 |
| 252502 Stormrider's Leather Pants | Rare, 25, 20 | 6 Intellect, 10 spell damage and healing, 4 Spirit, 4 Stamina | 13.8 / 13.5 (102 %) | 105 |
| 252503 Wisdom's Leather Pants | Rare, 25, 20 | 6 Intellect, 7 one school’s spell damage, 20 healing, 4 Spirit, 4 Stamina | 16.0 / 13.5 (118 %) | 105 |
| 252504 Brawler's Leather Hood | Rare, 25, 20 | 10 Stamina, 8 Agility | 14.3 / 14.1 (101 %) | 125 |
| 252505 Trapper's Leather Hood | Rare, 25, 20 | 8 Intellect, 10 Stamina | 14.3 / 14.1 (101 %) | 125 |
| 252506 Stormrider's Leather Hood | Rare, 25, 20 | 9 Spirit, 10 Stamina | 15.1 / 14.1 (107 %) | 125 |
| 252507 Wisdom's Leather Hood | Rare, 25, 20 | 6 one school’s spell damage, 17 healing, 10 Stamina | 14.9 / 14.1 (106 %) | 125 |
| 252449 Hillman's Leather Boots | Uncommon, 27, 22 | 6 spell damage and healing, 4 Stamina | 6.8 / 7.4 (92 %) | 135 |
| 252450 Defender's Leather Tunic | Rare, 27, 22 | 6 Agility, 51 bonus armor, 8 Stamina, 6 Strength | 15.9 / 14.6 (109 %) | 135 |
| 252451 Totemic Leather Tunic | Rare, 27, 22 | 5 Intellect, 7 spell damage and healing, 6 Stamina, 8 Strength | 15.4 / 14.6 (106 %) | 135 |
| 252508 Brawler's Leather Tunic | Rare, 27, 22 | 8 Agility, 5 Spirit, 6 Stamina, 6 Strength | 15.9 / 14.6 (109 %) | 135 |
| 252509 Trapper's Leather Tunic | Rare, 27, 22 | 8 Agility, 6 Intellect, 5 Spirit, 6 Stamina | 15.9 / 14.6 (109 %) | 135 |
| 252510 Stormrider's Leather Tunic | Rare, 27, 22 | 6 Intellect, 10 spell damage and healing, 5 Spirit, 6 Stamina | 15.5 / 14.6 (106 %) | 135 |
| 252511 Wisdom's Leather Tunic | Rare, 27, 22 | 6 Intellect, 6 one school’s spell damage, 18 healing, 6 Spirit, 5 Stamina | 16.7 / 14.6 (114 %) | 135 |
| 279941 Tanning Rack | Common, 28, 0 | Use or proc: Tanning Rack | — | 140 |
| 252452 Mystic Heavy Armor Kit | Uncommon, 30, 30 | Use or proc: Mystic Heavy Armor Kit | — | 155 |
| 252453 Forceful Heavy Armor Kit | Uncommon, 30, 30 | Use or proc: Forceful Heavy Armor Kit | — | 155 |
| 252455 Defender's Leather Helm | Rare, 30, 25 | 13 Stamina, 12 Strength | 19.9 / 17.3 (115 %) | 130 |
| 252456 Totemic Leather Helm | Rare, 30, 25 | 12 spell damage and healing, 13 Stamina | 17.6 / 17.3 (102 %) | 130 |
| 252457 Defender's Leather Kilt | Rare, 30, 25 | 7 Agility, 58 bonus armor, 9 Stamina, 7 Strength | 18.2 / 16.5 (110 %) | 150 |
| 252458 Totemic Leather Leggings | Rare, 30, 25 | 6 Intellect, 8 spell damage and healing, 7 Stamina, 9 Strength | 17.8 / 16.5 (108 %) | 150 |
| 252512 Brawler's Leather Helm | Rare, 30, 25 | 10 Agility, 13 Stamina | 18.3 / 17.3 (106 %) | 130 |
| 252513 Trapper's Leather Helm | Rare, 30, 25 | 10 Intellect, 13 Stamina | 18.3 / 17.3 (106 %) | 130 |
| 252514 Stormrider's Leather Helm | Rare, 30, 25 | 10 Spirit, 13 Stamina | 18.3 / 17.3 (106 %) | 130 |
| 252515 Wisdom's Leather Helm | Rare, 30, 25 | 7 one school’s spell damage, 21 healing, 13 Stamina | 18.9 / 17.3 (109 %) | 130 |
| 252516 Brawler's Leather Legguards | Rare, 30, 25 | 9 Agility, 6 Spirit, 7 Stamina, 7 Strength | 18.4 / 16.5 (111 %) | 150 |
| 252517 Trapper's Leather Legguards | Rare, 30, 25 | 9 Agility, 7 Intellect, 6 Spirit, 7 Stamina | 18.4 / 16.5 (111 %) | 150 |
| 252518 Stormrider's Leather Kilt | Rare, 30, 25 | 7 Intellect, 11 Spirit, 6 Stamina, 7 Strength | 19.8 / 16.5 (120 %) | 150 |
| 252519 Wisdom's Leather Leggings | Rare, 30, 25 | 7 Intellect, 7 one school’s spell damage, 21 healing, 7 Spirit, 6 Stamina | 19.6 / 16.5 (119 %) | 150 |
| 252459 Prowler's Leather Belt | Rare, 35, 30 | 6 Agility, 4 Intellect, 6 Stamina, 9 Strength | 16.1 / 14.7 (109 %) | 155 |
| 252460 Warden's Leather Belt | Rare, 35, 30 | 6 Agility, 38 bonus armor, 9 Stamina, 6 Strength | 15.9 / 14.7 (109 %) | 155 |
| 252461 Skirmisher's Leather Belt | Rare, 35, 30 | 4 Intellect, 7 spell damage and healing, 6 Stamina, 9 Strength | 15.6 / 14.7 (106 %) | 155 |
| 252520 Skulker's Leather Belt | Rare, 35, 30 | 9 Agility, 4 Spirit, 6 Stamina, 6 Strength | 16.1 / 14.7 (109 %) | 155 |
| 252521 Stalker's Leather Belt | Rare, 35, 30 | 9 Agility, 6 Intellect, 4 Spirit, 6 Stamina | 16.1 / 14.7 (109 %) | 155 |
| 252522 Skycaller's Leather Belt | Rare, 35, 30 | 6 Intellect, 10 spell damage and healing, 4 Spirit, 6 Stamina | 15.0 / 14.7 (102 %) | 155 |
| 252523 Mender's Leather Belt | Rare, 35, 30 | 6 Intellect, 6 one school’s spell damage, 19 healing, 6 Spirit, 4 Stamina | 16.5 / 14.7 (112 %) | 155 |
| 277042 Cloudy Gustwoven Hood | Uncommon, 35, 30 | 9 Strength, 9 Stamina | 14.3 / 14.4 (99 %) | 185 |
| 277043 Cloudy Gustwoven Spaulders | Uncommon, 35, 30 | 7 Agility, 7 Stamina | 11.1 / 10.7 (104 %) | 185 |
| 277044 Cloudy Windraveled Cover | Uncommon, 35, 30 | 9 Intellect, 9 Stamina | 14.3 / 14.4 (99 %) | 185 |
| 277045 Cloudy Windraveled Drapes | Uncommon, 35, 30 | 7 Spirit, 7 Stamina | 11.1 / 10.7 (104 %) | 185 |
| 277050 Azure Gustwoven Hood | Uncommon, 35, 30 | 9 Strength, 9 Stamina | 14.3 / 14.4 (99 %) | 185 |
| 277051 Azure Gustwoven Spaulders | Uncommon, 35, 30 | 7 Agility, 7 Stamina | 11.1 / 10.7 (104 %) | 185 |
| 277052 Azure Windraveled Cover | Uncommon, 35, 30 | 9 Intellect, 9 Stamina | 14.3 / 14.4 (99 %) | 185 |
| 277053 Azure Windraveled Drapes | Uncommon, 35, 30 | 7 Spirit, 7 Stamina | 11.1 / 10.7 (104 %) | 185 |
| 213369 Faintly Glowing Leather | Rare, 40, 0 | — | — | 200 |
| 252462 Mystic Thick Armor Kit | Uncommon, 40, 40 | Use or proc: Mystic Thick Armor Kit | — | 205 |
| 252463 Forceful Thick Armor Kit | Uncommon, 40, 40 | Use or proc: Forceful Thick Armor Kit | — | 205 |
| 252524 Prowler's Leather Gloves | Rare, 40, 35 | 9 Agility, 7 Stamina, 10 Strength | 18.1 / 17.2 (106 %) | 195 |
| 252525 Skulker's Leather Gloves | Rare, 40, 35 | 10 Agility, 7 Stamina, 9 Strength | 18.1 / 17.2 (106 %) | 195 |
| 252526 Stalker's Leather Gloves | Rare, 40, 35 | 10 Agility, 7 Intellect, 9 Stamina | 18.1 / 17.2 (106 %) | 195 |
| 252527 Warden's Leather Gloves | Rare, 40, 35 | 72 bonus armor, 10 Stamina, 9 Strength | 18.2 / 17.2 (106 %) | 195 |
| 252528 Skirmisher's Leather Gloves | Rare, 40, 35 | 10 spell damage and healing, 7 Stamina, 10 Strength | 17.1 / 17.2 (100 %) | 195 |
| 252529 Skycaller's Leather Gloves | Rare, 40, 35 | 9 Intellect, 11 spell damage and healing, 7 Stamina | 16.9 / 17.2 (98 %) | 195 |
| 252530 Mender's Leather Gloves | Rare, 40, 35 | 9 Intellect, 7 one school’s spell damage, 21 healing, 7 Stamina | 18.6 / 17.2 (109 %) | 195 |
| 217270 Turtle Scale Gloves | Uncommon, 41, 36 | 7 Stamina, 7 spell damage and healing, 6 Intellect | 12.7 / 12.8 (99 %) | 225 |
| 252465 Prowler's Leather Shoes | Rare, 45, 40 | 7 Agility, 5 Intellect, 7 Stamina, 11 Strength | 19.3 / 19.3 (100 %) | 205 |
| 252466 Warden's Leather Shoes | Rare, 45, 40 | 7 Agility, 49 bonus armor, 11 Stamina, 7 Strength | 19.2 / 19.3 (100 %) | 205 |
| 252531 Skulker's Leather Shoes | Rare, 45, 40 | 11 Agility, 5 Spirit, 7 Stamina, 7 Strength | 19.3 / 19.3 (100 %) | 205 |
| 252532 Skycaller's Leather Shoes | Rare, 45, 40 | 7 Intellect, 13 spell damage and healing, 5 Spirit, 7 Stamina | 18.4 / 19.3 (95 %) | 205 |
| 252533 Mender's Leather Shoes | Rare, 45, 40 | 7 Intellect, 8 one school’s spell damage, 24 healing, 7 Spirit, 5 Stamina | 20.2 / 19.3 (105 %) | 205 |
| 252562 Stalker's Mail Boots | Rare, 45, 40 | 11 Agility, 7 Intellect, 5 Spirit, 7 Stamina | 19.3 / 19.3 (100 %) | 205 |
| 252563 Skycaller's Mail Boots | Rare, 45, 40 | 7 Intellect, 13 spell damage and healing, 5 Spirit, 7 Stamina | 18.4 / 19.3 (95 %) | 205 |
| 252564 Skirmisher's Mail Boots | Rare, 45, 40 | 5 Intellect, 9 spell damage and healing, 7 Stamina, 11 Strength | 19.1 / 19.3 (99 %) | 205 |
| 252565 Mender's Mail Boots | Rare, 45, 40 | 7 Intellect, 8 one school’s spell damage, 24 healing, 7 Spirit, 5 Stamina | 20.2 / 19.3 (105 %) | 205 |
| 252534 Prowler's Leather Shoulder | Rare, 47, 42 | 9 Agility, 6 Intellect, 7 Stamina, 11 Strength | 21.1 / 20.7 (102 %) | 230 |
| 252535 Skulker's Leather Shoulder | Rare, 47, 42 | 11 Agility, 6 Spirit, 7 Stamina, 9 Strength | 21.1 / 20.7 (102 %) | 230 |
| 252536 Warden's Leather Shoulder | Rare, 47, 42 | 7 Agility, 65 bonus armor, 11 Stamina, 9 Strength | 21.3 / 20.7 (103 %) | 230 |
| 252537 Skycaller's Leather Shoulder | Rare, 47, 42 | 9 Intellect, 13 spell damage and healing, 6 Spirit, 7 Stamina | 20.2 / 20.7 (97 %) | 230 |
| 252538 Mender's Leather Shoulder | Rare, 47, 42 | 9 Intellect, 8 one school’s spell damage, 24 healing, 7 Spirit, 6 Stamina | 22.0 / 20.7 (106 %) | 230 |
| 252566 Stalker's Mail Shoulder | Rare, 47, 42 | 11 Agility, 7 Intellect, 6 Spirit, 9 Stamina | 21.1 / 20.7 (102 %) | 220 |
| 252567 Skycaller's Mail Shoulder | Rare, 47, 42 | 9 Intellect, 13 spell damage and healing, 6 Spirit, 7 Stamina | 20.2 / 20.7 (97 %) | 220 |
| 252568 Skirmisher's Mail Shoulder | Rare, 47, 42 | 6 Intellect, 10 spell damage and healing, 7 Stamina, 11 Strength | 20.1 / 20.7 (97 %) | 220 |
| 252569 Mender's Mail Shoulder | Rare, 47, 42 | 9 Intellect, 8 one school’s spell damage, 24 healing, 7 Spirit, 6 Stamina | 22.0 / 20.7 (106 %) | 220 |
| 252487 Mystic Rugged Armor Kit | Uncommon, 50, 50 | Use or proc: Mystic Rugged Armor Kit | — | 235 |
| 252488 Forceful Rugged Armor Kit | Uncommon, 50, 50 | Use or proc: Forceful Rugged Armor Kit | — | 235 |
| 252539 Prowler's Leather Bracers | Rare, 50, 45 | 7 Agility, 5 Intellect, 6 Stamina, 9 Strength | 17.2 / 16.1 (107 %) | 245 |
| 252540 Skulker's Leather Bracers | Rare, 50, 45 | 9 Agility, 5 Spirit, 6 Stamina, 7 Strength | 17.2 / 16.1 (107 %) | 245 |
| 252541 Warden's Leather Bracers | Rare, 50, 45 | 6 Agility, 52 bonus armor, 9 Stamina, 7 Strength | 17.3 / 16.1 (107 %) | 245 |
| 252542 Skycaller's Leather Bracers | Rare, 50, 45 | 7 Intellect, 10 spell damage and healing, 5 Spirit, 6 Stamina | 16.2 / 16.1 (100 %) | 245 |
| 252543 Mender's Leather Bracers | Rare, 50, 45 | 7 Intellect, 6 one school’s spell damage, 19 healing, 6 Spirit, 5 Stamina | 17.6 / 16.1 (109 %) | 245 |
| 252570 Stalker's Mail Bracers | Rare, 50, 45 | 9 Agility, 6 Intellect, 5 Spirit, 7 Stamina | 17.2 / 16.1 (107 %) | 220 |
| 252571 Skycaller's Mail Bracers | Rare, 50, 45 | 7 Intellect, 10 spell damage and healing, 5 Spirit, 6 Stamina | 16.2 / 16.1 (100 %) | 220 |
| 252572 Skirmisher's Mail Bracers | Rare, 50, 45 | 5 Intellect, 8 spell damage and healing, 6 Stamina, 9 Strength | 16.6 / 16.1 (103 %) | 220 |
| 252573 Mender's Mail Bracers | Rare, 50, 45 | 7 Intellect, 6 one school’s spell damage, 19 healing, 6 Spirit, 5 Stamina | 17.6 / 16.1 (109 %) | 220 |
| 252574 Supple Scorpid Boots | Uncommon, 51, 46 | 8 spell damage and healing, 10 Stamina, 8 Strength | 16.8 / 16.6 (102 %) | 250 |
| 252575 Charged Scorpid Belt | Uncommon, 51, 46 | 10 Intellect, 8 spell damage and healing, 8 Spirit | 16.8 / 16.5 (102 %) | 250 |
| 252467 Blue Suede Shoes | Uncommon, 52, 47 | 5 Agility, 11 Stamina, 10 Strength | 18.5 / 17.0 (109 %) | 255 |
| 252468 Prowler's Leather Boots | Rare, 52, 47 | 11 Agility, 9 Stamina, 13 Strength | 23.0 / 22.5 (102 %) | 255 |
| 252469 Skulker's Leather Boots | Rare, 52, 47 | 13 Agility, 9 Stamina, 11 Strength | 23.0 / 22.5 (102 %) | 255 |
| 252470 Warden's Leather Boots | Rare, 52, 47 | 93 bonus armor, 13 Stamina, 11 Strength | 23.1 / 22.5 (103 %) | 255 |
| 252471 Skycaller's Leather Boots | Rare, 52, 47 | 11 Intellect, 15 spell damage and healing, 9 Stamina | 21.7 / 22.5 (97 %) | 255 |
| 252472 Mender's Leather Boots | Rare, 52, 47 | 11 Intellect, 9 one school’s spell damage, 28 healing, 9 Stamina | 23.9 / 22.5 (106 %) | 255 |
| 252544 Tooled Leather Belt | Uncommon, 52, 47 | 11 Intellect, 9 spell damage and healing, 8 Spirit | 18.1 / 16.9 (107 %) | 255 |
| 252576 Stalker's Mail Sabatons | Rare, 52, 47 | 13 Agility, 9 Intellect, 11 Stamina | 23.0 / 22.5 (102 %) | 255 |
| 252577 Skycaller's Mail Sabatons | Rare, 52, 47 | 11 Intellect, 15 spell damage and healing, 9 Stamina | 21.7 / 22.5 (97 %) | 255 |
| 252578 Skirmisher's Mail Sabatons | Rare, 52, 47 | 13 spell damage and healing, 9 Stamina, 13 Strength | 22.2 / 22.5 (99 %) | 255 |
| 252579 Mender's Mail Sabatons | Rare, 52, 47 | 11 Intellect, 9 one school’s spell damage, 28 healing, 9 Stamina | 23.9 / 22.5 (106 %) | 255 |
| 252545 Tooled Leather Boots | Uncommon, 53, 48 | 5 Intellect, 8 spell damage and healing, 8 Spirit | 13.3 / 17.3 (77 %) | 260 |
| 252546 Blue Suede Gloves | Uncommon, 53, 48 | 4 Agility, 5 Stamina, 9 Strength | 12.9 / 17.5 (74 %) | 260 |
| 252580 Supple Scorpid Leggings | Uncommon, 53, 48 | 12 spell damage and healing, 16 Stamina, 10 Strength | 24.7 / 22.9 (108 %) | 260 |
| 252581 Charged Scorpid Helm | Uncommon, 53, 48 | 16 Intellect, 12 spell damage and healing, 10 Spirit | 24.7 / 24.0 (103 %) | 260 |
| 12624 Wildthorn Mail | Rare, 54, 49 | 11 spell damage and healing, 5 Stamina, 1 melee hit % | 15.8 / 30.7 (51 %) | 265 |
| 252473 Prowler's Leather Waistguard | Rare, 55, 50 | 12 Agility, 10 Stamina, 14 Strength | 25.1 / 23.7 (106 %) | 270 |
| 252474 Skulker's Leather Waistguard | Rare, 55, 50 | 14 Agility, 10 Stamina, 12 Strength | 25.1 / 23.7 (106 %) | 270 |
| 252475 Warden's Leather Waistguard | Rare, 55, 50 | 102 bonus armor, 14 Stamina, 12 Strength | 25.1 / 23.7 (106 %) | 270 |
| 252476 Skycaller's Leather Waistguard | Rare, 55, 50 | 12 Intellect, 16 spell damage and healing, 10 Stamina | 23.6 / 23.7 (100 %) | 270 |
| 252477 Mender's Leather Waistguard | Rare, 55, 50 | 12 Intellect, 10 one school’s spell damage, 30 healing, 10 Stamina | 26.1 / 23.7 (110 %) | 270 |
| 252547 Prowler's Leather Gauntlets | Rare, 55, 50 | 9 Agility, 6 Intellect, 9 Stamina, 14 Strength | 24.5 / 24.0 (102 %) | 255 |
| 252548 Skulker's Leather Gauntlets | Rare, 55, 50 | 14 Agility, 6 Spirit, 9 Stamina, 9 Strength | 24.5 / 24.0 (102 %) | 255 |
| 252549 Warden's Leather Gauntlets | Rare, 55, 50 | 9 Agility, 62 bonus armor, 14 Stamina, 9 Strength | 24.5 / 24.0 (102 %) | 255 |
| 252550 Skycaller's Leather Gauntlets | Rare, 55, 50 | 9 Intellect, 16 spell damage and healing, 6 Spirit, 9 Stamina | 23.0 / 24.0 (96 %) | 255 |
| 252551 Mender's Leather Gauntlets | Rare, 55, 50 | 9 Intellect, 10 one school’s spell damage, 31 healing, 9 Spirit, 6 Stamina | 25.7 / 24.0 (107 %) | 255 |
| 252582 Supple Scorpid Bracers | Uncommon, 55, 50 | 7 spell damage and healing, 8 Stamina, 6 Strength | 13.5 / 13.5 (100 %) | 270 |
| 252583 Charged Scorpid Shoulder | Uncommon, 55, 50 | 12 Intellect, 9 spell damage and healing, 8 Spirit | 18.8 / 18.6 (101 %) | 270 |
| 252584 Stalker's Mail Gauntlets | Rare, 55, 50 | 14 Agility, 9 Intellect, 6 Spirit, 9 Stamina | 24.5 / 24.0 (102 %) | 255 |
| 252585 Skycaller's Mail Gauntlets | Rare, 55, 50 | 9 Intellect, 16 spell damage and healing, 6 Spirit, 9 Stamina | 23.0 / 24.0 (96 %) | 255 |
| 252586 Skirmisher's Mail Gauntlets | Rare, 55, 50 | 6 Intellect, 11 spell damage and healing, 9 Stamina, 14 Strength | 24.0 / 24.0 (100 %) | 255 |
| 252587 Mender's Mail Gauntlets | Rare, 55, 50 | 9 Intellect, 10 one school’s spell damage, 31 healing, 9 Spirit, 6 Stamina | 25.7 / 24.0 (107 %) | 255 |
| 252588 Stalker's Mail Belt | Rare, 55, 50 | 14 Agility, 10 Intellect, 12 Stamina | 25.1 / 23.7 (106 %) | 270 |
| 252589 Skycaller's Mail Belt | Rare, 55, 50 | 12 Intellect, 16 spell damage and healing, 10 Stamina | 23.6 / 23.7 (100 %) | 270 |
| 252590 Skirmisher's Mail Belt | Rare, 55, 50 | 15 spell damage and healing, 10 Stamina, 14 Strength | 24.6 / 23.7 (104 %) | 270 |
| 252591 Mender's Mail Belt | Rare, 55, 50 | 12 Intellect, 10 one school’s spell damage, 30 healing, 10 Stamina | 26.1 / 23.7 (110 %) | 270 |
| 252478 Blue Suede Pants | Uncommon, 56, 51 | 6 Agility, 16 Stamina, 14 Strength | 25.8 / 24.4 (106 %) | 275 |
| 252552 Tooled Leather Armor | Uncommon, 56, 51 | 16 Intellect, 12 spell damage and healing, 11 Spirit | 25.3 / 24.3 (104 %) | 275 |
| 252592 Supple Scorpid Shoulder | Uncommon, 56, 51 | 9 spell damage and healing, 12 Stamina, 8 Strength | 18.8 / 19.0 (99 %) | 275 |
| 252593 Charged Scorpid Bracers | Uncommon, 56, 51 | 7 Intellect, 9 spell damage and healing, 6 Spirit | 13.7 / 13.8 (99 %) | 275 |
| 252594 Heavy Scorpid Boots | Uncommon, 56, 51 | 10 Agility, 9 Stamina | 15.1 / 18.5 (82 %) | 275 |
| 252595 Supple Scorpid Belt | Uncommon, 56, 51 | 12 spell damage and healing, 12 Stamina | 16.8 / 18.4 (91 %) | 275 |
| 252596 Charged Scorpid Gauntlets | Uncommon, 56, 51 | 9 Intellect, 12 spell damage and healing, 8 Spirit | 18.1 / 18.6 (97 %) | 275 |
| 252479 Wicked Leather Boots | Uncommon, 57, 52 | 12 Agility, 12 Stamina | 19.0 / 18.9 (101 %) | 280 |
| 252553 Tooled Leather Gauntlets | Uncommon, 57, 52 | 12 Intellect, 9 spell damage and healing, 8 Spirit | 18.8 / 19.0 (99 %) | 280 |
| 252554 Blue Suede Shoulder | Uncommon, 57, 52 | 5 Agility, 12 Stamina, 10 Strength | 19.2 / 19.4 (99 %) | 280 |
| 252597 Supple Scorpid Helm | Uncommon, 57, 52 | 17 spell damage and healing, 12 Stamina, 11 Strength | 24.8 / 26.1 (95 %) | 280 |
| 252598 Charged Scorpid Vest | Uncommon, 57, 52 | 15 Intellect, 12 spell damage and healing, 14 Spirit | 26.7 / 24.8 (107 %) | 280 |
| 19043 Heavy Timbermaw Belt | Rare, 58, 53 | 9 Stamina, 42 attack power | 24.4 / 25.1 (97 %) | 285 |
| 252480 Blue Suede Armor | Uncommon, 58, 53 | 8 Agility, 12 Stamina, 16 Strength | 25.4 / 25.3 (100 %) | 285 |
| 252555 Tooled Leather Crown | Uncommon, 58, 53 | 12 Intellect, 14 spell damage and healing, 15 Spirit | 26.2 / 26.6 (98 %) | 285 |
| 275610 Bileblister Claws | Rare, 58, 53 | 19 Stamina, 11 Intellect, 5 resistance | 25.7 / 25.4 (101 %) | 290 |
| 275611 Bileblister Girdle | Rare, 58, 53 | 17 Stamina, 14 Intellect, 6 resistance | 26.5 / 25.1 (106 %) | 295 |
| 275612 Bileblister Boots | Rare, 58, 53 | 8 Spirit, 22 spell damage and healing, 8 resistance | 23.2 / 25.2 (92 %) | 295 |
| 275613 Hivethrasher's Claws | Rare, 58, 53 | 20 Stamina, 7 resistance, 7 Agility | 25.1 / 25.4 (99 %) | 290 |
| 275614 Hivethrasher's Girdle | Rare, 58, 53 | 21 Stamina, 7 Agility, 4 resistance | 24.7 / 25.1 (98 %) | 295 |
| 275615 Hivethrasher's Boots | Rare, 58, 53 | 10 Stamina, 19 Agility, 4 resistance | 24.6 / 25.2 (98 %) | 295 |
| 275616 Scalegut Clenchers | Rare, 58, 53 | 19 Stamina, 11 Agility, 5 resistance | 25.7 / 25.4 (101 %) | 290 |
| 275617 Scalegut Belt | Rare, 58, 53 | 17 Stamina, 14 Agility, 6 resistance | 26.5 / 25.1 (106 %) | 295 |
| 275618 Scalegut Treaders | Rare, 58, 53 | 8 Agility, 38 attack power, 8 resistance | 25.0 / 25.2 (99 %) | 295 |
| 275619 Broodwatcher's Clenchers | Rare, 58, 53 | 20 Spirit, 7 resistance, 16 healing, 5 one school’s spell damage | 25.6 / 25.4 (101 %) | 290 |
| 275620 Broodwatcher's Belt | Rare, 58, 53 | 4 resistance, 21 Stamina, 16 healing, 5 one school’s spell damage | 25.2 / 25.1 (100 %) | 295 |
| 275621 Broodwatcher's Treaders | Rare, 58, 53 | 4 resistance, 10 Stamina, 43 healing, 14 one school’s spell damage | 27.1 / 25.2 (107 %) | 295 |
| 12632 Storm Gauntlets | Rare, 59, 54 | 7 Stamina, 18 spell damage and healing, 1 melee hit % | 21.0 / 25.9 (81 %) | 290 |
| 252481 Blue Suede Belt | Uncommon, 59, 54 | 4 Agility, 14 Stamina, 9 Strength | 19.7 / 19.6 (101 %) | 290 |
| 252556 Wicked Leather Shoulder | Uncommon, 59, 54 | 11 Agility, 14 Stamina | 19.9 / 20.1 (99 %) | 290 |
| 252557 Tooled Leather Bracers | Uncommon, 59, 54 | 11 Intellect, 5 spell damage and healing, 4 Spirit | 13.9 / 14.7 (95 %) | 290 |
| 252599 Supple Scorpid Vest | Uncommon, 59, 54 | 12 spell damage and healing, 16 Stamina, 15 Strength | 28.1 / 25.8 (109 %) | 290 |
| 252600 Charged Scorpid Leggings | Uncommon, 59, 54 | 9 Intellect, 20 spell damage and healing, 9 Spirit | 23.3 / 26.0 (90 %) | 290 |
| 252558 Tooled Leather Epaulets | Uncommon, 60, 55 | 11 spell damage and healing, 10 Spirit, 13 Stamina | 21.9 / 20.5 (107 %) | 295 |
| 252559 Blue Suede Bracers | Uncommon, 60, 55 | 3 Agility, 6 Stamina, 12 Strength | 15.6 / 14.9 (104 %) | 295 |
| 279945 Sewing Machine | Common, 60, 0 | Use or proc: Sewing Machine | — | 300 |
| 12636 Helm of the Great Chief | Rare, 61, 56 | 12 Spirit, 30 healing, 15 one school’s spell damage | 23.8 / 36.8 (65 %) | 290 |
| 19048 Heavy Timbermaw Boots | Rare, 61, 56 | 21 Stamina, 20 attack power | 25.3 / 26.6 (95 %) | 300 |
| 252482 Blue Suede Hat | Uncommon, 61, 56 | 16 Agility, 7 Stamina, 17 Strength | 28.6 / 28.2 (101 %) | 300 |
| 252483 Dawn Armor | Epic, 61, 56 | 37 Agility, 1 melee critical %, 1 melee hit % | 44.7 / 45.6 (98 %) | 320 |
| 252484 Timbermaw Tunic | Epic, 61, 56 | 18 Agility, 33 Strength, 1 melee critical % | 46.0 / 45.6 (101 %) | 320 |
| 252485 Warbear Helm | Epic, 61, 56 | 14 Agility, 33 Stamina, 18 Strength | 46.6 / 48.0 (97 %) | 320 |
| 252486 Ironfeather Leggings | Epic, 61, 56 | 18 Intellect, 38 spell damage and healing, 1 melee critical % | 42.3 / 45.8 (92 %) | 320 |
| 252560 Tooled Leather Pants | Uncommon, 61, 56 | 19 spell damage and healing, 17 Spirit, 7 Stamina | 27.3 / 27.0 (101 %) | 300 |
| 252561 Living Crown | Epic, 61, 56 | 18 Intellect, 25 one school’s spell damage, 73 healing, 14 Spirit | 50.5 / 48.0 (105 %) | 320 |
| 252601 Supple Scorpid Sabatons | Uncommon, 61, 56 | 15 spell damage and healing, 7 Stamina, 7 Strength | 17.8 / 20.4 (87 %) | 300 |
| 252602 Charged Scorpid Boots | Uncommon, 61, 56 | 9 Intellect, 14 spell damage and healing, 9 Spirit | 19.8 / 20.4 (97 %) | 300 |
| 252603 Red Dragonscale Leggings | Epic, 61, 56 | 32 Intellect, 20 one school’s spell damage, 20 healing | 40.0 / 45.8 (87 %) | 320 |
| 252604 Blue Dragonscale Helm | Epic, 61, 56 | 18 Intellect, 25 spell damage and healing, 1 melee hit % | 32.5 / 48.0 (68 %) | 320 |
| 252605 Black Dragonscale Helm | Epic, 61, 56 | 21 Agility, 38 Intellect, 1 melee critical % | 52.2 / 48.0 (109 %) | 320 |
| 252606 Pristine Scorpid Leggings | Epic, 61, 56 | 33 spell damage and healing, 18 Strength, 1 melee critical % | 39.3 / 45.8 (86 %) | 320 |
| 276538 Spiritcaller Kilt | Epic, 61, 60 | — | — | 320 |
| 276539 Spiritcaller Gloves | Epic, 61, 60 | — | — | 320 |
| 276540 Spiritcaller Mantle | Epic, 61, 60 | — | — | 320 |
| 276541 Spiritcaller Boots | Epic, 61, 60 | — | — | 320 |
| 12641 Invulnerable Mail | Epic, 63, 57 | 20 Stamina, 1 proc on hit | 24.7 / 46.9 (53 %) | 295 |
| 279252 Elderwild Waistcord | Epic, 65, 60 | 21 Stamina, 18 Spirit, 30 healing, 10 one school’s spell damage | 37.8 / 36.6 (103 %) | 310 |
| 279253 Outlaw's Collar | Epic, 65, 60 | 31 Stamina, 21 Agility, 1.5 melee critical % | 50.1 / 50.9 (98 %) | 310 |
| 279254 Elderwild Pants | Epic, 65, 60 | 27 Stamina, 24 Spirit, 40 healing, 13 one school’s spell damage | 49.6 / 48.6 (102 %) | 310 |
| 279255 Eternity Pauldrons | Epic, 65, 60 | 21 Stamina, 18 Spirit, 30 healing, 10 one school’s spell damage | 37.8 / 37.7 (100 %) | 310 |
| 279256 Tranquil Wristguards | Epic, 65, 60 | 10 Intellect, 16 Strength, 14 Stamina | 28.0 / 27.4 (102 %) | 310 |
| 279257 Mourning Handguards | Epic, 65, 60 | 21 Agility, 18 Stamina, 14 Intellect | 37.0 / 37.1 (100 %) | 310 |
| 279258 Wild Leather Armor Kit | Rare, 65, 60 | Use or proc: Wild Leather Armor Kit | — | 310 |

## Tailoring

233 items in both; 120 changed in some way (0 with a higher item level, 15 a better quality). Of the 156 with stats: 31 stronger in Forever, 46 weaker, 79 within 5 %; median change 100 %. 171 new items.

| Change | Item | 1.14.2 | Forever |
|---|---|---|---|
| 162 % | 10020 Stormcloth Vest | Uncommon, item level 45, requires 40: 8 Spirit, 8 Stamina, 29 healing (value 19.4) | Uncommon, item level 45, requires 40: 8 Spirit, 8 Stamina, 58 healing, 10 one school’s spell damage (value 31.5) |
| 148 % | 14141 Ghostweave Vest | Uncommon, item level 55, requires 50: 9 Intellect, 8 mana per 5 sec (value 21.5) | Uncommon, item level 55, requires 50: 9 spell damage and healing, 20 Spirit, 8 mana per 5 sec (value 31.9) |
| 140 % | 4311 Heavy Woolen Cloak | Uncommon, item level 21, requires 16: 4 Spirit (value 4.0) | Uncommon, item level 21, requires 16: 4 Spirit, 4 spell damage and healing (value 5.6) |
| 139 % | 10039 Stormcloth Boots | Uncommon, item level 50, requires 45: 10 Stamina, 16 one school’s spell damage (value 16.5) | Uncommon, item level 50, requires 45: 10 Stamina, 24 healing, 8 one school’s spell damage, 16 one school’s spell damage (value 22.9) |
| 137 % | 10033 Red Mageweave Headband | Uncommon, item level 48, requires 43: 20 Intellect (value 20.0) | Uncommon, item level 48, requires 43: 20 Intellect, 19 spell damage and healing (value 27.4) |
| 133 % | 14144 Ghostweave Pants | Uncommon, item level 58, requires 53: 12 Intellect, 8 mana per 5 sec (value 23.6) | Uncommon, item level 58, requires 53: 26 spell damage and healing, 20 Spirit (value 31.4) |
| 130 % | 14100 Brightcloth Robe | Uncommon, item level 54, requires 49: 16 resistance, 15 resistance (value 23.9) | Uncommon, item level 54, requires 49: 16 resistance, 16 resistance, 18 spell damage and healing (value 31.0) |
| 130 % | 14101 Brightcloth Gloves | Uncommon, item level 54, requires 49: 12 resistance, 11 resistance (value 17.8) | Uncommon, item level 54, requires 49: 12 resistance, 12 resistance, 13 spell damage and healing (value 23.0) |
| 129 % | 4313 Red Woolen Boots | Uncommon, item level 20, requires 15: 5 Spirit (value 5.0) | Uncommon, item level 20, requires 15: 5 Spirit, 4 spell damage and healing (value 6.5) |
| 129 % | 14104 Brightcloth Pants | Uncommon, item level 58, requires 53: 17 resistance, 16 resistance (value 25.5) | Uncommon, item level 58, requires 53: 17 resistance, 17 resistance, 19 spell damage and healing (value 32.9) |
| 129 % | 14128 Wizardweave Robe | Uncommon, item level 60, requires 55: 18 resistance, 17 resistance (value 27.0) | Uncommon, item level 60, requires 55: 18 resistance, 18 resistance, 20 spell damage and healing (value 34.7) |
| 128 % | 14132 Wizardweave Leggings | Uncommon, item level 55, requires 50: 16 resistance, 16 resistance (value 24.7) | Uncommon, item level 55, requires 50: 16 resistance, 16 resistance, 19 spell damage and healing (value 31.5) |
| 127 % | 14130 Wizardweave Turban | Uncommon, item level 61, requires 56: 18 resistance, 18 resistance (value 27.8) | Uncommon, item level 61, requires 56: 18 resistance, 18 resistance, 21 spell damage and healing (value 35.2) |
| 125 % | 7057 Green Silken Shoulders | Uncommon, item level 36, requires 31: 11 Intellect (value 11.0) | Uncommon, item level 36, requires 31: 11 Intellect, 8 spell damage and healing (value 13.8) |
| 125 % | 4318 Gloves of Meditation | Uncommon, item level 26, requires 21: 7 Spirit (value 7.0) | Uncommon, item level 26, requires 21: 7 Spirit, 5 spell damage and healing (value 8.7) |
| 124 % | 7065 Green Silk Armor | Uncommon, item level 33, requires 28: 13 Intellect (value 13.0) | Uncommon, item level 33, requires 28: 13 Intellect, 9 spell damage and healing (value 16.1) |
| 122 % | 5542 Pearl-clasped Cloak | Uncommon, item level 19, requires 14: 3 Intellect (value 3.0) | Uncommon, item level 19, requires 14: 3 Intellect, 2 spell damage and healing (value 3.7) |
| 122 % | 6242 Blue Linen Robe | Uncommon, item level 14, requires 9: 3 Spirit (value 3.0) | Uncommon, item level 14, requires 9: 3 Spirit, 2 spell damage and healing (value 3.7) |
| 121 % | 14154 Truefaith Vestments | Epic, item level 62, requires 57: 14 Stamina, 73 healing, 6 mana per 5 sec, -2000 class spell bonus (value 40.8) | Epic, item level 62, requires 57: 14 Stamina, 73 healing, 25 one school’s spell damage, 16 Spirit, -2000 class spell bonus (value 49.3) |
| 120 % | 14134 Cloak of Fire | Rare, item level 55, requires 50: 7 Stamina, 6 resistance; Use or proc: Cloak of Fire (value 10.2) | Rare, item level 55, requires 50: 6 resistance, 14 one school’s spell damage; Use or proc: Cloak of Fire (value 12.3) |
| 119 % | 7049 Truefaith Gloves | Uncommon, item level 30, requires 25: 3 Intellect, 15 healing (value 7.4) | Uncommon, item level 30, requires 25: 3 Intellect, 15 healing, 5 one school’s spell damage (value 8.9) |
| 119 % | 10038 Stormcloth Shoulders | Uncommon, item level 49, requires 44: 21 one school’s spell damage (value 14.1) | Uncommon, item level 49, requires 44: 10 Stamina, 22 healing, 7 one school’s spell damage (value 16.7) |
| 115 % | 6239 Red Linen Vest | Uncommon, item level 12, requires 7: 2 Spirit (value 2.0) | Uncommon, item level 12, requires 7: 2 Intellect, 1 spell damage and healing (value 2.3) |
| 115 % | 6240 Blue Linen Vest | Uncommon, item level 12, requires 7: 2 Spirit (value 2.0) | Uncommon, item level 12, requires 7: 2 Spirit, 1 spell damage and healing (value 2.3) |
| 113 % | 10029 Red Mageweave Shoulders | Uncommon, item level 47, requires 42: 15 Intellect (value 15.0) | Uncommon, item level 47, requires 42: 15 Intellect, 7 spell damage and healing (value 17.0) |
| 112 % | 19047 Wisdom of the Timbermaw | Rare, item level 58, requires 53: 21 Intellect, 4 mana per 5 sec (value 24.6) | Rare, item level 58, requires 53: 14 Intellect, 31 healing, 11 one school’s spell damage, 9 Spirit (value 27.5) |
| 110 % | 7056 Crimson Silk Cloak | Uncommon, item level 36, requires 31: 3 Stamina, 7 resistance (value 8.1) | Uncommon, item level 36, requires 31: 3 Stamina, 6 resistance, 5 spell damage and healing (value 8.9) |
| 110 % | 10032 Stormcloth Headband | Uncommon, item level 48, requires 43: 10 Spirit, 10 Intellect, 14 one school’s spell damage (value 20.4) | Uncommon, item level 48, requires 43: 10 Spirit, 10 Intellect, 24 healing, 8 one school’s spell damage (value 22.4) |
| 107 % | 14140 Mooncloth Circlet | Rare, item level 62, requires 57: 23 Intellect, 15 Spirit, 13 Stamina (value 35.9) | Rare, item level 62, requires 57: 51 healing, 17 one school’s spell damage, 13 Stamina, 15 Spirit (value 38.3) |
| 107 % | 14139 Mooncloth Shoulders | Rare, item level 61, requires 56: 17 Intellect, 11 Spirit, 9 Stamina (value 26.1) | Rare, item level 61, requires 56: 37 healing, 13 one school’s spell damage, 9 Stamina, 11 Spirit (value 27.9) |
| 105 % | 14142 Ghostweave Gloves | Uncommon, item level 54, requires 49: 8 Intellect, 6 mana per 5 sec (value 17.0) | Uncommon, item level 54, requires 49: 9 spell damage and healing, 15 Spirit (value 17.9) |
| 105 % | 18409 Mooncloth Gloves | Rare, item level 62, requires 57: 16 Intellect, 15 Spirit, 9 Stamina (value 28.1) | Rare, item level 62, requires 57: 16 Intellect, 33 healing, 11 one school’s spell damage, 9 Stamina (value 29.5) |
| 104 % | 14137 Mooncloth Leggings | Rare, item level 58, requires 53: 21 Spirit, 14 Intellect, 12 Stamina (value 33.1) | Rare, item level 58, requires 53: 21 Spirit, 31 healing, 11 one school’s spell damage, 12 Stamina (value 34.5) |
| 103 % | 10010 Stormcloth Pants | Uncommon, item level 44, requires 39: 15 Spirit, 10 one school’s spell damage (value 17.9) | Uncommon, item level 44, requires 39: 15 Spirit, 15 healing, 5 one school’s spell damage (value 18.4) |
| 103 % | 15802 Mooncloth Boots | Rare, item level 56, requires 51: 14 Intellect, 13 Spirit, 11 Stamina (value 26.4) | Rare, item level 56, requires 51: 14 Intellect, 13 Spirit, 24 healing, 8 one school’s spell damage (value 27.2) |
| 102 % | 18486 Mooncloth Robe | Rare, item level 61, requires 56: 25 Intellect, 12 Spirit, 12 Stamina (value 35.1) | Rare, item level 61, requires 56: 25 Intellect, 26 healing, 9 one school’s spell damage, 12 Stamina (value 36.0) |
| 102 % | 14138 Mooncloth Vest | Rare, item level 60, requires 55: 20 Intellect, 19 Spirit, 12 Stamina (value 35.8) | Rare, item level 60, requires 55: 20 Intellect, 26 healing, 9 one school’s spell damage, 19 Spirit (value 36.6) |
| 102 % | 20539 Runed Stygian Belt | Rare, item level 63, requires 58: 10 Stamina, 20 resistance, 3 mana per 5 sec (value 26.2) | Rare, item level 63, requires 58: 10 Stamina, 20 resistance, 11 one school’s spell damage (value 26.6) |
| 102 % | 20537 Runed Stygian Boots | Rare, item level 63, requires 58: 8 Stamina, 20 resistance, 4 mana per 5 sec (value 26.2) | Rare, item level 63, requires 58: 8 Stamina, 20 resistance, 14 one school’s spell damage (value 26.6) |
| 101 % | 14146 Gloves of Spell Mastery | Epic, item level 62, requires 57: 10 Intellect, 8 Spirit, 2 spell critical % (value 31.6) | Epic, item level 62, requires 57: 10 Intellect, 9 spell damage and healing, 2 melee critical % (value 32.0) |
| 101 % | 20538 Runed Stygian Leggings | Rare, item level 63, requires 58: 13 Stamina, 25 resistance, 6 mana per 5 sec (value 35.8) | Rare, item level 63, requires 58: 13 Stamina, 25 resistance, 20 one school’s spell damage (value 36.0) |
| 100 % | 7063 Crimson Silk Robe | Uncommon, item level 41, requires 36: 15 Intellect, 6 Spirit (value 17.4) | Uncommon, item level 41, requires 36: 15 Intellect, 9 one school’s spell damage (value 17.5) |
| 100 % | 18405 Belt of the Archmage | Epic, item level 62, requires 57: 25 Intellect, 10 Stamina, 1 spell critical % (value 34.2) | Epic, item level 62, requires 57: 16 Intellect, 10 Stamina, 20 spell damage and healing, 1 melee critical % (value 34.2) |
| 100 % | 7052 Azure Silk Belt | Uncommon, item level 35, requires 30: 5 Intellect (value 5.0) | Uncommon, item level 35, requires 30: 5 Stamina (value 5.0) |
| 100 % | 18413 Cloak of Warding | Rare, item level 62, requires 57: 5 defense (value 7.3) | Rare, item level 62, requires 57: 170 bonus armor, 5 defense (value 7.3) |
| 99 % | 6264 Greater Adept's Robe | Uncommon, item level 23, requires 18: 1 Stamina, 2 Intellect, 7 Spirit (value 7.9) | Uncommon, item level 23, requires 18: 1 spell damage and healing, 2 Intellect, 7 Spirit (value 7.9) |
| 98 % | 4327 Icy Cloak | Rare, item level 40, requires 35: 6 Spirit, 11 resistance (value 13.5) | Rare, item level 40, requires 35: 6 Spirit, 8 resistance, 7 spell damage and healing (value 13.3) |
| 98 % | 22758 Sylvan Shoulders | Rare, item level 70, requires 60: 18 Stamina, 20 resistance, 7 spell damage and healing, 7 healing (value 31.8) | Rare, item level 70, requires 60: 18 Stamina, 20 resistance, 7 spell damage and healing (value 31.2) |
| 98 % | 19056 Argent Boots | Rare, item level 58, requires 53: 21 Stamina, 7 Spirit, 4 resistance (value 24.7) | Rare, item level 58, requires 53: 21 Stamina, 8 spell damage and healing, 4 resistance (value 24.1) |
| 98 % | 19050 Mantle of the Timbermaw | Rare, item level 64, requires 59: 21 Intellect, 6 mana per 5 sec (value 27.4) | Rare, item level 61, requires 56: 13 Intellect, 17 spell damage and healing, 1 melee critical % (value 26.8) |
| 97 % | 13864 Runecloth Boots | Uncommon, item level 56, requires 51: 14 Spirit, 9 Intellect (value 18.5) | Uncommon, item level 56, requires 51: 14 Spirit, 11 spell damage and healing (value 18.0) |
| 97 % | 22756 Sylvan Vest | Rare, item level 70, requires 60: 15 Stamina, 30 resistance, 12 spell damage and healing, 12 healing (value 40.0) | Rare, item level 70, requires 60: 15 Stamina, 30 resistance, 12 spell damage and healing (value 38.9) |
| 97 % | 22654 Glacial Gloves | Epic, item level 80, requires 60: 22 Stamina, 30 resistance, 15 spell damage and healing, 15 healing (value 46.1) | Epic, item level 80, requires 60: 22 Stamina, 30 resistance, 15 spell damage and healing (value 44.7) |
| 97 % | 10011 Stormcloth Gloves | Uncommon, item level 44, requires 39: 16 spell damage and healing, 16 healing (value 15.0) | Uncommon, item level 44, requires 39: 12 Intellect, 11 healing, 4 one school’s spell damage (value 14.5) |
| 97 % | 22655 Glacial Wrists | Epic, item level 80, requires 60: 20 Stamina, 20 resistance, 12 spell damage and healing, 12 healing (value 35.7) | Epic, item level 80, requires 60: 20 Stamina, 20 resistance, 12 spell damage and healing (value 34.5) |
| 97 % | 13867 Runecloth Shoulders | Uncommon, item level 61, requires 56: 15 Intellect, 10 Spirit (value 20.0) | Uncommon, item level 61, requires 56: 15 Intellect, 12 spell damage and healing (value 19.4) |
| 96 % | 22652 Glacial Vest | Epic, item level 80, requires 60: 26 Stamina, 40 resistance, 21 spell damage and healing, 21 healing (value 59.8) | Epic, item level 80, requires 60: 26 Stamina, 40 resistance, 21 spell damage and healing (value 57.7) |
| 96 % | 13865 Runecloth Pants | Uncommon, item level 57, requires 52: 20 Spirit, 12 Intellect (value 25.8) | Uncommon, item level 57, requires 52: 20 Spirit, 14 spell damage and healing (value 24.8) |
| 96 % | 13866 Runecloth Headband | Uncommon, item level 59, requires 54: 20 Intellect, 13 Spirit (value 26.5) | Uncommon, item level 59, requires 54: 20 Intellect, 15 spell damage and healing (value 25.3) |
| 95 % | 22757 Sylvan Crown | Rare, item level 70, requires 60: 10 Stamina, 30 resistance, 18 spell damage and healing, 18 healing (value 40.6) | Rare, item level 70, requires 60: 10 Stamina, 30 resistance, 18 spell damage and healing (value 38.5) |
| 95 % | 4321 Spider Silk Slippers | Uncommon, item level 28, requires 23: 7 Spirit, 3 Agility (value 8.3) | Uncommon, item level 28, requires 23: 7 Spirit, 3 spell damage and healing (value 7.8) |
| 95 % | 19156 Flarecore Robe | Epic, item level 66, requires 60: 35 Stamina, 15 resistance, 23 spell damage and healing, 23 healing (value 50.9) | Epic, item level 66, requires 60: 35 Stamina, 15 resistance, 23 spell damage and healing (value 48.2) |
| 94 % | 4316 Heavy Woolen Pants | Uncommon, item level 22, requires 17: 6 Spirit, 3 Intellect (value 7.3) | Uncommon, item level 22, requires 17: 6 Spirit, 3 spell damage and healing (value 6.9) |
| 93 % | 9999 Black Mageweave Leggings | Uncommon, item level 41, requires 36: 14 Spirit, 8 Intellect (value 17.8) | Uncommon, item level 41, requires 36: 14 Spirit, 8 spell damage and healing (value 16.5) |
| 93 % | 19682 Bloodvine Vest | Rare, item level 65, requires 60: 13 Intellect, 2 spell hit %, 27 spell damage and healing, 27 healing (value 38.9) | Rare, item level 65, requires 60: 13 Intellect, 2 melee hit %, 27 spell damage and healing (value 36.0) |
| 93 % | 19684 Bloodvine Boots | Rare, item level 65, requires 60: 16 Intellect, 1 spell hit %, 19 spell damage and healing, 19 healing (value 29.9) | Rare, item level 65, requires 60: 16 Intellect, 1 melee hit %, 19 spell damage and healing (value 27.7) |
| 92 % | 4322 Enchanter's Cowl | Uncommon, item level 33, requires 28: 10 Intellect, 6 Spirit (value 12.9) | Uncommon, item level 33, requires 28: 10 Intellect, 6 spell damage and healing (value 11.9) |
| 92 % | 4325 Boots of the Enchanter | Uncommon, item level 35, requires 30: 8 Spirit, 5 Intellect (value 10.5) | Uncommon, item level 35, requires 30: 8 Spirit, 5 spell damage and healing (value 9.6) |
| 92 % | 5766 Lesser Wizard's Robe | Uncommon, item level 27, requires 22: 8 Intellect, 5 Spirit (value 10.5) | Uncommon, item level 27, requires 22: 8 Intellect, 5 spell damage and healing (value 9.6) |
| 92 % | 2583 Woolen Boots | Uncommon, item level 19, requires 14: 2 Intellect, 2 Spirit, 2 Agility (value 4.2) | Uncommon, item level 19, requires 14: 2 Intellect, 2 Spirit, 2 spell damage and healing (value 3.8) |
| 92 % | 13863 Runecloth Gloves | Uncommon, item level 55, requires 50: 9 Spirit, 9 Intellect, 12 spell damage and healing, 12 healing (value 20.4) | Uncommon, item level 55, requires 50: 9 Spirit, 9 Intellect, 12 spell damage and healing (value 18.7) |
| 92 % | 13858 Runecloth Robe | Uncommon, item level 52, requires 47: 17 Intellect, 11 Spirit (value 22.5) | Uncommon, item level 52, requires 47: 17 Intellect, 11 spell damage and healing (value 20.7) |
| 92 % | 7054 Robe of Power | Rare, item level 38, requires 33: 12 Intellect, 8 Spirit, 14 spell damage and healing, 14 healing (value 23.2) | Rare, item level 38, requires 33: 12 Intellect, 8 Spirit, 14 spell damage and healing (value 21.3) |
| 92 % | 13856 Runecloth Belt | Uncommon, item level 51, requires 46: 12 Intellect, 8 Spirit (value 16.0) | Uncommon, item level 51, requires 46: 12 Intellect, 8 spell damage and healing (value 14.7) |
| 91 % | 10021 Dreamweave Vest | Rare, item level 45, requires 40: 14 Spirit, 9 Intellect, 18 spell damage and healing, 18 healing (value 28.1) | Rare, item level 45, requires 40: 14 Spirit, 9 Intellect, 18 spell damage and healing (value 25.6) |
| 90 % | 10018 Red Mageweave Gloves | Uncommon, item level 45, requires 40: 10 Intellect, 11 spell damage and healing, 11 healing (value 16.1) | Uncommon, item level 45, requires 40: 10 Intellect, 11 spell damage and healing (value 14.5) |
| 90 % | 2585 Gray Woolen Robe | Uncommon, item level 21, requires 16: 5 Intellect, 4 Stamina (value 7.2) | Uncommon, item level 21, requires 16: 5 Intellect, 4 spell damage and healing (value 6.5) |
| 90 % | 10009 Red Mageweave Pants | Uncommon, item level 43, requires 38: 12 Intellect, 14 spell damage and healing, 14 healing (value 20.0) | Uncommon, item level 43, requires 38: 12 Intellect, 14 spell damage and healing (value 17.9) |
| 89 % | 7055 Crimson Silk Belt | Uncommon, item level 35, requires 30: 7 Intellect, 6 Spirit (value 10.3) | Uncommon, item level 35, requires 30: 7 Intellect, 6 spell damage and healing (value 9.2) |
| 89 % | 10041 Dreamweave Circlet | Rare, item level 50, requires 45: 12 Spirit, 10 Intellect, 21 spell damage and healing, 21 healing (value 29.6) | Rare, item level 50, requires 45: 12 Spirit, 10 Intellect, 21 spell damage and healing (value 26.4) |
| 89 % | 9998 Black Mageweave Vest | Uncommon, item level 41, requires 36: 12 Spirit, 11 Intellect (value 18.3) | Uncommon, item level 41, requires 36: 12 Spirit, 11 spell damage and healing (value 16.2) |
| 88 % | 2578 Barbaric Linen Vest | Uncommon, item level 14, requires 9: 2 Stamina, 2 Spirit (value 3.2) | Uncommon, item level 14, requires 9: 2 Stamina, 2 spell damage and healing (value 2.8) |
| 88 % | 4309 Handstitched Linen Britches | Uncommon, item level 14, requires 9: 2 Spirit, 2 Intellect (value 3.2) | Uncommon, item level 14, requires 9: 2 spell damage and healing, 2 Intellect (value 2.8) |
| 88 % | 4310 Heavy Woolen Gloves | Uncommon, item level 17, requires 12: 2 Intellect, 2 Spirit (value 3.2) | Uncommon, item level 17, requires 12: 2 Intellect, 2 spell damage and healing (value 2.8) |
| 88 % | 4312 Soft-soled Linen Boots | Uncommon, item level 16, requires 11: 2 Stamina, 2 Intellect (value 3.2) | Uncommon, item level 16, requires 11: 2 Stamina, 2 spell damage and healing (value 2.8) |
| 88 % | 10048 Colorful Kilt | Uncommon, item level 24, requires 14: 5 Agility, 5 Spirit (value 7.9) | Uncommon, item level 19, requires 14: 5 spell damage and healing, 5 Spirit (value 7.0) |
| 88 % | 19165 Flarecore Leggings | Epic, item level 70, requires 60: 21 Stamina, 16 resistance, 43 spell damage and healing, 43 healing (value 55.6) | Epic, item level 70, requires 60: 21 Stamina, 16 resistance, 43 spell damage and healing (value 48.9) |
| 87 % | 10024 Black Mageweave Headband | Uncommon, item level 46, requires 41: 13 Spirit, 12 Intellect (value 19.9) | Uncommon, item level 46, requires 41: 13 spell damage and healing, 12 Intellect (value 17.3) |
| 87 % | 4320 Spidersilk Boots | Rare, item level 25, requires 20: 7 Spirit, 4 Intellect, 4 Stamina (value 10.6) | Rare, item level 25, requires 20: 7 spell damage and healing, 4 Intellect, 4 Stamina (value 9.2) |
| 87 % | 10027 Black Mageweave Shoulders | Uncommon, item level 46, requires 41: 10 Spirit, 9 Intellect (value 15.1) | Uncommon, item level 46, requires 41: 10 spell damage and healing, 9 Intellect (value 13.1) |
| 87 % | 13860 Runecloth Cloak | Uncommon, item level 53, requires 48: 9 Spirit, 8 Intellect (value 13.5) | Uncommon, item level 53, requires 48: 9 spell damage and healing, 8 Intellect (value 11.7) |
| 87 % | 5770 Robes of Arcana | Uncommon, item level 30, requires 25: 8 Intellect, 7 Spirit (value 11.9) | Uncommon, item level 30, requires 25: 8 spell damage and healing, 7 Spirit (value 10.3) |
| 87 % | 7061 Earthen Silk Belt | Uncommon, item level 39, requires 34: 8 Spirit, 8 Stamina (value 12.7) | Uncommon, item level 39, requires 34: 8 Spirit, 8 healing, 6 one school’s spell damage (value 11.0) |
| 86 % | 4326 Long Silken Cloak | Uncommon, item level 37, requires 32: 6 Spirit, 5 Intellect (value 8.7) | Uncommon, item level 37, requires 32: 6 spell damage and healing, 5 Intellect (value 7.6) |
| 86 % | 14152 Robe of the Archmage | Epic, item level 62, requires 57: 12 Intellect, 40 spell damage and healing, 40 healing, 1 spell critical %; Use or proc: Replenish Mana (value 46.3) | Epic, item level 62, requires 57: 12 Intellect, 40 spell damage and healing, 1 melee critical %; Use or proc: Replenish Mana (value 40.0) |
| 86 % | 10019 Dreamweave Gloves | Rare, item level 45, requires 40: 7 Spirit, 4 Intellect, 18 spell damage and healing, 18 healing (value 21.0) | Rare, item level 45, requires 40: 7 Spirit, 4 Intellect, 18 spell damage and healing (value 18.0) |
| 85 % | 14153 Robe of the Void | Epic, item level 62, requires 57: 14 Stamina, 46 spell damage and healing, 46 healing; Use or proc: Heal Pet (value 48.4) | Epic, item level 62, requires 57: 10 Stamina, 9 Intellect, 46 spell damage and healing; Use or proc: Heal Pet (value 41.0) |
| 84 % | 19683 Bloodvine Leggings | Rare, item level 65, requires 60: 6 Intellect, 1 spell hit %, 37 spell damage and healing, 37 healing (value 39.0) | Rare, item level 65, requires 60: 6 Intellect, 1 melee hit %, 37 spell damage and healing (value 32.9) |
| 84 % | 13857 Runecloth Tunic | Uncommon, item level 52, requires 47: 17 Spirit, 11 Intellect (value 22.5) | Uncommon, item level 52, requires 47: 17 spell damage and healing, 11 Intellect (value 18.9) |
| 84 % | 19059 Argent Shoulders | Rare, item level 64, requires 59: 23 Stamina, 8 Spirit, 5 resistance (value 27.4) | Rare, item level 61, requires 56: 25 spell damage and healing, 7 Spirit, 5 resistance (value 23.1) |
| 84 % | 10026 Black Mageweave Boots | Uncommon, item level 46, requires 41: 11 Spirit, 7 Intellect (value 14.5) | Uncommon, item level 46, requires 41: 11 spell damage and healing, 7 Intellect (value 12.1) |
| 83 % | 4329 Star Belt | Uncommon, item level 40, requires 35: 4 Spirit, 13 spell damage and healing, 13 healing (value 13.7) | Uncommon, item level 40, requires 35: 4 Spirit, 13 spell damage and healing (value 11.4) |
| 80 % | 10003 Black Mageweave Gloves | Uncommon, item level 43, requires 38: 15 spell damage and healing, 15 healing (value 14.1) | Uncommon, item level 43, requires 38: 15 spell damage and healing (value 11.3) |
| 75 % | 6243 Green Woolen Robe | Uncommon, item level 18, requires 13: 3 Intellect, 3 Spirit, 2 Stamina (value 5.6) | Uncommon, item level 18, requires 13: 3 Intellect, 3 spell damage and healing (value 4.2) |
| 71 % | 14143 Ghostweave Belt | Uncommon, item level 53, requires 48: 8 Intellect, 6 mana per 5 sec (value 17.0) | Uncommon, item level 53, requires 48: 8 spell damage and healing, 9 Spirit (value 12.0) |
| — | 2569 Linen Boots | Common, item level 13, requires 8: — (value 0.0) | Uncommon, item level 13, requires 8: 2 Stamina (value 2.0) |
| — | 2580 Reinforced Linen Cape | Common, item level 12, requires 7: — (value 0.0) | Uncommon, item level 12, requires 7: 1 spell damage and healing (value 0.8) |
| — | 2582 Green Woolen Vest | Common, item level 17, requires 12: — (value 0.0) | Uncommon, item level 17, requires 12: 4 spell damage and healing, 4 Spirit (value 5.6) |
| — | 2584 Woolen Cape | Common, item level 16, requires 11: — (value 0.0) | Uncommon, item level 16, requires 11: 1 spell damage and healing, 1 Spirit (value 1.4) |
| — | 4307 Heavy Linen Gloves | Common, item level 10, requires 5: — (value 0.0) | Uncommon, item level 10, requires 5: 1 spell damage and healing (value 0.8) |
| — | 4308 Green Linen Bracers | Common, item level 12, requires 7: — (value 0.0) | Uncommon, item level 12, requires 7: 1 Spirit (value 1.0) |
| — | 4314 Double-Stitched Woolen Shoulders | Common, item level 22, requires 17: — (value 0.0) | Uncommon, item level 22, requires 17: 4 spell damage and healing, 4 Stamina (value 5.6) |
| — | 4315 Reinforced Woolen Shoulders | Common, item level 24, requires 19: — (value 0.0) | Uncommon, item level 24, requires 19: 4 Intellect, 5 spell damage and healing (value 6.2) |
| — | 4343 Brown Linen Pants | Common, item level 10, requires 5: — (value 0.0) | Uncommon, item level 10, requires 5: 1 spell damage and healing (value 0.8) |
| — | 6787 White Woolen Dress | Common, item level 22, requires 17: — (value 0.0) | Uncommon, item level 22, requires 17: 4 Spirit, 5 Stamina (value 7.2) |
| — | 7048 Azure Silk Hood | Common, item level 29, requires 24: — (value 0.0) | Uncommon, item level 29, requires 24: 10 one school’s spell damage, 8 Stamina (value 11.7) |
| — | 7050 Silk Headband | Common, item level 32, requires 27: — (value 0.0) | Uncommon, item level 32, requires 27: 9 spell damage and healing, 8 Stamina (value 11.7) |
| — | 7058 Crimson Silk Vest | Common, item level 37, requires 32: — (value 0.0) | Uncommon, item level 37, requires 32: 10 Intellect, 12 spell damage and healing (value 15.1) |
| — | 7062 Crimson Silk Pantaloons | Common, item level 39, requires 34: — (value 0.0) | Uncommon, item level 39, requires 34: 13 Intellect, 8 spell damage and healing (value 15.6) |
| — | 10047 Simple Kilt | Common, item level 15, requires 10: — (value 0.0) | Uncommon, item level 15, requires 10: 3 Stamina, 2 spell damage and healing (value 3.7) |

### New in Forever (171)

| Item | Quality, item level, requires | Stats and effects | Value / 1.12’s budget | Recipe yellow |
|---|---|---|---|---|
| 34085 Red Winter Clothes | Common, 1, 0 | — | — | 250 |
| 34087 Green Winter Clothes | Common, 1, 0 | — | — | 250 |
| 239147 Crusader's Knapsack | Rare, 1, 1 | — | — | 260 |
| 239148 Crimson Dawnwoven Bag | Epic, 1, 1 | — | — | 300 |
| 279972 Faction Banner | Common, 4, 0 | Use or proc: Faction Banner | — | 20 |
| 279973 Faction Banner | Common, 4, 0 | Use or proc: Faction Banner | — | 20 |
| 253664 Linen Reagent Bag | Common, 5, 0 | — | — | 30 |
| 277011 Cloudy Stormsewn Cuffs | Uncommon, 10, 5 | 1 Intellect | 1.0 / 0.6 (157 %) | 55 |
| 277013 Cloudy Stormsewn Cord | Uncommon, 10, 5 | 1 Stamina | 1.0 / 0.9 (118 %) | 55 |
| 277035 Azure Stormsewn Cuffs | Uncommon, 10, 5 | 1 Intellect | 1.0 / 0.6 (157 %) | 55 |
| 277037 Azure Stormsewn Cord | Uncommon, 10, 5 | 1 Stamina | 1.0 / 0.9 (118 %) | 55 |
| 277012 Cloudy Stormsewn Handwraps | Uncommon, 11, 6 | 1 Spirit | 1.0 / 1.2 (80 %) | 60 |
| 277015 Cloudy Stormsewn Shoes | Uncommon, 11, 6 | 1 Spirit | 1.0 / 1.2 (81 %) | 60 |
| 277036 Azure Stormsewn Handwraps | Uncommon, 11, 6 | 1 Spirit | 1.0 / 1.2 (80 %) | 60 |
| 277039 Azure Stormsewn Shoes | Uncommon, 11, 6 | 1 Spirit | 1.0 / 1.2 (81 %) | 60 |
| 277010 Cloudy Stormsewn Vest | Uncommon, 12, 7 | 2 Intellect | 2.0 / 2.1 (94 %) | 65 |
| 277014 Cloudy Stormsewn Leggings | Uncommon, 12, 7 | 2 Stamina | 2.0 / 2.1 (93 %) | 65 |
| 277034 Azure Stormsewn Vest | Uncommon, 12, 7 | 2 Intellect | 2.0 / 2.1 (94 %) | 65 |
| 277038 Azure Stormsewn Leggings | Uncommon, 12, 7 | 2 Stamina | 2.0 / 2.1 (93 %) | 65 |
| 253667 Woolen Reagent Bag | Common, 15, 0 | — | — | 75 |
| 253885 Novice Arcanist's Sash | Rare, 15, 10 | 4 spell damage and healing, 3 Intellect, 3 Stamina | 6.2 / 5.6 (111 %) | 55 |
| 253887 Novice Ardent's Sash | Rare, 15, 10 | 6 healing, 2 one school’s spell damage, 3 Intellect, 3 Spirit | 6.3 / 5.6 (111 %) | 55 |
| 253889 Pristine Boots | Rare, 17, 12 | 9 healing, 3 one school’s spell damage, 3 Intellect, 4 Stamina | 8.1 / 6.6 (123 %) | 85 |
| 253891 Silky Boots | Rare, 17, 12 | 3 Intellect, 4 Stamina, 6 one school’s spell damage | 7.7 / 6.6 (117 %) | 85 |
| 253893 Flame Boots | Rare, 17, 12 | 3 Intellect, 4 Stamina, 6 one school’s spell damage | 7.7 / 6.6 (117 %) | 85 |
| 253895 Shadow Boots | Rare, 17, 12 | 3 Intellect, 4 Stamina, 6 one school’s spell damage | 7.7 / 6.6 (117 %) | 85 |
| 253897 Pearly Boots | Rare, 17, 12 | 3 Intellect, 4 Stamina, 6 one school’s spell damage | 7.7 / 6.6 (117 %) | 85 |
| 253899 Shining Boots | Rare, 17, 12 | 3 Intellect, 4 Stamina, 6 one school’s spell damage | 7.7 / 6.6 (117 %) | 85 |
| 253901 Filigreed Pristine Gown | Rare, 20, 15 | 13 healing, 5 one school’s spell damage, 5 Intellect, 4 Stamina, 3 Spirit | 12.2 / 10.4 (117 %) | 80 |
| 253903 Filigreed Silky Gown | Rare, 20, 15 | 5 Intellect, 4 Stamina, 3 Spirit, 9 one school’s spell damage | 11.5 / 10.4 (111 %) | 80 |
| 253905 Filigreed Flame Gown | Rare, 20, 15 | 5 Intellect, 4 Stamina, 3 Spirit, 9 one school’s spell damage | 11.5 / 10.4 (111 %) | 80 |
| 253907 Filigreed Shadow Gown | Rare, 20, 15 | 5 Intellect, 4 Stamina, 3 Spirit, 9 one school’s spell damage | 11.5 / 10.4 (111 %) | 80 |
| 253909 Filigreed Pearly Gown | Rare, 20, 15 | 5 Intellect, 4 Stamina, 3 Spirit, 9 one school’s spell damage | 11.5 / 10.4 (111 %) | 80 |
| 253911 Filigreed Shining Gown | Rare, 20, 15 | 5 Intellect, 4 Stamina, 3 Spirit, 9 one school’s spell damage | 11.5 / 10.4 (111 %) | 80 |
| 253913 Pristine Gloves | Rare, 20, 15 | 11 healing, 4 one school’s spell damage, 3 Intellect, 4 Stamina | 9.0 / 8.0 (112 %) | 100 |
| 253915 Silky Gloves | Rare, 20, 15 | 3 Intellect, 4 Stamina, 7 one school’s spell damage | 8.2 / 8.0 (102 %) | 100 |
| 253917 Flame Gloves | Rare, 20, 15 | 3 Intellect, 4 Stamina, 7 one school’s spell damage | 8.2 / 8.0 (102 %) | 100 |
| 253919 Shadow Gloves | Rare, 20, 15 | 3 Intellect, 4 Stamina, 7 one school’s spell damage | 8.2 / 8.0 (102 %) | 100 |
| 253921 Pearly Gloves | Rare, 20, 15 | 3 Intellect, 4 Stamina, 7 one school’s spell damage | 8.2 / 8.0 (102 %) | 100 |
| 253923 Shining Gloves | Rare, 20, 15 | 3 Intellect, 4 Stamina, 7 one school’s spell damage | 8.2 / 8.0 (102 %) | 100 |
| 253925 Pristine Sash | Rare, 22, 17 | 11 healing, 4 one school’s spell damage, 4 Intellect, 5 Stamina | 10.3 / 8.8 (117 %) | 110 |
| 253927 Silky Sash | Rare, 22, 17 | 4 Intellect, 5 Stamina, 7 one school’s spell damage | 9.5 / 8.8 (108 %) | 110 |
| 253929 Flame Sash | Rare, 22, 17 | 4 Intellect, 5 Stamina, 7 one school’s spell damage | 9.5 / 8.8 (108 %) | 110 |
| 253931 Shadow Sash | Rare, 22, 17 | 4 Intellect, 5 Stamina, 7 one school’s spell damage | 9.5 / 8.8 (108 %) | 110 |
| 253933 Pearly Sash | Rare, 22, 17 | 4 Intellect, 5 Stamina, 7 one school’s spell damage | 9.5 / 8.8 (108 %) | 110 |
| 253935 Shining Sash | Rare, 22, 17 | 4 Intellect, 5 Stamina, 7 one school’s spell damage | 9.5 / 8.8 (108 %) | 110 |
| 253937 Filigreed Pristine Leggings | Rare, 25, 20 | 18 healing, 6 one school’s spell damage, 6 Intellect, 5 Stamina, 4 Spirit | 15.6 / 13.5 (116 %) | 105 |
| 253939 Filigreed Silky Leggings | Rare, 25, 20 | 6 Intellect, 5 Stamina, 4 Spirit, 11 one school’s spell damage | 14.3 / 13.5 (106 %) | 105 |
| 253941 Filigreed Flame Leggings | Rare, 25, 20 | 6 Intellect, 5 Stamina, 4 Spirit, 11 one school’s spell damage | 14.3 / 13.5 (106 %) | 105 |
| 253943 Filigreed Shadow Leggings | Rare, 25, 20 | 6 Intellect, 5 Stamina, 4 Spirit, 11 one school’s spell damage | 14.3 / 13.5 (106 %) | 105 |
| 253945 Filigreed Pearly Leggings | Rare, 25, 20 | 6 Intellect, 5 Stamina, 4 Spirit, 11 one school’s spell damage | 14.3 / 13.5 (106 %) | 105 |
| 253947 Filigreed Shining Leggings | Rare, 25, 20 | 6 Intellect, 5 Stamina, 4 Spirit, 11 one school’s spell damage | 14.3 / 13.5 (106 %) | 105 |
| 253949 Pristine Circlet | Rare, 25, 20 | 18 healing, 6 one school’s spell damage, 10 Stamina | 15.2 / 14.1 (108 %) | 125 |
| 253951 Silky Circlet | Rare, 25, 20 | 10 Stamina, 11 one school’s spell damage | 13.9 / 14.1 (98 %) | 125 |
| 253953 Flame Circlet | Rare, 25, 20 | 10 Stamina, 11 one school’s spell damage | 13.9 / 14.1 (98 %) | 125 |
| 253955 Shadow Circlet | Rare, 25, 20 | 10 Stamina, 11 one school’s spell damage | 13.9 / 14.1 (98 %) | 125 |
| 253957 Pearly Circlet | Rare, 25, 20 | 10 Stamina, 11 one school’s spell damage | 13.9 / 14.1 (98 %) | 125 |
| 253959 Shining Circlet | Rare, 25, 20 | 10 Stamina, 11 one school’s spell damage | 13.9 / 14.1 (98 %) | 125 |
| 253973 Silk Reagent Bag | Common, 25, 0 | — | — | 135 |
| 253961 Pristine Gown | Rare, 27, 22 | 20 healing, 7 one school’s spell damage, 7 Intellect, 6 Stamina, 4 Spirit | 17.7 / 14.6 (121 %) | 130 |
| 253963 Silky Gown | Rare, 27, 22 | 7 Intellect, 6 Stamina, 4 Spirit, 13 one school’s spell damage | 16.5 / 14.6 (113 %) | 130 |
| 253965 Flame Gown | Rare, 27, 22 | 7 Intellect, 6 Stamina, 4 Spirit, 13 one school’s spell damage | 16.5 / 14.6 (113 %) | 130 |
| 253967 Shadow Gown | Rare, 27, 22 | 7 Intellect, 6 Stamina, 4 Spirit, 13 one school’s spell damage | 16.5 / 14.6 (113 %) | 130 |
| 253969 Pearly Gown | Rare, 27, 22 | 7 Intellect, 6 Stamina, 4 Spirit, 13 one school’s spell damage | 16.5 / 14.6 (113 %) | 130 |
| 253971 Shining Gown | Rare, 27, 22 | 7 Intellect, 6 Stamina, 4 Spirit, 13 one school’s spell damage | 16.5 / 14.6 (113 %) | 130 |
| 279943 Spinning Wheel | Common, 28, 0 | Use or proc: Spinning Wheel | — | 140 |
| 210781 Phoenix Bindings | Rare, 30, 25 | 13 one school’s spell damage | 8.7 / 9.3 (94 %) | 125 |
| 215365 Invoker's Mantle | Uncommon, 30, 25 | 5 Intellect, 7 spell damage and healing | 8.1 / 8.7 (93 %) | 170 |
| 215366 Invoker's Cord | Uncommon, 30, 25 | 5 Intellect, 7 spell damage and healing | 8.1 / 8.5 (96 %) | 170 |
| 253975 Filigreed Pristine Circlet | Rare, 30, 25 | 22 healing, 8 one school’s spell damage, 12 Stamina | 18.7 / 17.3 (108 %) | 130 |
| 253977 Filigreed Silky Circlet | Rare, 30, 25 | 12 Stamina, 14 one school’s spell damage | 17.1 / 17.3 (99 %) | 130 |
| 253979 Filigreed Flame Circlet | Rare, 30, 25 | 12 Stamina, 14 one school’s spell damage | 17.1 / 17.3 (99 %) | 130 |
| 253981 Filigreed Shadow Circlet | Rare, 30, 25 | 12 Stamina, 14 one school’s spell damage | 17.1 / 17.3 (99 %) | 130 |
| 253983 Filigreed Pearly Circlet | Rare, 30, 25 | 12 Stamina, 14 one school’s spell damage | 17.1 / 17.3 (99 %) | 130 |
| 253985 Filigreed Shining Circlet | Rare, 30, 25 | 12 Stamina, 14 one school’s spell damage | 17.1 / 17.3 (99 %) | 130 |
| 253987 Pristine Leggings | Rare, 30, 25 | 22 healing, 7 one school’s spell damage, 7 Intellect, 7 Stamina, 5 Spirit | 19.3 / 16.5 (117 %) | 145 |
| 253989 Silky Leggings | Rare, 30, 25 | 7 Intellect, 7 Stamina, 5 Spirit, 14 one school’s spell damage | 18.1 / 16.5 (110 %) | 145 |
| 253991 Flame Leggings | Rare, 30, 25 | 7 Intellect, 7 Stamina, 5 Spirit, 14 one school’s spell damage | 18.1 / 16.5 (110 %) | 145 |
| 253993 Shadow Leggings | Rare, 30, 25 | 7 Intellect, 7 Stamina, 5 Spirit, 14 one school’s spell damage | 18.1 / 16.5 (110 %) | 145 |
| 253995 Pearly Leggings | Rare, 30, 25 | 7 Intellect, 7 Stamina, 5 Spirit, 14 one school’s spell damage | 18.1 / 16.5 (110 %) | 145 |
| 253997 Shining Leggings | Rare, 30, 25 | 7 Intellect, 7 Stamina, 5 Spirit, 14 one school’s spell damage | 18.1 / 16.5 (110 %) | 145 |
| 253999 Earthen Leggings | Uncommon, 35, 30 | 15 healing, 5 one school’s spell damage, 11 Spirit | 14.9 / 13.8 (108 %) | 160 |
| 254001 Gilded Slippers | Rare, 35, 30 | 20 healing, 7 one school’s spell damage, 7 Intellect, 6 Stamina, 4 Spirit | 17.7 / 14.8 (120 %) | 145 |
| 254003 Frothing Slippers | Rare, 35, 30 | 7 Intellect, 6 Stamina, 4 Spirit, 13 one school’s spell damage | 16.5 / 14.8 (112 %) | 145 |
| 254005 Fiery Slippers | Rare, 35, 30 | 7 Intellect, 6 Stamina, 4 Spirit, 13 one school’s spell damage | 16.5 / 14.8 (112 %) | 145 |
| 254007 Black Slippers | Rare, 35, 30 | 7 Intellect, 6 Stamina, 4 Spirit, 13 one school’s spell damage | 16.5 / 14.8 (112 %) | 145 |
| 254009 Golden Slippers | Rare, 35, 30 | 7 Intellect, 6 Stamina, 4 Spirit, 13 one school’s spell damage | 16.5 / 14.8 (112 %) | 145 |
| 254011 Radiant Slippers | Rare, 35, 30 | 7 Intellect, 6 Stamina, 4 Spirit, 13 one school’s spell damage | 16.5 / 14.8 (112 %) | 145 |
| 254035 Mageweave Reagent Bag | Common, 35, 0 | — | — | 205 |
| 277046 Cloudy Stormsewn Cowl | Uncommon, 35, 30 | 9 Intellect, 9 Stamina | 14.3 / 14.4 (99 %) | 185 |
| 277047 Cloudy Stormsewn Epaulets | Uncommon, 35, 30 | 7 Spirit, 7 Stamina | 11.1 / 10.7 (104 %) | 185 |
| 277054 Azure Stormsewn Cowl | Uncommon, 35, 30 | 9 Intellect, 9 Stamina | 14.3 / 14.4 (99 %) | 185 |
| 277055 Azure Stormsewn Epaulets | Uncommon, 35, 30 | 7 Spirit, 7 Stamina | 11.1 / 10.7 (104 %) | 185 |
| 254013 Earthen Silk Slippers | Uncommon, 36, 31 | 18 spell damage and healing, 6 one school’s spell damage, 7 Spirit | 18.0 / 10.8 (166 %) | 165 |
| 254015 Earthen Silk Hood | Uncommon, 37, 32 | 22 healing, 8 one school’s spell damage, 10 Spirit | 17.1 / 15.5 (110 %) | 170 |
| 254017 Earthen Silk Gloves | Uncommon, 39, 34 | 18 healing, 6 one school’s spell damage, 8 Spirit | 13.6 / 12.1 (113 %) | 180 |
| 213379 Hyperconductive Arcano-Filament | Rare, 40, 0 | — | — | 200 |
| 254019 Earthen Silk Cuffs | Uncommon, 40, 35 | 10 healing, 4 one school’s spell damage, 5 Spirit | 8.3 / 9.2 (90 %) | 185 |
| 254021 Gilded Handwraps | Rare, 40, 35 | 22 healing, 8 one school’s spell damage, 7 Intellect, 9 Stamina | 19.3 / 17.2 (112 %) | 185 |
| 254023 Frothing Handwraps | Rare, 40, 35 | 7 Intellect, 9 Stamina, 14 one school’s spell damage | 17.7 / 17.2 (103 %) | 185 |
| 254025 Fiery Handwraps | Rare, 40, 35 | 7 Intellect, 9 Stamina, 14 one school’s spell damage | 17.7 / 17.2 (103 %) | 185 |
| 254027 Black Handwraps | Rare, 40, 35 | 7 Intellect, 9 Stamina, 14 one school’s spell damage | 17.7 / 17.2 (103 %) | 185 |
| 254029 Golden Handwraps | Rare, 40, 35 | 7 Intellect, 9 Stamina, 14 one school’s spell damage | 17.7 / 17.2 (103 %) | 185 |
| 254031 Radiant Handwraps | Rare, 40, 35 | 7 Intellect, 9 Stamina, 14 one school’s spell damage | 17.7 / 17.2 (103 %) | 185 |
| 254033 Earthen Silk Shoulders | Uncommon, 41, 36 | 18 healing, 6 one school’s spell damage, 8 Spirit | 13.6 / 13.1 (104 %) | 185 |
| 254037 Gilded Cord | Rare, 45, 40 | 22 healing, 8 one school’s spell damage, 8 Intellect, 8 Stamina, 6 Spirit | 21.4 / 19.2 (111 %) | 195 |
| 254039 Frothing Cord | Rare, 45, 40 | 8 Intellect, 8 Stamina, 6 Spirit, 14 one school’s spell damage | 19.9 / 19.2 (104 %) | 195 |
| 254041 Fiery Cord | Rare, 45, 40 | 8 Intellect, 8 Stamina, 6 Spirit, 14 one school’s spell damage | 19.9 / 19.2 (104 %) | 195 |
| 254043 Black Cord | Rare, 45, 40 | 8 Intellect, 8 Stamina, 6 Spirit, 14 one school’s spell damage | 19.9 / 19.2 (104 %) | 195 |
| 254045 Golden Cord | Rare, 45, 40 | 8 Intellect, 8 Stamina, 6 Spirit, 14 one school’s spell damage | 19.9 / 19.2 (104 %) | 195 |
| 254047 Radiant Cord | Rare, 45, 40 | 8 Intellect, 8 Stamina, 6 Spirit, 14 one school’s spell damage | 19.9 / 19.2 (104 %) | 195 |
| 254049 Nethergeld Shoulders | Rare, 47, 42 | 26 healing, 9 one school’s spell damage, 8 Intellect, 8 Stamina, 6 Spirit | 22.8 / 20.7 (110 %) | 210 |
| 254051 Netherfroth Shoulders | Rare, 47, 42 | 8 Intellect, 8 Stamina, 6 Spirit, 17 one school’s spell damage | 21.3 / 20.7 (103 %) | 210 |
| 254053 Netherflame Shoulders | Rare, 47, 42 | 8 Intellect, 8 Stamina, 6 Spirit, 17 one school’s spell damage | 21.3 / 20.7 (103 %) | 210 |
| 254055 Netherpearl Shoulders | Rare, 47, 42 | 8 Intellect, 8 Stamina, 6 Spirit, 17 one school’s spell damage | 21.3 / 20.7 (103 %) | 210 |
| 254057 Nethershine Shoulders | Rare, 47, 42 | 8 Intellect, 8 Stamina, 6 Spirit, 17 one school’s spell damage | 21.3 / 20.7 (103 %) | 210 |
| 254059 Netherlight Shoulders | Rare, 47, 42 | 8 Intellect, 8 Stamina, 6 Spirit, 17 one school’s spell damage | 21.3 / 20.7 (103 %) | 210 |
| 254061 Nethergeld Cuffs | Rare, 50, 45 | 20 healing, 7 one school’s spell damage, 7 Intellect, 7 Stamina, 5 Spirit | 18.8 / 16.1 (117 %) | 220 |
| 254063 Netherfroth Cuffs | Rare, 50, 45 | 7 Intellect, 7 Stamina, 5 Spirit, 13 one school’s spell damage | 17.6 / 16.1 (110 %) | 220 |
| 254065 Netherflame Cuffs | Rare, 50, 45 | 7 Intellect, 7 Stamina, 5 Spirit, 13 one school’s spell damage | 17.6 / 16.1 (110 %) | 220 |
| 254067 Netherpearl Cuffs | Rare, 50, 45 | 7 Intellect, 7 Stamina, 5 Spirit, 13 one school’s spell damage | 17.6 / 16.1 (110 %) | 220 |
| 254069 Nethershine Cuffs | Rare, 50, 45 | 7 Intellect, 7 Stamina, 5 Spirit, 13 one school’s spell damage | 17.6 / 16.1 (110 %) | 220 |
| 254071 Netherlight Cuffs | Rare, 50, 45 | 7 Intellect, 7 Stamina, 5 Spirit, 13 one school’s spell damage | 17.6 / 16.1 (110 %) | 220 |
| 254073 Ghostweave Cord | Uncommon, 52, 47 | 14 spell damage and healing, 11 Spirit | 17.1 / 16.9 (101 %) | 230 |
| 254075 Earthenweave Gloves | Uncommon, 52, 47 | 26 healing, 9 one school’s spell damage, 11 Spirit | 19.4 / 17.1 (114 %) | 230 |
| 254077 Earthenweave Cord | Uncommon, 52, 47 | 26 healing, 9 one school’s spell damage, 11 Spirit | 19.4 / 16.9 (115 %) | 230 |
| 254079 Runecloth Reagent Bag | Common, 52, 0 | — | — | 230 |
| 254081 Gilded Waistcord | Rare, 52, 47 | 29 healing, 10 one school’s spell damage, 9 Intellect, 12 Stamina | 25.2 / 22.4 (112 %) | 230 |
| 254083 Frothing Waistcord | Rare, 52, 47 | 9 Intellect, 12 Stamina, 19 one school’s spell damage | 23.5 / 22.4 (105 %) | 230 |
| 254085 Fiery Waistcord | Rare, 52, 47 | 9 Intellect, 12 Stamina, 19 one school’s spell damage | 23.5 / 22.4 (105 %) | 230 |
| 254087 Black Waistcord | Rare, 52, 47 | 9 Intellect, 12 Stamina, 19 one school’s spell damage | 23.5 / 22.4 (105 %) | 230 |
| 254089 Golden Waistcord | Rare, 52, 47 | 9 Intellect, 12 Stamina, 19 one school’s spell damage | 23.5 / 22.4 (105 %) | 230 |
| 254091 Radiant Waistcord | Rare, 52, 47 | 9 Intellect, 12 Stamina, 19 one school’s spell damage | 23.5 / 22.4 (105 %) | 230 |
| 254093 Earthenweave Boots | Uncommon, 54, 49 | 26 healing, 9 one school’s spell damage, 11 Spirit | 19.4 / 17.7 (110 %) | 240 |
| 254095 Gilded Gloves | Rare, 55, 50 | 29 healing, 10 one school’s spell damage, 10 Intellect, 9 Stamina, 8 Spirit | 26.8 / 24.0 (112 %) | 240 |
| 254097 Frothing Gloves | Rare, 55, 50 | 10 Intellect, 9 Stamina, 8 Spirit, 19 one school’s spell damage | 25.2 / 24.0 (105 %) | 240 |
| 254099 Fiery Gloves | Rare, 55, 50 | 10 Intellect, 9 Stamina, 8 Spirit, 19 one school’s spell damage | 25.2 / 24.0 (105 %) | 240 |
| 254101 Black Gloves | Rare, 55, 50 | 10 Intellect, 9 Stamina, 8 Spirit, 19 one school’s spell damage | 25.2 / 24.0 (105 %) | 240 |
| 254103 Golden Gloves | Rare, 55, 50 | 10 Intellect, 9 Stamina, 8 Spirit, 19 one school’s spell damage | 25.2 / 24.0 (105 %) | 240 |
| 254105 Radiant Gloves | Rare, 55, 50 | 10 Intellect, 9 Stamina, 8 Spirit, 19 one school’s spell damage | 25.2 / 24.0 (105 %) | 240 |
| 254107 Gilded Sandals | Rare, 55, 50 | 31 healing, 11 one school’s spell damage, 9 Intellect, 13 Stamina | 26.8 / 23.8 (112 %) | 250 |
| 254109 Frothing Sandals | Rare, 55, 50 | 9 Intellect, 13 Stamina, 20 one school’s spell damage | 24.8 / 23.8 (104 %) | 250 |
| 254111 Fiery Sandals | Rare, 55, 50 | 9 Intellect, 13 Stamina, 20 one school’s spell damage | 24.8 / 23.8 (104 %) | 250 |
| 254113 Black Sandals | Rare, 55, 50 | 9 Intellect, 13 Stamina, 20 one school’s spell damage | 24.8 / 23.8 (104 %) | 250 |
| 254115 Golden Sandals | Rare, 55, 50 | 9 Intellect, 13 Stamina, 20 one school’s spell damage | 24.8 / 23.8 (104 %) | 250 |
| 254117 Radiant Sandals | Rare, 55, 50 | 9 Intellect, 13 Stamina, 20 one school’s spell damage | 24.8 / 23.8 (104 %) | 250 |
| 254119 Earthenweave Mantle | Uncommon, 57, 52 | 26 healing, 9 one school’s spell damage, 12 Spirit | 20.2 / 19.4 (104 %) | 255 |
| 254125 Earthenweave Leggings | Uncommon, 58, 53 | 37 healing, 13 one school’s spell damage, 16 Spirit | 28.0 / 25.5 (110 %) | 260 |
| 275604 Venomspew Gloves | Rare, 58, 53 | 19 Stamina, 11 Intellect, 5 resistance | 25.7 / 25.4 (101 %) | 290 |
| 275605 Venomspew Cord | Rare, 58, 53 | 17 Stamina, 14 Intellect, 6 resistance | 26.5 / 25.1 (106 %) | 295 |
| 275606 Venomspew Footpads | Rare, 58, 53 | 8 Spirit, 22 spell damage and healing, 8 resistance | 23.2 / 25.2 (92 %) | 295 |
| 275607 Swarmtender's Gloves | Rare, 58, 53 | 20 Spirit, 7 resistance, 16 healing, 5 one school’s spell damage | 25.6 / 25.4 (101 %) | 290 |
| 275608 Swarmtender's Cord | Rare, 58, 53 | 4 resistance, 21 Stamina, 16 healing, 5 one school’s spell damage | 25.2 / 25.1 (100 %) | 295 |
| 275609 Swarmtender's Footpads | Rare, 58, 53 | 4 resistance, 10 Stamina, 43 healing, 14 one school’s spell damage | 27.1 / 25.2 (107 %) | 295 |
| 254121 Earthenweave Vest | Uncommon, 59, 54 | 40 healing, 14 one school’s spell damage, 17 Spirit | 30.0 / 25.8 (116 %) | 265 |
| 254123 Runecloth Cuffs | Uncommon, 59, 54 | 10 Intellect, 11 spell damage and healing | 14.5 / 14.7 (99 %) | 265 |
| 254127 Ghostweave Mantle | Uncommon, 59, 54 | 15 spell damage and healing, 12 Spirit | 18.5 / 20.1 (92 %) | 265 |
| 227844 Leather-Reinforced Runecloth Bag | Rare, 60, 0 | — | — | 315 |
| 254129 Ghostweave Boots | Uncommon, 60, 55 | 16 spell damage and healing, 13 Spirit | 19.9 / 20.0 (99 %) | 265 |
| 254131 Earthenweave Cuffs | Uncommon, 60, 55 | 22 healing, 8 one school’s spell damage, 10 Spirit | 17.1 / 14.9 (114 %) | 270 |
| 254133 Mooncloth Reagent Bag | Common, 60, 0 | — | — | 270 |
| 279959 Loom | Common, 60, 0 | Use or proc: Loom | — | 300 |
| 254135 Ghostweave Hood | Uncommon, 61, 56 | 21 spell damage and healing, 18 Spirit | 26.8 / 28.2 (95 %) | 275 |
| 254137 Earthenweave Crown | Uncommon, 61, 56 | 40 healing, 14 one school’s spell damage, 18 Spirit | 30.7 / 28.2 (109 %) | 275 |
| 254139 Bottomless Reagent Bag | Common, 62, 0 | — | — | 315 |
| 279266 Robes of Fiery Devastation | Epic, 65, 60 | 27 Stamina, 24 Intellect, 26 one school’s spell damage | 47.8 / 48.3 (99 %) | 310 |
| 279267 Mana-infused Cord | Epic, 65, 60 | 21 Stamina, 18 Spirit, 20 one school’s spell damage | 36.6 / 36.6 (100 %) | 310 |
| 279268 Rime-encrusted Boots | Epic, 65, 60 | 21 Stamina, 18 Spirit, 20 one school’s spell damage | 36.6 / 36.8 (100 %) | 310 |
| 279269 Fel Cape | Epic, 65, 60 | 16 Stamina, 15 one school’s spell damage, 1 melee critical % | 27.3 / 26.3 (104 %) | 310 |
| 279270 Cloak of Earth and Sky | Epic, 65, 60 | 16 Stamina, 15 one school’s spell damage, 15 one school’s spell damage, 15 one school’s spell damage, 14 Spirit | 35.6 / 26.3 (135 %) | 310 |
| 279271 Felblood Soul Bag | Epic, 65, 60 | — | — | 310 |

## Engineering

165 items in both; 23 changed in some way (0 with a higher item level, 1 a better quality). Of the 30 with stats: 1 stronger in Forever, 4 weaker, 25 within 5 %; median change 100 %. 83 new items.

| Change | Item | 1.14.2 | Forever |
|---|---|---|---|
| 148 % | 16007 Flawless Arcanite Rifle | Rare, item level 61, requires 56: 4 profession skill, 10 ranged attack power (value 7.3) | Rare, item level 61, requires 56: 9 Stamina, 10 ranged attack power (value 10.8) |
| 104 % | 19999 Bloodvine Goggles | Rare, item level 65, requires 60: 2 spell hit %, 1 spell critical %, 9 mana per 5 sec (value 34.0) | Rare, item level 65, requires 60: 2 melee hit %, 1 melee critical %, 9 mana per 5 sec (value 35.5) |
| 100 % | 18168 Force Reactive Disk | Epic, item level 65, requires 60: 11 Stamina, 1 proc on hit, 1 proc on hit (value 22.0) | Epic, item level 65, requires 60: 11 Stamina, 80 bonus armor, 1 proc on hit, 1 proc on hit (value 22.0) |
| 85 % | 10542 Goblin Mining Helmet | Uncommon, item level 41, requires 0: 15 Stamina, 5 profession skill (value 17.6) | Uncommon, item level 41, requires 0: 15 Stamina, 5 stat 113 (value 15.0) |
| 80 % | 15999 Spellpower Goggles Xtreme Plus | Uncommon, item level 54, requires 0: 27 spell damage and healing, 27 healing (value 25.4) | Uncommon, item level 54, requires 0: 27 spell damage and healing (value 20.3) |
| 80 % | 10502 Spellpower Goggles Xtreme | Uncommon, item level 43, requires 0: 21 spell damage and healing, 21 healing (value 19.7) | Uncommon, item level 43, requires 0: 21 spell damage and healing (value 15.8) |
| 27 % | 10506 Deepdive Helmet | Uncommon, item level 46, requires 0: 15 Stamina (value 15.0) | Uncommon, item level 46, requires 0: 4 Stamina (value 4.0) |
| — | 4362 Rough Boomstick | Uncommon, item level 10, requires 5: — (value 0.0) | Uncommon, item level 10, requires 5: 1 Stamina (value 1.0) |
| — | 4369 Deadly Blunderbuss | Uncommon, item level 21, requires 16: — (value 0.0) | Uncommon, item level 21, requires 16: 2 Agility (value 2.0) |
| — | 4372 Lovingly Crafted Boomstick | Uncommon, item level 24, requires 19: — (value 0.0) | Uncommon, item level 24, requires 19: 3 Spirit (value 3.0) |
| — | 4379 Silver-plated Shotgun | Uncommon, item level 26, requires 21: — (value 0.0) | Uncommon, item level 26, requires 21: 3 Stamina (value 3.0) |
| — | 4383 Moonsight Rifle | Uncommon, item level 29, requires 24: — (value 0.0) | Uncommon, item level 29, requires 24: 0.3 melee hit % (value 2.7) |
| — | 4401 Mechanical Squirrel Box | Common, item level 15, requires 0: Use or proc: Mechanical Squirrel (value 0.0) | Common, item level 15, requires 0: Use or proc: Learning, Mechanical Squirrel (value 0.0) |
| — | 7506 Gnomish Universal Remote | Uncommon, item level 25, requires 0: Use or proc: Universal Remote (value 0.0) | Uncommon, item level 25, requires 0: 18 stat 132; Use or proc: Universal Remote (value 0.0) |
| — | 10644 Recipe: Goblin Rocket Fuel | Common, item level 42, requires 0: Use or proc: Recipe: Goblin Rocket Fuel (value 0.0) | Common, item level 42, requires 0: Use or proc: Learning, Goblin Rocket Fuel (value 0.0) |
| — | 10713 Plans: Inlaid Mithril Cylinder | Common, item level 40, requires 0: Use or proc: Recipe: Inlaid Mithril Cylinder (value 0.0) | Common, item level 40, requires 0: Use or proc: Learning, Inlaid Mithril Cylinder (value 0.0) |
| — | 11825 Pet Bombling | Common, item level 41, requires 0: Use or proc: Summon Bomb (value 0.0) | Common, item level 41, requires 0: Use or proc: Learning, Summon Bomb (value 0.0) |
| — | 11826 Lil' Smoky | Common, item level 41, requires 0: Use or proc: Summon Robot (value 0.0) | Common, item level 41, requires 0: Use or proc: Learning, Summon Robot (value 0.0) |
| — | 15996 Lifelike Mechanical Toad | Common, item level 53, requires 0: Use or proc: Summon Lifelike Toad (value 0.0) | Common, item level 53, requires 0: Use or proc: Learning, Summon Lifelike Toad (value 0.0) |
| — | 16004 Dark Iron Rifle | Rare, item level 55, requires 50: — (value 0.0) | Rare, item level 55, requires 50: Use or proc: Shadow Shot (value 0.0) |
| — | 17716 Snowmaster 9000 | Common, item level 38, requires 0: Use or proc: SnowMaster 9000 (value 0.0) | Common, item level 38, requires 0: Use or proc: Snowmaster 9000 (value 0.0) |
| — | 21277 Tranquil Mechanical Yeti | Common, item level 60, requires 0: Use or proc: Summon Tranquil Mechanical Yeti (value 0.0) | Common, item level 60, requires 0: Use or proc: Learning, Summon Tranquil Mechanical Yeti (value 0.0) |
| — | 22728 Steam Tonk Controller | Common, item level 55, requires 0: — (value 0.0) | Uncommon, item level 55, requires 0: Use or proc: Steam Tonk Controller (value 0.0) |

### New in Forever (83)

| Item | Quality, item level, requires | Stats and effects | Value / 1.12’s budget | Recipe yellow |
|---|---|---|---|---|
| 21560 Small Purple Rocket | Common, 1, 0 | Use or proc: Small Purple Rocket | — | 125 |
| 21561 Small White Rocket | Common, 1, 0 | Use or proc: Small White Rocket | — | 125 |
| 21562 Small Yellow Rocket | Common, 1, 0 | Use or proc: Small Yellow Rocket | — | 125 |
| 21575 Purple Rocket Cluster | Common, 1, 0 | Use or proc: Purple Firework Cluster | — | 225 |
| 21577 White Rocket Cluster | Common, 1, 0 | Use or proc: White Firework Cluster | — | 225 |
| 21578 Yellow Rocket Cluster | Common, 1, 0 | Use or proc: Yellow Firework Cluster | — | 225 |
| 21591 Large Purple Rocket | Common, 1, 0 | Use or proc: Large Purple Rocket | — | 175 |
| 21593 Large White Rocket | Common, 1, 0 | Use or proc: Large White Rocket | — | 175 |
| 21595 Large Yellow Rocket | Common, 1, 0 | Use or proc: Large Yellow Rocket | — | 175 |
| 21717 Large Purple Rocket Cluster | Common, 1, 0 | Use or proc: Large Purple Firework Cluster | — | 275 |
| 21719 Large White Rocket Cluster | Common, 1, 0 | Use or proc: Large White Firework Cluster | — | 275 |
| 21720 Large Yellow Rocket Cluster | Common, 1, 0 | Use or proc: Large Yellow Firework Cluster | — | 275 |
| 210147 Shredder Autosalvage Unit | Common, 1, 1 | Use or proc: Salvage | — | 135 |
| 211427 Soul Vessel | Rare, 1, 0 | — | — | 205 |
| 237023 Pop-Up Shrub | Common, 1, 10 | Use or proc: Pop-Up Shrub | — | 255 |
| 238734 Tinkerbox: Teleport | Uncommon, 1, 45 | Use or proc: Tinker: Teleport | — | 270 |
| 238735 Tinkerbox: Nitro Boosts | Uncommon, 1, 45 | Use or proc: Tinker: Nitro Boosts | — | 270 |
| 238736 Tinkerbox: Magnetic Displacement | Uncommon, 1, 45 | Use or proc: Tinker: Magnetic Displacement | — | 270 |
| 238737 Tinkerbox | Common, 1, 1 | — | — | 260 |
| 260825 Ultralight Goblin Glider | Uncommon, 1, 0 | Use or proc: Gliding on Air | — | 320 |
| 269900 Centaur Banner Deployment Device | Uncommon, 1, 1 | Use or proc: Deploy Centaur Banner | — | 190 |
| 269902 Hoof-Shaped Foot Pedal | Common, 1, 1 | Use or proc: Hoof-Shaped Foot Pedal | — | 150 |
| 279950 Reagent Bot | Common, 4, 0 | Use or proc: Reagent Bot | — | 20 |
| 260784 SAF-T Tabs | Common, 5, 1 | — | — | 25 |
| 260794 EZ-Thro Wrap | Common, 15, 1 | — | — | 100 |
| 277132 Harvester Override Signalcaster | Uncommon, 15, 0 | Use or proc: Harvester Override Signalcaster | — | 65 |
| 285275 Satchel of Copper Bombs | Uncommon, 18, 13 | 2 Stamina, 100 proc on hit | — | 90 |
| 260793 SAF-T Copper Bomb | Common, 19, 1 | Use or proc: SAF-T Copper Bomb | — | 55 |
| 260792 SAF-T Dynamite | Common, 25, 1 | Use or proc: SAF-T Dynamite | — | 25 |
| 279949 Repair Bot | Common, 28, 0 | Use or proc: Repair Bot | — | 140 |
| 260796 No Slip SAF-T Padding | Common, 29, 1 | — | — | 145 |
| 260795 EZ-Thro Copper Bomb XL | Common, 31, 1 | Use or proc: EZ-Thro Copper Bomb XL | — | 130 |
| 285276 Satchel of Bronze Bombs | Uncommon, 33, 28 | 4 Stamina, 100 proc on hit | — | 170 |
| 260797 SAF-T Bronze Bomb | Common, 34, 1 | Use or proc: SAF-T Bronze Bomb | — | 145 |
| 260798 SAF-T Jumbo Dynamite | Common, 35, 1 | Use or proc: SAF-T Jumbo Dynamite | — | 150 |
| 260799 SAF-T Bell | Common, 35, 1 | — | — | 175 |
| 260800 Shafety Sheep | Common, 35, 1 | Use or proc: Shafety Sheep | — | 200 |
| 280306 Whimsical Waistwrap | Uncommon, 35, 30 | — | — | 180 |
| 280307 Gizmo Girdle | Uncommon, 35, 30 | — | — | 180 |
| 280308 Clanking Cord | Uncommon, 35, 30 | — | — | 180 |
| 260801 EZ-Thro Fireproof Fuse | Common, 39, 1 | — | — | 190 |
| 260802 EZ-Thro Bronze Mortar | Common, 39, 1 | Use or proc: EZ-Thro Bronze Mortar | — | 210 |
| 213383 Polished Truesilver Gears | Rare, 40, 0 | — | — | 200 |
| 260803 EZ-Thro Grenade | Common, 40, 1 | Use or proc: EZ-Thro Grenade | — | 200 |
| 260806 Emergency Field Cloak | Common, 40, 1 | Use or proc: Cloaking | — | 245 |
| 260804 SAF-T Casing | Common, 43, 1 | — | — | 215 |
| 249432 Sandpaper | Uncommon, 45, 0 | — | — | 130 |
| 260807 Compact Critter Carrier | Common, 45, 40 | Use or proc: Compact Critter Carrier | — | 230 |
| 280310 Floppy Goggles | Uncommon, 45, 40 | Use or proc: Longsight | — | 205 |
| 280311 Bent Goggles | Uncommon, 45, 40 | Use or proc: Longsight | — | 205 |
| 280312 Stuckbutton Goggles | Uncommon, 45, 40 | Use or proc: Longsight | — | 205 |
| 280313 Dented Goggles | Uncommon, 45, 40 | Use or proc: Longsight | — | 205 |
| 285277 Satchel of Iron Bombs | Uncommon, 46, 41 | 6 Stamina, 100 proc on hit | — | 235 |
| 260805 SAF-T Bomb | Common, 48, 1 | Use or proc: SAF-T Bomb | — | 215 |
| 260808 EZ-Thro Tru-Trigger | Common, 48, 1 | — | — | 240 |
| 260809 Tru-Trigger Frag Bomb | Common, 48, 1 | Use or proc: Tru-Trigger Frag Bomb | — | 240 |
| 260810 SAF-T Disposable Parachute | Common, 50, 1 | Use or proc: Slow Fall | — | 270 |
| 260811 Gnomish Army Knife | Common, 50, 45 | — | — | 250 |
| 260814 SAF-T Clever Dynamite | Common, 50, 1 | Use or proc: SAF-T Clever Dynamite | — | 275 |
| 284869 Unsanctified Grenade | Common, 52, 0 | Use or proc: Bless Grenade | — | 280 |
| 260812 Loot-A-Rang | Rare, 55, 50 | Use or proc: Loot-A-Rang | — | 275 |
| 260813 SAF-T Tube | Common, 55, 1 | — | — | 275 |
| 260815 EZ-Thro Shell | Common, 57, 1 | — | — | 285 |
| 260816 EZ-Thro Thorium Grenade | Common, 57, 1 | Use or proc: EZ-Thro Thorium Grenade | — | 285 |
| 285278 Satchel of Dark Iron Bombs | Uncommon, 57, 52 | 8 Stamina, 100 proc on hit | — | 290 |
| 260817 EZ-Thro Dark Bomb | Common, 60, 1 | Use or proc: EZ-Thro Dark Bomb | — | 320 |
| 260818 EZ-Thro Mana Bomb | Common, 60, 1 | Use or proc: EZ-Thro Mana Bomb | — | 320 |
| 260819 EZ-Thro Field Transporter: Gadgetzan | Uncommon, 60, 55 | Use or proc: Gnomish Transporter | — | 320 |
| 260820 SAF-T Emergency Ripper: Everlook | Uncommon, 60, 55 | Use or proc: Everlook Transporter | — | 320 |
| 260821 EZ and SAF Field Transporter: Mt. Hyjal | Uncommon, 60, 60 | Use or proc: Mount Hyjal Transporter | — | 320 |
| 260822 Ultrasafe Rechargeable Battery | Uncommon, 60, 60 | Use or proc: Ultrasafe Rechargeable Battery | — | 320 |
| 260823 Dimensional Transporter - Mt. Hyjal | Uncommon, 60, 60 | Use or proc: Mount Hyjal Transporter | — | 320 |
| 260824 Gnomish Poultryizer | Rare, 60, 60 | Use or proc: Poultryizer | — | 320 |
| 260826 Gnomish Weather Machine NYI | Uncommon, 60, 60 | — | — | 320 |
| 260827 Stealthman 52 | Uncommon, 60, 55 | Use or proc: Stealth Field | — | 320 |
| 260828 SAF-T Nitro Boosts | Uncommon, 60, 55 | Use or proc: Tinker: Nitro Boosts | — | 320 |
| 260829 EZ-Thro Magnetic Displacer | Uncommon, 60, 55 | Use or proc: Tinker: Magnetic Displacement | — | 320 |
| 260830 SAF-T Teleport | Uncommon, 60, 55 | Use or proc: Tinker: Teleport | — | 320 |
| 279989 Anarchist's Workbench | Common, 60, 0 | Use or proc: Anarchist's Workbench | — | 300 |
| 274387 Swiftfeather Arrow | Epic, 65, 60 | — | — | 310 |
| 274388 Swiftstrike Shot | Epic, 65, 60 | — | — | 310 |
| 279272 SAF-T Ultra Precision Scope | Rare, 65, 60 | Use or proc: SAF-T Ultra Precision Scope | — | 310 |
| 279273 Hyper Deluxe Sniper Rifle Mk XVII | Epic, 65, 60 | 21 ranged attack power, 8 Stamina, 6 Spirit | 15.8 / 15.3 (104 %) | 310 |

## Cooking

81 items in both; 77 changed; 49 new in Forever; 1 gone.

| Item | 1.14.2 | Forever |
|---|---|---|
| 724 Goretusk Liver Pie | requires 5: Well Fed: +4 Stamina, +4 Spirit; Food: 58 health a tick while eating | requires 5: Food: 58 health a tick while eating; Well Fed: +3 Strength |
| 733 Westfall Stew | requires 5: Food: 115 health a tick while eating | requires 5: Food: 58 health a tick while eating; Well Fed: +15 % run speed |
| 787 Slitherskin Mackerel | requires 1: Food: 17 health a tick while eating | requires 1: Food: 58 health a tick while eating; Well Fed: +6 attack power |
| 1017 Seasoned Wolf Kabob | requires 15: Well Fed: +6 Stamina, +6 Spirit; Food: 115 health a tick while eating | requires 15: Food: 115 health a tick while eating; Well Fed: +5 Agility |
| 1082 Redridge Goulash | requires 10: Well Fed: +6 Stamina, +6 Spirit; Food: 115 health a tick while eating | requires 5: Food: 58 health a tick while eating; Well Fed: +3 Intellect |
| 2679 Charred Wolf Meat | requires 1: Food: 17 health a tick while eating | requires 1: Food: 17 health a tick while eating |
| 2680 Spiced Wolf Meat | requires 1: Well Fed: +2 Stamina, +2 Spirit; Food: 17 health a tick while eating | requires 1: Food: 17 health a tick while eating; Well Fed: +1 Agility |
| 2681 Roasted Boar Meat | requires 1: Food: 17 health a tick while eating | requires 1: Food: 17 health a tick while eating; Well Fed: +1 Strength |
| 2682 Cooked Crab Claw | requires 5: Food: 70 health a tick while eating, 70 mana a tick while drinking | requires 1: Food: 17 health a tick while eating; Well Fed: +1 Intellect |
| 2683 Crab Cake | requires 5: Well Fed: +4 Stamina, +4 Spirit; Food: 58 health a tick while eating | requires 5: Food: 58 health a tick while eating; Well Fed: +3 Intellect |
| 2684 Coyote Steak | requires 5: Well Fed: +4 Stamina, +4 Spirit; Food: 58 health a tick while eating | requires 5: Food: 58 health a tick while eating; Well Fed: +3 Agility |
| 2685 Succulent Pork Ribs | requires 10: Food: 115 health a tick while eating | requires 15: Food: 115 health a tick while eating; Well Fed: +5 Strength |
| 2687 Dry Pork Ribs | requires 5: Well Fed: +4 Stamina, +4 Spirit; Food: 58 health a tick while eating | requires 5: Food: 58 health a tick while eating; Well Fed: +3 Strength |
| 2888 Beer Basted Boar Ribs | requires 1: Well Fed: +2 Stamina, +2 Spirit; Food: 17 health a tick while eating | requires 1: Food: 17 health a tick while eating; Well Fed: +1 Strength |
| 3220 Blood Sausage | requires 5: Well Fed: +4 Stamina, +4 Spirit; Food: 58 health a tick while eating | requires 5: Food: 58 health a tick while eating; Well Fed: +3 Strength |
| 3662 Crocolisk Steak | requires 5: Well Fed: +4 Stamina, +4 Spirit; Food: 58 health a tick while eating | requires 5: Food: 58 health a tick while eating; Well Fed: +3 Agility |
| 3663 Murloc Fin Soup | requires 15: Well Fed: +6 Stamina, +6 Spirit; Food: 115 health a tick while eating | requires 1: Food: 17 health a tick while eating; Well Fed: +1 Stamina |
| 3664 Crocolisk Gumbo | requires 15: Well Fed: +6 Stamina, +6 Spirit; Food: 115 health a tick while eating | requires 15: Food: 115 health a tick while eating; Well Fed: +5 Agility |
| 3665 Curiously Tasty Omelet | requires 15: Well Fed: +6 Stamina, +6 Spirit; Food: 115 health a tick while eating | requires 15: Food: 115 health a tick while eating; Well Fed: +5 Stamina |
| 3666 Gooey Spider Cake | requires 15: Well Fed: +6 Stamina, +6 Spirit; Food: 115 health a tick while eating | requires 15: Food: 115 health a tick while eating; Well Fed: +5 Stamina |
| 3726 Big Bear Steak | requires 15: Well Fed: +6 Stamina, +6 Spirit; Food: 115 health a tick while eating | requires 5: Food: 58 health a tick while eating; Well Fed: +3 Strength |
| 3727 Hot Lion Chops | requires 15: Well Fed: +6 Stamina, +6 Spirit; Food: 115 health a tick while eating | requires 15: Food: 115 health a tick while eating; Well Fed: +5 Agility |
| 3728 Tasty Lion Steak | requires 20: Well Fed: +8 Stamina, +8 Spirit; Food: 162 health a tick while eating | requires 25: Food: 162 health a tick while eating; Well Fed: +10 Agility |
| 3729 Soothing Turtle Bisque | requires 25: Well Fed: +8 Stamina, +8 Spirit; Food: 162 health a tick while eating | requires 15: Food: 115 health a tick while eating; Well Fed: +5 Stamina |
| 4457 Barbecued Buzzard Wing | requires 25: Well Fed: +8 Stamina, +8 Spirit; Food: 162 health a tick while eating | requires 25: Food: 162 health a tick while eating; Well Fed: +10 Intellect |
| 4592 Longjaw Mud Snapper | requires 5: Food: 58 health a tick while eating | requires 5: Food: 115 health a tick while eating; Well Fed: +10 attack power |
| 4593 Bristle Whisker Catfish | requires 15: Food: 115 health a tick while eating | requires 15: Food: 115 health a tick while eating; Well Fed: +8 Intellect |
| 4594 Rockscale Cod | requires 25: Food: 162 health a tick while eating | requires 25: Food: 162 health a tick while eating; Well Fed: +12 Intellect |
| 5095 Rainbow Fin Albacore | requires 5: Food: 58 health a tick while eating | requires 5: Food: 17 health a tick while eating; Well Fed: +1 spell damage and healing |
| 5472 Kaldorei Spider Kabob | requires 1: Well Fed: +2 Stamina, +2 Spirit; Food: 17 health a tick while eating | requires 1: Food: 17 health a tick while eating; Well Fed: +1 Stamina |
| 5473 Scorpid Surprise | requires 1: Scorpid Poison: aura 3/effect 6 10; Food: 70 health a tick while eating | requires 1: Scorpid Poison: aura 3/effect 6 10; Food: 70 health a tick while eating |
| 5474 Roasted Kodo Meat | requires 1: Well Fed: +2 Stamina, +2 Spirit; Food: 17 health a tick while eating | requires 1: Food: 17 health a tick while eating; Well Fed: +1 Stamina |
| 5476 Fillet of Frenzy | requires 5: Well Fed: +4 Stamina, +4 Spirit; Food: 58 health a tick while eating | requires 5: Food: 58 health a tick while eating; Well Fed: +5 Intellect |
| 5477 Strider Stew | requires 5: Well Fed: +4 Stamina, +4 Spirit; Food: 58 health a tick while eating | requires 1: Food: 17 health a tick while eating; Well Fed: +1 Intellect |
| 5478 Dig Rat Stew | requires 10: Food: 115 health a tick while eating | requires 15: Food: 115 health a tick while eating |
| 5479 Crispy Lizard Tail | requires 12: Well Fed: +6 Stamina, +6 Spirit; Food: 115 health a tick while eating | requires 5: Food: 58 health a tick while eating; Well Fed: +3 Stamina |
| 5480 Lean Venison | requires 15: Well Fed: +6 Stamina, +6 Spirit; Food: 115 health a tick while eating | requires 15: Food: 115 health a tick while eating; Well Fed: +5 Strength |
| 5525 Boiled Clams | requires 5: Well Fed: +4 Stamina, +4 Spirit; Food: 58 health a tick while eating | requires 1: Food: 17 health a tick while eating |
| 5526 Clam Chowder | requires 10: Food: 115 health a tick while eating | requires 5: Food: 58 health a tick while eating |
| 6038 Giant Clam Scorcho | requires 25: Well Fed: +8 Stamina, +8 Spirit; Food: 162 health a tick while eating | requires 25: Food: 162 health a tick while eating; Well Fed: +10 Stamina |
| 6290 Brilliant Smallfish | requires 1: Food: 17 health a tick while eating | requires 1: Food: 17 health a tick while eating; Well Fed: +2 attack power |
| 6316 Loch Frenzy Delight | requires 5: Food: 58 health a tick while eating | requires 5: Food: 17 health a tick while eating; Well Fed: +3 Intellect |
| 6657 Savory Deviate Delight | requires 0: — | requires 1: Savory Deviate Delight: aura 56/effect 6 1 |
| 6887 Spotted Yellowtail | requires 35: Food: 232 health a tick while eating | requires 35: Food: 232 health a tick while eating; Well Fed: +22 spell damage and healing |
| 6888 Herb Baked Egg | requires 1: Well Fed: +2 Stamina, +2 Spirit; Food: 17 health a tick while eating | requires 1: Food: 17 health a tick while eating; Well Fed: +1 Stamina |
| 6890 Smoked Bear Meat | requires 5: Food: 58 health a tick while eating | requires 1: Food: 17 health a tick while eating; Well Fed: +1 Strength |
| 8364 Mithril Head Trout | requires 25: Food: 162 health a tick while eating | requires 25: Food: 162 health a tick while eating; Well Fed: +20 attack power |
| 10841 Goldthorn Tea | requires 25: Drink: 249 mana a tick while drinking | requires 25: Drink: 249 mana a tick while drinking; Well Fed: aura 30/effect 6 15 |
| 12209 Lean Wolf Steak | requires 15: Well Fed: +6 Stamina, +6 Spirit; Food: 115 health a tick while eating | requires 15: Food: 115 health a tick while eating; Well Fed: +5 Agility |
| 12210 Roast Raptor | requires 25: Well Fed: +8 Stamina, +8 Spirit; Food: 162 health a tick while eating | requires 15: Food: 115 health a tick while eating; Well Fed: +5 Intellect |
| 12212 Jungle Stew | requires 25: Well Fed: +8 Stamina, +8 Spirit; Food: 162 health a tick while eating | requires 35: Food: 232 health a tick while eating; Well Fed: +15 Agility |
| 12213 Carrion Surprise | requires 25: Well Fed: +8 Stamina, +8 Spirit; Food: 162 health a tick while eating | requires 5: Food: 58 health a tick while eating; Well Fed: +3 Stamina |
| 12214 Mystery Stew | requires 25: Well Fed: +8 Stamina, +8 Spirit; Food: 162 health a tick while eating | requires 15: Food: 115 health a tick while eating; Well Fed: +5 Stamina |
| 12215 Heavy Kodo Stew | requires 35: Well Fed: +12 Stamina, +12 Spirit; Food: 232 health a tick while eating | requires 25: Food: 162 health a tick while eating; Well Fed: +10 Stamina |
| 12216 Spiced Chili Crab | requires 40: Well Fed: +12 Stamina, +12 Spirit; Food: 232 health a tick while eating | requires 25: Food: 162 health a tick while eating; Well Fed: +10 Intellect |
| 12217 Dragonbreath Chili | requires 35: Dragonbreath Chili: aura 0/effect 2 69; Dragonbreath Chili: aura 42/effect 6 0 | requires 25: Dragonbreath Chili: aura 0/effect 2 65; Dragonbreath Chili: aura 42/effect 6 0 |
| 12218 Monster Omelet | requires 40: Well Fed: +12 Stamina, +12 Spirit; Food: 232 health a tick while eating | requires 35: Food: 232 health a tick while eating; Well Fed: +15 Stamina |
| 12224 Crispy Bat Wing | requires 1: Well Fed: +2 Stamina, +2 Spirit; Food: 17 health a tick while eating | requires 1: Food: 17 health a tick while eating; Well Fed: +1 Intellect |
| 13851 Hot Wolf Ribs | requires 25: Well Fed: +8 Stamina, +8 Spirit; Food: 162 health a tick while eating | requires 25: Food: 162 health a tick while eating; Well Fed: +10 Agility |
| 13927 Cooked Glossy Mightfish | requires 35: Increased Stamina: +10 Stamina; Food: 162 health a tick while eating | requires 35: Food: 232 health a tick while eating; Well Fed: +30 attack power |
| 13928 Grilled Squid | requires 35: Increased Agility: +10 Agility; Food: 162 health a tick while eating | requires 35: Food: 358 health a tick while eating; Well Fed: aura 290/effect 6 1 |
| 13929 Hot Smoked Bass | requires 35: Increased Spirit: +10 Spirit; Food: 162 health a tick while eating | requires 35: Food: 358 health a tick while eating; Well Fed: aura 290/effect 6 1 |
| 13930 Filet of Redgill | requires 35: Food: 232 health a tick while eating | requires 35: Food: 232 health a tick while eating; Well Fed: +18 Intellect |
| 13931 Nightfin Soup | requires 35: Mana Regeneration: aura 24/effect 6 8; Food: 162 health a tick while eating | requires 35: Food: 232 health a tick while eating; Well Fed: +22 spell damage and healing |
| 13932 Poached Sunscale Salmon | requires 35: Health Regeneration: aura 8/effect 6 6; Food: 162 health a tick while eating | requires 35: Food: 358 health a tick while eating; Well Fed: +40 attack power |
| 13933 Lobster Stew | requires 45: Food: 358 health a tick while eating | requires 45: Food: 358 health a tick while eating; Well Fed: +28 spell damage and healing |
| 13934 Mightfish Steak | requires 45: Increased Stamina: +10 Stamina; Food: 358 health a tick while eating | requires 45: Food: 358 health a tick while eating; Well Fed: +40 attack power |
| 13935 Baked Salmon | requires 45: Food: 358 health a tick while eating | requires 45: Food: 358 health a tick while eating; Well Fed: +28 spell damage and healing |
| 17197 Gingerbread Cookie | requires 1: Well Fed: +2 Stamina, +2 Spirit; Food: 17 health a tick while eating | requires 1: Well Fed: +2 Stamina, +2 Spirit; Food: 17 health a tick while eating |
| 17222 Spider Sausage | requires 35: Well Fed: +12 Stamina, +12 Spirit; Food: 232 health a tick while eating | requires 35: Food: 232 health a tick while eating; Well Fed: +15 Stamina |
| 18045 Tender Wolf Steak | requires 40: Well Fed: +12 Stamina, +12 Spirit; Food: 232 health a tick while eating | requires 35: Food: 232 health a tick while eating; Well Fed: +15 Agility |
| 18254 Runn Tum Tuber Surprise | requires 45: Increased Intellect: +10 Intellect; Food: 358 health a tick while eating | requires 35: Food: 232 health a tick while eating; Well Fed: +15 Intellect |
| 20074 Heavy Crocolisk Stew | requires 20: Well Fed: +8 Stamina, +8 Spirit; Food: 162 health a tick while eating | requires 25: Food: 162 health a tick while eating; Well Fed: +10 Agility |
| 20452 Smoked Desert Dumplings | requires 45: Well Fed: +20 Strength; Food: 358 health a tick while eating | requires 45: Food: 358 health a tick while eating; Well Fed: +20 Strength |
| 21023 Dirge's Kickin' Chimaerok Chops | requires 55: Increased Stamina: +25 Stamina; Food: 425 health a tick while eating | requires 45: Increased Stamina: +25 Stamina; Food: 425 health a tick while eating |
| 21072 Smoked Sagefish | requires 10: Food: 90 health a tick while eating; Well Fed: aura 24/effect 6 3; Brain Food: 135 mana a tick while drinking | requires 10: Food: 58 health a tick while eating; Well Fed: +4 spell damage and healing |
| 21217 Sagefish Delight | requires 30: Food: 200 health a tick while eating; Well Fed: aura 24/effect 6 6; Brain Food: 300 mana a tick while drinking | requires 30: Food: 115 health a tick while eating; Well Fed: +7 spell damage and healing |

### New in Forever (49)

| Item | Requires | What it gives | Recipe yellow |
|---|---|---|---|
| 279957 Cookie's Feast | 0 | Cookie's Feast: aura 0/effect 50 0 | 145 |
| 279961 Journeyman Campfire Kit | 0 | Journeyman Campfire: aura 0/effect 50 5, aura 0/effect 179 0, aura 0/effect 76 0, aura 0/effect 28 1, aura 0/effect 76 0 | 95 |
| 279974 Expert Campfire Kit | 0 | Expert Campfire: aura 0/effect 50 10, aura 0/effect 179 0, aura 0/effect 76 0, aura 0/effect 28 1, aura 0/effect 76 0 | 205 |
| 279981 Basic Campfire Kit | 0 | Basic Campfire: aura 0/effect 50 3, aura 0/effect 179 0, aura 0/effect 76 0, aura 0/effect 28 1, aura 0/effect 76 0 | 1 |
| 279982 Iron Oven | 0 | Iron Oven: aura 0/effect 50 0 | 300 |
| 249865 Peace Tea | 1 | Drink: 42 mana a tick while drinking; Well Fed: +2 healing | 30 |
| 249871 Venomous Smoothie | 1 | Drink: 42 mana a tick while drinking; Well Fed: +1 Spirit | 30 |
| 250079 Tasty Raptor Bites | 1 | Food: 17 health a tick while eating; Well Fed: +1 Intellect | 35 |
| 251525 Savory Whimsyfin Delight | 1 | Savory Whimsyfin Delight: aura 56/effect 6 1 | 125 |
| 249866 Royal Tea | 5 | Drink: 104 mana a tick while drinking; Well Fed: +7 healing | 105 |
| 249872 Slimy Smoothie | 5 | Drink: 104 mana a tick while drinking; Well Fed: +3 Spirit | 105 |
| 250077 Twice-Spiced Raptor Slice | 5 | Food: 58 health a tick while eating; Well Fed: +3 Intellect | 115 |
| 250080 Breakfast Omelette | 5 | Food: 58 health a tick while eating; Well Fed: +3 Stamina | 80 |
| 263509 Skywall Souffle | 5 | Food: 17 health a tick while eating; Well Fed: +1 Stamina | 30 |
| 263512 Pincer Bites | 5 | Food: 17 health a tick while eating; Well Fed: +1 Intellect | 40 |
| 249867 Root Tea | 15 | Drink: 174 mana a tick while drinking; Well Fed: +11 healing | 155 |
| 249873 Mrrggl Smrrthle | 15 | Drink: 174 mana a tick while drinking; Well Fed: +5 Spirit | 135 |
| 249868 Triage Tea | 25 | Drink: 249 mana a tick while drinking; Well Fed: +22 healing | 195 |
| 249874 Calcified Smoothie | 25 | Drink: 249 mana a tick while drinking; Well Fed: +10 Spirit | 185 |
| 250073 Raging Raptor Ribs | 25 | Food: 162 health a tick while eating; Well Fed: +10 Intellect | 280 |
| 250074 Bear Brisket | 25 | Food: 162 health a tick while eating; Well Fed: +10 Strength | 200 |
| 250078 Giant Scrambled Eggs | 25 | Food: 162 health a tick while eating; Well Fed: +10 Stamina | 195 |
| 274971 Briny Seafood Stew | 25 | Food: 162 health a tick while eating; Well Fed: +14 spell damage and healing | 220 |
| 274976 Plain Ol' Paletusk | 25 | Food: 162 health a tick while eating; Well Fed: +10 Strength | 200 |
| 232438 Smoked Redgill | 35 | Increased Healing Power: +22 healing; Food: 232 health a tick while eating | 325 |
| 249869 Sunny Tea | 35 | Drink: 332 mana a tick while drinking; Well Fed: +33 healing | 220 |
| 249875 Spicy Smoothie | 35 | Drink: 332 mana a tick while drinking; Well Fed: +15 Spirit | 215 |
| 250065 Savory Stag Sliders | 35 | Food: 232 health a tick while eating; Well Fed: +15 Strength | 230 |
| 250076 Raptor Rouladen | 35 | Food: 232 health a tick while eating; Well Fed: +15 Intellect | 230 |
| 286152 Plated Armorfish | 35 | Food: 232 health a tick while eating; Well Fed: aura 465/effect 6 150 | 245 |
| 8957 Spinefin Halibut | 45 | Food: 232 health a tick while eating; Well Fed: +18 Intellect | 210 |
| 232436 Darkclaw Bisque | 45 | Increased Spell Damage: +12 spell damage and healing; Food: 358 health a tick while eating | 325 |
| 249870 Sage's Tea | 45 | Drink: 489 mana a tick while drinking; Well Fed: +44 healing | 260 |
| 249876 Wicked Smoothie | 45 | Drink: 489 mana a tick while drinking; Well Fed: +20 Spirit | 255 |
| 250066 Soaring Pamplona | 45 | Food: 358 health a tick while eating; Well Fed: +20 Intellect | 280 |
| 250067 Bat Hachee | 45 | Food: 358 health a tick while eating; Well Fed: +20 Intellect | 280 |
| 250068 Savory Turtle Stew | 45 | Food: 358 health a tick while eating; Well Fed: +20 Stamina | 280 |
| 250069 Flank au Poivre | 45 | Food: 358 health a tick while eating; Well Fed: +20 Agility | 285 |
| 250070 Bear Bruscitti | 45 | Food: 358 health a tick while eating; Well Fed: +20 Strength | 280 |
| 250071 Steaming Stag Steak | 45 | Food: 358 health a tick while eating; Well Fed: +20 Strength | 280 |
| 250072 Swiftstrike Steak | 45 | Food: 358 health a tick while eating; Well Fed: +20 Agility | 280 |
| 250075 Prehistoric Pulled Raptor | 45 | Food: 358 health a tick while eating; Well Fed: +20 Intellect | 280 |
| 250081 Clam Linguine | 45 | Food: 358 health a tick while eating | 280 |
| 238637 Prowler Steak | 55 | Well Fed: +25 Strength, +10 Stamina; Food: 425 health a tick while eating | 260 |
| 238638 Filet o' Flank | 55 | Well Fed: +25 Agility, +10 Stamina; Food: 425 health a tick while eating | 260 |
| 238639 Sunrise Omelette | 55 | Well Fed: +25 spell damage and healing, +10 Stamina, +55 healing; Food: 425 health a tick while eating | 260 |
| 238641 Specklefin Feast | 55 | Specklefin Feast: aura 0/effect 50 1 | 290 |
| 238642 Grand Lobster Banquet | 55 | Grand Lobster Banquet: aura 0/effect 50 1 | 290 |
| 267341 Sweetpaw Jam | 55 | Food: 358 health a tick while eating; Well Fed: +15 % run speed | 280 |

## First Aid

14 items in both; 0 changed; 18 new in Forever; 0 gone.

### New in Forever (18)

| Item | Requires | What it gives | Recipe yellow |
|---|---|---|---|
| 255715 Potent Anti-Venom | 0 | Potent Anti-Venom: aura 0/effect 38 4 | 230 |
| 255716 Simple Poultice | 0 | Simple Poultice: aura 0/effect 38 4 | 90 |
| 255717 Clever Poultice | 0 | Clever Poultice: aura 0/effect 38 4 | 160 |
| 255718 Superior Poultice | 0 | Superior Poultice: aura 0/effect 38 4 | 225 |
| 255719 Powerful Poultice | 0 | Powerful Poultice: aura 0/effect 38 4 | 295 |
| 255720 Woolen Tourniquet | 0 | Woolen Tourniquet: aura 0/effect 108 4 | 120 |
| 255721 Leather Tourniquet | 0 | Leather Tourniquet: aura 0/effect 108 4 | 220 |
| 255722 Surgical Tourniquet | 0 | Surgical Tourniquet: aura 0/effect 108 4 | 280 |
| 279940 Toxin Study | 0 | Toxin Study: aura 0/effect 50 0 | 0 |
| 279951 Plague Doctor's Laboratory | 0 | Plague Doctor's Laboratory: aura 0/effect 50 0 | 0 |
| 279968 First Aid Kit | 0 | First Aid Kit: aura 0/effect 50 0, aura 0/effect 179 0 | 0 |
| 118 Minor Healing Potion | 1 | Healing Potion: aura 0/effect 10 80 | 55 |
| 858 Lesser Healing Potion | 3 | Healing Potion: aura 0/effect 10 160 | 85 |
| 929 Healing Potion | 12 | Healing Potion: aura 0/effect 10 320 | 135 |
| 1710 Greater Healing Potion | 21 | Healing Potion: aura 0/effect 10 520 | 175 |
| 3928 Superior Healing Potion | 35 | Healing Potion: aura 0/effect 10 800 | 230 |
| 13446 Major Healing Potion | 45 | Healing Potion: aura 0/effect 10 1400 | 290 |
| 232433 Dense Runecloth Bandage | 50 | First Aid: aura 8/effect 6 425 | 315 |

