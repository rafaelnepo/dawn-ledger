# Forever Map & Quest Log: porting spec (from the code)

Written 2026-09-25 by an agent that read Forever's extracted UI code (`(private files)`,
paths below relative to it) and atlas tables; nothing touched the client. Our notes only: no Blizzard art or code here.
`win(x, y)` = position in the 1035 x 534 window from its top-left, y down (±1 px, see the canvas left edge). "set1" = Forever's
own "-c60" art. **Gap:** `Blizzard_POIButton` (the "?" quest icon on the map and in the list) was never crawled. Measured on
the in-game screenshots instead (2026-09-25, page built): a 20 px button, background `UI-QuestPoi-QuestNumber` 32 x 32, icon
32 x 32 centred: `UI-QuestIcon-TurnIn-Normal` for a finished quest (not `UI-QuestPoi-QuestBangTurnIn`), `Quest-In-Progress-Icon-yellow`
for one in progress; the same size on the map at the first zoom level as in the list.

## 1. Frames and size

- Loaded for Camelot: `blizzard_worldmap` (camelot Constants NAVBAR_X_OFFSET -50, camelot templates and WorldMap.lua on top
  of the shared ones), `blizzard_uipanels_game` (camelot QuestMapFrameOverrides, QuestMapFrameUtils, QuestFrameTemplates,
  MapLegendFrameData; mainline QuestMapFrame, QuestInfo, WorldMapFrame), `blizzard_framexml` mainline NavigationBar.
- `WorldMapFrame` (MapCanvasFrameTemplate, strata MEDIUM): `TitleCanvasSpacerFrame` TOPLEFT (2, 0), BOTTOMRIGHT at TOPRIGHT
  (-3 - 333, -67) with the log shown (height 67); `ScrollContainer` (the canvas); `OverscrollBG` (under the map); `BorderFrame`
  (PortraitFrameTemplateMinimizable, strata HIGH, all points) with `InsetBorderTop`, `Tutorial` (hidden by Camelot's help plate
  override), `MaximizeMinimizeFrame`; `QuestMapFrame` reparented by `AttachQuestLog` (strata HIGH, TOPRIGHT (-3, -25),
  BOTTOMRIGHT (-3, 3)); overlay frames made in Lua (`blizzard_worldmap.lua:318-361`).
- Size: minimized 702 x 534 (`SetupMinimizeMaximizeButton`, lua:115-136), `SetQuestLogPanelShown(true)` adds 333: 1035 x 534.
  Cvars `miniWorldMap` = 1 (minimized) and `questLogOpen` = 1. Maximized: title WORLD_MAP, log hidden, no portrait.
- Chrome: title MAP_AND_QUEST_LOG, portrait `Interface\QuestFrame\UI-QuestLog-BookIcon` 62 x 62 at (-5, 7) with the round mask;
  Bg `UI-Background-Rock` moved under the map, TopTileStreaks hidden. NineSlice "PortraitFrameTemplateMinimizable" with
  Camelot's offsets: TopLeft `UI-Frame-PortraitMetal-CornerTopLeft` 95x95 (-13, 16), TopRight
  `UI-Frame-Metal-CornerTopRightDouble` 95x95 (2, 16), BottomLeft/Right corners 95x100 at y -8, metal edges (set1). Close
  `RedButton-Exit` 24x24 at TOPRIGHT (-2, 1) = win(1009..1033, -1..23); maximize left of it (-1, 0) with `RedButton-Expand`.
  `InsetBorderTop` `_UI-Frame-InnerTopTile` 256x3 at (2, -63) to the canvas right = win(2..699, 63..66).

## 2. Navigation bar

