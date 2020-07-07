import React from 'react'
import { AppInitialProps, AppProps } from 'next/app'

import { Layout } from '@app/containers'

import 'antd/dist/antd.css'

const Application = ({
  Component,
  router,
  pageProps = {},
}: AppProps & AppInitialProps) => (
  <Layout>
    <Component {...pageProps} router={router} />
  </Layout>
)

export default Application
