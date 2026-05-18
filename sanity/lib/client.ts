import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// Only create client if a valid project ID exists
export const client = (projectId && /^[a-z0-9-]+$/.test(projectId))
  ? createClient({ projectId, dataset, apiVersion: "2024-01-01", useCdn: true })
  : null;

// Build image URLs only when client exists
const builder = client ? imageUrlBuilder(client) : null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  if (!builder || !source) {
    return { url: () => "", width: () => ({ height: () => ({ url: () => "" }) }) };
  }
  return builder.image(source);
}