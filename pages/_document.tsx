import { Html, Head, Main, NextScript } from "next/document";
import { ICON } from "../config";

const Document = () => (
  <Html lang="en">
    <Head>
      <link rel="icon" href={ICON} />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
