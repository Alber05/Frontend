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
    <main className='p-6'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <img
            src={EditProjectVector}
            alt=''
            className='mx-auto max-h-[200px]'
          />
          <ProjectsForm projectToEdit={project} />
        </>
      )}
    </main>
  )
}
