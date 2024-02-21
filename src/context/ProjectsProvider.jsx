import { useState, useEffect, createContext } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../config/axiosClient'
import { toast } from 'sonner'
import '../index.css'

const ProjectsContext = createContext({})

function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState([])
  const [project, setProject] = useState({})
  const [taskToEdit, setTaskToEdit] = useState(null)
  const [isProjectLoading, setIsProjectLoading] = useState(true)
  const [isProjectsLoanding, setIsProjectsLoanding] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    getProjects()
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

  const handleToastError = (error, errorMessage) => {
    console.log(error)
    toast.error(errorMessage, {
      unstyled: true,
      classNames: {
        toast: 'bg-[#F8D7DA] flex items-center gap-2 p-4 rounded-md right-4'
      },
      description: error.response.data.msg,
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
    setIsProjectsLoanding(true)
    try {
      const config = getConfig()

      if (!config) return

      const { data } = await axiosClient('/projects', config)

      setProjects(data)
    } catch (error) {
      handleToastError(error, 'Error al recuperar los proyectos')
    } finally {
      setIsProjectsLoanding(false)
    }
  }

  const getProject = async (id) => {
    setIsProjectLoading(true)
    try {
      const config = getConfig()
      if (!config) return

      const { data: project } = await axiosClient.get(`/projects/${id}`, config)
      setProject(project)
    } catch (error) {
      console.log(error)
    } finally {
      setIsProjectLoading(false)
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
      }, 3000)
    } catch (error) {
      console.log(console.error())
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
      }, 3000)
    } catch (error) {
      handleToastError(error, 'Error al editar el proyecto')
    }
  }

  const submitTask = async (newTask) => {
    try {
      const config = getConfig()
      if (!config) return

      // eslint-disable-next-line no-unused-vars
      const { data } = await axiosClient.post(`/tasks`, newTask, config)
      setProject({
        ...project,
        tasks: [...project.tasks, { ...newTask, status: false }]
      })
      handleToastSuccess('Tarea creada correctamente')
    } catch (error) {
      handleToastError(error, 'Error al crear la tarea')
    }
  }

  const editTask = async (newTask) => {
    try {
      const config = getConfig()
      if (!config) return

      // eslint-disable-next-line no-unused-vars
      const { data } = await axiosClient.put(
        `/tasks/${newTask._id}`,
        newTask,
        config
      )
      const editedTasks = project.tasks.map((task) =>
        task._id === newTask._id ? newTask : task
      )
      setProject({
        ...project,
        tasks: editedTasks
      })

      handleToastSuccess('Tarea editada correctamente')
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

      const newTasks = project.tasks.filter(
        (task) => task._id != deletedTask._id
      )
      setProject({
        ...project,
        tasks: newTasks
      })

      handleToastSuccess('Tarea eliminada correctamente')
    } catch (error) {
      handleToastError(error, 'Error al eliminar la tarea')
    }
  }

  return (
    <ProjectsContext.Provider
      value={{
        isProjectsLoanding,
        projects,
        createProject,
        getProject,
        project,
        isProjectLoading,
        editProject,
        deleteProject,
        submitTask,
        editTask,
        deleteTask,
        taskToEdit,
        setTaskToEdit
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
