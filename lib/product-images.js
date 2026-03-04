/**
 * Returns true if the product has at least one valid image URL (non-empty string).
 * Use this to filter out products with missing or broken image links from listings
 * and to return 404 for single-product pages.
 */
export function hasValidImages(product) {
  if (!product?.images_url) return false;
  const urls = Array.isArray(product.images_url) ? product.images_url : [];
  const first = urls[0];
  return typeof first === "string" && first.trim().length > 0;
}
