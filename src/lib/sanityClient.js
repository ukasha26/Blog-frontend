// src/lib/sanityClient.js
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  // Ab hum direct ID likhne ki bajaye variable use karenge
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "g6ay8psk", 
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
  useCdn: true,
  apiVersion: "2023-05-03",
});

// Images handle karne ke liye builder
const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);