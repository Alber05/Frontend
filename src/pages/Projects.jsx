import { useState, useEffect } from 'react'
import ProjectPreview from '../components/ProjectPreview'
import axiosClient from '../config/axiosClient'

const Projects = () => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
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
      }
    }

    getProjects()
  }, [])

  //TODO: Añadir condición para cuando no hay proyectos
  return (
    <main className='h-full'>
      <h1 className='text-nowrap py-8 text-center font-Russo text-4xl font-bold text-primary-blue'>
        Proyectos
      </h1>
      <div className='flex flex-col items-center gap-4 pb-8'>
        {projects?.map((project) => (
          <ProjectPreview key={project._id} project={project} />
        ))}
      </div>
    </main>
  )
}

export default Projects
