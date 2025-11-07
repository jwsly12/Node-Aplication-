//login
const loginForm = document.getElementById("login");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        
        /*
        Possível falha de sequestro de sessão caso 
        exista um xss 
        Dados sensíveis não podem fica no local storage
        */
        
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("role", data.role);
        sessionStorage.setItem("username", username); 

        
        // Redireciona conforme o cargo
        if (data.role === "admin") {
          window.location.href = "/admin.html";
        } else {
          window.location.href = "/user.html";
        }
      } else {
        alert(data.error || "Erro no login");
      }
    } catch (err) {
      console.error(err);
      alert("Erro de conexão com o servidor");
    }
  });
}

// Registro comum
const registerForm = document.getElementById("register");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        window.location.href = "/login.html";
      } else {
        alert(data.error || "Erro no registro");
      }
    } catch (err) {
      console.error(err);
      alert("Erro de conexão com o servidor");
    }
  });
}

