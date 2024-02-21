import {} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { dateFormater } from '../helpers/dateFormater'

const ProjectPreview = ({ project }) => {
  console.log(project)
  return (
    <article
      key={project._id}
      className='flex min-h-[100px] flex-wrap items-center justify-between gap-4 border border-l-0 border-r-0 border-t-0 border-b-gray-800  px-6 py-4'
    >
      <div className=''>
        <div className='flex items-center gap-2'>
          <div className='flex h-[20px] w-[20px] items-center justify-center rounded-full bg-gray-700'>
            <div className='h-[10px] w-[10px] rounded-full bg-green-300 '></div>
          </div>
          <h3 className='text-lg font-bold tracking-wider text-white'>
            {project.name}
          </h3>
        </div>

        <p className='text-paragraph-color text-sm'>
          Descripción: {project.description}
        </p>
        <p className='text-paragraph-color text-sm'>
          Deadline: {dateFormater(project.deadline)}
        </p>
      </div>

      <Link
        to={`/projects/${project._id}`}
        className='text-paragraph-color rounded-3xl border border-gray-600 bg-[#1F2735] p-2 transition-colors duration-300 hover:bg-custom-cyan hover:text-primary-blue'
      >
        Ver proyecto
      </Link>
    </article>
  )
}

ProjectPreview.propTypes = {
  project: PropTypes.object.isRequired
}

export default ProjectPreview
