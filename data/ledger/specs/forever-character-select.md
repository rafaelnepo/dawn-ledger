# Forever character select: porting spec (from the code)

Written 2026-09-25 by an agent that read Forever's extracted UI code (`(private files)`)
and atlas tables; nothing touched the client. Our notes only: no Blizzard art or code here. Abbreviations: `GX/` =
`blizzard_gluexml/mainline/`, `CS/` = `blizzard_gluexml/mainline/characterselect/`, `CAM/` = `blizzard_gluexml/camelot/characterselect/`,
`SX/` = `blizzard_sharedxml/`, `FS/` = `blizzard_fonts_shared/`. `s(x, y)` = pixel in the screenshot `CleanShot 2026-09-25 at
09.54.41.png` (2560 x 1080) from its top-left, y down; `13.33.55` differs only in card 4's level digit (checked by diffing).
"set1" = Forever's own "-c60" art (UiTextureAtlasSetID 1); "on disk" = in `forever/ui`, `ui-forever` or `ui-forever-check`.
**Gaps up front:** the top bar's add-on (`Blizzard_CharacterSelectNavBar`) was never crawled, and the character-list art
(file 8064271), the list frame (8203429, 8216846) and three round red buttons (8064267) are not on disk. See section 8.

## 1. What loads, and the screen box

- Glue TOCs for Camelot (`AllowLoad: Glue`): `Blizzard_GlueParent` (glueparent.toc:7-11: shared GlueParentUtil, camelot
  GlueScreenTags, mainline GlueParent.lua/.xml), `Blizzard_GlueXMLBase` (mainline Constants, GlueTemplates, GlueButtons:
  toc:14-17), `Blizzard_GlueXML` (toc:51-79: shared + mainline CharacterSelectUtil, then Camelot's; mainline ListUtil,
  ListButtonTemplates, ListElements, CharSelectSearch, List.lua/.xml, Templates.lua/.xml, CharacterSelectUI, GameLogoDarkBackdrop,
  CharacterSelect.lua/.xml; Camelot adds CAM/characterselectutil.lua (toc:55), characterselectlistbackground.xml (toc:63, the
  mainline one is excluded, toc:62), characterselectlist.lua (toc:65), characterselecttemplates.lua (toc:68); SuperDistrict
  lua/xml Camelot-only (toc:44-45)), `Blizzard_GlueMenuFrame`, `Blizzard_GlueStubs`, `Blizzard_StaticPopup_Glue`, and from
  `Blizzard_Fonts_Shared` the glue files (toc:6, 12-13). Deps not crawled: `Blizzard_CharacterSelectNavBar` (gluexml.toc:11,
  flagged `[AllowLoadGameType vanilla, mainline]`, so it does load for Camelot), `Blizzard_GlueCollections`,
  `Blizzard_MatchmakingQueueDisplay`.
- `GlueParent` (glueparent.xml:4, inside a `<ScopedModifier>`) is aliased to `UIParent` (glueparent.lua:80) and fitted by
  `OnDisplaySizeChanged` (glueparent.lua:44-74): no scale change above 5:4; wider than `MAX_ASPECT` 16/9 it is pillarboxed
  to height x 16/9, centred. For 2560 x 1080 the code gives 1920 wide, bars of 320.
- **Disagreement:** the screenshot's black bars are 228 px (x 0-227 and 2332-2559), so the box is **2104 x 1080 at s(228, 0)**
  (aspect 1.948), not 1920. The bars are `CharacterSelect`'s own OVERLAY textures from the screen edge to its edges
  (GX/characterselect.xml:274-295, GX/characterselect.lua:21-23), so they show GlueParent's real width. Every element below
  lands within 1-2 px of the code's offsets measured from a 2104-wide box at **scale 1** (1 px = 1 UI unit; e.g. Back 188 px
  and the eye button 193 px apart as in the code), so lay out on s(228..2332, 0..1080), centre x 1280. Why the client's
  box is wider than the Lua says is not explained (a different aspect limit in the running build?). The 3D scene fills the
  same box, so it is 1.95:1, not 16:9.

## 2. Frame tree (all in `CharacterSelect`, GX/characterselect.xml:273, toplevel, all points of GlueParent, hidden in XML)

