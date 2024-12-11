"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".card");
    // Filter functionality
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            filterButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");
            const filter = button.textContent;
            cards.forEach((card) => {
                const brand = card.getAttribute("data-brand");
                if (filter === "All" || brand === filter) {
                    card.style.display = "block";
                }
                else {
                    card.style.display = "none";
                }
            });
        });
    });
    // HTML structure for card options
    const cardOptionsHTML = `
    <div class="card-options">
      <button class="add-to-cart-btn">Add to Cart</button>
      <button class="add-to-wishlist-btn">Add to Wishlist</button>
      <button>Quick View</button>
      <button>Compare</button>
    </div>
  `;
    // Loop through each card and add the options
    cards.forEach(card => {
        card.insertAdjacentHTML("beforeend", cardOptionsHTML);
    });
    // Wishlist functionality
    const addToWishlistButtons = document.querySelectorAll(".add-to-wishlist-btn");
    addToWishlistButtons.forEach(button => {
        button.addEventListener("click", () => {
            var _a, _b, _c, _d, _e;
            const card = button.closest(".card");
            const itemId = (_a = card === null || card === void 0 ? void 0 : card.dataset) === null || _a === void 0 ? void 0 : _a.itemId;
            const itemName = (_b = card === null || card === void 0 ? void 0 : card.dataset) === null || _b === void 0 ? void 0 : _b.itemName;
            const itemPrice = ((_c = card === null || card === void 0 ? void 0 : card.dataset) === null || _c === void 0 ? void 0 : _c.itemPrice) || "0";
            const itemQuantity = ((_d = card === null || card === void 0 ? void 0 : card.dataset) === null || _d === void 0 ? void 0 : _d.itemQuantity) || "1";
            const itemImage = (_e = card === null || card === void 0 ? void 0 : card.dataset) === null || _e === void 0 ? void 0 : _e.file;
            if (!itemId || !itemName) {
                console.error("Item details are missing!");
                return;
            }
            addToWishlist({ id: itemId, name: itemName, price: parseFloat(itemPrice), itemImage, size: 'Adult' });
        });
    });
});
// Add item to wishlist
function addToWishlist(item) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (!currentUser || !currentUser.email) {
        alert("Please log in to add items to your wishlist.");
        window.location.href = "login.html";
        return;
    }
    // Get the user's wishlist from localStorage
    const wishlistKey = `wishlist_${currentUser.email}`;
    const wishlistItems = JSON.parse(localStorage.getItem(wishlistKey) || "[]");
    // Check if the item already exists in the wishlist
    const existingItem = wishlistItems.find(wishlistItem => wishlistItem.id === item.id);
    if (existingItem) {
        alert("Item is already in your wishlist!");
    }
    else {
        wishlistItems.push(item); // Add new item
        localStorage.setItem(wishlistKey, JSON.stringify(wishlistItems));
        alert("Item added to wishlist!");
        WishlistCount();
    }
}
function WishlistCount() {
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
