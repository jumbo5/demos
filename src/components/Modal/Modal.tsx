import React from 'react'
import ReactDOM from 'react-dom'
import OutsideClick from 'react-outside-click-handler'
import styled, { css } from 'styled-components'

interface IProps {
  visible?: boolean
  onClose?(): void
}

export const Modal: React.FC<IProps> = ({
  visible = false,
  onClose = () => {},
  children,
}) => {
  if (typeof window !== 'undefined') {
    return ReactDOM.createPortal(
      <Wrapper visible={visible}>
        <OutsideClick onOutsideClick={onClose}>
          <Container>{children}</Container>
        </OutsideClick>
      </Wrapper>,
      document.body,
    )
  }

  return <></>
}

const Container = styled.div`
  padding: 24px;
  background-color: white;
  transition: transform 0.2s, opacity 0.2s;
`

const Wrapper = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  ${({ visible }) =>
    visible
      ? css`
          transform: translateY(0px);
          background-color: rgba(0, 0, 0, 0.5);
          transition: background-color 0.2s;

          ${Container} {
            transform: translateY(0);
            opacity: 1;
          }
        `
      : css`
          transform: translateY(100%);
          background-color: rgba(0, 0, 0, 0);
          transition: transform 0s 0.2s, background-color 0.2s;

          ${Container} {
            transform: translateY(100%);
            opacity: 0;
          }
        `}
`
