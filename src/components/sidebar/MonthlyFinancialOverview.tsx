import { styled } from 'styled-components'
import { TotalPrice } from '../../types'
import { inputNumberWithComma } from '../../utils/\baccountBook'
import SidebarTitle from './SidebarTitle'

interface Props {
  custom: 'income' | 'expense' | 'revenue'
  total: TotalPrice
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

const MonthlyFinancialOverview = ({ custom, total }: Props) => {
  const incomePrice = total?.income_price || 0
  const expensePrice = total?.expense_price || 0

  return (
    <section>
      <SidebarTitle title='월간 개요' />
      <TableContainer>
        <tbody>
          <tr>
            <td>수입</td>
            <td>{inputNumberWithComma(incomePrice)}</td>
          </tr>
          <tr>
            <td>지출</td>
            <td>{inputNumberWithComma(expensePrice)}</td>
          </tr>
          <tr>
            <td>합계</td>
            <td>{inputNumberWithComma(incomePrice - expensePrice)}</td>
          </tr>
        </tbody>
      </TableContainer>
    </section>
  )
}

export default MonthlyFinancialOverview
