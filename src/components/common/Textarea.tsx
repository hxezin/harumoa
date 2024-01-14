import styled from 'styled-components'
import {
  formFieldStyles,
  formFieldViewModeStyles,
  TextAlign,
} from '../../assets/css/form'

const TextareaContainer = styled.textarea<{
  $viewMode: boolean
  $textAlign: TextAlign
}>`
  ${({ $textAlign }) => formFieldStyles($textAlign)}
  ${({ theme, $viewMode }) => formFieldViewModeStyles(theme, $viewMode)}

  resize: none;
`

interface TextareaProps {
  placeholder?: string
  value: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  disabled?: boolean
  rows?: number
  viewMode?: boolean
  textAlign?: TextAlign
}

const Textarea = ({
  placeholder,
  value,
  onChange,
  disabled,
  rows = 5,
  viewMode = false,
  textAlign = 'left',
}: TextareaProps) => {
  return (
    <TextareaContainer
      rows={rows}
      placeholder={viewMode ? '' : placeholder}
      value={value}
      onChange={onChange}
      disabled={viewMode || disabled}
      $viewMode={viewMode}
      $textAlign={textAlign}
    />
  )
}

export default Textarea
