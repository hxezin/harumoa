import { useState, KeyboardEvent, ChangeEvent } from 'react'
import { CategoryType, ICategory } from '../../types'
import SectionItem from '../common/SectionItem'
import Category from './Category'

interface Props {
  category: ICategory
  setCategory: (data: ICategory) => void
  isEdit: boolean
}

const guidance =
  '기본으로 4개의 카테고리가 제공되며, 최대 10개까지 추가 가능합니다.'

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
      handleInitInput(type)
      return true
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

  const handleInitInput = (type: CategoryType) => {
    setCurrentInput((prev) => ({ ...prev, [type]: '' }))
  }

  return (
    <>
      <SectionItem
        title={
          <>
            <span>수입</span> 카테고리 설정
          </>
        }
        guidance={guidance}
        justifyContent='flex-start'
      >
        <Category
          categories={category.income}
          type='income'
          onDelete={handleDelete}
          currentValue={currentInput.income}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onCancle={handleInitInput}
        />
      </SectionItem>

      <SectionItem
        title={
          <>
            <span>지출</span> 카테고리 설정
          </>
        }
        guidance={guidance}
        justifyContent='flex-start'
      >
        <Category
          categories={category.expense}
          type='expense'
          onDelete={handleDelete}
          currentValue={currentInput.expense}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onCancle={handleInitInput}
        />
      </SectionItem>
    </>
  )
}

export default CustomCategory
