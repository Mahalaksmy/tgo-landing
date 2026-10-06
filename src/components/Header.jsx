import { site } from "../data/site.js";
import WhatsAppButton from "./WhatsAppButton.jsx";
import { T } from "../lib/utils.js";

const NAV = [
  { view: "home", label: "Inicio" },
  { view: "agriculture", label: "Agrícolas" },
  { view: "organizational", label: "Institucionales" },
];

export default function Header({ view, onNavigate }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-[calc(env(safe-area-inset-top,0px)+10px)]">
      <div className={`mx-auto flex max-w-6xl flex-wrap items-center gap-x-3 gap-y-2 rounded-[1.75rem] border border-line/10
        bg-surface/80 px-3 py-2 shadow-[0_10px_30px_-18px_rgb(var(--line)/.45)] backdrop-blur-xl ${T} md:flex-nowrap md:rounded-full`}>
        <button type="button" onClick={() => onNavigate("home")} aria-label={site.name + ", inicio"}
          className="mr-auto rounded-full px-2 py-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30">
          <img src={site.logo} alt={site.name} width="307" height="107" className="h-9 w-auto md:h-10" />
        </button>

        <nav aria-label="Secciones" className="order-last w-full md:order-none md:w-auto">
          <ul className={`grid grid-cols-[1fr_1fr_1.35fr] gap-1 rounded-full bg-ink/[.05] p-1 ${T} md:grid-cols-3`}>
            {NAV.map((item) => {
              const active = view === item.view;
              return (
                <li key={item.view}>
                  <button type="button" onClick={() => onNavigate(item.view)} aria-current={active ? "page" : undefined}
                    className={`w-full whitespace-nowrap rounded-full px-2 py-2 text-[0.8125rem] font-medium ${T} sm:text-sm md:px-4
                      focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30
                      ${active ? "bg-primary text-primary-fg shadow-sm" : "text-muted hover:bg-surface hover:text-ink"}`}>
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden md:block">
          <WhatsAppButton size="sm" ariaLabel="Escríbenos por WhatsApp" />
        </div>
      </div>
    </header>
  );
}
