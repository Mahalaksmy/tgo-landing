/* Utilidades genéricas */
window.TGO = window.TGO || {};

TGO.utils = {
  /** Escapa texto para insertarlo de forma segura en HTML. */
  escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  },

  /** Minúsculas y sin tildes, para búsquedas tolerantes. */
  normalize(value) {
    return String(value == null ? "" : value)
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .trim();
  },

  debounce(fn, wait) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), wait);
    };
  },

  /** Dirección en una línea a partir de data/site.js */
  formatAddress(address) {
    return [address.street, address.city, address.region, address.country].filter(Boolean).join(", ");
  },
};
