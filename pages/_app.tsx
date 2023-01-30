import "../styles/globals.css";
import type { AppProps } from "next/app";
import { withTranslateRoutes } from "next-translate-routes";
import { appWithTranslation } from "next-i18next";
import nextI18NextConfig from "../next-i18next.config";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default withTranslateRoutes(
  appWithTranslation(MyApp, nextI18NextConfig)
);
