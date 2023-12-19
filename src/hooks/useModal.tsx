import { ReactElement, useCallback, useState } from 'react'
import Modal from '../components/common/Modal'

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = useCallback(() => {
    setIsOpen(() => true)
  }, [])

  const handleClose = useCallback(() => {
    setIsOpen(() => false)
  }, [])

  const modalComponent = isOpen
    ? ({ children }: { children: ReactElement }) => (
        <Modal onClose={handleClose}>{children}</Modal>
      )
    : () => null

  return {
    Modal: modalComponent,
    onOpen: handleOpen,
    onClose: handleClose,
    isOpen,
  }
}

export default useModal
