# The quest tracker and Track Recipe: Forever’s code read again, and what’s left to build (research 2)

2026-10-01. Read-only research, so the main session can keep building the tracker unattended. It follows
[quest-tracker-forever-research.md](quest-tracker-forever-research.md) (colors, fonts, sizing, settings, a first recipe design)
and [quest-tracker.md](../specs/quest-tracker.md) (our spec). Nothing here is copied from Forever: its code is described in our own words,
with file:line references.

Sources:

- Forever: `(private files)`. Paths below without a folder are in
  `blizzard_objectivetracker/` (all 43 files read; the achievement, bonus, world quest, scenario, adventure, monthly and
  initiative modules skimmed for clicks, sounds and animations). Also `blizzard_poibutton/`, `blizzard_professionstemplates/`,
  `blizzard_professions/camelot/`, `blizzard_editmode/shared/editmodesystemtemplates.lua`,
  `blizzard_sharedxml/shared/button/checkbuttontemplates.xml`, `blizzard_sharedxml/mainline/soundkitconstants.lua` and
  `nineslicelayouts.lua`. Strings from Forever’s `globalstrings.db2` (read with `wdc3.py`).
- 1.14.2: `(private files)` by file data ID: QuestLog.lua `4216219`, QuestLogFrame.xml `4216138`,
  SecureTemplates.lua `804793`, Blizzard_TradeSkillUI.lua `804052`, Blizzard_CraftUI.lua `4216337`, SOUNDKIT `4216289`, the API
  documentation `1861098` (C_QuestLog and quest events), `1861019` (trade skill events), `2617065` (craft events).
- Ours: `addons/ForeverUI/SkinTracker.lua` (406 lines), `EditUI.lua` 152-158, `Professions.lua`, `MapPins.lua`, the stub
  `addons/tests/stub/33-questwatch.lua`, `05-tradeskill-api.lua`, `15-stats.lua`, the test `addons/tests/foreverui/46-tracker.lua`.
- The user’s Forever shots, `(private files)` to `_200701.jpg` (the Profession band
  is in all of them: “Embossed Leather Boots”, “- 4/8 Light Leather”, “- 0/5 Coarse Thread”).

“Guess” marks what the code doesn’t settle; “verify in game” marks what one `/run` would settle.

## 1. Feature inventory of Forever’s tracker

### 1.1 The frame and its manager

- **The frame** `ObjectiveTrackerFrame` (`blizzard_objectivetracker.xml:3-21`): strata LOW, a right-managed frame and an Edit
  Mode system, `topPadding` 15, header text `TRACKER_ALL_OBJECTIVES` (“All Objectives”). Width 260 (`blizzard_objectivetrackercontainer.xml:63-64`).
- **Modules in order** (`blizzard_objectivetrackermanager.lua:195-207`): Scenario, UI widgets, Campaign, Quests, Adventure,
  Achievements, Traveler’s Log, Endeavors, **Profession**, Bonus, World Quests. Built once both `PLAYER_ENTERING_WORLD` and
  `VARIABLES_LOADED` have fired (`:230`). On 1.14.2 only Quests and Profession have content to show.
- **Layout pass** (`blizzard_objectivetrackercontainer.lua:65-132`): modules lay out in order; each gets the height left; the first
  module sits `topModulePadding` below the top (`BASE_TOP_PADDING` 38, `:15`, `:57-63`), the next ones 10 apart
  (`moduleSpacing`, `.xml:68`). Once a module is truncated, every later module gets 0 height and is skipped (`:112-114`). The
  backing’s bottom is pinned 10 under the last shown module (`:117-119`); with nothing shown the frame hides, except in Edit
  Mode (`:121-127`).
- **Height** (`blizzard_objectivetrackercontainer.lua:207-228`): in the default spot, from its top to the bottom of the screen
  (at least 20); moved in Edit Mode, the Height setting (default 800) or, if larger, the “must fit” modules.
- **Updates are batched**: a module marks itself dirty, the container relays out once (`DirtiableMixin`, `:17-24`,
  `blizzard_objectivetrackermodule.lua:86-91`). A dirty pass skips modules that are complete and still fit (`:133-140`).
- **Sorting** (`blizzard_objectivetracker.lua:23-31`): `C_QuestLog.SortQuestWatches()` on `ZONE_CHANGED_NEW_AREA`, and on
  `ZONE_CHANGED` when the map ID changed. The sort itself is C-side (guess: by distance, as retail). Within the quest module,
  callings first, then quests that override the sort order, then watch index (`blizzard_questobjectivetracker.lua:168-197`).
- **Auto-watch on accept** (`blizzard_objectivetracker.lua:32-38`): with cvar `autoQuestWatch` on and fewer than
  `MAX_QUEST_WATCHES` (25, `blizzard_apidocumentationgenerated/questconstantsdocumentation.lua:157`) watched, a quest accepted
  is watched. It never expires.
- **Gamepad** (`blizzard_objectivetracker.lua:288-333`): a footer of prompts while the tracker has focus: Focus, Options (the
  right-click menu), Open Quest Map, Details, Untrack, Minimize module, Bind quest item; the collapse-all button hides on a pad
  (`:335-341`).

### 1.2 Bands (headers) and collapsing

