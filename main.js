
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
];

const DEFAULT_HERO_SLIDES = [
    { img: 'img/hero.jpeg', text: 'Premium Collection' },
    { img: 'img/hero (1).jpeg', text: 'Elegant Designs' },
    { img: 'img/hero (2).jpeg', text: 'Luxury Bags' },
    { img: 'img/hero (3).jpeg', text: 'Summer Collection' },
    { img: 'img/hero (4).jpeg', text: 'Style & Comfort' }
];

const DEFAULT_LAYOUT = [
    { id: 'hero-section', type: 'hero', title: 'Hero Slider' },
    { id: 'featured-section', type: 'featured', title: 'Featured Products' },
    { id: 'categories-section', type: 'categories', title: 'Product Categories' }
];

// Initialize State
const CONFIG_VERSION = '1.1'; // Update to force refresh defaults
let storedVersion = localStorage.getItem('configVersion');

let products = JSON.parse(localStorage.getItem('products')) || DEFAULT_PRODUCTS;
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let isAdmin = localStorage.getItem('isAdmin') === 'true';
let adminCreds = JSON.parse(localStorage.getItem('adminCreds')) || { email: 'admin@marquise.com', pass: 'admin123' };
let pageLayout = JSON.parse(localStorage.getItem('pageLayout')) || DEFAULT_LAYOUT;
let heroSlides = JSON.parse(localStorage.getItem('heroSlides')) || DEFAULT_HERO_SLIDES;

// Force reset if version mismatch
if (storedVersion !== CONFIG_VERSION) {
    heroSlides = DEFAULT_HERO_SLIDES;
    localStorage.setItem('heroSlides', JSON.stringify(heroSlides));
    localStorage.setItem('configVersion', CONFIG_VERSION);
}

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

function saveLayout() {
    localStorage.setItem('pageLayout', JSON.stringify(pageLayout));
    localStorage.setItem('heroSlides', JSON.stringify(heroSlides));
    renderAll();
}

function renderAll() {
    renderPage();
    renderCart();
    updateCartCount();
    if (typeof initAdmin === 'function') initAdmin();
}

// --- Page Rendering ---
function renderPage() {
    const mainContainer = document.getElementById('main-content');
    if (!mainContainer) return;

    mainContainer.innerHTML = '';

    pageLayout.forEach(section => {
        const secDiv = document.createElement('section');
        secDiv.id = section.id;
        secDiv.className = section.type;

        if (section.type === 'hero') {
            renderHeroSection(secDiv);
        } else if (section.type === 'featured') {
            secDiv.className = 'featured-products';
            renderFeaturedSection(secDiv);
        } else if (section.type === 'categories') {
            renderCategoriesSection(secDiv);
        } else if (section.type === 'banner') {
            renderBannerSection(secDiv, section);
        } else if (section.type === 'slider') {
            renderCustomSliderSection(secDiv, section);
        } else if (section.type === 'text') {
            renderTextSection(secDiv, section);
        }

        mainContainer.appendChild(secDiv);
    });
}

/* Hero Section Renderer */
function renderHeroSection(container) {
    let slidesHtml = heroSlides.map((slide, index) => `
        <div class="slide ${index === 0 ? 'active' : ''}">
            <img src="${slide.img}" alt="${slide.text}">
            <div class="slide-text">${slide.text}</div>
        </div>
    `).join('');

    container.innerHTML = `
        <div class="home-text">
            <h3>Fashion Bag</h3>
            <h1>Look <span>Stylish </span> <br><span> Be </span>Stylish</h1>
            <p>Exclusive collections for you.</p>
            <a href="#featured" class="btn">Shop Now</a>
        </div>
        <div class="hero-slider">
            <div class="slider-container">
                ${slidesHtml}
            </div>
        </div>
    `;

    if (window.heroInterval) clearInterval(window.heroInterval);
    let current = 0;
    const slides = container.querySelectorAll('.slide');
    if (slides.length > 0) {
        window.heroInterval = setInterval(() => {
            slides[current].classList.remove('active');
            current = (current + 1) % slides.length;
            slides[current].classList.add('active');
        }, 3000);
    }
}

