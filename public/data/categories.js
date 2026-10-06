/**
 * CATEGORÍAS DEL CATÁLOGO
 * Para agregar más: copiar un objeto y usar un `id` único (sin espacios ni tildes).
 * icon:  ícono del sprite (plant, flower, leaf, buildings, handshake…).
 * image: foto de fondo (opcional) para la tile de la categoría en el inicio. "" = sin foto.
 *        Es decorativa (imagen de ambiente), no representa un producto específico.
 */
window.TGO = window.TGO || {};

TGO.categories = [
  {
    id: "agricolas",
    name: "Insumos Agrícolas",
    description: "Insumos agrícolas.",
    icon: "plant",
    image: "assets/img/tema/cultivo-hortensias.webp",
  },
  {
    id: "institucionales",
    name: "Insumos Institucionales",
    description: "Insumos institucionales.",
    icon: "buildings",
    image: "assets/img/tema/hortensia-primer-plano.webp",
  },
];
