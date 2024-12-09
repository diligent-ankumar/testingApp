"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('.login-btn');
    const signupButton = document.querySelector('.signup-btn');
    const signupForm = document.getElementById('signupForm');
    const handleLoginClick = () => {
        window.location.href = 'signUp.html';
    };
    const handleSignupClick = (event) => {
        event.preventDefault();
        if (signupForm.checkValidity()) {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const userDetail = JSON.parse(localStorage.getItem("userDetails") || '{}');
            if (userDetail.email === email && userDetail.password === password) {
                localStorage.setItem("username", userDetail.name);
                localStorage.setItem("isUserLogedIn", "true");
                alert('Login successful!');
                window.location.href = 'index.html';
            }
            else {
                alert('Invalid email or password.');
            }
        }
        else {
            alert('Please fill out all fields correctly.');
        }
    };
    loginButton.addEventListener('click', handleLoginClick);
    signupButton.addEventListener('click', handleSignupClick);
});
