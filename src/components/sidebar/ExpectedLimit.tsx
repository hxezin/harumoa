import styled from 'styled-components'
import { IExpectedLimit } from '../../types'
import { inputNumberWithComma } from '../../utils/accountBook'
import { useMonthYearContext } from '../context/MonthYearContext'
import * as S from './Sidebar.styled'

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`

const IndicatorContainer = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    flex-direction: column;

    color: ${({ theme }) => theme.color.gray1};
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`

const IndicatorSpan = styled.span<{ $isExcess?: boolean }>`
  ${({ theme, $isExcess }) =>
    $isExcess
      ? `color: ${theme.color.primary.main}; font-size: ${theme.fontSize.base}; font-weight: ${theme.fontWeight.bold};`
      : `font-weight: ${theme.fontWeight.bold};`};

  @media screen and (max-width: 780px) {
    font-size: ${({ theme, $isExcess }) =>
      $isExcess ? theme.fontSize.sm : theme.fontSize.xs};
  }
`

const Percentage = styled.div`
  height: 0.7rem;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.gray0};

  padding: 4px;
`

const Fill = styled.div<{ width: string; $isExcess: boolean }>`
  height: 100%;
  border-radius: 10px;
  width: ${(props) => props.width};
  background-color: ${({ $isExcess, theme }) =>
    $isExcess ? theme.color.red.main : theme.color.primary.main};
`

interface Props {
  expectedLimit: IExpectedLimit
}

const ExpectedLimit = ({ expectedLimit }: Props) => {
  const { total } = useMonthYearContext()
  const { is_possible: isPossible, price } = expectedLimit
  const expensePrice = total?.expense_price || 0

  const percentage = Math.round((expensePrice / price) * 100)
  const isExcess = percentage > 100 // 한도 초과 플래그
  const percentageWidth = isExcess ? 100 : percentage

  return isPossible ? (
    <S.Container>
      <S.TitleContainer>
        <span>월별 예상 지출</span>
      </S.TitleContainer>

      <ContentContainer>
        <IndicatorContainer>
          <div>
            <IndicatorSpan $isExcess>
              {inputNumberWithComma(expensePrice)}원
            </IndicatorSpan>
            실제 사용량
          </div>
          <div>
            <IndicatorSpan>{inputNumberWithComma(price)}원</IndicatorSpan>
            월별 예상 지출
          </div>
        </IndicatorContainer>

        <Percentage>
          <Fill width={`${percentageWidth}%`} $isExcess={isExcess}></Fill>
        </Percentage>
      </ContentContainer>
    </S.Container>
  ) : null
}

export default ExpectedLimit
