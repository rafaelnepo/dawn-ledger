# Achievement toasts: how WoW Forever shows them, and a "max reached" toast for ForeverUI

Research, 2026-09-30 (read-only; nothing in the addon changed). Wanted: Forever's achievement toast and any "legacy" variants,
for a toast when something reaches its maximum (a profession at 300/300, a weapon skill at its max, Defense at its max).
Sources: Forever's extracted interface code (`(private files)`), its atlas tables
(`(private files)` Atlases over `out/dbfilesclient/`), its global strings (`globalstrings.db2`), its
extracted textures (`(private files)`), and the same for 1.14.2 (`(private files)`).
The Forever install itself was not touched.

## 1. Forever's toast variants

Forever (game type `camelot`) loads the mainline alert system: `blizzard_framexml/mainline/alertframes.lua|xml` and
`alertframesystems.lua|xml` (its only override, `camelot/alertframesystemsoverride.lua`, is about mount quality). The mainline
EventToastManager and BossBanner are not loaded in Forever (`blizzard_framexml.toc`: `[AllowLoadGameType mainline]`).

### Achievement Earned (`AchievementAlertFrameTemplate`, `alertframesystems.xml` line 173; set up in `alertframesystems.lua` 316)

- **Frame** 300 x 101, inherits `AlertFrameTemplate`. Triggered by `ACHIEVEMENT_EARNED` (`alertframes.lua` 538);
  `AchievementAlertSystem = AlertFrame:AddQueuedAlertFrameSubSystem(..., 2, 6)`: **2 on screen, 6 waiting**; none during a pet battle.
