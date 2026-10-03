/**
 * PROVEEDORES / MARCAS
 * Logos: guardarlos en la carpeta /Logos (PNG o SVG, idealmente con fondo transparente)
 * y referenciarlos como "Logos/NombreArchivo.png".
 * ⚠️ Los que tienen placeholder: true son de ejemplo y se marcan como "Ejemplo".
 * Campos:
 *   id          string  único
 *   name        string  nombre del proveedor
 *   logo        string  ruta (assets/img/proveedores/…) o URL. "" → logo placeholder
 *   website     string  opcional. "" → la tarjeta no es un enlace
 *   placeholder boolean true = se marca visualmente como "Ejemplo"
 */
window.TGO = window.TGO || {};

TGO.providers = [
  { id: "triton", name: "Triton", logo: "Logos/Triton.png", website: "", placeholder: false },
  { id: "tesicol", name: "Tesicol", logo: "Logos/Tesicol.png", website: "", placeholder: false },
  { id: "prov-003", name: "[Proveedor 3]", logo: "", website: "", placeholder: true },
  { id: "prov-004", name: "[Proveedor 4]", logo: "", website: "", placeholder: true },
];