| Part | Forever | File:line |
|---|---|---|
| Container band | 260 x 32; art `ui-questtracker-primary-objective-header` (300 x 40, atlas size) centered; “All Objectives” in `ObjectiveTrackerHeaderFont` (Friz 14, gold `NORMAL_FONT_COLOR`, shadow 1, -1), auto-scaling, one line, 208 wide at LEFT + 7 | `blizzard_objectivetrackercontainer.xml:18-61` |
| Collapse-all button | 18 x 19 at RIGHT - 1; `ui-questtrackerbutton-collapse-all` / `-pressed`, collapsed: `-expand-all` / `-pressed`; highlight **`ui-questtrackerbutton-red-highlight`** (ADD) | `.xml:4-9`, `.lua:266-277` |
| Filter button | 18 x 19 left of it, hidden | `.xml:11-16`, `:49-56` |
| Module band | 260 x 26 (counted as 25); art `UI-QuestTracker-Secondary-Objective-Header` (300 x 30) centered; name 200 wide at LEFT + 7; small button 16 x 16 at RIGHT + 1, `ui-questtrackerbutton-secondary-collapse` / `-expand` (+ `-pressed`), highlight `ui-questtrackerbutton-yellow-highlight` | `blizzard_objectivetrackermodule.xml:4-76`, `.lua:790-801` |
| Collapse sound | both buttons play `IG_MAINMENU_OPTION_CHECKBOX_ON` (856) | container `.lua:259-264`, module `.lua:783-788` |
| Collapse state | not saved: every session starts expanded (`isCollapsed` is a plain field) | container `.lua:9`, module `.lua:30` |
| Container collapsed | the band stays, every module hides | container `.lua:195-201`, module `.lua:206-215` |
| Module collapsed | its band alone (25); the module still “fits” only if a block could have fit, so a collapsed band can’t be pushed out by itself (see the comment) | module `.lua:395-404` |
| Edit Mode | entering it expands a collapsed tracker for the session, leaving collapses it again; the selection box reaches 30 left of the column | `editmodesystemtemplates.lua:2279-2310` |

### 1.3 Blocks, lines and states

- **Block** (`blizzard_objectivetrackerblock.xml:4-33`): a `HeaderText` in the line font at TOPLEFT to RIGHT, and a
  `HeaderButton` over the title alone (left and right clicks, enter and leave, `:382-399`). Placed `blockOffsetX` 20 in, the first
  10 under the band, the next 10 under the previous (`blizzard_objectivetrackermodule.lua:16-21`, `:422-449`).
- **Fit rule** (`blizzard_objectivetrackermodule.lua:385-389`): a block goes in only if contents so far + its height + 10 fit;
  the first one that doesn’t truncates the module (state `ShownPartially`; with no block at all, `NotShown`, band hidden too,
  `:142-162`).
- **Text** (`blizzard_objectivetrackerblock.lua:134-153`): titles and recipe lines cap at 2 lines, quest objective lines are
  unlimited (`useFullHeight`, `blizzard_questobjectivetracker.lua:295`). The block height is the title plus, per line, 4 + its
  height (`:155-209`).
- **Line** (`blizzard_objectivetrackershared.xml:217-238`): a `Dash` (“- ”, `QUEST_DASH`) at TOPLEFT (0, 1) and the `Text` from
  the dash’s right to the line’s right. Hyperlinks in a line are clickable (`OnHyperlinkClick`, `blizzard_objectivetrackershared.lua:311-313`).
- **Dash styles** (`blizzard_objectivetrackerblock.lua:166-186`): SHOW; **HIDE: the dash is hidden but keeps its text, so the
  line’s text stays indented by the dash’s width**; HIDE_AND_COLLAPSE: no text, the line’s text starts at the left. The tracker
  uses HIDE for done objectives, “Ready for turn-in”, completion text, “Failed” and enough reagents. The user’s shots agree:
  “Ready for turn-in” and “Speak with Nessa Shadowsong.” start where “0/1 Ursal the Mauler slain” starts, not at its dash.
- **Colors** and their hover twins (`blizzard_objectivetrackershared.lua:1-19`): see research 1, section 1. Hover is per block,
  over the title only; entering recolors the title and each line to its twin, the dashes to white (`blizzard_objectivetrackerblock.lua:300-331`).
  Blocks without a quest ID (recipes) return early: no hover change.
- **States of a quest** (`blizzard_questobjectivetracker.lua:291-374`):
  - in progress: each objective a dashed line, Normal 0.8; done ones dash hidden, Complete 0.6, the check;
  - complete: the objectives play “completing” then fade (below), then one line: the completion text (Normal, no dash), or
    “Ready for turn-in” (Complete, no dash) when it has none;
  - failed: one line “Failed”, Failed color, no dash;
  - money needed: a “have / need” money line while short (`:360-363`);
  - timer bar: none in Forever, Camelot turns them off (`camelot/blizzard_questobjectivetrackeroverride.lua:1-3`);
  - waypoint lines and auto-complete lines: retail-only data.
- **Right-edge frames** (`blizzard_objectivetrackerblock.lua:347-373`): the quest item button (26 x 26 at the block’s TOPRIGHT,
  spacing 2) and the find-group button (30 x 30, offset 5, 2) shrink the title and lines (`blizzard_questobjectivetracker.lua:6-17`, `:302-307`).

### 1.4 Quest item button (not doable on 1.14.2, listed for completeness)

`QuestObjectiveItemButtonTemplate` (`blizzard_objectivetrackershared.xml:4-63`, `.lua:29-151`): 26 x 26, the item icon, its
count, a cooldown, a frame `UI-QuestTrackerButton-QuestItem-Frame` 42 x 42, a range dot (red out of range, 0.6 grey in range,
checked every `TOOLTIP_UPDATE_TIME`), a glow that bounces 6 times when entering the quest’s area; click uses the item,
chat-link click links it; tooltip `SetQuestLogSpecialItem`. All of it rests on `GetQuestLogSpecialItemInfo` and friends.

