# The social windows and the AddOn List: the user's reports of 2026-10-04 and Forever's designs

Session 60. Seven in-game reports (docs/feedback/inbox/2026-10-04-*), what was fixed at once, and what Forever does for the rest
(read from Forever's interface code, `(private files)`, private; the numbers here are
our notes, not copies).

## Fixed in 0.238.1

- **Friends: HybridScrollFrame.lua:191 errors** (F0051): the friends list's bar is `doNotHide`, so when the list fits it stays
  shown, disabled, with its old maximum; our minimal bar still scrolled it past the list. A disabled bar now moves nothing.
- **Ignore: the old scroll bar behind ours:** its track belongs to the page (`IgnoreListFrameTop / Middle / Bottom`), not to the
  scroll frame; hidden.
- **Friends / Ignore sub-tabs' texts uneven:** the game's `PanelTemplates_DeselectTab` places the text after our hook ran (the
  bottom tab's +2): top tabs now give the game their own offsets (-4 open, -8 closed). The stub's tab functions now do as the
  game's.
- **The BattleTag box narrower:** 166 (Forever's 190), 8 right, the status box clear of the portrait's ring.
- **AddOn List's bottom-right buttons:** `MagicButtonTemplate` adds gold separators beside Okay / Cancel; the red skin hides them.

## Open, to design with the user (previews first)

### The AddOn List: groups (Forever: Blizzard_AddOnList)

- Forever: 600 x 550; character dropdown (140) top left, Load out of date AddOns in the middle, a search box (160) top right; a
  performance strip (Current / Average / Peak) under them; a tree list: `## Category:` headers that fold (a bag-arrow, the state
  saved), `## Group:` children indented 20 under their parent addon; rows 16 tall with a minimal checkbox, a 20 px icon, the title,
  the status right-aligned; right-click: enable dependencies, enable / disable the group or category. Okay becomes Reload UI when
  something changed. Buttons: Enable All / Disable All (120) left, Okay / Cancel (80) right.
- 1.14.2 has no Group or Category metadata: groups by dependency (`GetAddOnDependencies`: AtlasLootClassic_* depend on
  AtlasLootClassic) and by name prefix. The list itself is 1.14.2's 19 fixed rows: a tree means our own list over the game's.
- Still to see: the "old frame behind the new" (a screenshot asked for).

### The Who list

Forever has no Who tab in the Friends window: Who is the third tab of its vanilla-style group finder (LFGParentFrame), whose code
is not in our dump. The nearest reference is the mainline WhoFrame: column headers (Name 116, a dropdown column Zone / Guild / Race
105, Level 54, Class 86), the search box across the bottom, Group Invite / Add Friend / Refresh at the bottom right. Our Guild
roster already builds WhoFrame-style column headers (Guild.lua).

### The Raid tab

Forever: the role count on top, All Assist (a checkbox, top left), Raid Info (90 x 21) top right, Convert to Raid (115 x 21) bottom
right (only when not in a raid), the not-in-raid text with a minimal bar, the inset 60 down; Raid Info as its own panel to the
right (345 x 250). We only paint the buttons red.

**Previewed in a raid (session 63, dbsite/build/win_friends.py, the bar's "In a raid of 20"):** Forever's RaidFrame layout
(Blizzard_RaidUI): the eight groups (UI-RaidFrame-GroupOutline at its TexCoords, 162 x 80) in two columns 8 either side of the
middle, the first row 58 down, 14 between rows, each group's label above it; five slots of 156 x 14 (the leader's crown or the
assistant's mark, the name in its class colour, the level, the class); All Assist top left; the roles' count (the round role
icons and numbers) between it and Raid Info; the classes' counts down the window's right edge. A raid of 20 a side (both
factions). For the user's look; then in game.

**The Who list:** Forever's nearest (the mainline WhoFrame) has the game's columns (Name, the Zone / Guild / Race dropdown, Level,
Class), so the preview's Who already matches it; nothing to change there unless the user wants more.

### Looking for Group / Looking for More

Forever uses the vanilla-style group finder (Browse, Listing, Who), not extracted yet. The user: "we can rethink how they work
since we are playing with bots". Ideas to plan: a listing that summons bots for the missing roles (the PvP flow's Recruits /
Regulars / Veterans), a browse that shows what bots are doing nearby, the dungeon finder joining with Prepare for a Dungeon.

### The Currency tab

1.14.2 has no currency list, and Forever keeps honor on the PvP tab: the tab is always empty. Vanilla's currencies are items:
Zul'Gurub's coins and bijous, Ahn'Qiraj's scarabs and idols, the battlegrounds' marks of honor, Argent Dawn's valor tokens and
insignia, Darkmoon Faire tickets and its decks, Timbermaw's feathers and beads. Options: park the tab; or repurpose it for these
"item currencies" (counted from the bags and the bank, with what they buy and where); or move it into the Adventure Journal.

### Trade skills: recipes not learned yet

The Filter menu planned Unlearned and Sources but the list shows only what you know. The data exists (`ns.GMRecipes`: every
recipe by rank with its source: 0 the trainer, an item id the pattern; F0038's learn skill to fix first). A plan: the unlearned
recipes in the list, dimmed, with where to learn them (the trainer at your skill, or the pattern: sold by, drops from, a quest);
filters Learned / Unlearned and Sources (Trainer, Pattern), a setting for whether they show by default, and "learnable now"
(your skill high enough) apart from "later".

## The user's answers (session 60)

1. **Currency:** item currencies: the tab lists vanilla's currency items from the bags and the bank, with what they buy and where.
2. **Unlearned recipes:** in the list, dimmed, with where to learn them; the filter (Learned / Unlearned, Sources, learnable now
   apart from later) and a setting for the default.
3. **First preview:** the AddOn List with groups.

## The AddOn List preview (session 60)

http://127.0.0.1:8777/dbsite/mockups/addonlist/ (dbsite/build/win_addonlist.py): the user's own addons and character states.
Questions for the user: the categories (Combat, Interface, Maps and Loot, Professions, Quests and Dialogue, Voices; ours, as
1.14.2 has none); a parent's box switching its modules with it; the icons (most addons have none: the question mark, as Forever).

## The Currency tab preview (session 60)

http://127.0.0.1:8777/dbsite/mockups/character/ (the Currency side tab; win_character.py's CURRENCY and build_currency): 55
currency items in nine groups (Battlegrounds, Zul’Gurub, Ahn’Qiraj, Cenarion Circle, Argent Dawn, Thorium Brotherhood, Timbermaw
Hold, Darkmoon Faire, Lunar Festival), the sample characters' counts made up; each item's side pane: where they come from, the
count, and the quests that take it for the character's side and class (how many, what they give, who and where, from the world
database). The bijous by hand (a server script takes them). "Show All Currencies" lists those you have none of, greyed.
The AddOn List preview's background corrected (the user): Forever's rock and band, the list in ButtonFrameTemplate's marble inset.

## The AddOn List: the user's answers (2026-10-06)

1. **Approved:** the preview's design, the categories as proposed (ours by addon, then the TOC's X-Category, then Uncategorized).
2. **A group with one click:** the main addon's box switches its modules with it.
3. **No icons:** the rows without the question-mark icon.
4. **The in-game skin today** (the user's shot): the old frame's edge shows inside the metal on the left and at the bottom, the
   buttons run under the bottom edge (their text clipped), the list keeps the game's old scroll arrows. The rebuild replaces the
   frame, the list and the buttons.

## Built: the AddOn List with groups, Forever UI 0.239.0 (session 60)

SkinGameMenu.lua's "addonlist" part, as the preview and the answers: 600 x 550; the old template's art and inset out of sight
(the user's shot), the rock and the marble inset ours; the game's 19 rows and its scroll frame hidden and out of the mouse's way;
our list (categories that fold, kept in ns.db.addonFolded; modules 20 in under their addon; the main addon's box switches its
group, a module turned on turns its addon on; the status: Requires Reload in red when changed, the game's reason in grey),
the search top right, the character dropdown and Load out of date AddOns moved up, the four red buttons over the metal's edge.
Every switch goes through AddonList_Enable, so the character, the sounds and Okay's Reload UI stay the game's. Tests:
105-addon-list.lua (the stub's AddOn List: stub/56-addonlist.lua). Not tried in game yet.

## Currency: the user's answers (2026-10-06)

1. **The groups** as previewed (Battlegrounds, Zul’Gurub, Ahn’Qiraj, Cenarion Circle, Argent Dawn, Thorium Brotherhood,
   Timbermaw Hold, Darkmoon Faire, Lunar Festival), good for now.
2. **Show All Currencies** lists the ones you have none of, greyed out.
3. **The right-hand panel:** yes, kept simple: where to get it, your count, what takes it.

## Built: the Currency tab, Forever UI 0.240.0 (session 60)

Currency.lua, as the preview and the answers: the nine groups that fold (ns.db.currencyFolded), 66 items, each row the name in
its quality's colour, the count from the bags and the bank (GetItemCount with the bank), the icon, the item's tooltip; the pane
kept simple: the group as its subtitle, where they come from, "You have", "Taken by" (this character's side and class: the
quest, how many, what it gives, who and where; six at most, then "and N more"); Show All Currencies under it (ns.db.currencyShowAll),
the ones you have none of greyed; the empty pane's prompt when you carry none. The data: tools/asset-extract/currency_data.py
writes the block in Currency.lua (no new file: the user plays), from win_character.py's groups and the world database (267
quests). Tests: 05-currency.lua. Not tried in game yet.

## Built: recipes not learned yet, Forever UI 0.243.0 (session 62)

- **F0038 first:** ns.RecipeSkill's learn skill from the pattern's required skill, else the lowest a trainer asks, else a quest's,
  else an estimate from the colours (profession_ranks.py); a rogue's poisons stay at 1.
- **The data:** tools/asset-extract/recipe_sources.py writes ns.RecipeBook, ns.RecipeNPCs, ns.RecipeTrainers and
  ns.RecipePatterns into ProfessionData.lua, from the preview's own build() (mock_professions.py), so page and game agree.
- **The list:** with Unlearned on, the API (Professions.lua, withUnlearned) lists the profession's other recipes after the game's
  (kind "unlearned"): dimmed, no count or difficulty, the skill they need at the right in red while yours is under it. Selecting
  one is ours alone; Create stays gray and Track Recipe hidden.
- **The Filter:** Learned and Unlearned first; Sources after Has skill up (Check All, Uncheck All, Trainer, Vendor, Drop, Quest,
  then Learnable now: the user moved it there after the preview).
- **The card:** "Learn it from:" (or "Learned from:") under the reagents: the skill needed, the trainers of your side, the
  quests, each pattern with its vendors, quests, drops (levels and chance) and containers, a specialization.
- **The setting:** the portrait's "Show unlearned recipes on opening" (off by default); a profession opening starts from it.
- **To try in game:** Leatherworking with Unlearned on (a 300 pattern red, a trainer recipe you can learn plain), a dropped
  pattern's card, Sources unchecking Drop, Learnable now, Enchanting (the Craft API) the same way.
- **Tried in game (session 63):** working (the user). Then two changes:
  - **Within my rank** (0.243.1, the user: "if im an apprentice, what are the unlearned recipes up to 75/75 that im still
    missing"): in Sources after Learnable now; the unlearned recipes up to the rank's cap (75, 150, 225, 300), where Learnable now
    stops at your skill.
  - **Your side's only** (0.243.2, the user: Kodo Hide Bag's quest is the Horde's): an unlearned recipe shows when some place
    to learn it is yours or both sides' (a trainer, a vendor, a quest's giver; a drop, a world drop or a container is anyone's).
    43 recipes are one side's (ProfessionsFilterMenu.lua's F.OnMySide): Kodo Hide Bag and Raptor Hide Harness the Horde's,
    Moonglow Vest and the whelp patterns the Alliance's, among them.
