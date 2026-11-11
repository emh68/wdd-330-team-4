import { loadHeaderFooter, getParam } from "../js/utils.mjs";
import { login } from "./auth.mjs";

loadHeaderFooter();

const redirect = getParam("redirect");
document.querySelector('form[name="login"]').addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  login({ email, password }, redirect || "/");
});
