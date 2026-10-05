import { isIP } from 'net';

export function trustedClientAddress(headers: Headers, platform: { VERCEL?: string; NETLIFY?: string } = { VERCEL: process.env.VERCEL, NETLIFY: process.env.NETLIFY }): string {
  // Only trust headers set by the platform on which this server is running.
  const value = platform.VERCEL === '1'
    ? headers.get('x-vercel-forwarded-for')
    : platform.NETLIFY === 'true' ? headers.get('x-nf-client-connection-ip') : null;
  const address = value?.split(',')[0].trim();
  return address && isIP(address) ? address : 'unknown';
}
