import React from 'react'
import { Button } from 'antd'
import { NextSeo } from 'next-seo'
import styled from 'styled-components'

function* exampleGenerator() {
  // const result = yield
  // yield result

  yield
}

export const GeneratorsPage = () => {
  const generator = React.useRef(exampleGenerator())

  return (
    <>
      <NextSeo title="Generators" description="GeneratorsDemo" />

      <Container>
        <Button onClick={() => console.log(generator.current?.next(9))}>
          NEXT
        </Button>
        <Button onClick={() => console.log([...generator.current])}>
          ITERATE
        </Button>
      </Container>
    </>
  )
}

const Container = styled.div``
