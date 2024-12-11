document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.querySelector('.login-btn') as HTMLButtonElement | null;
  const signupButton = document.querySelector('.signup-btn') as HTMLButtonElement | null;
  const signupForm = document.getElementById('signupForm') as HTMLFormElement | null;

  if (!loginButton || !signupButton || !signupForm) {
    console.error("Required elements are missing from the DOM.");
    return;
  }

  const handleLoginClick = (): void => {
    window.location.href = 'signUp.html';
  };

  const handleSignupClick = (event: Event): void => {
    event.preventDefault();

    if (signupForm?.checkValidity()) {
      const email = (document.getElementById('email') as HTMLInputElement)?.value ?? '';
      const password = (document.getElementById('password') as HTMLInputElement)?.value ?? '';

      const users = getUsersFromLocalStorage();

      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        loginUser(user);
      } else {
        alert('Invalid email or password.');
      }
    } else {
      alert('Please fill out all fields correctly.');
    }
  };

  const getUsersFromLocalStorage = (): Array<{ email: string; password: string; name: string }> => {
    return JSON.parse(localStorage.getItem("users") ?? "[]");
  };

  const loginUser = (user: { email: string; password: string; name: string }): void => {
    localStorage.setItem("isUserLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(user));
    alert(`Welcome, ${user.name}!`);
    window.location.href = 'index.html';
  };

  loginButton.addEventListener('click', handleLoginClick);
  signupButton.addEventListener('click', handleSignupClick);
});
