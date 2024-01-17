import { useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../components/context/AuthContext'
import background from '../assets/images/loginBackground.svg'
import Header from '../components/layout/Header'
import logo from '../assets/images/logo.svg'
import google from '../assets/images/googleLogin.svg'

const Container = styled.div`
  width: 100%;
  max-width: 1440px;

  height: 100%;
  margin: auto;

  position: relative;
`

const LoginContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;

  border-radius: 1rem;
  background: ${({ theme }) => theme.color.white};
  box-shadow: 2px 2px 8px 0px rgba(97, 97, 97, 0.5);

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

  img:last-child {
    cursor: pointer;
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
      <img
        src={background}
        style={{
          filter: 'blur(3px)',
        }}
      />
      <LoginContainer>
        <img src={logo} />
        <p>당신의 하루를 모아, 하루모아</p>

        <h1>LOGIN</h1>
        <img src={google} onClick={login} />
      </LoginContainer>
    </Container>
  )
}

export default Login
