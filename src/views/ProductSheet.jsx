import { useCallback, useEffect, useRef, useState } from "react";
import Icon from "../components/Icon.jsx";
import { ProductActions, ProductImage } from "./ProductCard.jsx";
import { prefersReducedMotion, T } from "../lib/utils.js";

/* Vista de detalle del producto en celular: hoja que sube desde abajo con foto, texto completo y acciones.
   Se cierra con la ✕, tocando fuera, con Esc, deslizando hacia abajo o con el botón "atrás" del teléfono. */
export default function ProductSheet({ product, categoryName, selected, onToggle, onClose }) {
  const dialogRef = useRef(null);
  const panelRef = useRef(null);
  const drag = useRef(null);
  const [closing, setClosing] = useState(false);

  /* Animación de salida y cierre real */
  const finish = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      dialogRef.current?.close();
      if (panelRef.current) panelRef.current.style.transform = "";
      setClosing(false);
      onClose();
    }, prefersReducedMotion() ? 0 : 220);
  }, [onClose]);

  /* Pedir el cierre = volver atrás en el historial (así el botón "atrás" del teléfono hace lo mismo) */
  const requestClose = useCallback(() => {
    if (window.history.state?.tgoSheet) window.history.back();
    else finish();
  }, [finish]);

  useEffect(() => {
    if (!product) return;
    const dialog = dialogRef.current;
    if (!dialog.open) dialog.showModal();
    if (!window.history.state?.tgoSheet) window.history.pushState({ tgoSheet: true }, "");
    document.body.style.overflow = "hidden";
    const onPop = () => finish();
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      document.body.style.overflow = "";
    };
  }, [product, finish]);

  /* Deslizar hacia abajo desde la barra superior */
  const onTouchStart = (e) => { drag.current = { y: e.touches[0].clientY, dy: 0 }; };
  const onTouchMove = (e) => {
    if (!drag.current) return;
    drag.current.dy = Math.max(0, e.touches[0].clientY - drag.current.y);
    panelRef.current.style.transform = `translateY(${drag.current.dy}px)`;
  };
  const onTouchEnd = () => {
    const dy = drag.current?.dy || 0;
    drag.current = null;
    if (dy > 90) requestClose();
    else panelRef.current.style.transform = "";
  };

  return (
    <dialog ref={dialogRef} aria-labelledby="sheet-title"
      onCancel={(e) => { e.preventDefault(); requestClose(); }}
      onClick={(e) => { if (e.target === e.currentTarget) requestClose(); }}
      className={`sheet-dialog fixed inset-x-0 bottom-0 top-auto m-0 h-auto max-h-[92dvh] w-full max-w-none overflow-visible border-0 bg-transparent p-0 text-ink
        backdrop:bg-black/50 ${closing ? "is-closing" : ""}`}>
      {product && (
        <div ref={panelRef}
          className={`sheet-panel flex max-h-[92dvh] flex-col overflow-hidden rounded-t-[1.75rem] bg-surface shadow-[0_-20px_50px_-20px_rgb(0_0_0/.45)] ${T}`}>
          {/* Barra superior: asa para deslizar y botón cerrar */}
          <div onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
            className="relative flex h-12 shrink-0 touch-none items-center justify-center">
            <span aria-hidden="true" className="h-1.5 w-10 rounded-full bg-ink/15" />
            <button type="button" onClick={requestClose} aria-label="Cerrar detalles"
              className={`absolute right-2 top-1.5 grid h-10 w-10 place-items-center rounded-full bg-ink/[.06] ${T} hover:bg-ink/10
                focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30`}>
              <Icon name="close" className="h-5 w-5" />
            </button>
          </div>

          <div className="overflow-y-auto overscroll-contain px-5 pb-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line/10 bg-white">
              <ProductImage product={product} />
            </div>
            <p className={`mt-5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-primary ${T}`}>{categoryName}</p>
            <h2 id="sheet-title" className="mt-1 font-display text-[1.75rem] font-semibold leading-tight tracking-tight">{product.name}</h2>
            {product.reference && (
              <p className={`mt-3 flex justify-between gap-2 border-b border-dashed border-line/15 pb-2 text-sm ${T}`}>
                <span className={`text-primary ${T}`}>Referencia</span><span className="font-medium tabular-nums">{product.reference}</span>
              </p>
            )}
            {product.presentation && (
              <p className={`mt-2 flex justify-between gap-2 border-b border-dashed border-line/15 pb-2 text-sm ${T}`}>
                <span className={`text-primary ${T}`}>Presentación</span><span className="text-right font-medium">{product.presentation}</span>
              </p>
            )}
            {product.description && (
              <p className={`mt-4 text-base leading-relaxed text-muted ${T}`}>{product.description}</p>
            )}
          </div>

          {/* Acciones siempre visibles al pie */}
          <ProductActions product={product} categoryName={categoryName} selected={selected} onToggle={onToggle} long
            className="shrink-0 border-t border-line/10 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+1rem)] pt-3" />
        </div>
      )}
    </dialog>
  );
}
