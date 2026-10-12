# Progress on screen: the plan (2026-09-29)

The user, 2026-09-29: move "a lot of these progress away from the chat and into the main windows to be visual so that you can
see progress... keep our eyes in the game up front and center, rather than glancing at the chat window all the time". Each
message goes to a place that belongs to it, small, and gone after a few seconds. MikScrollingBattleText does this for combat;
its parser shows which chat events carry what (MSBTParser.lua). Built so far: the experience (ForeverUI 0.132.0); reputation,
fighting skill-ups in the feed and profession skill-ups under the cast bar, each out of the chat while the feed is on (0.140.0,
session 38). Previewed for the user's choice (tools/asset-extract/progressfeed_preview.py, http://localhost:8777/ui-forever/progress-feed/):
the level-up banner (retail's level-up toast: levelup-shadow-upper, levelup-bar-gold, "You've Reached" / "Level 5", our gains line)
and the loot, A (the list above the bags) or B (Forever's loot toast, LootWonAlertFrameTemplate on 1.14.2's LootToast art).
The user chose the banner and B (2026-09-29): built in 0.141.0 (ProgressFeed.lua's banner, LootToasts.lua), with rules for
which items toast (Edit Mode's Loot Toasts settings). In Forever the toast shows for loot won in a group roll; ours for
everything the rules let through, a won roll with its dice and number.

## The places

| Message | Chat event today | Where | Look | Stays |
|---|---|---|---|---|
| **Experience gained** (built) | PLAYER_XP_UPDATE (the amount), CHAT_MSG_COMBAT_XP_GAIN (the rested bonus) | **The progress feed**: a list left of the player frame, lines right-aligned against it, 6 at most | GameFontHighlightSmall; "+44 XP", white, blue with a rested bonus | 2.5 s, then 0.5 s fade |
| **Reputation gained / lost** | CHAT_MSG_COMBAT_FACTION_CHANGE | The progress feed, under the experience of the same kill | "+25 Darnassus" in the standing's colour (FACTION_BAR), a loss red | as above |
| **Weapon and defense skill-ups** | CHAT_MSG_SKILL ("Your skill in Defense has increased to 5") | The progress feed (they come from fighting) | "Defense 5", grey-white | as above |
| **Profession skill-ups** | CHAT_MSG_SKILL | Under the cast bar (the craft or gathering cast that raised it just ended there); in the professions window its own rank bar already moves | "Cooking 46 / 75", gold | 3 s |
| **Level up** | PLAYER_LEVEL_UP, CHAT_MSG_SYSTEM ("Congratulations, you have reached level 2!", the stat lines) | **A banner** high in the middle, under the zone text's place | "Level 2" large (Friz 24, gold), one small line with the gains: "+8 health, +40 mana · +1 Strength, Stamina, Intellect, Spirit"; at 10, "Talent points: 1" | 4 s |
| **A new standing** | CHAT_MSG_SYSTEM ("You are now Friendly with Darnassus") | The banner, smaller | "Friendly with Darnassus" in the standing's colour | 3 s |
| **Loot and money** | CHAT_MSG_LOOT, CHAT_MSG_MONEY | **Above the bags** (bottom right, over the backpack buttons): where it goes | a 16 px icon and the name in its quality's colour, "×2"; coins as the coin line | 3 s, fading, 5 at most |

Not moved: quest progress ("Young Nightsaber slain: 3/7": the game's own top-centre text and the tracker already show it);
discoveries (the zone text).

## The rules

- One chat line hidden for each message moved, only while its screen version is on (ChatFrame_AddMessageEventFilter); the game's
  own chat settings still apply (the user already turned Experience off there).
- Lines that arrive together sort by kind: experience, reputation, skill (the feed's GATHER, 0.1 s).
- Each place is an Edit Mode box (a stand-in while editing), with Reset.
- `/fui feed on | off`; later a line per kind in the settings.
- A browser preview for the banner and the loot list before they go in the game (memory: preview first).

## What WoW Forever does (its extracted UI code, read 2026-09-29)

Nothing of its own (no Camelot code) for combat text, experience or progress; what differs from 1.14.2 is retail's UI it loads:
- **No "+XP" text, no XP toast**: experience still goes to chat. The XP bar is retail's animated one (a flare on each gain, a
  flipbook on level up; blizzard_statustrackingbar mainline/expbaroverrides.lua), Camelot's 20-segment wide layout, the rested
  part shown when it overflows, and a pet XP bar (camelot/petexpbar.lua).
- **Level up**: no LevelUpDisplay; retail's EventToastManager (server-driven toasts, blizzard_framexml/eventtoastmanager.lua).
- **Toasts**: retail's alert systems registered (loot, money won, quest turned in with its XP, new recipe learned, honor);
  1.14.2 has the same code but registers only the store's event. No reputation or skill-up toast in either.
- **Floating combat text**: retail's (the _v2 CVars, reputation and honor, no experience type); DAMAGE_TEXT_FONT the same.
- **Edit Mode**: no combat text system; the status bars (XP, reputation) are one ("StatusTrackingBar", with a size).
So Forever's own look for these: an animated XP bar with a flare, and toasts for loot, money and quests. Ideas to borrow:
the flare on our XP bar at each gain; loot and money toasts in Forever's alert style (our above-the-bags list could be that).

## Also to do (docs/open-items.md)

Screenshots at 90 %, 95 % and the level up (the game's Screenshot()).
