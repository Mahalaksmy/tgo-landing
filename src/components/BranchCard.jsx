import { BRANCHES } from "../data/branches.js";
import Icon from "./Icon.jsx";
import NavLink from "./NavLink.jsx";

/* Tarjeta de cada línea en Inicio: foto de vista previa, título en el color de la línea, descripción
   y botón "Ver productos" que abre el catálogo en la sección de esa línea.
   data-view aplica el tema de la línea a la tarjeta (verde agrícola, azul institucional). */
export default function BranchCard({ branchKey, onOpen }) {
  const b = BRANCHES[branchKey];
  return (
    <NavLink to="catalog" section={b.category} onNavigate={onOpen} data-view={branchKey}
      className="group flex flex-col rounded-[1.75rem] bg-[#F4F4F3] p-4 text-ink transition-[transform,box-shadow] duration-300 hover:-translate-y-1
        hover:shadow-[0_24px_48px_-28px_rgb(var(--primary)/.45)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 sm:p-5">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-white">
        {b.image && (
          <img src={b.image} alt="" loading="lazy" decoding="async" width="800" height="500"
            className="absolute inset-0 h-full w-full object-contain p-[6%] transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
        )}
      </div>
      <div className="flex flex-1 flex-col px-1 pb-1 pt-5 sm:px-2 sm:pt-6">
        <h3 className="font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-primary md:text-[2.25rem]">{b.label}</h3>
        <p className="mt-2 max-w-[48ch] leading-relaxed text-primary/90">{b.blurb}</p>
        <span className="mt-6 inline-flex h-12 w-fit items-center gap-2.5 rounded-full px-6 font-medium text-primary ring-1 ring-inset ring-primary
          transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-fg md:mt-10">
          Ver productos <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </div>
    </NavLink>
  );
}
