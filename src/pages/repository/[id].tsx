import React from 'react'
import { NextPage } from 'next'

import { IRepository, NotFoundPage, RepositoryPage } from '@app/containers/'

interface IProps {
  response: IRepository
}

const Repository: NextPage<IProps> = ({ response }) => {
  if (response.id) {
    return <RepositoryPage respository={response} />
  }

  return <NotFoundPage />
}

Repository.getInitialProps = async ({ query }) => {
  const response = await fetch(
    `https://api.github.com/repositories/${query.id}`,
  ).then((res) => res.json())

  return { response }
}

export default Repository
