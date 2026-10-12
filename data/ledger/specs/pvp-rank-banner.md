# PvP rank banner (session 67; built in Forever UI 0.256.0, PvP.lua)

The user: "Do we have toasts for reaching new pvp ranks? We can plan for that as well. Make it contextual like always. Lets try to
pair with some stings or jingles that are used elsewhere in the game for pvp related things so that it boost the reward feeling."
Today a new rank only changes the PvP tab. With the new ranking (honor straight into rank points, no decay:
docs/research/progression/honor.md §6) a rank arrives the moment you earn it, often in a battleground, so the moment deserves a
banner. Preview: `tools/asset-extract/pvp_rank_preview.py` → http://localhost:8777/ui-forever/pvp-rank/

## The banner (docs/specs/toasts-and-banners.md: a moment, so a banner)

- **Caption:** the rank before the name, as the game titles you ("Sergeant Sashimii · Night Elf Hunter · Warsong Gulch").
- **Gold line:** the side's voice by race, one line for the enlisted ranks (1-5), one for the officers (6-14).
- **White line:** what the rank means (the side's own where it names it: the Champions' Hall, the Hall of Legends).
- **Title:** the rank's name by faction (GetPVPRankInfo), its own badge beside it (`UI-Character-Info-Honor-Icon-N`, the PvP
  tab's), "Rank N" under the name.
