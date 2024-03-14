import { useEffect } from "react";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import { TITLE, META_DESCRIPTION, META_IMAGE, URL } from "../config";
import { Router } from "next/router";
import * as gtag from "helpers/gtag";
import RootProviders from "providers/rootProviders";
import "styles/globals.css";

const App = ({ Component, pageProps }) => {
  // Track pages with google analytics
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    Router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);
  // End of track pages with google analytics

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <DefaultSeo
        title={TITLE}
        description={META_DESCRIPTION}
        openGraph={{ url: URL, images: [{ url: META_IMAGE }] }}
        twitter={{ cardType: "summary_large_image" }}
      />
      <RootProviders>
        <Component {...pageProps} />
      </RootProviders>
    </>
  );
};

export default App;
