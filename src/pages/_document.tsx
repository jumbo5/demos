import React from 'react'
import Document, {
  DocumentContext,
  DocumentProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
import { ServerStyleSheet as StyledServerStyleSheets } from 'styled-components'

interface Props extends DocumentProps {}

class AppDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext) {
    const styledSheets = new StyledServerStyleSheets()

    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            styledSheets.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <React.Fragment key="styles">
            {styledSheets.getStyleElement()}
            {initialProps.styles}
          </React.Fragment>
        ),
      }
    } finally {
      styledSheets.seal()
    }
  }

  render() {
    return (
      <Html lang="ru">
        <Head>
          {this.props.styles}
          <link rel="manifest" href="/favicon/manifest.json" />
          <link
            rel="icon"
            type="image/png"
            href="/favicon/favicon-32x32.png"
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href="/favicon/favicon-16x16.png"
            sizes="16x16"
          />

          <link rel="icon" href="/favicon/favicon.ico" />

          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />

          <link href="/styles/antd.min.css" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default AppDocument
