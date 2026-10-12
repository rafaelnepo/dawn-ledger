# Typography: the fonts, what they can draw, the markup, and a plan

Session 47 (2026-10-01), step 4 of the text plan (docs/archive/kickoffs/next-session-34.md). The user: "an extreme focus on Typography,
layout, glyphs, icons ... Study how we can upgrade the Fonts to support a lot of things that are not possible yet." Added in the
same session: icons as part of the interface ("maybe not inside paragraphs"), and the markup, "if there's something to be
explored there".

Research only: nothing in the game was changed (the kickoff: ask before changing any font). Sources, all local and read on
2026-10-01: the 1.14.2 client's 16 fonts and its font XML (extracted with `cascx` to `(private files)`,
private), 1.12.1's fonts, WoW Forever's UI code (`(private files)`), the world database's `page_text`.
Glyph coverage read with fontTools 4.66.1 (in `(a file on the server's Mac)`, not the system Python). The glyph sheets
(every character of the four roman fonts, and a font-by-font table of what our texts want): `tools/fonts/glyph_sheet.py`, the
images private in `(private files)`. **Verified** means read
in the files or seen in game before; **to test** means not yet seen in game.

## What we learned

1. **Friz Quadrata already has the punctuation a careful text needs**: curly quotes and apostrophes, the en and em dash, the
   ellipsis, the no-break space, the middle dot, the bullet, ×, ‹ ›, « », ½ ¼ ¾, °, ™, §, ¶, † ‡ and every Latin-1 accented
   letter (é, ñ, ö, ç, æ, ø, ß) plus Œ œ Š š Ž ž Ł ł. Blizzard's 1.12 text uses none of them (all ASCII: text-taxonomy.md), so
   the first upgrade is a writing decision, not a font change.
2. **What no font of the roman alphabet has**: the check mark ✓ (ForeverUI uses it: open items), arrows, stars, card suits,
   circled numbers, the thin space, small capitals, old-style figures (Friz's ten digits are all one width, 640 units: tabular
   lining figures only). Arrows, stars, suits, circled numbers and Roman numerals do exist in the client's Korean and Chinese
   fonts (2002.ttf, ARKai, blei00d), which the roman member never uses.
3. **No client font has OpenType features** (no GSUB table in any of the 16), and nothing suggests the client applies them, so
   small caps, old-style figures, ligatures and fractions can only come as plain glyphs at their own code points.
4. **Book pages are HTML.** ItemTextFrame draws its page through `SimpleHTML` (as does the mail body), and 70 of the server's
   1,435 pages already use `<H1>`, `<P align>`, `<BR>` and `<IMG src>` (99 images: maps such as `11733_ungoro_256`, the PvP rank
   icons). But in 1.14.2 every tag gets the same font (`ITEM_TEXT_FONTS.default`: P, H1, H2 and H3 all ItemTextFontNormal), so a
   heading looks like body text. **Forever fixed this** with a "ParchmentLarge" material: H1 in Fancy48Font (Morpheus 48), H2 in
   Game20Font, H3 in Fancy32Font. 1.14.2 has Fancy32Font and Fancy48Font too, and an addon can set the same table: the cheapest
   visible typography upgrade there is.
5. **Forever draws some text with Slug** (`slug="true"` 35 times in 7 font families: the name plates and three large outlined
   fonts such as SystemFont_Outline_Slug_Huge2; its
   install keeps `Fonts/*.slug` caches, up to 54 MB). Slug renders glyphs from their outlines on the GPU, sharp at any size.
   1.14.2 has no `slug` attribute (none of its font files has it): we can't have it.
6. **The 1.14.2 Friz is not 1.12.1's**: one more glyph (the euro sign) and its hinting removed (no fpgm, cvt, prep). The
   "ui-forever" copy in `(private files)` is byte-identical to 1.14.2's.