/* Featured Section Renderer */
function renderFeaturedSection(container) {
    container.innerHTML = `
        <div class="section-header">
            <h2>Featured Products</h2>
            <p>Discover our latest and most popular collections</p>
        </div>
        <div class="featured-slider-wrapper">
            <div class="featured-slider" id="featured-slider-inner">
                <!-- Dynamic Slider Content -->
            </div>
            <button class="slider-btn prev-btn"><i class="fa-solid fa-angle-left"></i></button>
            <button class="slider-btn next-btn"><i class="fa-solid fa-angle-right"></i></button>
        </div>
    `;

    const sliderInner = container.querySelector('.featured-slider');
    const productsToFeature = products.slice(0, 5);

    if (productsToFeature.length === 0) {
        sliderInner.innerHTML = '<p>No featured products.</p>';
        return;
    }

    productsToFeature.forEach(product => {
        const slide = document.createElement('div');
        slide.className = 'featured-slide';
        slide.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="featured-slide-caption">
                <h3>${product.name}</h3>
                <p>${formatPrice(product.price)}</p>
            </div>
        `;
        sliderInner.appendChild(slide);
    });

    const prev = container.querySelector('.prev-btn');
    const next = container.querySelector('.next-btn');
    let idx = 0;
    const slides = sliderInner.querySelectorAll('.featured-slide');
    const total = slides.length;

    function move() {
        if (total === 0) return;
        sliderInner.style.transform = `translateX(-${idx * 100}%)`;
    }

    if (next) next.onclick = () => { idx = (idx + 1) % total; move(); };
    if (prev) prev.onclick = () => { idx = (idx - 1 + total) % total; move(); };
}

/* Categories Section Renderer */
function renderCategoriesSection(container) {
    container.innerHTML = `
        <div class="section-header">
             <h2>Shop By Category</h2>
        </div>
        <div id="dynamic-categories-container-inner"></div>
    `;
    const inner = container.querySelector('#dynamic-categories-container-inner');
    renderProducts(inner);
}

/* Banner Renderer */
function renderBannerSection(container, data) {
    container.className = 'banner-section';
    container.style.padding = '20px 0';
    container.style.textAlign = 'center';

    const imgData = data.content ? data.content.image : '';
    if (imgData) {
        container.innerHTML = `<img src="${imgData}" style="width:100%; max-height:300px; object-fit:cover;">`;
    } else {
        container.innerHTML = `<div style="background:#ddd; padding:40px;">Empty Banner</div>`;
    }
}

/* Custom Slider Renderer */
function renderCustomSliderSection(container, section) {
    container.className = 'custom-slider-section';
    const slides = section.content.slides || [];
    if (slides.length === 0) {
        container.innerHTML = '<p style="text-align:center; padding:20px;">Empty Slider</p>';
        return;
    }

    const slidesHtml = slides.map((slide, index) => `
        <div class="slide ${index === 0 ? 'active' : ''}">
            <img src="${slide.img}" alt="${slide.text}">
            <div class="slide-text">${slide.text}</div>
        </div>
    `).join('');

    const sliderId = `slider-${section.id}`;

    container.innerHTML = `
        <div class="hero-slider" id="${sliderId}" style="height: 400px;"> 
            <div class="slider-container">
                ${slidesHtml}
            </div>
        </div>
    `;

    const slideEls = container.querySelectorAll('.slide');
    let current = 0;
    if (slideEls.length > 0) {
        setInterval(() => {
            slideEls[current].classList.remove('active');
            current = (current + 1) % slideEls.length;
            slideEls[current].classList.add('active');
        }, 3000 + (Math.random() * 1000));
    }
}

/* Text Section Renderer */
function renderTextSection(container, data) {
    container.style.padding = '40px';
    container.style.textAlign = 'center';
    container.innerHTML = `<h3>${data.content ? data.content.text : 'Text Block'}</h3>`;
}

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

function saveCategories() {
    localStorage.setItem('categories', JSON.stringify(categories));
    renderAll();
}

function renderProducts(targetContainer) {
    if (!targetContainer) return;
    targetContainer.innerHTML = '';
    categories.forEach(cat => {
        const section = document.createElement('div');
        section.className = 'product-category';
        section.id = `cat-section-${cat.id}`;
        section.innerHTML = `
            <h3><i class="${cat.icon}"></i> ${cat.name}</h3>
            <div class="products-grid" id="${cat.id}-products"></div>
        `;
        targetContainer.appendChild(section);

        const prodContainer = section.querySelector(`#${cat.id}-products`);
        const catProducts = products.filter(p => p.category === cat.id);

        if (catProducts.length === 0) {
            prodContainer.innerHTML = '<p style="color:#777; font-style:italic;">No products in this category yet.</p>';
        }

        catProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.onclick = (e) => addToCart(product.id, e);
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

if (cartCloseBtn) cartCloseBtn.addEventListener('click', () => {
    cartPanel.classList.remove('active');
});

const cartIcon = document.querySelector('.header-icon .fa-cart-shopping');
if (cartIcon) cartIcon.parentElement.addEventListener('click', () => {
    cartPanel.classList.add('active');
});

function addToCart(productId, event) {
    if (event) event.stopPropagation();
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    saveCart();
    cartPanel.classList.add('active');
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
    if (!container) return;

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

    if (totalEl) totalEl.textContent = formatPrice(total);
}

function updateCartCount() {
    const count = cart.reduce((acc, item) => acc + item.qty, 0);
    const badge = document.querySelector('.header-icon .fa-cart-shopping span');
    if (badge) badge.textContent = count;
}


// --- Professional Admin Dashboard Logic ---

const adminDashboard = document.getElementById('admin-dashboard-container');
const entryBtn = document.getElementById('admin-sidebar-entry');
const closeDashboardBtn = document.getElementById('close-admin-dashboard');
const logoutBtn = document.getElementById('new-admin-logout');

// Initial State
let activeModule = localStorage.getItem('activeAdminModule') || 'dashboard';

// --- Initialization & Entry ---

function initAdmin() {
    if (isAdmin) {
        if (adminDashboard) {
            switchAdminModule(activeModule);
        }
    } else {
        if (adminDashboard) adminDashboard.classList.remove('active');
    }
    updateAdminStats();
}

if (entryBtn) {
    entryBtn.onclick = () => {
        if (isAdmin) {
            adminDashboard.classList.add('active');
            switchAdminModule(activeModule);
        } else {
            const authModal = document.getElementById('auth-modal');
            if (authModal) {
                authModal.classList.add('active');
                document.getElementById('signin-form').classList.add('active');
                document.getElementById('signup-form').classList.remove('active');
            }
        }
    };
}

if (closeDashboardBtn) closeDashboardBtn.onclick = () => adminDashboard.classList.remove('active');
if (logoutBtn) logoutBtn.onclick = logoutAdmin;

function logoutAdmin() {
    isAdmin = false;
    localStorage.setItem('isAdmin', 'false');
    if (adminDashboard) adminDashboard.classList.remove('active');
    renderAll();
}

// --- Module System ---

window.switchAdminModule = function (moduleName) {
    activeModule = moduleName;
    localStorage.setItem('activeAdminModule', moduleName);

    document.querySelectorAll('.admin-module').forEach(m => m.classList.remove('active'));
    const targetModule = document.getElementById(`module-${moduleName}`);
    if (targetModule) targetModule.classList.add('active');

    document.querySelectorAll('.admin-nav-item').forEach(item => {
        item.classList.remove('active');
        const span = item.querySelector('span');
        if (span && span.textContent.toLowerCase() === moduleName.toLowerCase()) {
            item.classList.add('active');
        }
    });

    const titleEl = document.getElementById('admin-page-title');
    if (titleEl) titleEl.textContent = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);

    refreshModuleData(moduleName);
};

function refreshModuleData(moduleName) {
    updateAdminStats();
    if (moduleName === 'products') renderNewAdminProductList();
    if (moduleName === 'categories') renderNewAdminCategoryList();
    if (moduleName === 'hero') renderHeroManager();
    if (moduleName === 'layout') renderNewAdminLayoutList();
    if (moduleName === 'settings') {
        const emailInput = document.getElementById('new-admin-email');
        if (emailInput) emailInput.value = adminCreds.email;
    }
}

function updateAdminStats() {
    const prodStat = document.getElementById('stat-total-products');
    const catStat = document.getElementById('stat-total-categories');
    if (prodStat) prodStat.textContent = products.length;
    if (catStat) catStat.textContent = categories.length;
}

// --- Module: Products ---

window.toggleAddProductForm = function () {
    const container = document.getElementById('new-product-form-container');
    if (container) {
        container.style.display = container.style.display === 'none' ? 'block' : 'none';
        const catSelect = document.getElementById('new-prod-category');
        if (catSelect) {
            catSelect.innerHTML = categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
        }
    }
};

function renderNewAdminProductList() {
    const list = document.getElementById('new-admin-product-list');
    if (!list) return;
    list.innerHTML = '';

    products.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${p.image}" style="width:40px;height:40px;object-fit:cover;border-radius:4px;"></td>
            <td><strong>${p.name}</strong></td>
            <td>${p.category}</td>
            <td>${formatPrice(p.price)}</td>
            <td>
                <button class="admin-btn admin-btn-danger" onclick="deleteProduct('${p.id}')">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;
        list.appendChild(tr);
    });
}

