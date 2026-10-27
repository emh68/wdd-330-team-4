import { cartSuperscript } from "./cartSuperscript.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const cartFooter = document.querySelector(".cart-footer");

  if (cartItems === null || cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML =
      "<p>Your cart is empty</p>";

    cartFooter.classList.add("hide");
    return;
  }

  cartFooter.classList.remove("hide");

  let total = 0;
  for (const item of cartItems) {
    total += item.FinalPrice * item.quantity;
  }

  const cartTotal = document.querySelector(".cart-total");
  cartTotal.textContent = `Total: $${total}`;

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  const removeButtons = document.querySelectorAll(".cart-remove");

  for (const removeX of removeButtons) {
    removeX.addEventListener("click", removeProduct);
  }
}

function removeProduct(event) {
  const clickedX = event.target;
  const productId = clickedX.dataset.id;
  const cartItems = getLocalStorage("so-cart");

  const itemIndex = cartItems.findIndex((item) => item.Id === productId);

  cartItems.splice(itemIndex, 1);

  setLocalStorage("so-cart", cartItems);
  renderCartContents();
  cartSuperscript();
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <div class="cart-card__quantity">
    <button class="quantity-decrease" data-id="${item.Id}">-</button>
    <span>Quantity: ${item.quantity || 1}</span>
    <button class="quantity-increase" data-id="${item.Id}">+</button>
  </div>
  <p class="cart-card__price">$${item.FinalPrice * item.quantity.toFixed(2)}</p>
  <span class="cart-remove" data-id="${item.Id}">X</span>
</li>`;

  return newItem;
}

function updateProductQuantity(productId, change) {
  const cartItems = getLocalStorage("so-cart") || [];

  const product = cartItems.find((item) => item.Id === productId);

  if (!product) return;

  product.quantity = (product.quantity || 1) + change;

  // Don't allow quantities below 1
  if (product.quantity < 1) {
    product.quantity = 1;
  }

  setLocalStorage("so-cart", cartItems);

  renderCartContents();
  cartSuperscript();
}

function handleQuantityChange(event) {
  const increaseButton = event.target.closest(".quantity-increase");
  const decreaseButton = event.target.closest(".quantity-decrease");

  if (increaseButton) {
    updateProductQuantity(increaseButton.dataset.id, 1);
  }

  if (decreaseButton) {
    updateProductQuantity(decreaseButton.dataset.id, -1);
  }
}

renderCartContents();
document
  .querySelector(".product-list")
  .addEventListener("click", handleQuantityChange);
loadHeaderFooter();
