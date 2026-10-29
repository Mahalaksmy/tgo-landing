import { useCallback, useEffect, useRef, useState } from "react";
import Header from "./components/Header.jsx";
import ProvidersBand from "./components/ProvidersBand.jsx";
import Footer from "./components/Footer.jsx";
import WhatsAppMark from "./components/WhatsAppMark.jsx";
import HomeView from "./views/HomeView.jsx";
import CatalogView from "./views/CatalogView.jsx";
import QuoteTray from "./components/QuoteTray.jsx";
import { products } from "./data/products.js";
import { waUrl, prefersReducedMotion, T } from "./lib/utils.js";

/* Estado de la vista (home / agriculture / organizational) + transiciones */
export default function App() {
  const [view, setView] = useState("home");          // vista pedida (controla el tema)
  const [shown, setShown] = useState("home");        // vista renderizada (cambia tras la salida)
  const [leaving, setLeaving] = useState(false);
  const headingRef = useRef(null);
  const firstRender = useRef(true);
  const timer = useRef(null);

  /* Lista de cotización (ids de producto). Se guarda en la pestaña para no perderla al recargar. */
  const [quoteIds, setQuoteIds] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem("tgo-cotizacion") || "[]"); } catch { return []; }
  });
  useEffect(() => {
    try { sessionStorage.setItem("tgo-cotizacion", JSON.stringify(quoteIds)); } catch { /* sin almacenamiento: solo en memoria */ }
  }, [quoteIds]);
  const toggleQuote = useCallback((id) => {
    setQuoteIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));
  }, []);
  const quoteItems = quoteIds.map((id) => products.find((p) => p.id === id)).filter(Boolean);
  const hasQuote = quoteItems.length > 0;

  /* El tema vive en <html data-view>: cambia header, footer y contenido a la vez */
  useEffect(() => { document.documentElement.dataset.view = view; }, [view]);

  /* Desplazar a una sección (proveedores, contacto, nosotros) */
  const scrollToId = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  }, []);

  const pendingSection = useRef(null);

  /* navigate(vista, seccion?): cambia de vista; si se indica una sección, baja hasta ella al montar */
  const navigate = useCallback((next, sectionId) => {
    if (next === view) {
      if (sectionId) scrollToId(sectionId);
      return;
    }
    pendingSection.current = sectionId || null;
    setView(next);
    clearTimeout(timer.current);
    if (prefersReducedMotion()) { setShown(next); return; }
    setLeaving(true);                                  // salida: desvanecer
    timer.current = setTimeout(() => {                 // montaje de la nueva vista
      setShown(next);
      setLeaving(false);
    }, 220);
  }, [view]);

  /* Al montar una vista: subir al inicio y mover el foco al título (lectores de pantalla) */
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    if (pendingSection.current) {
      const id = pendingSection.current;
      pendingSection.current = null;
      requestAnimationFrame(() => scrollToId(id));
      return;
    }
    window.scrollTo({ top: 0, behavior: "auto" });
    headingRef.current && headingRef.current.focus({ preventScroll: true });
  }, [shown]);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-bg">
        Saltar al contenido
      </a>
      <Header view={view} onNavigate={navigate} onScrollTo={scrollToId} />

      <main id="main"
        className="mx-auto max-w-6xl px-4 pb-20 pt-[calc(env(safe-area-inset-top,0px)+7.5rem)] sm:px-6 md:pb-24 lg:px-8 lg:pt-[calc(env(safe-area-inset-top,0px)+8.5rem)]">
        <div key={shown} className={`view-enter transition-opacity duration-200 ease-in-out ${leaving ? "opacity-0" : "opacity-100"}`}>
          {shown === "home"
            ? <HomeView onOpen={navigate} headingRef={headingRef} />
            : <CatalogView branchKey={shown} onNavigate={navigate} headingRef={headingRef}
                quoteIds={quoteIds} onToggleQuote={toggleQuote} />}
        </div>
      </main>

      {/* Persistentes en todas las vistas */}
      <ProvidersBand id="proveedores" />
      <Footer onNavigate={navigate} onScrollTo={scrollToId} />
      {/* Espacio para que la barra de cotización no tape el final del footer */}
      {hasQuote && <div aria-hidden="true" className="h-28 sm:h-24" />}

      {/* Lista de cotización; mientras está visible reemplaza al botón flotante */}
      {hasQuote && <QuoteTray items={quoteItems} onClear={() => setQuoteIds([])} />}

      {/* Botón flotante de WhatsApp */}
      {!hasQuote && <a href={waUrl()} target="_blank" rel="noopener noreferrer" aria-label="Escríbenos por WhatsApp"
        className="fixed bottom-[calc(env(safe-area-inset-bottom,0px)+1rem)] right-4 z-30 rounded-full shadow-[0_12px_28px_-10px_rgb(37_211_102/.7)]
          transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 md:right-6">
        <WhatsAppMark className="h-14 w-14" />
      </a>}
    </>
  );
}
