import { Empty } from 'antd'
import styled from 'styled-components'

export const NotFoundPage = () => (
  <Container>
    <Empty
      imageStyle={{
        height: 120,
      }}
      description={<span>Page not found</span>}
    />
  </Container>
)

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
