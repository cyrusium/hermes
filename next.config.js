/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  crossOrigin: "anonymous",
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: "bottom-left",
  },
  optimizeFonts: true,
  swcMinify: true,
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  experimental: {
    gzipSize: true,
    optimizeCss: true,
    swcMinify: true,
    // deploymentId: "v1",
  },
};

module.exports = nextConfig;
