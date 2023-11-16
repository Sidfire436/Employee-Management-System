/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: 'export',

    // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
    // trailingSlash: true,

    // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
    // skipTrailingSlashRedirect: true,

    // Optional: Change the output directory `out` -> `dist`
    // distDir: 'dist',
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