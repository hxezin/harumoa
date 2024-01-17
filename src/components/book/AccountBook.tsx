import { CategoryType, IAccountBook } from '../../types'
import styled from 'styled-components'
import uuid from 'react-uuid'
import { formatSelectOptions } from '../../utils'
import Section from '../common/Section'
import AddButton from './AddButton'
import AccountBookTable from './AccountBookTable'

const Guidance = styled.p`
  margin-top: -1rem;
  color: ${({ theme }) => theme.color.red.main};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`

const Box = styled.div`
  // 수입, 지출 제목
  & > div:first-of-type {
    color: ${({ theme }) => theme.color.gray2};
    margin-bottom: 1rem;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
`

const incomeDefault = [
  { label: '월급', value: '월급' },
  { label: '용돈', value: '용돈' },
  { label: '이월', value: '이월' },
  { label: '기타', value: '기타' },
]

const expenseDefault = [
  { label: '식비', value: '식비' },
  { label: '쇼핑', value: '쇼핑' },
  { label: '생활비', value: '생활비' },
  { label: '교통비', value: '교통비' },
]

interface AccountBookProps {
  setAccountBook?: React.Dispatch<React.SetStateAction<IAccountBook>>
  accountBookData: IAccountBook
  viewMode: boolean
}

const AccountBook = ({
  setAccountBook,
  accountBookData,
  viewMode,
}: AccountBookProps) => {
  const categoryIncome = localStorage.getItem('category_income')
  const categoryExpense = localStorage.getItem('category_expense')

  const incomeSelect = categoryIncome
    ? formatSelectOptions(categoryIncome.split(','))
    : incomeDefault

  const expenseSelect = categoryExpense
    ? formatSelectOptions(categoryExpense.split(','))
    : expenseDefault

  const AddAccountBookItem = (type: CategoryType) => {
    //가계부 아이템 하나 추가
    setAccountBook &&
      setAccountBook((prev) => ({
        ...prev,
        [uuid()]: {
          is_income: type === 'income' ? true : false,
          price: 0,
          category:
            type === 'income' ? incomeSelect[0].value : expenseSelect[0].value,
          memo: '',
          payment_type: 'cash',
        },
      }))
  }

  const deleteAccountBookItem = (key: string) => {
    //가계부 아이템 하나 삭제

    if (accountBookData) {
      delete accountBookData[key] //객체 삭제

      setAccountBook && setAccountBook({ ...accountBookData }) //데이터 다시 세팅
    }
  }

  return (
    <Section title='가계부 작성하기'>
      <Guidance>최소 하나의 항목은 추가해주세요.</Guidance>

      <Box>
        <div>수입</div>
        <AccountBookTable
          accountBookData={accountBookData}
          category={incomeSelect}
          onDelete={deleteAccountBookItem}
          setAccountBook={setAccountBook}
          viewMode={viewMode}
          isIncome={true}
        />
        {!viewMode && (
          <AddButton onClick={() => AddAccountBookItem('income')} />
        )}
      </Box>

      <Box>
        <div>지출</div>
        <AccountBookTable
          accountBookData={accountBookData}
          category={expenseSelect}
          onDelete={deleteAccountBookItem}
          setAccountBook={setAccountBook}
          viewMode={viewMode}
          isIncome={false}
        />
        {!viewMode && (
          <AddButton onClick={() => AddAccountBookItem('expense')} />
        )}
      </Box>
    </Section>
  )
}

export default AccountBook
