# ARCHITECTURE — Landing TGO S.A.S.

Landing de una sola página (one-page) para **TGO S.A.S.**, empresa de La Unión, Antioquia (Colombia), especializada en **insumos de floristería y campo**. Objetivo principal: **convertir visitas en conversaciones de WhatsApp**.

## 0. Decisiones técnicas

| Decisión | Motivo |
|---|---|
| HTML + CSS + JavaScript vanilla, sin build | Rápido, sin dependencias, se puede alojar en cualquier hosting estático. |
| Scripts clásicos (no ES modules) bajo el namespace `window.TGO` | Funciona incluso abriendo `index.html` directamente (file://). |
| Datos en `data/*.js`, presentación en `assets/js/components.js` | Separación datos / presentación: editar contenido no requiere tocar código. |
| Un único archivo de configuración: `data/site.js` | Empresa, ubicación y WhatsApp centralizados. |
| Contenido estático crítico (h1, textos, dirección) en HTML | SEO: los buscadores ven el contenido principal sin depender de JS. |

## 1. Sitemap

Una sola URL con anclas:

```
/ (index.html)
├── #inicio        Hero
├── #nosotros      Presentación + Valores
├── #catalogo      Categorías + Buscador + Productos
├── #proveedores   Proveedores
└── #contacto      Contacto + Mapa
```

Archivos auxiliares: `robots.txt`, `sitemap.xml`.

## 2. Secciones

| # | Sección | Contenido | CTA |
|---|---|---|---|
| 1 | Header (sticky) | Logo/nombre, navegación, botón WhatsApp | Consultar por WhatsApp |
| 2 | Hero | H1, propuesta (floristería + campo), ubicación | Consultar por WhatsApp · Ver catálogo |
| 3 | Nosotros | Presentación de TGO S.A.S. | — |
| 4 | Valores | Tarjetas de valores (placeholders editables) | — |
| 5 | Hero › Bento de categorías | Tiles de categoría con conteo; al hacer clic filtran el catálogo | Filtrar |
| 6 | Catálogo › Productos | Buscador + chips de categoría + grilla de productos | Consultar por WhatsApp (por producto) |
| 7 | Proveedores | Grilla de logos (enlace opcional al sitio) | — |
| 8 | Contacto | Dirección, WhatsApp, mapa | Consultar por WhatsApp · Cómo llegar |
| 9 | Footer | Datos de la empresa, navegación, © | WhatsApp |
| — | Botón flotante | Siempre visible | WhatsApp |

## 3. Jerarquía de información

1. **Qué es y dónde está**: TGO S.A.S. — insumos de floristería y campo — La Unión, Antioquia.
2. **Acción principal**: Consultar por WhatsApp (visible en header, hero, cada producto, contacto, footer y botón flotante).
3. **Qué ofrece**: catálogo por categorías.
4. **Confianza**: presentación, valores, proveedores.
5. **Cómo contactar / llegar**: contacto y mapa.

## 4. Flujo del usuario (producto → WhatsApp)

```
Llega al sitio
  └─ Hero ──► [Consultar por WhatsApp]  ─────────────────────► WhatsApp (mensaje general)
        └─► [Ver catálogo]
               └─ Elige categoría (tarjeta o chip)  y/o  busca por texto
                     └─ Ve tarjeta del producto (nombre, ref., presentación)
                           └─ [Consultar por WhatsApp] ──────► WhatsApp con mensaje
                                                               pre-escrito del producto
```

URL generada: `https://wa.me/{WHATSAPP}?text={encodeURIComponent(mensaje)}` — construida **solo** en `assets/js/whatsapp.js` a partir de `data/site.js`.

## 5. Estructura de datos

### `data/site.js` — configuración única
```js
TGO.site = {
  name, shortName, tagline, description, url,
  address: { street, city, region, country, countryCode },
  whatsapp: { number, display, defaultMessage, productMessageTemplate },
  logo, heroImage, email, hours, about
}
```

### `data/categories.js`
```js
{ id: "floristeria", name: "Floristería", description: "" }
```

### `data/products.js`
```js
{
  id: "prod-001",           // único
  name: "",                 // nombre
  category: "floristeria",  // id de categoría
  description: "",
  image: "",                // ruta o URL; vacío → placeholder
  reference: "",            // referencia / SKU
  presentation: "",         // p. ej. "Caja x 12"
  whatsappMessage: "",      // opcional; vacío → se genera automáticamente
  placeholder: true         // true = contenido de ejemplo (se marca visualmente)
}
```

### `data/providers.js`
```js
{ id: "prov-001", name: "", logo: "", website: "", placeholder: true }
```

### `data/values.js`
```js
{ id: "valor-1", title: "", description: "", placeholder: true }
```

## 6. Componentes reutilizables (`assets/js/components.js`)

| Componente | Entrada | Uso |
|---|---|---|
| `icon(name)` | nombre | Icono del sprite Phosphor (`#ph-*` en index.html) |
| `waButton(opts)` | texto, mensaje, variante | Cualquier CTA de WhatsApp |
| `categoryCard(cat, count)` | categoría | Tile del bento del hero (filtra el catálogo) |
| `whatsappTile()` | — | Tile de WhatsApp del bento del hero |
| `productCard(product, category)` | producto | Grilla del catálogo |
| `providerCard(provider)` | proveedor | Muro de logos (solo logo; nombre como respaldo) |
| `valueCard(value)` | valor | Sección Valores (lista editorial) |
| `placeholderBadge()` | — | Marca contenido de ejemplo |

Módulos:

```
assets/js/utils.js       escapeHtml, normalize (búsqueda sin tildes), debounce
assets/js/whatsapp.js    buildUrl(message), productMessage(product), hydrate([data-wa])
assets/js/components.js  plantillas HTML
assets/js/catalog.js     estado (query, categoría), filtrado, render
assets/js/main.js        hidratación de config, navegación, render de secciones, JSON-LD
```

## 7. Estructura de carpetas

```
TGO_Pro/
├── index.html · 404.html
├── robots.txt · sitemap.xml
├── ARCHITECTURE.md · DESIGN.md · CONTENT.md · README.md
├── data/        site.js · categories.js · products.js · providers.js · values.js
└── assets/
    ├── css/styles.css
    ├── js/utils.js · whatsapp.js · components.js · catalog.js · main.js
    ├── img/favicon.svg · logo.png · placeholder-product.svg
    └── fonts/clash-display-500/600.woff2 · geist-latin.woff2
```
