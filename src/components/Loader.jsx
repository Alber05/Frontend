import { Audio } from 'react-loader-spinner'

const Loader = () => {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-2'>
      <Audio
        height='100'
        width='100'
        radius='9'
        color='rgb(154 160 173)'
        ariaLabel='loading'
        wrapperStyle
        wrapperClass
      />
      <h3 className='font-Russo text-xl font-bold tracking-wider text-paragraph-color'>
        Cargando...
      </h3>
    </div>
  )
}

Loader.propTypes = {}

export default Loader
