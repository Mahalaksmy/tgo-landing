import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ROUTES, SITE_URL } from "./src/lib/routes.js";
import { BRANCHES } from "./src/data/branches.js";
import { products } from "./src/data/products.js";
import { site } from "./src/data/site.js";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* Texto sin JavaScript (dentro de <noscript>): lo leen buscadores que no ejecutan la app */
function fallbackHtml(view) {
  const wa = `<p><a href="https://wa.me/${site.whatsapp.number}">Escríbenos por WhatsApp: ${esc(site.whatsapp.display)}</a> · <a href="mailto:${esc(site.email)}">${esc(site.email)}</a></p>`;
  const addr = `${esc(site.address.street)}, ${esc(site.address.city)}, ${esc(site.address.region)}`;
  const branchLinks = Object.entries(BRANCHES)
    .map(([key, b]) => `<li><a href="${ROUTES[key].path}">${esc(b.label)}</a>: ${esc(b.blurb)}</li>`).join("");
  let body;
  if (view === "home") {
    body = `<h1>${esc(site.name)}</h1><p>${esc(site.tagline)} en ${addr}.</p><ul>${branchLinks}</ul>`;
  } else {
    const b = BRANCHES[view];
    const items = products.filter((p) => p.category === b.category)
      .map((p) => `<li><strong>${esc(p.name)}</strong>: ${esc(p.description)}</li>`).join("");
    body = `<p><a href="/">${esc(site.name)}</a></p><h1>${esc(b.label)}</h1><p>${esc(b.blurb)}</p><ul>${items}</ul><p>${addr}.</p>`;
  }
  return `<noscript>\n    <div style="max-width:40rem;margin:4rem auto;padding:0 1rem;font-family:system-ui,sans-serif">${body}${wa}</div>\n  </noscript>`;
}

/* Al compilar: un HTML por ruta (agricolas.html, institucionales.html) con su propio título,
   descripción, canonical y texto de respaldo. Vercel los sirve como /agricolas y /institucionales (cleanUrls). */
function routePages() {
  return {
    name: "tgo-route-pages",
    apply: "build",
    writeBundle(options, bundle) {
      const index = bundle["index.html"];
      if (!index) return;
      const base = String(index.source);
      for (const [view, r] of Object.entries(ROUTES)) {
        const url = SITE_URL + r.path;
        const html = base
          .replace(/<title>[^<]*<\/title>/, `<title>${esc(r.title)}</title>`)
          .replace(/(<meta name="description" content=")[^"]*/, `$1${esc(r.description)}`)
          .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
          .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
          .replace(/(<meta property="og:title" content=")[^"]*/, `$1${esc(r.title)}`)
          .replace(/(<meta property="og:description" content=")[^"]*/, `$1${esc(r.description)}`)
          .replace(/<noscript>[\s\S]*?<\/noscript>/, fallbackHtml(view));
        const file = view === "home" ? "index.html" : r.path.slice(1) + ".html";
        writeFileSync(join(options.dir, file), html);
      }
    },
  };
}

// Los archivos compilados van a dist/static para no mezclarse con public/assets (fuentes e imágenes).
export default defineConfig({
  plugins: [react(), routePages()],
  build: {
    outDir: "dist",
    assetsDir: "static",
  },
});
