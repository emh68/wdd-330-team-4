import productList from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const selector = ".product-list";
const category = "tents";

productList(selector, category);
loadHeaderFooter();