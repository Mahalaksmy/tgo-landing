import { useState } from "react";
import { providers } from "../data/providers.js";
import Icon from "./Icon.jsx";
import { T } from "../lib/utils.js";

function ProviderChip({ p, hidden }) {
  const inner = p.logo
    ? <img src={p.logo} alt={hidden ? "" : p.name} className="h-11 w-auto max-w-[150px] rounded-md object-contain transition-transform duration-500 group-hover:scale-105" />
    : <span className={`whitespace-nowrap font-display text-lg font-semibold text-muted ${T}`}>{p.name}</span>;
  return (
    <li aria-hidden={hidden ? "true" : undefined}>
      <div className={`group flex h-24 min-w-[220px] items-center justify-center gap-3 rounded-full bg-surface px-8 shadow-[0_0_0_1px_rgb(var(--line)/.08)] ${T}`}>
        {inner}
        {p.placeholder && (
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium text-muted ring-1 ring-inset ring-current ${T}`}>Ejemplo</span>
        )}
      </div>
    </li>
  );
}

export default function ProvidersBand({ id }) {
  const [paused, setPaused] = useState(false);
  return (
    <section id={id} aria-labelledby="providers-title" className={`bg-primary/10 py-14 md:py-16 ${T}`}>
      <h2 id="providers-title" className={`mb-8 text-center font-display text-xl font-medium text-primary ${T} md:text-2xl`}>
        Marcas con las que trabajamos
      </h2>
      <div id="providers-marquee" className={`marquee-mask overflow-hidden ${paused ? "is-paused" : ""}`}>
        <ul className="marquee-track flex w-max gap-4 py-1.5">
          {providers.map((p) => <ProviderChip key={p.name} p={p} />)}
          {providers.map((p) => <ProviderChip key={p.name + "-copia"} p={p} hidden />)}
        </ul>
      </div>
      <div className="mt-5 flex justify-center motion-reduce:hidden">
        <button type="button" onClick={() => setPaused(!paused)} aria-pressed={paused} aria-controls="providers-marquee"
          className={`inline-flex h-10 items-center gap-2 rounded-full bg-surface/60 px-4 text-[0.8125rem] font-medium text-primary
            shadow-[0_0_0_1px_rgb(var(--line)/.08)] ${T} hover:bg-surface focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30`}>
          <Icon name={paused ? "play" : "pause"} className="h-4 w-4" />
          {paused ? "Reanudar animación" : "Pausar animación"}
        </button>
      </div>
    </section>
  );
}
