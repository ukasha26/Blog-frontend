// src/lib/sanityClient.js
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "g6ay8psk", // Aapki Project ID
  dataset: "production",
  useCdn: true,
  apiVersion: "2024-03-11", // Latest stable version
});

// Images handle karne ke liye builder
const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);