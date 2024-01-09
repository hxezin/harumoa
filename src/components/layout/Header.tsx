import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAuthContext } from '../context/AuthContext'
import logo from '../../assets/images/logo.svg'

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 10px;
`

const HeaderLogoContainer = styled.div`
  cursor: pointer;

  font-weight: 700;
  font-size: 18px;
  color: #3de6fd;
`

const HeaderMenuContainer = styled.div`
  display: flex;
  column-gap: 10px;

  a {
    color: #757575;

    &:hover {
      font-weight: 700;
    }
  }

  p {
    margin: 0;
    color: #757575;
  }
`

const Header = () => {
  const navigate = useNavigate()

  const { logout } = useAuthContext()
  const nickName = localStorage.getItem('nickName')

  const handleLogout = async () => {
    const res = await logout()

    if (res) {
      navigate('/login')
      localStorage.clear()
    } else {
      //error 처리
    }
  }

  return (
    <HeaderContainer>
      <HeaderLogoContainer onClick={() => navigate('/')}>
        <img src={logo} height='40px' />
      </HeaderLogoContainer>
      <HeaderMenuContainer>
        <p>{nickName} 🫡 </p>
        <Link to='/setting'>Setting</Link>
        <button onClick={handleLogout}>Logout</button>
      </HeaderMenuContainer>
    </HeaderContainer>
  )
}

export default Header
