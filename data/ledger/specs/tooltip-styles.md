# Tooltip styles (research, 2026-10-01; decided 2026-10-02 but for the icon, section 9)

The user, after the icon styles (icon-styles.md): the same for tooltips, “Where are they used, what types exist, what are their
styles, contexts etc.” A numbered catalogue to choose from: F1-F17 for Forever’s looks, U1-U14 for ours, then the line colours, the
anchors, what our skin covers of 1.14.2’s own tooltips, and the decisions. Ask for a tooltip by its numbers: “the pet skill: F1, the
icon as F11, anchor A1”.

Sources: Forever’s interface code (`(private files)`, paths below relative to it; Camelot
is Forever’s own layer), Forever’s GlobalColor table (`forever/out/dbfilesclient/globalcolor.db2`, read with `forever/wdc3.py`),
1.14.2’s code (`(private files)`, by FileDataID), and `addons/ForeverUI/*.lua` at 0.199.9 (line numbers as
of this writing: Professions.lua and AdventureJournal.lua were being edited at the time).

## 1. What every tooltip is made of (both clients)

One frame type, `GameTooltip`, from one template chain: `SharedTooltipArtTemplate` (the lines, 30 inline textures, a nine-slice,
a top and a bottom overlay) > `SharedTooltipTemplate` (the default anchor, the backdrop style) > `GameTooltipTemplate` (the data,
the health bar, money, inserted frames) (blizzard_sharedxml/sharedtooltiptemplates.xml:10-102, blizzard_gametooltip/mainline/
gametooltip.xml:4-37). 1.14.2 has the same names (`SharedTooltipTemplate`, `TooltipBackdropTemplate`, the layout
`TooltipDefaultLayout`), so a skin can swap the art in place.

| Part | Forever | 1.14.2 | Where (Forever) |
|---|---|---|---|
| Border | nine-slice `Tooltip-NineSlice-*`: 7 px corners, 16 px tiled edges, a thin light line | the same layout name, classic art | blizzard_sharedxml/mainline/nineslicelayouts.lua:257-268 |
| Background | `Tooltip-NineSlice-Center` 4 px into the corners, tinted `TOOLTIP_DEFAULT_BACKGROUND_COLOR` #171730 (0.09, 0.09, 0.19), alpha 1 | the same colour | sharedtooltiptemplates.lua:47-58 |
| Fonts | line 1 `GameTooltipHeaderText` (Friz 14), others `GameTooltipText` (Friz 12), `GameTooltipTextSmall` (Friz 10); all white by default | identical sizes | blizzard_fonts_shared/shared/fontstyles.xml:314-322, fonts.xml:1273, 1385, 1403 |
| Line spacing | 2 px unless a tooltip sets its own | the same | sharedtooltiptemplates.lua:206 |
| Padding, width | set by the engine; no maximum width in Lua (long lines wrap where the engine decides); a minimum only where needed (140 with a status bar); 6 px each side for the ornate styles (F3-F5) | the same | gametooltip.lua:546, 349 |
| Strata, clamp | TOOLTIP strata, clamped to the screen, 25 px allowed off the top | 15 px | sharedtooltiptemplates.lua:14 |
| Refresh | a shown tooltip rebuilds every 0.2 s (`TOOLTIP_UPDATE_TIME`) | the same | blizzard_sharedxml/sharedconstants.lua:145 |
| Delay, fade | no delay before showing; a world unit’s and a unit frame’s tooltip fade out (`FadeOut`), everything else hides at once | the same | gametooltip.lua:982-1026, blizzard_unitframe/mainline/unitframe.lua:391-394 |
| Scale | no tooltip scale of its own: it follows the UI scale | the same | |
| Default place | the bottom-right corner of a 250 x 150 box at (-9, 85), movable in Edit Mode (HUD Tooltip) | at the bags’ edge (-CONTAINER_OFFSET_X - 13, 70): it climbs over open bags | gametooltip.xml:242-247, sharedtooltiptemplates.lua:87-114 |
| Controller | hidden while a pad drives a window (`GamepadDisableTooltips`) | none | gametooltip.lua:381-383 |

## 2. Forever’s looks (F1-F17)

