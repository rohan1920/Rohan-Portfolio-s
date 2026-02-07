/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Disable ESLint during builds on Vercel to avoid dependency conflicts
    ignoreDuringBuilds: true,
  },
  // Better handling of on-demand entries in dev
  onDemandEntries: {
    maxInactiveAge: 60 * 1000, // Increased to 60s
    pagesBufferLength: 5, // Increased buffer
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Disable image optimization warnings in dev
    unoptimized: false,
  },
  // Reduce 404 errors in dev mode
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
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
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Keep chunks together to reduce 404s
            framework: {
              name: 'framework',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|next)[\\/]/,
              priority: 40,
              enforce: true,
            },
          },
        },
      }
    }
    
    return config
  },
}

module.exports = nextConfig
