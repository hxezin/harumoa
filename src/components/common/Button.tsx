import React from 'react'
import theme from '../../assets/css/theme'
import * as S from './Button.styled'

// 기본 회색 버튼
export const Button = ({
  className,
  value,
  onClick,
  disabled,
  fontSize,
  fontColor,
  bgColor,
  borderColor,
  hoverBgColor,
  padding,
  width,
  borderRadius,
}: StyledButtonProps) => {
  return (
    <S.ButtonContainer
      className={className}
      onClick={onClick}
      disabled={disabled}
      $fontSize={fontSize}
      $fontColor={fontColor}
      $bgColor={bgColor}
      $borderColor={borderColor}
      $hoverBgColor={hoverBgColor}
      $padding={padding}
      $width={width}
      $borderRadius={borderRadius}
    >
      {value}
    </S.ButtonContainer>
  )
}

// 파란색 버튼 (e.g. 저장 버튼)
export const BlueButton = ({
  value,
  onClick,
  disabled,
  padding,
  fontSize,
}: ButtonProps) => {
  return (
    <Button
      value={value}
      onClick={onClick}
      disabled={disabled}
      padding={padding}
      fontSize={fontSize}
      bgColor={theme.color.primary.main}
      hoverBgColor={theme.color.primary.dark}
    />
  )
}

// 빨간색 버튼 (e.g. 삭제 버튼)
export const RedButton = ({
  value,
  onClick,
  disabled,
  padding,
  fontSize,
}: ButtonProps) => {
  return (
    <Button
      value={value}
      onClick={onClick}
      disabled={disabled}
      padding={padding}
      fontSize={fontSize}
      bgColor={theme.color.red.main}
      hoverBgColor={theme.color.red.dark}
    />
  )
}

// 회색 테두리 버튼 (e.g. 로그아웃 버튼, 관리 버튼)
export const GrayBorderButton = ({
  value,
  onClick,
  disabled,
  padding,
  fontSize,
  width,
  borderRadius,
}: ButtonProps) => {
  return (
    <Button
      value={value}
      onClick={onClick}
      disabled={disabled}
      padding={padding}
      fontSize={fontSize}
      fontColor={theme.color.gray1}
      borderColor={theme.color.gray1}
      bgColor={theme.color.white}
      hoverBgColor={theme.color.white2}
      width={width}
      borderRadius={borderRadius}
    />
  )
}

// 파란색 테두리 버튼 (e.g. 오늘 버튼)
export const BlueBorderButton = ({
  className,
  value,
  onClick,
  disabled,
  padding,
  fontSize,
}: ButtonProps) => {
  return (
    <Button
      className={className}
      value={value}
      onClick={onClick}
      disabled={disabled}
      padding={padding}
      fontSize={fontSize}
      fontColor={theme.color.primary.main}
      borderColor={theme.color.primary.main}
      bgColor={theme.color.white}
      hoverBgColor={theme.color.secondary.main}
    />
  )
}

// 버튼 커스텀 시 필요한 props 추가
interface ButtonProps {
  className?: string
  value: string | React.ReactNode
  onClick: () => void
  disabled?: boolean
  padding?: string
  fontSize?: string
  width?: string
  borderRadius?: string
}

interface StyledButtonProps extends ButtonProps {
  fontColor?: string
  bgColor?: string
  borderColor?: string
  hoverBgColor?: string
}
