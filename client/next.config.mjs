/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    middlewarePrefetch: "strict", // Usa "strict" o "flexible"
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
