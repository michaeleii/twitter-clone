/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.gravatar.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "twitter-clone-local-michael.s3.us-west-2.amazonaws.com",
      },
    ],
  },
};

module.exports = nextConfig;