### 1.5 POI button beside each quest

- Placed at the title’s TOPLEFT, its TOPRIGHT at (-7, 5) (`blizzard_objectivetrackerquestpoiblock.lua:19-31`), only when cvar
  `questPOI` is on (`blizzard_objectivetrackermanager.lua:142-176`).
- 20 x 20 button (`blizzard_poibutton/poibutton.xml:22`); ring `UI-QuestPoi-QuestNumber`, pressed `UI-QuestPoi-QuestNumber-Pressed`,
  focused `UI-QuestPoi-QuestNumber-SuperTracked` (and `-Pressed-SuperTracked`); highlight `UI-QuestPoi-InnerGlow`; glow
  `UI-QuestPoi-OuterGlow` shown while focused (`poibutton.lua:75-93`, `:561`). Inside: in progress `Quest-In-Progress-Icon-yellow`,
  focused `Quest-In-Progress-Icon-Brown` (`:690-697`); complete `UI-QuestIcon-TurnIn-Normal` (`:233-238`, `:326-330`). The
  icon shifts (1, -1) while pressed (`:28-45`, `:423-433`).
- Click (`poibutton.lua:444-479`): left only. On the focused quest: remove focus, `IG_MAINMENU_OPTION_CHECKBOX_OFF` (857).
  Otherwise `IG_MAINMENU_OPTION_CHECKBOX_ON` (856); chat link if the edit box is open; shift-click on a watched quest untracks;
  an unwatched quest gets watched; then it becomes the focused (super-tracked) quest and the map pings it.
- Add animation (`blizzard_objectivetrackerquestpoiblock.xml:7-12`): scale 1 to 1.2 in 0.15 s and back in 0.15 s, alpha 0 to 1
  in 0.15 s, played with the block’s add animation.

### 1.6 Clicks, menu and tooltip on a quest

From `blizzard_questobjectivetracker.lua:51-158`:

| Input | Forever |
|---|---|
| Chat-link click (shift with the chat box open) | inserts the quest link, before anything else |
| Shift-click (`QUESTWATCHTOGGLE`) | untrack |
| Left-click | opens the map’s quest log at the quest’s details (`QuestMapFrame_OpenToQuestDetails`) |
| Right-click | a menu on the tracker: the quest’s name as title; “Focus” / “Remove Focus”; “Open Quest Details” / “Close Quest Details”; “Open Quest Map”; “Untrack”; “Share Quest” (pushable and in a group); “Abandon” |
| Hover, in a group | the tooltip at the block’s TOPLEFT (its TOPRIGHT there) with the party’s progress (`SetQuestPartyProgress`); alone: nothing |

No sound on a title click. Achievements, adventure and the other modules follow the same click pattern; some play 856 when
their menu opens (`blizzard_initiativetasksobjectivetracker.lua:44`, `blizzard_adventureobjectivetracker.lua:67`).

### 1.7 Animations and sounds

All animation groups are XML; timings in seconds.

| Moment | What moves | File:line |
|---|---|---|
| A module first shows (it wasn’t displayed in the last layout) | band art alpha 0 to 1 (0.5); button alpha 0 to 1 (1.0); `UI-QuestTracker-OBJFX-BarGlow` at CENTER (-120, 1): in 0.2, out 0.6 after 0.2; `UI-QuestTracker-OBJFX-Shine` (scale 0.95) at CENTER (-150, 1): slides 200 right in 0.7 (IN_OUT) after 0.2 while fading in and out | `blizzard_objectivetrackermodule.xml:38-71`, `.lua:206-212` |
| A quest newly watched (`QUEST_WATCH_LIST_CHANGED` added, no block yet) or a recipe newly tracked | header glow `ui-questtracker-objfx-barglow` 240 wide, from the title’s TOPLEFT (y + 3) to BOTTOMLEFT (y - 4): grows from the left 0 to 1 in 0.31 after 0.15, fades in 0.41 after 0.33; the title fades in (0.03); each line fades in (0.5); the POI pops (1.5) | `blizzard_objectivetrackeranimtemplates.xml:55-75`, `.lua:97-150`, `blizzard_questobjectivetracker.lua:31-39` |
| An objective done | check `ui-questtracker-tracker-check` 16 x 16 at TOPLEFT (-10, 2): alpha 0 to 1 (0.16), scale 1 to 1.2 (0.15, OUT) and back (0.15); `ui-questtracker-tracker-check-glow` 16 x 16 flashes the same way; a bar glow `ui-questtracker-objfx-barglow` 180 wide from the text’s left (-2), the line’s height + 4: grows 0 to 1 from the left in 0.66 (OUT) after 0.1, fades in 0.58 after 0.33; then state Completed and a relayout | `blizzard_objectivetrackeranimtemplates.xml:3-45`, `.lua:42-70`, `blizzard_questobjectivetracker.lua:230-238` |
| A quest complete | its done lines fade (alpha to 0 in 0.1 after 1.0) and leave; then the completion line | `.xml:46-48`, `blizzard_questobjectivetracker.lua:219-228`, `:281-287` |
| A quest turned in (`QUEST_TURNED_IN`) | the header glow grows across (0.51), the whole block fades out in 0.33 after 0.33; the block is held in place (“cached”) until it ends, then removed | `.xml:76-82`, `.lua:152-160`, module `.lua:661-753` |
| An objective added to a sequenced quest | glow, `UI_QUEST_ROLLING_FORWARD_01` | `blizzard_questobjectivetracker.lua:251-254` (retail data) |
| Bonus objectives removed | fade in 0.5 after 3.5 | `.xml:83-85` (no 1.14.2 data) |

