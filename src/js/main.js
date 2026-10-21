import { loadHeaderFooter } from "./utils.mjs";

async function init() {
  await loadHeaderFooter();
}

init();

const newsletterForm = document.querySelector("#newsletter-form");

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  alert("Newsletter subscriptions are not available yet.");
});
