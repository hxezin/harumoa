import styled from 'styled-components'

export const ConfirmContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  h1 {
    margin: 0;
    color: ${({ theme }) => theme.color.gray3};
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: ${({ theme }) => theme.fontWeight.extraBold};
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.color.gray2};
    font-size: ${({ theme }) => theme.fontSize.base};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }

  div {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
  }

  @media (max-width: 780px) {
    h1 {
      font-size: ${({ theme }) => theme.fontSize.base};
      font-weight: ${({ theme }) => theme.fontWeight.semibold};
    }

    p {
      font-size: ${({ theme }) => theme.fontSize.sm};
      font-weight: ${({ theme }) => theme.fontWeight.regular};
    }
  }
`

interface ConfirmProps {
  title: string
  guidance?: string | React.ReactNode
  buttons: React.ReactNode
}

const Confirm = ({ title, guidance, buttons }: ConfirmProps) => {
  return (
    <ConfirmContainer>
      <h1>{title}</h1>
      {guidance && <p>{guidance}</p>}
      <div>{buttons}</div>
    </ConfirmContainer>
  )
}

export default Confirm
