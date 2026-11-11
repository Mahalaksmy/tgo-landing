import { useState } from "react";
import { site } from "../data/site.js";
import { categories } from "../data/categories.js";
import { values } from "../data/values.js";
import Icon from "../components/Icon.jsx";
import { T } from "../lib/utils.js";

/* Nosotros: "¿Quiénes somos?" (panel con foto a todo el ancho) + valores en tarjetas debajo */
export default function AboutSection() {
  const [expanded, setExpanded] = useState(false);
  const s = site;
  const [intro, ...more] = s.about;
  const chips = [
    ...categories.map((c) => ({ icon: c.icon, text: c.name })),
    { icon: "pin", text: s.address.city + ", " + s.address.region },
  ];
  return (
    <section id="nosotros" aria-labelledby="about-title" className="space-y-5">
      <article className={`relative isolate flex min-h-[24rem] flex-col justify-between gap-10 overflow-hidden rounded-[2rem] bg-deep p-7 text-white sm:min-h-[28rem] md:p-12 ${T}`}>
        <img src={s.aboutImage} alt={s.aboutImageAlt} loading="lazy" decoding="async"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[55%_40%]" />
        {/* Foto a color, oscurecida de forma pareja para que el texto blanco se lea */}
        <span aria-hidden="true" className="absolute inset-0 -z-10"
          style={{ background: "linear-gradient(180deg, rgb(0 0 0/.7) 0%, rgb(0 0 0/.58) 50%, rgb(0 0 0/.5) 100%)" }} />
        <div id="about-text" className="max-w-[60ch] text-[1.05rem] leading-relaxed text-white/90 [text-shadow:0_1px_10px_rgb(0_0_0/.5)] md:text-lg">
          <h2 id="about-title" className="font-display text-3xl font-semibold leading-[1.05] tracking-tight text-white md:text-5xl">¿Quiénes somos?</h2>
          <p className="mt-6">{intro}</p>
          {/* En celular el segundo párrafo se oculta hasta tocar "Leer más" */}
          {more.map((t) => <p key={t} className={`mt-4 sm:block ${expanded ? "" : "hidden"}`}>{t}</p>)}
          {more.length > 0 && (
            <button type="button" onClick={() => setExpanded(!expanded)} aria-expanded={expanded} aria-controls="about-text"
              className="-mx-1 mt-2 rounded-md px-1 py-2 text-sm font-semibold text-white underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:hidden">
              {expanded ? "Leer menos" : "Leer más"}
            </button>
          )}
        </div>
        <ul className="flex flex-wrap gap-2" aria-label="En resumen">
          {chips.map((c) => (
            <li key={c.text} className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-sm font-medium ring-1 ring-inset ring-white/25 backdrop-blur">
              <Icon name={c.icon} className="h-[18px] w-[18px]" />{c.text}
            </li>
          ))}
        </ul>
      </article>

      <div>
        <h3 className={`px-2 pb-3 pt-4 text-xs font-medium uppercase tracking-[0.14em] text-primary ${T}`}>Nuestros valores</h3>
        {/* Escritorio: 3 arriba y 2 más anchas abajo, para no dejar un hueco con 5 valores */}
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {values.map((v) => (
            <li key={v.title} className={`flex flex-col gap-4 rounded-[1.75rem] lg:col-span-2 lg:[&:nth-child(n+4)]:col-span-3 bg-primary-soft/70 p-6 ring-1 ring-inset ring-line/5 md:p-7 ${T}`}>
              <span className={`grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-fg ${T}`}>
                <Icon name={v.icon} className="h-[22px] w-[22px]" />
              </span>
              <div>
                <h4 className="text-[1.0625rem] font-semibold leading-snug">{v.title}</h4>
                <p className={`mt-2 text-[0.95rem] leading-relaxed text-muted ${T}`}>{v.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
