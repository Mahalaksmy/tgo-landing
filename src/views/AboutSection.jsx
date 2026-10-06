import { site } from "../data/site.js";
import { categories } from "../data/categories.js";
import { values } from "../data/values.js";
import Icon from "../components/Icon.jsx";
import { T } from "../lib/utils.js";

/* Nosotros: tarjeta con foto + valores (en Inicio la foto va en escala de grises por el tema monocromático) */
export default function AboutSection() {
  const s = site;
  const chips = [
    ...categories.map((c) => ({ icon: c.icon, text: c.name })),
    { icon: "pin", text: s.address.city + ", " + s.address.region },
  ];
  return (
    <section id="nosotros" aria-labelledby="about-title" className="grid gap-5 lg:grid-cols-[7fr_5fr]">
      <article className={`relative isolate flex min-h-[32rem] flex-col justify-between gap-10 overflow-hidden rounded-[2rem] bg-deep p-7 text-white md:p-12 ${T}`}>
        <img src={s.aboutImage} alt={s.aboutImageAlt} loading="lazy" decoding="async"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[55%_40%] grayscale" />
        <span aria-hidden="true" className="absolute inset-0 -z-10"
          style={{ background: "linear-gradient(180deg, rgb(var(--deep)/.94) 0%, rgb(var(--deep)/.86) 45%, rgb(var(--deep)/.5) 68%, rgb(var(--deep)/.3) 80%, rgb(var(--deep)/.88) 100%)" }} />
        <div>
          <h2 id="about-title" className="font-display text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl">Conoce a {s.name}</h2>
          <p className="mt-6 max-w-[46ch] text-[1.05rem] leading-relaxed text-white/90 [text-shadow:0_1px_10px_rgb(0_0_0/.5)] md:text-lg">{s.about[0]}</p>
        </div>
        <ul className="flex flex-wrap gap-2" aria-label="En resumen">
          {chips.map((c) => (
            <li key={c.text} className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-sm font-medium ring-1 ring-inset ring-white/25 backdrop-blur">
              <Icon name={c.icon} className="h-[18px] w-[18px]" />{c.text}
            </li>
          ))}
        </ul>
      </article>

      <div className="flex flex-col gap-3">
        <h3 className={`px-2 pt-1 text-xs font-medium uppercase tracking-[0.14em] text-primary ${T}`}>Nuestros valores</h3>
        <ul className="grid flex-1 auto-rows-fr gap-3">
          {values.map((v) => (
            <li key={v.title} className={`grid grid-cols-[auto_1fr] items-center gap-4 rounded-[1.75rem] bg-primary-soft/70 p-5 ring-1 ring-inset ring-line/5 md:p-6 ${T}`}>
              <span className={`grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-fg ${T}`}>
                <Icon name={v.icon} className="h-[22px] w-[22px]" />
              </span>
              <div>
                <h4 className="text-[1.0625rem] font-semibold">{v.title}</h4>
                <p className={`mt-1 text-[0.95rem] leading-relaxed text-muted ${T}`}>{v.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
