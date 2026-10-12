# Forever Collections (Appearances): porting spec (from the code)

Written 2026-09-25 by an agent that read Forever's extracted UI code (`(private files)`,
paths below relative to it) and atlas tables; nothing touched the client. Our notes only: no Blizzard art or code here.
Target: `_Inbox/CleanShot 2026-09-25 at 13.35.56.png`. `win(x, y)` = position in the 703 x 606 window from its top-left, y down;
the window sits at screen (17, 116) (measured: close button right edge 718 = W - 2, bottom edge 722). "set1" = Forever's own
"-c60" art (UiTextureAtlasSetID 1), "set0" = retail art only. Short names: `coll/` = `blizzard_collections/`, `wxml` =
`coll/mainline/blizzard_wardrobe.xml`, `wlua` = `coll/mainline/blizzard_wardrobe.lua`, `spt` =
`blizzard_sharedxml/mainline/shareduipaneltemplates.{xml,lua}`.

## 1. What loads for Camelot, and which frame this is

- `Blizzard_Collections` (LoadOnDemand, AllowLoadGameType wrath, cata, mists, mainline; Camelot counts as mainline)
  (`coll/blizzard_collections.toc:3-13`). Camelot lines: `camelot/Blizzard_CollectionsConstants.lua` (16),
  `camelot/Blizzard_CollectionsOverrides.lua` (21), `camelot/Blizzard_CollectionsTabs.xml` (23; the shared tabs XML is
  excluded, 22), `classic/Blizzard_PetCollection.*` (28-29), `camelot/Blizzard_Wardrobe.lua` (41) on top of
  `mainline/Blizzard_Wardrobe.lua/.xml` (40, 42); `mainline/Blizzard_CollectionTemplates.xml` (18) + shared templates (17, 19).
  Also `blizzard_framexmlutil` `camelot/CollectionsUtilOverrides.lua` (toc:43, a sort), `blizzard_helpplate`
  `camelot/HelpPlateOverrides.lua` (hides every MainHelpPlateButton on show, lines 1-3), `blizzard_sharedxml`
  `Mainline/SharedCollectionTemplates.xml` (toc:196), `blizzard_menu` `mainline/MenuTemplates.xml` + `MenuConstants.lua`.
  `Blizzard_TransmogShared` is Lua only (TransmogUtil, slot locations): it draws nothing.
- The window is `CollectionsJournal` (PortraitFrameTemplate, 703 x 606, strata HIGH, toplevel, CENTER in XML: the panel
  manager puts it at the left slot) (`coll/shared/blizzard_collections.xml:4-17`) showing its 5th page,
  `WardrobeCollectionFrame` (setAllPoints, `wxml:185`) with its `ItemsCollectionFrame` (`wxml:424`).
- The square tab outside the right edge is the journal's own page tab (not transmogshared): Camelot sets
  `BLIZZARD_COLLECTIONS_TAB_STYLE = SIDE` (`coll/camelot/blizzard_collectionsconstants.lua:4`) and replaces the bottom
  PanelTabButtons with `LargeSideTabButtonTemplate` tabs (`coll/camelot/blizzard_collectionstabs.xml:4-46`). Only Tab5
  (WardrobeTab, tooltip `WARDROBE`) shows: see 5. The "Items" tab at the top left is the wardrobe's own top tab.

## 2. Chrome (CollectionsJournal)

- Title: OnLoad sets `COLLECTIONS`, then `UpdateSelectedTab` sets `TABS_DATA[5].title` = `WARDROBE`
  (`coll/shared/blizzard_collections.lua:75-82, 110, 152`). TitleContainer (58, -1)..(-24, -1), 20 high, level 510, text
  GameFontNormal (FRIZQT 12, shadow 1/-1, gold) at TOP -5 (`spt.xml:600-612`): centre x 368.5, top y 6. Measured glyphs
  win(328..405, 9..18): centre 2 px left of the computed one.
- Portrait: `SetPortraitToAsset("Interface\\Icons\\inv_chest_cloth_17")` in `WardrobeCollectionFrameMixin:OnShow` (`wlua:179`;
  OnLoad set `inv_misc_enggizmos_19` first, `wlua:127`). 62 x 62 at (-5, 7), level 400, round mask (`spt.xml:581-590`) =
  win(-5..57, -7..55); matches the screenshot (purple robe icon).
