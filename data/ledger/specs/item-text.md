# The book and letter window: Forever's ItemTextFrame for 1.14.2

Built 2026-09-29 (session 35, unattended; the P3 list's item 30). ForeverUI 0.114.0, skin part `itemtext` (in
`SkinQuestFrames.lua`). Sources: Forever's `Blizzard_UIPanels_Game\Mainline\ItemTextFrame.xml`; 1.14.2's `ItemTextFrame.xml`
(804640) and `ItemTextFrame.lua` (804644). No Forever shot of a book.

## Forever and 1.14.2

Forever's is a ButtonFrameTemplate, 338 x 424 (the template's size, no button bar): the spell book's icon in the ring (53 x 51 at
(-1, 4)), the item's name as the title, the quest parchment (299 x 357 at (7, -62)) with the material (stone, marble, silver,
bronze) over it, the text in a scroll frame from (25, 6) to (-33, -83) with the minimal bar 7 right of it, the page number at the
top, Prev and Next at (75, -41) and (-23, -41). 1.14.2's is vanilla's 384 x 512 book art with the same named pieces; the game
shows or hides the materials itself.

## The skin

The conversation windows' frame (`frameOf`, now with an optional height) at 424: the rock, streaks, marble inset (to the bottom:
no button bar), the parchment 357 tall, Camelot's metal, the item's name as the title, the red close button, the settings arrow;
the spell book's icon; the materials, page number, Prev / Next and scroll frame at Forever's places; the minimal bar.
When DialogueUI is on, books open in its own book view instead.

## In game (2026-09-29)

Shown from the chat (a stand-in title and text): as described. First look: the inset's bottom edge crossed the parchment 26 px up
(the conversation windows' button bar): the inset now runs to the bottom. Not tried: a real book, a material (stone, bronze).
