import { USER_ID } from '@global/constants'
import { declareAction, declareAtom } from '@reatom/core'
import { fetchUser, setUser, userAtom } from '@store'

import { albumsToSearch } from './constants'
import { IAlbums } from './types'

const setAlbums = declareAction<IAlbums>()

export const searchAlbums = declareAction((_, store) => {
  fetch(`https://api.spotify.com/v1/albums?ids=${albumsToSearch.join(',')}`, {
    headers: {
      Authorization: `Bearer ${store.getState(userAtom)?.access_token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error && res.error.status === 401) {
        fetchUser()
          .then((res) => store.dispatch(setUser(res)))
          .then(() => store.dispatch(searchAlbums()))
      }

      return store.dispatch(setAlbums(res))
    })
})

export const albumsAtom = declareAtom<IAlbums | null>(null, (on) => [
  on(setAlbums, (_, payload) => payload),
])
