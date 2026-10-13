import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.pivilis.com",
          },
        ],
        destination: "https://pivilis.com/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    const noIndexHeaders = [
      {
        key: "X-Robots-Tag",
        value: "noindex, nofollow, noarchive",
      },
    ];

    return [
      {
        source: "/inbox",
        headers: noIndexHeaders,
      },
      {
        source: "/api/:path*",
        headers: noIndexHeaders,
      },
      {
        source: "/signin-with-chatgpt",
        headers: noIndexHeaders,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "(?<deployment>.+)\\.vercel\\.app",
          },
        ],
        headers: noIndexHeaders,
      },
    ];
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "cloudflare:workers": path.resolve(__dirname, "lib/cloudflare-mock.ts"),
    };
    return config;
  },
  turbopack: {
    resolveAlias: {
      "cloudflare:workers": "./lib/cloudflare-mock.ts",
    },
  },
};

export default nextConfig;
