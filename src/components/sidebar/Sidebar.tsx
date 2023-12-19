import { styled } from 'styled-components'
import FixedExpense from './FixedExpense'
import ExpectedLimit from './ExpectedLimit'
import { useQuery } from '@tanstack/react-query'
import isBetween from 'dayjs/plugin/isBetween'
import { useMonthYearContext } from '../context/MonthYearContext'
import { getFilteredCustom } from '../../utils/calendar'
import dayjs from 'dayjs'

dayjs.extend(isBetween)

const Container = styled.aside`
  width: 300px;
  background-color: #f6f6f6;
  padding: 1rem;
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
    </Container>
  )
}

export default Sidebar
