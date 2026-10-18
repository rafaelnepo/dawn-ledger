import { LOCAL } from "../build.js";
import { esc, ROOT } from "../core.js";

// ---------- a creature in 3D (session 100, the Archive's kit; the plan's D1) ----------
// The Dressing Room's viewer (dbsite/build/paperdoll_viewer.js, three.js) and its models, read through the data folder's paperdoll link on this
// Mac to the Dressing Room's folder (Blizzard's files: never copied, never published; the address is put together here, as icon.js does).
// One canvas for the page. A stage first shows a picture of the creature, drawn once as it scrolls into view, one at a time, and kept
// in the browser's cache (a second visit draws nothing); its 3D button moves the canvas in to turn and zoom it. The viewer and three.js
// load on the first picture the cache lacks or the first 3D click, never on a page without a stage; every route tears it all down.
//
//   stage(creatureId, { size: "card" | "page", label })   the markup (nothing in the public copy)
//   dress(itemIds, { race, sex, key, label })           a character wearing those items (a set on a race)
//   wire3d(root)        watches root for stages (main.js, once): their pictures, their 3D buttons
//   voices(creatureId)  the buttons for the sounds it makes (filled once its sounds are read; nothing for a silent one)
//   teardown()          the viewer disposed, its WebGL context and caches given back (main.js, on every route)
const DIR = new URL(ROOT + ["data", "paper" + "doll"].join("/") + "/", document.baseURI).href;   // whole: import() takes no bare path
const VER = "v1";   // the pictures' cache: a new word redraws them all
const CACHE = "archive-3d";

export const stage = (id, o = {}) => (LOCAL && id ? `<div class="m3d ${o.size || "card"}" data-cre="${id}">` +
  `<span class="m3dmsg" aria-hidden="true"></span>` +
  `<button type="button" class="b3d" aria-pressed="false" aria-label="Turn ${esc(o.label || "it")} in 3D" hidden>3D</button></div>` : "");

// a set worn: dress(items, { race: "nightelf", sex: "female", key, label }) -> a stage with a character in those items
export const dress = (items, o = {}) => (LOCAL && items.length ? `<div class="m3d ${o.size || "set"}" data-dress="${items.join(",")}" data-race="${esc(o.race || "human")}" ` +
  `data-sex="${o.sex === "female" ? "female" : "male"}" data-key="${esc(o.key || items.join("-"))}">` +
  `<span class="m3dmsg" aria-hidden="true"></span><button type="button" class="b3d" aria-pressed="false" aria-label="Turn ${esc(o.label || "it")} in 3D" hidden>3D</button></div>` : "");
export const voices = (id) => (LOCAL && id ? `<div class="m3dsnd" data-cre="${id}" role="group" aria-label="Its sounds"></div>` : "");

let VM = null, V = null, cv = null, holder = null, C = null, R = null, CBY = null, SND = null, G = null;
let io = null, mo = null, queue = [], busy = false, live = null, gen = 0;
const urls = new Set();
let lock = Promise.resolve();
const exclusive = (f) => (lock = lock.then(f, f));   // one viewer: a picture or the live view at a time

