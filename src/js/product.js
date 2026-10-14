import { getParam, loadHeaderFooter } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

const productId = getParam("product");
document.querySelector(".breadcrumbs").textContent = "Tents";

productDetails(productId);
loadHeaderFooter();