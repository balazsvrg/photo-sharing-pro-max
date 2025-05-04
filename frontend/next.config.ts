import type { NextConfig } from "next";

const withImages = require('next-images');
module.exports = withImages({
  images: {
    domains: ['localhost', 'photo-sharing-pro-max-backend'],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "photo-sharing-pro-max-backend-balazsvrg-dev.apps.rm2.thpm.p1.openshiftapps.com",
    ],
  },
};

export default nextConfig;

