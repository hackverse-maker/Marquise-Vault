
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

// Force reset if version mismatch (Simple migration for this task)
if (storedVersion !== CONFIG_VERSION) {
    heroSlides = DEFAULT_HERO_SLIDES; // Reset hero slides to pick up new images
    localStorage.setItem('heroSlides', JSON.stringify(heroSlides));
    localStorage.setItem('configVersion', CONFIG_VERSION);
    // Optional: Reset products too if needed, but hero is key here.
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
    updateAdminUI();
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
            secDiv.className = 'featured-products'; // Keep existing class styles
            renderFeaturedSection(secDiv);
        } else if (section.type === 'categories') {
            // We'll render categories inside this container
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

    // Re-init any sliders or listeners
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

    // Start Hero Slider Animation (Simple Interval)
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

    // Render Items
    const sliderInner = container.querySelector('.featured-slider');
    const productsToFeature = products.slice(0, 5); // Just take first 5 for now, or use a 'featured' flag

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

    // Init Slider Logic
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

    // Reuse existing render logic logic
    // We'll call the logic but target this inner container
    // However, existing renderProducts() creates headers and specific category grids.
    // Let's refactor renderProducts to accept a container.
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

    // Init Interval
    const slideEls = container.querySelectorAll('.slide');
    let current = 0;
    if (slideEls.length > 0) {
        // Attach interval to element to avoid leaks if re-rendered? 
        // For simplicity:
        setInterval(() => {
            slideEls[current].classList.remove('active');
            current = (current + 1) % slideEls.length;
            slideEls[current].classList.add('active');
        }, 3000 + (Math.random() * 1000)); // slight offset
    }
}

/* Text Section Renderer */
function renderTextSection(container, data) {
    container.style.padding = '40px';
    container.style.textAlign = 'center';
    container.innerHTML = `<h3>${data.content ? data.content.text : 'Text Block'}</h3>`;
}


// --- Categories Logic (Updated to accept container) ---
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
    // If no target provided, don't run (it's called by renderPage now)
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

// --- Cart Logic (Unchanged but ensuring renderAll works) ---

const cartPanel = document.getElementById('cart-panel');
const cartCloseBtn = document.getElementById('cart-close-btn');

if (cartCloseBtn) cartCloseBtn.addEventListener('click', () => {
    cartPanel.classList.remove('active');
});

// Update main nav cart icon
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


// --- Admin Logic ---

const adminPortal = document.getElementById('admin-portal');
const sidebarEntry = document.getElementById('admin-sidebar-entry');
const closeAdminBtn = document.getElementById('admin-close-btn');

function updateAdminUI() {
    // Determine visibility or state of admin elements
    if (isAdmin) {
        // Prepare lists
        renderAdminLayoutList();
        renderAdminProductList();
        renderAdminCategoryList();

        // Pre-fill settings
        const mailInput = document.getElementById('admin-email-input');
        if (mailInput) mailInput.value = adminCreds.email;

    } else {
        adminPortal.classList.remove('active');
    }
}

if (sidebarEntry) {
    sidebarEntry.addEventListener('click', () => {
        if (isAdmin) {
            adminPortal.classList.add('active');
        } else {
            // Show Login
            const authModal = document.getElementById('auth-modal');
            if (authModal) {
                authModal.classList.add('active');
                // Ensure signin is shown
                document.getElementById('signin-form').classList.add('active');
                document.getElementById('signup-form').classList.remove('active');
            }
        }
    });
}
if (closeAdminBtn) closeAdminBtn.addEventListener('click', () => adminPortal.classList.remove('active'));

// Admin Tabs Logic
const tabBtns = document.querySelectorAll('.admin-tab-btn');
const tabContents = document.querySelectorAll('.admin-tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        // Add active class to clicked
        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(`tab-${tabId}`).classList.add('active');
    });
});

