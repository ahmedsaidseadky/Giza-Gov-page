/** @type {import('next').NextConfig} */
const nextConfig = {
  // مهم جدا عشان GitHub Pages
  output: 'export',

  // اسم الريبو على GitHub
  basePath: '/Giza-Gov-page',
  assetPrefix: '/Giza-Gov-page/',

  // صور Next
  images: {
    unoptimized: true,
  },

  // اختياري (انت حاطه بالفعل)
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
