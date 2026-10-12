# The quest tracker: Forever's code, read for the next pass (research)

2026-10-01. Read-only research for four requests: track a profession recipe as Forever does, a tracker that sizes itself to
its content, settings (text size), and the right colour for every state. Sources (Forever's extracted code, private: described
here in our own words, numbers and names only): `(private files)` —
`blizzard_objectivetracker/` (all files; `camelot/blizzard_questobjectivetrackeroverride.lua` is Forever's only override there),
`blizzard_editmode/shared/editmodesettingdisplayinfo.lua` and `editmodesystemtemplates.lua`, `mainline/editmodepresetlayouts.lua`,
`blizzard_professionstemplates/`, `blizzard_professions/camelot/`, `blizzard_framexmlutil/` (`professionsutil.lua`, `itemutil.lua`,
`mainline/difficultyutil.lua`), `blizzard_framexmlbase/constants.lua`. The colour constants' values come from Forever's own
`globalcolor.db2` and the strings from its `globalstrings.db2` (`(private files)`, read with
`wdc3.py`). Ours: `addons/ForeverUI/SkinTracker.lua`, `Professions.lua`, `Stock.lua`, `EditUI.lua`.

## 1. Colours by state

The values (Forever's GlobalColor table):

| Constant | RGB (0-1) | Hex |
|---|---|---|
| `NORMAL_FONT_COLOR` | 1, 0.824, 0 | #ffd200 |
| `HIGHLIGHT_FONT_COLOR` | 1, 1, 1 | #ffffff |
| `OBJECTIVE_TRACKER_BLOCK_HEADER_COLOR` | 0.749, 0.612, 0 | #bf9c00 |
| `DIM_RED_FONT_COLOR` | 0.8, 0.098, 0.098 | #cc1919 |
| `RED_FONT_COLOR` | 1, 0.125, 0.125 | #ff2020 |
| `LIGHTGRAY_FONT_COLOR` | 0.6, 0.6, 0.6 | #999999 |

`OBJECTIVE_TRACKER_COLOR` (top of `blizzard_objectivetrackershared.lua`) builds the tracker's styles from them, each paired with
a `reverse` (its hover twin): Normal (0.8, 0.8, 0.8) <-> NormalHighlight (white); Failed (`DIM_RED`) <-> FailedHighlight (`RED`);
Header (`OBJECTIVE_TRACKER_BLOCK_HEADER_COLOR`) <-> HeaderHighlight (`NORMAL_FONT_COLOR`); TimeLeft (`DIM_RED`) <-> TimeLeftHighlight
(`RED`); Complete (0.6, 0.6, 0.6) has **no** reverse, so it never changes under the mouse.

| Text | Colour (hover) | Where it's set |
|---|---|---|
| Container band "All Objectives" (`TRACKER_ALL_OBJECTIVES`) | `NORMAL_FONT_COLOR` gold, no hover | `ObjectiveTrackerHeaderFont` (fonts.xml) on `ObjectiveTrackerContainerHeaderTemplate.Text` |
| Module bands "Quests" (`TRACKER_HEADER_QUESTS`), "Profession" (`PROFESSIONS_TRACKER_HEADER_PROFESSION`) | gold, no hover | same font on `ObjectiveTrackerModuleHeaderTemplate.Text` |
| Quest title, difficulty colour off | Header #bf9c00 (HeaderHighlight gold) | `ObjectiveTrackerBlockMixin:SetHeader` / `:UpdateHighlight` (block.lua) |
| Quest title, difficulty colour on (cvar `showQuestDifficultyColor`, the map's "Quest Difficulty Color" filter) | `QuestDifficultyColors` by relative difficulty: impossible (1, 0.1, 0.1), very difficult (1, 0.5, 0.25), difficult (1, 0.82, 0), standard (0.25, 0.75, 0.25), trivial (0.5, 0.5, 0.5); hover: see note a | `SetQuestTitleLevelAndDifficultyColor` (difficultyutil.lua) wraps the title in a colour code; `UpdateHighlight` |
| "[level] " prefix | part of the title | same function, when cvar `showQuestLevel` ("Show Quest Levels") is on |
| Objective in progress | Normal 0.8 grey (NormalHighlight white) | `QuestObjectiveTrackerMixin:DoQuestObjectives` -> `AddObjective` with no style -> `SetStringText` default |
| Objective dash "- " (`QUEST_DASH`) | see note b; white while hovered, 0.8 after | `UpdateHighlight` only |
| Objective completed | Complete 0.6 grey, dash hidden, check `ui-questtracker-tracker-check` 16 x 16 at the line's TOPLEFT (-10, 2); no hover change | `DoQuestObjectives` (`OBJECTIVE_DASH_STYLE_HIDE`, "Complete"), `ObjectiveTrackerAnimLineMixin:SetState` |
| Quest failed: one line "Failed" (`FAILED`) | Failed #cc1919 (FailedHighlight #ff2020) | `QuestObjectiveTrackerMixin:UpdateSingle`, failed branch, dash hidden |
| Complete quest with completion text ("Speak with ...") | Normal 0.8 (white), dash hidden | `UpdateSingle`, `GetQuestLogCompletionText` branch |
| "Ready for turn-in" (`QUEST_WATCH_QUEST_READY`, no completion text) | Complete 0.6, dash hidden, no hover change | `UpdateSingle` |
| Money "x / y" (quest needs gold) | Normal (white) | `UpdateSingle` |
| Timer bar label | white -> yellow -> red as time runs out (above 66% left white; to 33% blue fades; below, green fades) | `ObjectiveTrackerTimerBarMixin:GetTextColor` (shared.lua) — **Camelot turns timer bars off for quests** (`CanShowTimerBar` returns false) |
| "TimeLeft" line | TimeLeft #cc1919 (#ff2020) | only world quests; none in Forever's quest module |
| Recipe name (block header) | Header #bf9c00; in practice no hover change (note c) | `ProfessionsRecipeTrackerMixin:AddRecipe` -> `SetHeader` |
| Reagent, not enough | Normal 0.8, dash shown, no check | `AddRecipe` |
| Reagent, enough | Complete 0.6, dash hidden, check icon shown | `AddRecipe` |
| "Track Recipe" checkbox label (profession window) | `LIGHTGRAY_FONT_COLOR` 0.6 | `blizzard_professionsrecipeschematicform.lua` OnLoad |

Notes. (a) With the difficulty colour on, the title carries an inline colour code, which wins over `SetTextColor`; so the
`QuestDifficultyHighlightColors` (standard 0.43, 0.93, 0.43; difficult 1, 1, 0.1 ...) that `UpdateHighlight` sets have no
visible effect: the title most likely does not change under the mouse (an inference from the code; worth one Forever shot with
the pointer on a title). (b) The dash font string inherits `ObjectiveTrackerLineFont`, which has no colour, and `SetStringText`
colours only the text; so the dash starts in the font's default (white) and becomes 0.8 only after a hover and leave (quest
blocks only). Also an inference: check a shot. (c) `UpdateHighlight` returns at once when a block has no `poiQuestID`, which
recipe blocks never have; the header only picks up HeaderHighlight if a relayout happens while hovered.

Hover is per block, and only over the **title**: `HeaderButton` covers `HeaderText` alone (block.xml), and entering it recolours
the title and every line (each line to its `reverse`, the dashes to NormalHighlight).

Every state of a quest (Forever's content, not just colour): a quest that is **complete** shows only its title and one line
(completion text or "Ready for turn-in"); its objective lines go Completing (check + glow) -> Completed -> Fading -> gone, and
when the block is first drawn already complete no objective lines are added at all. A **failed** quest shows only "Failed".

### Our `COLOR` table (SkinTracker.lua lines 31-36) against Forever

| Ours | Forever | Verdict |
|---|---|---|
| `header` 0.75, 0.61, 0 | 0.749, 0.612, 0 | matches (used only when the difficulty colour is off; ours always uses `GetQuestDifficultyColor` when the quest has a level) |
| `headerHighlight` 1, 1, 1 | `NORMAL_FONT_COLOR` 1, 0.824, 0 (difficulty colour off); no visible change (on, note a) | **mismatch** |
| `band` 1, 0.82, 0 | 1, 0.824, 0 | matches |
| `normal` 0.8 / `normalHighlight` 1 | same | matches |
| `complete` 0.6 | 0.6 | matches |
| `failed` 0.6, 0.15, 0.15 | `DIM_RED_FONT_COLOR` 0.8, 0.098, 0.098; hover `RED_FONT_COLOR` 1, 0.125, 0.125 | **mismatch** (value, and no hover twin) |
| dash = same colour as its text | white until a hover (note b), white / 0.8 after | **probable mismatch** (verify) |
| hover over the whole block (`b.button:SetAllPoints()`) | title line only | **mismatch** (behaviour) |
| a complete quest: every objective (check, 0.6) + completion line | completion line only | **mismatch** (content) |
| a failed quest: objectives + "Failed" | "Failed" only | **mismatch** (content) |
| title: no line limit | `SetStringText` caps titles (and recipe reagent lines) at 2 lines; quest objective lines unlimited (`useFullHeight`) | minor mismatch |

## 2. Fonts and sizes (`blizzard_objectivetrackerfonts.xml`, `blizzard_objectivetrackermanager.lua`)

- `ObjectiveTrackerFont12` .. `ObjectiveTrackerFont22`: Friz Quadrata (`FRIZQT__.TTF`; `FRIZQT___CYR.TTF` for Russian), one family per
  size; Chinese fonts 3 px bigger.
- `ObjectiveTrackerLineFont` = Font12, left/top justified, shadow (1, -1) black, no colour: the lines, the dashes **and the block
  titles** (`ObjectiveTrackerBlockTemplate.HeaderText` inherits the line font, not the header font).
- `ObjectiveTrackerHeaderFont` = Font14, same shadow, `NORMAL_FONT_COLOR`: the container and module bands (an
  `AutoScalingFontString`, one line, min line height 12, 208 wide on the container band and 200 on module bands, at LEFT + 7).
- Text Size: `ObjectiveTrackerManager:SetTextSize(n)` accepts 12-20 and points the line font at Font`n` and the header font at
  Font`n+2` (14-22), then relays everything. Progress and timer bar labels use `GameFontHighlightMedium` (not scaled).

## 3. Sizing

- **Width**: container, bands and modules 260 (templates); blocks start 20 in (`blockOffsetX`) and reach the module's right
  edge (240 wide); right-edge buttons (quest item, find group) shrink the title and lines. The background (`NineSlice`,
  `common-opacity-background` kit) reaches 30 left and 5 right of the column.
- **Height** (`ObjectiveTrackerContainerMixin:UpdateHeight`): in the default (right-managed) position the frame runs from its
  top to the bottom of the screen (parent height + its y offset, at least 20) and the Height setting is hidden
  (`ShouldShowSetting`); moved in Edit Mode, the frame is the Height setting (800 default) or, if larger, the sum of the
  "must fit" modules.
- **Content taller than that** (`Update`, module `Update`, `CanFitBlock`): available height = frame height - top padding.
  Modules lay out in order; a block is added only if `contentsHeight + block height + 10` fits; the first block that doesn't
  marks the module "shown partially", and every later module gets 0 height and is skipped entirely (not drawn, header too). So
  it truncates by whole blocks, then whole modules; no scrolling, no shrinking. A module whose header fits but no block does is
  "not shown" (hidden).
- **Sizing to content**: the frame's own height is fixed, but the background's bottom is anchored to the last shown module's
  bottom - 10 (`bottomModulePadding`), and the module frames take their contents' height; with no modules shown the container
  hides (shown in Edit Mode). At the default Opacity 0 the background is invisible anyway.
- **Spacing** (module settings, `blizzard_objectivetrackermodule.lua`): container band 260 x 32; first module at
  `BASE_TOP_PADDING` 38 below the container top (a 6 px gap under the 32 px band; ours has 0: the Quests band sits right on the
  container band); module band 26 tall, counted as `headerHeight` 25; first block 10 below the band (`fromHeaderOffsetY`), blocks
  10 apart (`fromBlockOffsetY`), lines 4 apart (`lineSpacing`, also before the first line), `bottomSpacing` 0, modules 10 apart
  (`moduleSpacing`). Block height = title height + for each line (4 + line height). Collapsed module: band only (25).

## 4. Settings

Edit Mode (`editmodesettingdisplayinfo.lua`, defaults from `editmodepresetlayouts.lua` stored as slider steps: 40 -> 800, 0 -> 0,
0 -> 12):

| Setting | Range | Step | Default | Effect |
|---|---|---|---|---|
| Height | 400-1000 | 10 | 800 | only when moved off the default spot (`UpdateHeight`) |
| Opacity | 0-100 % | 1 | 0 | the background's alpha (`ObjectiveTrackerManager:SetOpacity`) |
| Text Size | 12-20 | 1 | 12 | lines + titles n, bands n+2 (`SetTextSize`) |

Default spot: TOPRIGHT of UIParent, -110, -275 (right-managed). Elsewhere: the bands' collapse buttons (all; per module), and
CVars `showQuestLevel`, `showQuestDifficultyColor` (Camelot puts both in the world map's filter menu:
`blizzard_worldmap/camelot/blizzard_worldmaptemplates.lua`), `autoQuestWatch`, `questPOI`. Ours (`EditUI.lua` "tracker"):
Height 400-1000 step 10 **default 1000** (Forever 800), Opacity 0-100 default 0 (a flat black texture, not Forever's nine-slice
art), **no Text Size**.

## 5. The recipe tracker (`blizzard_professionsrecipetracker.lua`)

- **Tracking it**: the profession window's recipe card has a "Track Recipe" checkbox (`PROFESSIONS_TRACK_RECIPE`,
  `CheckboxWithLabelTemplate` 26 x 26, label in `LIGHTGRAY_FONT_COLOR`); retail puts it top right, **Camelot moves it to the
  card's BOTTOMLEFT (17, 11)** (`blizzard_professions/camelot/blizzard_professionscrafting.lua`). Shown only for recipes with
  reagents that `Professions.CanTrackRecipe` allows (not salvage, gathering, dummy or recraft; not when viewing another
  player's list). Shift-click (the `RECIPEWATCHTOGGLE` modified click) on a recipe in the list toggles it too; the gamepad has
  "Track Recipe" / "Untrack" in the recipe's more-actions. The checkbox follows `TRACKED_RECIPE_UPDATE`.
- **Module**: band "Profession"; events `TRACKED_RECIPE_UPDATE` (a newly added recipe plays the block's add glow),
  `BAG_UPDATE_DELAYED`, `CURRENCY_DISPLAY_UPDATE`. Order (`ObjectiveTrackerManager:Init`): Scenario, widgets, Campaign, **Quests**,
  Adventure, Achievements, Traveler's Log, Endeavors, **Profession**, Bonus, World Quests — under the Quests (truncated with them).
- **A block**: the recipe's name as the header ("Recrafting: %s" for recraft blocks). Then one line per required reagent slot
  (slots that take a chosen "modifying" reagent first, then the basic ones): `PROFESSIONS_TRACKER_REAGENT_FORMAT` "%s %s" with
  `..._COUNT_FORMAT` "%s/%d", i.e. **count first: "1/2 Linen Cloth"**, have/need, have not capped (5/2 can show). Have =
  `ProfessionsUtil.AccumulateReagentsInPossession` -> `ItemUtil.GetCraftingReagentCount` -> `C_Item.GetItemCount` with bank,
  reagent bank and warband bank only when `ReagentsFromBankAllowed()` (a C function). Not enough: dash, Normal 0.8. Enough:
  no dash, Complete 0.6, the green check. A variable-quantity reagent shows "(min-max) Name" in Normal. Reagent lines wrap to 2
  lines at most. Items not yet cached are loaded first (`ContinuableContainer`), then the module relays.
- **Clicks on the name**: chat-link modifier with an open edit box -> the recipe's link; shift-click -> untrack; left-click ->
  `C_TradeSkillUI.OpenRecipe(id)` (the profession window opened at that recipe) or, profession not learned,
  `Professions.InspectRecipe`; right-click -> a menu: "View Recipe" (when the spell is known), "Untrack". (Forever's "View
  Recipe" closure passes an undefined `recipeID` — a typo for `recipeId` — so it likely does nothing.)
- **How many**: no cap in the Lua (`GetRecipesTracked` returns a list; any limit would be C-side).
- **Camelot differences**: only the checkbox's place. The module itself has no Camelot override.

## 6. What 1.14.2 can do, and a design for ours

What exists: `GetNumTradeSkills`, `GetTradeSkillInfo(i)`, `GetTradeSkillNumReagents(i)`, `GetTradeSkillReagentInfo(i, r)` ->
name, icon, need, have (bags), `GetTradeSkillReagentItemLink(i, r)`, `GetTradeSkillItemLink(i)`, `GetTradeSkillRecipeLink(i)`
("enchant:<spellID>", already parsed in `Professions.lua` ~1329); Enchanting through `GetCraftInfo`, `GetCraftNumReagents`,
`GetCraftReagentInfo`, `GetCraftReagentItemLink`, `GetCraftRecipeLink`; `GetItemCount(id[, includeBank])`; events `BAG_UPDATE`,
`BAG_UPDATE_DELAYED` (present in 1.14.2: its ContainerFrame code uses it), `TRADE_SKILL_SHOW/UPDATE/CLOSE`, `CRAFT_SHOW/UPDATE/CLOSE`,
`SKILL_LINES_CHANGED`, `GET_ITEM_INFO_RECEIVED`. What doesn't: `C_TradeSkillUI` (no recipe IDs, no tracking, no
`OpenRecipe`), and the trade skill data exists only while that profession's window is open. `CastSpellByName` is protected.

Design:
1. **Track**: a "Track Recipe" checkbox at the recipe card's bottom left (Camelot's 17, 11; label 0.6 grey) and shift-click on a
   recipe row (our list already takes clicks), on both APIs (trade and craft), hidden for recipes without reagents. On track,
   save everything the tracker needs, since the window closes: `ForeverUIDB.trackedRecipes[char] = { [spellID] = { name, prof,
   api = "trade"|"craft", item = madeItemID, order = n, reagents = { { id, name, icon, need }, ... } } }` (spellID from the recipe
   link; item IDs from the reagent links). While the window is open, `TRADE_SKILL_UPDATE` / `CRAFT_UPDATE` refresh the saved
   reagents of tracked recipes of that profession; `SKILL_LINES_CHANGED` drops a profession's recipes when it's unlearned.
   No cap needed (Forever has none); the blocks truncate like quests.
2. **Count**: `GetItemCount(id)` (bags: what 1.14.2 crafts from, and what `GetTradeSkillReagentInfo`'s "have" means), so a
   line's count matches the window. The bank and mailbox (`ns.Stock`) could go in a tooltip, not the count.
3. **Refresh**: `BAG_UPDATE_DELAYED` (one per bag change batch; `BAG_UPDATE` fires per bag), `GET_ITEM_INFO_RECEIVED` for names
   still unknown (`GetItemInfo` nil), and the track/untrack itself. Recipe lines are cheap: no need to re-read the window.
4. **Draw**: a "Profession" band after the quest blocks (moduleSpacing 10), same module constants; a block per recipe: name in
   #bf9c00, lines "have/need Name" via `ns.TrackerObjectiveText`'s count-first order, 0.8 with dash when short, 0.6 + check
   without dash when enough; collapse state kept like the Quests band.
5. **Open at the recipe**: opening a profession needs its spell cast, which addon code can't do: a `SecureActionButtonTemplate`
   (type "spell", the profession's spell, as `Professions.lua`'s side tabs ~2192 already do) over the recipe name, placed and
   shown only out of combat (re-anchored on `PLAYER_REGEN_ENABLED`; in combat the click does nothing or prints why); after
   `TRADE_SKILL_SHOW`/`CRAFT_SHOW`, find the row whose `GetTradeSkillRecipeLink` spell ID matches (expand all headers first:
   `ExpandTradeSkillSubClass(0)`) and select it through our window's `API[kind].select(i)`. Shift-click untracks (insecure,
   via `PostClick`/modifier check), right-click a small menu (View Recipe, Untrack).
6. **Sizing and settings**: keep the frame's height = Edit Mode Height (Forever's 800 default, not 1000) or the screen's
   remaining height in the default spot, truncate by whole blocks and then whole modules (the Profession band disappears when
   the quests already fill it, as in Forever), and size the backing to the last shown block + 10. Add Text Size (12-20,
   default 12; titles and lines n, bands n+2) to the tracker's Edit Mode panel, and make Opacity draw a nine-slice like
   Forever's rather than a flat black.
