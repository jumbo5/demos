import React, { memo } from 'react'

import {
  ArtistName,
  Container,
  TrackGeneralInfo,
  TrackName,
} from './ListItem.styles'

interface IProps {
  active?: boolean
  disabled?: boolean
  time: number
  duration: number
  onClick(): void
  artistName: string
  trackName: string
}

const getDuration = (duration: number) =>
  `${Math.trunc(duration / 60)}:${duration - Math.trunc(duration / 60) * 60}`

export const ListItem: React.FC<IProps> = memo(
  ({
    children,
    active,
    artistName,
    trackName,
    duration,
    disabled,
    ...rest
  }) => (
    <Container
      active={active ? 1 : 0}
      disabled={disabled ? 1 : 0}
      duration={duration}
      {...rest}
    >
      <TrackGeneralInfo>
        <ArtistName>{artistName}</ArtistName>
        &nbsp;
        {'-'}
        &nbsp;
        <TrackName>{trackName}</TrackName>
      </TrackGeneralInfo>

      <span>{getDuration(duration)}</span>
    </Container>
  ),
)
