const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "index.html";
} else {
    fetch("http://localhost:3000/users", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then(async (res) => {
            if (!res.ok) {
                throw new Error("Token inválido ou expirado");
            }
            const data = await res.json();
            document.getElementById("content").innerHTML = `
            <p>Usuários cadastrados:</p>
            <table>
                <tr>
                    <th>ID</th>
                    <th>NOME</th>
                    <th>EMAIL</th>
                    <th>CARGO</th>
                </tr>
                <tbody >
                    ${data.map((user) => `
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.name}</td>
                            <td>${user.email}</td>
                            <td>${user.role}</td>
                        </tr>
                    `).join("")}
                </tbody>
             </table>
          `;
        })
        .catch(() => {
            localStorage.removeItem("token");
            window.location.href = "index.html";
        });
}

document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "index.html";
});