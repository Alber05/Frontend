import { useState } from 'react'
import useProjects from '../hooks/useProjects'

const initialForm = {
  name: '',
  description: '',
  deadline: '',
  customer: ''
}

function ProjectsForm() {
  const [form, setForm] = useState(initialForm)

  const { submitProject } = useProjects()

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name, description, deadline, customer } = form

    await submitProject({ name, description, deadline, customer })

    setForm(initialForm)
  }

  return (
    <form
      className=' mx-auto flex  w-full max-w-xl flex-col justify-center space-y-5 rounded-md bg-gray-300 p-4 pb-10 pt-5'
      onSubmit={(e) => handleSubmit(e)}
    >
      <div>
        <label className='block font-bold text-primary-blue' htmlFor='name'>
          Nombre
        </label>
        <input
          type='text'
          id='name'
          name='name'
          placeholder='Nombre del proyecto...'
          value={form.name}
          className='block w-full border border-l-0 border-r-0 border-t-0 border-b-primary-blue bg-gray-300 px-2 py-1.5 caret-primary-blue shadow-sm outline-none placeholder:text-primary-blue sm:text-sm sm:leading-6'
          onChange={(e) => handleChange(e)}
          autoComplete='off'
          required
        />
      </div>
      <div>
        <label
          className='block font-bold text-primary-blue'
          htmlFor='description'
        >
          Description
        </label>
        <textarea
          id='description'
          name='description'
          placeholder='Descripción del proyecto...'
          value={form.description}
          className='block w-full border border-l-0 border-r-0 border-t-0 border-b-primary-blue bg-gray-300 px-2 py-1.5 caret-primary-blue shadow-sm outline-none placeholder:text-primary-blue sm:text-sm sm:leading-6'
          onChange={(e) => handleChange(e)}
          autoComplete='off'
          required
        />
      </div>
      <div>
        <label className='block font-bold text-primary-blue' htmlFor='deadline'>
          Deadline
        </label>
        <input
          type='date'
          id='deadline'
          name='deadline'
          placeholder='dd/mm/yy'
          value={form.deadline}
          className='date__input block w-full cursor-pointer appearance-none border border-l-0 border-r-0 border-t-0 border-b-primary-blue bg-gray-300 px-2 py-1.5 text-primary-blue caret-primary-blue shadow-sm outline-none placeholder:text-primary-blue sm:text-sm sm:leading-6 '
          onChange={(e) => handleChange(e)}
          autoComplete='off'
          required
        />
      </div>
      <div>
        <label className='block font-bold text-primary-blue' htmlFor='customer'>
          Cliente
        </label>
        <input
          type='text'
          id='customer'
          name='customer'
          placeholder='Nombre del cliente...'
          value={form.customer}
          className='block w-full appearance-none border border-b border-l-0 border-r-0 border-t-0 border-primary-blue bg-gray-300 px-2 py-1.5 shadow-sm outline-none placeholder:text-primary-blue focus:bg-gray-300 active:bg-gray-300 sm:text-sm sm:leading-6'
          onChange={(e) => handleChange(e)}
          autoComplete='off'
          required
        />
      </div>
      <div>
        <input
          type='submit'
          value='Crear proyecto'
          className='block w-full cursor-pointer rounded-lg bg-primary-blue px-2 py-1.5 font-bold text-gray-300 caret-primary-blue shadow-sm outline-none transition-colors duration-300 placeholder:text-primary-blue hover:bg-custom-cyan hover:text-primary-blue sm:text-sm sm:leading-6'
        />
      </div>
    </form>
  )
}

export default ProjectsForm
