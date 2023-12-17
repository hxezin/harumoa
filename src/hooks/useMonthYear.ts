import { useQuery, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { getBooks } from '../api/firebase'
import {
  getMonthDetails,
  getMonthYearDetails,
  getNewMonthYear,
} from '../utils/calendar'

function useMonthYear() {
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
  }
}

export default useMonthYear