7. **Licence**: Friz Quadrata is ITC's (© 1997 International Typeface Corporation), licensed to Blizzard; its embedding flag
   is Preview & Print (fsType 4), which rules out editable use. Morpheus is Restricted (fsType 1); Arial Narrow and Skurri are
   installable (0). So we don't edit or redistribute the game's fonts; anything new is our own work or an open-licence font.

## The fonts

The roman alphabet's four (1.14.2):

| File | Name | Used for | Glyphs | Coverage beyond ASCII | Kerning | Notes |
|---|---|---|---|---|---|---|
| FRIZQT__.TTF | Friz Quadrata TT 1.00 | nearly all UI text: names, tooltips, quests, zone text | 253 | Latin-1 complete; 10 of Latin Ext-A; 17 punctuation signs (U+2010, 2013, 2014, 2018, 2019, 201A, 201C, 201D, 201E, 2020, 2021, 2022, 2026, 2030, 2039, 203A, 2044); 14 maths signs | `kern` table | unhinted; ITC, Preview & Print |
| ARIALN.TTF | Arial Narrow 2.00 | chat (ChatFontNormal) and the number fonts (NumberFont_*) | 658 | Latin Ext-A complete, Greek 73, Cyrillic 94, arrows 7 (← ↑ → ↓ ↔ ↕ ↨), card suits, box drawing 40, ♦ | `kern` | the widest coverage of the four |
| MORPHEUS.TTF | Morpheus 1.00 | the Fancy fonts (Fancy12-48Font), faction names, the largest quest font, the mail body (MailFont_Large) | 253 | as Friz | `kern` | Restricted licence |
| SKURRI.TTF | Skurri 1.00 | one font: NumberFont_Outline_Huge (big numbers) | 190 | Latin-1 79 of 96; no ×, ›, •, fractions | none | |

The other twelve: FRIZQT___CYR (Friz with Cyrillic, 324 glyphs, adds №), MORPHEUS_CYR, SKURRI_CYR (the russian member);
2002.ttf / 2002B (Korean), K_Pagetext.ttf (Korean book face), K_Damage.ttf (Korean damage numbers); ARKai_T / ARKai_C / ARHei
(simplified Chinese), bHEI01B / bKAI00M / blei00d (traditional Chinese). These carry thousands of glyphs each, symbols included.

### What a text wants, and who has it

| Want | Code | Friz | Arial Narrow | Morpheus | Note |
|---|---|---|---|---|---|
| ' and " curly | U+2018/19/1C/1D | yes | yes | yes | use them (style guide) |
| … ellipsis | U+2026 | yes | yes | yes | |
| – en dash, — em dash | U+2013/14 | yes | yes | yes | ForeverUI's level banner uses —, verified in game |
| no-break space | U+00A0 | yes | yes | yes | SkinTrainer.lua already uses it |
| thin space | U+2009 | no | no | no | a no-break space or nothing |
| · • × › ‹ « » | | yes | yes | yes | |
| ½ ¼ ¾ | | yes | yes | yes | ⅓ ⅔ ⅛: Arial Narrow ⅛ only |
| − minus | U+2212 | yes | yes | yes | for "−5 Armor", not the hyphen |
| ≤ ≥ ≈ ≠ ∞ √ ◊ ƒ € | | yes | most | yes | € is the one glyph 1.14.2's Friz adds over 1.12.1's |
| fi fl ligatures | U+F001/2 | yes | no | yes | at old Mac private code points only, not U+FB01/2: not worth using |
| ✓ ✔ ✗ ☑ | U+2713... | no | no | no | an icon (`\|T\|t`) |
| → ← ↑ ↓ | U+2190... | no | yes | no | Arial Narrow only, or an icon |
| ★ ♦ ♥ ♠ ♣ ● ■ ▲ | | no | some (♦ ♥ ♠ ♣ ● ■ ▲) | no | icons |
| small caps | | no | no | no | not without a new font |
| old-style figures (1 2 3 below the line) | | no | no | no | not without a new font; the Chronicle prints them |
| é ñ ö ç æ ø ß | Latin-1 | yes | yes | yes | names like "Naiveté" |
| ā ę ő (Latin Ext-A) | | 10 only | yes | 10 only | not needed by Warcraft names |

