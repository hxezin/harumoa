import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import styled from 'styled-components'

const Root = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

export default Root
