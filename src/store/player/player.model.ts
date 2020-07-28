import { declareAction, declareAtom } from '@reatom/core'
import Cookie from 'js-cookie'

import { ITrack } from './types'

const getInitialTrack = (): ITrack | null => {
  if (typeof window !== 'undefined') {
    const parsedTrack = Cookie.get('track')

    return parsedTrack ? JSON.parse(parsedTrack) : null
  }

  return null
}

export const changeTrack = declareAction<ITrack>()

export const trackAtom = declareAtom<ITrack | null>(getInitialTrack(), (on) => [
  on(changeTrack, (store, track) => {
    const newStore = { ...store, ...track }

    Cookie.set('track', JSON.stringify({ ...newStore, paused: true }))

    return newStore
  }),
])
