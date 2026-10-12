// Local development mock for Cloudflare Workers runtime
// Used when running locally on Windows or with Next.js dev server

export const env: {
  DB: any;
  PIVILIS_OWNER_EMAIL: string;
  [key: string]: any;
} = {
  PIVILIS_OWNER_EMAIL: process.env.PIVILIS_OWNER_EMAIL || "owner@pivilis.com",
  DB: {
    prepare: (query: string) => ({
      bind: (...args: any[]) => ({
        run: async () => ({ success: true, meta: { changes: 1 } }),
        all: async () => ({ results: [] }),
        first: async () => null,
      }),
      run: async () => ({ success: true, meta: { changes: 1 } }),
      all: async () => ({ results: [] }),
      first: async () => null,
    }),
  },
};
