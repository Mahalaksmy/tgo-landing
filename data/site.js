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
  tagline: "Insumos de floristería y campo",
  description:
    "Comercial TGO S.A.S.: insumos de floristería y campo en La Unión, Antioquia, Colombia. Consulta disponibilidad por WhatsApp.",

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
      "Hola, Comercial TGO S.A.S. Quisiera recibir información sobre sus insumos de floristería y campo.",
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

  // Pendientes de Comercial TGO S.A.S. (null = no se muestra)
  email: "comercialgtosas@gmail.com",
  hours: null, // p. ej. "Lunes a sábado, 7:00 a.m. - 5:00 p.m."
  // Redes sociales: poner la URL completa cuando el cliente la envíe.
  // Con url null el ícono se muestra sin enlace (pendiente). Para ocultar una red, borrarla de la lista.
  social: [
    { id: "instagram", name: "Instagram", url: null },
    { id: "facebook", name: "Facebook", url: null },
    { id: "tiktok", name: "TikTok", url: null },
  ],

  about: [
    "Comercial TGO S.A.S. es una empresa ubicada en La Unión, Antioquia, Colombia, especializada en insumos de floristería y campo.",
  ],
};
