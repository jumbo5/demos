import React from 'react'
import { animated, useSpring } from 'react-spring'

import { animations } from './configs'
import { DEFAULT_DELAY, DEFAULT_DURATION } from './constants'
import { AnimationProps } from './types'

export const Animation: React.FC<AnimationProps> = ({
  children,
  className,
  type = 'fade-in-bottom',
  config,
  delay = DEFAULT_DELAY,
  customAnimation,
}) => {
  const springProps = useSpring({
    delay,
    config: {
      duration: DEFAULT_DURATION,
      ...config,
    },
    ...(customAnimation || animations[type]),
  })

  return (
    <animated.div style={springProps} className={className}>
      {children}
    </animated.div>
  )
}
