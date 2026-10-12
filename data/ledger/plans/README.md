# The professions plan

The master plan for professions on Dawn, our solo server: what to fix, what to add, in what order, and what you decide.
Written 2026-10-10 (session 78) from seven parts that agents researched and designed while you were away. Nothing in the game,
the server, the proxy or the databases has changed for it: this is a plan to build one step at a time, each step previewed on the
web, tested, then played.

Everything follows the project’s rules: no grinds (skills and recipes through quests, teachers, tests and real places; a rare
drop becomes a choice of one), Alliance and Horde alike, the world as the hero, the past by the Chronicle books and the present
by 1.12. And it is built for **one player and their alts**: everything worth sharing can be mailed, and every alt can walk the
same roads.

## The seven parts

| Part | What it holds |
|---|---|
| [01 Classic and WoW Forever](01-forever-and-classic.md) | 1.12’s twelve professions; what Forever changed (929 recipes of its own, camp objects, single-stat food, Enchanting that makes wands and off-hands) and what it left out (quality tiers, knowledge trees, crafting orders) |
| [02 Our server today](02-our-server-audit.md) | the audit: 1,265 recipes, the solo blockers, every material’s uses, alts today, 15 problems ranked |
| [03 What we can build](03-feasibility.md) | the technical verdicts: what the server, the proxy and the client allow, and what each idea costs |
| [04 Later expansions and other servers](04-later-expansions-and-other-servers.md) | Jewelcrafting, Inscription, Archaeology, the specializations from TBC to Dragonflight, upgrades, Turtle WoW and Ascension, with sources |
| [05 The six crafts](05-crafts-design.md) | Alchemy, Blacksmithing, Enchanting, Engineering, Leatherworking, Tailoring: paths, trees, rank quests, materials, upgrades, blockers |
| [06 Gathering and secondary skills](06-gathering-and-secondary-design.md) | Herbalism, Mining with Smelting, Skinning, Cooking, Fishing, First Aid: ranks by quest, paths, trees |
| [07 New professions and systems](07-new-professions-and-systems.md) | Survival, Jewelcrafting, Inscription, Archaeology, Woodworking; quality upgrades, skill trees and alts for every craft |

## What the research found

- **A third of the recipes are a grind.** 410 of 1,265 come only from drops or group content; 205 are world drops whose best
  chance per kill has a median of 0.38 %. 59 can’t be learned at all. They are the work list for profession quests (02).
- **A few walls stop a solo player cold.** Leatherworking’s top end (51 recipes) waits on an Engineer’s Salt Shaker every 72
  hours; the only Artisan Enchanting trainer stands inside Uldaman; the Black Anvil, the Black Forge and the Alchemy Lab are
  inside instances; world patch 001’s recipes need Naxxramas’s Frozen Rune (02).
- **The two sides aren’t equal.** 46 recipes only one side can learn (Cooking 17 Alliance against 8 Horde); only the Horde has an
  Artisan fishing teacher and Nat Pagle’s pole quests; only the Alliance has the lure quests (02, 06).
- **Many materials lead nowhere.** 13 leathers and scales feed one or two recipes, 18 trade goods none (02).
- **The proxy can add what the client lacks.** Riding proves it: its skill line and spells exist only as our proxy’s hotfix
  rows, and the client accepts them. New items already work. So new recipes, new paths and even new professions are possible;
  what’s missing is tooling: a writer for the server’s data files (DBCs) and three small proxy loaders so the trade window shows
  reagents, tools and stations (03).
- **The client keeps a forgotten profession.** Vanilla’s cut Survival (line 142, with Basic and Bright Campfire) is still in the
  1.14.2 client: a camp-and-wood skill almost for free (04, 07). So are vanilla’s cut cartographers, a mirrored pair (07).
- **Quality belongs to the item, not the copy.** “A green made blue” means trading item A for item B, exactly as 1.12’s
  Zandalar talismans and dungeon set quests already do (03, 07).