- `GameLogoDarkBackdrop` (GameLogoDarkBackdropTemplate, shared/gamelogodarkbackdrop.xml:3-15): 1024 x 512 at TOPLEFT,
  BACKGROUND `Interface\Glues\CharacterSelect\Glues-CharacterSelect-Logo-BG` alpha 0.7 (on disk), shown only when
  `C_GameRules.GetCurrentGameModeDisplayInfo().logoUsesDarkBackdrop` (.lua:14-24; unknown for Camelot, not visible to the eye).
- `CharacterSelectUI` (CharacterSelectUITemplate, setAllPoints; :298): `FadeInBackground` (hidden), `MapScene` / `ModelFFX`
  (the 3D scene, all points: placeholder), `LogoHoist` (strata HIGH, 1 x 1 at TOPLEFT (3, -17)) holding `CharacterSelectLogo`
  256 x 128 at (0, 15), OVERLAY, hidden in XML (:324-336) = **s(231..487, 2..130)**.
- `VisibilityFramesContainer` (all points, useParentLevel, :465) with: `CharSelectCharacterName`, `NavBar`, the Enter World
  and rotate buttons, `CharacterSelectBackButton`, `VASTokenContainer`, `ListToggle`, `CharacterList`, plus hidden extras
  (`ConfigurationWarnings`, `InfoButton`, `RewardsButton`, `CopyCharacterButton`, `ToolTray`, services frames, `PlayersOnServer`,
  `CharacterTemplatesFrame`, `CharSelectAccountUpgradePanel`, `CharacterSelectServerAlertFrame`, `REALM_HIDDEN_ALERT`).
- `VisibilityToggleButton` (UIButtonTemplate, 42 x 42, BOTTOMLEFT (205, 12), art kit `128-redbutton-visibilityon`; :1006-1016)
  is a child of CharacterSelectUI, outside the container (it stays when the UI is hidden).

## 3. Top bar (`NavBar`, template `CharacterSelectNavBarCustomTemplate`, TOPLEFT/TOPRIGHT of the container, :481-486)

- **Code missing** (add-on not crawled). What the other code tells: its methods `SetStoreButtonEnabled`, `SetMenuButtonEnabled`,
  `SetRealmsButtonEnabled`, `SetCampsButtonEnabled`, `SetGameModeButtonEnabled` (CS/characterselectui.lua:522-557), fields
  `MenuButton`, `rightmostButton` (GX/characterselect.lua:2992, 2998, 3128). Strings present: `CHARACTER_SELECT_NAV_BAR_SHOP`,
  `_MENU`, `_REALMS`, `_CAMPS`, `_CREATE_CHARACTER`, `_SUPER_DISTRICTS`. The third button is **SUPER_DISTRICTS** (its
  text is the ruleset word): Forever's ruleset choice is a "super district" (`SuperDistrictUI` screen, glueparent.lua:9;
  `CharacterSelectUtil.ChangeSuperDistrict`, CS/characterselectutil.lua:77-87). Shown: shop (disabled look), menu, ruleset;
  not shown: realms, camps, create character, game mode.
- Candidate art (set1, file 8064271, not on disk): `glues-characterselect-tophud-left-bg` / `-left-dis-bg` 140 x 64 (slice
  L 100 R 8, stretched), `-middle-bg` 120 x 64, `-right-bg` 140 x 64 (slice L 8 R 100), dividers `-tophud-bg-divider(-dis)`
  7 x 48, hovers 120 x 44, shop icon `glues-characterselect-iconshop` / `-dis` 23 x 23.
- Measured: frame s(1055..1507, ~4..55), centred on x 1281; dividers at x 1218 and 1339 (middle button 121 wide = the
  120 px middle art); shop section greyed with its icon (store unavailable: `SetStoreEnabled(false)`, GX/characterselect.lua:1443,
  `IsStoreAvailable` CS/characterselectutil.lua:41-45); labels in capitals, caps ~12 px tall, gold (grey for shop); font unknown.

## 4. Character list (`CharacterList` = `CharacterSelectCharacterFrame`, CharacterSelectListTemplate, CS/characterselectlist.xml:3)

