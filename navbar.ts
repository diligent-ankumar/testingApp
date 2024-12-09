"use strict";

const navbar: HTMLElement | null = document.getElementById('navbar');
if (navbar) {
  fetch('navbar.html')
    .then((response: Response) => response.text())
    .then((data: string) => {
      navbar.innerHTML = data;
      initializeNavbar();
    })
    .catch((error: Error) => console.error('Error loading navbar:', error));
} else {
  console.error('Navbar element not found');
}

function initializeNavbar(): void {
  const userDisplay = document.getElementById('userDisplay');
  const loginLink = document.getElementById('loginLink');
  const logoutDisplay = document.getElementById('logoutDisplay');
  const cartDisplay = document.getElementById('cartDisplay');
  const wishlistDisplay = document.getElementById('wishlistDisplay');
  const isUserLoggedIn = localStorage.getItem('isUserLoggedIn');

  if (isUserLoggedIn) {
    const userDetails = localStorage.getItem('userDetails');
    const user = JSON.parse(userDetails || '{}');
    if (userDisplay) {
      userDisplay.innerHTML = `<span class="username"><img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/user-male-circle.png" title="${user.name}" alt="user-male-circle"/></span>`;
      if (logoutDisplay) logoutDisplay.style.display = "inline-block";
    }

    if (cartDisplay) cartDisplay.classList.remove('d-none');
    if (wishlistDisplay) wishlistDisplay.classList.remove('d-none');
  } else {
    if (loginLink) {
      loginLink.style.display = "inline-block";
    }
  }

  setupLogoutButton();
  updateCartCount(1);
}

function setupLogoutButton(): void {
  const logoutButton = document.getElementById('logoutDisplay') as HTMLButtonElement;
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem("isUserLoggedIn");
      window.location.href = 'index.html';
    });
  }
}

function updateCartCount(count: number): void {
  const cartCountElement = document.getElementById('cartCount');
  if (cartCountElement) {
    if (count > 0) {
      cartCountElement.textContent = count.toString();
      cartCountElement.style.display = 'inline-block';
    } else {
      cartCountElement.style.display = 'none';
    }
  }
}