Sounds by SOUNDKIT name: `IG_MAINMENU_OPTION_CHECKBOX_ON` (856: collapse buttons, POI click, some menus),
`IG_MAINMENU_OPTION_CHECKBOX_OFF` (857: removing focus), `UI_PROFESSION_TRACK_RECIPE_CHECKBOX` (206497: the Track Recipe
checkbox), `UI_AUTO_QUEST_COMPLETE` (23404: auto quest popup), `UI_QUEST_ROLLING_FORWARD_01` (43936),
`UI_BONUS_EVENT_SYSTEM_VIGNETTES` (45142: rewards toast). IDs from `blizzard_sharedxml/mainline/soundkitconstants.lua:48, 108,
150, 188, 564`. 1.14.2’s SOUNDKIT (`4216289:48-49, 126, 175, 213`) has all of them except 206497 (whether every file is in the
Classic data is a guess).

### 1.8 Retail-only parts

Auto quest popups (`blizzard_autoquestpopuptracker.lua`, 236 x 68 blocks that slide in over 0.4 s), progress bars (192 x 25,
`blizzard_objectivetrackershared.xml:240-290`), timer bars (192 x 20, `:292-349`; Camelot off for quests), the rewards toast
(`:145-215`), campaign, achievements, scenario, bonus and world quests, find group. None has 1.14.2 data: vanilla has no
auto-complete quests (`GetNumAutoQuestPopUps` isn’t in 1.14.2’s code), no scenarios, no achievements.

### 1.9 Settings

Edit Mode Height 400-1000 (800), shown only when moved off the default spot; Opacity 0-100 % (0) on a nine-slice
(`UniqueCornersLayout` with kit `common-opacity-background`: atlases `common-opacity-background-NineSlice-CornerTopLeft` and the
rest, `nineslicelayouts.lua:399-410`), reaching 30 left and 5 right of the column (`blizzard_objectivetrackercontainer.xml:71-80`);
Text Size 12-20 (lines n, bands n + 2, `blizzard_objectivetrackermanager.lua:93-107`). Fonts:
`blizzard_objectivetrackerfonts.xml:202-218`.

### 1.10 The recipe tracker (`blizzard_professionsrecipetracker.lua`)

- Module “Profession” (`PROFESSIONS_TRACKER_HEADER_PROFESSION`), blocks `ObjectiveTrackerAnimBlockTemplate`, lines
  `ObjectiveTrackerAnimLineTemplate` (`:9-14`). Events `CURRENCY_DISPLAY_UPDATE`, `TRACKED_RECIPE_UPDATE` (added: the add
  glow), `BAG_UPDATE_DELAYED` (`:20-32`).
- Recrafts first, then recipes, in `GetRecipesTracked` order (`:94-96`, `:119-126`); items not cached are loaded first (`:77-117`).
- A block (`:128-201`): the recipe’s name (“Recrafting: %s” for recrafts); one line per required reagent slot, modifying slots
  first; text “have/need Name” (`PROFESSIONS_TRACKER_REAGENT_FORMAT` “%s %s” with `..._COUNT_FORMAT` “%s/%d”), have not capped;
  short: dash shown, Normal 0.8, no check; enough: dash HIDE (indent kept), Complete 0.6, the check. No check animation, no
  completion sound. Reagent lines wrap to 2 lines at most.
- Clicks (`:34-75`): chat-link click inserts the recipe link; shift-click (`RECIPEWATCHTOGGLE`) untracks; left-click opens the
  profession window at the recipe (`C_TradeSkillUI.OpenRecipe`) or inspects it when the profession isn’t learned; right-click a
  menu: “View Recipe” (spell known), “Untrack” (Forever’s “View Recipe” passes an undefined variable, `:66`, so it probably does
  nothing).
- Tracking it: the recipe card’s “Track Recipe” checkbox (`CheckboxWithLabelTemplate` at 26 x 26, `blizzard_professionsrecipeschematicform.xml:55-57`;
  art `checkbox-minimal`, `checkmark-minimal`, `checkmark-minimal-disabled`, label `GameFontNormalSmall` 3 right of the box, in
  `LIGHTGRAY_FONT_COLOR` 0.6, `checkbuttontemplates.xml:66-89`); click plays `UI_PROFESSION_TRACK_RECIPE_CHECKBOX`
  (`blizzard_professionsrecipeschematicform.lua:125-133`); shown only with a mouse and keyboard, for recipes with reagents
  (`:519-520`); follows `TRACKED_RECIPE_UPDATE` (`:220-225`). Camelot moves it to the card’s BOTTOMLEFT (17, 11)
  (`blizzard_professions/camelot/blizzard_professionscrafting.lua:20-21`). Shift-click on a recipe row toggles it too
  (`blizzard_professionstemplates/blizzard_professionsrecipelist.lua:50-58`). The recipe list’s right-click menu has only
  Favorite (`:62-79`).
- In the shots: the recipe name in the dim gold header color, the reagents dashed, light grey, count first.

## 2. Gap table

“Ours” cites `SkinTracker.lua` unless named. Priority: P1 do next (cheap and visible, or a bug), P2 the bigger pieces, P3 later
or optional, “no” not doable.

