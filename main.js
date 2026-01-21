
// --- Data & Initialization ---

// Exchange Rate
const EXCHANGE_RATE = 280; // 1 USD = 280 PKR

function formatPrice(usdPrice) {
    const pkr = usdPrice * EXCHANGE_RATE;
    return `Rs. ${pkr.toLocaleString()}`;
}

const DEFAULT_PRODUCTS = [
    // Tote Bags
    { id: 'tote-1', name: 'Classic Tote', price: 120, category: 'tote', image: 'img/tote.jpeg', desc: 'A timeless classic.' },
    { id: 'tote-2', name: 'Modern Tote', price: 135, category: 'tote', image: 'img/tote (2).jpeg', desc: 'Modern aesthetics.' },
    { id: 'tote-3', name: 'Premium Tote', price: 180, category: 'tote', image: 'img/tote (4).jpeg', desc: 'Highest quality materials.' },

    // Shoulder Bags
    { id: 'shoulder-1', name: 'Elegant Shoulder', price: 150, category: 'shoulder', image: 'img/shoulder.jpeg', desc: 'Elegance in every stitch.' },
    { id: 'shoulder-2', name: 'Casual Shoulder', price: 90, category: 'shoulder', image: 'img/shoulder (2).jpeg', desc: 'Perfect for daily use.' },
    { id: 'shoulder-3', name: 'Designer Shoulder', price: 250, category: 'shoulder', image: 'img/shoulder (4).jpeg', desc: 'Top designer choice.' },
    { id: 'shoulder-4', name: 'Trendy Shoulder', price: 110, category: 'shoulder', image: 'img/shoulder (5).jpeg', desc: 'Keep up with trends.' },
    { id: 'shoulder-5', name: 'Luxury Shoulder', price: 300, category: 'shoulder', image: 'img/shoulder (6).jpeg', desc: 'Absolute luxury.' },

    // Hand Bags
    { id: 'hand-1', name: 'Classic Hand', price: 100, category: 'hand', image: 'img/hand.jpeg', desc: 'Classic hand bag.' },
    { id: 'hand-2', name: 'Stylish Hand', price: 130, category: 'hand', image: 'img/hand (2).jpeg', desc: 'Stylish and chic.' },
    { id: 'hand-3', name: 'Modern Hand', price: 140, category: 'hand', image: 'img/hand (3).jpeg', desc: 'Modern design.' },
    { id: 'hand-4', name: 'Elegant Hand', price: 160, category: 'hand', image: 'img/hand (4).jpeg', desc: 'For elegant occasions.' },

    // Cross Body
    { id: 'cross-1', name: 'Adventure Cross Body', price: 85, category: 'crossbody', image: 'img/cross body.jpeg', desc: 'Ready for adventure.' },
    { id: 'cross-2', name: 'Urban Cross Body', price: 95, category: 'crossbody', image: 'img/cross body (2).jpeg', desc: 'Urban style.' },
    { id: 'cross-3', name: 'Travel Cross Body', price: 110, category: 'crossbody', image: 'img/cross body (3).jpeg', desc: 'Best for travel.' },
    { id: 'cross-4', name: 'Casual Cross Body', price: 75, category: 'crossbody', image: 'img/cross body (4).jpeg', desc: 'Casual look.' },
    { id: 'cross-5', name: 'Premium Cross Body', price: 140, category: 'crossbody', image: 'img/cross body (5).jpeg', desc: 'Premium quality.' },

    // Accessories
    { id: 'acc-1', name: 'Gold Accessory', price: 45, category: 'accessories', image: 'img/accessories.jpeg', desc: 'Shining gold.' },
    { id: 'acc-2', name: 'Silver Accessory', price: 40, category: 'accessories', image: 'img/accessories (1).jpeg', desc: 'Sterling silver.' },
    { id: 'acc-3', name: 'Leather Accessory', price: 55, category: 'accessories', image: 'img/accessories (2).jpeg', desc: 'Genuine leather.' },
    { id: 'acc-4', name: 'Charm Set', price: 30, category: 'accessories', image: 'img/accessories (3).jpeg', desc: 'Charming additions.' },

    // Pouches
    { id: 'pouch-1', name: 'Compact Pouch', price: 35, category: 'pouches', image: 'img/pouches.jpeg', desc: 'Small and compact.' },
    { id: 'pouch-2', name: 'Travel Pouch', price: 50, category: 'pouches', image: 'img/pouches (2).jpeg', desc: 'Organize your travel.' },
    { id: 'pouch-3', name: 'Luxury Pouch', price: 80, category: 'pouches', image: 'img/pouches (3).jpeg', desc: 'Luxurious feel.' },
    { id: 'pouch-4', name: 'Everyday Pouch', price: 40, category: 'pouches', image: 'img/pouches (4).jpeg', desc: 'For everyday use.' },
    { id: 'pouch-5', name: 'Premium Pouch', price: 70, category: 'pouches', image: 'img/pouches (5).jpeg', desc: 'Premium materials.' },

    // Extras to fill lines (Mock duplicates with unique IDs)
    { id: 'tote-4', name: 'City Tote', price: 110, category: 'tote', image: 'img/tote.jpeg', desc: 'Perfect for the city.' },
    { id: 'tote-5', name: 'Beach Tote', price: 95, category: 'tote', image: 'img/tote (2).jpeg', desc: 'Ready for the beach.' },
    { id: 'shoulder-6', name: 'Night Out', price: 140, category: 'shoulder', image: 'img/shoulder (5).jpeg', desc: 'For your night out.' },
    { id: 'hand-5', name: 'Office Hand', price: 125, category: 'hand', image: 'img/hand (3).jpeg', desc: 'Professional look.' },
    { id: 'cross-6', name: 'Mini Cross', price: 65, category: 'crossbody', image: 'img/cross body (2).jpeg', desc: 'Mini convenience.' }
];

