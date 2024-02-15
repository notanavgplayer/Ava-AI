/** @type {import('next').NextConfig} */
const withVideos = require("next-videos");

module.exports = withVideos();
const nextConfig = {
    images: {
      domains: [
        "googleusercontent.com",
        "oaidalleapiprodscus.blob.core.windows.net",
        "cdn.openai.com",
        "replicate.delivery",
        "utfs.io"
      ]

    },
  }
  
module.exports = nextConfig

module.exports = withVideos();
  