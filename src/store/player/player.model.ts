import { declareAction, declareAtom } from '@reatom/core'
import Cookie from 'js-cookie'

import {
  changeTrack,
  clearQueue,
  newQueue,
  pushToQueue,
  removeFromQueue,
} from './actions'
import { ITrack } from './types'

// CURRENT TRACK

export const trackAtom = declareAtom<ITrack | null>(null, (on) => [
  on(changeTrack, (store, track) => ({ ...store, ...track })),
])

// QUEUE

export const queueAtom = declareAtom<ITrack[] | null>(null, (on) => [
  on(pushToQueue, (store, payload) => [
    ...(store || []),
    ...(Array.isArray(payload) ? payload : [payload]),
  ]),
  on(removeFromQueue, (store, payload) => {
    if (!store || store.length === 0) {
      return null
    }

    if (Array.isArray(payload)) {
      const flatStore = store.map((storeTrack) => storeTrack.src)
      const flatPayload = payload.map((payloadTrack) => payloadTrack.src)

      const filteredFlatStore = flatStore.filter(
        (storeTrackSrc) => !flatPayload.includes(storeTrackSrc),
      )

      return filteredFlatStore.map((storeTrackSrc) =>
        store.find((storeTrack) => storeTrack.src === storeTrackSrc),
      ) as ITrack[]
    }

    return store.filter((track) => track.src !== payload.src)
  }),
  on(clearQueue, () => null),
  on(newQueue, (_, payload) => payload),
])
