# Toast sounds: what WoW Forever plays, what 1.14.2 lacks

Research and extraction, 2026-09-30. Nothing in the addon's Lua changed; the sounds are in `addons/ForeverUI/Sounds/`, ready to wire.

## How it was checked

- **What Forever plays**: its extracted UI code (`(private files)`, mainly
  `blizzard_framexml/mainline/alertframesystems.lua`, which Forever loads as game type `camelot`; `EventToastManager` is
  `[AllowLoadGameType mainline]` only, so Forever has no level-up toast frame). Sounds the client plays itself (level up,
  achievement, reputation) aren't in the Lua.
- **Kit to file**: the `SoundKit` (1237434) and `SoundKitEntry` (1237435) tables of both clients, read with `wdc3.py` and column
  lists checked against each file's header (Forever: WDC5, 23,219 kits, 90,520 entries; 1.14.2: WDC3, 4,655 kits, 8,941 entries).
  Kit names come from 1.14.2's `SoundKitName` (1665033; Forever has no such table). File names from the local
  `listfile-archive.zip` (2023; Forever's newest files have no name there).
- **In 1.14.2?**: the kit in its `SoundKit` table, the file in its storage (`forever/cascx id`). 1.14.2's `SOUNDKIT` Lua table
  names many retail kits whose data isn't in its tables: `PlaySound` on those most likely plays nothing.
- **Extraction**: `forever/cascx (a file on the server's Mac)"World of Warcraft" get <out> <FileDataID>`; each file's MD5 matches its CASC content key.

## The table

| Event (ForeverUI element) | What Forever plays (SoundKit) | File (FileDataID) | In 1.14.2? | `Sounds/` file |
|---|---|---|---|---|
| Level up: the banner (`ProgressFeed.lua` 640), the milestone spell banner (1275) | 888 `LEVELUP`, played by the client itself. Forever points it at a new remastered file | 6696263 | Kit 888 yes, but on the old `Sound/Spells/LevelUp.ogg` (569593), which the client already plays. The new file: no. `UI_LEVEL_UP_TOAST` exists in neither client | `LevelUpToast.ogg` |
| Loot toasts (`LootToasts.lua`) | `UI_EPICLOOT_TOAST` 31578 (loot won, the default) | 642829 `UI_EpicLoot_Toast_01` | No (neither the kit nor the file) | `LootToast.ogg` |
| Loot toasts, lesser items (optional) | `UI_RAID_LOOT_TOAST_LESSER_ITEM_WON` 51402 (the LessAwesome toast) | 1138111 | No | `LootToastLesser.ogg` |
| Money toast | `MoneyWonAlertFrame`: 31578 | 642829 | No | `LootToast.ogg` |
| Honor (a toast) | `HonorAwardedAlertFrame`: 31578 | 642829 | No | `LootToast.ogg` |
| Professions: rank learned, Ready to Train, Skill at its Limit, mastery (`ProfessionBanners.lua`) | `UI_PROFESSIONS_NEW_RECIPE_LEARNED_TOAST` 73919 (new recipe, specializations unlocked) | 1133997 `UI_Garrison_Follower_Trait_Learned_02` | No: the name is in 1.14.2's `SOUNDKIT`, the kit and file aren't | `RecipeLearnedToast.ogg` |
| Nodes Revealed (`GatherNodes.lua`) | Nothing like it in Forever | (73919's file is the closest) | — | `RecipeLearnedToast.ogg`, if wanted |
| Achievement Earned (coming) | No sound in the Lua; the client plays it on `ACHIEVEMENT_EARNED`. **12891 isn't a kit in Forever** (nor in 1.14.2), and no Forever kit uses `AchievmentSound1.ogg`, though the file is in Forever's storage. Not confirmed | 569143 `Sound/Spells/AchievmentSound1.ogg` | No | `AchievementEarned.ogg` |
| Reputation, new standing | 8473 `ReputationLevelUp` (client) | 568016 | Yes, the same file | none: `PlaySound(8473)` |
| Skill-ups (chat, `ShowSkillUpToast`) | None: chat only, Forever has no skill-up toast | — | — | none |
| Experience, Item Loot, Money Loot, Tradeskills, Opening, Pet Info, Misc Info, System Messages (chat) | No sound of their own; the client's coin sound on money loot (120, 567428) | — | Yes, the same | none |
| Battleground messages | The client's PvP kits (8455–8459, 8174, 8192, 8212, 8332, 8454) | — | Yes, the same files | none |
| Errors | `UIErrorsFrame`: each message's own kit | — | The same system (not checked kit by kit) | none |
| New title / PvP rank | Nothing (`UI_PVP_HONOR_PRESTIGE_RANK_UP` 77003 is retail's prestige window) | — | — | none |
| Quest completed (for reference; not ForeverUI's) | 619 `QUESTCOMPLETED`, pointed at a new remastered file | 6697797 (7.59 s) | 1.14.2 plays the old 567439 | not extracted |

## The files (`addons/ForeverUI/Sounds/`)

| File | FileDataID | Size | Length | Format |
|---|---|---|---|---|
| `LevelUpToast.ogg` | 6696263 | 52,971 B | 4.36 s | Vorbis, stereo, 44.1 kHz |
| `LootToast.ogg` | 642829 | 21,902 B | 2.26 s | Vorbis, stereo, 22.05 kHz |
| `LootToastLesser.ogg` | 1138111 | 14,242 B | 2.10 s | Vorbis, mono, 22.05 kHz |
| `RecipeLearnedToast.ogg` | 1133997 | 21,247 B | 2.47 s | Vorbis, stereo, 22.05 kHz |
| `AchievementEarned.ogg` | 569143 | 32,819 B | 5.19 s | Vorbis, mono, 22.05 kHz |

To play one: `PlaySoundFile("Interface\\AddOns\\ForeverUI\\Sounds\\LootToast.ogg", "SFX")`.

## For the user to decide

1. **The level-up plays twice.** 1.14.2's client plays the old level-up sound itself (kit 888, file 569593, the same 4.36 s).
   Forever's file is a remaster of it. Choices: add `LevelUpToast.ogg` on top of the old one, or mute the old file with
   `MuteSoundFile(569593)` and play Forever's (to confirm in game that 1.14.2 has `MuteSoundFile`; files 124 and 1440 use the same
   sound). The milestone spell banner would play the new one alone.
2. **Loot toasts**: Forever plays this chime only for rolls won (rare). Ours toasts every loot by your rules, so a chime on each could
   get busy. Choices: every toast; only Uncommon and better (plus rolls); the lesser sound for Poor and Common; no sound.
3. **Money toast**: Forever uses the same chime; the client already plays its coin sound on each money loot.
4. **Achievement**: the sound isn't confirmed (the old WotLK file, which Forever still stores).
5. **Nodes Revealed**: the recipe chime, or no sound.
6. **Git**: `Sounds/` isn't in `.gitignore` (unlike `Art/`, "Blizzard art: personal use only, never committed"). Add
   `addons/ForeverUI/Sounds/` there before the next commit.

## Found on the way (silent sounds today)

- `Professions.lua` 3997/3999: `SOUNDKIT.UI_PROFESSIONS_WINDOW_OPEN/CLOSE` (73917/73918) exist in 1.14.2's `SOUNDKIT`, so the
  `or 850/851` fallback never runs, but the kits aren't in its tables: probably silent. In Forever they play the character window's
  open/close files, which 1.14.2 has as 839/840.
- `Bags.lua` 624: `UI_BAG_SORTING_01` (43937): the same case (Forever's file 1045703 isn't in 1.14.2).
- `MapPins.lua`: `UI_MAP_WAYPOINT_CONTROL_CLICK` / `_REMOVE` (170272/170273) aren't in 1.14.2's `SOUNDKIT`: silent (Forever's files
  2177913/2177910; not extracted).

## Wired (0.169.0; the user's answers, 2026-09-30)

- Level up: Forever's remaster (`LevelUpToast.ogg`) on our banner and on a milestone spell's; the client's own file (569593) muted
  with `MuteSoundFile` while the level-up banner is on, unmuted when Edit Mode hides it.
- Loot toasts: `LootToast.ogg` for Uncommon and better and rolls won; Common and Poor quiet. `LootToastLesser.ogg` unused.
- Money toast: `LootToast.ogg` on a new toast (Forever's MoneyWonAlertFrame), not when coins add to one showing.
- Ready to Train, Nodes Revealed, the recipes banner: `RecipeLearnedToast.ogg`. Skill at its Limit: quiet (a reminder).
- Achievement Earned: `AchievementEarned.ogg`.
- The silent ones fixed: the professions window 839 / 840 (the character window's, as Forever's kits play); the bags' sort
  `BagSort.ogg` (1045703); the map pin `WaypointPlace.ogg` / `WaypointRemove.ogg` (2177913 / 2177910), extracted 2026-09-30 with
  Forever closed.
- All through `ns.PlayForeverSound(name)` (Core.lua).

## The talent window's sounds (session 48, 2026-10-01)

Forever's talent frame plays `UI_CLASS_TALENT_*` kits (its `SoundKitConstants`: 207757-217825). Forever's `SoundKitEntry`
(1237435, WDC5, 90,520 rows) decodes with `(private files)` (written by hand this session):
inline `$id$ID<32>`, `FileDataID<32>`, an unknown `<32>` (1693953 on every row seen), `Volume` (float), `Frequency<8>`, and the
kit in the relationship map (`$noninline,relation$SoundKitID<32>`). The modern files have no names in the 2023 listfile.

| Kit | Files (FileDataID) | `Sounds/` | Played on |
|---|---|---|---|
| `UI_CLASS_TALENT_NODE_SPEND` 207765 | 4642701, 4642703 | `TalentSpend1/2.ogg` | a rank planned |
| `UI_CLASS_TALENT_NODE_SPEND_MAJOR` 207763 / `_NODE_REFUND` 207762 | 3749023, 3749025, 3749027, 3749029 (the same four) | `TalentMajor1-4.ogg` | a one-rank talent planned; a rank taken back; Undo |
| `UI_CLASS_TALENT_APPLY_CHANGES` 207767 | 774376 | `TalentApply.ogg` | Apply Changes |
| `UI_CLASS_TALENT_APPLY_COMPLETE` 212391 | 3088094 | `TalentApplyComplete.ogg` | the plan learned (with the commit flash) |
| `_OPEN_WINDOW`, `_CLOSE_WINDOW`, `_TAB`, `_SPEC_ACTIVATE` | 567507, 567433, 567422, 567407 (the classic files) | not extracted | 1.14.2 plays its own |
| `UI_CLASS_TALENT_LEARN_TALENT` 217825 | 4686026-4686038 (seven) | not extracted | (retail's learn-from-trainer) |

Extracted with WoW Forever closed (the user said so), `cascx ... get`.
