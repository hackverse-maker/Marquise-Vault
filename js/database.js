// --- Mock Database (localStorage wrapper) ---

const DB_KEY_PREFIX = 'mv_db_';

function getData(key) {
    const data = localStorage.getItem(DB_KEY_PREFIX + key);
    return data ? JSON.parse(data) : INITIAL_DATA[key];
}

function setData(key, value) {
    localStorage.setItem(DB_KEY_PREFIX + key, JSON.stringify(value));
}

const INITIAL_DATA = {
    products: [
        // Tote Bags
        { id: 1, name: 'Classic Leather Tote', price: 12500, category: 'tote', image: 'img/tote.jpeg', desc: 'Space and style combined.', featured: true },
        { id: 7, name: 'Modern Canvas Tote', price: 13500, category: 'tote', image: 'img/tote (2).jpeg', desc: 'Durable and chic.', featured: false },
        { id: 10, name: 'Urban Carryall', price: 14500, category: 'tote', image: 'img/tote (4).jpeg', desc: 'Large capacity for essentials.', featured: false },

        // Shoulder Bags
        { id: 2, name: 'Tan Shoulder Bag', price: 9500, category: 'shoulder', image: 'img/shoulder.jpeg', desc: 'Perfect for daily commute.', featured: true },
        { id: 11, name: 'Midnight Shoulder', price: 10500, category: 'shoulder', image: 'img/shoulder (2).jpeg', desc: 'Elegant evening choice.', featured: false },
        { id: 12, name: 'Soft Grain Shoulder', price: 11500, category: 'shoulder', image: 'img/shoulder (4).jpeg', desc: 'Minimalist luxury.', featured: false },

        // Cross Body
        { id: 3, name: 'Cross Body Mini', price: 7500, category: 'cross-body', image: 'img/cross body.jpeg', desc: 'Lightweight and elegant.', featured: true },
        { id: 8, name: 'Urban Cross Body', price: 8500, category: 'cross-body', image: 'img/cross body (2).jpeg', desc: 'Street style favorite.', featured: false },
        { id: 13, name: 'Traveler Cross Body', price: 9000, category: 'cross-body', image: 'img/cross body (3).jpeg', desc: 'Secure and handy.', featured: false },

        // Hand Bags
        { id: 4, name: 'Leather Handbag', price: 15000, category: 'hand', image: 'img/hand.jpeg', desc: 'Premium leather finish.', featured: true },
        { id: 14, name: 'Chic Top Handle', price: 16500, category: 'hand', image: 'img/hand (2).jpeg', desc: 'Classic silhouette.', featured: false },
        { id: 15, name: 'Small Frame Handbag', price: 17500, category: 'hand', image: 'img/hand (3).jpeg', desc: 'Exquisite craftsmanship.', featured: false },

        // Pouches
        { id: 5, name: 'Velvet Pouch', price: 4500, category: 'pouches', image: 'img/pouches.jpeg', desc: 'Soft touch velvet.', featured: true },
        { id: 9, name: 'Chic Organizing Pouch', price: 5000, category: 'pouches', image: 'img/pouches (7).jpeg', desc: 'Keep it neat.', featured: false },
        { id: 16, name: 'Makeup Pouch Pro', price: 5500, category: 'pouches', image: 'img/pouches (2).jpeg', desc: 'Essential for travel.', featured: false },

        // Accessories
        { id: 6, name: 'Gold Accessory Kit', price: 3000, category: 'accessories', image: 'img/accessories.jpeg', desc: 'Must have details.', featured: true },
        { id: 17, name: 'Leather Keychain', price: 1500, category: 'accessories', image: 'img/accessories (1).jpeg', desc: 'Fine leather link.', featured: false },
        { id: 18, name: 'Bag Charm Set', price: 2500, category: 'accessories', image: 'img/accessories (2).jpeg', desc: 'Personalize your bag.', featured: false }
    ],
    categories: [
        { id: 'tote', name: 'Tote Bags', image: 'img/tote.jpeg', icon: 'fa-solid fa-shopping-bag' },
        { id: 'shoulder', name: 'Shoulder Bags', image: 'img/shoulder.jpeg', icon: 'fa-solid fa-briefcase' },
        { id: 'cross-body', name: 'Cross Body', image: 'img/cross body.jpeg', icon: 'fa-solid fa-person-breastfeeding' },
        { id: 'hand', name: 'Hand Bags', image: 'img/hand.jpeg', icon: 'fa-solid fa-hand-holding' },
        { id: 'pouches', name: 'Pouches', image: 'img/pouches.jpeg', icon: 'fa-solid fa-folder-open' },
        { id: 'accessories', name: 'Accessories', image: 'img/accessories.jpeg', icon: 'fa-solid fa-gem' }
    ],
    hero: [
        { image: 'img/hero.jpeg', title: 'Luxury Redefined', subtitle: 'Explore our premium collection of handcrafted bags.' },
        { image: 'img/hero (1).jpeg', title: 'Summer Collection', subtitle: 'Find your perfect style for the season.' },
        { image: 'img/hero (2).jpeg', title: 'Elegance Everywhere', subtitle: 'Bags that make a statement wherever you go.' }
    ],
    layout: [
        {
            type: 'hero',
            active: true,
            title: 'Luxury',
            accent: 'Redefined',
            subtitle: 'Discover our exclusive collection of premium bags handcrafted with passion and elegance.',
            slides: [
                { image: 'img/hero.jpeg' },
                { image: 'img/hero (1).jpeg' },
                { image: 'img/hero (2).jpeg' }
            ]
        },
        {
            type: 'featured',
            active: true,
            title: 'Featured Products'
        },
        {
            type: 'category-products',
            active: true
        }
    ],
    settings: {
        currency: 'PKR',
        saleEnabled: true,
        saleText: 'LAUNCH SALE | Flat 10% off | Promo Code: V10',
        saleEndTime: '2026-12-31T23:59:59'
    },
    cart: [],
    favorites: [],
    orders: [
        {
            id: '1001',
            date: '2026-02-01T10:30:00Z',
            total: 12500,
            status: 'pending',
            customer: {
                name: 'Tariq Mehmood',
                email: 'tariq@example.com',
                phone: '0300 1234567',
                address: 'Plot 45, Defense Phase 2',
                city: 'Karachi',
                zip: '75500'
            },
            items: [
                { id: 1, name: 'Classic Leather Tote', price: 12500, quantity: 1 }
            ]
        }
    ]
};
