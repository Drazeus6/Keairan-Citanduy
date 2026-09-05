/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [360, 480, 640, 768, 1024, 1200, 1400, 1600, 1920],
    imageSizes: [64, 96, 128, 160, 240, 320, 480, 640],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
};

export default nextConfig;
