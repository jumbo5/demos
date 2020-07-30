import { CLIENT_ID, CLIENT_SECRET } from '@global/constants'
import { declareAction, declareAtom } from '@reatom/core'
import Cookie from 'js-cookie'

import { ITokenResponse } from './types'

const getInitialUser = () => {
  if (typeof window !== 'undefined') {
    const access_token = Cookie.get('token')

    return access_token ? { access_token } : null
  }

  return null
}

export const fetchUser = (): Promise<ITokenResponse> =>
  fetch(
    'https://accounts.spotify.com/api/token?grant_type=client_credentials',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${new Buffer(
          CLIENT_ID + ':' + CLIENT_SECRET,
        ).toString('base64')}`,
      },
    },
  ).then((res) => res.json())

export const setUser = declareAction<ITokenResponse>()

export const fetchUserAction = declareAction((_, store) => {
  fetchUser().then((res: ITokenResponse) => store.dispatch(setUser(res)))
})

export const userAtom = declareAtom<ITokenResponse | null>(
  getInitialUser(),
  (on) => [
    on(setUser, (_, payload) => {
      Cookie.set('token', payload.access_token)

      return payload
    }),
  ],
)
