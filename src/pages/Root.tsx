import { Outlet } from 'react-router-dom'
import Header from '../components/layout/Header'

const Root = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

export default Root
