// Persistência e logout para páginas protegidas
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");
const username = localStorage.getItem("username");

if (!token || !username) {
  window.location.href = "/login.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const nameDisplay = document.getElementById("user-name") || document.getElementById("admin-name");

  if (nameDisplay) {
    nameDisplay.textContent = `Bem-vindo, ${username}!`;
  }

  // Se for admin e estiver na página errada
  if (role === "admin" && window.location.pathname.includes("user.html")) {
    window.location.href = "/admin.html";
  }

  // Se for user e tentar acessar admin
  if (role === "user" && window.location.pathname.includes("admin.html")) {
    window.location.href = "/user.html";
  }

  // Logout
  document.getElementById("logout")?.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "/login.html";
  });
});
