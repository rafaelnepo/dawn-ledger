# The world's chests: what the world has, the first pass, the questions

Session 72 (2026-10-09), kickoff 59. The survey: `tools/server-data/world_chests.py` (every chest with a spawn, its lock, spots,
pools, respawn and loot; the data stays local in `(a file on the server's Mac)`). The page: Box Drops
(http://127.0.0.1:8777/dbsite/mockups/boxdrops/), where the chests sit beside the boxes in their own groups. The first pass:
`tools/server-data/world_chests_patch.py`, which writes world 048.

## What the world has

498 chests have a spawn. They break down as:
- 285 quest objects (left alone);
- 89 dungeon chests;
- 20 treasure chests anybody can open (1,163 spots);
- 16 locked chests and 8 keyed ones;
- 80 crates and finds (crates, clams, eggs, barrels, festival food).

- **Most chests share a few spots.** A treasure chest sits in a pool of spots and usually only one per pool is out at a time. The
  Battered Chest of levels 1-10, for example, has 248 spots in 62 pools: 62 out at once, each back 5 minutes after it's opened.
- **Blizzard's tables were level bands, not places.** A Solid Chest of level 35 held the same 600 to 1,000 items in Arathi as in
  Desolace: food, every gray of the level, a group of greens, world blues at 0.01 %, recipes, gems and bags.
- **Old tables were shared across families.** One table (2283) served a Solid Chest, the Alliance and Horde Chests and the Alliance
  Strongbox, so open, PvP and locked chests held the same things.

## Decided (the user, session 72)

- Items fit each kind of interaction, and they get better as the chest gets harder to reach or open.
- Open-world chests are never as good as dungeon chests.
- The Alliance and Horde chests are their own group, the PvP Chests.
- A crate holds its kind only: the Armor Crate holds armor, the Weapon Crate weapons, the Food Crate food and drink.
- No recipes, patterns or plans, as with the boxes: they go to the professions' own quests. This includes the dungeon chests (the
  user: "Remove recipes from dungeon chests too"). This includes the dungeon chests (the
  user: "Remove recipes from dungeon chests too").
- Elixirs in every open-world chest, by level. Early chests hold Lion's Strength and Minor Defense, late ones the Mongoose and Major
  Troll's Blood. Only things you'd use soon while questing: no elemental protection, resistances or detections.
- Same-named chests at different levels are sorted on the page as sub-rows by level, and alike things are grouped.
- Nothing the boxes' patches cleaned (world 036-047) is touched.

## The first pass: world 048

Tried on a copy: the undo puts the four tables back exactly. **Not live yet.** The page shows the copy as a preview.

Each rebuilt chest gets a loot table of its own, one for each family and level (62001-62037), built from:
- lists of ours (62501-62560): food, drink, potions, elixirs, trade goods, gems and bandages, each by band of ten levels;
- the world's own lists, only rolled, never changed: grays, greens and blues by level, bags, scrolls.

The old tables stay untouched for whoever else shares them (the dungeon chests). A chest's level is the middle of its spots' zones.

