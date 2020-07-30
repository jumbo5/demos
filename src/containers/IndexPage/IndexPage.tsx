import React, { useEffect } from 'react'
import { useAction, useAtom } from '@reatom/react'
import { changeTrack, trackAtom } from '@store'
import { Button, Card } from 'antd'
import { NextSeo } from 'next-seo'
import styled from 'styled-components'

import { albumsAtom, searchAlbums } from './model/IndexPage.model'

export const IndexPage = () => {
  const track = useAtom(trackAtom)
  const albumsResponse = useAtom(albumsAtom)

  const handleChangeTrack = useAction(changeTrack)
  const handlesearchAlbums = useAction(searchAlbums)

  useEffect(() => {
    handlesearchAlbums()
  }, [handlesearchAlbums])

  return (
    <>
      <NextSeo title="Demos" description="Demos" />
      {albumsResponse && (
        <CardsWrapper>
          {albumsResponse.albums.map(({ id, images, name, artists }) => (
            <StyledCard
              key={id}
              cover={
                <CardCoverWrapper>
                  <CardCover alt="playlist-cover" src={images[0].url} />
                </CardCoverWrapper>
              }
            >
              <Card.Meta title={name} description={artists[0].name} />
            </StyledCard>
          ))}
        </CardsWrapper>
      )}
    </>
  )
}

const StyledCard = styled(Card)`
  max-width: 100%;
  height: 100%;
`

const CardCoverWrapper = styled.div`
  position: relative;
  padding-top: 100%;
  width: 100%;
`

const CardCover = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
`

const CardsWrapper = styled.div`
  display: grid;
  gap: 32px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  width: 100%;
`
