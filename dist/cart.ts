"use strict";

document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn') as NodeListOf<HTMLButtonElement>;

  addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const elm = button.closest('.card') as HTMLElement; // Cast to HTMLElement
      const itemId = elm?.dataset?.itemId;
      const itemName = elm?.dataset?.itemName; 
      const itemPrice = elm?.dataset?.itemPrice; 
      const itemQuantity = elm?.dataset?.itemQuantity;
      const itemImage = elm?.dataset?.file;
  
      if (!itemId || !itemName || !itemPrice) {
        console.error('Item details are missing!');
        return;
      }
  
      addToCart({ 
        id: itemId, 
        name: itemName, 
        price: parseFloat(itemPrice), 
        quantity: Number(itemQuantity),
        itemImage: itemImage 
      });
    });
  });
  

  updateCartItemCount();
});

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  itemImage?: string;
};

// Add item to cart
function addToCart(item: CartItem): void {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  if (!currentUser || !currentUser.email) {
    alert('Please log in to add items to your cart.');
    window.location.href = 'login.html';
    return;
  }

  // Get the user's cart from localStorage
  const cartKey = `cart_${currentUser.email}`;
  const cartItems: CartItem[] = JSON.parse(localStorage.getItem(cartKey) || '[]');

  // Check if the item already exists in the cart
  const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
  if (existingItem) {
    existingItem.quantity += 1; // Increment quantity
  } else {
    cartItems.push({ ...item, quantity: 1 }); // Add new item
  }

  // Save updated cart back to localStorage
  localStorage.setItem(cartKey, JSON.stringify(cartItems));
  alert('Item added to cart!');
  updateCartItemCount();
}


document.addEventListener('DOMContentLoaded', () => {
  loadCartItems();
  setupCartEventListeners();
});

// Load cart items from localStorage and display them
function loadCartItems(): void {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  if (!currentUser || !currentUser.email) {
    return;
  }

  const cartKey = `cart_${currentUser.email}`;
  const cartItems = JSON.parse(localStorage.getItem(cartKey) || '[]');

  const cartContainer = document.getElementById('cartContainer');
  const checkoutButton = document.querySelector('.checkout-btn');
  if (!cartContainer) return;

  cartContainer.innerHTML = ''; // Clear existing items

  if (cartItems.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty!</p>';
    checkoutButton?.classList.add('disabled'); 
    updateCartSummary(0);
    return;
  }

  let total = 0;

  cartItems.forEach((item: CartItem) => {
    const itemTotal = item.price * (item.quantity || 1);
    total += itemTotal;

    const cartItemHTML = `
      <div class="cart-item" data-id="${item.id}">
        <img src="assets/images/${item.itemImage}" alt="Product Image">
        <div class="item-details">
          <h2>${item.name}</h2>
          <br/>
          <p><strong>Price:</strong> $${item.price.toFixed(2)}</p>
          <br/>
          <div class="quantity-price">
            <select class="quantity-select">
              ${[1, 2, 3, 4, 5]
                .map(q => `<option value="${q}" ${q === item.quantity ? 'selected' : ''}>${q}</option>`)
                .join('')}
            </select>
            <br/>
            <span class="item-total">$${itemTotal.toFixed(2)}</span>
          </div>
        </div>
        <span class="delete-icon">🗑️</span>
      </div>
    `;

    cartContainer.innerHTML += cartItemHTML;
  });

  updateCartSummary(total);
}

// Update the total price in the cart summary
function updateCartSummary(total: number): void {
  const totalPriceElement = document.getElementById('totalPrice');
  const grandTotalElement = document.getElementById('grandTotal');
  if (totalPriceElement && grandTotalElement) {
    totalPriceElement.textContent = `$${total.toFixed(2)}`;
    grandTotalElement.textContent = `$${total.toFixed(2)}`;
  }
}

// Set up event listeners for quantity changes and item removal
function setupCartEventListeners(): void {
  const cartContainer = document.getElementById('cartContainer');
  const checkoutButton = document.querySelector('.checkout-btn');
  if (!cartContainer) return;

  cartContainer.addEventListener('change', event => {
    const target = event.target as HTMLSelectElement;
    if (target && target.classList.contains('quantity-select')) {
      const cartItemElement = target.closest('.cart-item');
      if (cartItemElement) {
        const itemId = cartItemElement.getAttribute('data-id');
        const quantity = parseInt(target.value, 10);
        updateCartItemQuantity(itemId, quantity);
      }
    }
  });

  cartContainer.addEventListener('click', event => {
    const target = event.target as HTMLElement;
    if (target && target.classList.contains('delete-icon')) {
      const cartItemElement = target.closest('.cart-item');
      if (cartItemElement) {
        const itemId = cartItemElement.getAttribute('data-id');
        removeCartItem(itemId);
      }
    }
  });

  checkoutButton?.addEventListener('click', event => {
    updateCartSummary(0);
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!currentUser || !currentUser.email) {
      alert('Please log in to view your cart.');
      window.location.href = 'login.html';
      return;
    }
    localStorage.removeItem(`cart_${currentUser.email}`);
    window.location.href = 'checkout.html';
  });
}

// Update the quantity of an item in the cart
function updateCartItemQuantity(itemId: string | null, quantity: number): void {
  if (!itemId) return;

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const cartKey = `cart_${currentUser.email}`;
  const cartItems = JSON.parse(localStorage.getItem(cartKey) || '[]');

  const item = cartItems.find((cartItem: any) => cartItem.id === itemId);
  if (item) {
    item.quantity = quantity;
    localStorage.setItem(cartKey, JSON.stringify(cartItems));
    loadCartItems(); // Reload cart
  }
}

// Remove an item from the cart
function removeCartItem(itemId: string | null): void {
  if (!itemId) return;

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const cartKey = `cart_${currentUser.email}`;
  let cartItems = JSON.parse(localStorage.getItem(cartKey) || '[]');

  cartItems = cartItems.filter((cartItem: any) => cartItem.id !== itemId);
  localStorage.setItem(cartKey, JSON.stringify(cartItems));
  loadCartItems(); // Reload cart
  updateCartItemCount(); // Update cart count in the navbar
}

function updateCartItemCount(): void {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  if (!currentUser || !currentUser.email) {
    return;
  }

  const cartKey = `cart_${currentUser.email}`;
  const cartItems: CartItem[] = JSON.parse(localStorage.getItem(cartKey) || '[]');

  const cartCountElement = document.getElementById('cartCount');
  if (cartCountElement) {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems.toString();
    cartCountElement.style.display = totalItems > 0 ? 'inline-block' : 'none';
  }
}