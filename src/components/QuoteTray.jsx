import Icon from "./Icon.jsx";
import WhatsAppMark from "./WhatsAppMark.jsx";
import { waUrl, quoteListMessage, T } from "../lib/utils.js";

/* Barra inferior con la lista de cotización: aparece al agregar el primer producto
   y envía un solo WhatsApp con todos los elegidos (agrícolas e institucionales). */
export default function QuoteTray({ items, onClear }) {
  const n = items.length;
  return (
    <div role="region" aria-label="Lista de cotización"
      className="fixed inset-x-0 bottom-0 z-30 px-3 pb-[calc(env(safe-area-inset-bottom,0px)+0.75rem)] sm:px-6">
      <div className={`mx-auto flex max-w-3xl flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl bg-deep px-4 py-3 text-deep-fg
        shadow-[0_18px_40px_-16px_rgb(0_0_0/.55)] ${T} sm:flex-nowrap sm:px-5`}>
        <div className="min-w-0 flex-1">
          <p aria-live="polite" className="text-sm font-semibold">
            {n} {n === 1 ? "producto" : "productos"} en tu cotización
          </p>
          <p className={`truncate text-xs text-deep-muted ${T}`}>{items.map((p) => p.name).join(" · ")}</p>
        </div>
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <button type="button" onClick={onClear}
            className={`inline-flex h-11 items-center gap-1.5 rounded-full px-4 text-sm font-medium text-deep-fg/80 ring-1 ring-inset ring-white/20 ${T}
              hover:bg-white/10 hover:text-deep-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-accent`}>
            Vaciar
          </button>
          <a href={waUrl(quoteListMessage(items))} target="_blank" rel="noopener noreferrer"
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#128C4A_0%,#0B6B3A_100%)] pl-1.5 pr-5
              text-sm font-semibold text-white transition-[filter] duration-300 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-accent sm:flex-none">
            <WhatsAppMark light className="h-8 w-8" />
            Enviar por WhatsApp
            <Icon name="arrow" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
