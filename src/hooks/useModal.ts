import { useCallback, useEffect, useState } from 'react'
import { Modal } from '@components'

export const useModal = () => {
  const [opened, setOpened] = useState(false)

  const onClose = useCallback(() => setOpened(false), [])
  const onOpen = useCallback(() => setOpened(true), [])

  useEffect(() => {
    const keyDownCallback = (event: KeyboardEvent) => {
      if (event.keyCode === 27) {
        onClose()
      }
    }

    document.addEventListener('keydown', keyDownCallback)

    return () => document.removeEventListener('keydown', keyDownCallback)
  }, [onClose])

  return { opened, onClose, onOpen, Modal }
}
