import { login } from "./login.js";
const form = document.getElementById("loginForm");
const senha = document.getElementById("password");
const img = document.getElementById("img");
const role = document.getElementById("role");
const registerBtn = document.getElementById("registerBtn");

img.addEventListener("click", (event) => {
    if (senha.type === "text") {
        senha.type = "password";
        event.target.src = "./img/image.png";
    } else {
        senha.type = "text";
        event.target.src = "./img/outra.png";
    }
});
registerBtn.addEventListener("click", async () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    if (!name) {
        document.getElementById("error").textContent = "Por favor, insira um nome para criar a conta.";
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password, role }),
        });

        const data = await response.json();

        if (response.ok) {
            // Cadastro bem-sucedido, tenta logar
            await login(email, password);
        } else {
            document.getElementById("error").textContent = data.error || "Erro ao criar usuário.";
        }
    } catch {
        document.getElementById("error").textContent = "Erro ao conectar com o servidor.";
    }
});