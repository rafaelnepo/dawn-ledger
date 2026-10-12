# WoW Forever’s lockpicking quests, and the lock pass

Research, session 70 (read-only: nothing in the addon, the server or the proxy changed). The user: “Look at all the lockpicking
quests from the trainer and the locations they tell you to go to train. Update the Where to Practice with the locations. Add a
button to add a pin to the map”, and, which trainer: Forever’s. Quest texts are summarized in our own words; nothing of
Blizzard’s prose is copied. Inferences are marked *(inference)*.

## Sources tried

| Source | What it gave |
|---|---|
| `tools/wago.py db2 … 1.60.1.70291` (Forever’s client tables) | QuestV2 (6,610 quest ids, 2,838 not in 1.14.2), QuestPOIBlob (54 rows, none for a rogue quest), QuestLine (3 lines, none a rogue’s), SpellName (no new lockpicking quest spells; only `Lockpicking 04`, `Unlock Chest`, `Unlocking`). Titles and texts aren’t in client tables. QuestObjective isn’t served for this build. |
| UiMapAssignment, 1.14.2 against Forever | Forever moved Redridge Mountains’ map 110.4 yards east (its left and right edges); The Barrens is the same. Forever’s coordinates for Redridge are about 5 points lower across than ours for the same spot. |
| Forever beta client caches (`_classic_beta_/Cache/WDB/enUS`) | `questcache.wdb` holds three Teldrassil quests the user saw there; nothing on lockpicking. |
| `(private files)` | No lockpicking UI or quest helper in Forever’s interface code. |
| `../wow-forever-hub` | One viewer’s chat line about lockpicks in a livestream transcript; nothing usable. |
| **Wowhead’s Forever database** (`wowhead.com/forever/`: the Lockpicking skill’s trainers, each rogue trainer’s quests, the quest and object pages and their map data) | **This worked**: the quests below, their givers, Forever’s change status for each, and the objects’ map points. |
| Our database (`classicmangos`, SELECT only) and `(the server's checkout)` | The same quests, givers and spawns on our server. |

## What Forever’s trainers send you to

Forever’s rogue trainers have **no new lockpicking quests**. What they give is 1.12’s own level-16 chain, unchanged (Wowhead marks
Alther’s Mill and Plundering the Plunderers “unchanged” against Classic; the breadcrumbs have no change entry). **Our server has every
one of these quests already**, with the same givers: the earlier note that our server has none looked for trainer gossip, and the
quests start a step before the practice place. One quest per faction ends at a practice spot; the other races are sent there.

Forever’s new quests that only look related: *Alther’s Mill* 98386 (Foreman Oslow’s spider cull at the same mill, any class) and
*Shelf Picked* 97237 (a library errand) have nothing to do with locks; Ravenholdt’s new rogue chain (Myrokos Silentform, 96779–96786,
level 24) is pickpocketing and disguise, no lock.

### Alliance

| Quest (id) | Level | Giver → ender | What it asks, in short |
|---|---|---|---|
| SI:7 (2300) | 16 | Keryn Sylvius, Goldshire (Elwynn 43.9, 65.9) → Renzik “The Shiv” | humans: go see Renzik in Stormwind |
| To Hulfdan! (2299) → Kingly Shakedown (2298) | 16 | Hogral Bakkan, Kharanos (Dun Morogh 47.6, 52.6) → Hulfdan Blackbeard (Ironforge 52.0, 14.9) → Renzik | dwarves and gnomes: by Ironforge to Renzik |
| Erion Shadewhisper (2259) → Erion’s Behest (2260) | 16 | Jannok Breezesong, Dolanaar (Teldrassil 56.4, 60.1) → Erion Shadewhisper (Darnassus 34.5, 25.9) → Renzik | night elves: by Darnassus to Renzik |
| Redridge Rendezvous (2281) | 16 | Renzik “The Shiv”, Old Town (Stormwind 75.8, 60.4) → Lucius | find Lucius, an SI:7 man, on the docks of Lakeshire |
| **Alther’s Mill (2282)** | 20 | Lucius (Redridge 28.1, 52.0) → Lucius | you get Thieves’ Tools; pick **Lucius’s Lockbox** (skill 25) at Alther’s Mill, bring back the token inside; orcs prowl near the mill. The **Practice Lockboxes** (skill 1, five, quick to come back) stand beside it. |

