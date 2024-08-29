// utils/sortItems.js
export function sortItems(items, sortBy) {
  switch (sortBy) {
    case "Recomandare":
      return items;
    case "Alfabetic, A-Z":
      return items.sort((a, b) => a.name.localeCompare(b.name));
    case "Alfabetic, Z-A":
      return items.sort((a, b) => b.name.localeCompare(a.name));
    case "Pret, de la mic la mare":
      return items.sort((a, b) => a.price - b.price);
    case "Pret, de la mare la mic":
      return items.sort((a, b) => b.price - a.price);
    default:
      return items;
  }
}
