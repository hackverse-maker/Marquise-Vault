# Marquise Vault | Project Documentation

Welcome to the official documentation for **Marquise Vault**, a premium luxury e-commerce platform designed for elegance, speed, and ease of management.

---

## 1. Project Overview
Marquise Vault is a specialized online store for luxury bags. It features a modern, responsive frontend built with high-performance Vanilla JS and CSS, providing a seamless shopping experience without the overhead of heavy frameworks.

### Key Technologies
- **Frontend**: HTML5, Vanilla CSS3, JavaScript (ES6+)
- **Icons**: FontAwesome 6.4
- **Typography**: Google Fonts (Inter, Playfair Display)
- **Data Persistence**: LocalStorage (Browser-based Mock DB)

---

## 2. Storefront Features

### Luxury UI
- **Full-Screen Hero Slider**: Dynamic slides with high-resolution imagery.
- **Fixed Header**: Sticky navigation with an integrated **Sale Countdown Banner**.
- **Responsive Layout**: Optimized for Mobile, Tablet, and Desktop.

### Shopping Experience
- **Search System**: Quick access search icon in the header.
- **Dynamic Categories**: Populated from the database with custom icons.
- **Wishlist (Favorites)**: Persistent liking system to save desired items.
- **Shopping Cart**: Real-time quantity management and subtotal calculation.
- **Checkout**: Premium multi-section checkout page with localized forms.
- **Currency**: Fully optimized for **PKR (Rs.)** with localized formatting across all pages (Storefront & Admin).

---

## 3. Admin Portal & CMS

The Admin Portal is the "heart" of the website, allowing total control over products and site content.

### Accessing the Portal
- **Login URL**: `admin/login.html` (Accessible **ONLY** via the hidden link on the cart page).
- **Default Credentials**: 
  - **Email**: `admin@marquise.com`
  - **Password**: `admin123`

### Management Modules
1. **Dashboard**: High-level overview of store stats and **Sale Banner Settings** (Message, End Time, Toggle).
2. **Product Management**: Add, Edit, or Delete products. Supports image uploads (Base64) and featured status.
3. **Category Management**: Create and organize collections with unique icons and preview images.
4. **Layout Editor**: Fully functional dynamic reordering. Drag/move sections (Hero, Featured, etc.) and toggle their visibility. Any section can now be duplicated or re-added using the "Add New Section" modal.
5. **Order Management**: Track customer purchases in real-time. View customer shipping details, items ordered, and update order status (Pending, Shipped, Delivered).

---

## 4. Database Structure (`js/database.js`)

The site uses a JSON-based structure stored in `localStorage`. 

- **Products**: Contains `id`, `name`, `price`, `category`, `image`, and `desc`.
- **Categories**: Contains `id`, `name`, `image`, and `icon`.
- **Settings**: Stores site-wide configurations like `currency` and `saleCountdown`.

---

## 5. How to Manage the Site

### Adding a New Product
1. Log in to the **Admin Dashboard**.
2. Click **Add Product**.
3. Fill in details, select a category, and upload an image.
4. Save. The product will immediately appear on the storefront.

### Setting a Sale Timer
1. Go to the **Admin Dashboard**.
2. Locate the **Sale Settings** section.
3. Enter your message (e.g., "WINTER CLEARANCE | 30% OFF").
4. Select the **End Date and Time**.
5. Check **Enable Sale Banner** and click **Save**.

### Changing Hero Images
Hero images are managed via the `js/database.js` file or can be modified via the `Layout Editor` in future updates.

---

## 6. Deployment & Maintenance
Since this is a client-side application, it can be hosted on any static hosting service (GitHub Pages, Vercel, Netlify) by simply uploading the root directory.

- **Storage Limit**: LocalStorage typically allows ~5MB of data. For very large catalogs (>1000 items with high-res images), a backend database (Node.js/MongoDB) is recommended.
