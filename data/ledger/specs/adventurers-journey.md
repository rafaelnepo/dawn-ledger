# The Adventurer's Journey (plan)

The user, 2026-09-28: "The Adventurer's Journey will be focused on every 10 levels." A journal of the character's own road from 1 to
60, a book like the profession journals (docs/copywriting/chronicles.md, the Beast Journal's pages), one chapter per 10 levels. It
fills the micro menu's "Legacy" slot that says "Coming later: the Adventure Journal".

## The reference

Six slides the user shared from a hunter levelling guide (a video), one per 10 levels, each an act with a title:

| Act | Levels | Title | What the slide holds |
|---|---|---|---|
| 1 | 1-10 | Departure | the spells learned every two levels with their training cost (this level, and all so far), Beast Training at 10 and which families teach what (owls Claw, spiders Bite, boars Charge, cats can learn Bite) |
| 2 | 11-20 | Struggle | the spells every two levels, Dual Wield at 20, 11 points in Marksmanship for Aimed Shot |
| 3 | 21-30 | Adventure | the spells, 21 points in the tree: Intimidation, Scatter Shot, Counterattack |
| 4 | 31-40 | Excursion | the spells, the first mount (60% speed) and riding, Mail Proficiency |
| 5 | 41-50 | Trials | the spells, the level 50 class quest (Tooth of Morphaz) |
| 6 | 51-60 | Endurance | the spells, the fast mount (100%), Tranquilizing Shot (its book from Lucifron in Molten Core) |

Each slide also has the same advice (set up the interface and bars, get bags, learn Skinning and Leatherworking, First Aid,
Fishing, Cooking, tame a pet with the skill you want, level the professions as you go, craft your gear, buy only bows, daggers and
arrows). The act titles are the reference's; ours can keep them if the user says so.

## How it would work (to design with the user, browser preview first)

- **A chapter per act**, written as the character reaches it (the book's rule: a blank page until then, with two lines in the
  hunter's voice saying what's ahead).
- **Contextual by class**: the class's spells for the act from the server's trainer data (npc_trainer: spell, level, cost), the
  total cost of the act, what the talent tree opens (the class's talents at 10, 20, 30...), and milestones by class (the hunter's
  pet at 10; mounts and riding at 40 and 60, their costs by race from the server's vendors and trainers).
- **The world's side**: the zones for the act's levels (from the quests' levels, the lore reference `(private files)`),
  the dungeons that open, the professions' next ranks.
- **The chronicler's voice** for each chapter's opening (docs/copywriting/chronicles.md), the hunter's own for the advice.
- **Progress**: spells learned of the act's, gold spent, zones visited, quests done in the act's range.

## The browser preview (2026-09-28)

`tools/asset-extract/adventure_journal_preview.py` (http://localhost:8777/ui-forever/adventure-journal/): the Adventure Journal in
the Legacy slot, four tabs under the window. **Journey**: the six acts on Forever's left sub-tabs (a blank chapter, locked, until
its first level), an act's card on Forever's rewards-track background: its opening in the Chronicle voice (ours), its training
level by level from this server's hunter trainers (npc_trainer: 120 spells over 30 levels, the icons and costs), the act's total,
its milestones. **Challenges**: Forever's categories and wording on its challenge cards and points crown, "Points 0 / 65" on its
progress bar; our lists where Forever's name places this server lacks (the Spelunkers' dungeons, the raids: Onyxia, Molten Core,
Zul'Gurub, Blackwing Lair). **Rewards**: Forever's Progress Track (the crown with the points, the bar, four reward cards at 15, 25,
40 and 55, "A reward to choose"). **Journals**: every journal on a card (the Adventurer's Journey, the Beast Journal, the Angler's
Journal, the professions' stubs).

## In game (0.95.0, 2026-09-28)

The user: the act titles were only ideas; "take into consideration the Hero's Journey where you come out different in the end, and
it all starts over again. In WoW Classic, the world is the main character, we were just in for the ride, so we should never feel or
be placed in a position where I am the hero." The acts (ours): Home (1-10), The Threshold (11-20), The Road (21-30), Far Lands
(31-40), The Ordeal (41-50), The Return (51-60), the last one's opening ending "Somewhere, another traveller takes the first step."
Each opening says the world was there before you and goes on without you. Built in AdventureJournal.lua (docs/addons/ui-elements.md).
