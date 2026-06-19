// Canonical site origin. Configured via NEXT_PUBLIC_SITE_URL (see .env.example).
// Falls back to localhost for local development.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const API_HOST = process.env.NEXT_PUBLIC_API_HOST || '';
