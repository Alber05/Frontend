import { useState } from 'react'
import useProjects from '../../hooks/useProjects'

const initialForm = {
  email: ''
}

const CollaboratorForm = () => {
  const [form, setForm] = useState(initialForm)

  const { searchCollaborator } = useProjects()

  const handleChange = (e) => {
    setForm({
      email: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await searchCollaborator(form)
    setForm(initialForm)
  }

  return (
    <form
      className='flex flex-col items-center justify-center'
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        type='text'
        id='email'
        name='email'
        placeholder='Introduzca el Email del colaborador...'
        className='w-full max-w-md flex-1 rounded-md border border-gray-600 bg-transparent px-2 py-1.5 text-paragraph-color caret-paragraph-color shadow-sm outline-none placeholder:text-paragraph-color sm:text-sm sm:leading-6'
        autoComplete='off'
        required
        value={form.email}
        onChange={(e) => handleChange(e)}
      />

      <input
        type='submit'
        value='Buscar colaborador'
        className='mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-3xl border border-gray-600  bg-[#1F2735] px-4 py-2 text-sm font-semibold text-paragraph-color transition-colors duration-300 hover:bg-green-400 hover:text-primary-blue'
      />
    </form>
  )
}

export default CollaboratorForm
