// Librerías de React
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

// Configuración y utilidades propias
import Logo from '../assets/OIG.png'
import passwordValidation from '../helpers/passwordValidation'

// Componentes
import Alert from '../components/Alert'
import ErrorComponent from '../components/errorComponent'

// Configuración y utilidades específicas del proyecto
import axiosClient from '../config/axiosClient'

const initialForm = {
  password: '',
  repeatedPassword: ''
}

function NewPassword() {
  const [form, setForm] = useState(initialForm)
  const [validToken, setValidToken] = useState(false)
  const [alert, setAlert] = useState(null)

  const params = useParams()

  const { token } = params

  useEffect(() => {
    const checkToken = async (token) => {
      try {
        const { data } = await axiosClient(`/users/forgot-password/${token}`)
        setValidToken(true)
        setAlert({
          msg: data.msg,
          error: false
        })
      } catch (error) {
        console.log(error)
        setAlert({
          msg: error.response.data.msg,
          status: error.response.status,
          statusText: error.response.statusText,
          error: true
        })
      }
    }

    checkToken(token)
  }, [token])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationAlert = passwordValidation(form)

    if (validationAlert !== null) {
      setAlert(validationAlert)
      return
    }

    try {
      const { data } = await axiosClient.post(
        `/users/forgot-password/${token}`,
        {
          password: form.password
        }
      )
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

  // Función para alternar la visibilidad de la contraseña
  function togglePasswordVisibility(passwordFieldId) {
    const passwordField = document.getElementById(passwordFieldId)

    if (passwordField.type === 'password') {
      passwordField.type = 'text'
    } else {
      passwordField.type = 'password'
    }
  }

  return (
    <div className='w-full min-h-screen py-6 lg:py-0 grid  bg-login-form bg-fixed bg-cover overflow-hidden '>
      {validToken ? (
        <>
          <section className='flex items-center justify-center'>
            <h1 className='text-center font-black text-gray-50 uppercase space-y-2 text-3xl lg:text-4xl xl:text-5xl '>
              <span className='block'>Recupera el acceso con facilidad</span>

              <span className='text-custom-cyan block text-5xl xl:text-7xl'>
                Tu seguridad
              </span>

              <span className='block'>nuestra prioridad</span>
            </h1>
          </section>
          <section className='flex justify-center items-center'>
            {/* Card del forumlario */}
            <div className='p-6 rounded-md max-w-md shadow-2xl bg-gray-50 flex-1'>
              {/* Logo de la empresa */}
              <Link to='/'>
                <img
                  className='mx-auto h-40 w-auto'
                  src={Logo}
                  alt='UptaskLogo'
                />
              </Link>
              {/* Título del formulario */}
              <h2 className='mt-3 text-center text-2xl leading-9 tracking-tight text-primary-blue font-black'>
                Nueva contraseña
              </h2>

              {/* Formulario de recuperación de contraseña */}
              <form
                className='mt-5 space-y-6'
                onSubmit={(e) => handleSubmit(e)}
              >
                {/* Campo de contraseña */}
                <div>
                  <label
                    htmlFor='password'
                    className='block text-sm leading-6 text-primary-blue font-bold'
                  >
                    Password
                  </label>

                  <div className='relative'>
                    {/* Input de contraseña con botón para mostrar/ocultar la contraseña */}
                    <input
                      id='password'
                      name='password'
                      type='password'
                      autoComplete='new-password'
                      required
                      className='mt-2 block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-blue sm:text-sm sm:leading-6'
                      placeholder='Introduzca su nueva contraseña'
                      value={form.password}
                      onChange={(e) => handleChange(e)}
                    />
                    <button
                      type='button'
                      onClick={() => togglePasswordVisibility('password')}
                      className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer'
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
                {/* Campo de confirmación de contraseña */}
                <div>
                  <label
                    htmlFor='repeatedPassword'
                    className='block text-sm leading-6 text-primary-blue font-bold'
                  >
                    Confirmar contraseña
                  </label>

                  <div className='relative'>
                    {/* Input de confirmación de contraseña con botón para mostrar/ocultar la contraseña */}
                    <input
                      id='repeatedPassword'
                      name='repeatedPassword'
                      type='password'
                      autoComplete='new-password'
                      required
                      className='mt-2 block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-blue sm:text-sm sm:leading-6'
                      placeholder='Repita la contraseña'
                      value={form.repeatedPassword}
                      onChange={(e) => handleChange(e)}
                    />
                    <button
                      type='button'
                      onClick={() =>
                        togglePasswordVisibility('confirmPassword')
                      }
                      className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer'
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
                <button
                  type='submit'
                  className='flex w-full justify-center rounded-md bg-primary-blue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-custom-cyan hover:text-primary-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors duration-200'
                >
                  Cambiar contraseña
                </button>
                {alert ? <Alert alert={alert} /> : null}
              </form>
            </div>
          </section>{' '}
        </>
      ) : (
        alert && <ErrorComponent error={alert} />
      )}
    </div>
  )
}

export default NewPassword
