import styled from 'styled-components'
import { IExpectedLimit } from '../../types'
import { inputNumberWithComma } from '../../utils/\baccountBook'
import { useMonthYearContext } from '../context/MonthYearContext'
import SidebarTitle from './SidebarTitle'

const Indicator = styled.div<{ $isExcess: boolean }>`
  text-align: right;
  margin-bottom: 0.5rem;

  > span {
    color: ${({ $isExcess }) => ($isExcess ? 'red' : 'blue')};
  }
`

const Percentage = styled.div`
  width: 100%;
  height: 1rem;
  background-color: black;
`

const Fill = styled.div<{ width: string; $isExcess: boolean }>`
  height: 100%;
  width: ${(props) => props.width};
  background-color: ${({ $isExcess }) => ($isExcess ? 'red' : '#b2e7e8')};
`

interface Props {
  expectedLimit: IExpectedLimit
}

const ExpectedLimit = ({ expectedLimit }: Props) => {
  const { total } = useMonthYearContext()
  const { is_possible: isPossible, price } = expectedLimit
  const incomePrice = total?.income_price || 0
  const expensePrice = total?.expense_price || 0

  // (수입 - 지출) / 예상 한도
  const percentage = Math.round(
    (Math.abs(incomePrice - expensePrice) / price) * 100
  )

  const isExcess = percentage > 100 // 한도 초과 플래그
  const percentageWidth = isExcess ? 100 : percentage

  return isPossible ? (
    <section>
      <SidebarTitle title='예상 한도' />
      <Indicator $isExcess={isExcess}>
        <span>
          {inputNumberWithComma(Math.abs(incomePrice - expensePrice))}
        </span>{' '}
        / {inputNumberWithComma(price)}
      </Indicator>
      <Percentage>
        <Fill width={`${percentageWidth}%`} $isExcess={isExcess}></Fill>
      </Percentage>
    </section>
  ) : null
}

export default ExpectedLimit
