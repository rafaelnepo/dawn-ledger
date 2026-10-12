# Place Objects: the GM's decorating window

Session 70 (2026-10-09). The user: “a window with objects i can add as well ... navigate, choose and place and save or delete”;
a curated catalogue; GM characters only. It grows from the small panel already in game (`GMSuite.lua`, the section
“-- ---------- Place Objects”: Nearest, Face My Way, Move Here; `/fui place`), keeping that panel's behaviour. Web preview first:
`dbsite/build/win_placeobjects.py` (http://127.0.0.1:8777/dbsite/mockups/placeobjects/), approved ("Looks good"). Built in game
in Forever UI 0.259.0 (below, "In game"); not yet seen there.

## What it does

Pick a decoration from a catalogue, set it down in front of you, nudge and turn it into place, or pick an object already in the
world and move, turn or delete it. Every change goes to the server at once (the GM commands save as they run); the window lists
the session's changes with Undo. Making them permanent happens outside the game (below): there is no Save button.

## Layout

One window in `ns.CreateDialogChrome` (Forever's diamond metal, opaque; title “Place Objects”, header 160), about 820 × 640 UI
units, movable, closes with Escape. Two halves:

**Left: the catalogue**

- The sides as the top level, the Alliance first, then the Horde, then Neutral; each side's peoples under it, with their counts
  (the auction house's category rows: a side's row picks its first people):
  Alliance: Humans, Dwarves, Gnomes, Night Elves. Horde: Orcs, Tauren, Trolls, Forsaken. Neutral: Goblins, Wild Peoples,
  Everyday, Festivals.
- An object of two peoples shows under both, on purpose (an orc brazier under Orcs and Trolls; a human bookshelf under Humans
  and Forsaken); the counts count it in each.
- **Where it stands**: a dropdown with steppers between the model box and the list, “Stands in: Anywhere”. Opened, the list
  shows the places instead: Anywhere, then Cities (the six capitals), then Zones (A to Z), each with how many of the catalogue's
  objects stand there; a click picks one. A place combines with the side and people (their counts become the counts there) and
  with the search. With a place chosen, each row shows how many times it stands there in grey (“×193”), and the list's Filter
  offers Sort by Name (the kinds as headers) or Most in <place> First (one list, the most first); its red X goes back to
  Anywhere. Data: `tools/server-data/decor_zones.py` (the 1.12 map tiles and buildings) writes the catalogue's `zones` and each
  item's `zones` {place: count}.
- The model box: the chosen object turning slowly (about 30 seconds a round; dragging turns it by hand), its name, its peoples,
  kind and display, its object id and the template's own name.
- The list (Professions.lua's list): a search box (it looks through every people: names, kinds, peoples, template names), the
  kinds as folding headers with their counts, the names. An object with no server template yet stays in the list, grey, with
  “Needs patch” at its right; the caption says “Needs the decorations patch first” and Place Here stays greyed.
- Under the peoples: **From Above**, a small sketch, north up: you (a dot and your facing), the ring of the distance choice and
  the spot ahead, the object in hand (its footprint from the display's bounding box and an arrow for its front), the other
  objects near you as dots.

**Right: the object in hand**

- **In Hand**: its name; “GUID 5400211 · 2 of 6 · bearing 197°”. **Nearest** (left) picks the nearest object; pressed again on
  the same spot (within 3 yards) it steps to the next one. **Delete** (right) asks first.
- **Place and Move**: the distance, four switches: At My Feet, 2 Yards, 4 Yards, 8 Yards (the user got stuck inside tents placed
  at their feet; 2 yards is the default). A line names the chosen object and the spot (“Hide Tent, 4 yards ahead”). **Move Here**
  (left) moves the object in hand there; **Place Here** (right, gold: the main action) sets down a new one of the catalogue's
  choice there.
- **Nudge**: a pad, North, West, East, South, and Up, Down beside it; the step: 0.25, 0.5 (default), 1, 2 yards.
- **Turn**: Left 45°, Left 15°, Right 15°, Right 45°; Face Me, Face Away; Bearing (degrees: 0 north, 90 east) and Set (Enter
  sets it too). Only turning about the upright axis: `.gobject turn` sets the yaw.
- **Shrink Me**: a switch, you at half size for tight spots (between tents, under awnings); off, your own size again.
- **This Session**: every add, move, nudge, turn and delete, newest first, each with Forever's undo arrow. The newest change of
  each object can be undone; an older one waits (its tooltip: “Undo the newer change to this object first.”). An undone line stays,
  struck through. Under it: “These changes are live on the server now. Claude makes them permanent by writing them into the next
  world patch.” and **Copy Summary** (the lines as text, for the chat with Claude).

Buttons: the main action on the right of its row, Back or Cancel on the left. The Delete question is `FUI.staticPopup` /
`StaticPopup`: “Delete Hide Tent (GUID 5400202) from the world?”, Cancel left, Delete right.

## The commands

Sent as whispers to yourself (`SendChatMessage(cmd, "WHISPER", nil, UnitName("player"))`, as today); the server's answers are
read back from `CHAT_MSG_SYSTEM` only while one is awaited (3 seconds).

| Button | Command | Read back |
|---|---|---|
| Nearest | `.gobject near 20` | each line's `\|Hgameobject:guid:id\|h[Name X:...` (mangos_string 517), nearest first |
| Place Here | `.gobject add <id>`, then (not At My Feet) `.gobject move <guid> <id> <x> <y> <z>` | the new GUID from the add's line |
| Move Here | `.gobject move <guid> <id>` at your feet, or `.gobject move <guid> <id> <x> <y> <z>` ahead | “(GUID: n) moved” |
| Nudge | `.gobject move <guid> <id> <x> <y> <z>` (the object's place ± the step) | “moved” |
| Turn, Face Me, Face Away, Set | `.gobject turn <guid> <id> <o>` (o in radians) | “(GUID: n) turned” |
| Delete | `.gobject delete <guid>` | “removed” |
| Shrink Me | `.modify scale 0.5` / `.modify scale 1` | |
| Undo | the inverse: a delete for an add, a move or turn back to the old values, an add + move + turn for a delete (a new GUID; the object's older lines follow it) | |

The guid and the object's id go together (the server's parser reads the pair; the guid alone gave its Syntax line, session 70).
The window keeps each object's last known place and facing (from the near line, then from its own commands) for the nudges, the
turns and Undo.

**The spot ahead**: `x, y, z = UnitPosition("player")` (1.14.2 returns y, x: check the order in game), `f = GetPlayerFacing()`;
spot = (x + d · cos f, y + d · sin f, z). WoW's facing 0 is north and grows counter-clockwise (toward west); the world's x points
north, y west. The ground under a spot ahead may be higher or lower than your feet: the nudge's Up and Down mend it.

**Turns**: Left n° = o + n · π / 180, Right n° = o − n · π / 180, both kept in 0 … 2π. Face Me: o = atan2(py − oy, px − ox); Face
Away: that + π. The bearing field is a compass bearing (clockwise): o = 2π − bearing · π / 180.

## The catalogue and the decorations patch

`tools/server-data/decor_catalog.py` writes `(private files)`: {sides, groups, ownBase, items:
[{display, name, groups, sides, kind, path, template, templateType, templateName}]} (586 items). The in-game window reads it as Lua:
`tools/server-data/decor_lua.py` writes `addons/ForeverUI/PlaceObjectsData.lua` (`ns.PlaceCatalog`: the sides, the peoples, the
places, and one line per item: display, name, kind, the template to spawn, the 1.14.2 model's FileDataID, the footprint's length
and width, its peoples, its places with their counts, the template's own name; names and ids only). Run it after
`decor_catalog.py` and `decor_zones.py`.

The items whose `template` is null (119 at last count) have no gameobject_template showing their display: a world patch adds one
each, `entry = 510000 + display`, type 5 (generic), the display id, the catalogue's name, flags 0, size 1; with its undo
(world patch 027, `tools/server-data/decor_templates_sql.py`). In game they look like the others: Place Here sends their 5100xx
id, and until the patch is applied the server answers “Game Object (Entry: n) not found” and the window says the decorations
patch adds it (the preview's grey “Needs patch” is left out).

## Saving

The commands change the live world database at once. To keep them in every copy of the world (and in the repo), Claude writes
the session's changes into the next numbered world patch (`server/world-patches/0NN-*.sql`, with its `.undo.sql`), as world patch
026 did for Kargra's camp: the new spawns as INSERTs (the GUIDs the server gave), the moves and turns as UPDATEs (position,
orientation and the rotation quaternion's rotation2 / rotation3), the deletions as DELETEs. A tool for it,
`tools/server-data/placement_patch.py` (to come): reads the spawns changed since a time (or the GUIDs from Copy Summary) out of
the world database and writes the patch and its undo.

## Who can use it

GM accounts only (the server's `.account` answer: level 2 or more; below, “In game”). For players nothing changes.

## In game (0.259.0)

`addons/ForeverUI/PlaceObjects.lua` (after GMSuite.lua and PlaceObjectsData.lua in the TOC; the small panel's code left
GMSuite.lua), `/fui place`, `ns.OpenPlace`, `ns.PlaceFrame`. Built as the preview, with Forever UI's own parts: the dialog chrome
(strata HIGH, under the Delete pop-up), the auction house's category rows for the sides and peoples, the Professions list's
header and rows (`ns.ProfessionsUI`) with `ns.CreateSearchBox`, its Filter and red X, the Options window's dropdown with
steppers for Stands in (`ns.Options.MakeDropdown`, exported for it), red buttons (`ns.ReferenceButton`, `ns.SkinRedButton`;
Place Here gold; the distance and step switches lit as the Options window's), `ns.MinimalCheck` for Shrink Me, the talent
window's undo arrow, `ns.CreateScrollBar` for the list and This Session, `ns.SetTooltip`, `ns.BalanceLines`.

What differs from the preview, and why:

- **GM check**: the GM suite has none of its own, so the window asks the server: `.account` (a player's command, mangos_string
  11 “Your account level is: n”); 2 or more opens it, less prints why; no answer in 3 seconds prints that it opens for GM accounts
  only. Asked once a session.
- **Answers, not guesses**: every change is taken as done when the server's line comes back (`moved`, `turned`, `removed`, the
  add's GUID); the window's record of the object moves at once (quick nudges chain) and goes back if no answer comes in 3
  seconds. Only answered changes go into This Session.
- **The object's facing**: `.gobject near` gives no orientation, so picking an object sends `.gobject target <guid>` (this
  server reads a number as the spawn's GUID; mangos_string 524 has its Orientation). Left/Right turns wait for it; Face Me, Face
  Away and a bearing don't.
- **The height**: `UnitPosition("player")` gives the server's x first, then y (as GatherNodes.lua already reads it against the
  server's spawns, on the minimap in game); its z may be 0 on 1.14.2, so Move Here ahead asks `.gps` for your height (and
  facing) when it is. Place Here needs neither: the add answers with your spot, and the move ahead uses its height.
- **Move Here at your feet** reads the object back (`.gobject target`) after the move, for its height.
- **Shrink Me** sends nothing while you target someone else (`.modify scale` sizes the target): “Clear your target first”.
- **Copy Summary**: an addon can't write the clipboard, so the lines show in a box over This Session, selected, with “Press
  Cmd+C (Ctrl+C) to copy the summary, then Done.”
- **The model box**: a ModelScene actor (`SetModelByFileID`), the camera fitted to its bounding box once loaded, turning a round
  in 30 seconds, dragged to turn by hand; where the client can't draw it, a quiet line instead.
- **From Above**: the minimap's arrow for you, the footprint (GameObjectDisplayInfo.GeoBox) turned with the object's facing, four
  dots for its front, the ring of dots for the distance, the gold dot for the spot, the objects seen as grey dots; redrawn five
  times a second while open.

Tests: `addons/tests/foreverui/114-place-objects-window.lua` (113's checks moved there); the stub's
`stub/58-placeobjects.lua` (GetPlayerFacing, ModelScene and its actor).

## Open

- Seen in game: the window, the model box (does 1.14.2's ModelScene draw these doodads, and is the camera framing right), the
  sketch's directions, the .account check.
- The catalogue's names come from file names; the worst (all capitals, run-together words) need a pass in the tool.
- No tilt (pitch, roll): the server's turn sets the yaw alone.

## Move Creature Here (0.260.1, session 70)

The user: Frostsaber Rock's sabers and kits stood at its foot (world 021 placed them by the terrain; the Rock is a model), Rivern on
top. A button on the Shrink Me row, right: `.npc move` for your target (a creature; nothing is sent with no target or a player
targeted); the server brings it to your feet, facing your way, saves it at once and answers "Creature moved." (mangos_string 271).
This Session logs "Moved <name> to your feet" with no Undo: the command can only bring a creature to you. Claude reads the moves
from the database into the next world patch.
Seen in game (session 70): the moves saved at once, but the running server showed the moved sabers off the Rock's top until it
restarted (`.npc move` respawns the creature where it stands, and the live one wasn't seen on the Rock); after the restart they
stood where they were saved. So: after moving creatures onto a model's top, restart the server before judging the spot.