| Family | Chests | Rolls (chance, count) |
|---|---|---|
| Armor Crate | 2 | one armor piece, gray or green half and half; an armor kit of the level always |
| Weapon Crate | 2 | one weapon, gray or green half and half; a sharpening stone or weightstone of the level always |
| Food Crate | 12 | the innkeepers' bread of the level always (2-4), water 80 % (2-4) |
| Battered Chest | 4 | gray armor always, gray weapon 30 %, green armor 33 %, green weapon 20 %, trade goods always (1-3), an elixir always, bread 50 %, water 40 %, potion 25 %, stones 15 %, gem 8 %, a bag 1 % (6-slot pouches at level 6; half 6- and half 8-slot at 15; 8-slot at 18) |
| Solid Chest | 8 | gray armor always, gray weapon 35 %, green armor 40 %, green weapon 25 %, trade goods always (2-4), an elixir always, bread 40 %, water 35 %, potions 35 %, stones 20 %, gem 12 %, a bag of its level 1 % (8 to 14 slots) |
| Large Solid Chest (open world) | 1 | gray armor always, gray weapon 40 %, green armor 50 %, green weapon 33 %, blue armor 2 %, blue weapon 1 %, trade goods always (2-5), elixirs always (1-2), bread and water 30 %, potions 50 %, stones 25 %, gem 15 %, the Traveler's Backpack 1 % |
| PvP Chests (Alliance, Horde, Alliance Strongbox) | 7 | a camp's supplies, never a gray or a blue: bandages always (1-3), healing and mana potions 50 % (1-2), a potion of war 35 %, a fighting elixir 50 %, bread and water 40 % (1-3), cloth 30 % (1-3), a green weapon or armor piece 20 % |
| Locked (footlockers, keyed chests) | 12 | for questing (the user: below the lockboxes, "good for open world items for questing"): gray armor 60 %, gray weapon 40 %, green armor 65 %, green weapon 40 %, blue armor 4 %, blue weapon 2 %, gems 30 %, a bag a size above the Solid Chest's 5 %, an elixir always, potions 35 %, a scroll 25 %, stones 20 %, ore and stone 30 % (no herbs, leather or cloth), bread and water 20 % |
| Waterlogged and Mossy Footlockers (under water) | 5 | rusted: gray armor always, gray weapon 50 %, green armor 40 %, green weapon 20 %, blue armor 2.5 %, blue weapon 1 %, gems 30 %, a bag 5 %, an elixir always, potions 30 %, stones 20 %, ore and stone 30 %; no food |
| Large Mithril Bound Chest (open world) | 1 | green armor 75 %, green weapon 50 %, blue armor 6 %, blue weapon 3 %, gems 40 % (1-2), a bag 8 %, elixirs always (1-2), potions 50 %, scrolls 30 %, stones 25 %, ore and stone 40 % (1-3), grays 50 / 40 % |
| Dungeon: Large Battered and Large Solid Chests | 6 | green armor 70 %, green weapon 45 %, blue weapon 5 %, blue armor 3 % (weapons first in the dungeons, the user), gems of the level 35 % (1-2), a bag 6 %, elixirs always (1-2), potions 40 %, a scroll of the level 25 %, stones 20 %, cloth 40 % (no other trade goods), bread and water 20 %, grays 50 / 30 % |
| Dungeon: Large Iron Bound and Mithril Bound Chests | 6 | green armor 80 %, green weapon 55 %, blue weapon 9 %, blue armor 6 %, gems of the level 45 % (1-2), a bag 8 %, elixirs always (1-2), potions 50 %, scrolls of the level 30 %, stones 25 %, cloth 40 % (no other trade goods), grays 40 / 30 % |
| Dungeon: Scarlet Monastery's Armor and Weapon Crates | 2 | one piece of their kind, green 95 %, blue 5 % (no grays); an armor kit or a stone of the level always (level 37) |

The treasure chests (second round, the user): no rings or necklaces ("Too small for large chests"), weapons and armor first;
gems and bags stay, from the 6-slot pouches up to the Traveler's Backpack. Everywhere: potions and elixirs match the chest's own
level (the best healing and mana potion a character of that level can use; elixirs within ten levels below). Bread and water are
the innkeepers' (one of each by level, little bag space), with no fish or mushrooms, and the Food Crates hold the same. The treasure
chests also get sharpening stones and weightstones of the level.

The rogue's ladder (the user, session 72: option 1): junkbox < footlocker < lockbox < dungeon locked chest. Footlockers can be
found again at fixed places, so they pay a step below a lockbox of the same lock (a lockbox's blue is 7-10 %, a footlocker's 6 %).
Every gear list (green, blue, gray) keeps only items needing at most the chest's level + 2.
Gems match the chest's level everywhere (their item level from ten below the chest's to two above: Malachite and Tigerseye at 6,
Lesser Moonstone and Jade at 37, Star Ruby to Azerothian Diamond at 58). Scrolls are each kind's best rank for the level
(Agility, Intellect, Protection, Spirit, Stamina, Strength).