// Layout Manager
function renderAdminLayoutList() {
    const list = document.getElementById('admin-section-list');
    if (!list) return;
    list.innerHTML = '';

    pageLayout.forEach((section, index) => {
        const item = document.createElement('div');
        item.className = 'layout-item';

        let editBtn = '';
        if (['hero', 'banner', 'text', 'slider'].includes(section.type)) {
            editBtn = `<button class="layout-btn" title="Edit Content" onclick="openEditSectionModal(${index})"><i class="fa-solid fa-pen"></i></button>`;
        }

        item.innerHTML = `
            <h4>${section.type.toUpperCase()}: ${section.title || section.id}</h4>
            <div class="layout-item-controls">
                ${editBtn}
                <button class="layout-btn" title="Move Up" onclick="moveSection(${index}, -1)"><i class="fa-solid fa-arrow-up"></i></button>
                <button class="layout-btn" title="Move Down" onclick="moveSection(${index}, 1)"><i class="fa-solid fa-arrow-down"></i></button>
                <button class="layout-btn" title="Delete" style="color:red;" onclick="deleteSection(${index})"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        list.appendChild(item);
    });
}

function moveSection(index, direction) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= pageLayout.length) return;

    // Swap
    const temp = pageLayout[index];
    pageLayout[index] = pageLayout[newIndex];
    pageLayout[newIndex] = temp;
    saveLayout();
}

function deleteSection(index) {
    if (confirm('Delete this section?')) {
        pageLayout.splice(index, 1);
        saveLayout();
    }
}

// Edit Section Logic
const editModal = document.getElementById('edit-section-modal');
const editClose = document.getElementById('edit-section-close');
const editForm = document.getElementById('edit-section-form');
const editContainer = document.getElementById('edit-section-dynamic-inputs');
let currentEditIndex = -1;

if (editClose) editClose.onclick = () => editModal.classList.remove('active');

function openEditSectionModal(index) {
    currentEditIndex = index;
    const section = pageLayout[index];
    document.getElementById('edit-modal-title').textContent = `Edit ${section.type.toUpperCase()}`;
    editContainer.innerHTML = '';

    if (section.type === 'hero') {
        // Hero Editing: Manage Slides
        heroSlides.forEach((slide, i) => {
            const div = document.createElement('div');
            div.style.borderBottom = '1px solid #eee';
            div.style.marginBottom = '10px';
            div.style.paddingBottom = '10px';
            div.innerHTML = `
                <p>Slide ${i + 1}</p>
                <input type="text" placeholder="Caption" value="${slide.text}" onchange="updateHeroSlide(${i}, 'text', this.value)" style="width:100%; margin-bottom:5px;">
                <input type="file" onchange="updateHeroSlideImage(${i}, this)" style="margin-bottom:5px;">
                <div style="font-size:0.8rem; color:#888;">Current: ${slide.img.substring(0, 20)}...</div>
                <button type="button" class="delete-btn" onclick="deleteHeroSlide(${i})" style="margin-top:5px; width:auto; padding:5px 10px;">Remove Slide</button>
            `;
            editContainer.appendChild(div);
        });
        const addBtn = document.createElement('button');
        addBtn.type = 'button';
        addBtn.className = 'btn admin-btn';
        addBtn.textContent = 'Add New Slide';
        addBtn.onclick = () => {
            heroSlides.push({ img: 'img/hero.jpeg', text: 'New Slide' });
            openEditSectionModal(index); // Re-render
        };
        editContainer.appendChild(addBtn);

    } else if (section.type === 'banner') {
        // Banner Editing
        editContainer.innerHTML = `
            <label>Banner Image</label>
            <input type="file" id="edit-banner-img">
            <div id="edit-banner-preview" class="image-preview-box">
                <img src="${section.content.image}" style="width:100%;height:100%;object-fit:cover;">
            </div>
        `;
        document.getElementById('edit-banner-img').onchange = function () {
            if (this.files[0]) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    document.getElementById('edit-banner-preview').innerHTML = `<img src="${e.target.result}" style="width:100%;height:100%;object-fit:cover;">`;
                    section.content.image = e.target.result; // Stage change
                };
                reader.readAsDataURL(this.files[0]);
            }
        };

    } else if (section.type === 'text') {
        editContainer.innerHTML = `
            <label>Text Content</label>
            <textarea id="edit-text-content" rows="4" style="width:100%;">${section.content.text}</textarea>
        `;
        document.getElementById('edit-text-content').onchange = function () {
            section.content.text = this.value;
        };
    }

    editModal.classList.add('active');
}

window.updateHeroSlide = (index, field, value) => {
    heroSlides[index][field] = value;
};

window.updateHeroSlideImage = (index, input) => {
    if (input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            heroSlides[index].img = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
};

window.deleteHeroSlide = (index) => {
    heroSlides.splice(index, 1);
    openEditSectionModal(currentEditIndex);
};

if (editForm) {
    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // For Banner/Text, changes are staged in the object reference directly or via onchange.
        // For Hero, we update the global heroSlides.

        saveLayout(); // Saves pageLayout AND heroSlides
        editModal.classList.remove('active');
        renderAll(); // Refresh UI
        alert('Changes Saved!');
    });
}
window.openEditSectionModal = openEditSectionModal;

// Add New Section
const addSectionBtn = document.getElementById('btn-add-section');
const newSectionType = document.getElementById('new-section-type');

if (addSectionBtn) {
    addSectionBtn.addEventListener('click', () => {
        const type = newSectionType.value;
        const id = `section-${Date.now()}`;
        let title = 'New Section';
        let content = {};

        if (type === 'banner') {
            title = 'Banner';
            // Prompt for image? For now add placeholder.
            content = { image: 'img/hero.jpeg' }; // Default placeholder
        } else if (type === 'slider') {
            title = 'Image Slider';
        } else if (type === 'text') {
            title = 'Text Block';
            content = { text: 'New Text Block' };
        }

        pageLayout.push({ id, type, title, content });
        saveLayout();
    });
}

// Product Manager
function renderAdminProductList() {
    const list = document.getElementById('admin-product-list');
    if (!list) return;
    list.innerHTML = '';

    products.forEach(p => {
        const div = document.createElement('div');
        div.className = 'admin-cart-item';
        div.innerHTML = `
            <img src="${p.image}" style="width:40px;height:40px;object-fit:cover;">
            <div class="admin-cart-info">
                <h4>${p.name}</h4>
                <p>${p.price}</p>
            </div>
            <button class="delete-btn" onclick="deleteProduct('${p.id}')">Delete</button>
        `;
        list.appendChild(div);
    });

    // Populate Category Dropdown
    const catSelect = document.getElementById('prod-category');
    if (catSelect) {
        catSelect.innerHTML = categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    }
}

function deleteProduct(id) {
    if (confirm('Delete product?')) {
        products = products.filter(p => p.id !== id);
        saveProducts();
    }
}

// Category Manager
function renderAdminCategoryList() {
    const list = document.getElementById('admin-category-list');
    if (!list) return;
    list.innerHTML = '';

    categories.forEach(c => {
        const div = document.createElement('div');
        div.className = 'admin-cart-item';
        div.innerHTML = `
             <div class="admin-cart-info">
                 <h4>${c.name}</h4> 
             </div>
             <button class="delete-btn" onclick="deleteCategory('${c.id}')">Delete</button>
         `;
        list.appendChild(div);
    });
}

function deleteCategory(id) {
    if (confirm('Delete Category?')) {
        categories = categories.filter(c => c.id !== id);
        saveCategories();
    }
}

// Add Forms Logic
const addProdForm = document.getElementById('add-product-form');
if (addProdForm) {
    const imgInput = document.getElementById('prod-image-input');
    const preview = document.getElementById('image-preview');

    imgInput.addEventListener('change', function () {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                preview.innerHTML = `<img src="${e.target.result}" style="width:100%;height:100%;object-fit:cover;">`;
            };
            reader.readAsDataURL(this.files[0]);
        }
    });

    addProdForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('prod-name').value;
        const price = document.getElementById('prod-price').value;
        const cat = document.getElementById('prod-category').value;
        const file = imgInput.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                products.push({
                    id: Date.now().toString(),
                    name,
                    price: parseFloat(price),
                    category: cat,
                    image: e.target.result
                });
                saveProducts();
                addProdForm.reset();
                preview.innerHTML = '<span>No Image</span>';
                alert('Product Added');
            };
            reader.readAsDataURL(file);
        }
    });
}

const addCatForm = document.getElementById('add-category-form');
if (addCatForm) {
    addCatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('cat-name-input').value;
        const icon = document.getElementById('cat-icon-input').value;
        const id = name.toLowerCase().replace(/\s+/g, '-');

        categories.push({ id, name, icon });
        saveCategories();
        addCatForm.reset();
        alert('Category Added');
    });
}

// --- Auth Logic ---

const authModal = document.getElementById('auth-modal');
const signinFormEl = document.getElementById('signin-form') ? document.getElementById('signin-form').querySelector('form') : null;

if (signinFormEl) {
    signinFormEl.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('signin-email').value;
        const password = document.getElementById('signin-password').value;

        if (email === adminCreds.email && password === adminCreds.pass) {
            isAdmin = true;
            localStorage.setItem('isAdmin', 'true');
            authModal.classList.remove('active');
            updateAdminUI();
            adminPortal.classList.add('active'); // Auto open
            alert("Welcome Admin");
        } else {
            alert("Invalid Credentials (Try: " + adminCreds.email + ")");
        }
    });
}

// Settings Form
const settingsForm = document.getElementById('admin-settings-form');
if (settingsForm) {
    settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('admin-email-input').value;
        const pass = document.getElementById('admin-pass-input').value;
        const confirm = document.getElementById('admin-confirm-pass-input').value;

        if (email) adminCreds.email = email;
        if (pass) {
            if (pass !== confirm) {
                alert("Passwords do not match");
                return;
            }
            adminCreds.pass = pass;
        }

        localStorage.setItem('adminCreds', JSON.stringify(adminCreds));
        alert("Admin Profile Updated");
    });
}

const logoutBtn = document.getElementById('admin-logout-btn');
if (logoutBtn) logoutBtn.addEventListener('click', () => {
    isAdmin = false;
    localStorage.setItem('isAdmin', 'false');
    updateAdminUI();
    alert('Logged out');
});

// Admin Button inside Cart
const adminLoginBtn = document.getElementById('cart-admin-login-btn');
if (adminLoginBtn) adminLoginBtn.addEventListener('click', () => {
    cartPanel.classList.remove('active');
    authModal.classList.add('active');
});

// Helpers to expose to window for onclick
window.moveSection = moveSection;
window.deleteSection = deleteSection;
window.deleteProduct = deleteProduct;
window.deleteCategory = deleteCategory;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQty = updateQty;
window.toggleAuthForm = function (e) {
    e.preventDefault();
    document.getElementById('signin-form').classList.toggle('active');
    document.getElementById('signup-form').classList.toggle('active');
};

// Start
document.addEventListener('DOMContentLoaded', () => {
    renderAll();
});