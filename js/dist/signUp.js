"use strict";
const getUsersFromLocalStorage = () => {
    try {
        return JSON.parse(localStorage.getItem("users")) || [];
    }
    catch (_a) {
        return [];
    }
};
const saveUsersToLocalStorage = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
};
const registerUser = (name, email, password) => {
    const users = getUsersFromLocalStorage();
    if (users.some(user => user.email === email)) {
        alert("User already exists. Please login.");
        window.location.href = "login.html";
        return;
    }
    const newUser = { name, email, password };
    users.push(newUser);
    saveUsersToLocalStorage(users);
    alert("Registration successful! Please login.");
    window.location.href = "login.html";
};
const loginUser = (email, password) => {
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
const checkLoginStatus = () => {
    const isLoggedIn = localStorage.getItem("isUserLoggedIn");
    if (!isLoggedIn) {
        alert("You are not logged in. Redirecting to login page.");
        window.location.href = "login.html";
    }
};
const logoutUser = () => {
    localStorage.removeItem("isUserLoggedIn");
    localStorage.removeItem("currentUser");
    alert("You have been logged out.");
    window.location.href = "index.html";
};
document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");
    const loginButton = document.querySelector(".login-btn");
    if (signupForm) {
        signupForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            registerUser(name, email, password);
        });
    }
    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            loginUser(email, password);
        });
    }
    if (loginButton) {
        loginButton.addEventListener("click", () => {
            window.location.href = "login.html";
        });
    }
});
