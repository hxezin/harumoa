import { styled } from 'styled-components'
import { inputNumberWithComma } from '../../utils/\baccountBook'
import { useMonthYearContext } from '../context/MonthYearContext'
import SidebarTitle from './SidebarTitle'

interface Props {
  custom: 'income' | 'expense' | 'revenue'
}

const TableContainer = styled.table`
  border: 1px solid black;
  border-collapse: collapse;
  width: 100%;

  tr {
    width: 100%;
  }

  td {
    border: 1px solid #c2c2c2;
    text-align: center;
    padding: 0.5rem;
  }

  tr > td:last-child {
    width: 80%;
    text-align: right;
  }
`

const MonthlyFinancialOverview = ({ custom }: Props) => {
  const { total } = useMonthYearContext()
  const incomePrice = total?.income_price || 0
  const expensePrice = total?.expense_price || 0

  return (
    <section>
      <SidebarTitle title='월간 개요' />
      <TableContainer>
        <tbody>
          {custom === 'expense' ? null : (
            <tr>
              <td>수입</td>
              <td>{inputNumberWithComma(incomePrice)}</td>
            </tr>
          )}
          {custom === 'income' ? null : (
            <tr>
              <td>지출</td>
              <td>{inputNumberWithComma(expensePrice)}</td>
            </tr>
          )}
          {custom === 'revenue' && (
            <tr>
              <td>합계</td>
              <td>{inputNumberWithComma(incomePrice - expensePrice)}</td>
            </tr>
          )}
        </tbody>
      </TableContainer>
    </section>
  )
}

export default MonthlyFinancialOverview