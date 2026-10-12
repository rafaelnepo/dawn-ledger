# The bottom bar: Forever's layout for 1.14.2

Started 2026-09-27 night (the user: "fix the action bar at the bottom to look like Forever's"; open item #9). Sources: the user's
four Forever shots (`(private files) Bars/`, 3024 x 1964, about 2.56 px per unit at UI scale 1) and Forever's
own code (`(private files)`: blizzard_editmode/camelot, blizzard_actionbar/camelot,
blizzard_micromenu/camelot). ForeverUI already skins the action buttons' art (SkinActionBars.lua, part A).

## What Forever shows (the shots)

From the bottom up, centred on the screen:

1. **One row:** the left gryphon, **action bar 1** (12 buttons, the page arrows and number at its left), the **micro menu**
   (the character's portrait, Professions, Spellbook, Talents, Guild, Quests "!", Legacy banner (Y, locked until a character
   reaches 25), Group finder eye, Collections horseshoe, Shop "W", Help "?"), the **bags** (the keyring-like winged slot, four
   bags, the backpack with its free-slot count), the right gryphon.
2. **The XP bar**, segmented, across the whole row's width.
3. **Above it:** the **pet bar** (ctrl-1 to ctrl-0, small buttons) at the left; **action bar 2** (12 buttons) at the right half.

Tooltips: "Spellbook (P)", "Backpack (B)" with "19 Empty Slots (Total)", "Legacy (Y)" with its level-25 line.

## Forever's numbers (camelot/editmodepresetlayoutconstants.lua)

- **Micro menu:** BOTTOM of UIParent, offset (116.5, 6). The centre of the row is the micro menu's, a little right of the screen's
  centre.
- **Action bar 1:** its BOTTOMRIGHT on the micro menu's BOTTOMLEFT, (-4.5, -4).
- **Bags:** their BOTTOMLEFT on the micro menu's BOTTOMRIGHT, (7, -4).
- **The stack above** (UpdateBottomActionBarPositions, relative to the base bar, action bar 1): the status bars (XP, then
  reputation: 1 unit between the two), then action bar 3 (MultiBarBottomRight) at x 606, not raising the stack; action bar 2
  (MultiBarBottomLeft) at x 22; the stance and pet bars at x 30. Bars 4 px apart.
- **End caps:** 154 x 95, ui-hud-actionbar-gryphon-left / -right (already in Art: action bar part A). Since 2026-09-28 night
  (the user: cut off, not where they should be): on their own frame `ForeverUIEndCaps` over the row and the XP bar, their feet on
  the row's bottom, 4 (x 0.8) out from bar 1's first button and the bags' last, as on the user's Forever shot.
- **Chat frame:** 145 above the bottom.

## 1.14.2's pieces (what moves)

MainMenuBar (ActionButton1-12, the page arrows, MainMenuBarArtFrame with the classic art), MultiBarBottomLeft and
MultiBarBottomRight, PetActionBarFrame, StanceBarFrame, the micro buttons (CharacterMicroButton ...), the bag slots
(MainMenuBarBackpackButton, CharacterBag0-3Slot, KeyRingButton), MainMenuExpBar and ReputationWatchBar. UIParent places several of
them (UIParent_ManageFramePositions), and the action bars are protected: they move only out of combat, and the layout has to be
laid again after the game's own placing (a hook on UIParent_ManageFramePositions, out of combat).

## Steps (with the user watching, one at a time)

1. The classic bar's art hidden (MainMenuBarArtFrame's textures), the gryphons Forever's, action bar 1 and the micro menu and bags
   in one row at Forever's offsets.
2. Forever's micro buttons (UI-HUD-MicroMenu-*: 32 x 40, the portrait) in place of 1.14.2's, keeping theirs clickable.
3. The XP and reputation bars across the row (StatusBars.lua already has Forever's art).
4. Action bar 2 at the right above the XP bar, action bar 3's place, the pet and stance bars at the left.
5. Decided (the user, 2026-09-27): the micro menu just like Forever's, its extra buttons too (Legacy, Group finder, Collections,
   Shop); the Game Menu's Support button does what our Help button does (the Solo Play window). Start after the talent fixes.

## Art read from Forever's client (closed, 2026-09-27)

Into `(private files)`: 8200846 (Forever's micro menu, 51 pieces: every button's up, down, mouseover and
disabled, the button background, the portrait's frame), 8154526 (UI-HUD-ActionBar-Frame), 8118792 (bags-item-bankslot64),
8188339 and 8188342 (the bank's bag slots). The rest of the bar's art (gryphons, page arrows, XP bar's Camelot pieces, the bag
slots, the retail micro menu's shared pieces) was already on disk. They reach the addon when their atlas names are added to
tools/asset-extract/forever_addon_art.py.

## Built (0.68.0-0.68.4, 2026-09-27 night, unattended; SkinMicroMenu.lua)

Steps 1-5 done in one go: the row, Forever's micro buttons, the status bars across the row, the stack above. Decisions:
- **Units:** Forever's numbers at 0.8 (its action button 45, the game's 36); the frames' art on holders scaled 0.8 so Forever's 24 px
  slice margins fit. Bar 1's padding 2 (MainActionBar 12 x 45 + 11 x 2).
- **The micro buttons:** the game's own where it has one (Character, Spellbook, Talents, Quest log, Game menu), re-skinned: their
  clicks stay the game's untainted code (they work in combat), with their keys, tooltips, pushed states and the talents' level lock
  (Forever keeps the button, locked). Ours: Professions (the P key's button), Guild (ns.ToggleGuild), Group finder (the game's LFG
  window when C_LFGList says it's on; locked otherwise), Legacy (locked: the Adventure Journal later), Collections (locked), Shop
  (locked, as Forever's own is). Hidden: Socials, World map (the map skin merges map and quests), Help (the Game Menu's Support
  button already opens Solo Play through Help.lua's HelpFrame takeover), the latency bar.
- **The stack:** Camelot's order (bar 1, reputation, XP, bar 3 not raising it, bar 2, stance, pet, possess), bars placed by their
  first button. Laid after UIParent_ManageFramePositions, MultiActionBar_Update, UpdateMicroButtons, the pet bar's slide, and after
  combat (pending); nothing protected moves in combat.
- **Seen in game:** 0.68.1-0.68.4 shots (Screenshots/WoWScrnShot_092726_2211-2221). Background clicks only hover the micro buttons
  (the tooltips show); clicks tested with /run ...:Click().

Left: the chat frame and cast bar positions (UIParent_ManageFramePositions still places them for the classic bar: fine on the
ultrawide), empty pet slots (Forever shows them), the keyring small slot's frame (iconframe-small), a browser preview page.

