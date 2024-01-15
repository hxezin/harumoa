import { styled } from 'styled-components'
import { inputNumberWithComma } from '../../utils/accountBook'
import { useMonthYearContext } from '../context/MonthYearContext'
import * as S from './Sidebar.styled'

const TableContainer = styled.table`
  border-collapse: collapse;
  width: 100%;

  tr {
    width: 100%;
    color: ${({ theme }) => theme.color.gray2};
  }

  td {
    text-align: center;
    padding: 0.5rem;
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }

  td:last-child {
    text-align: right;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
`

const TotalContainer = styled.div`
  border-top: 1px solid ${({ theme }) => theme.color.gray3};
  color: ${({ theme }) => theme.color.black};

  display: flex;
  justify-content: space-between;
  // padding-top: 1rem;
  padding: 1rem 0.5rem 0;

  span {
    text-align: center;
    padding: 0.5rem 0.5rem 0;
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }

  span:last-child {
    text-align: right;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
`

const MonthlyFinancialOverview = () => {
  const { total } = useMonthYearContext()
  const incomePrice = total?.income_price || 0
  const expensePrice = total?.expense_price || 0

  const titleArr = ['총 수입', '총 지출']
  const contentArr = [incomePrice, expensePrice]

  return (
    <S.Container $isBackground>
      <TableContainer>
        <tbody>
          {titleArr.map((item, idx) => (
            <tr>
              <td>{item}</td>
              <td>{inputNumberWithComma(contentArr[idx])}₩</td>
            </tr>
          ))}
        </tbody>
      </TableContainer>

      <TotalContainer>
        <span>TOTAL</span>
        <span>{inputNumberWithComma(incomePrice - expensePrice)}₩</span>
      </TotalContainer>
    </S.Container>
  )
}

export default MonthlyFinancialOverview
