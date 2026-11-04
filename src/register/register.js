import { registerUser } from "../js/externalServices.mjs";
import { loadHeaderFooter } from "../js/utils.mjs";

loadHeaderFooter();

const form = document.querySelector("#registration-form");
const message = document.querySelector("#registration-message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);

  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  if (password != confirmPassword) {
    message.textContent = "Passwords do not match";
    return;
  }

  const user = {
    name: formData.get("name").trim(),
    address: formData.get("address").trim(),
    email: formData.get("email").trim(),
    password: password,
  };

  const submitButton = form.querySelector('button[type="submit"]');
  try {
    submitButton.disabled = true;
    message.textContent = "Creating you account...";

    const result = await registerUser(user);

    message.textContent = "Account created successfully";
    form.reset();
  } catch (error) {
    message.textContent = error.message;
  } finally {
    submitButton.disabled = false;
  }
});
