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