// Initialize State
let products = JSON.parse(localStorage.getItem('products')) || DEFAULT_PRODUCTS;
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let isAdmin = localStorage.getItem('isAdmin') === 'true';

// Save Funcs
function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
    renderAll();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

function renderAll() {
    renderProducts();
    renderFeaturedSlider();
    renderAdminCart();
    renderCart();
    updateCartCount();
    updateAdminUI();
}

// --- Rendering Functions ---

// --- Categories Logic ---
const DEFAULT_CATEGORIES = [
    { id: 'tote', name: 'Tote Bags', icon: 'fa-solid fa-bag-shopping' },
    { id: 'shoulder', name: 'Shoulder Bags', icon: 'fa-solid fa-hourglass' },
    { id: 'hand', name: 'Hand Bags', icon: 'fa-solid fa-hand' },
    { id: 'crossbody', name: 'Cross Body Bags', icon: 'fa-solid fa-briefcase' },
    { id: 'accessories', name: 'Accessories', icon: 'fa-solid fa-ring' },
    { id: 'pouches', name: 'Pouches', icon: 'fa-solid fa-cube' }
];

let categories = JSON.parse(localStorage.getItem('categories')) || DEFAULT_CATEGORIES;

// Ensure Pouches exists (Fix for user request if it was deleted)
if (!categories.find(c => c.id === 'pouches')) {
    categories.push({ id: 'pouches', name: 'Pouches', icon: 'fa-solid fa-cube' });
    localStorage.setItem('categories', JSON.stringify(categories)); // Save immediately
}

function saveCategories() {
    localStorage.setItem('categories', JSON.stringify(categories));
    renderAll();
}

