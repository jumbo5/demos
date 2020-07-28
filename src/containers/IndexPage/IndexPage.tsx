import React from 'react'
import { useAction, useAtom } from '@reatom/react'
import { changeTrack, trackAtom } from '@store'
import { Button } from 'antd'
import { NextSeo } from 'next-seo'

export const IndexPage = () => {
  const track = useAtom(trackAtom)
  const handleChangeTrack = useAction(changeTrack)

  return (
    <>
      <NextSeo title="Demos" description="Demos" />
      <Button
        onClick={() =>
          handleChangeTrack({
            src:
              'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
            paused: !track?.paused,
          })
        }
      >
        {typeof track?.paused !== 'undefined' && !track?.paused
          ? 'Stop track'
          : 'Play track'}
      </Button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Button
        onClick={() =>
          handleChangeTrack({
            muted: !track?.muted,
          })
        }
      >
        {track?.muted ? 'Unmute' : 'Mute'}
      </Button>
    </>
  )
}
