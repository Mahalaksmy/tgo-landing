import { BRANCHES } from "../data/branches.js";
import Icon from "./Icon.jsx";
import { productsOf } from "../lib/utils.js";

export default function BranchCard({ branchKey, onOpen, dark }) {
  const b = BRANCHES[branchKey];
  const count = productsOf(b.category).length;
  /* Al pasar el cursor, cada tarjeta anticipa el color de su catálogo */
  const accent = branchKey === "agriculture" ? "group-hover:bg-branch-agriculture" : "group-hover:bg-branch-organizational";
  return (
    <button type="button" onClick={() => onOpen(branchKey)}
      className={`group relative flex min-h-[18rem] flex-col justify-between overflow-hidden rounded-[2rem] border p-7 text-left
        transition-all duration-500 ease-in-out hover:-translate-y-1 active:scale-[.99] md:min-h-[22rem] md:p-9
        focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30
        ${dark ? "border-ink bg-ink text-bg" : "border-line/15 bg-surface text-ink"}
        ${branchKey === "agriculture" ? "hover:border-branch-agriculture" : "hover:border-branch-organizational"}`}>
      <div className="flex items-start justify-between">
        <span className={`grid h-14 w-14 place-items-center rounded-full transition-colors duration-500
          ${dark ? "bg-white/10" : "bg-ink/[.06]"} ${accent} group-hover:text-white`}>
          <Icon name={b.icon} className="h-7 w-7" />
        </span>
        <span className={`grid h-11 w-11 place-items-center rounded-full border transition-transform duration-500 group-hover:-rotate-45
          ${dark ? "border-white/20" : "border-line/15"}`}>
          <Icon name="arrow" className="h-5 w-5" />
        </span>
      </div>
      <div>
        <p className={`mb-2 text-sm tabular-nums ${dark ? "text-white/60" : "text-muted"}`}>{count} productos</p>
        <h3 className="font-display text-3xl font-semibold tracking-tight md:text-[2.6rem] md:leading-[1.05]">{b.label}</h3>
        <p className={`mt-3 max-w-[38ch] text-[0.95rem] leading-relaxed ${dark ? "text-white/70" : "text-muted"}`}>{b.blurb}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 group-hover:underline">
          Ver catálogo <Icon name="arrow" className="h-4 w-4" />
        </span>
      </div>
    </button>
  );
}
