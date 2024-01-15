import styled, { css } from 'styled-components'

interface ButtonContainerProps {
  $fontSize?: string
  $fontColor?: string
  $bgColor?: string
  $borderColor?: string
  $hoverBgColor?: string
  $padding?: string
}

const baseButtonStyles = css`
  border-radius: 1.43rem;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  white-space: nowrap;

  &:disabled {
    border: 1px solid ${({ theme }) => theme.color.gray0} !important;
    box-shadow: none;
  }
`

export const ButtonContainer = styled.button<ButtonContainerProps>`
  ${({
    theme,
    $fontSize,
    $fontColor,
    $bgColor,
    $borderColor,
    $hoverBgColor,
    $padding,
  }) => css`
    padding: ${$padding || '0.5rem 0.75rem'};
    font-size: ${$fontSize || theme.fontSize.base};
    color: ${$fontColor || theme.color.white};
    background-color: ${$bgColor || theme.color.gray1};
    border: 1px solid ${$borderColor || $bgColor || theme.color.gray1};

    &:hover {
      background-color: ${$hoverBgColor || theme.color.gray2};
      box-shadow: 1px 1px 3px 0px
        ${$borderColor || $bgColor || theme.color.gray2};
      border: 1px solid ${$borderColor || $bgColor || theme.color.gray2};
    }

    &:disabled {
      background-color: ${$bgColor ? theme.color.gray0 : theme.color.white};
      color: ${$bgColor ? theme.color.white : theme.color.gray0};
    }

    ${baseButtonStyles};
  `}
`
