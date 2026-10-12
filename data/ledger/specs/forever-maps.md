# Forever's maps and map pins in the 1.14.2 map skin

Asked 2026-09-28: Forever's world maps (the new zones included, viewable though the server doesn't have them), then every map icon
and pin Forever uses that 1.14.2 can show natively, each with a switch. Built in ForeverUI 0.77.0-0.78.0 (`SkinMap.lua`).

## The art

- **Source:** `(private files)` (`render_all_zones.py`, 1002 x 668 each).
  `tools/asset-extract/forever_map_art.py` (run from `(a file on the server's Mac)`) cuts each into two 24-bit TGA textures, the top
  1024 x 512 and the bottom 1024 x 256, in `addons/ForeverUI/Art/Maps/` (gitignored, 235 MB for 59 maps), and writes the table
  `ns.ForeverMaps` into `SkinMap.lua`'s generated block.
- **Which maps:** the 54 1.14.2 has (947 Azeroth, 1411-1464) and five new zones: Mount Hyjal (2482), Darkspear Islands (2524) and
  Shen'dralas (2652) under Kalimdor, Riverglades (2548) under the Eastern Kingdoms, Zephras Isle (2521) under Azeroth. 2665 (a
  second, smaller Zephras Isle with no parent) is left out.
- **World bounds:** Forever's `UiMapAssignment` (FileDataID 1957219, read from the Forever install on 2026-09-28 with the user's
  OK) against 1.14.2's: 51 maps are the same; **Mulgore, Eastern Plaguelands, Redridge Mountains and Stormwind City** differ
  (Stormwind's reaches the harbour). Their pictures are placed by their own bounds on 1.14.2's map (`rect`, 0..1 of 1.14.2's) and
  cut to the canvas, so the player arrow and the pins stay right; where Forever's picture doesn't reach (a strip of Eastern
  Plaguelands and of Redridge), the game's own art shows.

## How it's drawn

- **Base:** on the game's exploration pin (`MapExplorationPinTemplate`, one pin over the canvas, above the map's tiles and under
  every other pin), two BACKGROUND textures with Forever's base picture.
- **Explored areas (the fog of war kept):** for each overlay texture the pin lays out, a texture from Forever's explored picture
  over the same rectangle, masked by that overlay's own file (its alpha is the explored area's outline; the mask at the file's
  full size from the same corner), and the game's overlay at alpha 0. Redrawn after every `RefreshOverlays` (a map change, an
  exploration update, a zoom level change).
- **New zones:** listed in their parent's dropdowns in the nav bar; chosen, a frame over the canvas shows Forever's explored
  picture (the canvas at alpha 0, the coordinates hidden), and the nav bar gets its crumb. Any other crumb, a right-click on the
  picture or the map closing leaves it. No pins: the server has no such zone.
- **Switch:** the map filter's "Forever's map art" (ForeverUIDB.mapForeverArt); off, the game's own map.

## Pins: Forever's against 1.14.2's

Forever's world map adds about 35 data providers (`blizzard_worldmap.lua`, lines 205-269); 1.14.2's adds 7 (area POIs, battlefield
flags, the death marker, gossip POIs, exploration, zone highlight, debug) and ships the code of most others in
`Blizzard_SharedMapDataProviders` without adding them.

| Forever's provider | 1.14.2 | Here |
|---|---|---|
| Flight points (`C_TaxiMap.GetTaxiNodesForMap`) | code shipped, not added; the API exists | **added**, "Show flight points" |
| Map links / portals (`C_Map.GetMapLinksForMap`) | code shipped, not added; the API exists | **added**, "Show portals" (vanilla data may have none) |
| Selectable graveyards (`C_DeathInfo.GetGraveyardsForMap`) | code shipped, API exists | not added: only where a battleground offers a choice |
| Dungeon entrances (`C_EncounterJournal.GetDungeonEntrancesForMap`) | code shipped, the API missing | later: needs our own data (Forever's journal tables) |
| Quests, quest offers, quest blobs (`C_QuestLog.GetQuestsOnMap`, `C_QuestLine`, `C_QuestHub`) | missing | Questie covers them |
| Vignettes (`C_VignetteInfo`) | missing namespace | no |
| Area POIs, group members, death marker, zone highlight, battlefield flags, gossip | both | as the game has them |
| Fog of war, bonus objectives, invasions, world quests, garrisons, delves, dragonriding, pet tamers, dig sites | retail content | no |

Forever's map filter (`WorldMapTrackingOptionsButton`, right of the nav bar) has the camelot filters "Show quest levels" and
"Quest difficulty" plus the shared ones; its button uses the same arrow art as the settings dropdown. Ours ("Map Filter", left of
the quest log's triangle): Show coordinates, Show flight points, Show portals, Forever's map art.

## Next

- Pin art: compare the pins' atlases (flight masters, POIs, the player arrow) with Forever's `-c60` set and use Forever's where
  they differ.
- Dungeon entrances from Forever's tables (journal instances and their entrances), as a pin provider of our own.
- The continent maps' new islands clickable (a hover highlight and a click into the new zone's view).
