/** @type {import('next').NextConfig} */
const isExport = process.env.EXPORT === "true";

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: isExport
    ? { unoptimized: true }
    : {
        formats: ["image/avif", "image/webp"],
        remotePatterns: [
          {
            protocol: "https",
            hostname: "itshardik.vercel.app", // Correct hostname
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
  serverExternalPackages: ["@react-email/components", "react-email", "resend"],
};

export default nextConfig;