- NineSlice "PortraitFrameTemplate" (`blizzard_sharedxml/mainline/nineslicelayouts.lua:17-28` + Camelot offsets
  `blizzard_sharedxml/camelot/nineslicelayoutoverrides.lua:2-25`): TopLeft `UI-Frame-PortraitMetal-CornerTopLeft` 95x95 (-13, 16),
  TopRight `UI-Frame-Metal-CornerTopRight` 95x95 (4 - 2 = 2, 16), BottomLeft/Right 95x100 at (-13, -8) / (2, -8), metal edges; all set1.
  Bg `UI-Background-Rock` tiled (2, -21)..(-2, 2), TopTileStreaks at (6, -21) (`spt.xml:624-640`).
- Close button (UIPanelCloseButtonDefaultAnchors, Camelot anchor TOPRIGHT (-2, 1), `blizzard_sharedxml/camelot/
  shareduipaneltemplates.lua:3-5`): `RedButton-Exit` 24x24 = win(677..701, -1..23); measured the same.
- `InfoButton` (MainHelpPlateButton at (43, 19), `wxml:187-196`): hidden by the Camelot help-plate override.

## 3. Wardrobe header row

- `ItemsTab` (PanelTopTabButtonTemplate, text `WARDROBE_ITEMS`, id 1, frameLevel 4, then +4 in `PanelTabButtonMixin:OnLoad`,
  `spt.lua:251-254`) at TOPLEFT (58, -28) (`wxml:197-209`). Size: 32 high (`spt.xml:933`); width from `PanelTemplates_TabResize`
  on show = max(text + 20, Left.w + Right.w = 35 + 37) = 72 (`spt.lua:473-507`; the tab's `minWidth` 57 KeyValue is never read:
  TabResize reads the parent's `minTabWidth`, nil). So win(58..130, 28..60). Selected (`PanelTemplates_SelectTab`,
  `spt.lua:616-632`): Left/Middle/Right hidden, LeftActive/MiddleActive/RightActive shown, text GameFontHighlightSmall
  (FRIZQT 10, white) at CENTER (0, -4) (top tab: -(-3) - 7). Top-tab art (`PanelTopTabButtonMixin:OnLoad`, `spt.lua:283-305`):
  every tab texture gets texcoord (0, 1, 1, 0.25) (flipped, bottom 75 % of the atlas) and 0.75 x its height; LeftActive
  BOTTOMLEFT (-1, 0), RightActive BOTTOMRIGHT (8, 0). Atlases `uiframe-activetab-left` 35x42 / `-right` 37x42 /
  `_uiframe-activetab-center` 1x42 tiled, set0 only (Interface/FrameGeneral/UIFrameTabs, drawn 31.5 high). Measured: art
  win(58..128, 36..60), "Items" glyphs (79..105, 44..50), centre (92, 47) vs computed (94, 48).
- `SetsTab` (`wxml:210-244`) hidden: `UpdateTabButtons` finds no valid sets (`wlua:289-298`). `ResizeTabsToFit(185)` changes
  nothing (72 + 72 <= 185, `spt.lua:509-526`).
- `SearchBox` (SearchBoxTemplate, `wxml:245-258`): `SetTab(1)` re-anchors it TOPRIGHT (-107, -35), width 115, height 20
  (`wlua:20-22`) = win(481..596, 35..55). Its mixin OnLoad (`wlua:1698-1700`) runs `SearchBoxTemplate_OnLoad`
  (`blizzard_sharedxml/shared/inputbox/inputboxtemplates.lua:175-178`): Instructions = `SEARCH`, icon tinted 0.6. Parts as on the
  quest log (`inputboxtemplates.xml:177-254`): `common-search-border-*` set1, magnifier `common-search-magnifyingglass` (set0) 10x10
  at LEFT (1, -1), Instructions GameFontDisableSmall coloured 0.35 grey from (16, 0) to (-20, 0). Measured border
  win(476..594, 36..55). `ProgressFrame` hidden (XML).
