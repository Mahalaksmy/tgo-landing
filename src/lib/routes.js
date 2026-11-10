/* Rutas del sitio: cada vista tiene su propia URL, título y descripción para Google.
   Lo usa la app (cambiar de vista) y vite.config.js (genera un HTML por ruta al compilar). */
export const SITE_URL = "https://www.tgocomercial.com";

export const ROUTES = {
  home: {
    path: "/",
    title: "Comercial TGO S.A.S. | Insumos agrícolas e institucionales en La Unión, Antioquia",
    description: "Comercial TGO S.A.S.: insumos agrícolas e institucionales en La Unión, Antioquia, Colombia. Capuchones, hidratadores, polisombra, químicos de limpieza y más. Consulta disponibilidad por WhatsApp.",
  },
  agriculture: {
    path: "/agricolas",
    title: "Insumos agrícolas para floricultura y poscosecha | Comercial TGO, La Unión",
    description: "Capuchones de tela y plástico, hidratadores, cauchos, grapas, cinta de empaque y polisombra para el cultivo y la poscosecha de flor. Comercial TGO, La Unión, Antioquia. Cotiza por WhatsApp.",
  },
  organizational: {
    path: "/institucionales",
    title: "Insumos institucionales: limpieza, papelería y bolsas | Comercial TGO, La Unión",
    description: "Químicos de limpieza, papelería de gran formato, bolsas para basura y dispensadores para empresas e instituciones. Comercial TGO, La Unión, Antioquia. Cotiza por WhatsApp.",
  },
};

export const pathOf = (view) => ROUTES[view].path;

/* "/agricolas", "/agricolas/" o "/agricolas.html" → "agriculture"; cualquier otra ruta → "home" */
export function viewFromPath(pathname) {
  const p = pathname.replace(/\.html$/, "").replace(/\/+$/, "") || "/";
  return Object.keys(ROUTES).find((k) => ROUTES[k].path === p) || "home";
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
