import { Link } from 'react-router-dom'
import styled from 'styled-components'

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
  return (
    <HeaderContainer>
      <Link to='/custom'>Custom</Link>
      <Link to='/profile'>Profile</Link>
    </HeaderContainer>
  )
}

export default Header
