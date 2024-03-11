import { styled } from 'styled-components'
import FixedExpense from './FixedExpense'
import ExpectedLimit from './ExpectedLimit'
import MonthlyFinancialOverview from './MonthlyFinancialOverview'
import useCustom from '../../hooks/custom/useCustom'
import { initialCustom } from '../../constants/config'
import { BlueBorderButton } from '../common/Button'
import useModal from '../../hooks/useModal'
import Chart from './Chart'
import Modal from '../common/Modal'

const Container = styled.section`
  display: flex;
  flex-direction: column;

  width: 300px;
  background-color: ${({ theme }) => theme.color.white2};

  @media screen and (max-width: 780px) {
    display: none;
  }
`

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

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
  const { custom } = useCustom()
  const expenseCategory =
    localStorage.getItem('category_expense') ?? initialCustom.category.expense

  const { isOpen, onClose, onOpen } = useModal()

  return (
    <Container>
      <Title>
        <span>월간 가계부</span>
        <BlueBorderButton
          value='월별 분석'
          onClick={onOpen}
          padding='0.3rem 0.7rem'
          fontSize='xs'
        />
      </Title>
      <FixedExpense
        fixedExpense={custom?.fixed_expense ?? initialCustom.fixed_expense}
        category={expenseCategory}
        enableExpectedLimit={
          custom?.expected_limit.is_possible ??
          initialCustom.expected_limit.is_possible
        }
      />
      <SubContainer>
        <ExpectedLimit
          expectedLimit={custom?.expected_limit ?? initialCustom.expected_limit}
        />
        <MonthlyFinancialOverview />
      </SubContainer>
      {isOpen && (
        <Modal onClose={onClose}>
          <Chart />
        </Modal>
      )}
    </Container>
  )
}

export default Sidebar
