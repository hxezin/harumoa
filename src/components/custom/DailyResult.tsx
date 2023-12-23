import styled from 'styled-components'
import { dailyResultCategory, dailyResultOptions } from '../../constants'
import useDropdown from '../../hooks/useDropdown'

const DropdownContainer = styled.div`
  position: relative;
  width: fit-content;
  cursor: pointer;
`

const DropdownInput = styled.input`
  width: 100%;
  cursor: pointer;
`

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0%;
  margin: 0;
  padding: 0.2rem;
  width: 100%;
  background-color: #fff;
  border: 1px solid black;

  li:hover {
    background-color: #f7f6f6;
  }
`

interface DailyResultProps {
  dailyResult: string
  setDailyResult: (data: string) => void
  isEdit: boolean
}

const DailyResult = ({
  dailyResult,
  setDailyResult,
  isEdit,
}: DailyResultProps) => {
  const { isOpen, selectedValue, toggleDropdown, dropdownRef, selectOption } =
    useDropdown({
      defaultSelectedValue: dailyResult,
      onSelect: (option) => {
        setDailyResult(option)
      },
    })

  return (
    <section>
      <h3>일간 내역</h3>
      <DropdownContainer ref={dropdownRef}>
        <DropdownInput
          onClick={toggleDropdown}
          value={dailyResultCategory[selectedValue] || ''}
          disabled={!isEdit}
          readOnly
        />
        {isEdit && isOpen && (
          <DropdownList>
            {dailyResultOptions.map((item) => (
              <li key={item} onClick={() => selectOption(item)}>
                {dailyResultCategory[item]}
              </li>
            ))}
          </DropdownList>
        )}
      </DropdownContainer>
    </section>
  )
}

export default DailyResult
