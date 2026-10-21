import productList from "./productList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";
const selector = ".product-list";
const category = getParam("category");

productList(selector, category);

async function init() {
  await loadHeaderFooter();
}

init();
