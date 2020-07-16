import React from 'react'
import { useModal } from '@hooks'
import { Button, Result } from 'antd'
import { NextSeo } from 'next-seo'

export const ModalPage = () => {
  const { Modal, onClose, onOpen, opened } = useModal()

  return (
    <>
      <NextSeo title="Modal" description="React modal component example" />

      <Button onClick={onOpen}>Show modal</Button>
      <Modal visible={opened} onClose={onClose}>
        <Result
          status="success"
          title="Successfully Purchased Cloud Server ECS!"
          subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        />
      </Modal>
    </>
  )
}
