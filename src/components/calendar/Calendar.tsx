import styled from 'styled-components'
import { IAccountBook, IDiary, MonthDetail } from '../../types'
import { getDateArray } from '../../utils/calendar'
import DateBox from './DateBox'
import { useMonthYearContext } from '../context/MonthYearContext'
import nextArrow from '../../assets/icons/nextArrow.svg'
import beforeArrow from '../../assets/icons/beforeArrow.svg'
import sidebarOpen from '../../assets/icons/sidebarOpen.svg'
import sidebarClose from '../../assets/icons/sidebarClose.svg'
import { BlueBorderButton } from '../common/Button'
import { useState } from 'react'
import MobileCalendarDetail from './MobileCalendarDetail'

const dayOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const Container = styled.section`
  position: relative;
  width: calc(100% - 300px);

  &.expanded {
    width: 100%;
    transition: width 0.3s ease;
  }

  @media screen and (max-width: 780px) {
    width: 100%;
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

  @media screen and (max-width: 780px) {
    display: none;
  }
`

const MonthlyContainer = styled.div`
  div {
    gap: 0.5rem;
  }

  > div:first-child {
    width: 260px;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
  padding: 1rem 1rem 0 1rem;

  @media screen and (max-width: 780px) {
    padding: 1rem 0 0;
  }
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

  @media screen and (max-width: 780px) {
    width: 100%;
    height: auto;
    grid-template-rows: ${({ $weeksInMonth }) =>
      `repeat(${$weeksInMonth}, 1fr)`};
    border: none;
  }
`

interface Props {
  isSidebarOpen: boolean
  onToggle: () => void
}

export interface MobileDetail {
  date: number
  diary?: IDiary
  account_book?: IAccountBook

  totalPrice: number | null

  selectedDate: string
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

  const [mobileDetail, setMobileDetail] = useState<MobileDetail | null>()

  return (
    <Container className={`${isSidebarOpen ? '' : 'expanded'}`}>
      <HeaderContainer>
        <BlueBorderButton
          value='오늘'
          onClick={revertToToday}
          padding='0.3rem 0.7rem'
        />

        <MonthlyContainer>
          <div>
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
          </div>
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
            (date) => (
              <DateBox key={date} />
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
                handleDateClick={(totalPrice: number) => {
                  if (detail) {
                    setMobileDetail({
                      date: date,
                      ...detail,
                      totalPrice: totalPrice,
                      selectedDate: selectedDate,
                    })
                  } else {
                    setMobileDetail({
                      date: date,
                      totalPrice: null,
                      selectedDate: selectedDate,
                    })
                  }
                }}
              />
            )
          })}

          {/* 캘린더상 익월 날짜 렌더링 */}
          {getDateArray(1, monthYear.calendarLastDate)?.map((date) => (
            <DateBox key={date} />
          ))}
        </DateGrid>

        {mobileDetail && <MobileCalendarDetail mobileDetail={mobileDetail} />}
      </CalendarContainer>
    </Container>
  )
}

export default Calendar
