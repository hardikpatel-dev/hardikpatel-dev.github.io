/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: {
    autoPrerender: false,
  },
  output: "export",
  basePath: "", // Root ke liye empty
  assetPrefix: "", // Root ke liye empty
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
