/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.pudgypenguins.io",
        port: "",
        pathname: "/lil/image/**",
      },
    ],
  },
};

module.exports = nextConfig;
