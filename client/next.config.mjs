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
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Redirige todas las solicitudes a /api/
        destination: "http://api.escaledevs.com/api/:path*", // Redirige a tu backend HTTP
      },
    ];
  },
};

export default nextConfig;
