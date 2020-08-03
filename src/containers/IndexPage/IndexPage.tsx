import React, { useEffect } from 'react'
import { useAction, useAtom } from '@reatom/react'
import {
  changeTrack,
  clearQueue,
  pushToQueue,
  queueAtom,
  trackAtom,
} from '@store/player'
import { userAtom } from '@store/user'
import { NextSeo } from 'next-seo'
import styled from 'styled-components'

import { albumsAtom, searchAlbums } from './model/IndexPage.model'
import { IAlbumTrack } from './model/types'
import { ListItem } from './components'

const currentYear = new Date().getFullYear()

export const IndexPage = () => {
  const track = useAtom(trackAtom)
  const albumsResponse = useAtom(albumsAtom)
  const user = useAtom(userAtom)
  const queue = useAtom(queueAtom)

  const handleChangeTrack = useAction(changeTrack)
  const handleSearchAlbums = useAction(searchAlbums)
  const handlePushToQueue = useAction(pushToQueue)
  const handleClearQueue = useAction(clearQueue)

  useEffect(() => {
    handleSearchAlbums(user?.access_token)
  }, [handleSearchAlbums, user])

  const renderListItem = (item: IAlbumTrack) => {
    const isDisabled = !item.preview_url
    const isActive = item.preview_url === track?.src

    return (
      <ListItem
        key={item.id}
        active={isActive}
        disabled={isDisabled}
        time={isActive && track?.time ? track.time : 0}
        duration={30}
        artistName={item.artists[0].name}
        trackName={item.name}
        onClick={() =>
          !isDisabled &&
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
      />
    )
  }

  return (
    <>
      <NextSeo title="Demos" description="Demos" />
      <AlbumsContainer>
        {albumsResponse?.albums.map(({ id, tracks, name, label, images }) => (
          <Album key={id}>
            <AlbumHeader>
              <AlbumCover
                src={images[0].url}
                onClick={() => {
                  handleClearQueue()
                  handlePushToQueue(
                    tracks.items.map((track) => ({
                      src: track.preview_url as string,
                    })),
                  )
                  handleChangeTrack({
                    src: tracks.items[0].preview_url as string,
                    time: 0,
                    paused: false,
                  })
                }}
              />
            </AlbumHeader>
            <List>{tracks.items.map(renderListItem)}</List>

            <AlbumFooter>{`© ${currentYear} ${label}`}</AlbumFooter>
          </Album>
        ))}
      </AlbumsContainer>
    </>
  )
}

const List = styled.ul`
  padding: 0;
  margin: 0;
  max-height: 216px;
  overflow: auto;
`

const AlbumsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px;
`

const Album = styled.div`
  display: grid;
  grid-template-rows: min-content minmax(0, 215px) min-content;

  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
  background-color: white;
`

const AlbumHeader = styled.div`
  cursor: pointer;
`

const AlbumCover = styled.img`
  width: 100%;
  object-position: center;
  object-fit: cover;
`

const AlbumFooter = styled.div`
  padding: 8px;
  font-size: 10px;
  font-weight: 300;
  color: #80808073;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`
