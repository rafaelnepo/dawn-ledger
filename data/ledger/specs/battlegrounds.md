# The battleground queue: BattlefieldFrame in Camelot's pieces

Built 2026-09-29 (session 35, unattended; the P3 list's item 32). ForeverUI 0.116.0, skin part `battlefield` (in `SkinLFG.lua`,
the group-finding file already in the TOC). Sources: 1.14.2's `BattlefieldFrame` (2565765, 2565763); Forever's `Blizzard_PVPUI`
and `Blizzard_PVPMatch` (retail's). No Forever shot.

## Forever and 1.14.2

Forever's PvP windows are retail's (the PvP panel, the PVPMatch scoreboard): no twin. 1.14.2's queue window (a battlemaster's
list of instances, the zone's description, Join as Group / Join Battle / Cancel) is vanilla's 384 x 512 art (visible 348 x 437)
with the list on a dark field and the description in black on parchment.

## The skin

The stable's method: the art out; the rock; a marble inset under the list; Forever's quest parchment under the description (its
text is black); Camelot's metal over the visible part with the battlemaster's icon in the ring and the map's name as the title
("Battlegrounds" when the game has none: empty on this server); the buttons red; the list's bar minimal; the red close button; the
settings arrow. The scoreboard (WorldStateScoreFrame) waits: it only shows inside a battleground.

## In game (2026-09-29)

At Lylandris (Warsong Gulch, Ironforge's Hall of Arms), through DialogueUI (its battlemaster option shows the UI first): the queue
window as described; the title was empty (the map name didn't come): the fallback added after. Not tried: queueing.
