import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
} from "./utils.mjs";

function renderWishList() {
  const wishlist = getLocalStorage("so-wishlist") || [];
  const list = document.querySelector(".wishlist-list");
  list.replaceChildren();

  if (wishlist.length === 0) {
    const message = document.createElement("li");
    message.textContent = "No products found";
    list.appendChild(message);
    return;
  }
  wishlist.forEach((product) => {
    const entry = document.createElement("li");
    entry.className = "wish_product";
    entry.textContent = product.Name;

    const photo = document.createElement("img");
    photo.src = product.Images.PrimarySmall;
    photo.alt = product.Name;
    entry.appendChild(photo);

    const moveButton = document.createElement("button");
    moveButton.type = "button";
    moveButton.textContent = "Add item to cart";

    moveButton.addEventListener("click", () => {
      moveToCart(product);
    });
    entry.appendChild(moveButton);
    list.appendChild(entry);
  });
}

function moveToCart(moveToFavorite) {
  const cart = getLocalStorage("so-cart") || [];
  const existingProduct = cart.find((item) => item.Id === moveToFavorite.Id);

  if (existingProduct) {
    existingProduct.quantity = (existingProduct.quantity || 1) + 1;
  } else {
    cart.push({ ...moveToFavorite, quantity: 1 });
  }
  setLocalStorage("so-cart", cart);

  const wishList = getLocalStorage("so-wishlist") || [];
  const remainingProduct = wishList.filter((item) => {
    return item.Id !== moveToFavorite.Id;
  });
  setLocalStorage("so-wishlist", remainingProduct);
  renderWishList();
}

renderWishList();
loadHeaderFooter();
