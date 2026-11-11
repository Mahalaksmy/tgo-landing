import { useCallback, useState } from "react";
import { BRANCHES } from "../data/branches.js";
import Icon from "../components/Icon.jsx";
import NavLink from "../components/NavLink.jsx";
import ProductCard from "./ProductCard.jsx";
import ProductSheet from "./ProductSheet.jsx";
import QuoteBand from "../components/QuoteBand.jsx";
import WhatsAppButton from "../components/WhatsAppButton.jsx";
import { presentationsOf, productsOf, quoteKey, T } from "../lib/utils.js";

const focusRing = "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30";

/* Catálogo único (/catalogo): todos los productos, agrupados por línea.
   Cada sección lleva el tema de su línea (data-view): verde para agrícolas, azul para institucionales. */
export default function CatalogView({ onNavigate, headingRef, quoteIds = [], onToggleQuote }) {
  const lines = Object.entries(BRANCHES).map(([key, b]) => ({ key, ...b, items: productsOf(b.category) }));
  const total = lines.reduce((n, l) => n + l.items.length, 0);
  const [detail, setDetail] = useState(null);         // { product, line } abierto en la hoja de detalle (celular)
  const closeDetail = useCallback(() => setDetail(null), []);

  /* Presentación elegida por producto (por defecto la primera); la comparten la tarjeta y la hoja de detalle */
  const [choices, setChoices] = useState({});
  const presentationOf = (p) => choices[p.id] || presentationsOf(p)[0]?.label || "";
  const choose = (p) => (label) => setChoices((c) => ({ ...c, [p.id]: label }));
  const keyOf = (p) => quoteKey(p.id, presentationOf(p));

  return (
    <section aria-labelledby="catalog-title" className="pt-2 md:pt-6">
      <nav aria-label="Ruta" className={`text-sm text-muted ${T}`}>
        <ol className="flex items-center gap-1.5">
          <li>
            <NavLink to="home" onNavigate={onNavigate}
              className={`-mx-1 rounded-md px-1 py-2 underline-offset-4 hover:text-ink hover:underline ${focusRing}`}>Inicio</NavLink>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-ink">Catálogo</li>
        </ol>
      </nav>

      {/* Título, aviso de cotización y accesos a cada línea */}
      <div className="mt-6 md:mt-10">
        <h1 id="catalog-title" ref={headingRef} tabIndex={-1}
          className="font-display text-[2.15rem] font-semibold leading-[1.02] tracking-[-0.03em] outline-none sm:text-5xl md:text-6xl">Catálogo</h1>
        <p className={`mt-4 inline-flex items-start gap-2 rounded-2xl bg-ink/[.05] px-3.5 py-2.5 text-[0.8125rem] leading-snug text-ink sm:text-sm ${T}`}>
          <Icon name="plus" className="mt-0.5 h-4 w-4 shrink-0" />
          <span><strong className="font-semibold">{total} productos.</strong> Agrega los que necesites y envía una sola cotización por WhatsApp.</span>
        </p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Ir a una línea">
          {lines.map((l) => (
            <li key={l.key} data-view={l.key}>
              <a href={"#" + l.category}
                className={`inline-flex h-10 items-center gap-1.5 rounded-full bg-primary/10 px-4 text-sm font-semibold text-primary ${T} hover:bg-primary/15 ${focusRing}`}>
                <Icon name={l.icon} className="h-4 w-4" />{l.short}
                <span className="font-medium tabular-nums opacity-70">{l.items.length}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {lines.map((l) => (
        <section key={l.key} id={l.category} data-view={l.key} aria-labelledby={l.category + "-title"} className="mt-12 md:mt-16">
          <div className="flex items-center gap-3">
            <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-primary-fg ${T}`}>
              <Icon name={l.icon} className="h-[22px] w-[22px]" />
            </span>
            <h2 id={l.category + "-title"} className={`font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-primary ${T} md:text-4xl`}>{l.label}</h2>
          </div>
          <p className={`mt-3 max-w-[62ch] leading-relaxed text-muted ${T} md:text-lg`}>{l.blurb}</p>

          {l.items.length > 0 ? (
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:gap-6">
              {l.items.map((p) => (
                <ProductCard key={p.id} product={p} categoryName={l.label}
                  presentation={presentationOf(p)} onChoose={choose(p)}
                  selected={quoteIds.includes(keyOf(p))} onToggle={() => onToggleQuote(keyOf(p))}
                  onOpen={(product) => setDetail({ product, line: l })} />
              ))}
            </ul>
          ) : (
            /* Estado vacío: línea sin productos publicados */
            <div className={`mt-6 flex flex-col items-center gap-4 rounded-[1.75rem] border border-dashed border-line/20 bg-surface px-6 py-14 text-center ${T}`}>
              <Icon name={l.icon} className={`h-10 w-10 text-primary ${T}`} />
              <p className="max-w-[40ch] text-muted">Pronto publicaremos los productos de esta línea. Mientras tanto, escríbenos y te contamos qué tenemos disponible.</p>
              <WhatsAppButton />
            </div>
          )}
        </section>
      ))}

      <div className="mt-14 md:mt-20">
        <QuoteBand />
      </div>

      {/* La hoja de detalle toma el color de la línea del producto abierto */}
      <div data-view={detail?.line.key}>
        <ProductSheet product={detail?.product || null} categoryName={detail?.line.label || ""}
          presentation={detail ? presentationOf(detail.product) : ""} onChoose={detail ? choose(detail.product) : undefined}
          selected={!!detail && quoteIds.includes(keyOf(detail.product))} onToggle={() => detail && onToggleQuote(keyOf(detail.product))}
          onClose={closeDetail} />
      </div>
    </section>
  );
}
