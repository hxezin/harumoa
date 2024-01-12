import styled, { css } from 'styled-components'

interface ButtonContainerProps {
  $fontSize?: string
  $fontColor?: string
  $bgColor?: string
  $borderColor?: string

  $hoverBgColor?: string

  padding?: string
}

const baseButtonStyles = css`
  border-radius: 1.43rem;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  white-space: nowrap;

  &:disabled {
    border: 1px solid ${({ theme }) => theme.color.gray0} !important;
    box-shadow: 1px 1px 3px 0px rgba(228, 228, 228, 0.7);
  }
`

const ButtonContainer = styled.button<ButtonContainerProps>`
  ${({
    theme,
    $fontSize,
    $fontColor,
    $bgColor,
    $borderColor,
    $hoverBgColor,
    padding,
  }) => css`
    padding: ${padding || '0.3rem 0.7rem'};
    font-size: ${$fontSize || theme.fontSize.base};
    color: ${$fontColor || theme.color.primary.main};
    background-color: ${$bgColor || theme.color.white};
    border: 1px solid ${$bgColor || $borderColor || theme.color.primary.main};
    box-shadow: 1px 1px 3px 0px ${$bgColor || theme.color.gray0};

    &:hover {
      background-color: ${$hoverBgColor || theme.color.secondary.main};
    }

    &:disabled {
      background-color: ${$bgColor ? theme.color.gray0 : theme.color.white};
      color: ${$bgColor ? theme.color.white : theme.color.gray0};
    }
  `}

  ${baseButtonStyles};
`

interface ButtonProps {
  value: string
  onClick: () => void
  disabled?: boolean
  fontSize?: string
  fontColor?: string
  bgColor?: string

  borderColor?: string
  hoverBgColor?: string
  padding?: string
}

const Button = ({
  value,
  onClick,
  disabled,
  fontSize,
  fontColor,
  bgColor,
  borderColor,
  hoverBgColor,
  padding,
}: ButtonProps) => {
  return (
    <ButtonContainer
      onClick={onClick}
      disabled={disabled}
      $fontSize={fontSize}
      $fontColor={fontColor}
      $bgColor={bgColor}
      $borderColor={borderColor}
      $hoverBgColor={hoverBgColor}
      padding={padding}
    >
      {value}
    </ButtonContainer>
  )
}

export default Button
