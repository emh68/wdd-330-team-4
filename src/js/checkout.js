/*import { loadHeaderFooter } from "./utils.mjs";
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
});*/
import { loadHeaderFooter } from "./utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs";

loadHeaderFooter();

checkoutProcess.init("so-cart", "#orderSummary");

document
  .querySelector("#zip")
  .addEventListener(
    "blur",
    checkoutProcess.calculateOrdertotal.bind(checkoutProcess),
  );

// this is how it would look if we listen for the submit on the form
document.forms["checkout"].addEventListener("submit", (e) => {
  e.preventDefault();
  // e.target would contain our form in this case
  checkoutProcess.checkout(e.target);
});
