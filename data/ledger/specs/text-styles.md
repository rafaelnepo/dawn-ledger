# Text styles: every style Forever UI draws, and where (first draft, task 25; guidelines for task 43)

Session 55 (2026-10-02), a first draft, read-only on the addon: an inventory of every `CreateFontString`, `SetFontObject`,
`CreateFont`, `SetFont`, `SetTextColor` and `SetShadow*` in `addons/ForeverUI/*.lua` (ForeverUI 0.228.3: 360 font strings,
191 colour calls), grouped into the styles below. Each style is a CSS-like block (the user's format for visual docs: memory
visual-docs-format), its uses (file:line, a few each; line numbers as of the working tree on 2026-10-02, 0.228.x, while another session edited a few files: they drift), then the merge candidates and a draft of
the guidelines. Nothing in the addon changed.

**How a style is made in 1.14.2:** a font object of the game (its file, size, outline, shadow and colour, from the client's
FrameXML: `Fonts.xml`, `SharedFontStyles.xml`, `FontStyles.xml`, read from `(private files)`), then
our own colour on top (`SetTextColor`) when the font object's colour isn't the one wanted. `ns.Font(name, fallback)`
(Core.lua:480) asks for a font object by name and falls back when the client lacks it: four of the names we ask for don't
exist in 1.14.2, so the fallback is what the game draws (see “Font objects we ask for that 1.14.2 doesn't have”).

**The preview:** `python3 tools/asset-extract/text_styles_preview.py` reads the code blocks of this page and draws each style
with the game's own fonts (`(private files)`) into
`(private files)` (`index.html`; http://localhost:8777/ui-forever/text-styles/ with the
wow-assets-gallery server). Local only: Blizzard's fonts stay in `(a file on the server's Mac)`. Still to come for the 25 format: an
in-game shot of each (/fui shot, cropped) and GIFs of hover and highlight.

**The block's keys:** `font` (the file and size in UI pixels), `outline` (none, normal, thick; `monochrome` when the font
object says so), `shadow` (x y colour, or none), `color` (one or more, `|` between variants), `sample` (the preview's line,
in the game's wording where there is one). The comment after the selector names the font object.

## Headings

### 1. Hero title (banners)

```css
.hero-title {                      /* GameFont_Gigantic */
  font: FRIZQT__.TTF 32px;
  outline: none;
  shadow: 1px -1px #000000;
  color: #ffd100;                  /* NORMAL_FONT_COLOR, gold */
  sample: "2 New Spells";
}
```

The level-up and progress banners' big line. ProgressFeed.lua:358 (the level-up banner's title), :1059 (“2 New Spells”),
:1072 (the hero's name).

### 2. Guild welcome title

```css
.guild-title {                     /* Game30Font */
  font: FRIZQT__.TTF 30px;
  outline: none;
  shadow: none;
  color: #ffffff;
  sample: "Guild";
}
```

Guild.lua:163 (the no-guild page's “Guild” over its art). One use; 2 px under the hero title (merge candidate J).

### 3. Page title

```css
.page-title {                      /* GameFontHighlightHuge | GameFontNormalHuge | SystemFont_Huge1 */
  font: FRIZQT__.TTF 20px;
  outline: none;
  shadow: 1px -1px #000000;
  color: #ffffff | #ffd100;
  sample: "Accessibility";
}
```

White: Options.lua:706, :968 (an options page's title); Professions.lua:2779 (SystemFont_Huge1, its shadow set by hand at
:2781). Gold: Pet.lua:125 (the pet scene's title), StatusBars.lua:193 and :198 (“Level 23” at the top of the XP bar's tooltip).

### 4. Banner line

```css
.banner-line {                     /* SystemFont_Shadow_Large */
  font: FRIZQT__.TTF 16px;
  outline: none;
  shadow: 1px -1px #000000;
  color: #ffd100 | #ffffff;        /* the gold line, then the white one under it */
  sample: "Congratulations!";
}
```

ProgressFeed.lua:350 (congrats, gold), :354 (the line under it, white), :1055 (“New Spells Learned”, gold), :1057 (the
class's voice, white).

### 5. Section title

```css
.section-title {                   /* GameFontHighlightLarge */
  font: FRIZQT__.TTF 16px;
  outline: none;
  shadow: 1px -1px #000000;
  color: #ffffff;
  sample: "Controls";
}
```

Options.lua:455 (a section header in an options page), EditUI.lua:1007 (Customize Interface's title), MacroBuilder.lua:265,
Professions.lua:3905 (the recipe card's title), SkinTalents.lua:548 (a talent tree's title), PvP.lua:80 and :168 (the rank).

### 6. Section title, gold

```css
.section-title-gold {              /* GameFontNormalLarge */
  font: FRIZQT__.TTF 16px;
  outline: none;
  shadow: 1px -1px #000000;
  color: #ffd100;
  sample: "Elwynn Forest";
}
```

AdventureJournal.lua:354 (a chapter's head), Character.lua:718 (the level line), PvP.lua:58 (a reward's label),
ProgressFeed.lua:1108 (a feed entry's name), SkinQuestLog.lua:56 (the quest log's zone headers: Game15Font_Shadow asked,
this drawn), TypeTest.lua:33.

### 7. Pane title

```css
.pane-title {                      /* GameFontNormalMed3 (gold) | GameFontHighlightMedium, GameFontHighlightMed2 (white) */
  font: FRIZQT__.TTF 14px;
  outline: none;
  shadow: 1px -1px #000000;
  color: #ffd100 | #ffffff;
  sample: "Peacebloom";
}
```

Gold: InspectTabs.lua:209, :286 (a card's name), LootToasts.lua:163 (the loot toast's item name), Professions.lua:2102,
:2103. White: Widgets.lua:495 (ns.CreateSidePane's title: the gold font recoloured white), LootToasts.lua:297 (the
amount, the same), EditUI.lua:659, Options.lua:1179, Fishing.lua:766 and GatherJournal.lua:688 (a tooltip's name),
Professions.lua:1094 (a recipe's product), :2824 (a pet's name), SkinTalents.lua:110.

### 8. Dialog header

```css
.dialog-header {                   /* GameFontNormalMed1 */
  font: FRIZQT__.TTF 13px;
  outline: none;
  shadow: 1px -1px #000000;
  color: #ffd100;
  sample: "Model Tuning";
}
```

Widgets.lua:1415 (the diamond-metal header of a dialog), Guild.lua:166 (the no-guild page's text), :1004. The only 13.

### 9. Window title

```css
.window-title {                    /* GameFontNormal */
  font: FRIZQT__.TTF 12px;
  outline: none;
  shadow: 1px -1px #000000;
  color: #ffd100;
  sample: "Character Info";
}
```

Core.lua:1031 (every window's title on its border), Guild.lua:1146, InspectTabs.lua:292. The same font object as the label
(10): a window title is set apart by its place, not its type.

## Body text

### 10. Label (gold)

```css
.label {                           /* GameFontNormal, GameFontNormalLeft */
  font: FRIZQT__.TTF 12px;
  outline: none;
  shadow: 1px -1px #000000;
  color: #ffd100;
  sample: "Show Item Levels";
}
```

The most used style (63 font strings). Widgets.lua:469 (a checkbox's label), :581 (an info pane's row label, on
UI-Character-Info-Title), :1439 (a button's text), Widgets.lua:81 (a list header's name, GameFontNormalLeft), Character.lua:574,
Bank.lua:243, Guild.lua:1018 (“Message of the Day”), Options.lua:1206.
The quest tracker starts from it and sets its own size (23).

### 11. Body (white)

```css
.body {                            /* GameFontHighlight */
  font: FRIZQT__.TTF 12px;
  outline: none;
  shadow: 1px -1px #000000;
  color: #ffffff;
  sample: "Stamina 42";
}
```

57 font strings. Widgets.lua:126 (a list row's name), Character.lua:575 (a stat's value), Professions.lua:1099 (a recipe's
description), SkinGameMenu.lua:108, Statistics.lua:328, MacroGuide.lua:100, Rings.lua:131.

### 12. Recipe row (parchment white)

```css
.recipe-row {                      /* GameFontHighlight_NoShadow (not in 1.14.2: GameFontHighlight draws) */
  font: FRIZQT__.TTF 12px;
  outline: none;
  shadow: 1px -1px #000000;        /* meant to have none: the fallback brings the shadow back */
  color: #e2dcd6 | #a69e8f;        /* the name and count; the right column */
  sample: "Linen Bandage";
}
```

Professions.lua:663 (a recipe's name), :668 (its count), :672 (the right column, #a69e8f).

### 13. Caption (small white)

```css
.caption {                         /* GameFontHighlightSmall */
  font: FRIZQT__.TTF 10px;
  outline: none;
  shadow: 1px -1px #000000;
  color: #ffffff;
  sample: "45.6, 76.4";
}
```

58 font strings, 24 of them recoloured (styles 14 and 15). Uncoloured: SkinCastBar.lua:132 and :134 (the cast bar's text and time),
SkinMap.lua:364 and :368 (the player's and the cursor's coordinates), Guild.lua:282, MacroWindow.lua:326, SwingTimer.lua:144,
Widgets.lua:1516, :1558.

### 14. Caption, warm

```css
.caption-warm {                    /* GameFontHighlightSmall, recoloured */
  font: FRIZQT__.TTF 10px;
  outline: none;
  shadow: 1px -1px #000000;
  color: #d9d1bd | #e0dbcf | #e0d6c2 | #c9c2b0 | #f2f2f2;
  sample: "Found in the shallows of Mulgore";
}
```

A description in a warm off-white, five near-identical shades (merge candidate D). #d9d1bd: Professions.lua:2127, :2136, :2148
(the recipe card's description), InspectTabs.lua:211, :288, :316, Fishing.lua:680, GatherJournal.lua:607. #e0dbcf:
LootToasts.lua:553, ProgressFeed.lua:344, :1049 (a banner's caption). #e0d6c2: Professions.lua:3909, :3915, SkinTalents.lua:552.
#c9c2b0: MacroLibrary.lua:191. #f2f2f2: SkinMerchant.lua:431, SkinTrainer.lua:391 (a greeting).

### 15. Muted (the right column)

```css
.muted {                           /* GameFontHighlight, GameFontHighlightSmall, recoloured; also |cff... inline */
  font: FRIZQT__.TTF 12px | 10px;
  outline: none;
  shadow: 1px -1px #000000;
  color: #a69e8f | #b0a899 | #b0a898;
  sample: "12 / 75";
}
```

Secondary numbers and notes beside a name. #a69e8f: AdventureJournal.lua:431, Professions.lua:4047, :4051 (and :672, 12).
#b0a899: LootToasts.lua:522, ProgressFeed.lua:1084 (the next rank). `|cffb0a898` inline, six times. Darker still, inline:
#a79f90, #9e9788, #8c857a, #8a8577, #8a8478, #7a7468 (one or two each).

### 16. Small label (gold)

```css
.small-label {                     /* GameFontNormalSmall */
  font: FRIZQT__.TTF 10px;
  outline: none;
  shadow: 1px -1px #000000;
  color: #ffd100 | #f8ef94;        /* gold; Guild's edit-button yellow (EDIT_COLOR) */
  sample: "Movement";
}
```

KeyBindings.lua:715, :865 (a binding's group and label), LootToasts.lua:294, SkinMinimap.lua:403 (a town's header),
SkinTrainer.lua:217, TotemTimers.lua:64 (a totem's time), Widgets.lua:1546, :1647. #f8ef94: Guild.lua:977.

## Quiet text

### 17. Hint (small grey)

```css
.hint {                            /* GameFontDisableSmall (and SystemFont_Shadow_Small) */
  font: FRIZQT__.TTF 10px;
  outline: none;
  shadow: 1px -1px #000000;
  color: #808080 | #8c8c8c | #999999 | #9e9687;
  sample: "Right-click to change";
}
```

#808080: KeyBindings.lua:577, :687, MacroWindow.lua:288, Options.lua:749, :1193 (a separator), Rings.lua:134,
SkinQuestLog.lua:380, SkinSpellBook.lua:801, Widgets.lua:1564, :1568, :1621. #8c8c8c: SkinTrainer.lua:229 (a known spell's
note, SystemFont_Shadow_Small). #999999: Professions.lua:1182 (GameFontNormalSmall recoloured). #9e9687: KeyBindings.lua:1205.

### 18. Empty state

```css
.empty-state {                     /* GameFontDisable */
  font: FRIZQT__.TTF 12px;
  outline: none;
  shadow: 1px -1px #000000;
  color: #808080;
  sample: "Select a talent to see its ranks";
}
```

The grey prompt of an empty pane (centred, 170 wide). Widgets.lua:527 (ns.CreateSidePane's), Character.lua:1178, Guild.lua:1084,
:1167, InspectTabs.lua:47, MacroLibrary.lua:288, Bank.lua:262, EditUI.lua:1123.

### 19. Search box

```css
.search-prompt {                   /* GameFontDisableSmall, recoloured */
  font: FRIZQT__.TTF 10px;
  outline: none;
  shadow: 1px -1px #000000;
  color: #595959;
  sample: "Search";
}
.search-text {                     /* ChatFontSmall */
  font: ARIALN.TTF 12px;
  outline: none;
  shadow: 1px -1px #000000;
  color: #ffffff;
  sample: "copper";
}
```

The prompt: Bags.lua:415, SpellBook.lua:342, Professions.lua:786, Fishing.lua:610, GatherJournal.lua:534. The typed text:
Bags.lua:405, SpellBook.lua:335, Professions.lua:779, Fishing.lua:604, GatherJournal.lua:528, MacroBuilder.lua:396 (the last
four also set #595959 on the box itself).

### 20. Input

```css
.input {                           /* ChatFontNormal */
  font: ARIALN.TTF 14px;
  outline: none;
  shadow: 1px -1px #000000;
  color: #ffffff;
  sample: "/cast [@mouseover] Healing Wave";
}
```

Typed text in a large box: Guild.lua:810 and :834 (the message of the day), MacroBuilder.lua:233 (a macro's text), :302 (its
name), Professions.lua:1541.

## Over art and the world

### 21. Number on an icon

```css
.number {                          /* NumberFontNormal (and the two missing outlines that fall back to it) */
  font: ARIALN.TTF 14px;
  outline: normal;
  shadow: none;
  color: #ffffff;
  sample: "20";
}
.number-small {                    /* NumberFontNormalSmall */
  font: ARIALN.TTF 12px;
  outline: thick;
  monochrome: true;
  shadow: none;
  color: #ffffff | #ff1a1a;        /* a stack; durability low */
  sample: "63";
}
```

Character.lua:1434 (a slot's count), :1522 and CharacterFrame.lua:160 (an item's level), LootToasts.lua:157 (a stack),
SkinTalents.lua:179 (a talent's rank: SystemFont16_Shadow_ThickOutline asked), Number12FontOutline (one use). Small:
CharacterFrame.lua:162 (durability, red); NumberFontNormalSmallGray (#999999) once.

### 22. Bar text

```css
.bar-text {                        /* SystemFont_Outline_Small; ForeverUIBarText_power 2 smaller */
  font: FRIZQT__.TTF 10px;
  outline: normal;
  shadow: none;
  color: #ffffff;
  sample: "1,240 / 1,240";
}
```

SkinUnitFrames.lua:473 (health and power on the unit frames), :135 (power, 8), TextStatusBarText once.

### 23. Quest tracker

```css
.tracker {                         /* SetFont by hand (SkinTracker.lua:55) */
  font: FRIZQT__.TTF 12px;         /* the tracker's Text Size setting, 12 to 20; the bands 2 more */
  outline: none;
  shadow: 1px -1px #000000;
  color: #ffd100 | #ffffff;        /* a title; a line (colours by state: SkinTracker.lua:62) */
  sample: "The Hunt Begins";
}
```

SkinTracker.lua:266, :304, :308, :324 (the band, the dash, a line, a title).

### 24. Name plate, key cap

```css
.nameplate {                       /* SetFont: HEALTH_BAR_FONT_HEIGHT */
  font: FRIZQT__.TTF 14px;
  outline: normal;
  shadow: none;
  color: #ff0000;                  /* the game's reaction colour: hostile shown */
  sample: "Plainstrider";
}
.key-cap {                         /* ForeverUIKeyCapFont */
  font: FRIZQT__.TTF 11px;
  outline: normal;
  shadow: none;
  color: #d1c9b8;                  /* 80% opaque; white over an icon, gold on a shown modifier */
  sample: "Shift";
}
```

SkinNameplates.lua:105 (the name; the level SystemFont_NamePlateLevel, 10, shadow 0.64). KeyBindings.lua:460 (the
keyboard's caps: “the game's fonts have no bold, so Friz Quadrata with an outline”).

### 25. Parchment ink

```css
.ink {                             /* SystemFont_Huge2 24 | SystemFont_Large 16 | SystemFont_Med3 14 | SystemFont_Med1 12 */
  font: FRIZQT__.TTF 24px | 16px | 14px | 12px;
  outline: none;
  shadow: none;
  color: #2e1b0f;                  /* SPELLBOOK_FONT_COLOR */
  background: parchment;
  sample: "Frost";
}
.ink-recipe {                      /* the recipe card on parchment (Professions.lua:4111) */
  font: FRIZQT__.TTF 12px;
  outline: none;
  shadow: none;
  color: #331f0d | #732108 | #664f36;  /* INK, INK_HEAD, INK_MUTED */
  background: parchment;
  sample: "Reagents";
}
```

The spell book: SpellBook.lua:381 and SkinSpellBook.lua:773 (a school's header, 24), SpellBook.lua:116 (a spell's name, 16),
:120 (its rank, 12), :422 and SkinSpellBook.lua:815 (the page number, 14). The recipe card in its ink look:
Professions.lua:4114 (a heading, INK_HEAD), :4126, :4135.

## Small and special

- **Tiny**: GameFontBlackTiny (9, black, no shadow): AchievementToasts.lua:113 (“unlocked” on the toast's ribbon);
  GameFontWhiteTiny2 (8, white): one use. Not drawn in the preview (one use each).
- **Tooltips**: GameTooltipText (12, white, no shadow) and the game's tooltip lines; the colour by meaning is `ns.TIP`
  (Core.lua:656): the title white, a description gold, values white, an instruction green, an error red, a note #808080,
  something planned #66bbff. The full sheet: [tooltip-styles.md](tooltip-styles.md).
- **State colours on a template**: GameFontGreen (#00ff00): LootToasts.lua:173 (a roll's value), :600 (a “+”); GameFontRed
  (#ff1a1a): KeyBindings.lua:1366 and Options.lua:1168 (“not in combat”).
- **Gold words in white text**: `ns.Marked` (Widgets.lua:61), `|cffffd100` around the [marked] words; inline gold 20 times.

```css
.state {                           /* GameFontGreen | GameFontRed | ns.TIP.planned */
  font: FRIZQT__.TTF 12px;
  outline: none;
  shadow: 1px -1px #000000;
  color: #00ff00 | #ff1a1a | #66bbff;
  sample: "Need 87";
}
```

## Font objects we ask for that 1.14.2 doesn't have

`ns.Font` falls back, so the game draws the fallback. The intent and what's on screen differ:

| Asked for | Uses | Meant | Drawn (the fallback) |
|---|---|---|---|
| GameFontHighlight_NoShadow | 7 (Professions' recipe rows) | 12, white, no shadow | GameFontHighlight: 12, white, **shadow** |
| SystemFont16_Shadow_ThickOutline | 3 (talent ranks) | 16, thick outline | NumberFontNormal: Arial Narrow **14**, normal outline |
| Number12FontOutline | 1 | 12, outline | NumberFontNormal: **14** |
| Game15Font_Shadow | 1 (quest log headers) | 15, shadow | GameFontNormalLarge: **16** (SkinQuestLog.lua:53 says so) |

GameFontNormal_NoShadow does exist (12, gold, no shadow). A `CreateFont` of our own for each (as KeyBindings.lua:458 and
SkinQuestLog.lua:55 do) would draw what was meant; a choice for the user, not made here.

## Inconsistencies: candidates to merge

None changed; each is a proposal for the user.

- **A. Greens.** #00ff00 (GameFontGreen), #19ff19 (Guild.lua:59, :102: 0.098), #1aff1a (`ns.COLORS.GREEN_FONT`,
  `ns.TIP.instruction`, RANK_COLOR.green), #20ff20 (inline, 6), #40c040 (inline) and #40bf40 (Guild's OFFICER_COLOR).
  **Merge to GREEN_FONT #1aff1a** (Forever's); the officer green stays its own if it means “officer”. #1eff00 is the
  Uncommon quality: keep.
- **B. Reds.** #ff2020 (`RED_FONT`, inline 13), #ff1a1a (GameFontRed; durability's 1, 0.1, 0.1), #ff4040 (ProgressFeed's
  LOSS_RED and inline once). **Merge to RED_FONT #ff2020.**
- **C. Blues for “planned” and “you”.** #66bbff (`ns.COLORS.PLANNED`), #6ec7ff (SkinTalents.lua:77, PLANNED_COLOR: the same
  meaning, a second value), #7fd0ff (inline, 3), #80d1ff (MacroLibrary.lua:244), #5aa0ff (inline, 2). **Merge the planned ones to
  #66bbff**; decide whether “you” is the same meaning.
- **D. Warm off-whites.** #d9d1bd (8), #e0dbcf (3), #e0d6c2 (3), #e2dcd6 (3, at 12), #c9c2b0 (1), #f2f2f2 (2 greetings),
  #d1c9b8 (key caps). Seven shades no eye tells apart on a dark pane. **Merge to one**, #d9d1bd (the most used), the
  greetings either white or that.
- **E. Muted greys-browns.** #a69e8f (4), #b0a899 (2) and #b0a898 (inline, 6): one shade written three ways. Then #a79f90,
  #9e9788, #9e9687, #8c857a, #8a8577, #8a8478, #7a7468. **Merge to two steps**: muted #b0a898, dim #8a8577.
- **F. Greys.** #808080 (GameFontDisable, `GRAY_FONT`, `ns.TIP.note`, inline 8), #8c8c8c (SkinTrainer.lua:229), #999999
  (`LIGHT_GRAY_FONT`, Professions.lua:1182, NumberFontNormalSmallGray), #aaaaaa (inline once), #595959 (search prompts).
  **Merge to #808080 for hints and #595959 for a prompt**; #999999 only if a second step is needed. #9d9d9d is the Poor
  quality: keep.
- **G. The gold written six times.** `{ 1, 0.82, 0 }` as `ns.COLORS.NORMAL_FONT`, SkinLoot.lua:283 TITLE_GOLD,
  SkinQuestLog.lua:44 HEADER_COLOR, ProgressFeed.lua:159 GOLD, Professions.lua:2976 RANK_COLOR.yellow, SkinTalents.lua:76
  RANK_COLORS.yellow. **One name: ns.COLORS.NORMAL_FONT.** Also RANK_COLOR (Professions) and RANK_COLORS (SkinTalents) are
  the same table, and SPELLBOOK_FONT_COLOR is defined twice (SpellBook.lua:16, SkinSpellBook.lua:36).
- **H. A template recoloured into another template.** GameFontNormal set white (Fishing.lua:585, GatherJournal.lua:509,
  Professions.lua:737, Widgets.lua:517) is GameFontHighlight; GameFontHighlight set gold (Widgets.lua:796) is GameFontNormal;
  GameFontNormalMed3 set white (Widgets.lua:495, LootToasts.lua:297) is GameFontHighlightMedium; GameFontHighlightMedium set
  gold (Professions.lua:3927) is GameFontNormalMed3. **Use the template of the colour**; the code says what it draws.
- **I. Two names for one font.** GameFontHighlightMedium and GameFontHighlightMed2 (14, white); GameFontNormalMed3 and
  GameFontNormalMed2 (14, gold). **One each.**
- **J. Sizes used once or twice.** 13 (GameFontNormalMed1, 3 uses, between 12 and 14), 30 (Game30Font, beside 32), 11
  (GameFontHighlightSmall2 and the key caps), 8 and 9 (tiny). **Fold 13 into 14 or 12, 30 into 32**; 11 stays for the caps.
- **K. Shadows by hand.** Professions.lua sets 1.5 and 2 px shadows on the recipe card (:3926, :3934, :4285) where every
  template has 1; SkinTalents.lua:550 adds a shadow to a title whose template has one. **One shadow (1, -1)**, a bigger one only
  for the hero sizes.

## Guidelines (draft for task 43)

Drawn from what's there; for the user to settle, then this section becomes the rule.

**Fonts.** Friz Quadrata (FRIZQT__) for everything we write: titles, labels, body, captions, the tracker, name plates.
Arial Narrow (ARIALN) only where the game uses it: numbers over an icon (outlined) and text a player types (chat fonts).
Morpheus and Skurri: not ours (the game's mail, books and damage numbers). The fonts have no bold or italic: weight comes from
size, colour and an outline (the key caps). What each font can draw: [typography.md](typography.md).

**Sizes, a ramp of six.** 10 (captions, hints, small labels), 12 (body, labels, window titles), 14 (pane and card titles,
input), 16 (section titles, banner lines), 20 (page titles), 32 (banners). The tracker's own setting (12 to 20) and 11 for
key caps stand apart. A new style takes a step of the ramp, never a size between.

**Shadow and outline.** Every text on a pane: a 1, -1 black shadow (the templates'). An outline only over art that moves or
varies: numbers on icons, bar text, name plates, key caps. No shadow on parchment (ink).

**Colours, one per meaning** (the user's rule: docs/ui-ux-guidelines.md; tooltips' `ns.TIP`):

| Meaning | Colour | Name |
|---|---|---|
| A label, a heading, a key word (ns.Marked), an action word (“Right-click”) | #ffd100 | NORMAL_FONT |
| A value, body text, a title over art | #ffffff | WHITE |
| A description on a dark pane (proposed, D) | #d9d1bd | (new) |
| A secondary number, the right column (proposed, E) | #b0a898 | (new) |
| A hint, disabled, a note | #808080 | GRAY_FONT |
| A search prompt | #595959 | (new) |
| An instruction, a gain, “can do” | #1aff1a | GREEN_FONT |
| An error, an unmet condition, a loss | #ff2020 | RED_FONT |
| Something planned | #66bbff | PLANNED |
| Ink on parchment | #2e1b0f | SPELLBOOK_FONT_COLOR |
| A class | `ns.ClassColor` | never RAID_CLASS_COLORS |
| An item | the game's quality colours | ITEM_QUALITY_COLORS |

All of them in `ns.COLORS`, read by name; no local copies (G).

**Icons.** The user's rules and the numbered styles: [icon-styles.md](icon-styles.md) (no frame-less icons, no black corner
tips). A number on an icon is the `.number` style.

**Text itself.** The house style: [../copywriting/style-guide.md](../copywriting/style-guide.md) (American in game, curly quotes,
the ellipsis, Right-click, balanced lines through `ns.BalancedText`).
