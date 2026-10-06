import { useCallback, useEffect, useRef, useState } from "react";
import Header from "./components/Header.jsx";
import ProvidersBand from "./components/ProvidersBand.jsx";
import Footer from "./components/Footer.jsx";
import Icon from "./components/Icon.jsx";
import HomeView from "./views/HomeView.jsx";
import CatalogView from "./views/CatalogView.jsx";
import { waUrl, prefersReducedMotion, T } from "./lib/utils.js";

/* Estado de la vista (home / agriculture / organizational) + transiciones */
export default function App() {
  const [view, setView] = useState("home");          // vista pedida (controla el tema)
  const [shown, setShown] = useState("home");        // vista renderizada (cambia tras la salida)
  const [leaving, setLeaving] = useState(false);
  const headingRef = useRef(null);
  const firstRender = useRef(true);
  const timer = useRef(null);

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
      <Header view={view} onNavigate={navigate} />

      <main id="main"
        className="mx-auto max-w-6xl px-4 pb-20 pt-[calc(env(safe-area-inset-top,0px)+9.5rem)] sm:px-6 md:pb-24 md:pt-[calc(env(safe-area-inset-top,0px)+7.5rem)] lg:px-8">
        <div key={shown} className={`view-enter transition-opacity duration-200 ease-in-out ${leaving ? "opacity-0" : "opacity-100"}`}>
          {shown === "home"
            ? <HomeView onOpen={navigate} headingRef={headingRef} />
            : <CatalogView branchKey={shown} onNavigate={navigate} headingRef={headingRef} />}
        </div>
      </main>

      {/* Persistentes en todas las vistas */}
      <ProvidersBand id="proveedores" />
      <Footer onNavigate={navigate} onScrollTo={scrollToId} />

      {/* Botón flotante de WhatsApp */}
      <a href={waUrl()} target="_blank" rel="noopener noreferrer" aria-label="Escríbenos por WhatsApp"
        className={`fixed bottom-[calc(env(safe-area-inset-bottom,0px)+1rem)] right-4 z-40 grid h-14 w-14 place-items-center rounded-full
          bg-primary text-primary-fg shadow-[0_12px_28px_-10px_rgb(var(--primary)/.7)] ${T} hover:scale-105 hover:bg-primary-strong
          focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 md:right-6`}>
        <Icon name="whatsapp" className="h-7 w-7" />
      </a>
    </>
  );
}
