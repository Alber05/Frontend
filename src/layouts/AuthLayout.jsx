import { Outlet } from 'react-router-dom'

function AuthLayout() {
  return (
    <>
      <main className='min-h-screen flex justify-center items-center bg-login-form bg-fixed bg-cover'>
        <Outlet />
      </main>
    </>
  )
}

export default AuthLayout
