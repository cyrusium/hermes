/** @type {import('next').NextConfig} */
const nextConfig = {
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
    appDir: true,
    gzipSize: true,
    optimizeCss: true,
    swcMinify: true,
    deploymentId: "v1",
  },
};

if (process.argv.includes("--turbo")) {
  console.warn("Turbo mode enabled, disabling incompatible options");
  delete nextConfig?.crossOrigin;
  delete nextConfig?.skipTrailingSlashRedirect;
  delete nextConfig?.experimental?.optimizeCss;
  delete nextConfig?.experimental?.swcMinify;
  delete nextConfig?.experimental?.deploymentId;
}

module.exports = nextConfig;
