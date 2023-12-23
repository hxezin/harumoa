import { useEffect, useRef, useState } from 'react'

interface UseDropdownProps {
  defaultSelectedValue: string
  onSelect: (value: string) => void
}

const useDropdown = ({ defaultSelectedValue, onSelect }: UseDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(defaultSelectedValue)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const closeDropdown = () => {
    setIsOpen(false)
  }

  const selectOption = (option: string) => {
    setSelectedValue(option)
    onSelect(option)
    closeDropdown()
  }

  useEffect(() => {
    //초기값 설정
    setSelectedValue(defaultSelectedValue)
  }, [defaultSelectedValue])

  useEffect(() => {
    // 외부 클릭에 대한 이벤트를 처리
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        closeDropdown()
      }
    }

    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  return {
    isOpen,
    selectedValue,
    toggleDropdown,
    dropdownRef,
    selectOption,
  }
}

export default useDropdown
