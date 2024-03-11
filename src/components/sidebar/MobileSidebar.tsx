import styled from 'styled-components'
import { initialCustom } from '../../constants/config'
import useCustom from '../../hooks/custom/useCustom'
import MobileSection from '../common/MobileSection'
import ExpectedLimit from './ExpectedLimit'
import FixedExpense from './FixedExpense'

const Container = styled.div`
  display: none;

  @media screen and (max-width: 780px) {
    display: block;
  }
`

const MobileSidebar = () => {
  const { custom } = useCustom()
  const expenseCategory =
    localStorage.getItem('category_expense') ?? initialCustom.category.expense

  const expectedLimitProps =
    custom?.expected_limit ?? initialCustom.expected_limit

  const { is_possible: expectedLimitisPossible } = expectedLimitProps

  return (
    <Container>
      {expectedLimitisPossible && (
        <MobileSection title='월별 예상 지출'>
          <ExpectedLimit expectedLimit={expectedLimitProps} />
        </MobileSection>
      )}

      <MobileSection title='고정 지출'>
        <FixedExpense
          fixedExpense={custom?.fixed_expense ?? initialCustom.fixed_expense}
          category={expenseCategory}
          enableExpectedLimit={
            custom?.expected_limit.is_possible ??
            initialCustom.expected_limit.is_possible
          }
        />
      </MobileSection>
    </Container>
  )
}

export default MobileSidebar
