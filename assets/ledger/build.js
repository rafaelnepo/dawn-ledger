// Which build this is: "local" (this Mac: the game's art, the Companion, the previews) or "public" (GitHub Pages: names, numbers and
// our words only). dbsite/build/publish.py writes "public" here in the published copy; nothing else changes between the two.
export const BUILD = "public";
export const LOCAL = BUILD === "local";