function renderProducts() {
    const container = document.getElementById('dynamic-categories-container');
    if (!container) return;
    container.innerHTML = '';

    categories.forEach(cat => {
        // Create Section
        const section = document.createElement('div');
        section.className = 'product-category';
        section.id = `cat-section-${cat.id}`;

        section.innerHTML = `
            <h3><i class="${cat.icon}"></i> ${cat.name}</h3>
            <div class="products-grid" id="${cat.id}-products"></div>
        `;
        container.appendChild(section);

        // Populate Products
        const prodContainer = section.querySelector(`#${cat.id}-products`);
        const catProducts = products.filter(p => p.category === cat.id);

        if (catProducts.length === 0) {
            prodContainer.innerHTML = '<p style="color:#777; font-style:italic;">No products in this category yet.</p>';
        }

        catProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.onclick = (e) => {
                addToCart(product.id, e);
            };

            card.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <h4>${product.name}</h4>
                <p>${formatPrice(product.price)}</p>
                <button class="btn" style="width: 100%; margin-top:10px;" onclick="addToCart('${product.id}', event)">Add to Cart</button>
            `;
            prodContainer.appendChild(card);
        });
    });

    updateNavbarDropdown();
}

function updateNavbarDropdown() {
    const dropdown = document.querySelector('.collections-menu .dropdown-menu');
    if (!dropdown) return;

    // Header 'All' link remains
    let html = `
        <a href="#all" class="dropdown-item">
            <i class="fa-solid fa-border-all"></i>
            <span>All</span>
        </a>
    `;

    categories.forEach(cat => {
        html += `
             <a href="#cat-section-${cat.id}" class="dropdown-item">
                <i class="${cat.icon}"></i>
                <span>${cat.name}</span>
            </a>
        `;
    });

    dropdown.innerHTML = html;
}

// --- Cart Logic ---

const cartPanel = document.getElementById('cart-panel');
const cartCloseBtn = document.getElementById('cart-close-btn');

cartCloseBtn.addEventListener('click', () => {
    cartPanel.classList.remove('active');
});

// Update main nav cart icon
document.querySelector('.fa-cart-shopping').parentElement.addEventListener('click', () => {
    cartPanel.classList.add('active'); // Open Cart
});

function addToCart(productId, event) {
    if (event) event.stopPropagation(); // Prevent card click if button is clicked

    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    saveCart();
    cartPanel.classList.add('active'); // Open cart on add
}

function updateQty(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.qty += change;

    if (item.qty <= 0) {
        removeFromCart(productId);
    } else {
        saveCart();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
}

function renderCart() {
    const container = document.getElementById('cart-items-container');
    const totalEl = document.getElementById('cart-total-amount');

    container.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-cart-msg">Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            const itemTotal = item.price * item.qty;
            total += itemTotal;

            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>${formatPrice(item.price)} x ${item.qty}</p>
                     <div class="cart-item-controls">
                        <button class="qty-btn" onclick="updateQty('${item.id}', -1)">-</button>
                        <span class="qty-display">${item.qty}</span>
                        <button class="qty-btn" onclick="updateQty('${item.id}', 1)">+</button>
                    </div>
                </div>
                <button class="item-remove-btn" onclick="removeFromCart('${item.id}')"><i class="fa-solid fa-trash"></i></button>
            `;
            container.appendChild(div);
        });
    }

    totalEl.textContent = formatPrice(total);
}

function updateCartCount() {
    const count = cart.reduce((acc, item) => acc + item.qty, 0);
    const badge = document.querySelector('.header-icon .fa-cart-shopping span');
    if (badge) badge.textContent = count;
}