- `FilterButton` (WowStyle1FilterDropdownTemplate, `blizzard_menu/mainline/menutemplates.xml:66-117`, 135x18): LEFT at the
  search box's RIGHT (5, 0), `resizeToText` false (`wxml:405-412`), `SetWidth(90)` (`wlua:129`) = win(601..691, 36..54).
  Background `common-dropdown-b-button` (set1 97x26, 3-slice 8 / 18, the arrow is in the right slice) at (-4, 4)..(4, -4) =
  win(597..695, 32..58) (state atlases `blizzard_menu/mainline/menuconstants.lua:1-6`); Text `FILTER` in GameFontNormal (gold),
  anchored TOP, 20 high, centred on x 646. Measured text (630..660, 40..50), arrow ~676..679: match. Camelot's own filter code
  only changes the menu contents (collected only, source filters flat: `coll/camelot/blizzard_wardrobe.lua:3-11`).
- `progressBar` (CollectionsProgressBarTemplate at ItemsTab TOPLEFT (195, -11), `wxml:400-404`): hidden by Camelot
  (`coll/camelot/blizzard_wardrobe.lua:14-21`). Not in the screenshot: correct.
- `ClassDropdown` (WowStyle1DropdownTemplate 120x25, `menutemplates.xml:3-39`): `SetWidth(150)` (`wlua:1573-1581`), anchored by
  `SetTab(1)` TOPRIGHT at SlotsFrame TOPLEFT (-12, -2) (`wlua:27-28`) = win(22..172, 82..107). Background
  `common-dropdown-textholder` (set1 54x41, 3-slice 16 / 19) at (-8, 7)..(8, -9) = win(14..180, 75..116); Arrow
  `common-dropdown-a-button` (set1 27x27) at RIGHT (1, -3) = win(146..173, 81..108); Text GameFontHighlight at TOPLEFT (8, -8),
  right edge at the arrow's LEFT, 10 high = from win(30, 90). Text = the class filter's name coloured by `GetClassColorObj`
  (`RAID_CLASS_COLORS`, `wlua:1576-1580`, Refresh `1624-1651`); filter default = the player's class (C API, inference).
  Measured: border win(22..170, 82..107), text from x 31, colour raw (161, 205, 110) = the retail hunter green #aad372 through
  the monitor profile.

## 4. Items frame, slot row, grid, pager

- `ItemsCollectionFrame` (CollectionsBackgroundTemplate, `blizzard_sharedxml/mainline/sharedcollectiontemplates.xml:56-202`,
  InsetFrameTemplate: marble Bg BACKGROUND -5, NineSlice "InsetFrameTemplate" inner frame pieces set0, `spt.xml:389-401`,
  `nineslicelayouts.lua:81-91`): (4, -60)..(-6, 5) = win(4..697, 60..601). `BackgroundTile` `collections-background-tile`
  256x256 tiled, inset 4 = win(8..693, 64..597), BACKGROUND. Shadows: `collections-background-shadow-large` 145x147 corners
  (mirrored by texcoords) + stretched 1-texel edges, BORDER 2; `-shadow-small` 13x13 the same, OVERLAY. Corners
  `collections-background-corner` 90x67, ARTWORK 2: TopLeft/TopRight hidden in OnLoad (`wlua:122-123`, `wlua:559-560`);
  BottomLeft (flipped vertically) = win(8..98, 530..597), BottomRight (flipped both) = win(603..693, 530..597): the filigree.
  All set0 (Interface/Collections/Collections, CollectionsBackgroundTile).
- Slot buttons: created in Lua only (`CreateSlotButtons`, `wlua:460-503`) in `SlotsFrame` (10x10 at (180, -20) = win(184, 80),
  `wxml:439-444`). Camelot list (`OverrideDefaults`, `coll/camelot/blizzard_wardrobe.lua:24-27`): head, shoulder, back, chest,
  shirt, tabard, wrist, [19], hands, waist, legs, feet, [19], mainhand, secondaryhand, ranged (14 buttons). First at TOPLEFT,
  the rest LEFT at the previous RIGHT + 2; a number is the next gap. `UpdateSlotButtons` (`wlua:1285-1302`) re-anchors back
  (+2) and hands / mainhand (+`defaultSectionSpacing` = 19 in Camelot) with no secondary shoulder. Button x (31x31, y 80..111):
  184, 217, 250, 283, 316, 349, 382 | 432, 465, 498, 531 | 581, 614, 647 (row ends 678). Template `WardrobeSlotButtonTemplate`
  (`wxml:99-130`): NormalTexture `transmog-nav-slot-<slot>` at atlas size 35x37 centred; SelectedTexture
  `transmog-nav-slot-selected` 45x47 OVERLAY, shown only on the active slot (`SetActiveCategory`, `wlua:911-915`): head
  (ItemsCollectionFrame:OnShow defaults to HEADSLOT, `wlua:621-623`); highlight `bags-roundhighlight` 31x31 ADD at (0, 1). All
  set0 (Interface/Transmogrify/Transmogrify). Measured circle centres within 1.5 px of these.
