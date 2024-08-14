import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const siteConfig = (globalThis as any).siteConfig

  return (
    <Html lang="en">
      <link rel="icon" href="/favicon.ico" />
      <title>{siteConfig.name}</title>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
