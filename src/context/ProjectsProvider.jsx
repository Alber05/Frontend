import { useState, createContext } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../config/axiosClient'
import { toast } from 'sonner'
import '../index.css'

const ProjectsContext = createContext({})

function ProjectsProvider({ children }) {
  const [contextLoading, setContextLoading] = useState(true)

  const navigate = useNavigate()

  const submitProject = async (project) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      await axiosClient.post('/projects', project, config)

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

  return (
    <ProjectsContext.Provider
      value={{ contextLoading, submitProject, setContextLoading }}
    >
      {children}
    </ProjectsContext.Provider>
  )
}

ProjectsProvider.propTypes = {
  children: PropTypes.element.isRequired
}

export { ProjectsProvider, ProjectsContext }