// --- Featured Slider Logic ---
let sliderInterval;
function renderFeaturedSlider() {
    const slider = document.getElementById('featured-slider');
    if (!slider) return;

    slider.innerHTML = '';
    const sliderProducts = products;

    sliderProducts.forEach(product => {
        const slide = document.createElement('div');
        slide.className = 'featured-slide';
        slide.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="featured-slide-caption">
                <h3>${product.name}</h3>
                <p>${formatPrice(product.price)}</p>
            </div>
        `;
        slider.appendChild(slide);
    });

    initFeaturedSlider();
}

function initFeaturedSlider() {
    const slider = document.getElementById('featured-slider');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    let index = 0;
    const slides = document.querySelectorAll('.featured-slide');
    const total = slides.length;

    function moveSlider() {
        if (total === 0) return;
        index = (index + 1) % total;
        slider.style.transform = `translateX(-${index * 100}%)`;
    }

    function movePrev() {
        if (total === 0) return;
        index = (index - 1 + total) % total;
        slider.style.transform = `translateX(-${index * 100}%)`;
    }

    if (sliderInterval) clearInterval(sliderInterval);
    sliderInterval = setInterval(moveSlider, 3000);

    if (nextBtn) nextBtn.onclick = () => {
        moveSlider();
        clearInterval(sliderInterval);
    };
    if (prevBtn) prevBtn.onclick = () => {
        movePrev();
        clearInterval(sliderInterval);
    };
}


// --- Admin Logic ---

const adminPortal = document.getElementById('admin-portal');
const toggleBtn = document.getElementById('admin-toggle-float');
const closeAdminBtn = document.getElementById('admin-close-btn');

function updateAdminUI() {
    if (isAdmin) {
        toggleBtn.style.display = 'flex';
        document.getElementById('cart-admin-login-btn').style.display = 'none'; // Hide login in cart if already admin
        const topLogout = document.getElementById('admin-logout-top-btn');
        if (topLogout) topLogout.style.display = 'block';
    } else {
        toggleBtn.style.display = 'none';
        adminPortal.classList.remove('active');
        document.getElementById('cart-admin-login-btn').style.display = 'block'; // Show login
        const topLogout = document.getElementById('admin-logout-top-btn');
        if (topLogout) topLogout.style.display = 'none';
    }
}

// Toggle Panel
toggleBtn.addEventListener('click', () => {
    adminPortal.classList.add('active');
});

closeAdminBtn.addEventListener('click', () => {
    adminPortal.classList.remove('active');
});

// Admin Button inside Cart
document.getElementById('cart-admin-login-btn').addEventListener('click', () => {
    cartPanel.classList.remove('active'); // Close Cart
    document.getElementById('auth-modal').classList.add('active'); // Open Login
});


// Add Product
const addForm = document.getElementById('add-product-form');
const imageInput = document.getElementById('prod-image-input');
const imagePreview = document.getElementById('image-preview');

imageInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
        }
        reader.readAsDataURL(file);
    } else {
        imagePreview.innerHTML = `<span>No Image Selected</span>`;
    }
});

addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!isAdmin) { alert("Unauthorized"); return; }

    const name = document.getElementById('prod-name').value;
    const price = document.getElementById('prod-price').value; // Input is in USD or PKR? Prompt says "Price (convert $ to PKR)". Assuming INPUT is USD as per original structure but displayed in PKR. Let's assume Admin inputs USD for simplicity, or we can add a currency toggle. Prompt: "Price (convert $ to PKR)". I will assume Admin enters USD, and system converts.
    const cat = document.getElementById('prod-category').value;
    const desc = document.getElementById('prod-desc').value;
    const file = imageInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const newProduct = {
                id: Date.now().toString(),
                name: name,
                price: parseFloat(price),
                category: cat,
                image: e.target.result,
                desc: desc
            };

            products.push(newProduct);
            saveProducts();
            addForm.reset();
            imagePreview.innerHTML = `<span>No Image Selected</span>`;
            alert("Product Added Successfully!");
        }
        reader.readAsDataURL(file);
    }
});

// Render Admin Lists
function renderAdminCart() {
    // 1. Products List
    const list = document.getElementById('admin-product-list');
    list.innerHTML = '';

    products.forEach((p) => {
        const item = document.createElement('div');
        item.className = 'admin-cart-item';
        item.innerHTML = `
            <img src="${p.image}" alt="thumb">
            <div class="admin-cart-info">
                <h4>${p.name}</h4>
                <p>${p.category}</p>
            </div>
            <button class="delete-btn" onclick="deleteProduct('${p.id}')">Delete</button>
        `;
        list.appendChild(item);
    });

    // 2. Category Dropdown in Add Product
    const catSelect = document.getElementById('prod-category');
    if (catSelect) {
        catSelect.innerHTML = categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    }

    // 3. Categories List (Deletion)
    const catList = document.getElementById('admin-category-list');
    if (catList) {
        catList.innerHTML = '';
        categories.forEach(c => {
            const item = document.createElement('div');
            item.className = 'admin-cart-item';
            item.innerHTML = `
                <div class="admin-cart-info">
                    <h4><i class="${c.icon}"></i> ${c.name}</h4>
                </div>
                <button class="delete-btn" onclick="deleteCategory('${c.id}')">Delete</button>
            `;
            catList.appendChild(item);
        });
    }
}

function deleteProduct(id) {
    if (confirm("Are you sure you want to delete this product?")) {
        products = products.filter(p => p.id !== id);
        saveProducts();
    }
}

function deleteCategory(id) {
    if (confirm("Delete this category? Products in this category may become hidden.")) {
        categories = categories.filter(c => c.id !== id);
        saveCategories();
    }
}

// Add Category Form
const addCatForm = document.getElementById('add-category-form');
if (addCatForm) {
    addCatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!isAdmin) return;

        const name = document.getElementById('cat-name-input').value;
        const icon = document.getElementById('cat-icon-input').value;
        const id = name.toLowerCase().replace(/\s+/g, '-');

        if (categories.find(c => c.id === id)) {
            alert("Category already exists!");
            return;
        }

        categories.push({ id, name, icon });
        saveCategories();
        addCatForm.reset();
        alert("Category added!");
    });
}
window.deleteCategory = deleteCategory;

// Global scope
window.deleteProduct = deleteProduct;
window.addToCart = addToCart;
window.updateQty = updateQty;
window.removeFromCart = removeFromCart;


// --- Auth Logic ---

const signinFormEl = document.getElementById('signin-form').querySelector('form');

signinFormEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;

    if (email === 'admin@marquise.com' && password === 'admin123') { // Mock check
        alert("WELCOME ADMIN! Access granted.");
        isAdmin = true;
        localStorage.setItem('isAdmin', 'true');
        document.getElementById('auth-modal').classList.remove('active');
        updateAdminUI();
        adminPortal.classList.add('active');
    } else if (email && password) {
        alert(`Welcome back! Logged in as: ${email}`);
        document.getElementById('auth-modal').classList.remove('active');
        isAdmin = false;
        localStorage.setItem('isAdmin', 'false');
        updateAdminUI();
    }
});

document.getElementById('admin-logout-btn').addEventListener('click', () => {
    isAdmin = false;
    localStorage.setItem('isAdmin', 'false');
    updateAdminUI();
    adminPortal.classList.remove('active');
    alert("Logged out of Admin Portal.");
});


// --- Init ---

let search = document.querySelector('.search-box');
if (document.querySelector('#search-icon')) document.querySelector('#search-icon').onclick = () => {
    search.classList.toggle('active');
}

// Hero Slide
let currentSlideIndex = 0;
const heroSlides = document.querySelectorAll('.hero-slider .slide');

function nextHeroSlide() {
    if (heroSlides.length === 0) return;
    heroSlides.forEach(s => s.classList.remove('active'));
    currentSlideIndex = (currentSlideIndex + 1) % heroSlides.length;
    heroSlides[currentSlideIndex].classList.add('active');
}
setInterval(nextHeroSlide, 3000);

// --- Responsive Menu Logic ---
const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        navbar.classList.toggle('active');

        if (navbar.classList.contains('active')) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-xmark');
        } else {
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        }
    });

    // Removed "Close when clicking outside" as requested
    // Removed "Close when clicking a link" as requested
}

document.addEventListener('DOMContentLoaded', () => {
    renderAll();
});

// Auth Toggles
const authModal = document.getElementById('auth-modal');
const userBtn = document.getElementById('user-btn');
const authClose = document.getElementById('auth-close');
const signinForm = document.getElementById('signin-form');
const signupForm = document.getElementById('signup-form');

if (userBtn) userBtn.addEventListener('click', () => authModal.classList.add('active'));
if (authClose) authClose.addEventListener('click', () => authModal.classList.remove('active'));
if (authModal) authModal.addEventListener('click', (e) => {
    if (e.target === authModal) authModal.classList.remove('active');
});

window.toggleAuthForm = function (e) {
    if (e) e.preventDefault();
    signinForm.classList.toggle('active');
    signupForm.classList.toggle('active');
}

// BIND TOP LOGOUT BUTTON
const topLogoutBtn = document.getElementById('admin-logout-top-btn');
if (topLogoutBtn) {
    topLogoutBtn.addEventListener('click', () => {
        isAdmin = false;
        localStorage.setItem('isAdmin', 'false');
        updateAdminUI();
        document.getElementById('admin-portal').classList.remove('active');
        alert("Logged out of Admin Portal.");
    });
}