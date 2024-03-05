import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useProjects from '../hooks/useProjects'
import CollaboratorForm from '../components/NewCollaborator/CollaboratorForm'
import Loader from '../components/Loader'

function NewCollaborator() {
  const {
    project,
    getProject,
    isLoading,
    collaboratorsLoader,
    searchedCollaborator,
    addCollaborator
  } = useProjects()

  const { id } = useParams()

  useEffect(() => {
    getProject(id)
  }, [])

  if (isLoading) return <Loader />

  return (
    <main className=''>
      <div className='space-y-4 rounded-md border border-l-0 border-r-0 border-t-0 border-b-gray-800 px-6 py-6'>
        <h1 className='text-center text-2xl font-bold text-white md:text-3xl'>
          Añadir Colaborador al proyecto: {project?.name}
        </h1>
        <CollaboratorForm />
      </div>

      {collaboratorsLoader ? (
        <Loader />
      ) : (
        searchedCollaborator?._id && (
          <div className='mx-auto mt-10 flex w-full max-w-xl flex-col justify-center space-y-5  rounded-md bg-padding-gray p-4 py-10'>
            <h3 className='text-center text-lg font-bold text-white'>
              Resultado
            </h3>
            <div className='flex items-center justify-between gap-4'>
              <p className='font-semibold text-paragraph-color'>
                {searchedCollaborator.name}
              </p>

              <button
                value='Agregar colaborador'
                className='cursor-pointer rounded-lg bg-primary-blue px-2 py-1.5 font-bold text-gray-300 shadow-sm outline-none transition-colors duration-300 placeholder:text-paragraph-color hover:bg-custom-cyan hover:text-primary-blue sm:text-sm sm:leading-6'
                onClick={() => addCollaborator(searchedCollaborator, id)}
              >
                Agregar al proyecto
              </button>
            </div>
          </div>
        )
      )}
    </main>
  )
}

export default NewCollaborator
