import PropTypes from 'prop-types'
import useProjects from '../hooks/useProjects'
import { dateFormater } from '../helpers/dateFormater'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPenToSquare,
  faTrashCan,
  faCircleXmark,
  faCircleCheck
} from '@fortawesome/free-solid-svg-icons'

const Task = ({ task, setModalIsOpen, setTaskToEdit }) => {
  const handleEditTask = (task) => {
    setTaskToEdit({ ...task, deadline: task.deadline.split('T')[0] })
    setModalIsOpen(true)
  }

  const { deleteTask } = useProjects()

  return (
    <article
      key={task._id}
      className=' flex flex-col gap-2 rounded-md border border-gray-600 bg-[#1F2735] p-6'
    >
      <div className='flex items-center justify-between'>
        <p className='border-opacity-1 py-1.5 text-xl font-bold text-white'>
          {task.name}{' '}
        </p>

        {task.status == false ? (
          <FontAwesomeIcon
            icon={faCircleXmark}
            className='h-[25px] text-red-500'
            title='Pendiente'
          />
        ) : (
          <FontAwesomeIcon
            icon={faCircleCheck}
            className='h-[25px] text-green-500'
            title='Completada'
          />
        )}
      </div>

      <p className='border-opacity-1  py-1.5 text-sm text-paragraph-color'>
        Descripción: {task.description} Lorem ipsum dolor, sit amet consectetur
        adipisicing elit. Voluptate, sunt quis eius voluptas minus quam optio
        sed recusandae iste explicabo porro illum debitis totam fuga illo
        delectus cupiditate, autem ipsa?
      </p>
      <p className='border-opacity-1 py-1.5 text-sm text-paragraph-color'>
        Fecha de entrega: {dateFormater(task.deadline)}{' '}
      </p>

      <div className='flex items-center justify-center gap-4 '>
        <button
          className='flex items-center  justify-center gap-2 rounded-3xl border border-gray-600  bg-[#1F2735] px-4 py-2 text-sm font-semibold text-paragraph-color transition-colors duration-300 hover:bg-custom-cyan hover:text-primary-blue'
          title='Editar'
          onClick={() => handleEditTask(task)}
        >
          <FontAwesomeIcon icon={faPenToSquare} height={15} width={15} />
          <span className='hidden hover:block'>Editar</span>
        </button>
        <button
          className='w-[32px]gap-2 flex items-center justify-center rounded-3xl border border-gray-600  bg-[#1F2735] px-4 py-2 text-sm font-semibold text-paragraph-color transition-colors duration-300 hover:bg-red-400 hover:text-primary-blue'
          title='Eliminar'
          onClick={() => {
            deleteTask(task)
          }}
        >
          <FontAwesomeIcon icon={faTrashCan} height={15} width={15} />
          <span className='hidden hover:block'>Eliminar</span>
        </button>
      </div>
    </article>
  )
}

Task.propTypes = {
  task: PropTypes.object,
  setModalIsOpen: PropTypes.func,
  setTaskToEdit: PropTypes.func
}

export default Task
