import ProjectsForm from '../components/NewProject-EditProyect/ProjectsForm'
import NewProjectVector from '../assets/projects.png'

function NewProject() {
  return (
    <main className='p-6'>
      <img src={NewProjectVector} alt='' className='mx-auto max-h-[200px]' />
      <ProjectsForm />
    </main>
  )
}

export default NewProject
