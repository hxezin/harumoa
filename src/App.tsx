import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Join from './pages/Join'
import Write from './pages/Write'
import Detail from './pages/Detail'
import Root from './pages/Root'
import NotFound from './pages/NotFound'
import { AuthContextProvider } from './components/context/AuthContext'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from './api/react-query'
import GlobalStyle from './assets/css/global'
import { MonthYearProvider } from './components/context/MonthYearContext'
import Setting from './pages/Setting'
import { ThemeProvider } from 'styled-components'
import theme from './assets/css/theme'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: '/setting', element: <Setting /> },
      { path: '/write', element: <Write /> },
      { path: '/edit', element: <Write /> },
      { path: '/detail', element: <Detail /> },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/join', element: <Join /> },
])

const App = () => {
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <MonthYearProvider>
          <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
            <GlobalStyle />
            <ReactQueryDevtools />
          </ThemeProvider>
        </MonthYearProvider>
      </QueryClientProvider>
    </AuthContextProvider>
  )
}
export default App
