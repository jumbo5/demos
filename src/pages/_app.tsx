import React from 'react'
import { context } from '@reatom/react'
import { store } from '@store/store'
import { AppInitialProps, AppProps } from 'next/app'

import { Layout } from '@app/containers'

import 'antd/dist/antd.css'

const Application = ({
  Component,
  router,
  pageProps = {},
}: AppProps & AppInitialProps) => {
  return (
    <context.Provider value={store}>
      <Layout>
        <Component {...pageProps} router={router} />
      </Layout>
    </context.Provider>
  )
}

export default Application
