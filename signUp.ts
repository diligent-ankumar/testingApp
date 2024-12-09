document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.querySelector(
    ".login-btn"
  ) as HTMLButtonElement | null;
  const signupButton = document.querySelector(
    ".signup-btn"
  ) as HTMLButtonElement | null;
  const signupForm = document.getElementById(
    "signupForm"
  ) as HTMLFormElement | null;

  if (!loginButton || !signupButton || !signupForm) {
    console.error("Required elements are missing from the DOM.");
    return;
  }

  // Add event listener for login button
  loginButton.addEventListener("click", () => {
    window.location.href = "login.html";
  });

  // Add event listener for signup button
  signupButton.addEventListener("click", (event: Event) => {
    event.preventDefault();
    if (signupForm.checkValidity()) {
      const usernameInput = document.getElementById(
        "username"
      ) as HTMLInputElement | null;
      const emailInput = document.getElementById(
        "email"
      ) as HTMLInputElement | null;
      const passwordInput = document.getElementById(
        "password"
      ) as HTMLInputElement | null;

      if (!usernameInput || !emailInput || !passwordInput) {
        alert("Please fill out all fields correctly.");
        return;
      }

      const userDetails = {
        name: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
      };

      localStorage.setItem("userDetails", JSON.stringify(userDetails));
      localStorage.setItem("isUserLoggedIn", "true");
      alert("Signup successful!");
      window.location.href = "index.html";
    } else {
      alert("Please fill out all fields correctly.");
    }
  });
});
