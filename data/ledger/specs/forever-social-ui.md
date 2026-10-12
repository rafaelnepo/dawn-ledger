# Forever's social window (build 1.60.1) and what 1.14.2 can feed it

Session 64, 2026-10-07. Read from Forever's interface code crawled from build 1.60.1.70245
(`(private files)`, private) and its atlas tables, for the user's new
screenshots of the Friends window. The numbers and names below are our notes, not copies. Nothing in the addon changed; the
preview is http://127.0.0.1:8777/dbsite/mockups/social/ (`dbsite/build/win_social.py`).

Sources: `blizzard_socialui/mainline` (SocialUI.xml / .lua, SocialUITemplates.xml / .lua), `blizzard_socialuishared`
(SocialUIControl.lua, the shared templates, SocialUISharedConstants.lua), `blizzard_recentallies`, `blizzard_friendsframe/mainline`
(FriendsListTemplates, FriendRequestsListTemplates) and `camelot` (FriendsFrame.lua: how the old window hands over),
`blizzard_raidframe/mainline` (RaidFrameSocialView, RaidInfoFrameSocialView), `blizzard_sharedxml` (LargeSideTabButtonTemplate,
ListHeaderVisualTemplate, SearchBoxNineSliceTemplate), `blizzard_fonts_shared`.

## What changed in Forever

Until now Forever (Camelot) used the classic-style FriendsFrame: Contacts and Raid as bottom tabs, Friends / Recent Allies as
top sub-tabs (our skin, [friends.md](friends.md)). Build 1.60.1 adds **SocialUIFrame**, a new window that replaces it whenever the
social system is on: Camelot's `FriendsFrame.lua` sends every "open Friends / Raid / Recent Allies" call to
`SocialUIControl.ToggleToTab` instead. The tabs are built from a table in Lua, each shown only when its system is supported and
enabled, so the same window serves the glue screens and the game.

## The window

- **Frame:** `PortraitFrameTemplate`, **410 x 675**, toplevel, clamped to the screen. Its background (Bg) is plain **black**; the
  top tile streaks are hidden. Portrait: `Interface\FriendsFrame\Battlenet-Portrait` (two people). Title: the open tab's name
  (Friends, Recent Allies, Friend Requests, Raid). It opens and closes with the character-info tab sound.
- **The BattleTag bar** (`SocialUIBattleNetBarTemplate`, 413 x 50) at TOP, 22 down; its art `friends-frame-infobg` (413 x 50,
  centred). Its controls sit 4 above the bar's middle, 32 tall:
  - the **status dropdown** (`WowStyle1DropdownTemplate`, 54 wide) 65 in from the bar's left; its icon the presence atlas at 19
    (16 in Chinese); its menu Online / Away / Busy (and Appear Offline);
  - the **menu button** (34 x 34, `common-button-tertiary-square-normal` / `-pressed`, the icon `friends-icon-menu` 11 x 12) 8 in
    from the right; its menu: Broadcast, Ignore List;
  - between them the **BattleTag**: `Interface\FriendsFrame\battlenet-friends-main` (the same TexCoords as before) stretched from
    the dropdown's left to 7 short of the menu button, 29 tall; the tag in `UserScaledFontBody` (Friz 14) centred, and the copy
    icon `friends-icon-battlenet-copy` (12 x 12, in a 13 x 13 button) 8 right of the text.
- **Fades:** `friends-frame-toptexbg` (408 x 71) hangs from the bar's bottom (5 up), `friends-frame-bottomtexbg` (406 x 91) sits on
  the black's bottom.
