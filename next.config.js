/** @type {import('next').NextConfig} */
const withVideos = require("next-videos");

module.exports = withVideos({
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "replicate.delivery",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
});
