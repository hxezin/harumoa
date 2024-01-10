import { Outlet } from 'react-router-dom'
import Header from '../components/layout/Header'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  max-width: 1440px;

  height: 100%;
  margin: auto;
`

const Root = () => {
  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  )
}

export default Root
