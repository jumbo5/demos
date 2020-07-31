import React, { useEffect, useMemo } from 'react'
import { useAction, useAtom } from '@reatom/react'
import { changeTrack, trackAtom, userAtom } from '@store'
import { NextSeo } from 'next-seo'
import styled from 'styled-components'

import { albumsAtom, searchAlbums } from './model/IndexPage.model'
import { IExtendedAlbumTracks } from './model/types'
import { ListItem } from './ListItem'

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

  const renderListItem = (item: IExtendedAlbumTracks) => {
    const isActive = item.preview_url === track?.src

    return (
      <ListItem
        key={item.id}
        active={isActive}
        time={isActive && track?.time ? track.time : 0}
        duration={30}
        onClick={() =>
          handleChangeTrack(
            isActive
              ? {
                  paused: !track?.paused,
                }
              : {
                  src: item.preview_url || '',
                  paused: false,
                  time: 0,
                },
          )
        }
      >
        {item.name}
      </ListItem>
    )
  }

  return (
    <>
      <NextSeo title="Demos" description="Demos" />
      <List>{tracksWithPreview?.map(renderListItem)}</List>
    </>
  )
}

const List = styled.ul`
  padding: 0;
  margin: 0;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
`
