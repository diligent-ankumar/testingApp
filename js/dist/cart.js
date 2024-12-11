"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            var _a, _b, _c, _d, _e;
            const elm = button.closest('.card'); // Cast to HTMLElement
            const itemId = (_a = elm === null || elm === void 0 ? void 0 : elm.dataset) === null || _a === void 0 ? void 0 : _a.itemId;
            const itemName = (_b = elm === null || elm === void 0 ? void 0 : elm.dataset) === null || _b === void 0 ? void 0 : _b.itemName;
            const itemPrice = (_c = elm === null || elm === void 0 ? void 0 : elm.dataset) === null || _c === void 0 ? void 0 : _c.itemPrice;
            const itemQuantity = (_d = elm === null || elm === void 0 ? void 0 : elm.dataset) === null || _d === void 0 ? void 0 : _d.itemQuantity;
            const itemImage = (_e = elm === null || elm === void 0 ? void 0 : elm.dataset) === null || _e === void 0 ? void 0 : _e.file;
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
// Add item to cart
function addToCart(item) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!currentUser || !currentUser.email) {
        alert('Please log in to add items to your cart.');
        window.location.href = 'login.html';
        return;
    }
    // Get the user's cart from localStorage
    const cartKey = `cart_${currentUser.email}`;
    const cartItems = JSON.parse(localStorage.getItem(cartKey) || '[]');
    // Check if the item already exists in the cart
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
        existingItem.quantity += 1; // Increment quantity
    }
    else {
        cartItems.push(Object.assign(Object.assign({}, item), { quantity: 1 })); // Add new item
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
function loadCartItems() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!currentUser || !currentUser.email) {
        return;
    }
    const cartKey = `cart_${currentUser.email}`;
    const cartItems = JSON.parse(localStorage.getItem(cartKey) || '[]');
    const cartContainer = document.getElementById('cartContainer');
    const checkoutButton = document.querySelector('.checkout-btn');
    if (!cartContainer)
        return;
    cartContainer.innerHTML = ''; // Clear existing items
    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty!</p>';
        checkoutButton === null || checkoutButton === void 0 ? void 0 : checkoutButton.classList.add('disabled');
        updateCartSummary(0);
        return;
    }
    let total = 0;
    cartItems.forEach((item) => {
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
function updateCartSummary(total) {
    const totalPriceElement = document.getElementById('totalPrice');
    const grandTotalElement = document.getElementById('grandTotal');
    if (totalPriceElement && grandTotalElement) {
        totalPriceElement.textContent = `$${total.toFixed(2)}`;
        grandTotalElement.textContent = `$${total.toFixed(2)}`;
    }
}
// Set up event listeners for quantity changes and item removal
function setupCartEventListeners() {
    const cartContainer = document.getElementById('cartContainer');
    const checkoutButton = document.querySelector('.checkout-btn');
    if (!cartContainer)
        return;
    cartContainer.addEventListener('change', event => {
        const target = event.target;
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
        const target = event.target;
        if (target && target.classList.contains('delete-icon')) {
            const cartItemElement = target.closest('.cart-item');
            if (cartItemElement) {
                const itemId = cartItemElement.getAttribute('data-id');
                removeCartItem(itemId);
            }
        }
    });
    checkoutButton === null || checkoutButton === void 0 ? void 0 : checkoutButton.addEventListener('click', event => {
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
function updateCartItemQuantity(itemId, quantity) {
    if (!itemId)
        return;
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const cartKey = `cart_${currentUser.email}`;
    const cartItems = JSON.parse(localStorage.getItem(cartKey) || '[]');
    const item = cartItems.find((cartItem) => cartItem.id === itemId);
    if (item) {
        item.quantity = quantity;
        localStorage.setItem(cartKey, JSON.stringify(cartItems));
        loadCartItems(); // Reload cart
    }
}
// Remove an item from the cart
function removeCartItem(itemId) {
    if (!itemId)
        return;
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const cartKey = `cart_${currentUser.email}`;
    let cartItems = JSON.parse(localStorage.getItem(cartKey) || '[]');
    cartItems = cartItems.filter((cartItem) => cartItem.id !== itemId);
    localStorage.setItem(cartKey, JSON.stringify(cartItems));
    loadCartItems(); // Reload cart
    updateCartItemCount(); // Update cart count in the navbar
}
function updateCartItemCount() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!currentUser || !currentUser.email) {
        return;
    }
    const cartKey = `cart_${currentUser.email}`;
    const cartItems = JSON.parse(localStorage.getItem(cartKey) || '[]');
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems.toString();
        cartCountElement.style.display = totalItems > 0 ? 'inline-block' : 'none';
    }
}
