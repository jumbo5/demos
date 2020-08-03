import { declareAction, declareAtom } from '@reatom/core'

import { ITrack } from './types'

// TRACK

export const changeTrack = declareAction<ITrack>()

// QUEUE

export const pushToQueue = declareAction<ITrack | ITrack[]>()

export const removeFromQueue = declareAction<ITrack | ITrack[]>()

export const clearQueue = declareAction()

export const newQueue = declareAction<ITrack[] | null>()
