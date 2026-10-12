# Pivilis website — start here

This ZIP contains the complete source of the current Pivilis website: Home, Services, seven individual service pages, About, Contact, the owner inbox, original logo files, seven generated service images, styles, components, and the database migration. The live website is at https://pivilis.www-kiranking008.chatgpt.site/.

## Run locally

1. Install Node.js 22.13 or newer and pnpm 11.25.
2. Open this folder in your IDE.
3. Run `pnpm install --frozen-lockfile`.
4. Run `pnpm dev` and open the local address printed in the terminal.

The project uses React 19, TypeScript, Tailwind CSS, and Vinext (Next.js-compatible routes on Cloudflare Workers). Edit the pages in `app/`, shared UI in `components/`, and the complete service catalogue in `lib/services.ts`. Images are in `public/images/`. The existing `README.md` describes the underlying Vinext starter and its local Cloudflare setup.

## Contact form and database

The enquiry form calls `POST /api/enquiries` and stores submissions in Cloudflare D1. The SQL migration is `drizzle/0000_true_kingpin.sql`. To test submission locally, build the project and apply that migration to the local D1 binding as described in the root `README.md`. The deployed site's database and received enquiries are not included in this source ZIP. The `/inbox` route uses hosted owner authentication.

## Deployment and files

`.openai/hosting.json` identifies the current private Pivilis Site and D1 binding; keep it when continuing work on that Site. Do not put credentials or private environment files in the project. Generated build folders (`dist`, `.next`), dependency folders (`node_modules`), local databases, and Git history are intentionally omitted; they can be regenerated from this source and lockfile.

`DESIGN_AND_INFORMATION_ARCHITECTURE.md` and `ANIMATION_AND_DESIGN_REFERENCES.md` are planning notes from earlier passes. The running components and `app/globals.css` are authoritative for the current UI. The Services index now includes seven image-led sections and all 96 capabilities in grouped disclosures. The homepage hero uses the dark product-and-laptop image, and the Services hero uses a one-time coral line and masked heading reveal. Reduced-motion settings keep content available without movement.
