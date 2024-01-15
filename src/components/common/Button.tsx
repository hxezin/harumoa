import theme from '../../assets/css/theme'
import * as S from './Button.styled'

// 기본 회색 버튼
export const Button = ({
  value,
  onClick,
  disabled,
  fontSize,
  fontColor,
  bgColor,
  borderColor,
  hoverBgColor,
  padding,
}: StyledButtonProps) => {
  return (
    <S.ButtonContainer
      onClick={onClick}
      disabled={disabled}
      $fontSize={fontSize}
      $fontColor={fontColor}
      $bgColor={bgColor}
      $borderColor={borderColor}
      $hoverBgColor={hoverBgColor}
      $padding={padding}
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
    />
  )
}

// 파란색 테두리 버튼 (e.g. 오늘 버튼)
export const BlueBorderButton = ({
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
      fontColor={theme.color.primary.main}
      borderColor={theme.color.primary.main}
      bgColor={theme.color.white}
      hoverBgColor={theme.color.secondary.main}
    />
  )
}

interface ButtonProps {
  value: string
  onClick: () => void
  disabled?: boolean
  padding?: string
  fontSize?: string
}

interface StyledButtonProps extends ButtonProps {
  fontColor?: string
  bgColor?: string
  borderColor?: string
  hoverBgColor?: string
}
