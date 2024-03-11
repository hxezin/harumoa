import { Link, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAuthContext } from '../context/AuthContext'
import logo from '../../assets/images/logo.svg'
import settingIcon from '../../assets/icons/settingIcon.svg'
import theme from '../../assets/css/theme'
import { GrayBorderButton } from '../common/Button'
import { useToast } from '../context/ToastContext'
import userIcon from '../../assets/icons/userIcon.svg'
import { useEffect, useRef, useState } from 'react'

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

  @media screen and (max-width: 780px) {
    display: none;
  }
`

const MobileMenuContainer = styled.div`
  display: none;

  @media screen and (max-width: 780px) {
    display: block;
    font-size: ${({ theme }) => theme.fontSize.xs};
    color: ${({ theme }) => theme.color.gray1};

    a {
      color: ${({ theme }) => theme.color.gray1};
    }

    span {
      font-size: ${({ theme }) => theme.fontSize.sm};
      margin: 0;
      font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    }

    span:nth-of-type(1) {
      color: ${({ theme }) => theme.color.primary.main};
    }

    > div {
      position: absolute;
      top: 50px;
      right: 23px;
      z-index: 33;
      background: ${({ theme }) => theme.color.white};
      padding: 1rem;
      border: 1px solid ${({ theme }) => theme.color.gray1};
      border-radius: 10px;
      line-height: 1.5rem;

      > div:first-child {
        border-bottom: 1px solid ${({ theme }) => theme.color.gray0};
        margin-bottom: 1rem;
      }
    }
  }
`

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const { logout } = useAuthContext()
  const nickName = localStorage.getItem('nickName')

  const { showToast } = useToast()

  const handleLogoClick = () => {
    if (location.pathname.includes('/login') || location.pathname === '/') {
      return
    } else {
      navigate('/')
    }
  }

  const handleLogout = async () => {
    const res = await logout()

    if (res.success) {
      navigate('/login')
      localStorage.clear()
      showToast(res)
    } else {
      //error 처리
      showToast(res)
    }
  }

  const [show, setShow] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 외부 클릭에 대한 이벤트를 처리
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShow(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

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
      <MobileMenuContainer ref={menuRef}>
        <img
          src={userIcon}
          width={24}
          height={24}
          onClick={() => {
            setShow(true)
          }}
        />

        {show && (
          <div>
            <div>
              <span>{nickName}</span> <span>의 하루 </span>
            </div>
            <Link to='/setting' onClick={() => setShow(false)}>
              설정
            </Link>
            <div onClick={handleLogout}>로그아웃</div>
          </div>
        )}
      </MobileMenuContainer>
    </HeaderContainer>
  )
}

export default Header
