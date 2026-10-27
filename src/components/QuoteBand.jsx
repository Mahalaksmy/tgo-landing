import { site } from "../data/site.js";
import Icon from "./Icon.jsx";
import { waUrl, T } from "../lib/utils.js";

/* Llamado a cotizar: toma el color de la vista (Inicio negro, Agrícolas verde, Institucionales azul) */
const POINTS = ["Asesoría personalizada", "Atención a cultivos, empresas e instituciones", "Lunes a sábado, 8 a.m. - 6 p.m."];

export default function QuoteBand() {
  const s = site;
  const phone = s.whatsapp.display.replace(/^\+57\s*/, "");
  return (
    <section aria-labelledby="quote-title"
      className="relative isolate overflow-hidden rounded-[2rem] px-7 py-12 text-white md:px-14 md:py-16"
      style={{ background: "linear-gradient(115deg, rgb(var(--quote-1)) 0%, rgb(var(--quote-2)) 45%, rgb(var(--quote-3)) 100%)" }}>
      {/* brillo suave */}
      <span aria-hidden="true" className="pointer-events-none absolute -right-32 -top-40 -z-10 h-[460px] w-[460px] rounded-full"
        style={{ background: "radial-gradient(closest-side, rgb(var(--deep-accent) / .28), transparent 70%)" }} />

      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
        <div>
          <p className={`mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-deep-accent ${T}`}>Cotiza directamente con nosotros</p>
          <h2 id="quote-title" className="font-display text-3xl font-semibold leading-[1.08] tracking-[-0.02em] md:text-[2.75rem]">
            Solicita una cotización para tu cultivo o tu empresa
          </h2>
          <p className="mt-5 max-w-[60ch] leading-relaxed text-white/80">
            Cuéntanos qué producto necesitas, la medida o referencia, la cantidad aproximada y el lugar de entrega.
            Te respondemos por WhatsApp con disponibilidad y precio.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-white/90">
            {POINTS.map((t) => (
              <li key={t} className="inline-flex items-start gap-2">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-deep-accent" />{t}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 whitespace-nowrap sm:flex-row lg:flex-col xl:flex-row">
          <a href={waUrl(s.whatsapp.quoteMessage)} target="_blank" rel="noopener noreferrer"
            aria-label="Solicitar cotización por WhatsApp"
            className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-white px-7 font-semibold text-deep
              transition duration-300 hover:bg-primary-soft active:scale-[.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40">
            Solicitar cotización
            <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <a href={"tel:+" + s.whatsapp.number}
            className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full px-7 font-semibold text-white ring-1 ring-inset ring-white/40
              transition duration-300 hover:bg-white/10 active:scale-[.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40">
            <Icon name="phone" className="h-[18px] w-[18px]" />
            <span className="tabular-nums">Llamar {phone}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
