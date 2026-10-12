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

Images are stored with Git LFS. Enable Git LFS in the Vercel project's
**Settings > Git** before redeploying from GitHub.
