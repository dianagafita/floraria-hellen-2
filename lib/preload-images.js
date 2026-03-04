/**
 * Preload image URLs so they are in the browser cache when the gallery renders.
 * Call when product data is available (e.g. after fetch). First image is highest priority.
 */
export function preloadProductImages(imageUrls) {
  if (!Array.isArray(imageUrls) || imageUrls.length === 0) return;
  imageUrls.forEach((src, i) => {
    if (!src) return;
    const img = new Image();
    img.src = src;
  });
}
