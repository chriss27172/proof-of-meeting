const webpack = require('webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Use IgnorePlugin to completely exclude .md and LICENSE files from node_modules
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /\.md$/,
        contextRegExp: /node_modules/,
      })
    );
    
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /LICENSE$/,
        contextRegExp: /node_modules/,
      })
    );

    // Fallback: treat as empty module
    config.module.rules.push({
      test: /\.md$|LICENSE$/,
      include: /node_modules/,
      type: 'asset/source',
    });

    return config;
  },
  // Exclude problematic packages from being processed
  experimental: {
    serverComponentsExternalPackages: ['@libsql/client', '@prisma/adapter-libsql'],
  },
};

module.exports = nextConfig;

