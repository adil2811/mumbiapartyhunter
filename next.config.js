/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'adil-next-ecommerce.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
    ],
  },
  webpack: (config) => {
    // Modify webpack configuration to adjust module resolution fallback
    config.resolve.fallback = {
      "mongodb-client-encryption": false,
      "aws4": false
    };

    // Return the updated configuration
    return config;
  },
};

module.exports = nextConfig;