| # | Style | Look | Where used | What it says | File:line |
|---|---|---|---|---|---|
| F1 | Default tooltip | as section 1: light 7 px border, navy #171730 ground, white title 14, body 12 | everything not below | the thing’s name, then lines | sharedtooltiptemplates.xml:10-102, nineslicelayouts.lua:257-268 |
| F2 | Dark | F1’s border on the darker Azerite centre | class talents, hero talents, their search icons | a talent | gametooltip.lua:336-338, 372-374; nineslicelayouts.lua:270-281; blizzard_playerspells/classtalents/blizzard_classtalentbuttontemplates.lua:73 |
| F3 | Azerite | gold ornate border, a topper and a bottom ornament, 6 px padding | Azerite items | a special item | gametooltip.lua:340-350; nineslicelayouts.lua:283-294 |
| F4 | Corrupted | N’Zoth border and topper | corrupted items | a special item | gametooltip.lua:352-360; nineslicelayouts.lua:296-307 |
| F5 | Maw (Torghast) | Maw border and topper | runeforge legendaries, `jailerstower` map points | a place’s own look | gametooltip.lua:362-378; blizzard_framexmlutil/areapoiutil.lua:50-54 |
| F6 | Glues | the login screens’ border | character select and creation | glue screens only | nineslicelayouts.lua:322-359 |
| F7 | No header | line 1 in 12, not 14 | `GameNoHeaderTooltip`, the character customisation tooltip | a sentence, no name | gametooltip.xml:313-320; sharedtooltiptemplates.xml:104-109; blizzard_customizationui/blizzard_customizationtemplates.xml:3 |
| F8 | Small header | line 1 in `SystemFont_Med2` (13) | `GameSmallHeaderTooltip` | a short title | gametooltip.xml:322-329 |
| F9 | Comparison | F1 beside the item, a small tab above it (`tooltip-compare-label`, 22 high) with “Equipped” (or “If equipped together”) in gold | Shift or the always-compare option on an item | what you wear now | gametooltip.xml:109-143; blizzard_sharedxmlgame/tooltip/tooltipcomparisonmanager.lua:48-146, 245-247 |
| F10 | Linked item (ItemRef) | F1, draggable, a close button at the top right, first placed at the screen’s bottom centre (0, 80) | a clicked chat link | the item, kept open | blizzard_uipanels_game/mainline/itemref.xml:5-30; tooltipdatarules.lua:215-226 |
| F11 | Embedded item | a 28 px icon in `WhiteIconFrame` (tinted by quality) with its own tooltip beside it, inside the host tooltip | quest rewards, widgets, map points | “you get this” | gametooltip.xml:39-107, 276-311; gametooltip.lua:236-292 |
| F12 | Unit | F1 with an 8 px health bar under it (2 px in from each side, 1 px below, flat `UI-TargetingFrame-BarFill`, green) | units in the world and on unit frames | who it is | gametooltip.xml:9-23; healthbar.lua:2-32; tooltipdatarules.lua:130-141 |
| F13 | Bars inside | a 12 px green status bar with a border, or a 219 x 25 blue progress bar with two dividers | quest progress, widget sets | how far along | gametooltip.xml:145-237; gametooltip.lua:525-575 |
| F14 | Tooltip panels | F1’s art on a plain frame: ground at 1, 0 (border only) or 0.8 | autocomplete, menus, friends list popups, note backgrounds | not a tooltip | sharedtooltiptemplates.xml:111-133 |
| F15 | Disabled reason | F1 with one red line as the title | a disabled button that says why | why not | sharedtooltiptemplates.lua:133-140, 320-348 |
| F16 | Help tip | a dark gold box (gradient 0.23, 0.19, 0 down to black) with a soft yellow glow and shadow, a yellow arrow 20 px from the target, white text 196 wide in a 226 box, at least 72 tall, an optional Okay / Got it / Next / Close button | first-time hints (96 calls in 63 files): the group finder, PvP, professions | “look here” | blizzard_sharedxml/helptip.xml:3-52, helptip.lua:1-137; blizzard_helpplate/blizzard_helpplate.xml:105-200 |
| F17 | Help plate | F16’s box without a button, over a window’s “?” overlay | the help plates | what this area is | blizzard_helpplate.xml:299 |

