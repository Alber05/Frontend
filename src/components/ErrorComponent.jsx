import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function ErrorComponent({ error }) {
  return (
    <div className='flex min-h-screen w-full flex-col justify-center text-center'>
      <p className='text-base font-semibold text-red-600'>{error?.status}</p>
      <h1 className='mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl'>
        {error?.statusText}
      </h1>
      <p className='mt-6 text-base font-black leading-7 text-red-600'>
        {error?.msg}
      </p>
      <div className='mt-10 flex items-center justify-center gap-x-6'></div>
      <Link to='/'>
        <button
          type='submit'
          className='rounded-md bg-custom-cyan px-3 py-1.5 text-sm font-semibold leading-6 text-primary-blue shadow-sm transition-colors duration-200 hover:bg-primary-blue hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
        >
          Ir a inicio
        </button>
      </Link>
    </div>
  )
}

ErrorComponent.propTypes = {
  error: PropTypes.object
}

export default ErrorComponent
