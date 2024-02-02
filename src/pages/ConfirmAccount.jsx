// Librerías de React
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// Componentes y recursos
import ErrorComponent from '../components/errorComponent'
import confirm from '../assets/confirm.png'

// Configuración y utilidades específicas del proyecto
import axiosClient from '../config/axiosClient'

function ConfirmAccount() {
  const [alert, setAlert] = useState(null)
  const params = useParams()
  const { token } = params

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/users/confirm/${token}`
        const { data } = await axiosClient(url)
        console.log(data)

        setAlert({
          msg: data.msg,
          error: false
        })
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          status: error.response.status,
          statusText: error.response.statusText,
          error: true
        })
      }
    }

    confirmAccount()
  }, [token]) // Make sure to include token as a dependency if it's used inside the useEffect.

  return (
    <div className='w-full h-screen py-6 flex flex-col items-center justify-center gap-36'>
      {alert?.error ? (
        <ErrorComponent error={alert} />
      ) : (
        // TODO: Cambiar pantalla del token
        <>
          <h1 className='text-3xl text-custom-cyan font-black'>{alert?.msg}</h1>
          <img
            src={confirm}
            alt='Success'
          />
          <p className='mt-5 text-center text-sm text-gray-500'>
            ¿Tienes una cuenta?{' '}
            <Link
              to='/'
              className='font-semibold leading-6 text-custom-cyan hover:text-primary-blue'
            >
              Accede aquí
            </Link>
          </p>
        </>
      )}
    </div>
  )
}

export default ConfirmAccount
