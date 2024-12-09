"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');
    const sendButton = document.getElementById('sendButton');
    function validateForm() {
        const allFilled = Array.from(inputs).every(input => input.value.trim() !== '');
        if (sendButton) {
            sendButton.disabled = !allFilled; // Enable the button if all fields are filled
        }
    }
    inputs.forEach(input => {
        input.addEventListener('input', validateForm);
    });
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent actual form submission
        alert('Your message has been sent successfully!');
        form.reset();
        if (sendButton) {
            sendButton.disabled = true; // Disable the button again after submission
        }
    });
});