async function data() {
  if (!C) {
    C = await fetch(DIR + "creatures.json").then((r) => r.json());
    CBY = new Map(C.creatures.map((c) => [c.id, c]));
  }
  return C;
}
async function viewer() {
  if (V) return V;
  if (!VM) { VM = await import(DIR + "viewer.js"); VM.setBase(DIR); }
  holder = document.createElement("div");
  holder.className = "m3dhold";   // off the page: the pictures are drawn here
  cv = document.createElement("canvas");
  holder.appendChild(cv); document.body.appendChild(holder);
  V = new VM.Viewer(cv);
  V.still = true;   // no frames of its own until a 3D view is live
  return V;
}
// one creature (its first display) into the viewer: a creature model, or a humanoid on a character model with its baked body
async function show(c) {
  const did = c.d.find((d) => C.disp[d]), d = C.disp[did];
  if (!d) throw new Error("no model");
  V.equipped = {};
  for (const [slot, ld, cc, sc] of (c.eq && C.equip[c.eq]) || []) if (C.looks[ld]) V.equipped[slot] = { look: C.looks[ld], c: cc, sc };
  const alpha = d.a !== undefined ? d.a / 255 : undefined;
  if (d.x) {
    if (!R) R = await fetch(DIR + "races.json").then((r) => r.json());
    V.sections = R.sections;
    const x = C.ext[d.x], r = R.races.find((q) => q.key === x.r);
    for (const [slot, ld] of Object.entries(x.it)) if (C.looks[ld]) V.equipped[slot] = { look: C.looks[ld], c: 4, sc: 0 };
    await V.setCharacter(r, { skin: x.c[0], face: x.c[1], hair: x.c[2], hairColor: x.c[3], facial: x.c[4] }, { baked: x.b, npc: true, alpha });
  } else {
    const m = C.models[d.m]; if (!m) throw new Error("no model");
    await V.setCreature({ model: `files/${m.f}.m2`, tex: d.t, alpha });
  }
  if (!V.meshes || !V.meshes.length) throw new Error("no meshes");
}
// a character in a set's items (the Dressing Room's gear.json: each item's look, its slot by inventory type)
async function showDress(el) {
  if (!G) G = await fetch(DIR + "gear.json").then((r) => r.json());
  if (!R) R = await fetch(DIR + "races.json").then((r) => r.json());
  V.sections = R.sections;
  const race = R.races.find((q) => q.key === `${el.dataset.race}-${el.dataset.sex}`) || R.races[0];
  V.equipped = {};
  for (const id of el.dataset.dress.split(",")) {
    const it = G.items[id], look = it && it.d && G.looks[it.d], slot = it && VM.SLOT_OF[it.inv];
    if (look && slot) V.equipped[slot] = { look, c: it.c, sc: it.sc };
  }
  await V.setCharacter(race, {}, {});
  if (!V.meshes || !V.meshes.length) throw new Error("no meshes");
}
const subject = (el) => (el.dataset.dress ? () => showDress(el) : () => show(CBY.get(+el.dataset.cre)));
const timeout = (p, ms) => Promise.race([p, new Promise((_, no) => setTimeout(() => no(new Error("timed out")), ms))]);
function covered() {   // how much of the picture the model fills (the background is clear): 0..1 on a 64 x 48 copy
  const c = document.createElement("canvas"); c.width = 64; c.height = 48;
  const g = c.getContext("2d"); g.drawImage(cv, 0, 0, 64, 48);
  const px = g.getImageData(0, 0, 64, 48).data; let n = 0;
  for (let i = 3; i < px.length; i += 4) if (px[i] > 24) n++;
  return n / (64 * 48);
}
const key = (el) => new Request(`${location.origin}/_3d/${VER}/${el.classList.contains("page") ? "p" : "c"}${el.dataset.key || el.dataset.cre}`);
async function cached(el) {
  try { const c = await caches.open(CACHE), r = await c.match(key(el)); return r ? await r.blob() : null; } catch (e) { return null; }
}
function put(el, blob) {
  const u = URL.createObjectURL(blob); urls.add(u);
  const old = el.querySelector("img.shot"); if (old) old.remove();
  el.insertAdjacentHTML("afterbegin", `<img class="shot" src="${u}" alt="">`);
  el.classList.add("drawn"); el.querySelector(".b3d").hidden = false; el.querySelector(".m3dmsg").textContent = "";
}
function fail(el, why) { el.classList.add("none"); el.querySelector(".m3dmsg").textContent = why; }

// ---------- the pictures: one at a time, as they come into view ----------
async function picture(el) {
  const blob = await cached(el);
  if (blob) return put(el, blob);
  const my = gen;
  if (!el.dataset.dress) {
    await data();
    const c = CBY.get(+el.dataset.cre);
    if (!c || !c.d.some((d) => C.disp[d])) return fail(el, "No model");
  }
  try { await viewer(); } catch (e) { console.warn("3D viewer", e.message); return fail(el, "The viewer didn’t load"); }
  if (my !== gen) return;
  await exclusive(async () => {
    if (my !== gen || !el.isConnected) return;
    try {
      V.release();
      await timeout(subject(el)(), 15000);
      const r = el.getBoundingClientRect();
      holder.style.width = Math.round(r.width || 220) + "px"; holder.style.height = Math.round(r.height || 160) + "px";
      V._resize();
      let f = 0;
      for (const [zoom, yaw] of [[1, 0.5], [0.85, 0.5], [0.7, 0]]) {   // refit when the picture comes out empty
        V.yaw = yaw; V.zoom = zoom; V.panY = 0; V._place(); V._frame();
        if ((f = covered()) > 0.02) break;
      }
      if (f <= 0.02) throw new Error("empty picture");
      const b = await new Promise((ok) => cv.toBlob(ok, "image/webp", 0.85));
      try { const ch = await caches.open(CACHE); await ch.put(key(el), new Response(b, { headers: { "Content-Type": "image/webp" } })); } catch (e) { /* no cache: drawn again next time */ }
      if (my === gen && el.isConnected) put(el, b);
    } catch (e) { console.warn("3D", el.dataset.cre, e.message); fail(el, "The model didn’t draw"); }
    finally { if (!live && V) V.release(); }
  });
}
async function drain() {
  if (busy) return; busy = true;
  while (queue.length) { const el = queue.shift(); if (el.isConnected) await picture(el).catch((e) => console.warn("3D", e.message)); }
  busy = false;
}
function watch(el) {
  if (el.dataset.w3d) return; el.dataset.w3d = "1";
  io.observe(el);
}

