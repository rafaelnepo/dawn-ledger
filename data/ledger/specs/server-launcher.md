# Server launcher

Plan of 2026-10-07 (session 63, research only; nothing built, nothing installed, the server untouched). The user: a window
with more information about the server than a start script gives, and a proper Launch button. Asked for: launchers other
servers use (templates), and a look at the backups in `(a file on the server's Mac)` for a launcher to repurpose.

## What the launcher has to drive today

The facts below come from `scripts/50_run.sh`, `scripts/stop-all.sh`, `scripts/play-classic.sh` and
[operations.md](../server/operations.md).

| Service | Port | Started by | Stopped by |
| --- | --- | --- | --- |
| MariaDB | 3306 | `brew services start mariadb` (play-classic.sh waits up to 60 s for the port) | `brew services stop mariadb`, then "Shutdown complete" checked in the newest `*.err` |
| Persona shim | 5005 | 50_run.sh, tmux window `wow:shim` | closing the tmux session |
| Director | none | 50_run.sh, tmux window `wow:director` | closing the tmux session |
| realmd | 3724 | 50_run.sh, tmux window `wow:realmd` | closing the tmux session |
| mangosd | 8085 | 50_run.sh, tmux window `wow:mangosd` (first start: bot accounts, slow) | `server shutdown 5` typed into its window, up to 5 minutes to save; never killed |
| Patch-service stand-in | 8090 | play-classic.sh, `nohup python3 scripts/patch_service.py` | SIGTERM (holds no data) |
| HermesProxy | 1119 | play-classic.sh, from the patched v4.5.3 folder, with the build and certificate on the command line | SIGTERM (holds no data) |
| 1.14.2 client | none | play-classic.sh, exec'd with `DYLD_INSERT_LIBRARIES` set to the trust shim | the player quits it |

Before the client starts, play-classic.sh also: refuses a stuck mangosd (one that logged "Halting process..." but never
exited), clears the client's stale lock files, sets `SET portal "127.0.0.1"` in `Config.wtf`, backs up every
`ForeverUI.lua` saved-variables file (newest 20 kept in `(a file on the server's Mac) Backups/foreverui-settings`), and runs
`foreverui_global_settings.py`, `gametags.py assign` + `export` and `inspect_export.py`.

Three traps a launcher must keep:

- **The client cannot go through LaunchServices.** Finder, the Dock and `open` drop `DYLD_*` variables; the shim then never
  loads and login fails with "Glue Fatal Error: 1023" (play-classic.sh's header). The launcher has to spawn the game
  process itself, with the variable in the child's environment.
- **The game must outlive whatever started it.** The task list notes it: a background launcher that hit its time limit
  took the game with it; the fix was a detached `nohup scripts/play-classic.sh &`. Closing the launcher window must never
  quit the game or the server.
- **mangosd is stopped only by `server shutdown`.** It ignores SIGTERM in the background, and closing the tmux session while
  it saves kills it mid-write. The launcher's Stop calls `scripts/stop-all.sh` (which already does this right) and never
  kills anything itself.

## The backups: no launcher in them

Listed without unpacking (`unzip -l`, `unrar l`, `7z l`):

- `(a file on the server's Mac)` (9.8 GB): a Turtle WoW 1.18.1 Windows client (`WoW.exe`, the MPQs, Blizzard's
  1.x documentation pages). Its only loader is `twloader.dll` with `dlls.txt` naming `twdiscord.dll`: DLLs the client loads
  at start, no launcher window. `realmlist.wtf` points at a public server.
- `(a file on the server's Mac)` (5.3 GB): a 2013 Windows installer (`setup.exe` plus four `setup-*.bin`).
  No server and no launcher.
- `(a file on the server's Mac) Backups/capybara wow v1181.zip` (9.8 GB, found while looking): the same 1.18.1 client with DXVK, SuperWoW,
  nampower, UnitXP and `VanillaFixes.exe` (a Windows DLL-injecting starter, not a window). No server.
- `(a file on the server's Mac)`: the one real launcher on disk, a SwiftUI app (GPL-3.0, Sparkle updates). It
  runs Windows clients under Wine on Apple Silicon, so it drives no server; its value is as a reference for a native macOS
  launcher's look and structure (see below). Only its `Info.plist` was read
  (`/private/tmp/claude-501/launcher-research/wowsilicon/`).

Neither backup is a server: both are clients. Nothing there can be repurposed beyond ideas.

## Templates found (GitHub, read 2026-10-07)

| Project | Stack | License | What it shows and does | Use for us |
| --- | --- | --- | --- | --- |
| [TMFAZE/cmangos-launcher-fresh](https://github.com/TMFAZE/cmangos-launcher-fresh) | Electron, React, Vite, Tailwind; Fastify API, Prisma | MIT | Battle.net-style launcher for a CMaNGOS server: one Play button that changes with the state, news, armory, live world map, an admin "Server Controls" tab (start, stop, restart, log tail per realm, console over SOAP) | The closest match. Its server control is a registry of targets (tmux session, process match, port, launch command, log path), which is our `wow` session exactly. Take the idea and the layout; the stack is too heavy for this Mac |
| [Stefan2102/azerothcore-launcher](https://github.com/Stefan2102/azerothcore-launcher) | Tauri 2, Rust, React, TypeScript | GPL-3.0 | Local AzerothCore launcher: start and stop MySQL, authserver, worldserver (and Ollama), four live terminals, a world-console input with command suggestions, a detached client launch, settings for paths | The best feature set for a local solo server, and a detached client launch like ours. Windows-only today; GPL means reading, not copying, unless our launcher is GPL too |
| [telemaus/azerothcore-launcher](https://github.com/telemaus/azerothcore-launcher) | Electron, plain HTML/JS | MIT | Start and stop buttons per component and a status view; small (a `main.js`, a `renderer.js`, two pages) | A small, readable example of the status-and-buttons panel |
| [WoWSilicon/WoWSilicon](https://github.com/WoWSilicon/WoWSilicon) | SwiftUI (Swift package), Sparkle | GPL-3.0 | macOS launcher for old clients: version profiles, realmlist editor, addon and mod managers, graphics options, update checks | How a native macOS game launcher is organised; the user already has it installed |
| [matasarei/wow-launcher](https://github.com/matasarei/wow-launcher) | Swift 6, SwiftUI | MIT | Native macOS launcher for 1.12 to 3.3.5a: Play screen, display settings, install, patch, verify | An MIT SwiftUI base if we ever go native: a Play screen and a settings screen to start from |

Also seen and set aside: [Arctium/WoW-Launcher](https://github.com/Arctium/WoW-Launcher) (C#, MIT; patches modern clients to
connect to custom servers, which our trust shim and HermesProxy already do), SPP Classics
([celguar/spp-classics-cmangos](https://github.com/celguar/spp-classics-cmangos), CMaNGOS with playerbots like ours, but its
launcher is a Windows batch menu, no license), Parquelle/WoWRetroLauncher (C#, no license), StygianCore-Controls (Windows
batch files plus a process monitor). No macOS server launcher for CMaNGOS exists that we could take as is.

## Recommended stack

A local web page served by a small Python backend, opened in its own window, with a native wrapper later if wanted.

- **Backend:** `tools/launcher/server.py`, standard library only (`http.server`, `subprocess`, `json`), bound to
  127.0.0.1 on a free port (8792, beside the database site's 8791). It calls the existing scripts rather than repeating
  them: `play-classic.sh --services-only` for Start, `stop-all.sh` for Stop, and reads ports with `lsof` like the scripts do.
  One source of truth for the start order and the traps above.
- **Page:** HTML, CSS and plain JS in the Forever look (the web-windows library in `dbsite/` already has the frames,
  buttons and fonts). This is the user's preview-first way of working: the launcher is its own preview.
- **The game launch:** the backend spawns the client with `subprocess.Popen` (`start_new_session=True`, the environment
  with `DYLD_INSERT_LIBRARIES`), never `open`, so the shim loads and the game outlives the page and the backend. The
  pre-launch steps stay in play-classic.sh; the simplest form runs `play-classic.sh` itself detached.
- **The window:** first a Chrome or Safari app-style window on `http://127.0.0.1:8792`, started from a
  `Launch WoW.command` beside the two existing ones. Later, if the user wants an icon in the Dock: a tiny SwiftUI app that
  starts the backend and shows the page in a `WKWebView` (about 100 lines; matasarei/wow-launcher is an MIT model).

Why not the others: Electron carries its own Chromium (hundreds of MB of memory on a Mac that runs out of it); Tauri is
light at run time but needs a Rust toolchain installed and a build step; a fully native SwiftUI launcher cannot be
previewed in a browser and duplicates the scripts' logic in Swift.

## Features

In order of value. Each line names its data source.

1. **Services panel.** One row per service in the table above: a state light (stopped, starting, running, stopping, stuck),
   the port, uptime, memory (`ps -o rss,etime -p <pid>`), and its own Start and Stop where that is safe (the proxy and the
   patch service alone; the tmux services only together, as 50_run.sh does). Source: `lsof -iTCP:<port> -sTCP:LISTEN`,
   `pgrep`, `tmux list-windows -t wow`, `brew services info mariadb --json`.
2. **The Launch button.** One big button whose label follows the state: Start Server, Starting... (with the step it is on:
   database, login server, world server, proxy), Play, Playing, and Stop Server. Play runs the whole play-classic.sh path.
   A client already running turns it into a disabled Playing.
3. **Realm card.** Realm name and address (`classicrealmd.realmlist`), uptime and peak players since start
   (`classicrealmd.uptime`, written by mangosd), characters online now and the user's own characters with level, race,
   class and zone (`classiccharacters.characters`, `online = 1`), random bots online (online characters on accounts named
   `RNDBOT...`, the name `tools/gametags.py` already uses), the configured bot limits (`aiplayerbot.conf`), the rates
   (`config/*.overrides`).
4. **Build and patches.** mangosd's build date and the backup binaries (`(the server's checkout)`), the local
   source patches (`tools/server-patches/`), the world and realm SQL patches, HermesProxy's build, Forever UI's version
   (`addons/ForeverUI/ForeverUI.toc`). A "what's new" line from each.
5. **News.** The newest entries of `docs/session-log/` as cards (title and first lines), and the open kickoff in
   `docs/kickoffs/`. Plain text from our own docs.
6. **Logs.** A tail of `(the server's checkout)`, `Realmd.log`, `DBErrors.log`, the shim and director logs, and
   `hermes.out`, read on demand (no live streaming while the game runs, to spare memory).
7. **World console.** A one-line input sent with `tmux send-keys -t wow:mangosd`, with the useful commands of
   operations.md as buttons (`rndbot stats`, `server info`, `saveall`). The reply is read from the log tail. SOAP and RA are
   both off in `mangosd.conf` (`SOAP.Enabled = 0`, `Ra.Enable = 0`); turning SOAP on (127.0.0.1:7878) would give clean
   replies, but it needs a GM account's password in the backend, so it is a question below.
8. **Backups.** The ForeverUI settings backups (count, newest), a "Back up the databases now" button (`mysqldump` of the
   four databases into `(a file on the server's Mac) Backups/db/<date>`, only while mangosd is stopped or after `saveall`), and the list
   from operations.md of what is worth keeping.
9. **Settings.** Paths (client, HermesProxy, cmangos), the bot count, the port of the page, "stop the database too" (the
   `--keep-db` switch). Stored in a small JSON file outside the repo or git-ignored.

Not in the first version: account creation, the armory, a world map, patch downloads (all in cmangos-launcher-fresh; none
needed for a solo server).

## Rules it inherits

- Passwords never on a command line or in a page: the backend reads `.env` and gives `mysql` the password through
  `MYSQL_PWD` or a `--defaults-extra-file` in the scratch folder. (`tools/gametags.py` passes `-p<password>` as an argument,
  visible in `ps`; a note for later, not a launcher change.) The page never receives a password.
- Bound to 127.0.0.1 only; every action is a POST with a per-start token, so another page in the browser cannot start or
  stop the server.
- Never `kill -9` mangosd or MariaDB; Stop is `stop-all.sh`, and a client still running asks first (the script's own
  question becomes a dialog).
- The world database stays read-only; the launcher only reads.
- Blizzard's art stays private: Forever-look art comes from the local `(a file on the server's Mac)` at run time, as the database site
  does, never into the repo.
- Text by the style guide (curly quotes, the ellipsis, American spelling); both factions shown alike in the realm card.
- Light: the page polls every 5 s while open and stops when hidden; the backend exits when the page has been closed for a
  while, and never touches the game.

## Questions for the user

1. A window in the browser first (the preview is the launcher), and a Dock app later; or straight to a Dock app?
2. Should closing the launcher stop the server, or leave it running (today's scripts leave it running)?
3. Turn on mangosd's SOAP on 127.0.0.1 for a console with real replies? It needs a GM account for the launcher.
4. The bot count as a launcher setting (a restart applies it), or leave bots to `aiplayerbot.conf`?
5. Which look: Forever's Battle.net-style launcher (a big art panel, news on the left, Play at the bottom right), or a
   compact control panel?
6. Database backups from the launcher: on a button only, or also at every Stop?
7. Keep the two `.command` files as they are beside the launcher?

## First steps

1. Browser mockup of the launcher page (static data), in the Forever look; the user picks the layout.
2. `tools/launcher/server.py`: the read side only (states, realm card, news, logs) against the running server; nothing it
   can start or stop yet.
3. Start and Stop wired to `play-classic.sh --services-only` and `stop-all.sh`, with progress read from the ports.
4. Play: the detached client launch, tested by closing the page and the backend while the game runs.
5. Tests in `addons/tests/` style for the backend (state detection with fake `lsof` and `pgrep` output); `tools/inventory.py`
   after adding the tool.
6. The `Launch WoW.command`; later, if wanted, the SwiftUI wrapper.

## The user's answers (session 63, 2026-10-07)

1. **Mac first.** A real Mac app with a Dock icon; Windows not planned.
2. **A Stop button** beside Launch (the server keeps running when the launcher closes; Stop is explicit).
3. **The bot count as a setting** (applied at the next start; the bots themselves get their own research pass later: nothing
   about them has been tuned since the project began).
4. **The look:** a Battle.net-style hybrid, more minimal: the art panel and the big Launch button, with a settings page and a
   control panel (each service's state, start and stop, the log's tail).
5. **Database backups (my choice):** `classiccharacters` and `classicrealmd` saved with `mysqldump` at every Stop and on a
   Back Up Now button, into `(a file on the server's Mac) Backups/databases/<date-time>/`, the newest 10 kept; the world database is left out
   (it only changes through our patches, each with its undo; a full world dump is a manual button in settings).
6. **The two `.command` files stay** for now.

## The build plan (decided)

- **One Mac app, a SwiftUI shell around a web view.** The window is a SwiftUI `NSWindow` with a `WKWebView`; the interface inside
  is HTML/CSS/JS in Forever's look, so its browser preview (dbsite/build) *is* the interface, the project's "preview first"
  rule kept without a second implementation. The page talks to Swift through `WKScriptMessageHandler` (start, stop, status,
  backup, settings) and Swift answers by calling `evaluateJavaScript`. No local HTTP server, no Python process to keep alive.
- **Swift does the work by calling our scripts** (`scripts/50_run.sh`, `play-classic.sh --services-only`, `stop-all.sh`) with
  `Process`, so their logic stays in one place; status from the ports (3724, 8085, 5005, the proxy's) and `pgrep`; the log tail
  by reading the files; the bot count by rewriting `config/*.overrides` before a start; MariaDB through `brew services`.
- **Launch** starts what isn't running, in order (MariaDB, realmd, mangosd, the proxy), waits for the world port, then starts
  the client as a detached process with the same environment `play-classic.sh` sets (never `open`).
- **Built without an Xcode project:** `swiftc` from the command line into `Forever Launcher.app` (an Info.plist, the icon, the
  web folder copied into Resources), ad-hoc signed (`codesign --sign -`); a script `tools/launcher/build.sh`.
- **First steps:** the preview page in the browser (the main screen, settings, control panel) for the user's look; then the
  Swift shell with start/stop/status; then Launch and the client; then backups and the bot setting.

## The preview (session 65, 2026-10-08)

`dbsite/build/win_launcher.py` → http://127.0.0.1:8777/dbsite/mockups/launcher/ (private: the game's art). Round 1: one design on
Kalimdor's key art with news and the user's characters. Round 2, the user's notes: the user's wallpapers
(`(a file on the server's Mac)`, their letterbox and the Blizzard badge cut off) as the background; frames from the game; a header
and a footer; the loading bar centred in the footer in the game's loading-bar art (`Interface/Glues/LoadingBar`: the v2 frame, its
fill, spark and glow; the old frame for Classic); the Play label centred on its capitals (measured on screen per button art); a box
on the left introducing the server (title, subtitle, description); the news as a changelog; no characters; three designs:

- **Forever:** Forever UI's rock and metal edges for the header and footer, the diamond-metal dialogs, top tabs, the gold Play.
- **Classic:** the 1.14.2 login glue: the character-create metal rails and finery corners, the glue tooltip's box, the big red glue
  button, the old loading bar.
- **Chronicle:** the classic announcement's parchment for the intro (Morpheus, ink), the changelog in a dark column between gold
  lines, Forever's red buttons.

Round 3, the user's choice and notes: **Forever** (Classic and Chronicle set aside). Play and Stop on the wallpaper, bottom right,
with the line about what closing does under them; the footer: what is happening, the loading bar centred, the services' lights
under it; the tabs: Forever's panel tabs turned up and stood on the header's metal edge (its edge over their feet), labels in the
middle of what shows; wider padding in the intro and the changelog; the changelog moved by the game's minimal scroll bar in its own
gutter (never over the text); the subtitle "An offline realm, tuned for a single player"; the realm's light and every service light
centred on their words' capitals; the window 1100 x 720 (room for the changelog). Server and Settings approved as they are.

Round 4: the server renamed **The Sleeping World** (the user: the world, not the player; Azeroth as a world-soul asleep), in the
launcher and in the game's realm list (realm patch 002, scripts/rename_realm.sh; docs/server/operations.md); the launcher speaks
in it (Asleep, Waking…, Awake beside the realm's light; "The world sleeps"; "Play wakes the world first"). The wallpapers take
turns, the next at each opening. The tabs cut off inside the edge's solid metal (the wallpaper in front of what lies below), their
labels on one line.

Round 5: the wallpapers whole and never enlarged (the user: "uncropped and not extended"): the full 1600 x 900 picture, letterbox
and badge included, at the window's width between the header and the footer (1100 x 619, its own 16:9); the header's and footer's
metal edges moved inside them so nothing lies over the picture; the window 1100 x 807.

Round 6: the window 1920 x 1080 (16:9, the wallpaper's shape), laid out at 1280 x 720 and drawn at 150 % (the app's web view zoomed
the same); the wallpaper whole behind all of it (the header and the footer over its own dark bands), the Mac's title bar
see-through with its lights over the header; Dawn alone (the user saved it without the Blizzard badge; no rotation, no Background
setting). The server renamed **World of Warcraft – Dawn** (the launcher's title), the realm in the game just **Dawn** (realm
patch 002, folders moved, docs/server/operations.md); the light beside it reads "Dawn · Awake".

Round 7: the changelog on the left, the whole height; the server's intro on the right with Play and Stop under it (their right
edge on the box's); the realm's light reads Offline, Starting…, Online. The changelog box shows three entries, the rest by its
scroll bar. The tabs all one size: the open one in the open tab's gold art, glowing where it stands.
Round 8: the Play page's two columns from one top, centred together between the header and the footer.
Round 9: the changelog 30 % narrower (336, the intro 480); the two boxes' dark background about 10 % more see-through (the
file's 87 % opaque to about 77 %); the Server and Settings frames unchanged.
Round 10: Play the same size as Stop (92 x 30: the gold art at its own size, no longer blown up; its label 2 px up onto the
art's body); the line about closing the launcher under the changelog; the footer's status line, loading bar and lights centred
together in what shows of the footer (the status tried under Play, then put back above the bar by the user); Stop always asks
first: a title, "Stop the Server", over "The world is saved first, which can / take up to five minutes." in two set lines, the
buttons 18 under them (the user, session 67); with the game open, "The game is still running. / Your character is saved first."
The world's backup and the proxy's stop ask the same way.
Round 11: the changelog shows two entries (the rest by its scroll bar), the columns centred again; the Stop question with Cancel
on the left and Stop the Server (gold) on the right, centred in the window.
Round 12: the realm's facts (1.12 rules, Experience 1×, Bots, Both factions) in the footer, centred; the status line, loading bar
and lights on the wallpaper just above the footer's border, on every page (the Server and Settings frames end above them); Play
and Stop inside the intro's box, under its words, their right edge on the text's (Play 2 px lower: the gold art sits higher in its
box than the red, measured on screen); the Play page's columns centred between the header and the loading group.
Round 13: the intro's box 650 wide, its words in 3/5 (the title on one line) and Play over Stop in the other 2/5, centred there
(128 x 30, the game's button width); each box centred on its own between the header and the loading group, whatever its height.
Round 14 (round 13's split set aside: "balance and a slimmer version"): the intro's box 424 wide, its words 344 (the title on one
line); Stop and Play under the words, side by side, each half their width so the pair spans it (Stop left, Play right); Stop greyed
while the server isn't running.
Round 15: the footer redesigned as seven tiles, each a 1.14.2 icon in a gold frame (cropped 5 of 64 px a side), a small label and
its value, gold hairlines between: Rules (Patch 1.12), Experience (the server's rate), Loot and gold, Adventurers (the bot range,
following Settings), Factions (both banners), Uptime (by the server's state), Forever UI (its version).
Rounds 16-19: the rates in words ("Normal rate (1×)"); the line about closing the launcher in the header, left of the realm's light;
the boxes 60 px below the middle (the page bar's nudges for fine adjustments); the game's logo moved from the header onto the top
of the intro's box (200 x 100, a third of it over the frame), the tabs moved left after the Mac's lights.

Open: where the changelog comes from in the app (a file we keep, or the commits).


## The app, first build (session 65, 2026-10-08)

`tools/launcher/build.sh` builds the page (win_launcher.py) and `(a file on the server's Mac) Launcher.app` (tools/launcher/Launcher.swift:
swiftc, no Xcode project, ad-hoc signed). The window is the page in a WKWebView: laid out at 1280 x 720 and zoomed 1.5 (1920 x 1080),
smaller on a smaller screen, 16:9 kept; the page loads from `(private files)` (the art stays there).
The page knows it is in the app (`window.LAUNCHER_APP`; `?app` checks it in a browser): the preview's bar is hidden, the state is
the app's, the buttons send their action.

- **Status, every 3 s:** each service by its port (MariaDB 3306, shim 5005, realmd 3724, mangosd 8085, patch 8090, proxy 1119) or
  its process (director, the game); uptime and memory from `ps`; stuck = mangosd alive after logging "Halting process..."; the
  logs' last 14 lines; the backups. `Forever Launcher --status` prints it without the window.
- **Play:** `scripts/play-classic.sh` under nohup (detached: the game outlives the launcher); "starting" until the game's process
  appears, or the script ends without it (its last line said). Log: `(a file on the server's Mac) Launcher/play.log`.
- **Stop** (after the page's question): `scripts/stop-all.sh --keep-db` (with `STOP_CONFIRMED=1` when the game is open: the
  script's own question answered), then the backup if ticked, then `brew services stop mariadb` unless kept.
- **Back Up Now:** mysqldump of classiccharacters and classicrealmd (the password in MYSQL_PWD, from .env) into
  `(a file on the server's Mac) Backups/databases/<date-time>/`, the newest 10 kept; an `at-stop` mark for the stop's.
- **Console:** `tmux send-keys -t wow:mangosd`; the reply in the log. **Show in Finder:** the backups folder.
- **Window size:** Settings' Smaller window (75 %) makes it 1440 × 810 (zoom 1.125), its top edge kept; remembered by the app
  (UserDefaults `smallWindow`); never larger than the screen holds.
- **Next build:** done in session 66 (below).

## The app, second build (session 66, 2026-10-08)

- **The bot setting:** Settings' Fewest and Most random bots, on release, write `AiPlayerbot.MinRandomBots` and `MaxRandomBots` into
  `config/aiplayerbot.overrides`, then `scripts/apply_overrides.py` applies the file to `(the server's checkout)` (as
  40_configure.sh does, `ETC_DIR` given); the world server reads it at its next start. The sliders and the footer's Adventurers
  tile start from the file (the status's `bots`).
- **The proxy's and the patch service's own Start/Stop** (Server page): `scripts/play-classic.sh --proxy-only` / `--patch-only`
  (its two start blocks now functions; in its own session, as Play is, so it outlives the launcher) and `scripts/stop-all.sh
  --proxy-only` / `--patch-only` (SIGTERM; nothing else touched). Usable whenever nothing is starting or stopping: the proxy down
  makes the server show as stopped, and its Start is the cure. Stopping the proxy with the game open asks first (it disconnects the
  game). Log: `own.log`.
- **Back Up the World…:** asks first (Cancel left, Back Up right), then `mysqldump --single-transaction --quick` of classicmangos,
  gzipped, into `<backups>/<date-time>-world/`; MariaDB started for it when down and stopped again after; `saveall` first when the
  world server is up. The newest 3 kept, apart from the characters' 10 (listed as "The world"). Measured: 114 MB of SQL, 206 tables,
  21 MB gzipped, 3 s (the kickoff's "~1 GB" was the guess; 455 MB on disk with the indexes).
- **Paths' Change…:** an NSOpenPanel (opening on the current folder) per path; the folder must hold what the scripts look for (the
  game's `_classic_era_/World of Warcraft Classic.app`, `HermesProxy`, `run/bin/mangosd`; `_classic_era_` itself is taken as its
  parent); stored in UserDefaults `path.<id>` (the default chosen again clears it). Every script the app runs gets them as
  `GAME_DIR_CLASSIC`, `HERMES_DIR`, `CMANGOS_ROOT`; the status reads the logs, the crashes and the backups from them. The picker is a
  separate macOS service: computer use can't click in it (the user tested it).
- **Messages:** what a click did shows once in the header (at most 600 wide, clear of the tabs; the rest in its tooltip) and, on
  the Server page, right of the console's buttons (two lines at most; it ran over the frame's foot below them). The Settings page's
  copy is gone (it ran into the World database heading). The footer's rates read "1× Rate" (the user). What a click did leaves after a
  minute (the app sends it empty after 60 s unless an action still runs; tested with the patch service).
- **The Play page's intro box:** its dark background at 60 % (the changelog's stays at 88.5 %: the intro sits over the wallpaper's
  dark rocks, the changelog over the sky); its description wraps plainly, out to the padding (WebKit's `text-wrap: pretty` evened
  every line, ending them ~50 px short).
- **The changelog:** plain wrapping too (the lines out to the scroll bar). The scroll bar's black mark under its up arrow was the
  track's top cap alone: webui.py's export pattern `^minimal-scrollbar` missed `!minimal-scrollbar-track-middle` (now `^!?`), so
  the track had no middle in any page using FUI.sbar.
- **Live run (user and Claude):** Play (the game in 27 s); the proxy's Stop with the game open (asked; the realm Offline), its Start
  (Online again; the user logged in through it, "Sessions online: 1"); the patch service's Stop and Start; Stop with the game open
  (asked; "Halting process...", 43 MB backup, MariaDB stopped, 20 s).

## For agents debugging the launcher (session 65)

- `(a file on the server's Mac) Launcher/status.json`: what the page shows, rewritten every 3 s (services, uptime and memory, stuck, busy,
  the last message, the backups, every log's path). Read it instead of asking for a screenshot. `Forever Launcher --status` prints
  the same without the window.
- `(a file on the server's Mac) Launcher/launcher.log`: one line per action (Play, Stop and its choices, backups, console commands, the
  window size, opening and quitting) and per service going up or down, with the time. `play.log` and `stop.log` beside it are the
  scripts' own output.
- **Copy Debug Report** (Server page): `docs/feedback/inbox/<date-time>-launcher-debug-report.md`, its path on the clipboard: the
  status, the last 60 events, the world server's errors since its start, the game's newest crash with the frames naming its reason,
  the last 100 lines of every log, the versions, config/*.overrides with any setting named like a password, key, token or secret
  left out.
