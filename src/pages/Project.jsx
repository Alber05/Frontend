import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPenToSquare,
  faTrashCan,
  faPlus
} from '@fortawesome/free-solid-svg-icons'
import io from 'socket.io-client'
import useProjects from '../hooks/useProjects'
import useAdmin from '../hooks/useAdmin'
import Task from '../components/Project/Task'
import Collaborator from '../components/Project/Collaborator'
import DeleteModal from '../components/Project/DeleteModal'
import FormTaskModal from '../components/FormTaskModal'
import Loader from '../components/Loader'
import NoDataImage from '../assets/no-data-image.png'
import { dateFormater } from '../helpers/dateFormater'

let socket

export default function Project() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const params = useParams()

  const {
    getProject,
    project,
    isLoading,
    deleteProject,
    taskToEdit,
    setTaskToEdit,
    submitProjectTask,
    deletedProjectTask,
    editProjectTask,
    changeProjectTaskStatus
  } = useProjects()

  const admin = useAdmin()

  useEffect(() => {
    getProject(params.id)
  }, [params.id])

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
    socket.emit('open project', params.id)
  }, [])

  useEffect(() => {
    socket.on('added task', (newTask) => {
      if (newTask.project === project._id) {
        submitProjectTask(newTask)
      }
    })

    socket.on('delete task', (deletedTask) => {
      if (deletedTask.project === project._id) {
        deletedProjectTask(deletedTask)
      }
    })

    socket.on('edit task', (editedTask) => {
      if (editedTask.project === project._id) {
        editProjectTask(editedTask)
      }
    })

    socket.on('change task status', (editedTask) => {
      if (editedTask.project === project._id) {
        changeProjectTaskStatus(editedTask)
      }
    })
  })

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
      className={`${modalIsOpen || openDeleteModal ? 'overflow-hidden' : 'overflow-y-auto overflow-x-hidden'} relative h-full `}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <section className='border border-l-0 border-r-0 border-t-0 border-b-gray-800 px-6 py-6'>
            <div className='flex w-full justify-between gap-4 rounded-md '>
              <div className='grid space-y-2'>
                <h1 className='text-2xl font-bold text-white md:text-3xl'>
                  {project?.name}
                </h1>

                <p className='text-sm text-paragraph-color'>
                  <span className='font-black'>Descripción:</span>{' '}
                  {project?.description}
                </p>
                <p className='text-sm text-paragraph-color'>
                  <span className='font-black'>Cliente:</span>{' '}
                  {project?.customer}
                </p>
                <p className='text-sm text-paragraph-color'>
                  <span className='font-black'>Deadline:</span>{' '}
                  {dateFormater(project?.deadline)}
                </p>
              </div>

              <div className='flex flex-col justify-center gap-4'>
                {admin && (
                  <>
                    <Link
                      to={`/projects/edit-project/${params?.id}`}
                      className='flex items-center justify-center gap-2 rounded-3xl border border-gray-600  bg-[#1F2735] px-4 py-2 text-sm font-semibold text-paragraph-color transition-colors duration-300 hover:bg-custom-cyan hover:text-primary-blue'
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
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        height={15}
                        width={15}
                      />
                      <span className='hidden sm:block'>Eliminar</span>
                    </button>
                    <button
                      className='flex items-center justify-center gap-2 rounded-3xl border border-gray-600  bg-[#1F2735] px-4 py-2 text-sm font-semibold text-paragraph-color transition-colors duration-300 hover:bg-green-400 hover:text-primary-blue'
                      title='Añadir tarea'
                      onClick={handleNewTask}
                    >
                      <FontAwesomeIcon icon={faPlus} height={15} width={15} />
                      <span className='hidden sm:block'>Añadir tarea</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </section>
          <section className='border border-l-0 border-r-0 border-t-0 border-b-gray-800 px-6 py-6'>
            <h3 className='text-lg font-semibold text-white md:text-2xl'>
              Tareas
            </h3>

            {project?.tasks?.length === 0 ? (
              <div className='flex flex-col items-center'>
                <img src={NoDataImage} alt='' />
              </div>
            ) : (
              <div className='grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4 py-6'>
                {project?.tasks?.map((task) => (
                  <Task
                    key={task._id}
                    task={task}
                    setModalIsOpen={setModalIsOpen}
                    setTaskToEdit={setTaskToEdit}
                    setOpenDeleteModal={setOpenDeleteModal}
                  />
                ))}
              </div>
            )}
          </section>

          <section className=' px-6 py-6'>
            <div className='flex items-center justify-between'>
              <h3 className='text-lg font-semibold text-white md:text-2xl'>
                Colaboradores
              </h3>
              <Link
                to={`/projects/new-collaborator/${project?._id}`}
                className='flex items-center  justify-center gap-2 rounded-3xl border border-gray-600  bg-[#1F2735] px-4 py-2 text-sm font-semibold text-paragraph-color transition-colors duration-300 hover:bg-green-400 hover:text-primary-blue'
                title='Añadir tarea'
              >
                <FontAwesomeIcon icon={faPlus} height={15} width={15} />
                <span className='hidden sm:block'>Añadir colaborador</span>
              </Link>
            </div>
            <div className='py-6'>
              {project?.collaborators?.map((collaborator) => (
                <Collaborator
                  key={collaborator._id}
                  collaborator={collaborator}
                  openDeleteModal={openDeleteModal}
                  setOpenDeleteModal={setOpenDeleteModal}
                />
              ))}
            </div>
          </section>
        </>
      )}
      <FormTaskModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        taskToEdit={taskToEdit}
      />
      <DeleteModal
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        project={project}
      />
    </main>
  )
}
