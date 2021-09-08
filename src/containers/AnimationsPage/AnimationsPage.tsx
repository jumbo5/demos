import React from 'react'
import { Animation, AnimationChain } from '@components'
import { NextSeo } from 'next-seo'
import styled from 'styled-components'

export const AnimationsPage = () => (
  <>
    <NextSeo title="Animations" description="Animation component example" />

    <Container>
      <AnimationChain delaysBetween={0}>
        <Animation type="fade-in-bottom" className="custom-classname">
          <b>FADE IN BOTTOM EXAMPLE</b>
        </Animation>

        <Animation type="fade-in-top" className="custom-classname">
          <b>FADE IN TOP EXAMPLE</b>
        </Animation>

        <Animation
          className="custom-classname"
          customAnimation={{
            from: { transform: 'rotate(720deg)', opacity: 0 },
            to: { transform: 'rotate(-720deg)', opacity: 1 },
          }}
          config={{ duration: 1000 }}
        >
          <b>CUSTOM ANIMATION</b>
        </Animation>

        <Animation type="fade-in-left" className="custom-classname">
          <b>FADE IN LEFT EXAMPLE</b>
        </Animation>

        <Animation type="fade-in-right" className="custom-classname">
          <b>FADE IN RIGHT EXAMPLE</b>
        </Animation>
      </AnimationChain>
    </Container>
  </>
)

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;

  .custom-classname {
    background-color: rgb(231, 218, 218);
    border-radius: 4px;
    padding: 24px;
    box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.2);
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
