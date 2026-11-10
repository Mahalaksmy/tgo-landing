# DESIGN · Sistema visual Comercial TGO (v4)

Sitio en **React + Vite + Tailwind**. Esta guía describe el sitio tal como está hoy y las reglas para que los cambios futuros se vean coherentes. Revisado con la skill `frontend-design` (noviembre 2026).

## 1. Idea central

Un proveedor de insumos para la flor y para empresas en La Unión, Antioquia. El sitio tiene **dos líneas de negocio** y eso se ve en todo:

- **Verde** = Insumos Agrícolas. **Azul** = Insumos Institucionales. Son los dos colores de la "T" del favicon.
- **Inicio** es blanco y negro: neutral. Las tarjetas de cada catálogo se rellenan con su color (verde o azul) al pasar el cursor.
- Lo memorable está en un solo lugar: la entrada de Inicio, centrada y solo tipográfica. El resto es tranquilo.

## 2. Color: un tema por página

El tema vive en `<html data-view>` y cambia header, contenido y footer a la vez. Variables en `src/index.css` (formato `R G B` para usar opacidad en Tailwind, p. ej. `bg-primary/10`).

| Variable | Inicio | Agrícolas | Institucionales |
|---|---|---|---|
| `--bg` | `#FFFFFF` | `#F3F6F1` | `#F3F5F9` |
| `--ink` | `#0C0C0C` | `#15201B` | `#111827` |
| `--primary` | `#0C0C0C` | `#3F6B45` | `#2563EB` |
| `--primary-strong` | `#000000` | `#1C4634` | `#1E40AF` |
| `--deep` (footer, franja de cotización) | `#0C0C0C` | `#0E2419` | `#0B1A3A` |

- `--branch-agriculture` y `--branch-organizational` son fijos en todas las páginas (tarjetas de Inicio). Deben ser iguales al `--primary` de su página.
- Texto blanco sobre verde (6.2:1) y sobre azul (5.2:1) cumple contraste. Sobre esos fondos, el texto pequeño va al 90% de opacidad como mínimo.
- Solo modo claro.

## 3. Tipografía

- **Títulos:** Clash Display 600 (`font-display`), tracking negativo y `word-spacing: .08em`.
- **Texto e interfaz:** Geist 400–600.
- Archivos locales en `public/assets/fonts/`.

| Uso | Tamaño (celular → escritorio) |
|---|---|
| H1 | 40 px → 64 px, interlineado 1 |
| H2 de sección | 30 px → 44–48 px |
| Título de tarjeta | 17 px → 24 px (producto), 30 px → 42 px (catálogo en Inicio) |
| Texto | 16–18 px, interlineado relajado, máximo ~60 caracteres por línea |
| Notas y metadatos | 13–14 px |

## 4. Forma

| Elemento | Radio |
|---|---|
| Botones, chips, selector de catálogo | pill (`rounded-full`) |
| Paneles grandes (tarjetas de Inicio, cotización, Nosotros, footer) | 32 px (`rounded-[2rem]`) |
| Tarjeta de producto | 20 px celular / 28 px escritorio |
| Fotos pequeñas dentro de tarjetas | 12–16 px |

Bordes de 1 px al 10% del color de texto (`border-line/10`). Sin sombras grises genéricas: las sombras usan el color del tema y solo aparecen en hover o en elementos flotantes.

## 5. Páginas y navegación

| URL | Vista | Archivo |
|---|---|---|
| `/` | Inicio | `src/views/HomeView.jsx` |
| `/agricolas` | Catálogo agrícola | `src/views/CatalogView.jsx` |
| `/institucionales` | Catálogo institucional | `src/views/CatalogView.jsx` |

