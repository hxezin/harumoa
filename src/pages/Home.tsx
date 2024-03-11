import { useState } from 'react'
import { styled } from 'styled-components'
import Calendar from '../components/calendar/Calendar'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { useMonthYearContext } from '../components/context/MonthYearContext'
import Sidebar from '../components/sidebar/Sidebar'
import useCustom from '../hooks/custom/useCustom'
import MobileSection from '../components/common/MobileSection'
import MobileSidebar from '../components/sidebar/MobileSidebar'

const Container = styled.main`
  display: flex;
  flex-direction: column;
  height: ${({ theme }) => `calc(100vh - ${theme.layout.headerHeight})`};
`

const DesktopContainer = styled.div`
  display: flex;
`
const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const { isLoading: calendarLoading } = useMonthYearContext()
  const { isLoading: customLoading } = useCustom()

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  if (calendarLoading || customLoading) return <LoadingSpinner />

  return (
    <Container>
      <MobileSection title='캘린더'>
        <DesktopContainer>
          <Calendar isSidebarOpen={isSidebarOpen} onToggle={toggleSidebar} />
          {isSidebarOpen && <Sidebar />}
        </DesktopContainer>
      </MobileSection>

      <MobileSidebar />
    </Container>
  )
}

export default Home
