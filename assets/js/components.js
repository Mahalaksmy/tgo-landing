/**
 * Componentes de presentación (plantillas HTML).
 * Reciben datos de data/*.js y devuelven strings HTML. No contienen datos propios.
 */
window.TGO = window.TGO || {};

(function () {
  const esc = (v) => TGO.utils.escapeHtml(v);

  /**
   * Icono desde el sprite de Phosphor Icons (Light) incluido en index.html (#ph-*).
   * Disponibles: whatsapp, search, pin, leaf, flower, handshake, clock, mail, external, arrow, plant, lotus
   */
  function icon(name, cls) {
    return '<svg class="icon ' + (cls || "") + '" aria-hidden="true" focusable="false"><use href="#ph-' + esc(name) + '"/></svg>';
  }

  function placeholderBadge() {
    return '<span class="badge badge--placeholder" title="Contenido de ejemplo pendiente de Comercial TGO S.A.S.">Ejemplo</span>';
  }

  /** Botón de WhatsApp con icono anidado ("button-in-button"). */
  function waButton(opts) {
    const o = Object.assign({ label: "Escríbenos", message: null, size: "", block: false, ariaLabel: "" }, opts);
    const cls = ["btn", "btn--wa", o.size ? "btn--" + o.size : "", o.block ? "btn--block" : ""].filter(Boolean).join(" ");
    const aria = o.ariaLabel ? ' aria-label="' + esc(o.ariaLabel) + '"' : "";
    return (
      '<a class="' + cls + '" href="' + esc(TGO.whatsapp.buildUrl(o.message)) + '" target="_blank" rel="noopener noreferrer"' + aria + ">" +
      "<span>" + esc(o.label) + '</span><span class="btn__icon">' + icon("whatsapp") + "</span></a>"
    );
  }

  /** Tile de categoría para el bento del hero. Al hacer clic filtra el catálogo. */
  function categoryCard(category, count) {
    const photo = category.image
      ? '<img class="tile__bg" src="' + esc(category.image) + '" alt="" width="992" height="660" decoding="async" fetchpriority="high">'
      : "";
    return (
      '<li class="bento-tile bento-tile--category"><button type="button" class="tile' + (photo ? " tile--photo" : "") + '" data-category="' + esc(category.id) + '">' +
      photo +
      '<span class="tile__icon">' + icon(category.id === "campo" ? "plant" : "flower") + "</span>" +
      '<span class="tile__body">' +
      '<span class="tile__name">' + esc(category.name) + "</span>" +
      '<span class="tile__meta">' + count + (count === 1 ? " producto" : " productos") + "</span>" +
      "</span>" +
      '<span class="tile__go">' + icon("arrow") + "</span>" +
      "</button></li>"
    );
  }

  function productCard(product, category) {
    const img = product.image || "assets/img/placeholder-product.svg";
    const alt = product.image ? product.name : "";
    const details = [
      product.reference ? "<div><dt>Ref.</dt><dd>" + esc(product.reference) + "</dd></div>" : "",
      product.presentation ? "<div><dt>Presentación</dt><dd>" + esc(product.presentation) + "</dd></div>" : "",
    ].join("");

    return (
      '<li class="product-card' + (product.placeholder ? " is-placeholder" : "") + '">' +
      '<div class="bezel"><div class="bezel__core">' +
      '<div class="product-card__media">' +
      '<img src="' + esc(img) + '" alt="' + esc(alt) + '" width="400" height="300" loading="lazy" decoding="async" ' +
      "onerror=\"this.onerror=null;this.src='assets/img/placeholder-product.svg';this.alt='';\">" +
      '<div class="product-card__tags">' +
      (category ? '<span class="badge">' + esc(category.name) + "</span>" : "") +
      (product.placeholder ? placeholderBadge() : "") +
      "</div>" +
      "</div>" +
      '<div class="product-card__body">' +
      '<h3 class="product-card__title">' + esc(product.name) + "</h3>" +
      (details ? '<dl class="product-card__meta">' + details + "</dl>" : "") +
      (product.description ? '<p class="product-card__desc">' + esc(product.description) + "</p>" : "") +
      '<div class="product-card__cta">' +
      waButton({
        message: TGO.whatsapp.productMessage(product),
        size: "sm",
        block: true,
        ariaLabel: "Escríbenos por WhatsApp sobre: " + product.name,
      }) +
      "</div></div></div></div></li>"
    );
  }

  /** Elemento de la marquesina de proveedores: solo el logo (nombre en alt). Sin logo → nombre en texto. */
  function providerCard(provider, hidden) {
    const inner = provider.logo
      ? '<img src="' + esc(provider.logo) + '" alt="' + (hidden ? "" : esc(provider.name)) + '" width="160" height="64" loading="lazy" decoding="async">'
      : '<span class="logo-chip__name">' + esc(provider.name) + "</span>";
    const badge = provider.placeholder ? placeholderBadge() : "";
    const ext = provider.website ? icon("external", "logo-chip__ext") : "";
    const content = inner + badge + ext;
    const hiddenAttr = hidden ? ' aria-hidden="true"' : "";

    if (provider.website) {
      return (
        "<li" + hiddenAttr + '><a class="logo-chip" href="' + esc(provider.website) + '" target="_blank" rel="noopener noreferrer"' +
        (hidden ? ' tabindex="-1"' : "") + ">" + content +
        (hidden ? "" : '<span class="sr-only"> (sitio web, abre en una pestaña nueva)</span>') + "</a></li>"
      );
    }
    return "<li" + hiddenAttr + '><div class="logo-chip">' + content + "</div></li>";
  }

  function valueCard(value) {
    return (
      '<li class="value-tile' + (value.placeholder ? " is-placeholder" : "") + '">' +
      '<div class="bezel"><div class="bezel__core value-tile__core">' +
      '<span class="value-tile__icon">' + icon(value.icon || "leaf") + "</span>" +
      '<div><h4 class="value-tile__title">' + esc(value.title) + (value.placeholder ? " " + placeholderBadge() : "") + "</h4>" +
      '<p class="value-tile__desc">' + esc(value.description) + "</p></div>" +
      "</div></div></li>"
    );
  }

  /** Ícono de red social: enlace si hay URL; si no, ícono sin enlace (pendiente). */
  function socialLink(network) {
    const label = esc(network.name);
    if (network.url) {
      return (
        '<li><a class="footer-social__link" href="' + esc(network.url) + '" target="_blank" rel="noopener noreferrer" aria-label="' + label +
        ' (abre en una pestaña nueva)">' + icon(network.id) + "</a></li>"
      );
    }
    return '<li><span class="footer-social__link is-pending" title="' + label + ' (enlace pendiente)">' + icon(network.id) +
      '<span class="sr-only">' + label + " (enlace pendiente)</span></span></li>";
  }

  TGO.components = { icon, placeholderBadge, waButton, categoryCard, productCard, providerCard, valueCard, socialLink };
})();
