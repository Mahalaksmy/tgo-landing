import { site } from "../data/site.js";
import { products } from "../data/products.js";

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
