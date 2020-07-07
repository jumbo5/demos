import React from 'react'
import { Card as AntCard } from 'antd'
import { format } from 'date-fns'
import Link from 'next/link'

import { CardContent } from './Card.styles'
import { IResponseItem } from '../types'

export const Card: React.FC<IResponseItem> = ({
  id,
  name,
  stargazers_count,
  updated_at,
  html_url,
}) => (
  <AntCard
    title={
      <Link href={`/repository/${id}`} as={`/repository/${id}`}>
        <a>{name}</a>
      </Link>
    }
  >
    <CardContent>
      <b>{`${stargazers_count} stars`}</b>
      <div>{`Updated at: ${format(new Date(updated_at), 'd MMM yyyy')}`}</div>
      <a href={html_url} target="_blank">
        Repository link
      </a>
    </CardContent>
  </AntCard>
)
