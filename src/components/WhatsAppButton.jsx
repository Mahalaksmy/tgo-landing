import Icon from "./Icon.jsx";
import { waUrl, T } from "../lib/utils.js";

export default function WhatsAppButton({ message, label = "Escríbenos", ariaLabel, size = "md", block = false, light = false }) {
  const sizes = size === "sm" ? "h-10 pl-3 pr-1 text-[0.8125rem] sm:h-11 sm:pl-4 sm:pr-1.5 sm:text-sm" : "h-12 pl-5 pr-1.5 text-[0.95rem]";
  const colors = light ? "bg-bg text-ink hover:bg-surface" : "bg-primary text-primary-fg hover:bg-primary-strong";
  return (
    <a href={waUrl(message)} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}
      className={`group inline-flex items-center justify-between gap-3 rounded-full font-semibold ${colors}
        ${sizes} ${block ? "w-full" : ""} ${T} active:scale-[.98]
        focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30`}>
      <span>{label}</span>
      <span className={`grid ${size === "sm" ? "h-8 w-8 sm:h-9 sm:w-9" : "h-9 w-9"} shrink-0 place-items-center rounded-full ${light ? "bg-ink/10" : "bg-white/15"} transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px`}>
        <Icon name="whatsapp" className="h-[18px] w-[18px]" />
      </span>
    </a>
  );
}
