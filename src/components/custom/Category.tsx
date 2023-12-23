import { useState, KeyboardEvent, ChangeEvent } from 'react'
import styled from 'styled-components'
import { CategoryType, ICategory } from '../../types'

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
  category: ICategory

  setCategory: (data: ICategory) => void

  isEdit: boolean
}

const Category = ({ category, setCategory, isEdit }: CategoryProps) => {
  const [currentCategory, setCurrentCategory] = useState<ICategory>({
    expense: '',
    income: '',
  })

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: CategoryType
  ) => {
    setCurrentCategory((prev) => ({ ...prev, [type]: e.target.value }))
  }

  const handleInputKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    type: CategoryType
  ) => {
    if (e.key === 'Enter' && currentCategory[type].trim() !== '') {
      setCategory({
        ...category,
        [type]: [
          ...category[type].split(','),
          currentCategory[type].trim(),
        ].join(','),
      })
      setCurrentCategory((prev) => ({ ...prev, [type]: '' }))
    }
  }

  const handleDelete = (index: number, type: CategoryType) => {
    setCategory({
      ...category,
      [type]: category[type]
        .split(',')
        .filter((_, i) => i !== index)
        .join(','),
    })
  }

  return (
    <section>
      <h3>카테고리</h3>
      <div>지출 카테고리</div>
      <CategoryContainer>
        {category.expense.length !== 0 &&
          category.expense.split(',').map((category, index) => (
            <CategoryItem key={index}>
              <span>{category}</span>
              {isEdit && (
                <DeleteButton onClick={() => handleDelete(index, 'expense')}>
                  ❌
                </DeleteButton>
              )}
            </CategoryItem>
          ))}
        {isEdit && (
          <input
            type='text'
            value={currentCategory.expense}
            onChange={(e) => handleInputChange(e, 'expense')}
            onKeyDown={(e) => handleInputKeyDown(e, 'expense')}
            placeholder='지출 카테고리 입력'
            autoFocus
          />
        )}
      </CategoryContainer>

      <div>수입 카테고리</div>
      <CategoryContainer>
        {category.income.length !== 0 &&
          category.income.split(',').map((category, index) => (
            <CategoryItem key={index}>
              <span>{category}</span>
              {isEdit && (
                <DeleteButton onClick={() => handleDelete(index, 'income')}>
                  ❌
                </DeleteButton>
              )}
            </CategoryItem>
          ))}
        {isEdit && (
          <input
            type='text'
            value={currentCategory.income}
            onChange={(e) => handleInputChange(e, 'income')}
            onKeyDown={(e) => handleInputKeyDown(e, 'income')}
            placeholder='수입 카테고리 입력'
          />
        )}
      </CategoryContainer>
    </section>
  )
}

export default Category
