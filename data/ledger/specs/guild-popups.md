# The guild's pop-outs: Guild Information, a member's details, Guild Control

Built 2026-09-29 (session 35, unattended; the P3 list's item 31). ForeverUI 0.115.0, skin part `guildpopups` (in `Guild.lua`).
Sources: 1.14.2's `FriendsFrame.xml` (4216173: GuildInfoFrame, GuildMemberDetailFrame, GuildControlPopupFrame). Forever's guild
is retail's communities window: these boxes have no Forever twin.

## The skin

- The pop-ups' look: the diamond metal (`ns.CreateDialogChrome`), the gold border (and the info's corner) at alpha 0; Guild
  Control's macro-popup art out with the dark dialog background under the metal; the buttons red (Save, Cancel, Remove, Group
  Invite, Accept, Cancel); Forever's close buttons 8 in from the corner; the info's scroll bar minimal.
- Placed 40 further right than the game's anchors (to GuildFrame's top right): the roster's side tabs (Guild.lua, 32 wide at its
  right edge) covered them (seen in game).
- The game keeps the texts, notes, edit boxes, rank checkboxes and every click.

## In game (2026-09-29)

The Guild tab with Sashimii's details (and Guild Information) opened from the chat: as described after the move. Not tried: Guild
Control (a guild master's rank editor), editing notes.
