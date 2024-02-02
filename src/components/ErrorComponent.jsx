import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function ErrorComponent({ error }) {
  return (
    <div className='text-center w-full min-h-screen flex flex-col justify-center'>
      <p className='text-base font-semibold text-red-600'>{error?.status}</p>
      <h1 className='mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl'>
        {error?.statusText}
      </h1>
      <p className='mt-6 text-base leading-7 text-red-600 font-black'>
        {error?.msg}
      </p>
      <div className='mt-10 flex items-center justify-center gap-x-6'></div>
      <Link to='/'>
        <button
          type='submit'
          className='rounded-md bg-custom-cyan text-primary-blue px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-primary-blue hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors duration-200'
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
