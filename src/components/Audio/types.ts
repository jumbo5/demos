export interface HTMLMediaProps
  extends React.AudioHTMLAttributes<any>,
    React.VideoHTMLAttributes<any> {
  src: string
}

export interface IProps {
  config: HTMLMediaProps
  volume?: number // 0-1
  time?: number
  onVolumeChange?: (volume: number) => void
  onTimeChange?: (time: number) => void
}

export type SliderValue = number | [number, number] | undefined
