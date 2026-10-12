# Forever Settings panel at character select: porting spec (from the code)

Written 2026-09-25 by an agent that read Forever's extracted UI code (`(private files)`,
paths below relative to it) and atlas tables, and measured the user's screenshots `_Inbox/CleanShot 2026-09-25 at 13.33.59`
(glue game menu) and 13.34.02 / .05 / .07 / .08 / .11 / .13 / .15 / .16 (one category each). Nothing touched the client. Our
notes only: no Blizzard art or code here, texts as GlobalStrings tags. `win(x, y)` = position in the 920 x 724 panel from its
top-left, y down; the panel's top-left is screen (820, 178) in the 2560 x 1080 screenshots (UI scale 1). "set1" = Forever's
"-c60" art (UiTextureAtlasSetID 1); "retail" = set 0. Abbreviations: `SP` = `blizzard_settings_shared/`, `SD` =
`blizzard_settingsdefinitions_shared/`, `SX` = `blizzard_sharedxml/`.

## 1. What loads at glue, and how the panel opens

- `Blizzard_Settings_Shared` (`AllowLoad: Both`, SP toc:7) and `Blizzard_SettingsDefinitions_Shared` (Both, SD toc:3) load at
  glue. Camelot takes `[Game]\LanguagesOverrides.lua` (camelot) instead of the mainline one (SP toc:35-36); `[Family]` files
  are Mainline (NewDefinitions, SettingsPanelTemplates, Graphics/AudioOverrides; SD's QuestTextPreview/TextSizePreview/Text,
  SD toc:14-18, all `[AllowLoadGameType mainline]`, which Camelot counts as). `Blizzard_SettingsDefinitions_Frame` is
  `AllowLoad: Game` (its toc:3): none of its categories (Gameplay, Controls, Interface-in-game, Keybindings...) exist at glue.
  `Blizzard_Settings` is LoadOnDemand, loaded by `Open` only "for tracking" (SP settingspanel.lua:305-310).
- Registration at glue is immediate (`SettingsRegistrar:OnLoad`, SP settingsregistrar.lua:5-8), so categories get IDs in TOC
  order, and a category's order = its ID (SP category.lua:3-9). Groups at glue: `SETTING_GROUP_SYSTEM` order 1,
  `SETTING_GROUP_ACCESSIBILITY` order 2 (SD groups.lua:1-3).
- Resulting list (matches all screenshots): **System**: `GRAPHICS_LABEL`, `AUDIO_LABEL`, `LANGUAGES_SETTINGS_LABEL`,
  `NETWORK_LABEL`, `GAMEPAD_LABEL` (only if `InputUtil.IsGamepadUISupported()`, SD gamepad.lua:333-334; glue order not
  overridden, :298-300), `MAC_SETTINGS_LABEL` (the "Keyboard Options" row: Mac client only, SD mac.lua:67-72).
  **Accessibility**: `ACCESSIBILITY_INTERFACE_LABEL` (SD mainline/text.lua:101-108), `ACCESSIBILITY_AUDIO_LABEL`,
  `CINEMATIC_SUBTITLES_OPTIONS_HEADER`. Kiosk mode would drop Network and Languages (network.lua:2, languages.lua:143).
- Open: glue menu button `GAMEMENU_OPTIONS` -> `GlueParent_ShowOptionsScreen` (blizzard_gluemenuframe/mainline/gluemenuframe.lua:82
  and :98) -> secondary screen "options" = `SettingsPanel`, `checkFit` (blizzard_glueparent/mainline/glueparent.lua:19, 764-766):
  `FrameUtil.UpdateScaleForFit(frame, 10, 10)` (glueparent.lua:558-563) scales only when 744 > screen height, so scale 1 here
  (blizzard_sharedxmlbase/frameutil.lua:169-179). `OnShow` at glue: strata DIALOG, `GlueParent_AddModalFrame`, title
  `SYSTEMOPTIONS_MENU` (SP settingspanel.lua:180-184); the modal frame shows `GlueParent.BlockingFrame` (full screen, black
  alpha 0.5, strata HIGH level 10000; glueparent.xml:27-39, glueparentutil.lua:15-17): the dimmed scene in the screenshots.
  `SelectFirstCategory(true)` opens on Graphics (settingspanel.lua:161-162, 829-834).

