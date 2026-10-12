# The flight map: Forever's TaxiFrame for 1.14.2

Built 2026-09-28 late night (session 35, unattended; the P2 list's item 15). ForeverUI 0.101.0, skin part `taxi`, `SkinTaxi.lua`.
Sources: Forever's Blizzard_UIPanels_Game `shared/taxiframe.xml` and `.lua`; 1.14.2's FrameXML `TaxiFrame.xml` (804799) and
`TaxiFrame.lua` (804823); SharedXML's `BasicFrameTemplateWithInset` (1.14.2: 804824); the user's Forever shot 2026-09-28 20:29:00
(`_Inbox/More and Flight Path`, Rut'theran's flight master).

## What Forever shows

A `BasicFrameTemplateWithInset` 590 x 608 titled "Flight Map" (`FLIGHT_MAP`), the red close button, no portrait and no flight
master's name; `SetTaxiMap(self.InsetBg)`: the continent's taxi map drawn into the whole inset (TOPLEFT 4, -24 to BOTTOMRIGHT
-6, 4: 580 x 580), `TAXI_MAP_WIDTH` / `HEIGHT` 580; the nodes (green where you are, white reachable, the nub for distant ones)
and the one-hop lines as before.

## What 1.14.2 has

Vanilla's 384 x 512 parchment (four `UI-TaxiFrame-*` pieces), the flight master's portrait (`TaxiPortrait`) and name
(`TaxiMerchant`), the map texture `TaxiMap` 316 x 352 at TOP (-13, -75), `TaxiRouteMap` for the lines, `TaxiCloseButton`;
`TAXI_MAP_WIDTH` 316, `TAXI_MAP_HEIGHT` 352; the node buttons made on first show as children of TaxiFrame itself.
`BasicFrameTemplateWithInset` and its art (`FrameGeneral\UI-Frame`, the marble) are there too, the same files as Forever's.

## The skin

- TaxiFrame 590 x 608; its own regions (parchment, portrait, name) at alpha 0, never removed.
- `ForeverUITaxiChrome`: the game's own `BasicFrameTemplateWithInset` on a child, title "Flight Map", its close button hidden
  (the game's `TaxiCloseButton` stays the one that closes the taxi map), its inset at alpha 0.
- The map: `TaxiMap` moved onto a holder frame over the chrome, filling the inset (580 x 580); `TaxiRouteMap` over it in the
  same rectangle; `TAXI_MAP_WIDTH` / `HEIGHT` set to 580 so the game places the nodes and lines at the new size.
- The node buttons raised over the map after every show (they are TaxiFrame's children, one level up: under the holder).
- `TaxiCloseButton` in Forever's red art (`ns.SkinCloseButton`).

## In game (2026-09-28 late night)

Seen at Vesprystus (Rut'theran): the window, title, map, the green node at Rut'theran, the white at Auberdine, the line between;
it matches the Forever shot. The nodes were hidden under the map at first (the parent), fixed. Not tried: hovering a node (its
tooltip and cost), taking a flight, a continent with many nodes, the distant nodes' nubs.