## How the client picks a font

- **Font families by alphabet** (verified, the client's XML): every font the UI names is a `FontFamily` with five members,
  roman, korean, simplifiedchinese, traditionalchinese, russian (78 families in one file alone), each its own file and size.
  The roman member draws an English client's text. Whether a character missing from the roman font is drawn from another
  member (a Cyrillic or Chinese character in chat) or as a box is **to test**; a symbol like ✓ belongs to no alphabet, so expect
  a box. (Verified for empty glyphs: ForeverUI's first invisible font, 0.133.0, drew missing-letter boxes.)
- **Fonts from an addon load** (verified): ForeverUI's `Fonts/Invisible.ttf` (tools/fonts/make_invisible_font.py) is set as the
  engine's damage font and works. A font is a file like any other: a **new** file needs a client restart, a changed one a
  `/reload` (verified for Lua and TOC files; the same rule is expected for fonts).
- **The engine's own fonts** are four globals set at login: `STANDARD_TEXT_FONT`, `UNIT_NAME_FONT` (names over heads),
  `DAMAGE_TEXT_FONT` (floating combat text), `NAMEPLATE_FONT`. An addon can point them at its own font (ForeverUI does for the
  damage font).
- **A whole-client font swap** (a loose `Fonts\FRIZQT__.TTF` beside the game, the way Japanese players add a font:
  docs/specs/japanese.md): the 1.14.2 install has no `Fonts` folder and loads no loose files otherwise
  (docs/research/game-modding-research.md). **To test**, and only with the user's OK: it changes every text in the game.

## The markup

What the text can carry, by system. Counts are uses in 1.14.2's interface strings / Forever's.

| Code | Does | 1.14.2 / Forever | Status for us |
|---|---|---|---|
| `\|cAARRGGBB` … `\|r` | colour | 858 / 1,758 | in use |
| `\|Tpath:h:w:x:y:W:H:l:r:t:b\|t` | an inline texture; h 0 = the line's height; x, y offset it (y moves it up or down against the baseline); the last six crop a sheet | 52 / 100 | in use (`ns.AtlasMarkup`) |
| `\|Aatlas:h:w:x:y\|a` | an inline atlas region by name | 5 / 34 | works only for atlases the 1.14.2 client has (controller-support-research.md); ours go through `\|T` |
| `\|Htype:data\|h[text]\|h` | a clickable link (item, spell, quest, player, `levelup` in Forever) | 217 / 265 | **to explore**: an addon can make its own link type and catch the click (`SetItemRef` hook): clickable names in the journals, a "see the Macro Guide" link in a tooltip |
| `\|n` | a line break inside a string | 252 / 887 | in use |
| `\|4singular:plural;` | picks the form by the number before it ("%d \|4profession:professions;") | 132 / 183 | **use it** in ForeverUI's counts instead of two strings |
| `\|W` … `\|w` | keeps the words between on one line (no wrap) | 1 / 6 | **use it** for names and "Level 57" that must not break |
| `{KB\|589}`, `{$589}` | Forever's tutorial tokens: a key binding, a spell name | 0 / some | Forever's own; not in 1.14.2 |
| `$N $C $R $Gm:f; $B` | the server's quest and gossip codes (text-taxonomy.md) | | server texts |
| SimpleHTML | `<HTML><BODY>`, `<H1>`–`<H3>`, `<P align="center">`, `<BR/>`, `<IMG src width height align>` | books and mail | **use it** for our own books and letters; style the headings (below) |

## Icons in the interface

The user's direction: icons as part of the interface in some places, not inside paragraphs. What exists: `ns.AtlasMarkup` (an
icon from our atlas as `|T` markup, sized to the line), the stat icons of the level-up banner (STAT_ICONS), Forever's art set.

Where an icon can stand for or beside a word (proposals, for the user to pick):

- **Lists and states**: done / not done in the Adventure Journal (the ✓ fix), learned / not learned in the professions book,
  available / locked in the Macro Library: a check, a lock, a dot.
- **Labels on numbers**: gold, silver and copper (the game's own coin icons already), health, mana, XP, reputation, honour,
  durability.
- **Section heads** in the /fui Guide, the Macro Guide and Options: one small icon per topic (a book, a gear, a sword, a
  scroll), left of the heading, never mid-sentence.
- **Keys**: the keyboard and controller glyphs (KeyBindings.lua, ns.PadGlyph) in place of "Shift-Left Click" in tooltips.
- **Factions and classes**: the crest or the class icon before a name in lists (both factions alike).

Rules for any of them: the icon at the text's own size (`|T…:0|t`) or 1-2 px larger, never smaller; a fixed gap (a no-break
space) after it; the same icon always means the same thing; text stays readable without it (the icon adds, it doesn't replace,
except for the check mark and lock in lists); each new icon shown in the browser preview first (memory: browser preview first).

## The plan, in order

**Status (2026-10-01, session 47, Forever UI 0.191.0-0.192.0):** steps 1-4 done and installed: the style pass with ns.Typo
(tools/text/typo_pass.py, spelling_pass.py), the journal's tick, the book headings, ns.Plural for counts (|4 left until the game
shows it works). Step 6's tests: the `/fui typetest` card draws the probes (TypeTest.lua); to read in game with the user.

