import { useState } from 'react'
import { styled } from 'styled-components'
import Calendar from '../components/Calendar'
import Sidebar from '../components/Sidebar'

const Container = styled.div`
  display: flex;
`

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <main>
      <Container>
        <Calendar isSidebarOpen={isSidebarOpen} onToggle={toggleSidebar} />
        {isSidebarOpen && <Sidebar />}
      </Container>
    </main>
  )
}

export default Home
