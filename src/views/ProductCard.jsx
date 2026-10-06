import WhatsAppButton from "../components/WhatsAppButton.jsx";
import { productMessage, T } from "../lib/utils.js";

export default function ProductCard({ product, categoryName }) {
  const fit = product.imageFit === "cover" ? "object-cover" : product.imageFit === "full" ? "object-contain" : "object-contain p-[12%]";
  return (
    <li className={`flex min-w-0 flex-col overflow-hidden rounded-[1.25rem] border border-line/10 bg-surface p-1.5 ${T} sm:rounded-[1.75rem] sm:p-2
      transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgb(var(--line)/.35)]`}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[0.9rem] bg-white sm:rounded-[1.25rem]">
        <img src={product.image} alt={product.name} loading="lazy" decoding="async" width="800" height="600"
          className={`h-full w-full ${fit}`} />
        <span className={`absolute left-3 top-3 hidden rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-fg sm:inline ${T}`}>{categoryName}</span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-2.5 sm:gap-3 sm:p-4 md:p-5">
        <h3 className="font-display text-[1.05rem] font-semibold leading-tight tracking-tight sm:text-xl">{product.name}</h3>
        {product.reference && (
          <p className={`flex justify-between gap-2 border-b border-dashed border-line/15 pb-1.5 text-xs sm:pb-2 sm:text-sm ${T}`}>
            <span className={`text-primary ${T}`}>Ref.</span><span className="truncate font-medium tabular-nums">{product.reference}</span>
          </p>
        )}
        {product.description && (
          <p className={`line-clamp-3 text-[0.8125rem] leading-snug text-muted sm:line-clamp-none sm:text-[0.95rem] sm:leading-relaxed ${T}`}>{product.description}</p>
        )}
        <div className="mt-auto pt-1 sm:pt-2">
          <WhatsAppButton size="sm" block message={productMessage(product, categoryName)}
            ariaLabel={"Escríbenos por WhatsApp sobre: " + product.name} />
        </div>
      </div>
    </li>
  );
}
