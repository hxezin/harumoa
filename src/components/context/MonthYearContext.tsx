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

interface MonthYearProps {
  data: Books
  monthYear: MonthYear
  prevMonthLastDate: number
  updateMonthYear: (monthIncrement: number) => void
  total: TotalPrice
}

// useMonthYear custom hooks
function useMonthYear(): MonthYearProps {
  const queryClient = useQueryClient()
  const currentMonthYear = getMonthYearDetails(dayjs())
  const [monthYear, setMonthYear] = useState(currentMonthYear)
  const prevMonth = getMonthDetails(monthYear.startDate.subtract(1, 'month'))

  const fallback = {}
  const { data = fallback } = useQuery({
    queryKey: ['books', monthYear.year, monthYear.month],
    queryFn: () => getBooks(monthYear.year, monthYear.month),
  })

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

  return {
    data,
    monthYear,
    prevMonthLastDate: prevMonth.lastDate,
    updateMonthYear,
    total: data.total,
  }
}

// useMonthYearContext
const MonthYearContext = createContext<MonthYearProps | undefined>(undefined)

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
