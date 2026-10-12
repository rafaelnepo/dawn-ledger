# Scroll bars: the standard

The user, 2026-10-02 (session 53), from the scroll bar sheet (tools/asset-extract/scrollbar_styles_preview.py,
http://localhost:8777/ui-forever/previews/scrollbars/): **F1 exactly**, Forever's MinimalScrollBar, on every list and text pane,
ours and the game's.

## The style (Forever: blizzard_sharedxml/shared/scroll/minimalscrollbar.xml, .lua, scrollbar.lua, scrollbar.xml)

```css
.scrollbar {                         /* ns.CreateScrollBar (Widgets.lua) */
  width: 8px;
  track: minimal-scrollbar-track-top / !-middle (tiled) / -bottom;  track-inset: 19px;   /* from each end */
  thumb: minimal-scrollbar-small-thumb-top / -middle / -bottom;     /* the middle cut to the height, not squashed */
  thumb:hover: ...-over;  thumb:active: ...-down;
  thumb-min-height: 23px;            /* proportional to the view */
  thumb-hit-area: 4px wider each way;
  steppers: minimal-scrollbar-arrow-top / -bottom, 17 x 11, inside the ends (-over, -down);
  stepper:active: the art 1 right and 1 down;
  stepper:disabled: desaturated, no states;
  hold (a stepper, the track): again after 0.5s, then every 0.1s;   /* the stepper only while the cursor stays on it */
  wheel (on the bar): a step;
  sound (a stepper or the thumb pressed): U_CHAT_SCROLL_BUTTON;    /* Forever's SCROLLBAR_STEP plays the same file, 567407 */
}
.scrollbar-place {                   /* ns.SCROLLBAR_GAP: Forever's most common (34 of its bars) */
  left: list.right + 5px;  top: list.top + 2px;  bottom: list.bottom - 4px;
}
```

## How it's built

- **Our lists**: `ns.CreateScrollBar(parent, frame, x, top, bottom, onScroll, step)`; `step` a number or a function.
- **The game's scroll frames** (UIPanelScrollBar, FauxScrollFrame, HybridScrollFrame): `ns.SkinMinimalScrollBar(bar)` /
  `ns.SkinMinimalScrollFrame(sf)`. The game's slider stays the logic (its value, range, the game's wheel and update code), out of
  sight and out of the mouse's way; the standard bar, its child, is drawn from 11 above the slider to 11 below (where the old
  steppers were, so each window's layout holds) and drives it: a step is the game's (`scrollStep`, a hybrid frame's `stepSize` or
  row height, or half the bar's height). `bar.foreverBar` is the drawn bar.
- **Single steppers** (Guild's MOTD): `ns.CreateScrollStepper(parent, dir, onStep)`.
- **Not a bar**: Guild's communities list shows a still bar, part of Forever's picture of an empty list.

## Status

- 0.219.0: both builders on the standard (34 bars), the quest log's own track removed (the bar has one).
- Next: each window's bar at the standard gap, checked in game (/fui shot): a measure in the offline stub (session 53) can't
  tell, since its windows overlap and the game's frames aren't placed as in the client. Our character lists (ns.CreateList)
  already sit at 5 / 2 / 4. Where a window recreates a Forever window from its page, Forever's own placement for that window
  stays (that is F1 exactly there), and so do the places the user corrected (the cards' bars inside their borders). Then the
  sheet's in-game shots.

## The per-window check (session 54)

`/fui bars` (0.225.3) lists every scroll bar shown with its gap to what it scrolls (ns.ScrollBars: our bars with their list, the
game's with their scroll frame) against the standard. First readings, Tauquest, the windows that open without an NPC:

| Window | Right | Down | Up | Reading |
|---|---|---|---|---|
| Map's quest log | 6 | -2 | -4 | as decided (BAR_X 314 centred in the strip, the whole column, the user, session 53): measured against the game's hidden scroll frame, not the list shown |
| GM Testing Suite | -270 | 62 | 19 | measured against the detail pane's frame, not its list: the probe needs the list for ns.CreateList's bars |
| Friends (Contacts) | 6 | 3 | 1 | 1 right, 1 low, 3 short at the bottom: a candidate, to look at with the user |
| Chat | 0 | 0 | 17 | the chat's own bar (its fade, its bottom button): its own placement |

So the probe flags candidates; each needs a look (several windows place their bars on purpose). Next, with the user: open each
window (the NPC ones too), read `/fui bars`, correct the ones that are simply off, and teach the probe the lists it misreads.
