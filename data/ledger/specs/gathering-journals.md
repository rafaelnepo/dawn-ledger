# The gathering journals: Herbalism, Mining and Skinning's tabs

Asked 2026-09-30 (session 41): "Herbalism and Mining need profession tabs just like the Fishing journal, same logic, but for the
other gathering materials"; then "separate tab, and do Skinning too"; "build everything that's planned, no browser previews".
Built unattended as ForeverUI 0.170.0 (GatherJournal.lua, GatheringData.lua).

## What it is

- **A side tab each** in the professions window (ours and the skinned game windows), "Herbalism Journal", "Mining Journal",
  "Skinning Journal", placed where the profession sits among the primaries: Herbalism and Skinning (no window of their own) in the
  primary's place, Mining's under Smelting's. Then Cooking, Fishing, First Aid as before.
- **The page** is the Fishing journal's layout: the rank bar, the list (search, Filter, folding categories), the card on the
  profession's own Forever card art (Profession-background-card-Herbalism / Mining / Skinning).
- **The list:** the journal ("The Herbalist's / Miner's / Skinner's Journal", "Open the Journal"), Gear, Zones (by rank:
  "Apprentice · from 1", "Journeyman · from 75", "Expert · from 150", "Artisan · from 225", by the easiest node or beast there),
  then the materials: Herbs; Ores, Stones, Gems; Leather, Hides, Scales; Other Finds and Quest Items (folded at first). A material
  you haven't gathered is dimmed, a zone above your skill too; your counts as [n].
- **The card:**
  - Journal: the count ("12 gathered since you first knelt by a herb."), for herbs and minerals "Your maps show 3 of 35 kinds. Next:
    Earthroot, 7 of 10." (GatherNodes' reveal), "Here: <zone>" with what grows there in your skill's colour, the ten most gathered
    (Pride of the Satchel / Pack / Rack), the five favourite zones.
  - Zone: its skill range ("Skill 1 to 115", a dungeon's level), your count there, "What grows here:" / "What lies here:" / "What
    to skin here:" (each node kind with its skill and node count, each beast group with its levels, skill and spawns, in the colour
    your skill gets), "What it gives:" (each material at its best chance there).
  - Item: its icon and tooltip, "You gathered N." / "You haven't gathered one yet.", "Needs N <skill>." when out of reach, what
    gives it ("Picked from:" / "Broken from:" with skill and chance; Skinning's "Skinned from:" beasts by zone and level), where
    it grows (zones by node count, dimmed when out of your context). Gear: its bonus, "Keep it in your bags" for the tools.
- **Colours** (CMaNGOS Player::UpdateGatherSkill): orange under the requirement + 25, yellow to + 50, green to + 100, grey after;
  red when out of reach.
- **Filter:** For my level (zones up to 3 levels above you; the other side's starting zones out), For my <skill> skill, Gathered,
  Not gathered yet, Collapse all, Expand all, Clear filters (`ForeverUIDB.gatherContext`, `gatherFold`).
- **Button** (herbs and minerals): "Hide / Show Nodes on Maps", the Map Filter's switch (GatherNodes.lua).
- **Counting:** per character in `ForeverUIStats.gathering[herb | mine | skin]` = `{ since, total, items, zones, subs, first }`: the
  loot window within 10 s of Herb Gathering, Mining or Skinning, each item as it's taken (LOOT_SLOT_CLEARED).
- **No secure part:** the tabs show the book by a secure handler (as Fishing's) and the page by a hook; the pages hide with the
  book (in a fight too). One journal at a time on a book.
- `/fui gathersample` adds made-up gathers to all three and takes exactly those away again.

## The data (tools/asset-extract/gather_journal_data.py --lua)

From the world database (read-only), the server's grids (`(the server's checkout)`: each spot's AreaBit, as GridMap::getArea; a
creature's or node's zone exact) and the 1.12.1 AreaTable:
- **Herbalism:** 35 node kinds (the quest objects too: Doom Weed, Gloom Weed... as Quest Herbs), 39 zones, 38 items.
- **Mining:** 10 veins, 31 zones, 33 items (9 ores, 5 stones, 16 gems, 2 other, 1 quest).
- **Skinning:** 54 zones of skinnable creatures by kind (a beast's family, else its type), 44 items (12 leather, 6 hides, 15
  scales, 8 other, 3 quest). A group's levels are where 90% of its spawns sit (a lone level-1 Cockatiel among Stranglethorn's
  basilisks left out); an item's lowest skill from the creatures that give it 1 in 10 (with at least two spawns), else its rarer
  sources (the Deviate scales 50).
- **Skill:** a node's lock (Lock.dbc); a beast's by level (EffectSkinning: 0 under 10, (level - 10) x 10 to 19, level x 5).
- **Gear:** items with a +skill aura (Herbalist's Gloves, Goblin Mining Helmet, Finkle's Skinner, Zulian Slicer), the tools (Mining
  Pick, Skinning Knife), the glove enchants' formulas.

## Later
- Lore lines for the materials (the Fishing journal's quotes), the user's picks.
- Where to buy the tools and formulas (the Fishing journal's vendors).