Place: **Alther’s Mill, Redridge Mountains**, Lucius’s Lockbox 52.0, 44.7 and the Practice Lockboxes 52.0, 45.3 on 1.14.2’s map
(our spawns: −9222, −2701 and around −9230, −2700). Forever’s map shows them at 46.9, 44.9 and 46.4–47.0, 44.4–45.7: the same spot
on its shifted map (converted back, within 10 yards of ours).

### Horde

| Quest (id) | Level | Giver → ender | What it asks, in short |
|---|---|---|---|
| To Orgrimmar! (2380) | 16 | Kaplak, Sen’jin Village (Durotar 52.0, 43.7) → Shenthul | orcs and trolls: go to the Cleft of Shadow |
| Find the Shattered Hand (2378) | 16 | Mennet Carkad, the Undercity (83.5, 69.1) → Shenthul | the Undead: go to Orgrimmar |
| Zando’zan (2379) | 16 | Shenthul, Cleft of Shadow (Orgrimmar 43.0, 53.7) → Zando’zan (42.7, 52.9) | speak with the seer beside him |
| Wrenix of Ratchet (2382) | 16 | Zando’zan → Wrenix the Wretched | a troll seer’s ramble sends you to Ratchet |
| **Plundering the Plunderers (2381)** | 18 | Wrenix the Wretched, Ratchet (Barrens 63.1, 36.3) → Wrenix | take Thieves’ Tools and a parrot-scaring gadget from his machine, board the pirates’ ship south along the coast, and steal the treasure in its hold; the deck above holds the pirates’ training room, where you may practice |

Place: **the Tide Razor, the Merchant Coast, The Barrens**: the **Buccaneer’s Strongboxes** (skill 1, nine, in the pirates’ den)
65.1, 45.4 and **The Jewel of the Southsea** (the quest’s chest, lock 23: skill 25) 64.9, 45.4. Forever’s map: the same numbers
(The Barrens didn’t move).

### Both factions, later

Fahrad’s *Junkboxes Needed* (8249, Ravenholdt, level 50+, repeatable: junkboxes picked from pockets) is the only other trainer
quest about locks (also on our server). The 51+ bands have no trainer quest: Forever says nothing there *(the footlocker spots in the preview
past 75 are from our own spawns, labelled so)*.

## The lock pass

### How a lock is opened (Lock.dbc, the server, the spells)

Each lock lists up to eight ways in, each with a **type** (1 a key item, 2 a lock type with a skill), an **index** (the item, or the
lock type), a **skill** and an **action**. Lock types used here: 1 Lockpicking, 5 Open, 6 Treasure, 10 Quick Open, 11 Quick Close,
16 Blasting (the Seaforium charges).

- **Every character knows Opening** (3365, lock type 5, value 100) and the other open spells (6247 quick open, 6477, 6478, 22810,
  21651 …): `playercreateinfo_spell` gives them to all 40 race and class pairs. **No player spell opens lock type 6** (Treasure):
  those ways are dead.
- Every chest and footlocker lock (5, 23, 24, 60, 61, 62, 599, 600, 1559–1561) reads: Lockpicking at the lock’s skill with **action
  1** (unlock), then Open (5) and Treasure (6) at skill 0 with **action 0** (open). Doors read the same with Quick Open (10).
- What keeps a non-rogue out is the object’s **Locked flag** (`gameobject_template.flags` 2; doors 34 = 2 + 32). The pick, a key or a
  charge (action 1) unlocks it; the plain Open (action 0) is for an object that isn’t locked *(inference: the 1.12 convention; it
  matches every chest here, see the table)*.
