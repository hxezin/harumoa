import styled from 'styled-components'

const Container = styled.div<{ $isSuccess: boolean }>`
  position: absolute;
  left: 50%;
  bottom: 20px;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;

  box-shadow: 1px 1px 3px 0px rgba(97, 97, 97, 0.5);

  background: ${({ $isSuccess, theme }) =>
    $isSuccess ? theme.color.primary.main : theme.color.red.main};
`

interface ToastProps {
  content: string
  isSuccess: boolean
}

const Toast = ({ content, isSuccess }: ToastProps) => {
  return <Container $isSuccess={isSuccess}>{content}</Container>
}

export default Toast
