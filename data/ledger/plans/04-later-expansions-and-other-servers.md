# Professions, part D: later expansions, other seasons, other servers

Research for the professions plan (2026-10-10, unattended; web sources, plus one look at the 1.14.2 client’s cached skill-line
table; nothing in the addon, the server, the proxy or the database changed). Part A
([01-forever-and-classic.md](01-forever-and-classic.md)) covers 1.12 and WoW Forever and isn’t repeated here; what our setup
allows is part C ([03-feasibility.md](03-feasibility.md)). Every claim links its source, in our own words; *(inference)* marks
our reading. Retail details change patch by patch, so dates are given where they matter.

**One local finding first.** The 1.14.2 client’s SkillLine table (`(private files)`)
still holds **Survival (142)**, a secondary skill with two abilities, Basic Campfire and Bright Campfire. It is vanilla’s cut
“Survival Skills”, planned to make campfires and spirit-giving torches and dropped in beta
([wiki](https://warcraft.wiki.gg/wiki/Survival_Skills)). A camp-and-wood secondary skill could live on that line instead of a new
one *(inference; untested)*.

## 1. Professions added later

**Jewelcrafting (TBC, patch 2.0.1).** Makes rings, necklaces, trinkets, figurines only their maker can use, and cut gems for
socketed gear ([wiki](https://warcraft.wiki.gg/wiki/Jewelcrafting)). *Prospecting* breaks five ore of one kind into gems, at least
one per try since 2.1.0 ([wiki](https://warcraft.wiki.gg/wiki/Prospecting)). Vanilla ores already prospect into vanilla gems:
Copper (skill 20) into Tigerseye, Malachite and sometimes Shadowgem ([wiki](https://warcraft.wiki.gg/wiki/Copper_Ore)); Tin into
Moss Agate, Lesser Moonstone, Shadowgem; Iron into Citrine, Jade, Lesser Moonstone; Mithril into Aquamarine, Citrine, Star Ruby,
rarely the big gems; Thorium into Star Ruby, Large Opal, Blue Sapphire, Azerothian Diamond, Huge Emerald
([Warcraft Tavern](https://www.warcrafttavern.com/tbc/guides/prospecting/)). Later, recipes came from currencies and research:
Dalaran Jewelcrafter’s Tokens from dailies bought epic cuts (3.2.0), and Mists made rare cuts a daily research
([wiki](https://warcraft.wiki.gg/wiki/Jewelcrafting), [wiki](https://warcraft.wiki.gg/wiki/Discovery)). **Vanilla fit:** every gem
exists and Mining feeds it; what 1.12 lacks is sockets (part C).

**Inscription (Wrath, 3.0.2).** *Milling* turns five herbs of a kind into one to four pigments, now and then a rarer one
([wiki](https://warcraft.wiki.gg/wiki/Milling)); pigments become inks; inks become glyphs, scrolls, off-hand tomes, Darkmoon cards
and decks, vellums for enchanters, the scribe’s own shoulder inscriptions and fortune cards
([wiki](https://warcraft.wiki.gg/wiki/Inscription)). The old-world herbs fill six pigment tiers, from Alabaster (Peacebloom,
Silverleaf, Earthroot) to Silvery and Sapphire (Golden Sansam, Dreamfoil, Mountain Silversage, Sorrowmoss, Icecap)
([wiki](https://warcraft.wiki.gg/wiki/Pigments)). Many glyphs came from “research” recipes that taught one at random
([wiki](https://warcraft.wiki.gg/wiki/Discovery)). **Vanilla fit:** milling needs only herbs; glyphs need a UI 1.12 lacks, but
scrolls, vellums, cards and off-hands don’t *(inference)*.

**Archaeology (Cataclysm, 4.0.3a).** A secondary skill from level 20 with a Survey spell. Four dig sites per continent, each
for one people and private to the player (no competition); a theodolite points to finds; 5–9 fragments per survey since 4.3.0,
six finds per site since 5.0.4; keystones add progress. You research one artifact per people at a time: common ones are flavor
and vendor items, rare ones (mounts, pets, toys, weapons, armor) come once per character, with titles at 1, 10 and 20 rares. The
wiki calls it a casual downtime profession ([wiki](https://warcraft.wiki.gg/wiki/Archaeology)). **Vanilla fit:** its Dwarf, Night
Elf, Troll and Fossil fields are old-world ones; the survey and the research bar are client features 1.12 lacks *(inference)*.

**Runeforging (Wrath, 3.0.2).** Death knights only: enchant-like weapon runes with no reagents, applied and swapped at a
runeforge; a rune and an ordinary enchant replace each other ([wiki](https://warcraft.wiki.gg/wiki/Runeforging)). The idea for us:
a free, swappable, place-bound enchant.

**Gathering perks (Wrath, 3.0.2).** Herbalism’s Lifeblood (a self-only heal over time, three-minute cooldown), Mining’s Toughness
(more health), Skinning’s Master of Anatomy (critical strike rating), six ranks, the first at Journeyman
([Engadget, 2008](https://www.engadget.com/2008-10-16-patch-3-0-2-guide-to-the-new-profession-abilities.html)). Master of
Anatomy left in 6.0.2 ([wiki](https://warcraft.wiki.gg/wiki/Master_of_Anatomy)), the others with it *(inference)*.

**Mining’s smelting.** Kept through Cataclysm; from Legion, players report, new ores went straight into recipes with no bars
([Blizzard forum](https://us.forums.blizzard.com/en/wow/t/from-smelting-bars-to-mining-techniques/242700); no patch note found).
Dragonflight made milling and prospecting one-click recipes per expansion
([Warcraft Tavern](https://warcrafttavern.com/wow/news/dragonflight-professions-overhaul-detailed)) and put “refining” (five
lower-quality reagents into one better) behind gathering specializations
([wow-professions](https://www.wow-professions.com/guides/dragonflight-crafting-system-overview)).

## 2. Specializations through the expansions

### The Burning Crusade

| Profession | Paths | How chosen | What it gives |
|---|---|---|---|
| Alchemy | Elixir, Potion or Transmutation Master | skill 325, level 68; a quest each: a Botanica drop (Potion), Black Morass essences plus elixirs (Elixir), four Primal Might (Transmutation) | a chance of extra output, guides estimate 15–17% more; switching costs 150 gold, no new quest ([Warcraft Tavern](https://www.warcrafttavern.com/tbc/guides/alchemy-specializations/), [Icy Veins](https://www.icy-veins.com/tbc-classic/alchemy-profession-and-leveling-1-375-guide)) |
| Tailoring | Spellfire, Shadoweave or Mooncloth | skill 350, level 60; quests in Shattrath | double cloth from the path’s cooldown cloth, made at a place (a Moonwell, the Altar of Shadows, Netherstorm); bind-on-pickup sets only that path can wear; 150 gold to switch ([Warcraft Tavern](https://www.warcrafttavern.com/tbc/guides/tailoring-specializations/)) |
| Blacksmithing | Armorsmith, or Weaponsmith with Sword, Axe or Hammer | 1.12’s (200, level 40) | upgrade chains: Lionheart Blade to Champion to Executioner, Breastplate of Kings to Bulwark to Bulwark of the Ancient Kings; path recipes untradable; 100 gold to unlearn ([Warcraft Tavern](https://www.warcrafttavern.com/tbc/guides/blacksmithing-specializations/)) |
| Leatherworking | Dragonscale, Elemental, Tribal | 1.12’s | Outland patterns for each (Netherscale and Netherstrike for Dragonscale) ([wiki](https://warcraft.wiki.gg/wiki/Dragonscale_Leatherworking)) |
| Engineering | Gnomish, Goblin | 1.12’s | switching for 150 gold from 3.2.0 until Cataclysm ([wiki](https://warcraft.wiki.gg/wiki/Gnomish_Engineering)) |

Cataclysm’s 4.0.1 removed the Blacksmithing, Leatherworking and Tailoring paths
([wiki](https://warcraft.wiki.gg/wiki/Weaponsmith), [wiki](https://warcraft.wiki.gg/wiki/Spellfire_Tailoring)); Alchemy’s
masteries stayed and were still being changed in 4.3.0 ([wiki](https://warcraft.wiki.gg/wiki/Elixir_Master)).

### Wrath to Mists: perks, discovery, dailies

- **Self-only perks.** Each craft gave its owner a bonus: sockets on one’s own bracers and gloves (Blacksmithing), fur linings
  for bracers (Leatherworking), cloak embroideries (Tailoring), ring enchants (Enchanting), Dragon’s Eye gems (Jewelcrafting),
  tinkers (Engineering), Mixology, stronger and longer elixirs (Alchemy), shoulder inscriptions (Inscription)
  ([wow-professions](https://www.wow-professions.com/wotlk/wotlk-classic-profession-bonuses-perks)).
- **Discovery.** From TBC, crafting certain potions or transmutes could teach a new recipe at random; Wrath’s Northrend
  research and Mists’ daily research items (Jewelcrafting, Tailoring, Leatherworking, Blacksmithing) did the same on a cooldown
  ([wiki](https://warcraft.wiki.gg/wiki/Discovery)).
- **Dailies with a recipe currency:** Jewelcrafter’s Tokens, cooking awards (section 5).

### Warlords and Legion

- **Warlords:** a garrison profession building anyone could build; four-hour work orders and a daily cooldown turned raw
  materials into the key reagent; most new recipes needed no skill
  ([wow-professions](https://www.wow-professions.com/guides/wod-crafing-system-changes),
  [Icy Veins](https://www.icy-veins.com/wow/garrison-leveling-blacksmithing-in-warlords-of-draenor)). The Lumber Mill was
  retail’s woodcutting: mark trees, harvest Timber, turn it in by work order
  ([wiki](https://warcraft.wiki.gg/wiki/Lumber_Mill_(garrison))).
- **Legion:** quest lines per profession across the zones; recipes with three ranks, higher ranks costing fewer materials,
  from quests, vendors, world quests, reputation and dungeons
  ([Wowhead](https://www.wowhead.com/cn/guide/professions/legion/professions-overview), Chinese mirror of the English guide).

### Dragonflight to Midnight

- **Specializations and knowledge.** Three or four paths per primary profession, unlocked at skill 25, 50, (75) and 100;
  taking one doesn’t lock the others ([wow-professions](https://www.wow-professions.com/guides/dragonflight-crafting-system-overview)).
  Blacksmithing’s four (Armorsmithing, Weaponsmithing, Specialty Smithing, Hammer Control) take about 800 knowledge to finish,
  with nodes per slot or weapon type and new plans along the way
  ([Icy Veins](https://www.icy-veins.com/wow/professions-blacksmithing)). Knowledge comes from weekly quests, one-time treasures,
  treatises, drops, and the **first craft of each recipe or first gather of each material**
  ([wow-professions](https://www.wow-professions.com/guides/dragonflight-crafting-system-overview),
  [Icy Veins](https://www.icy-veins.com/wow/professions-blacksmithing)). Trees couldn’t be reset
  until Midnight’s 12.1 gave each profession one reset
  ([wow-professions](https://www.wow-professions.com/news/midnight-patch-12-1-knowledge-point-reset)).
- **Crafting stats.** Inspiration (a chance of bonus skill), Resourcefulness (fewer reagents), Multicraft (extra stackable
  items), Crafting Speed ([Warcraft Tavern](https://warcrafttavern.com/wow/news/dragonflight-professions-overhaul-detailed)). The War
  Within replaced Inspiration’s luck with **Concentration**, a pool you choose to spend for higher quality, and Ingenuity, a
  chance to get it back ([Warcraft Tavern](https://warcrafttavern.com/wow/news/new-concentration-system-for-professions-in-the-war-within)).
- **Profession equipment.** One tool and two accessories, worn only for profession actions
  ([Warcraft Tavern](https://warcrafttavern.com/wow/news/dragonflight-professions-overhaul-detailed)); other crafts make them
  (Blacksmithing’s Specialty Smithing makes tools) ([Icy Veins](https://www.icy-veins.com/wow/professions-blacksmithing)).
- **Crafting orders.** Public, guild or personal; a commission; delivery by mail
  ([Warcraft Tavern](https://warcrafttavern.com/wow/news/dragonflight-professions-overhaul-detailed)). The War Within added
  **patron orders** from NPCs, paying materials and recipes
  ([Wowhead](https://www.wowhead.com/news/first-look-at-npc-work-orders-in-the-war-within-earn-materials-and-recipes-343640)),
  and later knowledge as a catch-up
  ([Wowhead](https://www.wowhead.com/news/profession-catchup-mechanic-in-the-war-within-wowhead-economy-weekly-wrap-up-346-347616)).
- **Warband sharing.** The Warband bank works as a reagent bank all characters craft from without withdrawing; reputation is
  shared across the Warband ([Blizzard](https://worldofwarcraft.blizzard.com/en-us/news/24115313/)); from 11.0.5 orders can be
  filled from it ([Blizzard Watch](https://blizzardwatch.com/2024/10/10/patch-11-0-5-youll-able-fill-crafting-orders-using-warbank));
  the Kej currency behind +10 knowledge items moves between characters, so alts catch up fast
  ([wow-professions](https://www.wow-professions.com/guides/the-war-within/weekly-profession-knowledge-points)). Recipes and
  knowledge stay per character (no source says otherwise).
- **Midnight (12.0).** Consumables down to two qualities; crafting orders from skill 15; a profession-specific currency for
  recipe purchases ([Icy Veins](https://icy-veins.com/wow/professions)).

**For one player and alts:** knowledge from first crafts and gathers, treasures and quests; NPC patron orders; a shared reagent
bank; alt catch-up; quality you choose (Concentration) rather than roll. **Needs a crowd:** public, guild and personal orders;
commissions; reagent-quality markets; the scarcity of knowledge, which pushes players to one specialist per profession
([Icy Veins](https://www.icy-veins.com/wow/professions-blacksmithing)).

## 3. Item quality upgrades

- **Sockets and gems (2.0.1).** Red, yellow, blue and meta sockets; a bonus when all match; colors gone in 7.0.3. Wrath let
  blacksmiths add a socket to their own bracers and gloves, and made the Eternal Belt Buckle, a socket for anyone’s belt
  ([wiki](https://warcraft.wiki.gg/wiki/Socket)).
- **Upgrade by recipe.** TBC’s weapon and armor chains (section 2) turn a crafted item into its better self. Season of
  Discovery did the same in Phase 4: “Tempered” Dark Iron pieces bought from Lokhtos use the Dark Iron item as input, and many
  older recipes gained enhanced versions with Molten Core materials
  ([Warcraft Tavern](https://www.warcrafttavern.com/wow-classic-sod/guides/blacksmithing/),
  [Warcraft Tavern](https://www.warcrafttavern.com/wow-classic-sod/guides/professions-overview/)).
- **Staged crafted upgrades.** Warlords: profession “essences” raised crafted gear in stages (armor to 680 by 6.1) ([Engadget](https://www.engadget.com/2015-01-19-patch-6-1-stage-4-upgrades-for-crafted-gear-new-alchemy-trinke.html)).
  Legion: crafted items destroyed at the Obliterum Forge gave Obliterum, which raised other crafted armor 5 item levels a step
  ([wiki](https://warcraft.wiki.gg/wiki/Obliterum)). Shadowlands: legendary bases in ranks, the Vestige of Origins adding two
  ([wow-professions](https://www.wow-professions.com/news/new-profession-recipes-in-shadowlands-patch-9-1)).
- **Vendor upgrades.** Mists (5.1.0) to Midnight, paid in Valor, Justice, then stones and crests; Dragonflight halved the cost for
  alts up to an item level the account already reached ([wiki](https://warcraft.wiki.gg/wiki/Item_upgrade)).
- **Dragonflight quality and recrafting.** Gear has five quality ranks, reagents three; the rank comes from skill against the
  recipe’s difficulty, better reagents adding skill. *Recrafting* takes the item back with some reagents and Artisan’s Mettle to
  raise its quality or swap optional reagents ([Warcraft Tavern](https://warcrafttavern.com/wow/news/dragonflight-professions-overhaul-detailed)).
  Optional reagents: **Missives** set two secondary stats, **embellishments** add a strong effect (two worn at most), and Primal
  Focus reagents (or a Primal Infusion from Renown) lift a craft to Heroic or Mythic raid level ([wiki](https://warcraft.wiki.gg/wiki/Embellishment),
  [Warcraft Tavern](https://warcrafttavern.com/wow/news/dragonflight-professions-overhaul-detailed)).

### Classic seasons

- **Season of Discovery.** Skill caps rose by phase (150, 225, 300); the first phases’ new recipes sat behind an epic quest chain,
  among them bind-on-pickup epic helms for three crafts and personal-use items for Alchemy and Enchanting
  ([Warcraft Tavern](https://www.warcrafttavern.com/wow-classic/news/phase-2-profession-updates-season-of-discovery/)).
  Specializations came by quest in Phase 3; in Phase 5 Blacksmithing and Leatherworking let one character learn every path,
  and engineers may learn the other side’s schematics
  ([Warcraft Tavern](https://www.warcrafttavern.com/wow-classic-sod/guides/professions-overview/)). Recipe sources moved
  through the phases: dungeon drops, Gnomeregan vendors, quest chains, the Thorium Brotherhood, Zandalar, Cenarion Circle and
  Argent Dawn, raids ([Warcraft Tavern](https://www.warcrafttavern.com/wow-classic-sod/guides/blacksmithing/)).
- **Waylaid Supplies.** Bound crates from mobs and chests, turned in to a supply faction (Durotar Supply and Logistics, the
  Azeroth Commerce Authority); a full shipment adds crafted or gathered goods; rewards include a bag, armor and class runes
  ([Warcraft Tavern](https://warcrafttavern.com/wow-classic/guides/season-of-discovery-waylaid-supplies-reputation-guide)). WoW
  Forever kept the faction and sells new Enchanting formulas there
  ([Warcraft Tavern](https://www.warcrafttavern.com/forever/news/waylaid-supplies-factions-from-sod-spotted-in-wow-forever/),
  [Warcraft Tavern](https://www.warcrafttavern.com/forever/news/new-enchanting-formulas-for-world-of-warcraft-forever/)).
- **Runes (engravings).** Found by quests, drops and unexplained world puzzles, engraved on gear for free and swappable
  outside combat; from Phase 6 sold for a copper ([Icy Veins](https://icy-veins.com/wow-classic/season-of-discovery-rune-overview),
  [Warcraft Tavern](https://www.warcrafttavern.com/wow-classic/guides/where-to-find-the-sword-and-board-rune-in-season-of-discovery-sod/)).
- **Season of Mastery** changed gathering, not crafting: more herb and ore nodes, a Black Lotus chance for top herbalists, more
  Plaguebloom, more elementals ([wowisclassic](https://www.wowisclassic.com/en/news/classic-season-of-mastery-official-list-of-changes/)).
  **Hardcore:** no profession changes found.

## 4. Community servers

Status first: Turtle WoW lost Blizzard’s lawsuit and shut down in May 2026
([Icy Veins](https://wp-prod.icy-veins.com/turtle-wow-is-over-blizzard-settlement-forces-shutdown/)); Everlook closed after a
cease and desist in September 2025 ([gamer.org](https://www.gamer.org/everlook-server-shutdown-confirmed-blizzards-crackdown-continues/));
Blizzard sued Project Ascension in June 2026 ([Aftermath](https://aftermath.site/blizzard-project-ascension-lawsuit/)). We take
their designs as ideas only.

- **Turtle WoW: Jewelcrafting.** Trainers in the capitals; over 200 items: rings, necklaces, staves, trinkets, off-hand frills,
  helmets and gemstones. New materials (gritted papers, polishing oils, Amber Topaz, Pure Moonstone) and a cross-craft one
  (Enchanted Gemstone Oils from Enchanting). Two paths at skill 225 and level 40 by quest: **Goldsmith** (the gear, epics
  exclusive) and **Gemology** (gemstones that empower necklaces and rings). Gemstone Clusters recycle materials into more gems;
  Rare Gemstone Deposits replace some Thorium veins (Mining 310) and always give Imperial Topaz
  ([Turtle WoW](https://turtlecraft.gg/jewelcrafting)). It fits 1.12 without sockets: the gems go into jewelry recipes.
- **Turtle WoW: Survival and Gardening.** Survival, trained at Nesingwary’s camp, makes a Dim Torch and Bright Campfire (Spirit
  for the party), a Traveler’s Tent (faster rested experience, up to five together), a Fishing Boat (+50 Fishing), lanterns,
  Murloc’s Flippers and a wooden planter. Gardening opens at Survival 75 with a quest: seeds, Un’Goro Soil and spring water in
  the planter, watered or fertilized every nine minutes ([Turtle WoW](https://turtlecraft.gg/survival-and-gardening)). This is
  the client’s unused Survival line put to work *(inference)*.
- **Project Epoch.** No new professions, by one player’s account; new crafted items such as a level-20 tailoring helm, and
  ring enchants ([blog](https://sonicdoomofthesouth.bearblog.dev/turtle-wow-or-project-epoch-my-weekend-on-both/)).
- **Ascension’s Conquest of Azeroth (July 2026).** Woodcutting gathers timber from trees, fallen logs and wood nodes in tiers
  (Common Timber, Hardwood from level 30 zones, Ancient Heartwood from special nodes and world bosses, Treated Planks);
  Woodworking makes staves, bows, shields, furniture and the components its gear-upgrade tiers need, which can be bought instead
  ([fan wiki](https://conquest-of-azeroth.wiki/features/woodcutting-woodworking/)). Ascension’s changelog (as indexed) adds
  bucklers, spell tomes, arrows, spears and polearms, and says Woodworking takes no primary slot
  ([changelog](https://ascension.gg/zh/changelog/2026/07/09)).
- **RuneScape** is the model those follow: Woodcutting feeds Fletching (bows, arrows) and Firemaking, reworked together in 2024
  ([RuneScape Wiki](https://runescape.wiki/w/2024_Woodcutting,_Fletching,_and_Firemaking_update)).
- **Classic+ proposals.** A Blizzard-forum proposal for Classic asked for Lumberjack (axe, trees that fall after a few chops,
  wood from mobs and chests) and Woodworker (maces, staves, bows, arrows, shields, bank-only boxes); replies objected that it
  is retail’s idea and would need new loot and NPCs
  ([forum](https://us.forums.blizzard.com/en/wow/t/profession-proposal-for-classic/308867)). Blizzard’s own Classic+ is WoW
  Forever (part A).

## 5. Secondary skills in later versions

- **Cooking.** Wrath: Dalaran dailies paid Dalaran Cooking Awards for recipes, Northern Spices and a Chef’s Hat at 100
  ([wiki](https://warcraft.wiki.gg/wiki/Dalaran_Cooking_Award)). Cataclysm: one of five daily quests in each capital, mostly
  gathering near the city, paid Chef’s Awards for recipes ([wiki](https://warcraft.wiki.gg/wiki/Chef%27s_Award)). Mists: Zen
  Master by quest at Halfhill, then the **six Ways**, each with its own Ironpaw trainer and stat (Grill Strength, Wok Agility,
  Pot Intellect, Steamer Spirit, Oven Stamina, Brew none), all learnable, ending in banquets; Ironpaw Tokens from dailies buy
  special reagents ([Warcraft Tavern](https://www.warcrafttavern.com/mop/guides/cooking-specializations-master-the-way-of-the-brew-grill-oven-pot-steamer-wok/),
  [Icy Veins](https://www.icy-veins.com/mists-of-pandaria-classic/cooking-profession-and-leveling-guide)); vegetables came from
  the player’s farm at Sunsong Ranch ([wiki](https://warcraft.wiki.gg/wiki/Cooking)).
- **Fishing.** TBC: Old Man Barlo’s dailies, one for crocolisks fished in the capitals ([wiki](https://warcraft.wiki.gg/wiki/Old_Crafty)). Wrath 3.1: Marcia
  Chase’s Dalaran dailies with treasure bags; poles from dailies and from Kalu’ak reputation; skill requirements and Nat Pagle’s
  quest dropped ([wiki](https://warcraft.wiki.gg/wiki/Fishing), [wiki](https://warcraft.wiki.gg/wiki/Fishing_quests)).
  Cataclysm: capital dailies from level 10 and skill 1 ([Warcraft Tavern](https://warcrafttavern.com/cataclysm/guides/fishing-daily-quests)).
  Mists: The Anglers and Nat Pagle as reputations, poles at Honored and Revered, a Fish of the Day. Battle for Azeroth: a
  Fishing Journal ([wiki](https://warcraft.wiki.gg/wiki/Fishing)). Legion: the Underlight Angler, a pole earned by catching
  every rare fish, with a trait tree grown by fishing; fishing masters rotate daily
  ([wiki](https://warcraft.wiki.gg/wiki/Underlight_Angler)).
- **First Aid.** The Triage quest gave bandages and a Trauma Certification; anti-venoms at three ranks; removed in 8.0.1,
  bandages to Tailoring, liquids to Alchemy ([wiki](https://warcraft.wiki.gg/wiki/First_Aid)). No “trauma kit” item was found.
- **Archaeology** (section 1): private dig sites, rewards once per character.

## What fits a solo 1.12 server

Ranked by value for one player with alts against cost in our setup (client limits: part C).

1. **Recipes taught by profession quests and dailies with a token** (Legion’s quest lines, Dalaran and Chef’s Awards, Ironpaw
   Tokens, SoD’s epic chains, NPC patron orders). Solo, repeatable on every alt, built from quests and vendors the server
   already handles; it is the home for the recipe drops we took out.
2. **Upgrade by recipe: green to blue.** A recipe that takes the crafted item plus rarer materials and makes its better version
   (TBC’s Lionheart chain, SoD’s Tempered pieces). Quality upgrades with no quality system; each step is one recipe spell.
3. **Three paths per profession, chosen by quest, switched for gold.** TBC’s output bonuses (extra potions, double cloth at a
   place) and Mists’ six Ways show it works for Cooking too; Fishing and First Aid can take paths by water and by wound. For one
   player SoD’s Phase 5 lesson applies: let the paths be learned in turn, not locked for good.
4. **Self-only perks** (Wrath’s linings, embroideries, ring enchants; the gathering perks): a reason to keep a profession on the
   character that plays, not only on a crafting alt.
5. **Gems from ore and pigments from herbs.** Vanilla’s ores already prospect into vanilla gems and its herbs fill six pigment
   tiers. Turtle’s Gemology, gems set into jewelry recipes, avoids the sockets 1.12 lacks.
6. **Survival on the client’s own line 142**, with wood: campfires, torches, tents, a boat (Turtle), Gardening as its offshoot
   (Mists’ farm, Turtle’s planter), trees as the Lumber Mill and Conquest of Azeroth gather them, Woodworking for staves, bows,
   arrows and shields. The biggest build here, but it uses many unused materials.
7. **First-craft and first-gather rewards** (Dragonflight’s knowledge, as experience or a skill bonus): steady progress without
   grinds, again on every alt.
8. **Supply crates to a faction** (SoD, kept by Forever): profession goods turned into reputation and recipes.
9. **Archaeology-lite:** private dig sites for one people at a time, rewards once per character, made of quests and objects.

**Leave out:** crafting orders, quality ranks and Concentration, profession equipment slots, glyphs and sockets. They need other
players or client features 1.12 doesn’t have; the upgrade recipes and paths above give the same feeling of progress.
