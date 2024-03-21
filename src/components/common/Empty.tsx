import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.color.gray1};
`

const Empty = () => {
  return <Container>비어있음</Container>
}

export default Empty
