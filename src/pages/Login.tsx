import { useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../components/context/AuthContext'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const LoginContainer = styled.div`
  border: 1px solid #eeeeee;

  padding: 20px;
  border-radius: 10px;

  p {
    text-align: center;
    font-size: 1.125rem;
    font-weight: 700;
    margin: 0;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;

    input {
      width: 320px;
      padding: 10px;
      margin-top: 10px;
    }

    span {
      font-size: 0.75rem;
      color: #ff0000;
      margin-top: 5px;
    }

    button {
      margin-top: 20px;
      padding: 10px;
    }
  }
`

interface LoginFormType {
  id: string
  password: string
}

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
      <LoginContainer>
        <p>Haru Moa</p>

        <button onClick={login}>login</button>
      </LoginContainer>
    </Container>
  )
}

export default Login
