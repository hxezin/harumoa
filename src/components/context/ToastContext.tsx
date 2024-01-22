import React, { createContext, useContext, useState, useCallback } from 'react'
import Toast from '../common/Toast'

interface ToastContextProps {
  showToast: ({
    success,
    message,
  }: {
    success: boolean
    message: string
  }) => void
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined)

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  const showToast = useCallback(
    ({ success, message }: { success: boolean; message: string }) => {
      setMessage(message)
      setSuccess(success)
      setTimeout(() => {
        setMessage(null)
        setSuccess(false)
      }, 2000) // Toast가 2초 동안 표시되도록 설정
    },
    []
  )

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {message && <Toast isSuccess={success} content={message} />}
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
