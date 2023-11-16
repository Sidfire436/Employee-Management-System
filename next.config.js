/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        images: false, // or configure as needed
    },

    // Use generateStaticParams() instead of exportPathMap
    generateStaticParams: async () => {
        return {
            '/': { page: '/' },
            // Add other routes as needed
        };
    },
}

module.exports = nextConfig
