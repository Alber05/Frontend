import { useState, useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Menu from '../components/Menu'
import Header from '../components/Header'

const ProtectedRoutes = () => {
  const [showMenu, setShowMenu] = useState(false)

  const { auth, loading } = useAuth()

  console.log(auth)

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

  if (loading) return 'Cargando...'

  return (
    <>
      {auth._id ? (
        <div className='w-full min-h-screen lg:grid lg:grid-cols-[300px,1fr] '>
          <Menu
            showMenu={showMenu}
            setShowMenu={setShowMenu}
          />
          <div className='grid grid-cols-1 grid-rows-[120px,1fr]  border-b-gray-800'>
            <Header
              showMenu={showMenu}
              setShowMenu={setShowMenu}
            />
            <main className='bg-primary-blue bg-opacity-90 p-6 h-[calc(100vh-120px)] overflow-y-auto'>
              <Outlet />
            </main>
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
