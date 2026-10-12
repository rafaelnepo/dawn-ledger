# The fishing journal: the professions window's Fishing tab

Asked 2026-09-27 (kickoff 14). The plan was shown and the user said "go with recommendations, with one condition, it should fit
the current frame we are already using for the other professions. We will refine as we go." Built unattended the same day as
ForeverUI 0.57.0.

## What it is

A **Fishing** side tab in the professions window, between Cooking and First Aid. The side tabs now run: the book, the two
primaries, Cooking, Fishing, First Aid. The tab shows a page of the window over the book page, in the crafting page's layout:

- **The rank bar** at the top: Fishing's rank, with its own fill and flare. It's the crafting page's bar in the same place:
  centred, 36 down.
- **The list** on the left: the crafting page's list, 304 wide from (5, 72), with its search box and Filter button. It shows:
  - **Journal** (selected at first).
  - **Zones**, grouped by the skill they need: "Any skill · sure catch at 25", "Any skill · sure catch at 75", "From 55 · sure
    catch at 150", "From 130 · sure catch at 225", "From 205 · sure catch at 300", "From 330 · sure catch at 425". A zone shows
    your catches there as [n], and is dimmed when your skill is too low for a bite.
  - **The item categories:** Fish, Trophy Fish, Treasures, Quest Fish, Other Catches (folded at first: potions and junk),
    Fishing Poles, Lures, Gear, Books, Fishing Extravaganza. Items show in their quality's colour with your count. A catch you
    haven't made yet is dimmed.
