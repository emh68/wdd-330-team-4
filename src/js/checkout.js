import { loadHeaderFooter, getLocalStorage } from "./utils.mjs";

const cart = getLocalStorage("so-cart") || [];

loadHeaderFooter();

console.log(cart);

let subtotal = 0;

cart.forEach((item) => {
  subtotal += item.FinalPrice * (item.quantity || 1);
});

console.log("Subtotal: ", subtotal);

function displayOrderTotals() {
  document.querySelector("#subtotal").textContent = `$${subtotal.toFixed(2)}`;
}

displayOrderTotals();

/*This needs to be added to the HTML in order for it to display the total*/
/*<p>Subtotal: <span id="subtotal"></span></p> */
