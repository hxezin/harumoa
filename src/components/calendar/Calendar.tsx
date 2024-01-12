import styled from 'styled-components'
import { MonthDetail } from '../../types'
import { getDateArray } from '../../utils/calendar'
import DateBox from './DateBox'
import { useMonthYearContext } from '../context/MonthYearContext'
import nextArrow from '../../assets/icons/nextArrow.svg'
import beforeArrow from '../../assets/icons/beforeArrow.svg'
import sidebarOpen from '../../assets/icons/sidebarOpen.svg'
import sidebarClose from '../../assets/icons/sidebarClose.svg'
import Button from '../common/Button'

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

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;

  div {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
`

const MonthlyContainer = styled.div`
  div {
    gap: 0.5rem;
  }

  span:nth-of-type(1) {
    color: ${({ theme }) => theme.color.gray1};
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: ${({ theme }) => theme.fontWeight.extraBold};
  }

  span:nth-of-type(2) {
    color: ${({ theme }) => theme.color.black};
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: ${({ theme }) => theme.fontWeight.extraBold};
  }
`

const LocationButton = styled.button`
  border-radius: 0.15rem;
  background: #fcfcfc;
  box-shadow: 1.2px 1.2px 3.6px 0px rgba(97, 97, 97, 0.5);
  border: none;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const CalendarContainer = styled.section`
  padding: 1rem;
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
  const {
    data,
    monthYear,
    prevMonthLastDate,
    updateMonthYear,
    isToday,
    revertToToday,
  } = useMonthYearContext()

  return (
    <Container className={`${isSidebarOpen ? '' : 'expanded'}`}>
      <HeaderContainer>
        <Button value='오늘' onClick={revertToToday} />

        <MonthlyContainer>
          <LocationButton onClick={() => updateMonthYear(-1)}>
            <img src={beforeArrow} />
          </LocationButton>

          <div>
            <span>{monthYear.year}</span>
            <span>{monthYear.enMonth.toUpperCase()}</span>
          </div>

          <LocationButton onClick={() => updateMonthYear(1)}>
            <img src={nextArrow} />
          </LocationButton>
        </MonthlyContainer>

        <LocationButton onClick={onToggle}>
          {isSidebarOpen && <img src={sidebarClose} />}
          {!isSidebarOpen && <img src={sidebarOpen} />}
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
                isToday={isToday(dateIdx)}
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
