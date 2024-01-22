import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  max-width: 1440px;

  height: 100%;
  margin: auto;
`

const RootContainer = ({ children }: { children: React.ReactNode }) => {
  return <Container>{children}</Container>
}
export default RootContainer
