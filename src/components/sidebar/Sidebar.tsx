import { styled } from 'styled-components'
import FixedExpense from './FixedExpense'
import ExpectedLimit from './ExpectedLimit'
import { useQuery } from '@tanstack/react-query'
import { useMonthYearContext } from '../context/MonthYearContext'
import { getFilteredCustom } from '../../utils/calendar'
import MonthlyFinancialOverview from './MonthlyFinancialOverview'

const Container = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 300px;
  background-color: #f6f6f6;
  padding: 1rem;
  height: calc(100vh - 70px);
  overflow-y: auto;

  section {
    flex: 1;
    border: 1px solid #c2c2c2;
    padding: 1rem;
  }

  section:first-child {
    flex: 1 0 50%;
  }
`

const Sidebar = () => {
  const { monthYear, total } = useMonthYearContext()

  const { data, isLoading } = useQuery({
    queryKey: ['custom', monthYear.year, monthYear.month],
    queryFn: () => getFilteredCustom(monthYear.year, monthYear.month),
  })

  // 로딩 스피너 추후 변경
  if (!data || isLoading) return <div>Loading...</div>

  return (
    <Container>
      <FixedExpense fixedExpense={data.fixed_expense} />
      <ExpectedLimit expectedLimit={data.expected_limit} total={total} />
      <MonthlyFinancialOverview custom={data.daily_result} total={total} />
    </Container>
  )
}

export default Sidebar
