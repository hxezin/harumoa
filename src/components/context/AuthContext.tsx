import { createContext, useContext, useEffect, useState } from 'react'
import {
  LoginGoogle,
  LogoutGoogle,
  onUserStateChange,
} from '../../api/firebase'
import { UserCredential } from '@firebase/auth'
import { useLocation } from 'react-router-dom'

type Auth = {
  user: UserCredential['user'] | undefined
  login: () => void
  logout: () => Promise<boolean>
}

const AuthContext = createContext<Auth>({
  user: undefined,
  login: () => {},
  logout: () => Promise.resolve(false),
})

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<UserCredential['user']>()

  useEffect(() => {
    onUserStateChange((user: UserCredential['user']) => {
      if (user) {
        const nickName = user.email?.split('@')[0]

        nickName && localStorage.setItem('nickName', nickName)

        localStorage.setItem('user', user.uid)
        setUser(user)
      } else {
        localStorage.clear() //구글 로그인 풀렸을 경우 로컬 지워줌
      }
    })
  }, [])

  const login = async () => {
    const res = await LoginGoogle()

    setUser(res)
  }

  const logout = async () => {
    const res = await LogoutGoogle()
    return res
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  return useContext(AuthContext)
}
