/* Rutas del sitio: cada vista tiene su propia URL, título y descripción para Google.
   Lo usa la app (cambiar de vista) y vite.config.js (genera un HTML por ruta al compilar). */
export const SITE_URL = "https://www.tgocomercial.com";

export const ROUTES = {
  home: {
    path: "/",
    title: "Comercial TGO S.A.S. | Insumos agrícolas e institucionales en La Unión, Antioquia",
    description: "Comercial TGO S.A.S.: insumos agrícolas e institucionales en La Unión, Antioquia, Colombia. Capuchones, hidratadores, polisombra, químicos de limpieza y más. Consulta disponibilidad por WhatsApp.",
  },
  catalog: {
    path: "/catalogo",
    title: "Catálogo: insumos para flores e instituciones | Comercial TGO, La Unión",
    description: "Capuchones, hidratadores, cauchos, grapas, cinta de empaque y polisombra para la floricultura; químicos de limpieza, papelería, bolsas y dispensadores para empresas. Comercial TGO, La Unión, Antioquia. Cotiza por WhatsApp.",
  },
};

export const pathOf = (view) => ROUTES[view].path;

/* Rutas antiguas (un catálogo por línea): ahora abren el catálogo único. En Vercel redirigen con 301 (vercel.json). */
const OLD_PATHS = { "/agricolas": "catalog", "/institucionales": "catalog" };

/* "/catalogo", "/catalogo/" o "/catalogo.html" → "catalog"; cualquier otra ruta → "home" */
export function viewFromPath(pathname) {
  const p = pathname.replace(/\.html$/, "").replace(/\/+$/, "") || "/";
  return Object.keys(ROUTES).find((k) => ROUTES[k].path === p) || OLD_PATHS[p] || "home";
}

/* Actualiza título, descripción y canonical al cambiar de vista */
export function applyRouteMeta(view) {
  const r = ROUTES[view];
  const url = SITE_URL + r.path;
  document.title = r.title;
  const set = (sel, attr, val) => { const el = document.head.querySelector(sel); if (el) el.setAttribute(attr, val); };
  set('meta[name="description"]', "content", r.description);
  set('link[rel="canonical"]', "href", url);
  set('meta[property="og:url"]', "content", url);
}
