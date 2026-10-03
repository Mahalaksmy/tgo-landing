/**
 * CATEGORÍAS DEL CATÁLOGO
 * Las categorías informadas por Comercial TGO S.A.S. son "floristería" y "campo".
 * Para agregar más: copiar un objeto y usar un `id` único (sin espacios ni tildes).
 * image: foto de fondo (opcional) para la tile de la categoría en el inicio. "" = sin foto.
 *        Es decorativa (imagen de ambiente), no representa un producto específico.
 */
window.TGO = window.TGO || {};

TGO.categories = [
  {
    id: "floristeria",
    name: "Floristería",
    description: "Insumos de floristería.",
    image: "assets/img/tema/hortensia-primer-plano.webp",
  },
  {
    id: "campo",
    name: "Campo",
    description: "Insumos de campo.",
    image: "assets/img/tema/cultivo-hortensias.webp",
  },
];
