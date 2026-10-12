# The pet stable: Forever's PetStableFrame for 1.14.2

Built 2026-09-29 (session 35, unattended; the P3 list's item 22). ForeverUI 0.106.0, skin part `petstable`, `SkinPetStable.lua`.
Sources: the user's Forever shot 2026-09-27 06:17:32 (Alassin, Darnassus; `_Inbox/_Old/Session 10`); 1.14.2's `PetStable.xml`
(804723) and `PetStable.lua` (804730). Forever's own file (`[Family]\PetStable.xml`) is not in the code dump.

## Forever and 1.14.2

The shot is vanilla's layout at vanilla's places: every piece Forever shows (the pet's name and loyalty under the title, the
model, Current Pet and the two stabled slots, "Do you wish to purchase another stable slot?", the cost, Purchase, the money) sits
where 1.14.2's anchors put it inside the vanilla frame's visible 350 x 437. What differs is Camelot's chrome: the metal frame with
the stable master in the gold ring, "Stables" as the title, the model on a dark inset with grey square rotate buttons, the lower
half on its own inset, the red Purchase button, the money in a coin box along the bottom.

## The skin

- The parchment at alpha 0; the window trimmed from 384 x 512 to 348 x 437 (its old hit rect); the five pieces anchored to its
  bottom or right (the slot and cost texts, Current Pet, Purchase; the money goes in the coin box) moved by the difference so they
  stay where they were.
- The rock, two marble insets (the model's from -60 to -300, the lower half's to 28 above the bottom), the metal frame with the
  game's portrait in the ring (the game sets it to the stable master), "Stables" as the title, the level and loyalty lines under it.
- The model fills its inset; the rotate buttons are 26 px grey squares with Forever's rotate icons; the slots on the bag slot art;
  Purchase in red; the money in the coin box; the red close button and the settings arrow.
- The game keeps the stabling, the slots' clicks and tooltips, the model, the texts and the money. The pet events stay off while
  the stable is hidden (the client here never learns the pet's family: HermesProxy).

## DialogueUI

The stable opened from DialogueUI closed itself at once (the UI hidden while talking): fixed in the DialogueUI port
(docs/addons/dialogue-voice-port.md, log 2026-09-29).

## In game (2026-09-29)

At Alassin (teleported to him): talk, option 1: the stable as the Forever shot (Sushii, level 57 owl, loyalty 6 Best Friend).
Not tried: stabling a pet, buying a slot (it would spend the user's gold).

## Forever's new stables art (session 51, ForeverUI 0.207.0)

Forever's build 1.60.1.70170 (2026-10-01) added stables art no code uses yet (docs/research/forever-builds/forever-70170-ui.md).
The user asked for a preview with it, then into the game. The layout is ours, read from the art: three bands 428 wide (subheader
51, the stable 306, the footer 151, a 9 px divider), so the window grows to 440 x 545.

- Art: `tools/asset-extract/stables_art.py` (the cut PNGs of the new build, 2x where there is one, into Art as TGA with their
  Atlas.lua lines; the art tool reads the older atlas tables). Preview: `tools/asset-extract/stables_preview.py`
  (http://localhost:8777/ui-forever/stables/).
- Layout (SkinPetStable.lua): the bands at x 6 from y 22; the name and level 9 into the subheader, the loyalty under it (the
  game's anchor); the model over the stable down to 16 above the XP bar; the rotate buttons at the stable's top left (+10); the
  pet XP bar (frame 322 x 25, track and fill 315 x 18) centred 22 above the divider, shown for the current pet only (1.14.2's
  GetPetExperience; a stabled pet's XP isn't known); the slots centred at x 120, 250, 302, 48 into the footer, their labels 14
  above; the purchase line 80 into the footer, Cost at (76, 104), Purchase at the right (-75, 99); the coin box along the bottom.
- Slot frames after every PetStable_Update: Current Pet copper (`ui-stables-pet-frame-current-c60`) with its glow behind; a
  bought slot bronze (`-stabled-c60`), a slot not bought iron (`-locked-c60`, the paw at 0.45; the game's red tint dropped); the
  paw print (`ui-stables-pet-icon-unlocked-c60`) under an empty slot.
