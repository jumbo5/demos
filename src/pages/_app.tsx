import React from 'react'
import { createStore } from '@reatom/core'
import { context } from '@reatom/react'
import { AppInitialProps, AppProps } from 'next/app'

import { Layout } from '@app/containers'

import 'antd/dist/antd.css'

const Application = ({
  Component,
  router,
  pageProps = {},
}: AppProps & AppInitialProps) => {
  const store = createStore()

  return (
    <context.Provider value={store}>
      <Layout>
        <Component {...pageProps} router={router} />
      </Layout>
    </context.Provider>
  )
}

export default Application
