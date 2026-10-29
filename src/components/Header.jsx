import { useEffect, useRef, useState } from "react";
import { site } from "../data/site.js";
import Icon from "./Icon.jsx";
import WhatsAppMark from "./WhatsAppMark.jsx";
import { waUrl, T } from "../lib/utils.js";

/* Header fijo: franja superior en el color de la vista + barra blanca a todo el ancho.
   Escritorio (≥1024 px): enlaces centrados y botones a la derecha. Móvil: hamburguesa con menú a pantalla completa. */
const CTA = "Solicita tu cotización";
/* Botón WhatsApp: píldora verde con degradado (texto blanco con contraste suficiente) */
const WA_BTN = "bg-[linear-gradient(135deg,#128C4A_0%,#0B6B3A_100%)] shadow-[0_10px_24px_-10px_rgb(18_140_74/.7),inset_0_1px_0_rgb(255_255_255/.18)] transition-[filter,transform] duration-300 hover:brightness-110 active:scale-[.98]";

export default function Header({ view, onNavigate, onScrollTo }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const burgerRef = useRef(null);

  const items = [
    { label: "Inicio", active: view === "home", go: () => onNavigate("home") },
    { label: "Agrícolas", active: view === "agriculture", go: () => onNavigate("agriculture") },
    { label: "Institucionales", active: view === "organizational", go: () => onNavigate("organizational") },
    { label: "Nosotros", go: () => onNavigate("home", "nosotros") },
    { label: "Contacto", go: () => onScrollTo("contacto") },
  ];
  const run = (fn) => { setOpen(false); fn(); };

  /* Menú móvil: bloquea el scroll, mueve el foco y se cierra con Esc */
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector("button, a")?.focus();
    const onKey = (e) => { if (e.key === "Escape") { setOpen(false); burgerRef.current?.focus(); } };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open]);

  const quoteUrl = waUrl(site.whatsapp.quoteMessage);
  const focusRing = "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30";

  return (
    <header className="fixed inset-x-0 top-0 z-40 pt-[env(safe-area-inset-top,0px)]">
      {/* Franja superior */}
      <div className={`flex h-8 items-center justify-center gap-2.5 bg-primary px-4 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-primary-fg ${T} sm:h-9 sm:text-xs`}>
        <span className="hidden sm:inline">{site.address.city}, {site.address.region}</span>
        <span aria-hidden="true" className="hidden opacity-60 sm:inline">·</span>
        <span className="hidden md:inline">Lunes a sábado 8 a.m. - 6 p.m.</span>
        <span aria-hidden="true" className="hidden opacity-60 md:inline">·</span>
        <a href={quoteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-full items-center gap-1.5 px-2 underline-offset-4 hover:underline">
          {CTA}<Icon name="external" className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* Barra */}
      <div className={`border-b border-line/10 bg-surface ${T}`}>
        <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto] items-center px-4 sm:px-6 lg:h-[4.5rem] lg:grid-cols-[1fr_auto_1fr] lg:px-8">
          <button type="button" onClick={() => run(() => onNavigate("home"))} aria-label={site.name + ", inicio"}
            className={`justify-self-start rounded-md ${focusRing}`}>
            <img src={site.logo} alt={site.name} width="307" height="107" className="h-8 w-auto lg:h-9" />
          </button>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {items.map((it) => (
                <li key={it.label}>
                  <button type="button" onClick={it.go} aria-current={it.active ? "page" : undefined}
                    className={`relative py-2 text-[0.9375rem] font-medium ${T} rounded-sm ${focusRing}
                      ${it.active ? "text-primary" : "text-ink hover:text-primary"}`}>
                    {it.label}
                    {it.active && <span aria-hidden="true" className={`absolute -bottom-1 left-1/2 h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-primary ${T}`} />}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5 justify-self-end">
            <a href={"tel:+" + site.whatsapp.number}
              className={`hidden h-10 items-center rounded-md bg-ink/[.05] px-4 text-sm font-medium ${T} hover:bg-ink/10 xl:inline-flex ${focusRing}`}>
              Llamar
            </a>
            <a href={waUrl()} target="_blank" rel="noopener noreferrer" aria-label="Escríbenos por WhatsApp"
              className={`hidden h-[2.875rem] items-center gap-2.5 rounded-full pl-[7px] pr-[22px] text-[0.9375rem] font-semibold tracking-[0.01em] text-white
                ${WA_BTN} sm:inline-flex ${focusRing}`}>
              <WhatsAppMark light className="h-8 w-8 drop-shadow-sm" />
              WhatsApp
            </a>
            <button ref={burgerRef} type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className={`grid h-11 w-11 content-center justify-items-end gap-1.5 rounded-md lg:hidden ${focusRing}`}>
              <span className={`block h-0.5 rounded-full bg-ink transition-all duration-300 ${open ? "w-7 translate-y-2 rotate-45" : "w-8"}`} />
              <span className={`block h-0.5 w-6 rounded-full bg-ink/25 transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 rounded-full transition-all duration-300 ${open ? "w-7 -translate-y-2 -rotate-45 bg-ink" : "w-6 bg-ink/25"}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil a pantalla completa */}
      <div id="mobile-menu" ref={menuRef} inert={open ? undefined : ""} aria-hidden={!open}
        className={`fixed inset-x-0 bottom-0 top-[calc(env(safe-area-inset-top,0px)+6rem)] flex flex-col overflow-y-auto bg-surface px-5 pb-[calc(env(safe-area-inset-bottom,0px)+1.5rem)] pt-4
          transition-[opacity,transform] duration-300 sm:top-[calc(env(safe-area-inset-top,0px)+6.25rem)] lg:hidden
          ${open ? "opacity-100" : "pointer-events-none -translate-y-2 opacity-0"}`}>
        <nav aria-label="Menú móvil">
          <ul>
            {items.map((it) => (
              <li key={it.label} className="border-b border-line/10">
                <button type="button" onClick={() => run(it.go)} aria-current={it.active ? "page" : undefined}
                  className={`flex w-full items-center justify-between py-3.5 text-left font-display text-[1.875rem] font-semibold tracking-[-0.02em] ${T}
                    ${it.active ? "text-primary" : "text-ink"} ${focusRing}`}>
                  {it.label}
                  <Icon name="arrow" className="h-5 w-5" />
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <a href={waUrl()} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} aria-label="Escríbenos por WhatsApp"
          className={`mt-6 inline-flex h-14 items-center justify-center gap-2.5 rounded-full text-base font-semibold text-white ${WA_BTN} ${focusRing}`}>
          <WhatsAppMark light className="h-9 w-9 drop-shadow-sm" />
          WhatsApp
        </a>
        <a href={"tel:+" + site.whatsapp.number}
          className={`mt-2.5 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-ink/[.05] text-[0.95rem] font-medium ${T} ${focusRing}`}>
          <Icon name="phone" className="h-[18px] w-[18px]" />Llamar {site.whatsapp.display}
        </a>
        <p className={`mt-auto pt-8 text-xs font-medium uppercase leading-relaxed tracking-[0.14em] text-muted ${T}`}>
          {site.address.city}, {site.address.region}<br />Lunes a sábado 8 a.m. - 6 p.m.
        </p>
      </div>
    </header>
  );
}