const newAddProdForm = document.getElementById('new-add-product-form');
if (newAddProdForm) {
    newAddProdForm.onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById('new-prod-name').value;
        const price = document.getElementById('new-prod-price').value;
        const cat = document.getElementById('new-prod-category').value;
        const imgFile = document.getElementById('new-prod-image').files[0];

        if (imgFile) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                const newProd = {
                    id: 'prod-' + Date.now(),
                    name,
                    price: parseFloat(price),
                    category: cat,
                    image: ev.target.result,
                    desc: 'New Product'
                };
                products.push(newProd);
                saveProducts();
                newAddProdForm.reset();
                toggleAddProductForm();
                renderNewAdminProductList();
                updateAdminStats();
            };
            reader.readAsDataURL(imgFile);
        }
    };
}

window.deleteProduct = function (id) {
    if (confirm('Are you sure you want to delete this product?')) {
        products = products.filter(p => p.id !== id);
        saveProducts();
        renderNewAdminProductList();
        updateAdminStats();
    }
};

// --- Module: Categories ---

function renderNewAdminCategoryList() {
    const list = document.getElementById('new-admin-category-list');
    if (!list) return;
    list.innerHTML = '';

    categories.forEach(c => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${c.name}</strong></td>
            <td><i class="${c.icon}"></i></td>
            <td>
                <button class="admin-btn admin-btn-danger" onclick="deleteCategory('${c.id}')">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;
        list.appendChild(tr);
    });
}

