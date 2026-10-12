# The minimap: Forever's cluster for 1.14.2

Started 2026-09-28 (the user: "build the mini map with the new icons"; the P1 list's item 11). ForeverUI 0.100.0, skin part
`minimap`, `SkinMinimap.lua`. Sources: Forever's own code (`(private files)`:
the mainline Minimap.xml and Minimap.lua, the Camelot overrides skin.lua (the ring by the rotation setting) and diel.lua (the
day-and-night dial)), its atlas tables (Forever's own file 8026705 with the ring and the dial, retail's 4618651 / 4618654 / 4618657
/ 4618660 with the button kit, 8187590 the round mask, 1121272 the object icons), and 1.14.2's own FrameXML (Minimap.xml 4216199,
Minimap.lua 4216049, GameTime.xml 804602 and GameTime.lua 804612, UIParent.lua 4216112). The Forever client was checked closed
(no process) before its files were read, at the start of the session, before the user opened it for screenshots.

## What Forever shows

Retail's Dragonflight minimap with Camelot's ring: a 256 x 256 cluster at the screen's top right (hit rect insets 30, 10, 0, 30);
the zone bar (`BorderTop`, 175 x 16, a nine-slice of the `ui-hud-minimap-button` kit) at TOP (15, -4) with the zone's name
(135 x 12 button, the text 130 x 12 centred 1 up) 4 in from its left; the tracking button (17 x 17: the small button as its
background, the 13 x 14 magnifier `ui-hud-minimap-tracking-up` inside) 2 left of the bar; the indicator row hanging from the
tracking button's bottom right with the mail icon (20 x 15, `ui-hud-minimap-mail-up`; a flipbook plays when new mail comes); the
map container at TOP (10, -30), sized to the ring atlas (253 x 253: skin.lua reads `C_Texture.GetAtlasInfo`), the map 198 x 198
centred in it with the round mask `ui-hud-minimap-frame-generic-mask`; the ring `UI-HUD-Minimap-Frame` (fixed) or
`UI-HUD-Minimap-Frame-Pointer` over `UI-HUD-Minimap-Frame-Circle` (rotating); the zoom buttons (in: 17 x 17 at CENTER 88, -68
of the map; out: 17 x 9 at 72, -84) shown while the mouse is over the map or them; the day-and-night dial (a 42 x 42 ring
`UI-HUD-Minimap-Frame-Cycle` round a 33 x 33 `UI-HUD-Minimap-DayCycle` / `-NightCycle`) at CENTER (63, 72) of the cluster, changed
by the `DIEL_CYCLE_CHANGED` event; the player's coordinates (90 x 10, GameFontHighlightSmall) 18 under the map, by the
`minimapShowPlayerCoords` cvar. Forever's blips are its own `Interface/Minimap/ObjectIconsAtlas` (1024 px, laid out differently from
1.14.2's 512: not a shared grid, so the game's own sheet stays; 0.120.2, the user's shot of cut icons, 2026-09-29) and its player arrow `ui-hud-minimap-arrow-player` (silver with a blue gem: the same as 1.14.2's in newer art; "gold" before
was a misreading of the shot, where a yellow blip sat under it).

## What 1.14.2 has

