import { esc } from "./core.js";
import { table } from "./ui.js";

// ---------- a spec, rendered from docs/specs or docs/research (copied into data/ledger/specs by the build) ----------
export function mdInline(t) {
  const codes = [];
  t = t.replace(/`([^`]+)`/g, (_, c) => { codes.push(c); return `\u0000${codes.length - 1}\u0000`; });
  t = esc(t)
    .replace(/!\[([^\]]*)\]\(([^)\s]+)[^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)\s]+)[^)]*\)/g, (_, txt, url) => {
      const md = /^(?:\.\/)?([\w.-]+\.md)(#.*)?$/.exec(url);
      if (md) return `<a href="#/spec/${encodeURIComponent(md[1])}">${txt}</a>`;
      if (/^https?:/.test(url)) return `<a href="${url}" target="_blank" rel="noopener">${txt}</a>`;
      return `<span class="white" title="${url}">${txt}</span>`;
    })
    .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>").replace(/(^|[^\w*])\*([^*\s][^*]*)\*/g, "$1<i>$2</i>");
  return t.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${esc(codes[+i])}</code>`);
}
export function mdRender(src) {
  const L = src.replace(/\r/g, "").split("\n");
  let h = "", i = 0;
  const cells = (l) => l.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
  while (i < L.length) {
    const l = L[i];
    if (/^```/.test(l)) { const b = []; i++; while (i < L.length && !/^```/.test(L[i])) b.push(L[i++]); i++; h += `<pre><code>${esc(b.join("\n"))}</code></pre>`; continue; }
    const hd = /^(#{1,6})\s+(.*)$/.exec(l);
    if (hd) { const n = Math.min(hd[1].length + 1, 5); h += `<h${n}>${mdInline(hd[2])}</h${n}>`; i++; continue; }
    if (/^\s*\|/.test(l) && i + 1 < L.length && /^\s*\|?\s*:?-{2,}/.test(L[i + 1])) {
      h += `<table class="lt"><thead><tr>${cells(l).map((c) => `<th>${mdInline(c)}</th>`).join("")}</tr></thead><tbody>`; i += 2;
      while (i < L.length && /^\s*\|/.test(L[i])) h += `<tr>${cells(L[i++]).map((c) => `<td>${mdInline(c)}</td>`).join("")}</tr>`;
      h += "</tbody></table>"; continue;
    }
    if (/^\s*([-*]|\d+\.)\s+/.test(l)) {
      const ol = /^\s*\d+\./.test(l); h += ol ? "<ol>" : "<ul>";
      while (i < L.length && /^\s*([-*]|\d+\.)\s+/.test(L[i])) {
        let item = L[i++].replace(/^\s*([-*]|\d+\.)\s+/, "");
        while (i < L.length && /^\s{2,}\S/.test(L[i]) && !/^\s*([-*]|\d+\.)\s+/.test(L[i])) item += " " + L[i++].trim();
        h += `<li>${mdInline(item)}</li>`;
      }
      h += ol ? "</ol>" : "</ul>"; continue;
    }
    if (/^>\s?/.test(l)) { const b = []; while (i < L.length && /^>\s?/.test(L[i])) b.push(L[i++].replace(/^>\s?/, "")); h += `<blockquote>${mdInline(b.join(" "))}</blockquote>`; continue; }
    if (/^\s*(---|\*\*\*)\s*$/.test(l)) { h += "<hr>"; i++; continue; }
    if (!l.trim()) { i++; continue; }
    const p = [];
    while (i < L.length && L[i].trim() && !/^(#{1,6}\s|```|\s*\||\s*([-*]|\d+\.)\s+|>)/.test(L[i])) p.push(L[i++].trim());
    if (!p.length) p.push(L[i++].trim());
    h += `<p>${mdInline(p.join(" "))}</p>`;
  }
  return h;
}
