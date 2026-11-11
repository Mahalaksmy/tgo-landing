import { useState } from "react";
import { BRANCHES } from "../data/branches.js";
import Icon from "./Icon.jsx";
import NavLink from "./NavLink.jsx";
import { productsOf } from "../lib/utils.js";

/* Productos que se listan al expandir el panel */
const MAX_LIST = 6;

/* Panel fotográfico de cada línea en Inicio (los dos van dentro de un contenedor flex en HomeView).
   - Foto a sangre en todo el panel; el texto va abajo sobre un degradado del color oscuro de la línea (--deep).
   - Escritorio: al pasar el cursor o enfocar, el panel se ensancha (flex-grow), el otro se angosta,
     y aparece la lista de productos en cascada. El movimiento señala qué línea se está explorando.
   - Celular: paneles apilados, sin expansión; se ve la descripción.
   - Entrada: suben y aparecen escalonados al llegar al Inicio (.branch-card en index.css).
   - Reducir movimiento: todo estático (regla global en index.css). */
export default function BranchCard({ branchKey, onOpen, index = 0 }) {
  const b = BRANCHES[branchKey];
  const items = productsOf(b.category);
  const list = items.slice(0, MAX_LIST).map((p) => p.name);
  const more = items.length - list.length;
  const [broken, setBroken] = useState(false);
  const reveal = "md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 md:group-focus-visible:opacity-100 md:group-focus-visible:translate-y-0";

  return (
    <NavLink to="catalog" section={b.category} onNavigate={onOpen} data-view={branchKey}
      style={{ animationDelay: index * 90 + "ms" }}
      className="branch-card group relative isolate flex h-[26rem] min-w-0 flex-col justify-end overflow-hidden rounded-[2rem] bg-deep text-white
        transition-[flex-grow,box-shadow] duration-700 ease-[cubic-bezier(.32,.72,0,1)] active:scale-[.99]
        md:h-full md:flex-1 md:hover:flex-[1.55] md:focus-visible:flex-[1.55]
        hover:shadow-[0_32px_64px_-32px_rgb(var(--deep)/.7)]
        focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/50">
      {/* Foto a sangre (mientras carga o si falla: color oscuro de la línea con su ícono) */}
      {b.image && !broken ? (
        <img src={b.image} alt="" loading="lazy" decoding="async" width="1100" height="733" onError={() => setBroken(true)}
          className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.32,.72,0,1)]
            group-hover:scale-105 group-focus-visible:scale-105" />
      ) : (
        <span aria-hidden="true" className="absolute inset-0 -z-20 grid place-items-center text-white/25">
          <Icon name={b.icon} className="h-20 w-20" />
        </span>
      )}
      {/* Degradado del color oscuro de la línea para que el texto blanco se lea */}
      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-deep via-deep/75 to-deep/5 transition-opacity duration-700
        md:via-deep/60 md:group-hover:via-deep/80" />

      <div className="flex flex-col gap-4 p-6 sm:p-8 md:p-9">
        <p className="inline-flex items-center gap-2 text-sm font-medium text-white/80">
          <Icon name={b.icon} className="h-[18px] w-[18px]" />
          <span><span className="tabular-nums">{items.length}</span> productos</span>
        </p>
        <h3 className="font-display text-[2rem] font-semibold leading-[1.02] tracking-tight sm:text-[2.5rem] lg:text-[2.75rem]">{b.label}</h3>

        {/* Descripción y lista comparten el mismo espacio: en reposo se ve la descripción;
            en escritorio, al expandir, se desvanece y aparece la lista de productos en cascada */}
        <div className="grid">
        <p className="max-w-[42ch] leading-relaxed text-white/80 transition-opacity duration-300 col-start-1 row-start-1
          md:group-hover:opacity-0 md:group-focus-visible:opacity-0">{b.blurb}</p>
        {list.length > 0 && (
          <ul aria-label={"Productos de " + b.label}
            className="hidden max-w-[34rem] grid-cols-2 content-start gap-x-6 gap-y-1.5 text-[0.9375rem] text-white/90 col-start-1 row-start-1 md:grid">
            {list.map((name, i) => (
              <li key={name} style={{ transitionDelay: 80 + 45 * i + "ms" }}
                className={`flex items-center gap-2 truncate transition-[opacity,transform] duration-500 ease-[cubic-bezier(.32,.72,0,1)] ${reveal}`}>
                <Icon name="check" className="h-3.5 w-3.5 shrink-0 text-white/60" />{name}
              </li>
            ))}
            {more > 0 && (
              <li style={{ transitionDelay: 80 + 45 * list.length + "ms" }}
                className={`text-white/70 transition-[opacity,transform] duration-500 ease-[cubic-bezier(.32,.72,0,1)] ${reveal}`}>
                y {more} más
              </li>
            )}
          </ul>
        )}
        </div>

        <span className="mt-2 inline-flex items-center gap-3 self-start rounded-full bg-white py-1.5 pl-5 pr-1.5 font-semibold text-deep">
          Ver productos
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-fg transition-transform duration-500 ease-[cubic-bezier(.32,.72,0,1)]
            group-hover:translate-x-0.5 group-hover:-rotate-[30deg] group-focus-visible:-rotate-[30deg]">
            <Icon name="arrow" className="h-4 w-4" />
          </span>
        </span>
      </div>
    </NavLink>
  );
}
