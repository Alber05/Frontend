import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import CloseIcon from '../assets/closeIcon.svg'
import ProjectsIcon from '../assets/projectsIcon.svg'
import LogOutIcon from '../assets/logOutIcon.svg'
import useAuth from '../hooks/useAuth'

function Menu({ showMenu, setShowMenu }) {
  const { auth } = useAuth()

  return (
    <aside
      className={`grid grid-cols-[250px,1fr] lg:grid-cols-1  fixed top-0 left-0 w-full lg:relative z-20 ${
        showMenu
          ? 'translate-x-0 transition-transform duration-300'
          : '-translate-x-full transition-transform duration-300'
      } lg:translate-x-0 h-screen lg:transition-none lg:relative`}
    >
      <div className=' bg-primary-blue border border-r-gray-800 border-l-0 border-t-0 border-b-0 px-6 grid grid-rows-[60px,1fr,auto,auto]'>
        <div className='h-[60px] flex items-center'>
          <h3 className='text-4xl font-bold text-custom-cyan'>Uptask</h3>
        </div>
        <nav className='mt-10'>
          <ul>
            <li className='h-[28px]'>
              <Link
                to='/projects'
                className='flex gap-2 h-full leading-9 text-gray-300 font-bold text-md'
              >
                <img
                  src={ProjectsIcon}
                  alt='Projects icon'
                  className='w-[24px]'
                />
                Projects
              </Link>
            </li>
          </ul>
        </nav>
        <div className='flex items-center gap-4'>
          <div className='h-[30px] w-[30px] bg-custom-cyan rounded-full overflow-hidden'>
            <img
              src={`https://ui-avatars.com/api/?name=${auth.name}&background=0D8ABC&color=fff&size=128`}
            />
          </div>
          <p className='text-gray-50'>¡Hola {auth.name}!</p>
        </div>
        <div className='flex gap-4 py-6'>
          <img
            src={LogOutIcon}
            alt='Log out icon'
            className='w-[30px]'
          />
          <p className='text-gray-50'>Cerrar sesión</p>
        </div>
      </div>

      <div className='bg-primary-blue bg-opacity-50 w-full lg:hidden px-6'>
        <div className='h-[60px] flex items-center justify-end'>
          <img
            src={CloseIcon}
            alt='Close Icon'
            className='w-[40px] h-[40px] cursor-pointer'
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
