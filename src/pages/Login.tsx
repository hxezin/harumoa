import { useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../components/context/AuthContext'
import Header from '../components/layout/Header'
import logo from '../assets/images/logo.svg'
import { ReactComponent as GoogleIcon } from '../assets/images/google.svg'
import loginIntro from '../assets/images/loginIntro.svg'

const Container = styled.div`
  width: 100%;
  max-width: 1440px;

  margin: auto;
`

const LoginIntroContainer = styled.div`
  display: flex;
  align-items: center;

  padding-left: 1.5rem;
  height: ${({ theme }) => `calc(100vh - ${theme.layout.headerHeight})`};

  & > img {
    width: 60%;
    box-shadow: 3px 3px 5px #edeaea;

    border-top-right-radius: 3%;
    border-bottom-right-radius: 3%;
  }
`

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;

    border-radius: 1rem;
    background: ${({ theme }) => theme.color.white};
    box-shadow: 2px 2px 8px 0px #edeaea;

    padding: 3rem;
    p {
      text-align: center;
      color: ${({ theme }) => theme.color.primary.main};
      font-size: ${({ theme }) => theme.fontSize.base};
      font-weight: ${({ theme }) => theme.fontWeight.semiBold};
      margin: 0;
      margin-bottom: 3rem;
    }

    h1 {
      color: ${({ theme }) => theme.color.primary.main};
      font-size: ${({ theme }) => theme.fontSize.lg};
      font-weight: ${({ theme }) => theme.fontWeight.extraBold};
      text-align: center;
    }
  }
`

const LoginButton = styled.button`
  background: ${({ theme }) => theme.color.primary.main};
  border: none;
  padding: 0px;
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.color.white};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.extraBold};

  padding: 0.7rem;

  svg {
    width: 1rem;
    height: 1rem;

    padding: 0.5rem;
    border-radius: 50%;
    background: #fcfcfc;
  }
`

const Login = () => {
  const { user, login } = useAuthContext()

  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('nickName')) {
      //로그인 유저 막기
      navigate('/')
    }
  }, [user])

  return (
    <Container>
      <Header />

      <LoginIntroContainer>
        <img src={loginIntro} />
        <LoginContainer>
          <div>
            <img src={logo} />
            <p>당신의 하루를 모아, 하루모아</p>

            <h1>LOGIN</h1>

            <LoginButton onClick={login}>
              <GoogleIcon />
              <span> Sign in with Google</span>
            </LoginButton>
          </div>
        </LoginContainer>
      </LoginIntroContainer>
    </Container>
  )
}

export default Login
