import { useNavigate } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { BlueBorderButton } from '../common/Button'
import { useMonthYearContext } from '../context/MonthYearContext'
import MobileMonthlyOverview from './MobileMonthlyOverview'

import beforeArrow from '../../assets/icons/beforeArrow.svg'
import nextArrow from '../../assets/icons/nextArrow.svg'
import { ReactComponent as SidebarOpen } from '../../assets/icons/sidebarOpen.svg'
import { ReactComponent as SidebarClose } from '../../assets/icons/sidebarClose.svg'
import { onlyDesktop, onlyMobile } from '../../assets/css/global'

const Container = styled.header<{ $isMobile: boolean }>`
  ${({ $isMobile }) =>
    $isMobile
      ? css`
          ${onlyMobile}
        `
      : css`
          ${onlyDesktop};
        `}
`

const CalendarTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;

  div {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .today-button {
    display: block;
  }

  @media (max-width: 780px) {
    padding: 0;
    justify-content: center;

    .today-button {
      display: none;
    }
  }
`

const MonthlyContainer = styled.div`
  width: 260px;
  gap: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .date-info {
    gap: 0.5rem;

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
  }

  @media (max-width: 780px) {
    width: 250px;

    .date-info {
      gap: 0.5rem;

      span:nth-of-type(1) {
        font-size: ${({ theme }) => theme.fontSize.xs};
        font-weight: ${({ theme }) => theme.fontWeight.bold};
      }

      span:nth-of-type(2) {
        font-size: ${({ theme }) => theme.fontSize.md};
        font-weight: ${({ theme }) => theme.fontWeight.bold};
      }
    }
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
  padding: 0;

  &.sidebar-button {
    display: block;
  }

  @media (max-width: 780px) {
    width: 20px;
    height: 20px;
    &.sidebar-button {
      display: none;
    }
  }
`

const ChartButton = styled.button`
  display: none;

  @media (max-width: 780px) {
    display: block;
    width: 100%;
    font-size: ${({ theme }) => theme.fontSize.sm};
    border-radius: 0.15rem;
    background: ${({ theme }) => theme.color.white2};
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
  }
`

interface CalendarHeaderProps {
  onToggle?: () => void
  isSidebarOpen?: boolean
  isMobile: boolean
}

const CalendarHeader = ({
  onToggle,
  isSidebarOpen,
  isMobile,
}: CalendarHeaderProps) => {
  const { monthYear, updateMonthYear, revertToToday } = useMonthYearContext()
  const navigate = useNavigate()

  return (
    <Container $isMobile={isMobile}>
      <CalendarTitleContainer>
        <BlueBorderButton
          value='오늘'
          onClick={revertToToday}
          padding='0.3rem 0.7rem'
          className='today-button'
        />

        <MonthlyContainer>
          <LocationButton onClick={() => updateMonthYear(-1)}>
            <img src={beforeArrow} />
          </LocationButton>

          <div className='date-info'>
            <span>{monthYear.year}</span>
            <span>{monthYear.enMonth.toUpperCase()}</span>
          </div>

          <LocationButton onClick={() => updateMonthYear(1)}>
            <img src={nextArrow} />
          </LocationButton>
        </MonthlyContainer>

        <LocationButton onClick={onToggle} className='sidebar-button'>
          {isSidebarOpen ? <SidebarClose /> : <SidebarOpen />}
        </LocationButton>
      </CalendarTitleContainer>

      <MobileMonthlyOverview />
      <ChartButton onClick={() => navigate('/chart')}>
        💸 월별 소비 분석
      </ChartButton>
    </Container>
  )
}

export default CalendarHeader