- **Milestones** (the badge 64 in the glow, the glow's bottom on the band's bottom gold line, "— RANK N —" small above): 6 (the
  officers' hall), 11 (the war mounts), 14.
- **Under the band:** what the quartermaster now sells ("New at the quartermaster: the bracers"), its level when higher than
  yours ("(at level 45)"); under it, dimmed, when you're at your level's cap: "Level 45 opens Rank 6." (the PvP tab's words, session 75).
- **Several ranks at once** (a GM `.honor add`, a big turn-in): one banner, the highest.
- **When:** `PLAYER_PVP_RANK_CHANGED` (UnitPVPRank up from the last one seen); the last rank kept per character, so a rank gained
  away from this client shows at the next login. Rank down: nothing (and with no decay it no longer happens).
- **The queue:** the banners' own (after a level-up, before spells), its Edit Mode duration; `/fui rank 1-14` to look at one; a
  screenshot while it shows logs "Rank - <name>".
- **Sound:** a PvP sting (below), the side's own version where the game has one; the milestones a bigger one.

## Words (all under the banner's 38 characters)

| Race | Ranks 1-5 | Ranks 6-14 |
|---|---|---|
| Human | Stormwind salutes you, soldier. | The generals of Stormwind know you. |
| Dwarf | Ironforge raises a mug to ye! | The Thane’s own guard salutes ye. |
| Night Elf | The Sentinels honor your service. | Shandris Feathermoon takes note. |
| Gnome | Promotion confirmed! Splendid! | High Tinker Mekkatorque approves! |
| Orc | Lok’tar! The Horde sees your strength. | Thrall’s warriors speak your name. |
| Undead | The Dark Lady notes your service. | Your service pleases the Dark Lady. |
| Tauren | The Earth Mother sees your courage. | Cairne’s braves honor your name. |
| Troll | Da Darkspear be proud o’ ya, mon. | Vol’jin be hearin’ of ya deeds. |

| Rank | White line | New at the quartermaster (level) |
|---|---|---|
| 1 | You take up arms for the Alliance. / the Horde. | the tabard |
| 2 | The quartermaster knows your face. | the insignia |
| 3 | Soldiers look to you in battle. | the sergeant’s cloak (30) |
| 4 | Your word carries in the ranks. | the sergeant’s neck insignia (30) |
| 5 | Veterans stand aside for you. | the bracers (45) |
| 6 | The Champions’ Hall opens to you. / The Hall of Legends opens to you. | the knight’s colors |
| 7 | You ride at the head of a company. | gloves and boots (60) |
| 8 | Captains answer to you now. | chest and legs (60) |
| 9 | Your standard flies over the field. | the battle standard |
| 10 | Your officer’s armor is complete. | helm and shoulders (60) |
| 11 | A war mount answers to you. | the war mounts (40) |
| 12 | Armies march at your word. | the epic gloves, boots and legs (60) |
| 13 | The war council awaits your word. | the epic helm, chest and shoulders (60) |
| 14 | No one stands higher in this war. | the weapons (60) |

The quartermasters (world database, `npc_vendor`): Officer Areyn / Sergeant Ba'sha (ranks 1-5), Master Sergeant Biggins / Brave
Stonehide (6-9), Captain Dirgehammer / Lady Palanseer (armor 7-13), Lieutenant Karter / Raider Bork (mounts, 11), Captain O'Neal /
Sergeant Thunderhorn (weapons, 14).

## A correction to the rank cap by level

The cap table (honor.md §6, applied) said "rank 7 (the mounts) from 40". The vendors say otherwise: the war mounts are **rank 11**
(level 40); rank 7's gloves and boots, and ranks 8 and 10, need level 60. What each rank's rewards ask: 1-2 none; 3-4 30 (then 45,
58 versions); 5 45 (58); 6 none; 7, 8, 10 60; 9 none; 11 40; 12-14 60. A cap that follows them: **to 29 rank 2, 30-44 rank 4,
45-59 rank 6, 60 all**. The user chose it; applied the same session (docs/server/operations.md).

## Sounds (research: a background agent, session 67; files in (private files) players on the preview)

Both clients' SoundKit, SoundKitEntry and SoundKitName read as docs/specs/toast-sounds.md describes (1.14.2 build 42597, Forever
70245); lengths by ffprobe. No kit named Honor or Rank exists in 1.14.2.

| Kit | Name | File | Length | Where | Fit |
|---|---|---|---|---|---|
| 8455 | PVPVictoryAlliance | 569678 Sound/SPELLS/PVPVictoryAlliance.ogg | 10.1 s | both clients: `PlaySound(8455)`, nothing to ship | the Alliance's battleground fanfare: a rank's big moment |
| 8454 | PVPVictoryHorde | 568480 Sound/SPELLS/PVPVictoryHorde.ogg | 12.0 s | both | the Horde's |
| 8173 | PVPFlagCapturedAlliance | 569543 PVPFlagCaptured.ogg | 3.6 s | both | short, per faction; reads as "you scored" |
| 8213 | PVPFlagCapturedHorde | 568959 PVPFlagCapturedHorde.ogg | 2.5 s | both | the Horde's |
| 77003 | UI_PVP_HONOR_PRESTIGE_RANK_UP (Forever) | 1489546 UI_Mission_200Percent.ogg | 2.6 s | Forever only: ship in Sounds/ | a modern rank-up chime (the garrison's "200%" one, reused) |
| 54129 | UI_70_ARTIFACT_FORGE_TRAIT_RANKUP (Forever) | 1489459 | 1.9 s | Forever only | a short rank-up chime |
| 8459 | PVPThroughQueue | 568011 | 5.1 s | both | the queue-pop horn: "go", not a reward |
| 8571-8574 | CrowdCheerAlliance1/2, CrowdCheerHorde1/2 | | 7.6-9.6 s | both | a crowd, per side (not extracted) |
| 6594 / 6595 | BellTollAlliance / BellTollHorde | 566564 / 565853 | 1.8 / 2.9 s | both | a bell per side (not extracted) |

The proposal: the side's victory fanfare (8455 / 8454) for a rank, faded out as the banner leaves (10-12 s: understated, the
guidelines' sound sized to the action); for ordinary ranks perhaps the short flag-captured sting of the side (8173 / 8213), the
fanfare kept for the milestones (6, 11, 14); or Forever's chime (77003) on its own. The user's pick.

**Chosen (the user): the side's flag-captured sting for a rank (8173 / 8213), the side's victory fanfare for the milestones
(8455 / 8454), faded out over 2 s as the banner leaves.** Both kits are the client's own: nothing shipped.

## Built (0.256.0)

PvP.lua: `PLAYER_PVP_RANK_CHANGED` and a check 5 s after login against `ns.charDB.pvpRankSeen` (a first look only notes the
rank); the spell banner's queue (`ns.QueueBannerItem`) with the profession milestone's layout, extended in ProgressFeed.lua: an
atlas in place of the framed icon (`setIcon`, `f.badge`), `item.captionPrefix`, `item.sound`, `item.onHide`, a missing gold line
or "opens" line skipped. The milestones put the rank's meaning in the line under the title (the milestone's "what it opens")
rather than a second white line. `/fui rank 1-14`; a screenshot while it shows logs "Rank". Tests: foreverui/111-pvp-rank.lua.
