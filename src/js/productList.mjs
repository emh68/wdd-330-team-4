import { getData } from "./productData.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
            <a href="product_pages/index.html?product=${product.Id}">
            <img src="${product.Image}"
                alt="Image of ${product.Name}" />
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.NameWithoutBrand}</h2>
            <p class="product-card__price">$${product.FinalPrice}</p>
            </a>
        </li>`;
}

function renderList(list, selector) {
  //filtering wanted tents
  const wantedIds = ["880RR", "985RF", "985PR", "344YJ"];
  const filteredProducts = list.filter((product) => {
    return wantedIds.includes(product.Id);
  });
  //call the template function once for each product in our list,
  const liHtml = filteredProducts.map((item) => {
    return productCardTemplate(item);
  });
  selector.innerHTML = liHtml.join("");
}

export default async function productList(selector, category) {
  const jsonProductList = await getData(category);
  const element = document.querySelector(selector);
  renderList(jsonProductList, element);
}
