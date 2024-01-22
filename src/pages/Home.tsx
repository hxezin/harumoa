import { useState } from 'react'
import { styled } from 'styled-components'
import Calendar from '../components/calendar/Calendar'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { useMonthYearContext } from '../components/context/MonthYearContext'
import Sidebar from '../components/sidebar/Sidebar'
import useCustom from '../hooks/custom/useCustom'

const Container = styled.main`
  display: flex;
  height: ${({ theme }) => `calc(100vh - ${theme.layout.headerHeight})`};
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
      <Calendar isSidebarOpen={isSidebarOpen} onToggle={toggleSidebar} />
      {isSidebarOpen && <Sidebar />}
    </Container>
  )
}

export default Home
