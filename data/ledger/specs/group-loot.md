# Group loot rolls: Forever's loot toast for 1.14.2

Built 2026-09-29 (session 35, unattended; the P2 list's item 18). ForeverUI 0.104.0, skin part `grouploot`, `SkinGroupLoot.lua`.
Sources: Forever's `Blizzard_UIPanels_Game` mainline `GroupLootFrame.xml` / `.lua` (loaded for Camelot: its TOC line allows
mainline, and Camelot is of the mainline family, as the flight map's Shared file); 1.14.2's `LootFrame.xml` (804672) and
`LootFrame.lua` (804652). No Forever shot of a roll yet.

## Forever and 1.14.2

- **Forever:** the loot toast, 277 x 67: the `LootFrame\LootToast` background with its border (286 x 76) tinted in the item's
  quality colour, the icon (34) in the quality's ring (`loottoast-itemborder-*`, 42 x 42), the name in GameFontNormal (125 wide,
  60 from the left), the round buttons (`lootroll-toast-icon-need/pass/greed-*`, 32): Need and Pass side by side, Greed under
  Need; the timer a thin yellow bar (190 x 8) along the bottom. (Transmog and the need-roll animation: not in vanilla.)
- **1.14.2:** vanilla's dialog box, 243 x 84 (the gold one with the dragon for bind on pickup), the empty slot, the label frame,
  the dice and coin buttons, the close button as Pass, the skills bar with its border.
- `LootToast` is the same file in both games (compared pixel for pixel), so the game's own is used; the ring and the buttons are
  Forever's pieces (`tools/asset-extract/forever_addon_art.py`: 17 new, a /reload loads them).

## The skin

- Each GroupLootFrame: 277 x 67, the backdrop cleared (after the game's OnShow sets it), the slot, label frame, dragon and corner
  at alpha 0, the toast and border added, the icon at (10, -11) with its ring, the name placed, the three buttons in Forever's art
  and places (each with its own grey disabled texture), the timer 190 x 8 at (3, 2) without its border.
- On every show: the ring by the item's quality, the border in its colour (the game colours the name).
- The game keeps the rolling, the tooltips, the timer's count, the stacking (GroupLootContainer, 100 apart) and the frames' logic.

## In game (2026-09-29)

A stand-in roll (GetLootRollItemInfo replaced from the chat for one look, then a /reload): the toast, the blue border and ring and
name for a rare item, the dice and the red Pass, Greed grey when it can't be chosen. First look: the buttons blank (the normal
texture was also set as the disabled one, and a button hides its disabled texture while enabled): each has its own now. Not
tried: a real roll with the companions (the timer running, a click rolling).
