# Videos in the game: the intro, the Cinematics button, a raid's last boss

Research of 2026-10-11, session 82 (read-only: nothing in the client, the proxy or the server changed). The user: “Can you check
now if it's possible to play videos in certain moments? Like when you open WoW for the first time, a video plays. There's also a
cinematics button. Can I add videos to that? Can I add videos after you kill the final boss in a raid?”

**In short:** yes to all three, in two ways. In game, any moment (a raid's last boss falling) can play a video of ours: new movie
rows from the proxy, our files in the client's storage, Forever UI starting it. On the login screens (the first-launch intro, the
Cinematics button) only the two movies the client already has can play, so our videos go in by replacing those files' content.

## 1. How 1.14.2 plays a movie

*verified* (the client's own interface code, `(private files)`, and its tables from wago.tools).

- **Two players:** the login screens' `MovieFrame` (GlueXML, `movieframe.lua` 804913) and the game's (FrameXML `movieframe.lua`
  804682). In game, the frame plays a movie by id on the `PLAY_MOVIE` event, through `MovieFrame_PlayMovie(self, movieID)` →
  `self:StartMovie(movieID)`: full screen, the world and UIParent hidden, Escape/Space/Enter shows a close dialog, subtitles by the
  `movieSubtitle` setting; `GameMovieFinished()` at the end.
- **Movie ids → files:** `Movie` (the id, Volume, KeyID, AudioFileDataID, SubtitleFileDataID), `MovieVariation` (MovieID → a video's
  FileDataID per resolution, OverlayFileDataID) and `MovieFileData` (FileDataID → Resolution). 1.14.2 has two movies: **1** the
  Blizzard logo (`interface/cinematics/logo_1024.avi`, 27 s, with `logo.mp3`) and **2** the World of Warcraft intro
  (`wow_intro_1280.avi` and `_640.avi`, 172 s, `wow_intro.mp3`, subtitles `wow_intro.sbt`). All are in local storage.
- **The first-launch intro:** `GlueParent_CheckCinematic()` plays `MOVIE_LIST[1]` (movies 1 then 2) when the setting
  `playIntroMovie` is at or below the expansion level (0), then sets it to 1. Setting it back to 0 replays the intro at the next
  start.
- **The Cinematics button:** `GlueParent_ShowCinematicsScreen()` counts the expansion level + 1 movies; Classic has one, so the
  button plays `MOVIE_LIST[1]` directly, with no menu. `MOVIE_LIST = { {1, 2} }` is in the login screen's `constants.lua`
  (4216462).
- **The format:** VP9 video in an AVI container (tag `VP90`), 4:2:0, 24 fps, 1280 × 582 (letterboxed, 2.2:1) and a 640 one; the
  sound a separate MP3 (44.1 kHz, stereo, 128 kbps); subtitles a text file of `HH:MM:SS:FF - HH:MM:SS:FF` lines and their text.
  About 2.7 Mbit/s: two minutes are about 40 MB. ffmpeg on this Mac (Homebrew) writes all three.

## 2. A video in game (a raid's last boss, or any moment)

*source plus inferred; untested.*

1. **The files:** the video (VP9 in AVI), its MP3 and its subtitles added to the client's storage under new FileDataIDs from our
   range (`tools/casc-mod/files.json`), as the loading screens were (`casc_mod.py add`).
2. **The rows:** new `Movie`, `MovieVariation` and `MovieFileData` rows (ids from our 9001–9099) sent by the proxy as hotfixes, three
   loaders like `LoadingScreens` (layouts for 1.14.2 in WoWDBDefs: each id not inline; `Movie`: Volume<u8>, KeyID<u8>,
   AudioFileDataID<u32>, SubtitleFileDataID<u32>; `MovieVariation`: FileDataID<u32>, OverlayFileDataID<u32>, then MovieID as a
   relation, last; `MovieFileData`: Resolution<u16>). Hotfixes can add rows (the loading screen test's rows 9001 and 9002).
3. **The moment:** Forever UI watches the combat log; when the last boss dies (its creature id is in its GUID: Ragnaros 11502,
   Onyxia 10184, Nefarian 11583, Hakkar 14834, Ossirian 15339, C'Thun 15727, Kel'Thuzad 15990) it calls
   `MovieFrame_PlayMovie(MovieFrame, <id>)`, once per kill. No server change. The same works for any moment the addon can see (a
   level, a first visit, a quest chain's end). Alternatively Eluna (server/lua) can tell the addon, or the proxy can send the
   modern `SMSG_TRIGGER_MOVIE`.

**The first check costs nothing:** in the play client, `/run MovieFrame_PlayMovie(MovieFrame, 2)` should play the WoW intro in game.
If it does, in-game playback works under our setup (and an addon may start a movie: no protected-call error).

## 3. The intro and the Cinematics button

*inferred; untested.* The login screens run before the realm connection, so the proxy's hotfixes aren't there yet: only movies 1
and 2 exist. Our video therefore goes in **by replacing the content of their files**:

- Movie 1 (the Blizzard logo, played first) becomes our own opening (a Dawn intro), movie 2 stays the WoW intro, or both are ours.
  The first launch and the Cinematics button then play it; `playIntroMovie` set to 0 replays it once.
- That needs a **replace mode** in `tools/casc-mod/` (today it only adds ids): the root's entry for an existing FileDataID gets the
  new content key, the encoding and storage as for an add. The same mode would let the Dawn logo replace the login screen's logo
  (open-items).
- **Several videos in the Cinematics menu** would also need new movie ids at the login screen: a rewritten `Movie.db2` and
  `MovieVariation.db2` in storage and the login screen's Lua (`constants.lua`'s `MOVIE_LIST`, `GlueParent_ShowCinematicsScreen`)
  replaced. Possible with the same replace mode, more work; not the first step.

## The plan (the user, the same day)

“I would want to add an intro video to the raids in the adventure journal for the raids page.” Each raid's page in Forever UI's
Adventure Journal gets a play button that starts the raid's own intro (§2's route: our files in storage, the movie rows from the
proxy, `MovieFrame_PlayMovie` from the page). The page is designed in the web preview first; the videos are the user's.

## 4. The order to try it in (the clone first, as for the loading screens)

1. `/run MovieFrame_PlayMovie(MovieFrame, 2)` in game.
2. A test video (ffmpeg's test pattern and a tone, ten seconds, VP9 in AVI, an MP3, one subtitle line) as movie 9001 in the clone,
   with the three proxy loaders in the test proxy; played by `/run`.
3. Forever UI's trigger on a raid boss's death, in the test client (a GM kill).
4. The replace mode, then movie 1 replaced in the clone: the Cinematics button plays ours.

Sources: the 1.14.2 client's interface code (`movieframe.lua`, `glueparent.lua`, the vanilla `constants.lua`); its `Movie`,
`MovieVariation` and `MovieFileData` tables (wago.tools); the movie files read from local storage with CascLib and `ffprobe`;
WoWDBDefs (`Movie.dbd`, `MovieVariation.dbd`, `MovieFileData.dbd`).
