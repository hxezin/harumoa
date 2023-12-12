import dayjs from 'dayjs'
import { useState } from 'react'
import styled from 'styled-components'
import { Books, MonthDetail } from '../types'
import {
  getDateArray,
  getMonthDetails,
  getMonthYearDetails,
  getNewMonthYear,
} from '../utils/calendar'
import DateBox from './DateBox'

const dayOfTheWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`

const LocationButton = styled.button`
  width: 30px;
  height: 30px;
`

const CalendarContainer = styled.section`
  padding: 1rem;
`

const DOWHeader = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`

const DOWCell = styled.div`
  flex: 1;
  text-align: center;
  padding: '10px';
  font-weight: 500;
`

const DateGrid = styled.div<{ $weeksInMonth: number }>`
  height: calc(100vh - 190px);
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: ${({ $weeksInMonth }) => `repeat(${$weeksInMonth}, 1fr)`};
  border-bottom: 0.1px solid #ccc;
  border-left: 0.1px solid #ccc;
`

const books: Books = {
  '03': {
    account_book: {
      1: {
        category: '쇼핑',
        comment: '빵',
        is_income: false,
        price: 2000,
      },
      2: {
        category: '쇼핑',
        comment: '옷',
        is_income: false,
        price: 8000,
      },
      3: {
        category: '용돈',
        comment: '용돈',
        is_income: true,
        price: 12000,
      },
    },
    diary: {
      content: '일기 내용',
      emotion: '🥲',
      title: '일기 제목',
    },
  },
  '07': {
    account_book: {
      1: {
        category: '식비',
        comment: '중식',
        is_income: false,
        price: 15000,
      },
    },
    diary: {
      content: '밥 맛있었음',
      emotion: '😄',
      title: '맛집 갔음',
    },
  },
  total: {
    expense_price: 10000,
    income_price: 12000,
  },
}

const Calendar = () => {
  const currentMonthYear = getMonthYearDetails(dayjs())
  const [monthYear, setMonthYear] = useState(currentMonthYear)
  const prevMonth = getMonthDetails(monthYear.startDate.subtract(1, 'month'))

  function updateMonthYear(monthIncrement: number): void {
    setMonthYear((prevData) => getNewMonthYear(prevData, monthIncrement))
  }

  return (
    <>
      <HeaderContainer>
        <LocationButton onClick={() => updateMonthYear(-1)}>
          {'<'}
        </LocationButton>
        <h1>
          {monthYear.year}년 {monthYear.month}월
        </h1>
        <LocationButton onClick={() => updateMonthYear(1)}>
          {'>'}
        </LocationButton>
      </HeaderContainer>

      <CalendarContainer>
        <DOWHeader>
          {dayOfTheWeek.map((day, i) => (
            <DOWCell key={day}>{day}</DOWCell>
          ))}
        </DOWHeader>

        <DateGrid $weeksInMonth={monthYear.weeksInMonth}>
          {/* 캘린더상 전월 날짜 렌더링 */}
          {getDateArray(monthYear.calendarStartDate, prevMonth.lastDate)?.map(
            (date, i) => (
              <DateBox key={date} date={date} />
            )
          )}

          {/* 당월 날짜 렌더링 */}
          {getDateArray(1, monthYear.lastDate)?.map((date, i) => {
            const detail = books[
              date.toString().padStart(2, '0')
            ] as MonthDetail | null

            return (
              <DateBox key={date} date={date} detail={detail} isCurrentMonth />
            )
          })}

          {/* 캘린더상 익월 날짜 렌더링 */}
          {getDateArray(1, monthYear.calendarLastDate)?.map((date, i) => (
            <DateBox key={date} date={date} />
          ))}
        </DateGrid>
      </CalendarContainer>
    </>
  )
}

export default Calendar
