# The Friends window: Forever's Contacts and Raid for 1.14.2

Built 2026-09-29 (session 35, unattended; the P3 list's item 23). ForeverUI 0.107.0, skin part `friends`, `SkinFriends.lua`.
Sources: Forever's `Blizzard_FriendsFrame\Camelot\FriendsFrame.xml / .lua`; the user's Forever shots 2026-09-28 20:10:06 (Contacts),
20:10:09 (Recent Allies), 20:10:16 (Raid) in `_Inbox/Contacts, Raid, LFG`; 1.14.2's `FriendsFrame.xml` (4216173) and
`FriendsFrame.lua` (4216453).

## Forever and 1.14.2

- **Forever:** a ButtonFrameTemplate in Camelot's metal, 385 x 424, two tabs: **Contacts** (the Battle.net portrait of two people,
  the title "Contacts", the status and BattleTag bar, the Friends / Recent Allies sub-tabs, the list on the dark inset with the
  minimal scroll bar, a red Add Friend and Send Message) and **Raid** (the raid finder's helmet, the title "Raid", All, Raid Info,
  Convert To Raid). No Who tab; the guild is its own window.
- **1.14.2:** the same ButtonFrameTemplate window, 338 x 424, with Friends, Who, Guild and Raid tabs, the Friends / Ignore
  sub-tabs, the scroll icon as its portrait for every tab.

## The skin

- `ns.SkinButtonFrame`: the metal, the portrait in the ring, the title on the metal, the red close button; the settings arrow.
- After the game's `FriendsFrame_Update` (a secure hook): the Friends tab titled "Contacts" with the Battle.net portrait (the
  Ignore sub-tab keeps "Ignore List"), the Raid tab with the helmet (`Interface\LFGFrame\UI-LFR-PORTRAIT`); Who keeps "Who List"
  and the scroll. Both portraits are 1.14.2's own files.
- The first tab called Contacts; Forever's tabs (`ns.SkinPanelTab`) 3 apart; the pages' buttons in red (Add Friend, Send
  Message, Ignore / Unignore, Refresh, Add Friend, Group Invite, Convert To Raid, Raid Info); the lists' scroll bars minimal.
- The width stays 338 (the game's lists are 298 wide); Who stays (Forever has none; it works here).
- The Guild tab is Guild.lua's roster with its own chrome: ours hides while it shows, the close button and the gear go over the
  roster's layers; Guild.lua no longer swaps the close button's art or the title's alpha while the Friends skin is on.

## In game (2026-09-29)

Contacts, Who, Guild (Silverleaf Company's roster) and Raid, each as the shots (Who and Guild have no Forever shot). First look at
the Guild tab: the close button and gear under the roster; lifted. Not tried: adding a friend, a Who search, a raid.
Left as 1.14.2's: the Friends / Ignore sub-tabs' look (Forever's are lit gold tabs), the status dropdown.
