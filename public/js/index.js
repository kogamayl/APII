import { login } from "./login.js";
const form = document.getElementById("loginForm");
const senha = document.getElementById("password");
const img = document.getElementById("img");

img.addEventListener("click", (event) => {
    if (senha.type === "text") {
        senha.type = "password"
        event.target.src = "./img/image.png"
    } else {
        senha.type = ""
        event.target.src = "./img/outra.png"

    }

})

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    await login(email, password)
});