import useProjects from '../hooks/useProjects'
import ProjectPreview from '../components/ProjectPreview'
import NoDataImage from '../assets/no-data-image.png'
import Loader from '../components/Loader'

const Projects = () => {
  const { projects, isProjectsLoanding } = useProjects()

  //TODO: Añadir condición para cuando no hay proyectos

  if (isProjectsLoanding) return <Loader />

  return (
    <main className='h-full'>
      {projects.length == 0 ? (
        <div className='flex h-full w-full flex-col items-center justify-center'>
          <h1 className=' py-8 text-center text-3xl font-bold tracking-wider text-white'>
            Todavia no hay proyectos
          </h1>
          <img src={NoDataImage} alt='' />
        </div>
      ) : (
        <>
          <div className='flex h-[100px] items-center border  border-l-0 border-r-0 border-t-0 border-b-gray-800 bg-primary-blue px-6 py-4'>
            <h1 className='font-Russo text-2xl font-bold tracking-wider text-white'>
              Proyectos
            </h1>
          </div>

          <div className='gap-4 pb-8'>
            {projects?.map((project) => (
              <ProjectPreview key={project._id} project={project} />
            ))}
          </div>
        </>
      )}
    </main>
  )
}

export default Projects
