import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const NoDataChart = () => {
  return <Container>데이터가 없습니다.</Container>
}

export default NoDataChart
