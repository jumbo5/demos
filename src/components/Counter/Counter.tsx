import React, { useState } from 'react'
import { useAnimationFrame } from '@hooks'
import styled from 'styled-components'

export const Counter = () => {
  const [count, setCount] = useState(0)

  useAnimationFrame((deltaTime) => {
    // setCount((count) => (count > 100 ? 0 : count + 1))
  })

  return (
    <Container>
      <h1>{Math.round(count)}</h1>
    </Container>
  )
}

const Container = styled.div``
