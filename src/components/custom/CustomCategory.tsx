import { useState, KeyboardEvent, ChangeEvent } from 'react'
import { CategoryType, ICategory } from '../../types'
import Category from './Category'

interface Props {
  category: ICategory
  setCategory: (data: ICategory) => void
  isEdit: boolean
}

const CustomCategory = ({ category, setCategory, isEdit }: Props) => {
  const [currentInput, setCurrentInput] = useState<ICategory>({
    expense: '',
    income: '',
  })

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: CategoryType
  ) => {
    setCurrentInput((prev) => ({ ...prev, [type]: e.target.value }))
  }

  const handleInputKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    type: CategoryType
  ) => {
    if (
      e.key === 'Enter' &&
      currentInput[type].trim() !== '' &&
      e.nativeEvent.isComposing === false // 한글 입력 시 이벤트 두 번 실행 방지
    ) {
      setCategory({
        ...category,
        [type]: [...category[type].split(','), currentInput[type].trim()].join(
          ','
        ),
      })
      setCurrentInput((prev) => ({ ...prev, [type]: '' }))
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
      <Category
        categories={category.expense}
        type='expense'
        isEdit={isEdit}
        onDelete={handleDelete}
        currentValue={currentInput.expense}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder='지출 카테고리를 입력하세요.'
      />

      <div>수입 카테고리</div>
      <Category
        categories={category.income}
        type='income'
        isEdit={isEdit}
        onDelete={handleDelete}
        currentValue={currentInput.income}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder='수입 카테고리를 입력하세요.'
      />
    </section>
  )
}

export default CustomCategory
