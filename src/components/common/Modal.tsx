import { useEffect } from 'react'
import { styled } from 'styled-components'

const ModalContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.5);
`

const ModalMain = styled.div`
  background-color: ${({ theme }) => theme.color.white};
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 2px 2px 8px 0px ${({ theme }) => theme.color.gray2};

  max-width: 1000px;

  @media (max-width: 780px) {
    margin: 1rem;
  }
`

export interface ModalProps {
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({ onClose, children }: ModalProps) {
  useEffect(() => {
    const escKeyModalClose = (e: KeyboardEvent) => {
      // alert(e.code)
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', escKeyModalClose)
    return () => window.removeEventListener('keydown', escKeyModalClose)
  }, [])

  return (
    <ModalContainer onClick={onClose}>
      <ModalMain onClick={(e) => e.stopPropagation()}>{children}</ModalMain>
    </ModalContainer>
  )
}
