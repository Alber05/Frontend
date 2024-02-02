// Librerías de React
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

// Librerías de terceros
import { useInView } from 'framer-motion'

// Componentes
import Alert from '../components/Alert'

// Recursos
import Logo from '../assets/OIG.png'

// Utilidades propias
import passwordValidation from '../helpers/passwordValidation'

// Configuración específica del proyecto
import axiosClient from '../config/axiosClient'

const initialForm = {
  name: '',
  email: '',
  password: '',
  repeatedPassword: ''
}

function Register() {
  const [form, setForm] = useState(initialForm)
  const [alert, setAlert] = useState(null)
  const [showPassword, setShowPassword] = useState({
    password: false,
    repeatedPassword: false
  })
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

    const { name, email, password } = form

    const validationAlert = passwordValidation(form)

    if (validationAlert !== null) {
      setAlert(validationAlert)
      return
    }

    try {
      const { data } = await axiosClient.post(`/users`, {
        name,
        password,
        email
      })
      setAlert({
        msg: data.msg,
        error: false
      })

      setForm(initialForm)
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  function togglePasswordVisibility(id) {
    setShowPassword({
      ...showPassword,
      [id]: !showPassword[id]
    })
  }

  return (
    <div
      className='w-full min-h-screen py-6 lg:py-0 grid lg:grid-cols-2 '
      ref={pageRef}
    >
      <div
        className=' lg:flex items-center justify-center'
        style={{
          opacity: isInView ? 1 : 0,
          transition:
            'scale,opacity 0.4s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s'
        }}
      >
        <h1 className='my-10 lg:my-0 text-center font-black text-gray-50 uppercase space-y-2 text-3xl lg:text-4xl xl:text-5xl '>
          <span className='block'>Regístrate</span>

          <span className='text-custom-cyan block text-5xl xl:text-7xl'>
            Crea
          </span>

          <span className='block'>Triunfa</span>
        </h1>
      </div>
      <div
        className='flex items-center '
        style={{
          transform: isInView ? 'scale-1' : 'scale-0',
          opacity: isInView ? 1 : 0,
          transition: 'all 0.4s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s'
        }}
      >
        <div className='bg-white p-6 rounded-md mx-auto flex-1 max-w-md '>
          <Link to='/'>
            <img
              className='mx-auto h-40 w-auto'
              src={Logo}
              alt='UptaskLogo'
              title='Ir a inicio'
            />
          </Link>

          <h2 className='mt-3 text-center text-3xl font-bold leading-9 tracking-tight text-primary-blue'>
            Crear nueva cuenta
          </h2>

          <form
            className='space-y-6 mt-5'
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className=''>
              <label
                htmlFor='name'
                className='block text-sm leading-6 text-primary-blue font-bold'
              >
                Nombre
              </label>

              <input
                id='name'
                name='name'
                type='text'
                required
                autoComplete='new-name'
                className='mt-2 block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-blue sm:text-sm sm:leading-6'
                placeholder='Ingrese su nombre'
                onChange={(e) => handleChange(e)}
                value={form.name}
              />
            </div>
            <div>
              <label
                htmlFor='email'
                className='block text-sm leading-6 text-primary-blue font-bold'
              >
                Email
              </label>
              <input
                id='email'
                name='email'
                type='email'
                autoComplete='new-email'
                required
                className='mt-2 block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-blue sm:text-sm sm:leading-6'
                placeholder='Ingrese su email'
                onChange={(e) => handleChange(e)}
                value={form.email}
              />
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm leading-6 text-primary-blue font-bold'
              >
                Password
              </label>

              <div className='relative'>
                <input
                  id='password'
                  name='password'
                  type={!showPassword.password ? 'password' : 'text'}
                  autoComplete='new-password'
                  required
                  className='mt-2 block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-blue sm:text-sm sm:leading-6'
                  placeholder='Ingrese una contraseña'
                  onChange={(e) => handleChange(e)}
                  value={form.password}
                  title='Al menos 8 caracteres, un carácter especial, un número, una letra mayúscula y una minúscula'
                />
                <button
                  type='button'
                  onClick={() => togglePasswordVisibility('password')}
                  className='absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 cursor-pointer'
                >
                  {/* Icono de ojo para mostrar/ocultar la contraseña */}
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
              <label
                htmlFor='repeatedPassword'
                className='block text-sm leading-6 text-primary-blue font-bold'
              >
                Confirmar contraseña
              </label>

              <div className='relative'>
                <input
                  id='repeatedPassword'
                  name='repeatedPassword'
                  type={!showPassword.repeatedPassword ? 'password' : 'text'}
                  autoComplete='new-password'
                  required
                  className='mt-2 block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-blue sm:text-sm sm:leading-6'
                  placeholder='Repita su contraseña'
                  onChange={(e) => handleChange(e)}
                  value={form.repeatedPassword}
                  title='Al menos 8 caracteres, un carácter especial, un número, una letra mayúscula y una minúscula'
                />
                <button
                  type='button'
                  onClick={() => {
                    togglePasswordVisibility('repeatedPassword')
                    console.log(
                      'showRepeated.password:',
                      showPassword.repeatedPassword
                    )
                  }}
                  className='absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 cursor-pointer'
                >
                  {/* Icono de ojo para mostrar/ocultar la contraseña */}
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
            {alert ? <Alert alert={alert} /> : null}

            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-custom-cyan px-3 py-1.5 text-sm font-bold leading-6 text-primary-blue shadow-sm hover:bg-primary-blue hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue transition-colors duration-200'
            >
              Crear cuenta
            </button>
          </form>

          <p className='mt-5 text-center text-sm text-gray-500'>
            ¿Tienes una cuenta?{' '}
            <Link
              to='/'
              className='font-semibold leading-6 text-custom-cyan hover:text-primary-blue'
            >
              Accede aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
