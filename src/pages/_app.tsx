import React from 'react'
import { AppInitialProps, AppProps } from 'next/app'

import 'antd/dist/antd.css'

const Application = ({
  Component,
  router,
  pageProps = {},
}: AppProps & AppInitialProps) => <Component {...pageProps} router={router} />

export default Application
