document.addEventListener("DOMContentLoaded", () => {
  const filterButtons: NodeListOf<Element> = document.querySelectorAll(".filter-btn");
  const cards: NodeListOf<Element> = document.querySelectorAll(".card");

  // Filter functionality
  filterButtons.forEach((button: Element) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn: Element) => btn.classList.remove("active"));

      button.classList.add("active");

      const filter: string | null = button.textContent;

      cards.forEach((card: Element) => {
        const brand: string | null = card.getAttribute("data-brand");

        if (filter === "All" || brand === filter) {
          (card as HTMLElement).style.display = "block";
        } else {
          (card as HTMLElement).style.display = "none";
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
      const card = button.closest(".card") as HTMLElement;
      const itemId = card?.dataset?.itemId;
      const itemName = card?.dataset?.itemName; 
      const itemPrice = card?.dataset?.itemPrice || "0"; 
      const itemQuantity = card?.dataset?.itemQuantity || "1";
      const itemImage = card?.dataset?.file;
      
      if (!itemId || !itemName) {
        console.error("Item details are missing!");
        return;
      }

      addToWishlist({ id: itemId, name: itemName, price: parseFloat(itemPrice), itemImage, size: 'Adult' });
    });


  });
});

// Wishlist item type
type WishlistItem = {
  id: any;
  name: string;
  color?: string;
  size?: string;
  price: number;
  itemImage?: string;
  quantity?: number;
};

// Add item to wishlist
function addToWishlist(item: WishlistItem): void {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  if (!currentUser || !currentUser.email) {
    alert("Please log in to add items to your wishlist.");
    window.location.href = "login.html";
    return;
  }

  // Get the user's wishlist from localStorage
  const wishlistKey = `wishlist_${currentUser.email}`;
  const wishlistItems: WishlistItem[] = JSON.parse(localStorage.getItem(wishlistKey) || "[]");

  // Check if the item already exists in the wishlist
  const existingItem = wishlistItems.find(wishlistItem => wishlistItem.id === item.id);
  if (existingItem) {
    alert("Item is already in your wishlist!");
  } else {
    wishlistItems.push(item); // Add new item
    localStorage.setItem(wishlistKey, JSON.stringify(wishlistItems));
    alert("Item added to wishlist!");
    WishlistCount();
  }
}

function WishlistCount(): void {
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