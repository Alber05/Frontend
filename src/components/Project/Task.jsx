import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheck,
  faHourglassHalf,
  faPenToSquare,
  faTrashCan
} from '@fortawesome/free-solid-svg-icons'
import { dateFormater } from '../../helpers/dateFormater'
import useProjects from '../../hooks/useProjects'

const Task = ({ task, setModalIsOpen, setOpenDeleteModal }) => {
  const {
    setTaskToEdit,
    setTaskToDelete,
    setCollaboratorToDelete,
    changeStatusTask
  } = useProjects()

  const handleEditTask = (task) => {
    setTaskToEdit({ ...task, deadline: task.deadline.split('T')[0] })
    setModalIsOpen(true)
  }

  const handleDeleteTask = (task) => {
    setCollaboratorToDelete(null)
    setTaskToDelete(task)
    setOpenDeleteModal(true)
  }

  const handleStatusTask = async (task) => {
    changeStatusTask(task)
  }

  return (
    <article
      key={task?._id}
      className=' flex flex-col justify-between gap-2 rounded-md border border-gray-600 bg-[#1F2735] p-6'
    >
      <p className='border-opacity-1 py-1.5 text-xl font-bold text-white'>
        {task?.name}{' '}
      </p>

      <p className='border-opacity-1  py-1.5 text-sm text-paragraph-color'>
        Descripción: {task?.description} Lorem ipsum dolor, sit amet consectetur
        adipisicing elit. Voluptate, sunt quis eius voluptas minus quam optio
        sed recusandae iste explicabo porro illum debitis totam fuga illo
        delectus cupiditate, autem ipsa?
      </p>
      <p className='border-opacity-1 py-1.5 text-sm text-paragraph-color'>
        Fecha de entrega: {dateFormater(task?.deadline)}{' '}
      </p>

      {task?.status && (
        <p className='border-opacity-1 py-1.5 text-sm text-paragraph-color'>
          Completada por: {task?.completed?.name}{' '}
        </p>
      )}

      <div className='flex items-center justify-center gap-4 '>
        <button
          className='group relative flex h-[30px] w-[42px] items-center justify-center overflow-x-hidden rounded-3xl border-2 border-primary-blue bg-custom-cyan font-semibold text-primary-blue transition-all hover:w-[86px] hover:justify-start hover:px-2'
          title='Editar'
          onClick={() => handleEditTask(task)}
        >
          <FontAwesomeIcon icon={faPenToSquare} height={15} width={15} />
          <span className='absolute right-0 translate-x-full opacity-0 transition-opacity duration-200 group-hover:right-2 group-hover:translate-x-0 group-hover:opacity-100'>
            Editar
          </span>
        </button>
        <button
          className='group relative flex h-[30px] w-[42px] items-center justify-center overflow-x-hidden rounded-3xl border-2 border-primary-blue bg-red-400 font-semibold text-primary-blue transition-all hover:w-[106px] hover:justify-start hover:px-2'
          title='Eliminar'
          onClick={() => {
            handleDeleteTask(task)
          }}
        >
          <FontAwesomeIcon icon={faTrashCan} height={15} width={15} />
          <span className='absolute right-0 translate-x-full transition-transform duration-100 group-hover:right-2 group-hover:translate-x-0'>
            Eliminar
          </span>
        </button>
        {task.status == false ? (
          <button
            className='group relative flex h-[30px] w-[42px] items-center justify-center overflow-hidden rounded-3xl border-2 border-primary-blue  bg-orange-400 text-primary-blue transition-all hover:w-[132px] hover:justify-start hover:px-2'
            onClick={() => handleStatusTask({ ...task, status: true })}
          >
            <FontAwesomeIcon
              icon={faHourglassHalf}
              height={15}
              width={15}
              className=''
            />

            <span className='absolute right-0 translate-x-full font-semibold text-primary-blue transition-transform duration-100 group-hover:right-2 group-hover:translate-x-0'>
              Incompleta
            </span>
          </button>
        ) : (
          <button
            className='group relative flex h-[30px] w-[42px] items-center justify-center overflow-hidden rounded-3xl border-2 border-primary-blue bg-green-400 text-primary-blue transition-all hover:w-[118px] hover:justify-start hover:px-2'
            onClick={() => handleStatusTask({ ...task, status: false })}
          >
            <FontAwesomeIcon
              icon={faCheck}
              height={20}
              width={15}
              className=''
            />

            <span className='absolute right-0 translate-x-full font-semibold text-primary-blue transition-transform duration-100 group-hover:right-2 group-hover:translate-x-0'>
              Completa
            </span>
          </button>
        )}
      </div>
    </article>
  )
}

Task.propTypes = {
  task: PropTypes.object,
  setModalIsOpen: PropTypes.func,
  setTaskToEdit: PropTypes.func,
  setOpenDeleteModal: PropTypes.func
}

export default Task
