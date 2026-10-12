# Japanese: a first plan (research done 2026-09-29, nothing built)

The game in Japanese in two versions, regular and graded (by school grade), on our own server and client. This page is the
starting point: what exists, how we would build it, the order, the open decisions. Research: two agents on 2026-09-29 (the web,
and the Irasutoya project's own solution).

## What exists

WoW never had an official Japanese client. Fan work, all addons:

| Project | What | For | Last update | Licence |
|---|---|---|---|---|
| Classic Quest Japanese Translator (Crynok, Zyaga), CurseForge | quest window text, by quest ID | Classic 1.13.2 / 1.15.5 | Nov 2024 | GPLv2 |
| Classic Tooltip Japanese Translator (Zyaga), CurseForge | item and spell tooltips; NPC names with Plater | Classic 1.15.5 | Nov 2024 | GPLv2 |
| WoWJapanizer / Nihongo (the source of the two above) | quests Vanilla-MoP, items, spells, talents; furigana; a bundled IPA font | Retail 7.1 / 8.0 | 2016 / 2018 | BSD |
| WoWinJapanese (all-in-one) | quests, gossip, bubbles, books, tooltips | Retail 12.1, MoP Classic; **not** Classic Era | Sep 2026 | All Rights Reserved |
| CMaNGOS `locales_*` tables | 8 languages | the server | | **no Japanese column** |

Verdict: the gap is real. For Classic, only quest text and tooltips exist, human translations from 2008-2016 retail work
(some quests changed in Cataclysm, so some don't match), unmaintained for 22 months. Nothing covers gossip, books, UI,
speech bubbles; no database, no client patch. Japanese players use the English client with a Japanese font in `Fonts\`.

## How much text (our world database, read on 2026-09-29)

| Table | Rows | Characters |
|---|---|---|
| quest_template (title, details, objectives, texts) | 4,245 | 3.22 M |
| broadcast_text (NPC speech) | 11,104 | 1.32 M |
| page_text (books, letters) | 1,435 | 0.50 M |
| npc_text (gossip greetings) | 2,446 | 0.44 M |
| item_template (names, flavour) | 17,718 | 0.40 M |
| creature_template (names, titles) | 10,384 | 0.21 M |
| gameobject_template | 10,744 | 0.14 M |
| script_texts | 1,446 | 0.08 M |
| gossip_menu_option | 2,503 | 0.08 M |
| **total** | | **~6.4 M** |

Not counted yet: spells and talents (the client's tables), zone and area names, the UI (GlobalStrings), our own addons'
text (ForeverUI, the journals, greetings).

## How we would build it

1. **An addon, not the server.** The server has no Japanese column and answers the client's enUS locale; an addon
   (`addons/Nihongo`, working name) carries the text keyed by ID and swaps it in where it shows: the quest frames and
   DialogueUI, gossip, books, tooltips, nameplates, speech bubbles, our own windows. A setting: English / 日本語 / a grade.
2. **A Japanese font bundled with it.** 1.14.2 may draw kana with the Chinese fonts it knows (untested; kanji would take
   Chinese shapes); the English 1.12 client draws nothing. An open-licence font (Noto Sans JP or Source Han, OFL; IPAex)
   set on our text only; a Mincho for books. Needs a download OK.
3. **A glossary before any sentence.** Proper nouns (zones, factions, races, classes, named NPCs) drawn from the text by
   frequency, one Japanese form each, reviewed by a person. Reference forms: Hearthstone's official Japanese names (the
   Japanese community's choice). Irasutoya's lesson: one term drifted into two translations; its local model got 41% of
   one category wrong with the same mistake every time.
4. **The regular translation by Claude** through the Message Batches API, one row per ID, a JSON schema, the glossary in
   a cached system prompt, the in-game text rules (no dates, lore voice by race and place). Irasutoya's cost pattern:
   `--estimate`, `--submit --i-approve-the-cost`, `--collect`, `--apply`, a `--budget` stop, rows already done skipped.
   The model chosen on a spread sample, not a slice (a slice reversed the result there).
5. **Rules held in code, not the prompt.** Validators on every row: `$N $C $R` and `$Gmale:female;` kept, glossary terms
   used, no English left over, lengths that fit their frames; failures re-queued. A person reads a sample per zone.
6. **The graded version: Irasutoya's こども mode.** It is kana, not a second translation: a kanji above the reader's
   grade (MEXT 教育漢字, 1,026 kanji; `config/kanji-grades.js`) turns its whole word into hiragana (per word, never
   消ぼう車), learner spacing (分かち書き), and a string with a word it can't read stays as written. Offline, SudachiPy
   splits each translated string into words with their readings and grades (`build_ja_words.py`); the addon keeps
   `{word, reading, grade}` and renders at the chosen grade in game (a Lua port of `kanaHTMLAtLevel` in `js/kana.js`).
   Fantasy names will need a curated reading list (Irasutoya: new vocabulary broke kana mode; only a native reader
   may add a reading). Tests after `tests/kana.test.js`: every string renders, every reading is kana, no kanji left
   at grade 0.
7. **The existing translations as a check, not a base.** The Crynok/Zyaga data is GPLv2 (anything that ships it becomes
   GPLv2); WoWJapanizer's is BSD but older. Useful to compare terms and spot errors; downloading either needs an OK.

## Order

1. **Decisions and a font test**: the open questions below; one Japanese line on a 1.14.2 frame, with and without a
   bundled font.
2. **Glossary**: the names list, reviewed.
3. **A pilot zone end to end**: Teldrassil's quests, gossip, books, items and NPC names, in game in both versions.
4. **The rest of the world text** in batches, zone by zone, with the validators.
5. **Spells, talents, zones, the UI**, then our own addons' text.
6. **Grades**: the readings list, the grade renderer, its tests.

## Open decisions (the user's)

- Who reads the Japanese: a native reviewer for the glossary and samples? (Irasutoya only lets a native reader decide
  a reading.)
- The graded version: kana by grade only, as in Irasutoya, or also simpler wording (やさしい日本語) for the lower grades,
  which would be a second translation?
- Furigana (small readings over kanji) as a third mode? WoWJapanizer had it; the 1.14.2 client has no ruby text, so it
  would be drawn by hand.
- Voice: the regular translation formal or plain, and one voice per race?
- Reuse of the GPLv2 or BSD data, or our own translation only.