| Feature | Forever | Ours today | Doable on 1.14.2? | Priority |
|---|---|---|---|---|
| **Accepted quest stays watched** | auto-watch never expires | `QUEST_ACCEPTED` calls `AddQuestWatch` directly (399-406). 1.14.2’s `AutoQuestWatch_Update` (QuestLog.lua `4216219:802-815`, run on `QUEST_WATCH_UPDATE` with `autoQuestWatch` on) finds the quest missing from `QUEST_WATCH_LIST`, inserts it with a 300 s timer, and `AutoQuestWatch_OnUpdate` (`:817-830`, QuestWatchFrame’s OnUpdate) removes the watch 5 minutes after its first objective moves. **Likely bug** (a `/reload` hides it: `QuestWatch_OnLogin` re-inserts every watch without expiry) | yes: call `AutoQuestWatch_Insert(index, QUEST_WATCH_NO_EXPIRE)` as the quest log’s shift-click does (`:543`); to match Forever fully, also keep 1.14.2’s own auto-watches from expiring (set their timer to `QUEST_WATCH_NO_EXPIRE` after `AutoQuestWatch_Update`, a hook; guess: no taint issue, the list is only read by insecure FrameXML) | **P1** |
| Dashless lines keep the indent | HIDE keeps the dash’s width | text moved to the line’s left for done, completion and failed lines (208) | yes: keep `LEFT` on the dash, just hide it | **P1** |
| Collapse-all highlight | red highlight | yellow (360) | yes, atlas shipped | P1 |
| Collapse sounds | 856 on both buttons | silent (374-383) | yes, `PlaySound(856)` | P1 |
| Chat-link click on a title | quest link first | shift-click always untracks (154-158) | yes: with the chat box open, insert `GetQuestLink(index)` if 1.14.2 has it (verify in game), else the title text as 1.14.2’s quest log does (`4216219:509-515`) | P1 |
| Right-click menu | title, Focus, Open Quest Details, Open Quest Map, Untrack, Share Quest, Abandon | “Open in the quest log”, “Untrack”, “Text Size” (321-345) | yes: `SelectQuestLogEntry` + `QuestLogPushQuest` with `GetQuestLogPushable()` and a group; Abandon through `SetAbandonQuest` and the game’s `ABANDON_QUEST` popup; Open Quest Map: the world map with our docked log (SkinQuestLog / SkinMap); keep Text Size (the user’s choice, session 48). Focus: see POI row | P1 |
| Layout by modules | modules, fit rule (+10), truncation by whole blocks then whole modules, later modules skipped | one module; the first block always shown, the rest cut at Edit Mode’s Height (270-288) | yes, pure layout | **P2** (needed for recipes) |
| Height in the default spot | the screen’s remaining height; Height setting only when moved | always the Height setting (271) | yes: `QuestWatchFrame`’s top to the screen’s bottom when EditUI says default spot | P2 |
| Show when anything is tracked | container hides only when no module shows | hides when no quest is watched (258-262) | yes | P2 (with recipes) |
| **Profession module (Track Recipe)** | full module | none (`refont` already names `container.profession`, 304) | yes, with saved data (section 3) | **P2** |
| Track Recipe checkbox and shift-click on a row | card BOTTOMLEFT (17, 11); row shift-click | none (`Professions.lua` header, line 21: “recipe tracking (vanilla has none)”) | yes | P2 |
| Add animations | band glow and shine; block header glow, lines fade in, POI pop | none | yes (OnUpdate timers as `SkinTalents.lua`’s `makeFlash` / `playFlash`, ~800-830; the stub has no AnimationGroup) | P2 |
| Objective done animation | check pop, check glow, bar glow | the check just appears (204) | yes; needs the previous state per line (by quest ID and objective index) | P2 |
| Quest complete transition | done lines fade, then the completion line | jumps to the completion line (221-226) | yes | P3 |
| Turn-in animation | glow across, block fades in place | the block vanishes | yes: `QUEST_TURNED_IN` (questID) is in 1.14.2 (`1861098`); keep the block by quest ID (`GetQuestIDFromLogIndex`, used by 1.14.2’s own code) and draw it 0.66 s more | P3 |
| Party tooltip on hover | in a group, who’s on the quest | none | yes: `IsUnitOnQuest(index, "partyN")`, `GetNumSubgroupMembers`, strings `PARTY_QUEST_STATUS_ON` / `_NONE` (1.14.2’s own tooltip, `4216219:559-584`); anchored TOPRIGHT to the block’s TOPLEFT | P3 |
| POI button | a button: hover glow, pressed, focus (super track) with its own ring, brown dots and outer glow; 856 / 857 | a plain frame (135-142) | partly: hover, pressed and our own “focus” state (one quest, saved per character), sounds. A map pin for the focused quest needs quest coordinates: none in 1.14.2 (only Questie’s database, if loaded: guess) | P3 |
| Opacity backing | nine-slice `common-opacity-background`, 30 left, 5 right | flat black from BAND_X (-11) to the right edge (354-357, 293-296) | yes, after adding the 9 atlases to `tools/asset-extract/forever_addon_art.py` (run the repo’s copy) | P3 |
| Text Size in Edit Mode | Edit Mode slider | right-click menu (42-47, 312-318) | yes; optional second home in EditUI’s tracker settings (152-158) | P3 |
| Title “[level]” and difficulty color | only with cvars `showQuestLevel`, `showQuestDifficultyColor` | always (188-191) | yes, both are 1.14.2-side choices; the shots show both on | P3 (ask) |
| Sorting | `SortQuestWatches` on zone change (C-side) | 1.14.2’s watch order | partly: quests under the current zone’s log header first (guess at Forever’s intent; no distances on 1.14.2) | P3 |
| More than 5 quests | 25 | 5 (`MAX_WATCHABLE_QUESTS`, `4216187:747`; whether the C side also caps at 5: verify in game) | only with our own watch list (quest IDs saved by us, the game’s list left alone): a design choice, **ask the user** | P3 |
| Collapse state saved | no | yes (370-383) | keep ours (deliberate) | none |
| Edit Mode expands a collapsed tracker | yes | unknown | yes, from EditUI’s enter and exit | P3 |
| Money line | “have / need” money | none | guess: `GetQuestLogRequiredMoney` reads the selected entry, so it would need `SelectQuestLogEntry` and back; few vanilla quests | P3 |
| Gamepad prompts | footer of actions | none (Gamepad.lua is ours) | yes, later | P3 |
| Quest item button | yes | none | **no**: no `GetQuestLogSpecialItemInfo` / `UseQuestLogSpecialItem` in 1.14.2. A secure `type = "item"` button exists (`804793:392-400`) but no API says which item belongs to a quest | no |
| Timer bars | off in Camelot | none; `QuestTimerFrame` skinned (`SkinCastBar.lua` 155-254) | matches Forever | none |
| Auto quest popups, progress bars, waypoint lines, find group, campaign and other modules | yes | none | no data on 1.14.2 | no |

