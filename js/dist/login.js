"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('.login-btn');
    const signupButton = document.querySelector('.signup-btn');
    const signupForm = document.getElementById('signupForm');
    if (!loginButton || !signupButton || !signupForm) {
        console.error("Required elements are missing from the DOM.");
        return;
    }
    const handleLoginClick = () => {
        window.location.href = 'signUp.html';
    };
    const handleSignupClick = (event) => {
        var _a, _b, _c, _d;
        event.preventDefault();
        if (signupForm === null || signupForm === void 0 ? void 0 : signupForm.checkValidity()) {
            const email = (_b = (_a = document.getElementById('email')) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : '';
            const password = (_d = (_c = document.getElementById('password')) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : '';
            const users = getUsersFromLocalStorage();
            const user = users.find(u => u.email === email && u.password === password);
            if (user) {
                loginUser(user);
            }
            else {
                alert('Invalid email or password.');
            }
        }
        else {
            alert('Please fill out all fields correctly.');
        }
    };
    const getUsersFromLocalStorage = () => {
        var _a;
        return JSON.parse((_a = localStorage.getItem("users")) !== null && _a !== void 0 ? _a : "[]");
    };
    const loginUser = (user) => {
        localStorage.setItem("isUserLoggedIn", "true");
        localStorage.setItem("currentUser", JSON.stringify(user));
        alert(`Welcome, ${user.name}!`);
        window.location.href = 'index.html';
    };
    loginButton.addEventListener('click', handleLoginClick);
    signupButton.addEventListener('click', handleSignupClick);
});
