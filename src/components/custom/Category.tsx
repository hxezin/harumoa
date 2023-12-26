import { ChangeEvent, KeyboardEvent } from 'react'
import styled from 'styled-components'
import { CategoryType } from '../../types'

const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  margin-bottom: 1rem;

  input {
    outline: none;
    border: none;
    width: 150px;
  }
`

const CategoryItem = styled.div`
  display: flex;
  justify-contents: space-between;
  align-items: center;
  gap: 0.5rem;
  background-color: #e0e0e0;
  padding: 0.1rem 0.5rem;
  border-radius: 0.5rem;
`

const DeleteButton = styled.button`
  padding: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;
`

interface CategoryProps {
  categories: string
  type: CategoryType
  isEdit?: boolean
  onDelete: (index: number, type: CategoryType) => void
  currentValue: string
  onChange: (e: ChangeEvent<HTMLInputElement>, type: CategoryType) => void
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>, type: CategoryType) => void
  placeholder: string
}

const Category = ({
  categories,
  type,
  isEdit,
  onDelete,
  currentValue,
  onChange,
  onKeyDown,
  placeholder,
}: CategoryProps) => {
  return (
    <CategoryContainer>
      {categories.length !== 0
        ? categories.split(',').map((category, index) => (
            <CategoryItem key={index}>
              <span>{category}</span>
              {isEdit && (
                <DeleteButton onClick={() => onDelete(index, type)}>
                  ❌
                </DeleteButton>
              )}
            </CategoryItem>
          ))
        : null}
      {isEdit && (
        <input
          type='text'
          value={currentValue}
          onChange={(e) => onChange(e, type)}
          onKeyDown={(e) => onKeyDown(e, type)}
          placeholder={placeholder}
          autoFocus
        />
      )}
    </CategoryContainer>
  )
}

export default Category
