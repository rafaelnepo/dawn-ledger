# Edit Mode in the game menu: the study and what ForeverUI does (0.99.0)

Asked 2026-09-28 evening (the user, unattended: "study if it's possible to have the edit UI functionality as part of the game
menu"). Sources: Forever's own Edit Mode (`(private files)`: shared,
mainline and camelot; `blizzard_gamemenu/shared/gamemenuframe.lua`), 1.14.2's own FrameXML (UIParent.lua 4216112: the top frames
and the managed positions; PlayerFrame.lua 804733 and TargetFrame.lua 4216172: their drags).

## What Forever has

Forever's Edit Mode is retail's (Blizzard_EditMode, Dragonflight's): the game menu shows an **Edit Mode** button
(`HUD_EDIT_MODE_MENU`, right after AddOns, when `EditModeManagerFrame:CanEnterEditMode()`); it opens a dialog at the top of the
screen with a layout dropdown (several layouts per account and per character, presets "Modern" and "Classic", import and
export as a string), **Show Grid** with a spacing slider, **Enable Snap** (magnetism: frames snap to each other's edges and to
the screen's centre lines), **Enable Advanced Options**, and a list of systems by category: Frames (Action Bars 1-8, Cast Bar,
Encounter Bar, Extra Abilities, Buffs and Debuffs, Talking Head, Vehicle Leave Button, Hud Tooltip, Status Tracking Bars...),
Combat (Boss Frames, Arena Frames, Loot Frame, Party Frames, Raid Frames, Loss of Control, Personal Resource Display, Damage
Meter...) and Misc (Minimap, Objective Tracker, Durability, Micro Menu, Bags, Chat Frame, Group Finder eye, Timer Bars,
Cooldown Viewer...). Every system is a frame with `EditModeSystemMixin`: when Edit Mode is active it draws a selection box over
itself, can be dragged (the arrow keys nudge it), and shows a settings dialog with its own options (scale, orientation, rows,
columns, icon size, which auras, the party frames' style...). The client saves the layouts (`C_EditMode.SaveLayouts`), and every
system re-applies its saved anchor and settings at login and whenever the game re-lays things (`EditModeManagerFrame:
UpdateBottomActionBarPositions`, the top frames, the right action bars). Camelot's own overrides hide the systems that do not
exist in its world (arena frames, archaeology, encounter events, the talking head, the vehicle seat indicator) and keep its
bottom bar anchored to the micro menu (`camelot/editmodepresetlayoutconstants.lua`, what docs/specs/bottom-bar.md follows).

## What 1.14.2 offers an addon

There is no Edit Mode and no `C_EditMode`. What exists:

- Every frame can be moved by an addon: `SetMovable(true)`, `StartMoving()`, `StopMovingOrSizing()`, `ClearAllPoints()`,
  `SetPoint()`. The unit frames and the action bars are protected (secure templates), so those calls fail in combat; out of
  combat they are fine (the game itself drags PlayerFrame and TargetFrame this way: `PlayerFrame_OnDragStart` and
  `TargetFrame_OnDragStart` call `StartMoving` and `SetUserPlaced(true)`).
- `SetUserPlaced(true)` makes the client keep a frame's place in its layout cache, and 1.14.2's `UIParent_UpdateTopFramePositions`
  leaves a user-placed PlayerFrame and TargetFrame alone. Other frames are placed again by the game at its own moments:
  `UIParent_UpdateTopFramePositions` anchors the BuffFrame to the minimap, `UIParent_ManageFramePositions` places the quest
  tracker, the durability frame, the pet bar, the party frames' manager; the action bars are laid by MainMenuBar's own code
  (ForeverUI's bottom bar re-lays them after, docs/specs/bottom-bar.md).
- Saved variables (ForeverUIDB) keep our own layout; a hook after each of the game's placing functions sets ours again.
- Scale: `SetScale` on the unit frames is protected in combat too but fine outside; not done in 0.99.0.

So yes: an Edit Mode in the game menu is possible as an addon feature, for everything that is a frame and that the game does not
re-lay from secure code in combat. The limits: nothing moves in combat (Forever's client can, from its secure Edit Mode); the
systems that ForeverUI lays itself (the bottom bar's action bars, micro menu and bags) need their own hooks to be movable, not
done yet; no per-system options yet; one layout.

## What ForeverUI 0.99.0 does (`EditUI.lua`)

- **The game menu's button**: "Edit Mode" (Forever's wording) under Key Bindings in the settings group (SkinGameMenu.lua lays it
  with the game's buttons, in the red button's art). It closes the menu and opens Edit Mode. `/fui edit` too.
- **The bar** at the top of the screen (560 x 92, Forever's diamond-metal dialog with the "Edit Mode" header): **Show grid**
  (a line every 32 units, the screen's centre lines in gold), **Snap to grid** (a released frame's top left rounded to the grid),
  **Reset** (the game's own places back, the layout forgotten), **Save**, **Cancel**; a hint line that names the selected frame.
  Escape closes it as Cancel (the frame is in UISpecialFrames).
- **The boxes**: one translucent box over each frame that can move, named (Player frame, Target frame, Party frames, Minimap,
  Buffs, Cast bar, Quest tracker), gold when selected; a hidden frame's box is faint where the frame would be. Drag the box: the
  frame goes with it (`StartMoving` on the frame itself, so its children follow: the pet with the player, the target's target
  with the target, the members with the first party frame, the buffs with the minimap unless moved on their own).
- **The places** are kept in `ForeverUIDB.editUI` (each frame's TOPLEFT from the screen's bottom left, as the windows' places)
  and set at every login and after the game's own placing: the player and target frames are marked user-placed (the game leaves
  them), the buffs are set again after `UIParent_UpdateTopFramePositions`, the tracker and the party after
  `UIParent_ManageFramePositions`. A place set in a fight waits for its end; Edit Mode does not open in a fight ("Edit Mode
  waits for the end of the fight.").

Not done (next steps, in Forever's order of usefulness): the bottom bar as a system (the whole row, then bar 2 and 3, the pet bar
and the XP bar apart), scale per frame, several layouts with names, snapping to other frames' edges, nudging with the arrow keys,
the chat frame (the game's own unlock exists), the durability frame. The wording is in docs/copywriting/changes.md.

## Checks

Offline: `addons/tests/foreverui/44-edit-ui.lua` (the stub's minimap, tracker and the game's placing functions in
`addons/tests/stub/31-editui.lua`): the button, the bar, the boxes, a drag snapped and unsnapped, the grid, Save, the places kept
over the game's placing, Cancel, Escape, Reset, combat. In game: checklist 162.

## Fixes 2026-09-28 night (the user's shot: the grid stayed after Escape)

Cancel put every frame back and set its user-placed flag; SetUserPlaced throws on a frame that isn't movable (the tracker, the
buffs, the cast bar, the minimap), so Cancel stopped before hiding the grid. Now each frame is put back in its own pcall, the
flag only for the systems that use it (the player and target frames), and the leaving always happens. The stub's SetUserPlaced
throws the same way. When the minimap's size changes, its saved place and the tracker's are dropped once
(`ns.MigrateMinimapEditPlaces`, the size in ForeverUIDB.minimapEditSize).

## The first look in game (2026-09-28 late night, session 35)

Passed: the game menu's button, the bar, the grid, the boxes, a drag (gold, snapped, the hint names the frame), Escape undoing it
with no grid left. "Snap to grid" ran into Reset at 560: the bar is 600 wide, the second box 100 right of the first.

## 2026-09-29 (session 38): Forever's HUD Edit Mode

The top bar was replaced by Forever's own layout (Blizzard_EditMode: EditModeManagerFrame, EditModeSystemSettingsDialog; read
from (private files) the user's Forever shot CleanShot 2026-09-28 at
20.16.41). Previewed first (tools/asset-extract/editmode_preview.py, approved by the user), then built in EditUI.lua:

- The panel: 510 wide, DialogBorderTranslucentTemplate (the Dialog frame, black at 0.8), TOP -100, draggable (ns.db.editPanel).
  Show Grid + the spacing slider (16-64, ns.db.editGridSize), Snap to Grid, the three groups of checkboxes, Revert All Changes,
  Save, the close button.
- A difference from Forever, asked by the user: a system's checkbox shows or hides the frame in the game (Forever: which boxes Edit
  Mode shows). Hidden = parented to ForeverUIHiddenFrames (ForeverUIDB.editHidden); protected frames wait for the end of a fight.
- The settings box (300 wide) per system; the settings are declared on each system in SYSTEMS (slider / check / dropdown, stored
  in ForeverUIDB.editSettings unless the setting reads and writes the game itself: the chat's size, the tooltip's two options).
  Sizes are the frame's scale; a placed frame's place stays in screen units (EditUI.Place divides by the frame's scale).
- Revert Changes (one system), Revert All Changes, the close button / Escape (everything back and leave), Save (keep and leave).

Then (0.141.1, the user's shot): the panel across (Frames one column, Combat and Misc two each, six rows at most; the grid row
on one line), an unticked system's box hidden in Edit Mode, and the width settings in grid steps (a setting with `grid = true`:
from one square to the most that fits its maximum, a square a step; the grid slider re-steps an open settings box).
