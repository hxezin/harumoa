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
import { AuthContextProvider } from './components/context/AuthContext'

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
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  )
}

export default App
