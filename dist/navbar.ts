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
  const logoutLink = document.getElementById('logoutLink');
  const cartDisplay = document.getElementById('cartDisplay');
  const wishlistDisplay = document.getElementById('wishlistDisplay');
  const isUserLoggedIn = localStorage.getItem('isUserLoggedIn');

  if (isUserLoggedIn === "true") {
    // Get the current user's details
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    if (userDisplay) {
      userDisplay.innerHTML = `
        <span class="username">
          <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/user-male-circle.png" 
               title="${currentUser.name || 'User'}" alt="user-male-circle" />
        </span>`;
    }
    if (cartDisplay) cartDisplay.classList.remove('d-none');
    if (wishlistDisplay) wishlistDisplay.classList.remove('d-none');
    if (logoutLink) logoutLink.classList.remove('d-none');
    if (loginLink) loginLink.style.display = 'none';
  } else {
    if (loginLink) loginLink.style.display = "inline-block";
  }

  setupLogoutButton();
  updateWishlistCount();
  updateCartCount();
}

function setupLogoutButton(): void {
  const logoutButton = document.getElementById('logoutLink') as HTMLButtonElement | null;
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      // Clear session details
      localStorage.removeItem("isUserLoggedIn");
      localStorage.removeItem("currentUser");
      alert('You have been logged out.');
      window.location.href = 'login.html';
    });
  }
}

function updateWishlistCount(): void {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  if (!currentUser || !currentUser.email) {
    return;
  }

  const wishlistKey = `wishlist_${currentUser.email}`;
  const wishlistItems = JSON.parse(localStorage.getItem(wishlistKey) || '[]');
  
  const wishlistCountElement = document.getElementById('wishlistCount');
  if (wishlistCountElement) {
    wishlistCountElement.textContent = wishlistItems.length.toString();
    wishlistCountElement.style.display = wishlistItems.length > 0 ? 'inline-block' : 'none';
  }
}

function updateCartCount(): void {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  if (!currentUser || !currentUser.email) {
    return;
  }

  const cartKey = `cart_${currentUser.email}`;
  const cartItems: CartItem[] = JSON.parse(localStorage.getItem(cartKey) || '[]');

  const cartCountElement = document.getElementById('cartCount');
  if (cartCountElement) {
    const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    cartCountElement.textContent = totalItems.toString();
    cartCountElement.style.display = totalItems > 0 ? 'inline-block' : 'none';
  }
}

function checkoutWithoutLogedIn(): void {
  const logoutButton = document.getElementById('logoutLink') as HTMLButtonElement | null;
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      // Clear session details
      localStorage.removeItem("isUserLoggedIn");
      localStorage.removeItem("currentUser");
      alert('You have been logged out.');
      window.location.href = 'login.html';
    });
  }
}
