import { declareAction, declareAtom } from '@reatom/core'
import { fetchUser, setUser } from '@store/user'

import { albumsToSearch } from './constants'
import { IAlbums } from './types'

const setAlbums = declareAction<IAlbums>()

export const searchAlbums = declareAction<string | undefined>(
  (payload, store) => {
    fetch(`https://api.spotify.com/v1/albums?ids=${albumsToSearch.join(',')}`, {
      headers: {
        Authorization: `Bearer ${payload}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error && res.error.status === 401) {
          fetchUser().then((res) => store.dispatch(setUser(res)))

          return null
        }

        return store.dispatch(setAlbums(res))
      })
  },
)

export const albumsAtom = declareAtom<IAlbums | null>(null, (on) => [
  on(setAlbums, (_, payload) => payload),
])
