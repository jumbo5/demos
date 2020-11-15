import React from 'react'
import { animated, useSpring } from 'react-spring'

import { animations, DEFAULT_DELAY, DEFAULT_DURATION } from './configs'
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
