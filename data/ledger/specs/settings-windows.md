# The settings windows: Interface, System, Sound and Key Bindings

Built 2026-09-29 (session 35, unattended; the P3 list's item 28). ForeverUI 0.112.0, skin parts `options` and `keybindings`
(in `SkinGameMenu.lua`). Sources: 1.14.2's `InterfaceOptionsFrame` (804626), `OptionsFrameTemplate` (804707: Video and Audio),
`KeyBindingFrame` (803944, Blizzard_BindingUI); Forever's game menu recreation (the diamond dialog). No Forever shot.

## Forever and 1.14.2

Forever's settings are retail's Settings panel (one window with every category, the key bindings among them): a different window
over a different API; rebuilding it is not part of this task (open item). 1.14.2's are the classic dialogs the game menu opens:
the gold dialog border, the old header texture, a see-through dark background.

## The skin

The game menu's look: the gold border's alpha 0, the old header (texture and words, or Key Bindings' header frame) out of sight,
`ns.CreateDialogChrome` with the window's name on Forever's header (its width from the words), the dark dialog background under
the panels (the classic one let the world show through), every button red. The game keeps every panel, setting and binding.

## In game (2026-09-29)

Interface Options (first look: the world through it; the dark background added) and Key Bindings, each opened from the chat, then
a /reload. Not tried: System and Sound (the same template), changing a setting.
