import BranchCard from "../components/BranchCard.jsx";
import AboutSection from "./AboutSection.jsx";
import { T } from "../lib/utils.js";

export default function HomeView({ onOpen, headingRef }) {
  /* TEXTO PROVISIONAL: reemplazar cuando el cliente envíe la versión final */
  return (
    <div className="space-y-14 md:space-y-20">
      <section aria-labelledby="home-title" className="mx-auto flex max-w-3xl flex-col items-center pt-6 text-center md:pt-12">
        <p className={`mb-5 inline-flex items-center gap-2 rounded-full bg-ink/[.05] px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-muted ${T}`}>
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />La Unión, Antioquia
        </p>
        <h1 id="home-title" ref={headingRef} tabIndex={-1}
          className="font-display text-[2.3rem] font-semibold leading-[1.02] tracking-[-0.03em] outline-none sm:text-5xl md:text-6xl">
          Comercial TGO:{" "}
          <span className={`block text-muted ${T}`}>Todo lo que tu campo y tu empresa necesitan</span>
        </h1>
        <p className={`mt-6 max-w-[62ch] text-lg leading-relaxed text-muted ${T}`}>
          Proveemos soluciones integrales, productos de alta calidad y servicios especializados para potenciar el sector
          agrícola, corporativo e institucional. Explora nuestras líneas de negocio a continuación y contáctanos directamente
          por WhatsApp para recibir asesoría personalizada al instante.
        </p>
      </section>

      <section aria-labelledby="branches-title">
        <h2 id="branches-title" className="sr-only">Nuestras líneas</h2>
        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          <BranchCard branchKey="agriculture" onOpen={onOpen} />
          <BranchCard branchKey="organizational" onOpen={onOpen} />
        </div>
      </section>

      <AboutSection />
    </div>
  );
}