- Frame 386 wide, frameLevel 4. Anchors: Camelot `AdjustElements` (CAM/characterselectlist.lua:2-13, run from OnLoad,
  CS/characterselectlist.lua:36) = TOPRIGHT at `VASTokenContainer` BOTTOMRIGHT (3, 1), BOTTOMRIGHT at `ListToggle` TOPRIGHT
  (0, 10); `UpdateConfigElements` re-sets the TOPRIGHT with the same offsets when VAS tokens are on (CS/characterselectui.lua:282-292;
  Camelot's globals 3 / 1 override mainline's 10 / -2). `VASTokenContainer` (HorizontalLayoutFrame, TOPRIGHT (-12, -2), minimum
  1 x 68, empty) ends at y 70. Result **s(1937..2323, 69..1014)** (the two right anchors differ by 1 px: 2323 vs 2322).
- Background (Camelot `CharacterSelectListBGTemplate`, CAM/characterselectlistbackground.xml:3-31, frameLevel 0, all points):
  BACKGROUND `heavybronze-frame-background` (set1 1024 x 1024, stretched); BORDER `heavybronze-frame-basic` (set1 80 x 80,
  nine-slice 34 px, **tiled** mode 1) at (-9, 15) / (9, -15) = s(1928..2332, 54..1029) (visible bronze edge ~s(1936..2324, 61..1021));
  `heavybronze-vert-cornerbracket-TR` / `-BR` 32 x 32 at the border's TOPRIGHT / BOTTOMRIGHT. No retail version of the border.
- Search box (SearchBoxTemplate + `CharSelectSearchMixin`, CS/characterselectlist.xml:28-52): Camelot 308 x 24 at TOPLEFT
  (33, -25) = **s(1970..2278, 94..118)** (measured 1971..2277 x 94..117). `CharSelectSearchMixin:OnLoad` (CS/charselectsearch.lua:3-25):
  Left/Middle/Right hidden, BACKGROUND `glues-characterSelect-searchbar` (set1 24 x 24, slice L 4 R 4) on all points, icon
  `glues-characterSelect-icon-search` 14 x 14 at LEFT (6, -1), instructions `SEARCH` from (24, 0) to (-22, 0), GameFontDisableSmall
  coloured 0.35 grey (SX/shared/inputbox/inputboxtemplates.xml:186-191), text insets 24 / 24. `AddGroupButton` (42 x 42,
  `128-redbutton-plus`) hidden (section 6).
