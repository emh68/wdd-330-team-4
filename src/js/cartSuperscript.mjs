import { getLocalStorage } from "./utils.mjs";

export function cartSuperscript() {
  const cart = document.querySelector(".cart");

  if (!cart) {
    console.warn("Cart element not found");
    return;
  }

  let span = cart.querySelector(".cart-count");
  const items = getLocalStorage("so-cart") || [];

  if (!span) {
    span = document.createElement("span");
    span.classList.add("cart-count");
    cart.appendChild(span);
  }

  let totalItems = 0;
  items.forEach((item) => {
    totalItems += item.quantity || 0;
  });
  span.textContent = totalItems;
}
