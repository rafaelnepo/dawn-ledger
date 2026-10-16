# Custom loading screens, ultrawide ones too

Research of 2026-10-11 (read-only: nothing in the client, the proxy, the server or (a file on the server's Mac) changed). The user: "There are so
many loading screens that are unused. Can we use one of their ids, but upload a new artwork to be used? … I want to use
custom ultrawide loading screens."

Confidence per finding: **verified** (seen in the client's files, logs, binary strings or our sources), **source** (read in
code we have, not tried), **inferred** (reasoned from the evidence, not tried), **docs** (a community source says so).

## In short

- **Tested and in play since session 82 (§8):** the hotfix row works, new art in the client's storage works (tools/casc-mod/),
  and at 2560 × 1080 the engine shows a 16:9 screen with bars, never full width. The user's paintings are on nine places.
- Pointing a map at a different screen the client already has is easy: a `LoadingScreens` hotfix row from HermesProxy, about
  40 lines of C# in the proxy plus one CSV file. Nothing on disk changes. That's also the cheapest way to learn how 1.14.2 draws a
  16:9 screen on the user's 2560 × 1080 monitor.
- New artwork is the hard part. The client loads files only from its CASC storage, and nothing on our Mac can write to it.
  The way in is the one CASCHost used: write a new root, encoding and build config, and have our patch-service stand-in report
  that build. Every hash then matches, so the client has nothing to repair. It's untested and a few days' work, but every
  piece is something we've already done once (`scripts/casc_fetch.py` writes this storage format).
- True full-width ultrawide may not be possible. 1.14.2's table has three slots (4:3, "wide" and 16:9) and no 21:9 one.
  Modern clients are reported to draw 16:9 screens with black bars on ultrawide monitors. The first proof settles this
  for our client before any art is made.

- An addon can't draw over the real loading screen (Lua is paused while it shows), but it can show our art just before a
  load it can see coming and keep it up when loading ends, so the art bookends the engine's screen (section 6). With every
  `LoadingScreens` row pointed at one plain dark image, that reads as one continuous screen at the monitor's full width.
- The real change is tested in a safe environment first: a clone of the client, a copy of the proxy and a second patch
  service, run one environment at a time, each step with its evidence and its undo (section 7).

## 1. How 1.14.2 picks and draws a loading screen

**The C++ engine draws it, not Lua.** *verified.* The binary carries
`…/WoW/Source/WowClient/LoadingScreen.cpp` and its messages (`strings` on
`(a file on the server's Mac)`, offsets 0x2a35370-0x2a359b6): "Loading Screen Enable (%d) : %d - %d", "Loading
Screen Enable Custom", "Loading Screen Enable Ship", "GetLoadingScreenForMap failed, No MapRec", "LoadingScreenGetLoadingScreenFileID
file didn't exist in CAS loadingScreensID: %d textureFileID: %d" and "LoadCustomBackgroundTexture: LoadingScreen asset not
available". The client's own interface code has no loading screen frame. `C_LoadingScreen` has no functions, only the
`LOADING_SCREEN_ENABLED` and `LOADING_SCREEN_DISABLED` events (FileDataID 1861170, `loadingscreendocumentation.lua`, in
`(private files)`). The tip line is the C++ side's too (cvar `showLoadingScreenTips`). An addon gets the
two events, but it can't draw anything while the screen is up.

**Map, then LoadingScreens, then a FileDataID.** *verified for the data, inferred for the choice.* `Map.LoadingScreenID` names a
`LoadingScreens` row. In 1.14.2 that row has three FileDataIDs: `NarrowScreenFileDataID`, `WideScreenFileDataID` and
`WideScreen169FileDataID`
(`(private files)`, 40 rows). **All 40 rows fill only the narrow slot.** The two
wide slots are 0, which is why every Classic screen is 4:3. The client also has `MapLoadingScreen` (a box on a map → a
LoadingScreens row, by order). The table and its name are in the binary, but its only 3 rows are for Argus (map 1669). Which
slot is used for which aspect isn't visible in 1.14.2's data. Retail's data shows the pattern: 12.1 has 67 rows with only the 16:9
slot and 176 with only the narrow one. So the engine takes the 16:9 slot when it's filled and falls back to the narrow one. The
client checks that the file exists in CAS before using it (the "didn't exist in CAS" message), so a bad id gives a log line
and, most likely, the fallback or a blank screen.

**Texture sizes by slot.** *verified.* Of the 242 loading screen images we extracted
(`(private files)`), 140 are 1024 × 1024, 56 are 512 × 512 and 44 are
2048 × 1024. Retail's table puts them like this: the narrow slot holds the squares (512² and 1024²), the 16:9 slot holds the
2048 × 1024 ones (41 of them), and the "wide" slot (Cataclysm's 16:10) holds mostly 1024². Every image is a power of two,
and all of them are BLP2 with DXT1 compression (`BLP2`, compression 2, alpha depth 0). Warsong Gulch's 512² has no mipmaps;
the 2048 × 1024 Emerald Nightmare one has them. Checked by fetching both files with `tools/wago.py get` into a scratch folder.

**How the image is mapped.** *inferred.* The art fills each texture edge to edge, with no padding rows. Warsong Gulch's
logo is squeezed sideways in its square, and Legion's logo is flattened in its 2:1 file. So the whole texture (texcoords 0 to 1)
is stretched to the slot's aspect: a square shown at 4:3, and 2048 × 1024 shown at 16:9 (taller by 1.125). Art for the 16:9
slot is made at 16:9 and then resized to 2048 × 1024 without keeping proportions.

**On an ultrawide screen.** *docs plus inferred; to check in the first proof.* The user's monitor is 2560 × 1080
(`_classic_era_/Logs/gx.log`: "Monitor 0 … Size(2560x1080)"). Classic shows its 4:3 screens with black bars at the sides, and
a 2019 Blizzard forum thread says even retail's 16:9 screens are "black-barred on the sides" on ultrawide. On 2560 × 1080 a 16:9
picture would be 1920 wide, with a 320-pixel bar on each side. If the client stretches the 16:9 slot to the full window
instead, we could put ultrawide art in that slot, squeezed into 2048 × 1024. It would look right on the user's monitor and
stretched on a 16:9 one, which doesn't matter for a solo game. The binary can't be patched to change this: static patches to
its packed code were a dead end (docs/server/modern-client-hermesproxy.md).

**When the screen appears, and what's already applied.** *verified.* At login, `Client.log` shows "Initial Hotfixes: Applied"
(08:36:33) before "Loading Screen Enable (1) : 1 - 1" (08:36:42). So hotfix rows sent at realm login are in place before the
first loading screen, and every later teleport comes after them too.

**Today's screens are local** (corrected in session 82; *verified*). Each loading screen has three root entries, one per locale
group (flags 0x40, 0x100 and 0x173f6, the last with enUS). Session 81's check read the first, the zhCN file, and wrongly found
them streamed. The enUS files of all 242 are in local storage. What the client does stream from the CDN mirror
(`cdn.arctium.tools`) is 2,403 files: 1,208 DirectX shaders (1.1 GB, never read on a Mac) and 1,195 small art files (57 MB: baked
NPC textures, some doodads, Undead facial hair). `casc_mod.py streamed` lists them.

## 2. Can an existing FileDataID get new content?

### a. Rewriting the local CASC storage (the CASCHost model)

**What the client reads.** *verified.* `.build.info` names the build and CDN configs. At start the client also asks our
patch-service stand-in which build is current (`scripts/patch_service.py`, :8090, the binary's two URLs patched to it). It
starts its storage from that answer: "FETCHING_CDN_CONFIG / BUILD_CONFIG / PATCH_CONFIG" in the streaming log. The build config
(`(a file on the server's Mac)`) gives the content and encoding keys of `root`, `encoding`, `install`,
`download` and `size`. The root maps FileDataID → content key (MD5 of the file). The encoding maps content key → encoded key
(the key of the BLTE file). The local index journals (`Data/data/*.idx`) map encoded key → place in `data.NNN`. This build's
root is the old block format (counts, FileDataID deltas, then content key plus name hash pairs), not the later `TSFM` one.

**Why we can't just swap bytes.** *inferred.* Every layer is keyed by a hash of the layer below. Replacing a file's bytes
under its old keys breaks the content MD5, the BLTE checksums and the `data.NNN` record header (`checksum_b` in
`casc_fetch.py`). We don't know which of these the client checks on read. If it checks and finds a mismatch, it writes
`CASCRepair.mrk`, and the next start fails with #154 ("EEV_REPAIR_CONTAINER"). We've seen that marker before
(docs/session-log/04-…). So **don't fake hashes: make them true.**

**The honest way.** *inferred, untested.* This is what CASCHost did for 7.x and 8.x clients ("builds and hosts a modified CAS
container", its README says, with "the Versions and CDNs URLs" patched to it):

1. BLTE-encode the new BLP (one `N` or `Z` chunk). Its content key is the MD5 of the BLP, its encoded key the MD5 of the
   BLTE.
2. New root: either the unused FileDataID gets the new content key (replace), or a new FileDataID in our own range is added
   (add). A new id goes in `tools/ids.json`.
3. New encoding: the new content key → encoded key, with an encoding spec, plus the new root's own entry. Pages stay sorted and
   each page's MD5 is recomputed, so in practice the whole file is rewritten. No tool of ours writes one yet. `cascette-rs`
   documents an `EncodingBuilder`.
4. New build config: the new root and encoding keys and sizes, the rest unchanged. Its MD5 is its name. The CDN config is
   unchanged, because the archives don't change.
5. Deliver the new files. Either (i) append them to local storage (a new `data.NNN`, new index-journal versions and the
   cross-link entries the client needs, as `casc_fetch.py` already does), or (ii) serve them from a small local CDN. That CDN
   answers our new loose files and passes everything else to the mirror; `patch_service.py`'s `/cdns` reply names it.
   CASCHost's notes say a CDN must be a domain name, not an IP address (`localhost:<port>` is allowed). Option (i) also works
   offline.
6. `patch_service.py --build-config <new>` and the copy's `.build.info` point at the new build.

Nothing in this chain is signed: the build config carries no signature, and `KeyRing` is empty in both `.build.info` and the
versions reply. *verified for the files, inferred for the client.* One unknown is the client's own check on the root and
encoding. Another is whether a changed build makes it try to "update" (download) something it can't find. A third is CASCHost's
own warning that its method stopped working on 10.x (Dragonflight) clients. 1.14.2 comes from the engine before that, so it
should work, but it's unproven.

**CascLib can't help write.** *verified.* `(a file on the server's Mac)` is read-only: its API (`src/CascLib.h` 394-428) opens,
reads and finds files, with no write call. It's still useful to check our output independently, as on 2026-09-16.

### b. A hook in our injected dylib

*source plus inferred.* The trust shim (`tools/trust-shim/wow_local_trust.c`) uses dyld interposing on `SecTrustEvaluate*`.
The same trick works on any libc call the binary imports, and it imports `open`, `pread`, `read`, `mmap` and `fopen`. A shim
could therefore hand the client other bytes when it reads a given range of `data.NNN`. CDN downloads go through libcurl (built
into the binary: `url_curl.cpp`) and SecureTransport (`SSLRead`, imported), which is much harder to hook cleanly. A hook doesn't
get around the hash problem, though: the bytes it serves must still match their keys. The functions that map a FileDataID to a
key are internal to the packed binary, have no symbols, and can't be hooked. A dylib only adds risk here: a game started from
Finder loses it. The storage rewrite does the same job on disk.

### c. Community tools

- **Arctium / Burralis Game Launcher** (github.com/Arctium/WoW-Launcher): Windows only. Classic Era from 1.14.4 up, and "No
  mod loading" in its own scope list. Its one relevant feature, "custom client version & cdn urls … serving data from your
  own CDN", is what our patch-service stand-in already does. Forum posts say that older private builds loaded custom files
  for Dragonflight and later, also on Windows. *docs.*
- **CASCHost** (github.com/WowDevTools/CASCHost): the model above. It needs .NET Core 2.1, MySQL and Windows-style paths.
  It's old, but readable as a recipe. *docs.*
- **TrinityCore on modern clients**: DB2 changes go out as hotfixes. New files need the CASC route or a launcher. No other
  route is documented. *docs.*
- **"Loose files" or developer flags**: none in 1.14.2 (game-modding-research.md). The crash report's "Locally overridden
  files" list (in `Errors/2026-10-08 …txt`) holds only files in the game folder: Screenshots, Utils and the .app, with
  temporary negative ids. Nothing under Interface or the game data appears there, so it isn't a way in. *verified.*

Nothing we found adds files to a macOS arm64 client except rewriting the storage.

### d. Other ways in

- **A TACT key hotfix.** The proxy already knows `DB2Hash.TactKey` (`HotfixSystem.cs`). Blizzard uses it to unlock encrypted
  files later. It doesn't help here: an encrypted new file still needs root and encoding entries.
- **A fake screen from Forever UI.** Lua isn't running during the load. At most the addon could show art for a second after
  it, which is a different thing.

## 3. A new FileDataID that the client doesn't have

*source plus inferred.* A hotfix can point a LoadingScreens slot at any number. The client then looks the file up in CAS and logs
"didn't exist in CAS" if the root has no such id. So a new id needs everything from 2a: a root entry, an encoding entry and the
BLTE file, all locally or on a CDN the client asks. The file itself should be BLP2, DXT1 or uncompressed BGRA, a power of two in
size (2048 × 1024 for the 16:9 slot), with mipmaps like the retail 16:9 files. Pillow 12.2 on this Mac writes palette BLPs
only (256 colors, too few for art). A small writer of our own is needed. It can wrap Pillow's DXT1 (DDS) output in a BLP2
header, or write raw BGRA (8 MB at 2048 × 1024, fine).

A new id is cleaner than reusing an unused one. The unused file keeps its art, and the new one is ours in our own range. But
it adds one root entry to the replace case, which costs nothing extra.

## 4. HermesProxy: sending LoadingScreens, Map and MapLoadingScreen rows

**How a table is declared.** *source.* Each hotfix table is a loader in `HermesProxy/World/GameData.cs`, added to the list in
`LoadHotfixes` (around line 2310). Each one reads `CSV/Hotfix/<Table>1.csv` (1 = Classic Era's expansion) and gets its own
range of hotfix ids (`HotfixFactionBegin = 3_200_000` is our last). It writes each row's fields into `HotfixContent` in the
client's order. Our Faction loader (line 2664, sessions 69 and 78) is the model. It also teaches the trap: WoWDBDefs' field
sizes can be wrong for a given layout, as with FriendshipRepID. The client confirms each row in `_classic_era_/Logs/Hotfix.log`
(`VALIDATION_RESULT_VALID`). The table hashes are already in `World/Enums/DB2Hash.cs`: `LoadingScreens = 0xEF9DC6FF` (461),
`MapLoadingScreen = 0x78F378E7` (485), `Map = 0xBD84CD62` (480).

**LoadingScreens (the one to do).** The layout for 1.14.2.42597 in WoWDBDefs (`definitions/LoadingScreens.dbd`, layouts
99C0EB78 / A2488A1C / 54D4DACD) is: `$noninline,id$ID<32>`, then `NarrowScreenFileDataID<32>`, `WideScreenFileDataID<32>` and
`WideScreen169FileDataID<32>`. So a row's content is three int32s; the id isn't inline and goes in `RecordId`, as in the
SpellLevels loader. The sketch:

```
// HotfixLoadingScreensBegin = 3_300_000; CSV/Hotfix/LoadingScreens1.csv: ID,NarrowScreenFileDataID,WideScreenFileDataID,WideScreen169FileDataID
record.TableHash = DB2Hash.LoadingScreens; record.RecordId = id;
record.HotfixContent.WriteInt32(narrow); record.HotfixContent.WriteInt32(wide); record.HotfixContent.WriteInt32(wide169);
```

Overriding a map's own row is enough to change that map's screen. Nearly every map has its own row (Warsong Gulch 122, Arathi
Basin 183, Alterac Valley 104), so **no Map hotfix is needed**. The shared rows are 4 (Eastern Kingdoms and the unused Caverns of
Time) and 61 (Onyxia's Lair and the test map). Two pairs of rows also share a file: 186 and 194 (Stockade), and 187 and 196
(Blackfathom Deeps).

**Map (avoid).** Layout C08A6797 for 1.14.2: the id not inline, then six strings (`Directory`, `MapName_lang`, two descriptions,
two PvP texts), `MapType<u8>`, `InstanceType<8>`, `ExpansionID<u8>`, `AreaTableID<u16>`, `LoadingScreenID<16>`,
`TimeOfDayOverride<16>`, `ParentMapID<16>`, `CosmeticParentMapID<16>`, `TimeOffset<u8>`, `MinimapIconScale` (float),
`CorpseMapID<16>`, `MaxPlayers<u8>`, `WindSettingsID<16>`, `ZmpFileDataID<32>` and `Flags<32>[2]`. A whole Map row has to be
resent to change one number, and a wrong byte breaks a table the client uses to load the world. Only worth it if two maps that
share a row need different screens.

**MapLoadingScreen (maybe later).** Its fields for 1.14.2 are `Min[2]`, `Max[2]` (floats), `LoadingScreenID<32>`,
`OrderIndex<32>` and the map as a non-inline relation. It could give Teldrassil its own screen inside Kalimdor. But 1.12
servers send only the map id in `SMSG_TRANSFER_PENDING`: the proxy sends `OldMapPosition = 0`
(`World/Client/PacketHandlers/MovementHandler.cs` 322-360). So it's unclear which position the client would test against.
*inferred.*

**A per-teleport screen: `SMSG_CUSTOM_LOAD_SCREEN`.** *source.* The proxy's opcode table for 1.14.2 (it uses
`V2_5_3_41750`, `World/Enums/Opcodes.cs` 69) has `SMSG_CUSTOM_LOAD_SCREEN = 0x25C7` (`V2_5_3_41750/Opcode.cs` 972). The
binary has "Loading Screen Enable Custom". TrinityCore writes it as two uint32s, `TeleportSpellID` and `LoadingScreenID`
(`SpellPackets.h` 1144, `SpellPackets.cpp` 1142). It sends it before a far teleport by spell (`SpellEffects.cpp` 1031). The
proxy could send it just before translating `SMSG_TRANSFER_PENDING`, so a screen can be chosen per trip: a hearthstone to
Darnassus, a mage portal, a battleground by bracket. It needs a new packet class and a rule, and it's untested. It's a second
step, not the first.

**Caches.** *verified procedure.* After any change to these rows, close the client, then move `Cache/ADB/enUS/DBCache.bin` and
`Cache/WDB` aside together and restart the proxy (docs/server/operations.md, "Changing HermesProxy", F0079). To undo, take the
CSV row out and do the same.

## 5. Risks and how to undo them

- **The hotfix tier:** low. A bad row is ignored or logged as invalid in `Hotfix.log`. The worst case is a blank loading screen.
  To undo, remove the row, restart the proxy and clear the caches. The proxy change follows our usual procedure: a commit on
  `dawn`, the old program kept as `HermesProxy.bak-<date>`, and a line in changes.md.
- **The file tier:** medium, but kept away from the playable install. Work on an APFS clone:
  `cp -cR (a file on the server's Mac) (a file on the server's Mac)` takes no extra disk space until something changes. Run a second
  `patch_service.py` on another port for the clone (the binary's patched URL names port 8090, so the clone either takes
  :8090 while the stock one is stopped, or gets its own binary patch). If the client refuses the build, it leaves
  `CASCRepair.mrk` and fails with #154 in the clone only. The launcher already deletes a stale marker. To undo, point the
  patch service back at `a69c90c78c9f0a6ca7c527d6ba9984b0` and delete the clone. Before writing into the real install, run
  `scripts/backup.sh before-loading-screens` and copy `Data/data/*.idx`, `shmem` and `.build.info` (all small). The new
  `data.NNN` is only appended, never written over.
- **Blizzard's launcher and repair:** not used here. The client's own repair is the risk, and true hashes avoid it.
  Blizzard's art stays out of git as always; our own art can go in the repository.
- **Changing (a file on the server's Mac) needs the user's yes at the start of that session (CLAUDE.md, "Ask for every permission").

## 6. Around the loading screen: what an addon can and can't do

Added after a question from the user (same day): "does this mean I can load my own fake loading screen before the loading
happens, and keep it open in the foreground until the actual loading screen ends?"

- **It can't stay in front during the load.** *verified (section 1).* While the client loads, the engine draws only its own
  loading screen and Lua is paused; Forever UI gets the start (`LOADING_SCREEN_ENABLED`, `PLAYER_LEAVING_WORLD`) and the end
  (`LOADING_SCREEN_DISABLED`, `PLAYER_ENTERING_WORLD`), nothing between. Any frame of ours is hidden for the whole load.
- **It can show our art just before a load it can see coming.** *inferred.* Joining or entering a battleground (Join Battle /
  Enter Battle), a hearthstone's cast ending, a summon accepted, a mage portal: each gives the addon a moment first. Walking
  into an instance portal or taking a boat or zeppelin gives no warning: there the engine's screen comes first.
- **It can be the first thing drawn after the load.** *inferred.* A frame shown before the load is still shown when drawing
  resumes, so the world never flashes; the art fades out when we choose (a second or two, understated: docs/ui-ux-guidelines.md).
- **At full width.** The addon draws at the screen's own size, so on the user's 2560 × 1080 monitor our art really is
  ultrawide, whatever the engine does with its slots.
- **One continuous screen.** *inferred.* Point every `LoadingScreens` row at one plain, dark image (section 4's hotfix): our
  art, a few quiet seconds of dark while the client loads, our art again fading into the world. Only the dark middle is the
  engine's, and bars don't matter on dark. The catch: the hotfix can only choose images the client already has. If none of the
  247 is plain and dark enough, a truly black one needs the file tier (section 2).
- **Unknown until tried:** how long the engine's screen stays up between (each place loads at its own speed), whether the
  hand-off looks smooth, and whether `LOADING_SCREEN_ENABLED` fires early enough to matter for the loads with no warning.

This is a Forever UI feature, not a client change: it needs no file work and no permission for (a file on the server's Mac) only the usual previews
and tests, and it works with art we make (docs/assets/loading-screen-prompts.md).

## 7. The real change, tested in a safe environment

The plan for changing the loading screen for real, so that nothing the user plays with is at risk until a step has worked.
Each step says what it changes, what to capture as evidence and how to undo it. Steps 2 onward change things under (a file on the server's Mac)
the user's yes at the start of that session, as always.

**The environment.** One at a time, never both running (the Mac's memory, and the ports): the play environment as it is
today, or the test environment beside it:

| Piece | Play (unchanged) | Test |
|---|---|---|
| Client | `(a file on the server's Mac)` | `(a file on the server's Mac)`, an APFS clone (`cp -cR`: no extra disk until a file changes) |
| Patch service (:8090) | `scripts/patch_service.py` with the stock build config | the same script with `--build-config <new>` once step 4 makes one |
| Proxy (:1119) | `HermesProxy-MacOS-v4.5.3-autoshot` | a clone of its folder, `HermesProxy-test`, with the test hotfix CSV rows and, later, the test build of the proxy |
| Server, databases | shared (nothing here changes them) | shared |
| Start | `scripts/play-classic.sh` | stop the play proxy and patch service (`scripts/stop-all.sh --keep-db`), start the test patch service by hand, then `GAME_DIR_CLASSIC=(a file on the server's Mac) HERMES_DIR=(a file on the server's Mac) scripts/play-classic.sh` |

The proxy is cloned because hotfix rows reach every client that connects to it: a test row in the play proxy would change the
play client too (and point it at files only the clone has). The launcher already takes both folders as overrides and only
starts a proxy or a patch service when its port is free, so no port or binary change is needed.

**The steps**

0. **Backups and the mirror.** `scripts/backup.sh before-loading-screens` (the databases and configs); a copy of the play client's
   `Cache/`, `WTF/Config.wtf` and `.build.info`. Check which files the client streams from `cdn.arctium.tools` (section 1's
   finding: the 38 used loading screens among them): a list from the streaming log, and whether storing them locally belongs in
   the backups work. *Evidence:* the backup's line in docs/backups.md, the streamed-file list. *Undo:* nothing to undo.
1. **The test environment.** Clone the client and the proxy folder; start the test environment unchanged; log in and see the
   world as in play. *Evidence:* a screenshot, `hermes.out` and `Client.log` clean. *Undo:* delete the two clones.
2. **The proxy loader, in the test proxy only.** The `LoadingScreens` loader (section 4) as a commit on a branch of dawn-hermesproxy,
   built apart (`build-loadingscreens`), installed only into `HermesProxy-test`; the two proof rows (`122,131883,0,1394867` and
   `183,131820,343001,0`) in its CSV. Clear the clone's `Cache/ADB/enUS/DBCache.bin` and `Cache/WDB` together. *Evidence:*
   `Hotfix.log` lists both rows; the proxy's tests pass. *Undo:* remove the rows, or the test proxy.
3. **The aspect proof.** Enter Warsong Gulch and Arathi Basin in the test client (the queue, or `.go`); a screenshot of each
   loading screen at 2560 × 1080. *Evidence:* which slot shows (4:3, 16:10, 16:9), and whether 16:9 fills the width or has bars.
   This decides the size and shape of every picture we make. *Undo:* none needed.
4. **The file proof.** In the clone only: a test BLP2 (2048 × 1024, a flat color with “TEST”; our own small writer), a new
   FileDataID from our range (`tools/ids.json`), the new root, encoding and build config, the file appended to the clone's
   storage, checked with CascLib; the test patch service started with the new build config; the Warsong Gulch row's 16:9 slot
   pointed at the new id. *Evidence:* the test card on Warsong Gulch's loading screen, no `CASCRepair.mrk`, no #154, the
   client's log clean; and the play client, started afterwards, exactly as before. *Undo:* the stock build config, delete the
   clone.
5. **The bookends in Forever UI** (section 6), in the test environment first: one of the user's pictures before and after a
   battleground's load, with a dark image in the engine's slot if one of the 247 serves. *Evidence:* a short screen recording of
   the hand-off. *Undo:* the feature's switch.
6. **Into play,** only after the user has seen 3 to 5: the proxy loader through §4 of the foundation plan (the old proxy kept,
   a tag, changes.md); the file tier as a tool (`tools/casc-mod/`) applied to the play client after a backup, the old build
   config and `.idx` files kept; or only the bookends, if the file tier stays closed.

**What would stop it:** at step 3, if the client ignores the hotfix row (then the custom loading-screen packet, section 4, is
the next try); at step 4, if the client refuses the rewritten storage (#154, or a silent repair): then the file tier is closed
on this client, and the bookends with the client's own art in the middle are as far as it goes.

## 8. The test, session 82 (2026-10-11): what happened

Section 7 carried out, steps 0 to 4 and 6; the evidence (screenshots) in `(private files)`.

- **Step 0:** backups (`backup-20261011-1055-before-loading-screens`, the client's index, shmem, `.build.info` and caches beside
  it); the streamed files (§1, corrected).
- **Step 1:** the clones (`(a file on the server's Mac)`, `HermesProxy-test`; no extra disk), the test client logged in as in play.
  Only the proxy and the patch service need stopping: the server is shared.
- **Step 2:** the proxy's loader (§4's sketch, as written); the client logged both rows `VALIDATION_RESULT_VALID`.
- **Step 3, the aspect:** a 4:3 screen at 2560 × 1080 is 1,440 wide with 560-pixel bars; Warsong Gulch with Emerald Nightmare's
  2048 × 1024 file in the 16:9 slot showed it **1,920 wide, with 320-pixel bars**; Arathi Basin with a file only in the 16:10 slot
  showed its own 4:3 art. So the engine takes the 16:9 slot when filled, else the narrow one, never 16:10, and fits the height.
- **Step 4, the file proof:** `tools/casc-mod/casc_mod.py` (new) wrote ten files (a test card and nine of the user's paintings)
  into the clone with a new root, encoding, index versions and build config; its writers reproduce Blizzard's encoding, root and
  index files byte for byte. The client started with no repair and no #154, and showed the test card on Kalimdor's screen: the
  circle 503 × 503 on screen, every edge mark visible (the whole texture stretched to 16:9, nothing cropped), then the user's
  Warsong Gulch painting. The client takes its build from `.build.info`; the patch service is never asked for versions.
- **Step 6, into play** (the user's choice, the same day): the proxy `dawn-2026-10-11` with nine rows, the paintings in the
  play client's storage (build `faf8549f…`); docs/server/changes.md, “Our own loading screens”.
- **Side finding F0088:** the 1-player battleground mode (`.debug bg`) let a match end early, and the bots' queue check then
  crashed mangosd on the player's stale battleground (two missing null checks in upstream playerbots).
- **The capitals (the same day, the user: “there isn't a loading screen for Darnassus”):** a city is part of its continent's
  map, so it had none. 1.14.2's `MapLoadingScreen` (a box on a map with its own screen row; its only rows Argus's) works from the
  proxy: a `MapLoadingScreen` loader (the map, a non-inline relation, written last), a box around Darnassus and a new
  `LoadingScreens` row 9001 (hotfixes can add rows: both logged `VALIDATION_RESULT_VALID`). As sent at first, **the box was
  ignored** (`.tele darnassus` and Teleport: Darnassus showed Kalimdor's own art: evidence/5, 6; an early “yup” was wrongly logged
  as a success): the client enables the loading screen on `SMSG_TRANSFER_PENDING` (“Loading Screen Enable (1) : 1 - 1”, the map),
  0.4 s before the new world's position arrives. **The fix:** the proxy holds an ordinary trip's `SMSG_TRANSFER_PENDING` until
  `SMSG_NEW_WORLD` (a 1.12 server sends it right after) and puts the destination in its position (`OldMapPosition`): then both
  `.tele darnassus` and Teleport: Darnassus showed the box's test card at 16:9 (evidence/7, 8). The per-spell route
  (`SMSG_CUSTOM_LOAD_SCREEN`) lost to the box when both were sent, and is dropped. The boxes come from the client's own city maps
  (UiMapAssignment); every mage teleport, portal and capital inn lands inside its box (tools/casc-mod/places.json). The change:
  dawn-hermesproxy's branch `cityscreens` (de3c966 the loader, 7f67652 the destination), into play with the first city painting:
  Darnassus, session 83 (on `dawn` as be4cfaf and cea3ad5, tag `dawn-2026-10-11e`; docs/server/changes.md).
- **Not done:** step 5, the bookends. The user's idea (session 82): a 16:9 painting scaled to fill 2560 wide (its parchment
  bands mostly cropped), shown by Forever UI before and after the load; the engine's slot then holds the middle 16:9 cut of
  that same framing, so during the load only the outer 320 pixels each side go black. Retail fills an ultrawide screen by
  composing it (a skin of parchment wings, the main image, the logo: `LoadingScreenSkinID`, `MainImageFileDataID`,
  `LogoFileDataID`); 1.14.2's binary has no `LoadingScreenSkin` table or those fields (*verified*, its strings), so that layout
  too is the bookends' to draw.

## Recommended route

1. **Hotfix LoadingScreens rows (low effort, low risk).** It tests the aspect question with art the client already has, and
   it's needed by every later step anyway.
2. **Rewrite root, encoding and build config, with the files appended to local storage (high effort, medium risk, in a
   clone).** This is the only route to new art on this Mac. It also opens the file tier for skins, and it's the
   experiment game-modding-research.md proposed. Making it a tool (`tools/casc-mod/`, written alongside `casc_fetch.py`) makes
   every later screen one command.
3. **Optional: `SMSG_CUSTOM_LOAD_SCREEN` from the proxy (medium effort, low risk)** for per-destination screens.
4. **The bookends in Forever UI (section 6),** at any time: no client change, full width, our own art; with a dark image in
   the engine's slot they read as one screen.
5. Not recommended: hooks in the dylib, Map rows, or byte swaps that leave the old hashes in place.

The order to try them in, with the safe environment: section 7.

### The first small proof (an evening, no art and no change to the client's files)

1. Add the LoadingScreens loader to the proxy (the sketch above), its test, and `CSV/Hotfix/LoadingScreens1.csv` with two rows:
   `122,131883,0,1394867` (Warsong Gulch keeps its 4:3 art and gains Emerald Nightmare's 16:9 one, FileDataID 1394867,
   2048 × 1024, already in the client's root, streamed) and `183,131820,343001,0` (Arathi Basin with a 1024² file in the
   16:10 slot).
2. Build, install with the old proxy kept, clear the caches, log in, and check `Hotfix.log` for the two rows.
3. Enter each battleground (`.go` or the battleground queue) and take a screenshot of each loading screen. This settles which
   slot the client uses at 2560 × 1080, and whether the 16:9 one gets bars or fills the width.
4. Undo or keep, depending on what the user likes.

What the result means: with bars, a "custom ultrawide" screen is really custom 16:9 art. We can design the bars as part of
the look, or draw the picture so they don't matter. Full width means ultrawide art squeezed into 2048 × 1024 shows edge to
edge.

### Then the file proof (in the clone)

Make a test BLP (a flat color with "TEST" on it, 2048 × 1024). Give it a new FileDataID from our range and write the new
root, encoding and build config. Append the file to the clone's storage, check the storage with CascLib, and point the
clone's patch service at the new build. Set the Warsong Gulch row's 16:9 slot to the new FileDataID, start the clone and
enter Warsong Gulch. If the test card shows, the file tier is open (loading screens, skins). If the client fails with #154
or repairs silently, the file tier is closed, and only the client's own art can be shown.

Sources: the client files and logs cited; `(a file on the server's Mac)` (our `dawn` branch, eaba022); WoWDBDefs
(github.com/wowdev/WoWDBDefs, `LoadingScreens.dbd`, `Map.dbd`, `MapLoadingScreen.dbd`); TrinityCore master
(`SpellPackets.h`, `SpellPackets.cpp`, `SpellEffects.cpp`); github.com/WowDevTools/CASCHost; github.com/Arctium/WoW-Launcher;
cascette-rs.readthedocs.io; us.forums.blizzard.com/en/wow/t/widescreen-support-for-loading-screens/209927 (2019); wowdev.wiki
(CASC, TACT, BLTE).