Stub (`addons/tests/stub/`) lacks, for these steps: `AutoQuestWatch_Insert` and `QUEST_WATCH_LIST`, `GetQuestIDFromLogIndex`,
`QUEST_WATCH_LIST_CHANGED` / `QUEST_TURNED_IN` payloads, `IsUnitOnQuest`, `GetNumSubgroupMembers`, `GetCraftReagentItemLink`,
per-item `GetItemInfo` names (now one fixed answer, `03-state.lua:136`), `BAG_UPDATE_DELAYED`, and the restricted
environment’s `PlayerInCombat()` if the secure snippet uses it. It has `GetItemCount` (`05-tradeskill-api.lua:38`), reagent
links with item IDs (`:33-36`), recipe links “enchant:<id>” (`15-stats.lua:124-125`), `InCombatLockdown` (`02-ui-globals.lua:46`),
`PlaySound` recording (`:33`).

## 3. Track Recipe on 1.14.2, in detail

### 3.1 What 1.14.2 offers

- Trade skills (every profession but Enchanting; also Poisons): `GetNumTradeSkills`, `GetTradeSkillInfo(i)`,
  `GetTradeSkillNumReagents(i)`, `GetTradeSkillReagentInfo(i, r)` -> name, icon, need, have (bags), `GetTradeSkillReagentItemLink(i, r)`,
  `GetTradeSkillItemLink(i)`, `GetTradeSkillRecipeLink(i)` (“enchant:<spellID>”), `GetTradeSkillLine()`, `ExpandTradeSkillSubClass`,
  `SelectTradeSkill`, `TradeSkillFrame_SetSelection`; events `TRADE_SKILL_SHOW`, `TRADE_SKILL_UPDATE`, `TRADE_SKILL_CLOSE`
  (`1861019`; the UI uses them, `804052`).
- Crafts (Enchanting, and Beast Training, which has no reagents): `GetNumCrafts`, `GetCraftInfo`, `GetCraftNumReagents`,
  `GetCraftReagentInfo`, `GetCraftReagentItemLink`, `GetCraftRecipeLink`, `GetCraftDisplaySkillLine`, `SelectCraft`,
  `CraftFrame_SetSelection`; events `CRAFT_SHOW`, `CRAFT_UPDATE`, `CRAFT_CLOSE` (`2617065`, `4216337`).
- Our wrapper already hides the two: `Professions.lua` 243-330 (`API.trade` / `API.craft`: `reagent`, `reagentLink`,
  `recipeLink`, `select`, `expand`, `line`), the profession table with the spell that opens each window (`PROFS[...].window`,
  `Professions.lua` 57-), `profOf` (~234), `spellBookIndex()` (1814-1826), and secure side tabs that cast a profession
  (`type1 = "spell"`, `spell1 = spellID`, 2227-2228, wrapped by `SecureHandlerWrapScript`, 2339-2348).
- Not there: `C_TradeSkillUI` (no recipe IDs, no tracked list, no `OpenRecipe`), and the trade skill data exists only while that
  profession’s window is open. Casting is protected: opening a profession from the tracker needs a hardware click on a secure
  button. 1.14.2’s SecureTemplates supports custom action types: `type1 = "foo"` calls the function in attribute `_foo`
  (`804793:603-625`), so one secure button can cast on a click and run insecure code on shift-click or right-click.

### 3.2 Data, saved when tracking (the window is open then)

Per character, for example `ForeverUIDB.trackedRecipes[<name-realm>]` (or under `ns.db.tracker`, which already holds the
tracker’s state), an ordered list:

```
{ key = spellID (from the recipe link) or "Profession:Name" when no link,
  name = "Embossed Leather Boots", api = "trade" | "craft", prof = "Leatherworking" (the skill line),
  window = "Leatherworking" (PROFS[prof].window: the spell to cast; Mining -> "Smelting"),
  link = the recipe link string (for the chat link later), made = item ID or nil,
  reagents = { { id = itemID, name = "Light Leather", icon = ..., need = 8 }, ... } }
```

