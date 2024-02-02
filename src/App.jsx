import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import NewPassword from './pages/NewPassword'
import ConfirmAccount from './pages/ConfirmAccount'
import { AuthProvider } from './context/AuthProvider'
import ProtectedRoutes from './layouts/ProtectedRoutes'
import Projects from './pages/Projects'
import NewProject from './pages/NewProject'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <AuthLayout />
      </AuthProvider>
    ),
    children: [
      {
        path: '/',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />
      },
      {
        path: 'forgot-password/:token',
        element: <NewPassword />
      },
      {
        path: 'confirm/:token',
        element: <ConfirmAccount />
      }
    ]
  },
  {
    path: '/projects',
    element: (
      <AuthProvider>
        <ProtectedRoutes />
      </AuthProvider>
    ),
    children: [
      {
        path: '/projects',
        element: <Projects />
      },
      {
        path: 'new-project',
        element: <NewProject />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
