/**
 * PRODUCTOS
 * ------------------------------------------------------------------
 * Insumos Agrícolas: productos reales suministrados por el cliente.
 *   ⚠️ PROVISIONAL: las referencias (TGO-AG-00X) y descripciones fueron redactadas
 *   por el equipo web, NO por el cliente. Validarlas o reemplazarlas por las reales.
 * Insumos Institucionales: productos reales suministrados por el cliente
 *   (mismas notas: referencias TGO-IN-00X y descripciones PROVISIONALES).
 * Pendiente: presentación de cada producto.
 *
 * Campos:
 *   id              string  único
 *   name            string  nombre del producto
 *   category        string  id de una categoría en data/categories.js
 *   description     string  descripción breve ("" = no se muestra)
 *   image           string  ruta (assets/img/productos/…) o URL. "" → imagen placeholder
 *   imageFit        string  opcional. "" = producto sobre fondo blanco, completo con margen (por defecto)
 *                           "full" = completa sin margen (fotos con fondo propio)
 *                           "cover" = llena la tarjeta recortando (fotos de ambiente)
 *   reference       string  referencia / código ("" = no se muestra)
 *   presentation    string  presentación, p. ej. "Caja x 12 unidades" ("" = no se muestra)
 *   whatsappMessage string  opcional. "" → se genera automáticamente con la plantilla de data/site.js
 *   placeholder     boolean true = se marca visualmente como "Ejemplo"
 *
 * Fotos: JPG o WebP, fondo blanco, ~800 px. Se muestran completas (sin recorte).
 */
window.TGO = window.TGO || {};

TGO.products = [
  /* ---------- Insumos Agrícolas ---------- */
  {
    id: "capuchon-tela",
    name: "Capuchón tela",
    category: "agricolas",
    description: "Capuchón de tela para proteger y presentar ramos de flor durante el empaque, el almacenamiento y el transporte.",
    image: "assets/img/productos/capuchon-tela.jpg",
    reference: "TGO-AG-001",
    presentation: "",
    whatsappMessage: "",
    placeholder: false,
  },
  {
    id: "capuchon-plastico",
    name: "Capuchón plástico",
    category: "agricolas",
    description: "Capuchón plástico transparente que protege el ramo y deja ver la flor en la poscosecha, el empaque y el despacho.",
    image: "assets/img/productos/capuchon-plastico.jpg",
    reference: "TGO-AG-002",
    presentation: "",
    whatsappMessage: "",
    placeholder: false,
  },
  {
    id: "hidratadores",
    name: "Hidratadores",
    category: "agricolas",
    description: "Hidratadores para mantener la hidratación de los tallos de flor cortada durante el transporte y la exhibición.",
    image: "assets/img/productos/hidratadores.jpg",
    reference: "TGO-AG-003",
    presentation: "",
    whatsappMessage: "",
    placeholder: false,
  },
  {
    id: "caucho",
    name: "Caucho",
    category: "agricolas",
    description: "Bandas de caucho para amarrar y sujetar ramos y bonches de flor en la etapa de poscosecha.",
    image: "assets/img/productos/caucho.jpg",
    reference: "TGO-AG-004",
    presentation: "",
    whatsappMessage: "",
    placeholder: false,
  },
  {
    id: "grapas",
    name: "Grapas",
    category: "agricolas",
    description: "Grapas para el cierre y ensamble de capuchones, empaques y cajas en la línea de empaque.",
    image: "assets/img/productos/grapas.jpg",
    reference: "TGO-AG-005",
    presentation: "",
    whatsappMessage: "",
    placeholder: false,
  },
  {
    id: "cinta-de-empaque",
    name: "Cinta de empaque",
    category: "agricolas",
    description: "Cinta adhesiva para el sellado de cajas y empaques de despacho.",
    image: "assets/img/productos/cinta-de-empaque.jpg",
    reference: "TGO-AG-006",
    presentation: "",
    whatsappMessage: "",
    placeholder: false,
  },
  {
    id: "polisombra-8x125",
    name: "Polisombra 8x125",
    category: "agricolas",
    description: "Malla polisombra para regular la luz y la temperatura en cultivos e invernaderos. Medida 8x125.",
    image: "assets/img/productos/polisombra-8x125.jpg",
    imageFit: "full",
    reference: "TGO-AG-007",
    presentation: "",
    whatsappMessage: "",
    placeholder: false,
  },
  {
    id: "polisombra-8x100",
    name: "Polisombra 8x100",
    category: "agricolas",
    description: "Malla polisombra para regular la luz y la temperatura en cultivos e invernaderos. Medida 8x100.",
    image: "assets/img/productos/polisombra-8x100.jpg",
    imageFit: "full",
    reference: "TGO-AG-008",
    presentation: "",
    whatsappMessage: "",
    placeholder: false,
  },

  /* ---------- Insumos Institucionales ---------- */
  {
    id: "quimicos-limpieza",
    name: "Químicos de limpieza industrial",
    category: "institucionales",
    description: "Productos químicos para la limpieza y desinfección de superficies en empresas, oficinas e instalaciones industriales.",
    image: "assets/img/productos/quimicos-limpieza.jpg",
    imageFit: "cover",
    reference: "TGO-IN-001",
    presentation: "",
    whatsappMessage: "",
    placeholder: false,
  },
  {
    id: "papeleria-gran-formato",
    name: "Papelería de gran formato",
    category: "institucionales",
    description: "Papel higiénico y toallas en rollos de gran formato para baños de alto tráfico en empresas e instituciones.",
    image: "assets/img/productos/papeleria-gran-formato.jpg",
    reference: "TGO-IN-002",
    presentation: "",
    whatsappMessage: "",
    placeholder: false,
  },
  {
    id: "bolsas-basura",
    name: "Bolsas de basura industriales",
    category: "institucionales",
    description: "Bolsas para la recolección y disposición de residuos en empresas, cultivos e instituciones.",
    image: "assets/img/productos/bolsas-basura.jpg",
    reference: "TGO-IN-003",
    presentation: "",
    whatsappMessage: "",
    placeholder: false,
  },
  {
    id: "dispensadores",
    name: "Dispensadores automáticos",
    category: "institucionales",
    description: "Dispensadores para jabón y gel antibacterial en baños y áreas comunes de empresas e instituciones.",
    image: "assets/img/productos/dispensadores.jpg",
    reference: "TGO-IN-004",
    presentation: "",
    whatsappMessage: "",
    placeholder: false,
  },
];
