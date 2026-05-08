<div>
 <br />
  <div align="center">
    </div>
 <br />
 <br />

 <div>
   <img src="https://img.shields.io/badge/-React_JS_V19-black?style=for-the-badge&logoColor=white&logo=react&color=007ACC" alt="react.js" />
   <img src="https://img.shields.io/badge/-Tailwind_CSS_v4-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=030712" alt="tailwindcss" />
   <img src="https://img.shields.io/badge/-GSAP-black?style=for-the-badge&logoColor=white&logo=greensock&color=88CE02" alt="greensock" />
   <img src="https://img.shields.io/badge/-Firebase-black?style=for-the-badge&logoColor=white&logo=firebase&color=FFCA28" alt="firebase" />
 </div>

 <h3 style="font-weight:700;font-size:30px;">Sonny Travel — Global Booking Ecosystem</h3>

  <div>
    Ready to explore the world with a cinematic, high-performance booking platform? 
    <b>Sonny Travel</b> delivers a seamless experience for 52 global destinations using <b>React 19</b>, <b>GSAP</b>, and the latest <b>Tailwind CSS v4</b>.
   </div>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🚀 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. ✨ [Features](#features)
4. 📂 [Folder Structure](#folder-structure)
5. 🤸 [Quick Start](#quick-start)
6. 🕸️ [Snippets](#snippets)
7. 🔗 [Assets](#links)
8. 🌐 [Community](#more)

## <a name="introduction">🚀 Introduction</a>

**Sonny Travel** is a full-scale digital travel companion engineered for speed, reliability, and visual storytelling. Covering 52 destinations across all continents, this ecosystem integrates flight scheduling, hotel stays, and curated daily plans into one fluid interface. By leveraging **GSAP** for cinematic transitions and **Firebase** for real-time data, it sets a new standard for modern travel booking applications.

## <a name="tech-stack">⚙️ Tech Stack</a>

- ⚛️ **React 19:** Utilizing the latest concurrent rendering features.
- 🌀 **Tailwind CSS v4:** Next-generation utility-first styling with native CSS variables.
- 🎞️ **GSAP:** GreenSock Animation Platform for scroll-triggered and flip animations.
- 🔥 **Firebase:** Handling Authentication and Firestore real-time database.
- 📦 **Zustand:** Lightweight and modular state management.

## <a name="features">✨ Features</a>

In this project, I've implemented:

- 🌍 **Global Coverage:** 52 unique destinations across all 7 continents.
- 📄 **PDF Generation:** Instant automated booking vouchers upon confirmation.
- 🔍 **Dynamic Discovery:** Advanced search and "Trip Ring" price filtering.
- ⚡ **Feature-Based Architecture:** Scalable folder structure (Core/Features/Shared).
- 🏨 **Integrated Itineraries:** Full Flight + Hotel + 5-day daily planning logic.
- 🎭 **Cinematic UX:** Glassmorphic UI with smooth GSAP-powered reveals.
- 📱 **Rock-Solid Reliability:** Fully responsive and mobile-optimized for explorers on the go.

  
- ## <a name="folder-structure">📂 Folder Structure</a>

The project follows a **Feature-Based Architecture** to ensure maximum scalability and clean code standards:

```text
sonny-travel/
├── src/
│   ├── core/
│   │   ├── data/           # seedData.js (Main database of 52 destinations)
│   │   ├── firebase/       # Backend configuration & logic
│   │   └── db/             # Seeding scripts for Firestore
│   ├── features/           # Independent Business Logic Modules
│   │   ├── auth/           # Login & Registration
│   │   ├── tours/          # Catalog & Detail views
│   │   ├── profile/        # User bookings & Wishlist
│   │   └── admin/          # Management Dashboard
│   ├── shared/             # Atomic UI Components
│   │   └── components/     # Navbar, TiltCard, AnimatedSection, Loading
│   ├── stores/             # Zustand State Management (authStore, bookingStore)
│   ├── scripts/            # Automation (Cloudinary upload scripts)
│   ├── App.jsx             # Main Router & Theme Providers
│   └── index.css           # Tailwind v4 Theme & Global Styles
└── vite.config.js          # Build Optimization

## <a name="quick-start">🤸 Quick Start</a>

```bash
# 1. Clone the repo
git clone [https://github.com/mostafaelsonny/sonny-travel.git](https://github.com/mostafaelsonny/sonny-travel.git)

# 2. Install dependencies
npm install

# 3. Configure Firebase
# Create a .env.local file with your VITE_FIREBASE_API_KEY, etc.

# 4. Start the development server
npm run dev

## <a name="snippets">🕸️ snippets</a>

@import "tailwindcss";

@theme {
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-display: 'Playfair Display', serif;

  /* Primary Blue Palette */
  --color-primary-50: #eff6ff;
  --color-primary-600: #2563eb;
  --color-primary-900: #1e3a8a;

  /* Accent Gold Palette */
  --color-accent-400: #f59e0b;
  --color-accent-500: #d97706;

  /* Deep Dark Palette */
  --color-dark-800: #1e293b;
  --color-dark-950: #020617;

  /* Glassmorphism Effects */
  --color-glass: rgba(255, 255, 255, 0.05);
  --color-glass-border: rgba(255, 255, 255, 0.1);
}

@layer base {
  body {
    @apply bg-dark-950 text-dark-50 antialiased;
    font-family: var(--font-sans);
  }
}


## <a name="links">🔗 Assets</a>
 🎥 Videos: /public/videos

 📚 Fonts: Inter & Playfair Display

 🖼️ Images & SVGs: /src/assets
