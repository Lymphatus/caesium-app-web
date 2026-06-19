import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';
const apiHost = process.env.NEXT_PUBLIC_API_HOST;
const apiOrigin = apiHost ? new URL(apiHost).origin : '';

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://avatars.githubusercontent.com",
  "font-src 'self' data:",
  `connect-src 'self' blob: data:${apiOrigin ? ` ${apiOrigin}` : ''}`,
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  ...(isProd ? ['upgrade-insecure-requests'] : []),
].join('; ');

// Report-only for now; switch the key to 'Content-Security-Policy' to enforce.
const securityHeaders = [
  { key: 'Content-Security-Policy-Report-Only', value: csp },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;

// Makes Cloudflare bindings available during `next dev`.
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
