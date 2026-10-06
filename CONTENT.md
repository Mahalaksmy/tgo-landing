# CONTENT — Catálogo y contenido de TGO S.A.S.

## Origen de la información

| Dato | Valor | Fuente |
|---|---|---|
| Empresa | Comercial TGO S.A.S. | Suministrado |
| Sector | Insumos de floristería y campo | Suministrado |
| Dirección | Cra 9 # 11 - 48, segundo piso, La Unión, Antioquia, Colombia | Confirmado por el cliente |
| NIT | 902096153 | Confirmado por el cliente (se muestra en el footer y en los datos para Google) |
| Horario | Lunes a sábado, 8:00 a.m. - 6:00 p.m. | Confirmado por el cliente |
| WhatsApp y llamadas | +57 311 714 5443 (`573117145443`) | Confirmado: recibe WhatsApp y llamadas (enlace "Llamar" en el footer) |
| Logo | `assets/img/logo.png` ("Comercial TGO S.A.S", PNG transparente 307×107) | Suministrado |
| Categorías | Insumos Agrícolas (`agricolas`) · Insumos Institucionales (`institucionales`) | Definidas por el cliente |
| Productos Insumos Agrícolas | 8 productos con foto (`assets/img/productos/`, optimizadas desde `Catalogo/`) | Nombres y fotos suministrados. **Referencias (TGO-AG-00X) y descripciones PROVISIONALES**: validar con el cliente. **Pendiente**: presentación |
| Productos Insumos Institucionales | 4 productos con foto: Químicos de limpieza industrial, Papelería de gran formato, Bolsas de basura industriales, Dispensadores automáticos | Nombres y fotos suministrados. **Referencias (TGO-IN-00X) y descripciones PROVISIONALES**. Fotos a mejorar: Papelería (muestra rollos normales, 320 px) y Dispensadores (marca ULINE visible, 300 px) |
| Proveedores y logos | Triton y Tesicol (`Logos/`) + 2 de ejemplo | Suministrados por la usuaria; resto **pendiente** |
| Valores | Especialización técnica · Cuidado de su producto · Acompañamiento cercano | **PROVISIONALES**: redactados por el equipo web a partir del texto "Nosotros" del cliente; validar |
| Correo | comercialtgosas@gmail.com | Confirmado por el cliente |
| Redes sociales | — | La empresa aún no tiene; el bloque está oculto (`social: []`) |
| Dominio | — | **Pendiente** |
| Texto "Nosotros" | `data/site.js → about` | Suministrado por el cliente |
| Fotos de ambiente (hortensias) | `assets/img/tema/` (3 fotos) | Suministradas por la usuaria. **Verificar licencia** (parecen de bancos de imágenes). **`hortensias-vivero.webp` (Nosotros) tiene marca de agua de Dreamstime visible** y muestra a una persona: reemplazar por una foto real de TGO antes de publicar |

No se inventaron productos, precios, clientes, certificaciones ni proveedores. Todo contenido de ejemplo está marcado con `placeholder: true` y se muestra en el sitio con borde punteado y la etiqueta **"Ejemplo"**.

## Archivos de datos (`data/`)

| Archivo | Contenido |
|---|---|
| `site.js` | **Configuración central**: empresa, dirección, WhatsApp, mensajes, logo, pendientes. |
| `categories.js` | Categorías del catálogo (`agricolas`, `institucionales`), con ícono y foto de la tile. |
| `products.js` | Productos. |
| `providers.js` | Proveedores. |
| `values.js` | Valores. |

## Producto — campos

| Campo | Obligatorio | Ejemplo |
|---|---|---|
| `id` | Sí | `"prod-007"` |
| `name` | Sí | Nombre comercial |
| `category` | Sí | `"agricolas"` (debe existir en `categories.js`) |
| `description` | Recomendado | 1–2 frases |
| `image` | No | `"assets/img/productos/prod-007.webp"` (vacío → placeholder) |
| `reference` | Recomendado | Código interno |
| `presentation` | Recomendado | `"Caja x 12"` |
| `whatsappMessage` | No | Vacío → se genera automáticamente |
| `placeholder` | No | Borrar o poner `false` en productos reales |

**Imágenes recomendadas**: WebP, 800×600 px (4:3), < 120 KB.

## Proveedor — campos

| Campo | Obligatorio | Nota |
|---|---|---|
| `id` | Sí | Único |
| `name` | Sí | Se usa también como texto alternativo del logo |
| `logo` | No | SVG o PNG con fondo transparente, ~240×120 px |
| `website` | No | Si existe, la tarjeta enlaza en una pestaña nueva |

## Mensajes de WhatsApp

Base: `https://wa.me/573117145443?text=` + `encodeURIComponent(mensaje)`

**General** (header, hero, contacto, footer, botón flotante):
> Hola, Comercial TGO S.A.S. Quisiera recibir información sobre sus insumos de floristería y campo.

**Por producto** (generado automáticamente desde `productMessageTemplate`; las líneas con datos vacíos se omiten):
> Hola, Comercial TGO S.A.S. Quisiera consultar por este producto:
> • Producto: {name}
> • Referencia: {reference}
> • Presentación: {presentation}
> • Categoría: {category}
> ¿Me pueden informar disponibilidad y precio? Gracias.

Si un producto define `whatsappMessage`, se usa ese texto en lugar de la plantilla.

## Productos — comportamiento

- **Pestañas por categoría** (una por cada categoría de `categories.js`): Insumos Agrícolas e Insumos Institucionales, con el número de productos.
- **Enlaces directos**: `/#agricolas` y `/#institucionales` abren su pestaña (sirven para compartir). Los enlaces viejos `?cat=…` se redirigen solos.
- **Menú**: "Agrícolas" e "Institucionales" (escritorio, móvil y footer) abren cada pestaña. Las tiles del inicio también.
- **Búsqueda**: desactivada; se activa sola si se agrega un `input#catalog-search` (filtra dentro de la pestaña activa).

## Textos del sitio

Solo se usan afirmaciones derivadas de la información suministrada:

- H1: "Insumos agrícolas e institucionales"
- Presentación: "TGO S.A.S. es una empresa ubicada en La Unión, Antioquia, Colombia, especializada en insumos de floristería y campo."
- CTA principal: "Consultar por WhatsApp"
