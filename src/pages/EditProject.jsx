import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useProjects from '../hooks/useProjects'
import ProjectsForm from '../components/NewProject-EditProyect/ProjectsForm'
import Loader from '../components/Loader'
import EditProjectVector from '../assets/edit.png'

export default function EditProject() {
  const { getProject, project, isLoading } = useProjects()
  const params = useParams()

  useEffect(() => {
    getProject(params.id)
  }, [])

  //TODO: Revisar y terminar página
  return (
    <main className='h-full'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className='font-Russo text-4xl font-bold'>{project.name}</h1>
          <img
            src={EditProjectVector}
            alt=''
            className='mx-auto max-h-[200px]'
          />
          <h1 className='text-nowrap text-center font-Russo text-4xl font-bold text-primary-blue'>
            Editar proyecto
          </h1>
          <ProjectsForm projectToEdit={project} />
        </>
      )}
    </main>
  )
}
