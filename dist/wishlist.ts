"use strict";

document.addEventListener('DOMContentLoaded', () => {
  loadWishlistItems();
  setupWishlistEventListeners();
});

function loadWishlistItems(): void {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  if (!currentUser || !currentUser.email) {
    
    return;
  }

  const wishlistKey = `wishlist_${currentUser.email}`;
  const wishlistItems: WishlistItem[] = JSON.parse(localStorage.getItem(wishlistKey) || '[]');

  const wishlistContainer = document.getElementById('wishlistItems');
  const itemCountElement = document.querySelector('.item-count');
  if (!wishlistContainer || !itemCountElement) return;

  wishlistContainer.innerHTML = '';
  itemCountElement.textContent = `${wishlistItems.length} items`;

  if (wishlistItems.length === 0) {
    wishlistContainer.innerHTML = '<p>Your wishlist is empty!</p>';
    return
  }

  wishlistItems.forEach((item: WishlistItem) => {

    const wishlistItemHTML = `
      <div class="wishlist-item" data-id="${item.id}">
        <img src="assets/images/${item.itemImage}" alt="Product Image">
        <div class="item-details">
          <h2>${item.name}</h2>
          <p><strong>Color:</strong> ${item.color || 'N/A'}</p>
          <p><strong>Size:</strong> ${item.size || 'N/A'}</p>
          <p><strong>Price:</strong> $${item?.price?.toFixed(2)}</p>
          <button class="add-to-cart">ADD TO CART</button>
        </div>
        <span class="delete-icon">🗑️</span>
      </div>
    `;
    wishlistContainer.innerHTML += wishlistItemHTML;
  });
}

function setupWishlistEventListeners(): void {
  const wishlistContainer = document.getElementById('wishlistItems');
  if (!wishlistContainer) return;

  wishlistContainer.addEventListener('click', event => {
    const target = event.target as HTMLElement;
    if (target && target.classList.contains('add-to-cart')) {
      const wishlistItemElement = target.closest('.wishlist-item');
      if (wishlistItemElement) {
        const itemId = wishlistItemElement.getAttribute('data-id');
        moveToCart(Number(itemId));
      }
    }

    if (target && target.classList.contains('delete-icon')) {
      const wishlistItemElement = target.closest('.wishlist-item');
      if (wishlistItemElement) {
        const itemId = wishlistItemElement.getAttribute('data-id');
        removeFromWishlist(Number(itemId));
      }
    }
  });
}

function moveToCart(itemId: number | null): void {
  if (!itemId) return;

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const wishlistKey = `wishlist_${currentUser.email}`;
  const cartKey = `cart_${currentUser.email}`;

  let wishlistItems: WishlistItem[] = JSON.parse(localStorage.getItem(wishlistKey) || '[]');
  let cartItems: WishlistItem[] = JSON.parse(localStorage.getItem(cartKey) || '[]');

  const itemIndex = wishlistItems.findIndex((item: WishlistItem) => item.id === itemId.toString());
  if (itemIndex > -1) {
    const item = wishlistItems[itemIndex];
    wishlistItems.splice(itemIndex, 1);

    const existingCartItem = cartItems.find((cartItem: WishlistItem) => cartItem.id === item.id);
    if (existingCartItem) {
      alert('This item is already in your cart.');
    } else {
      cartItems.push({ ...item, quantity: 1 });
      localStorage.setItem(wishlistKey, JSON.stringify(wishlistItems));
      localStorage.setItem(cartKey, JSON.stringify(cartItems));
      alert('Item added to cart!');
      window.location.reload();
    }

  }
}

function removeFromWishlist(itemId: number | null): void {
  if (!itemId) return;

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const wishlistKey = `wishlist_${currentUser.email}`;
  let wishlistItems: WishlistItem[] = JSON.parse(localStorage.getItem(wishlistKey) || '[]');

  wishlistItems = wishlistItems.filter((item: WishlistItem) => item.id !== itemId.toString());
  localStorage.setItem(wishlistKey, JSON.stringify(wishlistItems));
  loadWishlistItems();
  window.location.reload();
}
