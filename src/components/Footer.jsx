import { useEffect, useState } from "react";
import { site } from "../data/site.js";
import Icon from "./Icon.jsx";
import { waUrl, mapsUrl, prefersReducedMotion, T } from "../lib/utils.js";

function useIsDesktop(query = "(min-width: 700px)") {
  const [is, setIs] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = (e) => setIs(e.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return is;
}

function FooterColumn({ title, children, desktop }) {
  const [open, setOpen] = useState(false);
  const isOpen = desktop || open;
  const panelId = "footer-" + title.toLowerCase().replace(/\W+/g, "-");
  return (
    <div className={desktop ? "" : `border-t border-white/10 ${T}`}>
      {desktop ? (
        <p className={`mb-3 text-xs font-medium uppercase tracking-[0.14em] text-deep-accent ${T}`}>{title}</p>
      ) : (
        <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls={panelId}
          className={`flex min-h-[52px] w-full items-center justify-between py-3.5 text-xs font-medium uppercase tracking-[0.14em] text-deep-accent ${T}
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-accent`}>
          {title}
          <Icon name="arrow" className={`h-4 w-4 transition-transform duration-500 ${open ? "-rotate-90" : "rotate-90"}`} />
        </button>
      )}
      <div id={panelId} hidden={!isOpen} className={desktop ? "" : "pb-5"}>{children}</div>
    </div>
  );
}

export default function Footer({ onNavigate, onScrollTo }) {
  const s = site;
  const desktop = useIsDesktop();
  const links = [
    ["Inicio", () => onNavigate("home")],
    ["Nosotros", () => onNavigate("home", "nosotros")],
    ["Insumos Agrícolas", () => onNavigate("agriculture")],
    ["Insumos Institucionales", () => onNavigate("organizational")],
    ["Proveedores", () => onScrollTo("proveedores")],
    ["Contacto", () => onScrollTo("contacto")],
  ];
  const linkCls = `text-deep-fg underline-offset-4 hover:underline ${T}`;
  return (
    <footer id="contacto" className="mx-auto max-w-6xl px-4 pb-6 pt-4 sm:px-6 lg:px-8">
      <div className={`relative isolate overflow-hidden rounded-[2rem] bg-deep text-deep-muted ${T}
        px-6 pb-6 pt-10 shadow-[0_24px_60px_-30px_rgb(var(--deep)/.8)] md:px-14 md:pt-14`}>
        {/* brillo suave del color del tema */}
        <span aria-hidden="true" className="pointer-events-none absolute -right-40 -top-64 -z-10 h-[520px] w-[520px] rounded-full" style={{ background: "radial-gradient(closest-side, rgb(var(--primary) / .55), transparent 70%)" }} />

        <div className="grid gap-0 pb-2 md:grid-cols-[1.3fr_1fr_1fr] md:gap-8 md:pb-12">
          {/* Marca y correo */}
          <div className="flex flex-col items-start gap-4 pb-6 md:pb-0">
            <img src={s.logo} alt={s.name} width="307" height="107" className="h-10 w-auto brightness-0 invert-[.94]" />
            <p className="max-w-[22ch] leading-relaxed">{s.tagline}</p>
            <a href={"mailto:" + s.email} className={`${linkCls} break-all font-medium`}>{s.email}</a>
          </div>

          {/* Explora */}
          <FooterColumn title="Explora" desktop={desktop}>
            <ul className="grid gap-2.5">
              {links.map(([label, action]) => (
                <li key={label}>
                  <button type="button" onClick={action} className={`${linkCls} text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-accent`}>{label}</button>
                </li>
              ))}
            </ul>
          </FooterColumn>

          {/* Contáctanos */}
          <FooterColumn title="Contáctanos" desktop={desktop}>
            <ul className="grid gap-4">
              <li className="grid gap-0.5">
                <span className="text-sm">{s.whatsapp.acceptsCalls ? "WhatsApp y llamadas" : "WhatsApp"}</span>
                <a href={waUrl()} target="_blank" rel="noopener noreferrer" className={`${linkCls} font-semibold tabular-nums`}>{s.whatsapp.display}</a>
                {s.whatsapp.acceptsCalls && (
                  <a href={"tel:+" + s.whatsapp.number} className={`mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-deep-accent hover:text-deep-fg ${T}`}>
                    <Icon name="phone" className="h-4 w-4" />Llamar
                  </a>
                )}
              </li>
              <li className="grid gap-0.5">
                <span className="text-sm">Horario</span>
                <span className={`text-deep-fg ${T}`}>{s.hours}</span>
              </li>
              <li className="grid gap-0.5">
                <span className="text-sm">Dirección</span>
                <address className={`not-italic text-deep-fg ${T}`}>{s.address.street}<br />{s.address.city}, {s.address.region}, {s.address.country}</address>
                <a href={mapsUrl()} target="_blank" rel="noopener noreferrer" className={`mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-deep-accent hover:text-deep-fg ${T}`}>
                  Cómo llegar<Icon name="external" className="h-3.5 w-3.5" />
                </a>
              </li>
            </ul>
          </FooterColumn>
        </div>

        <div className={`mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5 text-[0.8125rem] md:pr-16`}>
          <p>© {new Date().getFullYear()} {s.name} · NIT {s.nit} · Todos los derechos reservados.</p>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" })}
            className={`group inline-flex items-center gap-2.5 hover:text-deep-fg ${T} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-accent rounded-full`}>
            Volver arriba
            <span className={`grid h-9 w-9 place-items-center rounded-full bg-white/10 ring-1 ring-inset ring-white/15 transition duration-500 group-hover:-translate-y-0.5 group-hover:bg-primary`}>
              <Icon name="arrow" className="h-4 w-4 -rotate-90" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
