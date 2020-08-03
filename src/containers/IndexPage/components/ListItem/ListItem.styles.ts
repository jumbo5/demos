import styled, { css } from 'styled-components'

export const Container = styled.li<{
  active: number // as boolean
  disabled: number // as boolean
  time: number
  duration: number
}>`
  display: grid;
  grid-template-columns: minmax(0, 1fr) min-content;
  gap: 0 12px;

  justify-content: space-between;
  position: relative;
  background-color: white;
  color: inherit;
  list-style-type: none;
  padding: 16px;
  cursor: pointer;

  & + & {
    box-shadow: 0px -1px 0px 0px rgba(0, 0, 0, 0.1);
  }

  ${({ disabled }) =>
    Boolean(disabled) &&
    css`
      background-color: rgba(255, 255, 255, 0.35);
      color: #80808073;
      cursor: inherit;
    `}

  ${({ active, time, duration }) =>
    Boolean(active) &&
    css`
      color: white;
      background-color: #1890ff;

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

export const ArtistName = styled.span`
  font-weight: bold;
  font-size: 14px;
  white-space: nowrap;
`

export const TrackName = styled.span`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const TrackGeneralInfo = styled.div`
  display: flex;
`
