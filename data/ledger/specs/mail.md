# The mail window: Forever's MailFrame for 1.14.2

Built 2026-09-28 late night (session 35, unattended; the P2 list's item 16). ForeverUI 0.102.0, skin part `mail`, `SkinMail.lua`
(Open All with the GM letters: `Mail.lua`, 0.22.0). Sources: 1.14.2's `MailFrame.xml` (804680); the user's Forever shots 2026-09-28
20:24:17 (the inbox) and 20:24:26 (Send Mail), `_Inbox/More and Flight Path`.

## Forever and 1.14.2

Forever has no mail code of its own: its MailFrame is the same ButtonFrameTemplate window as 1.14.2's (the inbox of seven letters
with Prev / Open All / Next; Send Mail with To, Postage, Subject, the stationery, seven attachment slots, Amount to send, Send Money
/ C.O.D., the money, Send and Cancel), and every file in `Interface\MailFrame` is the same in both games. The shots differ only in
Camelot's chrome: the metal frame with the letter icon in its gold ring, the page's name as the title, Forever's tabs (the open one
lit gold), the letter's minimal scroll bar.

## The skin

- `ns.SkinButtonFrame` (the gold nine-slice invisible, Camelot's metal, the portrait in the ring, the close button in Forever's red).
- The title: the page's name ("Inbox" / "Send Mail", the game's `INBOX` / `SENDMAIL`) in our title, set on each page's show; the
  pages' own title strings (under the metal's top edge) at alpha 0.
- `ns.SkinPanelTab` on both tabs (the selected one is disabled by `PanelTemplates_SelectTab`: lit), the second 3 clear of the first.
- `ns.SkinRedButton` on Open All, Send and Cancel; `ns.SkinMinimalScrollBar` on the letter's scroll bar.
- The settings arrow left of the close button (Reset window position alone for now).

## In game (2026-09-28 late night)

Shown with `ShowUIPanel(MailFrame)` (no mailbox in reach of the camera): both pages as the Forever shots. Not tried at a mailbox:
real letters, the open letter (OpenMailFrame: its own window, a later look), sending.

## The open letter (0.119.0, 2026-09-29)

OpenMailFrame, the letter opened beside the inbox, is the same ButtonFrameTemplate in both games: skin part `openmail` in
`SkinMail.lua`: Camelot's chrome with the letter icon in the ring and "Open Mail", Report Player / Reply / Delete / Close red, the
minimal scroll bar, the settings arrow. Seen in game shown from the chat beside the inbox (a stand-in: no letter, so the invoice
lines and no stationery). Not tried: a real letter with its stationery and attachments.
