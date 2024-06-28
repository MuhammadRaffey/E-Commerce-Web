import { createClient } from "next-sanity";

export const client = createClient({
  apiVersion: "2024-06-24",
  dataset: "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  token: process.env.SANITY_ACCESS_TOKEN,
  useCdn: true,
});
