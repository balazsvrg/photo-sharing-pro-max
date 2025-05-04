import type { NextConfig } from "next";

const withImages = require('next-images');
module.exports = withImages({
  images: {
    domains: ['localhost', 'photo-sharing-pro-max-backend'],
  },
});

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
