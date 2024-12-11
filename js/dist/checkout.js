"use strict";
const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
if (!currentUser || !currentUser.email) {
    alert('Please log before continue.');
    window.location.href = 'login.html';
}
