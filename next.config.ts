import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    dirs: ['app'],
  },
  webpack: (config) => {
    // Change rootPath for @actual-app/api to find resources
    config.module.rules.push({
      test: /@actual-app.*\.js$/,
      loader: 'string-replace-loader',
      options: {
        search: 'let rootPath = .*?;',
        replace: `let rootPath = "${path.resolve('.next/@actual-app').replaceAll('\\', '\\\\')}"`,
        flags: 'g',
      },
    });
    // Copy @actual-app/api resources
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: 'node_modules/@actual-app/api/dist/migrations',
            to: '@actual-app/migrations',
          },
          {
            from: 'node_modules/@actual-app/api/dist/default-db.sqlite',
            to: '@actual-app/default-db.sqlite',
          },
        ],
      })
    );
    return config;
  },
};

export default nextConfig;
