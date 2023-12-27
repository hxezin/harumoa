import React, { useState, useRef, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { Option } from '../../constants'

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

interface DropdownProps {
  options: Option[]
  defaultValue: string

  onSelect: (option: string) => void
  isEdit?: boolean
}

function Dropdown({ options, defaultValue, onSelect, isEdit }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const defaultOption = useMemo(
    () => options.find((option) => option.value === defaultValue),
    [options, defaultValue]
  )

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const selectOption = (option: string) => {
    onSelect(option)
    setIsOpen(false)
  }

  useEffect(() => {
    // 외부 클릭에 대한 이벤트를 처리
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownInput
        onClick={toggleDropdown}
        value={defaultOption ? defaultOption.label : ''}
        disabled={!isEdit}
        readOnly
      />
      {isEdit && isOpen && (
        <DropdownList>
          {options.map((item) => (
            <li key={item.value} onClick={() => selectOption(item.value)}>
              {item.label}
            </li>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  )
}

export default Dropdown