Inside any tooltip: inline icons (`AddTexture`, 12 px by default: gem sockets, a learnable spell’s icon, 16 px quest objective
ticks), a divider (`UI-TooltipDivider-Transparent`, 200 x 10), money as text with coin icons (“Sell Price: 1 2 3” in white, red
when you can’t afford it) instead of 1.14.2’s money frame (tooltipdatarules.lua:18-113, 143-149, 192-202; gametooltip.lua:315-334;
blizzard_gametooltip/shared/gametooltipconstants.lua:6-10). No icon beside an ordinary tooltip: F11 is the only framed one, and it
sits inside. Forever’s code has no tutorial pointer apart from F16 and F17, and its “New” labels carry no tooltip
(blizzard_sharedxml/newfeaturelabel.lua).

## 3. Forever’s line colours (one meaning each)

The helpers name the role; the colour follows (sharedtooltiptemplates.lua:128-187). Values from Forever’s GlobalColor table.

| Role | Helper | Colour | Example (file:line) |
|---|---|---|---|
| Title | `GameTooltip_SetTitle` | white #ffffff (`HIGHLIGHT_FONT_COLOR`) | a talent, a stat “Strength 120” (blizzard_uipanels_game/camelot/paperdollframe.lua:2247-2260) |
| Title of a quest | the same, overridden | gold #ffd200 | gametooltip.lua:694 |
| Title of an item, a unit | from the data | quality colour; a unit by reaction (players white unless hostile or PvP) | gametooltip.lua:120-183 |
| Body: what it does | `AddNormalLine` | gold #ffd200 (`NORMAL_FONT_COLOR`) | settings (blizzard_settings_shared/blizzard_settings.lua:289-298), stats, micro menu |
| Data, values, objectives | `AddHighlightLine` | white | “Rank 2/5”, quest objectives “- 3/8 Boar Ribs” (blizzard_sharedtalentui/blizzard_sharedtalentselectiontemplates.lua:275) |
| Instruction (a click) | `AddInstructionLine` | green #19ff19 (`GREEN_FONT_COLOR`), after a blank line | “Click to learn”, “<Right click for Frame Settings>” on unit frames (unitframe.lua:396-404) |
| Error, not allowed | `AddErrorLine` | red #ff2020 (`RED_FONT_COLOR`), after a blank line | talent requirements, “Available at level 10” on the micro menu (blizzard_micromenu/mainline/mainmenubarmicrobuttons.lua:430-440) |
| Disabled, done, can’t now | `AddDisabledLine` | grey #808080 (`DISABLED_FONT_COLOR`, `GRAY_FONT_COLOR`) | finished objectives, refund instructions (blizzard_sharedtalentselectiontemplates.lua:316) |
| Pending, planned | coloured line | bright blue #66bbff (`BRIGHTBLUE_FONT_COLOR`) | “Right-click to undo” on a pending talent (…selectiontemplates.lua:325) |
| Account-wide | coloured line | #00ccff (`ACCOUNT_WIDE_FONT_COLOR`) | account quests (gametooltip.lua:673) |
| A key | inline | gold, in brackets after a white title: “Character Info (C)” | mainmenubarmicrobuttons.lua:56-60 |

Nothing beige or parchment: the lore colour `LORE_TEXT_BODY_COLOR` #cac6bd lives in books, not tooltips.

## 4. Forever’s anchors (A1-A9)

`ANCHOR_RIGHT` is the rule (762 of about 1,100 anchor mentions in the code); the rest follow the screen edge the owner sits on.

| # | Anchor | Where | File:line |
|---|---|---|---|
| A1 | `ANCHOR_RIGHT` (the tooltip’s bottom left at the owner’s top right) | window buttons, list rows, talents, spells, stats, loot, toasts, map points, micro menu, settings | gametooltip.lua passim; blizzard_sharedtalentui/blizzard_talentdisplay.lua:127-134 |
| A2 | `ANCHOR_RIGHT` nudged (-4, -4) | side tabs, PvP buttons | blizzard_sharedxml/mainline/shareduipaneltemplates.lua:406-420 |
| A3 | the default place (section 1) | units, action bars (with Detailed Tooltips on), the XP bar, minimap zoom | blizzard_actionbar/shared/actionbutton.lua:1114-1131; blizzard_statustrackingbar/mainline/expbaroverrides.lua:29-31 |
| A4 | `ANCHOR_LEFT` / `ANCHOR_BOTTOMLEFT` | things at the screen’s right: minimap, its buttons, the clock, buffs, the right-hand action bars | blizzard_minimap/mainline/minimap.lua:98, 182; gametime.lua:50; blizzard_buffframe/buffframe.lua:1116 |
| A5 | `ANCHOR_BOTTOMRIGHT` | things at the top left: totems, class power | blizzard_unitframe/mainline/totemframe.lua:78 |
| A6 | `ANCHOR_CURSOR` / `ANCHOR_CURSOR_RIGHT` | world objects (option), quest pins with mouse and keyboard, Edit Mode’s frame names | blizzard_sharedmapdataproviders/questdataprovider.lua:242; blizzard_editmode/shared/editmodesystemtemplates.lua:3315-3324 |
| A7 | per widget (eight places) | UI widgets | blizzard_uiwidgets/blizzard_uiwidgettemplatebase.lua:40-67 |
| A8 | beside the main tooltip, the side with room | comparison (F9) | tooltipcomparisonmanager.lua:91-146 |
| A9 | the target’s edge, arrow pointing at it | help tips (F16) | helptip.lua:51-130 |

