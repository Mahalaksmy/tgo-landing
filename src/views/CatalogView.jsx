import { BRANCHES } from "../data/branches.js";
import Icon from "../components/Icon.jsx";
import ProductCard from "./ProductCard.jsx";
import QuoteBand from "../components/QuoteBand.jsx";
import WhatsAppButton from "../components/WhatsAppButton.jsx";
import { productsOf, T } from "../lib/utils.js";

const focusRing = "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30";

export default function CatalogView({ branchKey, onNavigate, headingRef, quoteIds = [], onToggleQuote }) {
  const b = BRANCHES[branchKey];
  const items = productsOf(b.category);
  return (
    <section aria-labelledby="catalog-title" className="pt-2 md:pt-6">
      {/* Ruta + selector entre los dos catálogos */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <nav aria-label="Ruta" className={`text-sm text-muted ${T}`}>
          <ol className="flex items-center gap-1.5">
            <li>
              <button type="button" onClick={() => onNavigate("home")}
                className={`-mx-1 rounded-md px-1 py-2 underline-offset-4 hover:text-ink hover:underline ${focusRing}`}>Inicio</button>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-ink">Catálogo</li>
          </ol>
        </nav>
        <div role="group" aria-label="Elegir catálogo" className={`inline-flex rounded-full bg-ink/[.05] p-1 ${T}`}>
          {Object.entries(BRANCHES).map(([key, br]) => {
            const active = key === branchKey;
            return (
              <button key={key} type="button" onClick={() => onNavigate(key)} aria-pressed={active}
                className={`inline-flex h-10 items-center gap-1.5 rounded-full px-3.5 text-[0.8125rem] font-semibold ${T} sm:px-4 sm:text-sm ${focusRing}
                  ${active ? "bg-primary text-primary-fg shadow-sm" : "text-muted hover:text-ink"}`}>
                <Icon name={br.icon} className="h-4 w-4" />{br.short}
              </button>
            );
          })}
        </div>
      </div>

      {/* Título */}
      <div className="mt-6 md:mt-10">
        <h1 id="catalog-title" ref={headingRef} tabIndex={-1}
          className="font-display text-[2.15rem] font-semibold leading-[1.02] tracking-[-0.03em] outline-none sm:text-5xl md:text-6xl">{b.label}</h1>
        {/* En celular se oculta para que los productos aparezcan antes */}
        <p className={`mt-3 hidden max-w-[62ch] text-lg leading-relaxed text-muted sm:block ${T}`}>{b.blurb}</p>
        <p className={`mt-4 inline-flex items-start gap-2 rounded-2xl bg-primary/[.08] px-3.5 py-2.5 text-[0.8125rem] leading-snug text-ink sm:text-sm ${T}`}>
          <Icon name="plus" className={`mt-0.5 h-4 w-4 shrink-0 text-primary ${T}`} />
          <span><strong className="font-semibold">{items.length} productos.</strong> Agrega los que necesites y envía una sola cotización por WhatsApp.</span>
        </p>
      </div>

      {items.length > 0 ? (
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 md:mt-8 lg:gap-6">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} categoryName={b.label}
              selected={quoteIds.includes(p.id)} onToggle={onToggleQuote} />
          ))}
        </ul>
      ) : (
        /* Estado vacío: categoría sin productos publicados */
        <div className={`mt-8 flex flex-col items-center gap-4 rounded-[1.75rem] border border-dashed border-line/20 bg-surface px-6 py-14 text-center ${T}`}>
          <Icon name={b.icon} className={`h-10 w-10 text-primary ${T}`} />
          <p className="max-w-[40ch] text-muted">Pronto publicaremos los productos de esta línea. Mientras tanto, escríbenos y te contamos qué tenemos disponible.</p>
          <WhatsAppButton />
        </div>
      )}

      <div className="mt-14 md:mt-20">
        <QuoteBand />
      </div>
    </section>
  );
}
