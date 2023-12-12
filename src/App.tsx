import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import UserProfile from './pages/UserProfile'
import UserCustom from './pages/UserCustom'
import Home from './pages/Home'
import Login from './pages/Login'
import Join from './pages/Join'
import Write from './pages/Write'
import Detail from './pages/Detail'
import Root from './pages/Root'
import NotFound from './pages/NotFound'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from './api/react-query'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: '/profile', element: <UserProfile /> },
      { path: '/custom', element: <UserCustom /> },
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
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
export default App
