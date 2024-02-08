import {} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { dateFormater } from '../helpers/dateFormater'

const ProjectPreview = ({ project }) => {
  return (
    <article
      key={project._id}
      className='flex w-full flex-col gap-4 rounded-md bg-primary-blue p-6 text-gray-200 shadow-xl md:flex-row md:items-center md:justify-between'
    >
      <div className=''>
        <h3 className='font-Russo text-2xl  tracking-wider text-custom-cyan'>
          {' '}
          {project.name}
        </h3>
        <p>
          {project.description} Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Quas dolorum eum minima praesentium voluptas est
          enim cupiditate laboriosam, aspernatur adipisci expedita officiis sint
          dolorem modi soluta quidem eius laborum. Voluptatibus!
        </p>
        <small>
          <span className='font-bold text-white'>Deadline: </span>
          {dateFormater(project?.deadline)}
          {/* {project.deadline} */}
        </small>
      </div>
      <div className='flex justify-center'>
        <Link
          to={`/projects/${project._id}`}
          className='whitespace-nowrap rounded-md bg-gray-300 px-4 py-2 font-Russo font-semibold text-primary-blue transition-opacity duration-300 hover:opacity-80'
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
