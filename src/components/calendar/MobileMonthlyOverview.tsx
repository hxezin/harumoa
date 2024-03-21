import { useState } from 'react'
import { styled } from 'styled-components'
import { inputNumberWithComma } from '../../utils/accountBook'
import { useMonthYearContext } from '../context/MonthYearContext'
import { ReactComponent as ChevronUp } from '../../assets/icons/chevronUp.svg'
import { ReactComponent as ChevronDown } from '../../assets/icons/chevronDown.svg'
import { onlyMobile } from '../../assets/css/global'

const Container = styled.div`
  ${onlyMobile}
  margin: 1rem 0%;
`

const TotalBox = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};

  span:first-child {
    margin-right: 0.5rem;
  }

  svg {
    width: 0.8rem;
    height: 0.8rem;
  }
`

const OverviewBox = styled.table`
  margin-top: 0.3rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.color.gray2};

  tr {
    display: flex;
    gap: 0.5rem;
  }
`

const MobileMonthlyOverview = () => {
  const [isShow, setIsShow] = useState(false)
  const { total } = useMonthYearContext()
  const incomePrice = total?.income_price || 0
  const expensePrice = total?.expense_price || 0

  const titleArr = ['총 수입', '총 지출']
  const contentArr = [incomePrice, expensePrice]

  return (
    <Container>
      <TotalBox>
        <span>{inputNumberWithComma(incomePrice - expensePrice)}원</span>
        <span onClick={() => setIsShow(!isShow)}>
          {isShow ? <ChevronUp /> : <ChevronDown />}
        </span>
      </TotalBox>
      {isShow && (
        <OverviewBox>
          <tbody>
            {titleArr.map((item, idx) => (
              <tr key={idx}>
                <td>{item}: </td>
                <td>
                  {idx === 1 && contentArr[idx] !== 0 && '-'}
                  {inputNumberWithComma(contentArr[idx])}원
                </td>
              </tr>
            ))}
          </tbody>
        </OverviewBox>
      )}
    </Container>
  )
}

export default MobileMonthlyOverview
