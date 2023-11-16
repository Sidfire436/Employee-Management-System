/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    distDir: "build",
    output: "export",
    trailingSlash: true,
    images: {
      unoptimized: true,
    },
  };
  
  module.exports = nextConfig;
  