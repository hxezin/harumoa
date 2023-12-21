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
  background-color: #fff;
  padding: 1rem;
`

export interface ModalProps {
  onClose?: () => void
  children: React.ReactNode
}

export default function Modal({ onClose, children }: ModalProps) {
  return (
    <ModalContainer onClick={onClose}>
      <ModalMain onClick={(e) => e.stopPropagation()}>{children}</ModalMain>
    </ModalContainer>
  )
}
