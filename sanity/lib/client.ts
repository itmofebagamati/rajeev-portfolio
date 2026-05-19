import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const client = (projectId && /^[a-z0-9-]+$/.test(projectId))
  ? createClient({ projectId, dataset, apiVersion: "2024-01-01", useCdn: true })
  : null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  if (!client || !source) {
    // Return a mock that matches the real builder's chained API
    const mock = {
      url: () => "",
      width: () => mock,
      height: () => mock,
      fit: () => mock,
      auto: () => mock,
      format: () => mock,
      quality: () => mock,
    };
    return mock;
  }
  return createImageUrlBuilder(client).image(source);
}