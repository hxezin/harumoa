import React, { useEffect, useState, createContext, useContext } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { getBooks } from '../../api/firebase'
import {
  getMonthDetails,
  getMonthYearDetails,
  getNewMonthYear,
  MonthYear,
} from '../../utils/calendar'
import { Books, TotalPrice } from '../../types'
import { useAuthContext } from './AuthContext'

interface MonthYearProps {
  data: Books
  monthYear: MonthYear
  prevMonthLastDate: number
  updateMonthYear: (monthIncrement: number) => void
  total: TotalPrice
  isToday: (date: string) => boolean
}

// useMonthYear custom hooks
function useMonthYear(): MonthYearProps {
  const { isLoggedIn } = useAuthContext()
  const queryClient = useQueryClient()

  const currentDate = dayjs()
  const currentMonthYear = getMonthYearDetails(currentDate)

  const [monthYear, setMonthYear] = useState(currentMonthYear)
  const prevMonth = getMonthDetails(monthYear.startDate.subtract(1, 'month'))

  const fallback = {}
  const { data = fallback, refetch } = useQuery({
    queryKey: ['books', monthYear.year, monthYear.month],
    queryFn: () => getBooks(monthYear.year, monthYear.month),
    enabled: isLoggedIn, // isLoggedIn이 true일 때만 쿼리를 활성화
  })

  useEffect(() => {
    if (isLoggedIn) {
      // 로그인 상태가 변경되었을 때만 refetch 함수를 호출
      refetch()
    }
  }, [isLoggedIn, refetch])

  useEffect(() => {
    const prevMonthYear = getNewMonthYear(monthYear, -1)
    queryClient.prefetchQuery({
      queryKey: ['books', prevMonthYear.year, prevMonthYear.month],
      queryFn: () => getBooks(prevMonthYear.year, prevMonthYear.month),
    })
  }, [queryClient, monthYear])

  function updateMonthYear(monthIncrement: number): void {
    setMonthYear((prevData) => getNewMonthYear(prevData, monthIncrement))
  }

  function isToday(date: string) {
    return (
      monthYear.year === currentDate.format('YYYY') &&
      monthYear.month === currentDate.format('MM') &&
      date === currentDate.format('DD')
    )
  }

  return {
    data,
    monthYear,
    prevMonthLastDate: prevMonth.lastDate,
    updateMonthYear,
    total: data.total,
    isToday,
  }
}

// useMonthYearContext
const MonthYearContext = createContext<MonthYearProps | null>(null)

export const MonthYearProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const monthYearProps = useMonthYear()

  return (
    <MonthYearContext.Provider value={monthYearProps}>
      {children}
    </MonthYearContext.Provider>
  )
}

export const useMonthYearContext = () => {
  const context = useContext(MonthYearContext)
  if (!context) {
    throw new Error(
      'useMonthYearContext must be used within a MonthYearProvider'
    )
  }
  return context
}
