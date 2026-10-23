import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
            <a href="/product_pages/index.html?product=${product.Id}">
            <img src="${product.Images.PrimaryMedium}"                
            alt="Image of ${product.Name}"/>
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.NameWithoutBrand}</h2>
            <p class="product-card__price">$${product.FinalPrice}</p>
            </a>
        </li>`;
}

export default async function productList(selector, category) {
  // get the element we will insert the list into from the selector
  const el = document.querySelector(selector);
  // get the list of products
  const products = await getData(category);
  // render out the product list to the element

  const breadcrumb = document.querySelector(".breadcrumbs");
  if (breadcrumb) {
    const categoryName = category.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

    breadcrumb.textContent = `${categoryName} (${products.length} items)`;
  }

  renderListWithTemplate(productCardTemplate, el, products);
}
