import { loadHeaderFooter } from "./utils.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
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

const invitation = document.querySelector("#registerInvitation"); //dialog//
const invitationSeen = getLocalStorage("so-register-invitation-seen");

if (!invitationSeen) {
  invitation.showModal();
  setLocalStorage("so-register-invitation-seen", true);
}
