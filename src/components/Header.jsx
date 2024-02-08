import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Bars from '../assets/barsIcon.svg'
import SearchIcon from '../assets/searchIcon.svg'

function Header({ showMenu, setShowMenu }) {
  return (
    <header className='grid grid-cols-1 grid-rows-[80px,80px] border border-l-0 border-r-0 border-t-0 border-b-gray-800 bg-primary-blue shadow-2xl'>
      <div className='flex items-center border border-l-0 border-r-0 border-t-0 border-b-gray-800 px-6'>
        <button
          type='button'
          className='mr-10 lg:hidden'
          onClick={() => setShowMenu(!showMenu)}
        >
          <img src={Bars} alt='Hamburguer menu icon' className='' />
        </button>
        <form className='z-0 mx-auto flex h-full w-full items-center px-2 py-1'>
          <img src={SearchIcon} alt='' className='h-full w-[20px]' />
          <input
            type='text'
            className='left-5 z-0 block h-full w-full bg-primary-blue px-4 text-gray-300 outline-none focus:caret-white'
            placeholder='Buscar...'
          />
        </form>
      </div>
      <div className='flex items-center justify-center'>
        <Link
          to='/projects/new-project'
          className='rounded-md bg-gray-50 px-2 py-1 font-Russo font-semibold uppercase text-primary-blue transition-colors duration-300 hover:bg-custom-cyan'
        >
          + Añadir nuevo Proyecto
        </Link>
      </div>
    </header>
  )
}

Header.propTypes = {
  showMenu: PropTypes.bool.isRequired,
  setShowMenu: PropTypes.func.isRequired
}

export default Header
