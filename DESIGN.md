# DESIGN · Sistema visual Comercial TGO (v4)

Sitio en **React + Vite + Tailwind**. Esta guía describe el sitio tal como está hoy y las reglas para que los cambios futuros se vean coherentes. Revisado con la skill `frontend-design` (noviembre 2026).

## 1. Idea central

Un proveedor de insumos para la flor y para empresas en La Unión, Antioquia. El sitio tiene **dos líneas de negocio** y eso se ve en todo:

- **Verde** = Insumos Agrícolas. **Azul** = Insumos Institucionales. Son los dos colores de la "T" del favicon.
- **Inicio y Catálogo** son blanco y negro: neutrales. El color de cada línea aparece en sus tarjetas de Inicio y en su sección del catálogo.
- Lo memorable está en un solo lugar: la entrada de Inicio, centrada y solo tipográfica. El resto es tranquilo.

## 2. Color: un tema por línea

El tema de la página vive en `<html data-view>` (`home` o `catalog`, ambos neutrales) y cambia header, contenido y footer a la vez. Cualquier elemento con `data-view="agriculture"` o `data-view="organizational"` toma la paleta de esa línea: así se colorean las tarjetas de Inicio, cada sección del catálogo y la hoja de detalle. Variables en `src/index.css` (formato `R G B` para usar opacidad en Tailwind, p. ej. `bg-primary/10`).

| Variable | Inicio / Catálogo | Agrícolas | Institucionales |
|---|---|---|---|
| `--bg` | `#FFFFFF` | `#F3F6F1` | `#F3F5F9` |
| `--ink` | `#0C0C0C` | `#15201B` | `#111827` |
| `--primary` | `#0C0C0C` | `#3F6B45` | `#2563EB` |
| `--primary-strong` | `#000000` | `#1C4634` | `#1E40AF` |
| `--deep` (footer, franja de cotización) | `#0C0C0C` | `#0E2419` | `#0B1A3A` |

- `--branch-agriculture` y `--branch-organizational` son fijos en todas las páginas . Deben ser iguales al `--primary` de su línea.
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
| Título de tarjeta | 17 px → 24 px (producto), 28 px → 36 px (línea en Inicio) |
| Texto | 16–18 px, interlineado relajado, máximo ~60 caracteres por línea |
| Notas y metadatos | 13–14 px |

## 4. Forma

| Elemento | Radio |
|---|---|
| Botones, chips, accesos a cada línea | pill (`rounded-full`) |
| Paneles grandes (cotización, Nosotros, footer) | 32 px (`rounded-[2rem]`) |
| Tarjetas de Inicio y de valores | 28 px; foto interior 20 px |
| Tarjeta de producto | 20 px celular / 28 px escritorio |
| Fotos pequeñas dentro de tarjetas | 12–16 px |

Bordes de 1 px al 10% del color de texto (`border-line/10`). Sin sombras grises genéricas: las sombras usan el color del tema y solo aparecen en hover o en elementos flotantes.

## 5. Páginas y navegación

| URL | Vista | Archivo |
|---|---|---|
| `/` | Inicio | `src/views/HomeView.jsx` |
| `/catalogo` | Catálogo con todos los productos, en dos secciones: `#agricolas` e `#institucionales` | `src/views/CatalogView.jsx` |

Las direcciones antiguas `/agricolas` e `/institucionales` redirigen (301, `vercel.json`) a `/catalogo#agricolas` y `/catalogo#institucionales`.

- Títulos, descripciones y canonical de cada URL: `src/lib/routes.js`. Al compilar se genera un HTML por ruta (`vite.config.js`).
- Toda navegación entre páginas usa `NavLink` (un `<a href>` real): Google lo sigue, se puede abrir en otra pestaña y funcionan atrás/adelante.
- Las secciones (`#nosotros`, `#proveedores`, `#contacto`, `#lineas`) son anclas dentro de la página.
- Menú: Inicio · Catálogo · Nosotros · Contacto. Miga de pan del catálogo: "Inicio / Catálogo".

## 6. Componentes

- **Franja superior:** ciudad · horario · "Solicita tu cotización", en texto normal (sin mayúsculas). En celular solo queda el enlace de cotización.
- **Header:** logo, enlaces centrados (punto bajo el activo), "Llamar" y botón WhatsApp con el color de la página. En celular, menú a pantalla completa.
- **Entrada de Inicio:** centrada. Título "Comercial TGO:" y subtítulo "Insumos para flores e instituciones con la puntualidad que tu operación exige." (más pequeño, en gris), texto de presentación y botón "Ver catálogo" que abre `/catalogo`.
- **Tarjetas de línea (Inicio):** fondo gris claro, foto de vista previa sobre blanco (`image` en `src/data/branches.js`), título y descripción en el color de la línea y botón con contorno "Ver productos →" que abre su sección del catálogo. En hover sube un poco y el botón se rellena.
- **Catálogo:** título, aviso de cotización, accesos a cada línea con su conteo y una sección por línea (ícono + título en su color, descripción y productos).
- **Tarjeta de producto:** foto sobre blanco, nombre, descripción (sin referencia), selector de presentación si el producto tiene varias y dos acciones (agregar a la cotización, preguntar por WhatsApp). Sin etiqueta de categoría (la página ya la dice). El botón dice "Agregar" en celular y escritorio (la tarjeta horizontal deja poco ancho) y "Agregar a cotización" en tablet.
  - **Presentaciones:** píldoras "Presentación" (una elegida, por defecto la primera; la elegida va en el color de la línea). "Agregar" añade esa presentación a la cotización, así se pueden cotizar varias del mismo producto; WhatsApp y la lista de cotización la incluyen ("Tijera de corte Bellota (7")"). Si una presentación tiene foto propia, la foto cambia al elegirla. La tarjeta y la hoja de detalle comparten la elección.
  - **Celular:** la descripción se corta en 3 líneas con "Ver más"; tocar la tarjeta abre la **hoja de detalle** (`ProductSheet.jsx`) con foto, texto completo y las mismas acciones. Se cierra con ✕, tocando fuera, Esc, deslizando hacia abajo o con "atrás".
- **Lista de cotización:** barra inferior con los productos agregados; reemplaza al botón flotante de WhatsApp mientras está visible.
- **Franja de cotización:** degradado del color de la página, título, texto, tres puntos con check y dos botones ("Solicitar cotización →" por WhatsApp y llamar).
- **Nosotros:** panel "¿Quiénes somos?" a todo el ancho con foto de ambiente y velo oscuro (en celular el segundo párrafo aparece con "Leer más") + "Nuestros valores" debajo: 5 tarjetas con ícono (escritorio: 3 arriba y 2 más anchas abajo).
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