// ---------- the live view: the canvas moved into one stage ----------
async function goLive(el) {
  if (live === el) return stopLive();
  if (live) stopLive();
  live = el;
  const b = el.querySelector(".b3d"); b.setAttribute("aria-pressed", "true"); b.textContent = "Close 3D";
  el.classList.add("live");
  if (!el.dataset.dress) await data();
  await viewer();
  await exclusive(async () => {
    if (live !== el) return;
    V.release();
    try { await timeout(subject(el)(), 15000); } catch (e) { fail(el, "The model didn’t draw"); return stopLive(); }
    if (live !== el) return;
    el.prepend(cv); V._resize();
    V.yaw = 0.5; V.zoom = 1; V.panY = 0; V._place();
    V.still = false;
    if (!el.querySelector(".hint")) el.insertAdjacentHTML("beforeend", `<span class="hint">Drag to turn · Wheel to zoom</span>`);
  });
}
function stopLive() {
  const el = live; live = null;
  if (V) { V.still = true; holder.appendChild(cv); V._resize(); V.release(); }
  if (!el) return;
  el.classList.remove("live");
  const b = el.querySelector(".b3d"); if (b) { b.setAttribute("aria-pressed", "false"); b.textContent = "3D"; }
  const h = el.querySelector(".hint"); if (h) h.remove();
}

// ---------- its sounds (dbsite/build/creature_sounds.py: the client's sound sets and voices, one file of a kit at random) ----------
const KINDS = [["aggro", "Aggro", "Battle roar"], ["attack", "Attack", "Attack"], ["wound", "Wound", "Wounded"], ["death", "Death", "Death"],
  ["idle", "Idle", null], ["greet", "Greeting", "Talk"], ["bye", "Farewell", "Talk"]];
let audio = null;
async function fillVoices(el) {
  await data();
  if (!SND) SND = await fetch(DIR + "sounds.json").then((r) => r.json());
  const c = CBY.get(+el.dataset.cre), did = c && c.d.find((d) => SND.disp[d]);
  const [sid, vid] = (did && SND.disp[did]) || [0, 0];
  const have = Object.assign({}, SND.sets[sid] || {}, SND.voices[vid] || {});
  const ks = KINDS.filter(([k]) => have[k]);
  if (!ks.length) { el.remove(); return; }
  el.innerHTML = ks.map(([k, t]) => `<button type="button" data-snd="${k}"><span class="spk" aria-hidden="true"></span>${t}</button>`).join("");
  el.addEventListener("click", (e) => {
    const b = e.target.closest("[data-snd]"); if (!b) return;
    const fs = have[b.dataset.snd], f = fs[Math.floor(Math.random() * fs.length)];
    if (audio) audio.pause();
    audio = new Audio(`${DIR}sounds/${f}.${SND.ext[f] || "ogg"}`); audio.volume = 0.7;
    el.querySelectorAll("[data-snd]").forEach((x) => x.classList.toggle("on", x === b));
    audio.addEventListener("ended", () => b.classList.remove("on"));
    audio.play().catch(() => b.classList.remove("on"));
    // the 3D view open on the same creature: it acts the sound out (a death held, the rest back to standing)
    const pose = KINDS.find(([k]) => k === b.dataset.snd)[2], st = live && live.dataset.cre === el.dataset.cre;
    if (st && V && V.M) {
      const has = V.poses();
      if (pose && has.includes(pose)) { V.setPose(pose); clearTimeout(fillVoices.t); if (pose !== "Death") fillVoices.t = setTimeout(() => V && V.M && V.setPose("Stand"), 1600); }
      else V.setPose("Stand");
    }
  });
}

export function wire3d(root) {
  if (!LOCAL || mo) return;
  io = new IntersectionObserver((es) => {
    for (const e of es) if (e.isIntersecting) { io.unobserve(e.target); queue.push(e.target); }
    drain();
  }, { rootMargin: "300px" });
  const scan = () => {
    root.querySelectorAll(".m3d:not([data-w3d])").forEach(watch);
    root.querySelectorAll(".m3dsnd:not([data-w3d])").forEach((el) => { el.dataset.w3d = "1"; fillVoices(el).catch((e) => { console.warn("sounds", e.message); el.remove(); }); });
  };
  mo = new MutationObserver(scan); mo.observe(root, { childList: true, subtree: true });
  root.addEventListener("click", (e) => {
    const b = e.target.closest(".m3d .b3d"); if (!b) return;
    e.preventDefault(); e.stopPropagation();   // a card is a link: the button turns the model, the rest of the card opens the page
    goLive(b.closest(".m3d"));
  });
  scan();
}
// every route: the live view closed, the viewer disposed (its WebGL context, its caches), the pictures' addresses freed
export function teardown() {
  gen++; queue = [];
  if (audio) { audio.pause(); audio = null; }
  if (live) stopLive();
  if (V) { V.dispose(); V = null; VM && VM.clearCaches && VM.clearCaches(); }
  if (holder) { holder.remove(); holder = null; cv = null; }
  for (const u of urls) URL.revokeObjectURL(u);
  urls.clear();
  lock = Promise.resolve();
}
// for checks in the browser: what the viewer holds now
export const state3d = () => ({ viewer: !!V, memory: V ? { ...V.renderer.info.memory } : null, live: !!live, queued: queue.length });
