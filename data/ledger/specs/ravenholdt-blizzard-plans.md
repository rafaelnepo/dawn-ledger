# Ravenholdt: what Blizzard shipped, planned and later made of it

Research, session 70 (read-only: nothing in the addon, the server, the proxy or the database changed; SELECT queries only). The
user: “research what Blizzard had planned for Ravenholdt and how the reputation gain would work.” Context:
[lockpicking-single-player.md](lockpicking-single-player.md), “Ravenholdt: the unfinished hall”.

Rules kept: original sources only (the game's data files and Blizzard's servers' data as Wowhead's database shows it; no
player or creator opinion relayed, Wowhead comments not used). Quest text is summarized in our own words, one short quote at
most per source. **Fact** = shipped or in Blizzard's files, with the source. *Inference* = what the data suggests, labelled.

## Sources

| Source | What it gave |
|---|---|
| Our world database `classicmangos` (CMaNGOS, 1.12) | quests, kill reputation, gossip, the guards' lines by standing, unused NPCs and items |
| `(the server's checkout)` (1.12.1 client: Faction, FactionTemplate, Spell, AreaTrigger) | the faction's text and base standing, the unused disguise and tracker spells, an unused trigger beside Master Kang |
| `broadcast_text` rows with VerifiedBuild 31882 (Blizzard's Classic 1.13.2 client text, imported by CMaNGOS) | the guards' and assassins' greetings for every standing, most of them attached to nothing |
| `tools/wago.py` db2: Faction and SpellName, Classic Era 1.15.9.70003 and WoW Forever 1.60.1.70291 | the faction unchanged; Forever's new “Syndicate Uniform” spell and “Syndicate Disguise” faction. BroadcastText isn't served for Forever (empty) |
| Wowhead's database (data tabs only): `/classic/` (Classic Era, Blizzard's servers), `/tbc/`, `/wotlk/`, `/cata/`, `/forever/`, retail | reputation per quest and per kill as Blizzard's servers give it, per version; Forever's new Ravenholdt quests; Milton Beats' spawn |
| VMaNGOS (`vmangos/core` on GitHub, private-server project) | the Ravenholdt area trigger script; their label for trigger 3106; marked *private-server data* where used |
| CMaNGOS `classic-db` source (`(the server's checkout)`) | a commented-out Alterac Valley spawn of Syndicate Master Ryson (*private-server data*) |
| Blizzard patch notes 1.1–1.12, official site and forum posts, interviews | **nothing found** on Ravenholdt or its reputation. The later kill-reputation changes (TBC, Wrath) show in the data but no patch note for them was found (searched; not exhaustive) |
| Later expansions (Cataclysm 4.3, Legion) | from Wowhead's retail data (quests, NPCs); Legion's story from warcraft.wiki.gg's summary of the in-game quests, labelled |

## 1. What shipped in 1.12, and how the reputation worked

**The faction (fact, Faction.dbc 1.12.1, the same in Era 1.15.9 and Forever 1.60.1):** Ravenholdt (349) is a guild of thieves
and assassins that takes only the exceptional, “Sworn rivals of the Syndicate.” Every race starts at Neutral 0; the cap is
42,999 (Exalted). No class mask: any class could gain it, but every quest that gives it is rogue-only. The Syndicate (70)
starts at Hated (−10,000). The guards' faction template (473) is hostile to the Syndicate (FactionTemplate.dbc).

**The way in (fact, our DB):** every rogue trainer has a “<Take the letter>” gossip option at 24 that casts *Conjure Elegant
Letter* (21100); the letter starts *The Manor, Ravenholdt* (6681): bring the Seal to Fahrad, cross the hills (an area
trigger gives “Rite of Cunning” credit), and your cunning “will be tested along the way.” Fahrad asks on arrival whether you
met Milton, and says a long journey awaits; the guards outside start you off.

**How standing was gained, by version (fact: Wowhead's data for each version; ours from our DB):**

| Source | Classic Era (Blizzard, 1.12-based) | Our server (CMaNGOS) | TBC Classic | Wrath / Cata |
|---|---|---|---|---|
| The Manor, Ravenholdt (once, 24) | +100 | +250 | +250 | n/a |
| Syndicate Emblems (6701, repeatable, one emblem) | +100 | +100, **only while below Friendly** (RequiredMaxRep 2999) | +250 | +250 |
| A Simple Request → Sealed Azure Bag → Encoded Fragments → The Azure Key (50+, once) | 10 / 100 / 100 / 150 = 360 | 10 / 250 / 250 / 350 = 860 | 250 / … / 500 | n/a |
| Junkboxes Needed (8249, repeatable, five Heavy Junkboxes) | +50 Ravenholdt, **−250 Syndicate** | +75 / −75 | +75 / −75 | +75 / −75 (retail: any class, level 20) |
| Killing Syndicate (Alterac, Hillsbrad) | **nothing** | **nothing** | +5, −25 Syndicate, stops at Neutral or Friendly by creature | +5, stops at **Honored** |
| Spending standing | **nothing** (no item, vendor or reward needs it) | nothing | nothing | nothing (later: the *Insane in the Membrane* title needs Exalted) |

- Where the emblems come from (fact, Wowhead Classic data): in Era they are **pickpocketed** from the Syndicate (Alterac,
  Hillsbrad, Arathi), with a kill drop near zero (about 0.1 %). Our DB drops them on 79.7 % of kills: a private-server
  choice. The quest's own words match Era: the guards want the emblems *stolen* (a robbed member is shamed and dealt with by his
  own), starting at Durnholde.
