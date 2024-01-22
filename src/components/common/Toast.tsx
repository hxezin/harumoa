import styled from 'styled-components'

const Container = styled.div<{ $isSuccess: boolean }>`
  position: absolute;
  left: 50%;
  bottom: 30px;
  transform: translate(-50%, 0);
  z-index: 99;

  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  box-shadow: 1px 1px 3px 0px rgba(97, 97, 97, 0.5);
  background: ${({ $isSuccess, theme }) =>
    $isSuccess ? theme.color.primary.main : theme.color.red.main};
  color: ${({ theme }) => theme.color.white};
  font-weight: ${({ theme }) => theme.fontWeight.bold};

  animation: fadeInUp 0.5s linear;
  @keyframes fadeInUp {
    from {
      transform: translate(-50%, 50%);
      opacity: 0;
    }
    to {
      transform: translate(-50%, 0);
      opacity: 1;
    }
  }
`

interface ToastProps {
  content: string
  isSuccess: boolean
}

const Toast = ({ content, isSuccess }: ToastProps) => {
  return <Container $isSuccess={isSuccess}>{content}</Container>
}

export default Toast
