import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

function addProductToCart(product) {
  const getArray = getLocalStorage("so-cart");
  if (!getArray) {
    const newArray = [];
    newArray.push(product);
    setLocalStorage("so-cart", newArray);
  } else {
    getArray.push(product);
    setLocalStorage("so-cart", getArray);
  }
  animateCart();
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

// cart animation when user add a product to cart
async function animateCart() {
  const cart = document.querySelector(".cart");
  cart.classList.add("cart-animation");
  cart.addEventListener(
    "animationend",
    () => {
      cart.classList.remove("cart-animation");
    },
    { once: true },
  );
}
