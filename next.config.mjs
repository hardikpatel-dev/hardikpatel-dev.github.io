/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: {
    autoPrerender: false,
  },
  output: "export", // GitHub Pages ke liye static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
