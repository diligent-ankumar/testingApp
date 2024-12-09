document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.querySelector('.login-btn') as HTMLButtonElement;
  const signupButton = document.querySelector('.signup-btn') as HTMLButtonElement;
  const signupForm = document.getElementById('signupForm') as HTMLFormElement;

  const handleLoginClick = () => {
    window.location.href = 'signUp.html';
  };

  const handleSignupClick = (event: Event) => {
    event.preventDefault();
    if (signupForm.checkValidity()) {
      const email = (document.getElementById('email') as HTMLInputElement).value;
      const password = (document.getElementById('password') as HTMLInputElement).value;

      const userDetail = JSON.parse(localStorage.getItem("userDetails") || '{}');
      if (userDetail.email === email && userDetail.password === password) {
        localStorage.setItem("username", userDetail.name);
        localStorage.setItem("isUserLogedIn", "true");
        alert('Login successful!');
        window.location.href = 'index.html';
      } else {
        alert('Invalid email or password.');
      }
    } else {
      alert('Please fill out all fields correctly.');
    }
  };

  loginButton.addEventListener('click', handleLoginClick);
  signupButton.addEventListener('click', handleSignupClick);
});