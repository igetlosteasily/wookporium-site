import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import doQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";

// Time-based ISR:
//   - r2IncrementalCache: regenerated pages are stored in the R2 bucket
//     (NEXT_INC_CACHE_R2_BUCKET binding in wrangler.jsonc).
//   - doQueue: the Durable Object queue that runs background revalidations
//     (NEXT_CACHE_DO_QUEUE binding). Required for `export const revalidate`.
// On-demand revalidation (revalidateTag/revalidatePath) is intentionally NOT
// configured yet — that needs a D1 tag cache and can be added later.
export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
  queue: doQueue,
});
