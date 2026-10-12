# Character select in Forever's look: how to get our code onto the 1.14.2 glue screens

Research of session 40 (2026-09-30), kickoff 27 step 1. Nothing in the client was changed. The layout spec is
[forever-character-select.md](forever-character-select.md).

## What the 1.14.2 client does

- The glue screens load from CASC only, like the in-game Blizzard code: `Interface\GlueXML\GlueXML_Vanilla.toc`
  (FileDataID 4212736), which loads `..\..\Interface_Vanilla\GlueXML\CharacterSelect.xml` (4216135) and
  `CharacterSelect.lua` (4216222, 130 KB, `MAX_CHARACTERS_DISPLAYED = 10`, rows 57 high). Extracted by FileDataID in
  `(private files)`. The glue code can `LoadAddOn` (it loads Blizzard_DebugTools at the glue
  screen), and nothing in CharacterSelect.lua checks `issecure`.
- **The launch arguments.** The binary's help text lists `-gluescript` / `-gluescriptFile` ("File containing Lua code
  run at the glue screens") and `-gamescript` / `-gamescriptFile`. But the argument names the client really parses are
  stored as separate strings next to each other (`console`, `nosound`, `windowed`, `launcherlogin`, `casrefresh`,
  `datadir`, `cascdir`, `config`...) and `gluescript` is not among them: it appears only inside the help text. Likely
  compiled out of the release build. **Tested 2026-09-30: dead.** The client stops with "CommandLine Parse Error:
  gluescriptFile(0): Invalid argument: gluescriptFile", then shows the help text.
- **Loose files.** The storage layer has a loose-file mode ("CAS is in loose file only mode", "[Loose file]"): an
  engine mode for the whole storage, with no argument or CVar for it found. A 16-byte-prefix table next to
  `Interface\AddOns\` lists `WTF/SavedVariabl`, `Interface/GlueXM`, `Interface/FrameX`, `Interface/Shared`,
  `Interface/AddOns`: paths the engine treats specially. Whether it allows or blocks loose GlueXML needs a
  disassembly or a test. Note 1.14.2 takes CharacterSelect from `Interface_Vanilla\GlueXML`, which the table doesn't cover.
- wow-patcher has no group for custom or loose files (its groups: rsa, ed25519, portal, version, cdns, cert-bundle,
  cert-bundle-url, crypto-rsa, signature-rsa).

## The routes

| Route | What | Cost | Risk / undo |
|---|---|---|---|
| (e) `-gluescriptFile` | our Lua file passed at launch by play-classic.sh | smallest: no patch at all | none. **Dead: "Invalid argument" (tested)** |
| (a) loose glue files | changed files in `_classic_era_/Interface*/GlueXML/` | small | none. **Dead: ignored (tested)** |
| (c) local CASC overlay | our changed CharacterSelect.lua/.xml (or one added glue file) written into our own storage: new BLTE blob, encoding and root entries, a new build config; `.build.info` and patch_service.py point at it | a CASC writer on top of scripts/casc_fetch.py (we built this storage, so every piece is ours) | switch `.build.info` / the patch service back to build config a69c90c7...; the original files stay. Almost certainly works: CASC files carry content hashes, not signatures |
| (b) binary patch | flip the engine to accept loose glue files | disassembly, unknown size | the original binary kept in patch-work |
| (d) not possible | — | — | only if (c) fails |

**Tested 2026-09-30:** a copy of 1.14.2's own CharacterSelect.lua with the probe appended, at
`_classic_era_/Interface_Vanilla/GlueXML/`, client started 8 minutes after the file: the character select showed no probe
line. The folder was removed at once. **What's left is (c), the CASC overlay** (then (b)); parked while the character
matrix runs.

**Order (as planned):** test (e) and (a) first (minutes, nothing to undo but an argument or a folder), then (c). (b) only if (c) fails.

## Savepoint

`(a file on the server's Mac)` (asked by the user before any test): the whole 1.14.2 install
as an APFS clone (`cp -cRp`: 3 seconds, no extra space until files change), without the test folder, plus dumps of
`classiccharacters` and `classicrealmd`. `zsh RESTORE.command client` puts the install back (the replaced one kept
beside it), `zsh RESTORE.command db` the databases. Take a new savepoint the same way before the CASC overlay.

## The probe

`tools/glue/probe.lua` draws a gold line and a piece of ForeverUI's art at the top of the glue screen.
`scripts/play-classic.sh --services-only` prints the launch command; add `-gluescriptFile "<path to probe.lua>"` to it
(also try `-gluescript "..."` with the file's text). A gold line = route (e) works; the art under it = glue code reads
loose files from Interface\AddOns.

## The 3D background (the user, 2026-09-30, with the shots in `_Inbox/Login Screen`)

Forever's scene behind the character is a `MapScene` (Forever's characterselect.xml, retail 11.0's warband scenes): the
engine renders a real map area. 1.14.2 has no MapScene, only `ModelFFX` with an M2 per race/background, so Forever's
scene can't run as it is. Options, once any route works:
1. **A 1.14.2 scene M2** (its own glue models, e.g. the night elf moonwell): real 3D, animated, nearest look, no new
   files. The character model stays 1.14.2's.
2. **Forever's scene as a still or a loop behind 1.14.2's model:** a clean capture from Forever (its eye button hides
   the UI; the character would have to be out of frame) as a texture: Forever's exact look, but flat.
3. **Forever's M2 glue models** (the ones in its storage, e.g. `Interface/GLUES/Models/*`) through route (c), with their
   textures added too: possible for single models, not for a map scene.