- Junkboxes Needed is Fahrad's lockpicking practice (fact, its text): his rogues need locks hard enough to train on, the locks
  **Zan** makes them are fit only for beginners, and you may open the boxes first as long as you leave a few coins inside.
- Our server's kill rows for faction 349 are the reverse: killing a Ravenholdt resident gives the Syndicate +5 and Ravenholdt
  −25. Era shows no such reward (Wowhead classic, Ravenholdt Guard). *Inference: a CMaNGOS addition mirroring the TBC rule.*
- *Inference, the arithmetic of 1.12:* Era's values give Neutral → Friendly by about 29 emblems; Friendly → Exalted (39,000) only
  by junkboxes at 50 a turn-in: about 780 turn-ins, some 3,900 Heavy Junkboxes, pickpocketed from level 50+ humanoids. With
  nothing to buy, that was a long road with no stop on it: the shape of something unfinished rather than deliberately small.
- *Inference, our numbers:* CMaNGOS's quest values match TBC's, not Era's (250, 350, 75/−75); our server runs TBC's quest
  rewards without TBC's kill reputation.

## 2. What was unused or left unfinished (with where it was found)

| What | Where | What it says about the plan |
|---|---|---|
| **The greetings for every standing.** Guards: three lines each for Neutral, Friendly and three more sets above; assassins: two each. Above Friendly they become a ladder: respect, then **Simone has been looking for you**, then **Master Kang has been asking about you, your time may have come**, up to awe. The assassins: **Winstone is looking for thieves with your skill**, then **your time has come, Master Kang awaits**, up to wishing to serve under you (all in our words) | `broadcast_text` 8478–8502 (Blizzard's Classic client text, build 31882). Only Neutral (8478–80, 8493–94) and Friendly (8481–83; 8495–96 as npc_text 5939) are attached; **8484–8492 and 8497–8502 are attached to no npc_text**, and the Honored+ texts (5935, 5940) read “Missing US text” | **Fact:** Blizzard wrote standing-by-standing reactions to Exalted. *Inference:* the order (3 lines × 5 standings for guards, 2 × 5 for assassins) puts Simone at Honored, Kang at Revered for the guards; Winstone at Friendly and Kang at Revered for the assassins. Simone, Winstone and Master Kang were meant to have work for you at rising standing, ending in a trial with Master Kang (level 62, the manor's highest). All three are silent in 1.12 |
| **An unused trigger beside Master Kang** (radius 5, about 13 yards from him) | AreaTrigger.dbc 3106 (1.12.1); VMaNGOS labels it “Unused, Training Area” (*private-server label*) | *Inference:* the place of Kang's trial or a training ring |
| **Milton Beats, “Giver of the Beatings”** (level 33 elite) | creature 13082 in our DB, **0 spawns**; Era and Forever spawn him in Hillsbrad (78.4, 18.0, two points) on the way to the manor (Wowhead data) | Shipped by Blizzard (Fahrad asks about him at 6681's turn-in), missing on our server: the cunning test on the road |
| **Knowledge: Syndicate Disguise**, a rogue book (level 22) teaching *Syndicate Disguise*: look like a Syndicate Highwayman | item 5132, spells 5274/5266 (Spell.dbc 1.12.1); no source in our DB or Era | A rogue reward to infiltrate the Syndicate, never given. Forever finally uses the idea (below) |
| **Syndicate Man Tracker (MURP)**, a tracking item (“Tracking for Murp”) | item 17347, spells 21391/21397; no source | *Inference:* a test or planned tool for hunting Syndicate men; ids beside the Ravenholdt items (17124–17126) |
| **Garona, “Grand Master of the Assassin's League”**; **Ravenholdt Falconer** and **Houndmaster** (“[UNUSED]”) | creatures 6767, 6769, 6770, no spawns (ours, Era: “location unknown”) | A larger household was planned (a grand master above Fahrad, falconers and hounds) |
| **Syndicate Master Ryson** (questgiver), Brigand, Agent (55–57) and *Master Ryson's All Seeing Eye* (6847/6848, both sides, Stormpike/Frostwolf reputation) | our DB, no spawns; a commented-out Alterac Valley spawn in CMaNGOS's source (*private-server data*) | The Syndicate as a third party in Alterac Valley, cut: shows the Syndicate was meant to matter in late Alterac content |
| A placeholder line: the Signet of Chaos “belongs to Ravenholdt” (marked PLACEHOLDER) | `broadcast_text` 3067 | A cut thread linking Ravenholdt to a relic |
| **Nothing between 24 and 50**, and nothing to spend standing on | quest_template, item_template (no item requires faction 349) | The gap the greetings above were written for |

## 3. What later versions did with Ravenholdt

- **TBC (2.x) and Wrath (3.x), fact (Wowhead tbc/wotlk data):** Syndicate kills began giving +5 Ravenholdt (stops at Neutral or
  Friendly in TBC, Honored from Wrath on); quest values rose (emblems 250); Junkboxes Needed opened to every class in retail.
  No patch note for the kill change was found. *Inference:* Blizzard fixed the missing middle by grinding, not by content.
- **Cataclysm 4.3, fact (Wowhead retail):** the rogue legendary daggers' chain (*To Catch a Thief*, *Patricide* and others,
  +500 Ravenholdt each) runs through Ravenholdt, with new Ravenholdt sentries and lookouts. Ravenholdt became the rogue class's
  elite order for its greatest reward.
