const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',

  // مهم جدًا للـ GitHub Pages
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
