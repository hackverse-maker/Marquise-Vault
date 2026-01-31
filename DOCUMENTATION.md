# MARQUISE VAULT - OFFICIAL PROJECT DOCUMENTATION

**Project Name**: Marquise Vault  
**Version**: 2.0 (Professional Dashboard Update)  
**Type**: E-Commerce CMS & Landing Page  
**Status**: Completed  

---

## 1. Introduction
Marquise Vault is a high-end, responsive e-commerce web application. It features a modern user-facing storefront and a comprehensive, professional-grade Admin Portal (CMS) built with Vanilla JavaScript, HTML5, and CSS3.

## 2. Technical Architecture
The project follows a **Serverless / JAMstack** philosophy, designed for rapid deployment and ease of use.
- **Frontend**: Single Page Application (SPA) architecture for the Admin area.
- **State Management**: Browser-native `localStorage` for cross-session persistence.
- **Performance**: Zero-dependency frontend (no heavy frameworks) for lightning-fast load times.
- **Icons & Fonts**: FontAwesome 6 Integration & Google Fonts (Poppins / Inter).

## 3. The Professional Admin Dashboard
The centerpiece of this update is the professional modular dashboard.

### 3.1 Core UX Principles
- **Single-Active Module System**: Only one management module is visible at any time to minimize cognitive load.
- **Persistent State**: The system automatically remembers your last active module (e.g., Products) even after a page refresh.
- **Seamless Auth**: Integrated login modal with secure session management.

### 3.2 Management Modules
1.  **Dashboard**: Real-time business overview (Total Products, Categories).
2.  **Product Manager**: Full CRUD (Create, Read, Update, Delete) with image preview and category assignment.
3.  **Hero Manager**: Dedicated tool for reordering, adding, and editing homepage slider images and captions.
4.  **Layout Manager**: A visual tool to swap or remove sections (Hero, Featured Products, Categories, Banners) on the main page.
5.  **Categories**: Manage shop structure and navigation icons.
6.  **Settings**: Update Admin credentials and security profiles.

## 4. User Experience (Storefront)
- **Responsive Navbar**: Adapts for Mobile (Hamburger Menu) and Desktop (Dropdowns).
- **Dynamic Homepage**: Rendered on-the-fly based on the Admin's Layout preferences.
- **Slide-in Cart**: A modern panel for item management and total calculation.
- **Smooth Animations**: CSS-driven transitions for a premium, buttery-smooth feel.

## 5. Security & Persistence
- **Mock Authentication**: Securely checks `adminCreds` stored in a hashed-index style.
- **Data Persistence**: All changes made in the Admin Portal are instantly saved to `localStorage`, making the application behave like a full-stack site on the local machine.

## 6. How to Use
1.  **Visit the Site**: Open `index.html`.
2.  **Access Admin**: Click the "Admin Portal" button in the sidebar.
3.  **Login**: Use `admin@marquise.com` / `admin123`.
4.  **Shop**: Add items to the cart and view the real-time total.

## 7. Future Roadmap
- Backend integration (Node.js/MongoDB) for multi-user synchronization.
- Stripe/PayPal Payment Gateway integration.
- Advanced SEO metadata management from the Admin Settings.

---
*Documentation Generated on January 27, 2026*
