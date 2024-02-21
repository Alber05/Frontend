import PropTypes from 'prop-types'
import Bars from '../assets/barsIcon.svg'
import SearchIcon from '../assets/searchIcon.svg'

function Header({ showMenu, setShowMenu }) {
  return (
    <header className=' flex h-full border border-l-0 border-r-0 border-t-0 border-b-gray-800 bg-primary-blue px-6 shadow-2xl'>
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
          className='left-5 z-0 block h-full w-full bg-transparent px-4 text-gray-300 outline-none focus:caret-white'
          placeholder='Buscar...'
        />
      </form>
    </header>
  )
}

Header.propTypes = {
  showMenu: PropTypes.bool.isRequired,
  setShowMenu: PropTypes.func.isRequired
}

export default Header
