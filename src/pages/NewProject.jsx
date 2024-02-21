import ProjectsForm from '../components/ProjectsForm'
import NewProjectVector from '../assets/projects.png'

function NewProject() {
  return (
    <main className='h-full w-full p-6'>
      <img src={NewProjectVector} alt='' className='mx-auto max-h-[200px]' />
      <h1 className='text-nowrap text-center font-Russo text-4xl font-bold text-primary-blue'>
        Crear proyecto
      </h1>
      <ProjectsForm></ProjectsForm>
    </main>
  )
}

export default NewProject
