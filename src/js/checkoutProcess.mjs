import { getLocalStorage } from "./utils.mjs";
import { checkout } from "./externalService.mjs";

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: item.quantity ?? 1,
    };
  });
  return simplifiedItems;
}

const checkoutProcess = {
  key: "",
  outputSelector: "",
  list: [],
  itemTotal: 0,
  shipping: 0,
  tax: 0,
  orderTotal: 0,
  init: function (key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = getLocalStorage(key);
    this.calculateItemSummary();
  },
  calculateItemSummary: function () {
    const cartItems = this.list || [];

    let quantity = 0;
    let subtotal = 0;

    for (const item of cartItems) {
      const itemQuantity = item.quantity ?? 1;

      quantity += itemQuantity;
      subtotal += item.FinalPrice * itemQuantity;
    }

    this.itemTotal = subtotal;

    document.querySelector("#itemSubtotal").innerHTML = `
        <span>Item Subtotal (${quantity})</span>
        <span>$${subtotal.toFixed(2)}</span>
    `;
  },

  calculateOrdertotal: function () {
    this.shipping = 10 + (this.list.length - 1) * 2;
    this.tax = (this.itemTotal * 0.06).toFixed(2);
    this.orderTotal = ((this.itemTotal) + (this.shipping) + parseFloat(this.tax)).toFixed(2);
    this.displayOrderTotals();
  },
  displayOrderTotals: function () {
   const shipping = document.querySelector(this.outputSelector + " #shipping");
   const tax = document.querySelector(this.outputSelector + " #tax");
   const orderTotal = document.querySelector(this.outputSelector + " #orderTotal");
   shipping.textContent = "$" + this.shipping.toFixed(2);
   tax.textContent = "$" + this.tax;
   orderTotal.textContent = "$" + this.orderTotal;
  },
  checkout: async function (form) {
    const json = formDataToJSON(form);
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);
    try {
      return await checkout(json);
    } catch (err) {
      console.error(err);
    }
  },
};

export default checkoutProcess;