Contexts with their own content rules: quest tooltips (gold title, white “- objective” lines, grey when done, then a gold
“Rewards” header with F11 items: gametooltip.lua:17-118, 645-765); the minimap’s zone (white zone, the subzone and its PvP status
in the zone’s colour: minimap.lua:175-200); the micro menu (white name, gold key, red “why not”: mainmenubarmicrobuttons.lua:426-443);
Edit Mode (gold “unsaved changes” line, the HUD Tooltip box as a movable system: blizzard_editmode/shared/editmodetemplates.lua:3-9,
editmodemanager.lua:2513-2530).

## 5. Forever UI today (U1-U14)

No shared tooltip module: `ns.SetTooltip` (Core.lua:657) serves 56 controls, and 55 more `GameTooltip:SetOwner` calls are written
by hand in 27 files. Anchors, both together: `ANCHOR_RIGHT` 86 (38 of them `ns.SetTooltip`’s default or asked for), “SIDE” 10,
`ANCHOR_TOP` 9, `ANCHOR_LEFT` 4, `ANCHOR_BOTTOM` 1, `ANCHOR_BOTTOMRIGHT` 1; then `ANCHOR_NONE` for the XP tooltip and the scanners
and `ANCHOR_CURSOR_RIGHT` for “Follow the mouse”.

