import styled from 'styled-components'

type SelectValData = {
  label: string
  value: string
}

interface SelectProps {
  handleOnChange: (e: string) => void
  valData: SelectValData[]

  name: string
  defaultVal: string
}

const Select = ({ handleOnChange, valData, name, defaultVal }: SelectProps) => {
  return (
    <select
      onChange={(e) => {
        handleOnChange(e.target.value)
      }}
      name={name}
      defaultValue={defaultVal}
      style={{ width: '80%' }}
    >
      {valData.map((item, idx) => (
        <option value={item.value} key={idx}>
          {item.label}
        </option>
      ))}
    </select>
  )
}

export default Select
