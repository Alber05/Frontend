import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Logo from '../assets/OIG.png'
import CloseIcon from '../assets/closeIcon.svg'
import ProjectsIcon from '../assets/projectsIcon.svg'
import LogOutIcon from '../assets/logOutIcon.svg'

function Menu({ showMenu, setShowMenu }) {
  const { auth } = useAuth()

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
        <nav className='mt-10'>
          <ul>
            <li className='h-[28px]  px-1'>
              <Link
                to='/projects'
                className='text-md flex h-full gap-2 font-bold leading-9 text-gray-300'
              >
                <img
                  src={ProjectsIcon}
                  alt='Projects icon'
                  className='w-[24px]'
                />
                Proyectos
              </Link>
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
