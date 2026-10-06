import { ICONS } from "../icons.js";

export default function Icon({ name, className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false" className={className}
      dangerouslySetInnerHTML={{ __html: ICONS[name] || "" }} />
  );
}
