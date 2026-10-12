# The quest tracker: Forever's objective tracker for 1.14.2

Started 2026-09-28 (the user; the P1 list's item 12). ForeverUI 0.100.0, skin part `tracker`, `SkinTracker.lua`. Sources: Forever's
own code (`(private files)`: the container, module, block, line
and anim templates and their Lua; the one Camelot override `camelot/blizzard_questobjectivetrackeroverride.lua`, which turns the
timer bars off), its atlas tables (Forever's own file 8268356 with the bands and buttons, 8268353 with two Camelot glow pieces,
retail's 959719 and 1113812), and 1.14.2's own FrameXML (QuestLogFrame.xml 4216412's `QuestWatchFrame`, QuestLog.lua 4216219's
`QuestWatch_Update`, UIParent.lua's placing).

## What Forever shows

Retail's objective tracker: a 260-wide column (`ObjectiveTrackerFrame`, a right-managed frame under the minimap) with the
container header (`ObjectiveTrackerContainerHeaderTemplate` 260 x 32: the `ui-questtracker-primary-objective-header` band 300 x 40
centred, "All Objectives" in `ObjectiveTrackerHeaderFont` (Friz Quadrata 14, gold, shadow 1, -1) at LEFT + 7, the collapse-all
button 18 x 19 at RIGHT - 1 with the yellow highlight, a filter button hidden), then the quest module's header
(`ObjectiveTrackerModuleHeaderTemplate` 260 x 26: the secondary band 300 x 30, "Quests", the small collapse 16 x 16 at RIGHT + 1),
then the blocks: `blockOffsetX` 20 from the left, the first `fromHeaderOffsetY` -10 under the header, `fromBlockOffsetY` -10 between
blocks, `lineSpacing` 4 between lines; a block's `HeaderText` (the quest's name) in `ObjectiveTrackerLineFont` (Friz 12, shadow)
coloured `OBJECTIVE_TRACKER_BLOCK_HEADER_COLOR` (0.75, 0.61, 0), `NORMAL_FONT_COLOR` under the mouse; each objective a line
(`ObjectiveTrackerLineTemplate`: the dash `QUEST_DASH` at TOPLEFT (0, 1), the text from its right to the block's right) in
(0.8, 0.8, 0.8), white under the mouse, (0.6, 0.6, 0.6) once complete with the check (`ui-questtracker-tracker-check` 16 x 16 at
TOPLEFT -10, 2 of the line) in place of the dash; a complete quest's line "Ready for turn-in"; a click on the block opens the
quest log at the quest. Beside each block retail draws a numbered POI button and a quest item button when the quest has one.

## What 1.14.2 has

`QuestWatchFrame`, 280 x 20 at TOPRIGHT of the cluster's BOTTOMRIGHT (placed again by `UIParent_ManageFramePositions`), filled by
`QuestWatch_Update` with up to 30 plain font strings (`QuestWatchLine1-30`, GameFontHighlight, anchored under each other; the
names in (0.75, 0.61, 0) or gold when every objective is met, the objectives as " - text" in (0.8, 0.8, 0.8) or white when
finished; a quest with no objectives left out). The watch list: `GetNumQuestWatches`, `GetQuestIndexForWatch(i)`,
`GetNumQuestLeaderBoards(questIndex)`, `GetQuestLogLeaderBoard(j, questIndex)` -> text, kind, finished. No quest POIs
(`C_QuestLog.GetQuestsOnMap` and the POI buttons don't exist) and no `GetQuestLogSpecialItemInfo` (the quest item buttons).
Questie's own tracker, when on, hides the game's frame.

## Measured on the user's Forever shots (2026-09-28 20:04-20:07, `(private files)`)

The first band 13 under the minimap's Edit Mode box; the column about 271 wide, the bands' 300 px art starting 11 left of it
(not centred: it runs 8 px past the screen's right edge, as in Forever), the band names 18 in from the art's left (7 from the
column's); the blocks 20 in, each with a 20 px POI icon whose right edge is 7 left of the name and whose top is 5 above it:
the ring with "?" for a quest that can be turned in, with "..." for one in progress (no numbers: 1.14.2 has no map POIs to
number, and Forever showed none either); the name as "[9] Tumors" in the quest's difficulty colour (green, yellow); the
objectives as "- 0/1 Ursal the Mauler slain" (retail's count-first wording; 1.14.2 gives "Ursal the Mauler slain: 0/1"); a
complete quest's line its completion text ("Speak with Nessa Shadowsong.", light grey) or "Ready for turn-in" (grey), without
a dash. Forever also tracks profession recipes in a third band ("Profession": Embossed Leather Boots 1/2 ...): not here.

## The skin

- **Our column** `ForeverUITracker` 271 wide, 12 under the game frame's TOPRIGHT (the bands' art anchored 11 left of it); the game's 31 strings at alpha 0 (it keeps writing them).
  After every `QuestWatch_Update` (a secure hook) the column is laid again from the watch list: the two bands, then a block per
  watched quest (`ForeverUITrackerBlockN`, pooled) with its name and its lines (pooled), at Forever's offsets and colours.
  `QuestWatchFrame` takes the column's size (260 x the height, 20 when nothing is watched: the column hidden then), so Edit Mode's
  box fits it.
- **The bands**: the collapse-all button folds everything but the first band; the Quests band's small button folds the blocks;
  both states kept (ForeverUIDB.tracker.collapsed, .questsCollapsed); the pressed pieces while the mouse is down, the yellow
  highlight over.
- **A block**: the POI icon (the ring `UI-QuestPoi-QuestNumber` with `UI-QuestIcon-TurnIn-Normal` or
  `Quest-In-Progress-Icon-yellow`) at the name's left; the name "[level] Name" (Friz 12, shadow) in `GetQuestDifficultyColor`'s
  colour, white under the mouse; its objectives dashed with the count first, light grey, white under the mouse; a finished
  objective grey with the check in place of the dash; a failed quest (`GetQuestLogTitle`'s isComplete -1) says "Failed" in dim
  red; a complete quest (isComplete 1, or no objectives) shows `GetQuestLogCompletionText` when it has one (light grey) or "Ready
  for turn-in" (grey), without a dash (1.14.2 leaves such quests out of its own list). A button over the block: click -> the quest log at the quest (`ShowUIPanel(QuestLogFrame)`,
  `QuestLog_SetSelection`); shift-click -> `RemoveQuestWatch` + `QuestWatch_Update`.
- **Strings**: "All Objectives", "Quests", "Ready for turn-in", "Failed" through `ns.L` (1.14.2 has none of Forever's tags).

Not in this pass: the POI numbers and quest item buttons (no API), the add and turn-in animations (the shine, the header glow,
the line burst), the timer and progress bars (Forever turns the timers off; 1.14.2's timed quests show in `QuestTimerFrame`), the
achievement and other modules (none here), a right-click menu, a settings arrow. Questie: with its tracker on, both the game's
frame and ours are hidden by it; `/fui skin tracker off` keeps Questie's alone by choice.

## Offline and preview

`addons/tests/foreverui/46-tracker.lua` (the stub's watch frame and leaderboards in `stub/33-questwatch.lua`); the browser
preview shares the minimap's page, http://localhost:8777/ui-forever/minimap/.

## Fixes 2026-09-28 night (the user's shot: the game's lines over ours)

The game's strings were set to alpha 0 once; QuestWatch_Update colours every line it uses on every update, and a font string's
SetTextColor gives it its alpha back. Now they are hidden and set to alpha 0 again after each QuestWatch_Update (our hook runs
after the game's). The stub's SetTextColor sets a font string's alpha as the client does.

## The first look in game (2026-09-28 late night, session 35: Claude drove the client)

- Right: the two bands and their buttons, the POI rings ("..." in progress, "?" to turn in), "[level] Name" in the difficulty
  colour, count-first objectives, "Ready for turn-in", folding the Quests band and back.
- Fixed (0.100.2): the bands' names were white; Forever's `ObjectiveTrackerHeaderFont` is `NORMAL_FONT_COLOR` (gold). A click on a
  block opened nothing after a /reload: SkinQuestLog docked `QuestLogFrame` into the hidden map at login, so the game's
  `ShowUIPanel` showed it inside a hidden frame (the micro button too); now the log goes back to UIParent while the map is closed,
  as the map's OnHide already did, and the click opens the log at the quest's details (`ns.QuestLogShowDetails`), as Forever's
  `QuestMapFrame_OpenToQuestDetails`.