- ScrollBox (WowScrollBoxList): TOPLEFT (-115, -67), BOTTOMRIGHT (-32, 83) = s(1822..2291, 136..931); it reaches left for
  service arrows and is counter-padded: linear view padding top 0, bottom 0, left |-115 - 7| = 122, right 0, spacing 2
  (CS/characterselectlist.lua:198-202); edge fade 50 (:10). Rows: characters only (no groups, no divider: section 6), each
  95 tall (CS/characterselectlistutil.lua:6, 104-122) = pitch 97: card i at **s(1944..2291, 136 + 97 i)**, tops 136, 233, 330,
  427 (measured pitch 97; card 4's selected frame edge s(1964..2280, 426..520)).
- Scroll bar (MinimalScrollBar, 8 wide, SX/shared/scroll/minimalscrollbar.xml:15-16): TOP at ScrollBox TOP (0, -2), BOTTOM
  (0, 4), RIGHT at list RIGHT (-16) = s(2299..2307, 138..927); track and arrows set1 (on disk); no thumb with 4 cards
  (386 < 795). Measured up arrow s(2297..2311, 141..148).
- Under the list: `CreateCharacterButton` (GlueButtonTemplate, `CREATE_CHARACTER`, 205 x 42, BOTTOM (-57, 23)) =
  s(1970..2176, 949..991); `DeleteCharacterButton` (UIButtonTemplate, 42 x 42, `128-redbutton-delete`, `DELETE_CHARACTER` tooltip)
  at its RIGHT (+6) = s(2182..2224); `UndeleteButton` (`CharSelectUndeleteCharacterButton`, BigRedRefreshButtonTemplate,
  art kit `128-RedButton-Refresh`, 42 x 42, hidden in XML) at +5 = s(2229..2271) (CS/characterselectlist.xml:82-130). Measured
  red fills s(1978..2166 / 2188..2215 / 2235..2262, 956..981): centres within 1 px.

## 5. Character card (`CharacterSelectListCharacterTemplate`, CS/characterselectlistelements.xml:99-347)

- Button 347 x 95; `InnerContent` TOPLEFT (20, 0), BOTTOMRIGHT (-10, 0) = 317 x 95 (:169-172). Layers of InnerContent:
  BACKGROUND 1 `Backdrop` `glues-characterselect-card-singles` (set1 321 x 100, useAtlasSize, CENTER; retail 310 x 89);
  BACKGROUND 2 `Highlight` `-card-singles-hover` (hover only); ARTWORK 1 `Selected` `glues-characterselect-card-selected`
  (set1 342 x 122) at TOPLEFT (-13, 14), `SelectedHighlight` (hover); ARTWORK 2 `FactionEmblem` at TOPRIGHT (-20, -27),
  `FactionEmblemSelected` at TOPRIGHT (-17, -25) (:175-226).
- Texts (BORDER in child `Text`, all points, :257-283): `Name` GlueFontNormalHuge (FRIZQT 22, outline, shadow (2, -2);
  FS/mainline/gluefontstyles.xml:3, FS/shared/fonts.xml:1220) 270 x 22 at TOPLEFT (14, -14); `Info` GlueFontNormalLarge
  (FRIZQT 18, outline, shadow (2, -2), spacing 2; FS/shared/fontstyles.xml:30, fonts.xml:506) 270 x 18 at Name BOTTOMLEFT (0, -4);
  `Status` GlueFontDisableLarge 215 x 18 at BOTTOMLEFT (14, 17). Card 4 = s(1978, 441) / s(1978, 467) / s(1978, 487..505);
  measured cap tops 444, 468, 489.
- Values (`UpdateCharacterDisplayInfo`, CS/characterselectlistelements.lua:790-927, normal character): Name = `fullName`,
  colour (1, .82, 0) (:812, again :1006); Info = `CHARACTER_SELECT_INFO` format (level, class name wrapped in
  `GetClassColor(classFilename)`) (:892-898), text colour white (:1007); Status = `areaName` (the character's zone, from
  `GetBasicCharacterInfo`) in grey 0.5 (:804, 914, 1015). Class colour = `RAID_CLASS_COLORS` from `C_ClassColor` (SX/classcolors.lua:24):
  measured (sRGB) Paladin #f48cba, Hunter #aad372, name #ffd100, level white, zone #808080 = our `CLASS_COLORS`
  (forever_pages/base.py: CLASS_COLORS). Ghosts use `CHARACTER_SELECT_INFO_GHOST`.
- Faction emblem (`UpdateFactionEmblem`, :970-998): `characterInfo.faction`; "Alliance" -> `glues-characterSelect-icon-faction-alliance`
  (set1 36 x 46), "Horde" -> `glues-characterselect-icon-faction-horde`; "Neutral" -> none. Selected card shows
  `...-alliance-selected` / `...-horde-selected` (43 x 56) instead (`SetSelectedState`, :495-510). Card 1 emblem
  s(2225..2261, 163..209) (measured art 2230..2256 x 165..205); card 4 selected s(2221..2264, 452..508) (measured 2223..2262 x 452..500).
- Selected card: index == `CharacterSelect.selectedIndex` (:490-493): `Selected` shown = s(1951..2293, 413..535) for card 4.
  Order of the four: the server's list order (or last active with CVar `sortCharListByLastActive`, CS/characterselectlistutil.lua:40-44).

## 6. What Lua sets at open (Camelot)

- `RefreshConfig` (CS/characterselectui.lua:256-276) reads C_GameRules: from the screenshot, `UseSimpleCharacterSelectList` off
  (search and details shown), `HideFaction` off (emblems), `DisableCampsites` on or not MKB (no add-group button, no groups,
  no divider), `DisableVas` off (list anchored under the empty 68 px VAS container, which the measured y 69 needs).
- Shown by Lua: `CharacterSelectLogo` (`SetExpansionLogo`, shared/glueparentutil.lua:92-123; `EvaluateShownState` shows it
  when no upgrade banner, GX/characterselect.lua:2715-2723), the undelete button (`UpdateCharacterList`, GX/characterselect.lua:797-803),
  rotate buttons (`ShowModelFFX`, CS/characterselectui.lua:395-407).
- Hidden by Lua or state: `InfoButton` (only when the game mode isn't Standard) and `RewardsButton` (only with an account store)
  (GX/characterselect.lua:1461-1463); `AddGroupButton` (CS/characterselectlist.lua:558-563); realms / camps / game-mode nav
  buttons (not in the screenshot); card `LastVersion` (GM only, CS/characterselectlistelements.lua:748-752), `NotificationButton`
  (mail / lock only), `UpButton` / `DownButton` (hover only); `CopyCharacterButton`, `PlayersOnServer`, services and VAS frames.
- Enabled states that change the look: Enter World disabled when not allowed; shop disabled (store unavailable).

## 7. Bottom of the screen (GX/characterselect.xml)

- `CharSelectCharacterName` GameFontNormalHuge4Outline (FRIZQT 27, outline, gold; FS/shared/fontstyles.xml:311) at BOTTOM (0, 114)
  = bottom y 966, centred x 1280 (:468-472); text = selected `fullName` (GX/characterselect.lua:458, 663-666).
- `CharSelectEnterWorldButton` GlueButtonBigTemplate 250 x 66 (FS GameFontNormalOutline22, FRIZQT 22 outline, gold:
  FS/mainline/fontstyles.xml:51, fonts.xml:361), `ENTER_WORLD`, BOTTOM (0, 45) = s(1155..1405, 969..1035) (:487-494); red fill
  measured s(1166..1390, 980..1020).
- `CharacterSelectRotateLeft` / `Right` (CommonSquareIconButtonTemplate 48 x 48, `common-button-square-gray-up` set1 on disk,
  icons `common-icon-rotateleft` / `-rotateright` (set0 20 x 20, drawn 24 x 24): SX/shared/button/iconbuttontemplate.xml:59-78):
  left TOP at Enter World BOTTOM (-21, 4) = s(1235..1283, 1031..1079); right LEFT at left's RIGHT (-11, 0) = s(1272..1320) (:495-514).
- `CharacterSelectBackButton` GlueButtonTemplate 188 x 42, `CHARACTER_SELECT_BACK`, BOTTOMLEFT (12, 12) = s(240..428, 1026..1068);
  BORDER `Arrow` `common-icon-backarrow` set to 11 x 16 at the text's LEFT (GX/characterselect.lua:1385-1389). Eye button
  s(433..475, 1026..1068). Measured fills s(247..418) and s(439..466) x 1033..1058.
- `ListToggle` (ExpandBarTemplate + `CharacterSelectListExpandMixin`, 385 x 50): Camelot BOTTOMRIGHT (-10, 6)
  (CAM/characterselecttemplates.lua:2-4) = s(1937..2322, 1024..1074); BACKGROUND `glues-characterSelect-listLauncher-BG` (set1 370 x 37)
  at RIGHT (-11, 0); `ExpandButton` set to 42 x 42 at RIGHT (0, 0) with `128-RedButton-ArrowDown` when the list is open
  (CS/characterselecttemplates.lua:6-25) = s(2280..2322, 1028..1070); text `CHARACTER_SELECT_ALL_CHARACTERS` GlueFontHighlightLarge
  (FRIZQT 18, white) RIGHT at the button's LEFT (-10, -1) = right edge 2270 (:598-622). **Measured text right edge 2262** (8 px
  further left; unexplained), button fill s(2286..2313, 1035..1060) within 1 px.
- Glue button art: GlueButton* = SharedButton* = `BigRedThreeSliceButtonTemplate`, atlas kit `128-RedButton` (set1 Left 114 x 128,
  Right 292 x 128, `_128-RedButton-Center` 64 x 128, on disk; highlight set0), fonts GlueFontNormal (FRIZQT 15 outline, shadow
  (1, -1), gold) for Back / Create (blizzard_gluexmlbase/mainline/gluebuttons.xml:3-13, SX/shared/button/threeslicebuttontemplate.xml:61-92).

## 8. Gaps

- Code: `Blizzard_CharacterSelectNavBar` (the top bar), `Blizzard_GlueCollections`, `Blizzard_MatchmakingQueueDisplay`. Cause:
  `crawl_ui_code.py` (lines 77-79) splits `## Dep:` values on commas without stripping `[AllowLoadGameType a, b]`, so a flagged
  dep becomes an invalid name; it also keeps only the last `## Dep:` line per TOC in `directives` (gluexml's shows only
  `Blizzard_GamepadSharedUtility`), which `modernui.load_crawled` then uses for ordering. Add the three names to `seed.txt`
  on the next crawl (game closed).
- Logo texture: `GetExpansionDisplayInfo(...).logo` is a C API; the path is unknown. `forever/ui/Interface/GLUES/LOADINGSCREENS/
  Camelot160/Logo/Logo_Camelot.png` (1140 x 592) is the same logo and, stretched into the 256 x 128 box, puts its artwork where
  the screenshot has it (~s(280..436, 5..127)); to confirm against the real glue texture.
- Art not on disk (set1): 8064271 (all `glues-characterselect-*` card, emblem, search, list-launcher and top-bar pieces),
  8203429 (`heavybronze-frame-basic`, corner brackets), 8216846 (`heavybronze-frame-background`), 8064267 (`128-redbutton-delete`,
  `-visibilityon`). Retail fallbacks on disk: 5648070 `Interface\Glues\CharacterSelect\UICharacterSelectGlues` (card 310 x 89,
  emblems, launcher, a retail top bar), 5933889 `128RedButtonPart2` (delete, visibility). None for the heavybronze frame.
- Not decidable from code: nav bar font and exact size, whether `logoUsesDarkBackdrop` is on, the 16/9 vs 1.948 box width.

## 9. Scenario pitfalls

- `<ScopedModifier>` wraps `GlueParent` (glueparent.xml:3): `framexml.load_xml` treats it as a top-level element, so no
  `GlueParent` object exists and `CharacterSelect` (parent="GlueParent") falls back to UIParent (full 2560 width). The scenario
  must give CharacterSelect the 2104 x 1080 box at x 228 and draw the two black bars, then `Show()` it (hidden in XML).
- Lua-only layout the renderer won't do: both Camelot `AdjustElements`; `UpdateConfigElements`; `VASTokenContainer` has no size
  in XML (its 68 px min height comes from `Layout()`: without it the list starts 67 px too high); `CharSelectSearchMixin:OnLoad`;
  `CharacterSelectListExpandMixin:OnLoad`; `UIButtonMixin:InitButton` art kits (delete, undelete, eye; SX/shared/button/uibuttontemplate.lua:4-10, 66-72);
  `IconButtonMixin:OnLoad` icons and 24 px size; back arrow size; `ThreeSliceButtonMixin:UpdateScale` (already ported).
- Rows exist only in Lua (ScrollBox factory): build four `CharacterSelectListCharacterTemplate` buttons (hidden in XML) at the
  positions above; run InnerContent `OnShow` (Name anchor), hide `LastVersion`, `NotificationButton`, `UpButton` / `DownButton`;
  set texts, colours and emblems as in section 5; show `Selected` on the selected row.
- Show what XML hides but Lua shows (logo, undelete, rotate buttons); hide what XML shows but Lua hides (`AddGroupButton`).
- `<MapScene>` / `<ModelFFX>` become plain frames (fine for a placeholder); draw the scene placeholder under everything.
- Loader clashes (glue and game XML loaded together, `[AllowLoad Glue/Game]` ignored): `CharacterSelectListBGTemplate` is safe
  (flags pick Camelot's). `blizzard_gluestubs/gluestubs.xml` redefines `ActionButtonTemplate` and `EditModeChatFrameSystemTemplate`
  as empty stubs and loads after `blizzard_actionbar` / `blizzard_editmode` in our order, so in-game pages using them get the
  stubs. Also doubly defined: `MovieFrame`, `PartyMemberFrameTemplate`, `KioskFrame`, and fonts `NumberFontNormalSmall(Gray)`,
  `DialogButton*Text`, `OptionsFont*` (game versions load last). None is used on this screen.