Vanilla's 192 x 192 `MinimapCluster` at TOPRIGHT: `MinimapBorderTop` (the top border art with `MinimapZoneTextButton` centred 83
up), `MinimapToggleButton` (minimize), the 140 px `Minimap` at CENTER of the cluster's TOP (9, -92), `MiniMapMailFrame` (33 x 33 at
the map's TOPRIGHT 24, -37: a letter icon in a round border), `MinimapBackdrop` (192, CENTER 0, -20: the classic ring
`MinimapBorder`, `MinimapNorthTag`, the compass ring shown only while rotating), `MiniMapWorldMapButton`, `MiniMapTracking` (33 x 33:
the active tracking's icon in a round border, a click opens `MiniMapTrackingDropDown`), `MiniMapBattlefieldFrame`, `MiniMapLFGFrame`,
`MinimapZoomIn` / `MinimapZoomOut` (32 x 32), `GameTimeFrame` (50 x 50 at the cluster's TOPRIGHT 4, -19: the sun or moon of
`UI-TOD-Indicator`, its half chosen by `GAMETIME_DAWN` / `GAMETIME_DUSK` in `GameTimeFrame_Update`, the time in its tooltip).
`UIParent_UpdateTopFramePositions` hangs the buffs 10 left of the cluster; `UIParent_ManageFramePositions` hangs the tracker,
timers and durability under it, measuring the buffs against `MINIMAP_BOTTOM_EDGE_EXTENT` (192).

## The skin

- **The cluster** 290 x 292 (Forever's is nominally 256 but a ResizeLayoutFrame with a width padding of 20: it grows to its
  ring; its Edit Mode box measured 290 x 292 on the user's Forever shot of 2026-09-28 20:06, the ring's visible edge 29 in
  from the screen's right, the map's centre 155 in from the cluster's left), its place untouched (Edit Mode moves it), Forever's
  hit rect insets; `MINIMAP_BOTTOM_EDGE_EXTENT` set to 292 so the frames under it keep their measure.
- **The clock**: Forever shows the time at the zone bar's right end (its shots: "4:02" inside the bar, a calendar button
  beyond it). Blizzard_TimeManager's `TimeManagerClockButton` (60 x 28 on the map's bottom) moved to RIGHT - 4 of the bar,
  40 x 16, its background at alpha 0, the ticker right-aligned; its tooltip and click (the stopwatch) stay. No calendar on
  1.14.2: nothing beyond the bar.
- **The map** 198 x 198 at CENTER of the cluster's TOP (10, -30 - 253 / 2): Forever's mask (`Minimap:SetMaskTexture`), blips
  (the game's own: Forever's sheet has another layout) and player
  arrow (`SetPlayerTexture`: the piece stretched over its own 32 x 32 file); the three setters guarded (none is called by 1.14.2's
  own UI; SexyMap calls the mask one on this client).
- **The ring**: our textures on `MinimapBackdrop` (sized 253, centred on the map): the plain ring, or the pointer ring over the
  circle when `rotateMinimap` is on (after `Minimap_UpdateRotationSetting`); the classic ring, top border and compass at alpha 0;
  the north tag moved to the map's top.
- **The zone bar**: our frame `ForeverUIMinimapZoneBar` at TOP (15, -4), the kit's nine pieces (corners at their size, the edges
  stretched between them); `MinimapZoneTextButton` 135 x 12 at its LEFT + 4, `MinimapZoneText` 130 x 12 centred 1 up, left
  aligned; the game's text and colour (`Minimap_Update`).
