import productList from "./productList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";
const selector = ".product-list";
const category = getParam("category");
const searchTerm = getParam("search");

productList(selector, category, searchTerm);

async function init() {
  await loadHeaderFooter();
}

init();
