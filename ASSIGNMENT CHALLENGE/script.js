// Dummy Data (Indian Food)
const importedData = [
  {
      "image": {
          "thumbnail": "./assets/images/image-waffle-thumbnail.jpg",
          "mobile": "./assets/images/image-waffle-mobile.jpg",
          "tablet": "./assets/images/image-waffle-tablet.jpg",
          "desktop": "./assets/images/image-waffle-desktop.jpg"
      },
      "name": "Waffle with Berries",
      "category": "Waffle",
      "price": 6.50
  },
  {
      "image": {
          "thumbnail": "./assets/images/image-creme-brulee-thumbnail.jpg",
          "mobile": "./assets/images/image-creme-brulee-mobile.jpg",
          "tablet": "./assets/images/image-creme-brulee-tablet.jpg",
          "desktop": "./assets/images/image-creme-brulee-desktop.jpg"
      },
      "name": "Vanilla Bean Crème Brûlée",
      "category": "Crème Brûlée",
      "price": 7.00
  },
  {
      "image": {
          "thumbnail": "./assets/images/image-macaron-thumbnail.jpg",
          "mobile": "./assets/images/image-macaron-mobile.jpg",
          "tablet": "./assets/images/image-macaron-tablet.jpg",
          "desktop": "./assets/images/image-macaron-desktop.jpg"
      },
      "name": "Macaron Mix of Five",
      "category": "Macaron",
      "price": 8.00
  },
  {
      "image": {
          "thumbnail": "./assets/images/image-tiramisu-thumbnail.jpg",
          "mobile": "./assets/images/image-tiramisu-mobile.jpg",
          "tablet": "./assets/images/image-tiramisu-tablet.jpg",
          "desktop": "./assets/images/image-tiramisu-desktop.jpg"
      },
      "name": "Classic Tiramisu",
      "category": "Tiramisu",
      "price": 5.50
  },
  {
      "image": {
          "thumbnail": "./assets/images/image-baklava-thumbnail.jpg",
          "mobile": "./assets/images/image-baklava-mobile.jpg",
          "tablet": "./assets/images/image-baklava-tablet.jpg",
          "desktop": "./assets/images/image-baklava-desktop.jpg"
      },
      "name": "Pistachio Baklava",
      "category": "Baklava",
      "price": 4.00
  },
  {
      "image": {
          "thumbnail": "./assets/images/image-meringue-thumbnail.jpg",
          "mobile": "./assets/images/image-meringue-mobile.jpg",
          "tablet": "./assets/images/image-meringue-tablet.jpg",
          "desktop": "./assets/images/image-meringue-desktop.jpg"
      },
      "name": "Lemon Meringue Pie",
      "category": "Pie",
      "price": 5.00
  },
  {
      "image": {
          "thumbnail": "./assets/images/image-cake-thumbnail.jpg",
          "mobile": "./assets/images/image-cake-mobile.jpg",
          "tablet": "./assets/images/image-cake-tablet.jpg",
          "desktop": "./assets/images/image-cake-desktop.jpg"
      },
      "name": "Red Velvet Cake",
      "category": "Cake",
      "price": 4.50
  },
  {
      "image": {
          "thumbnail": "./assets/images/image-brownie-thumbnail.jpg",
          "mobile": "./assets/images/image-brownie-mobile.jpg",
          "tablet": "./assets/images/image-brownie-tablet.jpg",
          "desktop": "./assets/images/image-brownie-desktop.jpg"
      },
      "name": "Salted Caramel Brownie",
      "category": "Brownie",
      "price": 4.50
  },
  {
      "image": {
          "thumbnail": "./assets/images/image-panna-cotta-thumbnail.jpg",
          "mobile": "./assets/images/image-panna-cotta-mobile.jpg",
          "tablet": "./assets/images/image-panna-cotta-tablet.jpg",
          "desktop": "./assets/images/image-panna-cotta-desktop.jpg"
      },
      "name": "Vanilla Panna Cotta",
      "category": "Panna Cotta",
      "price": 6.50
  }
];

const products = importedData.map((item, index) => ({
    id: index + 1,
    name: item.name,
    category: item.category,
    price: item.price,
    image: item.image.desktop.replace('./assets/', './product-list-with-cart-main/assets/')
}));

let cart = {};

const productGrid = document.getElementById("product-grid");
const cartItemsContainer = document.getElementById("cart-items");
const emptyCartDiv = document.getElementById("empty-cart");
const cartCount = document.getElementById("cart-count");
const subtotalEl = document.getElementById("subtotal");
const taxesEl = document.getElementById("taxes");
const totalPriceEl = document.getElementById("total-price");
const confirmOrderBtn = document.getElementById("confirm-order-btn");

const orderModal = document.getElementById("order-modal");
const closeModalBtn = document.getElementById("close-modal");
const newOrderBtn = document.getElementById("new-order-btn");
const orderReceipt = document.getElementById("order-receipt");
const modalTotalAmount = document.getElementById("modal-total-amount");

const formatPrice = (price) => `$${price.toFixed(2)}`;

function init() {
    renderProducts();
    updateCartUI();
    setupEventListeners();
}

