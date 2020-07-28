import React, { useEffect, useMemo, useRef, useState } from 'react'
import Icon, {
  PauseCircleOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons'
import { VolumeOffIcon, VolumeOnIcon } from '@icons'
import { Button, Slider } from 'antd'
import styled from 'styled-components'

import { defaultTime, defaultVolume } from './constants'
import { IProps, SliderValue } from './types'
import { formatTime } from './utils'

export const Audio: React.FC<IProps> = ({
  config,
  volume,
  time,
  onTimeChange,
  onVolumeChange,
}) => {
  const ref = useRef<HTMLAudioElement>(null)
  const [paused, setPaused] = useState(true)
  const [muted, setMuted] = useState(false)
  const [duration, setDuration] = useState(0)

  const [localTime, setLocalTime] = useState(defaultTime)
  const [localVolume, setLocalVolume] = useState(defaultVolume)

  const currentVolume = useMemo(() => volume || localVolume, [
    volume,
    localVolume,
  ])
  const currentTime = useMemo(() => time || localTime, [time, localTime])

  useEffect(() => {
    if (ref.current) {
      if (ref.current.volume !== currentVolume) {
        ref.current.volume = currentVolume
      }

      if (ref.current.currentTime !== currentTime) {
        ref.current.currentTime = currentTime
      }
    }
  }, [currentVolume, currentTime])

  const handleVolumeChange = (val: SliderValue) => {
    if (ref.current) {
      ref.current.volume = typeof val === 'number' ? val / 100 : 0
    }

    const newVolume = ref.current ? ref.current.volume : 0

    onVolumeChange ? onVolumeChange(newVolume) : setLocalVolume(newVolume)
  }

  const handleCurrentTimeChange = (val: SliderValue) => {
    if (ref.current) {
      ref.current.currentTime = typeof val === 'number' ? val : 0
    }
  }

  const handleTimeChange = (target: HTMLAudioElement) => {
    if (Math.trunc(currentTime) !== Math.trunc(target.currentTime)) {
      onTimeChange
        ? onTimeChange(target.currentTime)
        : setLocalTime(target.currentTime)
    }
  }

  const handlePlay = () => {
    if (ref.current) {
      ref.current.paused ? ref.current.play() : ref.current.pause()
    }

    setPaused(Boolean(ref.current && ref.current.paused))
  }

  const handleMuted = () => {
    if (ref.current) {
      setMuted(!ref.current.muted)
      ref.current.muted = !ref.current.muted
    }
  }

  return (
    <Container>
      <audio
        {...config}
        controls={false}
        autoPlay={false}
        ref={ref}
        preload="metadata"
        onLoadedMetadata={() => setDuration(ref.current?.duration || 0)}
        onTimeUpdate={(e) => handleTimeChange(e.target as HTMLAudioElement)}
      />

      <Button
        type="ghost"
        shape="circle"
        icon={paused ? <PlayCircleOutlined /> : <PauseCircleOutlined />}
        onClick={handlePlay}
      />

      <PlayerLine>
        <span>{formatTime(currentTime)}</span>

        <Slider
          min={0}
          max={ref.current ? Math.trunc(ref.current.duration) : 0}
          value={currentTime}
          tipFormatter={formatTime}
          onChange={handleCurrentTimeChange}
        />

        <span>{formatTime(duration)}</span>
      </PlayerLine>

      <SoundLine>
        <Button
          type="text"
          shape="circle"
          icon={
            muted ? (
              <Icon component={VolumeOffIcon as any} />
            ) : (
              <Icon component={VolumeOnIcon as any} />
            )
          }
          onClick={handleMuted}
        />

        <Slider
          min={0}
          max={100}
          value={currentVolume * 100}
          onChange={handleVolumeChange}
        />
      </SoundLine>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: min-content 1fr 100px;
  gap: 0 16px;
  background-color: rgba(0, 0, 0, 0.01);
  padding: 8px 12px;
`

const PlayerLine = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  align-items: center;
  gap: 0 8px;
`

const SoundLine = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  align-items: center;
  gap: 0 8px;
`
