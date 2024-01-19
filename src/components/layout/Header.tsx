import { Link, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAuthContext } from '../context/AuthContext'
import logo from '../../assets/images/logo.svg'
import settingIcon from '../../assets/icons/settingIcon.svg'
import theme from '../../assets/css/theme'
import { GrayBorderButton } from '../common/Button'

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0.5rem 1.5rem;
`

const HeaderLogoContainer = styled.div`
  cursor: pointer;

  font-weight: 700;
  font-size: 18px;
  color: #3de6fd;
`

const HeaderMenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 10px;

  a {
    color: #757575;

    &:hover {
      font-weight: 700;
    }
  }

  div {
    margin: auto;
    cursor: default;
  }

  span {
    margin: 0;
    color: ${({ theme }) => theme.color.gray1};
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  }

  span:nth-of-type(1) {
    color: ${({ theme }) => theme.color.primary.main};
  }

  a {
    display: flex;
  }
`

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const { logout } = useAuthContext()
  const nickName = localStorage.getItem('nickName')

  const handleLogoClick = () => {
    if (location.pathname.includes('/login') || location.pathname === '/') {
      return
    } else {
      navigate('/')
    }
  }

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
      <HeaderLogoContainer onClick={handleLogoClick}>
        <img src={logo} height='35px' />
      </HeaderLogoContainer>
      {nickName && (
        <HeaderMenuContainer>
          <div>
            <span>{nickName}</span> <span>의 하루 </span>
          </div>

          <GrayBorderButton
            value='로그아웃'
            onClick={handleLogout}
            fontSize={theme.fontSize.xs}
            padding='0.25rem 0.38rem'
          />

          <div>
            <Link to='/setting'>
              <img src={settingIcon} />
            </Link>
          </div>
        </HeaderMenuContainer>
      )}
    </HeaderContainer>
  )
}

export default Header
