import { styled } from 'styled-components'
import FixedExpense from './FixedExpense'
import ExpectedLimit from './ExpectedLimit'
import MonthlyFinancialOverview from './MonthlyFinancialOverview'
import useCustom from '../../hooks/custom/useCustom'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
`

const SubContainer = styled.div`
  section:first-child {
    margin-bottom: 1rem;
  }
`

const Sidebar = () => {
  const { custom, isLoading } = useCustom()

  // 로딩 스피너 추후 변경
  if (!custom || isLoading) return <div>Loading...</div>

  return (
    <Container>
      <FixedExpense
        fixedExpense={custom.fixed_expense}
        category={custom.category.expense}
      />
      <SubContainer>
        <ExpectedLimit expectedLimit={custom.expected_limit} />
        <MonthlyFinancialOverview />
      </SubContainer>
    </Container>
  )
}

export default Sidebar
