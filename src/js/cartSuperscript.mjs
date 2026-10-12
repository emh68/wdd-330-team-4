import { getLocalStorage } from "./utils.mjs";

export async function cartSuperscript() {
  const cart = document.querySelector(".cart");
  let span = cart.querySelector(".cart-count");
  const items = getLocalStorage("so-cart") || [];
  const itemCount = items.length;
  console.log(itemCount);
  if (!span) {
    span = document.createElement("span");
    span.classList.add("cart-count");
    cart.appendChild(span);
  }
  span.textContent = items.length;
}
