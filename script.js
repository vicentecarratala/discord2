const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const goRegisterBtn = document.getElementById("go-register");
const goLoginBtn = document.getElementById("go-login");
const welcomeScreen = document.getElementById("welcome-screen");
const welcomeUser = document.getElementById("welcome-user");
const logoutBtn = document.getElementById("logout-btn");

goRegisterBtn.onclick = () => {
  loginForm.classList.add("hidden");
  registerForm.classList.remove("hidden");
};

goLoginBtn.onclick = () => {
  registerForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
};

registerForm.onsubmit = async (e) => {
  e.preventDefault();
  const username = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;

  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  document.getElementById("register-msg").textContent = data.message;

  if (res.ok) {
    setTimeout(() => {
      registerForm.classList.add("hidden");
      loginForm.classList.remove("hidden");
      document.getElementById("login-username").value = username;
      document.getElementById("register-msg").textContent = "";
      registerForm.reset();
    }, 1000);
  }
};

loginForm.onsubmit = async (e) => {
  e.preventDefault();
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (res.ok) {
    document.getElementById("login-msg").textContent = "";
    loginForm.classList.add("hidden");
    welcomeScreen.classList.remove("hidden");
    welcomeUser.textContent = username;
  } else {
    document.getElementById("login-msg").textContent = data.message;
  }
};

logoutBtn.onclick = () => {
  welcomeScreen.classList.add("hidden");
  loginForm.classList.remove("hidden");
  loginForm.reset();
  document.getElementById("login-msg").textContent = "";
};