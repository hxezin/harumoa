import styled from 'styled-components'
import {
  TextAlign,
  formFieldStyles,
  formFieldViewModeStyles,
} from '../../assets/css/form'

type SelectValData = {
  label: string
  value: string
}

interface SelectProps {
  handleOnChange: (e: string) => void
  valData: SelectValData[]

  name: string
  defaultVal: string
  $viewMode: boolean
}

const SelectContainer = styled.select<{
  $viewMode: boolean
  $textAlign: TextAlign
}>`
  ${({ $textAlign }) => formFieldStyles($textAlign)}
  ${({ theme, $viewMode }) => formFieldViewModeStyles(theme, $viewMode)};
  opacity: 1;
`

const Select = ({
  handleOnChange,
  valData,
  name,
  defaultVal,
  $viewMode,
}: SelectProps) => {
  return (
    <SelectContainer
      onChange={(e) => {
        handleOnChange(e.target.value)
      }}
      name={name}
      defaultValue={defaultVal}
      $viewMode={$viewMode}
      disabled={$viewMode}
      $textAlign='center'
    >
      {valData.map((item) => (
        <option value={item.value} key={item.value}>
          {item.label}
        </option>
      ))}
    </SelectContainer>
  )
}

export default Select