- Item IDs from the reagent links (`item:(%d+)`); names kept as a fallback when `GetItemInfo(id)` is still nil.
- While a profession’s window is open, `TRADE_SKILL_UPDATE` / `CRAFT_UPDATE` refresh the saved reagents of its tracked recipes
  (a recipe’s reagents never change in vanilla, but a first capture can miss names).
- `SKILL_LINES_CHANGED`: a profession unlearned drops its recipes (Professions.lua already watches it, ~2374).
- No cap (Forever has none); the blocks truncate like quests. Tracked recipes stay until untracked (Forever doesn’t untrack on
  craft either).

### 3.3 Counting and refreshing

- have = `GetItemCount(id)`: bags only, what 1.14.2 crafts from and what `GetTradeSkillReagentInfo`’s “have” means, so the line
  matches the window. Not capped (“5/2”). The bank and the mailbox (`Stock.lua`) can go in a line tooltip, never in the count.
- Refresh on `BAG_UPDATE_DELAYED` (one per batch), `GET_ITEM_INFO_RECEIVED` (names not cached yet), and on track or untrack.
  No re-read of the window is needed.

### 3.4 Visual numbers (ours, in the tracker’s current units)

- **Band**: as the Quests band: 271 x 26, art `UI-QuestTracker-Secondary-Objective-Header` 300 x 30 at LEFT - 11, “Profession”
  (`ns.L("PROFESSIONS_TRACKER_HEADER_PROFESSION", "Profession")`) Friz 14 gold at LEFT + 7, the small collapse button 16 x 16 at
  RIGHT + 1 with the yellow highlight and 856 on click; collapse state kept like `questsCollapsed`. It sits 10 under the last
  quest block (`moduleSpacing`), or 10 under the Quests band when that one is collapsed (a collapsed module is its band, 25).
  First time it shows: the band’s add animation (1.7).
- **Block**: 20 in, the first 10 under the band, 10 apart; the recipe’s name only (no level, no POI), line font (12 or Text Size),
  `COLOR.header` #bf9c00, max 2 lines; no hover recolor (as Forever: recipe blocks have no quest ID). Newly tracked: the block’s
  header glow, lines fading in.
- **Lines**, 4 apart: “have/need Name” (`string.format("%s %s", string.format("%s/%d", have, need), name)`), max 2 lines.
  Short: dash “- ” shown, `COLOR.normal` 0.8. Enough: dash hidden with its width kept, `COLOR.complete` 0.6, the check
  `ui-questtracker-tracker-check` 16 x 16 at the line’s TOPLEFT (-10, 2). No animation when a reagent becomes enough.
- **Checkbox on the card**: 26 x 26 at the card’s BOTTOMLEFT (17, 11), art `checkbox-minimal` (normal, pushed, highlight ADD),
  `checkmark-minimal` (checked), `checkmark-minimal-disabled`, all shipped (`SkinGameMenu.lua` uses them); label “Track Recipe”
  (`ns.L("PROFESSIONS_TRACK_RECIPE", "Track Recipe")`), GameFontNormalSmall in 0.6 grey, 3 right of the box. Shown only for recipes
  with reagents, not for Beast Training. Our card (`Professions.lua` 1031-, 400 x 484) has a scroll frame over the whole card:
  the box needs a frame level above it, and the scroll content should end about 40 above the card’s bottom so the last reagent
  row isn’t under it (guess at the overlap: check in the preview). Sound: `UI_PROFESSION_TRACK_RECIPE_CHECKBOX` is not in 1.14.2:
  extract it from Forever as `docs/specs/toast-sounds.md` describes and play it with `ns.PlayForeverSound`; until then 856.
- **Shift-click on a recipe row** (`Professions.lua` 679-694): toggles tracking, after the chat-link check, as Forever’s list.

### 3.5 Clicks on a recipe block

| Input | Behaviour on 1.14.2 |
|---|---|
| Left-click | open the profession at the recipe (below) |
| Shift-click | untrack (custom type: `shift-type1 = "fuiuntrack"`, `_fuiuntrack` a function) |
| Shift-click with the chat box open | insert the saved recipe link (guess: a stored link string inserts fine) |
| Right-click | a menu: the recipe’s name as title, “View Recipe”, “Untrack” (custom type on button 2) |

Opening at the recipe:

1. A secure button (`SecureActionButtonTemplate`) over each recipe title, `type1 = "spell"`, `spell1 = <the window spell’s ID from
   spellBookIndex()>`. Out of combat only: create, attribute, anchor, show and hide on layout; in combat leave them as they are
   and re-place on `PLAYER_REGEN_ENABLED` (and do last-moment placing on `PLAYER_REGEN_DISABLED`, which fires before lockdown).
2. Combat guard: wrap OnClick with `SecureHandlerWrapScript` and return false when `PlayerInCombat()`, so a stale button over a
   moved block can’t cast; an insecure `OnMouseUp` hook can then say in chat why nothing opened. Whether a protected button
   anchored to our insecure block follows it when the block moves in combat: verify in game; parent the buttons to a holder of
   their own, not to the block, so hiding a block in combat stays legal.
3. Before the cast (insecure `PreClick`, out of combat): remember the recipe as pending. If that profession’s window is already
   open, clear `type1` for this click (casting again probably closes it: guess, verify) and select the recipe straight away.