- `WorldMapNavBarTemplate` (NavBarTemplate): TOPLEFT spacer (64, -25), BOTTOMRIGHT spacer (-50, 9) = win(66..649, 25..58).
  Background `Interface\HelpFrame\CS_HelpTextures_Tile` tiled across (tc y 0.1875-0.2539), overlay child (level 50, OVERLAY 5,
  tc y 0.2578-0.3242); inner border corners `UI-Frame-InnerBotLeftCorner` / `UI-Frame-InnerBotRight` 6x6 at (-3, -3) / (3, -3),
  `_UI-Frame-InnerBotTile` between, left/right tiles 3 px.
- Home button: text WORLD ("World"), width min(128, width("Home") + 50) from OnLoad, height 30; art `Interface\HelpFrame\
  CS_HelpTextures` (512x128) tc x (0.703125 - 0.25 w/128)..0.703125, y 0.0078-0.2422 (pushed y 0.2578-0.4922, highlight
  0.5078-0.7422 ADD); `Interface\Common\ShadowOverlay-Left` 30x30 at LEFT; text GameFontNormal gold, LEFT 10 / RIGHT -30. Goes
  to the top-most World map (Azeroth 947).
- Breadcrumbs: maps up the parent chain while parent > 0 (Darnassus 1457 -> Kalimdor 1414; Azeroth excluded): [Kalimdor,
  Darnassus]. NavButton height 30, width text + 53 with a dropdown (+30 without); normal CS_HelpTextures_Tile tc y 0.0625-0.1211
  tiled, pushed 0.125-0.1836, highlight CS_HelpTextures (0.00195, 0.25195, 0.65625, 0.921875) ADD; chevron `arrowUp` 21x30
  CS_HelpTextures (0.8887, 0.9297, 0.2969, 0.5313) at the button's RIGHT (earlier buttons sit a level higher so it overlaps the
  next); `selected` (0.00195, 0.25195, 0.375, 0.6406) over the last button, OVERLAY 2; text GameFontNormal gold at LEFT 20 (the
  last, disabled button stays gold). Dropdown `MenuArrowButton` 27x31 at the button's TOPRIGHT (-2, -15):
  `Interface\Buttons\SquareButtonTextures` 12x12 CENTER (0, -1), tc l .453125 r .640625 t .203125 b .015625 (down arrow);
  `UI-SquareButton-Up/Down` at alpha 0 (1 on hover). Home at LEFT, each next button at the previous one's RIGHT (home -15).
- Right end: `WorldMapTrackingOptionsButton` (Camelot template), moved to NavBar RIGHT (+10, -2): 32x32 = win(659..691,
  ~28..60), icon `common-dropdown-a-button` (set1 27x27) at (4, -6); ResetButton `auctionhouse-ui-filter-redx` 23x23 CENTER at
  TOPRIGHT (-5, -7), shown only when a filter differs from its default.

## 3. Map canvas

- `ScrollContainer`: TOPLEFT spacer BOTTOMLEFT, BOTTOMLEFT (0, 2), RIGHT to the spacer = win(2 (or 0)..699, 67..532), about
  697 x 465 (the left edge is defined twice; which one wins is unconfirmed).
- Art: 256 px tiles (UiMap -> UiMapXMapArt -> UiMapArt; style layer 1002 x 668 for Darnassus 2172), drawn at
  baseScale = min(W / 1002, H / 668) = 0.6956, centred: about 697 x 464.7. Zoom steps 1.0 / 1.57 / 2.14 x base. Behind: the art
  background atlas (default `AdventureMap_TileBg` 512x512). No inner border besides InsetBorderTop.
- Top-left: `WorldMapTrackingPinButton` at canvas TOPLEFT (3, 0), 32x32: `Interface\Minimap\UI-Minimap-Background` 25x25 at
  (3, -4), `Waypoint-MapPin-Untracked` drawn 20x20 at (7, -6), `Interface\Minimap\MiniMap-TrackingBorder` 54x54 at TOPLEFT.
