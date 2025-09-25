/** @type {import('next').NextConfig} */
const isExport = process.env.EXPORT === "true";

const nextConfig = {
  reactStrictMode: true,
  images: isExport
    ? { unoptimized: true }
    : {
        formats: ["image/avif", "image/webp"],
        remotePatterns: [
          {
            protocol: "https",
            hostname: "images.unsplash.com",
            pathname: "/**",
          },
          { protocol: "https", hostname: "cdn.yoursite.com", pathname: "/**" },
        ],
      },
  ...(isExport
    ? {
        output: "export",
        basePath: "",
        assetPrefix: "",
      }
    : {}),
  // Add experimental configuration for server components
  experimental: {
    serverComponentsExternalPackages: [
      "@react-email/components",
      "react-email",
      "resend",
    ],
  },
};

export default nextConfig;