- **Art** (all in `Interface/AchievementFrame/AchievementToast.BLP`, FDID 4035524, 1024 x 1024):
  | atlas | size | use |
  |---|---|---|
  | `ui-achievement-alert-background` | 310 x 101 | the plate (gold vine frame, parchment left, dark red name band), centred |
  | `ui-achievement-iconframe` | 74 x 74 | the icon's frame; the icon 52 x 52 inside, the `Icon` frame 78 x 75 at TOPLEFT (-4, -15) |
  | `ui-achievement-bling` | 107 x 107 | behind the icon (hidden by default) |
  | `ui-achievement-shield-2` | 62 x 55 | the points shield (gold-rimmed), `Shield` frame 64 x 64 at TOPRIGHT (-8, -15), icon at (1, -6) |
  | `ui-achievement-shield-1` | 63 x 56 | the template's default shield (winged, dark centre) |
  | `UI-Achievement-Shield-NoPoints` | (no atlas member in Forever's tables) | used when points are 0: see Legacy below |
  | `ui-achievement-alert-glow-glow` | 400 x 171 | ADD glow over the whole toast as it comes in |
  | `ui-achievement-alert-glow-shine` | 67 x 85 | ADD shine at BOTTOMLEFT (0, 8) that sweeps right |
- **Text**: "Achievement Earned" (`ACHIEVEMENT_UNLOCKED`) in `GameFontBlackTiny` (black, SystemFont_Tiny), 200 x 12 at TOP (7, -23);
  the achievement's **name** in `GameFontHighlight` (white), 155 x 36, two lines at most, centred, under it. **Points** on the
  shield in `GameFontNormal` (under 100) or `GameFontNormalSmall`, vertex colour white, CENTER (2, -2); none when points are 0.
- **Timing** (the template): in over 0.2 s; held 4.05 s; out over 1.5 s. Glow 0.2 s in then 0.5 s out. Shine: 0.2 s in, slides
  240 px in 0.85 s, fades after 0.35 s over 0.5 s. Hover pauses the fade; leaving resumes it with 1 s left; right-click
  dismisses; left-click opens the achievement.
- **Place and queue**: the `AlertFrame` container, BOTTOM of UIParent (0, 128); every subsystem (loot, money, achievements,
  recipes...) stacks upward from there, BOTTOM to the previous one's TOP, centred.
- **Sound**: none in the Lua. The client plays it itself on `ACHIEVEMENT_EARNED`. The best guess is SoundKit 12891
  (`sound/spells/achievmentsound1.ogg`), not confirmed in the extracted files. 1.14.2's `SOUNDKIT` table has only
  `ACHIEVEMENT_MENU_OPEN/CLOSE` (13832/13833).

### Guild Achievement Earned (the same template, `isGuildAch`)
104 tall, `ui-achievement-guild-background` 321 x 104, `ui-achievement-guild-iconframe` 78 x 75, points in green, the guild's
name and tabard flag (`ui-achievement-guild-flag-short` 65 x 68 and its outline), `ui-achievement-guild-glow` 382 x 154 and
`-shine` 84 x 90. Text "Guild Achievement Earned".

### Achievement Progress (`CriteriaAlertFrameTemplate`, line 331; `CRITERIA_EARNED`)
256 x 84, `ui-achievement-alert-background-mini` 256 x 84 at LEFT; "Achievement Progress" (`ACHIEVEMENT_PROGRESSED`,
GameFontBlackTiny) TOP (22, -18), 170 wide; the criterion in GameFontHighlight, 160 wide, CENTER (27, -7); icon 50 x 50 in
`ui-achievement-iconframe`; glow `ui-achievement-alert-background-mini-glow` 314 x 136, shine slides 210. Same timing, 2 / 6.

### Traveler's Log Progress (`MonthlyActivityFrameTemplate`, line 2830; `PERKS_ACTIVITY_COMPLETED`)
The mini toast again, "Traveler's Log Progress" (`MONTHLY_ACTIVITIES_PROGRESSED`), icon atlas `activities-toast-icon` 50 x 50,
sound `TRADING_POST_UI_COMPLETED_ACTIVITY_TOAST` (219929).

### "Legacy": what that means in Forever
- **Legacy Challenges** are achievements worth 0 points, each rewarding "Earn 1 Legacy Point"
  (`(private files)`). Among them, for six crafts: "Artisan Alchemist / Blacksmith / Enchanter /
  Engineer / Leatherworker / Tailor: Reach 300 skill in <X> for the first time" (and Journeyman 150, Expert 225). So on Forever
  itself, **a craft at 300 gives an Achievement Earned toast** with the name "Artisan Alchemist" and the **no-points shield** (the
  Feat-of-Strength look). Forever's atlas for that shield has no member in its tables. The texture is the file
  `Interface/AchievementFrame/UI-Achievement-Shields-NoPoints` (texcoords 0-0.5 x 0-0.45: a winged shield with a gold crest).
  What Forever really draws there is not verified (we have no screenshot).
- The Legacy UI addon itself (`LegacySystemFrame`, `LegacyChallengeViewedUtil`) is **not in the extracted code**. Only the micro
  button refers to it. There's no legacy toast atlas either (no `legacy-*toast*` or `legacy-*alert*`). If Forever has a Legacy
  toast of its own, we don't have it.
- **The older variant, still in 1.14.2's code**: 1.14.2 ships `AchievementAlertFrameTemplate` too (`classic-1.14.2/code/1344457.bin`
  line 189, set up in `1344459.bin` line 289). It's file-based and 300 x 88. `AchievementAlertSystem` is registered there but
  disabled (`SetCanShowMoreConditionFunc(function() return false end)`). Its **already earned (legacy)** look: the shield hidden, and a
  dark red strip `OldAchievement` (`UI-Achievement-Borders`, 0.1855-0.6230 x 0.6563-0.7344, 193 x 19 at TOPLEFT 93, -34) behind the
  name. Forever's mainline dropped the strip: it only centres the text (Unlocked TOP 27, -23).
- Statistics: Forever counts "Weapon skills at maximum skill", "Professions at maximum skill" and "Secondary skills at maximum
  skill" (achievement.db2), with no toast.

