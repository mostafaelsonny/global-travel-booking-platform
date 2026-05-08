🌍 Sonny Travel — The Ultimate Global Booking EcosystemSonny Travel is a high-performance, cinematic travel booking platform designed for the modern explorer. Covering 52 destinations across all 7 continents, it provides a seamless, "all-in-one" experience for booking flights, luxury hotels, and curated daily itineraries. Built with a focus on speed, reliability, and immersive animations.

📑 Table of Contents
🚀 Introduction
⚙️ Tech Stack
✨ Key Features
📂 Folder Structure
🎨 Design System
🛠️ Architecture & State
🤸 Quick Start

##🚀 IntroductionSonny Travel isn't just a booking site; it's a digital travel companion. Leveraging GSAP for high-end cinematic transitions and React 19 for lightning-fast interactions, the platform allows users to explore the world with zero lag. From searching global destinations to generating instant PDF confirmations, every step is engineered for premium reliability.

⚙️ Tech Stack
Frontend: React 19 + Vite
Styling: Tailwind CSS v4 (Alpha/Latest)
Animations: GSAP (ScrollTrigger, Flip, & Custom Timelines)
Backend/Auth: Firebase (Firestore, Authentication, Storage)
State Management: Zustand (Modular Stores)
Document Generation: JSPDF / React-PDF (For instant booking vouchers)

##✨ Key Features
	✈️ Global Reach: 52 curated destinations across every continent.
	🏨 Integrated Booking: Complete package handling (Flights + Hotel + Daily Plans).
	🔍 Advanced Discovery: Real-time search and price-range filtering (Trip Ring).📅 Dynamic Itineraries: Detailed 5-day plans for every single 	destination.
	📄 Instant Vouchers: Generate and download PDF booking summaries automatically.
	🎭 Immersive UI: Glassmorphic design with GSAP-powered "Tilt" cards and smooth reveals.
	🔒 Secure Auth: Full user profile management and booking history via Firebase.

##📂 Folder StructureThe project follows a Feature-Based Architecture for maximum scalability:Plaintextsonny-travel/
├── src/
│   ├── core/
│   │   ├── data/           # Seed data & constants (52 destinations)
│   │   ├── firebase/       # Config & Services (Auth, Firestore)
│   │   └── db/             # Seeder scripts for database initialization
│   ├── features/           # Modularized Business Logic
│   │   ├── admin/          # Dashboard for managing bookings
│   │   ├── auth/           # Login/Register modules
│   │   ├── tours/          # Destination listing & Detail views
│   │   └── profile/        # User bookings & Wishlist
│   ├── shared/             # Atomic UI Components
│   │   └── components/     # Navbar, Footer, AnimatedSections, TiltCards
│   ├── stores/             # Zustand Global State (Auth, Booking, Dest)
│   ├── scripts/            # Automation (Cloudinary Uploads, etc.)
│   └── App.jsx             # Main Router & Provider Setup
└── public/                 # Static assets & SVG Icons

##🎨 Design System
	|Token|Usage|Value|
	|-----|-----|-----|
	|Primary|Branding|Buttons|Blue-600 (#2563eb)|
	|Accent|Price/Highlights|Amber-500 (#d97706)|
	|Surface|Dark Mode|Slate-950 (#020617)|
	|Glass|Cards/Overlays|"rgba(255, 255, 255, 0.05)"|
	|Display|Headings|Playfair Display (Serif)|

##🛠️ Architecture & State
	Reliability: Using Firebase onSnapshot for real-time booking updates.
	Performance: All heavy images are optimized and served via Cloudinary.
	State: Decoupled logic using Zustand stores (authStore.js, destinationStore.js) to prevent unnecessary re-renders.


##🤸 Quick StartBash# 1. Clone the repository
git clone https://github.com/mostafaelsonny/sonny-travel.git

# 2. Install dependencies
npm install

# 3. Setup Environment Variables
# Create a .env.local and add your Firebase & Cloudinary keys

# 4. Start the engine
npm run dev
Built with ❤️ for World Explorers | Sonny Travel v1.0