- **The content frame** of every tab: from the bar's bottom left (5 up) to the window's bottom right (-2, 2).
- **The side tabs** (`SocialUITabTemplate` on `LargeSideTabButtonTemplate`): outside the right edge, the first at the window's
  TOPRIGHT 122 down, each next 3 under the last. The art is `common-sidetab` (55 x 60; the button is 55 x 55, the art's 5 px of
  transparent padding trimmed), `common-sidetab-mask` over the icon, `common-sidetab-selected` when open, `common-sidetab-hover`
  under the mouse, the same "selected" art in ADD at alpha 0 for the glow. The icon is the tab's atlas at its own size (33 x 33),
  3 left of the middle, nudged 1 right and 1 down while pressed; selected uses `friends-icon-tab-<name>`, not selected
  `friends-icon-tab-<name>-inactive`; a disabled tab's icon is desaturated and its tooltip adds the reason in red. A count
  (`GameFontHighlightSmall`, 32 x 18) can sit under the icon, which then rises 5 (Quick Join's number of groups). The tooltip is
  the tab's name in white. The tab column counts as 62 wide (55 + 7) for the panel manager, and the side windows open past it.
- **Tabs, in order** (each only when available): Friends (`friends`, two people), Recent Allies (`recentallies`, a flag), Quick
  Join (`quickjoin`), Friend Requests (`friendRequest`, a person with a plus), Recruit A Friend (`recruitFriends`), Raid (`raid`,
  a group). The user's shots show four: Friends, Recent Allies, Friend Requests, Raid.
- **Side windows** (`TOPLEFT` at the window's `TOPRIGHT` + 62): the Ignore List (320 x 292, ButtonFrameTemplate), Raid Info
  (345 x 250), the Broadcast box, the Battle.net-unavailable notice. The window grows by their width for the panel manager.

## The contacts frame (Friends, Recent Allies, Friend Requests)

All three list tabs share `SocialUIContactsFrameTemplate`:

- **Filter bar** (50 tall, the frame's width): the **Filter** dropdown (`WowStyle1FilterDropdownTemplate`, 135 x 30, text
  `GameFontNormal`, "Filter") at RIGHT -10; the **search box** (`SearchBoxNineSliceTemplate`: `common-searchbar-a` sliced 5, the
  glass `common-searchbar-icon-a` 12 x 12 4 in, the clear button 17 x 17 at the right) from 15 in to 20 short of the Filter, 20
  tall, 40 letters, the hint "Search for keywords".
- **Dividers:** `perks-divider-short` (3 tall) 3 under the filter bar (5 in each side), and another 12 above the action button
  (400 wide).
- **Action button** (`SocialUIActionButtonTemplate`, `128-RedButton` kit, fit to its text with 15 each side, at least 160 and at
  most 400, 30 tall) at BOTTOM, 12 up: **Add New Friend** on all three tabs.
- **The list** (`WowScrollBoxList`, a tree view) from 5 under the top divider to 1 above the bottom one, 23 short of the right; the
  minimal scroll bar 5 right of it (7 down, 4 up). Padding 10 top, 10 bottom, 10 left, 7 right; 3 between elements. A spinner
  (60 x 60) while the data loads; a centred message (`UserScaledFontBody`) when the list is disabled.
- **Headers** (`SocialUIScrollableHeaderTemplate` on `ListHeaderVisualTemplate`): 24 tall, `common-button-list-collapseExpand`
  (its highlight the same art in ADD at 0.4), the text `System15Font_Shadow` (Friz 15, white) 8 in, the plus / minus 6 in from the
  right; a click folds the tree (the checkbox-on sound). After each header a 2-tall spacer.
- **Cards** (70 tall; 85 in the expanded layout for large text): `friends-card-default` (366 x 70, sliced 10) online,
  `friends-card-disabled` offline, `friends-card-selected` (ADD) under the mouse and locked on when chosen (a click selects, a
  second click clears; right-click opens the unit menu). The presence icon (`friends-status-online / away / busy / offline`,
  19 x 19) is centred on the card's top-left corner (3 in, 4 down), so it overhangs it. The text starts 4 left and 3 up from that
  icon's bottom right and ends 5 short of the **party button** (`common-button-tertiary-square`, 34 x 34, 4 in from the right,
  the icon `friends-icon-friendsAvailable` 21 x 21, or `-dis` when the player is offline; the tooltip "Invite to Group" or
  "Player Offline").

### Friends

Battle.net friends only (`BNGetNumFriends`), in two trees: **Favorites %d/%d** and **Friends List %d/%d** (online / shown).
A card's rows: the account name (BattleTag or Real ID name, `UserScaledFontHeader` 16, in the Battle.net blue) with a favourite
star (`friends-icon-favorites` 19 x 18) after it; the character: name, level, class (`UserScaledFontBody` 14, 6 apart); the
location; with the expanded layout, the note, the broadcast and tags. The Filter: Status (Online, Away, Busy, Offline, In Queue,
Available For Queue) and Tags (interests: Professions, PvP, Raiding, Dungeons, Delves, Questing; roles: Tank, Healer, DPS).

### Recent Allies

`C_RecentAllies`: the players you did something with, from the server. Three trees: **Legacy Friends %d/%d** (your old
character friends, converted and pinned), **Pinned %d/%d**, **Recent Allies %d/%d**. A card's first row: the name (gold online,
dark grey offline), "Lvl %d" (white), the class (its colour), then the pin (`friends-icon-pinned`) and a clock
(`icon-clock`) when a friend request is pending; the second row: the most recent interaction (FRIENDS_GRAY, e.g. Traded, Fought
Together, Whispered); the third: the current location. The tooltip lists the interactions with their places. The Filter: Status
(Online, Away, Busy, Offline) and Categories (Professions, PvP, Raiding, Dungeons, Delves, Questing). The menu: Pin / Unpin, Set
Note, the usual interactions. Pins expire (the pin turns from yellow to plain near the end).

