import PropTypes from 'prop-types'
import { AnimatePresence, motion } from 'framer-motion'
import useProjects from '../../hooks/useProjects'

function DeleteModal({ openDeleteModal, setOpenDeleteModal, project }) {
  const {
    taskToDelete,
    setTaskToDelete,
    deleteTask,
    collaboratorToDelete,
    setCollaboratorToDelete,
    deleteCollaborator
  } = useProjects()

  const variants = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0 }
  }

  const item = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0 }
  }

  const handleDeleteConfirm = async () => {
    if (taskToDelete) {
      await deleteTask(taskToDelete)
      setOpenDeleteModal(false)
      return
    }

    if (collaboratorToDelete) {
      await deleteCollaborator(collaboratorToDelete, project._id)
      setOpenDeleteModal(false)
      return
    }
  }

  const handleDeleteCancel = () => {
    setTaskToDelete(null)
    setCollaboratorToDelete(null)
    setOpenDeleteModal(false)
  }

  return (
    <AnimatePresence>
      {openDeleteModal && (
        <motion.div
          variants={variants}
          initial='hidden'
          animate='visible'
          exit='hidden'
          className='absolute left-0 top-0 z-20 flex h-full w-full items-center  justify-center bg-black bg-opacity-70'
        >
          <motion.div
            className='mx-auto max-h-[90%] w-[90%] max-w-xl overflow-y-auto rounded-2xl bg-padding-gray p-6'
            variants={item}
            initial='hidden'
            animate='visible'
            exit='hidden'
          >
            <div className='flex w-full justify-end'>
              <button
                type='button'
                className='round-md flex items-center gap-2 text-gray-400 transition-colors duration-300 hover:text-white focus:outline-none focus:ring-2'
                onClick={handleDeleteCancel}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-8 w-8'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </div>
            <div className='flex flex-col gap-4'>
              <div className='text-center'>
                <p className='font-bold text-white'>
                  {taskToDelete
                    ? '¿Desea eliminar la tarea?'
                    : '¿Desea eliminar el colaborador?'}
                </p>
                <small className='text-paragraph-color'>
                  {taskToDelete
                    ? 'Una tarea eliminada no se podrá recuperar'
                    : 'Un colaborador eliminado no se podrá recuperar'}
                </small>
              </div>

              <div className='flex items-center justify-center gap-4'>
                <button
                  onClick={handleDeleteCancel}
                  className='flex items-center justify-center gap-2 rounded-3xl border border-gray-600  bg-[#1F2735] px-4 py-2 text-sm font-semibold text-paragraph-color transition-colors duration-300 hover:bg-custom-cyan hover:text-primary-blue'
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className='flex items-center justify-center gap-2 rounded-3xl border  border-gray-600 bg-red-400 px-4 py-2 text-sm font-semibold text-primary-blue hover:border-red-500'
                >
                  Confirmar
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

DeleteModal.propTypes = {
  openDeleteModal: PropTypes.bool,
  setOpenDeleteModal: PropTypes.func,
  project: PropTypes.object
}

export default DeleteModal
