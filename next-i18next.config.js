const i18nextHttpBackend = require("i18next-http-backend/cjs");

module.exports = {
  i18n: {
    defaultLocale: "default",
    locales: ["default", "gb", "fr", "us", "es", "de", "it"],
  },
  use: [i18nextHttpBackend],
  reloadOnPrerender: process.env.NODE_ENV === "development",
  debug: true,
  fallbackLng: "us",
  serializeConfig: false,
};
