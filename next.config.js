/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "api.dicebear.com",
      },
    ],
    dangerouslyAllowSVG: true,
  },
};

module.exports = nextConfig;
