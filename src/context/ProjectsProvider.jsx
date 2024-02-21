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
  const [isProjectLoading, setIsProjectLoading] = useState(true)
  const [isProjectsLoanding, setIsProjectsLoanding] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    setIsProjectsLoanding(true)
    const getProjects = async () => {
      try {
        const token = localStorage.getItem('token')
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }

        const { data } = await axiosClient('/projects', config)

        setProjects(data)
      } catch (error) {
        // TODO: Manejar la respuesta
        console.log(error)
      } finally {
        setIsProjectsLoanding(false)
      }
    }

    getProjects()
  }, [])

  const getProject = async (id) => {
    setIsProjectLoading(true)
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

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
      const token = localStorage.getItem('token')
      if (!token) return

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await axiosClient.post('/projects', project, config)
      setProjects([...projects, data])

      toast.success('Proyecto creado', {
        unstyled: true,
        classNames: {
          toast: 'bg-[#62CFC8] flex items-center gap-2 p-4 rounded-md right-4'
        },

        duration: 5000
      })

      setTimeout(() => {
        navigate('/projects')
      }, 3000)
    } catch (error) {
      console.log(console.error())
      toast.error('Error al crear el proyecto', {
        unstyled: true,
        classNames: {
          toast: 'bg-[#F8D7DA] flex items-center gap-2 p-4 rounded-md right-4'
        },
        description: error.response.data.msg,
        duration: 5000
      })
    }
  }

  const deleteProject = async (id) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await axiosClient.delete(`/projects/${id}`, config)

      const updatedProjects = projects.filter((project) => project._id !== id)

      setProjects(updatedProjects)

      toast.success('Proyecto eliminado', {
        unstyled: true,
        classNames: {
          toast: 'bg-[#62CFC8] flex items-center gap-2 p-4 rounded-md right-4'
        },

        duration: 5000
      })

      navigate('/projects')
      setProject({})
    } catch (error) {
      console.log(console.error())
      toast.error('Error al crear el proyecto', {
        unstyled: true,
        classNames: {
          toast: 'bg-[#F8D7DA] flex items-center gap-2 p-4 rounded-md right-4'
        },
        description: error.response.data.msg,
        duration: 5000
      })
    }
  }

  const editProject = async (project) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await axiosClient.put(
        `/projects/${project._id}`,
        project,
        config
      )

      const newProjects = projects.map((project) =>
        project._id == data._id ? data : project
      )

      setProjects(newProjects)

      toast.success('Proyecto Editado', {
        unstyled: true,
        classNames: {
          toast: 'bg-[#62CFC8] flex items-center gap-2 p-4 rounded-md right-4'
        },

        duration: 5000
      })

      setTimeout(() => {
        navigate('/projects')
      }, 3000)
    } catch (error) {
      console.log(console.error())
      toast.error('Error al editar el proyecto', {
        unstyled: true,
        classNames: {
          toast: 'bg-[#F8D7DA] flex items-center gap-2 p-4 rounded-md right-4'
        },
        description: error.response.data.msg,
        duration: 5000
      })
    }
  }

  const submitTask = async (newTask) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await axiosClient.post(`/tasks`, newTask, config)
      setProject({
        ...project,
        tasks: [...project.tasks, { ...newTask, status: false }]
      })
      toast.success('Tarea creada con éxito', {
        unstyled: true,
        classNames: {
          toast: 'bg-[#62CFC8] flex items-center gap-2 p-4 rounded-md right-4'
        },

        duration: 5000
      })
    } catch (error) {
      console.log(error)
      toast.error('Error al eliminar la tarea', {
        unstyled: true,
        classNames: {
          toast: 'bg-[#F8D7DA] flex items-center gap-2 p-4 rounded-md right-4'
        },
        description: error.response.data.msg,
        duration: 5000
      })
    }
  }

  const editTask = async (newTask) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

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

      toast.success('Tarea editada con éxito', {
        unstyled: true,
        classNames: {
          toast: 'bg-[#62CFC8] flex items-center gap-2 p-4 rounded-md right-4'
        },

        duration: 5000
      })
    } catch (error) {
      console.log(error)
      toast.error('Error al editar la tarea', {
        unstyled: true,
        classNames: {
          toast: 'bg-[#F8D7DA] flex items-center gap-2 p-4 rounded-md right-4'
        },
        description: error.response.data.msg,
        duration: 5000
      })
    }
  }

  const deleteTask = async (deletedTask) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

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

      toast.success('Tarea eliminada', {
        unstyled: true,
        classNames: {
          toast: 'bg-[#62CFC8] flex items-center gap-2 p-4 rounded-md right-4'
        },

        duration: 5000
      })
    } catch (error) {
      console.log(error)
      toast.error('Error al eliminar la tarea', {
        unstyled: true,
        classNames: {
          toast: 'bg-[#F8D7DA] flex items-center gap-2 p-4 rounded-md right-4'
        },
        description: error.response.data.msg,
        duration: 5000
      })
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
        deleteTask
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
