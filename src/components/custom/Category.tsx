import { ChangeEvent, KeyboardEvent, useState } from 'react'
import styled, { css } from 'styled-components'
import { CategoryType } from '../../types'
import { ReactComponent as Delete } from '../../assets/icons/exit.svg'
import { ReactComponent as AddIcon } from '../../assets/icons/plusIcon.svg'

const categoryStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0.5rem 0.5rem 0.75rem;
  border-radius: 1.43rem;

  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSize.sm};
`

const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const CategoryItem = styled.div<{ $isInputVisible?: boolean }>`
  ${categoryStyles}

  ${({ theme, $isInputVisible }) => css`
    background-color: ${$isInputVisible
      ? theme.color.white
      : theme.color.secondary.main};
    color: ${$isInputVisible ? theme.color.gray3 : theme.color.primary.dark};
    border: 1px solid
      ${$isInputVisible ? theme.color.primary.main : theme.color.secondary.main};
  `}


  & > input {
    outline: none;
    border: none;
    width: 1rem;
  }
`

const DeleteButton = styled(Delete)`
  width: 1rem;
  height: 1rem;
  cursor: pointer;

  path {
    stroke: ${({ theme }) => theme.color.primary.dark};
  }
`

const AddButton = styled.button`
  ${categoryStyles}

  border: 1px dashed ${({ theme }) => theme.color.primary.main};
  background-color: ${({ theme }) => theme.color.white};
  color: ${({ theme }) => theme.color.primary.dark};

  svg {
    width: 1rem;
    height: 1rem;

    path {
      stroke: ${({ theme }) => theme.color.primary.dark};
    }
  }

  &:disabled {
    border-color: ${({ theme }) => theme.color.gray0};
    color: ${({ theme }) => theme.color.gray0};

    svg > path {
      stroke: ${({ theme }) => theme.color.gray0};
    }
  }
`

interface CategoryProps {
  categories: string
  type: CategoryType
  onDelete: (index: number, type: CategoryType) => void
  currentValue: string
  onChange: (e: ChangeEvent<HTMLInputElement>, type: CategoryType) => void
  onKeyDown: (
    e: KeyboardEvent<HTMLInputElement>,
    type: CategoryType
  ) => void | boolean
  onCancle: (type: CategoryType) => void
}

const Category = ({
  categories,
  type,
  onDelete,
  currentValue,
  onChange,
  onKeyDown,
  onCancle,
}: CategoryProps) => {
  const categoriesArr = categories.split(',')
  const [isInputVisible, setIsInputVisible] = useState(false)

  const handleInputVisible = (isVisible: boolean) => {
    setIsInputVisible(isVisible)
  }

  const resizeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    if (context) {
      context.font = getComputedStyle(input).font

      // 문자열의 너비를 계산
      const textWidth = context.measureText(input.value).width

      // 최소 너비를 설정
      const minWidth = 16

      // 입력값이 없을 때는 최소 너비로 설정, 그 외에는 계산된 너비로 설정
      input.style.width = `${Math.max(textWidth, minWidth)}px`
    }
  }

  return (
    <CategoryContainer>
      {categoriesArr.length !== 0
        ? categoriesArr.map((category, index) => (
            <CategoryItem key={index}>
              <span>{category}</span>
              {
                // 카테고리가 1개이면 삭제 버튼 안보임
                categoriesArr.length !== 1 && (
                  <DeleteButton onClick={() => onDelete(index, type)} />
                )
              }
            </CategoryItem>
          ))
        : null}

      {isInputVisible ? (
        <CategoryItem $isInputVisible={isInputVisible}>
          <input
            type='text'
            value={currentValue}
            onChange={(e) => {
              onChange(e, type)
              resizeInput(e)
            }}
            onKeyDown={(e) => {
              const isValid = onKeyDown(e, type)
              if (isValid) handleInputVisible(false)
            }}
            autoFocus
          />
          <DeleteButton
            onClick={() => {
              handleInputVisible(false)
              onCancle(type)
            }}
          />
        </CategoryItem>
      ) : (
        <AddButton
          onClick={() => handleInputVisible(true)}
          disabled={categoriesArr.length === 10} // 카테고리 10개인 경우 disabled
        >
          추가하기 <AddIcon />
        </AddButton>
      )}
    </CategoryContainer>
  )
}

export default Category
