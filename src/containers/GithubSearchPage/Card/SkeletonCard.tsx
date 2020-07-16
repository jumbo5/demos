import React from 'react'
import { Card as AntCard, Skeleton } from 'antd'
import styled from 'styled-components'

import { CardContent } from './Card.styles'

export const SkeletonCard = () => (
  <AntCard title={<StyledSkeleton active paragraph={{ rows: 0 }} />}>
    <CardContent>
      <StyledSkeleton active paragraph={{ rows: 2 }} />
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
