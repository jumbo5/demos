import React from 'react'
import { Card as AntCard, Skeleton } from 'antd'
import { format } from 'date-fns'
import styled from 'styled-components'

import { CardContent } from './Card.styles'
import { IResponseItem } from '../types'

export const Card: React.FC<IResponseItem> = ({
  name,
  stargazers_count,
  updated_at,
  html_url,
}) => (
  <AntCard title={<a href="#">{name}</a>}>
    <CardContent>
      <b>{`${stargazers_count} stars`}</b>
      <div>{`Updated at: ${format(new Date(updated_at), 'd MMM yyyy')}`}</div>
      <a href={html_url} target="_blank">
        Repository link
      </a>
    </CardContent>
  </AntCard>
)

const StyledSkeleton = styled(Skeleton)`
  .ant-skeleton-title {
    margin: 0;
  }

  .ant-skeleton-title + .ant-skeleton-paragraph {
    margin-top: 0;
    margin-bottom: 0;

    li:first-child {
      margin-top: 16px;
    }
  }
`
