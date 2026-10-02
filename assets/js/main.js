/**
 * Arranque: hidrata la configuración, renderiza secciones, navegación y SEO.
 */
(function () {
  const site = TGO.site;
  const C = TGO.components;
  const { escapeHtml: esc, formatAddress } = TGO.utils;

  TGO.prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Datos de empresa en el HTML ([data-bind]) ---------- */
  function bindSiteData() {
    const values = {
      name: site.name,
      tagline: site.tagline,
      address: formatAddress(site.address),
      street: site.address.street,
      cityRegion: site.address.city + ", " + site.address.region,
      cityName: site.address.city,
      country: site.address.country,
      whatsappDisplay: site.whatsapp.display,
      year: String(new Date().getFullYear()),
    };
    document.querySelectorAll("[data-bind]").forEach((el) => {
      const key = el.getAttribute("data-bind");
      if (values[key] != null) el.textContent = values[key];
    });

    // Datos opcionales: se muestran solo si existen en site.js
    const optional = { hours: site.hours, email: site.email };
    document.querySelectorAll("[data-optional]").forEach((el) => {
      const key = el.getAttribute("data-optional");
      const value = optional[key];
      if (!value) return;
      const target = el.querySelector("[data-value]");
      if (key === "email") {
        target.innerHTML = '<a href="mailto:' + esc(value) + '">' + esc(value) + "</a>";
      } else {
        target.textContent = value;
      }
      el.hidden = false;
    });
  }

  /* ---------- Logo (si se configuró) ---------- */
  function renderLogo() {
    if (!site.logo) return;
    document.querySelectorAll("[data-logo]").forEach((el) => {
      const fallback = el.innerHTML;
      const img = new Image(site.logoWidth || undefined, site.logoHeight || undefined);
      img.src = site.logo;
      img.alt = site.logoAlt || site.name;
      img.className = "brand__logo";
      img.decoding = "async";
      img.onerror = () => (el.innerHTML = fallback); // si el archivo no existe, vuelve al nombre en texto
      el.innerHTML = "";
      el.appendChild(img);
    });
  }

  /* ---------- Bento del hero: tile de WhatsApp + foto opcional (site.heroImage) ---------- */
  function renderHeroBento() {
    const list = document.getElementById("category-list");
    if (!list) return;
    list.insertAdjacentHTML("beforeend", C.whatsappTile());
    if (site.heroImage) {
      list.insertAdjacentHTML(
        "afterbegin",
        '<li class="bento-tile bento-tile--photo"><img src="' + esc(site.heroImage) + '" alt="' + esc(site.name) +
          '" width="640" height="560" fetchpriority="high"></li>'
      );
    }
  }

  /* ---------- Mapa ---------- */
  function renderMap() {
    const query = encodeURIComponent(formatAddress(site.address));
    const directions = document.getElementById("map-directions");
    if (directions) directions.href = "https://www.google.com/maps/search/?api=1&query=" + query;
    const frame = document.getElementById("map-frame");
    if (frame) frame.src = "https://maps.google.com/maps?q=" + query + "&z=16&output=embed";
  }

  /* ---------- Secciones con datos ---------- */
  function renderValues() {
    const list = document.getElementById("values-list");
    if (list) list.innerHTML = TGO.values.map(C.valueCard).join("");
  }

  function renderProviders() {
    const list = document.getElementById("providers-list");
    if (!list) return;
    if (!TGO.providers.length) {
      document.getElementById("proveedores").hidden = true;
      return;
    }
    // Marquesina: la lista se repite una vez (copia oculta para lectores de pantalla) para un bucle continuo
    list.innerHTML =
      TGO.providers.map((p) => C.providerCard(p, false)).join("") +
      TGO.providers.map((p) => C.providerCard(p, true)).join("");
  }

  function renderAbout() {
    const box = document.getElementById("about-text");
    if (box && site.about && site.about.length) {
      box.innerHTML = site.about.map((p) => "<p>" + esc(p) + "</p>").join("");
    }
    // Etiquetas-resumen con datos reales: categorías + ubicación
    const chips = document.getElementById("about-chips");
    if (chips) {
      const items = TGO.categories.map((c) => ({ icon: c.id === "campo" ? "plant" : "flower", text: c.name }));
      items.push({ icon: "pin", text: site.address.city + ", " + site.address.region });
      chips.innerHTML = items.map((i) => "<li>" + C.icon(i.icon) + "<span>" + esc(i.text) + "</span></li>").join("");
    }
    // Foto de ambiente opcional (site.aboutImage): ocupa toda la tarjeta con un velo verde
    const card = document.querySelector(".about-card");
    if (card && site.aboutImage) {
      card.classList.add("has-photo");
      card.insertAdjacentHTML(
        "afterbegin",
        '<img class="about-card__bg" src="' + esc(site.aboutImage) + '" alt="' + esc(site.aboutImageAlt || "") +
          '" width="992" height="633" loading="lazy" decoding="async">'
      );
    }
  }

  /* ---------- Navegación: isla flotante + menú overlay ---------- */
  function initNav() {
    const header = document.querySelector(".site-header");
    const toggle = document.getElementById("nav-toggle");
    const menu = document.getElementById("site-menu");
    const nav = document.getElementById("site-nav");

    // El menú existe oculto (hidden) sin JS; con JS se controla con clase + inert para poder animarlo
    menu.hidden = false;
    menu.inert = true;

    const close = (restoreFocus) => {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menú");
      menu.classList.remove("is-open");
      menu.inert = true;
      document.body.classList.remove("nav-open");
      if (restoreFocus) toggle.focus();
    };
    const open = () => {
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Cerrar menú");
      menu.inert = false;
      menu.classList.add("is-open");
      document.body.classList.add("nav-open");
      const first = menu.querySelector("a");
      if (first) first.focus({ preventScroll: true });
    };

    toggle.addEventListener("click", () => (toggle.getAttribute("aria-expanded") === "true" ? close(false) : open()));
    menu.addEventListener("click", (e) => {
      if (e.target.closest("a")) close(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("is-open")) close(true);
    });
    window.matchMedia("(min-width: 960px)").addEventListener("change", (e) => {
      if (e.matches) close(false);
    });

    // Sombra del header: un centinela en el tope de la página (sin listeners de scroll)
    const sentinel = document.getElementById("top-sentinel");
    if (sentinel && "IntersectionObserver" in window) {
      new IntersectionObserver(([entry]) => header.classList.toggle("is-scrolled", !entry.isIntersecting)).observe(sentinel);
    }

    // Enlace activo según la sección que cruza la franja central del viewport
    if (!("IntersectionObserver" in window)) return;
    const links = Array.from(nav.querySelectorAll('a[href^="#"]'));
    const setCurrent = (id) => {
      links.forEach((a) => {
        if (a.getAttribute("href") === "#" + id) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    };
    const sectionObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setCurrent(entry.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    document.querySelectorAll("main > section[id]").forEach((section) => sectionObserver.observe(section));
    // Al llegar al footer, la última sección (Contacto) queda activa
    const footer = document.querySelector(".site-footer");
    const lastId = document.querySelector("main > section[id]:last-of-type").id;
    new IntersectionObserver(([entry]) => entry.isIntersecting && setCurrent(lastId), { threshold: 0.3 }).observe(footer);
  }

  /* ---------- SEO: datos estructurados ---------- */
  function injectJsonLd() {
    const data = {
      "@context": "https://schema.org",
      "@type": "Store",
      name: site.name,
      description: site.description,
      telephone: "+" + TGO.whatsapp.number(),
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        addressLocality: site.address.city,
        addressRegion: site.address.region,
        addressCountry: site.address.countryCode,
      },
    };
    if (site.url) data.url = site.url;
    if (site.email) data.email = site.email;
    if (site.logo && site.url) data.logo = site.url.replace(/\/$/, "") + "/" + site.logo;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  function init() {
    bindSiteData();
    renderLogo();
    renderAbout();
    renderValues();
    renderProviders();
    TGO.catalog.init();
    renderHeroBento();
    TGO.whatsapp.hydrate(document);
    renderMap();
    initNav();
    injectJsonLd();
    document.documentElement.classList.add("js-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