- **No sockets, no glyphs, no Archaeology screen** in 1.12; each new profession is designed around that (07).

## The professions at a glance

Three paths for every profession, chosen by quest at mid-skill (★ new names; the others are 1.12’s own).

| Profession | The three paths | Headline changes | Part |
|---|---|---|---|
| Alchemy | Apothecary★ · Elixirist★ · Transmuter★ | 49 grind recipes into rank quests; Alchemy Labs at Feathermoon and Stonard; the Transmuter supplies the alts | 05 |
| Blacksmithing | Armorsmith · Weaponsmith (sword, hammer, axe) · Mithril Order★ | 105 plans into quests; the Black Anvil and Forge at Thorium Point; Fiery and Lava Core by Thorium Brotherhood quests | 05 |
| Enchanting | Spellbinder★ · Warder★ · Artificer★ | the Artisan rank moved out of Uldaman to Kitta Firewind and Hgarth; scrolls so enchants travel between alts | 05 |
| Engineering | Gnomish · Goblin · Gunsmith★ | the 175–199 hole filled; nine lost schematics as rewards; rifles, scopes and shot | 05 |
| Leatherworking | Dragonscale · Elemental · Tribal | a role for every hide, scale and special leather; Refined Deeprock Salt sold | 05 |
| Tailoring | Moonweaver★ · Shadoweaver★ · Runeweaver★ | the 260–300 gap filled; the lost Stormcloth patterns taught; a bag in each path | 05 |
| Herbalism | Wildwarden★ · Forager★ · Herb-Healer★ | ranks by quest up to Flora Silverwind; second herbs and Black Lotus by path | 06 |
| Mining, with Smelting | Prospector★ · Smelter★ · Deepdelver★ | gems at a real rate; Smelt Dark Iron at Thorium Point; a Horde teacher outside the capitals | 06 |
| Skinning | Tanner★ · Big-Game Skinner★ · Scalecutter★ | tanners supply the salt (ends the 72-hour wall); rare pelts by path | 06 |
| Cooking | Hearthfire★ · Saltwater★ · Baker and Brewer★ | 15 one-side recipes taught to the other side; six Horde regional dishes to come | 06 |
| Fishing | Angler★ · Netcaster★ · Wreck-Diver★ | an Alliance Artisan teacher; Horde lure quests; trophy and treasure rolls by path | 06 |
| First Aid | Field Surgeon★ · Venom-Warden★ · Plaguewarden★ | Strong Anti-Venom by quest; a disease cure for classes without one | 06 |
| **Survival** (new, secondary) | Fieldcraft · Woodcraft · Gardening | camps and fires on the client’s own line 142, wood for everyone, Gardening folded in | 07 |
| **Jewelcrafting** (new, primary) | Goldsmith · Gem Cutter · Stonecarver | 1.12 makes no rings or necklaces; gems cut from vanilla ore become “settings” in the empty ring and neck enchant slot | 07 |
| **Inscription** (new, primary) | Scrollwright · Illuminator · Cartographer | the 24 stat scrolls nobody writes; vellums carry one alt’s enchants to another; the cut cartographers revived | 07 |
| **Archaeology** (new, secondary) | Field Archaeologist · Restorer · Lorekeeper | dig sites as quests and mounds, the home peoples first; restorations as once-per-character finds; the world as the hero | 07 |
| Woodworking | Bowyer · Staffwright · Carpenter (if built) | bows, crossbows, staves, shields and arrows; decided after Survival, Jewelcrafting and Inscription | 07 |

**Leatherworking, as you asked:** leathers stay the body of every piece; each tier’s cured hide makes three stat kits
(Strength and Stamina, Intellect and Spirit, Agility) for chest, legs, hands and feet; scales become mail by tier (Slimy Murloc to
Turtle below 45, Worn Dragonscale as everyone’s 50–55 mail, Heavy Scorpid at 55–60, the colored dragonscales as Dragonscale’s
role sets); every special leather (Thin Kodo, Raptor, Shadowcat, Thick Wolfhide, Warbear, Frostsaber, Chimera, Devilsaur, Core,
Primal Tiger, Silithid Chitin, Dreamscale) gets a set or a quest. The full table: [05, Leatherworking §4](05-crafts-design.md).

