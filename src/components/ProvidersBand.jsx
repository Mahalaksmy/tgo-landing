import { useState } from "react";
import { providers } from "../data/providers.js";
import { T } from "../lib/utils.js";

function ProviderLogo({ p }) {
  /* Si el logo no carga, se muestra el nombre del proveedor */
  const [broken, setBroken] = useState(false);
  return (
    <li className={`flex h-16 min-w-[140px] items-center justify-center gap-3 rounded-full bg-surface px-5 shadow-[0_0_0_1px_rgb(var(--line)/.08)] ${T} sm:h-24 sm:min-w-[220px] sm:px-8`}>
      {p.logo && !broken
        ? <img src={p.logo} alt={p.name} loading="lazy" onError={() => setBroken(true)} className="h-8 w-auto max-w-[120px] rounded-md object-contain sm:h-11 sm:max-w-[150px]" />
        : <span className={`whitespace-nowrap font-display text-lg font-semibold text-muted ${T}`}>{p.name}</span>}
      {p.placeholder && (
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium text-muted ring-1 ring-inset ring-current ${T}`}>Ejemplo</span>
      )}
    </li>
  );
}

/* Proveedores: fila quieta y centrada (con pocos logos, repetirlos en una cinta en movimiento se ve vacío) */
const visible = providers.filter((p) => !p.hidden);

export default function ProvidersBand({ id }) {
  if (visible.length === 0) return null;
  return (
    <section id={id} aria-labelledby="providers-title" className={`bg-primary/10 px-4 py-12 md:py-14 ${T}`}>
      <h2 id="providers-title" className={`mb-7 text-center font-display text-xl font-medium text-primary ${T} md:text-2xl`}>
        Marcas con las que trabajamos
      </h2>
      <ul className="flex flex-wrap justify-center gap-3 sm:gap-4">
        {visible.map((p) => <ProviderLogo key={p.name} p={p} />)}
      </ul>
    </section>
  );
}
