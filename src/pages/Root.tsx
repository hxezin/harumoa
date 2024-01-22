import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../components/context/AuthContext'
import Header from '../components/layout/Header'
import RootContainer from '../components/layout/RootContainer'

const Root = () => {
  const { isLoggedIn, logout } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      logout()
      navigate('/login')
    }
  }, [isLoggedIn, logout, navigate])

  return (
    <RootContainer>
      <Header />
      <Outlet />
    </RootContainer>
  )
}

export default Root
