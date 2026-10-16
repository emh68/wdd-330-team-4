import productList from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const selector = ".product-list";
const category = "tents";

productList(selector, category);

async function init() {
  await loadHeaderFooter();
}

init();

const newsletterForm = document.querySelector("#newsletter-form");

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  alert("Newsletter subscriptions are not available yet.");
});
