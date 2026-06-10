import { defineCloudflareConfig } from '@opennextjs/cloudflare';

export default defineCloudflareConfig({
  // Default config is enough for a stateless app. Incremental cache / queue /
  // tag cache (R2, KV, D1, Durable Objects) can be wired in here later if we
  // start using ISR or on-demand revalidation.
});
