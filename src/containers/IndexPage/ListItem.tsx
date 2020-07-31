import React, { memo } from 'react'
import styled, { css } from 'styled-components'

interface IProps {
  active: boolean
  time: number
  duration: number
  onClick(): void
}

export const ListItem: React.FC<IProps> = memo(
  ({ children, active, ...rest }) => {
    return (
      <Container active={active ? 1 : 0} {...rest}>
        {children}
      </Container>
    )
  },
)

const Container = styled.li<{ active: number; time: number; duration: number }>`
  position: relative;
  background-color: ${({ active }) => (active ? '#1890ff' : 'white')};
  color: ${({ active }) => (active ? 'white' : 'inherit')};
  list-style-type: none;
  padding: 16px;
  cursor: pointer;

  ${({ active, time, duration }) =>
    active &&
    css`
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: ${`${(100 / duration) * time}%`};
        max-width: 100%;
        height: 3px;
        background-color: rgba(255, 255, 255, 0.65);
        transition: width 1s linear;
      }
    `}
`
