import PropTypes from 'prop-types'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useAdmin from '../../hooks/useAdmin'
import useProjects from '../../hooks/useProjects'

const Collaborator = ({ collaborator, setOpenDeleteModal }) => {
  const { setCollaboratorToDelete, setTaskToDelete } = useProjects()

  const admin = useAdmin()

  const handleDeleteColaborator = (collaborator) => {
    setTaskToDelete(null)
    setCollaboratorToDelete(collaborator)
    setOpenDeleteModal(true)
  }

  return (
    <article className='flex flex-col gap-4 rounded-md border border-gray-600 bg-[#1F2735] p-6 sm:flex-row sm:items-center sm:justify-between'>
      <div>
        <p className='text-sm text-paragraph-color'>
          <span className='font-black'>Nombre:</span> {collaborator?.name}
        </p>
        <p className='text-sm text-paragraph-color'>
          <span className='font-black'>email: </span>
          {collaborator?.email}
        </p>
      </div>
      {admin && (
        <div className='flex items-center justify-center gap-4 '>
          <button
            className='group relative flex h-[30px] w-[42px] items-center justify-center overflow-x-hidden rounded-3xl border-2 border-primary-blue bg-red-400 font-semibold text-primary-blue transition-all hover:w-[106px] hover:justify-start hover:px-2'
            title='Eliminar'
            onClick={() => {
              handleDeleteColaborator(collaborator)
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} height={15} width={15} />
            <span className='absolute right-0 translate-x-full transition-transform duration-100 group-hover:right-2 group-hover:translate-x-0'>
              Eliminar
            </span>
          </button>
        </div>
      )}
    </article>
  )
}

Collaborator.propTypes = {
  collaborator: PropTypes.object,
  setOpenDeleteModal: PropTypes.func
}

export default Collaborator
