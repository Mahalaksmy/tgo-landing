import Icon from "../components/Icon.jsx";
import WhatsAppMark from "../components/WhatsAppMark.jsx";
import { productMessage, presentationsOf, waUrl, T } from "../lib/utils.js";

/* Imagen de respaldo si la foto del producto falta o no carga */
const PLACEHOLDER = "/assets/img/placeholder-product.svg";

/* Foto del producto (tarjeta y vista de detalle). image: foto de la presentación elegida, si tiene una propia */
export function ProductImage({ product, image, className = "" }) {
  const fit = product.imageFit === "cover" ? "object-cover" : product.imageFit === "full" ? "object-contain" : "object-contain p-[8%]";
  return (
    <img src={image || product.image || PLACEHOLDER} alt={product.name} loading="lazy" decoding="async" width="800" height="600"
      onError={(e) => { if (!e.currentTarget.src.endsWith(PLACEHOLDER)) e.currentTarget.src = PLACEHOLDER; }}
      className={`absolute inset-0 h-full w-full ${fit} ${className}`} />
  );
}

/* Foto de la presentación elegida (o la del producto) */
export const imageFor = (product, presentation) =>
  presentationsOf(product).find((o) => o.label === presentation)?.image || product.image;

/* Selector de presentación: píldoras (una elegida). Con una sola presentación solo se muestra el texto. */
export function PresentationPicker({ product, value, onChange, large = false, className = "" }) {
  const options = presentationsOf(product);
  if (options.length === 0) return null;
  const label = <span className={`text-muted ${T}`}>Presentación</span>;
  if (options.length === 1) {
    return <p className={`text-xs sm:text-sm ${className}`}>{label} <span className="font-medium">{options[0].label}</span></p>;
  }
  return (
    <div role="group" aria-label={"Presentación de " + product.name} className={className}>
      <p className={`mb-1.5 ${large ? "text-sm" : "text-xs sm:text-sm"}`}>{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => {
          const on = o.label === value;
          return (
            <button key={o.label} type="button" onClick={() => onChange(o.label)} aria-pressed={on}
              className={`rounded-full px-3 font-semibold tabular-nums ring-1 ring-inset ${T}
                ${large ? "h-10 text-sm" : "h-8 text-xs sm:h-9 sm:text-[0.8125rem]"}
                focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30
                ${on ? "bg-primary text-primary-fg ring-primary" : "bg-surface text-ink ring-line/15 hover:ring-primary"}`}>
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* Acciones: agregar a la lista de cotización o preguntar solo por este producto (con la presentación elegida).
   long = texto completo del botón ("Agregar a cotización") también en celular.
   En la tarjeta de celular (2 columnas) el botón es más compacto para que WhatsApp no se salga de la tarjeta. */
export function ProductActions({ product, presentation, categoryName, selected, onToggle, long = false, className = "" }) {
  const name = product.name + (presentation ? " " + presentation : "");
  return (
    <div className={`flex items-center ${long ? "gap-2" : "gap-1.5 sm:gap-2"} ${className}`}>
      <button type="button" onClick={onToggle} aria-pressed={selected}
        aria-label={(selected ? "Quitar de la cotización: " : "Agregar a la cotización: ") + name}
        className={`inline-flex min-w-0 flex-1 items-center justify-center gap-1 rounded-full font-semibold ${T} ${long ? "gap-1.5 px-3" : "px-2 sm:gap-1.5 sm:px-3"}
          focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30
          ${long ? "h-12 text-[0.9375rem]" : "h-11 text-[0.8125rem] sm:text-sm"}
          ${selected ? "bg-primary text-primary-fg hover:bg-primary-strong" : "bg-primary/10 text-primary hover:bg-primary/15"}`}>
        {/* En la tarjeta de celular el botón va solo con texto: "Agregar" / "Agregado" (el relleno indica que está en la cotización) */}
        <Icon name={selected ? "check" : "plus"} className={`h-4 w-4 shrink-0 ${long ? "" : "hidden sm:block"}`} />
        {/* Texto corto en celular y en escritorio (la tarjeta horizontal deja poco ancho); completo en tablet */}
        <span className={long ? "hidden" : "truncate sm:hidden lg:inline"}>{selected ? "Agregado" : "Agregar"}</span>
        <span className={long ? "" : "hidden sm:inline lg:hidden"}>{selected ? "En tu cotización" : "Agregar a cotización"}</span>
      </button>
      <a href={waUrl(productMessage(product, categoryName, presentation))} target="_blank" rel="noopener noreferrer"
        aria-label={"Preguntar por WhatsApp sobre: " + name} title="Preguntar solo por este producto"
        className="shrink-0 rounded-full transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30">
        <WhatsAppMark className={long ? "h-12 w-12" : "h-10 w-10 sm:h-11 sm:w-11"} />
      </a>
    </div>
  );
}

/* Tarjeta de producto: vertical en móvil y tablet; horizontal (foto grande a la izquierda) desde 1024 px.
   En celular la descripción se recorta: tocar la tarjeta abre la vista de detalle (onOpen).
   presentation / onChoose: presentación elegida (la guarda el catálogo para compartirla con la hoja de detalle). */
export default function ProductCard({ product, categoryName, presentation, onChoose, selected = false, onToggle, onOpen }) {
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
        <ProductImage product={product} image={imageFor(product, presentation)} className="transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3 sm:gap-3 sm:p-5 lg:justify-center lg:gap-4 lg:p-8">
        <h3 className="font-display text-[1.05rem] font-semibold leading-tight tracking-tight sm:text-xl lg:text-2xl">{product.name}</h3>
        {product.description && (
          <p className={`line-clamp-3 text-[0.8125rem] leading-snug text-muted sm:line-clamp-none sm:text-[0.95rem] sm:leading-relaxed ${T}`}>{product.description}</p>
        )}
        <span aria-hidden="true" className={`-mt-1 inline-flex items-center gap-1 text-xs font-semibold text-primary ${T} sm:hidden`}>
          Ver más <Icon name="arrow" className="h-3.5 w-3.5" />
        </span>
        {/* Selector y botones quedan por encima del área táctil de la tarjeta */}
        <PresentationPicker product={product} value={presentation} onChange={onChoose} className="relative z-[2]" />
        <ProductActions product={product} presentation={presentation} categoryName={categoryName} selected={selected} onToggle={onToggle}
          className="relative z-[2] mt-auto pt-1 sm:pt-2 lg:mt-2" />
      </div>
    </li>
  );
}
