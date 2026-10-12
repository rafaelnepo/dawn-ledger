# Ring menus: research and plan

Session 43, 2026-09-30. The user: "a ring menu kind of functionality as well ... they match very well with controllers since it
makes it easy to select things using the analog sticks" (after RingMenu Reborn, https://www.curseforge.com/wow/addons/ringmenureborn).
One research pass (web and source; Forever's and 1.14.2's extracted UI code, read-only). Paths: FV = (private files)
code-named/interface/addons/, 142 = (private files) (by FileDataID), CP = ConsolePort on GitHub.
Rings go with the class templates (controller-class-templates.md): the templates put the core spells on buttons, the rings hold the
rest (pets, stances, forms, auras, totems, portals, markers, consumables).

## 1. The ring addons

| Addon | Opens | Picks | How it casts safely in combat | Licence |
|---|---|---|---|---|
| RingMenu Reborn (Ahdrick, 2025) | hold a key: the ring at the cursor | the mouse; release the key to cast | no public source | MIT; Classic Era 1.15.8 only; 1-24 buttons taken from action bar slots |
| RingMenu (jsb, 2019, for 1.13) | a CLICK binding | a real mouse click on a slot (ActionBarButtonTemplate slots) | a SecureHandler placing the ring at the mouse (github.com/jsb/RingMenu main.lua:77-146) | no licence file; no stick |
| OPie (foxlit) | hold and release ("quick"), or press then click | the mouse direction; a controller option uses a stick | every slice's action written ahead on one secure button (`type-r1s3`...); on release a restricted snippet turns the position into a slice and **returns that slice's name**, so the button runs it (old v1.55 OneRingLib.lua:214-320) | All Rights Reserved |
| ConsolePort 2.4.5 (the 1.14.2-era build) Utility / Pet Ring | hold a pad button | the stick's angle (deadzone 0.5) | on the button's up-click a restricted snippet reads `GetGamePadState()` sticks, picks the nearest slice and copies its type / spell / item / pet action onto the button, which then fires (CP View/Pie/Utility.lua:61-124, Controller/Radial.lua:237-262); the highlight drawn by insecure code (`OnGamePadStick`) | Artistic-2.0 |

## 2. WoW Forever's radials

- **The game menu radial** (FV blizzard_gamepad/ui/radials/gamepadradial.lua): Start opens it; 8 segments, 3 pages (LB / RB); the
  centre page: bags, professions, character, talents, map, chat, menu, spellbook; D-pad up the targeted emotes, down sit; the right
  stick selects past 0.5 and **letting the stick go back (under 0.2) fires the segment**.
- **The class flyouts** (FV blizzard_gamepadactionbars/): two round class buttons on **LB + LT** and **RB + RT**: Druid forms,
  Paladin auras, Warrior stances; Hunter / Warlock pet commands (Attack, Follow, Move To, Passive, Defensive, Assist) and pet spells.
  8 slots at 45 degrees, radius 60, the right stick; letting it drop under 0.5 clicks the slot (flyoutradial.lua:319-355).
- **The ping wheel** (4 wedges, R3) on a generic radial wheel (blizzard_sharedxml/blizzard_radialwheel.lua). Raid markers cycle, no ring.
- **The art:** gamepad-flyout-circular-base (183), -slot-normal / over / selected / highlight / down (56), the selection indicator
  and gamepad-largecursor (flyout set, FDIDs 8244964 / 8244963); gamepad-radial-menu-wheelbg (540), -selected, and an unused
  gamepad-radialgamemenu-eightbg-default (666) with -eightslot-focus (FDID 6227249); icons gamepad-radial-icon-*.
- **What can't come to 1.14.2:** Forever's binding stack, TriggerSecureClick, its flyout data, pings. And its way of firing (a
  `:Click()` from a stick handler) only works for Blizzard's untainted code: an addon's would be blocked in combat. We take its
  look and its numbers, not its trigger.

## 3. What 1.14.2 allows (from its FrameXML)

- A restricted snippet can read the stick (`GetGamePadState()`, 142 804760:15-16, 186-191) and the mouse (`GetMousePosition()`).
- Only OnClick / PreClick / PostClick / OnEnter / OnLeave / OnShow / OnHide / OnAttributeChanged... can be wrapped securely
  (804768:440-456): **not OnGamePadStick, OnUpdate or OnKeyDown**. A stick event reaches insecure code only: it can light a slice,
  never cast it.
- A wrapped OnClick may return another button name, and the secure button then runs that name's attributes (804768:279-296,
  804793:567-625): spell, item, macro / macrotext, action, pet, target, cancelaura, worldmarker...
