import { styled } from 'styled-components'
import FixedExpense from './FixedExpense'
import ExpectedLimit from './ExpectedLimit'
import MonthlyFinancialOverview from './MonthlyFinancialOverview'
import useCustom from '../../hooks/custom/useCustom'

const Container = styled.section`
  display: flex;
  flex-direction: column;

  width: 300px;
  background-color: ${({ theme }) => theme.color.white2};

  height: calc(100vh - 70px);
`

const Title = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.extraBold};
  text-align: center;
  margin: 0;
  padding: 1.5rem 1.5rem 0;
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
      <Title>월간 가계부</Title>
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
