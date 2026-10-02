/**
 * Catálogo: búsqueda + filtro por categoría + render.
 * Estado reflejado en la URL (?cat=…&q=…) para poder compartir una búsqueda.
 */
window.TGO = window.TGO || {};

TGO.catalog = (function () {
  const { normalize, debounce } = TGO.utils;
  const C = TGO.components;

  const state = { query: "", category: "all" };
  let els = {};

  function categoryById(id) {
    return TGO.categories.find((c) => c.id === id);
  }

  function searchableText(product) {
    const cat = categoryById(product.category);
    return normalize([product.name, product.reference, product.description, product.presentation, cat ? cat.name : ""].join(" "));
  }

  function filtered() {
    const terms = normalize(state.query).split(/\s+/).filter(Boolean);
    return TGO.products.filter((p) => {
      if (state.category !== "all" && p.category !== state.category) return false;
      if (!terms.length) return true;
      const text = searchableText(p);
      return terms.every((t) => text.includes(t));
    });
  }

  function countBy(categoryId) {
    return TGO.products.filter((p) => p.category === categoryId).length;
  }

  function renderCategories() {
    if (!els.categories) return;
    els.categories.innerHTML = TGO.categories.map((c) => C.categoryCard(c, countBy(c.id))).join("");
  }

  function renderChips() {
    const chips = [{ id: "all", name: "Todos" }].concat(TGO.categories);
    els.chips.innerHTML = chips
      .map(
        (c) =>
          '<button type="button" class="chip" data-category="' + TGO.utils.escapeHtml(c.id) + '" aria-pressed="' +
          (state.category === c.id) + '">' + TGO.utils.escapeHtml(c.name) + "</button>"
      )
      .join("");
  }

  function syncChips() {
    els.chips.querySelectorAll(".chip").forEach((chip) => {
      chip.setAttribute("aria-pressed", String(chip.dataset.category === state.category));
    });
  }

  function statusText(count) {
    let text = count === 1 ? "1 producto" : count + " productos";
    const cat = categoryById(state.category);
    if (cat) text += " en " + cat.name;
    if (state.query.trim()) text += " para “" + state.query.trim() + "”";
    return text;
  }

  function renderProducts() {
    const items = filtered();
    els.grid.innerHTML = items.map((p) => C.productCard(p, categoryById(p.category))).join("");
    els.grid.setAttribute("aria-busy", "false");
    els.status.textContent = statusText(items.length);
    els.empty.hidden = items.length > 0;
    els.grid.hidden = items.length === 0;
  }

  function syncUrl() {
    if (!window.history || !history.replaceState) return;
    const params = new URLSearchParams(location.search);
    state.category !== "all" ? params.set("cat", state.category) : params.delete("cat");
    state.query.trim() ? params.set("q", state.query.trim()) : params.delete("q");
    const qs = params.toString();
    history.replaceState(null, "", location.pathname + (qs ? "?" + qs : "") + location.hash);
  }

  function update() {
    syncChips();
    renderProducts();
    syncUrl();
  }

  function setCategory(id) {
    state.category = id === "all" || categoryById(id) ? id : "all";
    update();
  }

  function reset() {
    state.query = "";
    state.category = "all";
    if (els.search) els.search.value = "";
    update();
    (els.search || els.chips.querySelector(".chip")).focus();
  }

  function readUrl() {
    const params = new URLSearchParams(location.search);
    const cat = params.get("cat");
    if (cat && categoryById(cat)) state.category = cat;
    state.query = els.search ? params.get("q") || "" : ""; // sin buscador, se ignora ?q=
    if (els.search) els.search.value = state.query;
  }

  function init() {
    els = {
      categories: document.getElementById("category-list"),
      chips: document.getElementById("catalog-chips"),
      search: document.getElementById("catalog-search"),
      grid: document.getElementById("catalog-grid"),
      status: document.getElementById("catalog-status"),
      empty: document.getElementById("catalog-empty"),
      reset: document.getElementById("catalog-reset"),
      products: document.getElementById("productos"),
    };
    if (!els.grid) return;

    readUrl();
    renderCategories();
    renderChips();
    renderProducts();

    // El buscador es opcional: si existe #catalog-search en el HTML, se activa
    if (els.search) {
      els.search.addEventListener(
        "input",
        debounce(() => {
          state.query = els.search.value;
          update();
        }, 150)
      );
      els.search.closest("form").addEventListener("submit", (e) => e.preventDefault());
    }

    els.chips.addEventListener("click", (e) => {
      const chip = e.target.closest(".chip");
      if (chip) setCategory(chip.dataset.category);
    });

    if (els.categories) {
      els.categories.addEventListener("click", (e) => {
        const card = e.target.closest("button[data-category]");
        if (!card) return;
        setCategory(card.dataset.category);
        els.products.scrollIntoView({ behavior: TGO.prefersReducedMotion ? "auto" : "smooth", block: "start" });
        els.products.focus({ preventScroll: true });
      });
    }

    if (els.reset) els.reset.addEventListener("click", reset);
  }

  return { init, setCategory, reset, filtered, state };
})();
