import React, { useMemo } from 'react'

import { DEFAULT_DELAY, DEFAULT_DURATION } from './constants'
import { AnimationChainProps } from './types'

type childrenDelay = { delay: number; duration: number }

export const AnimationChain: React.FC<AnimationChainProps> = ({
  children,
  delaysBetween = 0,
}) => {
  const delays = useMemo(() => {
    const childrenDelays: childrenDelay[] = React.Children.map(
      children as React.ReactElement[],
      (child: React.ReactElement, i) => ({
        duration: child.props.config?.duration || DEFAULT_DURATION,
        delay:
          (child.props.delay || DEFAULT_DELAY) +
          (Array.isArray(delaysBetween) ? delaysBetween[i] : delaysBetween),
      }),
    )

    return childrenDelays
      .reduce(
        (acc, item, index) => [
          ...acc,
          {
            duration: item.duration,
            delay:
              index > 0
                ? acc[index - 1].delay + acc[index - 1].duration + item.delay
                : item.delay,
          },
        ],
        [] as childrenDelay[],
      )
      .map((item) => item.delay)
  }, [children, delaysBetween])

  return (
    <>
      {React.Children.map(
        children as React.ReactElement[],
        (child: React.ReactElement, i) =>
          React.cloneElement(child, {
            ...child?.props,
            delay: delays[i],
          }),
      )}
    </>
  )
}