- **Tracking** (0.100.1, after the first look in game): 1.14.2 Era has no tracking button or menu (its Minimap.xml is 4216256;
  4216199, read at first, is a later Classic's with `MiniMapTracking` and a dropdown). Era's `MiniMapTrackingFrame` (33 x 33, a
  child of the map) shows only while a tracking spell is on; it stays at alpha 0 with the mouse off. Ours, `ForeverUIMinimapTracking`,
  17 x 17 at RIGHT of the bar's LEFT - 2, always shown: Forever's small button (`ui-hud-minimap-button`, `-down` while pressed),
  the magnifier (`-up`, `-down` while pressed), the mouseover piece as the highlight. A click opens Forever's tracking menu
  (`ForeverUIMinimapTrackingMenu`, under the button, opening left): "Uncheck All", then each tracking spell the character knows
  (the hunter's eight first, then the druid's, paladin's and warlock's, then Find Herbs, Minerals, Treasure) as a tick box, the
  name and the spell's icon (20 x 20) at the right; each row a secure button casting its spell (tracking is a spell on 1.14.2), so
  the menu opens out of combat only and closes when a fight starts. Right-click stops tracking. Tooltip: "Tracking", then the
  spell on and "Right-click to stop tracking.", or "Click to choose what the minimap tracks.". The client here never learns
  which tracking is on (HermesProxy doesn't pass the player's tracking field: `GetTrackingTexture` stays nil with Track Beasts on
  the server), so the last tracking spell cast is kept per character (`ForeverUIStats.tracking`) and ticked when the game has
  nothing to say; Uncheck All and right-click forget it.
- **Mail**: `MiniMapMailFrame` 20 x 15 at TOPRIGHT of our tracking button's BOTTOMRIGHT; the round border at alpha 0, the icon
  Forever's mail; the game shows and hides it. The flipbooks are not played (a later step).
- **Zoom**: the two buttons sized and placed as Forever's, their four textures Forever's (the disabled one desaturated); hidden
  until the mouse enters the map or them, hidden again 0.1 s after it leaves all three.
- **The dial**: `GameTimeFrame` 42 x 42 at CENTER (63, 72) of the cluster, its indicator at alpha 0; our sun or moon under
  Forever's small ring, chosen by the game's own dawn and dusk after every `GameTimeFrame_Update` (1.14.2 has no
  `DIEL_CYCLE_CHANGED`); the tooltip stays the game's.
- **Coordinates**: `ForeverUIMinimapCoords` 90 x 10 at TOP of the map's BOTTOM - 18, "%.1f, %.1f" from
  `C_Map.GetPlayerMapPosition` every 0.1 s; `/fui minimap coords on | off` (ForeverUIDB.minimapCoords; on by default).
- **Hidden**: `MinimapToggleButton`, `MiniMapWorldMapButton` (Forever has neither: the world map is in the micro menu).
- **Left alone**: the battlefield and LFG buttons, pings, the zoom's disabling at the ends, the rotation setting itself.

Not in this pass: the mail flipbooks (new mail, the reminder), the calendar button (1.14.2 has no calendar), the crafting-order
icon, the instance-difficulty flag, the expansion landing button. Scale: Forever's own sizes 1:1 (as the unit frames; the user's Forever shots at 2560 x 1080 show the map 198 px and the bar 16
 px, so their UI scale is 1), the cluster 98 wider and 100 taller than vanilla's: the buffs hang 98 further left and the tracker
 100 lower.

## Offline and preview

The user's Forever shots (2026-09-28 20:04-20:07, `(private files)`; the Edit Mode ones show the boxes): the
layout above was checked and measured against them.

`addons/tests/foreverui/45-minimap.lua` (the stub's cluster in `stub/32-minimap.lua`); the browser preview
`tools/asset-extract/minimap_preview.py` -> http://localhost:8777/ui-forever/minimap/ (by day, by night rotating, the tracker).

## Fixes 2026-09-28 night (the user's shots)

- Edit Mode places saved for the vanilla cluster put the bigger one off the screen's right edge: dropped once when the cluster's
  size changes, with a chat line; the cluster back at TOPRIGHT, the tracker under it.
- That clean-up first called SetUserPlaced on MinimapCluster, which isn't movable: the client threw and the skin stopped right
  after sizing the cluster (the vanilla pieces inside the bigger box). The call removed; the clean-up runs in a pcall.

## The first look in game (2026-09-28 late night, session 35: Claude drove the client)

- Seen right: the ring and round map, the zone bar with the game's colour and the clock at its right end, the moon dial at night,
  the coordinates, the arrow (Forever's own is silver, as ours), the minimap fully on screen.
- No tracking button: the skin looked for Wrath's `MiniMapTracking` (see Tracking above): our own button and menu now.
- The buffs over the zone bar's left end: Edit Mode had saved their place beside the vanilla cluster; the one-time clean-up now
  drops the buffs' place too (`minimapEditSize` "290x292:2", so it runs once more for those who had the first one).
- Not tried: the mail icon (no mail waiting), the zoom buttons on hover (a background pointer doesn't hover), the rotating ring.
