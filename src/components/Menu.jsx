import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { NavLink, useParams, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderClosed, faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import useAuth from '../hooks/useAuth'
import Logo from '../assets/OIG.png'
import CloseIcon from '../assets/closeIcon.svg'
import LogOutIcon from '../assets/logOutIcon.svg'

function Menu({ showMenu, setShowMenu }) {
  const { auth } = useAuth()
  const params = useParams()

  const { pathname } = useLocation()

  useEffect(() => {
    setShowMenu(false)
  }, [params])

  return (
    <aside
      className={`fixed left-0 top-0 z-20 grid w-full grid-cols-[250px,1fr] grid-rows-1 lg:relative lg:grid-cols-1 ${
        showMenu
          ? 'translate-x-0 transition-transform duration-300'
          : '-translate-x-full transition-transform duration-300'
      } h-screen shadow-xl shadow-primary-blue lg:relative lg:translate-x-0 lg:transition-none`}
    >
      <div className=' grid grid-rows-[80px,1fr,auto,auto] border border-b-0 border-l-0 border-t-0 border-r-gray-800 bg-primary-blue px-6'>
        <div className='flex h-[80px] items-center gap-2'>
          <img src={Logo} alt='' className='h-[60px]' />
          <h3 className='text-border font-Russo text-4xl font-bold tracking-widest text-custom-cyan'>
            Uptask
          </h3>
        </div>
        <nav className='mt-12'>
          <ul className='flex flex-col gap-4'>
            <li className='h-[28px] px-1'>
              <NavLink
                to='/projects'
                className={`${pathname === '/projects' ? 'bg-custom-cyan text-primary-blue' : 'text-gray-300'} flex h-full items-center gap-2 rounded-md px-2 text-sm font-bold transition-colors duration-200 hover:bg-custom-cyan hover:text-primary-blue`}
              >
                <FontAwesomeIcon icon={faFolderClosed} className='w-[24px]' />
                Proyectos
              </NavLink>
            </li>
            <li className='h-[28px] px-1'>
              <NavLink
                to='/projects/new-project'
                className={`${pathname === '/projects/new-project' ? 'bg-custom-cyan text-primary-blue' : 'text-gray-300'} flex h-full items-center gap-2 rounded-md  px-2 text-sm font-bold duration-200 hover:bg-custom-cyan hover:text-primary-blue`}
              >
                <FontAwesomeIcon icon={faFolderPlus} className='w-[24px]' />
                Añadir proyecto
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className='flex items-center gap-4'>
          <div className='h-[30px] w-[30px] overflow-hidden rounded-full bg-custom-cyan'>
            <img
              src={`https://ui-avatars.com/api/?name=${auth.name}&background=0D8ABC&color=fff&size=128`}
            />
          </div>
          <p className='text-gray-50'>¡Hola {auth.name}!</p>
        </div>
        <div className='flex gap-4 py-6'>
          <img src={LogOutIcon} alt='Log out icon' className='w-[30px]' />
          <p className='text-gray-50'>Cerrar sesión</p>
        </div>
      </div>

      <div className='w-full bg-primary-blue bg-opacity-50 px-6 lg:hidden'>
        <div className='flex h-[60px] items-center justify-end'>
          <img
            src={CloseIcon}
            alt='Close Icon'
            className='h-[40px] w-[40px] cursor-pointer'
            onClick={() => setShowMenu(!showMenu)}
          />
        </div>
      </div>
    </aside>
  )
}

Menu.propTypes = {
  showMenu: PropTypes.bool.isRequired,
  setShowMenu: PropTypes.func.isRequired
}

export default Menu