1. **Write with the glyphs we have** (step 3, the style guide): curly quotes and apostrophes, the em dash, the ellipsis, the
   no-break space, × for "times", in every text ForeverUI writes. No font change. The 1.12 server and client texts stay
   Blizzard's (text-taxonomy.md says what we can change and how).
2. **Fix the check mark**: an icon from our atlas in place of `✓` (AdventureJournal.lua:509 and :559; open items).
3. **Real headings in books** (the book window is already Forever's, skin part `itemtext`: docs/specs/item-text.md): set
   `ITEM_TEXT_FONTS` like Forever's ParchmentLarge (H1 Morpheus, H2 a larger Friz, H3 Morpheus
   smaller), and write the journals and any book of ours with `<H1>`, `<P align>` and `<IMG>`. Shown first in the browser
   preview (a page of the journal at 1:1).
4. **The markup we don't use yet**: `|4` plurals, `|W` no-wrap, our own `|H` links (a tested prototype first).
5. **A book face for the journals** (larger, slower step, the user to decide): a font of our own choosing for the journals'
   Chronicle voice, with old-style figures and small capitals drawn as ordinary glyphs (no OpenType in the client, so a derived
   font where those forms are the default). It must be under an open licence (the SIL Open Font License allows a renamed derived
   font); finding one means reading font sites, which needs the user's OK (web reading this session is Blizzard's site only).
   Friz Quadrata itself stays untouched (its licence).
6. **Tests in game**, each with the user's OK and the game in the user's hands: a missing glyph (✓) box or blank; Cyrillic and
   Chinese text in an English client (alphabet fallback); whether kerning is applied ("AV", "To", "Wa" against a FreeType render
   with and without the `kern` table); `|4`, `|W`, `|A` with a 1.14.2 atlas; SimpleHTML headings with the font table changed;
   a new font file from the addon (restart).

## Seen in the Chronicle (for the style guide)

From the user's scans of Chronicle Volume 1 (2016), how Blizzard's own book sets type: closed em dashes ("the world of
Warcraft—is merely"); spaced ellipses (". . ."); curly quotes; italics for titles of works, emphasis and sidebars; small capitals
for headings and captions; old-style figures (page numbers, "2000", "16,000 years before the Dark Portal"); the en dash in
date ranges ("15,000–12,200 years"); kinds of beings in lower case (titans, naaru, void lords) and proper groups capitalised (the
Burning Legion, the Pantheon). More in each book's `notes/style.md` (private, being written by this session's agents).