- Small buttons (`WardrobeSmallSlotButtonTemplate` 25x25, level 10, at the button's TOPRIGHT (16, -15), `wlua:482-496`): the
  secondary-shoulder one is hidden (no secondary appearance); illusion ones for main / off hand exist only if
  `C_TransmogOutfitInfo` reports illusion slots (`blizzard_transmogshared.lua:613-640`). None in the screenshot: draw none.
- `WeaponDropdown` (TOPRIGHT (-25, -58), width 157): hidden for an armour slot (`wlua:851-862`).
- Grid: 18 `WardrobeItemsModelTemplate` DressUpModels (`wxml:4-97`, 78x104, black fill BACKGROUND, Border
  `transmog-wardrobe-border-collected` 96x122 at CENTER (0, -3) OVERLAY -1). R1C1 TOP (-238, -94); columns +16 apart, rows -24
  (`wxml:445-534`): 6 x 3, pitch 94 x 128, R1C1 = win(73.5..151.5, 154..258), grid win(73.5..621.5, 154..514). `PAGE_SIZE` 18
  (`wlua:564-566`). A model shows only for an entry of `filteredVisualsList` on the page, else `Hide()` (`wlua:1058-1139`).
- Pager (`CollectionsPagingFrameTemplate` 33x32, `coll/mainline/blizzard_collectiontemplates.xml:4-41`) at BOTTOM (22, 29)
  (`wxml:429-433`) = win(356..389, 540..572). Prev 32x32 LEFT = win(356..388), Next LEFT at the frame's RIGHT (3, 0) =
  win(392..424); `Interface\Buttons\UI-SpellbookIcon-Prev/NextPage-Up/Down/Disabled`, highlight UI-Common-MouseHilight
  (`coll/shared/blizzard_collectiontemplates.xml:195-209`). PageText (GameFontWhite = SystemFont_Med1, FRIZQT 12, no shadow,
  white; justifyH RIGHT) RIGHT at the frame's LEFT (-11, 0) = right edge x 345, centre y 556. `CollectionsPagingMixin:Update`
  (`coll/shared/blizzard_collectiontemplates.lua:115-127`): `COLLECTION_PAGE_NUMBER` with (1, 1); both buttons disabled at 1 of
  1. `RefreshVisualsList` sets maxPages = max(ceil(n / 18), 1) (`wlua:1203`). Measured: arrows' art (360..384 / 396..420,
  544..568) grey = the Disabled textures; text glyphs (284..342, 553..563), about 1-2 px lower than computed.
- Empty state: there is no empty-state text or art in this frame; the grid is simply 18 hidden models. Why it is empty: the
  active slot is Head and the class filter Hunter; Camelot shows collected appearances only (`SetUncollectedShown(false)`,
  `coll/camelot/blizzard_wardrobe.lua:5-6`), so the character has no collected head appearance a hunter can use (it has some
  appearance, or the tab would be hidden, see 5). Draw the models as hidden, not as placeholders. When a list exists, the
  order is Camelot's `CompareAppearance` (collected, usable, favourite, displayable, ..., min item level ascending;
  `blizzard_framexmlutil/camelot/collectionsutiloverrides.lua:1-27`).

## 5. Side tab (TabContainer)

