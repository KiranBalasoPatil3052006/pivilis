# Pivilis

The Pivilis business website, built with Next.js 16, React 19 and TypeScript.

## Local development

```powershell
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Checks

```powershell
pnpm lint
pnpm typecheck
pnpm build
```

## Deployment

The project is configured for Vercel in `vercel.json`. Vercel builds the
Next.js application with `pnpm build` and deploys the `.next` output.

Deployable WebP images and search icons are stored directly in Git. Original
PNG source files remain in Git LFS.

## Search verification

The site emits Google and Bing verification metadata only when a real token is
configured. Copy the relevant variable names from `.env.example` into the
local or Vercel environment:

```text
GOOGLE_SITE_VERIFICATION
BING_SITE_VERIFICATION
```

The production canonical origin is intentionally fixed to
`https://pivilis.com` so previews and local environments cannot publish their
own URLs as canonicals.
