import React from 'react'
import { Audio } from '@components'
import { useAction, useAtom } from '@reatom/react'
import { changeTrack, trackAtom } from '@store'
import styled from 'styled-components'

const AudioContainer = () => {
  const track = useAtom(trackAtom)
  const handleChangeTrack = useAction(changeTrack)

  return (
    <Container>
      <Audio
        config={{
          src: track?.src || '',
        }}
        time={track?.time}
        onTimeChange={(time) => handleChangeTrack({ time })}
        volume={track?.volume}
        onVolumeChange={(volume) => handleChangeTrack({ volume })}
        paused={track?.paused}
        onPausedChange={(paused) => handleChangeTrack({ paused })}
        muted={track?.muted}
        onMutedChange={(muted) => handleChangeTrack({ muted })}
      />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 9;
`

export default AudioContainer
