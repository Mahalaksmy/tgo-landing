/**
 * Productos: pestañas por categoría (patrón WAI-ARIA "Tabs").
 * - Una pestaña por categoría de data/categories.js; su id es el id de la categoría
 *   (#agricolas, #institucionales), así los enlaces del menú y del hero abren la pestaña.
 * - El hash de la URL refleja la pestaña activa para poder compartirla.
 * - Buscador opcional: si existe #catalog-search en el HTML, filtra dentro de la pestaña.
 */
window.TGO = window.TGO || {};

TGO.catalog = (function () {
  const { normalize, debounce, escapeHtml: esc } = TGO.utils;
  const C = TGO.components;

  const state = { query: "", category: null };
  let els = {};

  const categoryById = (id) => TGO.categories.find((c) => c.id === id);
  const countBy = (id) => TGO.products.filter((p) => p.category === id).length;

  function searchableText(product) {
    const cat = categoryById(product.category);
    return normalize([product.name, product.reference, product.description, product.presentation, cat ? cat.name : ""].join(" "));
  }

  function filtered() {
    const terms = normalize(state.query).split(/\s+/).filter(Boolean);
    return TGO.products.filter((p) => {
      if (p.category !== state.category) return false;
      if (!terms.length) return true;
      const text = searchableText(p);
      return terms.every((t) => text.includes(t));
    });
  }

  /* ---------- Pestañas ---------- */
  function renderTabs() {
    els.tabs.innerHTML = TGO.categories
      .map(
        (c) =>
          '<button type="button" role="tab" class="tab" id="' + esc(c.id) + '" aria-controls="product-panel" ' +
          'aria-selected="false" tabindex="-1">' +
          C.icon(c.icon || "leaf", "tab__icon") +
          '<span class="tab__label">' + esc(c.name) + "</span>" +
          '<span class="tab__count">' + countBy(c.id) + "</span></button>"
      )
      .join("");
  }

  function syncTabs() {
    els.tabs.querySelectorAll('[role="tab"]').forEach((tab) => {
      const active = tab.id === state.category;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    els.panel.setAttribute("aria-labelledby", state.category);
    // Enlaces del menú/footer que apuntan a una pestaña
    // Si el menú está marcando la sección de productos, mover la marca a la pestaña activa
    const nav = document.getElementById("site-nav");
    if (nav && nav.querySelector("[data-tab-link][aria-current]")) {
      nav.querySelectorAll("[data-tab-link]").forEach((a) => {
        if (a.dataset.tabLink === state.category) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    }
  }

  function renderProducts() {
    const items = filtered();
    const cat = categoryById(state.category);
    els.grid.innerHTML = items.map((p) => C.productCard(p, cat)).join("");
    els.grid.setAttribute("aria-busy", "false");
    let text = (items.length === 1 ? "1 producto" : items.length + " productos") + (cat ? " en " + cat.name : "");
    if (state.query.trim()) text += " para “" + state.query.trim() + "”";
    els.status.textContent = text;
    els.empty.hidden = items.length > 0;
    els.grid.hidden = items.length === 0;
  }

  function syncUrl() {
    if (!window.history || !history.replaceState) return;
    const url = location.pathname + location.search.replace(/([?&])cat=[^&]*&?/, "$1").replace(/[?&]$/, "") + "#" + state.category;
    history.replaceState(null, "", url);
  }

  /** Activa una pestaña. options: { scroll, focus, updateUrl } */
  function setCategory(id, options) {
    const o = Object.assign({ scroll: false, focus: false, updateUrl: true }, options);
    if (!categoryById(id)) return false;
    state.category = id;
    syncTabs();
    renderProducts();
    if (o.updateUrl) syncUrl();
    if (o.scroll) {
      document.getElementById("productos").scrollIntoView({ behavior: TGO.prefersReducedMotion ? "auto" : "smooth", block: "start" });
    }
    if (o.focus) document.getElementById(id).focus({ preventScroll: true });
    return true;
  }

  /** Lee la pestaña inicial: #agricolas / #institucionales, o ?cat= (enlaces antiguos) */
  function categoryFromUrl() {
    const hash = decodeURIComponent(location.hash.replace("#", ""));
    if (categoryById(hash)) return hash;
    const legacy = new URLSearchParams(location.search).get("cat");
    if (categoryById(legacy)) return legacy;
    return null;
  }

  function init() {
    els = {
      tabs: document.getElementById("product-tabs"),
      panel: document.getElementById("product-panel"),
      grid: document.getElementById("catalog-grid"),
      status: document.getElementById("catalog-status"),
      empty: document.getElementById("catalog-empty"),
      search: document.getElementById("catalog-search"),
      heroTiles: document.getElementById("category-list"),
    };
    if (!els.tabs || !els.grid || !TGO.categories.length) return;

    renderTabs();

    // Tiles del hero (tarjetas de categoría)
    if (els.heroTiles) {
      els.heroTiles.innerHTML = TGO.categories.map((c) => C.categoryCard(c, countBy(c.id))).join("");
      els.heroTiles.addEventListener("click", (e) => {
        const tile = e.target.closest("button[data-category]");
        if (tile) setCategory(tile.dataset.category, { scroll: true, focus: true });
      });
    }

    const fromUrl = categoryFromUrl();
    setCategory(fromUrl || TGO.categories[0].id, { updateUrl: !!fromUrl });

    // Clic en pestaña
    els.tabs.addEventListener("click", (e) => {
      const tab = e.target.closest('[role="tab"]');
      if (tab) setCategory(tab.id);
    });

    // Teclado: flechas, Inicio y Fin (activación automática)
    els.tabs.addEventListener("keydown", (e) => {
      const tabs = Array.from(els.tabs.querySelectorAll('[role="tab"]'));
      const i = tabs.findIndex((t) => t.id === state.category);
      let next = null;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next = tabs[(i + 1) % tabs.length];
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = tabs[(i - 1 + tabs.length) % tabs.length];
      else if (e.key === "Home") next = tabs[0];
      else if (e.key === "End") next = tabs[tabs.length - 1];
      if (!next) return;
      e.preventDefault();
      setCategory(next.id, { focus: true });
    });

    // Enlaces del menú/footer (#agricolas, #institucionales) y cambios de hash
    document.addEventListener("click", (e) => {
      const link = e.target.closest("a[data-tab-link]");
      if (!link) return;
      e.preventDefault();
      setCategory(link.dataset.tabLink, { scroll: true });
    });
    window.addEventListener("hashchange", () => {
      const id = categoryFromUrl();
      if (id && id !== state.category) setCategory(id, { scroll: true, updateUrl: false });
    });

    // Buscador opcional
    if (els.search) {
      els.search.addEventListener(
        "input",
        debounce(() => {
          state.query = els.search.value;
          renderProducts();
        }, 150)
      );
      els.search.closest("form").addEventListener("submit", (e) => e.preventDefault());
    }

    // Si la página abrió con #agricolas / #institucionales, bajar a la sección
    if (fromUrl && location.hash) {
      requestAnimationFrame(() => document.getElementById("productos").scrollIntoView({ block: "start" }));
    }
  }

  return { init, setCategory, filtered, state };
})();
