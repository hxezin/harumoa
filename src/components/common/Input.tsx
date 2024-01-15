import styled from 'styled-components'
import {
  formFieldStyles,
  formFieldViewModeStyles,
  TextAlign,
} from '../../assets/css/form'

const InputContainer = styled.input<{
  $viewMode: boolean
  $textAlign: TextAlign
}>`
  ${({ $textAlign }) => formFieldStyles($textAlign)}
  ${({ theme, $viewMode }) => formFieldViewModeStyles(theme, $viewMode)}
`

interface InputProps {
  type: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  viewMode?: boolean
  textAlign?: TextAlign
}

const Input = ({
  type,
  placeholder,
  value,
  onChange,
  disabled,
  viewMode = false,
  textAlign = 'left',
}: InputProps) => {
  return (
    <InputContainer
      type={type}
      placeholder={viewMode ? '' : placeholder}
      value={value}
      onChange={onChange}
      disabled={viewMode || disabled}
      $viewMode={viewMode}
      $textAlign={textAlign}
    />
  )
}

export default Input
