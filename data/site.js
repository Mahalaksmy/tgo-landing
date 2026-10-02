/**
 * CONFIGURACIÓN CENTRAL: TGO S.A.S.
 * ------------------------------------------------------------------
 * Este es el ÚNICO lugar donde se configuran los datos de la empresa
 * y el número de WhatsApp. Todos los botones del sitio leen de aquí.
 *
 * Valores en `null` = información pendiente de TGO S.A.S.
 * (el sitio oculta automáticamente lo que esté en null).
 */
window.TGO = window.TGO || {};

TGO.site = {
  name: "TGO S.A.S.",
  shortName: "TGO",
  tagline: "Insumos de floristería y campo",
  description:
    "TGO S.A.S.: insumos de floristería y campo en La Unión, Antioquia, Colombia. Consulta disponibilidad por WhatsApp.",

  // Dominio público del sitio, p. ej. "https://www.ejemplo.com" (pendiente)
  url: null,

  address: {
    street: "Cr 9 Nro: 9 - 48 p.2",
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
    // Mensaje para los botones generales (header, hero, flotante, contacto)
    defaultMessage:
      "Hola, TGO S.A.S. Quisiera recibir información sobre sus insumos de floristería y campo.",
    // Plantilla para productos. Variables: {name} {reference} {presentation} {category}
    // Las líneas cuyo dato esté vacío se omiten automáticamente.
    productMessageTemplate: [
      "Hola, TGO S.A.S. Quisiera consultar por este producto:",
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
  // PENDIENTE: reemplazar por una foto real de TGO S.A.S. (local, equipo o productos).
  aboutImage: "assets/img/tema/hortensias-vivero.webp",
  aboutImageAlt: "Hortensias en flor en un vivero",

  // Pendientes de TGO S.A.S. (null = no se muestra)
  email: null,
  hours: null, // p. ej. "Lunes a sábado, 7:00 a.m. - 5:00 p.m."
  social: {
    instagram: null,
    facebook: null,
  },

  about: [
    "TGO S.A.S. es una empresa ubicada en La Unión, Antioquia, Colombia, especializada en insumos de floristería y campo.",
  ],
};
