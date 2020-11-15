import { SpringConfig } from 'react-spring'

export type animationTypes =
  | 'fade-in-bottom'
  | 'fade-in-left'
  | 'fade-in-right'
  | 'fade-in-top'

export interface AnimationProps {
  className?: string
  type?: animationTypes
  config?: SpringConfig
  delay?: number
  customAnimation?: object
}

export interface AnimationChainProps {
  delaysBetween?: number | number[]
}