## Three systems for every profession

**Ranks without grinding** (06, 05). Trainers teach Apprentice; every later rank is a test quest. Each rank’s 75 points come
from practice up to a share (gathering 40, Cooking and First Aid 35, Fishing 30), lessons, first finds, the test and jobs, as the
Lockpicking design already works. The crafts add **commissions**: a repeatable trainer quest per rank asking for that rank’s
goods and paying a **choice of one** recipe; the 460 grind recipes move into them, unbound so a second copy can go to an alt.

**Paths and trees** (07 §C, 05, 06). A path is a marker spell taught by a quest, as 1.12’s Armorsmith is; its recipes and loot
sit behind it. Each profession gets a tree of 6–10 nodes earned by lessons, tests and places, never by grinding, drawn by
Forever UI on a specialization page. Cheap nodes: recipe unlocks, +skill and stat passives, gated loot. Costly nodes: extra
output, saved reagents, procs (each a hook in the server). Switching paths needs server code; the first version may simply let
a second path open at 300.

**Quality upgrades** (07 §B). Item A becomes item B: first a repeatable quest (A, materials and gold for B; **no code, now**),
later an upgrade recipe, and only as a bonus a small chance on craft. Stats are **chosen**, not rolled: the blue step offers up
to six fixed versions. One word per craft names the blue (Tempered, Tooled, Embroidered, Calibrated, Flawless, Illuminated,
Seasoned); the epic step needs Artisan, the path’s capstone, a material from a choice-of-one quest and a place a solo player can
reach, rare by effort, not luck. Every number checked against the item budget.

**Alts** (07 §D, 06). Gatherers feed crafters by mail; we make it easy: instant mail between characters of the same side (decided;
no mail across factions), perhaps three primary professions instead of two, recipe and material tooltips that name the alt who
knows or needs it, the Goblin Mining Helmet bound on equip, and a family workshop in a neutral town.

## The foundation, built once

Most of the plan is quests and world patches. Five pieces of tooling unlock the rest:

| Piece | What it is | What it unlocks | Size |
|---|---|---|---|
| **Proof of a new recipe** | one recipe under a new spell id making a new item | every new recipe and profession | small, a test |
| **DBC writer** | a tool that writes the server’s SkillLine, SkillRaceClassInfo and SkillLineAbility files | skill-ups for new recipes; new skill lines | medium, new |
| **Three proxy loaders** | SpellReagents, SpellTotems, SpellCastingRequirements, like the Faction one | the trade window shows reagents, tools and stations | medium, a proxy build |
| **Quest → skill points** | a server patch: a quest raises a skill by a set amount (classic’s own effect is an empty stub) | ranks by quest for every skill, Lockpicking included | medium, once |
| **The craft-yield hook** | a server patch reading a table: an extra item on craft, by recipe and path | the paths’ output bonuses, the chance on craft | medium, once |

Later: the switch script (paths changed for gold) and smaller hooks (first finds, gather procs).

## The roadmap

Each phase ends with you playing it; nothing of a later phase starts before. Inside a phase, one profession at a time.