- **Legion 7.x, from warcraft.wiki.gg's summary of the in-game quests:** the rogue order hall is not at the manor (the Hall of
  Shadows, under Dalaran), but Lord Jorach Ravenholdt sits on the Uncrowned's council, invites the player to its last seat,
  and Winstone Wolfe is recruited to run its research. Blizzard's later intent: Ravenholdt's people *are* the rogues'
  leadership, and Winstone is the one who finds work for rogues.
- **WoW Forever (1.60.1), fact (Wowhead Forever data and wago SpellName/Faction):** a new rogue chain at the manor from
  **Myrokos Silentform** (level 24, both factions): *Syndicate Sabotage* (kill Lord Tomas in Durnholde, +100), *What's the Big
  Idea?* (pickpocket a scouting report, +100), *Covert Extraction* (the Perenolde heirlooms in Alterac's ruins, +100), *A Way
  In* (steal a Syndicate uniform at Northfold Manor), *Master of Disguise* and *Ain't No Telling* (disguised inside Stromgarde
  Keep, Anastasia Miller), *The Syndicate Sting* (+300). New spell *Syndicate Uniform* (1297705), new faction *Syndicate
  Disguise* (2813). Era's quests and values otherwise unchanged. Blizzard filled the 24–36 gap with **stealth, pickpocketing
  and disguise against the Syndicate**, not with locks, and still added nothing to spend standing on (as far as the data shows).

## 4. What this means for our design (rogues only, both factions alike)

What we can say Blizzard intended: a rogue-only order you are *invited* to; work against the Syndicate done by **theft rather
than slaughter** (emblems picked, not looted; Era gives no kill reputation); Fahrad's lockpicking practice with Zan making
the practice locks; residents who greet you by standing to Exalted and send you to **Winstone** (Friendly), **Simone**
(Honored) and finally **Master Kang** (Revered, his trial). Our proposal already fits most of it.

**Reputation gain, options:**

1. **Blizzard's 1.12 shape, finished (recommended).** Emblems by pickpocketing (move our 79.7 % kill drop to pickpocket loot, as
   in Era) to Friendly; the rank quests give the steps (Journeyman → Friendly, Expert → Honored, Artisan → Revered, the
   Kang trial at Revered); Junkboxes Needed and the contract board carry Revered → Exalted. No kill reputation, as in Era.
2. **Add kill reputation like TBC/Wrath** (+5 a Syndicate kill, to Honored): simple and later Blizzard's own fix, but it
   rewards killing over the thief's way, and Era (Blizzard's 1.12) never had it.
3. **Era's numbers or ours.** Era's values (100, 50 a junkbox turn-in) make Exalted a 3,900-box road; ours (TBC's) are kinder.
   Keep ours, or pick the figure each step needs; either way say so in the patch.

**The contract board, options (Winstone Wolfe, “The Wolf”, as the fixer: his assassin line and Legion's role both point at him):**

- **A. Winstone's board, opened at Friendly:** one contract a day (session 68's dailies), each a thief's job against the
  Syndicate or a lock: pick a Syndicate strongbox, lift a ledger, open three footlockers in a camp of your level. Pays standing
  and a lockbox. Matches the unused assassin's line sending you to Winstone.
- **B. Tiers by standing:** Winstone's jobs at Friendly, Simone's grounds and errands at Honored, Carlo Aurelius' dangerous
  work at Revered; Master Kang's trial (at trigger 3106's spot) as the Revered step. Uses every silent resident the greetings
  name.
- **C. Junkboxes as the repeatable spine,** the board for variety: Fahrad keeps Junkboxes Needed (lockpicking practice, as
  written), the board adds one job a day.

**Small, faithful fixes either way:** spawn **Milton Beats** on the road (Blizzard's two points; our server lacks him); attach
the unused greetings to their standings (the text is Blizzard's, only the wiring is missing); give the unused **Syndicate
Disguise** book as a reward (it exists, rogue-only, level 22; Forever's own chain is built on a disguise); something to spend
standing on from Smudge and Zan, from items the client has.
