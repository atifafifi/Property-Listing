# Atsen Property Listing 🏠

A modern, premium property listing application featuring the "DarkVeil" aesthetic—a sleek, dark-themed UI with advanced glassmorphism effects, smooth animations, and a responsive design.

## Features ✨

*   **DarkVeil Design System:** A custom dark theme with deep blacks, purple accents (`#d946ef`), and frosted glass elements.
*   **Responsive UI:** Fully responsive layout optimized for mobile, tablet, and desktop.
*   **Property Browsing:** Filter properties by price, type, and location.
*   **Interactive Modal:** Detailed property views with smooth transitions and fallback image handling.
*   **Saved Searches:** LocalStorage-based feature to save and recall search criteria.
*   **Modern Tech Stack:** Built with Next.js, Tailwind CSS v4, and Headless UI.

## Tech Stack 🛠️

*   **Framework:** [Next.js 15](https://nextjs.org/) (App Directory not enabled yet, using Pages)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **UI Components:** [Headless UI](https://headlessui.com/) (Dialogs, Transitions, Listboxes)
*   **Icons:** [React Icons](https://react-icons.github.io/react-icons/) (FontAwesome 6)
*   **Animations:** CSS Transitions & potentially GSAP/OGL for advanced effects.

## Getting Started The Project 🚀

### 1. Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 2. Installation

Clone the repository (if applicable) and install dependencies:

```bash
npm install
# or
yarn install
```

### 3. Running the Development Server

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Building for Production

To create an optimized production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Project Structure 📂

```
propertyassmnt/
├── components/         # Reusable UI components (Logo, Layout, Cards)
├── pages/              # Next.js pages (index, browse, about)
├── public/             # Static assets (images, fonts)
├── styles/             # Global styles (globals.css)
├── types/              # TypeScript interfaces (Property, etc.)
└── lib/                # Utility functions and API mocks
```

## Key Components

*   **`Layout.tsx`**: Main application wrapper with the Floating Glass Navbar.
*   **`DarkVeil.tsx`**: The signature background effect component.
*   **`PropertyCard.tsx`**: Displays individual property summaries with hover effects.
*   **`PropertyDetailsModal.tsx`**: A comprehensive modal for viewing property details.
*   **`FilterSidebar.tsx`**: Advanced filtering controls with custom checkboxes.

## Customization

The design relies heavily on Tailwind CSS. You can customize colors and styles in `globals.css` (CSS variables) or by modifying the Tailwind classes directly in the components.
