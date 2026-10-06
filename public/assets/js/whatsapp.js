/**
 * WhatsApp: único punto donde se construyen los enlaces.
 * Lee el número y los mensajes de data/site.js (TGO.site.whatsapp).
 */
window.TGO = window.TGO || {};

TGO.whatsapp = {
  /** Número limpio: solo dígitos. */
  number() {
    return String(TGO.site.whatsapp.number || "").replace(/\D/g, "");
  },

  /** https://wa.me/[WHATSAPP]?text=[MENSAJE_CODIFICADO] */
  buildUrl(message) {
    const text = message || TGO.site.whatsapp.defaultMessage;
    return "https://wa.me/" + this.number() + "?text=" + encodeURIComponent(text);
  },

  /** Mensaje para un producto: usa product.whatsappMessage o la plantilla de site.js. */
  productMessage(product) {
    if (product.whatsappMessage && product.whatsappMessage.trim()) {
      return product.whatsappMessage.trim();
    }
    const category = (TGO.categories || []).find((c) => c.id === product.category);
    const vars = {
      name: product.name,
      reference: product.reference,
      presentation: product.presentation,
      category: category ? category.name : "",
    };
    return TGO.site.whatsapp.productMessageTemplate
      .map((line) => {
        let skip = false;
        const filled = line.replace(/\{(\w+)\}/g, (_, key) => {
          const value = vars[key] == null ? "" : String(vars[key]).trim();
          if (!value) skip = true;
          return value;
        });
        return skip ? null : filled;
      })
      .filter(Boolean)
      .join("\n");
  },

  productUrl(product) {
    return this.buildUrl(this.productMessage(product));
  },

  /**
   * Hidrata todos los elementos con [data-wa] en `root`.
   * data-wa=""              → mensaje por defecto
   * data-wa="texto libre"   → ese mensaje
   */
  hydrate(root) {
    (root || document).querySelectorAll("a[data-wa]").forEach((link) => {
      const custom = link.getAttribute("data-wa");
      link.href = this.buildUrl(custom && custom.trim() ? custom : null);
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });
  },
};
