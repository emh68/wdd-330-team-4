//I need to calculate the discount
export function calculateDiscount(product) {
  const originalPrice = product.SuggestedRetailPrice;
  const finalPrice = product.FinalPrice;

  if (!originalPrice || finalPrice == null || finalPrice >= originalPrice) {
    return 0;
  }

  return Math.round(100 - (finalPrice * 100) / originalPrice);
}
