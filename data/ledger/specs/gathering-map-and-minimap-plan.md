# Next up: gathering nodes on the maps, the minimap's Forever features, the map's hybrid look (a note, 2026-09-30)

The user's list after the profession banners (0.161.0). Nothing built yet; each item gets its own spec, a browser preview and
the user's choices before code (docs/specs/toasts-and-banners.md and the in-game text rules still apply).

## 1. Check the other professions in game

**Unattended 2026-09-30: not done.** It needs a character learning professions (a trainer, or .learn / .setskill), and the only
character logged in was the user's own Mellbin (the guardrails: no GM commands on the user's characters). For the next run on a
test character, or by the user: /fui <profession> 1-8 shows every banner and toast meanwhile.

The banners and toasts were built offline and looked at with /fui <profession> 1-7. Still to see in game, gathering and crafting
both: a real rank learned at a trainer for each (the banner, the spells it brings, the footer), the Ready to Train and Skill at its
Limit toasts from a real skill-up, the book ranks (Expert Cooking, First Aid, Fishing), the quest ranks (Artisan Cooking, First Aid,
Fishing), the specializations. A test character with GM commands (.learn, .setskill) is quickest.

## 2. Gathering nodes on the maps, unlocked by your journal (like GatherMate2 / Gatherer): built 0.163.0

Built unattended 2026-09-30 (checklist 305): the choices made, for the user to change: 10 of a kind reveals it (any skill: the
count is the earning); the icons are Forever's professions_tracking_herb / _ore / _fish for every kind of that profession (a
kind's own item icon is on its toast and tooltip); zone maps only on the world map; a gathered node doesn't grey out (the
server's respawns aren't known to the client). Not yet: a journal page for the counts (/fui gather prints them).


- **What:** herb nodes, mining veins and fishing pools on the minimap and on the big map (the world map), as GatherMate2 does.
- **The unlock (the user):** earned, not given. Gather 10 of the same herb (or ore, or fish from pools) and every node of that kind
  unlocks on the map, the journal saying so. Also tied to the skill: a node shows only when your skill can gather it (to settle).
- **Where the nodes come from:** the server's own spawns (the world DB's gameobject table, read-only, as the fishing journal's
  data: tools/asset-extract/fishing_data.py), generated into a data file, not recorded as you play.
- **The journal:** each kind's count toward its unlock (Fishing's journal already counts catches; herbs and ore need the same),
  and a toast when a kind unlocks (the toast style).
- **To decide:** the icons (Forever's own tracking icons if it has them), filters per kind in the map's filter menu (ForeverUI
  already has a Map Filter arrow), fade by distance, and whether gathered nodes grey out until they respawn.

## 3. The minimap

- **Two different icons** for Find Herbs and Find Minerals tracking (they should match: one style for both).
- **The gathering circle** (the node blips the tracking spell shows) isn't drawn on our minimap: find why (SkinMinimap.lua's
  blip texture or the minimap's mask).
  - **Looked at in game (2026-09-30, unattended, on Mellbin):** after /cast Find Herbs the client's GetTrackingTexture() is still
    nil (as the old open item says for Track Beasts): the client doesn't know tracking is on, so it draws no node blips. HermesProxy
    v4.5.3 does translate PLAYER_TRACK_RESOURCES to ACTIVE_PLAYER_FIELD_TRACK_RESOURCES (UpdateHandler.cs, the 1.14.1 builder), so
    the cause is further along (the server's field, or the client wants an aura): a proxy/server question, not ForeverUI's. The
    gathering-node feature (item 2) draws our own node icons on the minimap from the server's data, which covers it either way.
    **To ask the user:** is "the gathering circle" these blips, or something else (a ring round the tracking button?).
- **Two icons (done, 0.162.1):** the tracking menu shows Forever's professions_tracking_herb / _ore for Find Herbs and Find
  Minerals. (The daisy above the action bar on Mellbin is MultiBarBottomRightButton1: Find Herbs placed there by the user.)
- **Forever's features:** NPC locations (trainers, vendors, flight masters, as Forever shows them); units coloured by reaction
  (friendly, neutral, hostile) for the tracking spells (Track Humanoids and the other hunter tracks, Find Treasure...).
  - **NPC locations: built 0.164.0** (checklist 306): Forever's Townsfolk tracking from the server's data, a switch per type.
  - **Units coloured by reaction: not possible from an addon.** The tracked creatures are the client's own blips (an addon can't
    learn where a unit that isn't in your group stands: UnitPosition is only you and your group), and the client never learns
    tracking is on here (the herb blips' problem above). If the proxy/server side is fixed and the blips come, their colours are
    the engine's; the only lever then is the blip texture (Minimap:SetBlipTexture) the minimap skin already leaves the game's.
- Still to refine: its layout and details (docs/specs/minimap.md).
- **A hybrid layout (the user, 2026-09-30):** the classic minimap's layout with Forever's modern styling; a preview first
  (tools/asset-extract/minimap_hybrid_preview.py, **http://localhost:8777/ui-forever/minimap-hybrid/**): A classic's places (the
  zone name centred over the top, tracking top left of the rim, mail left, the dial top right, the zoom buttons low right, the
  clock under the map) in Forever's art at Forever's 198 map; B the same at classic's 140; C today's cluster. Each for an Alliance
  zone and a Horde one. Waiting for the user's pick (or a mix).

## 4. The world map

- **The world map stays as it is** (the user, 2026-09-30: "i didnt mean the world map, i meant the minimap. The current world map
  we are using is already perfect"). The hybrid below is **the minimap's** (item 3); the map-hybrid preview was a misreading.
- ~~A hybrid layout~~ (the minimap's: see item 3).
  - **Preview (2026-09-30, unattended): tools/asset-extract/map_hybrid_preview.py, http://localhost:8777/ui-forever/map-hybrid/.**
    Four layouts on Forever's explored Teldrassil: A classic size (1002 x 668, today's is 697 x 465) in Forever's frame with its
    nav bar, the quest log its own window; B A with the log docked (1343 wide); C classic's continent / zone dropdowns and Zoom
    Out in Forever's dropdown and red-button art; D today's. Waiting for the user's pick (or a mix) before any code.
- **Forever's pins:** the map pin you place (Forever's "add pin" / waypoint), on the map, the minimap and the tracker.
  - **Built 0.165.0** (checklist 307): Ctrl-click to place, click to remove, the map and the minimap (icon or rim arrow), the
    distance, /fui way. Not yet: the tracker's line for it, sharing it in chat (Forever's pin link), the pin button in the map's
    header (Forever's WorldMapTrackingPinButton: click it, then click the map).

## 5. The stopwatch

- It can't be dragged: make it movable (ns.MakeMovable, the lock setting) and give it a Customize Interface box.
- **Checked in game (2026-09-30, unattended, on Mellbin):** the game's StopwatchFrame is mouse-enabled and movable with its drag
  handlers, nothing of ours over it (/fui at); a real mouse drag on the time box moved it, and the place came back after a /reload.
  Put back where it was and hidden. So it drags as it is: **to ask the user** what didn't move (another frame? the tab while it
  fades? a Customize Interface box instead of dragging?).
