import { uuidv4 } from '@firebase/util'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { initialCustom } from '../../constants/config'
import useCustom from '../../hooks/custom/useCustom'
import useBottomSheet from '../../hooks/useBottomSheet'
import MobileSection from '../common/MobileSection'
import ExpectedLimit from './ExpectedLimit'
import FixedExpense from './FixedExpense'
import MobileFixedExpenseItem from './MobileFixedExpenseItem'

const Container = styled.div`
  display: none;

  @media screen and (max-width: 780px) {
    display: block;
  }
`

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  button {
    border: none;
    background: transparent;
    margin-right: 0.5rem;

    color: ${({ theme }) => theme.color.gray1};
  }
`

const MobileSidebar = () => {
  const { custom } = useCustom()
  const expenseCategory =
    localStorage.getItem('category_expense') ?? initialCustom.category.expense

  const expectedLimitProps =
    custom?.expected_limit ?? initialCustom.expected_limit

  const { is_possible: expectedLimitisPossible } = expectedLimitProps

  const [newId, setNewId] = useState<string>('')
  const [newFixedExpense, setNewFixedExpense] = useState({})
  const { BottomSheet, openBottomSheet, closeBottomSheet } = useBottomSheet()
  const category =
    localStorage.getItem('category_expense') ?? initialCustom.category.expense

  useEffect(() => {
    // newId가 변경될 때 newFixedExpense 초기화
    setNewFixedExpense(
      newId === ''
        ? {}
        : {
            [newId]: {
              payment_period: {
                start_date: dayjs().format('YYYY-MM-DD'),
                end_date: dayjs().add(1, 'year').format('YYYY-MM-DD'),
              },
              payment_day: '1',
              category: category.split(',')[0],
              memo: '',
              price: 0,
              payment_type: '',
            },
          }
    )
  }, [newId])

  const handleAddClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation()
    const newId = uuidv4()
    setNewId(newId)
    openBottomSheet()
  }

  return (
    <Container>
      {expectedLimitisPossible && (
        <MobileSection title='월별 예상 지출'>
          <ExpectedLimit expectedLimit={expectedLimitProps} />
        </MobileSection>
      )}

      <MobileSection
        title={
          <TitleContainer>
            <h5>고정 지출</h5>
            <button onClick={handleAddClick}>추가하기</button>
          </TitleContainer>
        }
      >
        <FixedExpense
          fixedExpense={custom?.fixed_expense ?? initialCustom.fixed_expense}
          category={expenseCategory}
          enableExpectedLimit={
            custom?.expected_limit.is_possible ??
            initialCustom.expected_limit.is_possible
          }
        />
      </MobileSection>

      {/* 고정 지출 추가 Bottom Sheet */}
      {newId !== '' && (
        <BottomSheet>
          <MobileFixedExpenseItem
            id={newId}
            data={newFixedExpense}
            setData={setNewFixedExpense}
            category={category}
            onClose={() => {
              closeBottomSheet()
              setNewId('')
            }}
            viewMode={false}
          />
        </BottomSheet>
      )}
    </Container>
  )
}

export default MobileSidebar
