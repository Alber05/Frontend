import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import useProjects from '../../hooks/useProjects'

const initialForm = {
  name: '',
  description: '',
  deadline: '',
  customer: ''
}
function ProjectsForm({ projectToEdit = initialForm }) {
  const [form, setForm] = useState(initialForm)

  const { createProject, editProject } = useProjects()

  useEffect(() => {
    if (projectToEdit._id) {
      setForm({
        ...projectToEdit,
        deadline: projectToEdit.deadline.split('T')[0]
      })
    }
  }, [])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name, description, deadline, customer } = form

    if (!form._id) {
      await createProject({ name, description, deadline, customer })
    } else {
      await editProject({ ...form, deadline })
    }

    setForm(initialForm)
  }

  return (
    <form
      className=' mx-auto flex  w-full max-w-xl flex-col justify-center space-y-5 rounded-md bg-padding-gray p-4 py-10'
      onSubmit={(e) => handleSubmit(e)}
    >
      <div>
        <label className='block font-bold text-white' htmlFor='name'>
          Nombre
        </label>
        <input
          type='text'
          id='name'
          name='name'
          placeholder='Nombre del proyecto...'
          value={form.name}
          className='block w-full rounded-md border border-gray-600 bg-transparent px-2 py-1.5 text-paragraph-color caret-paragraph-color shadow-sm outline-none placeholder:text-paragraph-color sm:text-sm sm:leading-6'
          onChange={(e) => handleChange(e)}
          autoComplete='off'
          required
        />
      </div>
      <div>
        <label className='block font-bold text-white' htmlFor='description'>
          Descripción
        </label>
        <textarea
          id='description'
          name='description'
          placeholder='Descripción del proyecto...'
          value={form.description}
          className='block h-[38px] w-full rounded-md border border-gray-600 bg-transparent px-2 py-1.5 text-paragraph-color caret-paragraph-color shadow-sm outline-none placeholder:text-paragraph-color sm:text-sm sm:leading-6'
          onChange={(e) => handleChange(e)}
          autoComplete='off'
          required
        />
      </div>
      <div>
        <label className='block font-bold text-white' htmlFor='deadline'>
          Deadline
        </label>
        <input
          type='date'
          id='deadline'
          name='deadline'
          placeholder='dd/mm/yy'
          value={form.deadline}
          className='date__input block w-full cursor-pointer appearance-none rounded-md border border-gray-600 bg-padding-gray px-2 py-1.5 text-paragraph-color caret-paragraph-color shadow-sm outline-none placeholder:text-paragraph-color sm:text-sm sm:leading-6 '
          onChange={(e) => handleChange(e)}
          autoComplete='off'
          required
        />
      </div>
      <div>
        <label className='block font-bold text-white' htmlFor='customer'>
          Cliente
        </label>
        <input
          type='text'
          id='customer'
          name='customer'
          placeholder='Nombre del cliente...'
          value={form.customer}
          className='block w-full appearance-none rounded-md border border-gray-600 bg-padding-gray px-2 py-1.5 text-paragraph-color  shadow-sm outline-none placeholder:text-paragraph-color focus:bg-padding-gray active:bg-padding-gray sm:text-sm sm:leading-6'
          onChange={(e) => handleChange(e)}
          autoComplete='off'
          required
        />
      </div>
      <div>
        <input
          type='submit'
          value={form._id ? 'Editar proyecto' : 'Crear proyecto'}
          className='bg mt-[10px] block w-full cursor-pointer rounded-md bg-primary-blue px-2 py-1.5 font-bold  text-white caret-paragraph-color shadow-sm outline-none transition-colors duration-300 placeholder:text-paragraph-color hover:bg-custom-cyan hover:text-primary-blue sm:text-sm sm:leading-6'
        />
      </div>
    </form>
  )
}

ProjectsForm.propTypes = {
  projectToEdit: PropTypes.object
}

export default ProjectsForm
