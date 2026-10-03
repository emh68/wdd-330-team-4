import { getLocalStorage, setLocalStorage } from "./utils.mjs";

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
    total += item.FinalPrice;
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
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span class="cart-remove" data-id="${item.Id}">X</span>
</li>`;

  return newItem;
}

renderCartContents();