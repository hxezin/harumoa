import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAuthContext } from './context/AuthContext'

const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: 15px;
  padding: 10px;

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
      <p>{nickName} 🫡 </p>
      <Link to='/custom'>Custom</Link>
      <Link to='/profile'>Profile</Link>
      <button onClick={handleLogout}>Logout</button>
    </HeaderContainer>
  )
}

export default Header
