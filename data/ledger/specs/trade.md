# The trade window: Forever's TradeFrame for 1.14.2

Built 2026-09-29 (session 35, unattended; the P3 list's item 25). ForeverUI 0.109.0, skin part `trade` (in `SkinMerchant.lua`).
Sources: Forever's `Blizzard_UIPanels_Game\Mainline\TradeFrame.xml`; 1.14.2's `TradeFrame.xml` (804830); Forever's atlas table.
No Forever shot of the trade window.

## Forever and 1.14.2

The same ButtonFrameTemplate window, 344 x 446 (1.14.2 took it from retail): your six slots and money on the left, theirs on the
right past the divider, "Will not be traded" slots, Trade and Cancel. The divider's corner and edge (`UI-Frame-BotCornerLeft`,
`!UI-Frame-LeftTile`) are the same classic files in both games. Forever's differences: Camelot's metal; the other trader's
portrait in a `RecipientOverlay` over the frame, 2 px right of 1.14.2's, in the metal ring (`UI-Frame-PortraitMetal-CornerTopLeft`
at (-8, 9)) where 1.14.2 has the gold `UI-Frame-Portrait`; both names on a HIGH frame (over the metal).

## The skin

`ns.SkinButtonFrame` (your portrait in the ring, the red close button); an overlay over the metal holding the other trader's
portrait (moved to (-178, 7)), its metal ring and both names; the gold ring at alpha 0; Trade and Cancel in red; the settings arrow.

## In game (2026-09-29)

Shown from the chat (`ShowUIPanel`, both portraits set to Sashimii's, "Konrad" as the other name; no trade partner at hand): the
metal, both rings, both names over the metal. Not tried: a real trade.
