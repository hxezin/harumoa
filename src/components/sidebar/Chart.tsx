import styled from 'styled-components'
import CategoryChart from '../chart/CategoryChart'
import SixMonthChart from '../chart/SixMonthChart'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Chart = () => {
  //차트 2개 컴포넌트 분리 후 불러오기
  return (
    <Container>
      <SixMonthChart />
      <CategoryChart />
    </Container>
  )
}

export default Chart
