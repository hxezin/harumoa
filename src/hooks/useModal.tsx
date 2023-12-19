import { useCallback, useState } from 'react'

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = useCallback(() => {
    setIsOpen(() => true)
  }, [])

  const handleClose = useCallback(() => {
    setIsOpen(() => false)
  }, [])

  return {
    onOpen: handleOpen,
    onClose: handleClose,
    isOpen,
  }
}

export default useModal