const newAddCatForm = document.getElementById('new-add-category-form');
if (newAddCatForm) {
    newAddCatForm.onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById('new-cat-name').value;
        const icon = document.getElementById('new-cat-icon').value;
        const id = name.toLowerCase().replace(/\s+/g, '-');

        if (categories.find(c => c.id === id)) {
            alert('Category already exists!');
            return;
        }

        categories.push({ id, name, icon });
        saveCategories();
        newAddCatForm.reset();
        renderNewAdminCategoryList();
        updateAdminStats();
    };
}

window.deleteCategory = function (id) {
    if (confirm('Delete Category?')) {
        categories = categories.filter(c => c.id !== id);
        saveCategories();
        renderNewAdminCategoryList();
        updateAdminStats();
    }
};

// --- Module: Hero Manager ---

function renderHeroManager() {
    const container = document.getElementById('hero-slides-manager-container');
    if (!container) return;
    container.innerHTML = '';

    heroSlides.forEach((slide, index) => {
        const div = document.createElement('div');
        div.className = 'admin-card';
        div.style.marginBottom = '10px';
        div.style.padding = '15px';
        div.innerHTML = `
            <div style="display:flex; gap:15px; align-items:center;">
                <img src="${slide.img}" style="width:80px;height:60px;object-fit:cover;border-radius:4px;">
                <div style="flex:1;">
                    <input type="text" class="admin-form-input" value="${slide.text}" placeholder="Slide Caption" onchange="updateHeroSlideData(${index}, 'text', this.value)">
                    <input type="file" style="margin-top:5px; font-size:0.8rem;" onchange="updateHeroSlideData(${index}, 'image', this)">
                </div>
                <div style="display:flex; flex-direction:column; gap:5px;">
                    <button class="layout-btn" title="Move Up" onclick="moveSlide(${index}, -1)"><i class="fa-solid fa-arrow-up"></i></button>
                    <button class="layout-btn" title="Move Down" onclick="moveSlide(${index}, 1)"><i class="fa-solid fa-arrow-down"></i></button>
                    <button class="layout-btn" title="Delete Slide" style="color:#f64e60;" onclick="removeHeroSlide(${index})"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

window.updateHeroSlideData = function (index, type, value) {
    if (type === 'text') {
        heroSlides[index].text = value;
    } else if (type === 'image' && value.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            heroSlides[index].img = e.target.result;
            renderHeroManager();
        };
        reader.readAsDataURL(value.files[0]);
    }
};

window.addNewHeroSlide = function () {
    heroSlides.push({ img: 'img/hero.jpeg', text: 'New Slide' });
    renderHeroManager();
};

window.removeHeroSlide = function (index) {
    heroSlides.splice(index, 1);
    renderHeroManager();
};

window.moveSlide = function (index, dir) {
    const newIdx = index + dir;
    if (newIdx < 0 || newIdx >= heroSlides.length) return;
    const temp = heroSlides[index];
    heroSlides[index] = heroSlides[newIdx];
    heroSlides[newIdx] = temp;
    renderHeroManager();
};

window.saveHeroChanges = function () {
    saveLayout();
    alert('Hero slides updated successfully!');
};


// --- Module: Layout Manager ---

function renderNewAdminLayoutList() {
    const list = document.getElementById('new-layout-list');
    if (!list) return;
    list.innerHTML = '';

    pageLayout.forEach((sec, index) => {
        const div = document.createElement('div');
        div.className = 'layout-item';
        div.style.padding = '15px';
        div.innerHTML = `
            <div>
                <strong style="color:var(--admin-primary)">${sec.type.toUpperCase()}</strong>: ${sec.title || sec.id}
            </div>
            <div class="layout-item-controls">
                <button class="layout-btn" title="Move Up" onclick="moveLayout(${index}, -1)"><i class="fa-solid fa-arrow-up"></i></button>
                <button class="layout-btn" title="Move Down" onclick="moveLayout(${index}, 1)"><i class="fa-solid fa-arrow-down"></i></button>
                <button class="layout-btn" title="Delete Section" style="color:#f64e60" onclick="removeSection(${index})"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        list.appendChild(div);
    });
}

