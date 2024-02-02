import PropTypes from 'prop-types'
import Bars from '../assets/barsIcon.svg'
import SearchIcon from '../assets/searchIcon.svg'

function Header({ showMenu, setShowMenu }) {
  return (
    <header className='bg-primary-blue border border-b-gray-700 border-l-0 border-t-0 border-r-0 grid grid-cols-1 grid-rows-[60px,60px]'>
      <div className='flex items-center border border-b-gray-800 border-t-0 border-l-0 border-r-0 px-6'>
        <button
          type='button'
          className='mr-10 lg:hidden'
          onClick={() => setShowMenu(!showMenu)}
        >
          <img
            src={Bars}
            alt='Hamburguer menu icon'
            className=''
          />
        </button>
        <form className='flex items-center z-0 mx-auto h-full w-full px-2 py-1'>
          <img
            src={SearchIcon}
            alt=''
            className='w-[20px] h-full'
          />
          <input
            type='text'
            className='block w-full bg-primary-blue text-gray-300 outline-none px-4 h-full left-5 focus:caret-white z-0'
            placeholder='Buscar...'
          />
        </form>
      </div>
      <div className='flex items-center justify-center'>
        <button className='bg-gray-300 py-1 px-2 font-bold text-primary-blue rounded-md uppercase'>
          Añadir nuevo Proyecto
        </button>
      </div>
    </header>
  )
}

Header.propTypes = {
  showMenu: PropTypes.bool.isRequired,
  setShowMenu: PropTypes.func.isRequired
}

export default Header
