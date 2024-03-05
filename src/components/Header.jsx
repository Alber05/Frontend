import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'
import useProjects from '../hooks/useProjects'
import Bars from '../assets/barsIcon.svg'
import SearchIcon from '../assets/searchIcon.svg'

function Header({ showMenu, setShowMenu }) {
  const [search, setSearch] = useState('')
  const [filteredProjects, setFilteredProjects] = useState([])
  const { projects } = useProjects()

  const location = useLocation()

  const handleSearch = (e) => {
    const searchTerm = e.target.value
    setSearch(searchTerm)
  }

  useEffect(() => {
    !search
      ? setFilteredProjects([])
      : setFilteredProjects(
          projects.filter((project) =>
            project.name.toLowerCase().includes(search.toLowerCase())
          )
        )
  }, [search])

  useEffect(() => {
    setSearch('')
    setFilteredProjects([])
  }, [location])

  return (
    <header className=' flex h-full border border-l-0 border-r-0 border-t-0 border-b-gray-800 bg-primary-blue px-6 shadow-2xl'>
      <button
        type='button'
        className='mr-10 lg:hidden'
        onClick={() => setShowMenu(!showMenu)}
      >
        <img src={Bars} alt='Hamburguer menu icon' className='' />
      </button>
      <div className='relative mx-auto w-full '>
        <form className=' flex h-full w-full items-center  px-2 py-1'>
          <img src={SearchIcon} alt='' className='h-full w-[20px]' />
          <input
            type='text'
            className='left-5 block h-full w-full bg-transparent px-4 text-gray-300 outline-none focus:caret-white'
            placeholder='Buscar...'
            value={search}
            onChange={(e) => handleSearch(e)}
          />
        </form>
        {filteredProjects.length > 0 && (
          <div className='top-100 absolute z-20 flex w-full flex-col rounded-md border border-gray-600 bg-custom-cyan py-4'>
            {filteredProjects.map((project) => (
              <Link
                key={project._id}
                className='px-6 py-2 font-semibold text-primary-blue transition-colors duration-100 hover:bg-primary-blue hover:text-white'
                to={`/projects/${project._id}`}
              >
                {project.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}

Header.propTypes = {
  showMenu: PropTypes.bool.isRequired,
  setShowMenu: PropTypes.func.isRequired
}

export default Header