| Phase | What | Code | You play |
|---|---|---|---|
| **0. Quick wins** | the blockers: Refined Deeprock Salt sold (and from tanners), Annora’s rank at Kitta Firewind and Hgarth, the anvils, forge and labs at Thorium Point, Feathermoon, Stonard and Light’s Hope (one station tried first), Smelt Dark Iron at Thorium Point, Fiery and Lava Core quests; the faction mirrors (Cooking’s 15 roads, lure quests for the Horde, Nat Pagle’s pole for the Alliance, the missing teachers); the Goblin Mining Helmet on equip; the mail settings | world patches, config | every craft reaches 300 alone |
| **1. Proofs** | a new recipe spell; the DBC writer; the three proxy loaders | tooling | one new dish or kit in the window, with its reagents |
| **2. Ranks by quest** | the quest → skill patch; then each skill’s ranks and each craft’s commissions, Leatherworking first, then Enchanting, Blacksmithing, Tailoring, Alchemy, Engineering; the gathering and secondary skills, Cooking first; Forever UI’s Journey page in every journal | patch once, then quests | a profession leveled by quests, no drop to farm |
| **3. Paths** | the markers and entry quests, the paths’ cheap gifts (gated loot, +skill, recipes); Forever UI’s specialization page with the tree | rows, quests, addon | a path chosen at 150–225 |
| **4. Materials and upgrades** | the leathers, hides and scales (05), cloth and stones; upgrade quests across the crafts; then upgrade recipes | world patches, new recipes | the dead materials used; a green made blue |
| **5. Survival** | the client’s line 142 to Journeyman, then Artisan; wood in the world; Gardening | small server patch, rows | camps and wood on every alt |
| **6. Jewelcrafting** | an Apprentice slice first (it tests whether the client opens a trade window for a skill it never had), then the whole craft | new skill line | rings and necklaces, settings |
| **7. The hooks** | the craft-yield hook; the switch script; chance on craft | server patches | the paths’ bonuses; switching |
| **8. Inscription, Archaeology** | Inscription (scrolls, then vellums with Enchanting, then the cartographers); Archaeology (the home peoples first) | new skill lines | — |
| **9. Woodworking** | decided after 5–8 | — | — |

The previews: the Tradeskill DB (:8790) shows each craft’s journey before and after; Forever UI’s pages go to the web first.

## What we leave out

Crafting orders and patron orders (they need other players), Dragonflight’s quality ranks and Concentration, profession
equipment slots, sockets and glyphs (1.12 has none), random suffixes on anything worth crafting twice (the grind the rules
forbid), Runecarving (no 1.12 tradition), and bound recipes where a quest every alt can do will serve.

## Your decisions

Gathered from the parts; the first five shape Phase 0.

1. ~~**Mail between your characters**~~ **Decided** (session 78): instant between characters of the same side; no mail across
   factions.
2. **Primary professions per character:** stay at two, or three (`MaxPrimaryTradeSkill`)? Or some new crafts as secondary skills?
3. **Refined Deeprock Salt:** sold by vendors, made by tanners (Skinning’s Tanner path), or both? Its price?
4. **Raid recipes:** which may come down to Revered faction rewards, and which stay in raids?
5. **Stations:** move the Black Anvil, Black Forge and Alchemy Lab to towns, or add copies beside the originals?
6. **Switching paths:** a paid switch (needs server code), or a second path at 300 by a long quest?
7. **Paths only add recipes,** or do some take recipes away (only the Gunsmith’s two top rifles in the design)?
8. **The rank share of practice:** 40 for gathering, 35 for Cooking and First Aid, 30 for Fishing, as proposed?
9. **Survival’s name,** beside the hunters’ Survival talents: keep it, or Fieldcraft or Woodcraft?
10. **Ring and neck settings:** full strength (+9 at 60) or capped at +5?
11. **Woodworking:** a full craft, or only Survival’s arrows and furniture?
12. **The upgrade words** (Tempered, Tooled, Embroidered, Calibrated, Flawless, Illuminated, Seasoned) and the epics’ names.
13. **The family workshop:** Booty Bay, Gadgetzan or Everlook?

## Unknowns to test first

- Whether the client accepts a **castable** spell under a new id (Riding’s are passive): Phase 1’s proof.
- Whether it opens a **trade window for a skill line it never had**: Jewelcrafting’s slice.
- Whether a newly spawned **Black Anvil or Alchemy Lab** counts as the station: one tried in Phase 0.
- Whether the client shows a **cooldown** changed only on the server (the Salt Shaker, transmutes).
