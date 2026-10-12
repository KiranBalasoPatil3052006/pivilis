# Pivilis — Creative, Marketing & Technology Website

A modern, high-performance web application for **Pivilis** built with Next.js 16, React 19, TypeScript, and Tailwind CSS.

---

## 🚀 How to Run Locally

### Option 1: Fast Dev Server (Recommended)
```powershell
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### Option 2: Native Next.js Dev Server
```powershell
npm run dev:next
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 📁 Clean Project Architecture

```
Pivilis/
├── app/                      <- Next.js App Router (Pages & Layouts)
│   ├── page.tsx              <- Homepage
│   ├── layout.tsx            <- Root Layout (Header, Footer, Theme)
│   ├── globals.css           <- Tailwind CSS & Design System Tokens
│   ├── about/page.tsx        <- About Page
│   ├── contact/page.tsx      <- Contact Page & Interactive Form
│   ├── services/             <- Services Directory
│   │   ├── page.tsx          <- Services Overview
│   │   └── [slug]/page.tsx   <- Individual 7 Core Service Pages
│   ├── inbox/page.tsx        <- Owner Enquiries View
│   └── api/enquiries/        <- Enquiry Submission Endpoint
│
├── components/               <- Reusable UI Components
│   ├── site-shell.tsx        <- Site Header, Footer & Contact Callouts
│   ├── service-accordion.tsx <- Interactive Service Expanders
│   ├── contact-form.tsx      <- Enquiry Form with Validation
│   ├── motion-accents.tsx    <- Tasteful, Lag-Free Motion Touches
│   └── typewriter.tsx        <- Hero Typing Accents
│
├── lib/                      <- Business Logic & Utilities
│   ├── services.ts           <- Complete 7-Service Catalogue (96 capabilities)
│   ├── service-visuals.ts    <- Image mappings
│   ├── cloudflare-mock.ts    <- Local runtime environment shim
│   └── utils.ts              <- Class merging & styling helpers
│
├── public/                   <- Static Media Assets
│   ├── images/               <- WebP Service Images, Logos & Favicons
│   └── favicon.svg           <- Vector Favicon
│
├── db/                       <- Database Schemas (Cloudflare D1 / Drizzle)
│   ├── index.ts
│   └── schema.ts
│
├── docs/                     <- Project Documentation & Specifications
│   ├── PIVILIS_START_HERE.md
│   ├── DESIGN_AND_INFORMATION_ARCHITECTURE.md
│   └── ANIMATION_AND_DESIGN_REFERENCES.md
│
├── next.config.ts            <- Next.js Configuration
├── vite.config.ts            <- Vite / Vinext Configuration
├── package.json              <- Dependencies & Scripts
└── tsconfig.json             <- TypeScript Configuration
```

---

## 🛠️ Tech Stack & Features

* **Framework:** Next.js 16 (App Router) + React 19
* **Styling:** Tailwind CSS 4 with custom editorial design tokens
* **Icons:** Lucide React
* **Theme:** Light & Dark mode support (stored in `localStorage`)
* **Accessibility:** Full keyboard navigation, `prefers-reduced-motion` compliance, minimum 44px touch targets
* **Database Support:** Drizzle ORM configured for Cloudflare D1 with safe local development fallback

---

## 📜 Available Commands

| Command | Action |
|---|---|
| `npm run dev` | Starts the development server at `http://localhost:5173` |
| `npm run dev:next` | Starts the native Next.js development server at `http://localhost:3000` |
| `npm run build` | Builds the production bundle |
| `npm run start` | Runs the compiled production server |
| `npm run lint` | Runs ESLint across the codebase |
