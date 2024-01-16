import { useState, useRef, useEffect, useMemo } from 'react'
import styled, { css } from 'styled-components'
import {
  formFieldStyles,
  formFieldViewModeStyles,
  TextAlign,
} from '../../assets/css/form'
import { ReactComponent as ChevronUp } from '../../assets/icons/chevronUp.svg'
import { ReactComponent as ChevronDown } from '../../assets/icons/chevronDown.svg'

interface Options {
  label: string
  value: string
}

const DropdownContainer = styled.div`
  position: relative;
  cursor: pointer;
`

const DropdownInput = styled.input<{
  $viewMode: boolean
  $textAlign: TextAlign
  $isOpen: boolean
}>`
  cursor: pointer;
  ${({ $textAlign }) => formFieldStyles($textAlign)}
  ${({ theme, $viewMode }) => formFieldViewModeStyles(theme, $viewMode)};

  ${({ theme, $isOpen }) =>
    $isOpen &&
    css`
      outline: none;
      border: 2px solid ${theme.color.primary.main};
    `}
`

const ChevronIcon = styled.div<{ disabled: boolean }>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;

  path {
    stroke: ${({ theme, disabled }) =>
      disabled ? theme.color.gray1 : theme.color.primary.gray3};
  }
`

const DropdownList = styled.ul`
  position: absolute;
  top: 85%;
  left: 0;
  z-index: 1;

  box-sizing: border-box;
  padding: 0;
  width: 100%;
  max-height: 8rem;
  overflow-y: auto;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: 1px 1px 3px 0px rgba(97, 97, 97, 0.5);

  li {
    padding: 0.75rem;
  }

  li:hover {
    background-color: ${({ theme }) => theme.color.secondary.main};
    color: ${({ theme }) => theme.color.primary.dark};
  }
`

interface DropdownProps {
  options: Options[]
  defaultValue: string
  onChange: (option: string) => void
  placeholder?: string
  disabled?: boolean
  viewMode?: boolean
  textAlign?: TextAlign
}

function Dropdown({
  options,
  defaultValue,
  onChange,
  placeholder,
  disabled = false,
  viewMode = false,
  textAlign = 'center',
}: DropdownProps) {
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
    onChange(option)
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
        disabled={viewMode || disabled}
        placeholder={viewMode ? '' : placeholder}
        readOnly
        $textAlign={textAlign}
        $viewMode={viewMode}
        $isOpen={isOpen}
      />
      {!viewMode && (
        <ChevronIcon
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation()
            toggleDropdown()
          }}
        >
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </ChevronIcon>
      )}
      {!viewMode && isOpen && (
        <DropdownList>
          {options.map((item, index) => (
            <li key={index} onClick={() => selectOption(item.value)}>
              {item.label}
            </li>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  )
}

export default Dropdown
