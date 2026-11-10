import { pathOf } from "../lib/routes.js";

/* Enlace real (<a href>) a una vista: Google puede seguirlo y se puede abrir en otra pestaña.
   Un clic normal cambia de vista sin recargar la página. */
export default function NavLink({ to, section, onNavigate, onClick, children, ...rest }) {
  const href = pathOf(to) + (section ? "#" + section : "");
  const handle = (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    onClick?.(e);
    onNavigate(to, section);
  };
  return <a href={href} onClick={handle} {...rest}>{children}</a>;
}
