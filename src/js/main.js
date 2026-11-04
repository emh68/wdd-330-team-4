import { loadHeaderFooter } from "./utils.mjs";
import alert from "./alert.mjs";

async function init() {
  await loadHeaderFooter();

  const alerts = new alert();
  await alerts.init();
}

init();

const newsletterForm = document.querySelector("#newsletter-form");

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  alert("Newsletter subscriptions are not available yet.");
});
