# Lockpicking for one player: research and a proposal

Session 70, 2026-10-09. The user: "Lockpicking is a grind and doesn't make a lot of sense for single player. We should re-invent
how it works in the game. Add some quests to go practice and treat it like professions. Apprentice Lockpicking etc. The locations
to practice would be the quest locations, but we can make it more interesting. Do some research on how we should treat
lockpicking for single player."

Sources: our server's code and data (read this session), docs/research/forever-lockpicking-quests.md (Forever adds no lockpicking
quests; the 1.12 chains end at Alther's Mill and the Tide Razor), the Lockpicking journal (0.260+). What is inference is marked.

## How it works today (our server)

- **Learned:** Pick Lock from the rogue trainer at 16. The skill's cap is **5 x your level**, raised with each level
  (Player::UpdateSkillsForLevel), so a level 30 rogue can reach 150 whatever they do.
- **Raised:** like Herbalism (Player::UpdateGatherSkill): a lock of your skill + 25 or less is orange (a point every time,
  SkillChance.Orange 100), to + 50 yellow (75 %), to + 100 green (25 %), then gray. One point a success.
- **What there is to pick:** lockboxes in the bags (mostly from pickpocketing humanoids), chests and footlockers in the world
  (few, spread out, slow to respawn), dungeon doors, and the two level-16 class-quest spots (Alther's Mill, the Tide Razor). An
  opened lockbox can't be locked again.

## Why it's a grind, and why it's worse alone

1. **The supply is the bottleneck, not the skill.** Points come one per lock; locks come from pickpocketing a pack at a time or
   from footlockers that respawn slowly. The skill climbs with your level for free (the cap) but your points lag behind it.
2. **Its purpose was social.** In a full realm a rogue opened other players' lockboxes (tips, trade chat) and opened dungeon
   doors for the group. Alone there are no other players' boxes and no group waiting at the door. What's left is opening your own
   boxes, whose contents are modest.
3. **No milestones.** It's one long bar, 1 to 300, with nothing marking the way: no ranks, no trainer, no quest after 16. Next to
   the professions (Apprentice to Artisan, a trainer and a book at each step) it feels like an afterthought.
4. **Nothing pulls you to the places.** The world's chests sit where they sit; nothing tells you why to go there.

## What the single-player design should do (principles)

- **Treat it as a profession of the rogue's own:** four ranks with a quest at each, a cap per rank, the journal as its book.
- **Make practice a place and a story, not a farm:** each rank's quest sends you somewhere with locks to work, built so you leave
  with the rank's skill in an hour or so, not ten.
- **Give the skill uses that matter alone:** what's behind the locks should be worth it for one player: journal pages and
  curios (the journals), shortcuts and side rooms in dungeons, quest steps only a rogue can take.
- **Both factions alike:** one neutral home for it (Ravenholdt), and each rank's places on both sides.
- **Keep the 1.12 feel:** no new spells or models (we can't add them); reuse the world's chests and objects; our own words.

## The proposal

### 1. Four ranks, like the professions

| Rank | Skill | Learned at | The rank's quest (sketch) |
|---|---|---|---|
| Apprentice Lockpicking | 1-75 | level 16, the trainer | today's chains: Alther's Mill (Alliance), the Tide Razor (Horde), unchanged |
| Journeyman Lockpicking | 75-150 | level 24 | Ravenholdt's first call: "The Manor, Ravenholdt" (1.12 quest 6681, level 24) already brings rogues to the manor; a Ravenholdt locksmith there gives the rank |
| Expert Lockpicking | 150-225 | level 35 | from Ravenholdt, to a place with strongboxes worth taking: the Scarlet Crusade's (1.12 has an unused line naming Tyr's Hand's lockboxes), the Defias' or the Syndicate's |
| Artisan Lockpicking | 225-300 | level 50 | the hardest locks: Blackrock Depths' and Scholomance's doors, with a final test at Ravenholdt |

- **The cap per rank** replaces "5 x level": Apprentice to 75, Journeyman to 150, Expert to 225, Artisan to 300, each also
  needing the level shown. *Server:* a small mangosd patch: Lockpicking's maximum from the rank quest you've completed and your
  level (both checked), recorded in docs/server/operations.md as the other local changes are.
- **The names** (Apprentice Lockpicking...) are ours to show: the client's skill line stays "Lockpicking"; the journal, its rank
  bar and the rank-up toast say the rank (Forever UI already does this for the professions).

### 2. Practice that respects your time

- **A practice yard at Ravenholdt:** a row of practice locks of every band (our plain decorations from world 027 with a lock, or
  1.12's own practice chest objects), respawning in a minute, each band's locks orange to its rank. A rank's 75 points in one
  sitting there, about 75 to 100 picks (orange is a point every time). *Server:* world patch (objects and their spawns).
- **Each rank's quest place** is the "interesting" version: a real place with a reason (a ledger in a Defias strongbox, the
  Crusade's payroll, a Dark Iron vault), a handful of locks of the rank's band, and the rank at the end.
- **Optional, for later:** a Ravenholdt contract board (repeatable, one a day, like session 68's dailies): "open three Scarlet
  footlockers in Tyr's Hand", rewarding Ravenholdt reputation and a lockbox. Keeps the skill useful after 300.

### 3. Reasons to keep picking (alone)

- **What's inside:** the world's footlockers and strongboxes get a chance at journal pages and curios (Forever UI's journals), so
  the gathering journals and the Lockpicking journal feed each other.
- **Shortcuts:** the dungeon doors rogues can pick (Blackrock Depths' Shadowforge Gate, Scholomance's door...) are already in
  the data; the journal points them out with Pin on Map.
- **Quests only a rogue takes:** a few branches where a lock opens a better way (the rogue class quests already do this).

### 4. Every practice place a real job: guards, a reason, and something inside

The user, in game on the Tide Razor: the Buccaneer's Strongboxes sit in an empty ship, "nobody protecting the strongboxes. If this
was a quest, there would be some mobs to kill, to steal treasure and lockpick them. Inside these strongboxes is always empty, and
that sucks and feels bad as well." Checked in the data this session:

| Place | The locks | Their loot | Who guards them |
|---|---|---|---|
| The Tide Razor (Horde, the Barrens) | 9 Buccaneer's Strongboxes (4 object types) | **none** (no loot table) | nobody (one crab within 40 yards) |
| Alther's Mill (Alliance, Redridge) | 5 Practice Lockboxes | **none** (no loot table) | three spiders |
| Alther's Mill | Lucius's Lockbox | its one quest item | as above |

So the rule for every place the rank quests send you (and the practice yard aside):
- **Guards that belong there:** the Tide Razor gets its Southsea crew aboard (the pirates already on the Merchant Coast: their
  creatures reused, placed by hand with Place Objects' Move Creature Here or spawned by a world patch), Alther's Mill a Defias or
  Redridge gnoll crew; a few to deal with, or to sneak past (stealth is the rogue's other half).
- **Something inside every lock:** coins for the place's level, a small chance at an item of that level (the world's own drop
  tables for creatures of that level, already on the database site), and at the quest places a chance at a curio or journal page.
  *World patch:* a loot table for each practice lock (both factions' places alike, the same value for the same skill).
- **A reason in the quest's words:** the pirates' plunder, the Defias' payroll: what you're there to take, and why.

### 5. The journal

- The rank bar shows the rank ("Expert Lockpicking 162/225") and the next rank's quest with Pin on Map.
- Where to Practice by rank: the rank's quest place first, the practice yard, then the world's spots.
- A rank-up toast like the professions' (docs/specs/toasts-and-banners.md).

## Ravenholdt: the unfinished hall (rogues only)

The user: "Ravenholdt was also unfinished in wow classic ... The quests and reputations was never finished." And: "This is all
rogue only. Maybe apprentice lockpicking starts in your main city, then the other ranks in other npcs with Ravenholdt sending you
out for the quests."

**What's there today (our server's data, read this session):**

| Who | Title | Today |
|---|---|---|
| Lord Jorach Ravenholdt | Lord of the Assassin's League | Sealed Azure Bag (50+) |
| Fahrad | Grand Master Rogue | the trainer; Junkboxes Needed (50+, Heavy Junkboxes, 75 a turn-in) |
| Smudge Thunderwood | Poison Vendor | sells poisons |
| Zan Shivsproket | Speciality Engineer | sells engineering parts |
| Myrokos Silentform | | little |
| Ravenholdt Guards | Assassin's League | Syndicate Emblems |
| Archmage Xylem (Azshara) | | Encoded Fragments, The Azure Key (50+) |
| Ravenholdt Assassins, Carlo Aurelius (Assassin), Master Kang, Winstone Wolfe ("The Wolf"), Simone Cantrell (Landscape Architect), Salome | | **nothing**: present, silent |

- **Quests:** The Manor, Ravenholdt (the invitation, 24, +250), Syndicate Emblems, Junkboxes Needed (50+), the Azure Key chain (50+:
  A Simple Request, Sealed Azure Bag, Encoded Fragments, The Azure Key). **Nothing between 24 and 50.**
- **Reputation:** **no creature's death gives any** on our server; only the quests. Nothing to spend it on: no vendor item, no
  reward, no title tied to a standing.

**The proposal: Ravenholdt as the rogues' hall, the lockpicking ranks running through it, the residents given work.**

| Rank | Where it starts | Who | The way |
|---|---|---|---|
| Apprentice (1-75) | your capital's rogue trainer (SI:7, the Cleft of Shadow, the Undercity, Darnassus, Ironforge, Sen'jin) | the trainer, then today's chains | Alther's Mill (Alliance) / the Tide Razor (Horde): crewed, the locks filled |
| Journeyman (75-150) | Ravenholdt, from the invitation (24) | **Fahrad** (Grand Master Rogue) teaches; **Master Kang** runs the practice yard | jobs where the Syndicate works (Alterac, Arathi, Hillsbrad): Syndicate Emblems becomes part of the chain |
| Expert (150-225) | Ravenholdt (35) | **Winstone Wolfe, "The Wolf"**: the fixer, the contracts | jobs in neutral country: Booty Bay's pirates, the Badlands' Dark Irons, the Wastewander in Tanaris |
| Artisan (225-300) | Ravenholdt (50) | **Lord Jorach Ravenholdt** | the Azure Key chain as the capstone (it exists: 50+), the final lock in Blackrock Depths |

Others given work: **Carlo Aurelius** (Assassin) the dangerous jobs; **Simone Cantrell** (Landscape Architect) the manor's
grounds, where the practice yard stands; **Salome** and **Myrokos Silentform** the go-betweens (letters, the junkbox turn-ins).

**Reputation, finished:** Neutral at the invitation; Friendly through the Journeyman jobs; Honored with Expert; Revered with Artisan;
Exalted through contracts and junkboxes. Syndicate kills give standing again (to Honored), as the faction's description implies.
**What standing buys (items the client has; no new art):** Smudge's better poisons at Friendly and Honored; Zan's tools (below) at
each rank; at Revered a room of the manor opens (a door picked, a practice vault); Exalted, something the user chooses.

## How you learn: not one point a lock

The user: "You learn lockpicking with practice, but also with people teaching you, maybe better tools, quests, tests etc. Maybe
to go from apprentice to journey, you have to pick 10 locks under x amount of time."

Five sources, each a part of the rogue's life:

| Source | How it gives skill | How (our systems) |
|---|---|---|
| **Practice** | picks still count, weighted: a lock near your skill (orange) more than one well below; the practice yard's locks are made for it | mangosd: Lockpicking's gain per success by colour (today 1 at orange, 75 % yellow, 25 % green) |
| **Lessons** | a teacher's lesson is a quest that gives a jump (+10 to +25), once each: tension and the pick, reading a lock's pins, quiet hands | mangosd patch: a quest's completion adds Lockpicking points (a small table of ours) |
| **Tools** | better picks give + Lockpicking while carried: Zan's tools by rank and standing | the game's own "+5 Lockpicking" spell (9133) on tool items; no new spell |
| **Tests** | each rank ends in a proof: Apprentice to Journeyman, 10 locks in 5 minutes at the practice yard; later, a lock under guard, a vault in the dark | timed quests exist in 1.12 (29 quests have a time limit); the test locks give a token on opening |
| **Jobs** | contracts send you to the real places; harder locks there, standing and lockboxes as pay | quests (repeatable ones like session 68's dailies) |

**The loop that ties it together (the rogue fantasy):** the Shadow (stealth) gets you in; the Hand (pickpocketing) takes the
junkboxes; the Lock (lockpicking) opens them and the jobs' strongboxes; the Network (Ravenholdt) pays for what you bring and
teaches the next lock; better tools and standing open harder jobs.

## Decided (the user, session 70, after the web preview lockpickranks)

- **A reputation step is a banner**, not a toast (the house style): the preview shows Ravenholdt's standing as its own banner.
- **The rank levels (16, 24, 35, 50) stand**, as long as each rank's places and jobs match their content's level (the job places
  and their creatures checked against the rank's level band when the quests are written).
- **The practice yard at Ravenholdt is a small quest:** pick five practice locks there (five points by practice) and the quest's
  reward gives five more.
- **The rest of the split stands** (practice, lessons, the test, the jobs as drawn).
- **Curios and journal pages in the world's chests: yes.**
- **Reputation: option 1** from docs/research/ravenholdt-blizzard-plans.md (the user, session 70): finish 1.12's own shape.
  Syndicate Emblems stolen by pickpocketing, to Friendly; the rank quests carry the standing (Journeyman to Friendly, Expert to
  Honored, Artisan to Revered, Master Kang's trial at Revered); junkboxes and the board's jobs from Revered to Exalted; no kill
  reputation (theft, not killing).
- **The contract board: B**, jobs by standing, following Blizzard's unused greetings: Winstone Wolfe's at Friendly, Simone
  Cantrell's at Honored, Carlo Aurelius's at Revered, and Master Kang's trial (the unused trigger by Kang as its ground).
- **Assassination contracts** (the user, session 70: "We can have some elite named mobs in the world that we are sent to
  assassinate to gain reputation. Maybe horde mobs if you are alliance, and alliance mobs if you are horde."): no kill reputation
  for ordinary creatures, but Ravenholdt (the Assassin's League, neutral) takes contracts on named elites: a Horde target for an
  Alliance rogue, an Alliance target for a Horde rogue, the two lists mirrored (the same levels, the same difficulty, the same
  standing paid). Carlo Aurelius's jobs at Revered (board B), with lighter ones earlier. Targets: named elites the world already
  has where they fit (contested places: Hillsbrad, Arathi, Stranglethorn...), or our own placed with existing creatures and looks
  (no new models), each with a reason in the contract's words. **Once only** (the user, session 70: "If you killed a target with
  an assassination quest, then he's dead. Only once per named mob."): each contract is a quest done once per character, never
  repeated; its target is placed for you when you take the contract (a script on the quest's start, the way 1.12 quests summon
  their foes) and not seen again once it's dead, so the world doesn't bring it back. Other characters have their own contracts.
  To work out: which targets, and that a target never stands where it breaks the other side's quests.
- **Earlier open points, settled above:** the contract board and how Ravenholdt reputation is gained. First, research what Blizzard
  planned for Ravenholdt and how its reputation was meant to work (an agent, session 70).

## The journal, redesigned: the rogue's journal (Pickpocketing and Lockpicking together)

The user, session 70: "The whole lockpicking journal would have to be redesigned for this. Less emphasis on chests of the world
and locks in dungeons. A Lockboxes list is fine, and we should think how they drop as well. We can merge Pickpocket and
Lockpicking in the same journal. The where to practice would be replaced by the quests and journey to becoming a lockpicking
master."

**How the boxes drop on our server (read this session):**

| Kind | Skill | Source | How often |
|---|---|---|---|
| Junkboxes (Battered, Worn, Sturdy, Heavy) | 1, 70, 175, 250 | **pickpocketing only**: 322, 292, 236 and 296 creatures' pockets | about 20 %, 15 %, 10 % and 9 % a pick |
| Lockboxes (Ornate Bronze, Heavy Bronze, Iron, Strong Iron, Steel, Reinforced Steel, Mithril, Thorium, Eternium) | 1 to 225 | **corpses only**: 123 to 542 creatures each; never pockets | per creature (the Drops pages) |
| Locked chests (Small, Sturdy, Ironbound, Reinforced) | 1 to 250 | one shared drop table each | rare |

So the Hand feeds the junkboxes and the fight feeds the lockboxes. *Single-player point:* a non-rogue character loots lockboxes
it can never open; a way to send them to your rogue (or Ravenholdt buying them) belongs in the design (to choose).

**The proposed layout (to preview on the web first):**

1. **The Journey** (replaces Where to Practice): the path from Apprentice to master: the rank you're in, its lessons (done, to
   do), its test, its jobs, each with Pin on Map; the next rank and its level; Ravenholdt's standing beside it.
2. **Lockboxes:** every box by skill, in two groups by how it comes: *From pockets* (the junkboxes: which creatures carry them,
   by level and zone, the chance a pick) and *From the fallen* (the lockboxes: the creature levels and types that drop them);
   for each, your opened count and what they held (the counting the journal does now).
3. **Pickpocketing:** what pockets hold by level band and creature type (the server's 1,569 pickpocketing tables, as on the
   Drops pages), the coins rule (10 copper x up to half its level plus up to half yours), your record (coins, items, junkboxes
   taken), the marks you've picked most and the richest.
4. **Your record:** totals for both, curios and journal pages found.
5. **Elsewhere** (folded, small): the world's chests and the dungeon doors, kept but out of the way.

## Practice by working marks (the user, session 70)

"The practice part of leveling up would be nice for dropping or farming some junkboxes in locations so that you actually use it
when you need it. That's more immersive as well." So a rank's practice is pickpocketing real marks for junkboxes and opening
them, in the places the journal points to; the Ravenholdt yard stays only as the small quest decided above.

**Where each junkbox's carriers stand** (our server's spawns of the creatures whose pockets hold it, by zone; carrier levels):

| Junkbox (skill) | Rank | Best zones (carrier levels) |
|---|---|---|
| Battered (1) | Apprentice | Wetlands 525, Ashenvale 508, Hillsbrad Foothills 436, Duskwood 251, Stonetalon Mountains 217 (18-31) |
| Worn (70) | Journeyman | Desolace 605, Arathi Highlands 497, Alterac Mountains 334, Dustwallow Marsh 176, Stranglethorn Vale 171 (30-42) |
| Sturdy (175) | Expert | Feralas 438, the Hinterlands 421, Tanaris 249, Azshara 245, the Blasted Lands 160 (41-51) |
| Heavy (250) | Artisan | Eastern Plaguelands 554, Western Plaguelands 529, Azshara 329, Felwood 227, Burning Steppes 109 (51-60) |

Both factions have zones in every band. **The rank levels and the pockets don't line up yet:** Apprentice at 16 but the first
junkboxes on level 18-21 marks; Journeyman at 24 but Worn Junkboxes from level 30; Expert at 35 but Sturdy from 41; Artisan at 50
and Heavy from 51 (fine). Two ways to match them (the user: the rank levels stand if they match the content):
- **Move the junkboxes down** to the rank's levels: a world patch adding each rank's junkbox to the pockets of humanoids a few
  levels lower (Battered from 15, Worn from 24, Sturdy from 35), so a new rank's practice is there the day you earn it.
- **Or let each rank's first stretch come from its lessons, test and jobs**, and the pockets take over a few levels later.
The first fits "you actually use it when you need it" better.

**Decided (the user, session 70): move the junkboxes down** to each rank's levels (Battered from about 15, Worn from 24, Sturdy
from 35, Heavy as now), and with it:
- **Review the junkboxes' drop rates** (today about 20, 15, 10 and 9 % a pick) against the new places and the points they should
  give, so a rank's practice takes a sensible number of picks, not too few or a farm.
- **Cap the points practice can give in a rank** (decided, the user, session 70: **15** of a rank's 75 from the open world;
  the 15 freed proposed as lessons 25, the test 15, the jobs 20: to confirm): past it, opening boxes
  still opens them and counts in the journal, but the rest of the rank comes from the lessons, the test and the jobs. *Server:*
  part of the mangosd patch for the rank caps (the practice points per rank kept per character).

**Decided (the user, session 70): the skill-ups a rank (75 points)**

| Source | How | Points |
|---|---|---|
| Lessons | a teacher's quest, once each (2 or 3 a rank) | 20 |
| Practice yard | Ravenholdt's yard quest: pick 5 practice locks (5), its reward (5) | 10 |
| Classic haunts | two of the rank's iconic training spots: the first footlocker opened at each gives a bonus | 5 |
| Open-world practice (cap) | junkboxes stolen and opened, and the haunts' footlockers: **1 point for each one opened** (while orange or yellow to you); taking a junkbox gives none (the user, session 70: half points were tried and dropped: "Using half points don't work actually. Let's keep it to just 1 full point when opening them.") | 15 |
| The test | the rank's proof | 15 |
| The jobs | the rank's quest chain | 10 |

**The classic haunts** (the user: "The training areas that are currently available to farm lockpicking ... are iconic and we
should visit them, at least briefly for some points"), by rank from the journal's places and their locks:
- **Apprentice:** Alther's Mill (Redridge: Practice Lockboxes 1, Lucius's Lockbox 25), the Tide Razor (the Barrens: Buccaneer's
  Strongboxes 1): the rank's jobs as well.
- **Journeyman:** Waterlogged Footlockers at Lake Everstill (Redridge) and the Zoram Strand (Ashenvale), 70-110; Battered
  Footlockers at Durnholde Keep (Hillsbrad), Windshear Crag (Stonetalon), Bluegill Marsh (Wetlands), 70-110.
- **Expert:** Angor Fortress (Badlands), Sar'theris Strand (Desolace), the Pool of Tears (Swamp of Sorrows), the Cauldron (Searing
  Gorge), 150-225.
- **Artisan:** Lost Rigger Cove (Tanaris), the Shattered Strand (Azshara), 225; Tyr's Hand (Eastern Plaguelands: Scarlet
  Footlockers) and Hearthglen (Western Plaguelands), 250.

**In the journal's Journey:** each rank's practice step names its zones for your faction and level, with Pin on Map, and counts
the junkboxes you've taken and opened there.

## What's inside the boxes (the user, session 70)

"0.1% is basically never getting it in solo play. We would need to make it appropriate for both the character level / the
lockpicking level. Basically if you're putting in effort in levelling, you should be able to get one of these weapons sometime.
Maybe via the reputation quests in Ravenholdt ... But you can only choose one. Then the green rings could have an increased
rate. The other lockboxes would also have their drop rates checked so that if you are not a lockpicker, the odds of you getting
something also increase. Maybe have a counter? Turn in 5 or 10 boxes and get something nice. This would also need increasing
lockboxes rates slightly."

**A Battered Junkbox today** (item_loot_template 16882; each group gives at most one of its items):

| What | Items | Chance a box |
|---|---|---|
| Junk and a potion | Small Pocket Watch 11 %, Healing Potion 10 % | about 21 % |
| Gems (group 1) | Lesser Moonstone 1.7 %, Moss Agate 1.3 % | 3 % |
| Blue weapons (group 2) | Assassin's Blade, Blackfang (0.05 % each) | 0.1 %: about one box in a thousand |
| Green rings and a necklace (group 3) | 19 items, levels 16-25 (0.05 % each) | about 1 %: one ring in two thousand boxes |
| Recipes, patterns, plans (group 4) | 25 items (0.03 % each) | about 0.75 % |
| Coins | 25 copper to 1 silver 25 | every box |

About three boxes in four hold only junk or a potion and the coins.

**The proposal:**
- **The rare blues leave the boxes and become Ravenholdt's rewards:** each rank's reputation quest offers that band's blue
  weapons as a choice of one (the quest's reward choice): Assassin's Blade or Blackfang at Apprentice, the next box's blues at
  Journeyman, and so on. Effort in the rank, not luck, earns one.
- **The greens get a real rate:** the rings group from about 1 % to about 8-10 % a box, its items matched to the box's level and
  the character's (the rings already sit at levels 16-25 for a skill-1 box).
- **Gems and recipes:** gems stay; recipes up a little (about 2 % together), so a box sometimes teaches something.
- **The other boxes the same way:** every junkbox and lockbox's table read and set to the same shape (junk, a gem, a green at a
  real rate, a recipe now and then; the blues moved to Ravenholdt), the corpses' lockbox drop rates raised a little.
- **A counter for everyone (non-rogues too):** a repeatable turn-in at the rogue trainers (as 1.12's Junkboxes Needed does at
  Ravenholdt): bring 5 or 10 boxes of a band, unopened, and get something nice of that level (a choice of a green of the band, or a
  bag with coins and a gem). A lockpicker can open the boxes or turn them in; a non-rogue can turn them in or pay to have them
  opened.
- **Both factions alike:** the same boxes, the same rates, the same turn-ins on both sides.

## Burglary: locked chests in towns (the user, session 70)

"Getting locked chests from inside cities and towns would also work for getting reputation." The Shadow and the Lock together:
board jobs that send you into a town to open a strongbox and take what's in it, for Ravenholdt standing. Mirrored like the
assassination contracts: an Alliance rogue robs Horde towns (Tarren Mill, Splintertree Post, Hammerfall...), a Horde rogue Alliance
towns (Southshore, Astranaar, Refuge Pointe...), the same locks, levels and pay; neutral towns (Booty Bay, Ratchet, Gadgetzan) for
both, the goblins' own strongboxes. Each a world patch: a locked chest of the rank's band in a house or a back room (our plain
decorations' models with a lock, or 1.12's own strongbox objects), its loot (coins, a curio, a journal page, the job's token).
To work out: which towns, guards that make stealth matter, and that nothing breaks the town's own quests.

## Poisons: gathered, not bought (the user, session 70)

"There's also the poison side of Rogues that we can explore. Farm elementals (or other mobs) for herbs to be used for poison etc.
Maybe spider venom things like that." **Today (our server's data):** of the poisons' reagents, Deathweed (9 recipes), Essence of
Pain (5), Dust of Deterioration (5), Dust of Decay (4) and Essence of Agony (4) and the three vials come **only from vendors**;
only the Large Venom Sac (spiders, 19 creatures) and the herbs Bruiseweed and Fadeleaf (Blinding Powder) are found in the world.

**The idea:** each reagent gets a place in the world that fits it, so making poisons means going out for them:
- **Deathweed:** an herb that grows where death does (Tirisfal, Duskwood, the Plaguelands, Felwood); 1.12 already has Tirisfal's
  Doomweed and Gloomweed models (displays 4112, 4111) for its nodes (world patch: gatherable objects, as session 69's Dry Pinewood).
- **Essence of Pain and of Agony:** venom from spiders and scorpids by level (the Large Venom Sac's way: a corpse drop).
- **Dust of Decay and of Deterioration:** from the dead and the rotting: ghouls, plague creatures, oozes; elementals' dust for the
  stronger grades.
- **The vendors:** still sell the low grades (so a rogue is never stuck), the higher ones only gathered, or at a price.
- **With the journals:** a Poisons page in the rogue's journal (where each reagent is found, by level and zone, Pin on Map), or
  the gathering journals' frame.
To work out: the drop rates, which creatures by level for each grade, both factions' places alike, and the Poisons skill's own
ranks (it is a 1-300 skill like Lockpicking).

**Poison experiments from unused items** (the user, session 70: "check for some unused items ... for special poison materials
that are not found in vendors. It has to be unique like poison experiments, that's why it's not sold in the npc"). Items in our
world database that nothing gives (no vendor, drop, chest, pocket, skinning, fishing, box, quest or recipe), named like poison
materials; the client already has their names and icons:

| Item (entry) | Kind | An experiment it could feed |
|---|---|---|
| Lethargy Root (3777) | trade good, item level 28 | a numbing root: an experimental Mind-numbing Poison |
| Poisonous Mushroom (5823), Underwater Mushroom Cap (8543) | junk, 15 and 35 | slowing toxins: Crippling Poison experiments |
| Corrosive Sap (5681), Putrid Bile Duct (20024), Rotting Flesh (20026), Tomb Rot (2929) | quest items and a trade good | the decay line: wound and rot poisons |
| Blood of Cobrahn (5400), of Pythas (5401), of Serpentis (5403), of Anacondra (5402) | quest items | the four Fanglords of Wailing Caverns (a dungeon both factions run, about 20): one rare vial each, for the strongest experiments |
| Shrike Bat Fang (7679), Worgen Fang (896), Gnarlpine Fang (5220) | quest items | fangs to draw venom from |
| Frost Vial (5024) | container, 15 | a vial for a cold poison |

Left out: the enchanting dusts (Strange, Soul, Vision, Dream, Arcane: they come from disenchanting, which this search didn't
cover). Before use: check each in the 1.14.2 client (its own name, icon and tooltip win; a hotfix row if one must change) and
that no server script or event uses it.

**Poisons points from quests too** (the user, session 70: "Levelling poison is also kind of a grind, we can make it so these
quests give poison points as well. Same thing with quests etc."): the same way as Lockpicking: lessons, experiments, gathering
quests and jobs give Poisons points, not only crafting one poison after another. *Server:* the same small mangosd change, made
general: a table of ours, quest -> (skill, points), so one mechanism serves Lockpicking, Poisons, and later anything else
(the professions' own quests, if the user wants that).

**How experiments could work:** the special materials drop from the right creatures (the Fanglords' blood from the Fanglords, a
low chance, once or twice a run; the roots and mushrooms from nodes or creatures where they grow), never sold. An experiment is
a recipe the rogue learns from Ravenholdt's poison people (Smudge Thunderwood, a Revered reward, or the board's jobs): a poison
of their own with an extra effect or a longer charge, made from a vendor base plus one experimental material.

## Lockboxes on characters that can't open them (the user, session 70)

"For characters that cannot unlock them. Take the lockboxes to a lockpicking trainer to unlock." Lockboxes drop from corpses for
every class; only a rogue can open them. The rogue trainers (the capitals' and Ravenholdt's people) offer every class a service:

- **A gossip option on the rogue trainers:** "Could you open my lockboxes?", for a fee by the lock's skill (a few silver for a
  bronze box, more for thorium); every lockbox in your bags the trainer can manage is unlocked in place; you open it yourself, so
  its contents roll as they always do (no item swapped, nothing new to hotfix).
- **How (our systems):** a small server script on the trainers (ScriptDev2, compiled into mangosd, recorded with the other local
  changes): the gossip option, the fee, the unlocked flag set on the boxes. A quest turn-in would need a new "opened" item for each
  box and client hotfixes for each: the script is cleaner.
- **Rogues keep their edge:** they open boxes for free and earn the skill and the record in the journal; others pay and get only
  the contents.
- **Which trainers:** every rogue trainer in the capitals (both factions alike); Ravenholdt's for rogues only.
- **Decided (the user, session 70): a small fee is fine.** Amounts tuned in game (a few silver for bronze, more for thorium).

## Named marks: rares and bosses worth robbing (the user, session 71)

The user: "Stealing from rares and named mobs like Jimmy the Bleeder should give better rewards. Let's plan for that as well."

**Today (read session 71):** a named mark's pocket is an ordinary one. Jimmy the Bleeder (level 23 rare, Alterac) holds a Battered
Junkbox at 0.15 % and a Syndicate Emblem at 0.9 %, no better than a Syndicate thug. Most named humanoids have no pocket at all: of
the 129 humanoid rares 18 can be picked, of the 76 rare elites 15 (Morgaine the Sly, Edwin VanCleef, Marisa du'Paige, Foreman
Rigger, Sister Riven, High General Abbendis...); none of the 38 bosses (rank 3). The coins follow the common rule (LootMgr.cpp),
so a rare's pocket pays like anyone's.

**To plan (proposal, for the user's choices):**
- **Every named humanoid has a pocket:** the rares (rank 4), the rare elites (rank 2) and the dungeon bosses that stand still long
  enough, both factions' alike; a table of their own (pickpocketing_loot_template), one per named mark.
- **What's in it, by kind:** the rank's junkbox every time (or nearly); coins several times the common rule (a mangosd change: a
  multiplier by the creature's rank, or a coin row in their table); a chance at a green of the mark's level; something of the mark
  itself where it fits (a letter, a ledger, a curio for the journal: our words, existing items reused, no new ones).
- **Once worth it, not farmable:** the best of it on the first pick per character (a quest-style flag, or a counter the journal
  keeps), the plain pocket after; rares respawn slowly, so it stays a find, not a grind ("no grinds in solo progression").
- **Ravenholdt:** a named mark picked could count toward standing (theft, not killing: option 1's spirit), perhaps the Syndicate's
  own named men first (Jimmy the Bleeder, the Syndicate's leaders in Alterac and Hillsbrad).
- **The journal:** a "Marks of Note" list in Pickpocketing (the named marks of your level, where they stand with Pin on Map,
  picked or not, what you took), and a toast for a named mark's pocket.
- To read first: every named humanoid by level and zone, which have pockets today and what's in them; which stand where a rogue
  can reach them in stealth (bosses in packs, patrols).

## At 300: a weekly for the master (the user, session 71)

The user: "There should be a weekly or something for when you reach 300 lockpicking so that you get rewarded for using it later on
in the game." The server already has weeklies (cmangos: QUEST_FLAGS_WEEKLY 0x8000, reset at Quests.Weekly.ResetHour; session 68's
dailies patch sits beside it), so a weekly needs only quest rows. To plan with the board (B): one weekly job at Ravenholdt for a
rogue at 300 (Fahrad or Carlo Aurelius), a real lock in a level-60 place (Blackrock Depths' vaults, Stratholme's strongboxes,
Dire Maul, a Scarlet or Scourge camp's chests, Heavy Junkboxes from the Plaguelands' marks), rotating by week; the pay: Ravenholdt
standing past Revered, a pouch (coins, a gem, a chance at a green of 60), and now and then the choice-of-one blues the junkboxes
gave up; both factions alike. Its numbers with the other values to choose.

## The boxes' drops, decided (the user, session 71; world 037)

From the Box Drops page (http://127.0.0.1:8777/dbsite/mockups/boxdrops/, dbsite/build/win_boxdrops.py), the user chose:
- **No recipes, patterns or plans from any box.** "Doesn't make sense for solo game." They move to **their own profession quests,
  designed later** (the user: "All the Recipes, Patterns and Plans will move to their own profession quests that we will design
  later. Make note of this to revisit in other professions."): a pass over every profession's world-drop recipes (kickoff 58's
  "Plans, patterns, formulas and recipes" item) turns them into quests.
- **A junkbox in 20 % of picks** (every carrier, all four boxes).
- **A lockbox in 1 kill of 250** (0.4 %, every creature that drops one); the lockboxes' contents as they were, but for the recipes.
  Then (world 046) by who carries them: humanoids 2 %, undead, demons and dragonkin 1 %, beasts, elementals and the unsorted none.
- **The junkboxes' blues and epics to Ravenholdt's rank reward** (a choice of one, with the rank quests). Until those quests exist
  they can't be had.
- Junkbox greens: not changed (today's rate, about 1 %); to look at again with the rank rewards.

## The boxes' new contents: things you use while leveling (the user, session 71; applied as world 038, gems x3, pearls out: 039)

The user: scrolls of the box's level in several at a time; trade goods (herbs, leathers, ores) in place of the recipes; greens a
lot more often, armor more than weapons, rings and necklaces more often; gems worth 2-3 times more; bags more often; blues every
now and then, or a random blue every 5 or 10 boxes opened at an NPC.

**What the world has (read session 71):**
- *Scrolls* (Protection, Spirit, Stamina, Intellect, Agility, Strength), four ranks: I at levels 1-10, II at 15-25, III at
  30-40, IV at 45-55.
- *Greens:* the world's own level-banded lists, reference_loot_template 60100-60199 (each five item levels wide, 10 to 61), already
  about 9 armor pieces to 1 weapon; *blues* the same way from 60200. A box can roll one from the band of its level.
- *Rings and necklaces (green):* about 70 world-drop ones, from item level 20 up.
- *Bags* that drop: 6 slots (pouches) at 5, 8 at 15, 10 at 25 (Large Blue Sack...), 12 at 35 (Large Knapsack), 14 at 45
  (Journeyman's Backpack, Troll-hide Bag).
- *Trade goods by tier:* cloth Linen / Wool / Silk / Mageweave / Runecloth; leather Light / Medium / Heavy / Thick / Rugged; ore
  Copper / Tin / Iron / Mithril / Thorium; herbs from Peacebloom to Plaguebloom.
- *Other things used while leveling:* bandages (Linen to Heavy Runecloth), armor kits (Light to Rugged), sharpening stones (Coarse
  to Elemental), the healing and mana potions of the level.
- *Gems:* Small Lustrous Pearl 2s to Star Ruby 50s today (Large Opal, Blue Sapphire, Huge Emerald, Azerothian Diamond at 55-60).

**Proposal (a box opened; the chance it holds at least one):**

| | Junkboxes | Lockboxes |
|---|---|---|
| Money | as today | as today |
| A green of the box's level (the world's band list: mostly armor) | **35 %** (today about 1 %) | as today (55-87 %) |
| A green ring or necklace of the level | **10 %** | **15 %** |
| Scrolls of the level, 1-3 | **30 %** | **30 %** |
| Trade goods of the level (cloth, leather, ore or herbs), 2-5 | **40 %** | **30 %** |
| Something to use (bandages, an armor kit, a sharpening stone), 1-3 | **15 %** | **15 %** |
| A gem of the level | **8 %** (today 1-3 %) | **10 %** |
| A bag of the level | **4 %** | **5 %** |
| Potions and food | as today (10 %) | as today |
| A blue of the level (the world's band list) | **1 %** | **3 %** (and its own blues as today) |

Gems sell for **2.5 times** today's price (item_template SellPrice and the proxy's item hotfix rows, so the client shows it).
The blue counter: **every 10 boxes** a trainer opens or takes in, a random blue of that band (with the turn-in counter and the
opening fee at the rogue trainers: a ScriptDev2 gossip, mangosd).

Tiers: Battered Junkbox and Ornate / Heavy Bronze Lockboxes around item level 20-27; Worn and Iron / Strong Iron around 30-37;
Sturdy and Steel / Reinforced Steel around 42-47; Heavy and Mithril / Thorium / Eternium around 52-57.

## Pockets hold small things (the user, session 71; world 044)

"The rule for pickpocketing is small items. Doesn't make sense to steal a huge weapon from a pocket." A junkbox (the pockets' box)
holds: green knives (daggers), cloaks and bracers, green rings and necklaces; cloth and leather (cloth for bandages); bandages,
armor kits, sharpening stones and weightstones; scrolls, gems, potions and food, a small bag now and then. No blue gear (the rank
rewards hold the junkboxes' old blues), no herbs or ore, no big weapons or armor. Lockboxes (from the fallen) keep their own mix.

## Self-found and alts: where a character's materials come from (the user, session 71)

The user: "If I have more than one character, I can save some materials to send to them for either gear, or profession raw
materials. Fishing has always been a great source of materials. If I'm playing solo self found, that means I should be self
sufficient. So if I have leatherworking, some gear need cloth. Where would I get the cloth? Maybe the boxes, for example. But
professions should be something that is special to that character's journey. That's why we are moving how they are acquired into
quests and reputation etc."
- **Self-sufficient:** every material a character's professions call for but don't gather should have a way in on that
  character's own road: cloth for a leatherworker or a blacksmith, herbs and ore for those who don't gather them. The boxes carry
  trade goods of their level for that (world 038), and fishing stays a great source (pearls only there, clams and some creatures:
  world 039).
- **Alts:** materials saved and mailed between one's own characters stay a fair way to share (the mail as it is).
- **Professions are the character's own:** how a profession and its recipes are learned moves into quests and reputation along
  that character's journey (memory: recipes-to-profession-quests); the boxes never hand out recipes.

## Choices for the user

1. **Ranks and caps:** the four above at levels 16 / 24 / 35 / 50, or other levels?
2. **Ravenholdt as the home of it** (neutral, both factions), or each faction's capital rogue trainer (SI:7 and the Cleft of
   Shadow)?
3. **The practice yard:** yes (fast, a sitting per rank), or only the quest places (slower, more travel)?
4. **What the locks hold:** journal pages and curios in the world's chests (a world patch to their loot), or leave loot as it is?
5. **Contracts** (daily lockpicking jobs): now, or later?

## The work, in order (after the user's choices)

1. The quest text and the places, previewed on the web (the quest chain's words, the places on the map).
2. The mangosd patch for the rank caps (and its test on a fuitest rogue).
3. World patches: the rank quests, the Ravenholdt locksmith, the practice yard's objects.
4. The journal's ranks (Forever UI), the rank-up toast, Pin on Map for the rank quests.
