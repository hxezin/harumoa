import { createContext, useContext, useEffect, useState } from 'react'
import {
  LoginGoogle,
  LogoutGoogle,
  onUserStateChange,
} from '../../api/firebase'
import { UserCredential } from '@firebase/auth'
import { queryClient } from '../../api/react-query'
import { useToast } from './ToastContext'

type Auth = {
  user: UserCredential['user'] | undefined
  login: () => void
  logout: () => Promise<{ success: boolean; message: string }>
  isLoggedIn: boolean
}

const AuthContext = createContext<Auth>({
  user: undefined,
  login: () => {},
  logout: () => Promise.resolve({ success: false, message: '' }),
  isLoggedIn: false,
})

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<UserCredential['user']>()
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user'))

  const { showToast } = useToast()

  useEffect(() => {
    onUserStateChange((user: UserCredential['user']) => {
      if (user) {
        const nickName = user.email?.split('@')[0]

        nickName && localStorage.setItem('nickName', nickName)

        localStorage.setItem('user', user.uid)

        setUser(user)
        setIsLoggedIn(true)
      } else {
        localStorage.clear() //구글 로그인 풀렸을 경우 로컬 지워줌
        queryClient.clear() // 리액트 쿼리 캐시 초기화
        setIsLoggedIn(false)
      }
    })
  }, [])

  const login = async () => {
    const res = await LoginGoogle()
    setUser(res.data)
    showToast({
      success: res.success,
      message: res.message,
    })
  }

  const logout = async () => {
    const res = await LogoutGoogle()
    return res
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  return useContext(AuthContext)
}
