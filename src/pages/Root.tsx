import { Outlet } from 'react-router-dom'
import Header from '../components/layout/Header'
import RootContainer from '../components/layout/RootContainer'

const Root = () => {
  return (
    <RootContainer>
      <Header />
      <Outlet />
    </RootContainer>
  )
}

export default Root
