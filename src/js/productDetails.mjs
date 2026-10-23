import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import { cartSuperscript } from "./cartSuperscript.mjs";

let product = {};

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
  cartSuperscript();
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

function renderProductDetails(product) {
    const breadcrumb = document.querySelector(".breadcrumbs");

  if (breadcrumb) {
    const categoryName = product.Category.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    breadcrumb.textContent = categoryName;
  }
  
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText =
    product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Images.PrimaryLarge;
  document.querySelector("#productImage").alt = product.Name;
  document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
  document.querySelector("#productColorName").innerText =
    product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}

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

export default async function productDetails(productId) {
  const productSection = document.querySelector(".product-detail");

  try {
    product = await findProductById(productId);

    if (!product) {
      throw new Error("Product not found.");
    }

    renderProductDetails(product);
    productSection.hidden = false;

    // add listener to Add to Cart button
    document
      .getElementById("addToCart")
      .addEventListener("click", addToCartHandler);
  } catch (err) {
    productSection.innerHTML = `<p>${err.message}</p>`;
    productSection.hidden = false;
  }
}
