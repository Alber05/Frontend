import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axiosClient from '../config/axiosClient'
import ErrorComponent from '../components/ErrorComponent'
import confirm from '../assets/confirm.png'

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
    <div className='flex h-screen w-full flex-col items-center justify-center gap-36 py-6'>
      {alert?.error ? (
        <ErrorComponent error={alert} />
      ) : (
        // TODO: Cambiar pantalla del token
        <>
          <h1 className='text-3xl font-black text-custom-cyan'>{alert?.msg}</h1>
          <img src={confirm} alt='Success' />
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
