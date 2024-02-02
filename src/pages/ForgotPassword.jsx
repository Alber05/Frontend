// Librerías de React
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

// Configuración y utilidades
import axiosClient from '../config/axiosClient'

// Recursos
import Logo from '../assets/OIG.png'

// Librerías de terceros
import { useInView } from 'framer-motion'

// Componentes
import Alert from '../components/Alert'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [alert, setAlert] = useState(null)
  const pageRef = useRef(null)
  const isInView = useInView(pageRef, { once: true })

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await axiosClient.post(`/users/forgot-password`, {
        email
      })
      setAlert({
        msg: data.msg,
        error: false
      })
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  return (
    <div
      className='w-full min-h-screen py-6 lg:py-0 grid lg:grid-cols-2 bg-login-form bg-fixed bg-cover overflow-hidden'
      ref={pageRef}
    >
      <div className='flex items-center justify-center'>
        <h1 className='text-center font-black text-gray-50 uppercase space-y-2 text-3xl lg:text-4xl xl:text-5xl '>
          <span className='block'>Recupera el acceso con facilidad</span>
          <span className='text-custom-cyan block text-5xl xl:text-7xl'>
            Tu seguridad
          </span>
          <span className='block'>nuestra prioridad</span>
        </h1>
      </div>
      <div className='flex justify-center items-center'>
        <div
          className='p-6 rounded-md max-w-md shadow-2xl bg-gray-50 flex-1'
          style={{
            translate: isInView ? '0' : '100%',
            opacity: isInView ? 1 : 0,
            transition: 'all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s'
          }}
        >
          <Link to='/'>
            <img
              className='mx-auto h-40 w-auto'
              src={Logo}
              alt='UptaskLogo'
            />
          </Link>

          <h2 className='mt-3 text-center text-2xl  leading-9 tracking-tight text-primary-blue font-black'>
            Recuperar contraseña
          </h2>

          <form
            className='mt-5 space-y-6'
            onSubmit={(e) => handleSubmit(e)}
          >
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
                autoComplete='email'
                required
                className='mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-blue sm:text-sm sm:leading-6'
                placeholder='Introduzca su email'
                value={email}
                onChange={(e) => handleEmail(e)}
              />
            </div>

            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-primary-blue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-custom-cyan hover:text-primary-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors duration-200'
            >
              Enviar email
            </button>

            <p className='mt-5 text-center text-sm text-gray-500'>
              ¿No tienes una cuenta?{' '}
              <Link
                to='/forgot-password/token'
                className='font-semibold leading-6 text-custom-cyan hover:text-primary-blue'
              >
                Crear una cuenta
              </Link>
            </p>
            {alert ? <Alert alert={alert} /> : null}
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
