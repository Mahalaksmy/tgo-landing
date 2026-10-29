import { site } from "../data/site.js";
import { products } from "../data/products.js";
import { BRANCHES } from "../data/branches.js";

export const waUrl = (message) =>
  "https://wa.me/" + site.whatsapp.number + "?text=" + encodeURIComponent(message || site.whatsapp.defaultMessage);

/* Mensaje de WhatsApp por producto: las líneas con datos vacíos se omiten */
export function productMessage(product, categoryName) {
  const vars = { name: product.name, reference: product.reference, presentation: product.presentation, category: categoryName };
  return site.whatsapp.productMessageTemplate
    .map((line) => {
      let skip = false;
      const filled = line.replace(/\{(\w+)\}/g, (_, k) => {
        const v = (vars[k] || "").trim();
        if (!v) skip = true;
        return v;
      });
      return skip ? null : filled;
    })
    .filter(Boolean)
    .join("\n");
}

export const productsOf = (categoryId) => products.filter((p) => p.category === categoryId);

export const mapsUrl = () => {
  const a = site.address;
  return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent([a.street, a.city, a.region, a.country].join(", "));
};

export const prefersReducedMotion = () =>
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Transición de colores compartida (cambio de tema) */
export const T = "transition-colors duration-500 ease-in-out";

/* Nombre visible de cada categoría (Insumos Agrícolas / Insumos Institucionales) */
export const categoryLabel = (categoryId) =>
  (Object.values(BRANCHES).find((b) => b.category === categoryId) || {}).label || "";

/* Mensaje de WhatsApp con todos los productos de la lista de cotización */
export function quoteListMessage(items) {
  const lines = items.map((p) => "• " + p.name + (p.reference ? " (Ref. " + p.reference + ")" : "") + " - " + categoryLabel(p.category));
  return [
    "Hola, Comercial TGO S.A.S. Quisiera cotizar estos productos:",
    ...lines,
    "Cantidad aproximada y lugar de entrega: ",
    "¿Me pueden informar disponibilidad y precio? Gracias.",
  ].join("\n");
}
