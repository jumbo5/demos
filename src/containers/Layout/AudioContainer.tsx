import React from 'react'
import { Audio } from '@components'
import { useAction, useAtom } from '@reatom/react'
import {
  changeTrack,
  queueAtom,
  removeFromQueue,
  trackAtom,
} from '@store/player'
import styled from 'styled-components'

const AudioContainer = () => {
  const track = useAtom(trackAtom)
  const queue = useAtom(queueAtom)

  const handleChangeTrack = useAction(changeTrack)
  const handleRemoveFromQueue = useAction(removeFromQueue)

  return (
    <Container>
      {track?.src && (
        <Audio
          config={{
            src: track.src,
          }}
          time={track.time}
          onTimeChange={(time) => handleChangeTrack({ time })}
          volume={track.volume}
          onVolumeChange={(volume) => handleChangeTrack({ volume })}
          paused={track.paused}
          onPausedChange={(paused) => handleChangeTrack({ paused })}
          muted={track.muted}
          onMutedChange={(muted) => handleChangeTrack({ muted })}
          onEnded={(target) => {
            handleRemoveFromQueue({ src: target.src })
            if (queue) {
              handleChangeTrack({ src: queue[0].src })
            }
          }}
          onNext={
            queue && queue.length >= 2
              ? () => {
                  handleRemoveFromQueue({ src: queue[0].src })
                  handleChangeTrack({ src: queue[1].src })
                }
              : undefined
          }
        />
      )}
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
