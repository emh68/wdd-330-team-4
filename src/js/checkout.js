import { loadHeaderFooter } from "./utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs";

checkoutProcess.init("so-cart", "#itemSubtotal");
loadHeaderFooter();
