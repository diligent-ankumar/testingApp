type User = { name: string; email: string; password: string };

const getUsersFromLocalStorage = (): User[] => {
  try {
    return JSON.parse(localStorage.getItem("users") as string) || [];
  } catch {
    return [];
  }
};

const saveUsersToLocalStorage = (users: User[]): void => {
  localStorage.setItem("users", JSON.stringify(users));
};

const registerUser = (name: string, email: string, password: string): void => {
  const users = getUsersFromLocalStorage();

  if (users.some(user => user.email === email)) {
    alert("User already exists. Please login.");
    window.location.href = "login.html";
    return;
  }

  const newUser: User = { name, email, password };
  users.push(newUser);
  saveUsersToLocalStorage(users);
  alert("Registration successful! Please login.");
  window.location.href = "login.html";
};

const loginUser = (email: string, password: string): void => {
  const users = getUsersFromLocalStorage();

  const user = users.find(user => user.email === email && user.password === password);
  if (!user) {
    alert("Invalid email or password.");
    return;
  }

  localStorage.setItem("isUserLoggedIn", "true");
  localStorage.setItem("currentUser", JSON.stringify(user));
  alert(`Welcome, ${user.name}!`);
  window.location.href = "dashboard.html";
};

const checkLoginStatus = (): void => {
  const isLoggedIn = localStorage.getItem("isUserLoggedIn");
  if (!isLoggedIn) {
    alert("You are not logged in. Redirecting to login page.");
    window.location.href = "login.html";
  }
};

const logoutUser = (): void => {
  localStorage.removeItem("isUserLoggedIn");
  localStorage.removeItem("currentUser");
  alert("You have been logged out.");
  window.location.href = "index.html";
};

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm") as HTMLFormElement | null;
  const loginForm = document.getElementById("loginForm") as HTMLFormElement | null;
  const loginButton = document.querySelector(".login-btn") as HTMLButtonElement | null;

  if (signupForm) {
    signupForm.addEventListener("submit", (event: Event) => {
      event.preventDefault();
      const name = (document.getElementById("name") as HTMLInputElement).value;
      const email = (document.getElementById("email") as HTMLInputElement).value;
      const password = (document.getElementById("password") as HTMLInputElement).value;

      registerUser(name, email, password);
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (event: Event) => {
      event.preventDefault();
      const email = (document.getElementById("email") as HTMLInputElement).value;
      const password = (document.getElementById("password") as HTMLInputElement).value;

      loginUser(email, password);
    });
  }

  if (loginButton) {
    loginButton.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  }
});