import { BRANCHES } from "../data/branches.js";
import Icon from "../components/Icon.jsx";
import ProductCard from "./ProductCard.jsx";
import { productsOf, T } from "../lib/utils.js";

export default function CatalogView({ branchKey, onNavigate, headingRef }) {
  const b = BRANCHES[branchKey];
  const items = productsOf(b.category);
  const otherKey = branchKey === "agriculture" ? "organizational" : "agriculture";
  return (
    <section aria-labelledby="catalog-title" className="pt-4 md:pt-8">
      <button type="button" onClick={() => onNavigate("home")}
        className={`group mb-8 inline-flex h-12 items-center gap-3 rounded-full border border-line/15 bg-surface pl-1.5 pr-5 text-[0.95rem] font-semibold ${T}
          hover:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30`}>
        <span className={`grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-fg ${T}`}>
          <Icon name="arrow" className="h-4 w-4 rotate-180 transition-transform duration-500 group-hover:-translate-x-0.5" />
        </span>
        Volver al inicio
      </button>

      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className={`mb-3 inline-flex items-center gap-2 text-sm font-medium text-primary ${T}`}>
            <Icon name={b.icon} className="h-5 w-5" />{items.length} productos
          </p>
          <h1 id="catalog-title" ref={headingRef} tabIndex={-1}
            className="font-display text-4xl font-semibold leading-[1.02] tracking-[-0.03em] outline-none md:text-6xl">{b.label}</h1>
          <p className={`mt-4 max-w-[60ch] text-lg leading-relaxed text-muted ${T}`}>{b.blurb}</p>
        </div>
        <button type="button" onClick={() => onNavigate(otherKey)}
          className={`inline-flex shrink-0 items-center gap-2 self-start rounded-full px-1 text-sm font-semibold text-primary underline-offset-4 hover:underline ${T}
            focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 md:self-auto`}>
          Ver {BRANCHES[otherKey].label} <Icon name="arrow" className="h-4 w-4" />
        </button>
      </div>

      <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:mt-10 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((p) => <ProductCard key={p.id} product={p} categoryName={b.label} />)}
      </ul>
    </section>
  );
}