### Nearby (profession) toasts in Forever
`NewRecipeLearnedAlertFrameTemplate` and `SkillLineSpecsUnlockedAlertFrameTemplate`: 312 x 89, `recipetoast-bg` (312 x 89,
`Interface/LootFrame/RecipeToast.BLP`, FDID 1337565, in 1.14.2 too), icon 64 at LEFT 18, title GameFontHighlight, name
GameFontNormal (gold), sound `UI_PROFESSIONS_NEW_RECIPE_LEARNED_TOAST` 73919 (in 1.14.2's SOUNDKIT).

## 2. Where the art is

- **Forever HD atlas**: `(private files)` (1024 x 1024). Texcoords
  (l, r, t, b): background 0.625, 0.9277, 0.1699, 0.2686; mini 0.001, 0.251, 0.3691, 0.4512; glow 0.001, 0.3916, 0.001, 0.168;
  shine 0.001, 0.0664, 0.8457, 0.9287; iconframe 0.1074, 0.1797, 0.5059, 0.5781; shield-1 0.9258, 0.9873, 0.3047, 0.3594;
  shield-2 0.1074, 0.168, 0.6934, 0.7471; bling 0.001, 0.1055, 0.4531, 0.5576. **Not in 1.14.2** (neither the file nor the
  `ui-achievement-*` atlases), so ForeverUI would ship it cut into `addons/ForeverUI/Art` (the loot toast's way).
- **The older files**, in both clients (`forever/ui/...` and `classic-1.14.2/ui/Interface/ACHIEVEMENTFRAME/`):
  `UI-Achievement-Alert-Background` (512 x 128, used 0-0.605 x 0-0.703 = 300 x 88), `-Alert-Background-Mini` (256 x 64),
  `-Alert-Glow` (512 x 256), `-IconFrame` (128, used 0-0.5625), `-Bling`, `-Shields` / `-Shields-NoPoints` (128), `-Borders`,
  `-Guild`. These are 1.14.2's own data, so an addon can `SetTexture("Interface\\AchievementFrame\\...")` without shipping
  anything (to confirm in game). Forever's HD plate is the same design, redrawn sharper and 13 px taller.
- ForeverUI has none of this yet (`Art/Atlas.lua`: no achievement entries).

## 3. A "max reached" toast in ForeverUI

**What's reusable**
- `LootToasts.lua`: the stack (`push`, `layout`, `release`), fading per toast (`fadeIn` / `hold` / `fadeOut`; the defaults 0.2 /
  4.05 / 1.5 are already Forever's achievement timing), holding while the pointer is on the toast, the glow as it comes in,
  `ns.SetAtlas` with cut art.
- `ProfessionBanners.lua`: `scan()` over `GetSkillLineInfo` on `SKILL_LINES_CHANGED` (a toast only for a change seen while
  playing), `seen(key)` once per character (`ForeverUIDB.professionToasts`), `toastsOn()` (Edit Mode rules). The 300/300 moment
  already calls `ns.ShowProfessionMastery` (the orange "Artisan's Mastery" loot toast).

**What's new**
- The frame: the plate, the icon in its frame, the shield (no points, or points), "Achievement Earned" and the name, the glow
  and the sliding shine. Forever's HD art cut into `Art/`, or 1.14.2's own files.
- Where it goes: Forever's place is bottom centre (0, 128), 2 at a time with 6 waiting. That's a stack of its own with an Edit
  Mode box "Achievement Toasts", apart from the loot stack.
- The sound (12891 to try in game).
- `scan()` extended to weapon skills and Defense. In 1.14.2 their max is 5 x level, so "at its max" comes every level while
  levelling.
- `/fui achievement` to look at it, a screenshot-log kind, tests, copywriting rows, and **a browser preview first** (house rule).

**The words (Forever's style: "Achievement Earned", then a title as the name, two lines at most)**
- Crafts at 300, Forever's own Legacy names: "Artisan Alchemist", "Artisan Blacksmith", "Artisan Enchanter", "Artisan Engineer",
  "Artisan Leatherworker", "Artisan Tailor".
- The rest, WotLK's names: "Artisan Cook", "Artisan in First Aid", "Artisan Fisherman". Gathering is ours in the same pattern:
  "Artisan Herbalist", "Artisan Miner", "Artisan Skinner".
- Weapon skills at 300, ours: "Master of Swords" (Axes, Maces, Daggers, Bows...). Unarmed: WotLK's "Did Somebody Order a Knuckle
  Sandwich?". Four weapons at 300: WotLK's "Master of Arms".
- Defense at 300, ours: "Master of Defense" (or something in the lore voice).
- Shield: the no-points crest (Legacy / Feat of Strength), unless we give points.

## 4. Open questions for the user

1. Which look: Forever's HD plate (art shipped in the addon) or 1.14.2's older file-based one (no art to ship)?
2. At 300/300, should this toast **replace** the orange "Artisan's Mastery" loot toast (no duplicated elements) or join it?
3. "Max" for weapons and Defense: only at 300 (level 60), or at the cap for every level (frequent)?
4. Points or no points? Should these count toward the Adventure Journal's challenges, and should its existing challenges
   (Quests Completed, Exalted...) use the same toast?
5. Where should it go: Forever's bottom centre in its own stack, or the loot stack above the bags?
6. The names for weapons, Defense and gathering: pick or rewrite (per race or class voice?).
7. The sound: try SoundKit 12891 in game, or keep `UI_PROFESSIONS_NEW_RECIPE_LEARNED_TOAST` (73919), which 1.14.2 has.

Side finding: 1.14.2's `SOUNDKIT` table has no `UI_LEVEL_UP_TOAST` (checked in `classic-1.14.2/code/4216289.bin`), so the guarded
`PlaySound` in `ProgressFeed.lua` lines 640 and 1275 never plays.