The finds, row by row (the user): the Boxes of Assorted Parts give their scopes more often (Crude Scope 10 to 25 %, Standard
Scope 6 to 15 %); the Giant Clams of Darkshore, the Barrens and the Wetlands lose their boots and give pearls more often (Small
Lustrous Pearl 5 to 15 %, the Wetlands' 12 % and Iridescent Pearl 10 %; Stranglethorn's give a Blue Pearl always, as before: the Booty Bay quest "Pearl Diving" asks for 9); the
Shellfish Trap gives the Big Iron Fishing Pole more often (1.5 to 5 %; its boots stay); the clams you carry (shore creatures
drop them) give pearls more often too (Small Barnacled Clam: Small Lustrous 15 %, was 5; Thick-shelled: Small Lustrous 10 % and
Iridescent 8 %, were 5 and 3; Big-mouth: Iridescent 5 %, Black 8 %, Golden 4 %, were 3, 4 and 2, Small Lustrous 2 % as before); the Half-Buried Bottle's scrolls are of its
beaches' level (38) in place of the world's rank II list.

Quest items from a chest's old table come along, because a quest still needs them. Money is unchanged. The Half-Buried Bottle
loses its recipe roll (10 %) and gets elixirs instead (a bottle). Every other open-world find stays as it was. 048 goes live after
a world server restart.

## World 049: no recipes from the dungeon chests

Written by `tools/server-data/dungeon_recipes_patch.py`. It takes 345 recipe rows out of 15 dungeon tables: the Large Battered,
Iron Bound, Solid and Mithril Bound Chests, the Ancient Treasure, the Dark Coffer, Stratholme's Supply Crate, Knot Thimblejack's
Cache and the four Blacksmithing Plans objects. It also takes the Schematic: Major Recombobulator out of the Gordok Tribute's own
list. The Blacksmithing Plans objects in Blackrock Depths and Stratholme go with their 10 spawns (the user: "We will add quests to
get them, or some other way"); the undo puts the spawns back from a dump. A recipe a quest needs would stay; none of these is one.
Where recipes shared a group with other items, those items now come a little more often. Tried on a copy after 048, each undo
checked. Not live yet; it goes live with a world server restart (the spawns).

## The PvP Chests (session 72, the user)

There are six Alliance Chest and Alliance Strongbox templates (62 spots, levels 15-35) in the camps that Horde quests send you to:
Ambermill, Northwatch Hold, Hillsbrad Fields, Bael Modan, the Talon Den, Dun Garok, Azurelode Mine, Dalaran, Dabyrie's Farmstead
and Stromgarde Keep. There is one Horde Chest (4 spots, level 35) at Go'Shek Farm. The database marks each one hostile to its own
side (FactionTemplate 101: hostile to the Horde, 102: to the Alliance); the server doesn't check this, and the client may (to try
in game).

- **Who opens:** only the other side, as the data has it.
- **Parity** (the Alliance has 4 spots to raid, the Horde 62): new Horde Chests in the camps below, placed by the user in game.
- **Contents** (second round): an elixir always, greens more often than in any treasure chest (armor 55 %, weapons 35 %). The two
  sides are alike but for their supplies: the Alliance's cheese (Darnassian Bleu to Alterac Swiss) and cloth, the Horde's meat
  (Tough Jerky to Roasted Quail) and leather.
- **Contents:** supplies, never a gray or a blue; potions and elixirs used in PvP. Every chest holds bandages and a fighting elixir. The potions of war
  are Rage, Swiftness, Free Action, Lesser Invisibility, Great Rage, Lesser Stoneshield and Invisibility. The fighting elixirs
  give strength, agility, stamina, armor, spell power or health back, and help see stealth (Catseye, Detect Lesser Invisibility).
  Both lists take the items whose required level is within twenty below the chest's.
- **War reward:** nothing extra; the loot is the reward.

**Session 75 (world 061):** each PvP camp has its own pool now (Stromgarde Keep and Bael Modan apart from the Solid Chests and
crates they shared with, Beren's Peril in Ambermill's); the Horde Supply Crates in two pools (Skulk Rock 3 of 6, Agol'watha 2 of
4). The Horde Chests placed by the user with Chest Marker (world 062: 55 spots, 14 pools). Still open: a level 45 for the Horde to
raid (no Alliance camp found yet).

### Where to place Horde Chests (for the Alliance to raid)

How a chest's spots work (the server's PoolManager): a pool holds a number of spots and a limit, which is 1 for every chest pool.
One chest is out at a time; when it's opened and comes back, the server picks a spot among the pool's free ones, and it can be
the same spot again. The Horde's Alliance Chests are 15 pools with 62 spots. So for each camp below: about 4 spots around the
camp, near its tents, crates and campfires. Once they're placed, a patch puts each camp's spots into a pool of its own (limit 1).

