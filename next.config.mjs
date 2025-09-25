/** @type {import('next').NextConfig} */
const isExport = process.env.EXPORT === "true";

const nextConfig = {
  reactStrictMode: true,
  images: isExport
    ? { unoptimized: true }
    : {
        formats: ["image/webp"],
        remotePatterns: [
          
          {
            protocol: "https",
            hostname: "https://itshardik.vercel.app",
            pathname: "/**",
          },
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
