import { ReactNode, useState, useCallback } from 'react'
import styled from 'styled-components'

const BackgroundOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ $isOpen }) => ($isOpen ? '100vh' : '0')};
  background: rgba(0, 0, 0, 0.3);
  transition: height 0.5s ease;
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  z-index: 1;
`

const BottomSheetWrapper = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${({ $isOpen }) => ($isOpen ? '70%' : '0')};
  background: white;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  overflow: hidden;
  transition: height 0.5s ease;
  z-index: 2;
`

const useBottomSheet = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openBottomSheet = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeBottomSheet = useCallback(() => {
    setIsOpen(false)
  }, [])

  const BottomSheet = ({ children }: { children: ReactNode }) => (
    <>
      <BackgroundOverlay $isOpen={isOpen} onClick={closeBottomSheet} />
      <BottomSheetWrapper $isOpen={isOpen}>{children}</BottomSheetWrapper>
    </>
  )

  return { BottomSheet, openBottomSheet, closeBottomSheet }
}

export default useBottomSheet
