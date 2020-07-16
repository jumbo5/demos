import React, { useEffect, useState } from 'react'
import { Layout as AntLayout, Menu } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { menuLinks } from './links'

export const Layout: React.FC = ({ children }) => {
  const { pathname } = useRouter()
  const [selectedKeys, setSelectedKeys] = useState([pathname])
  const [collapsed, setCollapsed] = useState(true)

  useEffect(() => {
    setSelectedKeys([pathname])
    setCollapsed(pathname !== '/')
  }, [pathname])

  return (
    <Container>
      <AntLayout.Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
      >
        <Menu selectable selectedKeys={selectedKeys} theme="dark" mode="inline">
          {menuLinks.map(({ link, text, Icon }) => (
            <Menu.Item key={link} icon={<Icon />}>
              <Link href={link}>
                <a>{text}</a>
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </AntLayout.Sider>
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </Container>
  )
}

const Container = styled(AntLayout)`
  min-height: 100vh;
`

const ChildrenWrapper = styled.div`
  width: 100%;
  padding: 36px 48px;
`
