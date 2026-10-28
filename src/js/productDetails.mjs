import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import { cartSuperscript } from "./cartSuperscript.mjs";
import { calculateDiscount } from "./discount.mjs";

let product = {};

function addProductToCart(product) {
  const cart = getLocalStorage("so-cart");
  if (!cart) {
    const newArray = [];
    product.quantity = 1;
    newArray.push(product);
    setLocalStorage("so-cart", newArray);
  } else {
    const existingProduct = findProductInCart(cart, product.Id);

    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }

    setLocalStorage("so-cart", cart);
  }
  animateCart();
  cartSuperscript();
  console.log(cart);
}

function findProductInCart(cart, productId) {
  return cart.find((item) => item.Id === productId);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

function renderProductDetails(product) {
  const breadcrumb = document.querySelector(".breadcrumbs");
  const discountPercentage = calculateDiscount(product);

  if (breadcrumb) {
    const categoryName = product.Category.split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    breadcrumb.textContent = categoryName;
  }

  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText =
    product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Images.PrimaryLarge;
  document.querySelector("#productImage").alt = product.Name;
  document.querySelector("#productRetailPrice").innerText =
    `$${product.SuggestedRetailPrice}`;
  document.querySelector("#discountPercentage").innerText =
    `${discountPercentage}% Discount`;
  document.querySelector("#productFinalPrice").innerText =
    `$${product.FinalPrice}`;
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