| # | Style | Where (file:line) | Anchor | Lines | Against Forever |
|---|---|---|---|---|---|
| U1 | The skinned tooltip | SkinTooltips.lua:10-52 (Forever’s nine pieces swapped in on every `TooltipDefaultLayout`), 155-164 (the health bar as F12), 58-150 (balanced lines, white cooldowns) | the game’s | the game’s | as F1 and F12 |
| U2 | Simple: `ns.SetTooltip` | Core.lua:657-674; 56 callers (MacroBuilder 9, Professions 8, EditUI 5, Guild 4, Character 4) | A1 by default | white title, lines gold unless given | as Forever (title white, body gold) |
| U3 | Side tab | Core.lua:651-655 (“SIDE”: the tooltip’s left edge 2 px right of the tab, centred on it); AdventureJournal.lua:339, Professions.lua:2295-2346, SkinSpellBook.lua:531, SkinTalents.lua:891, 1057, EditUI.lua:1097, CharacterFrame.lua:70 | its own | white name | Forever A2 overlaps the tab’s corner; ours chosen by the user (2026-09-27) |
| U4 | Hand-built | 55 sites, for example KeyBindings.lua:518-540, Options.lua:346-353, SkinMicroMenu.lua:210-225 | mostly A1 | white title, gold body, then any colour (section 6) | close to Forever |
| U5 | The game’s data, our anchor | `SetItemByID` / `SetHyperlink` / `SetSpellBookItem` / `SetTalent` / `SetLootItem`: Fishing.lua:498, 687, 749; GatherJournal.lua:411, 599, 658; SpellBook.lua:98; SkinLoot.lua:98-104; SkinTalents.lua:200 | A1 | the game’s, sometimes a line added | as Forever |
| U6 | Tooltip icon | Core.lua:501-520 (`ns.TooltipIcon`: 38 px, a black 0.85 frame, 0.07 crop, outside the top-left corner); Professions.lua:701, 2851 (pet skills only) | | | Forever shows none (section 2) |
| U7 | XP bar | StatusBars.lua:188-222 (its own `ForeverUIXPTooltip`, 6 px above the bar’s right end; “Level 12!” in `GameFontNormalHuge` gold; framed icons in the lines) | above the bar | white title, gold heads, white values | Forever uses A3 and plain lines |
| U8 | Character stats | StatTooltips.lua:1-10, 425-438 (white “Name value” with green buffs and red debuffs, gold lines with white key words, grey 0.7 notes) | A1 | own palette (GOLD, WHITE, GREY 0.7, GREEN 0.125, RED 0.125) | as Forever’s stat tooltips, own greens |
| U9 | Tooltip box inside a window | Professions.lua:1084-1088 (the recipe card), Fishing.lua:763-767 and GatherJournal.lua:670-674 (the item card), Guild.lua:1152-1175 (the log) | | the name in `GameFontHighlightMed2`, the description in `GameFontHighlight` | **1.14.2’s old `UI-Tooltip-Border`**, ground 0.03 at 0.9: not F1 |
| U10 | Placed and followed | EditUI.lua:171-185, 476-490, 1403-1420 (HUD Tooltip: a movable default place, “Follow the mouse” at the pointer’s upper right (12, 8), “Hide at once”, hidden) | A3 or A6 | | Forever has the place only; the two options are ours |
| U11 | Two columns | KeyBindings.lua:533-535, 1071, 1086 (beige keys, gold actions); Professions.lua:1160-1161 (white / white); Options.lua:923-924 (grey 0.8 / white); SkinMicroMenu.lua:223 (grey 0.7 both); Bags.lua:1036 (class-coloured names / white counts) | | four colour pairs | Forever: names gold or white, values white |
| U12 | Gold title | Professions.lua:1135 (“Missing Materials”), 1159 (“Recipe Difficulty”): the first `AddLine` in gold | A1 | | Forever’s titles are white (quests aside) |
| U13 | Micro menu | SkinMicroMenu.lua:210-225 (white name, the key in gold brackets, gold description, red lock) | A1 | | as Forever |
| U14 | Toasts and timers | LootToasts.lua:181 (A4 left), TotemTimers.lua:69 (A5) | | the game’s item / white name, gold time | as Forever’s for their screen edge |

## 6. Inconsistencies in ours

1. **A click’s instruction has six colours**: green 0.1, 1, 0.1 (Professions.lua:2846, 2848; SkinTalents.lua:240), pure green
   0, 1, 0 (KeyBindings.lua:539, 1073, 1089), gold (KeyBindings.lua:520, 1299; SkinMinimap.lua:195-196), beige (MapPins.lua:54
   “Click to remove”), grey 0.5 (Character.lua:1058), grey 0.8 (SkinMinimap.lua:461 “Right-click to stop tracking.”). Forever:
   green, after a blank line. The wording varies too: “Click to plan a rank”, “Click: the controller too.”, “Click to remove”
   (with and without a full stop).
2. **“You can’t” has five colours**: red 1, 0.13, 0.13 (Options.lua:349, SkinMicroMenu.lua:215, SkinSpellBook.lua:414), red 1,
   0.25, 0.25 (Character.lua:1055), red 1, 0.4, 0.4 (Fishing.lua:1364 “Equip a fishing pole first.”), grey 0.6 (KeyBindings.lua:527),
   grey 0.5 (Professions.lua:2841, Bags.lua:1167). Forever: red for a requirement not met, grey for “not now” or “done”.
