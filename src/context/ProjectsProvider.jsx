import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../config/axiosClient'
import { toast } from 'sonner'
import io from 'socket.io-client'
import { ProjectsContext } from './projectsContext'
import useAuth from '../hooks/useAuth'
import '../index.css'

let socket

function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState([])
  const [project, setProject] = useState({})
  const [taskToEdit, setTaskToEdit] = useState(null)
  const [taskToDelete, setTaskToDelete] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [collaboratorsLoader, setCollaboratorsLoader] = useState(false)
  const [searchedCollaborator, setSearchedCollaborator] = useState({})
  const [collaboratorToDelete, setCollaboratorToDelete] = useState(null)

  const navigate = useNavigate()
  const { auth } = useAuth()

  useEffect(() => {
    getProjects()
  }, [auth])

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
  }, [])

  const handleToastSuccess = (successMessage) => {
    toast.success(successMessage, {
      unstyled: true,
      classNames: {
        toast: 'bg-[#62CFC8] flex items-center gap-2 p-4 rounded-md right-4'
      },

      duration: 5000
    })
  }

  const handleToastError = (errorMessage) => {
    toast.error(errorMessage, {
      unstyled: true,
      classNames: {
        toast: 'bg-[#F8D7DA] flex items-center gap-2 p-4 rounded-md right-4'
      },
      duration: 5000
    })
  }

  const getConfig = () => {
    const token = localStorage.getItem('token')
    if (!token) {
      return null
    }
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  }

  const getProjects = async () => {
    setIsLoading(true)
    try {
      const config = getConfig()

      if (!config) return

      const { data } = await axiosClient('/projects', config)

      setProjects(data)
    } catch (error) {
      handleToastError(error, 'Error al recuperar los proyectos')
    } finally {
      setIsLoading(false)
    }
  }

  const getProject = async (id) => {
    setIsLoading(true)
    try {
      const config = getConfig()
      if (!config) return

      const { data: project } = await axiosClient.get(`/projects/${id}`, config)
      setProject(project)
    } catch (error) {
      navigate('/projects')
      handleToastError(error, error.response.data.msg)
    } finally {
      setIsLoading(false)
    }
  }

  const createProject = async (project) => {
    try {
      const config = getConfig()
      if (!config) return

      const { data } = await axiosClient.post('/projects', project, config)
      setProjects([...projects, data])

      handleToastSuccess('Proyecto creado correctamente')

      setTimeout(() => {
        navigate('/projects')
      }, 1000)
    } catch (error) {
      handleToastError(error, 'Error al crear el proyecto')
    }
  }

  const deleteProject = async (id) => {
    try {
      const config = getConfig()
      if (!config) return

      // eslint-disable-next-line no-unused-vars
      const { data } = await axiosClient.delete(`/projects/${id}`, config)

      const updatedProjects = projects.filter((project) => project._id !== id)

      setProjects(updatedProjects)

      handleToastSuccess('Proyecto eliminado correctamente')

      navigate('/projects')
      setProject({})
    } catch (error) {
      handleToastError(error, 'Error al crear el proyecto')
    }
  }

  const editProject = async (project) => {
    try {
      const config = getConfig()
      if (!config) return

      const { data } = await axiosClient.put(
        `/projects/${project._id}`,
        project,
        config
      )

      const newProjects = projects.map((project) =>
        project._id == data._id ? data : project
      )

      setProjects(newProjects)

      handleToastSuccess('Proyecto editado correctamente')

      setTimeout(() => {
        navigate('/projects')
      }, 1000)
    } catch (error) {
      handleToastError(error, 'Error al editar el proyecto')
    }
  }

  const createTask = async (newTask) => {
    try {
      const config = getConfig()
      if (!config) return

      // eslint-disable-next-line no-unused-vars
      const { data } = await axiosClient.post(`/tasks`, newTask, config)

      handleToastSuccess('Tarea creada correctamente')

      socket.emit('new task', data)
    } catch (error) {
      handleToastError(error, 'Error al crear la tarea')
    }
  }

  const editTask = async (taskToEdit) => {
    try {
      const config = getConfig()
      if (!config) return

      // eslint-disable-next-line no-unused-vars
      const { data } = await axiosClient.put(
        `/tasks/${taskToEdit._id}`,
        taskToEdit,
        config
      )

      handleToastSuccess('Tarea editada correctamente')
      setTaskToEdit(null)
      socket.emit('edit task', taskToEdit)
    } catch (error) {
      handleToastError(error, 'Error al editar la tarea')
    }
  }

  const deleteTask = async (deletedTask) => {
    try {
      const config = getConfig()
      if (!config) return

      // eslint-disable-next-line no-unused-vars
      const { data } = await axiosClient.delete(
        `/tasks/${deletedTask._id}`,
        config
      )

      handleToastSuccess('Tarea eliminada correctamente')
      console.log(deletedTask)
      socket.emit('delete task', deletedTask)
    } catch (error) {
      handleToastError(error, 'Error al eliminar la tarea')
    }
  }

  const changeStatusTask = async (task) => {
    try {
      const config = getConfig()
      if (!config) return

      // eslint-disable-next-line no-unused-vars
      const { data } = await axiosClient.patch(
        `/tasks/status/${task._id}`,
        {
          status: task.status
        },
        config
      )

      handleToastSuccess('Tarea actualizada correctamente')

      socket.emit('change task status', task)
    } catch (error) {
      handleToastError(error, 'Error al actualizar la tarea')
    }
  }

  const searchCollaborator = async (email) => {
    setCollaboratorsLoader(true)
    try {
      const config = getConfig()

      const { data } = await axiosClient.post(
        '/projects/collaborators',
        email,
        config
      )
      console.log(data)
      setSearchedCollaborator(data)
    } catch (error) {
      handleToastError(error, error.response.data.msg)
    } finally {
      setCollaboratorsLoader(false)
    }
  }

  const addCollaborator = async (collaborator, projectId) => {
    try {
      const config = getConfig()
      // eslint-disable-next-line no-unused-vars
      const { data } = await axiosClient.post(
        `/projects/collaborators/${projectId}`,
        collaborator,
        config
      )

      handleToastSuccess('Colaborador agregado correctamente')

      setTimeout(() => {
        navigate(`/projects/${projectId}`)
      }, 1000)

      setSearchedCollaborator({})
    } catch (error) {
      handleToastError(error, error.response.data.msg)
    }
  }

  const deleteCollaborator = async (collaborator, projectId) => {
    try {
      const config = getConfig()

      // eslint-disable-next-line no-unused-vars
      const { data: deletedCollaborator } = await axiosClient.post(
        `/projects/delete-collaborator/${projectId}`,
        collaborator,
        config
      )
      handleToastSuccess('Colaborador eliminado correctamente')

      const currentColaborators = project.collaborators.filter(
        (collaborator) => collaborator._id !== deletedCollaborator._id
      )

      setProject({
        ...project,
        collaborators: currentColaborators
      })
    } catch (error) {
      handleToastError(error, error.response.data.msg)
    }
  }

  // Socket io

  const submitProjectTask = (task) => {
    const updatedProject = { ...project }
    updatedProject.tasks = [...updatedProject.tasks, { ...task, status: false }]
    setProject(updatedProject)
  }
  const deletedProjectTask = (task) => {
    const updatedProject = { ...project }
    updatedProject.tasks = updatedProject.tasks.filter(
      (taskState) => taskState._id !== task._id
    )
    setProject(updatedProject)
  }

  const editProjectTask = (task) => {
    const updatedProject = { ...project }
    updatedProject.tasks = updatedProject.tasks.map((taskState) =>
      taskState._id === task._id ? task : taskState
    )
    setProject(updatedProject)
  }

  const changeProjectTaskStatus = (task) => {
    const updatedProject = { ...project }
    updatedProject.tasks = updatedProject.tasks.map((taskState) =>
      taskState._id === task._id ? task : taskState
    )
    setProject(updatedProject)
  }

  const logOut = () => {
    setProjects([])
    setProject({})
  }

  return (
    <ProjectsContext.Provider
      value={{
        getProjects,
        projects,
        createProject,
        getProject,
        project,
        isLoading,
        editProject,
        deleteProject,
        createTask,
        editTask,
        deleteTask,
        taskToEdit,
        setTaskToEdit,
        taskToDelete,
        setTaskToDelete,
        searchCollaborator,
        searchedCollaborator,
        collaboratorsLoader,
        addCollaborator,
        collaboratorToDelete,
        setCollaboratorToDelete,
        deleteCollaborator,
        changeStatusTask,
        submitProjectTask,
        deletedProjectTask,
        editProjectTask,
        changeProjectTaskStatus,
        logOut
      }}
    >
      {children}
    </ProjectsContext.Provider>
  )
}

ProjectsProvider.propTypes = {
  children: PropTypes.element.isRequired
}

export { ProjectsProvider, ProjectsContext }
