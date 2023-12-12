import { Dayjs } from 'dayjs'

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