- Bottom-right: `SidePanelToggle` at canvas BOTTOMRIGHT (-2, 1) = win(665..697, 499..531): with the log open
  `QuestCollapse-Hide-Up` 32x32 (a brown square "◂?"), `MapCornerShadow-Right` 46x53 at BOTTOMRIGHT (2, -1) BACKGROUND.
- Coordinates (shared, not Camelot-specific): at WorldMapFrame BOTTOMLEFT (68, 2), GameFontHighlightSmall (FRIZQT 10, white);
  "Player: %.1f, %.1f" on the shown map, or WORLD_MAP_PLAYER_COORDS_MAP_NAME "Player: %.1f, %.1f (%s)" with the player's own
  map when elsewhere; text starts about win(68, 517). A cursor line appears above it only with the mouse over the canvas.
- Zone banner: an AreaLabel shows only on mouse-over (WorldMapTextFont FRIZQT 32 THICK, #ffeac2), so the "DARNASSUS" banner in
  the screenshot is probably painted in the map art (to check).
- Quest pins (QuestPinTemplate = POIButtonTemplate): CENTER at (x W, -y H) of the canvas, after a POI quantizer (cell 75);
  complete: background `UI-QuestPoi-QuestNumber` 32x32 with `UI-QuestPoi-QuestBangTurnIn`; in progress
  `Quest-In-Progress-Icon-yellow`; super-tracked background `UI-QuestPoi-QuestNumber-SuperTracked`. With a quest open in the
  details view only its pin shows. Size and scale: see the gap above.

## 4. Quest log

- QuestMapFrame 330 wide = win(702..1032, 25..531); QuestScrollFrame at TOPLEFT y -29 = win(702..1010, 54..522), 308 x 468.
  Background `QuestLog-main-background` 307x510 clipped to 468 (tc bottom 468/510); empty: `QuestLog-empty-quest-background`.
- Border (QuestLogBorderFrameTemplate, level 100) at (-3, 7) / (3, -6) of the scroll frame = win(699..1013, 47..528):
  `questlog-frame` 107x107 nine-slice (53 px, tiled), `questlog-frame-filigree` 48x19 at TOP +1,
  `questlog-frame-gradient-bottom` 307x66 at BOTTOM 4 (alpha = remaining scroll / 66).
- Search box (SearchBoxTemplate): BOTTOMLEFT at the scroll frame's TOPLEFT (6, 7), Camelot 200x20 = win(708..908, 27..47);
  `common-search-border-*` (set1) drawn 8x20, magnifier 10x10 at (1, -1), instructions SEARCH_QUEST_LOG in
  GameFontDisableSmall at 0.35 grey from (16, 0) to (-20, 0).
- Counter (Camelot only): InputBoxVisualTemplate border 100x20 at the search box's TOPRIGHT (+3, 0) = win(911..1011, 27..47);
  QUEST_LOG_COUNT_TEMPLATE "Quests: %s%d|r|cffffffff/%d|r" in GameFontNormalSmall at TOPRIGHT (-5, -5): gold "Quests: ", white
  count (red when over), white "/40".
- Gear: `questlog-icon-setting` 15x16 at the scroll frame's TOPRIGHT (19, 25) = win(1014..1029, 29..45).
- Scroll bar: MinimalScrollBar 8 wide at TOPRIGHT (8, 2) / BOTTOMRIGHT (8, -4) = win(1018..1026, 52..526); thumb hidden when
  nothing scrolls.
- List (VerticalLayoutFrame, 304 wide): top padding first header 8, header->header 6, header->quest 2, quest->header 4,
  quest->quest -3.
  - Header (QuestLogHeaderTemplate, ListHeaderVisualTemplate): 289x22 at left 9; `common-button-list-collapseExpand` (set1
    64x28, slice 18/0/18/0); text Game15Font_Shadow at LEFT 8, colour #808080 (white on hover); CollapseButton 20x20 at RIGHT -6,
    `common-button-list-minus` 13x4 / `-plus` 13x13. Headers of zones on the shown map are expanded, the rest collapsed
    (QuestMapFrame_ResetFilters).
  - Quest (QuestLogTitleTemplate): 290 wide at left 4; height 8 + text + objectives + 6; text GameFontNormalLeft at (31, -8) up
    to 4 px before the checkbox; title "[level(+)] Title" always in Camelot; "(Elite)" tag before the checkbox for elites.
    Difficulty colours: trivial #808080, easy #40bf40, fair #ffd100, difficult #ff8040, impossible #ff1a1a. POI button at
    (6, -4); tracked box 14x14 at TOPRIGHT y -8 (`questlog-icon-ticksquare`, `questlog-icon-checkmark-yellow` 17x14 at CENTER
    (1, 1) when tracked).
  - Objectives: "- " (ObjectiveFont FRIZQT 12, #cccccc) then text 205 wide, first at the title's BOTTOMLEFT (0, -3), then
    (0, -2); a complete quest shows one line: its completion text, or "Ready for turn-in".
  - Worked example: header 1 win(711..1000, 62..84); quest title at (737, 94), objective ~(737, 109), checkbox 982..996 x
    94..108, POI at (712, 90); next headers at 131, 159, 187.

## 5. Details view

- DetailsFrame 308x502 = win(702..1010, 26..528); the map switches to the quest's map; Back returns.
- Parchment `QuestDetailsBackgrounds` 287x464 stretched to 308 wide, 440 tall max (tc bottom 0.8836); border as the list's at
  (-3, 4) / (3, 17). BackFrame 307x52 `questlog-reward-top-frame` with BackButton (UIPanelButtonTemplate, BACK) 90x22 at LEFT
  (11, 4) = win(713..803, 37..59). UIPanelButtonTemplate: `Interface\Buttons\UI-Panel-Button-Up` three slices (ends 12 px, tc
  0-0.09375 and 0.53125-0.625, y 0-0.6875), gold text, white on hover, grey (GameFontDisable) when disabled.
- Content scroll frame 298x430 at (5, -43) = win(707..1005, 69..499). Order (QUEST_TEMPLATE_MAP_DETAILS, width 289): title at
  (5, -10), objectives text (0, -5), objective list (0, -10), Description header (0, -20), text (0, -5), a spacer as tall as
  the rewards. Title and "Description": QuestTitleFont MORPHEUS 18 black, shadow (1, -1) (.49, .35, .05); text QuestFont
  FRIZQT 13 #2e1f0f.
- Rewards: container 307 wide at BOTTOMLEFT (0, 23), height rewards + 62; art `questlog-reward-header-top` 307x56,
  `questlog-reward-bottom` 307x88, `questlog-reward-tile-vertical` between; "Rewards" QuestFont_Huge (MORPHEUS 18) #e6c9ab at
  TOP -22; at (12, -52): "You will receive:" (QuestMapRewardsFont FRIZQT 10 #e6c9ab), then XPFrame 134x30 (`XP_Icon` 30x30,
  `QuestItemBorder` 102x30, value in NumberFontNormal); XP only: container win(702..1009, 392..505).
- Buttons (UIPanelButtonTemplate): Abandon 105x22 at BOTTOMLEFT (-3, -2) = win(699..804, 508..530); Share 103x22 with
  `UI-Frame-BtnDivMiddle` dividers, disabled when solo; Track 105x22 = win(907..1012), "Untrack" when watched.

## 6. For a vanilla character

- Hidden by Camelot: the Quests / Events / Map Legend tabs, help plate, quest-type icons, party-sync bar, the Encounter Journal
  provider, the filter counter. Hidden by data: floor dropdown, bounty board, world quests, campaign and story headers, task
  quests, war-mode and faction rewards.
- Pins that may appear on vanilla maps: quest offers (`QuestNormal` 28x28), flight masters, dungeon entrances, player and party
  arrows (not when the player is on another map), explored-area overlays.
