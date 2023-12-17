import { styled } from 'styled-components'
import FixedExpense from './FixedExpense'
import ExpectedLimit from './ExpectedLimit'
import { useQuery } from '@tanstack/react-query'
import { getCustom } from '../../api/firebase'

const Container = styled.aside`
  width: 300px;
  background-color: #f6f6f6;
  padding: 1rem;
`

interface CustomResponse {
  category: string
  daily_result: 'income' | 'expense' | 'revenue'
  expected_limit: {
    is_possible: boolean
    price: number
  }
}

const Sidebar = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['custom'],
    queryFn: () => getCustom(),
  })

  if (!data || isLoading) return <div>Loading...</div>

  const { expected_limit: expectedLimit, daily_result: dailyResult } = data

  return (
    <Container>
      <FixedExpense />
      <ExpectedLimit expectedLimit={expectedLimit} />
    </Container>
  )
}

export default Sidebar
