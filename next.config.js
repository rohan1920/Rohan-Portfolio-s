/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Better handling of on-demand entries in dev
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  webpack: (config, { isServer, dev }) => {
    // Fix for webpack cache issues
    if (!isServer) {
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
      }
    }
    
    // Better handling of static chunks in dev to reduce 404s
    if (dev) {
      config.optimization = {
        ...config.optimization,
        removeAvailableModules: false,
        removeEmptyChunks: false,
      }
    }
    
    return config
  },
}

module.exports = nextConfig
