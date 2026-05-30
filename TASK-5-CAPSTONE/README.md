# Thiranex Web Development Internship Capstone Project
## TASK 5: Pure Client-Side E-Commerce Product Catalog App

A fully responsive, highly performant, and accessible **E-Commerce Product Catalog Application** handcrafted from scratch in **React (with Vite)**. This application demonstrates robust client-side routing, modular context state management, local device data persistence (`localStorage`), custom validation forms, and a custom responsive design built entirely using CSS variables and semantic elements (without standard UI frameworks like Tailwind CSS or Bootstrap).

---

## 🚀 Key Features Built-In

1. **Brand Hero & Curation Showcase (Home Page)**
   - High-fidelity Hero segment featuring category bubbles, a call-to-action button, and zoom-hover illustrations.
   - Dynamic recommendation shelf displaying the highest customer-reviewed items.
   - Value propositions bar (Warranty badges, Free Shipping details) and interactive markdown Promo vouchers.

2. **Refined Products Registry Shelf (Products Page)**
   - High-contrast search utilities with fast text querying.
   - Fully interactive categories selector tab headers.
   - Real-time catalog sorting mechanisms (Price Low-to-High, Price High-to-Low, ratings scoring).
   - Clean empty-query fallbacks supporting full filters clearance buttons.

3. **Dynamic Inventory Specs Sheet (Product Details Page)**
   - Complete subrouting rendering matching requested products (`/product/:id`).
   - Detailed product imagery panel accompanied by category tags, pricing scales, and warranty summaries.
   - Bulleted highlights sheet mapping out core feature benefits.
   - Multi-item incrementor controls allowing the consumer to lock in custom purchase batches before adding them to the cart pool.

4. **Synchronized Shopping Drawer (Cart Page)**
   - Staggered shopping list detailing ordered articles, Unit lines totals, and interactive item amount managers.
   - Sticky Order Financials panel resolving Subtotal sum, estimated taxes, and shipping thresholds (Free shipping on carts over $49!).
   - Interactive sandboxed checkout triggers generating random tracking tickets and printable receipt balances.

5. **Internship Milestone Portal (About Page)**
   - Explains the target educational objectives of the Thiranex Task 5 Capstone.
   - Modern corporate core values and technology pillar showcases.
   - Explicit developer portfolio card mapping accomplishments for the candidate.

6. **Help Desk Ticket Dispatch (Contact Page)**
   - Pure React form validations monitoring characters constraints and email standard regex rules.
   - Real-time inline indicator feedback.
   - Complete submission tickets generating automatic references keys.
   - Standard FAQ sections and business directions coordinates.

---

## 🛠️ Technologies & Architectures

- **Language Scheme:** Vanilla ES6+ Modern JavaScript (no TypeScript)
- **Framework Core:** React 19 + Vite Node build system
- **Router Layer:** Client Router via React Router DOM
- **Global States Manager:** React Context API (`CartContext`)
- **Persistence Driver:** Reactive Browser Caching (`localStorage` bindings)
- **Visual Design Scheme:** Pure hand-written Custom CSS (Responsive Flex/Grid layouts, custom variables and typography, absolute zero Bootstrap / Tailwind)
- **Icon Resources:** Lucid-react SVG assets library

---

## 📁 System Folder Structure

```
thirashop-catalog/
│
├── .env.example                # Example environment configuration variables
├── index.html                  # Core HTML5 entry point template
├── metadata.json               # Frame workspace permissions configuration
├── package.json                # Project dependencies and deployment scripts
├── tsconfig.json               # Type bindings
├── vite.config.ts              # Vite asset bundler configuration
│
└── src/
    ├── assets/                 # Local image folders and media icons
    │
    ├── components/             # Reusable UI layout elements
    │   ├── Navbar.jsx          # Header navigation bar with mobile drawer toggle
    │   ├── Footer.jsx          # Brand underbar with social links
    │   └── ProductCard.jsx     # Fluid product card layout with zoom events
    │
    ├── data/                   # Data assets layer
    │   └── products.js         # Curated catalog objects with descriptions
    │
    ├── context/                # Context API configurations
    │   └── CartContext.jsx     # Shared state synchronization hooks
    │
    ├── pages/                  # Views routed in the browser
    │   ├── Home.jsx            # Landing view with featured shelves
    │   ├── Products.jsx        # Grid lists with category sorters
    │   ├── ProductDetails.jsx  # Detailed specs sheets with quantity bars
    │   ├── Cart.jsx            # Financial summaries page
    │   ├── About.jsx           # Intern descriptions and bio card
    │   └── Contact.jsx         # Validation forms and help lines
    │
    ├── routes/                 # Routing structures
    │   └── AppRoutes.jsx       # Lazy-loaded page route paths
    │
    ├── App.jsx                 # Global Layout Shell
    ├── main.jsx                # Web mounting entry
    ├── App.css                 # Major custom CSS definitions
    └── index.css               # Resets, typography and scroll configurations
```

---

## ⚙️ Installation & Workspace Run

Follow these guidelines to mount, compile, and run the catalog server:

1. **Clone & Direct Directory entry**
   ```bash
   cd react-example
   ```

2. **Verify Node Dependencies install**
   ```bash
   npm install
   ```

3. **Start the Local Dev Server**
   ```bash
   npm run dev
   ```
   The local server is exposed on default port **`3000`** and can be browsed at `http://localhost:3000`.

4. **Verify Production Asset Build**
   ```bash
   npm run build
   ```
   The completed client builds are written into the absolute standalone `/dist` folder.

---

## 🔮 Future Enhancements & Upgrades
- **Dynamic Payment Integration:** Adding actual payment processor bindings like Stripe sandbox checkouts.
- **Local Database Syncing:** Transitioning from browser `localStorage` towards secure cloud databases like Firebase Firestore for multi-device cart recovery.
- **Wishlist Support:** Expanding customer metrics by loading "Save as favorite" heart triggers.

---

## 👨‍💻 Candidate Portfolio Info

- **Candidate Name:** Siddesh Mange
- **Internship Scope:** Thiranex Web Development Internship Task 5 Capstone
- **Primary Contacts:** siddeshmange3448@gmail.com
- **GitHub Address:** [https://github.com/siddesh3448](https://github.com/siddesh3448)
- **LinkedIn Portfolio:** [https://www.linkedin.com/in/siddesh-mange/](https://www.linkedin.com/in/siddesh-mange/)
