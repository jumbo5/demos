import React, { useEffect, useMemo } from 'react'
import { useAction, useAtom } from '@reatom/react'
import { changeTrack, trackAtom, userAtom } from '@store'
import { List } from 'antd'
import { NextSeo } from 'next-seo'
import styled from 'styled-components'

import { albumsAtom, searchAlbums } from './model/IndexPage.model'
import { IExtendedAlbumTracks } from './model/types'

export const IndexPage = () => {
  const track = useAtom(trackAtom)
  const albumsResponse = useAtom(albumsAtom)
  const user = useAtom(userAtom)

  const handleChangeTrack = useAction(changeTrack)
  const handlesearchAlbums = useAction(searchAlbums)

  useEffect(() => {
    handlesearchAlbums(user?.access_token)
  }, [handlesearchAlbums, user])

  const tracksWithPreview = useMemo(() => {
    if (albumsResponse) {
      return albumsResponse.albums.reduce(
        (acc, album) => [
          ...acc,
          ...album.tracks.items
            .filter((track) => track.preview_url)
            .map((track) => ({ ...track, images: album.images })),
        ],
        [] as IExtendedAlbumTracks[],
      )
    }

    return undefined
  }, [albumsResponse])

  return (
    <>
      <NextSeo title="Demos" description="Demos" />
      <List
        bordered
        dataSource={tracksWithPreview}
        renderItem={(item) => (
          <StyledListItem
            onClick={() =>
              handleChangeTrack(
                item.preview_url === track?.src
                  ? {
                      paused: !track.paused,
                    }
                  : {
                      src: item.preview_url || '',
                      paused: false,
                      time: 0,
                    },
              )
            }
          >
            <h1>{item.name}</h1>
          </StyledListItem>
        )}
      />
    </>
  )
}

const StyledListItem = styled(List.Item)`
  cursor: pointer;
`
