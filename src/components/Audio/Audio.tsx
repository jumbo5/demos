import React, { useEffect, useMemo, useRef, useState } from 'react'
import Icon, {
  FastBackwardOutlined,
  FastForwardOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons'
import { VolumeOffIcon, VolumeOnIcon } from '@icons'
import { Button, Slider } from 'antd'
import styled from 'styled-components'

import {
  defaultMuted,
  defaultPaused,
  defaultTime,
  defaultVolume,
} from './constants'
import { IProps, SliderValue } from './types'
import { formatTime } from './utils'

export const Audio: React.FC<IProps> = ({
  config,
  volume,
  time,
  paused,
  muted,
  onTimeChange,
  onVolumeChange,
  onPausedChange,
  onMutedChange,
  onEnded = () => {},
  onNext,
  onPrev,
}) => {
  const ref = useRef<HTMLAudioElement>(null)
  const [duration, setDuration] = useState(0)

  const [localMuted, setLocalMuted] = useState(defaultMuted)
  const [localPaused, setLocalPaused] = useState(defaultPaused)
  const [localTime, setLocalTime] = useState(defaultTime)
  const [localVolume, setLocalVolume] = useState(defaultVolume)

  const currentTime = useMemo(() => time || localTime, [time, localTime])
  const currentVolume = useMemo(() => volume || localVolume, [
    volume,
    localVolume,
  ])
  const currentPaused = useMemo(
    () => (typeof paused !== 'undefined' ? paused : localPaused),
    [paused, localPaused],
  )
  const currentMuted = useMemo(
    () => (typeof muted !== 'undefined' ? muted : localMuted),
    [muted, localMuted],
  )

  useEffect(() => {
    if (ref.current) {
      if (ref.current.volume !== currentVolume) {
        ref.current.volume = currentVolume
      }

      if (ref.current.currentTime !== currentTime) {
        ref.current.currentTime = currentTime
      }

      if (ref.current.muted !== currentMuted) {
        ref.current.muted = currentMuted
      }

      if (ref.current.paused !== currentPaused) {
        currentPaused ? ref.current.pause() : ref.current.play()
      }
    }
  }, [currentVolume, currentTime, currentPaused, currentMuted])

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
    if (Math.trunc(currentTime) >= Math.trunc(duration)) {
      onEnded(target)
    }

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

    const newPaused = Boolean(ref.current && ref.current.paused)

    onPausedChange ? onPausedChange(newPaused) : setLocalPaused(newPaused)
  }

  const handleMuted = () => {
    if (ref.current) {
      onMutedChange
        ? onMutedChange(!ref.current.muted)
        : setLocalMuted(!ref.current.muted)

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

      <PlayerControllers>
        <Button
          type="ghost"
          shape="circle"
          icon={<FastBackwardOutlined />}
          onClick={onPrev}
          disabled={!onPrev}
        />

        <Button
          type="ghost"
          shape="circle"
          icon={
            currentPaused ? <PlayCircleOutlined /> : <PauseCircleOutlined />
          }
          onClick={handlePlay}
        />

        <Button
          type="ghost"
          shape="circle"
          icon={<FastForwardOutlined />}
          onClick={onNext}
          disabled={!onNext}
        />
      </PlayerControllers>

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
            currentMuted ? (
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
  background-color: #ebeff2;
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
`

const PlayerControllers = styled.div`
  display: grid;
  grid-template-columns: min-content min-content min-content;
  gap: 0 8px;
`
