const form = document.querySelector("#registration-form");
const message = document.querySelector("#registration-message");

form.addEventListener("submit", (event) => {
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

  message.textContent = "Form validation successfull!";
});
