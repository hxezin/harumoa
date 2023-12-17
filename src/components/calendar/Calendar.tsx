import styled from 'styled-components'
import useMonthYear from '../../hooks/useMonthYear'
import { MonthDetail } from '../../types'
import { getDateArray } from '../../utils/calendar'
import DateBox from './DateBox'
import SidebarToggleButton from '../sidebar/SidebarToggleButton'

const dayOfTheWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const Container = styled.section`
  position: relative;
  width: calc(100% - 300px);
  transition: width 0.3s ease;

  &.expanded {
    width: 100%;
    transition: width 0.3s ease;
  }
`

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
  height: calc(100vh - 170px);
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
  const { data, monthYear, prevMonthLastDate, updateMonthYear } = useMonthYear()

  return (
    <Container className={`${isSidebarOpen ? '' : 'expanded'}`}>
      <SidebarToggleButton isSidebarOpen={isSidebarOpen} onToggle={onToggle} />
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

            return (
              <DateBox
                key={date}
                selectedDate={selectedDate}
                date={date}
                detail={detail}
                isCurrentMonth
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
