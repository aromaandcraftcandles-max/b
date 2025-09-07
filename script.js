// Product data with multiple images
const products = [
  {
    id: 1,
    name: "Ocean Mermaid",
    description: "Ocean Mermaid made with wax stones,pearls,seashells,flowers and wax-leaves",
    size: "8 oz",
    fragrance: "Lavender",
    price: 899,
    images: [
      "IMG_3737.jpeg",
      "IMG_3738.jpeg",
      "IMG_3737-angle3.jpeg"
    ]
  },
  {
    id: 2,
    name: "Heart shape candles",
    description: "Made with artificial log tree base, pearls",
    size: "10 oz",
    burnTime: "50 hours",
    fragrance: "Blossom tree",
    price: 699,
    images: [
      "IMG-20250902-WA0001.jpg"
    ]
  },
  {
    id: 3,
    name: "Citrus Sunrise",
    description: "2 kaju katli hamper +2 tealight-99Inr ",
    size: "7 oz",
    burnTime: "35 hours",
    fragrance: "Citrus",
    price: 699,
    images: [
      "WhatsApp Image 2025-09-07 at 16.48.01 (1).jpeg"
    ]
  }
];

// Track current modal image index and current product images
let currentModalImageIndex = 0;
let currentProductImages = [];

// Display the product list dynamically
function displayProducts() {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      <img src="${product.images[0]}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <ul class="product-details">
          <li>🕯️ ${product.description}</li>

          <li>💐 Fragrance: ${product.fragrance}</li>
      </ul>
      <p class="price">${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(productCard);
  });

  attachImageClicks();
}

// Attach click event to product images to open modal
function attachImageClicks() {
  products.forEach(product => {
    const productImg = document.querySelector(`.product-card img[alt="${product.name}"]`);
    if (productImg) {
      productImg.style.cursor = 'pointer';
      productImg.onclick = () => openProductModal(product);
    }
  });
}

// Open modal with product images carousel and details
function openProductModal(product) {
  currentProductImages = product.images;
  currentModalImageIndex = 0;

  updateModalImage();

  document.getElementById('modal-name').textContent = product.name;
  document.getElementById('modal-description').textContent = product.description;

  const detailsList = document.getElementById('modal-details');
  detailsList.innerHTML = '';
  detailsList.innerHTML += `<li>Size: ${product.size}</li>`;
  detailsList.innerHTML += `<li>Burn Time: ${product.burnTime}</li>`;
  detailsList.innerHTML += `<li>Fragrance: ${product.fragrance}</li>`;

  document.getElementById('modal-price').textContent = `Price: ${product.price.toFixed(2)}`;

  const modal = document.getElementById('product-modal');
  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden', 'false');
}

// Update the modal image based on current index
function updateModalImage() {
  const modalImage = document.getElementById('modal-image');
  modalImage.src = currentProductImages[currentModalImageIndex];
  modalImage.alt = `Product image ${currentModalImageIndex + 1} of ${currentProductImages.length}`;
}

// Close modal popup
function closeModal() {
  const modal = document.getElementById('product-modal');
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
}

// Move to previous image in modal carousel
function prevImage() {
  currentModalImageIndex = (currentModalImageIndex - 1 + currentProductImages.length) % currentProductImages.length;
  updateModalImage();
}

// Move to next image in modal carousel
function nextImage() {
  currentModalImageIndex = (currentModalImageIndex + 1) % currentProductImages.length;
  updateModalImage();
}

// Dummy add to cart function
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  alert(`${product.name} added to cart.`);
}

// Setup event listeners on window load
window.onload = () => {
  displayProducts();

  document.getElementById('modal-close').onclick = closeModal;
  document.getElementById('prev-image').onclick = prevImage;
  document.getElementById('next-image').onclick = nextImage;

  const modal = document.getElementById('product-modal');
  modal.onclick = (event) => {
    if (event.target === modal) {
      closeModal();
    }
  };
};