- **So the one safe way in combat: hold the ring's button (the down-click opens it), point the stick or the mouse, release the
  button (the up-click's snippet reads the stick at that moment and casts).** "Let go of the stick to fire", Forever's way, can't be
  done by an addon in combat. Out of combat anything goes (rings rebuilt, bindings changed); in combat the contents are fixed.

## 3b. The probe (2026-09-30, `/fui gamepad rings`, the DualSense, Forever's layout on: L2 Shift, R2 Ctrl, L1 Alt)

- **R1 arrives with the modifier held:** R2 + R1 = Ctrl + PADRSHOULDER, L1 + R1 = Alt + PADRSHOULDER. L2 + R1 read "nothing held"
  twice (to try again: maybe pressed in the other order).
- **L1 + L2 (two emulated modifiers) sends no key at all**, and the triggers and L1 alone send none (they are modifiers): Forever's
  LB + LT chord can't be copied. **The rings open on R1 chords:** R2 + R1 (Ctrl) and L1 + R1 (Alt); L2 + R1 (Shift) if it reads.
- **The sticks' names** from OnGamePadStick: the left stick "Left" and "Movement", the right "Right" and "Camera" (each reported
  twice, by both names).
- A ring can keep the right stick from the camera (SetPropagateKeyboardInput false): the camera stayed still (the user).
- L2 + R1 = Shift + PADRSHOULDER when L2 is held first (the second probe): the utility ring's chord.
- **Built (0.185.0) and tested by the user in game:** a Hunter's pet commands ring in a fight with a beast: it worked.

**The look (the user, 2026-09-30):** the eight-slot ring (gamepad-radialgamemenu-eightbg-default, -eightslot-focus, the round slot
rings) by default; the bronze wheel (gamepad-radial-menu-wheelbg) an option in the settings (ns.db.ringStyle "eight" / "wheel").

## 4. Our rings (plan)

**The mechanism** (OPie's redirect + ConsolePort's stick read):
- One hidden secure button per ring (SecureActionButtonTemplate + SecureHandlerBaseTemplate, clicks on down and up), bound with
  SetOverrideBindingClick out of combat; each slice written ahead as suffixed attributes (`type-s3 = "spell"`, `spell-s3 = ...`;
  pet commands `type-sN = "pet"`; markers `macrotext`).
- Its OnClick wrapped: **down** opens the display (CallMethod); **up** picks the slice from the stick (length ≥ 0.5) or the mouse
  (under 20 px from the centre: nothing) and returns `"s" .. index`, or false to cancel.
- **The display** apart, not protected: Forever's flyout art, 8 slots at 45 degrees; a highlight driven by `OnGamePadStick` (the
  same angle function as the snippet: one piece of code, kept once), the stick kept from turning the camera while the ring is open.

**Using it:** hold the ring's button, tilt the **right stick** (Forever's; the left as an option) or move the mouse, release to
cast; released in the middle: nothing. Up to 8 slices. Mouse and keyboard players: any key held. An option later: the D-pad and
face buttons pick slices 1-8 while the ring is open (OPie's "mouse-less").

**Opening on the pad** (the probe): R2 + R1 = CTRL-PADRSHOULDER (class ring 1), L1 + R1 = ALT-PADRSHOULDER (class ring 2),
L2 + R1 = SHIFT-PADRSHOULDER if it reads (the utility ring), else L3 held. Forever's LB + LT sends no key on 1.14.2.

**The rings** (defaults per class, spells by id at the highest rank known; the templates doc's appendix):
- Hunter, Warlock: pet commands; pet spells (Forever's pair). The first beta: the hardest classes on a pad (the templates doc).
- Druid: forms. Warrior: stances. Paladin: auras; blessings.
- Shaman: the totems (one ring per element, or 8 main totems).
- Mage: portals and teleports (by faction), conjures.
- Everyone: raid markers, consumables and quest items, a utility ring (hearthstone, mount, food and drink, bandages).

**Setting them up:** a Rings page in the Options window (two columns); drag a spell, item or macro onto a slice, right-click clears;
saved by class (`ns.db.rings[CLASS]`), as the pad templates; changes wait for the end of a fight.

**Steps** (preview first, both factions):
1. A probe: the sticks' indices per pad, whether LB + LT sends a key, whether a ring can keep the stick from the camera in a fight.
2. A browser preview: a Hunter's pet ring (Horde) and a Paladin's aura ring (Alliance) in Forever's flyout art, the stick's pick.
3. The pet ring (Hunter / Warlock) in the game, tested in a fight.
4. Stances, forms, auras.
5. The utility and marker rings.
6. The Rings page (the editor).
