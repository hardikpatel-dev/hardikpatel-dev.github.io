/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: {
    autoPrerender: false,
  },
  images: {
    domains: ["picsum.photos"],
  },
};

export default nextConfig;
