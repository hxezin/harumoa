import styled, { css } from 'styled-components'

// disabled style
const disabledButtonStyle = css`
  border: 1px solid ${({ theme }) => theme.color.gray0} !important;
  color: ${({ theme }) => theme.color.gray0};
  background: ${({ theme }) => theme.color.white};
  box-shadow: 0;
  cursor: not-allowed;
`

// 기본 버튼
const Container = styled.button<{ fontSize?: string }>`
  padding: 0.3rem 0.7rem;
  border-radius: 1.43rem;
  border: 1px solid ${({ theme }) => theme.color.gray1};
  background: ${({ theme }) => theme.color.white};
  box-shadow: 1px 1px 3px 0px rgba(97, 97, 97, 0.5);

  color: ${({ theme }) => theme.color.gray1};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  font-size: ${({ theme, fontSize }) =>
    fontSize ? theme.fontSize['fontSize'] : theme.fontSize.base};

  ${(props) => props.disabled && disabledButtonStyle};
`

interface ButtonProps {
  value: string
  onClick: () => void
  disabled?: boolean
  fontSize?: string
}

export const Button = ({ value, onClick, disabled, fontSize }: ButtonProps) => {
  return (
    <Container onClick={onClick} disabled={disabled} fontSize={fontSize}>
      {value}
    </Container>
  )
}

// 파란색 버튼(e.g. 저장 버튼)
const BlueButtonContainer = styled(Container)`
  background-color: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.white};

  ${(props) => props.disabled && disabledButtonStyle};
`

export const BlueButton = ({
  value,
  onClick,
  disabled,
  fontSize,
}: ButtonProps) => {
  return (
    <BlueButtonContainer
      onClick={onClick}
      disabled={disabled}
      fontSize={fontSize}
    >
      {value}
    </BlueButtonContainer>
  )
}

// 빨간색 버튼(e.g. 삭제 버튼)
const RedButtonContainer = styled(Container)`
  background-color: ${({ theme }) => theme.color.error};
  color: ${({ theme }) => theme.color.white};

  ${(props) => props.disabled && disabledButtonStyle};
`

export const RedButton = ({
  value,
  onClick,
  disabled,
  fontSize,
}: ButtonProps) => {
  return (
    <RedButtonContainer
      onClick={onClick}
      disabled={disabled}
      fontSize={fontSize}
    >
      {value}
    </RedButtonContainer>
  )
}
