import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { LogoutGoogle } from '../api/firebase'

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
`

const Header = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    const res = await LogoutGoogle()

    if (res) {
      navigate('/login')
    } else {
      //error 처리
    }
  }

  return (
    <HeaderContainer>
      <Link to='/custom'>Custom</Link>
      <Link to='/profile'>Profile</Link>
      <button onClick={handleLogout}>Logout</button>
    </HeaderContainer>
  )
}

export default Header
