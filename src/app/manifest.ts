import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Samyak Deshar | Data Scientist & Machine Learning Engineer",
    short_name: "Samyak Deshar",
    description:
      "Premium portfolio of Samyak Deshar — Data Scientist, ML Engineer & Data Analyst.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
