import React, { useEffect, useState } from 'react'
import { Layout as AntLayout, Menu } from 'antd'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { menuLinks } from './links'

const AudioContainer = dynamic(() => import('./AudioContainer'), {
  ssr: false,
})

export const Layout: React.FC = ({ children }) => {
  const { pathname } = useRouter()
  const [selectedKeys, setSelectedKeys] = useState([pathname])

  useEffect(() => {
    setSelectedKeys([pathname])
  }, [pathname])

  return (
    <Container>
      <AntLayout.Header style={{ position: 'fixed', zIndex: 9, width: '100%' }}>
        <Menu
          theme="dark"
          mode="horizontal"
          selectable
          selectedKeys={selectedKeys}
        >
          {menuLinks.map(({ link, text, Icon }) => (
            <Menu.Item key={link} icon={<Icon />}>
              <Link href={link}>
                <a>{text}</a>
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </AntLayout.Header>

      <ChildrenWrapper>
        {children}
        <AudioContainer />
      </ChildrenWrapper>
    </Container>
  )
}

const Container = styled(AntLayout)`
  min-height: 100vh;
`

const ChildrenWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 100px 50px;
`
