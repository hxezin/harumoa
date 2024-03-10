import styled from 'styled-components'
import { MonthDetail } from '../../types'
import { getDateArray } from '../../utils/calendar'
import DateBox from './DateBox'
import { useMonthYearContext } from '../context/MonthYearContext'
import CalendarHeader from './CalendarHeader'

const dayOfTheWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const Container = styled.section`
  position: relative;
  width: calc(100% - 300px);

  &.expanded {
    width: 100%;
    transition: width 0.3s ease;
  }
`

const CalendarContainer = styled.section`
  padding: 1rem 1rem 0 1rem;
`

const DOWHeader = styled.div`
  display: flex;
  margin-bottom: 0.5rem;

  div:nth-of-type(1) {
    color: ${({ theme }) => theme.color.error};
  }
`

const DOWCell = styled.div`
  flex: 1;
  text-align: center;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.color.gray1};
  font-size: ${({ theme }) => theme.fontSize.sm};
`

const DateGrid = styled.div<{ $weeksInMonth: number }>`
  height: calc(100vh - 145px);
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: ${({ $weeksInMonth }) => `repeat(${$weeksInMonth}, 1fr)`};
  border-bottom: 0.1px solid #ccc;
  border-left: 0.1px solid #ccc;
`

interface Props {
  isSidebarOpen: boolean
  onToggle: () => void
}

const Calendar = ({ isSidebarOpen, onToggle }: Props) => {
  const { data, monthYear, prevMonthLastDate, isToday } = useMonthYearContext()

  return (
    <Container className={`${isSidebarOpen ? '' : 'expanded'}`}>
      <CalendarHeader
        isMobile={false}
        isSidebarOpen={isSidebarOpen}
        onToggle={onToggle}
      />
      <CalendarContainer>
        <DOWHeader>
          {dayOfTheWeek.map((day, i) => (
            <DOWCell key={day}>{day}</DOWCell>
          ))}
        </DOWHeader>

        <DateGrid $weeksInMonth={monthYear.weeksInMonth}>
          {/* 캘린더상 전월 날짜 렌더링 */}
          {getDateArray(monthYear.calendarStartDate, prevMonthLastDate)?.map(
            (date, i) => (
              <DateBox key={date} date={date} />
            )
          )}

          {/* 당월 날짜 렌더링 */}
          {getDateArray(1, monthYear.lastDate)?.map((date, i) => {
            const dateIdx = date.toString().padStart(2, '0')
            const detail = data?.[dateIdx] as MonthDetail | null
            const selectedDate = `${monthYear.year}-${monthYear.month}-${dateIdx}`

            const day = monthYear.startDate.set('date', date).get('d')
            //요일 알아내기 - 0:일 ~ 6:토

            return (
              <DateBox
                key={date}
                selectedDate={selectedDate}
                date={date}
                detail={detail}
                isCurrentMonth
                isToday={isToday(dateIdx)}
                day={day}
              />
            )
          })}

          {/* 캘린더상 익월 날짜 렌더링 */}
          {getDateArray(1, monthYear.calendarLastDate)?.map((date, i) => (
            <DateBox key={date} date={date} />
          ))}
        </DateGrid>
      </CalendarContainer>
    </Container>
  )
}

export default Calendar
