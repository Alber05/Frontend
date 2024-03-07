import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useInView } from 'framer-motion'
import useAuth from '../hooks/useAuth'
import axiosClient from '../config/axiosClient'
import Alert from '../components/Alert'
import Logo from '../assets/OIG.png'

const initialForm = {
  email: '',
  password: ''
}

export default function Login() {
  const [form, setForm] = useState(initialForm)
  const [alert, setAlert] = useState({})

  const { setAuth } = useAuth()
  const navigate = useNavigate()
  const pageRef = useRef(null)
  const isInView = useInView(pageRef, { once: true })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await axiosClient.post('/users/login', form)

      setAlert({
        msg: 'Usuario logeado correctamente',
        error: false
      })

      localStorage.setItem('token', data.token)
      setAuth(data)
      navigate('/projects')
    } catch (error) {
      console.log(error.response.data.msg)
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  function togglePasswordVisibility(passwordFieldId) {
    const passwordField = document.getElementById(passwordFieldId)

    if (passwordField.type === 'password') {
      passwordField.type = 'text'
    } else {
      passwordField.type = 'password'
    }
  }
  return (
    <div
      className='grid min-h-screen w-full max-w-[1920px] grid-rows-[auto,1fr] py-12 lg:grid-cols-2 lg:grid-rows-[auto] lg:py-0'
      ref={pageRef}
    >
      <section className='items-center  justify-center lg:flex'>
        <h1
          className='dpiScreen-title__h1 space-y-2 text-center text-3xl font-black uppercase text-gray-50 lg:text-4xl xl:text-5xl'
          style={{
            opacity: isInView ? 1 : 0,
            transition:
              'scale,opacity 0.4s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s'
          }}
        >
          <span className='block'>Accede a la eficiencia</span>
          <span className=' dpiScreen-title__span block text-5xl text-custom-cyan xl:text-7xl'>
            Tu proyecto
          </span>
          <span className='block'>nuestro impulso</span>
        </h1>
      </section>

      <section
        className='flex w-full items-center pb-2'
        style={{
          transform: isInView ? 'scale-1' : 'scale-0',
          opacity: isInView ? 1 : 0,
          transition:
            'scale,opacity 0.4s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s'
        }}
      >
        <div className='mx-auto w-[90%] max-w-md rounded-md bg-white p-6 shadow-2xl'>
          <img
            className='mx-auto h-[150px] w-auto sm:h-40'
            src={Logo}
            alt='Your Company'
          />

          <h2 className='mt-3 text-center text-lg font-black leading-9 tracking-tight text-primary-blue'>
            Iniciar sesión en su cuenta
          </h2>

          <form className='mt-5 space-y-6' onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-bold leading-6 text-primary-blue'
              >
                Email
              </label>

              <input
                id='email'
                name='email'
                type='email'
                autoComplete='current-email'
                required
                className='mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-blue sm:text-sm sm:leading-6'
                placeholder='Introduzca su email'
                onChange={(e) => handleChange(e)}
                value={form.email}
              />
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm font-bold leading-6 text-primary-blue'
                >
                  Password
                </label>

                <div className='text-sm'>
                  <Link
                    to='forgot-password'
                    className='font-semibold text-custom-cyan hover:text-primary-blue'
                  >
                    ¿No puedes iniciar sesión?
                  </Link>
                </div>
              </div>

              <div className='relative'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  className='mt-2 block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-blue sm:text-sm sm:leading-6'
                  placeholder='Introduzca su contraseña'
                  onChange={(e) => handleChange(e)}
                  value={form.password}
                />

                <button
                  type='button'
                  onClick={() => togglePasswordVisibility('password')}
                  className='absolute inset-y-0 right-0 flex cursor-pointer items-center px-3 text-gray-500'
                >
                  <svg
                    className='h-5 w-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    ></path>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M2 12s3 9 10 9 10-9 10-9'
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-primary-blue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm transition-colors duration-200 hover:bg-custom-cyan hover:text-primary-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
              >
                Acceder
              </button>
            </div>
          </form>

          {alert ? (
            <div className='mt-5'>
              <Alert alert={alert} />
            </div>
          ) : null}

          <p className='mt-5 text-center text-sm text-gray-500'>
            ¿No tienes una cuenta?{' '}
            <Link
              to='register'
              className='font-semibold leading-6 text-custom-cyan hover:text-primary-blue'
            >
              Crear una cuenta
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
