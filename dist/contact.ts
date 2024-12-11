document.addEventListener('DOMContentLoaded', () => {
  const form: HTMLFormElement | null = document.getElementById('contactForm') as HTMLFormElement;
  const inputs: NodeListOf<HTMLInputElement | HTMLTextAreaElement> = form.querySelectorAll('input, textarea');
  const sendButton: HTMLButtonElement | null = document.getElementById('sendButton') as HTMLButtonElement;

  function validateForm(): void {
      const allFilled: boolean = Array.from(inputs).every(input => input.value.trim() !== '');
      if (sendButton) {
          sendButton.disabled = !allFilled; // Enable the button if all fields are filled
      }
  }

  inputs.forEach(input => {
      input.addEventListener('input', validateForm);
  });

  form.addEventListener('submit', function (e: Event): void {
      e.preventDefault(); // Prevent actual form submission
      alert('Your message has been sent successfully!');
      form.reset();
      if (sendButton) {
          sendButton.disabled = true; // Disable the button again after submission
      }
  });
});