/**
 * CONFIGURACIÓN CENTRAL: Comercial TGO S.A.S.
 * ------------------------------------------------------------------
 * Este es el ÚNICO lugar donde se configuran los datos de la empresa
 * y el número de WhatsApp. Todos los botones del sitio leen de aquí.
 *
 * Valores en `null` = información pendiente de Comercial TGO S.A.S.
 * (el sitio oculta automáticamente lo que esté en null).
 */
window.TGO = window.TGO || {};

TGO.site = {
  name: "Comercial TGO S.A.S.",
  shortName: "TGO",
  nit: "902096153",
  tagline: "Insumos agrícolas e institucionales",
  description:
    "Comercial TGO S.A.S.: insumos agrícolas e institucionales en La Unión, Antioquia, Colombia. Consulta disponibilidad por WhatsApp.",

  // Dominio público del sitio, p. ej. "https://www.ejemplo.com" (pendiente)
  url: null,

  address: {
    street: "Cra 9 # 11 - 48, segundo piso",
    city: "La Unión",
    region: "Antioquia",
    country: "Colombia",
    countryCode: "CO",
  },

  whatsapp: {
    // Solo dígitos, con indicativo de país (57 = Colombia). Sin "+", espacios ni guiones.
    number: "573117145443",
    // Cómo se muestra el número en pantalla
    display: "+57 311 714 5443",
    // true = el mismo número recibe llamadas (muestra el enlace "Llamar")
    acceptsCalls: true,
    // Mensaje para los botones generales (header, hero, flotante, contacto)
    defaultMessage:
      "Hola, Comercial TGO S.A.S. Quisiera recibir información sobre sus insumos agrícolas e institucionales.",
    // Plantilla para productos. Variables: {name} {reference} {presentation} {category}
    // Las líneas cuyo dato esté vacío se omiten automáticamente.
    productMessageTemplate: [
      "Hola, Comercial TGO S.A.S. Quisiera consultar por este producto:",
      "• Producto: {name}",
      "• Referencia: {reference}",
      "• Presentación: {presentation}",
      "• Categoría: {category}",
      "¿Me pueden informar disponibilidad y precio? Gracias.",
    ],
  },

  // Logo oficial (PNG transparente 307×107). null = se muestra el nombre como texto.
  logo: "assets/img/logo.png",
  logoAlt: "Comercial TGO S.A.S.",
  logoWidth: 307,
  logoHeight: 107,
  // Foto adicional para el bento del hero (opcional). null = sin foto.
  heroImage: null,

  // Foto de ambiente para la tarjeta "Nosotros". null = sin foto.
  // PENDIENTE: reemplazar por una foto real de Comercial TGO S.A.S. (local, equipo o productos).
  aboutImage: "assets/img/tema/hortensias-vivero.webp",
  aboutImageAlt: "Hortensias en flor en un vivero",

  email: "comercialtgosas@gmail.com",
  hours: "Lunes a sábado, 8:00 a.m. - 6:00 p.m.",
  // Para datos estructurados (Google): formato schema.org
  openingHours: "Mo-Sa 08:00-18:00",

  // Redes sociales. La empresa aún no tiene; cuando existan, agregar por ejemplo:
  //   { id: "instagram", name: "Instagram", url: "https://instagram.com/usuario" },
  //   { id: "facebook",  name: "Facebook",  url: "https://facebook.com/pagina" },
  //   { id: "tiktok",    name: "TikTok",    url: "https://tiktok.com/@usuario" },
  // Lista vacía = el bloque de redes no se muestra.
  social: [],

  about: [
    "Somos especialistas en la provisión e integración de insumos agrícolas para la floricultura y diversos sectores del campo. Garantizamos la protección, hidratación y adecuado empaque de sus productos mediante un amplio portafolio técnico que abarca mallas polisombra, materiales de poscosecha y sistemas de adecuación. Acompañamos a productores y comercializadores con soluciones de alta eficiencia.",
  ],
};