4. On `TRADE_SKILL_SHOW` / `CRAFT_SHOW` (or the first `_UPDATE` after it): clear the game’s filters (`SetTradeSkillSubClassFilter(0, 1, 1)`,
   `SetTradeSkillInvSlotFilter(0, 1, 1)`) and our search and Filter (`ns.CraftFilter`, the list’s search box `l.search`, ~799),
   expand all headers (`ExpandTradeSkillSubClass(0)` expands all: verify), find the row whose recipe link’s spell ID equals the
   key (fallback: the name), `API[kind].select(i)`, then scroll the list to it (`l.offset`, ~808). Clear the pending recipe.
5. Beast Training is never tracked (no reagents), so Craft’s protected `DoCraft` is not involved.

### 3.6 Events used

`BAG_UPDATE_DELAYED`, `GET_ITEM_INFO_RECEIVED`, `TRADE_SKILL_SHOW`, `TRADE_SKILL_UPDATE`, `CRAFT_SHOW`, `CRAFT_UPDATE`,
`SKILL_LINES_CHANGED`, `PLAYER_REGEN_DISABLED`, `PLAYER_REGEN_ENABLED`; our own `ns.SetRecipeTracked(key, on)` stands in for
`TRACKED_RECIPE_UPDATE` (refresh, the add glow, the checkbox’s state).

## 4. Implementation plan

Each step: offline test first (`luajit addons/tests/foreverui_test.lua addons/ForeverUI`, exit code checked, extend
`foreverui/46-tracker.lua` or add a test file for recipes), new UI previewed in the browser page
(http://localhost:8777/ui-forever/minimap/) before the game, then install, `diff -rq`, TOC bump, and a look in game. Prefer
adding to `SkinTracker.lua` and `Professions.lua` over new Lua files (a new file needs a client restart). Strings through `ns.L`
and the style guide.

1. **Keep accepted quests watched.** `acceptWatch` (399-406) calls `AutoQuestWatch_Insert(index, QUEST_WATCH_NO_EXPIRE)`; stub
   `QUEST_WATCH_LIST`, `AutoQuestWatch_Insert` and the 300 s expiry. Test: accept, move an objective, advance time: still
   watched. In game: watch a new quest, kill one mob, wait 5 minutes.
2. **Indent and small fixes.** Dashless lines keep the dash’s width (208); the collapse-all highlight red (360); 856 on both
   collapse buttons. Tests: text x equal on a done line and an open one; `S.sounds` has 856.
3. **Clicks and menu.** Chat-link click first (link or title text); the menu as Forever’s: title, Open Quest Details, Open Quest
   Map, Untrack, Share Quest (pushable, in a group), Abandon (the game’s popup), Text Size. Test the item lists alone and in a
   group; in game, check `GetQuestLink` and Share.
4. **Modules in the layout.** Rework `refresh` (254-297) into modules with Forever’s fit rule (+10), truncation by blocks then
   modules, the default-spot height, “show if any module shows”. Behavior for quests unchanged. Tests: a tall list truncates at
   whole blocks; a module that can’t fit a block hides with its band.
5. **Recipe data.** `ns.SetRecipeTracked`, the saved list, capture from `API[kind]`, counts by `GetItemCount`, refresh events.
   Stub: `GetCraftReagentItemLink`, per-ID item names, `BAG_UPDATE_DELAYED`. Tests: track from the stub’s window, close it, change
   `S.itemCounts`, lines update.
6. **The Profession band and blocks** (preview first). Section 3.4’s numbers; collapse kept; truncated after quests. Tests:
   positions, colors, check, dash, “5/2” uncapped.
7. **Track Recipe on the card and the rows** (preview first). Checkbox at (17, 11), label, state follows tracking, shift-click on
   rows; hidden for Beast Training and recipes without reagents; the sound (856 until Forever’s is extracted). Tests on both APIs.
8. **Recipe clicks.** Secure buttons with the custom types, the combat guard, open-at-recipe flow (3.5). Tests: attributes,
   combat cancels, pending recipe selected on `TRADE_SKILL_SHOW`. In game: out of combat, in combat, window already open,
   Enchanting.
9. **Animations.** An OnUpdate helper (as `makeFlash`); band add (glow and shine), block add on `QUEST_WATCH_LIST_CHANGED`
   (verify it fires on 1.14.2) and on tracking a recipe, the POI pop, the objective check pop and bar glow (per-line memory of
   “finished”), then the complete transition and the turn-in fade on `QUEST_TURNED_IN`. Start below Forever’s intensity
   (ui-ux-guidelines.md: “When in doubt, half the alpha”). Tests: states and timers with the stub’s clock.
10. **Hover tooltip in a group**, then the **POI button** (hover glow, pressed, our own focus with its ring, brown dots, outer
    glow, 856 / 857).
11. **Opacity nine-slice** (atlases added to the art tool, run the repo’s copy), optionally Text Size in Edit Mode.
12. **Asked (2026-10-02, the user’s answers):** our own watch list, up to 25 quests (quest IDs per character, the game’s list
    left alone); the current zone’s quests first on a zone change, the rest in watch order; “[level]” and the difficulty color
    follow the game’s settings (`showQuestLevel`, `showQuestDifficultyColor`), as Forever.

Verify in game when the user is there (one `/run` each): `GetQuestLink` exists; `QUEST_WATCH_LIST_CHANGED` fires on watch and
unwatch; the C-side watch cap; casting an open profession’s spell closes it; `ExpandTradeSkillSubClass(0)` expands all; a protected
button anchored to an insecure frame follows it in combat.
