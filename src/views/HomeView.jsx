import BranchCard from "../components/BranchCard.jsx";
import AboutSection from "./AboutSection.jsx";
import QuoteBand from "../components/QuoteBand.jsx";
import Icon from "../components/Icon.jsx";
import NavLink from "../components/NavLink.jsx";
import { T } from "../lib/utils.js";

export default function HomeView({ onOpen, headingRef }) {
  /* Textos aprobados por TGO (noviembre 2026) */
  return (
    <div className="space-y-14 md:space-y-20">
      <section aria-labelledby="home-title" className="mx-auto flex max-w-4xl flex-col items-center pt-6 text-center md:pt-12">
        <h1 id="home-title" ref={headingRef} tabIndex={-1}
          className="font-display text-[2.3rem] font-semibold leading-[1.02] tracking-[-0.03em] outline-none sm:text-5xl md:text-6xl">
          Comercial TGO:{" "}
          <span className={`mt-1 block text-[1.85rem] leading-[1.08] text-muted sm:text-4xl md:text-5xl ${T}`}>Insumos para flores e instituciones con la puntualidad que tu operación exige.</span>
        </h1>
        <p className={`mt-5 max-w-[62ch] text-base leading-relaxed text-muted sm:mt-6 sm:text-lg ${T}`}>
          Respaldamos la productividad del sector agrícola y el funcionamiento de tu empresa con suministros de alta calidad,
          entregas puntuales y un inventario confiable.
        </p>
        {/* Acción principal: abrir el catálogo (WhatsApp ya está en el menú y en el botón flotante) */}
        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <NavLink to="catalog" onNavigate={onOpen}
            className={`inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line/15 bg-surface px-6 text-[0.95rem] font-semibold ${T}
              hover:border-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30`}>
            Ver catálogo <Icon name="arrow" className="h-4 w-4" />
          </NavLink>
        </div>
      </section>

      <section id="lineas" aria-labelledby="branches-title">
        <h2 id="branches-title" className="sr-only">Nuestras líneas</h2>
        {/* Paneles: apilados en celular; en escritorio, fila de altura fija donde el panel enfocado se ensancha */}
        <div className="flex flex-col gap-4 md:h-[34rem] md:flex-row md:gap-5">
          <BranchCard branchKey="agriculture" onOpen={onOpen} index={0} />
          <BranchCard branchKey="organizational" onOpen={onOpen} index={1} />
        </div>
      </section>

      <QuoteBand />

      <AboutSection />
    </div>
  );
}
