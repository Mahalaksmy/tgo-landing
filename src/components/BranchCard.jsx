import { BRANCHES } from "../data/branches.js";
import Icon from "./Icon.jsx";
import { productsOf } from "../lib/utils.js";

/* Al pasar el cursor (o enfocar con teclado), la tarjeta se rellena con el color de su catálogo */
const FILL = {
  agriculture: {
    card: "hover:border-branch-agriculture hover:bg-branch-agriculture focus-visible:border-branch-agriculture focus-visible:bg-branch-agriculture",
    icon: "group-hover:text-branch-agriculture group-focus-visible:text-branch-agriculture",
  },
  organizational: {
    card: "hover:border-branch-organizational hover:bg-branch-organizational focus-visible:border-branch-organizational focus-visible:bg-branch-organizational",
    icon: "group-hover:text-branch-organizational group-focus-visible:text-branch-organizational",
  },
};

export default function BranchCard({ branchKey, onOpen }) {
  const b = BRANCHES[branchKey];
  const f = FILL[branchKey];
  const count = productsOf(b.category).length;
  const toWhite = "group-hover:text-white/85 group-focus-visible:text-white/85";
  return (
    <button type="button" onClick={() => onOpen(branchKey)}
      className={`group relative flex min-h-[18rem] flex-col justify-between overflow-hidden rounded-[2rem] border border-line/15 bg-surface p-7 text-left text-ink
        transition-all duration-500 ease-in-out hover:-translate-y-1 hover:text-white focus-visible:text-white active:scale-[.99] md:min-h-[22rem] md:p-9
        focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 ${f.card}`}>
      <div className="flex items-start justify-between">
        <span className={`grid h-14 w-14 place-items-center rounded-full bg-ink/[.06] transition-colors duration-500
          group-hover:bg-white group-focus-visible:bg-white ${f.icon}`}>
          <Icon name={b.icon} className="h-7 w-7" />
        </span>
        <span className="grid h-11 w-11 place-items-center rounded-full border border-line/15 transition duration-500
          group-hover:-rotate-45 group-hover:border-white/50 group-focus-visible:border-white/50">
          <Icon name="arrow" className="h-5 w-5" />
        </span>
      </div>
      <div>
        <p className={`mb-2 text-sm tabular-nums text-muted transition-colors duration-500 ${toWhite}`}>{count} productos</p>
        <h3 className="font-display text-3xl font-semibold tracking-tight md:text-[2.6rem] md:leading-[1.05]">{b.label}</h3>
        <p className={`mt-3 max-w-[38ch] text-[0.95rem] leading-relaxed text-muted transition-colors duration-500 ${toWhite}`}>{b.blurb}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 group-hover:underline">
          Ver catálogo <Icon name="arrow" className="h-4 w-4" />
        </span>
      </div>
    </button>
  );
}
