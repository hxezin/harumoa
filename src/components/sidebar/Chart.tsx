import styled from 'styled-components'
import CategoryChart from '../chart/CategoryChart'
import SixMonthChart from '../chart/SixMonthChart'
import { useMonthYear } from '../context/MonthYearContext'
import nextArrow from '../../assets/icons/nextArrow.svg'
import beforeArrow from '../../assets/icons/beforeArrow.svg'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const MonthlyContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 800px;
  gap: 1.5rem;
  justify-content: center;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  span:nth-of-type(1) {
    color: ${({ theme }) => theme.color.gray1};
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: ${({ theme }) => theme.fontWeight.extraBold};
  }

  span:nth-of-type(2) {
    color: ${({ theme }) => theme.color.black};
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: ${({ theme }) => theme.fontWeight.extraBold};
  }
`

const LocationButton = styled.button`
  border-radius: 0.15rem;
  background: #fcfcfc;
  box-shadow: 1.2px 1.2px 3.6px 0px rgba(97, 97, 97, 0.5);
  border: none;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Chart = () => {
  //차트 2개 컴포넌트 분리 후 불러오기
  const { data, monthYear, updateMonthYear } = useMonthYear()

  console.log(data)

  return (
    <Container>
      <MonthlyContainer>
        <LocationButton onClick={() => updateMonthYear(-1)}>
          <img src={beforeArrow} />
        </LocationButton>

        <div>
          <span>{monthYear.year}</span>
          <span>{monthYear.enMonth.toUpperCase()}</span>
        </div>

        <LocationButton onClick={() => updateMonthYear(1)}>
          <img src={nextArrow} />
        </LocationButton>
      </MonthlyContainer>

      <SixMonthChart />
      <CategoryChart data={data} />
    </Container>
  )
}

export default Chart
