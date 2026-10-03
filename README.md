# Landing Comercial TGO S.A.S.

Landing page estática (HTML + CSS + JS, sin dependencias ni build) para **Comercial TGO S.A.S.** — insumos de floristería y campo, La Unión, Antioquia.

## Ver en local

```bash
python3 -m http.server 5180
```

Abrir http://localhost:5180 (también funciona abriendo `index.html` directamente).

## Editar contenido

| Qué | Dónde |
|---|---|
| Empresa, dirección, **WhatsApp**, mensajes, logo, horario, correo | `data/site.js` (único lugar) |
| Categorías | `data/categories.js` |
| Productos | `data/products.js` |
| Proveedores | `data/providers.js` |
| Valores | `data/values.js` |

### Cambiar el número de WhatsApp
En `data/site.js` → `whatsapp.number` (solo dígitos con indicativo, p. ej. `573117145443`) y `whatsapp.display` (formato visible). Todos los botones se actualizan solos.

### Agregar logos de proveedores
1. Copiar el logo a la carpeta `Logos/` (PNG o SVG; ideal con fondo transparente, unos 500 px de ancho).
2. En `data/providers.js` agregar una línea, por ejemplo:
   `{ id: "triton", name: "Triton", logo: "Logos/Triton.png", website: "", placeholder: false },`
3. Borrar las líneas de ejemplo (`placeholder: true`) a medida que haya proveedores reales.

### Logo
Configurado en `data/site.js` → `logo: "assets/img/logo.png"` (header en color original, footer invertido a blanco).
Para cambiarlo: reemplazar el archivo (idealmente una versión SVG) y actualizar `logo`, `logoWidth` y `logoHeight`.
El favicon (`assets/img/favicon.svg`) sigue siendo un placeholder: reemplazarlo por un ícono/isotipo oficial.

### Si cambia el nombre o la dirección
Además de `data/site.js`, actualizar los textos de respaldo SEO en `index.html` (`<title>`, `meta description`, Open Graph). El resto del HTML se sincroniza desde `data/site.js`.

## Publicación (GitHub Pages)
- URL: https://mahalaksmy.github.io/tgo-landing/
- Se publica automáticamente desde la rama `main` (carpeta raíz) en cada `git push`.
- `.nojekyll` hace que GitHub sirva los archivos tal cual.
- **Borrador:** `index.html` tiene `noindex, nofollow`. Al lanzar, cambiarlo a `index, follow`.
- **Con dominio propio:** en `404.html` cambiar `<base href="/tgo-landing/">` por `<base href="/">`.

## Antes de publicar
- Definir dominio → `site.url`, `<link rel="canonical">`/OG en `index.html`, `robots.txt`, `sitemap.xml`.
- Reemplazar placeholders (productos, proveedores, valores). Ver `CONTENT.md`.

## Skills de diseño aplicados
`high-end-visual-design`, `design-taste-frontend` y `redesign-existing-projects` (en `.claude/skills/`, enlazados desde `.agents/skills/`). Decisiones y desviaciones en `DESIGN.md`.

## Documentación
- `ARCHITECTURE.md` — sitemap, flujo, datos y componentes.
- `DESIGN.md` — sistema visual.
- `CONTENT.md` — estructura de datos y mensajes de WhatsApp.
