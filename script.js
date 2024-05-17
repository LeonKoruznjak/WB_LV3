const cartButton = document.querySelector(".cart-button");
const cartBadge = document.querySelector(".cart-badge");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".close");
const buyButton = document.querySelector(".buy-btn");
const cartItemsList = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const itemsGrid = document.querySelector(".items-grid");

let items = [
  {
    id: 1,
    name: "Apple",
    price: 0.99,
  },
  {
    id: 2,
    name: "Banana",
    price: 1.5,
  },
];

let cart = [];

function fillItemsGrid() {
  itemsGrid.innerHTML = "";
  for (const item of items) {
    let itemElement = document.createElement("div");
    itemElement.classList.add("item");
    itemElement.innerHTML = `
            <img src="https://picsum.photos/200/300?random=${item.id}" alt="${
      item.name
    }">
            <h2>${item.name}</h2>
            <p>$${item.price.toFixed(2)}</p>
            <button class="add-to-cart-btn" data-id="${
              item.id
            }">Add to cart</button>
        `;
    itemsGrid.appendChild(itemElement);
  }

  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", addToCart);
  });
}

function toggleModal() {
  console.log("Button clicked");

  modal.classList.toggle("show-modal");
}

function updateCartBadge() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartBadge.textContent = totalItems;
}

function updateCart() {
  cartItemsList.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const cartItem = document.createElement("li");
    cartItem.innerHTML = `
      ${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(
      2
    )} <span class="remove-item" data-id="${item.id}">&times;</span>
    `;
    cartItemsList.appendChild(cartItem);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = `$${total.toFixed(2)}`;

  const removeButtons = document.querySelectorAll(".remove-item");
  removeButtons.forEach((button) => {
    button.addEventListener("click", removeFromCart);
  });
}

function addToCart(event) {
  const itemId = event.target.dataset.id;
  const item = items.find((item) => item.id == itemId);
  const cartItem = cart.find((cartItem) => cartItem.id == itemId);

  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  updateCartBadge();
  updateCart();
}

function removeFromCart(event) {
  const itemId = event.target.dataset.id;
  const cartItemIndex = cart.findIndex((item) => item.id == itemId);

  if (cartItemIndex !== -1) {
    cart.splice(cartItemIndex, 1);
  }

  updateCartBadge();
  updateCart();
}

function buyItems() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  alert("Purchase successful!");
  cart = [];
  updateCartBadge();
  updateCart();
}

fillItemsGrid();
cartButton.addEventListener("click", toggleModal);
modalClose.addEventListener("click", toggleModal);
buyButton.addEventListener("click", buyItems);
