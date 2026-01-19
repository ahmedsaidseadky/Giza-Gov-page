/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',

  basePath: isProd ? '/Giza-Gov-page' : '',
  assetPrefix: isProd ? '/Giza-Gov-page/' : '',

  images: {
    unoptimized: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