function renderProducts() {
    productGrid.innerHTML = "";

    products.forEach((product) => {
        const card = document.createElement("article");
        card.classList.add("product-card");
        card.setAttribute("data-id", product.id);

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <span class="product-price">${formatPrice(product.price)}</span>
                
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})" aria-label="Add ${product.name} to cart">
                    <i class="ph ph-plus"></i> Add to Cart
                </button>
                
                <div class="quantity-selector">
                    <button class="qty-btn" onclick="decreaseQty(${product.id})" aria-label="Decrease quantity">
                        <i class="ph ph-minus"></i>
                    </button>
                    <span class="qty-display" id="product-qty-${product.id}">1</span>
                    <button class="qty-btn" onclick="increaseQty(${product.id})" aria-label="Increase quantity">
                        <i class="ph ph-plus"></i>
                    </button>
                </div>
            </div>
        `;

        productGrid.appendChild(card);
    });
}

function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    if (!cart[productId]) {
        cart[productId] = { item: product, qty: 1 };
    }

    syncProductCardState(productId);
    updateCartUI();
}

function increaseQty(productId) {
    if (cart[productId]) {
        cart[productId].qty += 1;
        syncProductCardState(productId);
        updateCartUI();
    }
}

function decreaseQty(productId) {
    if (cart[productId]) {
        cart[productId].qty -= 1;
        if (cart[productId].qty === 0) {
            removeFromCart(productId);
        } else {
            syncProductCardState(productId);
            updateCartUI();
        }
    }
}

function removeFromCart(productId) {
    delete cart[productId];
    syncProductCardState(productId);
    updateCartUI();
}

function syncProductCardState(productId) {
    const card = document.querySelector(`.product-card[data-id="${productId}"]`);
    if (!card) return;

    const qtyDisplay = card.querySelector(".qty-display");

    if (cart[productId]) {
        card.classList.add("in-cart");
        qtyDisplay.textContent = cart[productId].qty;
    } else {
        card.classList.remove("in-cart");
        qtyDisplay.textContent = "1";
    }
}

function updateCartUI() {
    const cartItems = Object.values(cart);

    const currentItems = cartItemsContainer.querySelectorAll('.cart-item');
    currentItems.forEach(el => el.remove());

    let totalQty = 0;
    let subtotal = 0;

    if (cartItems.length === 0) {
        emptyCartDiv.style.display = "flex";
        confirmOrderBtn.disabled = true;
    } else {
        emptyCartDiv.style.display = "none";
        confirmOrderBtn.disabled = false;

        cartItems.forEach(({ item, qty }) => {
            totalQty += qty;
            subtotal += item.price * qty;

            const cartRow = document.createElement("div");
            cartRow.classList.add("cart-item");
            cartRow.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <p class="cart-item-name">${item.name}</p>
                    <p class="cart-item-price">${formatPrice(item.price)}</p>
                </div>
                <div class="cart-item-actions">
                    <button class="cart-qty-btn" onclick="decreaseQty(${item.id})" aria-label="Decrease ${item.name}"><i class="ph ph-minus"></i></button>
                    <span class="cart-item-qty">${qty}</span>
                    <button class="cart-qty-btn" onclick="increaseQty(${item.id})" aria-label="Increase ${item.name}"><i class="ph ph-plus"></i></button>
                </div>
                <button class="cart-remove-btn" onclick="removeFromCart(${item.id})" aria-label="Remove ${item.name}"><i class="ph ph-trash"></i></button>
            `;
            cartItemsContainer.appendChild(cartRow);
        });
    }

    const taxes = subtotal * 0.05;
    const total = subtotal + taxes;

    cartCount.textContent = totalQty;
    subtotalEl.textContent = formatPrice(subtotal);
    taxesEl.textContent = formatPrice(taxes);
    totalPriceEl.textContent = formatPrice(total);
}

function setupEventListeners() {
    confirmOrderBtn.addEventListener("click", () => {
        populateReceipt();
        orderModal.classList.remove("hidden");
        orderModal.setAttribute("aria-hidden", "false");
    });

    closeModalBtn.addEventListener("click", () => {
        closeModal();
    });

    newOrderBtn.addEventListener("click", () => {
        resetOrder();
        closeModal();
    });

    orderModal.addEventListener("click", (e) => {
        if (e.target === orderModal) {
            closeModal();
        }
    });

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

function populateReceipt() {
    orderReceipt.innerHTML = "";
    Object.values(cart).forEach(({ item, qty }) => {
        const itemLine = document.createElement("div");
        itemLine.classList.add("receipt-item");
        itemLine.innerHTML = `
            <span>${qty}x ${item.name}</span>
            <span>${formatPrice(item.price * qty)}</span>
        `;
        orderReceipt.appendChild(itemLine);
    });

    modalTotalAmount.textContent = totalPriceEl.textContent;
}

function closeModal() {
    orderModal.classList.add("hidden");
    orderModal.setAttribute("aria-hidden", "true");
}

function resetOrder() {
    Object.keys(cart).forEach(id => {
        removeFromCart(id);
    });
    cart = {};
    updateCartUI();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

init();
