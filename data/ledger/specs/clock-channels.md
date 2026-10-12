# The clock's settings, the stopwatch, the chat channels

Built 2026-09-29 (session 35, unattended; the P4 list's item 33). ForeverUI 0.117.0, skin parts `clock` (in `SkinMinimap.lua`)
and `channels` (in `SkinChat.lua`). Sources: Forever's `Blizzard_TimeManager\Mainline` and retail's channels window; 1.14.2's
`TimeManagerFrame` / `StopwatchFrame` (804047) and `ChannelFrame` (1785420, Blizzard_Channels). No Forever shots.

## Forever and 1.14.2

- The clock's settings (the minimap clock's click): the same ButtonFrameTemplate in both (the alarm, 24-hour and local time, the
  stopwatch's button). The stopwatch: the same art in both (`Interface\TimeManager\TimerBackground`): untouched.
- The chat channels window: the same ButtonFrameTemplate in both (the channel list by group, the members, Add, Settings).

## The skin

`ns.SkinButtonFrame` on both (the metal, the portrait in the ring, the title, the red close button), the settings arrow, the
channels' Add and Settings red. The game keeps every option and channel.

## In game (2026-09-29)

Both opened from the chat (TimeManager_LoadUI + Show, ToggleChannelFrame): as described. Not tried: the alarm, joining a channel.
