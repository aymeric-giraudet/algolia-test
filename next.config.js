/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");
const withTranslateRoutes = require("next-translate-routes/plugin");

const nextConfig = {
  swcMinify: true,
  reactStrictMode: false,
  i18n,
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = withTranslateRoutes(nextConfig);