- **The card** on the right: the recipe card's place and size (400 x 484), on Forever's Fishing card art (the book's
  generic-fishing card, about the same shape). It shows one of three things:
  - **Journal:** how many you caught and since when; the Statistics tab's count from before the journal, as one number; where
    you are (the sub-zone's catch if it has its own), with the skill there and your chance; your six most caught fish, in
    slots; your six most fished zones.
  - **A zone:** its skill line and your chance ("Your skill 187: every cast lands."); how many you caught there; "What bites
    here:" as item slots, each with its chance, its note ("while on its quest", "in winter", "in summer") and your count.
    Then the sub-zones that fish differently ("In Longshore, The Dagger Hills:"), the alike ones together.
  - **An item:** its round icon (the tooltip on hover, shift-click links it), its name in its quality's colour and its
    categories; "You caught 12, the first on 27 Sep 2026."; "Where it bites:", every zone, sub-zone and school with its chance,
    the likeliest first, dimmed where your skill is too low; "Where to get it:" for what you buy or earn (vendors, quest
    rewards with the giver, drops, containers).
- **Filter:** Caught, Not caught yet (for the catches), Collapse all, Expand all, and Clear filters when one is on. The search
  matches names, and it's shared by every window's page.

## The numbers (this server's rules)

- **Skill:** `skill_fishing_base_level` gives each zone a number. You need at least that for a bite; at exactly that you land
  5% of casts; the chance rises by one point per point of skill; from the number + 95, every cast lands. The source is CMaNGOS
  `GameObject::Use`: `chance = skill - zone_skill + 5`, and a catch needs `skill >= zone_skill`. A negative number means any
  skill gets a bite.
- **Which table:** the sub-zone's fishing loot if it has one, else the zone's (`LootMgr.cpp`, `LOOT_FISHING`).
- **Chances:** from `fishing_loot_template` and the reference tables it points to. Group 1 is one pick: items with a 0 chance
  share what the others leave. Items outside a group each get their own roll. A negative chance means a quest item, which only
  bites while you're on its quest. Winter Squid and Summer Bass carry the seasons' game events (conditions 322 / 323: events 35 /
  36).
- **Schools:** `gameobject_template` type 25 and its `gameobject_loot_template`, one pick.

## The counting

Counts are per character, in `ForeverUIStats.fishing` (next to the Statistics tab's numbers):
`{ since, earlier, total, items[id], zones[zone][id], subs[zone][sub][id], first[id] }`.

- **When:** when a loot window opens and `IsFishingLoot()` is true, the item slots are noted (id, count, zone, sub-zone). Each
  item counts when you take it (`LOOT_SLOT_CLEARED`). An item left behind (a full bag) doesn't count, and coins don't either.
- **`earlier`:** the Statistics tab's "Fish and other things caught" as it stood the first time the journal ran. That count
  covers every fishing loot window's slots, so it can't be split by fish or zone.
- **Reset:** the Statistics tab's Reset clears it too, since it's the same saved table.

## The data

`addons/ForeverUI/FishingData.lua` is written by `tools/asset-extract/fishing_data.py` from the world database (read-only) and
the 1.12.1 client's AreaTable (for zone names and the sub-zone to zone links). The first run gave:

- **147 items:**

  | Category | Items |
  |---|---|
  | Fish | 28 |
  | Trophy fish | 35 |
  | Treasures | 22 |
  | Quest fish | 8 |
  | Other catches | 29 |
  | Poles | 7 |
  | Lures | 5 |
  | Gear | 5 |
  | Books | 3 |
  | Extravaganza | 11 |

  An item can sit in two categories: the Arcanite Fishing Pole is both a pole and an Extravaganza reward.
- **51 zones**, with **84 sub-zones** that fish differently.
- **14 kinds of school.**

Items nothing gives on this server are left out: Artisan Fishing - The Way of the Lure, the old Lucky Fishing Hat 7996, the
Blump Family Fishing Hat and the second Blump pole.

Quirks of the server's data, shown as they are:
- Loch Modan's zone table has only Raw Loch Frenzy at 25%.
- Deadwind Pass has only Lightning Eel at 7%.
- Tanaris lists Raw Summer Bass twice: 15% all year, plus 10% in summer.

## How it fits the window

- **The tab** is a secure handler that shows the book page, as the book's tab does. A post-hook then shows the journal. The
  journal has no secure part, so it opens in a fight too.
- **Placement:** the journal is a child of the book, 10 levels above it (over the cards; their bars' texts sit 7 above). Its
  mouse is on, so the cards' secure buttons can't be clicked through it.
- **The top strip:** its frame starts 24 down, which leaves the close button and gear clickable. The window's own background
  shows in the strip between 21 and 24.
- **Hiding:** the book hiding (a profession's tab) hides the journal with it, and the book's tab hides it too.
- **Title and portrait:** "Fishing" and Fishing's icon while shown; "Professions" and the book's icon when it hides while the
  book stays.
- **Every window has its own:** our window, the skinned TradeSkillFrame and the skinned CraftFrame each get their own tab and
  journal.
- **One fix on the way:** the skinned windows' book now hooks its OnHide instead of setting it (SetScript dropped the journal's
  hook).

## Later (the user refines as we go)

- The settings gear could hold journal options: which categories show, counting catches instead of items.
- Treasure contents are not listed; that was the recommendation, and it can come later.
- Zone names are the 1.12.1 client's. If 1.14.2 names a zone differently, that zone's catches are counted under its 1.14.2 name
  and won't match the list. Check in game.

## Round 2 (the user's shots, 2026-09-27, live)

- **Layering:** the page's art covered the window's frame and portrait. The art is now on a frame of its own at the crafting
  page's level (the portrait holder's, under the metal frame), from 21 down as the crafting page's. The book's cards are faded to
  alpha 0 while the journal shows (allowed in a fight; hiding their secure buttons isn't), and come back when it hides.
- **The list's order:**
  - **The Angler's Journal** (the user's name for it) holds Your Catches, then the books: Expert Fishing - The Bass and You and
    Nat Pagle's Guide to Extreme Anglin'.
  - Fishing Poles, Lures, Gear.
  - Zones.
  - Fish, Trophy Fish, **Bloated Fish** (apart from the crates and chests), Treasures, Quest Fish.
  - **Other Catches**, in subcategories: Potions, Food and Drink, Herbs and Materials, Curiosities, Junk.
  - **Fishing Extravaganza:** the Fishing Tournament! flier first, then subcategories Fish and Rewards.
- **The item card:** the item's tooltip in the game's tooltip box beside the icon, balanced as the recipe card's (the name in its
  quality's colour, the lines in theirs, the right-hand texts on their lines). It's redrawn when the client learns the item
  (GET_ITEM_INFO_RECEIVED).
- **No "Your skill N:"** in the chance lines (the rank bar shows it): "Every cast lands." / "76% of casts land." / "Too low for a
  bite here."
- **`/fui fishsample`** adds made-up catches in six zones (a share of each zone's catch by its chances) and remembers them; the
  same command again takes exactly those away.
- **A fix:** a pooled card text kept a right-hand text's alignment (the second "Where to get it" line was pushed right).

## Round 3 (2026-09-27, live)

- **Contextual by default** (the user: "only shows the content based on your current level... otherwise it's too much
  information too soon"). Filter has three rules, all on at first (`ForeverUIDB.fishingContext`):
  - **For my level:** zones at most 3 levels above you, from the client's map for outdoor zones (`C_Map.GetMapLevels`) and the
    server for dungeons (`instance_template.levelMin`). The other side's capitals and starting zones are hidden (AreaTable's
    faction and city flag). Gear, poles and books show only when you're old enough for them.
  - **For my fishing skill:** zones where you get a bite (the zone or one of its sub-zones). Poles, lures and books your skill can
    use. The next pole, lure and book to aim for show dimmed, and their card says "Needs 100 Fishing and level 25."
  - **In season:** Winter Squid only in winter, and the summer-only bites of Summer Bass only in summer. The dates come from the
    server's events 35 / 36: winter from 23 Sep for 178 days, summer from 21 Mar for 187 days.

  The catches follow the zones shown, and anything you've caught stays. School-only catches (Sagefish, the trunks) are judged by
  item level. The Extravaganza shows with Stranglethorn Vale. Your current zone always shows. "Clear filters" turns all the rules
  off (everything).
- **Poles, lures and gear, best first:** sorted by the +Fishing they give, then by what they ask of you. The bonus comes from each
  item's spell (aura 30, skill 356); a lure's or line's comes from the enchant it puts on the pole (SpellItemEnchantment from the
  1.12.1 patch-2.MPQ: its equip spell). Poles: Arcanite 35, Nat Pagle's 25, Big Iron 20, Darkwood 15, Strong 5, Blump 3, Fishing
  Pole 0. Lures: Aquadynamic 100, Bright Baubles and Flesh Eating Worm 75, Nightcrawlers 50, Shiny Bauble 25.
- **The card art:** Fishing's own recipe card and Cooking's, read from Forever's client (closed) on 2026-09-27 (files 8164442,
  8164420). The journal no longer uses the book's generic card with its frame.
- **P** (the professions key, `/fui book`) closes whichever professions window is open, the game's or ours. When none is open it
  opens our window on the book, the first tab. It used to flip the open window between its book page and its recipes.
- **Trophy Fish by kind** (the user): Mud Snapper, Catfish, Redgill, Grouper, Salmon, Lobster, Mightfish, each a subcategory, in
  the order you meet them (the lowest skill), each kind by weight.
- **Treasures by kind** (the user): Chests, Crates, Trunks, Bottles and Clams (the Message in a Bottle, the Big-mouth Clam).
- **The bloated fish's level** (the user: three had no "Requires Level"): on this server Bloated Smallfish requires level 1, which
  the game never prints, and Bloated Redgill and Bloated Salmon require nothing (RequiredLevel 0). The card's tooltip box adds
  the truth where the game's tooltip has no line: "Requires Level 1" / "No level required", before the Use line. No level was
  made up.
- **A quest fish's card:** "It only bites while you're on its quest." once, above "Where it bites:", instead of "(while on its
  quest)" on each line (the user). The seasons keep their note on the line.
- **Other Catches' potions** in two (the user): Healing Potions, Mana Potions.
- **The right edge** (the user's shot): the card's art and frame, and the list's background, sat above the window's metal frame
  and covered its edges. They're on the page's backdrop now, under the frame, as the crafting page's are.
- **Trophies biggest first** (the user): the kinds from Mightfish down to Mud Snapper, each heaviest first.
- **The card's scroll bar** inside the card, between the percentages and the right border (was over the border).
- **Vendors** (the user: the easiest to reach per continent instead of a count; which lures are limited). Each vendor's town comes
  from the server's own grids (`(the server's checkout)`: each cell holds an AreaBit, mapped to AreaTable by bit and map, read as
  GridMap::getArea does; Undercity's vendors read as the Ruins of Lordaeron above, so below ground is Undercity). Which side can
  buy comes from the vendor's faction template (EnemyGroup), and the stock from npc_vendor.maxcount / incrtime. The card shows the
  three easiest for your side on each continent: your capitals, then the goblin ports (Booty Bay, Ratchet, Gadgetzan, Everlook),
  then the lowest-level zones. Limited stock: the Aquadynamic Fish Attractor (2 at a time, restocked every hour) and the Strong
  Fishing Pole (1, every 2 hours) at every vendor; the list marks them "(limited)" and the card says "Limited supply: ...".
- **A second line** (the user: "contextual, like Big-mouth Clam might contain pearls"): each item whose tooltip has no Use, Equip
  or flavour line gets one of ours, as the game writes flavour text (gold, in quotes), from the server's data (fishing_data.py
  `line_of`):
  - **Quest items:** who wants them and what they give ("Fishbot 5000 gives Lucky Fishing Hat for it.", "Riggle Bassbait wants 40
    of them for Master Angler.", "Wanted for a Craftsman's Writ.").
  - **Containers:** what's inside, from item_loot_template sorted into pearls, gems, gear, cloth or leather, potions, recipes and
    coins ("Might hold a gem or a piece of gear.", "Clam meat inside, and sometimes a pearl.").
  - **Plain fish and herbs:** what the recipes make of them ("Cooks into Longjaw Mud Snapper.", "Alchemists make Blackmouth Oil
    from it."). Herbs and materials take this before a quest, since their quests can be the other side's.
  - **Trophies:** their weight, or "The heaviest Redgill in the waters."
- **Schools that spawn:** only 5 of the 33 school templates spawn on this server (Tastyfish 54, Sagefish 42, Deviate Fish 16,
  Muddy Churning Waters 7, Elemental Water 6). The rest are left out, and so is "School of Fish" (its loot id is Peacebloom's
  herb loot: the user's shot showed Peacebloom at 100%). Six items that only came from unspawned schools left the list. Each
  school's zones come from its spawns (`D.schoolZones`); "Where it bites" names them, and a school's catch follows its zones in
  the contextual list.
- **Quest lines** name the giver's town (the server's grids) and always show, in yellow as an objective (not in quotes), even when
  the game's tooltip has a line: "Deliver 40 to Riggle Bassbait in Booty Bay for Master Angler." (the user's Tastyfish), "Fishbot
  5000 in Booty Bay gives Lucky Fishing Hat for it." (FishingData items[id][9]).
- **The three buttons** (the user: gear left, lure middle, Fish right), in the crafting page's Create row: Fishing Gear (Create
  All's place, 112 wide) equips the best pole, hat and boots in your bags (by their +Fishing, the ones your level and skill allow)
  and remembers what they replaced (ForeverUIStats.fishing.gearSwap); with the pole on it reads "Put Gear Back" and restores them
  (main hand, off hand, head, feet). The game's equip works out of combat only, so the button greys in a fight. Apply Lure
  (centred, 150) is a secure item button on the main hand (`target-slot` 16) with the best lure in the bags and its count ("Apply
  Lure (3)"); the tooltip says the lure, the minutes left of one already on, or "Equip a fishing pole first." Fish (Create's place,
  80) is a secure spell button casting Fishing. The secure ones change their item and state out of combat (after a fight).
- **The journal is now protected** (its secure buttons): made with its book (out of combat) instead of on the tab's first click,
  and shown and hidden only by secure handlers: Fishing's tab shows it, the book's tab, the professions' wrapper (WRAP), the
  skinned windows' keepers and the toggle hide it. It still opens in a fight.
- **Lore lines** (the user's picks): twenty of ours, as the game's flavour text: docs/copywriting/fishing-lore.md.
- **Drops as kinds** (the user: "the mob types to be general"): "Dropped by undead in Western Plaguelands, Stratholme and Duskwood"
  (Nightcrawlers: all 47 are undead) instead of creature names: the creatures' type (a beast's family: wolves, spiders ...), the
  kinds that make most of them (up to two), and the three zones they spawn in most (the server's grids). A vendor's item keeps
  its drop line too.
- **Limited stock, short** (the user): "Restocks every hour." on the card; no mark in the list.
- **The journal card** (the user): no dates (they break immersion): "N caught since you first cast a line."; "Nothing caught yet.
  Every fish and find your line brings up will be written here, by fish and by water."; an item's "You caught N." The ten most
  caught under "Pride of the Creel:", the five most fished waters under "Favourite Fishing Holes:".
- **Cooking's recipe cards** (the user: "every cooking item should have a description", with its origin): 82 lines of ours, one per
  dish, last on the card in gold quotes: docs/copywriting/cooking-lore.md (COOKING_LORE in Professions.lua). The origins come from
  where each recipe is sold, taught or found on this server: night elf (Kaldorei Spider Kabob, Herb Baked Egg, Fillet of Frenzy,
  Big Bear Steak, Lean Venison), dwarven (Beer Basted Boar Ribs, Loch Frenzy Delight, Smoked Bear Meat, Crocolisk Steak), tauren
  (Roasted Kodo Meat, Heavy Kodo Stew), orcish (Scorpid Surprise, the Crossroads dishes), Forsaken (Crispy Bat Wing), goblin (the
  Booty Bay, Steamwheedle and Gadgetzan dishes), ogre (Runn Tum Tuber Surprise, Heavy Crocolisk Stew), human (Westfall, Redridge).
- **Louder splashes** (the user): with a fishing pole in the main hand, music and ambience go to 0 and sound effects to full
  (Sound_MusicVolume, Sound_AmbienceVolume, Sound_SFXVolume); your own levels are kept (ForeverUIDB.fishingSoundSaved) and put
  back when the pole comes off, or at the next login if the game closed with it on. On by default; the professions gear's "Louder
  splashes with a fishing pole" turns it off.
- **The portrait again** (the user's shot): the journal, made with its book, got its art's level before the book was raised; the
  raise lifted the art over the portrait. The journal is now made by the window once the book has its level and chrome
  (Professions.lua addJournal).
- **"Waters of Azeroth:"** (the user: a name from Azeroth, one line per map): the item card lists each zone once, at its best chance
  (the zone's water, its sub-zones', the schools that spawn in it), the likeliest first.
- **The journal alone** (the user): the books (Expert Fishing - The Bass and You, Nat Pagle's guide) are out of the list; The Angler's Journal's row reads "Open the Journal".
