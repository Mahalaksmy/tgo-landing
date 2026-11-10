import Icon from "../components/Icon.jsx";
import WhatsAppMark from "../components/WhatsAppMark.jsx";
import { productMessage, waUrl, T } from "../lib/utils.js";

/* Imagen de respaldo si la foto del producto falta o no carga */
const PLACEHOLDER = "/assets/img/placeholder-product.svg";

/* Foto del producto (tarjeta y vista de detalle) */
export function ProductImage({ product, className = "" }) {
  const fit = product.imageFit === "cover" ? "object-cover" : product.imageFit === "full" ? "object-contain" : "object-contain p-[8%]";
  return (
    <img src={product.image || PLACEHOLDER} alt={product.name} loading="lazy" decoding="async" width="800" height="600"
      onError={(e) => { if (!e.currentTarget.src.endsWith(PLACEHOLDER)) e.currentTarget.src = PLACEHOLDER; }}
      className={`absolute inset-0 h-full w-full ${fit} ${className}`} />
  );
}

/* Acciones: agregar a la lista de cotización o preguntar solo por este producto.
   long = texto completo del botón ("Agregar a cotización") también en celular */
export function ProductActions({ product, categoryName, selected, onToggle, long = false, className = "" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button type="button" onClick={() => onToggle(product.id)} aria-pressed={selected}
        aria-label={(selected ? "Quitar de la cotización: " : "Agregar a la cotización: ") + product.name}
        className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 font-semibold ${T}
          focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30
          ${long ? "h-12 text-[0.9375rem]" : "h-11 text-[0.8125rem] sm:text-sm"}
          ${selected ? "bg-primary text-primary-fg hover:bg-primary-strong" : "bg-primary/10 text-primary hover:bg-primary/15"}`}>
        <Icon name={selected ? "check" : "plus"} className="h-4 w-4 shrink-0" />
        <span className={long ? "hidden" : "sm:hidden"}>{selected ? "Agregado" : "Agregar"}</span>
        <span className={long ? "" : "hidden sm:inline"}>{selected ? "En tu cotización" : "Agregar a cotización"}</span>
      </button>
      <a href={waUrl(productMessage(product, categoryName))} target="_blank" rel="noopener noreferrer"
        aria-label={"Preguntar por WhatsApp sobre: " + product.name} title="Preguntar solo por este producto"
        className="shrink-0 rounded-full transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30">
        <WhatsAppMark className={long ? "h-12 w-12" : "h-11 w-11"} />
      </a>
    </div>
  );
}

/* Tarjeta de producto: vertical en móvil y tablet; horizontal (foto grande a la izquierda) desde 1024 px.
   En celular la descripción se recorta: tocar la tarjeta abre la vista de detalle (onOpen). */
export default function ProductCard({ product, categoryName, selected = false, onToggle, onOpen }) {
  return (
    <li className={`group relative flex min-w-0 flex-col overflow-hidden rounded-[1.25rem] border bg-surface ${T} sm:rounded-[1.75rem]
      ${selected ? "border-primary ring-2 ring-primary/25" : "border-line/10"}
      transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgb(var(--line)/.35)]
      lg:grid lg:grid-cols-[1.1fr_1fr]`}>
      {/* Celular: toda la tarjeta (menos los botones) abre el detalle */}
      <button type="button" onClick={() => onOpen(product)} aria-haspopup="dialog"
        aria-label={"Ver detalles: " + product.name}
        className="absolute inset-0 z-[1] rounded-[inherit] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-primary/30 sm:hidden" />
      <div className="relative aspect-[4/3] overflow-hidden bg-white lg:aspect-auto lg:min-h-[21rem]">
        <ProductImage product={product} className="transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
        <span className="absolute left-3 top-3 hidden rounded-full bg-white/95 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-ink shadow-[0_2px_10px_-4px_rgb(0_0_0/.25)] ring-1 ring-inset ring-black/5 sm:inline lg:left-4 lg:top-4">
          {categoryName}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3 sm:gap-3 sm:p-5 lg:justify-center lg:gap-4 lg:p-8">
        <h3 className="font-display text-[1.05rem] font-semibold leading-tight tracking-tight sm:text-xl lg:text-2xl">{product.name}</h3>
        {product.reference && (
          <p className={`flex justify-between gap-2 border-b border-dashed border-line/15 pb-1.5 text-xs sm:pb-2 sm:text-sm ${T}`}>
            <span className={`text-primary ${T}`}>Ref.</span><span className="truncate font-medium tabular-nums">{product.reference}</span>
          </p>
        )}
        {product.description && (
          <p className={`line-clamp-3 text-[0.8125rem] leading-snug text-muted sm:line-clamp-none sm:text-[0.95rem] sm:leading-relaxed ${T}`}>{product.description}</p>
        )}
        <span aria-hidden="true" className={`-mt-1 inline-flex items-center gap-1 text-xs font-semibold text-primary ${T} sm:hidden`}>
          Ver más <Icon name="arrow" className="h-3.5 w-3.5" />
        </span>
        {/* Los botones quedan por encima del área táctil de la tarjeta */}
        <ProductActions product={product} categoryName={categoryName} selected={selected} onToggle={onToggle}
          className="relative z-[2] mt-auto pt-1 sm:pt-2 lg:mt-2" />
      </div>
    </li>
  );
}