## 2. Panel and chrome

- `SettingsPanel` (SP settingspanel.xml:4-113): 920 x 724, CENTER, toplevel, strata HIGH (DIALOG at glue) = screen
  (820..1740, 178..902). Inherits `SettingsFrameTemplate` (SP mainline/blizzard_settingspaneltemplates.xml:4-30).
- `Bg` (FlatPanelBackgroundTemplate, frameLevel 0) TOPLEFT (7, -18) / BOTTOMRIGHT (-3, 3) = win(7..917, 18..721): pieces
  `uiframebackground-nineslice-cornerbottomleft/right` 16x16 + edges, all tinted `PANEL_BACKGROUND_COLOR` (GlobalColor)
  (SX mainline/shareduipaneltemplates.xml:404-435). Screenshot: the scene shows through faintly (dark ~(23,23,25)).
- `NineSlice` (useParentLevel) layout `ButtonFrameTemplateNoPortrait` (SX mainline/nineslicelayouts.lua:43-53) plus Camelot
  shifts (SX camelot/nineslicelayoutoverrides.lua:4-25), all OVERLAY, set1: TopLeft `UI-Frame-Metal-CornerTopLeft` 95x95 at
  (-8, 16); TopRight `UI-Frame-Metal-CornerTopRight` 95x95 at (2, 16) (4 - 2); BottomLeft `...CornerBottomLeft` 95x100 at
  (-8, -8) (y overridden); BottomRight 95x100 at (2, -8); edges `_UI-Frame-Metal-EdgeTop` 128x95, `_...EdgeBottom` 128x100,
  `!...EdgeLeft/Right` 95x128 tiled. Visible metal in the screenshot: win x 4..919, y -3..724; the top edge art holds the dark
  title strip (~y 0..22).
- Title `NineSlice.Text` GameFontNormal (FRIZQT 12, gold, shadow), TOP -5, LEFT 60 / RIGHT -60, no wrap; `SYSTEMOPTIONS_MENU`
  at glue. Measured glyphs win(439..479, 7..16), centred on x 460. OK.
- Close X `ClosePanelButton` (UIPanelCloseButtonDefaultAnchors, 24x24, frameLevel 510; `RedButton-Exit` set1 32x32 art,
  pressed/disabled/`RedButton-Highlight` ADD; SX mainline/shareduipaneltemplates.xml:134-155) at TOPRIGHT (-2, 1) from the Camelot
  mixin (SX camelot/shareduipaneltemplates.lua:3-5) = win(894..918, -1..23). Measured red art 896..916 x 0..22. OK.
- Inner frame: texture `Options_InnerFrame` (set1, 886x618, useAtlasSize) OVERLAY sublevel 2 of the panel at TOPLEFT (17, -64)
  = win(17..903, 64..682). Its lines measured at x 17-18, 216-217 (list/content divider, part of the art), 901-902, y 64 and
  679 (art has transparent margin at the bottom).
- `GameTab` / `AddOnsTab` (MinimalTabTemplate, y 37, at (32, -27)): hidden in `OnShow` because no AddOns-set category exists
  (settingspanel.lua:164-177). `OutputText` GameFontWhite at BOTTOM y 24: empty.