- Títulos, descripciones y canonical de cada URL: `src/lib/routes.js`. Al compilar se genera un HTML por ruta (`vite.config.js`).
- Toda navegación entre páginas usa `NavLink` (un `<a href>` real): Google lo sigue, se puede abrir en otra pestaña y funcionan atrás/adelante.
- Las secciones (`#nosotros`, `#proveedores`, `#contacto`, `#lineas`) son anclas dentro de la página.
- Miga de pan del catálogo: "Inicio / *nombre del catálogo*".

## 6. Componentes

- **Franja superior:** ciudad · horario · "Solicita tu cotización", en texto normal (sin mayúsculas). En celular solo queda el enlace de cotización.
- **Header:** logo, enlaces centrados (punto bajo el activo), "Llamar" y botón WhatsApp con el color de la página. En celular, menú a pantalla completa.
- **Entrada de Inicio:** centrada. Título "Comercial TGO: Todo lo que tu campo y tu empresa necesitan", texto de presentación con los productos de cada línea y la ciudad y botón "Ver catálogos" que baja a las tarjetas.
- **Tarjetas de catálogo (Inicio):** blancas con ícono, conteo de productos, descripción y "Ver catálogo"; al pasar el cursor (o enfocar) se rellenan con el color de su línea.
- **Tarjeta de producto:** foto sobre blanco, nombre, referencia, descripción y dos acciones (agregar a la cotización, preguntar por WhatsApp). Sin etiqueta de categoría (la página ya la dice). El botón dice "Agregar" en celular y escritorio (la tarjeta horizontal deja poco ancho) y "Agregar a cotización" en tablet.
  - **Celular:** la descripción se corta en 3 líneas con "Ver más"; tocar la tarjeta abre la **hoja de detalle** (`ProductSheet.jsx`) con foto, texto completo y las mismas acciones. Se cierra con ✕, tocando fuera, Esc, deslizando hacia abajo o con "atrás".
- **Lista de cotización:** barra inferior con los productos agregados; reemplaza al botón flotante de WhatsApp mientras está visible.
- **Franja de cotización:** degradado del color de la página, título, texto, tres puntos con check y dos botones ("Solicitar cotización →" por WhatsApp y llamar).
- **Nosotros:** panel con foto de ambiente y velo oscuro + "Nuestros valores" en tres tarjetas con ícono.
- **Marcas:** logos en una fila quieta y centrada. Si algún día hay muchos (más de 6), se puede volver a una cinta en movimiento con botón de pausa.
- **Footer:** panel oscuro; en celular "Explora" y "Contáctanos" son desplegables.
- **Botón flotante de WhatsApp:** 48 px en celular, 56 px desde tablet.

## 7. Movimiento

- Solo movimiento que responde a una acción: cambio de página (desvanecer y subir 12 px), abrir/cerrar la hoja de detalle, menú móvil, hover de tarjetas.
- Nada se mueve solo (no hay cintas ni entradas animadas al hacer scroll).
- Con "reducir movimiento" activado, todo queda estático.

## 8. Reglas para evitar que se vea "de plantilla"

1. **Sin etiquetas en MAYÚSCULAS con letras separadas** encima de los títulos. Si el título ya lo dice, no hace falta etiqueta. (Excepción conservada: el título "Nuestros valores".)
2. **No resaltar una sola palabra** del título con otro color o estilo.
3. **No agregar tarjetas idénticas nuevas** para contenido corto; preferir listas.
4. **Textos con datos reales del sitio.** No inventar cifras, clientes ni certificaciones. Los textos provisionales se marcan con un comentario en el código.
5. **Fotos:** solo de productos reales o de ambiente (cultivo, flor). Nunca fotos de stock que parezcan productos de TGO.

## 9. Responsive

| Ancho | Cambios |
|---|---|
| < 640 px | Productos en 2 columnas con hoja de detalle; tarjetas de Inicio en 1 columna |
| 640–1023 px | Productos en 2 columnas con texto completo; tarjetas de Inicio en 2 columnas desde 768 px |
| ≥ 1024 px | Tarjeta de producto horizontal (foto a la izquierda); menú completo |
