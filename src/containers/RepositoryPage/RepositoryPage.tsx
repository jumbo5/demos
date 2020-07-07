import React from 'react'
import styled from 'styled-components'

import { IRepository } from './types'

interface IProps {
  respository: IRepository
}

export const RepositoryPage: React.FC<IProps> = ({ respository: { name } }) => (
  <Container>
    <Title>{name}</Title>

    <Description>В падлу...</Description>
  </Container>
)

const Container = styled.div`
  display: block;
  justify-content: center;
  text-align: center;
`

const Title = styled.div`
  font-weight: bold;
  font-size: 32px;
`

const Description = styled.div`
  font-size: 24px;
`
