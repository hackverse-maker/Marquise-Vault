// --- Main Application Logic ---

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    // Load components
    loadComponent('#navbar-placeholder', 'js/components/navbar.html');
    loadComponent('#footer-placeholder', 'js/components/footer.html');

    // Initialize specific page logic
    const path = window.location.pathname;
    const page = path.split("/").pop() || "index.html";

    if (page === "index.html" || page === "") {
        initHomePage();
    }

    // Core features
    initSaleCountdown();
    updateBadges();
    checkAdminSession();
}

function checkAdminSession() {
    const session = JSON.parse(localStorage.getItem('mv_auth_session'));
    const adminFloat = document.getElementById('admin-float');
    if (adminFloat && session && session.role === 'admin') {
        adminFloat.style.display = 'block';
    }
}

// Sale Countdown Logic
function initSaleCountdown() {
    const banner = document.getElementById('sale-banner');
    const messageEl = document.getElementById('sale-message');
    const countdownEl = document.getElementById('countdown');
    if (!banner) return;

    const settings = getData('settings');
    if (!settings || !settings.saleEnabled) {
        banner.style.display = 'none';
        document.body.style.paddingTop = '85px';
        return;
    }

    banner.style.display = 'block';
    messageEl.textContent = settings.saleText;

    const endTime = new Date(settings.saleEndTime).getTime();

    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance < 0) {
            clearInterval(timer);
            banner.style.display = 'none';
            document.body.style.paddingTop = '85px';
            return;
        }

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownEl.textContent = `${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M ${seconds.toString().padStart(2, '0')}S`;
    }, 1000);
}

// Currency Formatter
function formatPrice(amount) {
    const settings = getData('settings');
    const currency = settings ? settings.currency : 'USD';

    if (currency === 'PKR') {
        return `Rs. ${amount.toLocaleString()}`;
    }
    return `$${amount.toFixed(2)}`;
}

function initHomePage() {
    const layout = getData('layout') || [
        { type: 'hero', active: true },
        { type: 'featured', active: true },
        { type: 'category-products', active: true }
    ];

    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    mainContent.innerHTML = ''; // Clear static sections

    layout.forEach(item => {
        if (!item.active) return;

        const section = document.createElement('div');
        section.id = `${item.type}-container`;
        mainContent.appendChild(section);

        switch (item.type) {
            case 'hero':
                renderHeroSection(section, item);
                break;
            case 'categories':
                renderCategoriesSection(section, item);
                break;
            case 'featured':
                renderFeaturedProducts(section, item);
                break;
            case 'category-products':
                renderCategoryProducts(section, item);
                break;
        }
    });

    initHeroSlider(); // Re-init slider after rendering
}

function renderHeroSection(container, config) {
    const slides = config.slides || getData('hero') || [];
    // Use config-specific titles if available, otherwise defaults
    const mainTitle = config.title || 'Luxury';
    const accentTitle = config.accent || 'Redefined';
    const subtitle = config.subtitle || 'Discover our exclusive collection of premium bags handcrafted with passion and elegance.';

    container.innerHTML = `
        <section class="hero" id="hero-section">
            <div class="hero-wrapper">
                <div class="hero-text">
                    <h1>${mainTitle} <br><span class="accent">${accentTitle}</span></h1>
                    <p>${subtitle}</p>
                    <a href="category-products.html" class="btn" style="width: fit-content;">Shop Collection</a>
                </div>
                <div class="hero-image">
                    <div class="slider-container">
                        ${slides.map((h, i) => `<img src="${h.image}" class="slide ${i === 0 ? 'active' : ''}" alt="">`).join('')}
                    </div>
                </div>
            </div>
        </section>
    `;
}

