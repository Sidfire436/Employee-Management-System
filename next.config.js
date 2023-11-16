/** @type {import('next').NextConfig} */
const nextConfig = {
    exportPathMap: async function () {
        return {
            '/': { page: '/' },
            // Add other routes as needed
        };
    },
}

module.exports = nextConfig
