import { useState, useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { Audio } from 'react-loader-spinner'
import useAuth from '../hooks/useAuth'
import Menu from '../components/Menu'
import Header from '../components/Header'
import Logo from '../assets/OIG.png'

const ProtectedRoutes = () => {
  const [showMenu, setShowMenu] = useState(false)

  const { auth, loading } = useAuth()

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowMenu(false) // Cierra el menú si la ventana es más pequeña que cerrarMenuEnAncho
      }
    }

    // Agrega un event listener para detectar cambios en el tamaño de la ventana
    window.addEventListener('resize', handleResize)

    // Limpia el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (loading)
    return (
      <div className='flex h-screen w-full flex-col items-center justify-center gap-3 bg-primary-blue'>
        <div className='flex flex-col items-center justify-center gap-2'>
          <img src={Logo} alt='' className='h-[200px]' />
          {/* <h3 className='text-border font-Russo text-5xl font-bold tracking-widest text-custom-cyan'>
            Uptask
          </h3> */}
        </div>
        <Audio
          height='100'
          width='100'
          radius='9'
          color='rgb(98 207 200)'
          ariaLabel='loading'
          wrapperStyle
          wrapperClass
        />
        <h3 className='font-Russo text-xl font-bold tracking-wider text-custom-cyan'>
          Cargando...
        </h3>
      </div>
    )

  return (
    <>
      {auth._id ? (
        <div className='h-screen w-full lg:grid lg:grid-cols-[300px,1fr] '>
          <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
          <div className='grid h-screen grid-cols-1 grid-rows-[160px,1fr] border-b-gray-800'>
            <Header showMenu={showMenu} setShowMenu={setShowMenu} />
            <div className='overflow-y-auto bg-gray-300 p-6'>
              <Outlet />
            </div>
            <Toaster />
          </div>
        </div>
      ) : (
        <Navigate to='/' />
      )}
    </>
  )
}

ProtectedRoutes.propTypes = {}

export default ProtectedRoutes