window.moveLayout = function (index, dir) {
    const newIdx = index + dir;
    if (newIdx < 0 || newIdx >= pageLayout.length) return;
    const temp = pageLayout[index];
    pageLayout[index] = pageLayout[newIdx];
    pageLayout[newIdx] = temp;
    saveLayout();
    renderNewAdminLayoutList();
};

window.removeSection = function (index) {
    if (confirm('Remove this section from homepage?')) {
        pageLayout.splice(index, 1);
        saveLayout();
        renderNewAdminLayoutList();
    }
};

window.addNewSectionFromLayout = function () {
    const type = document.getElementById('new-layout-type-select').value;
    const id = `section-${Date.now()}`;
    let title = type.charAt(0).toUpperCase() + type.slice(1);
    let content = {};

    if (type === 'banner') content = { image: 'img/hero.jpeg' };
    if (type === 'text') content = { text: 'Default Text' };

    pageLayout.push({ id, type, title, content });
    saveLayout();
    renderNewAdminLayoutList();
};

// --- Settings Module Logic ---

const newSettingsForm = document.getElementById('new-admin-settings-form');
if (newSettingsForm) {
    newSettingsForm.onsubmit = (e) => {
        e.preventDefault();
        const email = document.getElementById('new-admin-email').value;
        const pass = document.getElementById('new-admin-pass').value;

        if (email) adminCreds.email = email;
        if (pass) adminCreds.pass = pass;

        localStorage.setItem('adminCreds', JSON.stringify(adminCreds));
        alert('Profile updated!');
    };
}

// Global Auth Toggle Helper
window.toggleAuthForm = function (e) {
    if (e) e.preventDefault();
    const signin = document.getElementById('signin-form');
    const signup = document.getElementById('signup-form');
    signin.classList.toggle('active');
    signup.classList.toggle('active');
};

// Custom Sign-In Logic for Admin
const finalSigninForm = document.querySelector('#signin-form form');
if (finalSigninForm) {
    finalSigninForm.onsubmit = (e) => {
        e.preventDefault();
        const email = document.getElementById('signin-email').value;
        const pass = document.getElementById('signin-password').value;

        if (email === adminCreds.email && pass === adminCreds.pass) {
            isAdmin = true;
            localStorage.setItem('isAdmin', 'true');
            const authModal = document.getElementById('auth-modal');
            if (authModal) authModal.classList.remove('active');
            renderAll();

            if (adminDashboard) {
                adminDashboard.classList.add('active');
                switchAdminModule('dashboard');
            }
        } else {
            alert('Invalid credentials!');
        }
    };
}

// Helpers for window exposure
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQty = updateQty;

// Start
document.addEventListener('DOMContentLoaded', () => {
    initAdmin();
    renderAll();
});