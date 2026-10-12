# The Key Bindings window: a Mac keyboard, Forever's list

Built 2026-09-30 (ForeverUI 0.175.0, KeyBindings.lua; the preview ui-forever/keybindings/, tools/asset-extract/keybinds_preview.py).
The user: "For Key Bindings, we will have a default menu with a full keyboard mockup along with hover over keys etc. Then add on
the right for the menus for Movement Keys, Chat, Action Bar etc."; its own window from the game menu; a Mac keyboard.

## Forever

No keyboard. Its Keybindings category (docs/specs/forever-settings-ingame.md, the shot 13.13.46): "Character Specific
Keybindings", Click Casting and Quick Keybind Mode (neither exists in 1.14.2), then the sections as collapsible bars in this order:
Movement Keys, Interface Panel, Action Bar, Action Bar 2-8, Chat, Targeting, Target Markers, Vehicle Controls, Camera, Ping
System, Miscellaneous; each row its label and two binding buttons ("Not Bound").

## Ours

- The window: Forever's metal frame (no portrait), 0.83 scale as the Options window, two panes.
- Left: an Apple keyboard (esc and F1-F12; the number row to delete; tab, caps lock, return, the two shifts; fn, control, option,
  command, space, command, option; the arrows as an inverted T), 44 units a key, in Forever's dark button art (common-dropdown-c-
  button, its ends kept). Each key: its name top-left, what it does at the bottom (GetBindingAction), a line in its section's
  colour; an action bar key shows its action's icon instead (GetActionTexture of the button's action; the pet and stance bars
  too). fn, command and caps lock are greyed (the game can't bind them here). A legend of the colours, then the mouse: Left,
  Right, Middle, Button 4, Button 5, Wheel Up, Wheel Down.
- Hover a key: its name, then what it does alone and with Shift, Ctrl, Option and their pairs. Click Shift, Ctrl or Option: the
  keys show that layer (holding them shows it too, MODIFIER_STATE_CHANGED). Click a key: its actions light up in the list, their
  sections opened, scrolled to.
- Right: Character Specific Keybindings (SaveBindings(2); unticked: LoadBindings(1) then SaveBindings(1)), a search box, the
  sections in Forever's order (1.14.2's Extra Action Bars split as Action Bar 2-5; Debug left out; another addon's bindings in a
  section of its own after, by its header's name), ns.CreateHeaderRow bars with a colour swatch and + / -.
- Binding: a binding button, then a key pressed (with its modifiers, ALT-CTRL-SHIFT- as the game writes them), a key or mouse
  button clicked on the keyboard (in the layer shown), a mouse button clicked on the waiting button, or the wheel; the key's old
  action loses it (SetBinding), the command's old key in that slot is freed, SaveBindings(the current set). Escape cancels.
  Unbind Key frees the waiting button's key. Defaults: a second click within 4 s confirms (no StaticPopupDialogs entry: an addon
  must not assign that game global), then LoadBindings(0) and save.
- In a fight nothing binds (SetBinding is protected then): the wait is cancelled at PLAYER_REGEN_DISABLED, the buttons greyed, a
  red note.
- /fui keys; the game menu's Key Bindings; the Options window's Keybindings category (its "Open Key Bindings").

## 0.176.0: compact, both platforms, groups (the user, 2026-09-30)

