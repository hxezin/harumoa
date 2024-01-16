import { styled } from 'styled-components'

const RadioContainer = styled.label<{ $disabled: boolean }>`
  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
  color: ${({ theme }) => theme.color.black};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  white-space: nowrap;
`

const RadioButton = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;

  margin: 0;
  margin-right: 0.5rem;

  border: 1px solid ${({ theme }) => theme.color.primary.main};
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 100%;

  &:checked {
    border: 2px solid ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.primary.main};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.color.primary.main};
  }

  &:disabled {
    border: transparent;
    background-color: transparent;
    box-shadow: 0 0 0 1px ${({ theme }) => theme.color.gray1};
    cursor: default;
  }
`

interface RadioProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  checked?: boolean
  disabled?: boolean
}

const Radio = ({
  label,
  name,
  value,
  onChange,
  checked = false,
  disabled = false,
}: RadioProps) => {
  return (
    <RadioContainer $disabled={disabled}>
      <RadioButton
        type='radio'
        name={name}
        value={value}
        onChange={onChange}
        checked={checked}
        disabled={disabled}
      />
      <span>{label}</span>
    </RadioContainer>
  )
}

export default Radio