- **The server is lax** *(read from the code, not tried)*: `GameObject::GetSpellForLock` and `Spell::CanOpenLock` ignore the action
  and the Locked flag, and take the first way the player has a spell for. A non-rogue casting Opening (lock type 5, skill 0) on a
  footlocker would pass the server’s check; the 1.14.2 client simply doesn’t offer it. Worth one test on a fuitest warrior before
  relying on it either way.
- Items (lockboxes) are stricter: `HandleOpenItemOpcode` refuses any item with a lock until it is unlocked (a pick or its key), so
  their Open and Treasure ways never apply.

### Every entry of the journal’s data

Flags: L = Locked, Q = quest-gated (usable only while on a quest that wants what it holds).

| Group | Entries (skill) | Flags / ways | Recommendation |
|---|---|---|---|
| **Real rogue locks, practice** | Practice Lockbox (1), Buccaneer’s Strongbox (1), Large Iron Bound Chest (1, 25, 70, 125), Alliance Strongbox (70, Dalaran), Battered / Waterlogged Footlocker (70, 110, 150), Dented / Mossy Footlocker (175–225), Large Mithril Bound Chest (175–275), Scarlet Footlocker (250) | L; pick (action 1) or nothing | Keep: the journal’s core. |
| **Real rogue locks, dungeon and city doors** | Iron Clad Door (1), Workshop Door (150), the Scarlet Monastery and Stratholme doors (175, Scarlet Key), Gordok Inner Door (200), Searing Gorge doors (225), Blackrock Depths cells and gates (250), Scholomance Door (280), Dire Maul’s Crescent Key doors and Stratholme’s gates (300) | L; pick, a key, or a charge | Keep: the famous picks. |
| **Key or pick, kept** | Benedict’s Chest (100, Benedict’s Key), Cozzle’s Footlocker (160, Cozzle’s Key, Q) | no Open way at all: only the key or the pick | Keep: the user’s list of famous rogue picks. |
| **Rogue class-quest chests** | Lucius’s Lockbox (25, Alther’s Mill), Ambermill Strongbox (1, Tools of the Trade, Undead rogues), Duskwood Chest (70, Klaven’s Tower), Gallywix’s Lockbox (70, Mission: Possible But Not Probable) | L + Q; pick | Keep, tagged “on a rogue quest”: picked once, only while on the quest. Better under the band’s quest places than among the world’s chests *(suggestion)*. |
| **Not a lockpicking lock in practice** | Venture Co. Strongbox (1) | L + Q; holds the Venture Co. Ledger, which **no quest on our server asks for** | Remove (greyed in the preview): it can’t be used. |
| | Tazan’s Satchel (1, a bag item) | Tazan’s Key (action 1) or pick; the orc and troll rogues’ level-10 *The Shattered Hand*, before Pick Lock is learned at 16 | Remove (greyed): a quest key opens it. |
| | Lucius’s Lockbox, the item (70) | no source on our server (no drop, quest or object) | Remove (greyed): unobtainable (the chest of that name stays). |
| | Locked Gift (70) | no source on our server | Remove (greyed): unobtainable. |
| **Lockboxes in the bags** | Battered / Worn / Sturdy / Heavy Junkbox, Ornate Bronze to Eternium Lockbox, Small / Sturdy / Ironbound / Reinforced Locked Chest, Practice Lock, Thaurissan Family Jewels | lock only; the pick (or a blacksmith’s key) | Keep. |

Unclear: nothing left unclear in the data; the one open question is the server’s laxness above (a test, not a data change).
`tools/server-data/lockpicking.py`’s output is unchanged: the user decides.

## The map pin

`MapPins.lua` already has it: `ns.SetMapPin(uiMapID, x, y)` (0–1 on that map) keeps one pin per character in world yards, shows it on
the world map and the minimap (an arrow on the rim when out of range) with its distance, plays Forever’s waypoint sound, and a click
on it removes it (`/fui way` uses the same). A **Pin on Map** button on a practice place calls it with the place’s 1.14.2 map and
coordinates; a second place’s pin replaces the first. The coordinates above are 1.14.2’s (our client), not Forever’s.
