import React from 'react'

import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript
} from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })
      const initialProps = await Document.getInitialProps(ctx)

      return {
        ...initialProps,
        styles: [
          <React.Fragment key="styles">
            {initialProps.styles}
            {sheet.getStyleElement()}
          </React.Fragment>
        ]
      }
    } finally {
      sheet.seal()
    }
  }

  render(): JSX.Element {
    return (
      <Html lang="pt-br">
        <Head>
          {/* <link rel="manifest" href="/site.webmanifest" /> */}
          <link
            rel="apple-touch-icon"
            href="/apple-touch-icon.png"
            key="apple"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
            key="icon32"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
            key="icon16"
          />
          <link
            rel="icon"
            href="/favicon.ico"
            key="favicon"
            type="image/x-icon"
          />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="icon" type="image/png" href="/favicon.png" />
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