The chests to place: 520001 (Horde Chest, level 15), 520002 (level 21) and 520003 (level 25), new in 048, and 105578 (the
Horde Chest, level 35). They are the Alliance Chests' levels mirrored. The camps are where the mobs are of the Horde's races
(orcs, trolls, tauren) and Alliance quests send you, checked against our quest data. The map spot is the middle of the camp's
mobs.

| # | Zone | Camp | Mobs (level) | Alliance quests there | Chest | Pools | Map |
|---|---|---|---|---|---|---|---|
| 1 | Redridge Mountains | Render's Valley | Blackrock orcs (19-22) | Blackrock Menace, Shadow Magic | 520002 | 1 | 75.7, 79.8 |
| 2 | Redridge Mountains | Stonewatch | Blackrock orcs (21-25) | Blackrock Bounty, FIFTY! YEP! | 520002 | 1 | 69.3, 56.2 |
| 3 | Redridge Mountains | Render's Camp and Render's Rock | Blackrock orcs (21-25) | Blackrock Menace | 520003 | 1 | 31.1, 11.7 |
| 4 | Wetlands | Dun Algaz | Dragonmaw orcs (19-21) | The Algaz Gauntlet | 520002 | 1 | 48.2, 76.5 |
| 5 | Wetlands | Angerfang Encampment | Dragonmaw orcs (26-30) | War Banners, Tome of the Cabal | 520003 | 2 | 46.7, 46.3 |
| 6 | Arathi Highlands | Go'Shek Farm | Hammerfall's farmhands (33-35) | (the existing 4 spots) | 105578 | 1 | 61.8, 57.3 |
| 7 | Arathi Highlands | Witherbark Village | Witherbark trolls (32-36) | Troll Necklace Bounty | 105578 | 2 | 68.0, 72.1 |
| 8 | Desolace | Thunder Axe Fortress | Burning Blade orcs (30-33) | Fragments of the Orb of Orahil, The Infernal Orb (both sides) | 105578 | 2 | 55.2, 28.0 |
| 9 | Stranglethorn Vale | Ruins of Zul'Kunda | Bloodscalp trolls (34-35) | Bloodscalp Ears (both sides) | 105578 | 1 | 25.2, 11.3 |

That is 12 pools, about 48 spots. To reach the Horde's 15 pools, three camps of the Horde with no Alliance quest in our data:

| # | Zone | Camp | Mobs (level) | Chest | Pools | Map |
|---|---|---|---|---|---|---|
| 10 | Stonetalon Mountains | Grimtotem Post | Grimtotem tauren (15-16) | 520001 | 1 | 76.4, 85.9 |
| 11 | Thousand Needles | Darkcloud Pinnacle | Grimtotem tauren (25-28) | 520003 | 1 | 34.5, 35.4 |
| 12 | Ashenvale | Warsong Lumber Camp | the Horde's own orcs (26-30) | 520003 | 1 | 87.0, 58.1 |

Above level 35 neither side has PvP chests. Camps for a later pair (a level 45 and a level 55 chest for each side): the
Hinterlands' troll villages (Zun'watha, Hiri'watha, Shadra'Alor 40-46, Jintha'Alor 45-51: Troll Necklace Bounty, Worth Its Weight
in Gold), the Ruins of Zul'Mamwe (Skullsplitter trolls 41-44: Troll Witchery), and the Burning Steppes' Blackrock orcs (54-57).

## The bosses' and events' chests, by name (session 72, the user)

| Chest | Change |
|---|---|
| Dark Coffer (Blackrock Depths) | its three blues 3 % each (were 0.2-0.5 %), and a blue of level 56 at 15 %: a blue in about one coffer in four (was 1 in 100) |
| Gordok Tribute (Dire Maul) | Treant's Bane 10 % (was 1 %); the Tarnished Elven Ring 50 % of its group (was a third) |
| Knot Thimblejack's Cache (Dire Maul) | Ogre Tannin always (was 35 %) |
| Old Treasure Chest (Scholomance) | a blue of level 60 at 25 % (it held greens only) |
| Relic Coffer (Blackrock Depths) | the Gryphonwing Long Bow 5 % (was 0.1 %), the Dark Iron Ring and the Fire Opal Necklace 10 % (were 0.5 and 0.4 %) |
| Shallow Grave (Zul'Farrak) | three times the money (54-393 copper, was 18-131); no scrolls |
| Supply Crate (Stratholme) | bags 5 % and 3 % (were 0.2 %), each scroll twice as often, Aquamarine and Star Ruby 5 % (were 0.2 and 0.1 %) |
| Witch Doctor's Chest (Zul'Farrak) | no grays, scrolls, bags or cloth; a green of level 47 always and a blue 10 %; Shriveled Heart 15 %, Gazlowe's Charm and the Necklace of Calisea 5 % each; the Flask of Mojo always (was 10.9 %) |