So in Forever the WoW character friends live in Recent Allies, not Friends.

### Friend Requests

One tree, **Received (%d)**: cards with the time ("%s ago"), the name (Header 16) and the kind ("Wants to be your BattleTag
friend", Real ID, or a WoW friend), an **Accept** button (`common-button-tertiary-normal`, 90 x 34, sliced) and a decline
dropdown (the red X `auctionhouse-ui-filter-redx`, 23 x 23). A Real ID request first shows a warning page
(`friends-icon-addFriend` with the Battle.net logo, Continue).

### Raid

`RaidFrameSocialTemplate`, inside the content frame:

- **Not in a raid:** RAID_DESCRIPTION (`GameFontNormal`) 60 down, 12 in, 8 short of the right; **Convert To Raid** (200 x 32) at
  BOTTOMRIGHT (-20, 5), enabled when the party may convert.
- **In a raid:** **All Assist** (`UICheckButtonTemplate` 24 x 24 at 16, 10 down; then `friends-icon-raidAssist` and "All" in
  `GameFontNormalMed1`, only for the leader); the role counts (`UI-LFG-RoleIcon-Tank / Healer / DPS`, each 48 x 24 at TOP -50 / 0 /
  +50, the number then the icon 24 x 24); the **groups** (195 x 135, `friends-card-raidBG` sliced 7 across) two to a row, 5 apart
  across and 6 down, from 9 in and 7 under All Assist; "Group %d" (`GameFontHighlight`) 6 in; five **members** (187 x 20 on
  `friends-card-raid` sliced 4, `friends-card-raid-drag` while dragged) from 4 in and 28 down: the leader's or assistant's icon
  (`friends-icon-raidLead` / `friends-icon-raidAssist`, 17 x 15), the main tank / assist icon (`RaidFrame-Icon-MainTank / -MainAssist`,
  14 x 14), a ready-check mark, the name (66), the level (20), the class (60), in the class colour, grey offline, red dead. Members
  drag between groups; right-click opens the raid menu.
- **Raid Info** (`SharedButtonTemplate`, 100 x 32) at TOPRIGHT (-8, -6) in both states: it toggles the Raid Info side window
  (345 x 250: rock insets top and bottom with diamond-metal edges, rows 40 tall: the instance name `GameFontNormal`, the difficulty
  and the reset `GameFontHighlightSmall`, "Extended").

### Not in the window

Who is not here (it stays in the group finder's tabs); the guild has its own window; the Ignore List is a side window from the bar's
menu (320 x 292: "Ignored" and "Blocked" headers, rows 20 tall in `GameFontNormal`, Ignore Player and Remove from list, 128 x 22,
either side of the middle).

## The art

All found in the extracted files (`(private files)` or `ui-forever/tex/fdid/`), so the preview needs no
client read. Most live on one new sheet, `Interface\Friends\UIFriends` (1024 x 512): `friends-frame-infobg`, `-toptexbg`,
`-bottomtexbg`, `friends-card-default / -disabled / -selected / -raid / -raidBG`, `friends-status-*`, `friends-icon-tab-*` (and
`-inactive`), `friends-icon-menu`, `-battlenet-copy`, `-favorites`, `-pinned`, `-raidLead`, `-raidAssist`, `-friendsAvailable`
(and `-dis`), `-addFriend`. Others: `common-sidetab*` and `common-button-list-*` (Camelot's 8124217 / 8124221),
`common-button-tertiary-*` (8069108), `common-searchbar-a` (`Interface\Common\CommonSearchBar`), `perks-divider-short`
(`Interface\Store\Perks`), `icon-clock` (`Interface\Shop\CatalogShop`), `UI-LFG-RoleIcon-*` (8365724). For the addon these would
go through `tools/asset-extract/forever_addon_art.py` into Art/Atlas.lua like the rest; the slices: the cards 10, raid rows 4,
raid groups 7 across, the search bar 5, the tertiary button 9 / 11 across.

## Compared with our skin today

Our skin ([friends.md](friends.md)) dresses 1.14.2's FriendsFrame (338 x 424) as Forever's old window: bottom tabs (Contacts, Who,
Guild, Raid), Friends / Ignore sub-tabs, 34-tall rows. The new window is a different shape: taller (675) and wider (410), black,
the tabs on the right as icons, a search and a filter on every list, cards 70 tall instead of rows, folding headers, one Add New
Friend button, Ignore as a side window, and no Who or Guild tab. It can't be a reskin of FriendsFrame (its 298-wide fixed rows and
bottom tabs): it would be our own window, like the AddOn List's rebuild, that calls the game's functions.

## What 1.14.2 can feed

| Part | 1.14.2 source | Notes |
|---|---|---|
| Gametag bar | `ns.MyGametag()` (tools/gametags.py) | Our BattleTag. The copy icon: no clipboard API in 1.14.2; it could print the tag in an edit box to copy, or go. |
| Status dropdown | `UnitIsAFK`, `UnitIsDND`; `SendChatMessage("", "AFK")` / `"DND"` toggles | Online / Away / Busy work; Appear Offline does not exist. |
| Menu | Ignore List | Broadcast needs Battle.net: hide it. |
| Friends | `C_FriendList.GetNumFriends`, `GetFriendInfoByIndex` (name, level, className, area, connected, afk, dnd, notes), `AddFriend`, `RemoveFriend`, `SetFriendNotes`; `FRIENDLIST_UPDATE` | Character friends (at most 50 in 1.14.2's list). Row 1: the friend's Gametag (`ns.GametagOf`) as its BattleTag, the name if it has none. Favourites: ours, in saved variables. Tags: none. |
| Recent Allies | ours (see below) | Location and online state need the unit in our group or a `/who`. |
| Friend Requests | none | 1.14.2 friends are one-sided: adding needs no answer. |
| Raid | `GetRaidRosterInfo` (name, rank, subgroup, level, class, fileName, zone, online, isDead, role "MAINTANK" / "MAINASSIST"), `SetRaidSubgroup` / `SwapRaidSubgroup` (drag), `ConvertToRaid`, `IsInRaid`, `UnitIsGroupLeader`; `GROUP_ROSTER_UPDATE`; ready check events | All of it. All Assist: 1.14.2's own raid tab already calls `SetEveryoneIsAssistant`. Role counts: `UnitGroupRolesAssigned` exists in 1.14.2's code, but nothing assigns roles on our server (no dungeon finder): count by the bots' roles if the server tells them, else by main tank / assist, or by class, or hide them. |
| Raid Info | `RequestRaidInfo`, `GetNumSavedInstances`, `GetSavedInstanceInfo` (name, reset, difficulty, extended); `UPDATE_INSTANCE_INFO` | All of it. |
| Ignore | `C_FriendList.GetNumIgnores`, `GetIgnoreName`, `AddIgnore`, `DelIgnore` | All of it; Blocked (Battle.net) does not exist. |
| Search, Filter | ours over the lists | Status works for friends; categories from our log. |
| Quick Join, Recruit A Friend | none | Hidden, as Forever hides unavailable tabs. |

### Recent Allies, ours

A log the addon keeps per character (saved variables), most recent first, pruned after a time (Forever's pins expire too):

- **Grouped Together:** `GROUP_ROSTER_UPDATE` (each party member's name, class, level; the zone or instance from
  `GetRealZoneText` / `GetInstanceInfo`);
- **Raided Together:** the same in a raid (`GetRaidRosterInfo`);
- **Traded:** `TRADE_SHOW` names the trader (`UnitName("NPC")`), `UI_INFO_MESSAGE` with ERR_TRADE_COMPLETE confirms it;
- **Whispered:** `CHAT_MSG_WHISPER` and `CHAT_MSG_WHISPER_INFORM` (the bots' whispers too: a filter may be wanted);
- **Fought Together:** `COMBAT_LOG_EVENT_UNFILTERED`: a friendly player (not in the group) hitting the creature you hit, or
  healing you, within a few seconds;
- more if wanted: dueled (`DUEL_REQUESTED`), resurrected by (`RESURRECT_REQUEST`), invited to the guild.

The level, class and race come from the unit when seen (`UnitLevel`, `UnitClass`, `UnitRace`) or the combat log's GUID
(`GetPlayerInfoByGUID`). "Online" and the location: known for group members; for others a `/who` by name
(`C_FriendList.SendWho`, throttled, one at a time) when the tab opens, else "Offline" or the last place seen. Pins: ours. The
party button: `InviteUnit`. The Filter's categories map from the interactions (Dungeons for grouped, Raiding, Professions for
traded, Questing for fought together; PvP if battlegrounds are logged).

### Friend Requests: to show or to hide

1.14.2 has no requests to accept. The preview shows three options (the page bar):

- **As Forever:** the tab with "Received (0)" and a line saying why: honest, but always empty.
- **Proposal A, invites:** the game's pending invites as cards with Accept and the red X: a group (`PARTY_INVITE_REQUEST`;
  `AcceptGroup` / `DeclineGroup`), a guild (`GUILD_INVITE_REQUEST`; `AcceptGuild` / `DeclineGuild`), a duel (`DUEL_REQUESTED`;
  `AcceptDuel` / `CancelDuel`). They last about a minute, and the game's own pop-ups show them too.
- **Proposal B, suggestions:** the allies you met more than once who aren't friends yet, with Add Friend in place of Accept.
- Or hide the tab (Forever hides tabs that can't work).

## Questions for the user

1. **A new window or the skin?** Build Forever's new window (410 x 675, our own lists over the game's functions), or keep
   reskinning 1.14.2's FriendsFrame and borrow only parts (the cards, the search and Filter, the side tabs)?
2. **Who and Guild:** Forever's window has neither. Keep Who as a fifth side tab (or in the bar's menu), and the Guild as its own
   window (it already is when you're in a guild)?
3. **Friends' first row:** the friend's Gametag in Battle.net blue (as the preview) or the character's name only?
4. **Favourites:** ours (a star from the card's menu, kept per character), as Forever's Favorites tree?
5. **Recent Allies:** which events count (grouped, raided, traded, whispered, fought beside; duels? resurrections?), how long they
   stay (Forever prunes; 7 days? 30?), and whether bots' whispers count. Should the log look up allies with `/who` to show them
   online, or show "Offline" and the last place seen?
6. **Legacy Friends:** Forever moves character friends into Recent Allies. We keep them in Friends (1.14.2 has nothing else
   there): agreed?
7. **Friend Requests:** as Forever (empty), proposal A (invites), proposal B (suggestions), or hide the tab?
8. **Raid:** the role counts (nothing assigns roles on our server): by main tank / assist, by class, or hidden?
9. **The status dropdown:** Away and Busy as the game's /afk and /dnd: wanted, or show the status only?
