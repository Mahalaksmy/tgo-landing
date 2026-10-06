# Landing Comercial TGO S.A.S.

Sitio web de **Comercial TGO S.A.S.** (insumos agrícolas e institucionales, La Unión, Antioquia).
SPA en **React 18 + Tailwind 3**, compilada con **Vite**. Publicada en Vercel: https://tgo-landing.vercel.app

## Comandos

```bash
npm install
```

```bash
npm run dev
```

- `npm run dev`: servidor de desarrollo con recarga en vivo (http://localhost:5173).
- `npm run build`: genera la versión de producción en `dist/`.
- `npm run preview`: sirve `dist/` para revisarla antes de publicar.

## Estructura

| Qué | Dónde |
|---|---|
| Página base, SEO (title, description, Open Graph, datos para Google) | `index.html` |
| Empresa, dirección, **WhatsApp**, mensajes, logo, horario, correo | `src/data/site.js` (único lugar) |
| Categorías · Productos · Proveedores · Valores | `src/data/categories.js` · `products.js` · `providers.js` · `values.js` |
| Textos de las tarjetas de Inicio (Agrícolas / Institucionales) | `src/data/branches.js` |
| Colores de cada vista (temas), fuentes y animaciones | `src/index.css` (bloques `[data-view]`) |
| Componentes (header, footer, proveedores, botón WhatsApp) | `src/components/` |
| Vistas (Inicio, Nosotros, catálogo, tarjeta de producto) | `src/views/` |
| Imágenes, fuentes, logos, robots.txt, sitemap.xml | `public/` (se copian tal cual; se referencian con ruta absoluta, p. ej. `/assets/img/logo.png`) |

### Cambiar el número de WhatsApp
En `src/data/site.js` → `whatsapp.number` (solo dígitos con indicativo, p. ej. `573117145443`) y `whatsapp.display`. Actualizar también el teléfono del JSON-LD y del `<noscript>` en `index.html`.

### Agregar logos de proveedores
1. Copiar el logo a `public/Logos/` (PNG o SVG con fondo transparente).
2. En `src/data/providers.js` agregar `{ "id": "triton", "name": "Triton", "logo": "/Logos/Triton.png", "website": "", "placeholder": false }`.
3. Borrar los de ejemplo (`placeholder: true`) cuando haya proveedores reales.

### Productos
En `src/data/products.js`. Fotos en `public/assets/img/productos/` (ruta `/assets/img/productos/archivo.jpg`).

## Versiones
- `index.html` + `src/`: **versión principal** (SPA React compilada con Vite).
- `public/clasico.html`: versión clásica (HTML/CSS/JS con `public/data/*.js`), guardada como respaldo (`noindex`).
- Etiqueta `v1-clasica`: la versión publicada antes de la SPA.

## Publicación (Vercel)
- Producción: https://tgo-landing.vercel.app (se despliega sola en cada `git push` a `main`).
- Cualquier otra rama genera un enlace de vista previa.
- Configuración en `vercel.json` (Vite, salida `dist/`, caché larga para `/static` y las fuentes).
- **Indexación activa** (`index, follow`), con `sitemap.xml` y `robots.txt`.
- **Con dominio propio:** cambiar `https://tgo-landing.vercel.app` en `index.html` (canonical, Open Graph, JSON-LD), `public/robots.txt` y `public/sitemap.xml`.
- GitHub Pages ya no sirve esta versión (necesita compilarse); se recomienda desactivarlo.

## Antes de seguir creciendo
- Reemplazar placeholders (proveedores de ejemplo, valores y descripciones provisionales). Ver `CONTENT.md`.
- Reemplazar la foto de Nosotros (`hortensias-vivero.webp`, tiene marca de agua) y el favicon provisional.

## Skills de diseño aplicados
`high-end-visual-design`, `design-taste-frontend` y `redesign-existing-projects` (en `.claude/skills/`, enlazados desde `.agents/skills/`). Decisiones y desviaciones en `DESIGN.md`.

## Documentación
- `ARCHITECTURE.md` — sitemap, flujo, datos y componentes.
- `DESIGN.md` — sistema visual.
- `CONTENT.md` — estructura de datos y mensajes de WhatsApp.
