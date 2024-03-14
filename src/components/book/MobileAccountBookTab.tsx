import { useState } from 'react'
import styled, { css } from 'styled-components'
import { onlyMobile } from '../../assets/css/global'
import { IAccountBook, Options, CategoryType } from '../../types'
import { ReactComponent as NextArrow } from '../../assets/icons/nextArrow.svg'
import { inputNumberWithComma } from '../../utils/accountBook'
import useBottomSheet from '../../hooks/useBottomSheet'
import MobileAccountBookItem from './MobileAccountBookItem'
import DeleteButton from './DeleteButton'
import AddButton from './AddButton'
import Empty from '../common/Empty'

const Container = styled.div`
  ${onlyMobile}
`
const Tab = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`

const TabItem = styled.div<{ $isActive: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  padding: 0.3rem 0.5rem;
  cursor: pointer;

  ${({ theme, $isActive }) => css`
    color: ${$isActive ? theme.color.black : theme.color.gray2};
    border-bottom: ${$isActive ? `1px solid ${theme.color.black}` : 'none'};
  `};
`

const TabContentItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;

  .content-index {
    width: 5%;
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }

  .content-summary {
    width: 90%;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;

    & > span:first-of-type {
      font-size: ${({ theme }) => theme.fontSize.xs};
      color: ${({ theme }) => theme.color.gray1};
    }

    & > span:last-of-type {
      font-size: ${({ theme }) => theme.fontSize.sm};
      font-weight: ${({ theme }) => theme.fontWeight.bold};
    }
  }

  .detail-button {
    width: 5%;
  }
`

interface Props {
  accountBookData: IAccountBook
  onDelete: (key: string) => void
  onAdd: (type: CategoryType) => void
  setAccountBook?: React.Dispatch<React.SetStateAction<IAccountBook>>
  category: { [key: string]: Options[] }
  viewMode: boolean
}

const MobileAccountBookTab = ({
  accountBookData,
  onDelete,
  onAdd,
  setAccountBook,
  category,
  viewMode,
}: Props) => {
  const [currentTab, setCurrentTab] = useState<CategoryType>('income')
  const { BottomSheet, openBottomSheet, closeBottomSheet } = useBottomSheet()
  const [selectedBook, setSelectedBook] = useState<string | null>(null)

  function handleItemClick(id: string) {
    setSelectedBook(id)
    openBottomSheet()
  }

  const handleTabClick = (type: CategoryType) => {
    setCurrentTab(type)
  }

  return (
    <Container>
      <Tab>
        <TabItem
          $isActive={currentTab === 'income'}
          onClick={() => handleTabClick('income')}
        >
          수입
        </TabItem>
        <TabItem
          $isActive={currentTab === 'expense'}
          onClick={() => handleTabClick('expense')}
        >
          지출
        </TabItem>
      </Tab>

      <div>
        {accountBookData &&
          Object.entries(accountBookData)
            .filter(([, val]) => val.is_income === (currentTab === 'income'))
            .map(([key, val], idx) => (
              <TabContentItem key={key} onClick={() => handleItemClick(key)}>
                <div className='content-index'>
                  {viewMode ? (
                    idx + 1
                  ) : (
                    <DeleteButton onClick={() => onDelete(key)} />
                  )}
                </div>
                <div className='content-summary'>
                  <span>{val.category}</span>
                  <span>{inputNumberWithComma(val.price)}원</span>
                </div>
                <div className='detail-button'>
                  <NextArrow />
                </div>
              </TabContentItem>
            ))}

        {/* 데이터가 없을 때 비어있음 표시 */}
        {viewMode &&
          (!accountBookData ||
          Object.values(accountBookData).filter(
            (val) => val.is_income === (currentTab === 'income')
          ).length === 0 ? (
            <Empty />
          ) : null)}
      </div>

      {!viewMode && <AddButton onClick={() => onAdd(currentTab)} />}

      {selectedBook !== null && (
        <BottomSheet>
          <MobileAccountBookItem
            id={selectedBook}
            accountBook={accountBookData}
            setAccountBook={setAccountBook}
            category={
              currentTab === 'income' ? category.income : category.expense
            }
            viewMode={viewMode}
            onClose={closeBottomSheet}
          />
        </BottomSheet>
      )}
    </Container>
  )
}

export default MobileAccountBookTab
