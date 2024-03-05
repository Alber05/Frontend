import PropTypes from 'prop-types'
import useAuth from '../../hooks/useAuth'
import { Link } from 'react-router-dom'
import { dateFormater } from '../../helpers/dateFormater'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandshake } from '@fortawesome/free-solid-svg-icons'

const ProjectPreview = ({ project }) => {
  const { auth } = useAuth()

  return (
    <article
      key={project._id}
      className='flex min-h-[100px] flex-wrap items-center justify-between gap-4 border border-l-0 border-r-0 border-t-0 border-b-gray-800  px-6 py-4'
    >
      <div className='space-y-2'>
        <div className='flex items-center gap-2'>
          <div className='flex h-[20px] w-[20px] items-center justify-center rounded-full bg-gray-700'>
            <div className='h-[10px] w-[10px] rounded-full bg-green-300 '></div>
          </div>
          <h3 className='text-lg font-bold tracking-wider text-white'>
            {project.name}
          </h3>
        </div>

        <p className='text-sm text-paragraph-color'>
          Descripción: {project.description}
        </p>
        <p className='text-sm text-paragraph-color'>
          Deadline: {dateFormater(project.deadline)}
        </p>
        {auth._id != project.creator && (
          <div className='flex w-[130px] items-center gap-2 rounded-3xl text-sm text-custom-cyan'>
            <FontAwesomeIcon icon={faHandshake} />
            <p>Colaborador</p>
          </div>
        )}
      </div>
      <div className='flex flex-col justify-between gap-2'>
        <Link
          to={`/projects/${project._id}`}
          className='rounded-3xl border border-gray-600 bg-[#1F2735] p-2 text-sm text-paragraph-color transition-colors duration-300 hover:bg-custom-cyan hover:text-primary-blue'
        >
          Ver proyecto
        </Link>
      </div>
    </article>
  )
}

ProjectPreview.propTypes = {
  project: PropTypes.object.isRequired
}

export default ProjectPreview
