# The HUD: tracking and range around you (session 55)

The user, after FarmHud: "If we change it to Hunter Tracking, and use the same ring distance for range, but in the HUD, it would
be great for hunters." Preview: tools/asset-extract/hunter_hud_preview.py -> http://localhost:8777/ui-forever/hunter-hud/; the user
chose option C, "the bow and melee rings a little bit more subtle ... Some opacity is good because it will be always in the
screen", and the ` key.

## Built (ForeverUI 0.231.0, SkinMinimap.lua)

- The game's minimap moved into a frame 80% of the screen's height in its middle; `Minimap:SetAlpha(0)` hides the ground and keeps
  the blips (FarmHud's way); clicks go through. A stand-in keeps every skin piece anchored to the minimap where it was; the
  minimap's own children are faded while it's open; closing puts everything back.
- The rings, drawn on the HUD with line pieces: the main spell's reach in the class's colour at 0.4, the sword's 10 yards in a
  muted red at 0.3 (classes with a ranged spell), the edge where tracking ends in white at 0.12; the compass letters (N, NE, ...)
  at 0.55 on the reach ring, turned with a rotating minimap. Sized from the minimap's yards per zoom (inside and outdoors).
- ` toggles it (a fixed key of ours, ns.bindingProviders); `/fui hud` too. Tests: 99-hud.lua.

## Next: gathering (the user: "Lets also plan to use this hud for gathering professions!")

- Find Herbs and Find Minerals already show on it: the game's own node blips, as Track Beasts' dots.
- Our own nodes on it: the gathering map's known nodes (GatherNodes.lua, the map pins) drawn on the HUD as their icons, coloured
  by the skill they ask (GatherJournal's orange / yellow / green / grey), placed from the player's map position and the zone's
  size in yards, so nodes not yet in tracking range (or another profession's) show too, faded with distance.
- The rings by what you do: a gatherer without a ranged spell gets no reach ring; tracking herbs or minerals could swap the
  hunter's rings for the nodes (a choice for the user), the edge kept.
- A preview first (over a shot in a herb-rich zone), then the build.

## Rotation: the player's choice (0.235.18, session 58)

The user: “Add minimap setting to stop minimap from rotating. But when activating the HUD, it activating the rotation in the HUD
and disables when the hud is closed.” `ns.db.minimapRotate` (off by default) is the minimap's rotation: **Rotate the minimap** in
the minimap's settings menu (`ns.ShowMinimapSettings`); the Options window's Rotate Minimap (the game's `rotateMinimap`) is followed
while the HUD is closed (a hook on SetCVar). The HUD sets `rotateMinimap` on while open; on closing, at login and after a reload the
choice is put back (`ns.ApplyMinimapRotation`): a reload with the HUD open used to leave the minimap turning.