// Global Category Products Rendering
function renderCategoryProducts(container) {
    if (!container) return;

    const categories = getData('categories');
    const products = getData('products');

    container.innerHTML = categories.map(cat => {
        const catProducts = products.filter(p => p.category === cat.id);
        if (catProducts.length === 0) return '';

        return `
            <section class="featured-products container">
                <h2 class="section-title">${cat.name}</h2>
                <div class="products-grid">
                    ${catProducts.slice(0, 4).map(product => `
                        <div class="product-card">
                            <div class="product-image-wrapper">
                                <img src="${product.image}" alt="${product.name}">
                            </div>
                            <div class="product-info">
                                <h3>${product.name}</h3>
                                <div class="price">${formatPrice(product.price)}</div>
                                <div class="product-actions">
                                    <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
                                    <button class="fav-btn" onclick="toggleFavorite(${product.id})">
                                        <i class="fa-regular fa-heart"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div style="text-align: center; margin-top: 2rem;">
                    <a href="category-products.html?cat=${cat.id}" class="btn-outline">View All ${cat.name}</a>
                </div>
            </section>
        `;
    }).join('');
}

// Category Section Logic
function renderCategoriesSection(container) {
    if (!container) return;

    const categories = getData('categories');
    container.innerHTML = `
        <div class="container" style="padding: 100px 0;">
            <h1 class="section-title">Shop By Category</h1>
            <div class="category-grid">
                ${categories.map(cat => `
                    <div class="category-card" onclick="window.location.href='category-products.html?cat=${cat.id}'">
                        <img src="${cat.image}" alt="${cat.name}">
                        <div class="category-overlay">
                            <h2>${cat.name}</h2>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Populate Navbar Categories
function populateNavbarCategories() {
    const dropdown = document.getElementById('nav-cat-dropdown');
    if (!dropdown) return;

    const categories = getData('categories');
    dropdown.innerHTML = categories.map(cat => `
        <a href="category-products.html?cat=${cat.id}">
            <i class="${cat.icon}"></i> ${cat.name}
        </a>
    `).join('');
}

// Hero Slider Logic
function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length <= 1) return;

    let currentSlide = 0;
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 5000);
}

// Render Products from Database
function renderFeaturedProducts(container, config) {
    if (!container) return;

    const products = getData('products');
    const featured = products.filter(p => p.featured);
    const title = config.title || 'Featured Products';

    container.innerHTML = `
        <section class="featured-products container">
            <h2 class="section-title">${title}</h2>
            <div class="products-grid">
                ${featured.map(product => `
                    <div class="product-card">
                        <div class="product-image-wrapper">
                            <img src="${product.image}" alt="${product.name}">
                        </div>
                        <div class="product-info">
                            <h3>${product.name}</h3>
                            <div class="price">${formatPrice(product.price)}</div>
                            <div class="product-actions">
                                <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
                                <button class="fav-btn" onclick="toggleFavorite(${product.id})">
                                    <i class="fa-regular fa-heart"></i>
                                </button>
                                <a href="product-details.html?id=${product.id}" class="btn-outline" style="padding: 10px; font-size: 0.8rem; display: flex; align-items: center; justify-content: center;">Details</a>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
    `;
}

// Badge Updates
function updateBadges() {
    const cart = getData('cart') || [];
    const favs = getData('favorites') || [];

    const cartCount = document.getElementById('cart-count');
    const favCount = document.getElementById('fav-count');

    if (cartCount) cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
    if (favCount) favCount.textContent = favs.length;
}

// Global Event for Component Loading
document.addEventListener('componentLoaded', (e) => {
    if (e.detail.selector === '#navbar-placeholder') {
        updateBadges();
        highlightActiveLink();
        populateNavbarCategories();
        initSearch();
    }
});

function initSearch() {
    const searchToggle = document.getElementById('search-toggle');
    if (!searchToggle) return;

    searchToggle.addEventListener('click', (e) => {
        e.preventDefault();
        const query = prompt('Search for products:');
        if (query) {
            window.location.href = `category-products.html?search=${encodeURIComponent(query)}`;
        }
    });
}

function highlightActiveLink() {
    const path = window.location.pathname.split("/").pop() || "index.html";
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        if (link.getAttribute('href') === path) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
