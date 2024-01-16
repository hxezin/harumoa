import styled from 'styled-components'
import {
  formFieldStyles,
  formFieldViewModeStyles,
  TextAlign,
} from '../../assets/css/form'

const InputContainer = styled.input<{
  $viewMode: boolean
  $textAlign: TextAlign
  $padding?: string
}>`
  ${({ $textAlign }) => formFieldStyles($textAlign)}
  ${({ theme, $viewMode }) => formFieldViewModeStyles(theme, $viewMode)}

  padding: ${({ $padding }) => $padding || '0.75rem'};
`

interface InputProps {
  type: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  viewMode?: boolean
  textAlign?: TextAlign
  padding?: string
}

const Input = ({
  type,
  placeholder,
  value,
  onChange,
  disabled,
  viewMode = false,
  textAlign = 'left',
  padding,
}: InputProps) => {
  return (
    <InputContainer
      type={type}
      placeholder={viewMode || disabled ? '' : placeholder}
      value={value}
      onChange={onChange}
      disabled={viewMode || disabled}
      $viewMode={viewMode}
      $textAlign={textAlign}
      $padding={padding}
    />
  )
}

export default Input
