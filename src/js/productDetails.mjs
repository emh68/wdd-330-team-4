import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { findProductById, getProductsByCategory } from "./externalServices.mjs";
import { cartSuperscript } from "./cartSuperscript.mjs";
import { calculateDiscount } from "./discount.mjs";

let product = {};
let selectedColor = null;

function addToWishList(favorite) {
  const wishlist = getLocalStorage("so-wishlist") || [];
  const alreadySaved = wishlist.some((item) => item.Id === favorite.Id);

  if (!alreadySaved) {
    wishlist.push(favorite);
    setLocalStorage("so-wishlist", wishlist);
  }
}

function addProductToCart(product) {
  const cart = getLocalStorage("so-cart");
  if (!cart) {
    const newArray = [];
    product.quantity = 1;
    newArray.push(product);
    setLocalStorage("so-cart", newArray);
  } else {
    const existingProduct = findProductInCart(
      cart,
      product.Id,
      product.selectedColor?.ColorCode,
    );

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

function findProductInCart(cart, productId, colorCode) {
  return cart.find(
    (item) =>
      item.Id === productId && item.selectedColor?.ColorCode === colorCode,
  );
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  product.selectedColor = selectedColor || product.Colors[0];
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

  const productImage = document.querySelector("#productImage");
  productImage.src = product.Images.PrimaryLarge;
  productImage.srcset = `
    ${product.Images.PrimaryMedium} 160w,
    ${product.Images.PrimaryLarge} 320w,
    ${product.Images.PrimaryExtraLarge} 600w
  `;
  productImage.sizes = "(max-width: 532px) calc(100vw - 64px), 500px";
  productImage.alt = product.Name;

  const imageOptions = document.querySelector("#imageOptions");
  const extraImages = product.Images.ExtraImages;

  if (extraImages?.length > 0) {
    const allImages = [
      {
        Title: product.Name,
        Src: product.Images.PrimaryLarge,
      },
      ...extraImages,
    ];

    allImages.forEach((image) => {
      const button = document.createElement("button");
      button.type = "button";
      const thumbnail = document.createElement("img");
      thumbnail.src = image.Src;
      thumbnail.alt = image.Title;
      button.appendChild(thumbnail);

      button.addEventListener("click", () => {
        productImage.removeAttribute("srcset");
        productImage.src = image.Src;
        productImage.alt = image.Title;
      });

      imageOptions.appendChild(button);
    });
    imageOptions.hidden = false;
  }

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
  selectedColor = product.Colors[0];
  renderColorOptions(product);
}

function renderColorOptions(product) {
  const container = document.querySelector("#colorOptions");
  container.innerHTML = "";
  if (!product.Colors || product.Colors.length <= 1) return;

  product.Colors.forEach((color, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "color-swatch";
    btn.title = color.ColorName;
    btn.setAttribute("aria-pressed", index === 0);
    btn.innerHTML = `<img src="${color.ColorChipImageSrc}" alt="${color.ColorName}" />`;

    btn.addEventListener("click", () => {
      const productImage = document.querySelector("#productImage");
      productImage.removeAttribute("srcset");
      productImage.src = color.ColorPreviewImageSrc;

      document.querySelector("#productColorName").innerText = color.ColorName;
      container
        .querySelectorAll("button")
        .forEach((b) => b.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");
      selectedColor = color;
    });
    container.appendChild(btn);
  });
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
async function renderRecommendations(currentProduct) {
  const products = await getProductsByCategory(currentProduct.Category);
  const candidates = products.filter((item) => item.Id !== currentProduct.Id);
  const recommendations = [];
  const count = Math.min(3, candidates.length);

  while (count > recommendations.length) {
    const randomIndex = Math.floor(Math.random() * candidates.length);
    const selectedProduct = candidates.splice(randomIndex, 1)[0];
    recommendations.push(selectedProduct);
  }
  const list = document.querySelector("#recommendedProducts");
  const section = document.querySelector(".recommendations");

  if (recommendations.length === 0) return;
  recommendations.forEach((item) => {
    const card = document.createElement("li");
    const photo = document.createElement("img");
    const link = document.createElement("a");
    card.className = "product-card";
    link.textContent = item.Name;
    photo.src = item.Images.PrimarySmall;
    photo.alt = "";
    link.href = "/product_pages/index.html?product=" + item.Id;
    list.appendChild(card);
    link.prepend(photo);
    card.appendChild(link);
  });
  section.hidden = false;
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
    await renderRecommendations(product);

    document.getElementById("addToWishList").addEventListener("click", () => {
      addToWishList(product);
    });
  } catch (err) {
    productSection.innerHTML = `<p>${err.message}</p>`;
    productSection.hidden = false;
  }
}