- Search box `SearchBox` (SearchBoxTemplate, 350x22, frameLevel 5) BOTTOMRIGHT at Container TOPRIGHT (4, 20) = win(552..902,
  34..56); measured border 547..902 x 35..55 (the template's left cap sits 5 px out). Instructions: the template default.
- `CloseButton` (UIPanelButtonTemplate 96x22, SX secureuipaneltemplates.xml:39-79) BOTTOMRIGHT (-16, 16) = win(808..904, 686..708),
  text `SETTINGS_CLOSE` (settingspanel.lua:68); measured red art 810..902 x 688..707 (Forever's button art is inset ~2 px).
  `ApplyButton` (96x22, RIGHT at Close LEFT -2, `SETTINGS_APPLY`) is shown only with unapplied changes: hidden at open
  (settingspanel.lua:563-585, 587-590). Button text is set with `Text:SetText`, so no fit-to-text resize.
- Layout frames: `CategoryList` TOPLEFT (18, -76), BOTTOMLEFT (178, 46), Size 199 x 569 (settingspanel.xml:58-64): the anchors
  give height 602 (win y 76..678); measured labels confirm left x 18 and width 199. `Container` TOPLEFT at list TOPRIGHT +16,
  BOTTOMLEFT at list BOTTOMRIGHT (16, 1), RIGHT -22 = win(233..898, 76..677), holding `SettingsList` (all points).

## 3. Category list (left)

- `SettingsCategoryListTemplate` (SP categorylist.xml:8-27): ScrollBox (WowScrollBoxList) + MinimalScrollBar. Lua re-anchors:
  ScrollBox TOPLEFT (-50, 0), BOTTOMRIGHT (-16, 0) with bar / (0, 0) without; linear view pads top 0, bottom 0, left 50, right 0,
  spacing 2; indent from `data.indent` (SP categorylist.lua:222-243). No scrolling here: bar hidden, rows x 18..217 (199 wide).
- Element list (`GenerateElementList`, :442-465; `CreateGroup`, :428-440): per group a header (Game set only), then its
  categories in order; an 18 px spacer (`SettingsCategoryListSpacerTemplate`, xml:4-6) before every group but the first.
  Subcategories would indent +10 (:422); none here.
- Header `SettingsCategoryListHeaderTemplate` 175x30 (stretched to 199) (xml:29-47): `Background` ARTWORK at TOPLEFT, atlas
  `Options_CategoryHeader_%d` with useAtlasSize, index = ((header count - 1) % 3) + 1 (lua:30-34, 431): System `_1`,
  Accessibility `_2`; set1 199x144 (the bar is its top ~25 px; the rest transparent/gradient). `Label` OVERLAY
  GameFontHighlightMedium (FRIZQT 14, white, shadow) at LEFT (20, -1). Measured: bar win(20..214, 79..104), label x 40.
- Button `SettingsCategoryListButtonTemplate` 175x20 (stretched to 199) (xml:49-94): `Label` ARTWORK GameFontNormal (12, gold)
  TOPLEFT (36, 1) / BOTTOMRIGHT (0, 1); `Texture` BACKGROUND at CENTER; `Toggle` 22x22 at LEFT 9 hidden (no subcategories;
  lua:98); `NewFeature` hidden. State (lua:46-69): selected -> label GameFontHighlight (white) + `Options_List_Active`
  (retail only, 187x21, fdid 1318750) shown; not selected -> GameFontNormal (GameFontHighlight for subcategories), hover ->
  `Options_List_Hover` (set1 187x21), else no texture.
- Rows (y top, 20 tall unless noted): System header 76 (30), Graphics 108, Audio 130, Languages 152, Network 174, Gamepad 196,
  Keyboard 218, spacer 240 (18), Accessibility header 260 (30), Interface 292, Audio Assist 314, Subtitles 336. Label text left
  x 54 (measured glyphs x 56). Highlight = win(24..211, y-0.5..y+20.5) (measured top/bottom lines at y and y+19/20, half-pixel
  alternating). Screenshots also show a hover highlight where the mouse was: Gamepad in .05, Audio Assist in .07 and .13.

## 4. Settings list (right) and control templates

- `SettingsListTemplate` (SP settingslist.xml:4-62): `Header` 50 tall = win(233..898, 76..126): `Title` GameFontHighlightHuge
  (FRIZQT 20, white) TOPLEFT (7, -22) = win(240, 98) (measured glyphs x 242, cap top 100), text = category name
  (settingspanel.lua:880); divider `Options_HorizontalDivider` (set1 630x1) at TOP y -50 = win(250.5..880.5, 126) (measured
  251..880 at y 126); `DefaultsButton` UIPanelButtonTemplate 96x22 TOPRIGHT (-36, -16) = win(766..862, 92..114), text
  `SETTINGS_DEFAULTS` (settingspanel.lua:78) (measured art 768..860 x 94..113); `TutorialButton` hidden.
- ScrollBox re-anchored in Lua: TOPLEFT at Header BOTTOMLEFT (-15, -2), BOTTOMRIGHT (-20, -2) (same with or without bar;
  settingslist.lua:79-84) = win(218..878, 128..679). View: pads top/bottom 10, left 25, right 0, spacing 9 (lua:52-55): rows
  x 243..878 (635 wide, centre x 560.5), first row top y 138. Row pitch 26 + 9 = 35; section header 45 + 9 = 54.
- ScrollBar MinimalScrollBar (8 wide) TOPLEFT at ScrollBox TOPRIGHT (0, -4), BOTTOMLEFT at BOTTOMRIGHT (-1, 7) = win(878..886,
  132..672); shown only when content overflows (Graphics, Audio). Measured top arrow 874..890 x 132..141. Proportional thumb.
- Common row (`SettingsListElementTemplate`, SP settingcontrols.xml:49-77; Init settingcontrols.lua:311-359): `Text` OVERLAY,
  font GameFontNormal, or GameFontNormalSmall (FRIZQT 10, gold) when the row has a parent initializer in the layout (:337);
  LEFT at indent + 37, RIGHT at row CENTER -85, no wrap (long labels end in "..."); indent 15 for child rows (:1, 224-226). So
  label x 280 (children 295) to 475.5. `Tooltip` frame TOPLEFT..BOTTOMRIGHT at BOTTOM -80 with `HoverBackground` (white 10 %,
  hover only; xml:4-10). Disabled look (`DisplayEnabled(false)`, :290-300): label `GRAY_FONT_COLOR`, whole row desaturated.
- Section header `SettingsListSectionHeaderTemplate` 45 tall (xml:12-34): Title GameFontHighlightLarge (16, white) TOPLEFT (7, -16)
  = x 250, top y+16 (Languages: measured x 251, y 155..169). No divider.
- Checkbox row `SettingsCheckboxControlTemplate` 280x26 (xml:106-111); `Checkbox` (SettingsCheckboxTemplate 30x29, xml:79-95:
  normal/pushed `checkbox-minimal` set1, checked `checkmark-minimal` retail, disabled-checked `checkmark-minimal-disabled`
  retail) created in OnLoad at LEFT (row CENTER -80, 0) (lua:589-603) = x 480.5..510.5, centred on the row. Measured box
  483..507 x 140..162 on row 138.
- Slider row `SettingsSliderControlTemplate`: `MinimalSliderWithSteppersTemplate` (250x40; SX shared/slider/minimalslider.xml:34-98)
  width 250 at LEFT (CENTER -80, +3) (lua:691-697) = x 480.5..730.5, centre 3 px above the row's. Inside: `Slider` 19 in on each
  side = 499.5..711.5 (bar `Minimal_SliderBar_Left/Right` 11x17 + `_Minimal_SliderBar_Middle`, thumb `Minimal_SliderBar_Button`
  20x19, set1); `Back` 11x19 (`Minimal_SliderBar_Button_Left`) at slider LEFT -4 = 484.5..495.5; `Forward` 9x18 at RIGHT +4 =
  715.5..724.5; `RightText` GameFontNormal at slider RIGHT +25 = x 736.5 (measured "100%" glyphs from 740). Steppers at min/max
  disabled: alpha 0.5 + desaturated (minimalslider.lua:2, 106-123). Disabled slider: thumb alpha 0.7, labels GRAY (:174-200).
- Dropdown row `SettingsDropdownControlTemplate`: `Control` = `SettingsDropdownWithButtonsTemplate` (Metal2DropdownWithSteppers
  AndLabelTemplate: DropdownWithSteppersTemplate 223x38 + `Dropdown` WowStyle2DropdownTemplate at CENTER; SP settingcontrols.xml:
  169-189) at LEFT (CENTER -48, +3), dropdown width 220 (lua:802-818) = control 512.5..735.5, dropdown 514..734 x 25 tall.
  Dropdown (blizzard_menu/menutemplates.xml:4-54): `Background` `common-dropdown-c-button` (set1 39x39) stretched (-7, 7)/(7, -7),
  `-disabled` when disabled; `Text` GameFontNormal centred, LEFT 13 / RIGHT -13, gold, `DISABLED_FONT_COLOR` when disabled;
  hover arrow hidden (menutemplates.lua:1077-1107). Steppers (WowStyle2IconButtonTemplate 26x25, xml:56-84; background
  `common-dropdown-c-button` / `-disabled`, icon `common-dropdown-icon-back`/`-next` 17x17 retail or their `-disabled`; lua:1210-1233):
  Decrement RIGHT at dropdown LEFT -5 = 483..509, Increment LEFT at RIGHT +4 = 738..764 (SX mainline/shareduipaneltemplates.lua:
  1349-1356); each enabled only if a previous / next option exists (:1413-1432). Measured 487..762 x 172..194 on row 173.
  Shown only when the options have radio entries (settingcontrols.lua:863-869). Default text `CUSTOM` when no option
  matches (SP blizzard_settings.lua:561).
- Checkbox + slider row `SettingsCheckboxSliderControlTemplate` (lua:1327-1335, 1443-1449): checkbox as above; slider width 214
  at checkbox RIGHT +5 = 515.5..729.5 (bar 534.5..710.5, value text x 735.5); slider enabled only when checked.
- Button row (not in these screenshots): UIPanelButtonTemplate width 200 at LEFT (CENTER -40, 0) (lua:920-972).
- Enable state (`EvaluateState`): a child with a modify predicate is disabled while the predicate is false
  (`SettingsControlMixin:IsEnabled`, lua:536-544; `SetParentInitializer`, :120-131); checkbox rows are also disabled when an
  option marked `disabled` isn't the current value (:646-664).

## 5. Categories in full (rows top-down; y = row top; values as in the screenshots)

- **Network** (SD network.lua:6-22), .08: `ADVANCED_COMBAT_LOGGING` checkbox y 138, off; `OPTIMIZE_NETWORK_SPEED` checkbox 173,
  on; `USEIPV6` checkbox 208, off (the last two only without build option DisableNagleAndIPV6Options). Measured labels
  x 282, centres 152 / 186.5 / 221. No scroll bar.
- **Keyboard Options** (`MAC_SETTINGS_LABEL`, SD mac.lua:1-17), .11: `MAC_DISABLE_OS_SHORTCUTS` checkbox 138, off;
  `MAC_USE_COMMAND_LEFT_CLICK_AS_RIGHT_CLICK` checkbox 173, on (label truncated with "..." at x 475.5).
- **Audio** (SD audio.lua:400-580), .05, scroll bar shown: `ENABLE_SOUND` cb 138 on; `AUDIO_OUTPUT_DEVICE` dropdown 173
  (value = the sound API's driver 0 name, not a string tag; back stepper disabled); `MASTER_VOLUME` slider 208 100%; children
  (small font, x 295, parent without predicate, always enabled): `MUSIC_VOLUME` 243 40%, `FX_VOLUME` 278 100%, `AMBIENCE_VOLUME`
  313 60%, `DIALOG_VOLUME` 348 100% (volume sliders 0-1 step .05, `FormatPercentage`); `ENABLE_MUSIC` cb 383 on, children
  `ENABLE_MUSIC_LOOPING` 418 on, `ENABLE_PET_BATTLE_MUSIC` 453 on (only if that cvar exists); `ENABLE_SOUNDFX` 488 on, children
  `ENABLE_PET_SOUNDS` 523 on, `ENABLE_EMOTE_SOUNDS` 558 on; `GAMEPLAY_SFX_VOLUME` checkbox+slider 593 on, 100%
  (SP mainline/audiooverrides.lua:70-78); `ENABLE_DIALOG` 628 on, child `ENABLE_ERROR_SPEECH` 663 on (cut at the bottom).
  Below the fold: `ENABLE_AMBIENCE`, `ENABLE_BGSOUND`, `ENABLE_REVERB`, `ENABLE_SOFTWARE_HRTF` (cbs), `AUDIO_CHANNELS` slider
  20-128, `AUDIO_CACHE_SIZE` dropdown. Ping, encounter-warning and voice sections are game-only (audiooverrides.lua:4, 39;
  audio.lua:556). Content: 22 rows = 22 x 26 + 21 x 9 + 20 = 781 px in a 551 px view.
- **Languages and Social** (SD languages.lua:142-183), .07: section header `LANGUAGES_LABEL` 138; `LOCALE_TEXT_LABEL` 192 and
  `LOCALE_AUDIO_LABEL` 227: `SettingsLanguageTemplate` / `SettingsAudioLocaleTemplate` (SD languages.xml:40-47), dropdown
  without steppers (`forceSteppersHidden`, lua:106-110), text hidden, value drawn as atlas `Lang-Regions-enUS` (retail 45x22,
  `Interface\Common\OptionsLanguages`) at the dropdown's LEFT (7, -3) (xml:5-15, lua:37-60); restart row 262 (512x22, texture
  hidden while the locale is unchanged). Camelot's social settings are skipped at glue (SP camelot/languagesoverrides.lua:3-9).
- **Interface** (SD mainline/text.lua:56-108), .13: header `ACCESSIBILITY_INTERFACE_SECTION_DISPLAY` 138; `ACCESSIBILITY_FONT_SIZE_LABEL`
  dropdown 192 and `ENABLE_QUEST_TEXT_CONTRAST` dropdown 227 (only if cvar questTextContrast exists): both show `CUSTOM`
  (no option matched at glue: inference); steppers as in the screenshot (text scale: back on, next off; contrast: back off, next on).
- **Audio Assist** (SD audioassist.lua:57-92; glue runs only the narrator part, :1303-1313), .15: header `SCREEN_NARRATOR` 138;
  `ENABLE_SCREEN_NARRATOR` cb 192 off; children, greyed because the predicate (narrator enabled) is false:
  `SCREEN_NARRATOR_VOICE` dropdown 227 (voice name from the TTS API), `SCREEN_NARRATOR_SPEECH_RATE` slider 262 value 0,
  `SCREEN_NARRATOR_SPEECH_VOLUME` slider 297 value 100 (plain number formatter).
- **Subtitles** (SD subtitles.lua:67-169), .16: header `CINEMATIC_SUBTITLES_DISPLAY_SUBHEADER` 138; preview panel row 192, 1 px
  tall (`SubtitlePreviewTemplate`, SD subtitles.xml:3-44): `Preview` 200x60 strata TOOLTIP at BOTTOMRIGHT = its TOPRIGHT =
  win(678..878, 132..192), backdrop hidden in OnShow (lua:30-38); `PreviewFontString` MovieSubtitleFont
  `CINEMATIC_SUBTITLES_PREVIEW_LABEL` at (-5, -20); its background colour texture at (-5, 5)/(-5, -5): measured win(668..868,
  147..179), dark at alpha 0.7. `CINEMATIC_SUBTITLES` cb 202 on; `CINEMATIC_SUBTITLES_BACKGROUND_COLOR_OPTION_LABEL` dropdown 237
  `CINEMATIC_SUBTITLES_BACKGROUND_OPTION_DARK` (shown while subtitles are on); `CINEMATIC_SUBTITLES_BACKGROUND_OPACITY_OPTION_LABEL`
  slider 272, 50-100 step 10, `PERCENTAGE_STRING` 70% (shown while background > 1). Measured cb centre 215. OK.
- **Graphics** (SD graphics.lua:759-1655; less detail), .02, scroll bar shown: `PRIMARY_MONITOR` dd 138; `DISPLAY_MODE` dd 173;
  `WINDOW_SIZE` dd 208; child `RENDER_SCALE` slider 243 (formatter "resolution (percent)", :895-911); `USE_UISCALE`
  checkbox+slider 278, off, slider 90% greyed (:922-950); `VERTICAL_SYNC` dd 313 (`VIDEO_OPTIONS_ENABLED`); `LOW_LATENCY_MODE`
  dd 348; `ANTIALIASING` dd 383 (`FXAA_CMAA_LABEL`); children: `FXAA_CMAA_LABEL` dd 418 (`ANTIALIASING_CMAA2`, enabled for
  image/advanced AA, :1100-1104), `MSAA_LABEL` dd 453 (`VIDEO_OPTIONS_NONE`) and `MULTISAMPLE_ALPHA_TEST` cb 488 (checked,
  disabled-checked art) both greyed: enabled only for multisample/advanced AA (:1146-1175); `CHARACTER_MODELS` dd 523
  (`HIGH_DEFINITION`; SP mainline/graphicsoverrides.lua:83-120, shown with the SD/HD rule); `CAMERA_FOV` slider 558 value 90 (step 5);
  `GRAPHICS_QUALITY` section 593 (`SettingsAdvancedQualitySectionTemplate`, graphics.xml:240-310: Base / Raid tabs,
  `BASE_GRAPHICS_QUALITY` wide slider 550 px, value 7), then `ADVANCED_LABEL` section and more below the fold.

## 6. Gaps and scenario pitfalls

- Art not on disk: fdid **8086468** (set1 Options sheet: `Options_InnerFrame`, `Options_CategoryHeader_1/2/3`, `Options_List_Hover`,
  `Options_HorizontalDivider`) and **8086434** (set1 minimal slider bar, thumb, back/forward). Retail versions are on disk
  (`Interface\OptionsFrame\Options` 1318750, `Interface\Buttons\MinimalSliderBar` 4567914) but are not Forever's look. On
  disk: metal frame 8069114/16/18, `checkbox-minimal` 8086474, `RedButton-*` 8107307, search 8086476, dropdown 8069112,
  scroll bar 8069100/02, `MinimalCheckbox` 4614134, `CommonDropdown` 5390329, `OptionsLanguages`.
- `common-dropdown-c-button` in set1 comes back without slice margins (retail has 12/0/12/0) though it is stretched to
  234x39: check the slice table for the set1 element before drawing.
- Values from client APIs, not strings: output device, monitor, resolution, display mode, TTS voice. A check page must take them
  from the screenshots.
- Everything in the two lists is made in Lua: category headers/buttons/spacers (ScrollBox factory), setting rows, and each row's
  Checkbox / SliderWithSteppers / Control / Button (`CreateFrame` in the control mixins' OnLoad). A scenario must instantiate the
  templates, stretch rows to the scroll target, apply the Lua anchors above, and do what the (not run) OnLoads do: panel title
  and button texts, the Camelot close anchor, stepper anchors, WowStyle2 icon-button atlases (the XML textures have none),
  slider value labels (`FormatValue` shows them), checkbox checked state, enable/grey state.
- The category list has conflicting anchors (TOPLEFT x 18 vs BOTTOMLEFT x 178 plus a Size): use left 18, width 199, height from
  the two anchors (602); the ScrollBoxes' XML anchors are replaced by the Lua ones.
- `modernui.load_crawled` ignores `AllowLoad: Glue/Game` and LoadOnDemand; for this page skip `Blizzard_SettingsDefinitions_Frame`
  (game only) and treat the page as glue (strata DIALOG, `SYSTEMOPTIONS_MENU`, BlockingFrame behind).
- Hover states in the screenshots (section 3) are the mouse, not state: leave them out of the default page.
