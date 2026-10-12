# The inspect window and the dressing room

Built 2026-09-29 (session 35, unattended; the P3 list's item 29). ForeverUI 0.113.0, skin parts `inspect` and `dressup` (in
`Character.lua`). Sources: Forever's `Blizzard_InspectUI\Camelot` (InspectFrame, InspectPaperDollFrame) and its dressing room
(`Mainline\DressUpFrames.xml`, retail's); 1.14.2's `Blizzard_InspectUI` (4216121, 4216450) and `DressUpFrame` (937636). No shots.

## Forever and 1.14.2

- **Inspect.** Forever's Camelot inspect window is vanilla's layout (slots down both sides of the model, the weapons below) as a
  ButtonFrameTemplate in Camelot's pieces with the gear-slot art (`UI-Character-Info-GearSlot`) and the name as the title.
  1.14.2's is vanilla's 384 x 512 character art (visible 348 x 437) with the name on a plate, Character / Honor tabs.
- **Dressing room.** Forever's is retail's (outfits, a minimizable frame): not rebuilt. 1.14.2's is vanilla's art round the race's
  backdrop and the model, the title, Reset and Close.

## The skin

- Inspect: the paper doll's four art pieces out; the rock and a marble inset; Camelot's metal over the visible 348 x 437 (the frame
  keeps its size: the game anchors everything to it) with the inspected player in the ring and their name as the title (the plate
  out); Forever's slot frames (55 px) behind the game's slots; the grey square rotate buttons (the stable's helper, now
  `ns.SkinSquareButton`); Forever's tabs under the metal; the red close button; the settings arrow. The Honor page keeps its art.
- Dressing room: the same, the race backdrop kept as the model's background; "Dressing Room" on the metal; Reset and Close red.

## In game (2026-09-29)

`InspectUnit("party1")`: Merellylah's gear round her model, as described. `DressUpItemLink` on Sashimii's chest: the dressing
room as described. Not tried: the Honor tab, a player's inspect at range.