- `TabContainer` (`CollectionsJournalTabContainer`, 55 wide, TOPLEFT/BOTTOMLEFT at the journal's TOPRIGHT/BOTTOMRIGHT) =
  win(703..758, 0..606). Tabs 1-5 (Mounts, Pets, Toys, Heirlooms, Wardrobe; no Warband tab in Camelot's XML).
- `CollectionsJournal_CheckAndDisplayTabs` (`coll/shared/blizzard_collections.lua:119-145`): each tab shows if
  `CollectionsJournal_ValidateTab` (18-47); the first shown at TOPLEFT (0, -60), the next at the previous BOTTOMLEFT (0, -2).
  Only Wardrobe shows, so it is first: 55x55 (`CalculateTabSizeBasedOnTabArt`: `common-sidetab` 55x60 minus 5, `spt.lua:309-329`)
  = win(703..758, 60..115). Inference: `onlyShowCollectedItemsInJournal` is on, the character has no mount, pet or toy
  (`HasDisplayableMount`, `GetNumPets`, `HasAnyToy` false), heirlooms are unavailable, and `HasAnyAppearance` is true.
- Art (`spt.xml:1008-1068`, all set1): Background `common-sidetab` 55x60 CENTER (BACKGROUND); Icon (ARTWORK) = `TABS_DATA[5].icon`
  `Interface/ICONS/UI_Transmog_ShowEquippedGear` (`SetupTabs`, `coll/camelot/blizzard_collectionsoverrides.lua:13-17`), at CENTER
  (-4, 0) (Camelot, `blizzard_sharedxml/camelot/shareduipaneltemplates.lua:8-10`), 50x50 with texcoords 0.03125-0.96875 because
  `fillToInterior` is true and `SetChecked` runs `UpdateIconInterior` (`spt.lua:381-399`); masked by `common-sidetab-mask` 55x60;
  SelectedTexture `common-sidetab-selected` 55x60 OVERLAY, shown when checked; hover `common-sidetab-hover`. Use the existing
  `side_tab()` helper. Measured: dark tab win(702..754, 60..114), gold selected frame (702..749, 64..107): match.

## 6. Scenario (what Lua does that the renderer must port)

1. Journal: shown, 703 x 606 at screen TOPLEFT (17, -116); title `WARDROBE`; portrait `inv_chest_cloth_17` round; hide
   `MountJournal` (not hidden in its XML, `coll/mainline/blizzard_mountcollection.xml:217`), keep Pet/Toy/Heirlooms/Warband
   hidden, show `WardrobeCollectionFrame`.
2. Tabs 1-4 hidden; Tab5 placed at (0, -60), sized, icon, tooltip `WARDROBE`, checked (SelectedTexture shown).
3. InfoButton, SetsTab, progressBar, WeaponDropdown, SearchBox.ProgressFrame hidden; ItemsTab selected state, width 72, top-tab
   texcoords; SearchBox anchor/width + Instructions `SEARCH`; FilterButton width 90 + Text `FILTER`; ClassDropdown width 150,
   anchor, Text = class name in class colour.
4. ItemsCollectionFrame: hide BGCornerTopLeft/TopRight; create the 14 slot buttons with atlases and x positions above, Head
   selected; hide all 18 models; PageText "Page 1 / 1" (from `COLLECTION_PAGE_NUMBER`), both page buttons disabled.

Pitfalls: every item above is set by OnLoad/OnShow methods (template and mixin), none by XML, so none happens by itself;
the slot buttons exist only in Lua. The top tab needs atlas-relative, flipped texcoords (first top tab we draw). The shared
and Camelot files both define `CollectionsJournalTab`/`...TabContainer` (the TOC flag keeps only Camelot's). If the
`petJournalTab` cvar named a hidden tab, `UpdateSelectedTab` calls the Camelot `SetTab_Internal` with the journal instead of
the container, which returns early, so the side tab would stay unchecked (`blizzard_collections.lua:96` vs
`blizzard_collectionsoverrides.lua:22-24`); the screenshot shows it checked. `SetTab` enables the search box and filter only when
the items frame already has a slot (`wlua:23-26`); on a first open the parent's OnShow may run before the child's sets it, which
would grey both; the screenshot shows them enabled: draw enabled.

## 7. Gaps

- Code not on disk: `Blizzard_ContentTracking` (TOC dep; `ContentTrackingElementTemplate`, inherited by the model template) and
  `Blizzard_ClassMenu` were never crawled; the UIPanelWindows entry that places the journal (position measured instead); cvar
  defaults (`onlyShowCollectedItemsInJournal`, `petJournalTab`); C APIs (`C_TransmogCollection` lists and class filter,
  `C_TransmogOutfitInfo` slots, class colours): our vanilla server has no transmog data, so Sashimii's page is this same
  empty state.
- Art: all atlases above are on disk (transmogrify, collections, UIFrameTabs, CommonSearch in `forever/ui/`; common-sidetab
  8124217 and mask 8254784, dropdown 8069112, search border 8086476 in `ui-forever/tex/fdid/`), as are the icons and pager
  buttons. Missing: Forever's `uiframe-tab-left/right/_center` (set1, file 8168849), only drawn for an unselected or hovered
  tab (the widths 35 / 37 come from the atlas table).
