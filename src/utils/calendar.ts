import isBetween from 'dayjs/plugin/isBetween'
import dayjs, { Dayjs } from 'dayjs'
import { getCustom } from '../api/firebase'
import { IFixedExpense } from '../types'
dayjs.extend(isBetween)

export interface MonthYear {
  startDate: Dayjs
  lastDate: number
  month: string
  year: string
  calendarStartDate: number | null
  calendarLastDate: number | null
  weeksInMonth: number
}

// 현재 캘린더에 보여지는 총 주차 수를 반환하는 함수
function getWeeksInMonth(firstDOW: number, totalDays: number): number {
  return Math.ceil((totalDays + firstDOW) / 7)
}

// 현재 캘린더 정보
function getCalendarDetails(startDate: Dayjs, lastDate: Dayjs) {
  const calendarStartDate =
    startDate.day() === 0 ? null : startDate.startOf('week').date()
  const calendarLastDate =
    lastDate.day() === 6 ? null : lastDate.endOf('week').date()

  return { calendarStartDate, calendarLastDate }
}

// 당월 정보
export function getMonthDetails(initialDate: Dayjs) {
  const monthStartDate = initialDate.startOf('month')
  const monthEndDate = initialDate.endOf('month')

  const firstDOW = Number(monthStartDate.format('d'))
  const lastDate = monthEndDate.date()

  return {
    monthStartDate,
    monthEndDate,
    firstDOW,
    lastDate,
  }
}

export function getMonthYearDetails(initialDate: Dayjs): MonthYear {
  const { monthStartDate, monthEndDate, firstDOW, lastDate } =
    getMonthDetails(initialDate)

  const { calendarStartDate, calendarLastDate } = getCalendarDetails(
    monthStartDate,
    monthEndDate
  )

  const weeksInMonth = getWeeksInMonth(firstDOW, lastDate)

  return {
    startDate: monthStartDate,
    lastDate,
    month: monthStartDate.format('MM'),
    year: monthStartDate.format('YYYY'),
    calendarStartDate,
    calendarLastDate,
    weeksInMonth,
  }
}

export function getNewMonthYear(
  prevData: MonthYear,
  monthIncrement: number
): MonthYear {
  const newMonthYear = prevData.startDate.clone().add(monthIncrement, 'months')
  return getMonthYearDetails(newMonthYear)
}

// 시작일부터 마지막일까지 배열 생성
export function getDateArray(
  start: number | null,
  end: number | null
): number[] | null {
  if (start === null || end === null) return null
  return Array.from({ length: end - start + 1 }, (_, index) => start + index)
}

// 고정 지출 기간에 지출 날짜(year-month-payment_day)가 포함되어 있는 항목 필터링
function filterFixedExpense(data: IFixedExpense, year: string, month: string) {
  const filteredData = Object.entries(data).filter(([key, data]) => {
    const startDate = dayjs(data.payment_period.start_date)
    const endDate = dayjs(data.payment_period.end_date)
    const paymentDate = dayjs(`${year}-${month}-${data.payment_day}`)

    const isPaymentDateIncluded = paymentDate.isBetween(
      startDate,
      endDate,
      'day',
      '[]'
    )

    return isPaymentDateIncluded
  })

  // 고정 지출 리스트 정렬 - 시작 날짜 오름차순, 마지막 날짜 오름차순
  const sortedData = filteredData.sort((a, b) => {
    const startDateA = dayjs(a[1]?.payment_period.start_date)
    const startDateB = dayjs(b[1]?.payment_period.start_date)

    if (startDateA.isBefore(startDateB)) return -1
    if (startDateA.isAfter(startDateB)) return 1

    const endDateA = dayjs(a[1].payment_period.end_date)
    const endDateB = dayjs(b[1].payment_period.end_date)

    return endDateA.isBefore(endDateB) ? -1 : endDateA.isAfter(endDateB) ? 1 : 0
  })

  // 정렬된 데이터를 객체로 변경
  const objectData: IFixedExpense = Object.fromEntries(sortedData)

  return objectData
}

export async function getFilteredCustom(year: string, month: string) {
  const custom = await getCustom()
  const filteredFixedExpense = filterFixedExpense(
    custom.fixed_expense,
    year,
    month
  )
  return {
    ...custom,
    fixed_expense: filteredFixedExpense,
  }
}
