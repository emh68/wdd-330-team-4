import { loadHeaderFooter } from "./utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs";

checkoutProcess.init("so-cart", "#orderSummary");
loadHeaderFooter();

const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const response = await checkoutProcess.checkout(form);
    console.log("Server response:", response);
  } catch (error) {
    console.error("Checkout failed:", error);
  }
});
//checkoutProcess.init("so-cart", ".products");
//loadHeaderFooter();

//document.querySelector("#zip-code").addEventListener("change", (event) => {
//  if (event.target.validity.valid && event.target.value.trim() !== "") {
//    checkoutProcess.calculateOrdertotal();
//  }
//});

//document.querySelector("form").addEventListener("submit", async (event) => {
//  event.preventDefault();
//  checkoutProcess.calculateOrdertotal();
//  await checkoutProcess.checkout(event.currentTarget);
//});
