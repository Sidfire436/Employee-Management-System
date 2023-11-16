/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        images: false, // or configure as needed
    },

    // Use generateBuildId instead of generateStaticParams
    generateBuildId: async () => {
        // Return a unique id for caching purposes
        return 'my-build-id';
    },

    // Optional: Define the output directory for the exported files
    distDir: 'out',
}

module.exports = nextConfig;
