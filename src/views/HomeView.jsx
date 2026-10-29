import BranchCard from "../components/BranchCard.jsx";
import AboutSection from "./AboutSection.jsx";
import QuoteBand from "../components/QuoteBand.jsx";
import Icon from "../components/Icon.jsx";
import { T } from "../lib/utils.js";

export default function HomeView({ onOpen, headingRef }) {
  /* TEXTO PROVISIONAL: reemplazar cuando el cliente envíe la versión final */
  return (
    <div className="space-y-14 md:space-y-20">
      <section aria-labelledby="home-title" className="mx-auto flex max-w-3xl flex-col items-center pt-6 text-center md:pt-12">
        <h1 id="home-title" ref={headingRef} tabIndex={-1}
          className="font-display text-[2.3rem] font-semibold leading-[1.02] tracking-[-0.03em] outline-none sm:text-5xl md:text-6xl">
          Comercial TGO:{" "}
          <span className={`block text-muted ${T}`}>Todo lo que tu campo y tu empresa necesitan</span>
        </h1>
        {/* En celular se oculta: es largo y centrado; los botones y las tarjetas ya explican qué hacer */}
        <p className={`mt-6 hidden max-w-[62ch] text-lg leading-relaxed text-muted sm:block ${T}`}>
          Proveemos soluciones integrales, productos de alta calidad y servicios especializados para potenciar el sector
          agrícola, corporativo e institucional. Explora nuestras líneas de negocio a continuación y contáctanos directamente
          por WhatsApp para recibir asesoría personalizada al instante.
        </p>
        {/* Acción principal: bajar a las dos líneas (WhatsApp ya está en el menú y en el botón flotante) */}
        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a href="#lineas"
            className={`inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line/15 bg-surface px-6 text-[0.95rem] font-semibold ${T}
              hover:border-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30`}>
            Ver catálogos <Icon name="arrow" className="h-4 w-4 rotate-90" />
          </a>
        </div>
      </section>

      <section id="lineas" aria-labelledby="branches-title">
        <h2 id="branches-title" className="sr-only">Nuestras líneas</h2>
        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          <BranchCard branchKey="agriculture" onOpen={onOpen} />
          <BranchCard branchKey="organizational" onOpen={onOpen} />
        </div>
      </section>

      <QuoteBand />

      <AboutSection />
    </div>
  );
}
