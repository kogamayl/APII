export async function login(email, password) {
    try {
        const response = await fetch("http://localhost:3000/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token);
            console.log(data.token);

            window.location.href = "tarefas.html";
        } else {
            document.getElementById("error").textContent = data.error;
        }
    } catch (err) {
        document.getElementById("error").textContent = "Erro ao conectar com o servidor.";
    }
}