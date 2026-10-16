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

## The redesign for one player (session 81, a preview)

The user: “Look for artwork we can use for the Battleground preview to use as a big hero image with text overlayed. Since we're
playing solo, we don't need this huge area for selection. Make the first available small and move it down.” The preview:
http://localhost:8777/dbsite/mockups/battlegrounds/ (dbsite/build/win_lfg.py). Not in the game yet.

- **The hero:** the battleground’s painting across the top (340 × 170, 2:1), fading into the rock from its middle down; its name
  (22 px gold), “10 against 10 · From level 10” and the description over the fade and under it. The paintings
  (`tools/asset-extract/battleground_hero_art.py` → `Art/Battlegrounds/hero-<bg>.tga`, 512 × 256, private): since session 82 the
  user’s own 2:1 heroes (`(private files)`, made from their loading screen
  paintings); before them, and still the fallback, Warsong Gulch and Arathi Basin cut from WoW Forever’s wide loading screens and
  Alterac Valley (no screen of its own in any client) from vanilla’s PvP loading screen.
  Forever itself has no battleground queue to copy (its PvP UI is excluded from the Camelot game type).
- **Under it, small:** “Instance” and a dropdown (First Available, or a numbered instance), your marks of that battleground (its
  icon and count), the side’s reputation for it as the character window’s bar in its standing’s colour.
- **The queue’s state** in a line, then Cancel / Join as Group (grey while you’re not in a group) / Join Battle, Cancel left.
- Both sides alike (the preview’s Side switch).