## The locked chests (session 72, the user)

"Locked chests are a between from unlocked treasure chests and dungeon chests. So same things, but less trade goods and food and
more valuable things. Gems, bags and weapons and armor. Add some blues to these as well. Make sure it also matches the levels and
lockpicking levels." Rings and necklaces are out, as in the treasure chests. A locked chest's level is its zone's, or its lock's
(lock / 5 + 5) when that is higher, so a harder lock in the same zone pays more: the Battered Footlocker of lock 70 in Stonetalon,
the Wetlands and Hillsbrad is level 25, the one of lock 110 is level 27. Every lock can be picked below its zone's level (a rogue's
cap is 5 x their level).

| Chest | Lock | Level | Where |
|---|---|---|---|
| Kolkar's Booty (3) | Kolkar Booty Key | 18 | The Barrens |
| Waterlogged Footlocker | 70 | 22 | Redridge, Ashenvale |
| Battered Footlocker | 70 | 25 | Stonetalon, Wetlands, Hillsbrad |
| Battered Footlocker | 110 | 27 | Hillsbrad, Wetlands, Stonetalon |
| Waterlogged Footlocker | 110 | 27 | Ashenvale |
| Hidden Strongbox | Rune of Opening | 35 | Alterac Mountains |
| Waterlogged Footlocker | 150 | 35 | Desolace |
| Battered Footlocker | 150 | 40 | Badlands |
| Dented, Mossy Footlocker | 175 | 40 | Badlands, Swamp of Sorrows, Desolace |
| Captain's Chest | Captain's Key | 45 | Tanaris |
| Dented Footlocker | 200 | 46 | Searing Gorge |
| Dented, Mossy Footlocker | 225 | 50 | Tanaris, Searing Gorge, Azshara |
| Large Mithril Bound Chest | 250 | 55 | Western Plaguelands |
| Scarlet Footlocker | 250 | 56 | Eastern Plaguelands |

## The dungeon chests (session 72, the user: "check dungeon chests and locked dungeon chests following same logic")

A dungeon's plain large chests sit above the open world's locked ones, and its locked chests sit on top. A dungeon's level is the
middle of its range (Wailing Caverns and the Deadmines 20, Shadowfang Keep 25, the Stockade and Blackfathom Deeps 27, Gnomeregan
32, Scarlet Monastery 37, Razorfen Downs 40, Uldaman 45, Blackrock Spire and Dire Maul 58, Stratholme 60). A chest that spawns in
several dungeons takes their middle. Rebuilt: the Large Battered Chest (20), the Large Solid Chests (27, 32, 37, 40, 58), the Large
Iron Bound Chests (27, 32, 37, 40), the Large Mithril Bound Chests (Uldaman 45, the high dungeons 58), and Scarlet Monastery's
Armor and Weapon Crates (37).

The bosses' and events' chests stay Blizzard's, without their recipes (049): the Chest of the Seven, the Arena Spoils, the Dark
and Relic Coffers, the Secret Safe, the Heart of the Mountain, Zul'Farrak's Shallow Graves and the Witch Doctor's Chest, Uldaman's
Ancient Treasure, Stratholme's Supply Crates and Postbox Parcels, Scholomance's Old Treasure Chest, Dire Maul's caches and tomes,
and the raids' chests. Each holds its own story's loot.

## Keys (for those without Blacksmithing or Engineering)

What opens a Lockpicking lock today, besides a rogue:

| Opener | Made by | Opens up to | Chests it opens |
|---|---|---|---|
| Silver Skeleton Key | Blacksmithing 100 | 25 | none of the footlockers (they start at 70) |
| Golden Skeleton Key | Blacksmithing 150 | 125 | the footlockers of 70 and 110 (levels 22-27) |
| Small Seaforium Charge | Engineering 100 | 150 | up to the footlockers of 150 (level 35-40) |
| Truesilver Skeleton Key | Blacksmithing 200 | 200 | up to the footlockers of 200 (level 46) |
| Large Seaforium Charge | Engineering 200 | 250 | every footlocker and the open world's Large Mithril Bound Chest |
| Arcanite Skeleton Key, Powerful Seaforium Charge | Blacksmithing 275, Engineering 275 | 300 | everything |

The keyed chests (Kolkar's Booty, the Hidden Strongbox, the Captain's Chest) have their own keys from their camps' mobs and need no
plan. The plan is for a warrior, mage or any non-rogue without those professions:

1. **A locksmith's stock.** Blacksmithing supply vendors (or one locksmith in each capital, both factions) sell the Golden,
   Truesilver and Arcanite Skeleton Keys in small numbers that come back over time, priced above their materials, so making them
   stays the cheaper way.
2. **Keys found while questing.** A skeleton key of the level now and then in the treasure chests (about 3 %) and in humanoids'
   pockets, so a found footlocker can often be opened on the spot.
3. **A locksmith's errand.** A short quest at each tier: bring the bars (Gold, Truesilver, Arcanite), get a few keys back.
   Repeatable in small numbers, a trade of what you gather, not a grind.
4. **Engineers' charges for sale.** As 1, with the Seaforium charges at the engineering supply vendors.

Recommended: 1 and 2 together (always a way, and sometimes a lucky find); 3 if keys feel too easy to buy. No new items are needed:
the keys already exist in the client's data.

**Decided** (the user): options 1 and 2, and the Silver Skeleton Key raised from 25 to 75 so it opens the first footlockers
(lock 70) at Blacksmithing 100, around level 20 ("Does it make sense to make a new key for up to 75 as well?"; no new items, so
the Silver one). World 050 (`tools/server-data/keys_patch.py`):
- the Silver Skeleton Key's spell (19646) opens up to 75. Its tooltip says "simple locks", with no number, so the client needs no
  text row. To try in game: whether the client itself refuses a lock of 70 before asking the server;
- the capitals' smithing vendors sell the Silver, Golden, Truesilver and Arcanite Skeleton Keys, three of each, back within the
  hour. The vendors are Kaita Deepforge (Stormwind), Thurgrum Deepforge (Ironforge), Mythrin'dir (Darnassus), Sumi (Orgrimmar),
  Taur Stonehoof (Thunder Bluff) and Samuel Van Brunt (Undercity). Prices: 25s, 75s, 2g, 6g (were 2s, 12s, 25s, 25s). The client
  shows its own prices, so item_hotfixes.py runs after, and the proxy restarts;
- world 048: from level 15, the treasure chests hold a skeleton key of their level 3 % of the time (Silver to level 24, Golden to
  34, Truesilver to 49, then Arcanite).

| Key | Opens up to | Footlockers |
|---|---|---|
| Silver | 75 (was 25) | the 70s (levels 22-25) |
| Golden | 125 | the 110s (27) |
| Truesilver | 200 | 150-200 (35-46) |
| Arcanite | 300 | 225-250 (50-56) |

## The footlockers are practice spots (session 72, the user)

After picking one at Durnholde Keep (20 copper, a Warped Blade, 2 Mulgore Spice Bread, an Elixir of Fortitude: 048's level-25
table, seen in game): "these footlockers were the ones used to level up lockpicking huh. They're dropping loot too good now, so it
should be limited picks ... and not open infinite like this." Chosen: a slow respawn, the five footlocker kinds only. World 051:
their 325 spawns come back after 24 hours (were 10 seconds to 2 hours), with 048's loot. The keyed chests and the Mithril Bound keep
their times. Lockpicking practice moves to what comes back often (the junkboxes, the lockboxes, the Practice Lockboxes at Alther's
Mill) until the rogue's rank quests exist. Replaced in session 73 by the quests (world 053, above).

## The skeleton keys for everyone (session 73: world 052)

