# DESIGN · Sistema visual TGO S.A.S. (v3)

Skills aplicados: `high-end-visual-design` (dirección visual), `design-taste-frontend` y `redesign-existing-projects` (reglas y guardas).

- **Estilo:** *Soft Structuralism*. Fondo claro verde-gris, componentes que flotan con sombras muy difusas, tipografía display grande y brillos esmeralda sutiles. Lleva una textura de grano fija al 3.5%.
- **Composición:** *bento asimétrico* en el hero (categorías y WhatsApp) y en Nosotros (texto principal y valores).
- **Se conserva:** logo, verde de marca, anclas (#nosotros, #catalogo, #proveedores, #contacto), nombres del menú, textos y la regla de no inventar datos.

## 1. Paleta (un solo acento: verde WhatsApp)

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#F3F6F1` | Fondo |
| `--surface` | `#FDFEFC` | Núcleo de tarjetas |
| `--shell` | negro 4.5% | Bisel exterior, chips |
| `--hairline` | negro 8% | Contornos (en lugar de bordes grises de 1px) |
| `--text` / `--text-muted` | `#15201B` / `#4D5A53` | Texto |
| `--brand` / `--leaf` | `#1C4634` / `#3A7A57` | Marca, énfasis del H1 |
| `--accent` | `#3F6B45` | **Acento complementario (~10% de la página, regla 60-30-10)**: palabras clave del H1, eyebrows, filtro activo, etiqueta de categoría, tiles de valores (ícono en acento sobre fondo crema `#F6F1E6`), círculo del botón secundario, franja de Proveedores, puntos y hovers. Blanco encima: 6.2:1 |
| `--deep` | `#0E2419` | Footer, tile principal y panel de contacto |
| `--wa` | `#187A43` | Acción WhatsApp (5.4:1 con blanco) |

**Siempre en modo claro** (sin modo oscuro automático, a pedido de TGO). El fondo de página es siempre claro; `--deep` se usa en el footer y en los paneles de acento (tile Floristería y panel de Contacto).

## 2. Tipografía (auto-alojada en `assets/fonts/`)

- **Títulos:** `Clash Display` 500/600 (Fontshare, licencia ITF Free Font: uso comercial permitido). Tracking negativo (-0.03em) compensado con `word-spacing` (+0.08 a +0.1em) para que las palabras no se peguen.
- **Texto e interfaz:** `Geist` 400-600 (SIL OFL).
- **H1:** "Insumos *agrícolas* e *institucionales*": 2 líneas a todo el ancho en escritorio; en pantallas de 400 px o menos el tamaño escala con el ancho (11.5vw) para que "institucionales" quepa. El énfasis va en color de acento, con la misma familia y peso.
- **Tokens:** `--ff-display`, `--ff-body`, `--dw-lg/sm` (peso), `--dt-lg/sm` (tracking), `--dws` (word-spacing), `--ds` (escala), `--em-style/weight`. Cambiar de fuente en el futuro implica tocar solo estas variables y los `@font-face`.

> Se probaron Zodiak, Epilogue y las combinaciones Cormorant + DM Sans, DM Serif + Manrope y Clash + Satoshi; TGO prefirió volver a Clash Display + Geist.

## 3. Forma: doble bisel (Doppelrand)

Cada contenedor importante es una **carcasa** (`.bezel`) con fondo translúcido, contorno fino y 6px de padding. Dentro va un **núcleo** (`.bezel__core`) con su propio fondo, un brillo interior y un radio concéntrico.

| Elemento | Radio |
|---|---|
| Interactivos (botones, chips, buscador, navegación) | pill 999px |
| Carcasa | 32px |
| Núcleo | 26px (32 - 6) |
| Elementos internos | 8px |

## 4. Botones con ícono anidado

`.btn` es una pill con el texto a la izquierda y el ícono dentro de su propio círculo (`.btn__icon`) a la derecha. En hover el círculo se desplaza en diagonal y crece un poco; al presionar, el botón hace `scale(.98)`.

| Variante | Uso |
|---|---|
| `.btn--wa` | Acción principal **"Escríbenos"** (única etiqueta para esa intención; nombre accesible "Escríbenos por WhatsApp") |
| `.btn--soft` | Secundaria clara ("Ver catálogo", "Limpiar filtros") |
| `.btn--light` / `.btn--glass` | Dentro del panel profundo de contacto |

## 5. Componentes

- **Navegación isla:** pill de vidrio flotante y separada del borde (`backdrop-filter` solo en elementos fijos).
  - En escritorio muestra los enlaces y el CTA.
  - En móvil muestra el ícono de WhatsApp y una hamburguesa de 2 líneas que se transforma en X.
- **Menú móvil:** overlay a pantalla completa con vidrio. Los enlaces gigantes aparecen escalonados (60ms entre cada uno). Usa `inert` cuando está cerrado, mueve el foco al primer enlace, bloquea el scroll y se cierra con Esc.
- **Hero bento:** tiles generados desde `data/categories.js` más un tile de WhatsApp. Si la categoría tiene `image`, la tile usa la foto de fondo con un velo verde degradado para el contraste.
  - La primera categoría es un panel profundo con brillo.
  - Al hacer clic en una categoría se filtra el catálogo y se baja a los productos.
  - Si se define `heroImage`, se agrega un tile con la foto.
- **Nosotros:** bento 7/5. La tarjeta principal es un panel con la foto de ambiente (`site.aboutImage`) de fondo a sangre y un velo verde degradado. Lleva título blanco, la presentación en texto liviano, etiquetas-resumen generadas desde los datos (categorías + ciudad) y CTA de WhatsApp. Sin foto, la tarjeta es clara con la marca "lotus". Los valores van en tiles con bisel.
- **Productos (pestañas):** se quitó la sección "Catálogo" con filtro "Todos". Ahora es un bloque con pestañas accesibles (patrón WAI-ARIA Tabs: flechas, Inicio y Fin; activación automática), una por categoría con ícono y conteo.
  - Pestaña activa en verde acento; en móvil las pestañas se apilan ícono / nombre / conteo para caber lado a lado.
  - Cada pestaña tiene id = id de la categoría (`#agricolas`, `#institucionales`); los enlaces del menú, del footer y las tiles del hero abren su pestaña y bajan a la sección. El hash de la URL refleja la pestaña activa; los enlaces antiguos `?cat=` siguen funcionando.
  - Tarjeta de producto con bisel; foto completa sobre blanco (o `imageFit` "full" / "cover"); ficha con referencia y CTA anclado abajo.
- **Proveedores:** marquesina de logos con máscara de desvanecido en los bordes; se pausa al pasar el mouse. Con movimiento reducido se convierte en una grilla estática. La copia del bucle está oculta a lectores de pantalla.
- **Contacto:** la sección con mapa se eliminó por redundante; `#contacto` es ahora el footer (WhatsApp, dirección, enlace "Cómo llegar" a Google Maps, correo y redes).
- **Footer:** panel oscuro (`--deep`) flotante. Escritorio: 3 columnas (marca + correo y redes si existen · "Explora" · "Contáctanos" con WhatsApp y llamadas, horario, dirección y "Cómo llegar"). Móvil: "Explora" y "Contáctanos" son desplegables (`<details>`, cerrados por defecto) para ahorrar espacio. Abajo: © + NIT y "Volver arriba".
- **Botón flotante:** círculo de 60px `--wa` con tooltip en escritorio.

## 6. Movimiento (curvas spring `cubic-bezier(.32,.72,0,1)`)

- **Hero:** entrada escalonada con subida, desenfoque y opacidad (título, texto, acciones y luego tiles).
- **Secciones:** las secciones y tarjetas suben con desenfoque usando `animation-timeline: view()` (CSS puro, sin listeners de scroll). Sin soporte, el contenido se ve normal.
- **Navegación:** la sombra de la isla y el enlace activo usan `IntersectionObserver`.
- **Reglas:** solo se animan `transform`, `opacity` y un `filter` breve. Con movimiento reducido todo queda estático.

## 6b. WhatsApp: dónde aparece (reducido)
Isla (solo escritorio) · menú móvil · hero · cada producto · panel de contacto (botón + número) · footer (número) · botón flotante. Se quitaron el tile del hero, el botón de Nosotros y el CTA grande del footer. En móvil no se muestra el ícono de la isla (ya está el flotante).

## 7. Responsive

| Ancho | Cambios |
|---|---|
| < 420 px | Bento en 1 columna |
| < 600 px | CTA de la isla solo con ícono; botones del hero a ancho completo |
| 600-1023 px | Bento de 3 tiles en fila; productos en 2 columnas |
| ≥ 1024 px | Hero editorial (título a todo el ancho; texto y acciones a la izquierda, bento a la derecha); Nosotros en bento 7/5; contacto en 2 columnas |
| ≥ 960 px | Productos en 3 columnas; navegación completa en la isla |

## 8. Desviaciones conscientes

- **Stack:** se mantiene HTML/CSS/JS vanilla, no React/Tailwind (regla de rediseño: no migrar).
- **Imágenes:** no se usan fotos de stock porque parecerían productos reales de TGO; faltan fotos reales.
- **Eyebrows:** solo 2 (hero y catálogo), para respetar el límite de `design-taste-frontend`.
- **Animación lineal:** solo la usan la marquesina y las animaciones ligadas al scroll, porque necesitan velocidad constante; todas las transiciones usan curvas spring.
