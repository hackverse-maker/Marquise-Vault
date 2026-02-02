// --- Store & Logic (Cart / Favorites) ---

function addToCart(productId) {
    const products = getData('products');
    const product = products.find(p => p.id === productId);
    if (!product) return;

    let cart = getData('cart');
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    setData('cart', cart);
    updateBadges();
    showToast('Added to cart!');
}

function toggleFavorite(productId) {
    let favs = getData('favorites');
    const index = favs.findIndex(id => id === productId);

    if (index === -1) {
        favs.push(productId);
        showToast('Added to favorites!');
    } else {
        favs.splice(index, 1);
        showToast('Removed from favorites.');
    }

    setData('favorites', favs);
    updateBadges();
}

function showToast(message) {
    // Create toast container if it doesn't exist
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.className = 'show';
    setTimeout(() => { toast.className = toast.className.replace('show', ''); }, 3000);
}

// Add simple toast CSS to document
const style = document.createElement('style');
style.innerHTML = `
    #toast {
        visibility: hidden;
        min-width: 250px;
        background-color: #333;
        color: #fff;
        text-align: center;
        border-radius: 5px;
        padding: 16px;
        position: fixed;
        z-index: 2000;
        left: 50%;
        bottom: 30px;
        transform: translateX(-50%);
        font-size: 14px;
    }
    #toast.show {
        visibility: visible;
        animation: fadein 0.5s, fadeout 0.5s 2.5s;
    }
    @keyframes fadein { from {bottom: 0; opacity: 0;} to {bottom: 30px; opacity: 1;} }
    @keyframes fadeout { from {bottom: 30px; opacity: 1;} to {bottom: 0; opacity: 0;} }
`;
document.head.appendChild(style);