Seen in game on Undalchemy (a rogue, no Blacksmithing): the Silver Skeleton Key said "Requires Blacksmithing (100)" in red, and
Sumi's four keys were red too. Blizzard's keys ask for the smith's skill to be used; 050 sold them without lifting it. The user:
"We have to remove the restriction for the keys", and "Keys seem kind of expensive. Maybe 10s 25s 50s 1g". World 052: no skill
needed, at 10s, 25s, 50s, 1g (still above the materials? the Silver's bars cost about that: the key stays worth making).

## The footlockers by quest (session 73: world 053)

The user: "while you are on a rogue quest, they can drop the current pool. If you're farming them without a quest, then we need to
nerf it to drop only sometimes greens but mostly grays, no elixirs, no bags and no ores. On quest you can open 5." Chosen: a
15-minute respawn (051's day undone), one quest per tier, off quest a green 10 %.

One quest per rank of Lockpicking (the user, after the five tiers: "only one quest for each proficiency"; the ranks of
docs/research/lockpicking-single-player.md). A footlocker counts for its own rank's quest and every easier one: Angor Fortress
(Badlands) mixes Journeyman (150) and Expert (175) footlockers, and the user's fourth there gave no Sprung Lock on Locks in the Dust.

| Quest | Rank | Lockpicking | Level | Footlockers | Reward |
|---|---|---|---|---|---|
| 60051 Rusted Tumblers | Apprentice | 70 | 18 (22) | Battered and Waterlogged, lock 70 | 50s |
| 60053 Locks in the Dust | Journeyman | 110 | 23 (30) | Battered and Waterlogged, locks 110 and 150 | 1g |
| 60054 Moss and Rust | Expert | 175 | 36 (42) | Dented and Mossy, locks 175-225 | 2g |
| 60055 Locks Worth Keeping | Artisan | 250 | 50 (56) | Scarlet, lock 250 | 3g |

(60052 is gone; 60053 kept its number, so a log holding it keeps its Sprung Locks.)

- Given and taken by the capitals' rogue trainers: Osborne the Night Man, Hulfdan Blackbeard, Syurna; Ormok, Carolyn Ward. Rogues only, each done once (the user: "Quests are a one of only."), no experience (the footlockers are the reward). Each asks for 5 Sprung Locks, a quest drop of the tier's
  footlockers while the quest is open.
- **On quest:** the off-quest table and a Sprung Lock (world 056, session 75, the user: "Lets fix footlockers to only be the
  nerfed version instead"). Until then the quest opened 048's full table, and 054's fix kept it open between the fifth Sprung
  Lock and the hand-in; 057 removed the lists nothing used after that.
- **What a soldier keeps** (world 059, session 75): one gray belonging or keepsake always (a candle, a spoon, a pocket watch, a
  rag doll; the Letter from the Front 2 %), and a shirt 15 % by the footlocker's rank (linen at Apprentice up to mageweave at
  Artisan). Lists in tools/server-data/footlocker_belongings_patch.py.
- **Off quest:** one gray always (the table's gray armor and weapons in one group), a green 10 % (the greens likewise), the copper
  on the chest. No blues, elixirs, potions, scrolls, stones, gems, bags, ore or food.
- The Sprung Lock is item 3500 ("Deprecated Battered Lock", unused), renamed by the proxy's row. One item for every tier: a rogue
  holding two tier quests at once fills both with the same locks (rare; the quests are in different level bands).
- Box Drops shows each footlocker once: since 056 the quest adds only a quest item, so world_chests.py makes no "on quest" view.
- The rogue's rank quests, when they come, can take these in.

## Where the footlockers lie (the server's map files: the water's surface at each spot)

`tools/server-data/ground_z.py` now reads the water too (`water(map, x, y)`). By spot:
- **Under water:** the Mossy Footlockers (Swamp of Sorrows 9 of 9, Desolace 3 of 3, Azshara 15 of 21); the Waterlogged ones of
  Redridge (31 of 31), of lock 110 in Ashenvale (15 of 15) and of Desolace (7 of 7).
- **Mixed:** the Waterlogged of lock 70 in Ashenvale are mostly on dry ground (22 of 31). The Battered Footlockers of the Wetlands
  are at or under the water's edge in about a fifth of their spots.
- **Dry land:** the Battered Footlockers of Stonetalon, Hillsbrad and the Badlands, the Dented ones (Badlands, Searing Gorge,
  Tanaris) and the Scarlet ones.

On the page, the footlockers now sit beside the rogue's groups (the user: "move the footlockers to be up there with rogues").

The Horde Supply Crates of Skulk Rock (the Hinterlands, 10 spots, all out at once; anybody opens them; they hold the Hinterlands
Honey Ripple for the Horde's "A Sticky Situation") join the PvP Chests (the user), with the Horde's supplies at level 45. The quest
item stays.

## Seen in game

- 2026-10-09 (session 72): a Battered Footlocker (lock 70, level 25) at Durnholde Keep, picked by the user: 20 copper, a Warped
  Blade, 2 Mulgore Spice Bread, an Elixir of Fortitude, as 048's level-25 table has it.
- GM-spawned chests (`.gobject add`) come up already open and can't be used ("That is already being used", "Out of range"): test on
  natural spawns.
- 2026-10-09 (session 73, Undalchemy, a Horde rogue):
  - Sumi (Orgrimmar) sells the four skeleton keys, three of each, at 050's 25s, 75s, 2g, 6g, all red: Blacksmithing needed. Fixed
    by 052 (no skill, 10s to 1g); to see again in game.
  - The Silver Skeleton Key on a lock-70 footlocker: not tried (the key needed Blacksmithing). To come, after 052.
  - 20 Small Barnacled Clams: 20 Clam Meat, 1 Small Lustrous Pearl (15 %: 3 expected; 1 in 20 happens about one time in five).
  - The PvP rule holds: the Horde Chest at Go'Shek Farm can't be used by the Horde (the user), the Alliance Chest at Dabyrie's
    Farmstead can (the user). `.pool spawns <pool>` names the spot that is out (`.gobject target <n>` takes a guid, not an entry).
  - The Blacksmithing Plans of Blackrock Depths: no spawn of 173232, 173234, 176325 or 176327 in the database.
  - The footlockers by quest (053), the user on Undalchemy: Rusted Tumblers taken from Ormok, the Sprung Lock dropped from the
    lock-70 footlockers, the quest handed in: "it worked end to end".
  - Not yet: a chest of each family; the off-quest table seen in game.

## Questions for the user

1. ~~Recipes in the dungeon chests~~: out (049).
2. ~~Dungeon chests' contents~~: decided (below).
3. **Respawn and spots.** Treasure chests come back 5 minutes after they're opened, one per pool. For one player that's a chest
   at every turn in a busy zone. Slower (30 minutes? an hour?) and worth more, or as it is?
4. ~~PvP Chests~~: decided (below).
5. **Locked chests and the rogue.** Locked chests now pay most in the open world, with a blue at 4 % (8 % for the Mithril
   Bound). Count them toward the rogue's journal's haunts and the trainer's blue counter (every 10 boxes)?
6. **Curios and journal pages** (session 70): a gray curio per chest family as in the junkboxes, or a journal page in the
   treasure chests now and then?
7. **The crates and finds left as they were:** Giant Clams, Shellfish Traps, Boxes of Assorted Parts, the Horde Supply Crate. A pass
   for each (clams and traps to fishing's loot; the parts box to engineering's), or leave them?
8. **Elixir rates.** 15 % (Battered) to 30 % (Large and Mithril Bound), one or two of the level: more, fewer, or stronger in the
   locked chests only?

## The dungeons' chests by size, a locked one in each (session 75)

The user: "do a pass on all dungeons to make sure they all have a good amount of chests based on the dungeon size ... appropriate
for their level", then "All the dungeons also need at least 1 locked chest appropriate to the dungeon level." World 064 made a
locked chest certain in every dungeon that had chests (their spots rolled plain or locked), Shadowfang's Battered Chests and
Stratholme's chests at their own level; world 065 placed the user's 69 spots (Chest Marker) in the dungeons that had none
(Ragefire Chasm, Razorfen Kraul, Zul'Farrak, Maraudon, the Sunken Temple, Blackrock Depths, Scholomance) and more in Uldaman,
Stratholme, Wailing Caverns and the Deadmines. The locks climb with the dungeons: 1, 25, 70, 125, 175, 200, 225, 250, 275.
Still to place: the Cathedral of Scarlet Monastery (no chests). Box Drops lists each dungeon with its chests.