3. **Notes in nine near-greys**: beiges 0.62, 0.59, 0.53 (KeyBindings.lua:586, SkinMinimap.lua:198), 0.65, 0.62, 0.56
   (Professions.lua:3864, AdventureJournal.lua:510), 0.69, 0.66, 0.6 (GatherNodes.lua:164, MapPins.lua:54), 0.8, 0.77, 0.7
   (Professions.lua:4242), and greys 0.5, 0.6, 0.7, 0.75 (SkinTrainer.lua:245), 0.8 (Professions.lua:2767). Forever has one grey
   (#808080) and a light grey (#999999), no beige.
4. **The default body colour differs by helper**: `ns.SetTooltip`’s lines are gold unless given (Core.lua:666), StatusBars.lua:74’s
   table lines white; callers then pass white for descriptions (MacroBuilder.lua:226, 319, 407, 442, 545; Guild.lua:1089;
   Professions.lua:484-485) where Forever’s body is gold.
5. **Titles**: white almost everywhere, gold in U12, and no colour given at all in GatherNodes.lua:161, MapPins.lua:51,
   SkinMap.lua:978, Townsfolk.lua:115, 188, Character.lua:799 (they take the client’s default).
6. **A sentence as the title**: “Send it to the server now” (Help.lua:538-539), “Make it a macro of yours” (MacroLibrary.lua:209
   through `ns.ReferenceButton`, Widgets.lua:1482), “Unlearn this skill” (Professions.lua:1976). Forever names the thing in the
   title and puts the sentence in a gold line.
7. **Repeats the visible label**: the Fish button says “Fish” (Fishing.lua:1349); a stat row without a tooltip of its own repeats
   its label and value (Character.lua:581-583).
8. **Anchors for the same kind of thing**: a side tab in Guild.lua:443 uses `ANCHOR_RIGHT`, the others “SIDE”; buttons at a
   window’s foot anchor above (`ANCHOR_TOP`: Help.lua:538-558, Fishing.lua:1336-1366, GatherJournal.lua:1069-1073, every
   `ns.ReferenceButton`) while other
   buttons use A1; the training points anchor below (Professions.lua:480); the keyboard’s colour toggle to the left
   (KeyBindings.lua:1296).
9. **`ns.SetTooltip` used as a plain OnEnter**: SkinTalents.lua:674 and Professions.lua:1581 pass a function that shows the tooltip
   itself and returns nothing; it works by accident.
10. **Leaving**: 16 sites hide the tooltip only when they own it, 23 hide it whatever owns it (for example Fishing.lua:691,
    GatherJournal.lua:603, Townsfolk.lua:119).
11. **Lines broken by hand**: the keyring’s “Every key you’ve found, and” / “the ones still out there.” are two `AddLine`s
    (Bags.lua:1230-1231), where `ns.BalanceTooltipLines` balances a wrapped line.
12. **Two tooltip arts**: the tooltip itself is Forever’s (U1), the in-window tooltip boxes are 1.14.2’s (U9).
13. **One icon beside one kind of tooltip** (U6, pet skills), where Forever shows none and the rest of ours show none.
14. **No colour names**: `ns.COLORS` (Core.lua:18-28) has RED_FONT, GRAY_FONT, NORMAL_FONT and WHITE but no green, blue or
    disabled; the tooltips write numbers, and StatTooltips.lua:9 and SkinTalents.lua:77 keep their own.
15. **Missing tooltips on icon-only buttons**: a sweep of our buttons with an icon and no text found three without a tooltip:
    the chat’s jump to the bottom (SkinChat.lua:42), the tracker’s minimise (SkinTracker.lua:77) and the macro icon picker’s
    “Currently Selected” (SkinSpellBook.lua:960, labelled beside it). Forever leaves the first two bare as well.

## 7. 1.14.2’s own tooltips: what the skin covers

The skin (`tooltips` part) swaps the art on eight named tooltips at once and, through a hook on `NineSliceUtil.ApplyLayout`, on
anything laid out with `TooltipDefaultLayout` after it starts (SkinTooltips.lua:166-194). Frames the game laid out before that
and never lays out again keep the classic art.

| Tooltip or part | 1.14.2 | Skin |
|---|---|---|
| GameTooltip, ItemRefTooltip, ShoppingTooltip1-2, ItemRefShoppingTooltip1-2, EmbeddedItemTooltip, WorldMapTooltip | `GameTooltipTemplate` | Forever’s art, balanced lines, white cooldowns |
| Our own (`ForeverUIXPTooltip`, the scanners), other addons’, load-on-demand panels’ (the world map’s compare tooltips, NamePlateTooltip, ItemSocketingDescription) | the same templates | Forever’s art through the hook (to check in game for those loaded before the skin) |
| The unit tooltip’s health bar | made by the engine: full width, gradient | as F12 |
| The default place | over the bags’ edge | the game’s, unless Customize Interface placed it (U10) |
| FriendsTooltip, PartyMemberBuffTooltip, SmallTextTooltip, AutoCompleteBox, BrowserSettingsTooltip, the chat configuration boxes, the guild note and macro text backgrounds, TabardFrameCostFrame, MovePadFrame | `TooltipBackdropTemplate` (F14), laid out at load | **not covered**: classic art (the dropdown menus are skinned apart, SkinPopups.lua) |
| The comparison header | “Currently Equipped” as a grey first line | left: no F9 tab |
| Money in tooltips | a money frame (`SetTooltipMoney`) | left: Forever writes coins as text |
| ItemRefTooltip’s close button | the classic X | left |
| The unit frames’ “<Right click for Frame Settings>” | absent | not added (Forever adds it in green) |
| Fonts, colours, the backdrop’s navy | identical to Forever’s | left, nothing to do |
| Help tips (F16) | `GlowBoxTemplate` exists (the guild rename alert, a tutorial box) but no HelpTip system | none of ours |

## 8. Decisions to make (then this becomes the guideline)

1. **One anchor rule.** Forever: A1 for everything in a window, A4 / A5 by screen edge for the HUD, A3 for units and bars. Ours:
   A1 mostly, A1 above for footer buttons, “SIDE” for side tabs. Choose: A1 everywhere in windows (footer buttons too)? Keep
   “SIDE” or take A2?
2. **The colour of each meaning**, as section 3: title white, body gold, values white, instruction green after a blank line, error
   red, “not now” and notes grey #808080, planned blue (ours 0.43, 0.78, 1 or Forever’s #66bbff). The beiges go? The style guide’s
   “a last line in grey for a condition” (docs/copywriting/style-guide.md:55) becomes red when the condition is not met?
3. **The instruction’s words**: “Click to …” (Forever, no full stop) or “Click: …” (ours in places); the click word in gold inside
   a green line, or the whole line green.
4. **The title**: always the thing’s name; a sentence moves into a gold line. Buttons whose label says it all: no tooltip, or the
   name plus what it does?
5. **The icon beside the tooltip** (U6): Forever has none; keep ours for pet skills only, extend it to every spell and item of
   ours, or drop it? If kept, which icon style from icon-styles.md (F16 is Forever’s framed one).
6. **The in-window tooltip boxes** (U9): Forever’s F1 art and navy ground, or keep them as they are.
7. **The tooltip panels the skin misses** (section 7): skin them now (re-lay each out once at start) or leave.
8. **Forever’s extras**: the “Equipped” tab on comparisons (F9), coins as text, the green right-click line on unit frames, help tips
   (F16) for our first-time hints. Which are wanted?
9. **Delay and fade**: Forever shows at once and fades only units; ours adds “Hide at once” and “Follow the mouse”. Keep as
   options, or make one the default?
10. **Width**: Forever has no maximum; the style guide asks for about 45 characters a description line in narrow tooltips. Set a
    width (for example 260 px, wrap on) for our descriptions?
11. **One helper**: extend `ns.SetTooltip` so a tooltip is asked for by role (title, body, values, instruction, error, note) and
    anchor, and port the 55 hand-built sites to it.

## 9. The user’s decisions (2026-10-02, session 51)

1. **Anchor:** A1 in every window, footer buttons too; side tabs keep “SIDE”.
2. **Colours:** Forever’s palette (section 3): title white, body gold, values white, instruction green after a blank line, error
   red, notes and “not now” grey #808080, planned blue #66bbff. The beiges go. The style guide’s grey condition line turns red
   when the condition is not met.
3. **Instruction:** “Click to …” (Right-click, Shift-click alike), no full stop, the whole line green.
4. **Title:** always the thing’s name; a sentence moves to a gold line. A button whose label says it all gets the name plus a
   gold line saying what it does; nothing only repeats the label.
5. **The icon beside the tooltip (U6):** kept for pet skills for now; the user reviews tooltips and icons in the morning (with
   icon-styles.md section 4).
6. **In-window boxes (U9):** Forever’s F1 art and navy ground.
7. **Missed panels (section 7):** skinned now, each re-laid out once at start.
8. **Extras:** all four: the “Equipped” tab on comparisons, coins as text, the green right-click line on unit frames, help tips
   (F16) for our first-time hints.
9. **Delay and fade:** Forever’s by default; “Hide at once” and “Follow the mouse” stay as options, off.
10. **Width:** our description tooltips 260 px, wrapped and balanced; the game’s item and spell tooltips untouched.
11. **One helper:** `ns.SetTooltip` by role (title, body, values, instruction, error, note) and anchor; the 55 hand-built sites
    ported to it, file by file, after the quest tracker’s last steps.
