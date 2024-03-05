import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams } from 'react-router-dom'
import useProjects from '../hooks/useProjects'

const initialForm = {
  name: '',
  priority: '',
  description: '',
  deadline: '',
  customer: ''
}

const FormTaskModal = ({ modalIsOpen, setModalIsOpen }) => {
  const [form, setForm] = useState(initialForm)

  const { createTask, editTask, taskToEdit } = useProjects()
  const params = useParams()

  const variants = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0 }
  }

  const item = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0 }
  }

  useEffect(() => {
    if (taskToEdit == null) {
      setForm(initialForm)
    } else {
      setForm(taskToEdit)
    }
  }, [taskToEdit])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form._id) {
      await createTask({ ...form, project: params.id })
    } else {
      await editTask(form)
    }

    setForm(initialForm)

    setModalIsOpen(false)
  }

  return (
    <AnimatePresence>
      {modalIsOpen && (
        <motion.div
          variants={variants}
          initial='hidden'
          animate='visible'
          exit='hidden'
          className='absolute left-0 top-0 z-20 flex h-full w-full items-center  justify-center bg-black bg-opacity-70'
        >
          <motion.div
            className='mx-auto max-h-[90%] w-[90%] max-w-xl overflow-y-auto rounded-2xl bg-padding-gray p-6'
            variants={item}
            initial='hidden'
            animate='visible'
            exit='hidden'
          >
            <div className='flex w-full justify-end'>
              <button
                type='button'
                className='round-md flex items-center gap-2 text-gray-400 transition-colors duration-300 hover:text-white focus:outline-none focus:ring-2'
                onClick={() => setModalIsOpen(false)}
              >
                <span className=''>Cerrar</span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-8 w-8'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </div>
            <form
              className='round-md mx-auto flex w-full max-w-xl flex-col justify-center space-y-5  pt-5'
              onSubmit={(e) => handleSubmit(e)}
            >
              {' '}
              <div>
                <label
                  className='block font-semibold text-white'
                  htmlFor='name'
                >
                  Nombre
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  placeholder='Nombre de la tarea...'
                  className='round-md block w-full border border-gray-600 bg-transparent px-2 py-1.5 text-paragraph-color caret-paragraph-color shadow-sm outline-none placeholder:text-paragraph-color sm:text-sm sm:leading-6'
                  autoComplete='off'
                  required
                  value={form.name}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label
                  className='block font-semibold text-white'
                  htmlFor='description'
                >
                  Descripción
                </label>
                <textarea
                  id='description'
                  name='description'
                  placeholder='Descripción de la tarea...'
                  className='round-md block h-[38px] w-full border border-gray-600 bg-transparent px-2 py-1.5 text-paragraph-color caret-paragraph-color shadow-sm outline-none placeholder:text-paragraph-color sm:text-sm sm:leading-6'
                  autoComplete='off'
                  required
                  value={form.description}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className=''>
                <label
                  htmlFor='priority'
                  className='block font-semibold text-white'
                >
                  Prioridad
                </label>
                <select
                  id='priority'
                  name='priority'
                  value={form.priority}
                  onChange={(e) => handleChange(e)}
                  className='block h-[38px] w-full rounded-md border border-gray-600 bg-padding-gray px-2 py-1.5 text-paragraph-color caret-paragraph-color shadow-sm outline-none sm:text-sm sm:leading-6'
                >
                  <option value='' disabled>
                    -- Seleccionar --
                  </option>
                  <option value='Baja'>Baja</option>
                  <option value='Media'>Media</option>
                  <option value='Alta'>Alta</option>
                </select>
              </div>
              <div>
                <label
                  className='block font-semibold text-white'
                  htmlFor='deadline'
                >
                  Deadline
                </label>
                <input
                  type='date'
                  id='deadline'
                  name='deadline'
                  placeholder='dd/mm/yy'
                  className='date__input block w-full cursor-pointer appearance-none rounded-md border border-gray-600 bg-transparent px-2 py-1.5 text-paragraph-color caret-paragraph-color shadow-sm outline-none placeholder:text-paragraph-color sm:text-sm sm:leading-6 '
                  autoComplete='off'
                  required
                  value={form.deadline}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <input
                  type='submit'
                  className='mt-[10px] block w-full cursor-pointer rounded-lg bg-primary-blue px-2 py-1.5 font-bold text-gray-300 shadow-sm outline-none transition-colors duration-300 placeholder:text-paragraph-color hover:bg-custom-cyan hover:text-primary-blue sm:text-sm sm:leading-6'
                  value={form._id ? 'Editar tarea' : 'Crear tarea'}
                />
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

FormTaskModal.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  setModalIsOpen: PropTypes.func.isRequired,
  taskToEdit: PropTypes.object
}

export default FormTaskModal
