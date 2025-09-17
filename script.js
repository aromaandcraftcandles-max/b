const products = [
  {
    id: 1,
    name: "Ocean Mermaid",
    description: "Made with wax stones, pearls, seashells, flowers and wax leaves",
    size: "10 oz",
    fragrance: "Jasmine",
    price: 899,
    oldPrice: 999,
    discount: "10% OFF",
    images: [
      "OM_01.jpeg",
      "OM_02.jpeg",
      "OM_03.jpeg"
    ]
  },
  {
    id: 2,
    name: "Heart Shape Candles",
    description: "Made with artificial log tree base and pearls",
    size: "10 oz",
    fragrance: "Jasmine",
    price: 699,
    images: [
      "IMG-20250902-WA0001.jpg",
      ""
    ]
  },
  {
    id: 3,
    name: "Kaju Katli Hamper",
    description: "Includes 2 kaju katli candles + 2 tealight candles",
    size: "6.5 x 4 x 2 inches",
    burnTime: "35 hours",
    fragrance: "Jasmine",
    price: 699,
    images: [
      "Kaju_01.jpeg",
      "Kaju_02.jpeg"
    ]
  },
  {
    id: 4,
    name: "Buddha Candle Hamper",
    description: "One Buddha candle, 1 stand, rose petals, 1 gel shot, 1 coaster, 1 tealight",
    size: "6.5 x 4 x 2 inches",
    burnTime: "30 hours",
    fragrance: "Jasmine",
    price: 379,
    images: [
      "Bu_01.jpeg",
      "BU_05.jpeg",
      "BU_03.jpeg"
    ]
  },
  {
    id: 5,
    name: "Aroma Special Hamper",
    description: "Set of 2 elegant flower wax candles, 10 T-light candles, and 2 stylish coasters—perfect for creating a warm, cozy ambiance in any space",
    fragrance: "Lavender",
    price: 379,
    images: [
      "IMG_4069.jpeg",
      "IMG_4071.jpeg",
      "IMG_7895,.jpeg"
    ]
  },
  {
    id: 6,         
    name: "Gel Wax Butterfly Jar",
    description: "1 Gel Wax Jar",
    size: "3.5 × 3.5 × 3.5 inches",
    price: 329,
    images: [
      "WhatsApp_Image_2025-09-12_at_23.20.13.jpeg",
      "WhatsApp_Image_2025-09-12_at_23.20.19.jpeg"
    ]
  }
];

let filteredProducts = [...products];
let currentModalImageIndex = 0;
let currentProductImages = [];

function displayFilteredProducts() {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

  filteredProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';

    const thumbnailsHtml = product.images.map((imgSrc, idx) =>
      `<img src="images/${imgSrc}" alt="${product.name} image ${idx + 1}" 
      onerror="this.onerror=null;this.src='images/placeholder.png';"
      onclick="openProductModalByIndex(${product.id}, ${idx})" 
      title="View Image ${idx + 1}" />`
    ).join('');

    // Add discount badge if discount exists
    const discountBadge = product.discount ? `<div class="badge">${product.discount}</div>` : '';

    // Show old price with strike-through if specified
    let priceHTML = '';
    if (product.oldPrice) {
      priceHTML = `<span class="price-old">₹${product.oldPrice.toFixed(2)}</span><span>₹${product.price.toFixed(2)}</span>`;
    } else {
      priceHTML = `₹${product.price.toFixed(2)}`;
    }

    productCard.innerHTML = `
      ${discountBadge}
      <img class="product-main-image" src="images/${product.images[0]}" alt="${product.name}" 
      onerror="this.onerror=null;this.src='images/placeholder.png';"
      onclick="openProductModalByIndex(${product.id}, 0)" />
      <div class="product-thumbnails">${thumbnailsHtml}</div>
      <h3>${product.name}</h3>
      <ul class="product-details">
        <li>🕯️ ${product.description}</li>
        <li>📦 Size: ${product.size || 'N/A'}</li>
        <li>💐 Fragrance: ${product.fragrance}</li>
      </ul>
      <p class="price">${priceHTML}</p>
      <p class="delivery-tag">Earliest Delivery: Tomorrow</p>
      <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
    `;

    productList.appendChild(productCard);
  });
}

function filterProducts(fragrance) {
  [...document.querySelectorAll('#filter-menu button')].forEach(btn => {
    btn.classList.toggle('active', btn.textContent === fragrance || (fragrance === 'all' && btn.textContent === 'All'));
  });

  filteredProducts = fragrance === 'all' ? [...products] : products.filter(p => p.fragrance.toLowerCase() === fragrance.toLowerCase());

  displayFilteredProducts();
}

function openProductModalByIndex(productId, imgIndex) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  currentProductImages = product.images;
  currentModalImageIndex = imgIndex;
  updateModalImage();

  document.getElementById('modal-name').textContent = product.name;
  document.getElementById('modal-description').textContent = product.description;
  const detailsList = document.getElementById('modal-details');
  detailsList.innerHTML = `
    <li>Size: ${product.size || 'N/A'}</li>
    <li>Fragrance: ${product.fragrance}</li>
  `;
  document.getElementById('modal-price').textContent = `Price: ₹${product.price.toFixed(2)}`;

  const modal = document.getElementById('product-modal');
  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden', 'false');
  modal.focus();
}

function updateModalImage() {
  const modalImage = document.getElementById('modal-image');
  modalImage.src = `images/${currentProductImages[currentModalImageIndex]}`;
  modalImage.alt = `Product image ${currentModalImageIndex + 1} of ${currentProductImages.length}`;
}

function closeModal() {
  const modal = document.getElementById('product-modal');
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
}

function prevImage() {
  currentModalImageIndex = (currentModalImageIndex - 1 + currentProductImages.length) % currentProductImages.length;
  updateModalImage();
}

function nextImage() {
  currentModalImageIndex = (currentModalImageIndex + 1) % currentProductImages.length;
  updateModalImage();
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  alert(`${product.name} added to cart.`);
}

window.onload = () => {
  filterProducts('all');

  document.getElementById('modal-close').onclick = closeModal;
  document.getElementById('prev-image').onclick = prevImage;
  document.getElementById('next-image').onclick = nextImage;

  document.getElementById('product-modal').onclick = e => {
    if (e.target.id === 'product-modal') closeModal();
  };

  ['modal-close','prev-image','next-image'].forEach(id => {
    document.getElementById(id)?.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (id === 'modal-close') closeModal();
        else if (id === 'prev-image') prevImage();
        else if (id === 'next-image') nextImage();
      }
    });
  });
};