- The header (the top bar): Mac / Windows (shared with Options: `ns.Platform`, `ns.db.platform`), Show Navigation (the Insert /
  Home / Page block; on Windows its arrows too, on the Mac the arrows stay in the keyboard), Show Keypad (Apple's: clear, =, /, *;
  a PC's number pad). The window opens on the main keyboard alone; each block is placed after the ones shown and the window grows.
  Windows' keyboard: tenkeyless (Ctrl, Win, Alt, Menu), its names (Backspace, Enter, Alt).
- The list's sections have separators (labels with a line, not collapsible): Movement (Moving, Running, Pitch, Posture),
  Interface Panel (Windows, Bags, Game), Action Bar (Action Buttons, Pet Bar, Stance Bar, Pages), Chat (Typing, Scrolling, Combat
  Log), Targeting (Enemies, Friends, Party, Nameplates, Actions), Camera (View, Set Views, Save Views, Reset Views, Camera); the
  actions gathered by group, in the game's order within one.
- The binding names come from the game's strings (BINDING_NAME_...): 1.14.2's GetBindingText gave the command back ("OPENCHAT").

## 0.177.2-0.178.0: slimmer (the user, 2026-09-30)

- The header: Mac / Windows, Show Navigation, Show Keypad, Show Mouse (the keyboard hidden, the mouse's seven buttons in its place:
  the thumb's 5 over 4, Left, the wheel's Up / Middle / Down, Right; the window keeps its size, Navigation and Keypad off). The
  colour legend is gone (the list's sections carry the colours). Character Specific centred on the header's buttons.
- Under "Showing the keys alone" a hint: "Hold Shift, Ctrl or Option to see what each key does with it. Click a key to find it in
  the list." (Alt on Windows). The key caps' letters a light parchment grey (0.82, 0.79, 0.72), no longer the disabled grey.
- The list 268 wide: the name (124) and one binding button (112). Show Second Keys (the bottom bar, by Close) brings the second
  column back (116 wider); with it hidden a "+1" marks a button whose action has a second key, its tooltip names it.
- The list's names (`KB.ListName`) drop the word their group's label already says (Zoom In under Minimap, Nearest / Prev. Player
  under Enemies and Friends, Friendly under Nameplates, Page 1 / Next Page under Pages, View 1 under the view groups); the keys'
  tooltips keep the fuller `KB.DisplayName` (Minimap Zoom In, Nearest Enemy). Both: Item Comparison, Master Vol. Up / Down,
  Prev. ... Player, Party 1, Interact Mouseover, Sheathe Weapon, Guild, Framerate, Graphics, Slash Command.
- Icons: the Target Markers the game's own (UI-RaidTargetingIcon_1-8) before their names and on their keys; the binding buttons'
  modifiers and mouse buttons drawn by us (addons/ForeverUI/Icons/, tools/asset-extract/key_icons_art.py; a first set from
  Hugeicons read as hairlines at 12 px and was replaced): on a Mac ⌃ ⌥ ⇧ before the key as its menus write them; on Windows Ctrl+ / Alt+ as
  words and ⇧; the mouse's left / right / wheel. The Mac keyboard's modifier keys show their symbol before the word.
- The window 60 taller (EXTRA_H), the keyboard 14 lower (the hint's line).
- Fix: a section header's name jumped back over its swatch after a click (Widgets' header row nudged it to a fixed 10; now `nameX`).

## 0.180.1: the keys' text, drawn icons (the user, 2026-09-30)

- A key's name sits at its bottom right in Friz Quadrata 11 with an outline (the game's fonts have no bold), 80% opaque; what it
  does at its top left in the small gold font, wrapping above the name. The icons (Shift, Control, Option, Command, the mouse's
  left / right / wheel, the arrow keys' triangles) are our own solid drawings. The keys 69 a unit at most.

## 0.181.0-0.182.0: keyboard, mouse and controller (the user, 2026-09-30)

- The header: Mac / Windows, then the views **Keyboard | Mouse | Controller** (Show Mouse became a tab), then **Generic | Branded**
  (the drawn keys and cards, or the devices' real pictures; Branded by default), then Show Navigation / Show Keypad (the drawn
  keyboard only). ns.db.kbView, ns.db.kbGeneric.
- **Branded keyboard** (Mac): the MX Keys Mini for Mac (the user's), Logitech's graphite render (OpenLogi's asset packages, local
  only) in Art/Devices; each key's box found on the pale render (tools/asset-extract/logi_art.py, the boxes in Devices.lua) and our
  key laid on it: a bound key darkened (0.86) under its action and name, a free key the photo's own legend. Windows: the drawn
  keyboard until a Windows keyboard's picture is added. The user's idea kept for later: the keyboard's left half (combat,
  movement, skills) and right half (windows) apart, if the keys come out too small.
- **Branded mouse**: the MX Master 4's side, a card per button (left, right, middle, the wheel up / down, back, forward) with a line
  to it; Gesture, Mode Shift, Thumb Wheel and the Haptic Panel greyed "set in OpenLogi" (the game never sees them: OpenLogi can send
  a key from them, bound here).
- **Controller**: the pad's picture (ConsolePort's DualSense / DualShock 4 / Xbox, chosen by the pad's name, Art/Pads) and a card per
  button (Forever's glyph, what it does in the layer shown) with a line to it; Generic: the cards alone in two columns, the left
  hand's and the right's. The cards of the buttons that hold Shift / Ctrl (GamePadEmulateShift / Ctrl) show that layer when clicked.
  The list shows each action's pad buttons in this view (the keyboard's and mouse's in the other two); a binding button waiting
  takes a pad press (EnableGamePadButton, OnGamePadButtonDown), the modifiers' buttons ignored, GamePadEmulateEsc cancels.
- Gamepad.lua: /fui gamepad forever (Forever's layout: Cross jumps, the face buttons and the D-pad actions 1-7, L2 held 8-12 and
  Bar 2's 1-3, R2 held Bar 2's 4-11, L1 / R1 nearest friend / enemy, L3 autorun, R3 interact, Options the menu, Create the bags,
  the touchpad Esc; L2 = Shift, R2 = Ctrl) and /fui gamepad reset (the keys and settings back, the pad left on); the action bars'
  hotkeys show the pad's glyphs while the pad is on (a hook on ActionButton_UpdateHotkeys).

## The pictures and their sources (credits)

Kept local (the uncommitted Art/), never published:
- **Generic mouse:** "Gaming Mouse Outline Icon", **Vecteezy.com** (Free License: credit Vecteezy.com), the user's download, as a white
  outline (tools/asset-extract/mouse_eps_art.py; the EPS and its licence note in (private files)).
- **Generic controller:** a DualSense line drawing from SVG Repo (dualsense-svgrepo-com.svg, the user's download; the file states no
  licence: kept local), our outline colour (pad_svg_art.py).
- **Branded devices:** Logitech's renders of the MX Keys Mini for Mac and the MX Master 4 (OpenLogi's @logi-assets packages,
  UNLICENSED: Logitech's), logi_art.py; the pads' pictures from ConsolePort (Artistic-2.0), pad_art.py; the button glyphs and ring
  art from WoW Forever's own files.
Committed, ours: the icons in Icons/ (key_icons_art.py).
