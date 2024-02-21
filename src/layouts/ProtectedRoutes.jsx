import { useState, useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import useAuth from '../hooks/useAuth'
import Menu from '../components/Menu'
import Header from '../components/Header'

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
        Cargando...
      </div>
    )

  return (
    <>
      {auth._id ? (
        <div className='h-screen w-full lg:grid lg:grid-cols-[300px,1fr] '>
          <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
          <div className='grid h-screen grid-cols-1 grid-rows-[80px,1fr] border-b-gray-800'>
            <Header showMenu={showMenu} setShowMenu={setShowMenu} />
            <div className='overflow-y-auto bg-primary-blue'>
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
