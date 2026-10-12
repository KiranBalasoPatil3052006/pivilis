# Pivilis website — start here

This folder contains the complete source of the Pivilis website: Home, Services, seven individual service pages, About, Contact, the owner inbox, original logo files, seven generated service images, styles, components, and the database migration.

## Run locally

1. Open this folder in your terminal / IDE.
2. Run `npm run dev` (or `pnpm dev`).
3. Open http://localhost:5173 (or http://localhost:3000 for `npm run dev:next`).

The project uses React 19, Next.js / Vinext, TypeScript, and Tailwind CSS.
Edit the pages in `app/`, shared UI in `components/`, and the complete service catalogue in `lib/services.ts`. Images are in `public/images/`.

## Contact form and database

The enquiry form calls `POST /api/enquiries`. During local development, enquiries use a safe development mock unless connected to a live Cloudflare D1 database.
