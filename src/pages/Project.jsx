import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import FormTaskModal from '../components/FormTaskModal'
import Loader from '../components/Loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPenToSquare,
  faTrashCan,
  faPlus
} from '@fortawesome/free-solid-svg-icons'
import useProjects from '../hooks/useProjects'
import Task from '../components/Task'
import { dateFormater } from '../helpers/dateFormater'
import NoDataImage from '../assets/no-data-image.png'

export default function Project() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState(null)
  const params = useParams()

  const { getProject, project, isProjectLoading, deleteProject } = useProjects()

  useEffect(() => {
    getProject(params.id)
  }, [params.id])

  const handleDelete = (id) => {
    if (confirm('¿Desea eliminar el proyecto?')) {
      deleteProject(id)
    } else {
      return
    }
  }

  const handleNewTask = () => {
    setTaskToEdit(null)
    setModalIsOpen(true)
  }

  return (
    <main
      className={`${modalIsOpen ? 'overflow-hidden' : 'overflow-y-auto overflow-x-hidden'} relative h-full`}
    >
      <FormTaskModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        taskToEdit={taskToEdit}
      />
      {isProjectLoading ? (
        <Loader />
      ) : (
        <>
          <section className='flex items-center gap-4'>
            <div className='flex w-full justify-between gap-4 rounded-md border border-l-0 border-r-0 border-t-0 border-b-gray-800 px-6 py-6'>
              <div className='grid space-y-2'>
                <h1 className='text-2xl font-bold text-white md:text-3xl'>
                  {project.name}
                </h1>

                <p className='text-sm text-paragraph-color'>
                  <span className='font-black'>Descripción:</span>{' '}
                  {project.description}
                </p>
                <p className='text-sm text-paragraph-color'>
                  <span className='font-black'>Cliente:</span>{' '}
                  {project.customer}
                </p>
                <p className='text-sm text-paragraph-color'>
                  <span className='font-black'>Deadline:</span>{' '}
                  {dateFormater(project.deadline)}
                </p>
              </div>

              <div className='flex flex-col gap-4'>
                <Link
                  to={`/projects/edit-project/${params.id}`}
                  className='flex items-center  justify-center gap-2 rounded-3xl border border-gray-600  bg-[#1F2735] px-4 py-2 text-sm font-semibold text-paragraph-color transition-colors duration-300 hover:bg-custom-cyan hover:text-primary-blue'
                  title='Editar'
                >
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    height={15}
                    width={15}
                  />
                  <span className='hidden sm:block'>Editar</span>
                </Link>
                <button
                  className='flex items-center  justify-center gap-2 rounded-3xl border border-gray-600  bg-[#1F2735] px-4 py-2 text-sm font-semibold text-paragraph-color transition-colors duration-300 hover:bg-red-400 hover:text-primary-blue'
                  title='Eliminar'
                  onClick={() => handleDelete(project._id)}
                >
                  <FontAwesomeIcon icon={faTrashCan} height={15} width={15} />
                  <span className='hidden sm:block'>Eliminar</span>
                </button>
                <button
                  className='flex items-center  justify-center gap-2 rounded-3xl border border-gray-600  bg-[#1F2735] px-4 py-2 text-sm font-semibold text-paragraph-color transition-colors duration-300 hover:bg-green-400 hover:text-primary-blue'
                  title='Añadir tarea'
                  onClick={handleNewTask}
                >
                  <FontAwesomeIcon icon={faPlus} height={15} width={15} />
                  <span className='hidden sm:block'>Añadir tarea</span>
                </button>
              </div>
            </div>
          </section>
          <div className=' px-6 py-6 '>
            <h2 className='text-xl font-bold text-white md:text-2xl'>Tareas</h2>
          </div>

          {project?.tasks?.length === 0 ? (
            <div className='flex flex-col items-center'>
              <img src={NoDataImage} alt='' />
            </div>
          ) : (
            <section className='grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 px-6 pb-10'>
              {project?.tasks?.map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  setModalIsOpen={setModalIsOpen}
                  setTaskToEdit={setTaskToEdit}
                />
              ))}
            </section>
          )}
        </>
      )}
    </main>
  )
}
