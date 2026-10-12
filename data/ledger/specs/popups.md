# Pop-up dialogs and dropdown menus: Forever's look for 1.14.2

Built 2026-09-29 (session 35, unattended; the P2 list's item 17). ForeverUI 0.103.0, skin part `popups`, `SkinPopups.lua`.
Sources: Forever's `Blizzard_StaticPopup_Game` (gamedialog.xml, GameDialogBaseMixin) and `Blizzard_Menu`; 1.14.2's
`StaticPopup.xml` (804789) and `UIDropDownMenu`; the user's Forever shots 2026-09-28 08:58-08:59 (the unit menu and its submenu).

## Forever and 1.14.2

- **Pop-ups.** Forever's StaticPopupTemplate draws the diamond dialog border (`UI-DiamondDialogBox-Border`) over the dark dialog
  background (`UI-DialogBox-Background-Dark`), with red buttons and a red close button. Its template also names a metal NineSlice
  layout but has no NineSlice to take it. 1.14.2's pop-up is a BackdropTemplate with the same dark background inside the old gold
  dialog border.
- **Dropdown menus.** Forever's menus (Blizzard_Menu) draw `common-dropdown-bg` round the list, a square or round tick box at each
  checkable row with the yellow check or dot on it, gold headers, the gold arrow for a submenu. 1.14.2's UIDropDownMenu
  (DropDownList1..n) has the tooltip-like backdrop and the old radio and check textures.

## The skin

- Pop-ups (StaticPopup1-4): the gold border's colour at alpha 0 (the dark background stays), the diamond metal border
  (`ns.CreateDialogChrome`, as the game menu's) laid round it, `ns.SkinRedButton` on the buttons, `ns.SkinCloseButton` on the close
  button. The first try used the metal panel frame: its title band covered the text of a short dialog, so the diamond border it is.
- Menus: each list's two backdrops at alpha 0, `common-dropdown-bg` (sliced, alpha 0.925) behind it. After every
  `UIDropDownMenu_AddButton` (a secure hook): a checkable row gets Forever's box (`common-dropdown-tickradial` for a one-of-several
  choice, `common-dropdown-ticksquare` for `isNotRadio`), the old unchecked art hidden, the check drawn as
  `common-dropdown-icon-radialtick-yellow` or `-checkmark-yellow`. Rows with their own check art (`customCheckIconAtlas`,
  `customCheckIconTexture`, `classicChecks`) and non-checkable rows keep the game's.
- The game keeps the texts, edit boxes, money frames, the dialogs' logic, the rows, arrows, clicks and sizes.

## In game (2026-09-28 late night / 2026-09-29)

- The pop-up: `StaticPopup_Show("CONFIRM_RESET_INSTANCES")` (cancelled): the dark background, the diamond border, red Yes / No.
- The unit menu (`ToggleDropDownMenu` on PlayerFrameDropDown): Forever's panel round the list, gold headers.
- A test menu with a checked radio row, a checked square row and an unchecked square row: the round box with the yellow dot, the
  square with the yellow check, the empty square. A /reload after (the test menu from the chat).
- Not tried: a submenu opened by hover (background clicks can't hover menu rows), a pop-up with an edit box or money.
